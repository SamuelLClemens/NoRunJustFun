// Learning-track registry — the single source of truth for every "Mind" subject.
// Adding a subject = drop in a lessons module + a badges module, then register a
// descriptor here. The shared engine (js/learning.js) and the shared hub/completion
// UI (js/learning-screen.js) read everything they need from this registry, so they
// never hard-code a subject.
//
// Finance ("Money Garden") is the first registered track. Its content + badges live
// in their original, audited files (js/data/lessons.js, js/data/badges.finance.js) —
// unchanged — and are simply referenced here, so money behaves and looks identical.
// 'parenting', 'communication' and 'memory' are appended the same way; 'memory' is
// the first track to also carry interactive games (js/data/games.memory.js).

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
import { MEMORY_BADGES } from './badges.memory.js';
import {
  LESSON_LIBRARY as MEMORY_LIBRARY,
  buildLessonById as memoryBuildById,
  buildLessonSession as memoryBuildSession,
  MEMORY_DISCLAIMER,
  MEMORY_DISCLAIMER_SHORT,
} from './lessons.memory.js';
import { MEMORY_GAMES } from './games.memory.js';
import { MEMORY_CONCEPT_GAMES } from './games.memory.concept.js';
import { MONEY_GAMES } from './games.money.js';
import { PARENTING_GAMES } from './games.parenting.js';
import { COMMUNICATION_GAMES } from './games.communication.js';
import { LEARN_EXTRAS } from './learn-extras.js';
// Soul sections (NOT Mind subjects): belief-flagged, lessons-only learning tracks.
// They register in TRACKS so the shared engine + #learn-<track> route serve them,
// but live under SOUL_TRACK_LIST (the Soul pillar), never the Mind TRACK_LIST.
import { CRYSTALS_BADGES } from './badges.crystals.js';
import {
  LESSON_LIBRARY as CRYSTALS_LIBRARY,
  buildLessonById as crystalsBuildById,
  buildLessonSession as crystalsBuildSession,
  CRYSTALS_DISCLAIMER,
  CRYSTALS_DISCLAIMER_SHORT,
} from './lessons.crystals.js';
import { DREAMS_BADGES } from './badges.dreams.js';
import {
  LESSON_LIBRARY as DREAMS_LIBRARY,
  buildLessonById as dreamsBuildById,
  buildLessonSession as dreamsBuildSession,
  DREAMS_DISCLAIMER,
  DREAMS_DISCLAIMER_SHORT,
} from './lessons.dreams.js';

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

// Memory assets — an orchid bloom, a little lightbulb icon, and a lightbulb the coach
// "switches on" (the spark of recall) a beat after arriving.
function memoryBloom(cls = 'veronica') {
  return `<svg class="${cls}" viewBox="-16 -16 32 32" aria-hidden="true" focusable="false">
    <g fill="#B5478B"><ellipse cy="-8" rx="5" ry="8"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(72)"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(144)"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(216)"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(288)"/></g>
    <circle r="4" fill="#FFD45C"/></svg>`;
}
const memoryIcon = `<svg viewBox="0 0 40 40" width="26" height="26" aria-hidden="true"><circle cx="20" cy="20" r="14" fill="#F7E9F2" stroke="#B5478B" stroke-width="2"/><path d="M20 11a7 7 0 0 0-4 12.6c.8.6 1.2 1.3 1.3 2.2h5.4c.1-.9.5-1.6 1.3-2.2A7 7 0 0 0 20 11z" fill="#D77FB6"/><rect x="17.5" y="27" width="5" height="2.6" rx="1.3" fill="#7A2E5E"/></svg>`;
const lightbulbProp = `<div class="lesson-prop" aria-hidden="true"><svg viewBox="0 0 80 64" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#FFD45C" stroke-width="3" stroke-linecap="round"><path d="M40 6V1"/><path d="M19 14l-4-4"/><path d="M61 14l4-4"/></g>
  <path d="M40 10a16 16 0 0 0-9 29c2 1.4 3.1 3.1 3.3 5.2h11.4c.2-2.1 1.3-3.8 3.3-5.2A16 16 0 0 0 40 10z" fill="#FBE9A0" stroke="#B5478B" stroke-width="3" stroke-linejoin="round"/>
  <rect x="33" y="47" width="14" height="6" rx="2" fill="#B5478B"/>
  <path d="M35 53h10" stroke="#7A2E5E" stroke-width="2.5" stroke-linecap="round"/></svg></div>`;

// Crystals (Soul) — an amethyst bloom, a faceted gem icon, and a crystal point the
// coach holds up to the light a beat after arriving.
function crystalBloom(cls = 'veronica') {
  return `<svg class="${cls}" viewBox="-16 -16 32 32" aria-hidden="true" focusable="false">
    <g fill="#8E6FD6"><ellipse cy="-7" rx="5" ry="7.6"/><ellipse cy="-7" rx="5" ry="7.6" transform="rotate(90)"/><ellipse cy="-7" rx="5" ry="7.6" transform="rotate(180)"/><ellipse cy="-7" rx="5" ry="7.6" transform="rotate(270)"/></g>
    <g fill="#B79CE8"><ellipse cy="-6.6" rx="3.8" ry="5.8"/><ellipse cy="-6.6" rx="3.8" ry="5.8" transform="rotate(90)"/><ellipse cy="-6.6" rx="3.8" ry="5.8" transform="rotate(180)"/><ellipse cy="-6.6" rx="3.8" ry="5.8" transform="rotate(270)"/></g>
    <circle r="3.6" fill="#FFD45C"/></svg>`;
}
const crystalIcon = `<svg viewBox="0 0 40 40" width="26" height="26" aria-hidden="true"><path d="M20 7l9 8-9 18-9-18z" fill="#B79CE8" stroke="#7A57C2" stroke-width="2" stroke-linejoin="round"/><path d="M20 7l9 8-9 5-9-5z" fill="#D7C6F2"/></svg>`;
const crystalProp = `<div class="lesson-prop" aria-hidden="true"><svg viewBox="0 0 80 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 6l16 16-16 36-16-36z" fill="#B79CE8" stroke="#7A57C2" stroke-width="3" stroke-linejoin="round"/>
  <path d="M40 6l16 16-16 10-16-10z" fill="#E4DAF6"/>
  <path d="M40 32v26" stroke="#7A57C2" stroke-width="2"/>
  <g stroke="#FFD45C" stroke-width="2.5" stroke-linecap="round"><path d="M58 10l5-4"/><path d="M62 20l6 0"/></g></svg></div>`;

// Dreams (Soul) — an indigo moon-bloom, a crescent-moon icon, and a quiet night sky
// (crescent + stars) the coach gazes up at.
function dreamBloom(cls = 'veronica') {
  return `<svg class="${cls}" viewBox="-16 -16 32 32" aria-hidden="true" focusable="false">
    <g fill="#7A6FD0"><ellipse cy="-8" rx="5" ry="8"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(72)"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(144)"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(216)"/><ellipse cy="-8" rx="5" ry="8" transform="rotate(288)"/></g>
    <circle r="4" fill="#FFE9A8"/></svg>`;
}
const dreamIcon = `<svg viewBox="0 0 40 40" width="26" height="26" aria-hidden="true"><path d="M26 8a13 13 0 1 0 7 23A10 10 0 0 1 26 8z" fill="#8B7FE8" stroke="#4B3FB0" stroke-width="2" stroke-linejoin="round"/><circle cx="14" cy="12" r="1.6" fill="#FFE9A8"/></svg>`;
const dreamProp = `<div class="lesson-prop" aria-hidden="true"><svg viewBox="0 0 80 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M52 8a22 22 0 1 0 12 40A17 17 0 0 1 52 8z" fill="#8B7FE8" stroke="#4B3FB0" stroke-width="3" stroke-linejoin="round"/>
  <g fill="#FFE9A8"><circle cx="20" cy="14" r="2.5"/><circle cx="12" cy="28" r="2"/><circle cx="24" cy="34" r="1.6"/></g></svg></div>`;

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
    countBadges: { first: 'fin-first-lesson', three: 'fin-three', seven: 'fin-seven', streak3: 'fin-streak-3', streak7: 'fin-streak-7' },
    scholarBadge: 'fin-scholar',
    masteryBadge: 'fin-master',
    topicBadges: {
      'fin-budgeter': ['budgeting'],
      'fin-compounder': ['compound-growth'],
      'fin-landlord': ['property-basics'],
      'fin-credit-savvy': ['credit-score-basics'],
    },
    games: [...MONEY_GAMES, LEARN_EXTRAS.money.arcade],
    gameBadges: { firstWin: 'fin-gamer', fiveWins: 'fin-sharp' },
    quiz: LEARN_EXTRAS.money.quiz,
    expertTips: LEARN_EXTRAS.money.expertTips,
    topTakeaways: LEARN_EXTRAS.money.topTakeaways,
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
    countBadges: { first: 'par-first-lesson', three: 'par-three', seven: 'par-seven', streak3: 'par-streak-3', streak7: 'par-streak-7' },
    scholarBadge: 'par-scholar',
    masteryBadge: 'par-master',
    topicBadges: {
      'par-grower': ['child-development'],
      'par-positive': ['positive-discipline'],
      'par-coach': ['emotion-coaching'],
      'par-sleep-guide': ['toddler-sleep'],
    },
    games: [...PARENTING_GAMES, LEARN_EXTRAS.parenting.arcade],
    gameBadges: { firstWin: 'par-gamer', fiveWins: 'par-sharp' },
    quiz: LEARN_EXTRAS.parenting.quiz,
    expertTips: LEARN_EXTRAS.parenting.expertTips,
    topTakeaways: LEARN_EXTRAS.parenting.topTakeaways,
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
    countBadges: { first: 'com-first-lesson', three: 'com-three', seven: 'com-seven', streak3: 'com-streak-3', streak7: 'com-streak-7' },
    scholarBadge: 'com-scholar',
    masteryBadge: 'com-master',
    topicBadges: {
      'com-observer': ['nvc-observations'],
      'com-feeler': ['nvc-feelings'],
      'com-empath': ['nvc-empathy-safety'],
      'com-peacemaker': ['conflict-de-escalation'],
    },
    games: [...COMMUNICATION_GAMES, LEARN_EXTRAS.communication.arcade],
    gameBadges: { firstWin: 'com-gamer', fiveWins: 'com-sharp' },
    quiz: LEARN_EXTRAS.communication.quiz,
    expertTips: LEARN_EXTRAS.communication.expertTips,
    topTakeaways: LEARN_EXTRAS.communication.topTakeaways,
  },

  memory: {
    id: 'memory',
    name: 'Memory training',
    homeLabel: 'Memory',
    blurb: 'How memory works, evidence-based techniques (spacing, retrieval, the memory palace) — plus games to practice.',
    badgePrefix: 'mem-',
    badges: MEMORY_BADGES,
    disclaimer: MEMORY_DISCLAIMER,
    disclaimerShort: MEMORY_DISCLAIMER_SHORT,
    lessons: {
      LESSON_LIBRARY: MEMORY_LIBRARY,
      buildLessonById: memoryBuildById,
      buildLessonSession: memoryBuildSession,
    },
    // the first track with interactive games — practice, not a cure (the lessons say so)
    games: [...MEMORY_GAMES, ...MEMORY_CONCEPT_GAMES, LEARN_EXTRAS.memory.arcade],
    gamesBlurb: 'A quick, playful warm-up — fun practice, not a magic brain boost (the lessons explain the evidence).',
    prop: { className: 'lesson-prop', svg: lightbulbProp, onClass: 'lesson-prop-on', delayMs: 450 },
    coachCue: 'switches on a little lightbulb',
    theme: { token: 'memory', flowerSVG: memoryBloom, lessonIcon: memoryIcon, badgeEmoji: '🧠' },
    doneHeading: 'Memory, strengthened. 🌼',
    countBadges: { first: 'mem-first-lesson', three: 'mem-three', seven: 'mem-seven', streak3: 'mem-streak-3', streak7: 'mem-streak-7' },
    scholarBadge: 'mem-scholar',
    masteryBadge: 'mem-master',
    topicBadges: {
      'mem-foundations': ['how-memory-works'],
      'mem-retrieval': ['retrieval-practice'],
      'mem-palace': ['memory-techniques'],
      'mem-mnemonist': ['the-major-system'],
    },
    // game-win badges, driven by this track's gamesWon counter (see js/learning.js)
    gameBadges: { firstWin: 'mem-gamer', fiveWins: 'mem-sharp' },
    quiz: LEARN_EXTRAS.memory.quiz,
    expertTips: LEARN_EXTRAS.memory.expertTips,
    topTakeaways: LEARN_EXTRAS.memory.topTakeaways,
  },

  // ---- Soul sections (belief-flagged, lessons-only) ----
  // Registered here so the shared engine + #learn-<track> route serve them, but they
  // live under the Soul pillar (SOUL_TRACK_LIST), NOT the Mind TRACK_LIST. No games,
  // no quiz, no mastery badge (which requires a game win) — these are reflective
  // reading sections. hubBack sends the hub's "Back" link to #soul, not #mind.
  crystals: {
    id: 'crystals',
    name: 'Crystal energy',
    homeLabel: 'Crystals',
    blurb: 'A respectful, honest look at crystals: the minerals, the traditions, and what the evidence shows.',
    hubBack: '#soul',
    badgePrefix: 'cry-',
    badges: CRYSTALS_BADGES,
    disclaimer: CRYSTALS_DISCLAIMER,
    disclaimerShort: CRYSTALS_DISCLAIMER_SHORT,
    lessons: {
      LESSON_LIBRARY: CRYSTALS_LIBRARY,
      buildLessonById: crystalsBuildById,
      buildLessonSession: crystalsBuildSession,
    },
    prop: { className: 'lesson-prop', svg: crystalProp, onClass: 'lesson-prop-on', delayMs: 450 },
    coachCue: 'holds a crystal up to the light',
    theme: { token: 'crystals', flowerSVG: crystalBloom, lessonIcon: crystalIcon, badgeEmoji: '🔮' },
    doneHeading: 'A calm, clear-eyed pause. 🔮',
    countBadges: { first: 'cry-first-lesson', three: 'cry-three', seven: 'cry-seven', streak3: 'cry-streak-3', streak7: 'cry-streak-7' },
    scholarBadge: 'cry-scholar',
    topicBadges: {
      'cry-geologist': ['what-crystals-really-are'],
      'cry-historian': ['history-of-crystal-lore'],
      'cry-skeptic': ['what-science-says-crystals'],
      'cry-grounded': ['crystals-as-a-mindfulness-anchor'],
    },
  },

  dreams: {
    id: 'dreams',
    name: 'Dream interpretation',
    homeLabel: 'Dreams',
    blurb: 'The science of sleep and dreaming alongside the history of dream interpretation — honestly framed.',
    hubBack: '#soul',
    badgePrefix: 'drm-',
    badges: DREAMS_BADGES,
    disclaimer: DREAMS_DISCLAIMER,
    disclaimerShort: DREAMS_DISCLAIMER_SHORT,
    lessons: {
      LESSON_LIBRARY: DREAMS_LIBRARY,
      buildLessonById: dreamsBuildById,
      buildLessonSession: dreamsBuildSession,
    },
    prop: { className: 'lesson-prop', svg: dreamProp, onClass: 'lesson-prop-on', delayMs: 450 },
    coachCue: 'gazes up at a quiet night sky',
    theme: { token: 'dreams', flowerSVG: dreamBloom, lessonIcon: dreamIcon, badgeEmoji: '🌙' },
    doneHeading: 'Rest well — and dream curiously. 🌙',
    countBadges: { first: 'drm-first-lesson', three: 'drm-three', seven: 'drm-seven', streak3: 'drm-streak-3', streak7: 'drm-streak-7' },
    scholarBadge: 'drm-scholar',
    topicBadges: {
      'drm-scientist': ['the-science-of-sleep-and-dreams'],
      'drm-theorist': ['why-we-dream-theories'],
      'drm-skeptic': ['what-science-says-about-meaning'],
      'drm-journaler': ['dream-journaling-for-reflection'],
    },
  },
};

// Ordered for display (Mind hub, "You" dashboard, badges screen). All four Mind
// subjects are live. crystals/dreams are deliberately NOT here — they are Soul
// sections, surfaced by soulScreen via SOUL_TRACK_LIST, so they never appear under
// Mind or in the Mind-scoped progress views.
export const TRACK_LIST = ['money', 'parenting', 'communication', 'memory'];
// Soul pillar reflective sections (belief-flagged). Registered tracks, but a separate
// list so they stay out of Mind.
export const SOUL_TRACK_LIST = ['crystals', 'dreams'];
export const DEFAULT_TRACK = 'money';

export function getTrack(id) { return TRACKS[id] || null; }

// Every registered track's badges, flattened — for the completion screen's badge
// lookup and the badges-screen partitions. Includes the Soul sections so their
// badges resolve and display alongside the Mind tracks.
export function allTrackBadges() {
  return [...TRACK_LIST, ...SOUL_TRACK_LIST].flatMap((id) => (TRACKS[id] ? TRACKS[id].badges : []));
}
