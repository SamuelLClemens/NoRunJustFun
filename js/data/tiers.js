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
};

// Per-tier knobs the assembler/player read. holdMult is clamped so timed poses
// stay inside the 40-90s schema envelope. restAdd stacks on TRANSITION_SECS (6).
export const TIER_PROFILES = {
  no_sweat:        { strengthDensity: 0.35, rpe: '2-3, could sing',          holdMult: 0.85, restAdd: 8, repeatsFromMins: 45, requiresGate: false },
  slightly_sweaty: { strengthDensity: 0.55, rpe: '4-5, can talk not sing',   holdMult: 1.00, restAdd: 4, repeatsFromMins: 30, requiresGate: false },
  super_sweaty:    { strengthDensity: 0.70, rpe: '6-7, short phrases only',  holdMult: 1.15, restAdd: 0, repeatsFromMins: 20, requiresGate: true },
};

// The vigorous tier never adds impact. This is the safe ceiling, in data.
export const SUPER_SWEATY_REQUIRES_SCREEN = true;
