// Tier + duration model. The tier is an ASSEMBLER ATTRIBUTE, not a new engine:
// it varies pool, density, tempo, hold length, rest and repeats over the SAME
// buildSession skeleton. Super Sweaty raises density/reps, never impact.
// Exertion is framed by the ACSM talk test, never a heart-rate target.

export const DURATIONS = [7, 15, 20, 30, 45, 60];

export const MODES = {
  no_time:  { id: 'no_time',  label: 'No Time',  durations: [7, 15, 20], blurb: 'short and doable' },
  got_time: { id: 'got_time', label: 'Got Time', durations: [30, 45, 60], blurb: 'room to settle in' },
};

export const TIERS = ['no_sweat', 'slightly_sweaty', 'super_sweaty', 'meditation'];

export const TIER_META = {
  no_sweat:        { id: 'no_sweat',        label: 'No Sweat',        blurb: 'gentle · mobility · restorative' },
  slightly_sweaty: { id: 'slightly_sweaty', label: 'Slightly Sweaty', blurb: 'moderate · working but conversational' },
  super_sweaty:    { id: 'super_sweaty',    label: 'Super Sweaty',    blurb: 'vigorous · low-impact · screened' },
  meditation:      { id: 'meditation',      label: 'Meditation',      blurb: 'breath · stillness · rest' },
  // Body "path" session types (Stretching / Yoga). These scope the pool by exercise
  // CATEGORY rather than intensity, so they are always available (no screening gate).
  stretch:         { id: 'stretch',         label: 'Stretching',      blurb: 'gentle lengthening · mobility · calm' },
  yoga:            { id: 'yoga',            label: 'Yoga',            blurb: 'mindful poses · breath-linked flow' },
  face:            { id: 'face',            label: 'Face Yoga',       blurb: 'gentle facial release · relaxation' },
  baby:            { id: 'baby',            label: 'With Your Baby',  blurb: 'move and bond together · gentle' },
  sexercise:       { id: 'sexercise',       label: 'Sexercise',       blurb: 'strength · stamina · hip mobility · pelvic floor' },
};

// Workout categories — the three Body paths. Stretching + Yoga gate the pool to
// their category; Exercises uses the strength/cardio category with intensity tiers.
export const WORKOUT_PATHS = ['stretch', 'yoga', 'exercise', 'face', 'baby', 'sexercise'];

// Per-tier knobs the assembler/player read. holdMult is clamped so timed poses
// stay inside the 40-90s schema envelope. restAdd stacks on TRANSITION_SECS (6).
export const TIER_PROFILES = {
  no_sweat:        { strengthDensity: 0.35, rpe: '2-3, could sing',          holdMult: 0.85, restAdd: 8, repeatsFromMins: 45, requiresGate: false },
  slightly_sweaty: { strengthDensity: 0.55, rpe: '4-5, can talk not sing',   holdMult: 1.00, restAdd: 4, repeatsFromMins: 30, requiresGate: false },
  super_sweaty:    { strengthDensity: 0.70, rpe: '6-7, short phrases only',  holdMult: 1.15, restAdd: 0, repeatsFromMins: 20, requiresGate: true },
  // Stretching: no strength work, longer gentle holds, generous rest.
  stretch:         { strengthDensity: 0.00, rpe: '1-2, fully at ease',       holdMult: 1.10, restAdd: 8, repeatsFromMins: 20, requiresGate: false },
  // Yoga: a light strength thread through a breath-linked pose flow.
  yoga:            { strengthDensity: 0.30, rpe: '2-4, steady breath',       holdMult: 1.05, restAdd: 6, repeatsFromMins: 25, requiresGate: false },
  // Face Yoga: no body strength; gentle facial holds with generous rest.
  face:            { strengthDensity: 0.00, rpe: '1-2, fully at ease',       holdMult: 1.00, restAdd: 8, repeatsFromMins: 20, requiresGate: false },
  // With Your Baby: gentle full-body movement holding baby; a light strength thread.
  baby:            { strengthDensity: 0.30, rpe: '2-4, can chat to baby',    holdMult: 1.00, restAdd: 6, repeatsFromMins: 25, requiresGate: false },
  // Sexercise: a moderate strength + mobility thread (glutes, core, hips, pelvic floor);
  // never high-impact, no screening gate — gentle, postpartum-aware like the rest.
  sexercise:       { strengthDensity: 0.50, rpe: '3-5, can still talk',      holdMult: 1.00, restAdd: 4, repeatsFromMins: 25, requiresGate: false },
};

// The vigorous tier never adds impact. This is the safe ceiling, in data.
export const SUPER_SWEATY_REQUIRES_SCREEN = true;
