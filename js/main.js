// Garden Moves — app shell and screens.
// Private by design: every byte of your data lives in localStorage on this
// device. No accounts, no analytics, no tracking, no server. Ever.

import { store, save, resetAll, todayKey } from './state.js';
import { CHARACTERS, getCharacter } from './characters.js';
import { coach, personalize, pick } from './tts.js';
import { naturalVoice } from './natural-voice.js';
import { sound, music } from './audio.js';
import { buildSession, TRANSITION_SECS } from './sessionEngine.js';
import { streakInfo, levelInfo, gardenStage, checkBadges, recordSession } from './gamify.js';
import { Player } from './player.js';
import { celebrate } from './confetti.js';
import { EXERCISES } from './data/exercises.js';
import { PHRASES } from './data/phrases.js';
import { BADGES } from './data/badges.js';
import { gardenSVG, GARDEN_STAGE_SESSIONS } from './data/garden.js';
import { POSES } from './data/poses.js';
import { NEW_EXERCISES, TIER_ELIGIBILITY } from './data/movements-ext.js';
import { EXTRA_EXERCISES, EXTRA_TIER_ELIGIBILITY, WORKOUT_CATEGORY } from './data/movements-ext2.js';
import { EXTRA_EXERCISES2, EXTRA_TIER_ELIGIBILITY2, WORKOUT_CATEGORY2 } from './data/movements-ext3.js';
import { SEXERCISE_MOVES, SEXERCISE_CATEGORY } from './data/movements-sexercise.js';
import { MODES, TIER_META, DURATIONS } from './data/tiers.js';
import { buildMeditation, buildMeditationById, MEDITATION_LIBRARY } from './data/meditation.js';
import { availableTiers, gateMessage, routeTrack, filterPool, evaluateScreening,
  PARQ_GENERAL, PARQ_POSTPARTUM, LIFE_STAGES, SEX_OPTIONS, AGE_BANDS, INJURY_FLAGS, SPACE_OPTIONS } from './data/profiles.js';
import { PROGRAMS, getProgram, programSuggestion, advanceProgram } from './data/programs.js';
import { getTrack, TRACK_LIST, SOUL_TRACK_LIST } from './data/tracks.js';
import { trackHubScreen, learningDone, gameScreen, quizScreen } from './learning-screen.js';
import { usageGraphsHTML } from './usage-graph.js';
import { composeCheckin } from './checkin.js';
import { listMeals, addMeal, removeMeal } from './meals.js';
import { intimacyCardHTML, setEnabled as setIntimEnabled } from './intimacy.js';

const app = document.getElementById('app');
let avatar = null;        // lazy three.js instance, one at a time
let player = null;

// Local-only QA handle is exposed on window ONLY in dev (?dev=…), never in
// production, so a disposed Player/avatar and the mutable store are not pinned to
// a global. It is also cleared on teardown — see teardownSession().
const DEV_QA = new URLSearchParams(location.search).has('dev');

// The full movement pool = frozen 29 + appended new movements. exercises.js stays
// byte-stable; tier metadata and new moves live in movements-ext.js.
const ALL_EXERCISES = [...EXERCISES, ...NEW_EXERCISES, ...EXTRA_EXERCISES, ...EXTRA_EXERCISES2, ...SEXERCISE_MOVES];
const ALL_TIER_ELIGIBILITY = { ...TIER_ELIGIBILITY, ...EXTRA_TIER_ELIGIBILITY, ...EXTRA_TIER_ELIGIBILITY2 };
const ALL_WORKOUT_CATEGORY = { ...WORKOUT_CATEGORY, ...WORKOUT_CATEGORY2, ...SEXERCISE_CATEGORY };

// Honor the reduced-motion preference override (auto | on | off) on every render.
function applyMotionPref() {
  const m = store.profile.reducedMotion || 'auto';
  document.documentElement.dataset.reducedMotion = m;
}

// Logo lockup — the veronica flower forms the exclamation mark.
// Keep in sync with the static copy in index.html (.hello-logo).
function logoSVG() {
  return `<svg class="logo-svg" viewBox="0 0 494 92" role="img" aria-label="Garden Moves" xmlns="http://www.w3.org/2000/svg">
    <title>Garden Moves</title>
    <text x="12" y="74" font-family="Fredoka, 'Avenir Next Rounded', system-ui, sans-serif" font-weight="600" font-size="74" fill="var(--ink, #1F4D2E)" textLength="421" lengthAdjust="spacingAndGlyphs">Garden Moves</text>
    <path d="M 452.3 21.5 A 4.7 4.7 0 0 1 461.6 21.0 C 460.6 28.5 460.0 36 459.6 42.5 A 3.1 3.1 0 0 1 453.4 42.8 C 453.2 35.5 452.7 28.5 452.3 21.5 Z" fill="var(--green-700, #2E6B3D)"/>
    <path d="M 452.8 30.5 C 448 26.5 441.8 27.2 438.4 31.4 C 442 35.6 448.6 35.2 452.8 30.5 Z" fill="var(--green-500, #5BA869)"/>
    <g transform="translate(457 70) rotate(10) scale(0.88)">
      <g fill="#5B6BD0"><ellipse cy="-10" rx="7.4" ry="10.6"/><ellipse cy="-10" rx="7.4" ry="10.6" transform="rotate(90)"/><ellipse cy="-10" rx="7.4" ry="10.6" transform="rotate(180)"/><ellipse cy="-10" rx="7.4" ry="10.6" transform="rotate(270)"/></g>
      <g fill="#7B8FE8"><ellipse cy="-9.6" rx="5.8" ry="8.8"/><ellipse cy="-9.6" rx="5.8" ry="8.8" transform="rotate(90)"/><ellipse cy="-9.6" rx="5.8" ry="8.8" transform="rotate(180)"/><ellipse cy="-9.6" rx="5.8" ry="8.8" transform="rotate(270)"/></g>
      <circle r="6.2" fill="#5B6BD0"/><circle r="4.6" fill="#FFFFFF"/>
      <circle cx="-1.7" cy="0.6" r="1.7" fill="#2E3A8C"/><circle cx="1.8" cy="-0.8" r="1.7" fill="#2E3A8C"/>
    </g>
  </svg>`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}

// ---------------------------------------------------------------- home

function homeScreen() {
  const p = store.progress;
  const streak = streakInfo(p.sessions);
  const lvl = levelInfo(p.totalMins);
  const stage = gardenStage(p.sessions.length, GARDEN_STAGE_SESSIONS);
  const name = store.profile.name;

  const streakChip = streak.count > 0
    ? `<div class="chip chip-streak" role="status">🔥 ${streak.count}-day streak${streak.pendingToday ? ' — move today to keep it growing' : ''}</div>`
    : `<div class="chip" role="status">Your garden is ready when you are</div>`;

  const grace = streak.usedGraceRecently && streak.count > 0
    ? `<p class="grace-note">${esc(pick(PHRASES.micro.streakSafe))}</p>` : '';

  app.innerHTML = `
    <header class="topbar">
      <div class="brand">${logoSVG()}</div>
      <nav class="topnav">
        <a href="#you">You</a>
        <a href="#badges">Badges</a>
        <a href="#settings" aria-label="Settings">Settings</a>
      </nav>
    </header>
    <main class="home">
      <section class="garden-card" aria-label="Your garden">
        <div class="garden-svg">${gardenSVG(stage)}</div>
        ${streakChip}
        ${grace}
        <p class="garden-caption">${p.sessions.length === 0
          ? `Hi${name ? ' ' + esc(name) : ''}! Every session you finish grows this garden. Consistency makes it bloom — never intensity.`
          : `${p.sessions.length} session${p.sessions.length === 1 ? '' : 's'} grown so far. Keep watering.`}</p>
      </section>

      <section class="level-card" aria-label="Your level">
        <div class="level-row">
          <strong>Level ${lvl.level}: ${lvl.title}</strong>
          <span>${p.totalMins} min moved</span>
        </div>
        <div class="level-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(lvl.pct * 100)}" aria-label="Progress to next level">
          <div class="level-fill" style="width:${Math.round(lvl.pct * 100)}%"></div>
        </div>
        ${lvl.nextTitle ? `<p class="level-next">${lvl.minsToNext} min to ${lvl.nextTitle}</p>` : '<p class="level-next">Top of the garden. Legend.</p>'}
      </section>

      ${programCardHTML()}
      ${pillarsHTML()}

      <footer class="privacy-note">
        <p>🌱 <strong>Private by design.</strong> Your progress lives only on this device. No account, no tracking, no data ever leaves your phone.</p>
        <p class="home-help-links"><a href="#tutorial">How to use the app</a> · <a href="#faq">FAQ &amp; privacy</a> · <a href="#safety">Safety notice</a></p>
      </footer>
    </main>`;

  app.querySelectorAll('.pillar-card').forEach((b) =>
    b.addEventListener('click', () => { sound.unlock(); go(b.dataset.go); }));
  const progStart = document.getElementById('prog-start');
  if (progStart) progStart.addEventListener('click', () => { sound.unlock(); go(progStart.dataset.go); });

  maybeShowSafety();
}

// The three pillars (Mind/Body/Soul) — the app's top-level navigation. Each pillar
// owns its own duration/option step; all of them grow the same shared garden.
function pillarsHTML() {
  // Mind subtitle is derived from the registry so it never drifts as subjects are added.
  const mindSubjects = TRACK_LIST.map((id) => (getTrack(id) ? getTrack(id).homeLabel.toLowerCase() : null)).filter(Boolean).join(', ');
  const pillars = [
    { go: '#body', cls: 'body', ic: '🤸', title: 'Body', blurb: 'Move — gentle to vigorous, no equipment' },
    { go: '#mind', cls: 'mind', ic: '📚', title: 'Mind', blurb: 'Learn — ' + mindSubjects },
    { go: '#soul', cls: 'soul', ic: '🧘', title: 'Soul', blurb: 'Be still — meditation and calm' },
  ];
  return `<section class="pillars" aria-label="Choose how to grow today">
      <div class="pillar-grid">
        ${pillars.map((p) => `<button class="pillar-card ${p.cls}" data-go="${p.go}">
          <span class="pillar-ic" aria-hidden="true">${p.ic}</span>
          <span class="pillar-txt"><strong>${p.title}</strong><small>${esc(p.blurb)}</small></span>
        </button>`).join('')}
      </div>
      <p class="start-note">Whatever you pick, your garden grows the same — consistency, never intensity.</p>
    </section>`;
}

// ---------------------------------------------------------------- Body pillar (workouts)
// Body now offers three movement paths. Each scopes the session pool to its category
// (see WORKOUT_CATEGORY + buildSession). Stretching/Yoga are gentle and go straight to
// a duration; Exercises adds the intensity chooser (and screening) afterwards.
function bodyScreen() {
  const paths = [
    { go: '#move-stretch', ic: '🙆', title: 'Stretching', blurb: 'Gentle lengthening and mobility — feel loose and calm' },
    { go: '#move-yoga', ic: '🧘', title: 'Yoga', blurb: 'Mindful, breath-linked poses and simple flows' },
    { go: '#move-exercise', ic: '💪', title: 'Exercises', blurb: 'Build strength and gentle cardio — choose your intensity' },
    { go: '#move-face', ic: '😌', title: 'Face yoga', blurb: 'Gentle facial release and relaxation — sit anywhere' },
    { go: '#move-baby', ic: '🍼', title: 'With your baby', blurb: 'Gentle movement you can do holding your little one' },
    { go: '#move-sexercise', ic: '🔥', title: 'Sexercise', blurb: 'Playful strength, stamina and mobility for a more active, joyful intimate life' },
  ];
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">Body · Move</h1></header>
    <main class="narrow body-screen">
      <section class="card">
        <h2>How do you want to move?</h2>
        <p class="hint">No equipment — just you, the floor, a wall, and maybe a chair. Coached by ${esc(getCharacter(store.profile.character).name)}.</p>
        <div class="move-paths">
          ${paths.map((p) => `<button class="move-path" data-go="${p.go}">
            <span class="move-path-ic" aria-hidden="true">${p.ic}</span>
            <span class="move-path-txt"><strong>${esc(p.title)}</strong><small>${esc(p.blurb)}</small></span>
          </button>`).join('')}
        </div>
      </section>
    </main>`;
  app.querySelectorAll('.move-path').forEach((b) =>
    b.addEventListener('click', () => { sound.unlock(); go(b.dataset.go); }));
}

const MOVE_META = {
  stretch: { label: 'Stretching', note: 'gentle lengthening and mobility' },
  yoga: { label: 'Yoga', note: 'breath-linked poses and flow' },
  exercise: { label: 'Exercises', note: 'strength and gentle cardio' },
  face: { label: 'Face yoga', note: 'gentle facial release and relaxation' },
  baby: { label: 'With your baby', note: 'gentle movement holding your baby',
    safety: 'Always support the head and neck, hold your baby securely, and never bounce. Begin only once your doctor has cleared you after birth, and stop if your baby is unsettled.' },
  sexercise: { label: 'Sexercise', note: 'playful strength, stamina and mobility for a more active, joyful intimate life',
    safety: 'For consenting adults. This is gentle fitness — strength, stamina, hip mobility and pelvic-floor work — not medical or explicit sex advice. Move within your comfort, communicate with any partner, keep everything consensual, and stop if anything hurts.' },
};

function moveScreen(category) {
  const meta = MOVE_META[category];
  if (!meta) { go('#body'); return; }
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#body">← Back</a><h1 class="page-title">${esc(meta.label)}</h1></header>
    <main class="narrow body-screen">
      <section class="start-card">
        <h2>How long do you have?</h2>
        ${Object.values(MODES).map((m) => `
          <div class="mode-group">
            <div class="mode-label">${esc(m.label)} <small>${esc(m.blurb)}</small></div>
            <div class="duration-grid">
              ${m.durations.map((d) => `<button class="duration-btn" data-mins="${d}"><span class="d-num">${d}</span><span class="d-label">min</span></button>`).join('')}
            </div>
          </div>`).join('')}
        <p class="start-note">${esc(meta.note)} · no equipment${category === 'exercise' ? ', then choose how it feels' : ''}, coached by ${esc(getCharacter(store.profile.character).name)}</p>
        ${meta.safety ? `<p class="start-note safety-note">⚠️ ${esc(meta.safety)}</p>` : ''}
        <p class="start-note start-links">
          ${category === 'exercise' ? '<a href="#intake">Personalize your sessions</a>' : ''}
          <label class="inline-toggle"><input type="checkbox" id="home-chair" ${store.profile.chairMode ? 'checked' : ''}> Chair mode</label>
        </p>
      </section>
    </main>`;
  app.querySelectorAll('.duration-btn').forEach((b) =>
    b.addEventListener('click', () => {
      sound.unlock();
      if (category === 'exercise') go('#tier-' + b.dataset.mins);
      else go('#play-' + b.dataset.mins + '-' + category);
    }));
  const chair = document.getElementById('home-chair');
  if (chair) chair.addEventListener('change', (e) => { store.profile.chairMode = e.target.checked; save(); });
}

// ---------------------------------------------------------------- Soul pillar (meditation +)
function soulScreen() {
  const durationBtns = DURATIONS.map((m) =>
    `<button class="duration-btn" data-mins="${m}"><span class="d-num">${m}</span><span class="d-label">min</span></button>`).join('');
  const libHTML = MEDITATION_LIBRARY.map((m) =>
    `<button class="med-lib-btn" data-med="${m.id}"><span>${esc(m.theme)}</span><small>${m.minutes} min</small></button>`).join('');
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">Soul · Be still</h1></header>
    <main class="narrow soul-screen">
      <section class="card">
        <h2>Meditate</h2>
        <p class="hint">Pick how long you have — the core practice scales to fit. A meditation grows your garden exactly like a workout.</p>
        <div class="duration-grid" id="soul-durations">${durationBtns}</div>
      </section>
      <section class="card">
        <details class="fin-lib-details">
          <summary class="fin-lib-summary">
            <span class="fin-lib-summary-txt"><strong>Or browse a theme</strong><small>Browse all ${MEDITATION_LIBRARY.length} meditations — open it when you want, tuck it away when you don't</small></span>
            <span class="fin-lib-chevron" aria-hidden="true">▾</span>
          </summary>
          <div class="med-lib" id="soul-library">${libHTML}</div>
        </details>
      </section>
      <p class="start-note">Looking for Crystal energy or Dream interpretation? They now live in <a href="#mind">Mind · Learn</a>.</p>
    </main>`;
  document.querySelectorAll('#soul-durations .duration-btn').forEach((b) =>
    b.addEventListener('click', () => { sound.unlock(); go('#play-' + b.dataset.mins + '-meditation'); }));
  document.querySelectorAll('#soul-library .med-lib-btn').forEach((b) =>
    b.addEventListener('click', () => { sound.unlock(); go('#play-lib-' + b.dataset.med); }));
}

// ---------------------------------------------------------------- Mind pillar (learning)
function mindScreen() {
  // The learning subjects. A subject is live once it is registered in tracks.js;
  // the rest show as coming-soon until their content lands (slices 3-4), then
  // auto-enable here.
  const subjects = [
    { id: 'money', ic: '🪙', title: 'Money', blurb: 'Budgeting, compound growth, risk, retirement, property' },
    { id: 'parenting', ic: '🧸', title: 'Parenting', blurb: 'Child development, positive discipline, connection' },
    { id: 'communication', ic: '💬', title: 'Communication', blurb: 'Nonviolent Communication — needs, requests, empathy' },
    { id: 'memory', ic: '🧠', title: 'Memory', blurb: 'How memory works, evidence-based techniques, and games to practice' },
  ];
  const cards = subjects.map((s) => {
    const live = !!getTrack(s.id);
    const inner = `<span class="fin-lib-ic" aria-hidden="true">${s.ic}</span>
        <span class="fin-lib-txt"><strong>${esc(s.title)}</strong><small>${esc(s.blurb)}</small></span>`;
    return live
      ? `<button class="fin-lib-btn mind-subject" data-track="${esc(s.id)}">${inner}
        <span class="fin-lib-meta"><span class="fin-mins">Learn →</span></span></button>`
      : `<button class="fin-lib-btn mind-subject locked" disabled>${inner}
        <span class="fin-lib-meta"><span class="soon-tag">Coming soon</span></span></button>`;
  }).join('');
  // Belief-flagged reflective sections (Crystal energy, Dream interpretation). They live
  // under their own SOUL_TRACK_LIST registry (never the Mind TRACK_LIST, so they get no
  // quiz/games/mastery), and now appear here in Learn as a visually distinct section.
  const reflectiveHTML = SOUL_TRACK_LIST.map((id) => {
    const t = getTrack(id);
    if (!t) return '';
    return `<button class="soul-reflective" data-track="${esc(id)}">
        <span class="pillar-ic" aria-hidden="true">${(t.theme && t.theme.badgeEmoji) || '🌙'}</span>
        <span class="pillar-txt"><strong>${esc(t.name)}</strong><small>${esc(t.blurb)}</small></span>
        <span class="soul-go" aria-hidden="true">→</span>
      </button>`;
  }).join('');
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">Mind · Learn</h1></header>
    <main class="narrow finance-section">
      <div class="fin-banner"><span class="fin-info" aria-hidden="true">🌱</span><span>Bite-size, sourced lessons. Educational only — not professional advice.</span></div>
      <section class="card">
        <h2>Pick a subject</h2>
        <p class="hint">Your coach teaches you, scaled to the time you have. Each subject grows the same garden.</p>
        <div class="fin-lib" id="mind-subjects">${cards}</div>
      </section>
      ${reflectiveHTML ? `<section class="card reflective-section">
        <h2>Belief &amp; reflection</h2>
        <p class="hint">A different kind of learning — honest, well-sourced explorations where belief and evidence sit side by side. Read at your own pace.</p>
        <div class="soul-reflectives" id="soul-reflectives">${reflectiveHTML}</div>
      </section>` : ''}
    </main>`;
  document.querySelectorAll('#mind-subjects .mind-subject[data-track]').forEach((b) =>
    b.addEventListener('click', () => { location.hash = '#learn-' + b.dataset.track; }));
  document.querySelectorAll('#soul-reflectives .soul-reflective').forEach((b) =>
    b.addEventListener('click', () => { go('#learn-' + b.dataset.track); }));
}

// Optional guided-program card: today's suggestion if enrolled, else a soft invite.
function programCardHTML() {
  const st = store.progress.program;
  if (st) {
    const prog = getProgram(st.id);
    const sug = programSuggestion(prog, st);
    if (prog && sug) {
      const tm = TIER_META[sug.suggestedTier];
      return `<section class="program-card" aria-label="Your guided path">
        <div class="prog-row"><strong>${esc(prog.name)}</strong><a href="#programs" class="linkish small">manage</a></div>
        <p class="prog-sug">${esc(sug.weekLabel)} · today: <strong>${sug.suggestedDuration} min ${esc(tm ? tm.label : sug.suggestedTier)}</strong> — ${esc(sug.theme)}</p>
        <button class="btn btn-primary" id="prog-start" data-go="#play-${sug.suggestedDuration}-${sug.suggestedTier}">Start today's session</button>
        <p class="prog-note">Optional, and your garden grows the same whether you follow it or not.</p>
      </section>`;
    }
  }
  return `<p class="start-note program-invite"><a href="#programs">Want a gentle guided path? Try a program — optional, leave anytime.</a></p>`;
}

// ---------------------------------------------------------------- tier chooser

function modeFor(mins) {
  return Object.values(MODES).find((m) => m.durations.includes(mins)) || MODES.got_time;
}

function tierScreen(mins) {
  const avail = new Set(availableTiers(store.profile));
  const workoutTiers = ['no_sweat', 'slightly_sweaty', 'super_sweaty'];
  const mode = modeFor(mins);

  const tierCard = (t) => {
    const tm = TIER_META[t];
    const ok = avail.has(t);
    const msg = ok ? '' : esc(gateMessage(store.profile, t) || 'Complete the readiness questions to unlock this.');
    return `<button class="tier-card ${ok ? '' : 'locked'}" data-tier="${t}" ${ok ? '' : 'aria-disabled="true"'}>
      <strong>${esc(tm.label)}</strong>
      <small>${esc(tm.blurb)}</small>
      ${ok ? '' : `<span class="tier-gate">🔒 ${msg}</span>`}
    </button>`;
  };

  app.innerHTML = `
    <header class="topbar"><a class="back" href="#body">← Back</a><h1 class="page-title">${mins} min · ${esc(mode.label)}</h1></header>
    <main class="narrow tier-screen">
      <section class="card">
        <h2>How do you want it to feel?</h2>
        <div class="tier-grid">
          ${workoutTiers.map(tierCard).join('')}
        </div>
      </section>
    </main>`;

  app.querySelectorAll('.tier-card').forEach((b) => b.addEventListener('click', () => {
    const t = b.dataset.tier;
    if (!avail.has(t)) {
      // Gated: surface the consult-a-clinician copy and offer the gentler path.
      alert(gateMessage(store.profile, t) || 'Complete the readiness questions in Personalize to unlock this.');
      return;
    }
    sound.unlock();
    go(`#play-${mins}-${t}`);
  }));
}

// ---------------------------------------------------------------- personalize / intake

function intakeScreen() {
  const p = store.profile;
  const k = p.intake || {};
  const opt = (v, label, sel) => `<option value="${esc(v)}" ${sel === v ? 'selected' : ''}>${esc(label)}</option>`;
  const triState = (key, label, val) => `
    <label class="parq-item"><span>${esc(label)}</span>
      <select data-parq="${key}">
        <option value="" ${val == null ? 'selected' : ''}>Skip</option>
        <option value="no" ${val === false ? 'selected' : ''}>No</option>
        <option value="yes" ${val === true ? 'selected' : ''}>Yes</option>
      </select></label>`;
  const isPP = ['pp_early', 'pp_recovery', 'pp_strengthening', 'pp_late', 'pregnant'].includes(k.lifeStage);
  const parq = k.parq || {};

  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">Personalize</h1></header>
    <main class="narrow settings intake">
      <section class="card">
        <p class="hint">Everything here is optional and stays on this device. It only helps us pick safe, comfortable sessions for you — it is never shown as a number, never a goal, and never used to shame. <strong>This is exercise guidance, not medical advice.</strong></p>
      </section>
      <section class="card">
        <label><strong>Life stage</strong>
          <select id="in-lifeStage">${[{ id: '', label: 'Prefer not to say' }, ...LIFE_STAGES].map((s) => opt(s.id, s.label, k.lifeStage || '')).join('')}</select>
        </label>
        <label class="toggle"><input type="checkbox" id="in-cleared" ${k.clearedByClinician ? 'checked' : ''}> A clinician has cleared me for exercise</label>
        <label><strong>Sex assigned at birth</strong> <small>(only affects safe programming)</small>
          <select id="in-sex">${[{ v: '', l: 'Prefer not to say' }, ...SEX_OPTIONS.map((s) => ({ v: s, l: s }))].map((o) => opt(o.v, o.l, k.sexAssignedAtBirth || '')).join('')}</select>
        </label>
        <label><strong>Age</strong>
          <select id="in-age">${[{ v: '', l: 'Prefer not to say' }, ...AGE_BANDS.map((a) => ({ v: a, l: a.replace('_', '–').replace('plus', '+').replace('u18', 'under 18') }))].map((o) => opt(o.v, o.l, k.ageBand || '')).join('')}</select>
        </label>
        <label><strong>Where do you move?</strong>
          <select id="in-space">${SPACE_OPTIONS.map((s) => opt(s, s.replace('_', ' '), k.space || 'mat')).join('')}</select>
        </label>
      </section>
      <section class="card">
        <strong>Anything to work around?</strong>
        <div class="flag-grid">
          ${INJURY_FLAGS.map((f) => `<label class="flag"><input type="checkbox" data-injury="${f}" ${(k.injuryFlags || []).includes(f) ? 'checked' : ''}> ${esc(f.replace(/_/g, ' '))}</label>`).join('')}
        </div>
      </section>
      <section class="card">
        <strong>Quick readiness check</strong>
        <p class="hint">A standard pre-activity screen. A "yes" on the heart or dizziness questions keeps the most vigorous sessions behind a "check with your clinician first" gate — the gentler sessions and meditation stay open.</p>
        ${PARQ_GENERAL.map((q) => triState(q.key, q.label, parq[q.key])).join('')}
        ${isPP ? `<hr><p class="hint">A few postpartum-specific questions:</p>${PARQ_POSTPARTUM.map((q) => triState(q.key, q.label, parq[q.key])).join('')}` : ''}
      </section>
      <section class="card">
        <strong>Accessibility</strong>
        <label class="toggle"><input type="checkbox" id="in-chair" ${p.chairMode ? 'checked' : ''}> Chair mode <small>(seated / standing-by-chair)</small></label>
        <label><strong>Motion</strong>
          <select id="in-motion">${['auto', 'on', 'off'].map((m) => opt(m, m === 'auto' ? 'Follow my device' : m === 'on' ? 'Reduce motion' : 'Full motion', p.reducedMotion || 'auto')).join('')}</select>
        </label>
      </section>
      <section class="card center">
        <p id="in-summary" class="hint"></p>
        <button class="btn btn-primary" id="in-save">Save</button>
      </section>
    </main>`;

  const readIntake = () => {
    const get = (id) => document.getElementById(id).value;
    const parqVals = {};
    app.querySelectorAll('[data-parq]').forEach((s) => {
      parqVals[s.dataset.parq] = s.value === '' ? null : s.value === 'yes';
    });
    const injuries = [...app.querySelectorAll('[data-injury]:checked')].map((c) => c.dataset.injury);
    return {
      sexAssignedAtBirth: get('in-sex') || null,
      ageBand: get('in-age') || null,
      lifeStage: get('in-lifeStage') || null,
      clearedByClinician: document.getElementById('in-cleared').checked,
      space: get('in-space') || 'mat',
      injuryFlags: injuries,
      conditionFlags: (store.profile.intake && store.profile.intake.conditionFlags) || [],
      parq: parqVals,
      parqUpdatedAt: new Date().toISOString(),
    };
  };
  const refreshSummary = () => {
    const probe = { ...store.profile, intake: readIntake(), chairMode: document.getElementById('in-chair').checked };
    const tiers = availableTiers(probe).map((t) => TIER_META[t].label).join(', ');
    document.getElementById('in-summary').textContent = `Available now: ${tiers}.`;
  };
  app.addEventListener('change', refreshSummary);
  // life-stage change re-renders to reveal/hide the postpartum questions
  document.getElementById('in-lifeStage').addEventListener('change', () => {
    store.profile.intake = readIntake(); save(); intakeScreen();
  });
  refreshSummary();
  document.getElementById('in-save').addEventListener('click', () => {
    store.profile.intake = readIntake();
    store.profile.chairMode = document.getElementById('in-chair').checked;
    store.profile.reducedMotion = document.getElementById('in-motion').value;
    store.profile.guidelineAccepted = true;
    save();
    applyMotionPref();
    go('#');
  });
}

// ---------------------------------------------------------------- programs

function programsScreen() {
  const st = store.progress.program;
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">Guided paths</h1></header>
    <main class="narrow">
      <section class="card"><p class="hint">A guided path just suggests today's session. It is optional, you can pause or leave any time, and your garden grows the same whether you follow it or not.</p></section>
      ${PROGRAMS.map((prog) => {
        const enrolled = st && st.id === prog.id;
        return `<section class="card">
          <strong>${esc(prog.name)}</strong>
          <p class="hint">${esc(prog.blurb)}</p>
          ${enrolled
            ? `<button class="btn" id="leave-${prog.id}">Leave this path</button> <span class="hint">You are on this path.</span>`
            : `<button class="btn btn-primary" data-enroll="${prog.id}">Start this path</button>`}
        </section>`;
      }).join('')}
    </main>`;
  app.querySelectorAll('[data-enroll]').forEach((b) => b.addEventListener('click', () => {
    store.progress.program = { id: b.dataset.enroll, startedAt: todayKey(), weekIdx: 0, dayIdx: 0 };
    save();
    go('#');
  }));
  PROGRAMS.forEach((prog) => {
    const lv = document.getElementById('leave-' + prog.id);
    if (lv) lv.addEventListener('click', () => {
      // Leaving is penalty-free: completed sessions already grew the garden; nothing is clawed back.
      store.progress.program = null; save(); go('#');
    });
  });
}

// ---------------------------------------------------------------- safety

function safetyHTML() {
  return `
    <h2>Quick word before we begin 💚</h2>
    <p>This app offers gentle exercise guidance — it is not medical advice.</p>
    <ul>
      <li>Check with your doctor before starting a new exercise program — especially if you are within 12 weeks of giving birth, or have pelvic floor symptoms, diastasis recti, or any health concern.</li>
      <li>If a move hurts, stop. Discomfort that feels wrong beats any streak.</li>
      <li>Every single move has a skip button. Use it freely — skipping is self-care, not failure.</li>
    </ul>
    <p>All moves here are low-impact and chosen to be kind to postpartum bodies: no crunches, no sit-ups, no full planks.</p>`;
}

// The launch disclaimer. The card is a flex column: the notice text scrolls, while the
// dismiss button stays PINNED and visible at the bottom on every viewport — including
// short / landscape phones, where the old centered card pushed the button below the
// fold. So no matter how the site loads, the user can always see the button to leave it.
// Dismissing persists seenSafety, so it never reappears once acknowledged.
function showSafetyOverlay() {
  if (document.querySelector('.overlay.safety')) return;   // never double-insert
  const ov = document.createElement('div');
  ov.className = 'overlay safety';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-label', 'Safety notice');
  ov.innerHTML = `<div class="overlay-card overlay-card--gated">
    <div class="overlay-scroll">${safetyHTML()}</div>
    <div class="overlay-actions">
      <button class="btn btn-primary" id="safety-ok">I understand — let's go</button>
      <p class="overlay-once">You will only see this once.</p>
    </div></div>`;
  document.body.appendChild(ov);
  const btn = ov.querySelector('#safety-ok');
  btn.focus();
  // modal focus trap: the confirm button is the only focusable element
  ov.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') { e.preventDefault(); btn.focus(); }
  });
  btn.addEventListener('click', () => {
    store.profile.seenSafety = true;
    save();
    ov.remove();
  });
}

// Show the launch disclaimer once, at boot, no matter which route the app loads into.
// It is appended to <body>, so it sits above whatever screen rendered (home or a deep
// link). Gated on seenSafety so a returning, acknowledged user is never interrupted.
function maybeShowSafety() {
  if (!store.profile.seenSafety) showSafetyOverlay();
}

function safetyScreen() {
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a></header>
    <main class="narrow"><section class="card">${safetyHTML()}</section></main>`;
}

// ---------------------------------------------------------------- session

function sessionScreen(plan) {
  const profile = store.profile;

  app.innerHTML = `
    <main class="session">
      <div class="stage">
        <canvas id="avatar-canvas" aria-label="Your coach demonstrating the move"></canvas>
        <div class="caption-bubble" id="caption" aria-live="polite"></div>
      </div>
      <section class="move-card">
        <div class="move-head">
          <div>
            <span class="chip chip-block" id="block-chip"></span>
            <h2 id="move-name">Get ready…</h2>
          </div>
          <div class="ring-wrap">
            <svg viewBox="0 0 120 120" class="ring" aria-hidden="true">
              <circle cx="60" cy="60" r="54" class="ring-bg"/>
              <circle cx="60" cy="60" r="54" class="ring-fg" id="ring-fg"/>
            </svg>
            <span class="ring-num" id="ring-num" role="timer" aria-label="Seconds remaining"></span>
          </div>
        </div>
        <div class="progress-dots" id="dots" role="img" aria-label="Session progress"></div>
        <div class="lesson-levels" id="lesson-levels" hidden role="group" aria-label="Adjust this explanation">
          <button class="btn btn-level" id="btn-simpler" hidden>Explain it simpler</button>
          <button class="btn btn-level" id="btn-deeper" hidden>Go deeper</button>
        </div>
        <div class="controls">
          <button class="btn" id="btn-pause">Pause</button>
          <button class="btn btn-skip" id="btn-skip">Skip this move</button>
        </div>
        <button class="linkish" id="btn-end">End session</button>
      </section>
    </main>`;

  const captionEl = document.getElementById('caption');
  coach.onCaption = (t) => { captionEl.textContent = t; };
  coach.resetTranscript();   // fresh "Read what your coach said" log for this session
  coach.enabled = profile.voiceOn;
  coach.voiceURI = profile.voiceURI;
  coach.naturalOn = profile.naturalOn;
  if (profile.naturalOn && naturalVoice.state === 'off') naturalVoice.enable(); // warms up in the background; system voice covers until ready
  sound.sfxOn = profile.sfxOn;
  music.volume = profile.musicVol;

  // avatar (graceful fallback if WebGL is unavailable)
  const canvas = document.getElementById('avatar-canvas');
  const char = getCharacter(profile.character);
  coach.setCharacterVoice(char); // each coach gets its own distinct voice + pacing
  const wantReal = profile.fullInstructorOn && RealisticAvatar &&
    realisticHelpers && realisticHelpers.realisticInstructorSupported();
  try {
    if (wantReal) {
      avatar = new RealisticAvatar(canvas, char);
      avatar.start();
      // if she fails to load, quietly swap to the lean coach for this session
      avatar.onError = () => swapToLeanAvatar(canvas, char);
      // if the device renders her too slowly, note it so the NEXT session uses
      // the light coach — but let her finish this one (no jarring mid-session swap)
      avatar.watchPerformance((fps) => {
        console.info('full instructor runs slowly here (', Math.round(fps), 'fps) — the light coach will lead next session');
      });
    } else {
      avatar = new Avatar(canvas, char);
      avatar.start();
    }
  } catch (e) {
    console.warn('avatar unavailable:', e);
    canvas.closest('.stage').classList.add('no-webgl');
  }

  // Lip-sync: drive the avatar's mouth from the coach's actual voice. A no-op on
  // rigs without visemes (the lean coach, or a Mixamo body), so it is safe to wire
  // unconditionally. The closure reads the outer `avatar`, so it survives a mid-
  // session swap to the lean coach. Cleared in teardown so later screens never poke
  // a disposed avatar.
  coach.onSpeechStart = () => { if (avatar && avatar.setTalking) try { avatar.setTalking(true); } catch { /* ok */ } };
  coach.onSpeechEnd = () => { if (avatar && avatar.setTalking) try { avatar.setTalking(false); } catch { /* ok */ } };

  const dots = document.getElementById('dots');
  dots.innerHTML = plan.items.map((it, i) =>
    `<span class="dot" data-i="${i}" title="${esc(it.ex.name)}"></span>`).join('');

  const ringFg = document.getElementById('ring-fg');
  const CIRC = 2 * Math.PI * 54;
  ringFg.style.strokeDasharray = String(CIRC);

  // Longer sessions (>= 15 min, any pillar) open with a brief, personalized check-in.
  const checkinText = composeCheckin({
    name: profile.name,
    streakCount: streakInfo(store.progress.sessions).count,
    totalSessions: store.progress.sessions.length,
    lastDate: (store.progress.sessions[store.progress.sessions.length - 1] || {}).date || '',
    today: todayKey(),
    hour: new Date().getHours(),
    kind: plan.kind || (plan.isMeditation ? 'meditation' : 'movement'),
    durationKey: plan.durationKey || 0,
  });

  player = new Player({
    plan,
    phrases: PHRASES,
    name: profile.name,
    style: profile.style,
    musicOn: profile.musicOn,
    skipWelcome: !!checkinText,
    hooks: {
      moveStart(item, idx) {
        document.getElementById('move-name').textContent = item.ex.name;
        document.getElementById('block-chip').textContent =
          { arrive: 'arrive', warmup: 'warm-up', main: 'main', winddown: 'wind-down', close: 'breathe', meditation: 'meditate', lesson: 'learn' }[item.block] || '';
        dots.setAttribute('aria-label', `Move ${idx + 1} of ${plan.items.length}: ${item.ex.name}`);
        dots.querySelectorAll('.dot').forEach((d, i) => {
          d.classList.toggle('done', i < idx);
          d.classList.toggle('now', i === idx);
        });
        if (avatar) avatar.setPose(POSES[item.ex.id] || null);
        // Lesson difficulty controls: show "Explain it simpler" / "Go deeper" only on
        // lesson segments that actually provide that variant (graceful when absent).
        const levels = document.getElementById('lesson-levels');
        if (levels) {
          const hasS = item.block === 'lesson' && !!item.ex.simpler;
          const hasD = item.block === 'lesson' && !!item.ex.deeper;
          levels.hidden = !(hasS || hasD);
          const bs = document.getElementById('btn-simpler'); if (bs) bs.hidden = !hasS;
          const bd = document.getElementById('btn-deeper'); if (bd) bd.hidden = !hasD;
        }
      },
      mirror(m) { if (avatar) avatar.setMirrored(m); },
      render(pl) {
        const item = pl.plan.items[pl.idx];
        const total = pl.phase === 'ready' ? TRANSITION_SECS : (item ? item.secs : 1);
        const frac = Math.max(pl.remaining / total, 0);
        ringFg.style.strokeDashoffset = String(CIRC * (1 - frac));
        document.getElementById('ring-num').textContent = pl.phase === 'paused' ? '⏸' : String(Math.max(pl.remaining, 0));
        document.getElementById('btn-pause').textContent = pl.phase === 'paused' ? 'Resume' : 'Pause';
      },
      done(stats) { (plan.onDone || finishSession)(stats); },
    },
  });

  if (DEV_QA) window.__nrjf = { player, store, avatar };   // dev-only QA handle (?dev=…)

  document.getElementById('btn-pause').addEventListener('click', () => {
    if (player.phase === 'paused') player.resume();
    else player.pause();
  });
  document.getElementById('btn-skip').addEventListener('click', () => player.skip());
  const btnSimpler = document.getElementById('btn-simpler');
  if (btnSimpler) btnSimpler.addEventListener('click', () => {
    const it = player.plan.items[player.idx];
    if (it && it.ex.simpler) player.speakVariant(it.ex.simpler);
  });
  const btnDeeper = document.getElementById('btn-deeper');
  if (btnDeeper) btnDeeper.addEventListener('click', () => {
    const it = player.plan.items[player.idx];
    if (it && it.ex.deeper) player.speakVariant(it.ex.deeper);
  });
  document.getElementById('btn-end').addEventListener('click', () => {
    if (confirm('End this session?')) player.endEarly();
  });

  // Hold the session (and its timer) until the check-in finishes, then begin. A safety
  // timeout guarantees a stuck or silent greeting can never strand the session; the
  // `begun` guard + identity check make sure we only ever start THIS session once.
  if (checkinText) {
    const thisPlayer = player;
    let begun = false;
    const begin = () => {
      if (begun) return; begun = true;
      if (player === thisPlayer && thisPlayer.phase === 'idle') thisPlayer.start();
    };
    coach.speak(checkinText, { interrupt: true }).then(begin, begin);
    setTimeout(begin, 12000);
  } else {
    player.start();
  }
}

// Quietly replace the photoreal coach with the lean one mid-session. A fresh
// canvas is used because a disposed WebGL context cannot be re-bound.
function swapToLeanAvatar(oldCanvas, char) {
  try { if (avatar && avatar.dispose) avatar.dispose(); } catch { /* ok */ }
  const fresh = oldCanvas.cloneNode(false); // copies id/class, not the GL context
  if (oldCanvas.parentNode) oldCanvas.replaceWith(fresh);
  try {
    avatar = new Avatar(fresh, char);
    avatar.start();
    if (DEV_QA && window.__nrjf) window.__nrjf.avatar = avatar;
    const it = player && player.plan && player.plan.items[player.idx];
    if (it) avatar.setPose(POSES[it.ex.id] || null);
  } catch (e) {
    console.warn('lean fallback failed:', e);
    fresh.closest('.stage')?.classList.add('no-webgl');
  }
}

function teardownSession() {
  if (player) { try { player.dispose(); } catch { /* ok */ } }
  player = null;
  coach.cancel();
  coach.onCaption = null;
  coach.onSpeechStart = null;
  coach.onSpeechEnd = null;
  naturalVoice.onProgress = null;
  music.stop();
  if (avatar) { avatar.dispose(); avatar = null; }
  if (window.__nrjf) window.__nrjf = null;   // drop the dev QA handle's stale refs
}

function finishSession(stats) {
  const lvlBefore = levelInfo(store.progress.totalMins).level;
  const stageBefore = gardenStage(store.progress.sessions.length, GARDEN_STAGE_SESSIONS);
  let newBadges = [];
  if (stats.minsMoved >= 1 && stats.completedIds.length > 0) {
    recordSession(store, stats);
    newBadges = checkBadges(store, GARDEN_STAGE_SESSIONS);
    // advance the optional program's suggestion pointer — purely a "what next"
    // nicety; the garden/streak/level/badge state above never read program state.
    if (store.progress.program) {
      const prog = getProgram(store.progress.program.id);
      if (prog) store.progress.program = advanceProgram(prog, store.progress.program);
    }
    save();
  }
  const lvlAfter = levelInfo(store.progress.totalMins);
  const stageAfter = gardenStage(store.progress.sessions.length, GARDEN_STAGE_SESSIONS);
  const leveledUp = lvlAfter.level > lvlBefore;
  const grew = stageAfter > stageBefore;
  const streak = streakInfo(store.progress.sessions);

  if (avatar) { avatar.dispose(); avatar = null; }
  player = null;
  // leave the #session hash so a reload cannot silently auto-start a new session
  history.replaceState(null, '', location.pathname + location.search + '#done');

  if (!stats.minsMoved || !stats.completedIds.length) {
    go('#');
    return;
  }

  celebrate();
  if (newBadges.length) setTimeout(() => sound.sparkle(), 700);

  const badgeCards = newBadges.map((id) => {
    const b = BADGES.find((x) => x.id === id);
    return b ? `<div class="badge-pop">${b.icon}<div><strong>${esc(b.name)}</strong><br><small>${esc(b.desc)}</small></div></div>` : '';
  }).join('');

  // Durable transcript of everything the coach narrated this session. The live caption
  // is transient, so this gives a Deaf/HoH user a permanent record of a workout (or
  // meditation) — parallels the learning screen's transcript, which only covers lessons.
  const spoken = (coach.transcript || []).slice();
  const transcriptHTML = spoken.length ? `
      <section class="card fin-transcript">
        <details>
          <summary>Read what your coach said</summary>
          ${spoken.map((line) => `<p>${esc(line)}</p>`).join('')}
        </details>
      </section>` : '';

  app.innerHTML = `
    <main class="narrow done-screen">
      <section class="card center">
        <div class="garden-svg small">${gardenSVG(stageAfter)}</div>
        <h2>That was lovely. 🌼</h2>
        <p class="done-stats"><strong>${stats.minsMoved} min</strong> moved · streak <strong>${streak.count} day${streak.count === 1 ? '' : 's'}</strong></p>
        ${grew ? '<p class="grew">Your garden just grew. Go look at it.</p>' : ''}
        ${leveledUp ? `<p class="grew">Level up! You are now <strong>${lvlAfter.title}</strong>.</p>` : ''}
        ${badgeCards ? `<div class="badge-pops"><h3>New badge${newBadges.length > 1 ? 's' : ''}!</h3>${badgeCards}</div>` : ''}
        <button class="btn btn-primary" id="btn-home">Back to my garden</button>
      </section>
      ${transcriptHTML}
    </main>`;
  document.getElementById('btn-home').addEventListener('click', () => go('#'));
}

// ---------------------------------------------------------------- you (dashboard)

// All dashboard personal data (weight, birthday) lives ONLY in localStorage and is
// never transmitted, consistent with the app's "private by design" promise.
const AFFIRMATIONS = [
  'You show up for yourself, and that quiet effort matters more than you know.',
  'You are growing — in your garden and far beyond it.',
  'The people in your life are lucky to have you in it.',
  'Be as gentle with yourself today as you are with everyone else.',
  'However this year went, you kept going. That is something to celebrate.',
];

function fmtDateL(iso) { try { return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); } catch { return ''; } }

function ageFromBirthday(iso) {
  if (!iso || typeof iso !== 'string') return null;
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return null;
  const now = new Date();
  let age = now.getFullYear() - y;
  const hadIt = (now.getMonth() + 1 > m) || (now.getMonth() + 1 === m && now.getDate() >= d);
  if (!hadIt) age -= 1;
  return (age >= 0 && age < 140) ? age : null;
}

function daysToBirthday(iso) {
  if (!iso || typeof iso !== 'string') return null;
  const [, m, d] = iso.split('-').map(Number);
  if (!m || !d) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(now.getFullYear(), m - 1, d);
  if (next < today) next = new Date(now.getFullYear() + 1, m - 1, d);
  return Math.round((next - today) / 86400000);
}

// A tiny inline sparkline of recent weight entries — trend only, no axes, no goal.
function weightSpark(weights) {
  const pts = weights.slice(-24).map((w) => Number(w.value)).filter((v) => !isNaN(v));
  if (pts.length < 2) return '';
  const min = Math.min(...pts), max = Math.max(...pts), range = (max - min) || 1;
  const W = 300, H = 64, pad = 6, step = (W - pad * 2) / (pts.length - 1);
  const coords = pts.map((v, i) => `${(pad + i * step).toFixed(1)},${(pad + (H - pad * 2) * (1 - (v - min) / range)).toFixed(1)}`).join(' ');
  return `<svg class="you-spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><polyline points="${coords}" fill="none" stroke="var(--green-600)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}

// On the user's birthday (and once per year), throw a gentle, affirming party.
function maybeBirthdayParty() {
  const b = store.profile.birthday;
  if (!b || typeof b !== 'string') return;
  const [, bm, bd] = b.split('-').map(Number);
  if (!bm || !bd) return;
  const now = new Date();
  const yr = String(now.getFullYear());
  if (now.getMonth() + 1 !== bm || now.getDate() !== bd) return;
  if (store.profile.lastBirthdayParty === yr) return;
  if (document.querySelector('.overlay.birthday')) return;
  store.profile.lastBirthdayParty = yr; save();

  const name = store.profile.name;
  const age = ageFromBirthday(b);
  const ov = document.createElement('div');
  ov.className = 'overlay birthday';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-label', 'Birthday celebration');
  ov.innerHTML = `<div class="overlay-card birthday-card center">
    <div class="bday-emoji" aria-hidden="true">🎂🎉</div>
    <h2>Happy birthday${name ? ', ' + esc(name) : ''}!</h2>
    ${age != null ? `<p class="bday-age">${age} years of you — and the world is better for it.</p>` : '<p class="bday-age">Today is all about you.</p>'}
    <ul class="bday-affirm">${AFFIRMATIONS.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
    <button class="btn btn-primary" id="bday-ok">Thank you 💛</button>
  </div>`;
  document.body.appendChild(ov);
  const btn = ov.querySelector('#bday-ok');
  btn.focus();
  ov.addEventListener('keydown', (e) => { if (e.key === 'Tab') { e.preventDefault(); btn.focus(); } });
  btn.addEventListener('click', () => ov.remove());
  // a big, layered confetti party
  celebrate(3600);
  setTimeout(() => celebrate(2800), 500);
  setTimeout(() => celebrate(2200), 1100);
  try { sound.sparkle(); } catch { /* sfx optional */ }
}

function youScreen() {
  const p = store.progress;
  const prof = store.profile;
  const streak = streakInfo(p.sessions);
  const lvl = levelInfo(p.totalMins);
  const stage = gardenStage(p.sessions.length, GARDEN_STAGE_SESSIONS);
  const name = prof.name;
  const age = ageFromBirthday(prof.birthday);
  const weights = Array.isArray(p.weights) ? p.weights : [];
  const lastW = weights[weights.length - 1];
  const unit = prof.weightUnit === 'kg' ? 'kg' : 'lb';

  const subjectCards = TRACK_LIST.map((id) => {
    const tk = getTrack(id);
    if (!tk) return '';
    const t = p.learning[id] || {};
    const total = tk.lessons.LESSON_LIBRARY.length;
    const done = new Set((t.lessons || []).filter((l) => l && !l.game && !l.quiz).map((l) => l.id)).size;
    return `<button class="you-subject" data-go="#learn-${id}">
      <span class="you-subj-ic" aria-hidden="true">${tk.theme.lessonIcon}</span>
      <span class="you-subj-body">
        <span class="you-subj-head"><strong>${esc(tk.homeLabel)}</strong>${t.completedAt ? `<span class="fin-done-tag">✓ ${esc(fmtDateL(t.completedAt))}</span>` : ''}</span>
        <span class="you-subj-stats">${done}/${total} lessons · ${t.gamesWon || 0} game win${(t.gamesWon || 0) === 1 ? '' : 's'} · quiz ${t.quizBest || 0}%</span>
      </span>
    </button>`;
  }).join('');

  const entries = [];
  TRACK_LIST.forEach((id) => {
    const tk = getTrack(id);
    if (!tk) return;
    const t = p.learning[id] || {};
    (t.lessons || []).forEach((l) => {
      let what = 'Lesson';
      if (l.quiz) what = 'Quiz · ' + (l.score != null ? l.score + '%' : 'done');
      else if (l.game) what = l.won ? 'Game win' : 'Game';
      entries.push({ date: l.date || '', label: tk.homeLabel, what });
    });
  });
  entries.sort((a, b) => (a.date < b.date ? 1 : (a.date > b.date ? -1 : 0)));
  const recent = entries.slice(0, 10);
  const logHTML = recent.length
    ? `<ul class="you-log">${recent.map((e) => `<li><span class="you-log-what">${esc(e.label)} — ${esc(e.what)}</span><span class="you-log-date">${esc(e.date)}</span></li>`).join('')}</ul>`
    : '<p class="hint">Finish a lesson, game, or quiz and it will show up here.</p>';

  const recentWeights = weights.slice(-6).reverse();
  const recentMeals = listMeals().slice(0, 8).map((m) => ({
    id: m.id, note: m.note,
    stamp: (() => { try { return new Date(m.ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); } catch { return m.ts; } })(),
  }));

  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">You</h1></header>
    <main class="narrow you-screen">
      <section class="card center">
        <div class="garden-svg small">${gardenSVG(stage)}</div>
        ${name
          ? `<p class="you-hello">Hi, ${esc(name)}!${age != null ? ` · <strong>${age}</strong>` : ''}</p>`
          : `<div class="you-name-prompt">
              <label class="you-hello" for="you-name-input">What should your coach call you?</label>
              <div class="you-name-form">
                <input type="text" id="you-name-input" maxlength="20" autocomplete="given-name" placeholder="Your name" aria-label="Your name">
                <button class="btn btn-primary" id="you-name-save">Save</button>
              </div>
              <p class="hint">Optional, and only stored on this device. Your coach will greet you by it.</p>
            </div>`}
        <div class="you-stats">
          <div><strong>${p.sessions.length}</strong><span>sessions grown</span></div>
          <div><strong>${streak.count}</strong><span>day streak</span></div>
          <div><strong>Lv ${lvl.level}</strong><span>${p.totalMins} min moved</span></div>
        </div>
      </section>

      <section class="card">
        <h2>Your rhythm</h2>
        ${usageGraphsHTML(p)}
      </section>

      <section class="card">
        <h2>Your journal</h2>
        <p class="hint">A private place to write or speak your thoughts — kept as a book you can read, or hear read back in your coach's voice.</p>
        <a class="btn btn-primary you-journal-open" href="#journal">Open your journal</a>
      </section>

      <section class="card">
        <h2>Your subjects</h2>
        <div class="you-subjects">${subjectCards}</div>
      </section>

      <section class="card">
        <h2>Weight tracker</h2>
        <p class="hint">Private to this device. No goal here — just your own trend over time, if you want it.</p>
        ${lastW ? `<p class="you-weight-now">Latest: <strong>${esc(String(lastW.value))} ${unit}</strong> <span class="you-log-date">${esc(lastW.date)}</span></p>` : ''}
        ${weightSpark(weights)}
        <div class="you-weight-form">
          <input type="number" inputmode="decimal" id="you-weight-input" placeholder="Today's weight" step="0.1" min="0" max="2000" aria-label="Today's weight">
          <select id="you-weight-unit" aria-label="Weight unit"><option value="lb"${unit === 'lb' ? ' selected' : ''}>lb</option><option value="kg"${unit === 'kg' ? ' selected' : ''}>kg</option></select>
          <button class="btn btn-primary" id="you-weight-save">Log</button>
        </div>
        ${recentWeights.length ? `<ul class="you-wlist">${recentWeights.map((w) => `<li><span>${esc(w.date)}</span><span>${esc(String(w.value))} ${unit}</span></li>`).join('')}</ul>` : ''}
      </section>

      <section class="card">
        <h2>Meals</h2>
        <p class="hint">A gentle place to note what you ate, if it helps you notice patterns. No calories, no targets, no scores — just your own notes, on this device.</p>
        <div class="you-meal-form">
          <input type="text" id="you-meal-input" maxlength="200" placeholder="e.g. oatmeal and berries" aria-label="Meal note">
          <button class="btn btn-primary" id="you-meal-save">Add</button>
        </div>
        ${recentMeals.length ? `<ul class="you-log you-meal-list">${recentMeals.map((m) => `<li><span class="you-log-what">${esc(m.note)}</span><span class="you-log-date">${esc(m.stamp)}</span> <button class="linkish you-meal-del" data-id="${esc(m.id)}" aria-label="Delete meal note">✕</button></li>`).join('')}</ul>` : '<p class="hint">No notes yet.</p>'}
      </section>

      <section class="card" data-intimacy>
        <h2>Personal calendar</h2>
        ${intimacyCardHTML()}
      </section>

      <section class="card">
        <h2>Birthday</h2>
        <p class="hint">Set it and we will throw you a little party on the day. It stays on this device.</p>
        <div class="you-bday-form">
          <input type="date" id="you-bday-input" value="${esc(prof.birthday || '')}" aria-label="Your birthday">
          <button class="btn" id="you-bday-save">Save</button>
        </div>
        ${prof.birthday ? `<p class="hint">${daysToBirthday(prof.birthday) === 0 ? '🎉 It is your birthday today!' : 'Next birthday in <strong>' + daysToBirthday(prof.birthday) + '</strong> day' + (daysToBirthday(prof.birthday) === 1 ? '' : 's') + '.'}</p>` : ''}
      </section>

      <section class="card">
        <h2>Recent activity</h2>
        ${logHTML}
      </section>

      <footer class="privacy-note"><p>🌱 <strong>Private by design.</strong> Everything here — including your weight and birthday — lives only on this device and never leaves it.</p></footer>
    </main>`;

  app.querySelectorAll('.you-subject').forEach((b) => b.addEventListener('click', () => go(b.dataset.go)));
  const nsave = document.getElementById('you-name-save');
  if (nsave) {
    const commitName = () => {
      const val = (document.getElementById('you-name-input').value || '').trim().slice(0, 20);
      store.profile.name = val;
      save();
      youScreen();
    };
    nsave.addEventListener('click', commitName);
    const ninput = document.getElementById('you-name-input');
    if (ninput) ninput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); commitName(); } });
  }
  const wsave = document.getElementById('you-weight-save');
  if (wsave) wsave.addEventListener('click', () => {
    const v = parseFloat(document.getElementById('you-weight-input').value);
    const u = document.getElementById('you-weight-unit').value;
    store.profile.weightUnit = (u === 'kg' ? 'kg' : 'lb');
    if (!isNaN(v) && v > 0 && v < 2000) {
      const today = todayKey();
      const existing = store.progress.weights.find((w) => w.date === today);
      if (existing) existing.value = v; else store.progress.weights.push({ date: today, value: v });
    }
    save();
    youScreen();
  });
  const msave = document.getElementById('you-meal-save');
  if (msave) {
    const commitMeal = () => {
      const inp = document.getElementById('you-meal-input');
      if (addMeal(inp.value)) { inp.value = ''; youScreen(); }
    };
    msave.addEventListener('click', commitMeal);
    const minput = document.getElementById('you-meal-input');
    if (minput) minput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); commitMeal(); } });
  }
  app.querySelectorAll('.you-meal-del').forEach((b) => b.addEventListener('click', () => { removeMeal(b.dataset.id); youScreen(); }));
  const intimEnable = document.getElementById('you-intim-enable');
  if (intimEnable) intimEnable.addEventListener('click', () => { setIntimEnabled(true); go('#calendar'); });
  const bsave = document.getElementById('you-bday-save');
  if (bsave) bsave.addEventListener('click', () => {
    const val = document.getElementById('you-bday-input').value;
    store.profile.birthday = (typeof val === 'string') ? val : '';
    save();
    youScreen();
    maybeBirthdayParty();
  });
}

// ---------------------------------------------------------------- badges

function badgesScreen() {
  const earned = store.progress.badges;
  const cell = (b) => {
    const got = earned[b.id];
    return `<div class="badge-cell ${b.category ? esc(b.category) + ' ' : ''}${got ? 'earned' : 'locked'}">
      <div class="badge-icon">${b.icon}</div>
      <strong>${esc(b.name)}</strong>
      <small>${esc(b.desc)}</small>
      ${got ? `<span class="badge-date">${new Date(got).toLocaleDateString()}</span>` : '<span class="badge-lock" aria-label="Locked">🔒</span>'}
    </div>`;
  };
  // Each learning track gets its own partitioned, labelled section after the
  // fitness badges — distinct accent per category (driven by the badge-cell class).
  // Mind subjects first, then the Soul sections (crystals/dreams).
  const trackSections = [...TRACK_LIST, ...SOUL_TRACK_LIST].map((tid) => {
    const t = getTrack(tid);
    if (!t || !t.badges.length) return '';
    const emoji = (t.theme && t.theme.badgeEmoji) || '🌸';
    return `<div class="badge-section-label">${emoji} ${esc(t.homeLabel)} badges</div>${t.badges.map(cell).join('')}`;
  }).join('');
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">Badges</h1></header>
    <main class="narrow">
      <div class="badge-grid">
        ${BADGES.map(cell).join('')}
        ${trackSections}
      </div>
    </main>`;
}

// ---------------------------------------------------------------- settings

function portraitSVG(c) {
  return `<svg viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="36" r="17" fill="${c.skin}"/>
    <path d="M14 34 a18 18 0 0 1 36 0 l-3 -10 a16 16 0 0 0 -30 0 z" fill="${c.hair}"/>
    <circle cx="32" cy="20" r="11" fill="${c.hair}"/>
    <circle cx="26" cy="36" r="2" fill="#27201b"/><circle cx="38" cy="36" r="2" fill="#27201b"/>
    <path d="M27 43 q5 4 10 0" stroke="#27201b" stroke-width="2" fill="none" stroke-linecap="round"/>
    <rect x="20" y="52" width="24" height="10" rx="5" fill="${c.top}"/>
  </svg>`;
}

function settingsScreen() {
  const p = store.profile;
  const voices = coach.listVoices();
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">Settings</h1></header>
    <main class="narrow settings">
      <section class="card">
        <label for="set-name"><strong>Your first name</strong> <small>(optional — your coach will use it)</small></label>
        <input id="set-name" type="text" maxlength="20" autocomplete="given-name" value="${esc(p.name)}" placeholder="e.g. Dana">
      </section>

      <section class="card">
        <strong>Your coach</strong>
        <div class="char-grid">
          ${CHARACTERS.map((c) => `
            <button class="char-card ${c.id === p.character ? 'selected' : ''}" data-id="${c.id}" aria-pressed="${c.id === p.character}">
              ${portraitSVG(c)}<span>${c.name}</span><small>${c.blurb}</small>
            </button>`).join('')}
        </div>
      </section>

      <section class="card">
        <strong>Coach voice</strong>
        <div class="row">
          <select id="set-voice" aria-label="Voice">
            <option value="">System default</option>
            ${voices.map((v) => `<option value="${esc(v.uri)}" ${v.uri === p.voiceURI ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}
          </select>
          <button class="btn" id="btn-test-voice">Hear it</button>
        </div>
        <label class="toggle"><input type="checkbox" id="set-voiceon" ${p.voiceOn ? 'checked' : ''}> Voice on <small>(captions always stay on)</small></label>
      </section>

      <section class="card">
        <strong>Lifelike voice <span class="beta-chip">beta</span></strong>
        <p class="hint">Each coach gets their own warm, human-sounding voice that runs entirely on this device. On capable devices it turns on by itself — a one-time download of about 90 MB, in the background — and nothing about you is ever sent anywhere. On slower devices, or if you switch it off here, the regular voice takes over automatically.</p>
        <label class="toggle"><input type="checkbox" id="set-natural" ${p.naturalOn ? 'checked' : ''}> Use the lifelike voice</label>
        <div class="nv-progress" id="nv-progress" hidden>
          <div class="nv-track"><div class="nv-bar" id="nv-bar"></div></div>
          <small id="nv-status" role="status"></small>
        </div>
      </section>

      <section class="card">
        <strong>Full instructor <span class="beta-chip">beta</span></strong>
        <p class="hint">A photoreal coach who breathes and stands with you, instead of the friendly stick-figure. She downloads once (about 2 MB) and then works offline. She is a preview — detailed movement for each exercise is still on the way, and the light coach keeps doing the moves in the meantime. On slower phones the app uses the light coach automatically.</p>
        <label class="toggle"><input type="checkbox" id="set-fullinstructor" ${p.fullInstructorOn ? 'checked' : ''}> Use the full instructor</label>
        <small class="hint" id="fi-status" role="status"></small>
      </section>

      <section class="card">
        <strong>Encouragement style</strong>
        <div class="style-row" role="group" aria-label="Encouragement style">
          ${['gentle', 'cheerleader', 'funny'].map((s) => `
            <button class="style-card ${p.style === s ? 'selected' : ''}" data-style="${s}" aria-pressed="${p.style === s}">
              <strong>${s[0].toUpperCase() + s.slice(1)}</strong>
              <small>${esc(pick(PHRASES.styles[s].mid))}</small>
            </button>`).join('')}
        </div>
      </section>

      <section class="card">
        <strong>Sound</strong>
        <label class="toggle"><input type="checkbox" id="set-sfx" ${p.sfxOn ? 'checked' : ''}> Gentle chimes</label>
        <label class="toggle"><input type="checkbox" id="set-music" ${p.musicOn ? 'checked' : ''}> Background music <small>(soft generated ambience)</small></label>
        <label for="set-vol" class="vol-label">Music volume</label>
        <input type="range" id="set-vol" min="0" max="1" step="0.05" value="${p.musicVol}">
      </section>

      <section class="card">
        <strong>Help</strong>
        <p class="set-help-links"><a href="#tutorial">How to use the app</a> · <a href="#faq">FAQ &amp; privacy</a> · <a href="#safety">Safety notice</a></p>
        <p class="privacy-inline">🌱 Everything you see in this app is stored only on this device. Nothing is ever uploaded, because there is nowhere to upload it to.</p>
        <button class="btn btn-danger" id="btn-reset">Reset my data</button>
      </section>
    </main>`;

  document.getElementById('set-name').addEventListener('change', (e) => {
    p.name = e.target.value.trim().slice(0, 20);
    save();
  });
  app.querySelectorAll('.char-card').forEach((b) => b.addEventListener('click', () => {
    p.character = b.dataset.id;
    save();
    settingsScreen();
  }));
  const voiceSel = document.getElementById('set-voice');
  voiceSel.addEventListener('change', (e) => {
    p.voiceURI = e.target.value;
    save();
  });
  // iOS/Safari load voices late — repopulate when the user opens the picker
  const repopulate = () => {
    const vs = coach.listVoices();
    if (vs.length + 1 === voiceSel.options.length) return;
    voiceSel.innerHTML = '<option value="">System default</option>' +
      vs.map((v) => `<option value="${esc(v.uri)}" ${v.uri === p.voiceURI ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('');
  };
  voiceSel.addEventListener('focus', repopulate);
  setTimeout(repopulate, 800);
  document.getElementById('btn-test-voice').addEventListener('click', () => {
    sound.unlock();
    coach.enabled = true;
    coach.voiceURI = p.voiceURI;
    coach.naturalOn = p.naturalOn;
    coach.setCharacterVoice(getCharacter(p.character)); // preview in the selected coach's own voice
    // if the natural voice was retired earlier this visit, give it another chance so the
    // preview can actually demo it rather than silently falling back to the system voice
    if (p.naturalOn && naturalVoice.state !== 'ready' && naturalVoice.state !== 'loading') naturalVoice.enable();
    coach.speak(personalize(pick(PHRASES.styles[p.style].welcome), p.name), { interrupt: true });
    coach.enabled = p.voiceOn;
  });
  document.getElementById('set-voiceon').addEventListener('change', (e) => {
    p.voiceOn = e.target.checked; coach.enabled = p.voiceOn; save();
  });
  const nvToggle = document.getElementById('set-natural');
  const nvWrap = document.getElementById('nv-progress');
  const nvBar = document.getElementById('nv-bar');
  const nvStatus = document.getElementById('nv-status');
  const nvShow = (state, prog) => {
    if (state === 'loading') {
      nvWrap.hidden = false;
      nvBar.style.width = Math.round(prog * 100) + '%';
      nvStatus.textContent = `Downloading the voice, one time only… ${Math.round(prog * 100)}%`;
    } else if (state === 'ready') {
      nvWrap.hidden = false;
      nvBar.style.width = '100%';
      nvStatus.textContent = 'Natural voice ready. Tap "Hear it" above to try her out.';
    } else if (state === 'slow') {
      nvWrap.hidden = false;
      nvBar.style.width = '100%';
      nvStatus.textContent = 'This device makes the voice too slowly for live coaching, so the regular voice will do the talking. A newer computer or phone may manage it.';
      nvToggle.checked = false;
      p.naturalOn = false; coach.naturalOn = false; save();
    } else if (state === 'failed') {
      // transient (network, CDN) — keep the user's choice; next launch retries
      nvWrap.hidden = false;
      nvStatus.textContent = 'Could not load the natural voice right now — the regular voice will carry on, and the app will try again next time.';
    } else {
      nvWrap.hidden = true;
    }
  };
  naturalVoice.onProgress = nvShow;
  if (p.naturalOn && naturalVoice.state === 'off') naturalVoice.enable(); // opted in earlier — warm it up here too
  if (p.naturalOn || naturalVoice.state !== 'off') nvShow(naturalVoice.state, naturalVoice.progress);
  nvToggle.addEventListener('change', (e) => {
    p.naturalOn = e.target.checked;
    p.voicePref = e.target.checked ? 'on' : 'off'; // explicit choice — auto-enable won't override it
    coach.naturalOn = p.naturalOn;
    save();
    if (p.naturalOn) naturalVoice.enable({ reprobe: true }); // explicit ask re-measures the device
    else nvWrap.hidden = true;
  });
  const fiToggle = document.getElementById('set-fullinstructor');
  const fiStatus = document.getElementById('fi-status');
  fiToggle.addEventListener('change', async (e) => {
    p.fullInstructorOn = e.target.checked;
    save();
    if (!p.fullInstructorOn) { fiStatus.textContent = ''; return; }
    await ensureRealisticClass();
    realisticHelpers.clearRealisticVerdict(); // an explicit opt-in re-tests the device
    if (!realisticHelpers.realisticInstructorSupported()) {
      fiStatus.textContent = 'This device does not support the full instructor, so the light coach will be used.';
      p.fullInstructorOn = false; fiToggle.checked = false; save();
    } else {
      fiStatus.textContent = 'On. The full instructor will appear in your next session, with the light coach ready as backup.';
    }
  });
  if (p.fullInstructorOn) fiStatus.textContent = 'On. The full instructor appears in your sessions, with the light coach as automatic backup.';
  app.querySelectorAll('.style-card').forEach((b) => b.addEventListener('click', () => {
    p.style = b.dataset.style;
    save();
    settingsScreen();
  }));
  document.getElementById('set-sfx').addEventListener('change', (e) => {
    p.sfxOn = e.target.checked; sound.sfxOn = p.sfxOn; save();
    if (p.sfxOn) { sound.unlock(); sound.chime(); }
  });
  document.getElementById('set-music').addEventListener('change', (e) => {
    p.musicOn = e.target.checked; save();
    if (p.musicOn) { sound.unlock(); music.volume = p.musicVol; music.start(); }
    else music.stop();
  });
  document.getElementById('set-vol').addEventListener('input', (e) => {
    p.musicVol = parseFloat(e.target.value);
    music.setVolume(p.musicVol);
    save();
  });
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Reset everything? Your garden, streak, badges and settings will start over. This cannot be undone.')) {
      resetAll();
      // resetAll clears localStorage; also wipe the journal audio in IndexedDB (loaded on demand).
      import('./idb.js').then((m) => m.clearAllAudio()).catch(() => {});
      go('#');
    }
  });
}

// ---------------------------------------------------------------- router

let Avatar = null; // resolved lazily so the home screen renders instantly
let RealisticAvatar = null;
let realisticHelpers = null;
let renderSeq = 0; // guards against concurrent renders across the async import

async function ensureAvatarClass() {
  if (!Avatar) {
    const mod = await import('./avatar.js');
    Avatar = mod.Avatar;
  }
}

// Resolve the photoreal instructor only when it is actually wanted — its loader
// and model stay out of the default path entirely.
async function ensureRealisticClass() {
  if (!RealisticAvatar) {
    const mod = await import('./realistic-avatar.js');
    RealisticAvatar = mod.RealisticAvatar;
    realisticHelpers = mod;
  }
}

// Learning lessons reuse the session player. On completion we tear down the
// avatar/Player (as finishSession does) then hand off to the track's completion
// screen, which records the result and celebrates. An early exit records nothing
// and just returns to the subject hub. The coach's instructor "prop" (finance =
// reading glasses; other subjects get their own) is injected from the registry a
// beat after arriving, to mark the shift into a lesson (criterion 3). Additive:
// only the learning path runs this.
function startLessonFor(trackId, plan) {
  const track = getTrack(trackId);
  const hub = '#learn-' + trackId;
  plan.onDone = (stats) => {
    if (avatar) { avatar.dispose(); avatar = null; }
    player = null;
    history.replaceState(null, '', location.pathname + location.search + hub);
    if (stats && stats.early) { go(hub); return; }
    learningDone(trackId, plan);
  };
  sessionScreen(plan);
  const prop = track && track.prop;
  const stage = document.querySelector('.session .stage');
  if (stage && prop && prop.svg && !stage.querySelector('.' + prop.className)) {
    stage.insertAdjacentHTML('beforeend', prop.svg);
    if (prop.onClass) setTimeout(() => stage.classList.add(prop.onClass), prop.delayMs || 450);
  }
}

// Build a session plan for a play route, or null if it cannot/should not start.
function planFor(mins, tier) {
  if (tier === 'meditation') return buildMeditation(mins);
  // The Body paths: Stretching / Yoga scope the pool by category (always available);
  // Exercises uses the intensity tiers, which the screening can gate.
  const category = ['stretch', 'yoga', 'face', 'baby', 'sexercise'].includes(tier) ? tier : 'exercise';
  if (category === 'exercise' && !availableTiers(store.profile).includes(tier)) return null;
  const pool = filterPool(ALL_EXERCISES, store.profile);
  return buildSession(mins, pool, {
    lastCloseId: store.progress.lastCloseId, tier,
    tierEligibility: ALL_TIER_ELIGIBILITY, category, workoutCategory: ALL_WORKOUT_CATEGORY,
  });
}

async function render() {
  const seq = ++renderSeq;
  teardownSession();
  applyMotionPref();
  window.scrollTo(0, 0);
  maybeBirthdayParty();   // once per year, on the day — self-guards against re-showing
  await routeTo(location.hash || '#', seq);
  // Move focus to the new screen's primary heading so keyboard and screen-reader
  // users land on the fresh content instead of being silently dropped to <body>
  // on every route change (WCAG 2.4.3). Skip if a newer render superseded us.
  if (seq === renderSeq) focusScreenHeading();
}

// Centralized focus move for route changes (see render()). The primary heading is
// given tabindex="-1" so it is programmatically focusable without joining the tab
// order; we fall back to <main> for screens with no heading (e.g. home). An open
// modal (safety/birthday) manages its own focus, so leave it alone.
function focusScreenHeading() {
  if (document.querySelector('.overlay')) return;
  const target = app.querySelector('h1, h2') || app.querySelector('main') || app;
  if (!target) return;
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

async function routeTo(h, seq) {
  // tier chooser for a chosen duration
  if (h.startsWith('#tier-')) {
    const mins = parseInt(h.slice(6), 10);
    if (DURATIONS.includes(mins)) return tierScreen(mins);
  }

  // a themed-library meditation
  if (h.startsWith('#play-lib-')) {
    const medId = h.slice('#play-lib-'.length);
    const plan = buildMeditationById(medId);
    if (!plan) { homeScreen(); return; }
    await ensureAvatarClass();
    if (store.profile.fullInstructorOn) await ensureRealisticClass();
    if (seq !== renderSeq) return;
    sessionScreen(plan);
    return;
  }

  // a tiered workout or the core meditation: #play-{mins}-{tier}
  if (h.startsWith('#play-')) {
    const rest = h.slice('#play-'.length);
    const dash = rest.indexOf('-');
    const mins = parseInt(rest.slice(0, dash), 10);
    const tier = rest.slice(dash + 1);
    if (DURATIONS.includes(mins) && TIER_META[tier]) {
      const plan = planFor(mins, tier);
      if (!plan) { go('#tier-' + mins); return; } // gated — send back to the chooser
      await ensureAvatarClass();
      if (store.profile.fullInstructorOn) await ensureRealisticClass();
      if (seq !== renderSeq) return; // superseded while modules loaded
      sessionScreen(plan);
      return;
    }
  }

  // ----- learning tracks (Mind): money + future subjects --------------------
  // Back-compat redirects for the original finance hashes (installed PWAs,
  // bookmarks, the completion screen's hash write). #fin-lib- before #fin-.
  if (h === '#money') { go('#learn-money'); return; }
  if (h.startsWith('#fin-lib-')) { go('#learn-money-lib-' + h.slice('#fin-lib-'.length)); return; }
  if (h.startsWith('#fin-')) { go('#learn-money-' + h.slice('#fin-'.length)); return; }

  // Generic learning routes — parsed by token-split so there is no #lib- vs
  // duration ordering hazard:
  //   #learn-<track>              -> the subject hub
  //   #learn-<track>-lib-<id>     -> one catalog lesson at its natural length
  //   #learn-<track>-<mins>       -> a duration-scaled study session
  if (h.startsWith('#learn-')) {
    const rest = h.slice('#learn-'.length);
    const dash = rest.indexOf('-');
    const trackId = dash === -1 ? rest : rest.slice(0, dash);
    const track = getTrack(trackId);
    if (!track) { homeScreen(); return; }
    const tail = dash === -1 ? '' : rest.slice(dash + 1);
    if (tail === '') return trackHubScreen(trackId);
    if (tail === 'quiz') return quizScreen(trackId);
    if (tail.startsWith('game-')) return gameScreen(trackId, tail.slice('game-'.length));

    let plan = null;
    if (tail.startsWith('lib-')) {
      plan = track.lessons.buildLessonById(tail.slice('lib-'.length));
    } else {
      const mins = parseInt(tail, 10);
      if (DURATIONS.includes(mins)) plan = track.lessons.buildLessonSession(mins);
    }
    if (!plan || !plan.items || !plan.items.length) { trackHubScreen(trackId); return; }
    await ensureAvatarClass();
    if (store.profile.fullInstructorOn) await ensureRealisticClass();
    if (seq !== renderSeq) return;
    return startLessonFor(trackId, plan);
  }

  // the three pillars
  if (h === '#mind') return mindScreen();
  if (h === '#body') return bodyScreen();
  if (h.startsWith('#move-')) {
    const cat = h.slice('#move-'.length);
    if (MOVE_META[cat]) return moveScreen(cat);
  }
  if (h === '#soul') return soulScreen();

  if (h === '#intake') return intakeScreen();
  if (h === '#programs') return programsScreen();
  if (h === '#you') return youScreen();
  // Journal: loaded on demand so its IndexedDB/recorder code never touches the boot path.
  if (h === '#journal') { import('./journal-screen.js').then((m) => m.journalScreen()).catch((e) => console.warn('journal load failed', e)); return; }
  if (h === '#calendar' || h === '#intimacy') { import('./intimacy-screen.js').then((m) => m.intimacyScreen()).catch((e) => console.warn('calendar load failed', e)); return; }
  // Help screens: loaded on demand — static copy that never needs to ride the boot path.
  if (h === '#tutorial') { import('./help-screens.js').then((m) => m.tutorialScreen()).catch((e) => console.warn('tutorial load failed', e)); return; }
  if (h === '#faq') { import('./help-screens.js').then((m) => m.faqScreen()).catch((e) => console.warn('faq load failed', e)); return; }
  if (h === '#badges') return badgesScreen();
  if (h === '#settings') return settingsScreen();
  if (h === '#safety') return safetyScreen();
  homeScreen();
}

window.addEventListener('hashchange', render);

// Lifelike voice, automatic: give every user the most human voice their DEVICE can
// handle, without ever hurting smoothness. On 'auto' (the default) we warm the natural
// voice in the BACKGROUND — first paint and the system voice are never blocked, the
// in-engine speed probe keeps weak devices on the lighter system voice, and it upgrades
// the live coach the moment the model is ready. The ~90 MB model is cached by the
// browser, so it downloads at most once per device. Honors an explicit on/off choice and
// Data Saver / very slow links. Nothing about the user is ever transmitted.
function maybeAutoEnableNaturalVoice() {
  const p = store.profile;
  if (p.voicePref === 'off') return;                       // user opted out — respect it
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
  const conn = (typeof navigator !== 'undefined' && navigator.connection) || {};
  if (conn.saveData) return;                               // honor Data Saver
  if (/2g$/.test(conn.effectiveType || '')) return;        // skip 2g / slow-2g links
  const explicit = p.voicePref === 'on' || p.naturalOn;    // user already chose it
  naturalVoice.enable().then((ready) => {
    if (!ready) return;                                    // slow device / failed -> system voice
    coach.naturalOn = true;                                // upgrade the live coach now
    if (!explicit) { p.naturalOn = true; save(); }         // remember for auto users
  }).catch(() => { /* system voice already covers it */ });
}

// dev visual QA: ?dev=poses or ?dev=garden
const devMode = new URLSearchParams(location.search).get('dev');
if (devMode) {
  import('./dev.js').then((m) => m.runDev(devMode));
} else {
  render();
  maybeShowSafety();             // launch disclaimer — shown once, regardless of entry route
  maybeAutoEnableNaturalVoice(); // background warm-up; never blocks first paint
}

// PWA service worker (registered late so first paint wins)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* offline still optional */ });
  });
}
