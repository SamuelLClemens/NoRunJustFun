// Client-side personalization engine. Transparent rules ONLY — no model, no
// scoring heuristic, no clinical inference at runtime. It maps the user's own
// literal answers to FILTER (remove contraindicated ids), ROUTE (pick a track),
// and SCREENING gates (which tiers are available + the consult-a-clinician copy).
// Everything runs on-device; nothing is transmitted. See you-got-this-design/
// personalization.json for the full authored rule tables and evidence basis.
//
// Decision-rights note: the clinical leads hold veto over these gates. Defaults
// are conservative — an unknown body never auto-unlocks the vigorous tier, and a
// skipped cardiac question does not silently unlock Super Sweaty.

import { SPACE_FLAGS } from './movements-ext.js';
import { EXTRA_SPACE_FLAGS } from './movements-ext2.js';

// Chair/floor accessibility flags for every move (original + the new batch).
const ALL_SPACE_FLAGS = { ...SPACE_FLAGS, ...EXTRA_SPACE_FLAGS };

// ---- Intake field option lists (drive the optional, editable intake UI) ----
export const SEX_OPTIONS = ['female', 'male', 'intersex', 'prefer_not'];
export const GENDER_OPTIONS = ['woman', 'man', 'non_binary', 'prefer_to_self_describe'];
export const AGE_BANDS = ['u18', '18_29', '30_39', '40_49', '50_64', '65_plus'];
export const LIFE_STAGES = [
  { id: 'none', label: 'Not pregnant or postpartum' },
  { id: 'pregnant', label: 'Pregnant' },
  { id: 'pp_early', label: '0–6 weeks postpartum' },
  { id: 'pp_recovery', label: '6–12 weeks postpartum' },
  { id: 'pp_strengthening', label: '12 weeks–12 months postpartum' },
  { id: 'pp_late', label: 'Over a year postpartum' },
];
export const CONDITION_FLAGS = ['hypertension', 'cardiac', 'diabetes', 'pregnancy_hbp_preeclampsia', 'prolapse', 'dr_diastasis', 'hypermobility_eds', 'osteoporosis', 'pregnant_high_risk', 'recent_surgery'];
export const INJURY_FLAGS = ['low_back', 'neck', 'shoulder', 'wrist', 'hip', 'knee', 'ankle', 'pelvic_floor', 'sciatica', 'pelvic_girdle_pain'];
export const SPACE_OPTIONS = ['mat', 'standing_only', 'chair', 'bed'];

// ---- PAR-Q+-derived readiness screen (general + postpartum). yes/no/skip ----
export const PARQ_GENERAL = [
  { key: 'heartCondition', label: 'Has a doctor ever said you have a heart condition and should only do activity recommended by a doctor?' },
  { key: 'chestPainActivity', label: 'Do you feel pain in your chest when you do physical activity?' },
  { key: 'chestPainRest', label: 'In the past month, have you had chest pain when you were not doing physical activity?' },
  { key: 'dizzinessBalanceLoss', label: 'Do you lose balance from dizziness, or ever lose consciousness?' },
  { key: 'boneJointProblem', label: 'Do you have a bone or joint problem that could be made worse by activity?' },
  { key: 'bpOrMetabolicMeds', label: 'Are you on medication for blood pressure or a heart/metabolic condition?' },
  { key: 'otherReasonNotToMove', label: 'Do you know of any other reason you should not do physical activity?' },
];
export const PARQ_POSTPARTUM = [
  { key: 'pp_bleeding', label: 'Are you currently bleeding heavily or passing clots (beyond normal lochia)?' },
  { key: 'pp_leakingPainPressure', label: 'Do you leak urine, or feel heaviness, bulging, or pressure "down below" with effort?' },
  { key: 'pp_dr_doming', label: 'When you sit up or strain, does the middle of your belly dome or cone outward?' },
  { key: 'pp_csectionPain', label: 'If you had a C-section, do you still have pain at the incision with movement?' },
];

const CARDIAC_KEYS = ['heartCondition', 'chestPainActivity', 'chestPainRest', 'dizzinessBalanceLoss', 'otherReasonNotToMove'];

// ---- FILTER: ids removed per space / per injury (from the authored filter table) ----
const SPACE_FILTER = {
  chair: ['bridge', 'bird-dog', 'kickbacks', 'baby-cobra', 'down-dog', 'low-lunge', 'figure-four', 'happy-baby', 'legs-up', 'thread-needle', 'childs-pose', 'clamshell', 'cat-cow'],
  bed: ['down-dog', 'chair-pose', 'warrior2', 'squats', 'goddess', 'tree-pose', 'low-lunge', 'forward-fold'],
  standing_only: ['bridge', 'bird-dog', 'kickbacks', 'baby-cobra', 'clamshell', 'figure-four', 'happy-baby', 'legs-up', 'thread-needle', 'childs-pose', 'cat-cow', 'seated-twist', 'butterfly'],
};
const INJURY_FILTER = {
  wrist: ['down-dog', 'baby-cobra', 'thread-needle', 'bird-dog', 'kickbacks', 'cat-cow'],
  knee: ['low-lunge', 'tree-pose', 'kickbacks'],
  shoulder: ['down-dog', 'thread-needle', 'arm-sweeps'],
  neck: ['neck-rolls', 'thread-needle'],
  low_back: ['forward-fold', 'seated-twist', 'baby-cobra'],
  sciatica: ['forward-fold', 'seated-twist', 'baby-cobra'],
  hip: ['goddess', 'warrior2', 'happy-baby', 'butterfly', 'figure-four'],
  pelvic_girdle_pain: ['goddess', 'warrior2', 'happy-baby', 'butterfly', 'figure-four'],
  ankle: ['tree-pose'],
  osteoporosis: ['forward-fold', 'seated-twist'],
};

const ALL_TIERS = ['no_sweat', 'slightly_sweaty', 'super_sweaty', 'meditation'];

function yes(v) { return v === true || v === 'yes'; }

// ---- ROUTE: profile -> track id (display + which ruleset applies) ----
export function routeTrack(profile) {
  const k = (profile && profile.intake) || null;
  if (!k) return 'general_default_safe';
  const sex = k.sexAssignedAtBirth;
  const ls = k.lifeStage;
  if (ls === 'pregnant') {
    const hi = (k.conditionFlags || []).some((c) => c === 'pregnant_high_risk' || c === 'pregnancy_hbp_preeclampsia');
    return hi ? 'prenatal_high_risk' : 'prenatal';
  }
  if (sex === 'female' && ['pp_early', 'pp_recovery', 'pp_strengthening', 'pp_late'].includes(ls)) {
    return 'postpartum_women_30_40';
  }
  if (sex === 'female') return 'general_female';
  return 'general_adult';
}

// ---- SCREENING: which tiers are available, with consult-a-clinician copy ----
// Returns { allowed:Set<tier>, messages:{tier|"all": copy}, hardBlockAll:bool }.
// Default-safe: meditation + No Sweat always survive unless pp_bleeding=yes.
export function evaluateScreening(profile) {
  const k = (profile && profile.intake) || null;
  const allowed = new Set(ALL_TIERS);
  const messages = {};
  const block = (tier, msg) => { allowed.delete(tier); if (msg && !messages[tier]) messages[tier] = msg; };

  // No intake yet → default-safe: Super Sweaty gated until the PAR-Q+ is completed.
  if (!k) {
    block('super_sweaty', 'Answer a few quick readiness questions in Settings to unlock the most vigorous sessions. Until then, gentle and moderate sessions and meditation are all here for you.');
    return { allowed, messages, hardBlockAll: false, track: 'general_default_safe' };
  }
  const parq = k.parq || {};
  const cond = k.conditionFlags || [];
  const ls = k.lifeStage;

  // Heavy bleeding → movement closes; meditation only.
  if (yes(parq.pp_bleeding)) {
    block('no_sweat'); block('slightly_sweaty'); block('super_sweaty',
      'Heavy bleeding is your body asking for rest, not movement. Please check in with your clinician before exercising. A calming breath practice is here whenever you want it.');
    messages.all = 'Movement is paused while you are bleeding heavily — meditation stays open. Please check with your clinician.';
    return { allowed, messages, hardBlockAll: false, track: routeTrack(profile) };
  }

  // Cardiac / syncope (or skipped when vigorous is requested) → block Super Sweaty.
  const cardiacFlag = CARDIAC_KEYS.some((key) => yes(parq[key]));
  const cardiacSkipped = CARDIAC_KEYS.some((key) => parq[key] == null);
  if (cardiacFlag || cardiacSkipped) {
    block('super_sweaty', cardiacFlag
      ? 'Before we pick up the pace, this is worth a quick word with your doctor — your safety matters more than any workout. The gentle and moderate sessions and meditation are all here for you.'
      : 'Finish the quick readiness questions in Settings to unlock the most vigorous sessions.');
  }

  // Postpartum stage gates.
  if (ls === 'pp_early' && k.clearedByClinician !== true) {
    block('slightly_sweaty', 'In these first weeks, the kindest training is breath, gentle movement, and rest. Most clinicians clear exercise around the 6-week check — once you are cleared, more options open up here automatically.');
    block('super_sweaty');
  }
  if (['pp_recovery', 'pp_strengthening', 'pp_late'].includes(ls) && k.clearedByClinician !== true) {
    block('super_sweaty', 'Before the most vigorous sessions, it is worth confirming with your clinician that your recovery is on track — especially the deep core and pelvic floor. Slightly Sweaty is a great place to build in the meantime.');
  }
  // Diastasis / doming → cap at Slightly until cleared (library is already DR-safe).
  if (yes(parq.pp_dr_doming) || cond.includes('dr_diastasis')) {
    block('super_sweaty', 'That doming is a sign your deep core is still knitting back together. We will keep everything breath-led and belly-kind, and a pelvic-health physio can guide the rest.');
  }
  // Pelvic-floor symptoms / prolapse → block Super Sweaty.
  if (yes(parq.pp_leakingPainPressure) || cond.includes('prolapse')) {
    block('super_sweaty', 'Leaking or heaviness is common and very treatable — and a sign to keep load gentle for now. A pelvic-health physiotherapist can make a real difference. Meanwhile we will keep things supportive.');
  }
  // C-section soreness / early → block Super Sweaty until pain-free / cleared.
  if (yes(parq.pp_csectionPain) || (['cesarean', 'both'].includes(k.birthType) && (k.weeksSinceBirth != null && k.weeksSinceBirth < 12))) {
    block('super_sweaty', 'A C-section is major abdominal surgery, and your core deserves a slow, respectful rebuild. We will take the front of your body especially gently.');
  }
  // Pregnancy hypertensive / high-risk → block both sweaty tiers.
  if (cond.includes('pregnancy_hbp_preeclampsia') || (ls === 'pregnant' && cond.includes('pregnant_high_risk'))) {
    block('slightly_sweaty', 'With raised blood pressure in pregnancy, vigorous activity needs your obstetric team’s say-so first. Gentle movement and breathing are here for you.');
    block('super_sweaty');
  }

  return { allowed, messages, hardBlockAll: false, track: routeTrack(profile) };
}

// Convenience: ordered list of currently-available tiers for a profile.
export function availableTiers(profile) {
  const { allowed } = evaluateScreening(profile);
  return ALL_TIERS.filter((t) => allowed.has(t));
}

// The consult-a-clinician copy for a tier the user cannot currently access.
export function gateMessage(profile, tier) {
  const { messages } = evaluateScreening(profile);
  return messages[tier] || messages.all || null;
}

// ---- FILTER: remove contraindicated ids from a candidate pool. Never renames. ----
export function filterPool(exercises, profile) {
  const k = (profile && profile.intake) || null;
  const chairMode = profile && profile.chairMode;
  const remove = new Set();
  if (chairMode) {
    (SPACE_FILTER.chair || []).forEach((id) => remove.add(id));
    // new moves declare chair-friendliness via a flag rather than the curated list
    exercises.forEach((e) => { const f = ALL_SPACE_FLAGS[e.id]; if (f && f.chairOk === false) remove.add(e.id); });
  }
  if (k) {
    if (k.space && SPACE_FILTER[k.space]) SPACE_FILTER[k.space].forEach((id) => remove.add(id));
    (k.injuryFlags || []).forEach((flag) => (INJURY_FILTER[flag] || []).forEach((id) => remove.add(id)));
    (k.conditionFlags || []).forEach((flag) => (INJURY_FILTER[flag] || []).forEach((id) => remove.add(id)));
  }
  // Never filter the breath/close moves — the session must always be able to close.
  const KEEP = new Set(['box-breath', 'pelvic-breath', 'kind-close', 'extended-exhale-breath']);
  return exercises.filter((e) => KEEP.has(e.id) || !remove.has(e.id));
}

// Whether a move has an honest chair/standing variant (for chair-mode messaging).
export function chairOk(id) { return !ALL_SPACE_FLAGS[id] || ALL_SPACE_FLAGS[id].chairOk; }
