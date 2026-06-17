// The journal screen (#journal). Dynamically imported by the router only when first
// opened, so neither this UI nor its IndexedDB/recorder dependencies touch the boot
// path. S5a covers typed entries, the readable "book", and listening to the book in the
// chosen coach's voice (via the existing coach.speak); recording + transcription are
// layered on in later sub-slices. Everything stays on this device.

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

function fmtStamp(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
    });
  } catch { return iso || ''; }
}

let _stopOnLeave = null;
// Recording state lives at module scope so navigate-away can stop a stray recorder.
// getUserMedia/MediaRecorder are created ONLY on the record tap — never at import/boot.
let _rec = null;        // { mr, stream, startMs, tick }
let _playUrl = null;    // object URL of the recording currently playing (revoked on stop)
let _editingId = null;  // id of the entry currently open in the inline editor
const _transcribing = new Set(); // ids whose voice note is being transcribed in the background

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

function fmtMMSS(sec) {
  const s = Math.max(0, Math.floor(sec));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

function stopRecorder() {
  if (!_rec) return;
  try { _rec.mr.stop(); } catch { /* ok */ }
  try { (_rec.stream.getTracks() || []).forEach((t) => t.stop()); } catch { /* ok */ }
  if (_rec.tick) clearInterval(_rec.tick);
  _rec = null;
}

export function journalScreen() {
  const app = document.getElementById('app');
  if (!app) return;
  coach.cancel(); // stop any book reading already in progress
  const prof = store.profile;
  const coachName = (getCharacter(prof.character) || {}).name || 'your coach';
  const entries = listEntries();

  const head = (e) => `<header class="journal-entry-head"><span class="journal-stamp">${esc(fmtStamp(e.ts))}</span><span class="journal-kind">${e.kind === 'voice' ? '\u{1F399} voice' : '✍ written'}</span></header>`;
  const entryHTML = (e) => {
    if (e.id === _editingId) {
      return `<article class="journal-entry" data-id="${esc(e.id)}">${head(e)}
        <textarea class="journal-compose journal-edit" id="journal-edit-${esc(e.id)}" rows="4" maxlength="4000" aria-label="Edit entry">${esc(e.text)}</textarea>
        <div class="journal-entry-actions">
          <button class="btn btn-primary journal-edit-save" data-id="${esc(e.id)}">Save</button>
          <button class="linkish journal-edit-cancel">Cancel</button>
        </div></article>`;
    }
    const busy = _transcribing.has(e.id);
    const body = e.text
      ? `<p class="journal-text">${esc(e.text)}</p>`
      : (busy ? '<p class="journal-text hint">Transcribing…</p>'
        : (e.audioKey ? `<p class="journal-text hint">Voice note${e.durationSec ? ' · ' + fmtMMSS(e.durationSec) : ''}</p>` : '<p class="journal-text hint">(empty)</p>'));
    return `<article class="journal-entry" data-id="${esc(e.id)}">${head(e)}
      ${body}
      <div class="journal-entry-actions">
        ${e.audioKey ? `<button class="linkish journal-play" data-id="${esc(e.id)}">▶ Play recording</button>` : ''}
        ${(e.audioKey && !e.text && !busy) ? `<button class="linkish journal-transcribe" data-id="${esc(e.id)}">Transcribe</button>` : ''}
        <button class="linkish journal-edit-btn" data-id="${esc(e.id)}">Edit</button>
        <button class="linkish journal-del" data-id="${esc(e.id)}">Delete</button>
      </div></article>`;
  };
  const bookHTML = entries.length
    ? entries.map(entryHTML).join('')
    : '<p class="hint">Your book is empty for now. Write your first entry above — it stays only on this device.</p>';

  app.innerHTML = `
    <header class="topbar"><a class="back" href="#you">← You</a><h1 class="page-title">Your journal</h1></header>
    <main class="narrow journal-screen">
      <section class="card">
        <p class="hint">A private place to think out loud. Write a few words and they become a book you can read — or hear read back to you in ${esc(coachName)}'s voice. Everything stays on this device.</p>
        <textarea id="journal-text" class="journal-compose" rows="4" maxlength="4000" placeholder="What is on your mind today?" aria-label="New journal entry"></textarea>
        <div class="journal-compose-actions">
          <button class="btn btn-primary" id="journal-save">Save entry</button>
          <button class="btn" id="journal-record">\u{1F399} Record a voice note</button>
          <span class="journal-rec-state" id="journal-rec-state" hidden><span class="journal-rec-dot">●</span> <span id="journal-rec-time">0:00</span></span>
        </div>
      </section>

      <section class="card">
        <div class="journal-book-head">
          <h2>Your book</h2>
          ${entries.length ? `<div class="journal-book-controls">
            <button class="btn btn-level" id="journal-listen">▶ Listen in ${esc(coachName)}'s voice</button>
            <button class="btn btn-level" id="journal-stop" hidden>■ Stop</button>
          </div>` : ''}
        </div>
        <p class="journal-now" id="journal-now" aria-live="polite"></p>
        <div class="journal-book">${bookHTML}</div>
      </section>

      <footer class="privacy-note"><p>\u{1F331} <strong>Private by design.</strong> Your journal — words and any recordings — lives only on this device and never leaves it.</p></footer>
    </main>`;

  // Stop the book audio if the user navigates away from the journal.
  if (_stopOnLeave) window.removeEventListener('hashchange', _stopOnLeave);
  _stopOnLeave = () => {
    if (location.hash !== '#journal') {
      coach.cancel();
      stopRecorder();
      if (_playUrl) { try { URL.revokeObjectURL(_playUrl); } catch { /* ok */ } _playUrl = null; }
      window.removeEventListener('hashchange', _stopOnLeave);
      _stopOnLeave = null;
    }
  };
  window.addEventListener('hashchange', _stopOnLeave);

  document.getElementById('journal-save').addEventListener('click', () => {
    const ta = document.getElementById('journal-text');
    if (addTextEntry(ta.value)) { ta.value = ''; journalScreen(); }
  });

  const listenBtn = document.getElementById('journal-listen');
  const stopBtn = document.getElementById('journal-stop');
  if (listenBtn) listenBtn.addEventListener('click', () => {
    const lines = bookOrder().map((e) => e.text).filter((t) => t && t.trim());
    if (!lines.length) return;
    coach.enabled = true; // an explicit request to hear the book
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

  // Voice recording. The mic stream + MediaRecorder are created only on this tap.
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
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      alertDialog('Microphone access was not granted. You can still write your entry.');
      return;
    }
    const chunks = [];
    let mr;
    try { mr = new MediaRecorder(stream); } catch {
      try { (stream.getTracks() || []).forEach((t) => t.stop()); } catch { /* ok */ }
      alertDialog('Recording could not start on this device. You can still write your entry.');
      return;
    }
    const startMs = Date.now();
    mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
    mr.onstop = async () => {
      const blob = new Blob(chunks, { type: mr.mimeType || 'audio/webm' });
      const dur = (Date.now() - startMs) / 1000;
      if (recState) recState.hidden = true;
      recBtn.textContent = '\u{1F399} Record a voice note';
      if (blob.size > 0) {
        const entry = await addVoiceEntry(blob, dur, '');
        journalScreen();
        // Auto-transcribe in the background (gated/on-device); if it cannot run, the
        // recording stays and the user can type or edit the text themselves.
        if (entry) transcribeEntry(entry.id);
      }
    };
    _rec = { mr, stream, startMs, tick: setInterval(() => { if (recTime) recTime.textContent = fmtMMSS((Date.now() - startMs) / 1000); }, 500) };
    mr.start();
    if (recState) recState.hidden = false;
    recBtn.textContent = '■ Stop & save';
  });

  // Play a voice entry's raw recording (date/time order is the book order).
  app.querySelectorAll('.journal-play').forEach((b) => b.addEventListener('click', async () => {
    const entry = listEntries().find((e) => e.id === b.dataset.id);
    const blob = await getEntryAudio(entry);
    if (!blob) { b.textContent = '⚠ recording unavailable'; return; }
    if (_playUrl) { try { URL.revokeObjectURL(_playUrl); } catch { /* ok */ } }
    _playUrl = URL.createObjectURL(blob);
    const audio = new Audio(_playUrl);
    audio.play().catch(() => {});
  }));

  // Edit the book — it is the user's to revise.
  app.querySelectorAll('.journal-edit-btn').forEach((b) => b.addEventListener('click', () => { _editingId = b.dataset.id; journalScreen(); }));
  const cancelBtn = document.querySelector('.journal-edit-cancel');
  if (cancelBtn) cancelBtn.addEventListener('click', () => { _editingId = null; journalScreen(); });
  const editSave = document.querySelector('.journal-edit-save');
  if (editSave) editSave.addEventListener('click', () => {
    const ta = document.getElementById('journal-edit-' + editSave.dataset.id);
    setEntryText(editSave.dataset.id, ta ? ta.value : '');
    _editingId = null;
    journalScreen();
  });

  // Transcribe a voice note to text on demand (gated, on-device).
  app.querySelectorAll('.journal-transcribe').forEach((b) => b.addEventListener('click', () => { transcribeEntry(b.dataset.id); }));

  app.querySelectorAll('.journal-del').forEach((b) => b.addEventListener('click', async () => {
    if (!await confirmDialog('Delete this entry? This cannot be undone.', { okText: 'Delete', cancelText: 'Keep', danger: true })) return;
    await removeEntry(b.dataset.id);
    journalScreen();
  }));
}
