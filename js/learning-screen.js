// The Mind learning screens — a generic subject hub and the lesson completion
// screen, driven entirely by the track registry (js/data/tracks.js). This is
// js/finance-screen.js generalized over a trackId. Imports ONLY data/logic
// modules (never main.js), and navigates by setting location.hash, so there is
// no circular dependency. main.js owns the router and the avatar/Player wiring;
// it imports trackHubScreen() for the #learn-<track> route and learningDone() as
// the lesson's onDone handler.

import { store, save } from './state.js';
import { naturalVoice } from './natural-voice.js';
import { finishLearning, trackStreak, recordQuiz } from './learning.js';
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
  const quizBest = tk.quizBest || 0;
  const completedAt = tk.completedAt || null;
  const quizHTML = track.quiz ? `
      <section class="card fin-quiz${completedAt ? ' is-complete' : ''}">
        <h2>${completedAt ? '✓ Subject completed' : 'Test your understanding'}</h2>
        <p class="hint">${completedAt
          ? 'You completed ' + label + ' by scoring 100% on the quiz. Review or retake it anytime.'
          : 'A short quiz across the lessons. Score 100% to mark this subject completed.'}</p>
        <p class="fin-quiz-status">${quizBest > 0 ? 'Best score: <strong>' + quizBest + '%</strong>' : 'Not attempted yet.'}${completedAt ? ' · <span class="fin-done-tag">✓ Completed ' + esc(fmtDate(completedAt)) + '</span>' : ''}</p>
        <button class="btn btn-primary" id="fin-quiz-btn">${completedAt ? 'Retake the quiz' : 'Take the quiz'}</button>
      </section>` : '';

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
        <h2>Or pick a topic</h2>
        <div class="fin-lib" id="fin-library">${lessonCards}</div>
      </section>

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
      </section>
      ${takeawaysHTML}
      ${sourcesHTML}
      ${transcriptHTML}
      ${disclaimer ? `<div class="fin-banner"><span class="fin-info" aria-hidden="true">🌱</span><span>${esc(disclaimer)}</span></div>` : ''}
    </main>`;

  document.getElementById('btn-learn-home').addEventListener('click', () => { location.hash = '#learn-' + trackId; });
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

// The per-subject completion quiz. Reuses the quiz game engine, but on finish it
// records the score: the best % is tracked, and the FIRST 100% stamps completedAt
// (the subject is "completed" — reviewable and retakeable, but the date sticks).
export function quizScreen(trackId) {
  const track = getTrack(trackId);
  if (!track || !track.quiz) { location.hash = '#learn-' + trackId; return; }
  app.innerHTML = `
    <header class="topbar">
      <a class="back" href="#learn-${esc(trackId)}">← Back</a>
      <h1 class="page-title finance-hero">${esc(track.homeLabel)} quiz</h1>
    </header>
    <main class="narrow finance-section game-screen" data-track="${esc(trackId)}">
      <div id="game-mount"></div>
    </main>`;
  const mount = document.getElementById('game-mount');
  let finished = false;
  const el = buildQuiz(track.quiz, (result) => {
    if (finished) return;
    finished = true;
    quizDone(trackId, result || {});
  });
  mount.appendChild(el);
}

function quizDone(trackId, result) {
  const track = getTrack(trackId);
  const allBadges = [...BADGES, ...allTrackBadges()];
  const total = (track && track.quiz && track.quiz.rounds.length) || 0;
  const score = result.score || 0;
  const r = recordQuiz(store, trackId, { score, total });

  // Tiered celebration: a perfect score (subject completed) is the biggest party.
  const tier = r.pct >= 100 ? 2 : (r.pct >= 70 ? 1 : 0);
  party(tier);

  const heading = r.pct >= 100
    ? (r.justCompleted ? '🎉 ' + esc(track.homeLabel) + ' completed!' : 'Perfect score! 🎉')
    : (r.pct >= 70 ? 'Nicely done!' : 'Good effort — review and try again.');

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
        ${r.pct >= 100 ? '' : '<p class="hint">Score 100% to complete this subject — you can retake it as many times as you like.</p>'}
        ${completedAt ? `<p class="grew">✓ ${esc(track.homeLabel)} completed ${esc(fmtDate(completedAt))}.</p>` : ''}
        ${r.grew ? '<p class="grew">Your garden just grew. Go look at it.</p>' : ''}
        ${badgeCards ? `<div class="badge-pops"><h3>New badge${r.earned.length > 1 ? 's' : ''}!</h3>${badgeCards}</div>` : ''}
        <div class="game-done-btns">
          <button class="btn btn-primary" id="btn-quiz-again">${r.pct >= 100 ? 'Take it again' : 'Try again'}</button>
          <button class="btn" id="btn-quiz-home">Back to ${esc(track.homeLabel.toLowerCase())}</button>
        </div>
      </section>
    </main>`;
  document.getElementById('btn-quiz-again').addEventListener('click', () => quizScreen(trackId));
  document.getElementById('btn-quiz-home').addEventListener('click', () => { location.hash = '#learn-' + trackId; });
}
