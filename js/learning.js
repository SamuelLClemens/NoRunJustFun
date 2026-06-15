// Learning engine — generic domain logic for every "Mind" subject (money,
// parenting, communication, …). This is js/finance.js generalized over a trackId.
// All per-subject state lives in store.progress.learning[trackId]; badge award
// rules come from the registry (js/data/tracks.js) as data.
//
// Combined-activity rule (acceptance criterion 6): on completion a track pushes
// exactly ONE record into store.progress.sessions[] (with kind === trackId) so the
// SHARED garden + streak grow by one — exactly as meditation already does. It does
// this WITHOUT calling recordSession(), so totalMins, durationsTried, tiersTried,
// moveCounts and breathCloses are never touched: minutes-based levels and the
// fitness duration/move/time-of-day badges cannot be inflated by any learning track.
//
// This module never reaches the completion gate in main.js (learning routes through
// startLessonFor's onDone -> learningDone -> finishLearning, not finishSession), so
// no existing fitness/meditation code path changes.

import { save, todayKey } from './state.js';
import { streakInfo, checkBadges, gardenStage } from './gamify.js';
import { GARDEN_STAGE_SESSIONS } from './data/garden.js';
import { getTrack } from './data/tracks.js';

const blankTrack = () => ({ lessons: [], lessonsCompleted: 0, gamesWon: 0 });

// Defensive backfill (mirrors the old ensureFinance). state.js defaults()/migrate()
// already provide progress.learning for every load; this guards a store object
// built before a given track key existed and normalises a partial sub-object.
export function ensureTrack(store, trackId) {
  const p = store.progress;
  if (!p.learning || typeof p.learning !== 'object') p.learning = {};
  let t = p.learning[trackId];
  if (!t || typeof t !== 'object') { t = blankTrack(); p.learning[trackId] = t; }
  if (!Array.isArray(t.lessons)) t.lessons = [];
  if (typeof t.lessonsCompleted !== 'number') t.lessonsCompleted = 0;
  if (typeof t.gamesWon !== 'number') t.gamesWon = 0;
  return t;
}

// A track streak counts days on which a lesson or game in THAT subject was
// completed. Reuses the shared grace-day streak engine (any [{date}] array).
export function trackStreak(store, trackId, today = todayKey()) {
  return streakInfo(ensureTrack(store, trackId).lessons, today);
}

// Low-level writer: record one finished lesson into the track sub-store only.
// Does not grow the garden, check badges, or save — finishLearning orchestrates.
export function recordLessonComplete(store, trackId, { id, sources = 0 }) {
  const t = ensureTrack(store, trackId);
  t.lessons.push({ id, date: todayKey(), sources });
  t.lessonsCompleted += 1;
  return t;
}

// Low-level writer for an interactive game outcome (deferred feature; hooks ready).
export function recordGameComplete(store, trackId, { id, won = true }) {
  const t = ensureTrack(store, trackId);
  if (won) t.gamesWon += 1;
  t.lessons.push({ id, date: todayKey(), game: true, won });
  return t;
}

// Evaluate a track's badge conditions (from the registry) and award anything newly
// earned into the SHARED progress.badges{} ledger (set-if-unset idiom). Returns
// newly earned ids. Conditions read only this track's counters + its streak, so
// they are independent of the fitness garden/level math, and namespaced ids
// (fin-/par-/com-) can never collide across subjects.
export function checkTrackBadges(store, trackId) {
  const track = getTrack(trackId);
  if (!track) return [];
  const t = ensureTrack(store, trackId);
  const p = store.progress;
  const streak = trackStreak(store, trackId);
  const done = new Set(t.lessons.filter((l) => l && !l.game).map((l) => l.id));

  const cb = track.countBadges || {};
  const conditions = {};
  if (cb.first) conditions[cb.first] = t.lessonsCompleted >= 1;
  if (cb.three) conditions[cb.three] = t.lessonsCompleted >= 3;
  if (cb.seven) conditions[cb.seven] = t.lessonsCompleted >= 7;
  if (cb.streak3) conditions[cb.streak3] = streak.count >= 3;
  for (const [badgeId, lessonIds] of Object.entries(track.topicBadges || {})) {
    const need = lessonIds || [];
    // length>0 guard: [].every(...) is vacuously true, so a misconfigured empty
    // topicBadge would otherwise auto-award on the first completion.
    conditions[badgeId] = need.length > 0 && need.every((lid) => done.has(lid));
  }
  // game-win badges, keyed off this track's gamesWon counter
  const gb = track.gameBadges || {};
  if (gb.firstWin) conditions[gb.firstWin] = t.gamesWon >= 1;
  if (gb.fiveWins) conditions[gb.fiveWins] = t.gamesWon >= 5;

  const earned = [];
  for (const [id, ok] of Object.entries(conditions)) {
    if (ok && !p.badges[id]) {
      p.badges[id] = new Date().toISOString();
      earned.push(id);
    }
  }
  return earned;
}

// Orchestrator: call once when a track lesson/session or game completes. A session
// may cover one lesson (from the catalog) or several (a duration-scaled study
// session), so it accepts a list of lesson ids. Records each lesson, grows the
// shared garden by exactly ONE, awards track + shared consistency/garden badges,
// saves once, and returns the data a completion screen needs.
export function finishLearning(store, trackId, { lessonIds = [], durationKey = null, sources = 0, game = false, won = true } = {}) {
  ensureTrack(store, trackId);
  const ids = Array.isArray(lessonIds) ? lessonIds.filter(Boolean) : [lessonIds].filter(Boolean);
  // A non-game completion that covers zero lessons must not grow the shared garden
  // (which is per-completion) while crediting nothing to the track — that would
  // desync the shared and per-track views. Dormant with current content (a session
  // always fits >= 1 lesson), but a defensive guard against future content/config.
  if (!game && ids.length === 0) {
    return {
      earned: [], grew: false,
      stageAfter: gardenStage(store.progress.sessions.length, GARDEN_STAGE_SESSIONS),
      streak: streakInfo(store.progress.sessions),
      trackStreak: trackStreak(store, trackId),
    };
  }
  const stageBefore = gardenStage(store.progress.sessions.length, GARDEN_STAGE_SESSIONS);

  // 1) track-specific progress — one ledger entry per lesson covered
  if (game) recordGameComplete(store, trackId, { id: ids[0] || (trackId + '-game'), won });
  else ids.forEach((lid) => recordLessonComplete(store, trackId, { id: lid, sources }));

  // 2) ONE shared garden/streak record per completion — combined activity
  //    (criterion 6), zero minutes so levels are not inflated. Deliberately
  //    bypasses recordSession so durationsTried/tiersTried/totalMins/moveCounts/
  //    breathCloses stay untouched, however many lessons the session covered.
  store.progress.sessions.push({
    date: todayKey(),
    mins: 0,
    durationKey,
    // startHour deliberately omitted: checkBadges reads last.startHour for the
    // movement-themed early-bird/night-owl badges, and undefined < 8 / >= 21 are
    // both false — so a learning lesson never earns those fitness time-of-day badges.
    breathClose: false,
    completed: [],
    skipped: [],
    tier: null,
    kind: game ? trackId + '-game' : trackId,
    lessonIds: ids,
  });

  // 3) badges — this track's distinct set plus the shared consistency/garden
  //    milestones (a unified reward ecosystem). checkBadges only reaches
  //    count/streak/garden conditions for learning; minutes/duration/move badges
  //    cannot trigger because learning touched none of their inputs.
  const earnedTrack = checkTrackBadges(store, trackId);
  const earnedShared = checkBadges(store, GARDEN_STAGE_SESSIONS);
  save();

  const stageAfter = gardenStage(store.progress.sessions.length, GARDEN_STAGE_SESSIONS);
  return {
    earned: [...earnedTrack, ...earnedShared],
    grew: stageAfter > stageBefore,
    stageAfter,
    streak: streakInfo(store.progress.sessions),
    trackStreak: trackStreak(store, trackId),
  };
}
