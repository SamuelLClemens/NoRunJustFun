// Communication / Nonviolent Communication badges (Mind track) — a DISTINCT set:
// calm teal speech-bubbles, set apart from the finance gold/periwinkle, the coral
// parenting set, and the green fitness badges. Same { id, name, desc, icon } shape;
// category:'communication' drives the teal accent; every id is 'com-' namespaced so
// it can never collide in the shared progress.badges{} ledger.
export const COMMUNICATION_BADGES = [
  {
    "id": "com-first-lesson",
    "category": "communication",
    "name": "First Honest Word",
    "desc": "You finished your first Nonviolent Communication lesson. Connection begins with one honest, careful sentence.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='23' r='15' fill='none' stroke='#2F9E8F' stroke-width='2.5'/><path d='M14 17h20a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H22l-6 5v-5h-2a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3z' fill='#54C2B2'/><circle cx='19' cy='23.5' r='1.8' fill='#fff'/><circle cx='24' cy='23.5' r='1.8' fill='#fff'/><circle cx='29' cy='23.5' r='1.8' fill='#fff'/></svg>"
  },
  {
    "id": "com-three",
    "category": "communication",
    "name": "Finding the Words",
    "desc": "Three lessons in. Observations, feelings, needs — the words are starting to come more easily now.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M9 14h18a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H17l-5 4v-4H9a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3z' fill='#9AD9CF'/><path d='M24 22h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3v4l-5-4h-8a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3z' fill='#2F9E8F'/></svg>"
  },
  {
    "id": "com-seven",
    "category": "communication",
    "name": "Fluent in Connection",
    "desc": "Seven lessons done. You can hear the need beneath the words now — yours and other people's.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='16' fill='none' stroke='#2F9E8F' stroke-width='2'/><circle cx='16' cy='20' r='5.5' fill='#54C2B2'/><circle cx='32' cy='20' r='5.5' fill='#54C2B2'/><path d='M16 26c0 5 3.5 9 8 9s8-4 8-9' fill='none' stroke='#2F9E8F' stroke-width='2.5' stroke-linecap='round'/><circle cx='24' cy='30' r='3' fill='#FFD45C'/></svg>"
  },
  {
    "id": "com-streak-3",
    "category": "communication",
    "name": "Daily Practice",
    "desc": "Practicing connection, day after day. Like any language, this one grows with gentle, repeated use.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='8' y='30' width='9' height='10' rx='2' fill='#9AD9CF'/><rect x='19' y='23' width='9' height='17' rx='2' fill='#54C2B2'/><rect x='30' y='15' width='9' height='25' rx='2' fill='#2F9E8F'/><circle cx='34.5' cy='9' r='4' fill='#FFD45C'/></svg>"
  },
  {
    "id": "com-observer",
    "category": "communication",
    "name": "Clear Eyes",
    "desc": "You can tell an observation from a judgement now — what a camera would catch, before the story we add.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='15' fill='#E4F4F1' stroke='#2F9E8F' stroke-width='2'/><path d='M11 24c3-6 9-9 13-9s10 3 13 9c-3 6-9 9-13 9s-10-3-13-9z' fill='#fff' stroke='#2F9E8F' stroke-width='2'/><circle cx='24' cy='24' r='4.5' fill='#2F9E8F'/></svg>"
  },
  {
    "id": "com-feeler",
    "category": "communication",
    "name": "Named It",
    "desc": "You learned to tell a real feeling from a thought in disguise — and that naming a feeling can calm it.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M12 12h24a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H22l-7 6v-6h-3a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3z' fill='#54C2B2'/><path d='M24 28c-5-3.5-7.5-6.6-5-9.5 1.7-2 4.8-1 5 1.5 .2-2.5 3.3-3.5 5-1.5 2.5 2.9 0 6-5 9.5z' fill='#fff'/></svg>"
  },
  {
    "id": "com-empath",
    "category": "communication",
    "name": "Deep Listener",
    "desc": "You practiced empathy and self-empathy — and learned the firm boundary: this is not for danger, where safety comes first.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M30 11c-7 0-12 5-12 11 0 3 1.4 5.6 3.6 7.5L20 36l7-3.2c.9 .2 2 .2 3 .2 7 0 12-5 12-11S37 11 30 11z' fill='#2F9E8F'/><path d='M14 22c-3 0-5 2-5 4.6 0 1.4 .7 2.7 1.8 3.6L10 34l3.6-1.6' fill='none' stroke='#54C2B2' stroke-width='2.5' stroke-linejoin='round'/><circle cx='26' cy='22' r='1.8' fill='#fff'/><circle cx='31' cy='22' r='1.8' fill='#fff'/><circle cx='36' cy='22' r='1.8' fill='#fff'/></svg>"
  },
  {
    "id": "com-gamer",
    "category": "communication",
    "name": "Word Player",
    "desc": "You won your first communication game. Spotting observations, feelings, and requests gets easier with play.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='8' y='16' width='32' height='20' rx='9' fill='#54C2B2' stroke='#2F9E8F' stroke-width='2'/><path d='M14 26h6M17 23v6' stroke='#fff' stroke-width='2' stroke-linecap='round'/><circle cx='31' cy='23' r='2.3' fill='#fff'/><circle cx='35' cy='29' r='2.3' fill='#1F6E63'/></svg>"
  },
  {
    "id": "com-sharp",
    "category": "communication",
    "name": "Clear Speaker",
    "desc": "Five communication games won. Observations over evaluations, requests over demands — it is becoming natural.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M9 12h26a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H19l-8 7v-7a3 3 0 0 1-2-3V15a3 3 0 0 1 3-3z' fill='#54C2B2' stroke='#2F9E8F' stroke-width='2' stroke-linejoin='round'/><path d='M16 27l5-12 4 8 3-5 4 9' fill='none' stroke='#fff' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/></svg>"
  },
  {
    "id": "com-streak-7",
    "category": "communication",
    "name": "A Week of Connection",
    "desc": "Seven days of practicing connection, in a row. Like any language, this one deepens with daily, gentle use.",
    "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='10' fill='#54C2B2' stroke='#2F9E8F' stroke-width='2'/><text x='24' y='28' text-anchor='middle' font-family='Fredoka, system-ui' font-weight='700' font-size='11' fill='#fff'>7</text><g stroke='#2F9E8F' stroke-width='2.5' stroke-linecap='round'><path d='M24 8v4'/><path d='M24 36v4'/><path d='M8 24h4'/><path d='M36 24h4'/></g></svg>"
  },
  {
    "id": "com-peacemaker",
    "category": "communication",
    "name": "Peacemaker",
    "desc": "You learned to stay connected in conflict and sidestep the patterns that pull people apart. Steady, not combative.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M10 31c8 2 15-2 21-11 2 6-1 14-9 17-4 1.6-9 1-12-6z' fill='#54C2B2'/><path d='M31 20q5-4 9-2-3 1-4 4' fill='none' stroke='#2F9E8F' stroke-width='2.5' stroke-linecap='round'/><path d='M14 35q3 2 7 1' fill='none' stroke='#5BA869' stroke-width='2.5' stroke-linecap='round'/><circle cx='12' cy='30' r='2' fill='#2F9E8F'/></svg>"
  },
  {
    "id": "com-scholar",
    "category": "communication",
    "name": "Connection Scholar",
    "desc": "Every communication lesson, finished. Observations, feelings, needs, requests — the whole framework, walked with care.",
    "icon": "<svg viewBox='0 0 48 48'><rect x='9' y='14' width='9' height='26' rx='2' fill='#54C2B2' stroke='#2F9E8F' stroke-width='2'/><rect x='20' y='11' width='9' height='29' rx='2' fill='#E4F4F1' stroke='#2F9E8F' stroke-width='2'/><rect x='31' y='16' width='9' height='24' rx='2' fill='#54C2B2' stroke='#2F9E8F' stroke-width='2'/><path d='M22 18h5M22 22h5' stroke='#2F9E8F' stroke-width='1.6' stroke-linecap='round'/></svg>"
  },
  {
    "id": "com-master",
    "category": "communication",
    "name": "Connection Master",
    "desc": "All lessons done, a perfect quiz, and a game won. Honest, caring communication is becoming second nature.",
    "icon": "<svg viewBox='0 0 48 48'><path d='M14 10h20v6a10 10 0 0 1-20 0z' fill='#54C2B2' stroke='#2F9E8F' stroke-width='2'/><path d='M14 12H9a5 5 0 0 0 5 6M34 12h5a5 5 0 0 1-5 6' fill='none' stroke='#2F9E8F' stroke-width='2'/><rect x='21' y='26' width='6' height='7' fill='#2F9E8F'/><rect x='15' y='33' width='18' height='5' rx='2' fill='#2F9E8F'/><circle cx='20' cy='15' r='1.6' fill='#fff'/><circle cx='24' cy='15' r='1.6' fill='#fff'/><circle cx='28' cy='15' r='1.6' fill='#fff'/></svg>"
  }
];
