// Versioned localStorage store. Everything lives on the device — nothing
// ever leaves it. Schema migrations keep future updates from wiping progress.

const KEY = 'nrjf.store';
const CURRENT_VERSION = 3;

function defaults() {
  return {
    version: CURRENT_VERSION,
    profile: {
      name: '',
      character: 'jasmine',
      voiceURI: '',
      style: 'gentle',          // gentle | cheerleader | funny
      voiceOn: true,
      naturalOn: false,         // optional in-browser natural voice (beta)
      fullInstructorOn: false,  // optional photoreal instructor (beta)
      sfxOn: true,
      musicOn: false,           // default OFF per iOS autoplay + brief
      musicVol: 0.5,
      seenSafety: false,
      // --- v2 additions (all optional; default-safe) ---
      intake: null,             // see js/data/profiles.js; null => default-safe profile
      guidelineAccepted: false, // user has seen the "exercise guidance, not medical advice" gate
      consultClinicianAck: false,
      defaultTier: 'no_sweat',  // last tier chosen, for sane re-entry
      chairMode: false,         // accessibility: seated/standing-by-chair substitution
      reducedMotion: 'auto',    // auto | on | off (overrides the media query)
    },
    progress: {
      sessions: [],             // { date, mins, durationKey, startHour, breathClose, completed:[], skipped:[], tier, kind }
      totalMins: 0,
      breathCloses: 0,
      durationsTried: [],       // now spans [7,15,20,30,45,60]
      moveCounts: {},           // id -> times completed
      badges: {},               // id -> ISO date earned
      lastCloseId: '',
      // --- v2 additions ---
      tiersTried: [],           // ['no_sweat',...] for future tier badges
      meditationCount: 0,       // meditations completed (garden still +1 each, like movement)
      program: null,            // { id, startedAt, weekIdx, dayIdx } | null — NEVER read by garden/streak/level/badge
      // --- learning module (Mind pillar). Source of truth for every learning
      // subject's lessons/games, keyed by trackId (see js/data/tracks.js). On
      // completion, a track ALSO pushes ONE kind:<trackId> record into sessions[]
      // so the shared garden + streak reflect combined activity — but it never
      // touches totalMins/durationsTried/tiersTried/moveCounts, so minutes-based
      // levels and fitness duration/move badges are safe. The pre-finance
      // progress.finance blob is migrated into learning.money (v2 -> v3 below).
      learning: {
        money:         { lessons: [], lessonsCompleted: 0, gamesWon: 0 }, // lessons: { id, date, sources, game?, won? }
        parenting:     { lessons: [], lessonsCompleted: 0, gamesWon: 0 },
        communication: { lessons: [], lessonsCompleted: 0, gamesWon: 0 },
      },
    },
  };
}

function migrate(data) {
  if (!data || typeof data !== 'object') return defaults();
  if (!data.version || data.version > CURRENT_VERSION) return defaults();
  const base = defaults();
  // Additive, lossless: every new field self-defaults via the spread; existing
  // sessions[], totalMins, badges{}, durationsTried[] carry forward verbatim.
  const out = {
    version: CURRENT_VERSION,
    profile: { ...base.profile, ...(data.profile || {}) },
    progress: { ...base.progress, ...(data.progress || {}) },
  };
  // v1 -> v2: tag old sessions as untiered movement days (never fabricate a tier).
  if ((data.version || 1) < 2) {
    out.progress.sessions = (out.progress.sessions || []).map((s) =>
      ('kind' in s) ? s : { ...s, kind: 'movement', tier: null });
    if (!Array.isArray(out.progress.tiersTried)) out.progress.tiersTried = [];
    if (typeof out.progress.meditationCount !== 'number') out.progress.meditationCount = 0;
    if (out.progress.program === undefined) out.progress.program = null;
  }
  // v2 -> v3: the finance module's progress.finance blob becomes learning.money,
  // losslessly. The additive spread above already carried any legacy field forward,
  // so read it here, then drop it. sessions[] (incl. old kind:'finance' records),
  // badges{}, totalMins, durationsTried, etc. all carry forward verbatim.
  if ((data.version || 1) < 3) {
    if (!out.progress.learning || typeof out.progress.learning !== 'object') {
      out.progress.learning = {
        money:         { lessons: [], lessonsCompleted: 0, gamesWon: 0 },
        parenting:     { lessons: [], lessonsCompleted: 0, gamesWon: 0 },
        communication: { lessons: [], lessonsCompleted: 0, gamesWon: 0 },
      };
    }
    const f = data.progress && data.progress.finance;
    if (f && typeof f === 'object') {
      out.progress.learning.money = {
        lessons: Array.isArray(f.lessons) ? f.lessons : [],
        lessonsCompleted: typeof f.lessonsCompleted === 'number' ? f.lessonsCompleted : 0,
        gamesWon: typeof f.gamesWon === 'number' ? f.gamesWon : 0,
      };
    }
    delete out.progress.finance;
  }
  // Retired-roster remap: the original four coach ids were replaced by the
  // name-driven cast. Map any stored old id to its nearest new coach so the
  // picker still highlights a selection. Idempotent — new ids pass through.
  const remap = { vera: 'jasmine', maya: 'nokeke', amara: 'nokeke', sol: 'aguibou' };
  if (remap[out.profile.character]) out.profile.character = remap[out.profile.character];
  return out;
}

function load() {
  try {
    return migrate(JSON.parse(localStorage.getItem(KEY)));
  } catch {
    return defaults();
  }
}

export const store = load();

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // storage full or private mode — the session still works, it just won't persist
  }
}

export function resetAll() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  const fresh = defaults();
  store.version = fresh.version;
  store.profile = fresh.profile;
  store.progress = fresh.progress;
  save();
}

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
