// The intimacy calendar screen (#intimacy). Dynamically imported by the router only when
// first opened, so this UI never touches the boot path. An emoji month calendar with
// per-encounter detail (orgasms, satisfaction faces, solo/partner, partner names, time,
// protection, toys, notes), desire logging (including "wanted to and did not"), gentle
// logging streak, stats, two graphs, an optional cycle overlay, and an optional PIN lock.
// Everything stays on this device. Re-renders the whole screen on each action (simple and
// robust at this scale); view state lives at module scope so month + selection persist.

import { store } from './state.js';
import {
  isEnabled, hasPin, isUnlocked, verifyPin, setPin, clearPin, lock,
  getLayers, setLayer, LAYER_KEYS,
  listPartners, addPartner, removePartner, setDefaultPartner, defaultPartner, partnerName,
  showCycle, setShowCycle, isPeriodDay, isPeriod, setPeriod, cycleStats,
  getDay, setDesire, setDayNote, addEncounter, removeEncounter,
  dayGlyphs, faceFor, FACES, loggingStreak, statsMonth, statsAll, series, todayStr, setEnabled,
  setMood, setEnergy, toggleSymptom, hasSymptom, moodFor, MOODS, SYMPTOMS, richInsights, exportData, importData,
} from './intimacy.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

let _vy = null, _vm = null;   // displayed year / month
let _sel = null;              // selected 'YYYY-MM-DD' or null
let _showSettings = false;
let _pinErr = '';
let _importMsg = '';

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function pad(n) { return String(n).padStart(2, '0'); }
function mk(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

function initView() {
  if (_vy == null || _vm == null) {
    const t = todayStr().split('-');
    _vy = parseInt(t[0], 10) || new Date().getFullYear();
    _vm = (parseInt(t[1], 10) || 1) - 1;
  }
}

// Read-only app-activity map (from progress.sessions) and birthday — extra calendar
// layers. We only READ sessions here; logging the calendar never writes sessions[].
function usageMap() {
  const m = {};
  const sessions = (store.progress && store.progress.sessions) || [];
  sessions.forEach((s) => {
    if (!s || !s.date) return;
    const k = s.kind || '';
    const t = (k === 'meditation') ? 'meditation'
      : ((k.endsWith('-game') || k.endsWith('-quiz')) || (Array.isArray(s.lessonIds) && s.lessonIds.length)) ? 'learn'
        : 'move';
    const e = m[s.date] || (m[s.date] = { meditation: 0, learn: 0, move: 0, total: 0, mins: 0 });
    e[t] += 1; e.total += 1; e.mins += (s.mins || 0);
  });
  return m;
}
function birthdayMD() { const b = (store.profile && store.profile.birthday) || ''; return (typeof b === 'string' && b.length >= 10) ? b.slice(5) : ''; }
// Read-only day maps for the meal / journal / weight ledgers (counts per date). The
// calendar only READS these — logging here never writes meals[]/journal[]/weights[].
function countByDate(arr, dateOf) {
  const m = {};
  (arr || []).forEach((x) => { const k = x && dateOf(x); if (k && k.length >= 10) { const d = k.slice(0, 10); m[d] = (m[d] || 0) + 1; } });
  return m;
}
function mealsMap() { return countByDate((store.progress && store.progress.meals) || [], (x) => x.ts); }
function journalMap() { return countByDate((store.progress && store.progress.journal) || [], (x) => x.ts); }
function weightMap() {
  const m = {};
  ((store.progress && store.progress.weights) || []).forEach((w) => { if (w && w.date) m[w.date] = w.value; });
  return m;
}
// App anniversary: the month-day the user started using the app, marked every year (🎉).
function anniversaryMD() { const a = (store.profile && store.profile.startedAt) || ''; return (typeof a === 'string' && a.length >= 10) ? a.slice(5) : ''; }
function anniversaryYears(date) {
  const a = (store.profile && store.profile.startedAt) || '';
  if (!a || a.length < 4 || !date) return null;
  const y0 = parseInt(a.slice(0, 4), 10); const y1 = parseInt(date.slice(0, 4), 10);
  return (isFinite(y0) && isFinite(y1)) ? Math.max(0, y1 - y0) : null;
}
const LAYER_LABELS = [['intimacy', '💞 Intimacy'], ['period', '🩸 Period'], ['mood', '🙂 Mood'], ['usage', '🌱 Activity'], ['meals', '🍽️ Meals'], ['journal', '📔 Journal'], ['weight', '⚖️ Weight'], ['birthday', '🎂 Birthday'], ['anniversary', '🎉 Anniversary']];

// ---- PIN gate -----------------------------------------------------------
function renderPinGate(app) {
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#you">← You</a><h1 class="page-title" tabindex="-1">Locked</h1></header>
    <main class="narrow">
      <section class="card center">
        <p style="font-size:2.2rem;margin:.2em 0">🔒</p>
        <p class="hint">This space is private. Enter your PIN to open it.</p>
        <div class="intim-pin-row">
          <input type="password" id="intim-pin" inputmode="numeric" autocomplete="off" maxlength="8" placeholder="••••" aria-label="PIN">
          <button class="btn btn-primary" id="intim-pin-go">Unlock</button>
        </div>
        ${_pinErr ? `<p class="hint intim-err">${esc(_pinErr)}</p>` : ''}
        <p class="hint">If you forget the PIN, this space stays locked until the app is reset. The PIN hides this section from view; it does not encrypt your data.</p>
      </section>
    </main>`;
  const h1 = app.querySelector('.page-title'); if (h1) try { h1.focus(); } catch { /* ok */ }
  const input = document.getElementById('intim-pin');
  const go = async () => {
    const ok = await verifyPin(input.value);
    if (ok) { _pinErr = ''; intimacyScreen(); } else { _pinErr = 'That PIN did not match. Try again.'; intimacyScreen(); }
  };
  document.getElementById('intim-pin-go').addEventListener('click', go);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); go(); } });
  if (input) try { input.focus(); } catch { /* ok */ }
}

// ---- calendar grid ------------------------------------------------------
function calendarHTML() {
  const first = new Date(_vy, _vm, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(_vy, _vm + 1, 0).getDate();
  const today = todayStr();
  const L = getLayers();
  const um = L.usage ? usageMap() : {};
  const mm = L.meals ? mealsMap() : {};
  const jm = L.journal ? journalMap() : {};
  const wm = L.weight ? weightMap() : {};
  const bMD = L.birthday ? birthdayMD() : '';
  const aMD = L.anniversary ? anniversaryMD() : '';
  let cells = '';
  for (let i = 0; i < startDow; i++) cells += '<div class="cal-cell cal-empty" aria-hidden="true"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const date = mk(_vy, _vm, d);
    const g = dayGlyphs(date);
    const dd = getDay(date);
    const isToday = date === today;
    const isSel = date === _sel;
    const marks = [];
    let face = '';
    if (L.intimacy && g.face) face = g.face;
    else if (L.mood && dd.mood != null) face = moodFor(dd.mood);
    if (L.intimacy) {
      if (g.count) marks.push(`🔥${g.count > 1 ? g.count : ''}`);
      if (g.org) marks.push(`💥${g.org}`);
      if (g.kind) marks.push(g.kind);
      if (g.wantedUnmet) marks.push('💭');
    }
    if (L.period && isPeriod(date)) marks.push('🩸');
    if (L.usage && um[date]) marks.push(`🌱${um[date].total}`);
    if (L.meals && mm[date]) marks.push(`🍽️${mm[date] > 1 ? mm[date] : ''}`);
    if (L.journal && jm[date]) marks.push(`📔${jm[date] > 1 ? jm[date] : ''}`);
    if (L.weight && wm[date] != null) marks.push('⚖️');
    const isBday = bMD && date.slice(5) === bMD;
    if (isBday) marks.push('🎂');
    const isAnniv = aMD && date.slice(5) === aMD;
    if (isAnniv) marks.push('🎉');
    const faceHTML = face ? `<span class="cal-face">${face}</span>` : '';
    const u = um[date];
    const label = `${MONTHS[_vm]} ${d}`
      + (g.count ? `, ${g.count} time${g.count === 1 ? '' : 's'}` : '')
      + (isPeriod(date) ? ', period day' : '')
      + (u ? `, ${u.total} activit${u.total === 1 ? 'y' : 'ies'}` : '')
      + (isBday ? ', birthday' : '')
      + (isAnniv ? ', app anniversary' : '');
    const logged = g.count || dd.desire != null || dd.period || dd.mood != null || dd.energy != null || (dd.symptoms && dd.symptoms.length) || (u && u.total) || mm[date] || jm[date] || wm[date] != null || isBday || isAnniv;
    cells += `<button type="button" class="cal-cell${isToday ? ' is-today' : ''}${isSel ? ' is-sel' : ''}${logged ? ' has-log' : ''}" data-date="${date}" aria-label="${esc(label)}">
        <span class="cal-num">${d}</span>${faceHTML}
        <span class="cal-marks">${marks.join(' ')}</span>
      </button>`;
  }
  return `
    <div class="intim-layers">${LAYER_LABELS.map(([k, lbl]) => `<button type="button" class="intim-layer-chip${L[k] ? ' is-sel' : ''}" data-layer="${k}" aria-pressed="${L[k] ? 'true' : 'false'}">${lbl}</button>`).join('')}</div>
    <div class="cal-nav">
      <button class="btn cal-prev" id="intim-prev" aria-label="Previous month">‹</button>
      <span class="cal-title">${MONTHS[_vm]} ${_vy}</span>
      <button class="btn cal-next" id="intim-next" aria-label="Next month">›</button>
    </div>
    <div class="cal-dow">${DOW.map((x) => `<span>${x}</span>`).join('')}</div>
    <div class="cal-grid">${cells}</div>`;
}

// ---- day editor ---------------------------------------------------------
function partnerOptions(selId) {
  const ps = listPartners();
  const def = defaultPartner();
  const chosen = selId || (def ? def.id : (ps[0] ? ps[0].id : ''));
  return ps.map((p) => `<option value="${esc(p.id)}"${p.id === chosen ? ' selected' : ''}>${esc(p.name)}</option>`).join('');
}

function dayEditorHTML(date) {
  const d = getDay(date);
  const enc = d.encounters || [];
  const encList = enc.length
    ? `<ul class="intim-enc-list">${enc.map((e) => {
        const bits = [];
        if (e.time) bits.push(esc(e.time));
        bits.push(e.solo ? '🌙 solo' : `💞 ${esc(partnerName(e.partnerId) || 'partner')}`);
        bits.push(`💥 ${e.orgasms || 0}`);
        if (e.satisfaction != null) bits.push(faceFor(e.satisfaction));
        if (e.protection) bits.push('🛡️');
        if (e.toys) bits.push('🧸');
        const note = e.note ? ` — <span class="intimacy-note">${esc(e.note)}</span>` : '';
        return `<li><span class="you-log-what">${bits.join(' · ')}${note}</span> <button class="linkish intim-enc-del" data-date="${esc(date)}" data-id="${esc(e.id)}" aria-label="Delete this encounter">✕</button></li>`;
      }).join('')}</ul>`
    : '<p class="hint">No encounters logged for this day. Add one below, or just note your desire.</p>';

  const desireRow = [0, 1, 2, 3, 4, 5].map((v) =>
    `<button type="button" class="intim-desire-btn${d.desire === v ? ' is-sel' : ''}" data-date="${esc(date)}" data-desire="${v}" aria-label="Desire ${v} of 5">${v === 0 ? '—' : '❤️'}<small>${v}</small></button>`).join('');

  const facePick = [1, 2, 3, 4, 5].map((v) =>
    `<button type="button" class="intim-face-btn" data-sat="${v}" aria-label="Satisfaction ${v} of 5">${FACES[v]}</button>`).join('');

  const ps = listPartners();
  return `
    <section class="card intim-day">
      <h2>${MONTHS[parseInt(date.slice(5, 7), 10) - 1]} ${parseInt(date.slice(8, 10), 10)}, ${date.slice(0, 4)}</h2>
      ${(() => {
        const u = usageMap()[date];
        const meals = mealsMap()[date] || 0;
        const jrnl = journalMap()[date] || 0;
        const wt = weightMap()[date];
        const isBday = birthdayMD() && date.slice(5) === birthdayMD();
        const isAnniv = anniversaryMD() && date.slice(5) === anniversaryMD();
        if (!u && !meals && !jrnl && wt == null && !isBday && !isAnniv) return '';
        const parts = [];
        if (u) { if (u.learn) parts.push(`📚 ${u.learn} learning`); if (u.meditation) parts.push(`🧘 ${u.meditation} meditation${u.meditation === 1 ? '' : 's'}`); if (u.move) parts.push(`💪 ${u.move} movement`); }
        if (meals) parts.push(`🍽️ ${meals} meal${meals === 1 ? '' : 's'}`);
        if (jrnl) parts.push(`📔 ${jrnl} journal entr${jrnl === 1 ? 'y' : 'ies'}`);
        if (wt != null) parts.push(`⚖️ ${wt} ${(store.profile && store.profile.weightUnit) || 'lb'}`);
        let anniv = '';
        if (isAnniv) {
          const yrs = anniversaryYears(date);
          anniv = (yrs && yrs >= 1)
            ? `🎉 ${yrs} year${yrs === 1 ? '' : 's'} with Garden Moves! `
            : '🎉 You started Garden Moves on this day. ';
        }
        return `<p class="hint intim-onday">${isBday ? '🎂 Your birthday! ' : ''}${anniv}${parts.length ? `In the app this day: ${parts.join(', ')}${u && u.mins ? ` · ${u.mins} min` : ''}.` : ''}</p>`;
      })()}
      <label class="intim-check intim-period-toggle"><input type="checkbox" id="intim-period" data-date="${esc(date)}" ${isPeriod(date) ? 'checked' : ''}> 🩸 Period day</label>
      <p class="hint">How much did you want to today?</p>
      <div class="intim-desire-row">${desireRow}</div>
      <p class="hint">Mood</p>
      <div class="intim-pick-row">${[1, 2, 3, 4, 5].map((v) => `<button type="button" class="intim-pick-btn intim-mood-btn${d.mood === v ? ' is-sel' : ''}" data-date="${esc(date)}" data-mood="${v}" aria-label="Mood ${v} of 5">${MOODS[v]}</button>`).join('')}</div>
      <p class="hint">Energy</p>
      <div class="intim-desire-row">${[1, 2, 3, 4, 5].map((v) => `<button type="button" class="intim-desire-btn intim-energy-btn${d.energy === v ? ' is-sel' : ''}" data-date="${esc(date)}" data-energy="${v}" aria-label="Energy ${v} of 5">⚡<small>${v}</small></button>`).join('')}</div>
      <p class="hint">Anything you felt?</p>
      <div class="intim-symptoms">${SYMPTOMS.map((s) => `<button type="button" class="intim-sym-chip${hasSymptom(date, s.id) ? ' is-sel' : ''}" data-date="${esc(date)}" data-sym="${esc(s.id)}">${esc(s.label)}</button>`).join('')}</div>
      ${encList}
      <details class="intim-add" ${enc.length ? '' : 'open'}>
        <summary>+ Add an encounter</summary>
        <div class="intim-enc-form">
          <label class="cycle-field">Time <input type="time" id="intim-time"></label>
          <div class="intim-type">
            <label><input type="radio" name="intim-kind" value="partner" ${ps.length ? 'checked' : ''}> 💞 Partner</label>
            <label><input type="radio" name="intim-kind" value="solo" ${ps.length ? '' : 'checked'}> 🌙 Solo</label>
          </div>
          <div class="intim-partner-wrap">
            <label class="cycle-field">Partner
              <select id="intim-partner">${partnerOptions()}</select>
            </label>
            <label class="cycle-field">New <input type="text" id="intim-partner-new" maxlength="40" placeholder="add a name"></label>
          </div>
          <label class="cycle-field">Orgasms <input type="number" id="intim-org" min="0" max="99" inputmode="numeric" placeholder="0"></label>
          <div class="intim-faces" role="group" aria-label="Satisfaction">${facePick}<input type="hidden" id="intim-sat" value=""></div>
          <label class="intim-check"><input type="checkbox" id="intim-prot"> 🛡️ Protection</label>
          <label class="intim-check"><input type="checkbox" id="intim-toys"> 🧸 Toys</label>
          <label class="cycle-field intim-note-field">Note <input type="text" id="intim-note" maxlength="200" placeholder="anything else"></label>
          <button class="btn btn-primary" id="intim-add-enc" data-date="${esc(date)}">Add encounter</button>
        </div>
      </details>
      <label class="cycle-field intim-note-field">Day note
        <input type="text" id="intim-daynote" maxlength="280" value="${esc(d.note || '')}" data-date="${esc(date)}" placeholder="optional">
      </label>
    </section>`;
}

// ---- stats + graphs -----------------------------------------------------
function statsHTML() {
  const sm = statsMonth(_vy, _vm);
  const streak = loggingStreak();
  return `<div class="intim-stats">
    <div><strong>${sm.encounters}</strong><span>times this month</span></div>
    <div><strong>${sm.pctDaysWithSex}%</strong><span>of days</span></div>
    <div><strong>${sm.orgasms}</strong><span>orgasms</span></div>
    <div><strong>${sm.avgOrgPerTime}</strong><span>avg each time</span></div>
    <div><strong>${sm.orgPct.multi}%</strong><span>multi-orgasm</span></div>
    <div><strong>${sm.avgSatisfaction != null ? faceFor(sm.avgSatisfaction) + ' ' + sm.avgSatisfaction : '–'}</strong><span>satisfaction</span></div>
    <div><strong>${sm.partneredPct}%</strong><span>partnered</span></div>
    <div><strong>${streak}</strong><span>day streak</span></div>
  </div>`;
}

function insightsHTML() {
  const ins = richInsights(_vy, _vm);
  if (!ins.enough || !ins.sections.length) {
    return `<section class="card"><h2>Insights &amp; patterns</h2><p class="hint">Log a few more days and your stats come alive here — your sex life, orgasms, patterns across your cycle, your app life, journaling, and more. Descriptive and yours alone, never a prediction or a goal.</p></section>`;
  }
  return `<section class="card intim-insights-card">
      <h2>Insights &amp; patterns</h2>
      ${ins.sections.map((s) => `
        <h3 class="intim-sub">${esc(s.title)}</h3>
        <ul class="intim-insights">${s.lines.map((l) => `<li>${l}</li>`).join('')}</ul>`).join('')}
      <p class="hint">These describe only what you have logged — they are not predictions, goals, or medical advice.</p>
    </section>`;
}

function cycleLineHTML() {
  const cs = cycleStats();
  if (!cs) return '';
  if (cs.avgLen != null && cs.daysSince != null) {
    return `<p class="hint intim-cycle-line">🩸 Last period <strong>${cs.daysSince}</strong> day${cs.daysSince === 1 ? '' : 's'} ago · your cycles average about <strong>${cs.avgLen}</strong> days. This describes what you logged — it is not a prediction.</p>`;
  }
  return `<p class="hint intim-cycle-line">🩸 <strong>${cs.periodCount}</strong> period${cs.periodCount === 1 ? '' : 's'} logged. Mark a few more period days to see your average cycle length.</p>`;
}

function graphsHTML() {
  const s = series(30);
  const maxC = Math.max(1, ...s.map((x) => x.count));
  const bw = 7, gap = 2, pad6 = 4, H = 70, base = H - 14;
  const W = pad6 * 2 + s.length * (bw + gap) - gap;
  let bars = '';
  s.forEach((x, i) => {
    const h = x.count ? Math.max(3, Math.round((base - pad6) * (x.count / maxC))) : 0;
    const px = pad6 + i * (bw + gap);
    if (h) bars += `<rect class="cycle-bar" x="${px}" y="${base - h}" width="${bw}" height="${h}" rx="2"><title>${x.date}: ${x.count}</title></rect>`;
  });
  const freq = `<svg class="cycle-viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="Times per day over the last 30 days. Descriptive, not a goal."><line class="cycle-avg" x1="${pad6}" y1="${base}" x2="${W - pad6}" y2="${base}"></line>${bars}</svg>`;

  // satisfaction line over days that have a value
  const pts = s.map((x, i) => ({ i, v: x.sat })).filter((p) => p.v != null);
  let line = '<p class="hint">Log satisfaction on a few days to see the trend.</p>';
  if (pts.length >= 2) {
    const stepX = (W - pad6 * 2) / (s.length - 1);
    const y = (v) => base - Math.round((base - pad6) * ((v - 1) / 4));
    const poly = pts.map((p) => `${(pad6 + p.i * stepX).toFixed(1)},${y(p.v)}`).join(' ');
    const dots = pts.map((p) => `<circle class="intim-dot" cx="${(pad6 + p.i * stepX).toFixed(1)}" cy="${y(p.v)}" r="2"></circle>`).join('');
    line = `<svg class="cycle-viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="Satisfaction trend over the last 30 days, 1 to 5."><polyline class="intim-line" fill="none" points="${poly}"></polyline>${dots}</svg>`;
  }
  return `
    <section class="card">
      <h2>Your patterns</h2>
      <p class="hint">Times per day (last 30 days)</p>
      ${freq}
      <p class="hint">Satisfaction trend (1–5)</p>
      ${line}
    </section>`;
}

// ---- settings -----------------------------------------------------------
function settingsHTML() {
  const ps = listPartners();
  const def = defaultPartner();
  const partnersList = ps.length
    ? `<ul class="you-log intim-partner-list">${ps.map((p) => `<li><span class="you-log-what">${esc(p.name)}${def && def.id === p.id ? ' · <em>default</em>' : ''}</span>
        <span>${def && def.id === p.id ? '' : `<button class="linkish intim-setdef" data-id="${esc(p.id)}">make default</button> `}<button class="linkish intim-prem" data-id="${esc(p.id)}" aria-label="Remove partner">✕</button></span></li>`).join('')}</ul>`
    : '<p class="hint">No partners saved. Add one so it auto-fills when you log a partnered encounter.</p>';
  return `
    <section class="card">
      <h2>Settings</h2>
      <h3 class="intim-sub">Partners</h3>
      ${partnersList}
      <div class="cycle-form">
        <label class="cycle-field">Add partner <input type="text" id="intim-newpartner" maxlength="40" placeholder="name"></label>
        <button class="btn" id="intim-addpartner">Add</button>
      </div>
      <h3 class="intim-sub">Period markers</h3>
      <label class="intim-check"><input type="checkbox" id="intim-cycle" ${showCycle() ? 'checked' : ''}> Show period days (🩸) on the calendar. Tap any day and toggle "Period day" to log your cycle here.</label>
      <h3 class="intim-sub">PIN lock</h3>
      ${hasPin()
        ? `<p class="hint">A PIN is set. It hides this section from casual view; it does not encrypt your data.</p>
           <button class="btn" id="intim-changepin">Change PIN</button> <button class="linkish" id="intim-clearpin">Remove PIN</button>`
        : `<div class="cycle-form">
             <label class="cycle-field">Set a PIN <input type="password" id="intim-setpin" inputmode="numeric" maxlength="8" placeholder="4–8 digits"></label>
             <button class="btn" id="intim-savepin">Set PIN</button>
           </div>`}
      ${_pinErr ? `<p class="hint intim-err">${esc(_pinErr)}</p>` : ''}
      <h3 class="intim-sub">Backup</h3>
      <p class="hint">Download your whole calendar to a file you keep, or restore from one. Nothing leaves this device unless you export it — and the file is <strong>not</strong> encrypted, so store it somewhere safe.</p>
      <button class="btn" id="intim-export">Export to a file</button>
      <label class="btn intim-import-label">Restore from a file<input type="file" id="intim-import" accept="application/json,.json" hidden></label>
      ${_importMsg ? `<p class="hint">${esc(_importMsg)}</p>` : ''}
      <h3 class="intim-sub">This space</h3>
      <p class="hint cycle-disclaimer">A private place to note your intimate life, if it helps you understand your own patterns. It describes only what you log — there are no goals or judgments, and it is <strong>not</strong> medical, fertility, or contraception advice. Everything stays on this device.</p>
      <button class="linkish" id="intim-lock">Lock now</button> · <button class="linkish" id="intim-disable">Turn off intimacy tracking</button>
    </section>`;
}

// ---- main render --------------------------------------------------------
export function intimacyScreen(opts = {}) {
  const app = document.getElementById('app');
  if (!app) return;
  if (!isEnabled()) { location.hash = '#you'; return; }
  if (hasPin() && !isUnlocked()) { renderPinGate(app); return; }
  initView();
  if (!_sel) _sel = todayStr();

  app.innerHTML = `
    <header class="topbar"><a class="back" href="#you">← You</a><h1 class="page-title" tabindex="-1">Personal calendar</h1>
      <button class="topbar-action" id="intim-toggle-settings" aria-label="Settings">⚙️</button></header>
    <main class="narrow intim-screen">
      <section class="card">${statsHTML()}${calendarHTML()}
        <p class="cal-legend">🔥 times · 💥 orgasms · 💞 partner · 🌙 solo · 💭 wanted to · 🩸 period · 🌱 activity · 🍽️ meals · 📔 journal · ⚖️ weight · 🎂 birthday · 🎉 anniversary · tap a day for details</p>
        ${cycleLineHTML()}
      </section>
      ${_sel ? dayEditorHTML(_sel) : ''}
      ${insightsHTML()}
      ${graphsHTML()}
      ${_showSettings ? settingsHTML() : ''}
    </main>`;

  // Focus the heading ONLY on first entry (router) — not on every in-screen rerender,
  // which would yank the viewport back to the top on each desire/mood/symptom tap.
  const h1 = app.querySelector('.page-title'); if (h1 && !opts.rerender) try { h1.focus(); } catch { /* ok */ }
  bind(app);
}

// Tap-driven updates rebuild the whole screen; preserve the user's in-progress, not-yet-
// saved text (encounter entry + day note) across that rebuild so a tap never wipes typing.
const TRANSIENT_FIELDS = ['intim-org', 'intim-sat', 'intim-note', 'intim-daynote'];
function rerender() {
  const keep = {};
  TRANSIENT_FIELDS.forEach((id) => { const el = document.getElementById(id); if (el) keep[id] = el.value; });
  intimacyScreen({ rerender: true });
  TRANSIENT_FIELDS.forEach((id) => { const el = document.getElementById(id); if (el && keep[id] != null && keep[id] !== '') el.value = keep[id]; });
}

function bind(app) {
  const prev = document.getElementById('intim-prev');
  if (prev) prev.addEventListener('click', () => { _vm--; if (_vm < 0) { _vm = 11; _vy--; } rerender(); });
  const next = document.getElementById('intim-next');
  if (next) next.addEventListener('click', () => { _vm++; if (_vm > 11) { _vm = 0; _vy++; } rerender(); });

  app.querySelectorAll('.cal-cell[data-date]').forEach((c) => c.addEventListener('click', () => { _sel = c.dataset.date; rerender(); }));

  app.querySelectorAll('.intim-layer-chip').forEach((b) => b.addEventListener('click', () => { const k = b.dataset.layer; setLayer(k, !getLayers()[k]); rerender(); }));

  app.querySelectorAll('.intim-desire-btn').forEach((b) => b.addEventListener('click', () => { setDesire(b.dataset.date, parseInt(b.dataset.desire, 10)); rerender(); }));

  const periodCb = document.getElementById('intim-period');
  if (periodCb) periodCb.addEventListener('change', () => { setPeriod(periodCb.dataset.date, periodCb.checked); rerender(); });

  app.querySelectorAll('.intim-mood-btn').forEach((b) => b.addEventListener('click', () => { const v = parseInt(b.dataset.mood, 10); setMood(b.dataset.date, getDay(b.dataset.date).mood === v ? null : v); rerender(); }));
  app.querySelectorAll('.intim-energy-btn').forEach((b) => b.addEventListener('click', () => { const v = parseInt(b.dataset.energy, 10); setEnergy(b.dataset.date, getDay(b.dataset.date).energy === v ? null : v); rerender(); }));
  app.querySelectorAll('.intim-sym-chip').forEach((b) => b.addEventListener('click', () => { toggleSymptom(b.dataset.date, b.dataset.sym); rerender(); }));

  // satisfaction face picker (local, no re-render)
  const faces = app.querySelectorAll('.intim-face-btn');
  const satField = document.getElementById('intim-sat');
  faces.forEach((f) => f.addEventListener('click', () => {
    const cur = satField.value;
    if (cur === f.dataset.sat) { satField.value = ''; faces.forEach((x) => x.classList.remove('is-sel')); }
    else { satField.value = f.dataset.sat; faces.forEach((x) => x.classList.toggle('is-sel', x === f)); }
  }));
  // solo/partner toggle shows/hides the partner picker (local)
  const partnerWrap = app.querySelector('.intim-partner-wrap');
  app.querySelectorAll('input[name="intim-kind"]').forEach((r) => r.addEventListener('change', () => {
    if (partnerWrap) partnerWrap.style.display = (document.querySelector('input[name="intim-kind"]:checked').value === 'solo') ? 'none' : '';
  }));

  const addEnc = document.getElementById('intim-add-enc');
  if (addEnc) addEnc.addEventListener('click', () => {
    const date = addEnc.dataset.date;
    const kindEl = document.querySelector('input[name="intim-kind"]:checked');
    const solo = kindEl ? kindEl.value === 'solo' : false;
    let partnerId = null;
    if (!solo) {
      const newName = (document.getElementById('intim-partner-new').value || '').trim();
      if (newName) { const p = addPartner(newName); partnerId = p ? p.id : null; }
      else { const sel = document.getElementById('intim-partner'); partnerId = sel ? sel.value : null; }
    }
    addEncounter(date, {
      time: document.getElementById('intim-time').value,
      solo,
      partnerId,
      orgasms: document.getElementById('intim-org').value,
      satisfaction: document.getElementById('intim-sat').value || null,
      protection: document.getElementById('intim-prot').checked,
      toys: document.getElementById('intim-toys').checked,
      note: document.getElementById('intim-note').value,
    });
    rerender();
  });
  app.querySelectorAll('.intim-enc-del').forEach((b) => b.addEventListener('click', () => { removeEncounter(b.dataset.date, b.dataset.id); rerender(); }));

  const dayNote = document.getElementById('intim-daynote');
  if (dayNote) dayNote.addEventListener('change', () => { setDayNote(dayNote.dataset.date, dayNote.value); });

  const settingsToggle = document.getElementById('intim-toggle-settings');
  if (settingsToggle) settingsToggle.addEventListener('click', () => { _showSettings = !_showSettings; rerender(); });

  // settings actions
  const addP = document.getElementById('intim-addpartner');
  if (addP) addP.addEventListener('click', () => { const v = document.getElementById('intim-newpartner').value; if (v && v.trim()) { addPartner(v); rerender(); } });
  app.querySelectorAll('.intim-setdef').forEach((b) => b.addEventListener('click', () => { setDefaultPartner(b.dataset.id); rerender(); }));
  app.querySelectorAll('.intim-prem').forEach((b) => b.addEventListener('click', () => { removePartner(b.dataset.id); rerender(); }));
  const cyc = document.getElementById('intim-cycle');
  if (cyc) cyc.addEventListener('change', () => { setShowCycle(cyc.checked); rerender(); });

  const exportBtn = document.getElementById('intim-export');
  if (exportBtn) exportBtn.addEventListener('click', () => {
    try {
      const blob = new Blob([exportData()], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'garden-moves-personal-calendar.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      _importMsg = 'Exported. Keep that file somewhere safe — it is not encrypted.';
      rerender();
    } catch { _importMsg = 'Could not export on this device.'; rerender(); }
  });
  const importInput = document.getElementById('intim-import');
  if (importInput) importInput.addEventListener('change', () => {
    const file = importInput.files && importInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { _importMsg = importData(String(reader.result)) ? 'Restored from your file.' : 'That file could not be read as a calendar backup.'; rerender(); };
    reader.onerror = () => { _importMsg = 'Could not read that file.'; rerender(); };
    reader.readAsText(file);
  });

  const savePin = document.getElementById('intim-savepin');
  if (savePin) savePin.addEventListener('click', async () => {
    const v = document.getElementById('intim-setpin').value;
    const ok = await setPin(v);
    _pinErr = ok ? '' : 'PIN must be 4–8 digits.';
    rerender();
  });
  const changePin = document.getElementById('intim-changepin');
  if (changePin) changePin.addEventListener('click', () => { clearPin(); _showSettings = true; rerender(); });
  const clearPinBtn = document.getElementById('intim-clearpin');
  if (clearPinBtn) clearPinBtn.addEventListener('click', () => { clearPin(); rerender(); });

  const lockBtn = document.getElementById('intim-lock');
  if (lockBtn) lockBtn.addEventListener('click', () => { lock(); location.hash = '#you'; });
  const disable = document.getElementById('intim-disable');
  if (disable) disable.addEventListener('click', () => { setEnabled(false); location.hash = '#you'; });
}
