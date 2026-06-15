// You Got This! — app shell and screens.
// Private by design: every byte of your data lives in localStorage on this
// device. No accounts, no analytics, no tracking, no server. Ever.

import { store, save, resetAll, todayKey } from './state.js';
import { CHARACTERS, getCharacter } from './characters.js';
import { coach, personalize, pick } from './tts.js';
import { naturalVoice } from './natural-voice.js';
import { sound, music } from './audio.js';
import { buildSession, TRANSITION_SECS } from './sessionEngine.js';
import { streakInfo, levelInfo, gardenStage, checkBadges, recordSession, LEVELS } from './gamify.js';
import { Player } from './player.js';
import { celebrate } from './confetti.js';
import { EXERCISES } from './data/exercises.js';
import { PHRASES } from './data/phrases.js';
import { BADGES } from './data/badges.js';
import { gardenSVG, GARDEN_STAGE_SESSIONS } from './data/garden.js';
import { POSES } from './data/poses.js';
import { NEW_EXERCISES, TIER_ELIGIBILITY } from './data/movements-ext.js';
import { MODES, TIER_META, DURATIONS } from './data/tiers.js';
import { buildMeditation, buildMeditationById, MEDITATION_LIBRARY } from './data/meditation.js';
import { availableTiers, gateMessage, routeTrack, filterPool, evaluateScreening,
  PARQ_GENERAL, PARQ_POSTPARTUM, LIFE_STAGES, SEX_OPTIONS, AGE_BANDS, INJURY_FLAGS, SPACE_OPTIONS } from './data/profiles.js';
import { PROGRAMS, getProgram, programSuggestion, advanceProgram } from './data/programs.js';
import { getTrack, TRACK_LIST } from './data/tracks.js';
import { trackHubScreen, learningDone } from './learning-screen.js';

const app = document.getElementById('app');
let avatar = null;        // lazy three.js instance, one at a time
let player = null;

// The full movement pool = frozen 29 + appended new movements. exercises.js stays
// byte-stable; tier metadata and new moves live in movements-ext.js.
const ALL_EXERCISES = [...EXERCISES, ...NEW_EXERCISES];

// Honor the reduced-motion preference override (auto | on | off) on every render.
function applyMotionPref() {
  const m = store.profile.reducedMotion || 'auto';
  document.documentElement.dataset.reducedMotion = m;
}

// Logo lockup — the veronica flower forms the exclamation mark.
// Keep in sync with the static copy in index.html (.hello-logo).
function logoSVG() {
  return `<svg class="logo-svg" viewBox="0 0 494 92" role="img" aria-label="You Got This!" xmlns="http://www.w3.org/2000/svg">
    <title>You Got This!</title>
    <text x="12" y="74" font-family="Fredoka, 'Avenir Next Rounded', system-ui, sans-serif" font-weight="600" font-size="74" fill="var(--ink, #1F4D2E)" textLength="421" lengthAdjust="spacingAndGlyphs">You Got This</text>
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
        <p>🌱 <strong>Private by design.</strong> Your progress lives only on this device. No account, no tracking, no data ever leaves your phone. <a href="#safety">Safety notice</a></p>
      </footer>
    </main>`;

  app.querySelectorAll('.pillar-card').forEach((b) =>
    b.addEventListener('click', () => { sound.unlock(); go(b.dataset.go); }));
  const progStart = document.getElementById('prog-start');
  if (progStart) progStart.addEventListener('click', () => { sound.unlock(); go(progStart.dataset.go); });

  if (!store.profile.seenSafety) showSafetyOverlay();
}

// The three pillars (Mind/Body/Soul) — the app's top-level navigation. Each pillar
// owns its own duration/option step; all of them grow the same shared garden.
function pillarsHTML() {
  const pillars = [
    { go: '#body', cls: 'body', ic: '🤸', title: 'Body', blurb: 'Move — gentle to vigorous, no equipment' },
    { go: '#mind', cls: 'mind', ic: '📚', title: 'Mind', blurb: 'Learn — money, parenting, communication' },
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
function bodyScreen() {
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">Body · Move</h1></header>
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
        <p class="start-note">pick a length, then choose how it feels — no equipment, coached by ${esc(getCharacter(store.profile.character).name)}</p>
        <p class="start-note start-links">
          <a href="#intake">Personalize your sessions</a>
          <label class="inline-toggle"><input type="checkbox" id="home-chair" ${store.profile.chairMode ? 'checked' : ''}> Chair mode</label>
        </p>
      </section>
    </main>`;
  app.querySelectorAll('.duration-btn').forEach((b) =>
    b.addEventListener('click', () => { sound.unlock(); go('#tier-' + b.dataset.mins); }));
  const chair = document.getElementById('home-chair');
  if (chair) chair.addEventListener('change', (e) => { store.profile.chairMode = e.target.checked; save(); });
}

// ---------------------------------------------------------------- Soul pillar (meditation +)
function soulScreen() {
  const durationBtns = DURATIONS.map((m) =>
    `<button class="duration-btn" data-mins="${m}"><span class="d-num">${m}</span><span class="d-label">min</span></button>`).join('');
  const libHTML = MEDITATION_LIBRARY.map((m) =>
    `<button class="med-lib-btn" data-med="${m.id}"><span>${esc(m.theme)}</span><small>${m.minutes} min</small></button>`).join('');
  const soon = (ic, title, blurb) => `<div class="soul-soon" aria-disabled="true">
        <span class="pillar-ic" aria-hidden="true">${ic}</span>
        <span class="pillar-txt"><strong>${esc(title)}</strong><small>${esc(blurb)}</small></span>
        <span class="soon-tag">Coming soon</span>
      </div>`;
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">Soul · Be still</h1></header>
    <main class="narrow soul-screen">
      <section class="card">
        <h2>Meditate</h2>
        <p class="hint">Pick how long you have — the core practice scales to fit. A meditation grows your garden exactly like a workout.</p>
        <div class="duration-grid" id="soul-durations">${durationBtns}</div>
      </section>
      <section class="card">
        <strong>Or browse a theme</strong>
        <div class="med-lib" id="soul-library">${libHTML}</div>
      </section>
      <section class="card soul-future">
        <h2>More for the soul</h2>
        <p class="hint">New reflective practices are growing here.</p>
        ${soon('🔮', 'Crystal energy', 'A calm, exploratory practice')}
        ${soon('🌙', 'Dream interpretation', 'Reflect gently on your dreams')}
      </section>
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
  ];
  const cards = subjects.map((s) => {
    const live = !!getTrack(s.id);
    const inner = `<span class="fin-lib-ic">${s.ic}</span>
        <span class="fin-lib-txt"><strong>${esc(s.title)}</strong><small>${esc(s.blurb)}</small></span>`;
    return live
      ? `<button class="fin-lib-btn mind-subject" data-track="${esc(s.id)}">${inner}
        <span class="fin-lib-meta"><span class="fin-mins">Learn →</span></span></button>`
      : `<div class="fin-lib-btn mind-subject locked" aria-disabled="true">${inner}
        <span class="fin-lib-meta"><span class="soon-tag">Coming soon</span></span></div>`;
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
    </main>`;
  document.querySelectorAll('#mind-subjects .mind-subject[data-track]').forEach((b) =>
    b.addEventListener('click', () => { location.hash = '#learn-' + b.dataset.track; }));
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

function showSafetyOverlay() {
  const ov = document.createElement('div');
  ov.className = 'overlay';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-label', 'Safety notice');
  ov.innerHTML = `<div class="overlay-card">${safetyHTML()}
    <button class="btn btn-primary" id="safety-ok">I understand — let's go</button></div>`;
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
        <div class="controls">
          <button class="btn" id="btn-pause">Pause</button>
          <button class="btn btn-skip" id="btn-skip">Skip this move</button>
        </div>
        <button class="linkish" id="btn-end">End session</button>
      </section>
    </main>`;

  const captionEl = document.getElementById('caption');
  coach.onCaption = (t) => { captionEl.textContent = t; };
  coach.enabled = profile.voiceOn;
  coach.voiceURI = profile.voiceURI;
  coach.naturalOn = profile.naturalOn;
  if (profile.naturalOn && naturalVoice.state === 'off') naturalVoice.enable(); // warms up in the background; system voice covers until ready
  sound.sfxOn = profile.sfxOn;
  music.volume = profile.musicVol;

  // avatar (graceful fallback if WebGL is unavailable)
  const canvas = document.getElementById('avatar-canvas');
  const char = getCharacter(profile.character);
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

  const dots = document.getElementById('dots');
  dots.innerHTML = plan.items.map((it, i) =>
    `<span class="dot" data-i="${i}" title="${esc(it.ex.name)}"></span>`).join('');

  const ringFg = document.getElementById('ring-fg');
  const CIRC = 2 * Math.PI * 54;
  ringFg.style.strokeDasharray = String(CIRC);

  player = new Player({
    plan,
    phrases: PHRASES,
    name: profile.name,
    style: profile.style,
    musicOn: profile.musicOn,
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

  window.__nrjf = { player, store, avatar };   // QA handle (local-only, harmless)

  document.getElementById('btn-pause').addEventListener('click', () => {
    if (player.phase === 'paused') player.resume();
    else player.pause();
  });
  document.getElementById('btn-skip').addEventListener('click', () => player.skip());
  document.getElementById('btn-end').addEventListener('click', () => {
    if (confirm('End this session?')) player.endEarly();
  });

  player.start();
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
    if (window.__nrjf) window.__nrjf.avatar = avatar;
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
  naturalVoice.onProgress = null;
  music.stop();
  if (avatar) { avatar.dispose(); avatar = null; }
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
    </main>`;
  document.getElementById('btn-home').addEventListener('click', () => go('#'));
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
  const trackSections = TRACK_LIST.map((tid) => {
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
        <strong>Natural voice <span class="beta-chip">beta</span></strong>
        <p class="hint">A warmer, more human voice that runs entirely on this device. Turning it on downloads a public voice model once (about 90 MB) — nothing about you is sent anywhere, ever. If it cannot load, the regular voice takes over automatically. Works best on computers and recent phones.</p>
        <label class="toggle"><input type="checkbox" id="set-natural" ${p.naturalOn ? 'checked' : ''}> Use natural voice</label>
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
        <p><a href="#safety">Read the safety notice</a></p>
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
  // Safety double-guard: never assemble a tier the screening has gated.
  if (!availableTiers(store.profile).includes(tier)) return null;
  const pool = filterPool(ALL_EXERCISES, store.profile);
  return buildSession(mins, pool, { lastCloseId: store.progress.lastCloseId, tier, tierEligibility: TIER_ELIGIBILITY });
}

async function render() {
  const seq = ++renderSeq;
  teardownSession();
  applyMotionPref();
  window.scrollTo(0, 0);
  const h = location.hash || '#';

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
    store.profile.defaultTier = 'meditation'; save();
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
      store.profile.defaultTier = tier; save();
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
  if (h === '#soul') return soulScreen();

  if (h === '#intake') return intakeScreen();
  if (h === '#programs') return programsScreen();
  if (h === '#badges') return badgesScreen();
  if (h === '#settings') return settingsScreen();
  if (h === '#safety') return safetyScreen();
  homeScreen();
}

window.addEventListener('hashchange', render);

// dev visual QA: ?dev=poses or ?dev=garden
const devMode = new URLSearchParams(location.search).get('dev');
if (devMode) {
  import('./dev.js').then((m) => m.runDev(devMode));
} else {
  render();
}

// PWA service worker (registered late so first paint wins)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* offline still optional */ });
  });
}
