// Crystal-energy badges (Soul section) — a distinct amethyst/violet set, set apart
// from the Mind subjects and the green fitness badges. Same { id, name, desc, icon }
// shape so the shared badge grid + badge-pop loops reuse verbatim; category:'crystals'
// drives the violet accent, and every id is 'cry-' namespaced so it can never collide
// in the shared badges{} ledger.
//
// Framing note: this is a "belief, clearly flagged" section, so the badges reward
// curiosity and HONESTY — including a badge for learning what the evidence actually
// shows. Nothing here implies crystals are proven to do anything.
export const CRYSTALS_BADGES = [
  {
    "id": "cry-first-lesson",
    "category": "crystals",
    "name": "First Light",
    "desc": "You finished your very first crystal lesson — curiosity and honesty, side by side.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M24 7l9 9-9 25-9-25z' fill='#B79CE8' stroke='#7A57C2' stroke-width='2' stroke-linejoin='round'/><path d='M24 7l9 9-9 6-9-6z' fill='#D7C6F2'/><path d='M24 22v19' stroke='#7A57C2' stroke-width='1.6'/></svg>"
  },
  {
    "id": "cry-three",
    "category": "crystals",
    "name": "Three Facets",
    "desc": "Three lessons in. You are seeing crystals from more than one angle — the stone, the story, and the science.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M14 18l5-6 5 6-5 20z' fill='#C9B3EE' stroke='#7A57C2' stroke-width='1.8' stroke-linejoin='round'/><path d='M29 16l5-6 5 6-5 22z' fill='#B79CE8' stroke='#7A57C2' stroke-width='1.8' stroke-linejoin='round'/><path d='M21 22l5-6 5 6-5 18z' fill='#D7C6F2' stroke='#7A57C2' stroke-width='1.8' stroke-linejoin='round'/></svg>"
  },
  {
    "id": "cry-seven",
    "category": "crystals",
    "name": "Clear View",
    "desc": "Seven crystal lessons done. You can hold the beauty of the tradition and a clear head at the same time.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M24 6l11 10-11 26-11-26z' fill='#B79CE8' stroke='#7A57C2' stroke-width='2.2' stroke-linejoin='round'/><path d='M24 6l11 10-11 7-11-7z' fill='#E4DAF6'/><g stroke='#FFD45C' stroke-width='2' stroke-linecap='round'><path d='M38 9l3-3'/><path d='M40 16l4 0'/><path d='M37 22l3 2'/></g></svg>"
  },
  {
    "id": "cry-streak-3",
    "category": "crystals",
    "name": "Steady Stone",
    "desc": "Three days of quiet learning in a row. Small, repeated moments of reflection are the real gift here.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M24 9l8 8-8 22-8-22z' fill='#C9B3EE' stroke='#7A57C2' stroke-width='2' stroke-linejoin='round'/><g stroke='#7A57C2' stroke-width='2.4' stroke-linecap='round'><path d='M24 5v3'/><path d='M9 18h3'/><path d='M36 18h3'/></g></svg>"
  },
  {
    "id": "cry-streak-7",
    "category": "crystals",
    "name": "A Week of Wonder",
    "desc": "Seven days in a row. You have made a calm, curious ritual of it — and that ritual is the part that truly settles the mind.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M24 7l9 9-9 25-9-25z' fill='#B79CE8' stroke='#7A57C2' stroke-width='2' stroke-linejoin='round'/><circle cx='24' cy='20' r='5' fill='#fff' opacity='0.65'/><text x='24' y='24' text-anchor='middle' font-family='Fredoka, system-ui' font-weight='700' font-size='9' fill='#5E3FA6'>7</text></svg>"
  },
  {
    "id": "cry-geologist",
    "category": "crystals",
    "name": "Rock Hound",
    "desc": "You learned what crystals truly are: minerals with ordered atoms, formed over ages. The real science is wondrous on its own.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M10 24l8-10 9 4 7-6 4 10-9 14H17z' fill='#C9B3EE' stroke='#7A57C2' stroke-width='2' stroke-linejoin='round'/><path d='M18 14l-1 22M27 18l-3 18M34 12l1 24' stroke='#9A7AD6' stroke-width='1.4'/></svg>"
  },
  {
    "id": "cry-historian",
    "category": "crystals",
    "name": "Lore Keeper",
    "desc": "You traced crystal lore across cultures and centuries — described with respect, and clearly marked as tradition.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M11 12c6-3 14-3 13 4 1-7 9-7 13-4v24c-4-3-12-3-13 1-1-4-9-4-13-1z' fill='#E4DAF6' stroke='#7A57C2' stroke-width='2.2' stroke-linejoin='round'/><path d='M24 16v21' stroke='#7A57C2' stroke-width='2'/><path d='M16 22l-2 4 4 0z' fill='#B79CE8'/></svg>"
  },
  {
    "id": "cry-skeptic",
    "category": "crystals",
    "name": "Clear-Eyed",
    "desc": "You learned what the evidence actually shows — no proof of healing energy, and that honesty makes the reflection more meaningful, not less.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='15' fill='#EDE6F8' stroke='#7A57C2' stroke-width='2'/><path d='M11 24s5-8 13-8 13 8 13 8-5 8-13 8-13-8-13-8z' fill='none' stroke='#7A57C2' stroke-width='2'/><circle cx='24' cy='24' r='4.5' fill='#9A7AD6'/><circle cx='25.5' cy='22.5' r='1.4' fill='#fff'/></svg>"
  },
  {
    "id": "cry-grounded",
    "category": "crystals",
    "name": "Grounded",
    "desc": "You learned to use a stone the honest way: as a worry-stone, a cue to pause and breathe. The calm comes from you.",
    "icon": "<svg viewBox='0 0 48 48'><ellipse cx='24' cy='27' rx='13' ry='9' fill='#C9B3EE' stroke='#7A57C2' stroke-width='2'/><path d='M16 26c3-2 13-2 16 0' fill='none' stroke='#9A7AD6' stroke-width='1.6'/><g stroke='#FFD45C' stroke-width='2' stroke-linecap='round'><path d='M24 12v4'/><path d='M18 14l2 3'/><path d='M30 14l-2 3'/></g></svg>"
  },
  {
    "id": "cry-scholar",
    "category": "crystals",
    "name": "Crystal Scholar",
    "desc": "Every crystal lesson, finished — beauty, history, belief and evidence, all held together. You can speak about this with care and clarity.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M24 6l12 9-12 27-12-27z' fill='#B79CE8' stroke='#7A57C2' stroke-width='2.2' stroke-linejoin='round'/><path d='M24 6l12 9-12 8-12-8z' fill='#E4DAF6'/><path d='M19 27l3.5 4 7-8' fill='none' stroke='#5E3FA6' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/></svg>"
  },
  {
    "id": "cry-gamer",
    "category": "crystals",
    "name": "Curious Player",
    "desc": "You won your first crystal game — testing what you have learned, the playful way.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M24 8l9 8-9 24-9-24z' fill='#B79CE8' stroke='#7A57C2' stroke-width='2' stroke-linejoin='round'/><path d='M21 18l8 5-8 5z' fill='#5E3FA6'/></svg>"
  },
  {
    "id": "cry-sharp",
    "category": "crystals",
    "name": "Sharp Skeptic",
    "desc": "Five crystal games won. You can tell the lore from the evidence at a glance — and enjoy both.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M24 8l9 8-9 24-9-24z' fill='#B79CE8' stroke='#7A57C2' stroke-width='2' stroke-linejoin='round'/><path d='M26 16l-8 10h5l-3 7 8-11h-5z' fill='#FFD45C' stroke='#C9A227' stroke-width='0.8' stroke-linejoin='round'/></svg>"
  },
  {
    "id": "cry-master",
    "category": "crystals",
    "name": "Crystal Master",
    "desc": "Every lesson done, the final exam passed, and a game won — you hold the beauty and the evidence with equal care.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M24 12l10 8-10 22-10-22z' fill='#B79CE8' stroke='#7A57C2' stroke-width='2.2' stroke-linejoin='round'/><path d='M15 8l4 5 5-6 5 6 4-5-2 9H17z' fill='#FFD45C' stroke='#C9A227' stroke-width='1' stroke-linejoin='round'/></svg>"
  }
];
