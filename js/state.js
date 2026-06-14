// Versioned localStorage store. Everything lives on the device — nothing
// ever leaves it. Schema migrations keep future updates from wiping progress.

const KEY = 'nrjf.store';
const CURRENT_VERSION = 2;

function defaults() {
  return {
    version: CURRENT_VERSION,
    profile: {
      name: '',
      character: 'vera',
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
