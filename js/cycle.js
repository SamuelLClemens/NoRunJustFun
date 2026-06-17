// Opt-in menstrual / cycle tracking. Lives in its own progress.cycle ledger (default
// OFF) and NEVER touches sessions[], so it can never grow the garden, a streak, or a
// badge. It is DESCRIPTIVE only: it reflects what the user has logged. It deliberately
// does NOT predict the next period, ovulation, or a fertile window, and it is NOT a
// contraceptive method or a medical device — that framing is intentional and must not
// be added. Inclusive of anyone who menstruates. Everything stays on this device.

import { store, save } from './state.js';

function uid() {
  try { if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID(); } catch { /* fall through */ }
  return 'c-' + new Date().getTime().toString(36) + '-' + Math.floor(Math.random() * 1e9).toString(36);
}

function cy() {
  let x = store.progress.cycle;
  if (!x || typeof x !== 'object' || Array.isArray(x)) { x = { enabled: false, periods: [], symptoms: [], avgCycleLen: null }; store.progress.cycle = x; }
  if (!Array.isArray(x.periods)) x.periods = [];
  if (!Array.isArray(x.symptoms)) x.symptoms = [];
  return x;
}

export function isEnabled() { return !!cy().enabled; }
export function setEnabled(on) { cy().enabled = !!on; save(); }

export function addPeriod(start, end) {
  if (!start) return null;
  const e = { id: uid(), start, end: end || '' };
  cy().periods.push(e);
  save();
  return e;
}

export function removePeriod(id) {
  const p = cy().periods;
  const i = p.findIndex((x) => x.id === id);
  if (i >= 0) { p.splice(i, 1); save(); }
}

export function recentPeriods(n = 6) {
  return cy().periods.slice().sort((a, b) => (a.start < b.start ? 1 : (a.start > b.start ? -1 : 0))).slice(0, n);
}

// Gaps (in days) between consecutive period start dates — i.e. observed cycle lengths.
function cycleLengths() {
  const starts = cy().periods.map((p) => p.start).filter(Boolean).sort();
  const gaps = [];
  for (let i = 1; i < starts.length; i++) {
    const d = Math.round((new Date(starts[i]) - new Date(starts[i - 1])) / 86400000);
    if (d > 0 && d < 200) gaps.push(d);
  }
  return gaps;
}

export function avgCycleLen() {
  const g = cycleLengths();
  if (!g.length) return null;
  return Math.round(g.reduce((a, b) => a + b, 0) / g.length);
}

function periodDays(p) {
  if (!p.start || !p.end) return null;
  const d = Math.round((new Date(p.end) - new Date(p.start)) / 86400000) + 1;
  return d > 0 && d < 60 ? d : null;
}

// A descriptive bar chart of the most recent observed cycle lengths, with the average
// drawn as a reference line. Height encodes days, so it reads without relying on colour.
// NOT a prediction — purely a picture of what was logged.
function cycleVizSVG() {
  const g = cycleLengths().slice(-8);
  if (g.length < 1) return '';
  const avg = Math.round(g.reduce((a, b) => a + b, 0) / g.length);
  const max = Math.max(35, ...g);
  const bw = 16, gap = 8, pad = 6, H = 80, base = H - 18;
  const W = pad * 2 + g.length * (bw + gap) - gap;
  let bars = '';
  g.forEach((d, i) => {
    const h = Math.max(4, Math.round((base - pad) * (d / max)));
    const x = pad + i * (bw + gap);
    bars += `<rect class="cycle-bar" x="${x}" y="${base - h}" width="${bw}" height="${h}" rx="3"><title>cycle ${i + 1}: ${d} days</title></rect>`
      + `<text class="cycle-bar-num" x="${x + bw / 2}" y="${H - 4}" text-anchor="middle">${d}</text>`;
  });
  const ay = base - Math.max(4, Math.round((base - pad) * (avg / max)));
  return `<svg class="cycle-viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="Your observed cycle lengths in days. Average ${avg} days. This describes what you logged; it is not a prediction.">`
    + `<line class="cycle-avg" x1="${pad}" y1="${ay}" x2="${W - pad}" y2="${ay}"></line>${bars}</svg>`;
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

const DISCLAIMER = 'This is a private place to note your cycle. It describes what you log — it is <strong>not</strong> a medical device or birth control, and it does <strong>not</strong> predict your next period, ovulation, or fertile days. For anything health-related, please talk with a clinician.';

// The full body of the You-page "Cycle" card — either the opt-in invitation (default)
// or, once enabled, the logger + descriptive view. Inclusive and gentle by design.
export function cycleCardHTML() {
  if (!isEnabled()) {
    return `
      <p class="hint">Optional, for anyone who menstruates. A quiet, private way to note your periods and see your own patterns over time. It stays on this device, and it never predicts or judges — it simply reflects what you log.</p>
      <button class="btn btn-primary" id="you-cycle-enable">Turn on cycle tracking</button>`;
  }
  const avg = avgCycleLen();
  const periods = recentPeriods(8);
  const today = (() => { try { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; } catch { return ''; } })();
  const list = periods.length
    ? `<ul class="you-log cycle-list">${periods.map((p) => {
        const days = periodDays(p);
        const span = p.end ? `${esc(p.start)} → ${esc(p.end)}${days ? ` · ${days} day${days === 1 ? '' : 's'}` : ''}` : `${esc(p.start)} · ongoing`;
        return `<li><span class="you-log-what">${span}</span> <button class="linkish cycle-del" data-id="${esc(p.id)}" aria-label="Delete period entry">✕</button></li>`;
      }).join('')}</ul>`
    : '<p class="hint">No periods logged yet.</p>';
  return `
    <p class="hint">Log a period below. Everything here is descriptive and private.</p>
    <div class="cycle-form">
      <label class="cycle-field">Start <input type="date" id="you-cycle-start" value="${esc(today)}" aria-label="Period start date"></label>
      <label class="cycle-field">End <input type="date" id="you-cycle-end" aria-label="Period end date (optional)"></label>
      <button class="btn btn-primary" id="you-cycle-save">Log</button>
    </div>
    ${avg != null ? `<p class="cycle-avg-note">Across the cycles you have logged, your average length is <strong>${avg} days</strong>. This is a description of your past entries, not a prediction.</p>` : ''}
    ${cycleVizSVG()}
    ${list}
    <p class="hint cycle-disclaimer">${DISCLAIMER}</p>
    <button class="linkish" id="you-cycle-disable">Turn off cycle tracking</button>`;
}
