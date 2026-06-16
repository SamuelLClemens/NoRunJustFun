// Dream-interpretation badges (Soul section) — a distinct indigo/night set, set
// apart from the Mind subjects and the green fitness badges. Same { id, name, desc,
// icon } shape so the shared badge grid + badge-pop loops reuse verbatim;
// category:'dreams' drives the indigo accent, and every id is 'drm-' namespaced so it
// can never collide in the shared badges{} ledger.
//
// Framing note: this section blends real sleep science with the cultural history of
// dream interpretation, honestly flagged. The badges reward both the science and a
// clear-eyed view that popular symbol-meanings are not validated.
export const DREAMS_BADGES = [
  {
    "id": "drm-first-lesson",
    "category": "dreams",
    "name": "First Night",
    "desc": "You finished your very first dream lesson — real science and old stories, side by side.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M30 9a15 15 0 1 0 8 27A12 12 0 0 1 30 9z' fill='#8B7FE8' stroke='#4B3FB0' stroke-width='2' stroke-linejoin='round'/><circle cx='16' cy='13' r='1.8' fill='#FFE9A8'/><circle cx='12' cy='22' r='1.4' fill='#FFE9A8'/></svg>"
  },
  {
    "id": "drm-three",
    "category": "dreams",
    "name": "Three Dreams",
    "desc": "Three lessons in. You are learning how dreaming works — and how carefully to read what dreams 'mean'.",
    "icon": "<svg viewBox='0 0 48 48'><g fill='#8B7FE8' stroke='#4B3FB0' stroke-width='1.6'><path d='M14 16l1.6 3.2 3.4.5-2.5 2.4.6 3.5-3.1-1.7-3.1 1.7.6-3.5-2.5-2.4 3.4-.5z'/></g><path d='M30 12a11 11 0 1 0 6 20 9 9 0 0 1-6-20z' fill='#A99CF0' stroke='#4B3FB0' stroke-width='1.8'/></svg>"
  },
  {
    "id": "drm-seven",
    "category": "dreams",
    "name": "Seven Nights",
    "desc": "Seven dream lessons done. From REM sleep to dream journals, you have explored the night with curiosity and care.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M32 7a17 17 0 1 0 9 30A13 13 0 0 1 32 7z' fill='#8B7FE8' stroke='#4B3FB0' stroke-width='2.2' stroke-linejoin='round'/><circle cx='15' cy='12' r='2' fill='#FFE9A8'/><circle cx='10' cy='20' r='1.6' fill='#FFE9A8'/><circle cx='17' cy='25' r='1.3' fill='#FFE9A8'/></svg>"
  },
  {
    "id": "drm-streak-3",
    "category": "dreams",
    "name": "Bedtime Habit",
    "desc": "Three days of learning in a row. A gentle nightly rhythm is good for your sleep and your curiosity alike.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M30 11a13 13 0 1 0 7 23A10 10 0 0 1 30 11z' fill='#A99CF0' stroke='#4B3FB0' stroke-width='2'/><g stroke='#FFE9A8' stroke-width='2.4' stroke-linecap='round'><path d='M14 10l4 0'/><path d='M16 8v4'/></g></svg>"
  },
  {
    "id": "drm-streak-7",
    "category": "dreams",
    "name": "A Week of Dreams",
    "desc": "Seven nights in a row. Showing up with curiosity, again and again, is the heart of any good practice.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M31 8a16 16 0 1 0 8 28A12 12 0 0 1 31 8z' fill='#8B7FE8' stroke='#4B3FB0' stroke-width='2'/><circle cx='18' cy='20' r='6' fill='#fff' opacity='0.55'/><text x='18' y='24' text-anchor='middle' font-family='Fredoka, system-ui' font-weight='700' font-size='9' fill='#3C3196'>7</text></svg>"
  },
  {
    "id": "drm-scientist",
    "category": "dreams",
    "name": "Sleep Scientist",
    "desc": "You learned the real science of dreaming: REM and NREM cycles, and when vivid dreams arrive. Solid, settled science.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M10 28c4 0 4-8 8-8s4 8 8 8 4-10 8-10 4 6 4 6' fill='none' stroke='#8B7FE8' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/><circle cx='38' cy='14' r='3' fill='#A99CF0'/><path d='M8 36h32' stroke='#4B3FB0' stroke-width='1.6' stroke-linecap='round'/></svg>"
  },
  {
    "id": "drm-theorist",
    "category": "dreams",
    "name": "Theory Explorer",
    "desc": "You met the leading theories of why we dream — memory, continuity, threat-rehearsal — and learned that none is settled yet.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='21' r='12' fill='#A99CF0' stroke='#4B3FB0' stroke-width='2'/><path d='M24 13a8 8 0 0 0-5 14c.9.7 1.4 1.5 1.5 2.6h7c.1-1.1.6-1.9 1.5-2.6A8 8 0 0 0 24 13z' fill='#FBE9A0' stroke='#4B3FB0' stroke-width='1.6'/><rect x='20.5' y='31' width='7' height='3' rx='1.5' fill='#4B3FB0'/></svg>"
  },
  {
    "id": "drm-skeptic",
    "category": "dreams",
    "name": "Clear-Eyed Dreamer",
    "desc": "You learned that 'dream dictionaries' are not validated — a single dream has no fixed universal meaning. Reflection, not prediction.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='15' fill='#E6E2FA' stroke='#4B3FB0' stroke-width='2'/><path d='M11 24s5-8 13-8 13 8 13 8-5 8-13 8-13-8-13-8z' fill='none' stroke='#4B3FB0' stroke-width='2'/><circle cx='24' cy='24' r='4.5' fill='#8B7FE8'/><circle cx='25.5' cy='22.5' r='1.4' fill='#fff'/></svg>"
  },
  {
    "id": "drm-journaler",
    "category": "dreams",
    "name": "Dream Journaler",
    "desc": "You learned to journal your dreams as gentle self-reflection — a window on waking feelings, not a fortune-teller.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='12' y='9' width='24' height='30' rx='3' fill='#E6E2FA' stroke='#4B3FB0' stroke-width='2'/><path d='M12 9v30' stroke='#4B3FB0' stroke-width='2'/><g stroke='#8B7FE8' stroke-width='2' stroke-linecap='round'><path d='M18 17h12'/><path d='M18 23h12'/><path d='M18 29h8'/></g><path d='M33 7a11 11 0 0 0 4 8' fill='none' stroke='#FFD45C' stroke-width='2' stroke-linecap='round'/></svg>"
  },
  {
    "id": "drm-scholar",
    "category": "dreams",
    "name": "Dream Scholar",
    "desc": "Every dream lesson, finished — the science, the history, and the honest limits of meaning. You can explore your nights with real understanding.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M32 6a17 17 0 1 0 9 30A13 13 0 0 1 32 6z' fill='#8B7FE8' stroke='#4B3FB0' stroke-width='2.2' stroke-linejoin='round'/><path d='M16 20l3 3 6-7' fill='none' stroke='#FFE9A8' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/><circle cx='13' cy='12' r='1.8' fill='#FFE9A8'/></svg>"
  }
];
