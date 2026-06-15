// Finance badges (Money Garden) — a visually DISTINCT set from the fitness
// badges in badges.js: gold coins ringed in the periwinkle of the veronica
// (the brand flower), where the fitness set leans leafy green and sky blue.
// Same { id, name, desc, icon } shape so the existing badge grid + badge-pop
// render loops reuse verbatim; `category: 'finance'` drives the gold accent
// styling, and every id is 'fin-' namespaced so it can never collide with a
// fitness id in the shared progress.badges{} ledger.
export const FINANCE_BADGES = [
  {
    "id": "fin-first-lesson",
    "category": "finance",
    "name": "First Sprout of Sense",
    "desc": "You finished your very first money lesson. Every fortune, and every garden, starts with one small seed.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='27' r='15' fill='none' stroke='#5B6BD0' stroke-width='2.5'/><circle cx='24' cy='27' r='11' fill='#FFD45C' stroke='#F4A300' stroke-width='2'/><path d='M24 18 q-7 -6 -12 -2 q4 8 12 5 z' fill='#5BA869'/><rect x='22.5' y='9' width='3' height='10' rx='1.5' fill='#2E6B3D'/></svg>"
  },
  {
    "id": "fin-three",
    "category": "finance",
    "name": "Money Trio",
    "desc": "Three lessons done. Knowledge compounds just like coins do — and yours is starting to stack up.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='13' cy='33' r='8' fill='#FFE49A' stroke='#F4A300' stroke-width='2'/><circle cx='24' cy='25' r='9' fill='#FFD45C' stroke='#F4A300' stroke-width='2'/><circle cx='35' cy='16' r='9' fill='#FFD45C' stroke='#5B6BD0' stroke-width='2.5'/></svg>"
  },
  {
    "id": "fin-seven",
    "category": "finance",
    "name": "Garden of Plenty",
    "desc": "Seven money lessons in the bag. Your Money Garden is in full, well-tended bloom.",
    "icon": "<svg viewBox='0 0 48 48'><g fill='#5B6BD0' transform='translate(24 22)'><ellipse cy='-12' rx='6' ry='10'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(72)'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(144)'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(216)'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(288)'/></g><circle cx='24' cy='22' r='7' fill='#FFD45C' stroke='#F4A300' stroke-width='2'/><rect x='22.5' y='30' width='3' height='12' rx='1.5' fill='#2E6B3D'/></svg>"
  },
  {
    "id": "fin-streak-3",
    "category": "finance",
    "name": "Steady Saver",
    "desc": "Money lessons on a roll, day after day. Steady beats flashy — that is the whole secret.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='8' y='30' width='9' height='10' rx='2' fill='#FFE49A' stroke='#F4A300' stroke-width='1.5'/><rect x='19' y='24' width='9' height='16' rx='2' fill='#FFD45C' stroke='#F4A300' stroke-width='1.5'/><rect x='30' y='15' width='9' height='25' rx='2' fill='#FFD45C' stroke='#5B6BD0' stroke-width='2'/><circle cx='34.5' cy='9' r='4' fill='#5B6BD0'/></svg>"
  },
  {
    "id": "fin-budgeter",
    "category": "finance",
    "name": "Budget Botanist",
    "desc": "You learned how to give every dollar a job and grow a safety net. Roots first, then blooms.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='26' r='14' fill='#ECEEFB' stroke='#5B6BD0' stroke-width='2'/><path d='M16 30 L21 24 L26 28 L33 19' fill='none' stroke='#5BA869' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><circle cx='33' cy='19' r='3.4' fill='#FFD45C' stroke='#F4A300' stroke-width='1.5'/></svg>"
  },
  {
    "id": "fin-compounder",
    "category": "finance",
    "name": "The Compounder",
    "desc": "You get interest on interest now — the gentlest superpower in money. Time does the rest.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='14' cy='32' r='6' fill='#FFE49A' stroke='#F4A300' stroke-width='1.5'/><circle cx='23' cy='25' r='8' fill='#FFD45C' stroke='#F4A300' stroke-width='1.5'/><circle cx='34' cy='16' r='10' fill='#FFD45C' stroke='#5B6BD0' stroke-width='2'/><path d='M30 17 L33 20 L39 13' fill='none' stroke='#9A6500' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>"
  },
  {
    "id": "fin-landlord",
    "category": "finance",
    "name": "Ground Floor",
    "desc": "Mortgages, cap rate, leverage, REITs — you know the ground rules of property now, risks and all.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M10 40 V20 L24 9 L38 20 V40 Z' fill='#FFD45C' stroke='#F4A300' stroke-width='2' stroke-linejoin='round'/><rect x='20' y='28' width='8' height='12' fill='#5B6BD0'/><circle cx='24' cy='14' r='2.6' fill='#5BA869'/></svg>"
  }
];
