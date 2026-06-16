// On-demand reading-level variants for lessons, authored SEPARATELY from the vetted
// lesson source files so those stay untouched and byte-stable. The engine merges these
// in at build time (see withVariants / makeLessonModule in lessons.shared.js, and the
// money builder in lessons.js). A missing entry simply means that segment shows no
// difficulty buttons — so this is purely additive.
//
// Shape:  LESSON_VARIANTS[trackKey][lessonId][segmentId] = { simpler?, deeper? }
//   simpler = a plain-language ("everyday" / high-school) re-explanation of the
//             segment's standard `say`.
//   deeper  = a university-level expansion (more nuance, terms, mechanism).
// Both must preserve the meaning and accuracy of the vetted `say` they re-level —
// they re-phrase, they do not introduce new factual claims.
export const LESSON_VARIANTS = {
  money: {},
  parenting: {},
  communication: {},
  memory: {},
  crystals: {},
  dreams: {},
};
