// Finance module — domain logic for the Money Garden (educational financial
// lessons and, later, games). Mirrors the gamify.js idioms but keeps all
// finance-specific state in store.progress.finance.
//
// Combined-activity rule (acceptance criterion 6): on completion, finance pushes
// exactly ONE kind:'finance' record into store.progress.sessions[] so the SHARED
// garden + streak grow by one — exactly as meditation already does. It does this
// WITHOUT calling recordSession(), so totalMins, durationsTried, tiersTried,
// moveCounts and breathCloses are never touched: minutes-based levels and the
// fitness duration/move badges cannot be inflated by finance. (The fitness
// 'all-durations' badge keys off durationsTried, which finance leaves alone.)
//
// This module never reaches the completion gate in main.js (finance routes
// through finishFinance, not finishSession), so no existing code path changes.

import { save, todayKey } from './state.js';
import { streakInfo, checkBadges, gardenStage } from './gamify.js';
import { GARDEN_STAGE_SESSIONS } from './data/garden.js';
import { FINANCE_BADGES } from './data/badges.finance.js';

// Defensive backfill. state.js defaults() already provides this for every load
// via migrate()'s spread; this guards any store object built before the field
// existed and normalises a partially-shaped sub-object.
export function ensureFinance(store) {
  const p = store.progress;
  if (!p.finance || typeof p.finance !== 'object') {
    p.finance = { lessons: [], lessonsCompleted: 0, gamesWon: 0 };
  }
  if (!Array.isArray(p.finance.lessons)) p.finance.lessons = [];
  if (typeof p.finance.lessonsCompleted !== 'number') p.finance.lessonsCompleted = 0;
  if (typeof p.finance.gamesWon !== 'number') p.finance.gamesWon = 0;
  return p.finance;
}

// A finance streak counts days on which a finance lesson or game was completed.
// Reuses the shared grace-day streak engine, which accepts any [{date}] array.
export function financeStreak(store, today = todayKey()) {
  return streakInfo(ensureFinance(store).lessons, today);
}

// Low-level writer: record one finished lesson into the finance sub-store only.
// Does not grow the garden, check badges, or save — finishFinance orchestrates.
export function recordLessonComplete(store, { id, sources = 0 }) {
  const f = ensureFinance(store);
  f.lessons.push({ id, date: todayKey(), sources });
  f.lessonsCompleted += 1;
  return f;
}

// Low-level writer for an interactive finance game outcome (used in a later
// phase). Recorded into the finance ledger; finishFinance grows the garden.
export function recordGameComplete(store, { id, won = true }) {
  const f = ensureFinance(store);
  if (won) f.gamesWon += 1;
  f.lessons.push({ id, date: todayKey(), game: true, won });
  return f;
}

// Evaluate finance badge conditions and award anything newly earned into the
// SHARED progress.badges{} ledger (set-if-unset idiom). Returns newly earned
// ids in declaration order. Conditions read only finance counters + the finance
// streak, so they are independent of the fitness garden/level math.
export function checkFinanceBadges(store) {
  const f = ensureFinance(store);
  const p = store.progress;
  const streak = financeStreak(store);
  // ids of lessons (not games) the user has completed, for topic badges
  const done = new Set(f.lessons.filter((l) => l && !l.game).map((l) => l.id));
  const conditions = {
    'fin-first-lesson': f.lessonsCompleted >= 1,
    'fin-three': f.lessonsCompleted >= 3,
    'fin-seven': f.lessonsCompleted >= 7,
    'fin-streak-3': streak.count >= 3,
    'fin-budgeter': done.has('budgeting'),
    'fin-compounder': done.has('compound-growth'),
    'fin-landlord': done.has('property-basics'),
  };
  const earned = [];
  for (const [id, ok] of Object.entries(conditions)) {
    if (ok && !p.badges[id]) {
      p.badges[id] = new Date().toISOString();
      earned.push(id);
    }
  }
  return earned;
}

// Orchestrator: call once when a finance lesson/session or game completes. A
// session may cover one lesson (from the catalog) or several (a duration-scaled
// study session), so it accepts a list of lesson ids. Records each lesson, grows
// the shared garden by exactly ONE, awards finance + shared consistency/garden
// badges, saves once, and returns the data a completion screen needs.
export function finishFinance(store, { lessonIds = [], durationKey = null, sources = 0, game = false, won = true } = {}) {
  ensureFinance(store);
  const ids = Array.isArray(lessonIds) ? lessonIds.filter(Boolean) : [lessonIds].filter(Boolean);
  const stageBefore = gardenStage(store.progress.sessions.length, GARDEN_STAGE_SESSIONS);

  // 1) finance-specific progress — one ledger entry per lesson covered
  if (game) recordGameComplete(store, { id: ids[0] || 'finance-game', won });
  else ids.forEach((lid) => recordLessonComplete(store, { id: lid, sources }));

  // 2) ONE shared garden/streak record per completion — combined activity
  //    (criterion 6), zero minutes so levels are not inflated. Deliberately
  //    bypasses recordSession so durationsTried/tiersTried/totalMins/moveCounts/
  //    breathCloses stay untouched, however many lessons the session covered.
  store.progress.sessions.push({
    date: todayKey(),
    mins: 0,
    durationKey,
    // startHour is deliberately omitted: checkBadges reads last.startHour for the
    // movement-themed early-bird/night-owl badges, and undefined < 8 / >= 21 are
    // both false — so a finance lesson never earns those fitness time-of-day badges.
    breathClose: false,
    completed: [],
    skipped: [],
    tier: null,
    kind: game ? 'finance-game' : 'finance',
    lessonIds: ids,
  });

  // 3) badges — the distinct finance set plus the shared consistency/garden
  //    milestones (a unified reward ecosystem). checkBadges only reaches
  //    count/streak/garden conditions for finance; minutes/duration/move badges
  //    cannot trigger because finance touched none of their inputs.
  const earnedFinance = checkFinanceBadges(store);
  const earnedShared = checkBadges(store, GARDEN_STAGE_SESSIONS);
  save();

  const stageAfter = gardenStage(store.progress.sessions.length, GARDEN_STAGE_SESSIONS);
  return {
    earned: [...earnedFinance, ...earnedShared],
    grew: stageAfter > stageBefore,
    stageAfter,
    streak: streakInfo(store.progress.sessions),
    financeStreak: financeStreak(store),
  };
}
