// The meal-notes ledger. Deliberately the simplest possible thing: timestamped
// free-text notes in progress.meals[], its own ledger that NEVER touches sessions[]
// (so logging a meal never grows the garden or a run of days). By design it has NO
// nutrition numbers, no daily-completeness meter, no colour-coded judgments, and no
// run-of-days to keep — those manufacture exactly the compulsion this app avoids.
// Meals are a gentle way to notice patterns, nothing to score. All on-device.

import { store, save } from './state.js';

function uid() {
  try { if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID(); } catch { /* fall through */ }
  return 'm-' + new Date().getTime().toString(36) + '-' + Math.floor(Math.random() * 1e9).toString(36);
}

function ledger() {
  if (!Array.isArray(store.progress.meals)) store.progress.meals = [];
  return store.progress.meals;
}

// Newest first.
export function listMeals() {
  return ledger().slice().sort((a, b) => (a.ts < b.ts ? 1 : (a.ts > b.ts ? -1 : 0)));
}

export function addMeal(note) {
  const t = (note || '').trim();
  if (!t) return null;
  const entry = { id: uid(), ts: new Date().toISOString(), note: t };
  ledger().push(entry);
  save();
  return entry;
}

export function removeMeal(id) {
  const arr = ledger();
  const i = arr.findIndex((e) => e.id === id);
  if (i >= 0) { arr.splice(i, 1); save(); }
}
