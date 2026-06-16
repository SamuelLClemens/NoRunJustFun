// Fitness + shared badge definitions (27): 16 original, plus 11 additive milestones
// (garden stages, longer streaks, deeper meditation counts, session milestones, and
// cross-pillar Mind/Body/Soul balance). All consistent with the count-based,
// grace-day, "consistency not intensity" design — no new compulsion curves.
export const BADGES = [
  {
    "id": "first-session",
    "name": "First Bloom",
    "desc": "You showed up for your very first session, and that is exactly how every garden starts.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='8' y='36' width='32' height='6' rx='3' fill='#1F4D2E'/><path d='M24 36 V20' stroke='#5BA869' stroke-width='4' stroke-linecap='round'/><ellipse cx='17' cy='23' rx='7' ry='4' fill='#5BA869' transform='rotate(-30 17 23)'/><circle cx='24' cy='14' r='6' fill='#FFD45C'/></svg>"
  },
  {
    "id": "three-in-week",
    "name": "Three's a Charm",
    "desc": "Three sessions in one week — your future self is doing a tiny happy dance.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='11' cy='32' r='6' fill='#7EC4E8'/><circle cx='24' cy='24' r='7' fill='#FFD45C'/><circle cx='38' cy='14' r='8' fill='#F58F7C'/></svg>"
  },
  {
    "id": "streak-7",
    "name": "Seven-Day Sunshine",
    "desc": "Seven days in a row of choosing yourself, which is frankly heroic.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M24 5 C30 14 37 18 37 28 A13 13 0 0 1 11 28 C11 18 18 14 24 5 Z' fill='#F58F7C'/><path d='M24 20 C27 24 30 26 30 31 A6 6 0 0 1 18 31 C18 26 21 24 24 20 Z' fill='#FFD45C'/></svg>"
  },
  {
    "id": "first-45",
    "name": "Forty-Five and Thriving",
    "desc": "You stayed for a whole forty-five minutes — that is self-care with a capital S.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='18' fill='#FDF9F0' stroke='#1F4D2E' stroke-width='3'/><path d='M24 24 V13' stroke='#5BA869' stroke-width='3' stroke-linecap='round'/><path d='M24 24 L32 29' stroke='#F58F7C' stroke-width='3' stroke-linecap='round'/><circle cx='24' cy='24' r='2.5' fill='#1F4D2E'/></svg>"
  },
  {
    "id": "ten-breath-closes",
    "name": "Deep Breath Devotee",
    "desc": "Ten breathing closes done — your nervous system would like to send a thank-you card.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='6' fill='#7EC4E8'/><circle cx='24' cy='24' r='12' fill='none' stroke='#7EC4E8' stroke-width='3' opacity='0.7'/><circle cx='24' cy='24' r='18' fill='none' stroke='#7EC4E8' stroke-width='3' opacity='0.4'/></svg>"
  },
  {
    "id": "early-bird",
    "name": "Sunrise Stretch Club",
    "desc": "You moved before 8am, possibly before anyone else in the house found their socks.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M10 32 A14 14 0 0 1 38 32 Z' fill='#FFD45C'/><rect x='5' y='32' width='38' height='4' rx='2' fill='#5BA869'/><path d='M24 8 V13 M11 12 L14.5 15.5 M37 12 L33.5 15.5' stroke='#F58F7C' stroke-width='3' stroke-linecap='round'/></svg>"
  },
  {
    "id": "night-owl",
    "name": "Moonlight Mover",
    "desc": "A session after 9pm — proof that calm can still happen after bedtime chaos.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M31 5 A19 19 0 1 0 43 38 A15 15 0 0 1 31 5 Z' fill='#FFD45C'/><circle cx='12' cy='13' r='3' fill='#7EC4E8'/><circle cx='17' cy='28' r='2' fill='#F58F7C'/></svg>"
  },
  {
    "id": "comeback-queen",
    "name": "Comeback Queen",
    "desc": "A grace day saved your streak and you came right back — that is the real flex.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M8 33 L8 15 L17 23 L24 11 L31 23 L40 15 L40 33 Z' fill='#FFD45C'/><rect x='8' y='33' width='32' height='5' rx='2' fill='#F58F7C'/><circle cx='24' cy='27' r='3' fill='#7EC4E8'/></svg>"
  },
  {
    "id": "garden-bloom",
    "name": "Garden Party",
    "desc": "Your garden reached stage six and the butterflies have officially moved in.",
    "icon": "<svg viewBox='0 0 48 48'><ellipse cx='15' cy='22' rx='9' ry='12' fill='#F58F7C' transform='rotate(-25 15 22)'/><ellipse cx='33' cy='22' rx='9' ry='12' fill='#7EC4E8' transform='rotate(25 33 22)'/><rect x='22' y='10' width='4' height='28' rx='2' fill='#1F4D2E'/></svg>"
  },
  {
    "id": "level-5",
    "name": "Bendy Bean Energy",
    "desc": "Level five unlocked — you are officially a Bendy Bean, and honestly it suits you.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='18' fill='#5BA869'/><path d='M24 11 L27.5 19 L36 20 L30 26 L31.5 34.5 L24 30.3 L16.5 34.5 L18 26 L12 20 L20.5 19 Z' fill='#FFD45C'/></svg>"
  },
  {
    "id": "sessions-25",
    "name": "Twenty-Five Alive",
    "desc": "Twenty-five sessions of showing up for yourself, one unhurried stretch at a time.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M16 4 L32 4 L28 18 L20 18 Z' fill='#7EC4E8'/><circle cx='24' cy='30' r='13' fill='#FFD45C'/><circle cx='24' cy='30' r='7' fill='#FDF9F0'/></svg>"
  },
  {
    "id": "all-durations",
    "name": "The Whole Buffet",
    "desc": "You have tried every session length — short, long, and everything in between.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='6' y='30' width='7' height='12' rx='2' fill='#7EC4E8'/><rect x='15' y='24' width='7' height='18' rx='2' fill='#5BA869'/><rect x='24' y='17' width='7' height='25' rx='2' fill='#FFD45C'/><rect x='33' y='10' width='7' height='32' rx='2' fill='#F58F7C'/></svg>"
  },
  {
    "id": "bridge-toddlers",
    "name": "Bridge Over Troubled Toddlers",
    "desc": "Ten sessions of bridge lifts — calm waters, strong hips, troubled toddlers optional.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='39' cy='9' r='5' fill='#FFD45C'/><path d='M7 34 A17 17 0 0 1 41 34' fill='none' stroke='#1F4D2E' stroke-width='5' stroke-linecap='round'/><path d='M4 41 Q8 37 12 41 T20 41 T28 41 T36 41 T44 41' fill='none' stroke='#7EC4E8' stroke-width='3' stroke-linecap='round'/></svg>"
  },
  {
    "id": "dog-days",
    "name": "Downward Dog Days",
    "desc": "Ten downward dogs done — tail wags and back-of-leg sighs of relief all around.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='10' cy='10' r='5' fill='#FFD45C'/><path d='M9 38 L27 12 L41 38' fill='none' stroke='#5BA869' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/><rect x='4' y='38' width='40' height='4' rx='2' fill='#1F4D2E'/></svg>"
  },
  {
    "id": "first-stillness",
    "name": "First Stillness",
    "desc": "You sat with yourself for one whole meditation. Rest is productive, and so is gentleness.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='20' r='7' fill='#FFD45C'/><path d='M10 40 C10 31 17 27 24 27 C31 27 38 31 38 40 Z' fill='#5BA869'/><path d='M14 40 Q24 35 34 40' fill='none' stroke='#7EC4E8' stroke-width='2.5' stroke-linecap='round'/></svg>"
  },
  {
    "id": "settled-ten",
    "name": "Ten Times Calmer",
    "desc": "Ten meditations done — a quiet practice you keep returning to, on the good days and the hard ones.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='5' fill='#7EC4E8'/><circle cx='24' cy='24' r='11' fill='none' stroke='#5BA869' stroke-width='3' opacity='0.75'/><circle cx='24' cy='24' r='17' fill='none' stroke='#F58F7C' stroke-width='3' opacity='0.5'/></svg>"
  },
  {
    "id": "garden-stage-4",
    "name": "Bud to Bloom",
    "desc": "Your garden opened its first flower — stage four. Look what a little steadiness grew.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M24 42 V22' stroke='#5BA869' stroke-width='4' stroke-linecap='round'/><ellipse cx='16' cy='30' rx='7' ry='3.6' fill='#5BA869' transform='rotate(-25 16 30)'/><circle cx='24' cy='14' r='5' fill='#F58F7C'/><circle cx='18' cy='17' r='5' fill='#F58F7C'/><circle cx='30' cy='17' r='5' fill='#F58F7C'/><circle cx='20.5' cy='10' r='5' fill='#F58F7C'/><circle cx='27.5' cy='10' r='5' fill='#F58F7C'/><circle cx='24' cy='13.5' r='3.6' fill='#FFD45C'/></svg>"
  },
  {
    "id": "garden-stage-8",
    "name": "Garden in Full Glory",
    "desc": "Stage eight — sunflower, arch, and all. Your garden is in its fullest bloom, and you grew every inch of it.",
    "icon": "<svg viewBox='0 0 48 48'><g transform='translate(24 16)' fill='#FFD45C'><ellipse cy='-12' rx='4.5' ry='10'/><ellipse cy='-12' rx='4.5' ry='10' transform='rotate(45)'/><ellipse cy='-12' rx='4.5' ry='10' transform='rotate(90)'/><ellipse cy='-12' rx='4.5' ry='10' transform='rotate(135)'/><ellipse cy='-12' rx='4.5' ry='10' transform='rotate(180)'/><ellipse cy='-12' rx='4.5' ry='10' transform='rotate(225)'/><ellipse cy='-12' rx='4.5' ry='10' transform='rotate(270)'/><ellipse cy='-12' rx='4.5' ry='10' transform='rotate(315)'/></g><circle cx='24' cy='16' r='8' fill='#1F4D2E'/><path d='M24 24 V42' stroke='#5BA869' stroke-width='4' stroke-linecap='round'/><ellipse cx='15' cy='34' rx='7' ry='3.6' fill='#5BA869' transform='rotate(-25 15 34)'/></svg>"
  },
  {
    "id": "streak-14",
    "name": "Two-Week Wonder",
    "desc": "Fourteen days in the chain, grace days and all. You keep coming back, and that is the whole magic.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='10' fill='#FFD45C'/><g stroke='#F58F7C' stroke-width='3' stroke-linecap='round'><path d='M24 6v5'/><path d='M24 37v5'/><path d='M6 24h5'/><path d='M37 24h5'/><path d='M11 11l3.6 3.6'/><path d='M33.4 33.4L37 37'/><path d='M37 11l-3.6 3.6'/><path d='M14.6 33.4L11 37'/></g></svg>"
  },
  {
    "id": "streak-30",
    "name": "Thirty-Day Grove",
    "desc": "A whole month of showing up. One garden became a little grove — rooted, steady, and yours.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='6' y='39' width='36' height='4' rx='2' fill='#1F4D2E'/><g fill='#5BA869'><circle cx='14' cy='28' r='8'/><circle cx='24' cy='21' r='9.5'/><circle cx='34' cy='28' r='8'/></g><g stroke='#2E6B3D' stroke-width='3' stroke-linecap='round'><path d='M14 39v-9'/><path d='M24 39v-13'/><path d='M34 39v-9'/></g></svg>"
  },
  {
    "id": "calm-25",
    "name": "Twenty-Five Stillnesses",
    "desc": "Twenty-five meditations sat through. A quiet practice you keep choosing — gentle, and quietly powerful.",
    "icon": "<svg viewBox='0 0 48 48'><ellipse cx='24' cy='35' rx='15' ry='4' fill='#7EC4E8' opacity='0.6'/><path d='M24 32c-7 0-12-4-12-9 5 0 9 2 12 7 3-5 7-7 12-7 0 5-5 9-12 9z' fill='#9AD9CF'/><path d='M24 30c-2-4-2-8 0-12 2 4 2 8 0 12z' fill='#2F9E8F'/></svg>"
  },
  {
    "id": "calm-50",
    "name": "Fifty Times Calmer",
    "desc": "Fifty meditations. On the bright days and the heavy ones, you kept returning to the quiet. That is devotion.",
    "icon": "<svg viewBox='0 0 48 48'><ellipse cx='24' cy='36' rx='17' ry='4.5' fill='#7EC4E8' opacity='0.6'/><path d='M24 33c-7 0-12-5-12-11 5 0 9 3 12 8 3-5 7-8 12-8 0 6-5 11-12 11z' fill='#9AD9CF'/><path d='M24 31c-3-5-3-10 0-15 3 5 3 10 0 15z' fill='#2F9E8F'/><path d='M13 27c-1-4 0-8 3-11 2 4 1 9-3 11z' fill='#54C2B2'/><path d='M35 27c1-4 0-8-3-11-2 4-1 9 3 11z' fill='#54C2B2'/></svg>"
  },
  {
    "id": "sessions-50",
    "name": "Fifty Blooms",
    "desc": "Fifty sessions in the books. Fifty small choices to care for yourself — and a garden that shows every one.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='6' y='40' width='36' height='4' rx='2' fill='#1F4D2E'/><circle cx='14' cy='24' r='5' fill='#F58F7C'/><circle cx='24' cy='18' r='5.5' fill='#FFD45C'/><circle cx='34' cy='24' r='5' fill='#7EC4E8'/><g stroke='#5BA869' stroke-width='3' stroke-linecap='round'><path d='M14 40V27'/><path d='M24 40V21'/><path d='M34 40V27'/></g></svg>"
  },
  {
    "id": "sessions-100",
    "name": "Hundred-Bloom Garden",
    "desc": "One hundred sessions. This is not a streak or a sprint — it is a practice you have woven into your life.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='21' r='14' fill='#FFD45C' stroke='#F4A300' stroke-width='2'/><path d='M24 12l2.6 5.3 5.8 .8-4.2 4.1 1 5.8L24 25.3 18.8 28l1-5.8-4.2-4.1 5.8-.8z' fill='#fff'/><path d='M15 32l-3 12 12-5 12 5-3-12' fill='#F58F7C'/></svg>"
  },
  {
    "id": "balance-day",
    "name": "Two Pillars in a Day",
    "desc": "In one day you tended two of the three — mind, body, or soul. A lovely, balanced kind of day.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='19' cy='24' r='12' fill='#7B8FE8' opacity='0.85'/><circle cx='29' cy='24' r='12' fill='#5BA869' opacity='0.85'/></svg>"
  },
  {
    "id": "whole-self-day",
    "name": "Mind, Body & Soul",
    "desc": "All three in a single day — a lesson for the mind, movement for the body, and stillness for the soul. The whole you, cared for.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='14' r='9' fill='#7B8FE8'/><circle cx='15' cy='30' r='9' fill='#5BA869'/><circle cx='33' cy='30' r='9' fill='#9B6FD0'/><circle cx='24' cy='24' r='5' fill='#FFD45C'/></svg>"
  },
  {
    "id": "balanced-week",
    "name": "A Well-Rounded Week",
    "desc": "Across one week you touched all three pillars — mind, body, and soul. Balance, not pressure.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='17' fill='none' stroke='#FFD45C' stroke-width='2.5'/><circle cx='24' cy='15' r='6.5' fill='#7B8FE8'/><circle cx='16' cy='29' r='6.5' fill='#5BA869'/><circle cx='32' cy='29' r='6.5' fill='#9B6FD0'/></svg>"
  }
];
