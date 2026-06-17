// Opt-in intimacy / sex calendar. Lives in its own progress.intimacy ledger (default OFF)
// and NEVER touches sessions[], so it can never grow the garden, a streak, or a badge.
// It is DESCRIPTIVE and PRIVATE only: it reflects what the user chooses to note about their
// own sex life. It deliberately does NOT score, judge, set targets, or offer any medical,
// fertility, or contraception guidance — that framing is intentional and must not be added.
// For anyone, any relationship, any orientation. Everything stays on this device.
//
// This module is the DATA LAYER (state + derived stats + the You-page card). The full
// emoji calendar UI lives in the lazy-loaded js/intimacy-screen.js.

import { store, save } from './state.js';

// ---- ids ----------------------------------------------------------------
function uid(pre) {
  try { if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID(); } catch { /* fall through */ }
  return (pre || 'i') + '-' + new Date().getTime().toString(36) + '-' + Math.floor(Math.random() * 1e9).toString(36);
}

// ---- shape + normalization ---------------------------------------------
// v6 default is { enabled, pinHash, partners, defaultPartnerId, showCycle, days{} }.
// The very first intimacy build (shipped earlier this session) used a flat entries[] of
// { date, count, orgasms, desire(0-10), note }. Normalize that losslessly into days{}.
function blank() { return { enabled: false, pinHash: null, partners: [], defaultPartnerId: null, showCycle: true, days: {} }; }

function im() {
  let x = store.progress.intimacy;
  if (!x || typeof x !== 'object' || Array.isArray(x)) { x = blank(); store.progress.intimacy = x; return x; }
  if (typeof x.enabled !== 'boolean') x.enabled = false;
  if (!('pinHash' in x)) x.pinHash = null;
  if (!Array.isArray(x.partners)) x.partners = [];
  if (!('defaultPartnerId' in x)) x.defaultPartnerId = null;
  if (typeof x.showCycle !== 'boolean') x.showCycle = true;
  if (!x.days || typeof x.days !== 'object' || Array.isArray(x.days)) x.days = {};
  // one-time migration of the old flat entries[]
  if (Array.isArray(x.entries) && x.entries.length) {
    x.entries.forEach((e) => {
      if (!e || !e.date) return;
      const d = x.days[e.date] || { desire: null, note: '', encounters: [] };
      if (e.desire != null && d.desire == null) d.desire = Math.max(0, Math.min(5, Math.round(e.desire / 2))) || null;
      if (e.note && !d.note) d.note = e.note;
      const n = Math.max(0, Math.round(e.count || 0));
      for (let i = 0; i < n; i++) {
        d.encounters.push({ id: uid('e'), time: '', solo: false, partnerId: null, orgasms: i === 0 ? (e.orgasms || 0) : 0, satisfaction: null, protection: null, toys: null, note: '' });
      }
      x.days[e.date] = d;
    });
    delete x.entries;
    save();
  } else if (Array.isArray(x.entries)) {
    delete x.entries;
  }
  return x;
}

// ---- enable / disable ---------------------------------------------------
export function isEnabled() { return !!im().enabled; }
export function setEnabled(on) { im().enabled = !!on; save(); }

// ---- PIN lock (privacy from casual view; NOT encryption) ----------------
// We store only a SHA-256 hash of the PIN, never the PIN itself. The data in this ledger
// is still plain on-device JSON — the PIN hides this section from a casual passer-by, it
// does not encrypt anything. That honest framing is shown to the user in the UI.
let _unlocked = false;

async function sha256(s) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(s)));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // non-crypto fallback (still avoids storing the PIN verbatim)
    let h = 5381; const str = String(s);
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return 'fnv' + h.toString(16);
  }
}

export function hasPin() { return !!im().pinHash; }
export function isUnlocked() { return !hasPin() || _unlocked; }
export function lock() { _unlocked = false; }
export async function setPin(pin) {
  const p = String(pin || '').trim();
  if (!/^\d{4,8}$/.test(p)) return false;
  im().pinHash = await sha256(p);
  _unlocked = true;
  save();
  return true;
}
export async function verifyPin(pin) {
  const h = im().pinHash;
  if (!h) { _unlocked = true; return true; }
  const ok = (await sha256(String(pin || '').trim())) === h;
  if (ok) _unlocked = true;
  return ok;
}
export function clearPin() { im().pinHash = null; _unlocked = true; save(); }

// ---- partners -----------------------------------------------------------
export function listPartners() { return im().partners.slice(); }
export function addPartner(name) {
  const nm = String(name || '').trim().slice(0, 40);
  if (!nm) return null;
  const existing = im().partners.find((p) => p.name.toLowerCase() === nm.toLowerCase());
  if (existing) return existing;
  const p = { id: uid('p'), name: nm };
  im().partners.push(p);
  save();
  return p;
}
export function removePartner(id) {
  const a = im().partners;
  const i = a.findIndex((p) => p.id === id);
  if (i >= 0) { a.splice(i, 1); if (im().defaultPartnerId === id) im().defaultPartnerId = null; save(); }
}
export function setDefaultPartner(id) { im().defaultPartnerId = id || null; save(); }
export function defaultPartner() { return im().partners.find((p) => p.id === im().defaultPartnerId) || null; }
export function partnerName(id) { const p = im().partners.find((x) => x.id === id); return p ? p.name : ''; }

// ---- cycle overlay ------------------------------------------------------
export function showCycle() { return !!im().showCycle; }
export function setShowCycle(on) { im().showCycle = !!on; save(); }
export function isPeriodDay(date) {
  try {
    const c = store.progress.cycle;
    if (!c || !c.enabled || !Array.isArray(c.periods)) return false;
    return c.periods.some((p) => {
      if (!p.start) return false;
      const end = p.end || p.start;
      return date >= p.start && date <= end;
    });
  } catch { return false; }
}

// ---- day + encounter mutations -----------------------------------------
function ensureDay(date) {
  const d = im().days;
  if (!d[date]) d[date] = { desire: null, note: '', encounters: [] };
  if (!Array.isArray(d[date].encounters)) d[date].encounters = [];
  return d[date];
}
export function getDay(date) { return im().days[date] || { desire: null, note: '', encounters: [] }; }
export function setDesire(date, val) {
  const d = ensureDay(date);
  d.desire = (val === '' || val == null) ? null : Math.max(0, Math.min(5, Math.round(Number(val))));
  pruneDay(date); save();
}
export function setDayNote(date, note) { const d = ensureDay(date); d.note = String(note || '').slice(0, 280); pruneDay(date); save(); }

export function addEncounter(date, f = {}) {
  const d = ensureDay(date);
  const e = {
    id: uid('e'),
    time: String(f.time || '').slice(0, 5),
    solo: !!f.solo,
    partnerId: f.solo ? null : (f.partnerId || null),
    orgasms: Math.max(0, Math.min(99, Math.round(Number(f.orgasms) || 0))),
    satisfaction: (f.satisfaction == null || f.satisfaction === '') ? null : Math.max(1, Math.min(5, Math.round(Number(f.satisfaction)))),
    protection: (f.protection == null) ? null : !!f.protection,
    toys: (f.toys == null) ? null : !!f.toys,
    note: String(f.note || '').slice(0, 200),
  };
  d.encounters.push(e);
  save();
  return e;
}
export function removeEncounter(date, encId) {
  const d = im().days[date];
  if (!d) return;
  const i = d.encounters.findIndex((e) => e.id === encId);
  if (i >= 0) { d.encounters.splice(i, 1); pruneDay(date); save(); }
}
// drop a day that holds nothing, so the calendar stays clean
function pruneDay(date) {
  const d = im().days[date];
  if (d && (!d.encounters || !d.encounters.length) && d.desire == null && !d.note) delete im().days[date];
}

// ---- derived: glyphs, stats, streak, series -----------------------------
export const FACES = ['', '😞', '😐', '🙂', '😊', '😍']; // 1..5
export function faceFor(v) { return v == null ? '' : (FACES[Math.max(1, Math.min(5, Math.round(v)))] || ''); }

function dayAvgSatisfaction(d) {
  const xs = (d.encounters || []).map((e) => e.satisfaction).filter((s) => s != null);
  if (!xs.length) return null;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

// A compact emoji summary for a calendar cell.
export function dayGlyphs(date) {
  const d = im().days[date];
  const period = (showCycle() && isPeriodDay(date)) ? '🩸' : '';
  if (!d) return { face: '', count: 0, org: 0, kind: '', desire: null, period, wantedUnmet: false };
  const count = (d.encounters || []).length;
  const org = (d.encounters || []).reduce((s, e) => s + (e.orgasms || 0), 0);
  const anyPartner = (d.encounters || []).some((e) => !e.solo);
  const anySolo = (d.encounters || []).some((e) => e.solo);
  const kind = count ? (anyPartner ? '💞' : (anySolo ? '🌙' : '')) : '';
  const avg = dayAvgSatisfaction(d);
  const wantedUnmet = count === 0 && d.desire != null && d.desire >= 3;
  return { face: faceFor(avg), count, org, kind, desire: d.desire, period, wantedUnmet };
}

function ymd(dt) {
  const y = dt.getFullYear(); const m = String(dt.getMonth() + 1).padStart(2, '0'); const da = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${da}`;
}
export function todayStr() { try { return ymd(new Date()); } catch { return ''; } }

// "Days you logged anything" streak, counting back from today (inclusive of today, but if
// today is empty it counts back from yesterday so the streak does not pressure you daily).
export function loggingStreak() {
  const days = im().days;
  const keys = Object.keys(days);
  if (!keys.length) return 0;
  let cur = new Date();
  // if today empty, start from yesterday
  if (!days[ymd(cur)]) cur.setDate(cur.getDate() - 1);
  let n = 0;
  for (let i = 0; i < 4000; i++) {
    if (days[ymd(cur)]) { n++; cur.setDate(cur.getDate() - 1); } else break;
  }
  return n;
}

export function statsMonth(year, month) {
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
  const days = im().days;
  let enc = 0, org = 0, sat = 0, satN = 0, logged = 0, withSex = 0;
  Object.keys(days).forEach((k) => {
    if (!k.startsWith(prefix)) return;
    logged++;
    const d = days[k];
    enc += (d.encounters || []).length;
    if ((d.encounters || []).length) withSex++;
    (d.encounters || []).forEach((e) => { org += (e.orgasms || 0); if (e.satisfaction != null) { sat += e.satisfaction; satN++; } });
  });
  return { encounters: enc, orgasms: org, avgSatisfaction: satN ? Math.round((sat / satN) * 10) / 10 : null, daysLogged: logged, daysWithSex: withSex };
}

export function statsAll() {
  const days = im().days; let enc = 0, org = 0, sat = 0, satN = 0;
  const logged = Object.keys(days).length;
  Object.values(days).forEach((d) => {
    enc += (d.encounters || []).length;
    (d.encounters || []).forEach((e) => { org += (e.orgasms || 0); if (e.satisfaction != null) { sat += e.satisfaction; satN++; } });
  });
  return { encounters: enc, orgasms: org, avgSatisfaction: satN ? Math.round((sat / satN) * 10) / 10 : null, daysLogged: logged };
}

// Per-day series for the last `n` days (oldest first): encounter counts + avg satisfaction.
export function series(n = 30) {
  const days = im().days; const out = [];
  const cur = new Date();
  cur.setDate(cur.getDate() - (n - 1));
  for (let i = 0; i < n; i++) {
    const key = ymd(cur);
    const d = days[key];
    out.push({ date: key, count: d ? (d.encounters || []).length : 0, sat: d ? dayAvgSatisfaction(d) : null });
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

// ---- You-page entry card -----------------------------------------------
const INVITE = 'Optional, for anyone. A private emoji calendar for your sex life — how often, orgasms, satisfaction, desire (including the days you wanted to and did not), partners, and more. It stays on this device, never scores or judges, and can be locked with a PIN.';

export function intimacyCardHTML() {
  if (!isEnabled()) {
    return `<p class="hint">${INVITE}</p>
      <button class="btn btn-primary" id="you-intim-enable">Turn on the calendar</button>`;
  }
  if (hasPin() && !isUnlocked()) {
    return `<p class="hint">🔒 This space is locked. Open it to enter your PIN.</p>
      <a class="btn btn-primary" href="#intimacy">Open the calendar</a>`;
  }
  const s = statsMonth(new Date().getFullYear(), new Date().getMonth());
  const streak = loggingStreak();
  return `
    <p class="hint">This month: <strong>${s.encounters}</strong> time${s.encounters === 1 ? '' : 's'}, <strong>${s.orgasms}</strong> orgasm${s.orgasms === 1 ? '' : 's'}${s.avgSatisfaction != null ? `, satisfaction ${faceFor(s.avgSatisfaction)} ${s.avgSatisfaction}/5` : ''}. Logging streak: <strong>${streak}</strong> day${streak === 1 ? '' : 's'}.</p>
    <a class="btn btn-primary" href="#intimacy">Open the calendar</a>`;
}
