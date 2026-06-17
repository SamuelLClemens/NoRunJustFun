// A brief, personalized check-in + praise spoken at the START of longer sessions
// (durationKey >= 15) — across workouts, meditations, and lessons. It plays once,
// before any content, and is then followed by the session itself (see main.js, which
// defers player.start() until this finishes).
//
// composeCheckin is PURE and deterministic: given a small context object it returns one
// warm line, or null when no check-in should play. Determinism keeps it testable and
// keeps the greeting from feeling random.
//
// Tone follows the app's anti-compulsion ethos: gentle, present, and proud of the user
// for simply showing up. It NEVER pressures the user to maintain a streak —
// consistency is celebrated here, never demanded.

function activityVerb(kind) {
  if (kind === 'meditation') return 'find a little calm together';
  if (kind === 'movement') return 'move together';
  return 'learn something together'; // any learning track, or a track game
}

export function composeCheckin(ctx = {}) {
  const {
    name = '', streakCount = 0, totalSessions = 0,
    lastDate = '', today = '', hour = 12,
    kind = 'movement', durationKey = 0,
  } = ctx;
  // Only longer sessions get the spoken check-in; short ones begin right away.
  if (!(Number(durationKey) >= 15)) return null;

  const who = name ? `, ${name}` : '';
  const greet = hour < 12 ? 'Good morning' : (hour < 18 ? 'Good afternoon' : 'Good evening');
  const verb = activityVerb(kind);

  // First-ever session: a pure, unpressured welcome — no streak talk.
  if (totalSessions <= 0) {
    return `${greet}${who}. I am really glad you are here. There is nothing to prove and no rush at all — we will take this gently, together. Whenever you are ready, we will ${verb}.`;
  }

  // Praise: the gentlest true thing we can say, never a demand to keep a streak.
  let praise;
  if (streakCount >= 7) {
    praise = 'A whole week of showing up for yourself — that quiet consistency is something to be proud of.';
  } else if (streakCount >= 3) {
    praise = `${streakCount} days in a row now, and gently does it — that is exactly how this works.`;
  } else if (lastDate && today && lastDate === today) {
    praise = 'Back again today — I love that you carved out a little more time for yourself.';
  } else {
    praise = 'It is good to see you again. Choosing to come back matters more than you know.';
  }

  return `${greet}${who}. ${praise} Let us take one slow breath, and when you are ready, we will ${verb}.`;
}
