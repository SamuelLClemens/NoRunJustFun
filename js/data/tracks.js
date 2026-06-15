// Learning-track registry — the single source of truth for every "Mind" subject.
// Adding a subject = drop in a lessons module + a badges module, then register a
// descriptor here. The shared engine (js/learning.js) and the shared hub/completion
// UI (js/learning-screen.js) read everything they need from this registry, so they
// never hard-code a subject.
//
// Finance ("Money Garden") is the first registered track. Its content + badges live
// in their original, audited files (js/data/lessons.js, js/data/badges.finance.js) —
// unchanged — and are simply referenced here, so money behaves and looks identical.
// Slices 3-4 append 'parenting' and 'communication' the same way.

import { FINANCE_BADGES } from './badges.finance.js';
import {
  LESSON_LIBRARY as MONEY_LIBRARY,
  buildLessonById as moneyBuildById,
  buildLessonSession as moneyBuildSession,
  FINANCE_DISCLAIMER,
  FINANCE_DISCLAIMER_SHORT,
} from './lessons.js';

// ---- per-track SVG assets (kept byte-identical to the shipped finance visuals) ----

// The veronica — the brand flower, decorative (the heading text carries the name).
function veronicaSVG(cls = 'veronica') {
  return `<svg class="${cls}" viewBox="-16 -16 32 32" aria-hidden="true" focusable="false">
    <g fill="#5B6BD0"><ellipse cy="-7" rx="5" ry="7.6"/><ellipse cy="-7" rx="5" ry="7.6" transform="rotate(90)"/><ellipse cy="-7" rx="5" ry="7.6" transform="rotate(180)"/><ellipse cy="-7" rx="5" ry="7.6" transform="rotate(270)"/></g>
    <g fill="#7B8FE8"><ellipse cy="-6.6" rx="3.8" ry="5.8"/><ellipse cy="-6.6" rx="3.8" ry="5.8" transform="rotate(90)"/><ellipse cy="-6.6" rx="3.8" ry="5.8" transform="rotate(180)"/><ellipse cy="-6.6" rx="3.8" ry="5.8" transform="rotate(270)"/></g>
    <circle r="3.8" fill="#FFD45C"/></svg>`;
}

const moneyCoin = `<svg viewBox="0 0 40 40" width="26" height="26" aria-hidden="true"><path d="M20 14 q-7 -7 -12 -3 q4 8 12 6 z" fill="#5BA869"/><circle cx="20" cy="25" r="12" fill="#FFD45C" stroke="#F4A300" stroke-width="2"/><text x="20" y="30" text-anchor="middle" font-family="Fredoka, system-ui" font-weight="700" font-size="14" fill="#9A6500">$</text></svg>`;

// The coach "puts on reading glasses" to mark the shift into a finance lesson — a 2D
// overlay injected onto the .stage by main.js's startLessonFor (criterion 3).
const glassesProp = `<div class="fin-glasses" aria-hidden="true"><svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
  <g fill="rgba(123,143,232,0.20)" stroke="#2E3A8C" stroke-width="6" stroke-linecap="round">
    <rect x="10" y="20" width="74" height="48" rx="22"/>
    <rect x="116" y="20" width="74" height="48" rx="22"/>
    <path d="M84 36 q16 -9 32 0" fill="none"/>
    <path d="M10 30 L1 21" fill="none"/>
    <path d="M190 30 L199 21" fill="none"/>
  </g></svg></div>`;

// ---- the registry ---------------------------------------------------------

export const TRACKS = {
  money: {
    id: 'money',
    name: 'Money Garden',
    homeLabel: 'Money',
    blurb: 'Budgeting, compound growth, risk, retirement and property — plain, judgement-free, and sourced.',
    badgePrefix: 'fin-',
    badges: FINANCE_BADGES,
    disclaimer: FINANCE_DISCLAIMER,
    disclaimerShort: FINANCE_DISCLAIMER_SHORT,
    // the lessons module: catalog + the two player-compatible plan builders
    lessons: {
      LESSON_LIBRARY: MONEY_LIBRARY,
      buildLessonById: moneyBuildById,
      buildLessonSession: moneyBuildSession,
    },
    // instructor cue — the prop the coach "puts on" a beat after arriving
    prop: { className: 'fin-glasses', svg: glassesProp, onClass: 'glasses-on', delayMs: 450 },
    coachCue: 'puts on their reading glasses',
    // visual identity (money reuses the shipped --finance-* token family)
    theme: { token: 'finance', flowerSVG: veronicaSVG, lessonIcon: moneyCoin, badgeEmoji: '🌸' },
    doneHeading: 'Money smarts: planted. 🌼',
    // badge award rules as DATA (generalized from the old checkFinanceBadges JS).
    // countBadges fire on lessons-completed thresholds + a per-track streak;
    // topicBadges fire when every listed lesson id has been completed.
    countBadges: { first: 'fin-first-lesson', three: 'fin-three', seven: 'fin-seven', streak3: 'fin-streak-3' },
    topicBadges: {
      'fin-budgeter': ['budgeting'],
      'fin-compounder': ['compound-growth'],
      'fin-landlord': ['property-basics'],
    },
  },
};

// Ordered for display (hub list, badges screen). Slices 3-4 append the new subjects.
export const TRACK_LIST = ['money'];
export const DEFAULT_TRACK = 'money';

export function getTrack(id) { return TRACKS[id] || null; }

// Every registered track's badges, flattened — for the completion screen's badge
// lookup and the badges-screen partitions.
export function allTrackBadges() {
  return TRACK_LIST.flatMap((id) => (TRACKS[id] ? TRACKS[id].badges : []));
}
