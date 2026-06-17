// The journal screen (#journal). Dynamically imported by the router only when first
// opened, so neither this UI nor its IndexedDB/recorder dependencies touch the boot path.
//
// Layout: a "new entry" composer is always at the TOP. Below it sits a CLOSED book with
// the reader's name on the cover. Tapping the book opens it to a two-page spread: the left
// page is the table of contents (each line jumps to its entry); the right page is blank —
// tapping it turns the pages into the entries themselves, two to a spread, each headed by
// its date and time. The whole book can also be read aloud in the coach's voice. Audio
// Blobs live in IndexedDB; everything stays on this device.

import { store } from './state.js';
import { coach } from './tts.js';
import { getCharacter } from './characters.js';
import { listEntries, bookOrder, addTextEntry, addVoiceEntry, getEntryAudio, removeEntry, setEntryText } from './journal.js';
import { speechToText } from './stt.js';
import { confirmDialog, alertDialog } from './ui-dialog.js';

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function fmtMMSS(sec) {
  const s = Math.max(0, Math.floor(sec));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}
function fmtDay(iso) {
  try { return new Date(iso).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); }
  catch { return iso || ''; }
}
function fmtTime(iso) {
  try { return new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }); }
  catch { return ''; }
}
function snippet(e) {
  if (e.text && e.text.trim()) { const t = e.text.trim().replace(/\s+/g, ' '); return t.length > 54 ? t.slice(0, 53) + '…' : t; }
  if (e.audioKey) return 'Voice note' + (e.durationSec ? ' · ' + fmtMMSS(e.durationSec) : '');
  return '(empty)';
}
// Group entries (in the given order) into chapters by calendar day, for the contents page.
function groupByDay(list) {
  const out = [];
  let cur = null;
  for (const e of list) {
    const key = (() => { try { return new Date(e.ts).toDateString(); } catch { return e.ts; } })();
    if (!cur || cur.key !== key) { cur = { key, label: fmtDay(e.ts), entries: [] }; out.push(cur); }
    cur.entries.push(e);
  }
  return out;
}

let _stopOnLeave = null;
let _rec = null;        // { mr, stream, startMs, tick } — created ONLY on the record tap
let _playUrl = null;    // object URL of the recording currently playing
let _editingId = null;  // id of the entry currently open in the inline editor
const _transcribing = new Set();
// Book state. Closed on every fresh visit and whenever the user navigates away (the leave
// handler resets it). _bookView 'toc' shows contents + the blank turn-page; 'read' shows
// the entries two to a spread, starting at _spreadIdx (an index into the chronological pairs).
let _bookOpen = false;
let _bookView = 'toc';
let _spreadIdx = 0;

async function transcribeEntry(id) {
  const entry = listEntries().find((e) => e.id === id);
  if (!entry || !entry.audioKey || entry.text || _transcribing.has(id)) return;
  _transcribing.add(id);
  if (location.hash === '#journal') journalScreen();
  let text = '';
  try {
    const blob = await getEntryAudio(entry);
    if (blob) text = await speechToText.transcribe(blob);
  } catch { /* keep as audio-only */ }
  if (text) setEntryText(id, text);
  _transcribing.delete(id);
  if (location.hash === '#journal') journalScreen();
}

function stopRecorder() {
  if (!_rec) return;
  try { _rec.mr.stop(); } catch { /* ok */ }
  try { (_rec.stream.getTracks() || []).forEach((t) => t.stop()); } catch { /* ok */ }
  if (_rec.tick) clearInterval(_rec.tick);
  _rec = null;
}

function bindLeave() {
  if (_stopOnLeave) window.removeEventListener('hashchange', _stopOnLeave);
  _stopOnLeave = () => {
    if (location.hash !== '#journal') {
      coach.cancel();
      stopRecorder();
      if (_playUrl) { try { URL.revokeObjectURL(_playUrl); } catch { /* ok */ } _playUrl = null; }
      _bookOpen = false; _bookView = 'toc'; _spreadIdx = 0; _editingId = null;
      window.removeEventListener('hashchange', _stopOnLeave); _stopOnLeave = null;
    }
  };
  window.addEventListener('hashchange', _stopOnLeave);
}

// Open the book straight to a specific entry (used by the personal calendar's day detail).
export function openJournalEntry(id) {
  const order = bookOrder();
  const pos = order.findIndex((e) => e.id === id);
  _bookOpen = true; _bookView = 'read'; _spreadIdx = pos >= 0 ? Math.floor(pos / 2) : 0;
  if (location.hash === '#journal') journalScreen();
  else location.hash = '#journal';
}

// One entry rendered as a book page (read view).
function entryPageHTML(e) {
  if (!e) return '<div class="book2-page book2-page-empty" aria-hidden="true"></div>';
  const editing = _editingId === e.id;
  const body = editing
    ? `<textarea class="journal-compose journal-edit" id="journal-edit-${esc(e.id)}" rows="6" maxlength="4000" aria-label="Edit entry">${esc(e.text)}</textarea>`
    : (e.text ? `<p class="book2-text">${esc(e.text)}</p>`
      : (_transcribing.has(e.id) ? '<p class="book2-text hint">Transcribing…</p>'
        : (e.audioKey ? `<p class="book2-text hint">Voice note${e.durationSec ? ' · ' + fmtMMSS(e.durationSec) : ''}</p>` : '<p class="book2-text hint">(empty)</p>')));
  return `<div class="book2-page book2-entry" data-id="${esc(e.id)}">
    <header class="book2-entry-head"><span class="book2-day">${esc(fmtDay(e.ts))}</span><span class="book2-time">${esc(fmtTime(e.ts))} · ${e.kind === 'voice' ? '\u{1F399} voice' : '✍ written'}</span></header>
    ${body}
    <div class="journal-entry-actions">
      ${(e.audioKey && !editing) ? `<button class="linkish journal-play" data-id="${esc(e.id)}">▶ Play</button>` : ''}
      ${(e.audioKey && !e.text && !editing && !_transcribing.has(e.id)) ? `<button class="linkish journal-transcribe" data-id="${esc(e.id)}">Transcribe</button>` : ''}
      ${editing
        ? `<button class="btn btn-primary journal-edit-save" data-id="${esc(e.id)}">Save</button><button class="linkish journal-edit-cancel">Cancel</button>`
        : `<button class="linkish journal-edit-btn" data-id="${esc(e.id)}">Edit</button><button class="linkish journal-del" data-id="${esc(e.id)}">Delete</button>`}
    </div>
  </div>`;
}

export function journalScreen() {
  const app = document.getElementById('app');
  if (!app) return;
  coach.cancel();
  const prof = store.profile;
  const coachName = (getCharacter(prof.character) || {}).name || 'your coach';
  const name = (prof.name || '').trim();
  const entries = listEntries();      // newest first (count + cover)
  const order = bookOrder();          // chronological (the book's reading order)
  const hasEntries = entries.length > 0;

  const composeHTML = `
    <section class="card journal-compose-card">
      <p class="hint">A private place to think out loud — it becomes a book you can read, or hear in ${esc(coachName)}'s voice. Everything stays on this device.</p>
      <textarea id="journal-text" class="journal-compose" rows="3" maxlength="4000" placeholder="What is on your mind today?" aria-label="New journal entry"></textarea>
      <div class="journal-compose-actions">
        <button class="btn btn-primary" id="journal-save">Save entry</button>
        <button class="btn" id="journal-record">\u{1F399} Record a voice note</button>
        <span class="journal-rec-state" id="journal-rec-state" hidden><span class="journal-rec-dot">●</span> <span id="journal-rec-time">0:00</span></span>
      </div>
    </section>`;

  // ---- the book, below the composer ----
  let bookHTML;
  if (!_bookOpen) {
    bookHTML = `
      <div class="book2-shelf">
        <button class="book2-closed" id="book-open" aria-label="Open your journal">
          <span class="book2-closed-flourish" aria-hidden="true">❧</span>
          <span class="book2-closed-kicker">Journal</span>
          <span class="book2-closed-name">${esc(name || 'My Journal')}</span>
          <span class="book2-closed-sub">${hasEntries ? esc(entries.length + (entries.length === 1 ? ' entry' : ' entries')) : 'Your story starts here'}</span>
          <span class="book2-closed-hint">Tap to open</span>
        </button>
      </div>`;
  } else {
    const controls = `
      <div class="book2-bar">
        <button class="linkish" id="book-close">✕ Close book</button>
        ${hasEntries ? `<button class="linkish" id="journal-listen">▶ Read aloud in ${esc(coachName)}'s voice</button><button class="linkish" id="journal-stop" hidden>■ Stop</button>` : ''}
        ${_bookView === 'read' ? '<button class="linkish" id="book-contents">☰ Contents</button>' : ''}
      </div>
      <p class="journal-now" id="journal-now" aria-live="polite"></p>`;
    if (_bookView === 'toc' || !hasEntries) {
      const chapters = groupByDay(order);   // chronological chapters
      const toc = hasEntries
        ? chapters.map((ch) => `
            <div class="book2-chapter">
              <h4 class="book2-chapter-title">${esc(ch.label)}</h4>
              <ul class="book2-toc-list">
                ${ch.entries.map((e) => `<li><button class="book2-toc-entry" data-id="${esc(e.id)}"><span class="t">${esc(fmtTime(e.ts))}</span><span class="s">${esc(snippet(e))}</span></button></li>`).join('')}
              </ul>
            </div>`).join('')
        : '<p class="hint">Your book is empty. Write your first entry above — it appears here as a new page.</p>';
      bookHTML = `${controls}
        <div class="book2 is-open" id="book2">
          <div class="book2-page book2-toc">
            <h3 class="book2-h">Contents</h3>
            <div class="book2-toc-scroll">${toc}</div>
          </div>
          <div class="book2-page book2-blank" id="book-turn" role="button" tabindex="0" aria-label="Turn the page to read your entries">
            <span class="book2-turnhint">${hasEntries ? 'Tap to turn the page →' : ''}</span>
          </div>
        </div>`;
    } else {
      const a = order[_spreadIdx * 2] || null;
      const b = order[_spreadIdx * 2 + 1] || null;
      const lastSpread = Math.max(0, Math.ceil(order.length / 2) - 1);
      bookHTML = `${controls}
        <div class="book2 is-open is-reading" id="book2">
          ${entryPageHTML(a)}
          ${entryPageHTML(b)}
        </div>
        <nav class="book2-nav">
          ${_spreadIdx > 0 ? '<button class="btn book2-prev">← Previous pages</button>' : '<span></span>'}
          ${_spreadIdx < lastSpread ? '<button class="btn book2-next">Next pages →</button>' : '<span></span>'}
        </nav>`;
    }
  }

  app.innerHTML = `
    <header class="topbar"><a class="back" href="#you">← You</a><h1 class="page-title">Your journal</h1></header>
    <main class="narrow journal-screen">
      ${composeHTML}
      <section class="card journal-book-card">${bookHTML}</section>
      <footer class="privacy-note"><p>\u{1F331} <strong>Private by design.</strong> Your journal — words and any recordings — lives only on this device and never leaves it.</p></footer>
    </main>`;
  bindLeave();
  bindCompose();

  if (!_bookOpen) {
    document.getElementById('book-open').addEventListener('click', () => { _bookOpen = true; _bookView = 'toc'; journalScreen(); });
    return;
  }

  const closeBtn = document.getElementById('book-close');
  if (closeBtn) closeBtn.addEventListener('click', () => { _bookOpen = false; _bookView = 'toc'; _editingId = null; coach.cancel(); journalScreen(); });
  const contentsBtn = document.getElementById('book-contents');
  if (contentsBtn) contentsBtn.addEventListener('click', () => { _bookView = 'toc'; _editingId = null; journalScreen(); });
  bindListen(prof);

  if (_bookView === 'toc') {
    const turn = document.getElementById('book-turn');
    if (turn && order.length) {
      const go = () => { _bookView = 'read'; _spreadIdx = 0; journalScreen(); };
      turn.addEventListener('click', go);
      turn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    }
    app.querySelectorAll('.book2-toc-entry').forEach((btn) => btn.addEventListener('click', () => {
      const pos = order.findIndex((e) => e.id === btn.dataset.id);
      _spreadIdx = pos >= 0 ? Math.floor(pos / 2) : 0;
      _bookView = 'read';
      journalScreen();
    }));
  } else {
    const prev = app.querySelector('.book2-prev'); if (prev) prev.addEventListener('click', () => { _spreadIdx = Math.max(0, _spreadIdx - 1); _editingId = null; journalScreen(); });
    const next = app.querySelector('.book2-next'); if (next) next.addEventListener('click', () => { _spreadIdx += 1; _editingId = null; journalScreen(); });
    bindEntryActions(app);
  }
}

// ---- composer: save written entry + record a voice note (mic created only on tap) ----
function bindCompose() {
  const saveBtn = document.getElementById('journal-save');
  if (saveBtn) saveBtn.addEventListener('click', () => {
    const ta = document.getElementById('journal-text');
    if (ta && addTextEntry(ta.value)) { ta.value = ''; journalScreen(); }
  });
  const recBtn = document.getElementById('journal-record');
  const recState = document.getElementById('journal-rec-state');
  const recTime = document.getElementById('journal-rec-time');
  if (recBtn) recBtn.addEventListener('click', async () => {
    if (_rec) { stopRecorder(); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined') {
      alertDialog('Recording is not supported on this device. You can still write your entry.');
      return;
    }
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch { alertDialog('Microphone access was not granted. You can still write your entry.'); return; }
    const chunks = [];
    let mr;
    try { mr = new MediaRecorder(stream); } catch {
      try { (stream.getTracks() || []).forEach((t) => t.stop()); } catch { /* ok */ }
      alertDialog('Recording could not start on this device. You can still write your entry.');
      return;
    }
    const startMs = Date.now();
    mr.ondataavailable = (ev) => { if (ev.data && ev.data.size) chunks.push(ev.data); };
    mr.onstop = async () => {
      const blob = new Blob(chunks, { type: mr.mimeType || 'audio/webm' });
      const dur = (Date.now() - startMs) / 1000;
      if (recState) recState.hidden = true;
      recBtn.textContent = '\u{1F399} Record a voice note';
      if (blob.size > 0) {
        const entry = await addVoiceEntry(blob, dur, '');
        journalScreen();
        if (entry) transcribeEntry(entry.id);
      }
    };
    _rec = { mr, stream, startMs, tick: setInterval(() => { if (recTime) recTime.textContent = fmtMMSS((Date.now() - startMs) / 1000); }, 500) };
    mr.start();
    if (recState) recState.hidden = false;
    recBtn.textContent = '■ Stop & save';
  });
}

// ---- read the whole book aloud in the coach's voice (chronological) ----
function bindListen(prof) {
  const listenBtn = document.getElementById('journal-listen');
  const stopBtn = document.getElementById('journal-stop');
  if (listenBtn) listenBtn.addEventListener('click', () => {
    const lines = bookOrder().map((e) => e.text).filter((t) => t && t.trim());
    if (!lines.length) return;
    coach.enabled = true;
    coach.naturalOn = !!prof.naturalOn;
    coach.setCharacterVoice(getCharacter(prof.character));
    coach.resetTranscript();
    coach.onCaption = (t) => { const el = document.getElementById('journal-now'); if (el) el.textContent = t; };
    listenBtn.hidden = true; if (stopBtn) stopBtn.hidden = false;
    coach.speak(lines, { interrupt: true }).then(() => {
      if (stopBtn) stopBtn.hidden = true;
      listenBtn.hidden = false;
    });
  });
  if (stopBtn) stopBtn.addEventListener('click', () => {
    coach.cancel();
    stopBtn.hidden = true; if (listenBtn) listenBtn.hidden = false;
    const el = document.getElementById('journal-now'); if (el) el.textContent = '';
  });
}

// ---- per-entry actions on the reading spread: play / transcribe / edit / delete ----
function bindEntryActions(app) {
  app.querySelectorAll('.journal-play').forEach((b) => b.addEventListener('click', async () => {
    const entry = listEntries().find((e) => e.id === b.dataset.id);
    const blob = await getEntryAudio(entry);
    if (!blob) { b.textContent = '⚠ unavailable'; return; }
    if (_playUrl) { try { URL.revokeObjectURL(_playUrl); } catch { /* ok */ } }
    _playUrl = URL.createObjectURL(blob);
    new Audio(_playUrl).play().catch(() => {});
  }));
  app.querySelectorAll('.journal-transcribe').forEach((b) => b.addEventListener('click', () => { transcribeEntry(b.dataset.id); }));
  app.querySelectorAll('.journal-edit-btn').forEach((b) => b.addEventListener('click', () => { _editingId = b.dataset.id; journalScreen(); }));
  const cancelBtn = app.querySelector('.journal-edit-cancel');
  if (cancelBtn) cancelBtn.addEventListener('click', () => { _editingId = null; journalScreen(); });
  const editSave = app.querySelector('.journal-edit-save');
  if (editSave) editSave.addEventListener('click', () => {
    const ta = document.getElementById('journal-edit-' + editSave.dataset.id);
    setEntryText(editSave.dataset.id, ta ? ta.value : '');
    _editingId = null;
    journalScreen();
  });
  app.querySelectorAll('.journal-del').forEach((b) => b.addEventListener('click', async () => {
    if (!await confirmDialog('Delete this entry? This cannot be undone.', { okText: 'Delete', cancelText: 'Keep', danger: true })) return;
    await removeEntry(b.dataset.id);
    _editingId = null;
    journalScreen();
  }));
}
