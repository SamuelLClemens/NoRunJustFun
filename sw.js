// Offline support: precache the whole app on install, serve cache-first.
// Bump CACHE_VERSION with every release so updates roll out cleanly.

const CACHE_VERSION = 'ygt-v4.31.0';

const PRECACHE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/style.css',
  'lib/three.module.min.js',
  'lib/fonts/fredoka-latin-var.woff2',
  'lib/fonts/nunito-latin-var.woff2',
  // Photoreal-coach (opt-in beta) loaders — small, so they ride in the atomic
  // addAll(); the ~1.9 MB model itself is warmed best-effort in install below.
  'lib/jsm/loaders/GLTFLoader.js',
  'lib/jsm/utils/BufferGeometryUtils.js',
  'lib/jsm/environments/RoomEnvironment.js',
  'js/main.js',
  'js/state.js',
  'js/characters.js',
  'js/tts.js',
  'js/natural-voice.js',
  'js/checkin.js',
  'js/audio.js',
  'js/sessionEngine.js',
  'js/gamify.js',
  'js/player.js',
  'js/avatar.js',
  'js/realistic-avatar.js',
  'js/confetti.js',
  'js/dev.js',
  'js/learning.js',
  'js/learning-screen.js',
  'js/usage-graph.js',
  'js/idb.js',
  'js/journal.js',
  'js/journal-screen.js',
  'js/help-screens.js',
  'js/meals.js',
  'js/cycle.js',
  'js/intimacy.js',
  'js/intimacy-screen.js',
  'js/stt.js',
  'js/stt-worker.js',
  'js/data/tracks.js',
  'js/data/lessons.shared.js',
  'js/data/lesson-variants.js',
  'js/data/lessons.parenting.js',
  'js/data/lessons.parenting.ext.js',
  'js/data/lessons.communication.js',
  'js/data/lessons.communication.ext.js',
  'js/data/lessons.memory.js',
  'js/data/badges.parenting.js',
  'js/data/badges.communication.js',
  'js/data/badges.memory.js',
  'js/data/games.shared.js',
  'js/data/games.memory.js',
  'js/data/games.memory.concept.js',
  'js/data/games.money.js',
  'js/data/games.parenting.js',
  'js/data/games.communication.js',
  'js/data/learn-extras.js',
  'js/data/exercises.js',
  'js/data/phrases.js',
  'js/data/badges.js',
  'js/data/garden.js',
  'js/data/poses.js',
  'js/data/movements-ext.js',
  'js/data/movements-ext2.js',
  'js/data/movements-ext3.js',
  'js/data/tiers.js',
  'js/data/meditation.js',
  'js/data/profiles.js',
  'js/data/programs.js',
  'js/data/badges.finance.js',
  'js/data/lessons.js',
  'js/data/lessons.money.ext.js',
  // Soul sections (belief-flagged learning tracks)
  'js/data/lessons.crystals.js',
  'js/data/lessons.dreams.js',
  'js/data/badges.crystals.js',
  'js/data/badges.dreams.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png',
  'icons/maskable-512.png',
  'icons/favicon-48.png',
  'icons/favicon-32.png',
  'icons/favicon-16.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then((c) =>
      // Atomic: every PRECACHE path must resolve or the whole install fails.
      c.addAll(PRECACHE).then(() =>
        // Warm the large photoreal-coach model separately, as a best-effort add,
        // so the opt-in coach works offline — its failure must never reject the
        // atomic addAll() above (a missing/oversize GLB should not break install).
        c.add('models/vera.glb').catch(() => {}),
      ),
    ).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => {
        if (req.mode === 'navigate') return caches.match('index.html');
        throw new Error('offline and uncached: ' + req.url);
      });
    }),
  );
});
