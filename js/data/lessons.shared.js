// Shared lesson-engine helpers for the learning tracks. The money lessons module
// (js/data/lessons.js) predates this and keeps its own self-contained copy (audited,
// byte-stable). New subjects (parenting, communication) build their player-compatible
// plans here via makeLessonModule(), so the duration-scaling + catalog logic lives in
// one place.
//
// A lesson = { id, title, topic, blurb, yearLabel?, sources:[{org,title,url,year}],
//   segments:[{ id, name, secs, say, core? }] }. Lessons reuse the meditation playback
// path (quiet, segment-by-segment) by setting isMeditation:true on the plan; kind:
// <trackId> is what the Player/engine records so each subject is attributed correctly.

export const segDur = (s) => Math.max(5, Math.round(s.secs || 10));
export const lessonSecs = (segs) => segs.reduce((t, s) => t + segDur(s), 0);

export function dedupeSources(list) {
  const seen = new Set();
  const out = [];
  for (const s of list || []) {
    const k = (s && s.url) || JSON.stringify(s);
    if (!seen.has(k)) { seen.add(k); out.push(s); }
  }
  return out;
}

// The spoken "before we begin" disclaimer segment, prepended to a single catalog
// lesson so the disclaimer is heard every time (a duration-scaled session hears it
// via the welcome instead). idPrefix namespaces the segment id (e.g. 'par').
export function makeDisclaimerSeg(idPrefix, say) {
  return { id: idPrefix + '-disclaimer', name: 'Before we begin', secs: 14, core: true, say };
}

function planFromSegments(segs, meta, kind) {
  const items = segs.map((s) => ({
    ex: { id: s.id, name: s.name, why: s.say, cues: [], sided: false, secs: segDur(s) },
    secs: segDur(s), block: 'lesson',
  }));
  const totalSecs = items.reduce((t, i) => t + i.secs, 0);
  return {
    items, totalSecs,
    durationKey: meta.durationKey,
    closeId: items.length ? items[items.length - 1].ex.id : '',
    // reuse the Player's quiet, segment-by-segment narration (same as meditation);
    // kind:<trackId> is what the engine records, so a lesson is never a meditation.
    isMeditation: true,
    isLesson: true,
    kind,
    lessonIds: meta.lessonIds,
    lessonTitles: meta.lessonTitles,
    takeawayGroups: meta.takeawayGroups || [],
    sources: meta.sources,
    title: meta.title,
  };
}

// Build a track's catalog library + its two player-compatible plan builders from its
// lessons map. config = { LESSONS, CURRICULUM, welcomeId, disclaimerSeg, sessionTitle,
// kind }. Mirrors the money builders in js/data/lessons.js.
export function makeLessonModule({ LESSONS, CURRICULUM, welcomeId, disclaimerSeg, sessionTitle, kind }) {
  const LESSON_LIBRARY = CURRICULUM
    .filter((id) => LESSONS[id])
    .map((id) => {
      const L = LESSONS[id];
      const segs = [disclaimerSeg, ...L.segments];
      return { id, title: L.title, blurb: L.blurb, minutes: Math.max(1, Math.round(lessonSecs(segs) / 60)), sourceCount: (L.sources || []).length };
    });

  // A specific catalog lesson by id, at its natural length, opened by the spoken
  // disclaimer. The welcome is intro-only (used inside buildLessonSession), so it
  // resolves to null and the route falls back to the hub.
  function buildLessonById(id) {
    const L = LESSONS[id];
    if (!L || id === welcomeId) return null;
    const segs = [disclaimerSeg, ...L.segments];
    return planFromSegments(segs, {
      durationKey: Math.max(1, Math.round(lessonSecs(segs) / 60)),
      lessonIds: [id],
      lessonTitles: [L.title],
      takeawayGroups: (L.takeaways && L.takeaways.length) ? [{ title: L.title, points: L.takeaways }] : [],
      sources: dedupeSources(L.sources || []),
      title: L.title,
    }, kind);
  }

  // A duration-scaled study session: open with the welcome framing (which carries
  // its own disclaimer), then chain curriculum lessons until the chosen length is
  // filled. Short picks take each lesson's CORE essentials; >= 15 min go to full
  // depth. Content is finite, so it never pads with filler.
  function buildLessonSession(durationMins) {
    const budget = durationMins * 60;
    const wantDepth = durationMins >= 15;
    const order = (welcomeId && LESSONS[welcomeId] ? [welcomeId] : []).concat(CURRICULUM.filter((id) => LESSONS[id]));
    const segs = [];
    const lessonIds = [];
    const lessonTitles = [];
    const takeawayGroups = [];
    let sources = [];
    let used = 0;

    const add = (id, chosen) => {
      segs.push(...chosen);
      used += chosen.reduce((t, s) => t + segDur(s), 0);
      if (id !== welcomeId) {
        const L = LESSONS[id];
        lessonIds.push(id);
        lessonTitles.push(L.title);
        sources = sources.concat(L.sources || []);
        if (L.takeaways && L.takeaways.length) takeawayGroups.push({ title: L.title, points: L.takeaways });
      }
    };

    for (const id of order) {
      const L = LESSONS[id];
      const core = L.segments.filter((s) => s.core !== false);
      const full = L.segments;
      const chosen = wantDepth ? full : core;
      const cost = chosen.reduce((t, s) => t + segDur(s), 0);
      if (!segs.length || used + cost <= budget) { add(id, chosen); continue; }
      const coreCost = core.reduce((t, s) => t + segDur(s), 0);
      if (used + coreCost <= budget) { add(id, core); }
    }

    return planFromSegments(segs, {
      durationKey: durationMins,
      lessonIds,
      lessonTitles,
      takeawayGroups,
      sources: dedupeSources(sources),
      title: sessionTitle,
    }, kind);
  }

  return { LESSON_LIBRARY, buildLessonById, buildLessonSession };
}
