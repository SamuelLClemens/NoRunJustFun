// The intimacy calendar screen (#intimacy). Dynamically imported by the router only when
// first opened, so this UI never touches the boot path. An emoji month calendar with
// per-encounter detail (orgasms, satisfaction faces, solo/partner, partner names, time,
// protection, toys, notes), desire logging (including "wanted to and did not"), gentle
// logging streak, stats, two graphs, an optional cycle overlay, and an optional PIN lock.
// Everything stays on this device. Re-renders the whole screen on each action (simple and
// robust at this scale); view state lives at module scope so month + selection persist.

import {
  isEnabled, hasPin, isUnlocked, verifyPin, setPin, clearPin, lock,
  listPartners, addPartner, removePartner, setDefaultPartner, defaultPartner, partnerName,
  showCycle, setShowCycle, isPeriodDay, isPeriod, setPeriod, cycleStats,
  getDay, setDesire, setDayNote, addEncounter, removeEncounter,
  dayGlyphs, faceFor, FACES, loggingStreak, statsMonth, statsAll, series, todayStr, setEnabled,
} from './intimacy.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

let _vy = null, _vm = null;   // displayed year / month
let _sel = null;              // selected 'YYYY-MM-DD' or null
let _showSettings = false;
let _pinErr = '';

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
  let cells = '';
  for (let i = 0; i < startDow; i++) cells += '<div class="cal-cell cal-empty" aria-hidden="true"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const date = mk(_vy, _vm, d);
    const g = dayGlyphs(date);
    const isToday = date === today;
    const isSel = date === _sel;
    const marks = [];
    if (g.count) marks.push(`🔥${g.count > 1 ? g.count : ''}`);
    if (g.org) marks.push(`💥${g.org}`);
    if (g.kind) marks.push(g.kind);
    if (g.wantedUnmet) marks.push('💭');
    if (g.period) marks.push('🩸');
    const face = g.face ? `<span class="cal-face">${g.face}</span>` : '';
    const label = `${MONTHS[_vm]} ${d}${g.count ? `, ${g.count} time${g.count === 1 ? '' : 's'}` : ''}${g.org ? `, ${g.org} orgasm${g.org === 1 ? '' : 's'}` : ''}${g.period ? ', period day' : ''}`;
    cells += `<button type="button" class="cal-cell${isToday ? ' is-today' : ''}${isSel ? ' is-sel' : ''}${g.count || g.desire != null ? ' has-log' : ''}" data-date="${date}" aria-label="${esc(label)}">
        <span class="cal-num">${d}</span>${face}
        <span class="cal-marks">${marks.join(' ')}</span>
      </button>`;
  }
  return `
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
      <label class="intim-check intim-period-toggle"><input type="checkbox" id="intim-period" data-date="${esc(date)}" ${isPeriod(date) ? 'checked' : ''}> 🩸 Period day</label>
      <p class="hint">How much did you want to today?</p>
      <div class="intim-desire-row">${desireRow}</div>
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
    <div><strong>${sm.encounters}</strong><span>this month</span></div>
    <div><strong>${sm.orgasms}</strong><span>orgasms</span></div>
    <div><strong>${sm.avgSatisfaction != null ? faceFor(sm.avgSatisfaction) + ' ' + sm.avgSatisfaction : '–'}</strong><span>satisfaction</span></div>
    <div><strong>${streak}</strong><span>day streak</span></div>
  </div>`;
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
      <h3 class="intim-sub">This space</h3>
      <p class="hint cycle-disclaimer">A private place to note your intimate life, if it helps you understand your own patterns. It describes only what you log — there are no goals or judgments, and it is <strong>not</strong> medical, fertility, or contraception advice. Everything stays on this device.</p>
      <button class="linkish" id="intim-lock">Lock now</button> · <button class="linkish" id="intim-disable">Turn off intimacy tracking</button>
    </section>`;
}

// ---- main render --------------------------------------------------------
export function intimacyScreen() {
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
        <p class="cal-legend">🔥 times · 💥 orgasms · 💞 partner · 🌙 solo · 💭 wanted to · 🩸 period</p>
        ${cycleLineHTML()}
      </section>
      ${_sel ? dayEditorHTML(_sel) : ''}
      ${graphsHTML()}
      ${_showSettings ? settingsHTML() : ''}
    </main>`;

  const h1 = app.querySelector('.page-title'); if (h1) try { h1.focus(); } catch { /* ok */ }
  bind(app);
}

function rerender() { intimacyScreen(); }

function bind(app) {
  const prev = document.getElementById('intim-prev');
  if (prev) prev.addEventListener('click', () => { _vm--; if (_vm < 0) { _vm = 11; _vy--; } rerender(); });
  const next = document.getElementById('intim-next');
  if (next) next.addEventListener('click', () => { _vm++; if (_vm > 11) { _vm = 0; _vy++; } rerender(); });

  app.querySelectorAll('.cal-cell[data-date]').forEach((c) => c.addEventListener('click', () => { _sel = c.dataset.date; rerender(); }));

  app.querySelectorAll('.intim-desire-btn').forEach((b) => b.addEventListener('click', () => { setDesire(b.dataset.date, parseInt(b.dataset.desire, 10)); rerender(); }));

  const periodCb = document.getElementById('intim-period');
  if (periodCb) periodCb.addEventListener('change', () => { setPeriod(periodCb.dataset.date, periodCb.checked); rerender(); });

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
