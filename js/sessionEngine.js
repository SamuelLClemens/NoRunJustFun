// Assembles a session from the tagged library, shaped like a home yoga
// practice: a seated breath arrival, ~20% gentle warm-up, ~60% main block
// alternating strength/mobility/stretch, ~20% wind-down, and a breathing +
// kind-thoughts close. Arrive, move, settle, close. Every time.
//
// TIER-AWARE: the SAME engine varies pool (tierEligibility), density (strength
// fraction of the main block), hold length, rest and repeats per tier — it never
// swaps to a different builder. Super Sweaty raises density/holds, never impact.

import { TIER_PROFILES } from './data/tiers.js';

const TRANSITION_SECS = 6; // "get ready" gap between moves

// Seated breath moves that can open a practice (the close stays unique).
const ARRIVAL_IDS = ['box-breath', 'pelvic-breath'];

// Keep timed holds inside the schema envelope when a tier scales them.
function clampSecs(s) { return Math.max(40, Math.min(90, Math.round(s))); }

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fillFromPool(pool, budget, used, allowRepeats = false, exclude = new Set()) {
  const out = [];
  let remaining = budget;
  let candidates = shuffle(pool.filter((e) => !used.has(e.id) && !exclude.has(e.id)));
  while (remaining > 20) {
    if (!candidates.length) {
      if (!allowRepeats) break;
      const lastId = out.length ? out[out.length - 1].id : '';
      candidates = shuffle(pool.filter((e) => e.id !== lastId && !exclude.has(e.id)));
      if (!candidates.length) break;
    }
    const ex = candidates.shift();
    out.push(ex);
    used.add(ex.id);
    remaining -= ex.secs + TRANSITION_SECS;
  }
  return out;
}

// Alternate strength with mobility/stretch so the main block has rhythm.
function alternate(strength, soft) {
  const out = [];
  const s = strength.slice();
  const m = soft.slice();
  let turn = 'strength';
  while (s.length || m.length) {
    if (turn === 'strength' && s.length) out.push(s.shift());
    else if (m.length) out.push(m.shift());
    else if (s.length) out.push(s.shift());
    turn = turn === 'strength' ? 'soft' : 'strength';
  }
  return out;
}

// Is a movement allowed at this tier? Breath/close moves are always allowed;
// otherwise check the tierEligibility map (absent => all tiers, preserving v1).
function tierAllows(e, tier, elig) {
  if (e.blocks.includes('close') || (e.tags && e.tags.includes('breath'))) return true;
  if (!tier || tier === 'stretch' || tier === 'yoga') return true; // these gate by category, not intensity
  if (!elig) return true;
  const te = elig[e.id];
  if (!te || !te.length) return true;
  return te.includes(tier);
}

// Which categories a workout path may draw from. Breath/close bookends always pass.
// Exercises borrows stretch moves for its warm-up and cool-down.
const CATEGORY_POOLS = {
  stretch: ['stretch'],
  yoga: ['yoga'],
  exercise: ['exercise', 'stretch'],
};
function categoryAllows(e, category, catMap) {
  if (!category) return true; // legacy / unscoped
  if (e.blocks.includes('close') || (e.tags && e.tags.includes('breath'))) return true;
  const allowed = CATEGORY_POOLS[category];
  if (!allowed) return true;
  const c = (catMap && catMap[e.id]) || 'exercise';
  return allowed.includes(c);
}

export function buildSession(durationMins, exercises, opts = {}) {
  const { lastCloseId = '', tier = 'slightly_sweaty', tierEligibility = {}, category = null, workoutCategory = {} } = opts;
  const prof = TIER_PROFILES[tier] || TIER_PROFILES.slightly_sweaty;
  const total = durationMins * 60;
  const restSecs = TRANSITION_SECS + (prof.restAdd || 0);
  const used = new Set();

  // Restrict the working pool to this tier AND workout category (Stretching / Yoga /
  // Exercises). Breath/close bookends always survive both filters.
  const pool = exercises.filter((e) => tierAllows(e, tier, tierEligibility) && categoryAllows(e, category, workoutCategory));

  // 1) the close — always last, always breath (picked first so the
  //    arrival never duplicates it)
  const closePool = pool.filter((e) => e.blocks.includes('close'));
  let closeChoices = closePool.filter((e) => e.id !== lastCloseId);
  if (!closeChoices.length) closeChoices = closePool;
  const close = shuffle(closeChoices)[0];
  used.add(close.id);
  const reserved = new Set([close.id]); // the close may never appear mid-session

  // 2) the arrival — every practice begins seated, with breath. Postpartum
  //    prefers pelvic-breath (no holds); fall back to any arrival breath.
  const arrivalPool = pool.filter((e) => ARRIVAL_IDS.includes(e.id) && e.id !== close.id);
  const arrival = (arrivalPool.find((e) => e.id === 'pelvic-breath') || shuffle(arrivalPool)[0]);
  used.add(arrival.id);
  reserved.add(arrival.id);

  const warmBudget = Math.max(total * 0.2 - (arrival.secs + restSecs), 0);
  const windBudget = Math.max(total * 0.2 - (close.secs + restSecs), 0);
  const mainBudget = total * 0.6;
  const strengthShare = prof.strengthDensity != null ? prof.strengthDensity : 0.55;

  // long/dense sessions may revisit moves once a pool runs dry (per tier)
  const allowRepeats = durationMins >= (prof.repeatsFromMins || 30);

  // 3) warm-up
  const warm = fillFromPool(
    pool.filter((e) => e.blocks.includes('warmup')),
    warmBudget, used, allowRepeats, reserved,
  );

  // 4) main block, alternating strength with mobility/stretch/cardio.
  //    deep-core anti-doming work (bird-dog*) is front-loaded so it is trained
  //    while motor control is fresh, before cardio fatigue accumulates.
  const mainPool = pool.filter((e) => e.blocks.includes('main'));
  const strengthPool = mainPool.filter((e) => e.tags.includes('strength'));
  const softPool = mainPool.filter((e) => !e.tags.includes('strength'));
  const pickedStrength = frontLoadCore(fillFromPool(strengthPool, mainBudget * strengthShare, used, allowRepeats, reserved));
  const pickedSoft = fillFromPool(softPool, mainBudget * (1 - strengthShare), used, allowRepeats, reserved);
  const main = alternate(pickedStrength, pickedSoft);

  // 5) wind-down (longer/down-regulating tiers buy time through rest, not grind)
  const wind = fillFromPool(
    pool.filter((e) => e.blocks.includes('winddown')),
    windBudget, used, allowRepeats, reserved,
  );

  // Tier scales held timing within the 40-90s schema envelope.
  const scale = (block, ex) => {
    const isHold = block !== 'arrive' && block !== 'close' && !(ex.tags && ex.tags.includes('breath'));
    const secs = isHold ? clampSecs(ex.secs * (prof.holdMult || 1)) : ex.secs;
    return { ex, secs, block, tier };
  };
  const items = [
    scale('arrive', arrival),
    ...warm.map((e) => scale('warmup', e)),
    ...main.map((e) => scale('main', e)),
    ...wind.map((e) => scale('winddown', e)),
    scale('close', close),
  ];

  const totalSecs = items.reduce((s, i) => s + i.secs + restSecs, 0);
  return { items, totalSecs, durationKey: durationMins, closeId: close.id, tier, restSecs };
}

// Pull the diastasis-safe deep-core driver (bird-dog / bird-dog-knee-hover) to
// the front of the strength list so it lands before cardio fatigue.
function frontLoadCore(list) {
  const core = list.filter((e) => e.id === 'bird-dog' || e.id === 'bird-dog-knee-hover');
  const rest = list.filter((e) => e.id !== 'bird-dog' && e.id !== 'bird-dog-knee-hover');
  return [...core, ...rest];
}

export { TRANSITION_SECS };
export { DURATIONS } from './data/tiers.js';
