// The journal screen (#journal). Dynamically imported by the router only when first
// opened, so neither this UI nor its IndexedDB/recorder dependencies touch the boot
// path. It presents as a BOOK: a closed, decorated cover by default; opening reveals a
// table of contents (chapters by date); tapping a chapter opens that entry as a page;
// and the whole book can be read aloud in the chosen coach's voice. Everything stays on
// this device. Recording + on-device transcription are layered in; audio Blobs live in
// IndexedDB, never localStorage.

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
// A short one-line preview for the table of contents.
function snippet(e) {
  if (e.text && e.text.trim()) {
    const t = e.text.trim().replace(/\s+/g, ' ');
    return t.length > 64 ? t.slice(0, 63) + '…' : t;
  }
  if (e.audioKey) return 'Voice note' + (e.durationSec ? ' · ' + fmtMMSS(e.durationSec) : '');
  return '(empty)';
}
// Group entries (already in the desired order) into chapters by calendar day.
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
// Recording state lives at module scope so navigate-away can stop a stray recorder.
// getUserMedia/MediaRecorder are created ONLY on the record tap — never at import/boot.
let _rec = null;        // { mr, stream, startMs, tick }
let _playUrl = null;    // object URL of the recording currently playing (revoked on stop)
let _editingId = null;  // id of the entry currently open in the inline editor
const _transcribing = new Set(); // ids whose voice note is being transcribed in the background
// The book is CLOSED on every fresh visit and whenever the user navigates away (the leave
// handler resets these). _openEntryId null => table of contents; an id => that entry's page.
let _bookOpen = false;
let _openEntryId = null;

// Transcribe a voice entry on-device (gated; off the main thread). On any failure it
// quietly leaves the recording as-is — the user can always type/edit the text instead.
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

// Stop book audio / recording AND close the book when the user leaves #journal, so the
// page always opens to the closed cover next time.
function bindLeave() {
  if (_stopOnLeave) window.removeEventListener('hashchange', _stopOnLeave);
  _stopOnLeave = () => {
    if (location.hash !== '#journal') {
      coach.cancel();
      stopRecorder();
      if (_playUrl) { try { URL.revokeObjectURL(_playUrl); } catch { /* ok */ } _playUrl = null; }
      _bookOpen = false; _openEntryId = null; _editingId = null;
      window.removeEventListener('hashchange', _stopOnLeave); _stopOnLeave = null;
    }
  };
  window.addEventListener('hashchange', _stopOnLeave);
}

// Open the book straight to a specific entry (used by the personal calendar's day
// detail). Sets the book state, then routes to #journal so the page renders that entry.
export function openJournalEntry(id) {
  _bookOpen = true; _openEntryId = id;
  if (location.hash === '#journal') journalScreen();
  else location.hash = '#journal';
}

export function journalScreen() {
  const app = document.getElementById('app');
  if (!app) return;
  coach.cancel(); // stop any book reading already in progress
  const prof = store.profile;
  const coachName = (getCharacter(prof.character) || {}).name || 'your coach';
  const name = (prof.name || '').trim();
  const entries = listEntries();      // newest first
  const hasEntries = entries.length > 0;

  const composeHTML = `
    <section class="card journal-compose-card">
      <textarea id="journal-text" class="journal-compose" rows="4" maxlength="4000" placeholder="What is on your mind today?" aria-label="New journal entry"></textarea>
      <div class="journal-compose-actions">
        <button class="btn btn-primary" id="journal-save">Save entry</button>
        <button class="btn" id="journal-record">\u{1F399} Record a voice note</button>
        <span class="journal-rec-state" id="journal-rec-state" hidden><span class="journal-rec-dot">●</span> <span id="journal-rec-time">0:00</span></span>
      </div>
    </section>`;

  // ---- closed cover (default) ----
  if (!_bookOpen) {
    const range = hasEntries ? `${esc(fmtDay(entries[entries.length - 1].ts))} – ${esc(fmtDay(entries[0].ts))}` : '';
    app.innerHTML = `
      <header class="topbar"><a class="back" href="#you">← You</a><h1 class="page-title">Your journal</h1></header>
      <main class="narrow journal-screen">
        <div class="book-cover-wrap">
          <button class="book-cover" id="book-open" aria-label="Open your journal">
            <span class="book-cover-flourish" aria-hidden="true">❧</span>
            <span class="book-cover-kicker">Journal</span>
            <span class="book-cover-name">${esc(name || 'My Journal')}</span>
            <span class="book-cover-sub">${hasEntries ? esc(entries.length + (entries.length === 1 ? ' entry' : ' entries')) : 'Your story starts here'}</span>
            ${hasEntries ? `<span class="book-cover-range">${range}</span>` : ''}
            <span class="book-cover-hint">Tap to open</span>
            <span class="book-cover-ribbon" aria-hidden="true"></span>
          </button>
        </div>
        <div class="journal-cover-actions">
          <button class="btn btn-primary" id="book-new">✍ Write a new entry</button>
        </div>
        <footer class="privacy-note"><p>\u{1F331} <strong>Private by design.</strong> Your journal — words and any recordings — lives only on this device and never leaves it.</p></footer>
      </main>`;
    bindLeave();
    document.getElementById('book-open').addEventListener('click', () => { _bookOpen = true; _openEntryId = null; journalScreen(); });
    document.getElementById('book-new').addEventListener('click', () => {
      _bookOpen = true; _openEntryId = null; journalScreen();
      setTimeout(() => { const ta = document.getElementById('journal-text'); if (ta) { ta.scrollIntoView({ block: 'center' }); ta.focus(); } }, 60);
    });
    return;
  }

  // ---- a single entry, shown as a page of the book ----
  if (_openEntryId) {
    const order = bookOrder();          // chronological — page nav follows the book
    const idx = order.findIndex((e) => e.id === _openEntryId);
    const e = idx >= 0 ? order[idx] : null;
    if (!e) { _openEntryId = null; journalScreen(); return; }
    const prev = idx > 0 ? order[idx - 1] : null;
    const next = idx < order.length - 1 ? order[idx + 1] : null;
    const editing = _editingId === e.id;
    const body = editing
      ? `<textarea class="journal-compose journal-edit" id="journal-edit-${esc(e.id)}" rows="6" maxlength="4000" aria-label="Edit entry">${esc(e.text)}</textarea>`
      : (e.text ? `<p class="book-page-text">${esc(e.text)}</p>`
        : (_transcribing.has(e.id) ? '<p class="book-page-text hint">Transcribing…</p>'
          : (e.audioKey ? `<p class="book-page-text hint">Voice note${e.durationSec ? ' · ' + fmtMMSS(e.durationSec) : ''}</p>` : '<p class="book-page-text hint">(empty)</p>')));
    app.innerHTML = `
      <header class="topbar"><button class="back" id="book-toc">← Contents</button><h1 class="page-title">Your journal</h1></header>
      <main class="narrow journal-screen">
        <article class="book-page">
          <header class="book-page-head"><span class="book-page-day">${esc(fmtDay(e.ts))}</span><span class="book-page-time">${esc(fmtTime(e.ts))} · ${e.kind === 'voice' ? '\u{1F399} voice' : '✍ written'}</span></header>
          ${body}
          <div class="journal-entry-actions">
            ${(e.audioKey && !editing) ? `<button class="linkish journal-play" data-id="${esc(e.id)}">▶ Play recording</button>` : ''}
            ${(e.audioKey && !e.text && !editing && !_transcribing.has(e.id)) ? `<button class="linkish journal-transcribe" data-id="${esc(e.id)}">Transcribe</button>` : ''}
            ${editing
              ? `<button class="btn btn-primary journal-edit-save" data-id="${esc(e.id)}">Save</button><button class="linkish journal-edit-cancel">Cancel</button>`
              : `<button class="linkish journal-edit-btn" data-id="${esc(e.id)}">Edit</button><button class="linkish journal-del" data-id="${esc(e.id)}">Delete</button>`}
          </div>
        </article>
        <nav class="book-page-nav">
          ${prev ? `<button class="btn book-prev" data-id="${esc(prev.id)}">← Previous</button>` : '<span></span>'}
          ${next ? `<button class="btn book-next" data-id="${esc(next.id)}">Next →</button>` : '<span></span>'}
        </nav>
      </main>`;
    bindLeave();
    document.getElementById('book-toc').addEventListener('click', () => { _editingId = null; _openEntryId = null; journalScreen(); });
    const goEntry = (id) => { _editingId = null; _openEntryId = id; journalScreen(); window.scrollTo(0, 0); };
    const pv = app.querySelector('.book-prev'); if (pv) pv.addEventListener('click', () => goEntry(pv.dataset.id));
    const nx = app.querySelector('.book-next'); if (nx) nx.addEventListener('click', () => goEntry(nx.dataset.id));
    bindEntryActions(app);
    return;
  }

  // ---- table of contents: chapters by date ----
  const chapters = groupByDay(entries);   // newest day first
  const tocHTML = hasEntries
    ? chapters.map((ch) => `
        <section class="book-chapter">
          <h3 class="book-chapter-title">${esc(ch.label)}</h3>
          <ol class="book-chapter-list">
            ${ch.entries.map((e) => `<li><button class="book-toc-entry" data-id="${esc(e.id)}">
              <span class="toc-time">${esc(fmtTime(e.ts))}</span>
              <span class="toc-snip">${esc(snippet(e))}</span>
              <span class="toc-kind" aria-hidden="true">${e.kind === 'voice' ? '\u{1F399}' : '✍'}</span>
            </button></li>`).join('')}
          </ol>
        </section>`).join('')
    : '<p class="hint">Your book is empty for now. Write your first entry above — it stays only on this device.</p>';

  app.innerHTML = `
    <header class="topbar"><button class="back" id="book-close">← Close book</button><h1 class="page-title">Your journal</h1></header>
    <main class="narrow journal-screen">
      ${composeHTML}
      <section class="card book-contents">
        <div class="journal-book-head">
          <h2>Contents</h2>
          ${hasEntries ? `<div class="journal-book-controls">
            <button class="btn btn-level" id="journal-listen">▶ Read to me in ${esc(coachName)}'s voice</button>
            <button class="btn btn-level" id="journal-stop" hidden>■ Stop</button>
          </div>` : ''}
        </div>
        <p class="journal-now" id="journal-now" aria-live="polite"></p>
        <div class="book-toc">${tocHTML}</div>
      </section>
      <footer class="privacy-note"><p>\u{1F331} <strong>Private by design.</strong> Your journal lives only on this device and never leaves it.</p></footer>
    </main>`;
  bindLeave();
  document.getElementById('book-close').addEventListener('click', () => { _bookOpen = false; _openEntryId = null; coach.cancel(); journalScreen(); });
  bindCompose(app);
  bindListen(prof, coachName);
  app.querySelectorAll('.book-toc-entry').forEach((b) => b.addEventListener('click', () => { _openEntryId = b.dataset.id; journalScreen(); window.scrollTo(0, 0); }));
}

// ---- compose: save a written entry + record a voice note (mic created only on tap) ----
function bindCompose(app) {
  const saveBtn = document.getElementById('journal-save');
  if (saveBtn) saveBtn.addEventListener('click', () => {
    const ta = document.getElementById('journal-text');
    if (ta && addTextEntry(ta.value)) { ta.value = ''; journalScreen(); }
  });
  const recBtn = document.getElementById('journal-record');
  const recState = document.getElementById('journal-rec-state');
  const recTime = document.getElementById('journal-rec-time');
  if (recBtn) recBtn.addEventListener('click', async () => {
    if (_rec) { stopRecorder(); return; } // tapping again stops + saves (via onstop)
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
        if (entry) transcribeEntry(entry.id); // background, on-device, gated
      }
    };
    _rec = { mr, stream, startMs, tick: setInterval(() => { if (recTime) recTime.textContent = fmtMMSS((Date.now() - startMs) / 1000); }, 500) };
    mr.start();
    if (recState) recState.hidden = false;
    recBtn.textContent = '■ Stop & save';
  });
}

// ---- read the whole book aloud in the coach's voice (chronological) ----
function bindListen(prof, coachName) {
  const listenBtn = document.getElementById('journal-listen');
  const stopBtn = document.getElementById('journal-stop');
  if (listenBtn) listenBtn.addEventListener('click', () => {
    const lines = bookOrder().map((e) => e.text).filter((t) => t && t.trim());
    if (!lines.length) return;
    coach.enabled = true; // explicit request to hear the book
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

// ---- per-entry actions on the page view: play / transcribe / edit / delete ----
function bindEntryActions(app) {
  app.querySelectorAll('.journal-play').forEach((b) => b.addEventListener('click', async () => {
    const entry = listEntries().find((e) => e.id === b.dataset.id);
    const blob = await getEntryAudio(entry);
    if (!blob) { b.textContent = '⚠ recording unavailable'; return; }
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
    _openEntryId = null; // the page is gone — return to contents
    journalScreen();
  }));
}
