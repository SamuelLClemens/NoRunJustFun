// The Mind learning screens — a generic subject hub and the lesson completion
// screen, driven entirely by the track registry (js/data/tracks.js). This is
// js/finance-screen.js generalized over a trackId. Imports ONLY data/logic
// modules (never main.js), and navigates by setting location.hash, so there is
// no circular dependency. main.js owns the router and the avatar/Player wiring;
// it imports trackHubScreen() for the #learn-<track> route and learningDone() as
// the lesson's onDone handler.

import { store, save } from './state.js';
import { naturalVoice } from './natural-voice.js';
import { finishLearning, trackStreak, recordQuiz, recordConceptQuiz, QUIZ_PASS, EXAM_PASS } from './learning.js';
import { gardenStage } from './gamify.js';
import { gardenSVG, GARDEN_STAGE_SESSIONS } from './data/garden.js';
import { BADGES } from './data/badges.js';
import { getTrack, allTrackBadges } from './data/tracks.js';
import { DURATIONS } from './data/tiers.js';
import { buildQuiz } from './data/games.shared.js';
import { celebrate } from './confetti.js';
import { sound } from './audio.js';

// Tiered celebration: the better the moment, the bigger the party. tier 0 = gentle,
// 1 = a normal win, 2 = a big win (quiz 100% / subject completed). Stacks bursts of
// the existing confetti + sound so it reads as "more exciting" without new assets.
function party(tier = 1) {
  if (tier <= 0) { celebrate(1400); return; }
  if (tier === 1) { celebrate(2000); try { sound.sparkle(); } catch { /* sfx optional */ } return; }
  celebrate(3400);
  try { sound.sparkle(); } catch { /* sfx optional */ }
  setTimeout(() => { celebrate(2600); try { sound.sparkle(); } catch { /* sfx optional */ } }, 450);
  setTimeout(() => celebrate(2000), 1000);
}

const app = document.getElementById('app');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Defense in depth: only ever emit http(s) hrefs. Today every source URL is a
// hardcoded constant, but this guards against any future dynamic source.
const safeUrl = (u) => (/^https?:\/\//i.test(String(u)) ? String(u) : '#');
const fmtDate = (iso) => { try { return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); } catch { return ''; } };

function lessonDone(trackId, id) {
  const tracks = store.progress.learning || {};
  const lessons = (tracks[trackId] && tracks[trackId].lessons) || [];
  return lessons.some((l) => l.id === id && !l.game);
}

// ---------------------------------------------------------------- hub

export function trackHubScreen(trackId) {
  const track = getTrack(trackId);
  if (!track) { location.hash = '#'; return; }
  const stage = gardenStage(store.progress.sessions.length, GARDEN_STAGE_SESSIONS);
  const ts = trackStreak(store, trackId);
  const label = esc(track.homeLabel.toLowerCase());

  const durationBtns = DURATIONS.map((m) =>
    `<button class="duration-btn" data-mins="${m}"><span class="d-num">${m}</span><span class="d-label">MIN</span></button>`).join('');

  const naturalOn = !!store.profile.naturalOn;
  const voiceCard = naturalOn
    ? `<p class="fin-voice-on">🔊 Lifelike voice is on — your coach narrates on your device, and captions are always on too.</p>`
    : `<section class="card fin-voice"><p>Want the warmest, most lifelike narration? Turn on the natural voice — a one-time download that then runs entirely on your device. Captions stay on either way.</p><button class="btn btn-primary" id="fin-voice-on">🔊 Use the lifelike voice</button></section>`;

  const lessonCards = track.lessons.LESSON_LIBRARY.map((L) => {
    const done = lessonDone(trackId, L.id);
    return `<button class="fin-lib-btn" data-lesson="${esc(L.id)}">
      <span class="fin-lib-ic">${track.theme.lessonIcon}</span>
      <span class="fin-lib-txt"><strong>${esc(L.title)}</strong><small>${esc(L.blurb)}</small></span>
      <span class="fin-lib-meta">
        <span class="fin-mins">${L.minutes} min</span>
        <span class="fin-src-pill">${L.sourceCount} source${L.sourceCount === 1 ? '' : 's'}</span>
        ${done ? '<span class="fin-done-tag">✓ done</span>' : ''}
      </span>
    </button>`;
  }).join('');

  const gamesHTML = (track.games && track.games.length) ? track.games.map((g) =>
    `<button class="fin-lib-btn" data-game="${esc(g.id)}">
      <span class="fin-lib-ic" aria-hidden="true">${g.icon}</span>
      <span class="fin-lib-txt"><strong>${esc(g.name)}</strong><small>${esc(g.blurb)}</small></span>
      <span class="fin-lib-meta"><span class="fin-mins">Play →</span></span>
    </button>`).join('') : '';

  const tk = store.progress.learning[trackId] || {};
  const examBest = tk.quizBest || 0;
  const completedAt = tk.completedAt || null;
  const quizHTML = `
      <section class="card fin-quiz${completedAt ? ' is-complete' : ''}">
        <h2>${completedAt ? '✓ Subject completed' : 'Final exam'}</h2>
        <p class="hint">${completedAt
          ? 'You passed the ' + label + ' final exam. Review or retake it anytime.'
          : 'A longer test across every lesson in this subject. Score ' + EXAM_PASS + '% or above to pass and complete the subject.'}</p>
        <p class="fin-quiz-status">${examBest > 0 ? 'Best score: <strong>' + examBest + '%</strong>' : 'Not attempted yet.'}${completedAt ? ' · <span class="fin-done-tag">✓ Completed ' + esc(fmtDate(completedAt)) + '</span>' : ''}</p>
        <button class="btn btn-primary" id="fin-quiz-btn">${completedAt ? 'Retake the final exam' : 'Take the final exam'}</button>
      </section>`;

  // Per-concept quizzes — one short quiz per lesson, passed at 60%+ (✓ at 100%).
  const cq = tk.conceptQuiz || {};
  const cqTotal = track.lessons.LESSON_LIBRARY.length;
  const cqPassed = track.lessons.LESSON_LIBRARY.filter((L) => (cq[L.id] || 0) >= QUIZ_PASS).length;
  const conceptQuizCards = track.lessons.LESSON_LIBRARY.map((L) => {
    const best = cq[L.id] || 0;
    const meta = best >= 100 ? '<span class="fin-done-tag">✓ 100%</span>'
      : (best >= QUIZ_PASS ? '<span class="fin-done-tag">✓ ' + best + '%</span>'
      : (best > 0 ? '<span class="fin-mins">best ' + best + '%</span>' : '<span class="fin-mins">Quiz →</span>'));
    return `<button class="fin-lib-btn" data-cquiz="${esc(L.id)}">
      <span class="fin-lib-ic" aria-hidden="true">📝</span>
      <span class="fin-lib-txt"><strong>${esc(L.title)}</strong><small>Quiz the key ideas of this lesson</small></span>
      <span class="fin-lib-meta">${meta}</span>
    </button>`;
  }).join('');
  const conceptQuizHTML = `
      <section class="card">
        <details class="fin-lib-details">
          <summary class="fin-lib-summary">
            <span class="fin-lib-summary-txt"><strong>Quiz each concept</strong><small><strong>${cqPassed}/${cqTotal} quizzes passed</strong> · one short quiz per lesson, pass at ${QUIZ_PASS}%.</small></span>
            <span class="fin-lib-chevron" aria-hidden="true">▾</span>
          </summary>
          <div class="fin-lib" id="fin-cquiz">${conceptQuizCards}</div>
        </details>
      </section>`;

  const tipsHTML = (track.expertTips && track.expertTips.length) ? `
      <section class="card fin-tips">
        <h2>Expert tips</h2>
        <ul class="tip-list">${track.expertTips.map((t) => `<li><span class="tip-from">${esc(t.from)}</span><span class="tip-text">${esc(t.tip)}</span></li>`).join('')}</ul>
      </section>` : '';

  const topTakeHTML = (track.topTakeaways && track.topTakeaways.length) ? `
      <section class="card fin-toptake">
        <h2>Key takeaways</h2>
        <ul class="takeaway-list">${track.topTakeaways.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      </section>` : '';

  app.innerHTML = `
    <header class="topbar">
      <a class="back" href="${esc(track.hubBack || '#mind')}">← Back</a>
      <h1 class="page-title finance-hero">${track.theme.flowerSVG()} ${esc(track.name)}</h1>
    </header>
    <main class="narrow finance-section" data-track="${esc(trackId)}">
      <div class="fin-banner">
        <span class="fin-info" aria-hidden="true">🌱</span>
        <span>${esc(track.disclaimerShort)}</span>
      </div>

      <section class="card center">
        <div class="garden-svg small">${gardenSVG(stage)}</div>
        <p class="hint">Workouts, meditations, and ${label} lessons all grow the same garden.${ts.count > 1 ? ` You have learned on <strong>${ts.count} days</strong> in a row.` : ''}</p>
      </section>

      ${voiceCard}

      <section class="card">
        <h2>Learn a little today</h2>
        <p class="hint">Pick how long you have — your coach ${esc(track.coachCue)} and teaches you, scaled to fit.</p>
        <div class="duration-grid" id="fin-durations">${durationBtns}</div>
      </section>

      <section class="card">
        <details class="fin-lib-details">
          <summary class="fin-lib-summary">
            <span class="fin-lib-summary-txt"><strong>Or pick a topic</strong><small>Browse all ${track.lessons.LESSON_LIBRARY.length} lessons — open it when you want, tuck it away when you don't.</small></span>
            <span class="fin-lib-chevron" aria-hidden="true">▾</span>
          </summary>
          <div class="fin-lib" id="fin-library">${lessonCards}</div>
        </details>
      </section>

      ${conceptQuizHTML}

      ${quizHTML}

      ${gamesHTML ? `<section class="card">
        <h2>Play a game</h2>
        <p class="hint">${esc(track.gamesBlurb || 'Quick, playful practice — a fun way to lock in what the lessons teach.')}</p>
        <div class="fin-lib" id="fin-games">${gamesHTML}</div>
      </section>` : ''}

      ${tipsHTML}
      ${topTakeHTML}

      <p class="privacy-note"><a href="#badges">See your ${label} badges →</a></p>
    </main>`;

  document.querySelectorAll('#fin-durations .duration-btn').forEach((b) =>
    b.addEventListener('click', () => { location.hash = '#learn-' + trackId + '-' + b.dataset.mins; }));
  document.querySelectorAll('#fin-library .fin-lib-btn').forEach((b) =>
    b.addEventListener('click', () => { location.hash = '#learn-' + trackId + '-lib-' + b.dataset.lesson; }));
  document.querySelectorAll('#fin-cquiz .fin-lib-btn').forEach((b) =>
    b.addEventListener('click', () => { location.hash = '#learn-' + trackId + '-cquiz-' + b.dataset.cquiz; }));
  document.querySelectorAll('#fin-games .fin-lib-btn').forEach((b) =>
    b.addEventListener('click', () => { location.hash = '#learn-' + trackId + '-game-' + b.dataset.game; }));
  const qbtn = document.getElementById('fin-quiz-btn');
  if (qbtn) qbtn.addEventListener('click', () => { location.hash = '#learn-' + trackId + '-quiz'; });
  const vbtn = document.getElementById('fin-voice-on');
  if (vbtn) vbtn.addEventListener('click', () => {
    store.profile.naturalOn = true; save();
    try { naturalVoice.enable(); } catch { /* system voice + captions cover it */ }
    trackHubScreen(trackId);
  });
}

// ---------------------------------------------------------------- completion

// Called from main.js as the lesson plan's onDone handler. main.js has already
// torn down the avatar/Player and rewritten the hash to #learn-<track>. Here we
// record the completion (finishLearning grows the garden + awards badges), then
// render the celebration with the sources list and a readable transcript.
export function learningDone(trackId, plan) {
  const track = getTrack(trackId);
  const allBadges = [...BADGES, ...allTrackBadges()];

  const result = finishLearning(store, trackId, {
    lessonIds: plan.lessonIds || [],
    durationKey: plan.durationKey || null,
    sources: (plan.sources && plan.sources.length) || 0,
  });

  party(result.earned.length ? 2 : 1);

  const label = track ? esc(track.homeLabel.toLowerCase()) : 'the';
  const learned = (plan.lessonTitles && plan.lessonTitles.length)
    ? plan.lessonTitles.map((t) => esc(t)).join(', ')
    : `some ${label} basics`;

  const badgeCards = result.earned.map((id) => {
    const b = allBadges.find((x) => x.id === id);
    return b ? `<div class="badge-pop">${b.icon}<div><strong>${esc(b.name)}</strong><br><small>${esc(b.desc)}</small></div></div>` : '';
  }).join('');

  const takeawayGroups = (plan.takeawayGroups || []).filter((g) => g && g.points && g.points.length);
  const multi = takeawayGroups.length > 1;
  const takeawaysHTML = takeawayGroups.length ? `
    <section class="card fin-takeaways">
      <h3>✦ Major takeaways</h3>
      <p class="hint">The key points to carry with you from ${multi ? 'these lessons' : 'this lesson'}.</p>
      ${takeawayGroups.map((g) => `
        <div class="takeaway-group">
          ${multi ? `<h4>${esc(g.title)}</h4>` : ''}
          <ul class="takeaway-list">${g.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        </div>`).join('')}
    </section>` : '';

  const sources = (plan.sources || []);
  const sourcesHTML = sources.length ? `
    <section class="card fin-sources">
      <h3>Where this comes from</h3>
      <p class="hint">Educational sources, not advice. Figures are labelled with the year they apply to.</p>
      <ul>${sources.map((s) => `<li>${esc(s.org)} — <a href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>${s.year ? ` <span class="fin-year">(${esc(s.year)})</span>` : ''}</li>`).join('')}</ul>
    </section>` : '';

  const transcriptHTML = (plan.items && plan.items.length) ? `
    <section class="card fin-transcript">
      <details>
        <summary>Read what your coach said</summary>
        ${plan.items.map((it) => `<p><span class="fin-seg-name">${esc(it.ex.name)}:</span> ${esc(it.ex.why)}</p>`).join('')}
      </details>
    </section>` : '';

  const doneHeading = (track && track.doneHeading) || 'Lesson complete. 🌼';
  const disclaimer = (track && track.disclaimer) || '';

  app.innerHTML = `
    <main class="narrow done-screen" data-track="${esc(trackId)}">
      <section class="card center">
        <div class="garden-svg small">${gardenSVG(result.stageAfter)}</div>
        <h2>${esc(doneHeading)}</h2>
        <p class="done-stats">You learned about <strong>${learned}</strong> · learning streak <strong>${result.trackStreak.count} day${result.trackStreak.count === 1 ? '' : 's'}</strong></p>
        ${result.grew ? '<p class="grew">Your garden just grew. Go look at it.</p>' : ''}
        ${badgeCards ? `<div class="badge-pops"><h3>New badge${result.earned.length > 1 ? 's' : ''}!</h3>${badgeCards}</div>` : ''}
        <button class="btn btn-primary" id="btn-learn-home">Back to ${label} lessons</button>
        ${(plan.lessonIds && plan.lessonIds.length) ? '<button class="btn" id="btn-concept-quiz">Check what you learned</button>' : ''}
      </section>
      ${takeawaysHTML}
      ${sourcesHTML}
      ${transcriptHTML}
      ${disclaimer ? `<div class="fin-banner"><span class="fin-info" aria-hidden="true">🌱</span><span>${esc(disclaimer)}</span></div>` : ''}
    </main>`;

  document.getElementById('btn-learn-home').addEventListener('click', () => { location.hash = '#learn-' + trackId; });
  const cqBtn = document.getElementById('btn-concept-quiz');
  if (cqBtn) cqBtn.addEventListener('click', () => { location.hash = '#learn-' + trackId + '-cquiz-' + plan.lessonIds[0]; });
}

// ---------------------------------------------------------------- games

// Mount a track's interactive game (e.g. memory). The game module renders its own
// UI and calls back when finished; we then record the outcome and show a result.
// Games are quick, tap-based, and dependency-free (see js/data/games.memory.js).
export function gameScreen(trackId, gameId) {
  const track = getTrack(trackId);
  const game = track && track.games && track.games.find((g) => g.id === gameId);
  if (!game) { location.hash = '#learn-' + trackId; return; }
  app.innerHTML = `
    <header class="topbar">
      <a class="back" href="#learn-${esc(trackId)}">← Back</a>
      <h1 class="page-title finance-hero">${esc(game.name)}</h1>
    </header>
    <main class="narrow finance-section game-screen" data-track="${esc(trackId)}">
      <div id="game-mount"></div>
    </main>`;
  const mount = document.getElementById('game-mount');
  let finished = false;
  const el = game.build((result) => {
    if (finished) return;
    finished = true;
    gameDone(trackId, game, result || {});
  });
  mount.appendChild(el);
}

function gameDone(trackId, game, result) {
  const track = getTrack(trackId);
  const allBadges = [...BADGES, ...allTrackBadges()];
  // lessonIds carries the specific game id so the ledger records 'match'/'sequence'
  // (not the generic fallback). Game entries are filtered out of the topic-badge set,
  // and game-win badges key off gamesWon, so this never affects badge awards.
  const r = finishLearning(store, trackId, { game: true, lessonIds: [game.id], won: !!result.won });
  party(r.earned.length ? 2 : (result.won ? 1 : 0));

  const badgeCards = r.earned.map((id) => {
    const b = allBadges.find((x) => x.id === id);
    return b ? `<div class="badge-pop">${b.icon}<div><strong>${esc(b.name)}</strong><br><small>${esc(b.desc)}</small></div></div>` : '';
  }).join('');

  const emoji = (track && track.theme && track.theme.badgeEmoji) || '🌱';
  const heading = result.won ? (game.win || ('Nicely done! ' + emoji)) : 'Good effort! 🌱';
  app.innerHTML = `
    <main class="narrow done-screen" data-track="${esc(trackId)}">
      <section class="card center">
        <div class="garden-svg small">${gardenSVG(r.stageAfter)}</div>
        <h2>${esc(heading)}</h2>
        <p class="done-stats"><strong>${esc(game.name)}</strong>${result.label ? ' · ' + esc(result.label) : ''}</p>
        ${r.grew ? '<p class="grew">Your garden just grew. Go look at it.</p>' : ''}
        ${badgeCards ? `<div class="badge-pops"><h3>New badge${r.earned.length > 1 ? 's' : ''}!</h3>${badgeCards}</div>` : ''}
        <div class="game-done-btns">
          <button class="btn btn-primary" id="btn-game-again">Play again</button>
          <button class="btn" id="btn-game-home">Back to ${esc(track ? track.homeLabel.toLowerCase() : 'lessons')}</button>
        </div>
      </section>
    </main>`;
  document.getElementById('btn-game-again').addEventListener('click', () => gameScreen(trackId, game.id));
  document.getElementById('btn-game-home').addEventListener('click', () => { location.hash = '#learn-' + trackId; });
}

// ---------------------------------------------------------------- quiz

// Build the per-subject FINAL EXAM — one longer test across the WHOLE subject. It is
// grounded the same way as the concept quizzes (each question's correct answer is a real
// lesson takeaway; distractors come from other lessons), with one question per lesson,
// PLUS any hand-authored subject-quiz questions for extra depth. Capped so it stays a
// focused exam, but it is always longer than a single per-concept quiz. Works for every
// subject, including Crystals and Dreams (which carry no authored quiz).
function allLessonTakeaways(track) {
  const out = [];
  for (const L of track.lessons.LESSON_LIBRARY) {
    const pts = lessonTakeaways(track, L.id);
    if (pts.length) out.push({ title: L.title, points: pts });
  }
  return out;
}
function buildFinalExam(track) {
  const entries = allLessonTakeaways(track);
  if (!entries.length) return track.quiz || null;
  const allPoints = entries.flatMap((e) => e.points);
  const grounded = [];
  for (const e of entries) {
    const distractors = pickDistinct(allPoints, 3, e.points);
    if (distractors.length < 2) continue;
    grounded.push({
      prompt: 'Which idea does “' + e.title + '” teach?',
      options: [{ text: e.points[0], correct: true, feedback: 'Correct — a key idea from “' + e.title + '.”' }]
        .concat(distractors.map((d) => ({ text: d, correct: false, feedback: 'That belongs to a different lesson.' }))),
    });
  }
  const authored = (track.quiz && track.quiz.rounds) || [];
  let rounds = authored.concat(grounded);
  const MAX = 20;                                  // long enough to test the whole subject, not endless
  if (rounds.length > MAX) rounds = rounds.slice(0, MAX);
  return { intro: 'Final exam — a longer test across everything in ' + track.homeLabel + '. Pass at ' + EXAM_PASS + '%.',
    rounds, winThreshold: Math.max(1, Math.ceil(rounds.length * EXAM_PASS / 100)) };
}

// The per-subject FINAL EXAM screen. Reuses the quiz game engine; on finish it records the
// score (best % tracked) and the FIRST pass (60%+) stamps completedAt — the subject is
// "completed", reviewable and retakeable, but the date sticks.
export function quizScreen(trackId) {
  const track = getTrack(trackId);
  if (!track || !track.lessons) { location.hash = '#learn-' + trackId; return; }
  const exam = buildFinalExam(track);
  if (!exam || !exam.rounds || !exam.rounds.length) { location.hash = '#learn-' + trackId; return; }
  app.innerHTML = `
    <header class="topbar">
      <a class="back" href="#learn-${esc(trackId)}">← Back</a>
      <h1 class="page-title finance-hero">${esc(track.homeLabel)} final exam</h1>
    </header>
    <main class="narrow finance-section game-screen" data-track="${esc(trackId)}">
      <div id="game-mount"></div>
    </main>`;
  const mount = document.getElementById('game-mount');
  let finished = false;
  const el = buildQuiz(exam, (result) => {
    if (finished) return;
    finished = true;
    quizDone(trackId, exam.rounds.length, result || {});
  });
  mount.appendChild(el);
}

function quizDone(trackId, total, result) {
  const track = getTrack(trackId);
  const allBadges = [...BADGES, ...allTrackBadges()];
  const score = result.score || 0;
  const r = recordQuiz(store, trackId, { score, total });
  const passed = r.pct >= EXAM_PASS;

  // Tiered celebration: passing (subject completed) is the biggest party.
  party(r.justCompleted ? 2 : (passed ? 1 : 0));

  const heading = passed
    ? (r.justCompleted ? '🎉 ' + esc(track.homeLabel) + ' completed!' : 'Passed! 🎉')
    : 'Not quite — review and try again.';

  const badgeCards = r.earned.map((id) => {
    const b = allBadges.find((x) => x.id === id);
    return b ? `<div class="badge-pop">${b.icon}<div><strong>${esc(b.name)}</strong><br><small>${esc(b.desc)}</small></div></div>` : '';
  }).join('');

  const completedAt = (store.progress.learning[trackId] || {}).completedAt;
  app.innerHTML = `
    <main class="narrow done-screen" data-track="${esc(trackId)}">
      <section class="card center">
        <div class="garden-svg small">${gardenSVG(r.stageAfter)}</div>
        <h2>${heading}</h2>
        <p class="done-stats">You scored <strong>${r.pct}%</strong> · ${score} of ${total} · best <strong>${r.best}%</strong></p>
        ${passed ? '' : '<p class="hint">Score ' + EXAM_PASS + '% or above to pass the final exam — you can retake it as many times as you like.</p>'}
        ${completedAt ? `<p class="grew">✓ ${esc(track.homeLabel)} completed ${esc(fmtDate(completedAt))}.</p>` : ''}
        ${r.grew ? '<p class="grew">Your garden just grew. Go look at it.</p>' : ''}
        ${badgeCards ? `<div class="badge-pops"><h3>New badge${r.earned.length > 1 ? 's' : ''}!</h3>${badgeCards}</div>` : ''}
        <div class="game-done-btns">
          <button class="btn btn-primary" id="btn-quiz-again">${passed ? 'Take it again' : 'Try again'}</button>
          <button class="btn" id="btn-quiz-home">Back to ${esc(track.homeLabel.toLowerCase())}</button>
        </div>
      </section>
    </main>`;
  document.getElementById('btn-quiz-again').addEventListener('click', () => quizScreen(trackId));
  document.getElementById('btn-quiz-home').addEventListener('click', () => { location.hash = '#learn-' + trackId; });
}

// ---------------------------------------------------------------- per-concept quizzes
// Every lesson (a "concept" the subject teaches) gets its OWN short quiz — not just one
// quiz for the whole subject. Each quiz is built ENTIRELY from vetted lesson content: the
// correct answer of every question is one of that lesson's real takeaways, and the wrong
// options are takeaways drawn from OTHER lessons in the same subject. Nothing is generated
// or paraphrased, so a wrong "correct" answer is impossible. Works for every section —
// including Crystals and Dreams, which have no subject-wide quiz of their own.

function lessonTakeaways(track, lessonId) {
  try {
    const plan = track.lessons.buildLessonById(lessonId);
    return ((plan && plan.takeawayGroups) || []).flatMap((g) => g.points || []);
  } catch { return []; }
}

// A pool of takeaways from OTHER lessons in the subject, for plausible-but-wrong options.
function siblingTakeawayPool(track, excludeIds) {
  const pool = [];
  const ex = new Set(excludeIds);
  for (const L of track.lessons.LESSON_LIBRARY) {
    if (ex.has(L.id)) continue;
    for (const p of lessonTakeaways(track, L.id)) pool.push(p);
    if (pool.length > 60) break;   // plenty for distractors; keep the build cheap
  }
  return pool;
}

function pickDistinct(pool, n, avoid) {
  const seen = new Set(avoid.map((s) => (s || '').toLowerCase()));
  const out = [];
  const bag = pool.slice();
  while (out.length < n && bag.length) {
    const cand = bag.splice(Math.floor(Math.random() * bag.length), 1)[0];
    const key = (cand || '').toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key); out.push(cand);
  }
  return out;
}

// Build a quiz config (the shape buildQuiz expects) — one round per takeaway (capped at 6):
// the real takeaway vs up to 3 sibling-lesson distractors. buildQuiz shuffles the options.
function conceptQuizConfig({ title, correct, pool }) {
  const points = correct.slice(0, 6);
  if (!points.length) return null;
  const rounds = points.map((pt) => {
    const distractors = pickDistinct(pool, 3, points);
    const options = [{ text: pt, correct: true, feedback: 'Yes — that is a key point from this lesson.' }]
      .concat(distractors.map((d) => ({ text: d, correct: false, feedback: 'That idea belongs to a different lesson. The point here: “' + pt + '”' })));
    return { prompt: 'Which of these is a key takeaway from “' + title + '”?', options };
  });
  return { intro: 'A quick check on “' + title + '” — pick the idea this lesson actually teaches. Pass at ' + QUIZ_PASS + '%.', rounds, winThreshold: Math.max(1, Math.ceil(rounds.length * QUIZ_PASS / 100)) };
}

export function conceptQuizScreen(trackId, lessonId) {
  const track = getTrack(trackId);
  if (!track || !track.lessons) { location.hash = '#learn-' + trackId; return; }
  const meta = track.lessons.LESSON_LIBRARY.find((L) => L.id === lessonId);
  const title = meta ? meta.title : 'this lesson';
  const cfg = conceptQuizConfig({ title, correct: lessonTakeaways(track, lessonId), pool: siblingTakeawayPool(track, [lessonId]) });
  if (!cfg) { location.hash = '#learn-' + trackId; return; }   // no takeaways to quiz
  app.innerHTML = `
    <header class="topbar">
      <a class="back" href="#learn-${esc(trackId)}">← Back</a>
      <h1 class="page-title finance-hero">Concept quiz</h1>
    </header>
    <main class="narrow finance-section game-screen" data-track="${esc(trackId)}">
      <p class="hint" style="margin:0 0 10px">${esc(title)}</p>
      <div id="game-mount"></div>
    </main>`;
  const mount = document.getElementById('game-mount');
  let finished = false;
  const el = buildQuiz(cfg, (result) => {
    if (finished) return; finished = true;
    conceptQuizDone(trackId, lessonId, title, cfg.rounds.length, result || {});
  });
  mount.appendChild(el);
}

function conceptQuizDone(trackId, lessonId, title, total, result) {
  const track = getTrack(trackId);
  const score = result.score || 0;
  const r = recordConceptQuiz(store, trackId, lessonId, { score, total });
  const passed = r.pct >= QUIZ_PASS;
  party(r.pct >= 100 ? 2 : (passed ? 1 : 0));
  const heading = r.pct >= 100 ? 'Perfect — concept locked in! 🎉' : (passed ? 'Passed! 🎉' : 'Not quite — review and try again.');
  app.innerHTML = `
    <main class="narrow done-screen" data-track="${esc(trackId)}">
      <section class="card center">
        <h2>${heading}</h2>
        <p class="done-stats">“${esc(title)}” · you scored <strong>${r.pct}%</strong> · ${score} of ${total} · best <strong>${r.best}%</strong></p>
        <div class="game-done-btns">
          ${passed ? '' : '<button class="btn btn-primary" id="btn-cq-review">Review the lesson</button>'}
          <button class="btn${passed ? ' btn-primary' : ''}" id="btn-cq-again">Try again</button>
          <button class="btn" id="btn-cq-home">Back to ${esc(track.homeLabel.toLowerCase())}</button>
        </div>
      </section>
    </main>`;
  const reviewBtn = document.getElementById('btn-cq-review');
  if (reviewBtn) reviewBtn.addEventListener('click', () => { location.hash = '#learn-' + trackId + '-lib-' + lessonId; });
  document.getElementById('btn-cq-again').addEventListener('click', () => conceptQuizScreen(trackId, lessonId));
  document.getElementById('btn-cq-home').addEventListener('click', () => { location.hash = '#learn-' + trackId; });
}
