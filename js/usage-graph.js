// Read-only usage / engagement visuals for the You page. Everything here is derived
// at RENDER TIME from the existing on-device ledgers — it writes nothing back, and it
// never feeds the garden, streak, levels, or badges (those key off sessions[] only;
// see js/gamify.js). This is gentle reflection, NOT a scoreboard or a second streak.
//
// "Engagement" = the union of the day's ledgers: workouts/meditations/lessons
// (progress.sessions[]), journal entries (progress.journal[]), and meal notes
// (progress.meals[]). Cycle logging is deliberately excluded — it is private health
// data, not an "activity" to be counted. journal/meals are empty until those features
// ship; this reads them generically so they contribute automatically when they land.
//
// Accessibility: a single-hue lightness ramp (distinguishable under any colour vision),
// a per-cell <title> for screen readers, an aria-label summary, and a legend. The SVG
// is static (no animation), so it is reduced-motion-safe by construction.

import { todayKey } from './state.js';

// Map of 'YYYY-MM-DD' -> activity count, summed across the engagement ledgers.
function dayCounts(progress) {
  const m = new Map();
  const bump = (d) => { if (typeof d === 'string' && d) m.set(d, (m.get(d) || 0) + 1); };
  (progress.sessions || []).forEach((s) => bump(s && s.date));
  // journal/meals carry an ISO datetime in `ts`; take the date portion.
  (progress.journal || []).forEach((j) => bump(j && typeof j.ts === 'string' ? j.ts.slice(0, 10) : ''));
  (progress.meals || []).forEach((x) => bump(x && typeof x.ts === 'string' ? x.ts.slice(0, 10) : ''));
  return m;
}

function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
// Monday-of-week for a given date (weeks run Mon..Sun in the grid).
function mondayOf(d) { const x = startOfDay(d); const wd = (x.getDay() + 6) % 7; return addDays(x, -wd); }

function level(count) {
  if (!count) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4;
}

// Calendar heatmap of the last `weeks` weeks (columns = weeks, rows = Mon..Sun).
function heatmapSVG(counts, weeks) {
  const today = startOfDay(new Date());
  const thisMon = mondayOf(today);
  const firstMon = addDays(thisMon, -(weeks - 1) * 7);
  const cell = 13, gap = 3, pad = 2;
  const W = pad * 2 + weeks * (cell + gap) - gap;
  const H = pad * 2 + 7 * (cell + gap) - gap;
  let rects = '';
  let active = 0;
  for (let w = 0; w < weeks; w++) {
    for (let dRow = 0; dRow < 7; dRow++) {
      const date = addDays(firstMon, w * 7 + dRow);
      if (date > today) continue;            // do not draw future days
      const key = todayKey(date);
      const c = counts.get(key) || 0;
      if (c > 0) active++;
      const x = pad + w * (cell + gap);
      const y = pad + dRow * (cell + gap);
      const label = c === 0 ? `${key}: no activity` : `${key}: ${c} ${c === 1 ? 'activity' : 'activities'}`;
      rects += `<rect class="uh-cell uh-${level(c)}" x="${x}" y="${y}" width="${cell}" height="${cell}" rx="3"><title>${label}</title></rect>`;
    }
  }
  return { svg: `<svg class="usage-heatmap" viewBox="0 0 ${W} ${H}" role="img" aria-label="Days you showed up over the last ${weeks} weeks: ${active} active days. Each square is a day; deeper green means more that day.">${rects}</svg>`, active };
}

// Weekly activity totals (how much, over time) as simple bars — height encodes the
// value, so it reads without relying on colour.
function weeklyBarsSVG(counts, weeks) {
  const today = startOfDay(new Date());
  const thisMon = mondayOf(today);
  const totals = [];
  for (let w = weeks - 1; w >= 0; w--) {
    const mon = addDays(thisMon, -w * 7);
    let sum = 0;
    for (let i = 0; i < 7; i++) sum += counts.get(todayKey(addDays(mon, i))) || 0;
    totals.push({ mon: todayKey(mon), sum });
  }
  const max = Math.max(1, ...totals.map((t) => t.sum));
  const bw = 14, gap = 6, pad = 4, H = 56, base = H - pad;
  const W = pad * 2 + totals.length * (bw + gap) - gap;
  let bars = '';
  totals.forEach((t, i) => {
    const h = t.sum ? Math.max(3, Math.round((base - pad) * (t.sum / max))) : 0;
    const x = pad + i * (bw + gap);
    const y = base - h;
    bars += `<rect class="usage-bar" x="${x}" y="${y}" width="${bw}" height="${h}" rx="3"><title>Week of ${t.mon}: ${t.sum} ${t.sum === 1 ? 'activity' : 'activities'}</title></rect>`;
  });
  return `<svg class="usage-bars" viewBox="0 0 ${W} ${H}" role="img" aria-label="Activities per week over the last ${weeks} weeks."><line x1="${pad}" y1="${base + 0.5}" x2="${W - pad}" y2="${base + 0.5}" class="usage-bars-base"/>${bars}</svg>`;
}

function activeDaysWithin(counts, days) {
  const today = startOfDay(new Date());
  let n = 0;
  for (let i = 0; i < days; i++) if ((counts.get(todayKey(addDays(today, -i))) || 0) > 0) n++;
  return n;
}

// The full "Your rhythm" card body (heatmap + weekly bars + a gentle summary line).
// Returns '' worth of content only when there is genuinely nothing yet.
export function usageGraphsHTML(progress) {
  const counts = dayCounts(progress);
  const totalActivity = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  if (totalActivity === 0) {
    return '<p class="hint">Once you start showing up — a workout, a lesson, a moment of calm — your days will bloom in here.</p>';
  }
  const weeks = 16;
  const hm = heatmapSVG(counts, weeks);
  const last30 = activeDaysWithin(counts, 30);
  return `
    <p class="hint">A quiet picture of when you show up — for you, not a score to chase. <strong>${last30}</strong> active day${last30 === 1 ? '' : 's'} in the last 30.</p>
    <div class="usage-heatmap-wrap">${hm.svg}</div>
    <div class="usage-legend" aria-hidden="true">
      <span>less</span>
      <span class="uh-cell uh-0"></span><span class="uh-cell uh-1"></span><span class="uh-cell uh-2"></span><span class="uh-cell uh-3"></span><span class="uh-cell uh-4"></span>
      <span>more</span>
    </div>
    <p class="usage-sub">By week</p>
    <div class="usage-bars-wrap">${weeklyBarsSVG(counts, 12)}</div>`;
}
