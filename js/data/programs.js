// OPTIONAL guided programs (the HYBRID progression model). A program ONLY suggests
// today's action: each day is {suggestedDuration, suggestedTier, theme}. It is fully
// opt-in, pausable, and abandonable with zero penalty. CRITICAL INVARIANT: the garden,
// streak, levels and badges NEVER read program state — a program day writes the identical
// session record as a free pick. progress.program holds {id, startedAt, weekIdx, dayIdx}|null.

export const PROGRAMS = [
  {
    id: 'gentle-rebuild',
    name: 'Gentle Rebuild',
    blurb: 'A soft, optional 4-week path back to moving. Leave any time — your garden grows either way.',
    track: 'postpartum_women_30_40',
    weeks: [
      { label: 'Week 1 — breath & reconnect', days: [
        { suggestedDuration: 7,  suggestedTier: 'meditation',      theme: 'Arrive: settle and breathe' },
        { suggestedDuration: 15, suggestedTier: 'no_sweat',        theme: 'Gentle mobility + breath-led core' },
        { suggestedDuration: 7,  suggestedTier: 'no_sweat',        theme: 'Short and kind' },
      ] },
      { label: 'Week 2 — gentle strength', days: [
        { suggestedDuration: 20, suggestedTier: 'no_sweat',        theme: 'Mobility + first bridges' },
        { suggestedDuration: 15, suggestedTier: 'meditation',      theme: 'Self-compassion' },
        { suggestedDuration: 30, suggestedTier: 'no_sweat',        theme: 'Longer, unhurried' },
      ] },
      { label: 'Week 3 — find a moderate pace', days: [
        { suggestedDuration: 30, suggestedTier: 'slightly_sweaty', theme: 'Moderate, talk-test pace' },
        { suggestedDuration: 20, suggestedTier: 'no_sweat',        theme: 'Recover gently' },
        { suggestedDuration: 30, suggestedTier: 'slightly_sweaty', theme: 'Build a little' },
      ] },
      { label: 'Week 4 — your choice', days: [
        { suggestedDuration: 45, suggestedTier: 'slightly_sweaty', theme: 'A longer moderate session' },
        { suggestedDuration: 20, suggestedTier: 'meditation',      theme: 'Rest is productive' },
        { suggestedDuration: 30, suggestedTier: 'slightly_sweaty', theme: 'However today feels' },
      ] },
    ],
  },
];

export function getProgram(id) { return PROGRAMS.find((p) => p.id === id) || null; }

// Today's suggestion for an enrolled user. Pure read; never gates anything.
export function programSuggestion(program, state) {
  if (!program || !state) return null;
  const w = program.weeks[state.weekIdx];
  if (!w) return null;
  const d = w.days[state.dayIdx];
  if (!d) return null;
  return { ...d, weekLabel: w.label, weekIdx: state.weekIdx, dayIdx: state.dayIdx };
}

// Advance to the next suggested day after a completed session. Returns a NEW state
// (or null when the arc is finished). Never affects garden/streak/levels/badges.
export function advanceProgram(program, state) {
  if (!program || !state) return state;
  let { weekIdx, dayIdx } = state;
  dayIdx += 1;
  if (dayIdx >= program.weeks[weekIdx].days.length) { weekIdx += 1; dayIdx = 0; }
  if (weekIdx >= program.weeks.length) return { ...state, weekIdx, dayIdx, finished: true };
  return { ...state, weekIdx, dayIdx };
}
