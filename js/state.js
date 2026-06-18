// Versioned localStorage store. Everything lives on the device — nothing
// ever leaves it. Schema migrations keep future updates from wiping progress.

const KEY = 'nrjf.store';
const CURRENT_VERSION = 8;

function defaults() {
  return {
    version: CURRENT_VERSION,
    profile: {
      name: '',
      character: 'jasmine',
      voiceURI: '',
      style: 'gentle',          // gentle | cheerleader | funny
      voiceOn: true,
      naturalOn: false,         // is the in-browser natural (lifelike) voice currently active
                                // (flips true once the model loads — see maybeAutoEnableNaturalVoice)
      voicePref: 'on',          // 'auto' | 'on' | 'off'. DEFAULT 'on': the lifelike on-device
                                // voice loads in the background on capable devices (system voice
                                // covers until ready; Data-Saver / 2g / slow devices stay on the
                                // system voice). 'off' is an explicit opt-out.
      theme: 'light',           // 'light' | 'dark' — toggled by the moon/sun control (on-device)
      fullInstructorOn: true,   // realistic 3D coach ON by default — device-gated
                                // (realisticInstructorSupported) so weak devices fall back to
                                // the light coach, and the perf watchdog demotes if it runs slow
      sfxOn: true,
      sfxVol: 0.7,              // chime/sfx volume 0..1 (user-controllable)
      musicOn: false,           // default OFF per iOS autoplay + brief
      musicVol: 0.5,
      seenSafety: false,
      // --- v2 additions (all optional; default-safe) ---
      intake: null,             // see js/data/profiles.js; null => default-safe profile
      guidelineAccepted: false, // user has seen the "exercise guidance, not medical advice" gate
      consultClinicianAck: false,
      chairMode: false,         // accessibility: seated/standing-by-chair substitution
      reducedMotion: 'auto',    // auto | on | off (overrides the media query)
      // --- v4 additions (dashboard; all on-device only, never transmitted) ---
      birthday: '',             // ISO 'YYYY-MM-DD' | '' (not set) — used for age + birthday party
      weightUnit: 'lb',         // 'lb' | 'kg'
      lastBirthdayParty: '',    // year (e.g. '2026') the birthday party was last shown, so it shows once
      // --- v7 addition: the day this person started using the app. Brand-new stores stamp
      // today; existing stores backfill from their earliest activity (see migrate v6->v7).
      // Surfaced as an annual 🎉 anniversary marker on the personal calendar. On-device only.
      startedAt: todayKey(),    // ISO 'YYYY-MM-DD' — first-use date (app anniversary)
      lastAnniversaryParty: '', // year (e.g. '2026') the anniversary party was last shown, so it shows once
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
      weights: [],              // v4: { date:'YYYY-MM-DD', value:number } — on-device weight log (dashboard)
      // --- learning module (Mind pillar). Source of truth for every learning
      // subject's lessons/games, keyed by trackId (see js/data/tracks.js). On
      // completion, a track ALSO pushes ONE kind:<trackId> record into sessions[]
      // so the shared garden + streak reflect combined activity — but it never
      // touches totalMins/durationsTried/tiersTried/moveCounts, so minutes-based
      // levels and fitness duration/move badges are safe. The pre-finance
      // progress.finance blob is migrated into learning.money (v2 -> v3 below).
      learning: {
        // lessons[]: { id, date, sources?, game?, won?, quiz?, score? }; quizBest = best quiz % (0-100);
        // completedAt = ISO date the subject first hit 100% on its quiz (null until then).
        money:         { lessons: [], lessonsCompleted: 0, gamesWon: 0, quizBest: 0, completedAt: null },
        parenting:     { lessons: [], lessonsCompleted: 0, gamesWon: 0, quizBest: 0, completedAt: null },
        communication: { lessons: [], lessonsCompleted: 0, gamesWon: 0, quizBest: 0, completedAt: null },
        memory:        { lessons: [], lessonsCompleted: 0, gamesWon: 0, quizBest: 0, completedAt: null },
      },
      // --- v5 additions (You-page personal ledgers; all on-device only, never
      // transmitted). Each is its OWN ledger, deliberately OUTSIDE sessions[]: the
      // garden (gardenStage on sessions.length) and streak (streakInfo on the set of
      // sessions[].date) must never grow from journaling, meals, or cycle logging.
      // This mirrors weights[] above — a personal log that never feeds garden/streak.
      journal: [],              // { id, ts(ISO datetime), kind:'text'|'voice', text, audioKey?, durationSec?, prompt? } — audio blobs live in IndexedDB (js/idb.js), keyed by audioKey
      meals: [],                // { id, ts(ISO datetime), note } — gentle timestamped notes; no calories/macros/targets/streak
      cycle: { enabled: false, periods: [], symptoms: [], avgCycleLen: null }, // opt-in (default OFF) menstrual log; descriptive only, never a medical/fertility prediction
      // --- v6 addition: opt-in (default OFF) intimacy log. Its OWN ledger, like cycle —
      // never touches sessions[]/garden/streak. Private, descriptive, non-judgmental; it
      // is NOT medical, fertility, or contraception guidance. entries[]:
      // { id, ts(ISO), date('YYYY-MM-DD'), count(int>=0), orgasms(int>=0), desire(0-10|null), note }
      intimacy: { enabled: false, entries: [] },
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
        money:         { lessons: [], lessonsCompleted: 0, gamesWon: 0, quizBest: 0, completedAt: null },
        parenting:     { lessons: [], lessonsCompleted: 0, gamesWon: 0, quizBest: 0, completedAt: null },
        communication: { lessons: [], lessonsCompleted: 0, gamesWon: 0, quizBest: 0, completedAt: null },
        memory:        { lessons: [], lessonsCompleted: 0, gamesWon: 0, quizBest: 0, completedAt: null },
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
  // v3 -> v4: dashboard additions. New top-level fields (profile.birthday/weightUnit/
  // lastBirthdayParty, progress.weights) self-default via the spread above; the shallow
  // spread replaces the whole learning object with the old one, so backfill the new
  // per-track completion fields here. All on-device only — nothing is ever transmitted.
  if ((data.version || 1) < 4) {
    if (!Array.isArray(out.progress.weights)) out.progress.weights = [];
    if (typeof out.profile.birthday !== 'string') out.profile.birthday = '';
    if (typeof out.profile.weightUnit !== 'string') out.profile.weightUnit = 'lb';
    if (typeof out.profile.lastBirthdayParty !== 'string') out.profile.lastBirthdayParty = '';
    const L = out.progress.learning || {};
    for (const k of Object.keys(L)) {
      const t = L[k];
      if (t && typeof t === 'object') {
        if (typeof t.quizBest !== 'number') t.quizBest = 0;
        if (!('completedAt' in t)) t.completedAt = null;
      }
    }
  }
  // v4 -> v5: You-page personal ledgers. progress.journal[]/meals[] are new arrays
  // that self-default via the spread; progress.cycle is a NESTED object, so backfill
  // it (and its fields) explicitly — the shallow progress spread takes a stored parent
  // wholesale, so a new nested field would otherwise be missing (same caveat as the
  // learning backfill above). None of these ever touch sessions[]/garden/streak.
  if ((data.version || 1) < 5) {
    if (!Array.isArray(out.progress.journal)) out.progress.journal = [];
    if (!Array.isArray(out.progress.meals)) out.progress.meals = [];
    const c = out.progress.cycle;
    if (!c || typeof c !== 'object' || Array.isArray(c)) {
      out.progress.cycle = { enabled: false, periods: [], symptoms: [], avgCycleLen: null };
    } else {
      if (typeof c.enabled !== 'boolean') c.enabled = false;
      if (!Array.isArray(c.periods)) c.periods = [];
      if (!Array.isArray(c.symptoms)) c.symptoms = [];
      if (!('avgCycleLen' in c)) c.avgCycleLen = null;
    }
  }
  // v5 -> v6: opt-in intimacy log. progress.intimacy is a NESTED object, so backfill it
  // explicitly (the shallow progress spread takes a stored parent wholesale). Default OFF.
  // Never touches sessions[]/garden/streak — same isolation guarantee as cycle above.
  if ((data.version || 1) < 6) {
    const it = out.progress.intimacy;
    if (!it || typeof it !== 'object' || Array.isArray(it)) {
      out.progress.intimacy = { enabled: false, entries: [] };
    } else {
      if (typeof it.enabled !== 'boolean') it.enabled = false;
      if (!Array.isArray(it.entries)) it.entries = [];
    }
  }
  // v6 -> v7: app-anniversary date. profile.startedAt self-defaults to today via the spread,
  // but that would be wrong for an EXISTING user (they started long ago). So when the stored
  // profile has no startedAt, backfill it from the earliest evidence we have — the oldest
  // session/journal/meal/weight date — falling back to today only if there is no history.
  if ((data.version || 1) < 7) {
    if (!(data.profile && data.profile.startedAt)) {
      let earliest = '';
      const consider = (v) => {
        if (!v || typeof v !== 'string' || v.length < 10) return;
        const d = v.slice(0, 10);
        if (!earliest || d < earliest) earliest = d;
      };
      (out.progress.sessions || []).forEach((s) => consider(s && s.date));
      (out.progress.journal || []).forEach((j) => consider(j && j.ts));
      (out.progress.meals || []).forEach((m) => consider(m && m.ts));
      (out.progress.weights || []).forEach((w) => consider(w && w.date));
      out.profile.startedAt = earliest || todayKey();
    }
  }
  // v7 -> v8: the lifelike voice is now ON by default. The old 'auto' value never actually
  // auto-loaded (opt-in only), so promote legacy 'auto' to 'on' to realize that intent;
  // an explicit 'off' is preserved. profile.theme / profile.sfxVol are new and self-default
  // via the spread above. None of this transmits anything — the voice runs on-device.
  if ((data.version || 1) < 8) {
    if (out.profile.voicePref === 'auto' || out.profile.voicePref == null) out.profile.voicePref = 'on';
    if (typeof out.profile.theme !== 'string') out.profile.theme = 'light';
    if (typeof out.profile.sfxVol !== 'number') out.profile.sfxVol = 0.7;
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

// Authoritative reduced-motion check for JS-driven animation (confetti, avatar
// breathing) that CSS media queries cannot reach. The in-app setting wins when it
// is 'on' or 'off'; 'auto' (the default) defers to the OS prefers-reduced-motion
// query — so a user who picks "Reduce motion" in Settings is honored even with no
// OS preference set. Keep this in sync with applyMotionPref()/CSS in main.js.
export function prefersReducedMotion() {
  const pref = store.profile && store.profile.reducedMotion;
  if (pref === 'on') return true;
  if (pref === 'off') return false;
  return !!(typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
