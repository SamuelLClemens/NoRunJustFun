// The journal screen (#journal). Dynamically imported by the router only when first
// opened, so neither this UI nor its IndexedDB/recorder dependencies touch the boot
// path. S5a covers typed entries, the readable "book", and listening to the book in the
// chosen coach's voice (via the existing coach.speak); recording + transcription are
// layered on in later sub-slices. Everything stays on this device.

import { store } from './state.js';
import { coach } from './tts.js';
import { getCharacter } from './characters.js';
import { listEntries, bookOrder, addTextEntry, removeEntry } from './journal.js';

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

export function journalScreen() {
  const app = document.getElementById('app');
  if (!app) return;
  coach.cancel(); // stop any book reading already in progress
  const prof = store.profile;
  const coachName = (getCharacter(prof.character) || {}).name || 'your coach';
  const entries = listEntries();

  const bookHTML = entries.length
    ? entries.map((e) => `
        <article class="journal-entry" data-id="${esc(e.id)}">
          <header class="journal-entry-head">
            <span class="journal-stamp">${esc(fmtStamp(e.ts))}</span>
            <span class="journal-kind">${e.kind === 'voice' ? '\u{1F399} voice' : '✍ written'}</span>
          </header>
          ${e.text
            ? `<p class="journal-text">${esc(e.text)}</p>`
            : '<p class="journal-text hint">(voice entry — transcript coming)</p>'}
          <div class="journal-entry-actions">
            <button class="linkish journal-del" data-id="${esc(e.id)}">Delete</button>
          </div>
        </article>`).join('')
    : '<p class="hint">Your book is empty for now. Write your first entry above — it stays only on this device.</p>';

  app.innerHTML = `
    <header class="topbar"><a class="back" href="#you">← You</a><h1 class="page-title">Your journal</h1></header>
    <main class="narrow journal-screen">
      <section class="card">
        <p class="hint">A private place to think out loud. Write a few words and they become a book you can read — or hear read back to you in ${esc(coachName)}'s voice. Everything stays on this device.</p>
        <textarea id="journal-text" class="journal-compose" rows="4" maxlength="4000" placeholder="What is on your mind today?" aria-label="New journal entry"></textarea>
        <div class="journal-compose-actions">
          <button class="btn btn-primary" id="journal-save">Save entry</button>
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

  app.querySelectorAll('.journal-del').forEach((b) => b.addEventListener('click', async () => {
    if (!confirm('Delete this entry? This cannot be undone.')) return;
    await removeEntry(b.dataset.id);
    journalScreen();
  }));
}
