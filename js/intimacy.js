// Opt-in intimacy / sex log. Lives in its own progress.intimacy ledger (default OFF)
// and NEVER touches sessions[], so it can never grow the garden, a streak, or a badge.
// It is DESCRIPTIVE and PRIVATE only: it reflects what the user chooses to note about
// their own sex life — how often, orgasms, desire, and a free note. It deliberately does
// NOT predict, score, judge, set targets, or offer any medical, fertility, or
// contraception guidance — that framing is intentional and must not be added. For anyone,
// any relationship, any orientation. Everything stays on this device and never leaves it.

import { store, save } from './state.js';

function uid() {
  try { if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID(); } catch { /* fall through */ }
  return 'i-' + new Date().getTime().toString(36) + '-' + Math.floor(Math.random() * 1e9).toString(36);
}

function im() {
  let x = store.progress.intimacy;
  if (!x || typeof x !== 'object' || Array.isArray(x)) { x = { enabled: false, entries: [] }; store.progress.intimacy = x; }
  if (!Array.isArray(x.entries)) x.entries = [];
  return x;
}

export function isEnabled() { return !!im().enabled; }
export function setEnabled(on) { im().enabled = !!on; save(); }

function clampInt(v, lo, hi) {
  const n = Math.round(Number(v));
  if (!isFinite(n)) return null;
  return Math.max(lo, Math.min(hi, n));
}

// Add one day's entry. All fields optional except a date — a user may log only desire on
// a day with no sex, or only a note. Stored as a dated row, like cycle periods / meals.
export function addEntry({ date, count, orgasms, desire, note } = {}) {
  if (!date) return null;
  const e = {
    id: uid(),
    ts: new Date().toISOString(),
    date,
    count: clampInt(count, 0, 99),
    orgasms: clampInt(orgasms, 0, 99),
    desire: (desire === '' || desire == null) ? null : clampInt(desire, 0, 10),
    note: String(note == null ? '' : note).slice(0, 280),
  };
  if (e.count == null) e.count = 0;
  if (e.orgasms == null) e.orgasms = 0;
  im().entries.push(e);
  save();
  return e;
}

export function removeEntry(id) {
  const a = im().entries;
  const i = a.findIndex((x) => x.id === id);
  if (i >= 0) { a.splice(i, 1); save(); }
}

export function recentEntries(n = 10) {
  return im().entries.slice().sort((a, b) => (a.date < b.date ? 1 : (a.date > b.date ? -1 : (a.ts < b.ts ? 1 : -1)))).slice(0, n);
}

// Plain descriptive totals across everything logged. No targets, no scores, no judgment.
function summary() {
  const a = im().entries;
  if (!a.length) return null;
  const days = new Set(a.map((e) => e.date)).size;
  const totalCount = a.reduce((s, e) => s + (e.count || 0), 0);
  const totalOrg = a.reduce((s, e) => s + (e.orgasms || 0), 0);
  const desires = a.map((e) => e.desire).filter((d) => d != null);
  const avgDesire = desires.length ? Math.round((desires.reduce((s, d) => s + d, 0) / desires.length) * 10) / 10 : null;
  return { days, totalCount, totalOrg, avgDesire, entries: a.length };
}

// A simple, colour-independent bar picture of the most recent logged days' "times".
// Orgasm counts ride along as labels. Purely descriptive — a mirror, not a metric.
function vizSVG() {
  const rows = recentEntries(8).slice().reverse();
  if (rows.length < 1) return '';
  const max = Math.max(1, ...rows.map((r) => r.count || 0));
  const bw = 18, gap = 8, pad = 6, H = 84, base = H - 20;
  const W = pad * 2 + rows.length * (bw + gap) - gap;
  let bars = '';
  rows.forEach((r, i) => {
    const c = r.count || 0;
    const h = Math.max(3, Math.round((base - pad) * (c / max)));
    const x = pad + i * (bw + gap);
    const md = (r.date || '').slice(5); // MM-DD
    bars += `<rect class="cycle-bar" x="${x}" y="${base - h}" width="${bw}" height="${h}" rx="3"><title>${r.date}: ${c} time${c === 1 ? '' : 's'}, ${r.orgasms || 0} orgasm${(r.orgasms || 0) === 1 ? '' : 's'}${r.desire != null ? `, desire ${r.desire}/10` : ''}</title></rect>`
      + `<text class="cycle-bar-num" x="${x + bw / 2}" y="${base - h - 3}" text-anchor="middle">${c}</text>`
      + `<text class="cycle-bar-num" x="${x + bw / 2}" y="${H - 4}" text-anchor="middle">${md}</text>`;
  });
  return `<svg class="cycle-viz" viewBox="0 0 ${W} ${H}" role="img" aria-label="The number of times per day you logged, most recent on the right. This describes what you logged; it is not a score or a goal.">${bars}</svg>`;
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

const DISCLAIMER = 'A private place to note your intimate life, if it helps you understand your own patterns. It describes only what you log — there are no scores, goals, or judgments, and it is <strong>not</strong> medical, fertility, or contraception advice. Everything stays on this device.';

// The full body of the You-page "Intimacy" card — either the opt-in invitation (default)
// or, once enabled, the logger + descriptive view. Gentle and non-judgmental by design.
export function intimacyCardHTML() {
  if (!isEnabled()) {
    return `
      <p class="hint">Optional, for anyone. A quiet, private way to note your sex life — how often, orgasms, how much you wanted to, and anything else worth remembering — and to see your own patterns over time. It stays on this device, and it never scores or judges; it simply reflects what you log.</p>
      <button class="btn btn-primary" id="you-intim-enable">Turn on intimacy tracking</button>`;
  }
  const s = summary();
  const entries = recentEntries(10);
  const today = (() => { try { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; } catch { return ''; } })();
  const list = entries.length
    ? `<ul class="you-log intimacy-list">${entries.map((e) => {
        const bits = [];
        bits.push(`${e.count || 0}×`);
        if (e.orgasms) bits.push(`${e.orgasms} orgasm${e.orgasms === 1 ? '' : 's'}`);
        if (e.desire != null) bits.push(`desire ${e.desire}/10`);
        const meta = bits.join(' · ');
        const note = e.note ? ` — <span class="intimacy-note">${esc(e.note)}</span>` : '';
        return `<li><span class="you-log-what">${meta}${note}</span><span class="you-log-date">${esc(e.date)}</span> <button class="linkish intimacy-del" data-id="${esc(e.id)}" aria-label="Delete intimacy entry">✕</button></li>`;
      }).join('')}</ul>`
    : '<p class="hint">No entries logged yet.</p>';
  return `
    <p class="hint">Log a day below. Leave anything blank that you do not want to track. Everything here is descriptive and private.</p>
    <div class="cycle-form intimacy-form">
      <label class="cycle-field">Date <input type="date" id="you-intim-date" value="${esc(today)}" aria-label="Date"></label>
      <label class="cycle-field">Times <input type="number" id="you-intim-count" min="0" max="99" inputmode="numeric" placeholder="0" aria-label="Times you had sex that day"></label>
      <label class="cycle-field">Orgasms <input type="number" id="you-intim-org" min="0" max="99" inputmode="numeric" placeholder="0" aria-label="Number of orgasms"></label>
      <label class="cycle-field intimacy-desire">Desire <span class="intimacy-desire-val" id="you-intim-desire-val">–</span>
        <input type="range" id="you-intim-desire" min="0" max="10" step="1" value="5" aria-label="How much you wanted to (0 to 10)"></label>
      <label class="cycle-field intimacy-note-field">Note <input type="text" id="you-intim-note" maxlength="280" placeholder="anything else worth remembering" aria-label="Optional note"></label>
      <button class="btn btn-primary" id="you-intim-save">Log</button>
    </div>
    ${s ? `<p class="cycle-avg-note">Across <strong>${s.days}</strong> day${s.days === 1 ? '' : 's'} logged: <strong>${s.totalCount}</strong> time${s.totalCount === 1 ? '' : 's'}, <strong>${s.totalOrg}</strong> orgasm${s.totalOrg === 1 ? '' : 's'}${s.avgDesire != null ? `, average desire <strong>${s.avgDesire}/10</strong>` : ''}. This describes your past entries, not a goal.</p>` : ''}
    ${vizSVG()}
    ${list}
    <p class="hint cycle-disclaimer">${DISCLAIMER}</p>
    <button class="linkish" id="you-intim-disable">Turn off intimacy tracking</button>`;
}
