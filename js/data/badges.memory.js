// Memory badges (Mind track) — a DISTINCT set: orchid/plum with a spark of gold,
// set apart from finance gold/periwinkle, parenting coral, communication teal, and
// the green fitness badges. Same { id, name, desc, icon } shape; category:'memory'
// drives the orchid accent; every id is 'mem-' namespaced. Includes two game-win
// badges (driven by gamesWon, via the registry's gameBadges).
export const MEMORY_BADGES = [
  {
    "id": "mem-first-lesson",
    "category": "memory",
    "name": "First Spark",
    "desc": "You finished your first memory lesson. Understanding how memory works is the first step to using it well.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='15' fill='none' stroke='#B5478B' stroke-width='2.5'/><path d='M24 14a8 8 0 0 0-5 14c1 .8 1.5 1.6 1.6 2.8h6.8c.1-1.2.6-2 1.6-2.8a8 8 0 0 0-5-14z' fill='#E59FCB'/><rect x='21' y='31' width='6' height='3' rx='1.5' fill='#7A2E5E'/></svg>"
  },
  {
    "id": "mem-three",
    "category": "memory",
    "name": "Building Recall",
    "desc": "Three lessons in. Memory is a skill that grows with practice — and yours is taking shape.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='13' cy='34' r='6' fill='#EBC4DD'/><circle cx='24' cy='27' r='7.5' fill='#D77FB6'/><circle cx='35' cy='18' r='9' fill='#B5478B'/><path d='M31 18l3 3 5-6' fill='none' stroke='#fff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"
  },
  {
    "id": "mem-seven",
    "category": "memory",
    "name": "Sharp Mind",
    "desc": "Seven memory lessons done. You have a real toolkit now — spacing, retrieval, and a palace or two.",
    "icon": "<svg viewBox='0 0 48 48'><g fill='#D77FB6' transform='translate(24 21)'><ellipse cy='-12' rx='6' ry='10'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(72)'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(144)'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(216)'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(288)'/></g><circle cx='24' cy='21' r='7' fill='#FFD45C' stroke='#B5478B' stroke-width='2'/><rect x='22.6' y='29' width='2.8' height='12' rx='1.4' fill='#2E6B3D'/></svg>"
  },
  {
    "id": "mem-streak-3",
    "category": "memory",
    "name": "Daily Reps",
    "desc": "Practicing memory day after day. Spaced, repeated practice is exactly what the science says works.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='8' y='30' width='9' height='10' rx='2' fill='#EBC4DD'/><rect x='19' y='23' width='9' height='17' rx='2' fill='#D77FB6'/><rect x='30' y='15' width='9' height='25' rx='2' fill='#B5478B'/><circle cx='34.5' cy='9' r='4' fill='#FFD45C'/></svg>"
  },
  {
    "id": "mem-foundations",
    "category": "memory",
    "name": "Memory Mapper",
    "desc": "You learned how memory really works — encoding, storage, retrieval — and that forgetting is normal, not failure.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='15' fill='#F7E9F2' stroke='#B5478B' stroke-width='2'/><circle cx='17' cy='20' r='3' fill='#B5478B'/><circle cx='31' cy='18' r='3' fill='#B5478B'/><circle cx='27' cy='30' r='3' fill='#B5478B'/><path d='M17 20l14-2M31 18l-4 12' fill='none' stroke='#D77FB6' stroke-width='2'/></svg>"
  },
  {
    "id": "mem-retrieval",
    "category": "memory",
    "name": "Self-Tester",
    "desc": "You get it: pulling an answer from memory beats re-reading. Testing yourself is studying, not just checking.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='12' y='9' width='24' height='30' rx='3' fill='#F7E9F2' stroke='#B5478B' stroke-width='2'/><path d='M19 19q0-4 5-4t5 4q0 3-4 4v2' fill='none' stroke='#B5478B' stroke-width='2.5' stroke-linecap='round'/><circle cx='24' cy='32' r='1.8' fill='#B5478B'/></svg>"
  },
  {
    "id": "mem-palace",
    "category": "memory",
    "name": "Palace Builder",
    "desc": "Mnemonics and the memory palace are in your kit now — turning dull lists into vivid, walkable places.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M8 40V22l16-11 16 11v18z' fill='#F7E9F2' stroke='#B5478B' stroke-width='2' stroke-linejoin='round'/><rect x='20' y='28' width='8' height='12' fill='#B5478B'/><circle cx='24' cy='15' r='2.6' fill='#FFD45C'/></svg>"
  },
  {
    "id": "mem-gamer",
    "category": "memory",
    "name": "Game On",
    "desc": "You won your first memory game. A fun warm-up for the mind — practice that feels like play.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='8' y='16' width='32' height='20' rx='8' fill='#D77FB6' stroke='#B5478B' stroke-width='2'/><circle cx='17' cy='26' r='2.5' fill='#fff'/><circle cx='17' cy='26' r='2.5' fill='#fff'/><path d='M14 26h6M17 23v6' stroke='#fff' stroke-width='2' stroke-linecap='round'/><circle cx='31' cy='23' r='2.2' fill='#FFD45C'/><circle cx='35' cy='29' r='2.2' fill='#7A2E5E'/></svg>"
  },
  {
    "id": "mem-sharp",
    "category": "memory",
    "name": "Quick Recall",
    "desc": "Five memory games won. Your recognition and working memory are getting a steady, playful workout.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='15' fill='none' stroke='#B5478B' stroke-width='2.5'/><path d='M26 10l-9 16h6l-2 12 11-17h-7z' fill='#FFD45C' stroke='#B5478B' stroke-width='1.5' stroke-linejoin='round'/></svg>"
  },
  {
    "id": "mem-streak-7",
    "category": "memory",
    "name": "A Week of Reps",
    "desc": "Seven days of memory practice, in a row. Spaced, repeated effort is exactly what the science rewards.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='10' fill='#D77FB6' stroke='#B5478B' stroke-width='2'/><text x='24' y='28' text-anchor='middle' font-family='Fredoka, system-ui' font-weight='700' font-size='11' fill='#fff'>7</text><g stroke='#B5478B' stroke-width='2.5' stroke-linecap='round'><path d='M24 8v4'/><path d='M24 36v4'/><path d='M8 24h4'/><path d='M36 24h4'/></g></svg>"
  },
  {
    "id": "mem-mnemonist",
    "category": "memory",
    "name": "Mnemonist",
    "desc": "You learned the major system — a code that turns slippery numbers into pictures you can actually hold onto.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='9' y='14' width='30' height='20' rx='3' fill='#F7E9F2' stroke='#B5478B' stroke-width='2'/><g fill='#B5478B'><circle cx='17' cy='24' r='3'/><circle cx='24' cy='24' r='3'/><circle cx='31' cy='24' r='3'/></g><path d='M14 30h20' stroke='#D77FB6' stroke-width='2' stroke-linecap='round'/></svg>"
  },
  {
    "id": "mem-scholar",
    "category": "memory",
    "name": "Memory Scholar",
    "desc": "Every memory lesson, finished. How memory works, what helps, and what the science cannot promise — you know it all now.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='9' y='14' width='9' height='26' rx='2' fill='#D77FB6' stroke='#B5478B' stroke-width='2'/><rect x='20' y='11' width='9' height='29' rx='2' fill='#F7E9F2' stroke='#B5478B' stroke-width='2'/><rect x='31' y='16' width='9' height='24' rx='2' fill='#D77FB6' stroke='#B5478B' stroke-width='2'/><path d='M22 18h5M22 22h5' stroke='#B5478B' stroke-width='1.6' stroke-linecap='round'/></svg>"
  },
  {
    "id": "mem-master",
    "category": "memory",
    "name": "Memory Master",
    "desc": "All lessons done, a perfect quiz, and a game won. You have a genuine, evidence-based toolkit — and the practice to match.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M14 10h20v6a10 10 0 0 1-20 0z' fill='#D77FB6' stroke='#B5478B' stroke-width='2'/><path d='M14 12H9a5 5 0 0 0 5 6M34 12h5a5 5 0 0 1-5 6' fill='none' stroke='#B5478B' stroke-width='2'/><rect x='21' y='26' width='6' height='7' fill='#B5478B'/><rect x='15' y='33' width='18' height='5' rx='2' fill='#B5478B'/><path d='M20 13a4 4 0 0 1 8 0c0 1.6-1 2.2-1.6 2.8h-4.8C21 15.2 20 14.6 20 13z' fill='#FBE9A0'/></svg>"
  }
];
