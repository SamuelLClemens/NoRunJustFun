// Money Garden — the finance hub screen and the lesson completion screen.
// Kept out of main.js to keep the shell minimal. Imports ONLY data/logic
// modules (never main.js), and navigates by setting location.hash, so there is
// no circular dependency. main.js owns the router and the avatar/Player wiring;
// it imports moneyGardenScreen() for the #money route and financeDone() as the
// lesson's onDone handler.

import { store, save } from './state.js';
import { naturalVoice } from './natural-voice.js';
import { finishFinance, financeStreak } from './finance.js';
import { gardenStage, streakInfo } from './gamify.js';
import { gardenSVG, GARDEN_STAGE_SESSIONS } from './data/garden.js';
import { BADGES } from './data/badges.js';
import { FINANCE_BADGES } from './data/badges.finance.js';
import { DURATIONS } from './data/tiers.js';
import { LESSON_LIBRARY, FINANCE_DISCLAIMER, FINANCE_DISCLAIMER_SHORT } from './data/lessons.js';
import { celebrate } from './confetti.js';
import { sound } from './audio.js';

const app = document.getElementById('app');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ALL_BADGES = [...BADGES, ...FINANCE_BADGES];

// The veronica — the brand flower, reused as the finance signature mark.
function veronicaSVG(cls = 'veronica') {
  return `<svg class="${cls}" viewBox="-16 -16 32 32" role="img" aria-label="veronica flower">
    <g fill="#5B6BD0"><ellipse cy="-7" rx="5" ry="7.6"/><ellipse cy="-7" rx="5" ry="7.6" transform="rotate(90)"/><ellipse cy="-7" rx="5" ry="7.6" transform="rotate(180)"/><ellipse cy="-7" rx="5" ry="7.6" transform="rotate(270)"/></g>
    <g fill="#7B8FE8"><ellipse cy="-6.6" rx="3.8" ry="5.8"/><ellipse cy="-6.6" rx="3.8" ry="5.8" transform="rotate(90)"/><ellipse cy="-6.6" rx="3.8" ry="5.8" transform="rotate(180)"/><ellipse cy="-6.6" rx="3.8" ry="5.8" transform="rotate(270)"/></g>
    <circle r="3.8" fill="#FFD45C"/></svg>`;
}

const coinIcon = `<svg viewBox="0 0 40 40" width="26" height="26" aria-hidden="true"><path d="M20 14 q-7 -7 -12 -3 q4 8 12 6 z" fill="#5BA869"/><circle cx="20" cy="25" r="12" fill="#FFD45C" stroke="#F4A300" stroke-width="2"/><text x="20" y="30" text-anchor="middle" font-family="Fredoka, system-ui" font-weight="700" font-size="14" fill="#9A6500">$</text></svg>`;

function lessonDone(id) {
  const lessons = (store.progress.finance && store.progress.finance.lessons) || [];
  return lessons.some((l) => l.id === id && !l.game);
}

// ---------------------------------------------------------------- hub

export function moneyGardenScreen() {
  const stage = gardenStage(store.progress.sessions.length, GARDEN_STAGE_SESSIONS);
  const fs = financeStreak(store);

  const durationBtns = DURATIONS.map((m) =>
    `<button class="duration-btn" data-mins="${m}"><span class="d-num">${m}</span><span class="d-label">MIN</span></button>`).join('');

  const naturalOn = !!store.profile.naturalOn;
  const voiceCard = naturalOn
    ? `<p class="fin-voice-on">🔊 Lifelike voice is on — your coach narrates on your device, and captions are always on too.</p>`
    : `<section class="card fin-voice"><p>Want the warmest, most lifelike narration? Turn on the natural voice — a one-time download that then runs entirely on your device. Captions stay on either way.</p><button class="btn btn-primary" id="fin-voice-on">🔊 Use the lifelike voice</button></section>`;

  const lessonCards = LESSON_LIBRARY.map((L) => {
    const done = lessonDone(L.id);
    return `<button class="fin-lib-btn" data-lesson="${esc(L.id)}">
      <span class="fin-lib-ic">${coinIcon}</span>
      <span class="fin-lib-txt"><strong>${esc(L.title)}</strong><small>${esc(L.blurb)}</small></span>
      <span class="fin-lib-meta">
        <span class="fin-mins">${L.minutes} min</span>
        <span class="fin-src-pill">${L.sourceCount} source${L.sourceCount === 1 ? '' : 's'}</span>
        ${done ? '<span class="fin-done-tag">✓ done</span>' : ''}
      </span>
    </button>`;
  }).join('');

  app.innerHTML = `
    <header class="topbar">
      <a class="back" href="#">← Back</a>
      <h1 class="page-title finance-hero">${veronicaSVG()} Money Garden</h1>
    </header>
    <main class="narrow finance-section">
      <div class="fin-banner">
        <span class="fin-info" aria-hidden="true">🌱</span>
        <span>${esc(FINANCE_DISCLAIMER_SHORT)}</span>
      </div>

      <section class="card center">
        <div class="garden-svg small">${gardenSVG(stage)}</div>
        <p class="hint">Workouts, meditations, and money lessons all grow the same garden.${fs.count > 1 ? ` You have learned on <strong>${fs.count} days</strong> in a row.` : ''}</p>
      </section>

      ${voiceCard}

      <section class="card">
        <h2>Learn a little today</h2>
        <p class="hint">Pick how long you have — your coach puts on their glasses and teaches you, scaled to fit.</p>
        <div class="duration-grid" id="fin-durations">${durationBtns}</div>
      </section>

      <section class="card">
        <h2>Or pick a topic</h2>
        <div class="fin-lib" id="fin-library">${lessonCards}</div>
      </section>

      <p class="privacy-note"><a href="#badges">See your money badges →</a></p>
    </main>`;

  document.querySelectorAll('#fin-durations .duration-btn').forEach((b) =>
    b.addEventListener('click', () => { location.hash = '#fin-' + b.dataset.mins; }));
  document.querySelectorAll('#fin-library .fin-lib-btn').forEach((b) =>
    b.addEventListener('click', () => { location.hash = '#fin-lib-' + b.dataset.lesson; }));
  const vbtn = document.getElementById('fin-voice-on');
  if (vbtn) vbtn.addEventListener('click', () => {
    store.profile.naturalOn = true; save();
    try { naturalVoice.enable(); } catch { /* system voice + captions cover it */ }
    moneyGardenScreen();
  });
}

// ---------------------------------------------------------------- completion

// Called from main.js as the lesson plan's onDone handler. main.js has already
// torn down the avatar/Player and rewritten the hash to #money. Here we record
// the completion (finishFinance grows the garden + awards badges), then render
// the celebration with the sources list and a readable transcript.
export function financeDone(plan) {
  const result = finishFinance(store, {
    lessonIds: plan.lessonIds || [],
    durationKey: plan.durationKey || null,
    sources: (plan.sources && plan.sources.length) || 0,
  });

  celebrate();
  if (result.earned.length) setTimeout(() => sound.sparkle(), 700);

  const learned = (plan.lessonTitles && plan.lessonTitles.length)
    ? plan.lessonTitles.map((t) => esc(t)).join(', ')
    : 'some money basics';

  const badgeCards = result.earned.map((id) => {
    const b = ALL_BADGES.find((x) => x.id === id);
    return b ? `<div class="badge-pop">${b.icon}<div><strong>${esc(b.name)}</strong><br><small>${esc(b.desc)}</small></div></div>` : '';
  }).join('');

  const sources = (plan.sources || []);
  const sourcesHTML = sources.length ? `
    <section class="card fin-sources">
      <h3>Where this comes from</h3>
      <p class="hint">Educational sources, not advice. Figures are labelled with the year they apply to.</p>
      <ul>${sources.map((s) => `<li>${esc(s.org)} — <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>${s.year ? ` <span class="fin-year">(${esc(s.year)})</span>` : ''}</li>`).join('')}</ul>
    </section>` : '';

  const transcriptHTML = (plan.items && plan.items.length) ? `
    <section class="card fin-transcript">
      <details>
        <summary>Read what your coach said</summary>
        ${plan.items.map((it) => `<p><span class="fin-seg-name">${esc(it.ex.name)}:</span> ${esc(it.ex.why)}</p>`).join('')}
      </details>
    </section>` : '';

  app.innerHTML = `
    <main class="narrow done-screen">
      <section class="card center">
        <div class="garden-svg small">${gardenSVG(result.stageAfter)}</div>
        <h2>Money smarts: planted. 🌼</h2>
        <p class="done-stats">You learned about <strong>${learned}</strong> · learning streak <strong>${result.financeStreak.count} day${result.financeStreak.count === 1 ? '' : 's'}</strong></p>
        ${result.grew ? '<p class="grew">Your garden just grew. Go look at it.</p>' : ''}
        ${badgeCards ? `<div class="badge-pops"><h3>New badge${result.earned.length > 1 ? 's' : ''}!</h3>${badgeCards}</div>` : ''}
        <button class="btn btn-primary" id="btn-fin-home">Back to my Money Garden</button>
      </section>
      ${sourcesHTML}
      ${transcriptHTML}
      <div class="fin-banner"><span class="fin-info" aria-hidden="true">🌱</span><span>${esc(FINANCE_DISCLAIMER)}</span></div>
    </main>`;

  document.getElementById('btn-fin-home').addEventListener('click', () => { location.hash = '#money'; });
}
