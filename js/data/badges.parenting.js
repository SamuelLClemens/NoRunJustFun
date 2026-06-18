// Parenting badges (Mind track) — a visually DISTINCT set: warm coral + a sprout
// of growth-green, set apart from the finance gold/periwinkle and the green fitness
// badges. Same { id, name, desc, icon } shape so the shared badge grid + badge-pop
// loops reuse verbatim; category:'parenting' drives the coral accent styling, and
// every id is 'par-' namespaced so it can never collide in the shared badges{} ledger.
export const PARENTING_BADGES = [
  {
    "id": "par-first-lesson",
    "category": "parenting",
    "name": "First Step",
    "desc": "You finished your very first parenting lesson. Every nurturing journey starts with one small, caring step.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='25' r='15' fill='none' stroke='#E07856' stroke-width='2.5'/><path d='M24 33c-7-4.5-10-8.5-6.6-12.2 2.2-2.4 6-1.4 6.6 1.6 .6-3 4.4-4 6.6-1.6C34 24.5 31 28.5 24 33z' fill='#F08A66'/><rect x='22.6' y='8' width='2.8' height='9' rx='1.4' fill='#2E6B3D'/><circle cx='24' cy='8' r='3' fill='#5BA869'/></svg>"
  },
  {
    "id": "par-three",
    "category": "parenting",
    "name": "Growing Together",
    "desc": "Three lessons in. Like a child, care grows a little every day — and so does your confidence.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='13' cy='34' r='6' fill='#F6C7B4'/><circle cx='24' cy='27' r='7.5' fill='#F08A66'/><circle cx='35' cy='18' r='9' fill='#E07856'/><path d='M35 22c-3-2-4.5-4-2.8-5.6 1-1 2.8-.6 2.8 .8 0-1.4 1.8-1.8 2.8-.8C41.5 18 40 20 35 22z' fill='#fff'/></svg>"
  },
  {
    "id": "par-seven",
    "category": "parenting",
    "name": "In Full Bloom",
    "desc": "Seven parenting lessons done. Your steady, warm attention is a garden your child gets to grow in.",
    "icon": "<svg viewBox='0 0 48 48'><g fill='#F08A66' transform='translate(24 21)'><ellipse cy='-12' rx='6' ry='10'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(72)'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(144)'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(216)'/><ellipse cy='-12' rx='6' ry='10' transform='rotate(288)'/></g><circle cx='24' cy='21' r='7' fill='#FFD45C' stroke='#E07856' stroke-width='2'/><rect x='22.6' y='29' width='2.8' height='12' rx='1.4' fill='#2E6B3D'/></svg>"
  },
  {
    "id": "par-streak-3",
    "category": "parenting",
    "name": "Day by Day",
    "desc": "Learning about parenting, day after day. Small, repeated moments are exactly how children — and habits — take root.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='8' fill='#FFD45C' stroke='#E07856' stroke-width='2'/><g stroke='#E07856' stroke-width='2.5' stroke-linecap='round'><path d='M24 8v4'/><path d='M24 36v4'/><path d='M8 24h4'/><path d='M36 24h4'/><path d='M13 13l2.8 2.8'/><path d='M32.2 32.2L35 35'/><path d='M35 13l-2.8 2.8'/><path d='M15.8 32.2L13 35'/></g></svg>"
  },
  {
    "id": "par-grower",
    "category": "parenting",
    "name": "Growth Spotter",
    "desc": "You learned how children actually grow — and that much 'misbehavior' is simply development doing its job.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='15' fill='#FBEEE8' stroke='#E07856' stroke-width='2'/><path d='M14 32l6-7 5 4 8-11' fill='none' stroke='#5BA869' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><circle cx='33' cy='18' r='3.4' fill='#F08A66' stroke='#E07856' stroke-width='1.5'/></svg>"
  },
  {
    "id": "par-positive",
    "category": "parenting",
    "name": "Warm & Firm",
    "desc": "You get it now: discipline means teaching, with warmth and clear limits together — a hug and a guardrail.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M24 8l13 4v9c0 8-5.5 14-13 17-7.5-3-13-9-13-17v-9z' fill='#FBEEE8' stroke='#E07856' stroke-width='2.5' stroke-linejoin='round'/><path d='M24 30c-5-3.5-7.5-6.5-5-9.4 1.7-1.9 4.7-1 5 1.4 .3-2.4 3.3-3.3 5-1.4 2.5 2.9 0 5.9-5 9.4z' fill='#F08A66'/></svg>"
  },
  {
    "id": "par-coach",
    "category": "parenting",
    "name": "Feelings Coach",
    "desc": "You learned to meet big feelings with calm — naming the feeling while still holding the limit. Co-regulation in action.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='15' fill='#FFD45C' stroke='#E07856' stroke-width='2.5'/><circle cx='18' cy='21' r='2.2' fill='#8A3D26'/><circle cx='30' cy='21' r='2.2' fill='#8A3D26'/><path d='M17 29c2.5 3 11.5 3 14 0' fill='none' stroke='#8A3D26' stroke-width='2.5' stroke-linecap='round'/><path d='M33 31c-2.5-1.8-3.6-3.4-2.2-4.8 .9-.9 2.4-.5 2.2 .7 .5-1.1 2-1.1 2.4 .1 .6 1.8-1 3.2-2.4 4z' fill='#F08A66'/></svg>"
  },
  {
    "id": "par-gamer",
    "category": "parenting",
    "name": "Playful Practice",
    "desc": "You won your first parenting game. Rehearsing calm, warm-and-firm responses makes them easier in the moment.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='8' y='16' width='32' height='20' rx='9' fill='#F08A66' stroke='#E07856' stroke-width='2'/><path d='M14 26h6M17 23v6' stroke='#fff' stroke-width='2' stroke-linecap='round'/><circle cx='31' cy='23' r='2.3' fill='#FFD45C'/><circle cx='35' cy='29' r='2.3' fill='#8A3D26'/></svg>"
  },
  {
    "id": "par-sharp",
    "category": "parenting",
    "name": "Steady Hand",
    "desc": "Five parenting games won. Connecting first, then guiding, is becoming a steady habit.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='15' fill='none' stroke='#E07856' stroke-width='2.5'/><path d='M24 32c-7-4.5-10-8.5-6.6-12.2 2.2-2.4 6-1.4 6.6 1.6 .6-3 4.4-4 6.6-1.6C34 23.5 31 27.5 24 32z' fill='#F08A66'/></svg>"
  },
  {
    "id": "par-streak-7",
    "category": "parenting",
    "name": "A Full Week",
    "desc": "Seven days of learning about your child, in a row. Showing up, again and again, is the heart of it.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='10' fill='#FFD45C' stroke='#E07856' stroke-width='2'/><text x='24' y='28' text-anchor='middle' font-family='Fredoka, system-ui' font-weight='700' font-size='11' fill='#8A3D26'>7</text><g stroke='#E07856' stroke-width='2.5' stroke-linecap='round'><path d='M24 8v4'/><path d='M24 36v4'/><path d='M8 24h4'/><path d='M36 24h4'/></g></svg>"
  },
  {
    "id": "par-sleep-guide",
    "category": "parenting",
    "name": "Sleep Guide",
    "desc": "You learned how much sleep your child really needs and how routines help. Calmer nights start with understanding.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M33 11a15 15 0 1 0 7 26 12 12 0 0 1-7-26z' fill='#F08A66'/><circle cx='16' cy='14' r='2' fill='#E07856'/><circle cx='12' cy='23' r='1.6' fill='#E07856'/><circle cx='20' cy='9' r='1.4' fill='#E07856'/></svg>"
  },
  {
    "id": "par-scholar",
    "category": "parenting",
    "name": "Parenting Scholar",
    "desc": "Every parenting lesson, finished. From development to defiance, you have walked the whole path with care.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='9' y='14' width='9' height='26' rx='2' fill='#F08A66' stroke='#E07856' stroke-width='2'/><rect x='20' y='11' width='9' height='29' rx='2' fill='#FBEEE8' stroke='#E07856' stroke-width='2'/><rect x='31' y='16' width='9' height='24' rx='2' fill='#F08A66' stroke='#E07856' stroke-width='2'/><path d='M22 18h5M22 22h5' stroke='#E07856' stroke-width='1.6' stroke-linecap='round'/></svg>"
  },
  {
    "id": "par-master",
    "category": "parenting",
    "name": "Parenting Path Master",
    "desc": "All lessons done, the final exam passed, and a game won. You have made this wisdom your own — warmly and firmly.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M14 10h20v6a10 10 0 0 1-20 0z' fill='#F08A66' stroke='#E07856' stroke-width='2'/><path d='M14 12H9a5 5 0 0 0 5 6M34 12h5a5 5 0 0 1-5 6' fill='none' stroke='#E07856' stroke-width='2'/><rect x='21' y='26' width='6' height='7' fill='#E07856'/><rect x='15' y='33' width='18' height='5' rx='2' fill='#E07856'/><path d='M24 30c-4-2.6-6-5-4-7.2 1.3-1.4 3.6-.8 4 1 .4-1.8 2.7-2.4 4-1 2 2.2 0 4.6-4 7.2z' fill='#fff'/></svg>"
  }
];
