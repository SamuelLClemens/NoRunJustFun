// The Mind learning screens — a generic subject hub and the lesson completion
// screen, driven entirely by the track registry (js/data/tracks.js). This is
// js/finance-screen.js generalized over a trackId. Imports ONLY data/logic
// modules (never main.js), and navigates by setting location.hash, so there is
// no circular dependency. main.js owns the router and the avatar/Player wiring;
// it imports trackHubScreen() for the #learn-<track> route and learningDone() as
// the lesson's onDone handler.

import { store, save } from './state.js';
import { naturalVoice } from './natural-voice.js';
import { finishLearning, trackStreak } from './learning.js';
import { gardenStage } from './gamify.js';
import { gardenSVG, GARDEN_STAGE_SESSIONS } from './data/garden.js';
import { BADGES } from './data/badges.js';
import { getTrack, allTrackBadges } from './data/tracks.js';
import { DURATIONS } from './data/tiers.js';
import { celebrate } from './confetti.js';
import { sound } from './audio.js';

const app = document.getElementById('app');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Defense in depth: only ever emit http(s) hrefs. Today every source URL is a
// hardcoded constant, but this guards against any future dynamic source.
const safeUrl = (u) => (/^https?:\/\//i.test(String(u)) ? String(u) : '#');

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

  app.innerHTML = `
    <header class="topbar">
      <a class="back" href="#mind">← Back</a>
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

      ${gamesHTML ? `<section class="card">
        <h2>Play a game</h2>
        <p class="hint">${esc(track.gamesBlurb || 'Quick, playful practice — a fun way to lock in what the lessons teach.')}</p>
        <div class="fin-lib" id="fin-games">${gamesHTML}</div>
      </section>` : ''}

      <p class="privacy-note"><a href="#badges">See your ${label} badges →</a></p>
    </main>`;

  document.querySelectorAll('#fin-durations .duration-btn').forEach((b) =>
    b.addEventListener('click', () => { location.hash = '#learn-' + trackId + '-' + b.dataset.mins; }));
  document.querySelectorAll('#fin-library .fin-lib-btn').forEach((b) =>
    b.addEventListener('click', () => { location.hash = '#learn-' + trackId + '-lib-' + b.dataset.lesson; }));
  document.querySelectorAll('#fin-games .fin-lib-btn').forEach((b) =>
    b.addEventListener('click', () => { location.hash = '#learn-' + trackId + '-game-' + b.dataset.game; }));
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

  celebrate();
  if (result.earned.length) setTimeout(() => sound.sparkle(), 700);

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
  celebrate();
  if (r.earned.length) setTimeout(() => sound.sparkle(), 700);

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
