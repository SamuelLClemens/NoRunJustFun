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
function blank() { return { enabled: false, pinHash: null, partners: [], defaultPartnerId: null, showCycle: true, days: {}, cycleMerged: true }; }

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
  // One-time merge of the old standalone cycle ledger into the personal calendar:
  // expand each logged period range into per-day period flags on this calendar's days{}.
  // The cycle tracker is now part of the personal calendar, so this is the single source.
  if (!('cycleMerged' in x)) {
    try {
      const c = store.progress.cycle;
      if (c && Array.isArray(c.periods)) {
        c.periods.forEach((p) => {
          if (!p || !p.start) return;
          const end = p.end || p.start;
          let d = new Date(p.start + 'T00:00:00');
          const endD = new Date(end + 'T00:00:00');
          for (let i = 0; i < 400 && d <= endD; i++) {
            const key = ymd(d);
            const day = x.days[key] || { desire: null, note: '', encounters: [] };
            day.period = true;
            x.days[key] = day;
            d.setDate(d.getDate() + 1);
          }
        });
      }
    } catch { /* nothing to merge */ }
    x.cycleMerged = true;
    save();
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

// Toggleable calendar layers — view any one on its own, any combination, or all at
// once. Persisted so the view is remembered. ('anniversary' = the day the user started
// the app, marked every year.) meals/journal/weight READ their own ledgers (read-only;
// the calendar never writes sessions[]/meals[]/journal[]/weights[]).
export const LAYER_KEYS = ['intimacy', 'period', 'mood', 'usage', 'meals', 'journal', 'weight', 'birthday', 'anniversary'];
export function getLayers() {
  const x = im();
  if (!x.layers || typeof x.layers !== 'object' || Array.isArray(x.layers)) x.layers = {};
  LAYER_KEYS.forEach((k) => { if (typeof x.layers[k] !== 'boolean') x.layers[k] = true; });
  return x.layers;
}
export function setLayer(k, on) { const L = getLayers(); if (LAYER_KEYS.includes(k)) { L[k] = !!on; save(); } }
// Period tracking now lives in this calendar's own day model (merged from the old cycle
// ledger). isPeriodDay reflects what the user has logged here — descriptive, not a forecast.
export function isPeriod(date) { const d = im().days[date]; return !!(d && d.period); }
export function isPeriodDay(date) { return isPeriod(date); }
export function setPeriod(date, on) {
  const d = ensureDay(date);
  d.period = !!on;
  pruneDay(date);
  save();
}

// Group logged period days into consecutive clusters (one cluster = one period), then read
// cycle length as the gap between cluster starts. Purely descriptive — never a prediction.
function periodClusters() {
  const keys = Object.keys(im().days).filter((k) => im().days[k].period).sort();
  const clusters = [];
  keys.forEach((k) => {
    const last = clusters[clusters.length - 1];
    if (last) {
      const prev = last[last.length - 1];
      const gap = Math.round((new Date(k + 'T00:00:00') - new Date(prev + 'T00:00:00')) / 86400000);
      if (gap === 1) { last.push(k); return; }
    }
    clusters.push([k]);
  });
  return clusters;
}
export function cycleStats() {
  const cl = periodClusters();
  if (!cl.length) return null;
  const starts = cl.map((c) => c[0]);
  const gaps = [];
  for (let i = 1; i < starts.length; i++) {
    const g = Math.round((new Date(starts[i] + 'T00:00:00') - new Date(starts[i - 1] + 'T00:00:00')) / 86400000);
    if (g > 0 && g < 200) gaps.push(g);
  }
  const avgLen = gaps.length ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : null;
  const lastStart = starts[starts.length - 1];
  let daysSince = null;
  try { daysSince = Math.round((new Date(todayStr() + 'T00:00:00') - new Date(lastStart + 'T00:00:00')) / 86400000); } catch { daysSince = null; }
  return {
    avgLen, lastStart, daysSince, periodCount: cl.length,
    recent: cl.slice(-6).reverse().map((c) => ({ start: c[0], end: c[c.length - 1], days: c.length })),
  };
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

// --- Mood, energy, symptoms (per day) ----------------------------------
function clamp1to5(v) { const n = Math.round(Number(v)); return isFinite(n) ? Math.max(1, Math.min(5, n)) : null; }
export const MOODS = ['', '😞', '😕', '😐', '🙂', '😄']; // 1..5
export function moodFor(v) { return v == null ? '' : (MOODS[Math.max(1, Math.min(5, Math.round(v)))] || ''); }
export const SYMPTOMS = [
  { id: 'cramps', label: 'Cramps' },
  { id: 'headache', label: 'Headache' },
  { id: 'bloating', label: 'Bloating' },
  { id: 'tender', label: 'Tender breasts' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'nausea', label: 'Nausea' },
  { id: 'backache', label: 'Backache' },
  { id: 'acne', label: 'Acne' },
  { id: 'cravings', label: 'Cravings' },
  { id: 'poorsleep', label: 'Poor sleep' },
];
const SYMPTOM_LABEL = Object.fromEntries(SYMPTOMS.map((s) => [s.id, s.label]));
export function symptomLabel(id) { return SYMPTOM_LABEL[id] || id; }
export function setMood(date, v) { const d = ensureDay(date); d.mood = (v === '' || v == null) ? null : clamp1to5(v); pruneDay(date); save(); }
export function setEnergy(date, v) { const d = ensureDay(date); d.energy = (v === '' || v == null) ? null : clamp1to5(v); pruneDay(date); save(); }
export function toggleSymptom(date, id) {
  const d = ensureDay(date);
  if (!Array.isArray(d.symptoms)) d.symptoms = [];
  const i = d.symptoms.indexOf(id);
  if (i >= 0) d.symptoms.splice(i, 1); else d.symptoms.push(id);
  pruneDay(date);
  save();
}
export function hasSymptom(date, id) { const d = im().days[date]; return !!(d && Array.isArray(d.symptoms) && d.symptoms.includes(id)); }

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
  if (d && (!d.encounters || !d.encounters.length) && d.desire == null && !d.note && !d.period
    && d.mood == null && d.energy == null && (!d.symptoms || !d.symptoms.length)) delete im().days[date];
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

function pctOf(n, d) { return d ? Math.round((n / d) * 100) : 0; }

export function statsMonth(year, month) {
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
  const days = im().days;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const t = todayStr();
  const isCurrent = t.startsWith(prefix);
  // "% of the month" measures against days elapsed in the current month, full month otherwise
  const denom = isCurrent ? Math.max(1, parseInt(t.slice(8, 10), 10)) : daysInMonth;
  let enc = 0, org = 0, sat = 0, satN = 0, logged = 0, withSex = 0;
  let solo = 0, partnered = 0, prot = 0, toys = 0, oNone = 0, oSingle = 0, oMulti = 0;
  let topDay = null;
  Object.keys(days).forEach((k) => {
    if (!k.startsWith(prefix)) return;
    logged++;
    const d = days[k];
    const ec = (d.encounters || []).length;
    if (ec) withSex++;
    if (ec && (!topDay || ec > topDay.count)) topDay = { date: k, count: ec };
    enc += ec;
    (d.encounters || []).forEach((e) => {
      const o = e.orgasms || 0; org += o;
      if (o <= 0) oNone++; else if (o === 1) oSingle++; else oMulti++;
      if (e.solo) solo++; else partnered++;
      if (e.protection) prot++;
      if (e.toys) toys++;
      if (e.satisfaction != null) { sat += e.satisfaction; satN++; }
    });
  });
  return {
    encounters: enc, orgasms: org,
    avgSatisfaction: satN ? Math.round((sat / satN) * 10) / 10 : null,
    daysLogged: logged, daysWithSex: withSex,
    daysInMonth, denom, pctDaysWithSex: pctOf(withSex, denom),
    avgOrgPerTime: enc ? Math.round((org / enc) * 10) / 10 : 0,
    org: { none: oNone, single: oSingle, multi: oMulti },
    orgPct: { none: pctOf(oNone, enc), single: pctOf(oSingle, enc), multi: pctOf(oMulti, enc) },
    solo, partnered, soloPct: pctOf(solo, enc), partneredPct: pctOf(partnered, enc),
    protUsed: prot, toysUsed: toys, protPct: pctOf(prot, enc), toysPct: pctOf(toys, enc),
    topDay,
  };
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

// Gentle, DESCRIPTIVE insights across everything logged — cycle, desire, satisfaction,
// mood, symptoms. Never a prediction, never medical advice. Returns readable sentences.
export function insights() {
  const days = im().days;
  const keys = Object.keys(days).sort();
  if (keys.length < 3) return { enough: false, count: keys.length, lines: [] };
  const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : null);
  const r1 = (n) => Math.round(n * 10) / 10;
  let encTotal = 0; const satAll = []; const desP = []; const desN = []; const moodP = []; const moodN = [];
  const symCount = {}; const satByDow = [[], [], [], [], [], [], []];
  keys.forEach((k) => {
    const d = days[k]; const isP = !!d.period;
    encTotal += (d.encounters || []).length;
    (d.encounters || []).forEach((e) => {
      if (e.satisfaction != null) { satAll.push(e.satisfaction); try { satByDow[new Date(k + 'T00:00:00').getDay()].push(e.satisfaction); } catch { /* skip */ } }
    });
    if (d.desire != null) (isP ? desP : desN).push(d.desire);
    if (d.mood != null) (isP ? moodP : moodN).push(d.mood);
    (d.symptoms || []).forEach((s) => { symCount[s] = (symCount[s] || 0) + 1; });
  });
  const lines = [];
  let spanDays = 1;
  try { spanDays = Math.max(1, Math.round((new Date(keys[keys.length - 1] + 'T00:00:00') - new Date(keys[0] + 'T00:00:00')) / 86400000) + 1); } catch { spanDays = 1; }
  const perWeek = r1((encTotal / spanDays) * 7);
  lines.push(`You have logged <strong>${encTotal}</strong> encounter${encTotal === 1 ? '' : 's'} over ${spanDays} day${spanDays === 1 ? '' : 's'} — about <strong>${perWeek}</strong> a week.`);
  const sa = avg(satAll); if (sa != null) lines.push(`Average satisfaction: <strong>${faceFor(sa)} ${r1(sa)}/5</strong>.`);
  const dp = avg(desP); const dn = avg(desN);
  if (dp != null && dn != null) lines.push(`Desire averaged <strong>${r1(dp)}/5</strong> on period days and <strong>${r1(dn)}/5</strong> on other days.`);
  const mp = avg(moodP); const mn = avg(moodN);
  if (mp != null && mn != null) lines.push(`Mood averaged <strong>${moodFor(mp)} ${r1(mp)}/5</strong> on period days and <strong>${moodFor(mn)} ${r1(mn)}/5</strong> on other days.`);
  const topSym = Object.entries(symCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (topSym.length) lines.push(`Most-logged feelings: ${topSym.map(([id, n]) => `${symptomLabel(id)} (${n})`).join(', ')}.`);
  const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let bDow = -1; let bVal = -1;
  satByDow.forEach((arr, i) => { const a = avg(arr); if (a != null && arr.length >= 2 && a > bVal) { bVal = a; bDow = i; } });
  if (bDow >= 0) lines.push(`Satisfaction tended to be highest on <strong>${DOW[bDow]}s</strong>.`);
  return { enough: true, count: keys.length, lines };
}

// Cross-ledger READ-ONLY accessors for the stats engine. The personal calendar
// reflects the rest of the app; it never writes these ledgers (isolation invariant).
function sessionsArr() { return (store.progress && store.progress.sessions) || []; }
function journalArr() { return (store.progress && store.progress.journal) || []; }
function mealsArr() { return (store.progress && store.progress.meals) || []; }
function weightsArr() { return (store.progress && store.progress.weights) || []; }
function usageKind(s) {
  const k = (s && s.kind) || '';
  if (k === 'meditation') return 'meditation';
  if (k.endsWith('-game') || k.endsWith('-quiz') || (Array.isArray(s.lessonIds) && s.lessonIds.length)) return 'learn';
  return 'move';
}

// THE juicy stats engine. Descriptive, celebratory, pattern-naming — never a goal,
// score, judgment, prediction, or medical/fertility claim (that framing is intentional
// and must not change). Returns ordered sections [{ title, lines:[html] }] across sex,
// app usage, journaling, meals, and weight. Lines use <strong> for the punchy numbers.
export function richInsights(year, month) {
  const days = im().days;
  const keys = Object.keys(days).sort();
  const r1 = (n) => Math.round(n * 10) / 10;
  const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);
  const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : null);
  const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const sections = [];

  // ---------- gather all-time intimacy data ----------
  let encTotal = 0, orgTotal = 0, oNone = 0, oSingle = 0, oMulti = 0, oBig = 0, solo = 0, part = 0, prot = 0, toys = 0;
  let wantedDays = 0, wantedMet = 0, bestDay = null;
  const satAll = []; const satByDow = [[], [], [], [], [], [], []];
  const tod = { morning: 0, afternoon: 0, evening: 0, night: 0 };
  const dowCount = [0, 0, 0, 0, 0, 0, 0];
  const partnerCount = {};
  const desP = [], desN = [], moodP = [], moodN = []; const symCount = {};
  keys.forEach((k) => {
    const d = days[k]; const isP = !!d.period;
    const ec = (d.encounters || []).length;
    encTotal += ec;
    if (ec && (!bestDay || ec > bestDay.count)) bestDay = { date: k, count: ec };
    if (d.desire != null && d.desire >= 3) { wantedDays++; if (ec) wantedMet++; }
    if (d.desire != null) (isP ? desP : desN).push(d.desire);
    if (d.mood != null) (isP ? moodP : moodN).push(d.mood);
    (d.symptoms || []).forEach((s) => { symCount[s] = (symCount[s] || 0) + 1; });
    let dow = 0; try { dow = new Date(k + 'T00:00:00').getDay(); } catch { dow = 0; }
    if (ec) dowCount[dow] += ec;
    (d.encounters || []).forEach((e) => {
      const o = e.orgasms || 0; orgTotal += o;
      if (o <= 0) oNone++; else if (o === 1) oSingle++; else { oMulti++; if (o >= 3) oBig++; }
      if (e.solo) solo++; else { part++; if (e.partnerId) { const nm = partnerName(e.partnerId) || 'a partner'; partnerCount[nm] = (partnerCount[nm] || 0) + 1; } }
      if (e.protection) prot++;
      if (e.toys) toys++;
      if (e.satisfaction != null) { satAll.push(e.satisfaction); satByDow[dow].push(e.satisfaction); }
      if (e.time) { const h = parseInt(String(e.time).slice(0, 2), 10); if (isFinite(h)) { if (h >= 5 && h < 12) tod.morning++; else if (h < 17) tod.afternoon++; else if (h < 22) tod.evening++; else tod.night++; } }
    });
  });

  // ---------- "This month" ----------
  const sm = statsMonth(year, month);
  const monthLines = [];
  if (sm.daysWithSex) {
    monthLines.push(`You were intimate on <strong>${sm.pctDaysWithSex}%</strong> of days this month (${sm.daysWithSex} of ${sm.denom}).`);
    if (sm.encounters) monthLines.push(`<strong>${sm.encounters}</strong> time${sm.encounters === 1 ? '' : 's'}, <strong>${sm.orgasms}</strong> orgasm${sm.orgasms === 1 ? '' : 's'} — about <strong>${sm.avgOrgPerTime}</strong> each time.`);
    if (sm.orgPct.multi) monthLines.push(`Multiple orgasms happened <strong>${sm.orgPct.multi}%</strong> of the time this month. 🎉`);
    if (sm.topDay) { const dd = sm.topDay.date; monthLines.push(`Your liveliest day was <strong>${MONTH_ABBR[parseInt(dd.slice(5, 7), 10) - 1]} ${parseInt(dd.slice(8, 10), 10)}</strong> with <strong>${sm.topDay.count}</strong>.`); }
    if (sm.avgSatisfaction != null) monthLines.push(`Satisfaction this month: <strong>${faceFor(sm.avgSatisfaction)} ${sm.avgSatisfaction}/5</strong>.`);
  }
  if (monthLines.length) sections.push({ title: 'This month', lines: monthLines });

  // ---------- Orgasms (all time) ----------
  if (encTotal) {
    const ol = [];
    ol.push(`Across <strong>${encTotal}</strong> time${encTotal === 1 ? '' : 's'}, that is <strong>${orgTotal}</strong> orgasm${orgTotal === 1 ? '' : 's'} in all.`);
    ol.push(`The breakdown: <strong>${pct(oMulti, encTotal)}%</strong> multiple, <strong>${pct(oSingle, encTotal)}%</strong> a single, <strong>${pct(oNone, encTotal)}%</strong> none.`);
    if (oBig) ol.push(`<strong>${oBig}</strong> time${oBig === 1 ? '' : 's'} you reached <strong>three or more</strong>. ✨`);
    ol.push(`That averages <strong>${r1(orgTotal / encTotal)}</strong> orgasms a time.`);
    sections.push({ title: 'Your orgasms', lines: ol });
  }

  // ---------- Patterns ----------
  const pat = [];
  let spanDays = 1;
  if (keys.length) { try { spanDays = Math.max(1, Math.round((new Date(keys[keys.length - 1] + 'T00:00:00') - new Date(keys[0] + 'T00:00:00')) / 86400000) + 1); } catch { spanDays = 1; } }
  if (encTotal) pat.push(`You average about <strong>${r1((encTotal / spanDays) * 7)}</strong> times a week.`);
  const todTop = Object.entries(tod).sort((a, b) => b[1] - a[1])[0];
  if (todTop && todTop[1] > 0) pat.push(`You are most often intimate in the <strong>${todTop[0]}</strong>.`);
  let bDow = -1, bN = 0; dowCount.forEach((n, i) => { if (n > bN) { bN = n; bDow = i; } });
  if (bDow >= 0 && bN > 0) pat.push(`<strong>${DOW[bDow]}</strong> is your most active day of the week.`);
  if (encTotal) {
    if (solo && part) pat.push(`<strong>${pct(part, encTotal)}%</strong> partnered, <strong>${pct(solo, encTotal)}%</strong> solo.`);
    else if (solo) pat.push(`All solo so far — <strong>${solo}</strong> time${solo === 1 ? '' : 's'}.`);
    else if (part) pat.push(`All partnered so far — <strong>${part}</strong> time${part === 1 ? '' : 's'}.`);
    if (prot) pat.push(`Protection used <strong>${pct(prot, encTotal)}%</strong> of the time.`);
    if (toys) pat.push(`Toys featured <strong>${pct(toys, encTotal)}%</strong> of the time. 🧸`);
  }
  if (wantedDays) pat.push(`On days you wanted to, it happened <strong>${pct(wantedMet, wantedDays)}%</strong> of the time.`);
  const topPartner = Object.entries(partnerCount).sort((a, b) => b[1] - a[1])[0];
  if (topPartner && Object.keys(partnerCount).length > 1) pat.push(`Most-logged partner: <strong>${topPartner[0]}</strong> (${topPartner[1]}).`);
  const sa = avg(satAll); if (sa != null) pat.push(`Overall satisfaction: <strong>${faceFor(sa)} ${r1(sa)}/5</strong>.`);
  let sbDow = -1, sbVal = -1; satByDow.forEach((arr, i) => { const a = avg(arr); if (a != null && arr.length >= 2 && a > sbVal) { sbVal = a; sbDow = i; } });
  if (sbDow >= 0) pat.push(`Satisfaction tends to peak on <strong>${DOW[sbDow]}s</strong>.`);
  if (bestDay && bestDay.count >= 2) pat.push(`Your record in a single day: <strong>${bestDay.count}</strong>. 🔥`);
  if (pat.length) sections.push({ title: 'Your patterns', lines: pat });

  // ---------- Across your cycle ----------
  const cyc = [];
  const dp = avg(desP), dn = avg(desN);
  if (dp != null && dn != null) cyc.push(`Desire averages <strong>${r1(dp)}/5</strong> on period days vs <strong>${r1(dn)}/5</strong> on other days.`);
  const mp = avg(moodP), mn = avg(moodN);
  if (mp != null && mn != null) cyc.push(`Mood averages <strong>${moodFor(mp)} ${r1(mp)}/5</strong> on period days vs <strong>${moodFor(mn)} ${r1(mn)}/5</strong> on other days.`);
  const topSym = Object.entries(symCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (topSym.length) cyc.push(`Most-logged feelings: ${topSym.map(([id, n]) => `${symptomLabel(id)} (${n})`).join(', ')}.`);
  const cs = cycleStats();
  if (cs && cs.avgLen != null) cyc.push(`Your cycles average about <strong>${cs.avgLen}</strong> days (descriptive, not a prediction).`);
  if (cyc.length) sections.push({ title: 'Across your cycle', lines: cyc });

  // ---------- Your app life (usage) ----------
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
  const sess = sessionsArr();
  if (sess.length) {
    const app = [];
    const activeMonth = new Set(sess.filter((s) => s && s.date && s.date.startsWith(monthPrefix)).map((s) => s.date)).size;
    const allDays = new Set(sess.filter((s) => s && s.date).map((s) => s.date)).size;
    const typeCount = { meditation: 0, learn: 0, move: 0 };
    let mins = 0;
    sess.forEach((s) => { typeCount[usageKind(s)]++; mins += (s.mins || 0); });
    const typeLabel = { meditation: 'meditating', learn: 'learning', move: 'moving' };
    const favType = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0];
    if (activeMonth) app.push(`You showed up in the app on <strong>${activeMonth}</strong> day${activeMonth === 1 ? '' : 's'} this month.`);
    app.push(`<strong>${sess.length}</strong> sessions across <strong>${allDays}</strong> day${allDays === 1 ? '' : 's'} — about <strong>${Math.round(mins)}</strong> minutes in all.`);
    if (favType && favType[1] > 0) app.push(`Your favorite way to show up is <strong>${typeLabel[favType[0]]}</strong>.`);
    sections.push({ title: 'Your app life', lines: app });
  }

  // ---------- Your journal ----------
  const jr = journalArr();
  if (jr.length) {
    const jl = [];
    const jMonth = jr.filter((j) => j && j.ts && j.ts.startsWith(monthPrefix)).length;
    const words = jr.reduce((s, j) => s + (((j.text || '').trim()) ? j.text.trim().split(/\s+/).length : 0), 0);
    const voiceN = jr.filter((j) => j.kind === 'voice').length;
    jl.push(`<strong>${jr.length}</strong> journal entr${jr.length === 1 ? 'y' : 'ies'}${jMonth ? `, ${jMonth} this month` : ''} — <strong>${words}</strong> word${words === 1 ? '' : 's'} in all.`);
    if (voiceN) jl.push(`<strong>${voiceN}</strong> of them you spoke out loud. 🎙️`);
    sections.push({ title: 'Your journal', lines: jl });
  }

  // ---------- Meals ----------
  const ml = mealsArr();
  if (ml.length) {
    const mlMonth = ml.filter((m) => m && m.ts && m.ts.startsWith(monthPrefix)).length;
    const mealDays = new Set(ml.filter((m) => m && m.ts).map((m) => m.ts.slice(0, 10))).size;
    sections.push({ title: 'Your meals', lines: [`<strong>${ml.length}</strong> meal note${ml.length === 1 ? '' : 's'}${mlMonth ? `, ${mlMonth} this month` : ''}, across <strong>${mealDays}</strong> day${mealDays === 1 ? '' : 's'}.`] });
  }

  // ---------- Weight (neutral, no judgment) ----------
  const w = weightsArr().filter((x) => x && x.date && typeof x.value === 'number').slice().sort((a, b) => (a.date < b.date ? -1 : 1));
  if (w.length) {
    const unit = (store.profile && store.profile.weightUnit) || 'lb';
    const wl = [`<strong>${w.length}</strong> weigh-in${w.length === 1 ? '' : 's'} logged; most recent <strong>${w[w.length - 1].value} ${unit}</strong>.`];
    sections.push({ title: 'Your weight', lines: wl });
  }

  const count = keys.length;
  return { enough: count >= 3 || encTotal > 0 || sess.length > 0 || jr.length > 0, count, sections };
}

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// --- Export / backup (the user's own data, by their action) -------------
export function exportData() {
  return JSON.stringify({ app: 'garden-moves', type: 'personal-calendar', schema: 1, exported: todayStr(), data: im() }, null, 2);
}
export function importData(text) {
  try {
    const o = JSON.parse(text);
    const d = (o && o.data && typeof o.data === 'object') ? o.data : ((o && o.days) ? o : null);
    if (!d || typeof d !== 'object') return false;
    store.progress.intimacy = {
      enabled: true,
      pinHash: d.pinHash || null,
      partners: Array.isArray(d.partners) ? d.partners : [],
      defaultPartnerId: d.defaultPartnerId || null,
      showCycle: d.showCycle !== false,
      cycleMerged: true,
      days: (d.days && typeof d.days === 'object' && !Array.isArray(d.days)) ? d.days : {},
    };
    _unlocked = true;
    save();
    return true;
  } catch { return false; }
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
const INVITE = 'Optional, for anyone. One private emoji calendar for your body — your cycle (period days) and your intimate life (how often, orgasms, satisfaction, desire including the days you wanted to and did not, partners, and more) in one place, seen together. It stays on this device, never scores or judges, and can be locked with a PIN.';

export function intimacyCardHTML() {
  if (!isEnabled()) {
    return `<p class="hint">${INVITE}</p>
      <button class="btn btn-primary" id="you-intim-enable">Turn on the calendar</button>`;
  }
  if (hasPin() && !isUnlocked()) {
    return `<p class="hint">🔒 This space is locked. Open it to enter your PIN.</p>
      <a class="btn btn-primary" href="#calendar">Open the calendar</a>`;
  }
  const s = statsMonth(new Date().getFullYear(), new Date().getMonth());
  const streak = loggingStreak();
  const cs = cycleStats();
  const cyc = cs && cs.daysSince != null ? ` 🩸 Last period <strong>${cs.daysSince}</strong> day${cs.daysSince === 1 ? '' : 's'} ago.` : '';
  return `
    <p class="hint">This month: <strong>${s.encounters}</strong> time${s.encounters === 1 ? '' : 's'}, <strong>${s.orgasms}</strong> orgasm${s.orgasms === 1 ? '' : 's'}${s.avgSatisfaction != null ? `, satisfaction ${faceFor(s.avgSatisfaction)} ${s.avgSatisfaction}/5` : ''}. Logging streak: <strong>${streak}</strong> day${streak === 1 ? '' : 's'}.${cyc}</p>
    <a class="btn btn-primary" href="#calendar">Open the calendar</a>`;
}
