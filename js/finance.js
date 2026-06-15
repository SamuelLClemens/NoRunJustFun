// Back-compat shim. The finance ("Money Garden") domain logic now lives in the
// generic learning engine (js/learning.js); these thin re-exports bind it to the
// 'money' track so any pre-existing importer keeps working unchanged. New code
// should call the generic API in js/learning.js directly. Slated for removal once
// every call site has migrated.

import {
  ensureTrack,
  trackStreak,
  recordLessonComplete as _recordLesson,
  recordGameComplete as _recordGame,
  checkTrackBadges,
  finishLearning,
} from './learning.js';

export const ensureFinance = (store) => ensureTrack(store, 'money');
export const financeStreak = (store, today) => trackStreak(store, 'money', today);
export const recordLessonComplete = (store, opts) => _recordLesson(store, 'money', opts);
export const recordGameComplete = (store, opts) => _recordGame(store, 'money', opts);
export const checkFinanceBadges = (store) => checkTrackBadges(store, 'money');
export const finishFinance = (store, opts) => finishLearning(store, 'money', opts);
