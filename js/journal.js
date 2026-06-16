// The on-device journal ledger. Entries live in progress.journal[] — a top-level
// ledger, exactly like progress.weights[], that NEVER touches progress.sessions[]. That
// isolation is deliberate: the garden grows on sessions.length and the streak on the set
// of session dates (see js/gamify.js), so journaling must not write a session record or
// it would silently inflate both. Journaling is reflection, not a tracked "activity".
//
// A text entry keeps its words in localStorage. A voice entry keeps its audio Blob in
// IndexedDB (js/idb.js, keyed by audioKey) and only lightweight metadata here, because
// the single localStorage store is ~5 MB and cannot hold audio at scale.

import { store, save } from './state.js';
import { putAudio, getAudio, deleteAudio } from './idb.js';

function uid() {
  try { if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID(); } catch { /* fall through */ }
  return 'j-' + new Date().getTime().toString(36) + '-' + Math.floor(Math.random() * 1e9).toString(36);
}

function ledger() {
  if (!Array.isArray(store.progress.journal)) store.progress.journal = [];
  return store.progress.journal;
}

// Newest first — the order the journal screen lists entries in.
export function listEntries() {
  return ledger().slice().sort((a, b) => (a.ts < b.ts ? 1 : (a.ts > b.ts ? -1 : 0)));
}

// Oldest first — the order the "book" is read/listened to in.
export function bookOrder() {
  return ledger().slice().sort((a, b) => (a.ts > b.ts ? 1 : (a.ts < b.ts ? -1 : 0)));
}

export function addTextEntry(text) {
  const t = (text || '').trim();
  if (!t) return null;
  const entry = { id: uid(), ts: new Date().toISOString(), kind: 'text', text: t };
  ledger().push(entry);
  save();
  return entry;
}

// A voice entry: store the recorded Blob in IndexedDB, keep metadata (and any transcript
// produced later by the on-device STT) in the ledger. If IndexedDB is unavailable the
// entry is still recorded (text/transcript only) so nothing is lost.
export async function addVoiceEntry(blob, durationSec, transcript) {
  const id = uid();
  const audioKey = 'audio-' + id;
  let stored = false;
  if (blob) { try { await putAudio(audioKey, blob); stored = true; } catch { /* keep text-only */ } }
  const entry = {
    id, ts: new Date().toISOString(), kind: 'voice',
    text: (transcript || '').trim(),
    audioKey: stored ? audioKey : '',
    durationSec: Math.round(durationSec || 0),
  };
  ledger().push(entry);
  save();
  return entry;
}

// Attach/replace a transcript on an existing entry (used by the on-device STT pass).
export function setTranscript(id, text) {
  const e = ledger().find((x) => x.id === id);
  if (!e) return;
  e.text = (text || '').trim();
  save();
}

export async function getEntryAudio(entry) {
  if (!entry || !entry.audioKey) return null;
  try { return await getAudio(entry.audioKey); } catch { return null; }
}

export async function removeEntry(id) {
  const arr = ledger();
  const i = arr.findIndex((e) => e.id === id);
  if (i < 0) return;
  const e = arr[i];
  if (e.audioKey) { try { await deleteAudio(e.audioKey); } catch { /* ok */ } }
  arr.splice(i, 1);
  save();
}
