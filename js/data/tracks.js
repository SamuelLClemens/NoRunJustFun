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
import { PARENTING_BADGES } from './badges.parenting.js';
import {
  LESSON_LIBRARY as PARENTING_LIBRARY,
  buildLessonById as parentingBuildById,
  buildLessonSession as parentingBuildSession,
  PARENTING_DISCLAIMER,
  PARENTING_DISCLAIMER_SHORT,
} from './lessons.parenting.js';
import { COMMUNICATION_BADGES } from './badges.communication.js';
import {
  LESSON_LIBRARY as COMMUNICATION_LIBRARY,
  buildLessonById as communicationBuildById,
  buildLessonSession as communicationBuildSession,
  COMMUNICATION_DISCLAIMER,
  COMMUNICATION_DISCLAIMER_SHORT,
} from './lessons.communication.js';

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

// Parenting assets — a warm coral bloom + heart, and a storybook the coach opens.
function parentingBloom(cls = 'veronica') {
  return `<svg class="${cls}" viewBox="-16 -16 32 32" aria-hidden="true" focusable="false">
    <g fill="#E07856"><ellipse cy="-8" rx="5" ry="8"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(72)"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(144)"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(216)"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(288)"/></g>
    <circle r="4" fill="#FFD45C"/></svg>`;
}
const parentingIcon = `<svg viewBox="0 0 40 40" width="26" height="26" aria-hidden="true"><circle cx="20" cy="20" r="14" fill="#FBEEE8" stroke="#E07856" stroke-width="2"/><path d="M20 28c-6-4-9-7.5-6-11 2-2.3 5.4-1.3 6 1.4 .6-2.7 4-3.7 6-1.4 3 3.5 0 7-6 11z" fill="#F08A66"/></svg>`;
const storybookProp = `<div class="lesson-prop" aria-hidden="true"><svg viewBox="0 0 80 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 14C30 8 16 8 8 12v40c8-4 22-4 32 2 10-6 24-6 32-2V12c-8-4-22-4-32 2z" fill="#FBEEE8" stroke="#E07856" stroke-width="3" stroke-linejoin="round"/>
  <path d="M40 14v42" stroke="#E07856" stroke-width="3"/>
  <path d="M14 24h18M14 32h18M48 24h18M48 32h18" stroke="#F0A98E" stroke-width="2.5" stroke-linecap="round"/></svg></div>`;

// Communication assets — a calm teal speech bubble, and a pair of bubbles that rise in.
function commBubble(cls = 'veronica') {
  return `<svg class="${cls}" viewBox="-16 -16 32 32" aria-hidden="true" focusable="false">
    <path d="M-12 -11h24a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H2l-7 6v-6h-7a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3z" fill="#2F9E8F"/>
    <circle cx="-6" cy="-2" r="2" fill="#fff"/><circle cx="0" cy="-2" r="2" fill="#fff"/><circle cx="6" cy="-2" r="2" fill="#fff"/></svg>`;
}
const commIcon = `<svg viewBox="0 0 40 40" width="26" height="26" aria-hidden="true"><path d="M8 9h24a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H18l-7 6v-6H8a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3z" fill="#54C2B2"/><circle cx="14" cy="18" r="2" fill="#fff"/><circle cx="20" cy="18" r="2" fill="#fff"/><circle cx="26" cy="18" r="2" fill="#fff"/></svg>`;
const bubblesProp = `<div class="lesson-prop" aria-hidden="true"><svg viewBox="0 0 80 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 8h40a6 6 0 0 1 6 6v15a6 6 0 0 1-6 6H26l-10 8v-8h-6a6 6 0 0 1-6-6V14a6 6 0 0 1 6-6z" fill="#54C2B2" stroke="#2F9E8F" stroke-width="3" stroke-linejoin="round"/>
  <path d="M44 30h26a6 6 0 0 1 6 6v9a6 6 0 0 1-6 6v7l-9-7H52a6 6 0 0 1-6-6" fill="#E4F4F1" stroke="#2F9E8F" stroke-width="3" stroke-linejoin="round"/></svg></div>`;

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

  parenting: {
    id: 'parenting',
    name: 'Parenting path',
    homeLabel: 'Parenting',
    blurb: 'Child development, positive discipline, emotion coaching and connection — warm, plain, and sourced.',
    badgePrefix: 'par-',
    badges: PARENTING_BADGES,
    disclaimer: PARENTING_DISCLAIMER,
    disclaimerShort: PARENTING_DISCLAIMER_SHORT,
    lessons: {
      LESSON_LIBRARY: PARENTING_LIBRARY,
      buildLessonById: parentingBuildById,
      buildLessonSession: parentingBuildSession,
    },
    prop: { className: 'lesson-prop', svg: storybookProp, onClass: 'lesson-prop-on', delayMs: 450 },
    coachCue: 'opens a storybook',
    theme: { token: 'parenting', flowerSVG: parentingBloom, lessonIcon: parentingIcon, badgeEmoji: '🧡' },
    doneHeading: 'Parenting wisdom: planted. 🌼',
    countBadges: { first: 'par-first-lesson', three: 'par-three', seven: 'par-seven', streak3: 'par-streak-3' },
    topicBadges: {
      'par-grower': ['child-development'],
      'par-positive': ['positive-discipline'],
      'par-coach': ['emotion-coaching'],
    },
  },

  communication: {
    id: 'communication',
    name: 'Communication path',
    homeLabel: 'Communication',
    blurb: 'Nonviolent Communication — observations, feelings, needs, requests, empathy. Educational, not therapy.',
    badgePrefix: 'com-',
    badges: COMMUNICATION_BADGES,
    disclaimer: COMMUNICATION_DISCLAIMER,
    disclaimerShort: COMMUNICATION_DISCLAIMER_SHORT,
    lessons: {
      LESSON_LIBRARY: COMMUNICATION_LIBRARY,
      buildLessonById: communicationBuildById,
      buildLessonSession: communicationBuildSession,
    },
    prop: { className: 'lesson-prop', svg: bubblesProp, onClass: 'lesson-prop-on', delayMs: 450 },
    coachCue: 'leans in to really listen',
    theme: { token: 'communication', flowerSVG: commBubble, lessonIcon: commIcon, badgeEmoji: '💬' },
    doneHeading: 'Connection: practiced. 🌿',
    countBadges: { first: 'com-first-lesson', three: 'com-three', seven: 'com-seven', streak3: 'com-streak-3' },
    topicBadges: {
      'com-observer': ['nvc-observations'],
      'com-feeler': ['nvc-feelings'],
      'com-empath': ['nvc-empathy-safety'],
    },
  },
};

// Ordered for display (hub list, badges screen). All three Mind subjects are live.
export const TRACK_LIST = ['money', 'parenting', 'communication'];
export const DEFAULT_TRACK = 'money';

export function getTrack(id) { return TRACKS[id] || null; }

// Every registered track's badges, flattened — for the completion screen's badge
// lookup and the badges-screen partitions.
export function allTrackBadges() {
  return TRACK_LIST.flatMap((id) => (TRACKS[id] ? TRACKS[id].badges : []));
}
