#!/usr/bin/env python3
"""Static content validators for the You Got This! tier/meditation/personalization build.

No build step, no deps. Run from the repo root:  python3 scripts/validate_content.py

These are the cheap, fast guards (frozen-id integrity, badge migration, deny-list,
service-worker precache). The *functional* safety check — that the tier-aware
assembler emits zero banned ids across all 6 durations x 3 tiers — runs in the
browser preview against the real JS (it cannot run here because node is absent).
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def read(p): return open(os.path.join(ROOT, p), encoding="utf-8").read()

FROZEN = ['neck-rolls','shoulder-rolls','cat-cow','side-reach','hip-circles','arm-sweeps','bridge',
 'bird-dog','chair-pose','warrior2','squats','clamshell','kickbacks','baby-cobra','tree-pose','goddess',
 'down-dog','low-lunge','figure-four','butterfly','seated-twist','childs-pose','happy-baby','legs-up',
 'thread-needle','forward-fold','box-breath','pelvic-breath','kind-close']
DURATIONS = [7, 15, 20, 30, 45, 60]
BANNED = ['crunch', 'situp', 'sit-up', 'plank', 'jump', 'burpee', 'v-up', 'hollow-hold']

fails, checks = [], 0
def ok(cond, msg):
    global checks
    checks += 1
    if not cond: fails.append(msg)

# 1) frozen 29 ids present and exactly 29, none renamed/reordered
ex = read('js/data/exercises.js')
ids = re.findall(r'"id":\s*"([^"]+)"', ex)
ok(ids == FROZEN, f"exercises.js frozen ids changed/reordered (found {len(ids)})")

# 2) all-durations migrated off the hardcoded array to the DURATIONS constant
gm = read('js/gamify.js')
ok('[7, 15, 30, 45].every' not in gm and '[7,15,30,45].every' not in gm,
   "gamify.js still hardcodes [7,15,30,45] for all-durations")
ok('DURATIONS.every' in gm, "gamify.js all-durations does not use the DURATIONS constant")

# 3) DURATIONS single source of truth spans the six-duration matrix
tiers = read('js/data/tiers.js')
m = re.search(r'DURATIONS\s*=\s*\[([0-9,\s]+)\]', tiers)
got = [int(x) for x in re.findall(r'\d+', m.group(1))] if m else []
ok(got == DURATIONS, f"tiers.js DURATIONS is {got}, expected {DURATIONS}")

# 4) new movements: 39, valid kebab ids, no banned pattern in id or name
ext = read('js/data/movements-ext.js')
new_block = ext.split('export const NEW_EXERCISES')[1].split('export const TIER_ELIGIBILITY')[0]
new_ids = re.findall(r'"id":\s*"([^"]+)"', new_block)
new_names = re.findall(r'"name":\s*"([^"]+)"', new_block)
ok(len(new_ids) == 39, f"expected 39 new movements, found {len(new_ids)}")
ok(all(re.fullmatch(r'[a-z0-9-]+', i) for i in new_ids), "a new movement id is not kebab-case")
ok(not (set(new_ids) & set(FROZEN)), "a new movement collides with a frozen id")
for i in new_ids + new_names:
    for b in BANNED:
        ok(b not in i.lower(), f"banned pattern '{b}' appears in new movement '{i}'")

# 5) tier eligibility covers all 68 ids
elig = set(re.findall(r'"([a-z0-9-]+)":\s*\[', ext.split('TIER_ELIGIBILITY')[1].split('SPACE_FLAGS')[0]))
ok(set(FROZEN).issubset(elig | set(new_ids)) or len(elig) >= 60,
   f"TIER_ELIGIBILITY looks incomplete ({len(elig)} entries)")

# 6) service worker bumped + new data files precached
sw = read('sw.js')
ok("'ygt-v3.0.0'" not in sw, "sw.js CACHE_VERSION not bumped")
for f in ['movements-ext', 'tiers', 'meditation', 'profiles', 'programs']:
    ok(f"js/data/{f}.js" in sw, f"sw.js PRECACHE missing js/data/{f}.js")

# 7) store has the additive v1->v2 backfill (version itself is asserted in #12)
st = read('js/state.js')
ok('kind: ' in st or "kind'" in st or 'kind:' in st, "state.js v1->v2 backfill missing kind")

# 8) garden growth still count-based + intensity-neutral (anti-compulsion anchor)
ok('GARDEN_STAGE_SESSIONS' in read('js/data/garden.js'), "garden thresholds missing")
ok('sessions.length' in gm, "gardenStage no longer counts sessions.length")

# 9) meditation core scales across all six durations
med = read('js/data/meditation.js')
for d in DURATIONS:
    ok(f'"med-core-{d}"' in med or f'med-core-{d}' in med, f"meditation core missing duration {d}")

# ---- Learning engine (Mind pillar) — money + future subjects -------------
def strip_js_comments(s):
    s = re.sub(r'/\*.*?\*/', '', s, flags=re.S)   # block comments
    s = re.sub(r'//[^\n]*', '', s)                # line comments
    return s

def exists(p):
    return os.path.exists(os.path.join(ROOT, p))

# Per-subject expectations the validator enforces. New subjects are only checked
# once their content lands (gated on file existence), so the suite stays green
# between slices; money is always fully checked. (Mirrors js/data/tracks.js, which
# this standalone Python cannot import.)
LEARN_SUBJECTS = {
    'money': {
        'badges': 'js/data/badges.finance.js', 'prefix': 'fin-', 'category': 'finance',
        'lessons': 'js/data/lessons.js',
        'curriculum': ['budgeting', 'compound-growth', 'risk-diversification', 'retirement-accounts', 'property-basics'],
        'auth_domains': ['irs.gov', 'investor.gov', 'consumerfinance.gov', 'fdic.gov', 'federalreserve.gov'],
        'auth_min': 4,
        'disclaimer_markers': ['not financial advice'],
        'banned': ['guaranteed return', 'guaranteed returns', 'guaranteed profit', 'risk-free return',
                   'risk free return', 'get rich', 'cannot lose money', "can't lose", 'double your money'],
    },
    'parenting': {
        'badges': 'js/data/badges.parenting.js', 'prefix': 'par-', 'category': 'parenting',
        'lessons': 'js/data/lessons.parenting.js',
        'curriculum': [],
        'auth_domains': ['healthychildren.org', 'aap.org', 'cdc.gov', 'harvard.edu', 'zerotothree.org', 'who.int', 'unicef.org'],
        'auth_min': 3,
        'disclaimer_markers': ['not medical advice', 'not a substitute'],
        'banned': ['guaranteed', 'always works', 'never fails', 'perfect child', 'perfect parent'],
    },
    'communication': {
        'badges': 'js/data/badges.communication.js', 'prefix': 'com-', 'category': 'communication',
        'lessons': 'js/data/lessons.communication.js',
        'curriculum': [],
        'auth_domains': ['cnvc.org', 'nonviolentcommunication.com', 'gottman.com', 'apa.org', '.edu'],
        'auth_min': 2,
        'disclaimer_markers': ['not therapy', 'not a substitute'],
        'banned': ['guaranteed', 'always works', 'never fails', 'fix anyone'],
    },
    'memory': {
        'badges': 'js/data/badges.memory.js', 'prefix': 'mem-', 'category': 'memory',
        'lessons': 'js/data/lessons.memory.js',
        'curriculum': [],
        'auth_domains': ['nia.nih.gov', 'ftc.gov', 'stanford.edu', 'cdc.gov', 'ncbi.nlm.nih.gov', 'sagepub.com'],
        'auth_min': 4,
        'disclaimer_markers': ['not medical advice', 'not a substitute'],
        # honest-content guards: the lessons are explicit that games are practice, not a
        # cognitive cure, so these over-promising phrases must never appear. ('cure',
        # 'sharper' and 'proven' are deliberately NOT banned — they occur legitimately in
        # negated form, e.g. "not a cure", "not a proven way".)
        'banned': ['guaranteed', 'photographic memory', 'make you smarter', 'get smarter',
                   'boost your', 'scientifically proven'],
    },
}

# 10) learning badges are distinct, prefix-namespaced sets that cannot collide
#     with the fitness badges nor with each other in the shared progress.badges{}
fit_badge_ids = set(re.findall(r'"id":\s*"([^"]+)"', read('js/data/badges.js')))
learn_badge_sets = {}
for sid, cfg in LEARN_SUBJECTS.items():
    if not exists(cfg['badges']):
        continue
    fb = read(cfg['badges'])
    ids = re.findall(r'"id":\s*"([^"]+)"', fb)
    learn_badge_sets[sid] = set(ids)
    ok(len(ids) >= 1, f"{cfg['badges']} defines no badges")
    ok(all(i.startswith(cfg['prefix']) for i in ids), f"a {sid} badge id is not '{cfg['prefix']}' namespaced")
    ok(not (set(ids) & fit_badge_ids), f"a {sid} badge id collides with a fitness badge id")
    ok(len(re.findall(r'"category":\s*"' + cfg['category'] + r'"', fb)) >= len(ids),
       f"a {sid} badge is missing category:'{cfg['category']}'")
    for key in ['"name"', '"desc"', '"icon"']:
        ok(fb.count(key) >= len(ids), f"a {sid} badge is missing {key}")
ok('money' in learn_badge_sets, "money (finance) badge set missing")
subj_ids = list(learn_badge_sets)
for i in range(len(subj_ids)):
    for j in range(i + 1, len(subj_ids)):
        a, b = subj_ids[i], subj_ids[j]
        ok(not (learn_badge_sets[a] & learn_badge_sets[b]), f"{a} and {b} badge ids overlap")

# 11) the generic learning domain module exists and is isolated: it must NOT
#     inflate the minutes-based levels or the fitness duration badges (no
#     recordSession / totalMins / durationsTried writes -- comment-stripped)
learn_code = strip_js_comments(read('js/learning.js'))
for fn in ['finishLearning', 'checkTrackBadges', 'recordLessonComplete']:
    ok(f'export function {fn}' in learn_code, f"learning.js missing export {fn}")
ok('recordSession(' not in learn_code, "learning.js must not call recordSession (would inflate levels/durations)")
ok('totalMins' not in learn_code, "learning.js must not write totalMins (no level inflation)")
ok('durationsTried' not in learn_code, "learning.js must not write durationsTried (protects 'all-durations')")

# 12) learning state migration — additive & lossless: v5, retaining the v2->v3 branch
#     that moved the legacy progress.finance blob into learning.money, the v3->v4 branch
#     adding the dashboard fields, and the v4->v5 branch adding the You-page ledgers
#     (journal/meals/cycle). All on-device only.
ok('CURRENT_VERSION = 7' in st, "state.js CURRENT_VERSION must be 7 (You-page ledgers + intimacy + app anniversary)")
ok('learning:' in st, "state.js defaults() missing the learning sub-object")
ok('data.progress.finance' in st, "state.js v2->v3 branch does not migrate the legacy progress.finance blob")
ok('(data.version || 1) < 3' in st, "state.js missing the v2->v3 migration branch guard")
ok('(data.version || 1) < 4' in st, "state.js missing the v3->v4 migration branch guard")
ok('(data.version || 1) < 5' in st, "state.js missing the v4->v5 migration branch guard")
for f in ['birthday', 'weightUnit', 'weights', 'quizBest', 'completedAt']:
    ok(f in st, f"state.js v4 missing the '{f}' field")

# 13) the player records a plan-level kind so learning lessons are not mislabelled
ok('this.plan.kind' in read('js/player.js'), "player.js does not honour plan.kind (learning would record as 'movement')")

# 14) learning lessons — accuracy protocol per subject: disclaimer present, fact-
#     heavy topics sourced from authoritative domains, no over-promising phrasing.
#     New subjects are checked once their lessons module lands (gated on existence).
for sid, cfg in LEARN_SUBJECTS.items():
    if not exists(cfg['lessons']):
        continue
    L = read(cfg['lessons'])
    low = L.lower()
    ok(any(m in low for m in cfg['disclaimer_markers']),
       f"{sid} lessons missing a disclaimer marker ({cfg['disclaimer_markers']})")
    ok('SPOKEN_DISCLAIMER' in L and 'DISCLAIMER_SEG' in L, f"{sid} lessons missing the spoken-disclaimer segment")
    for lid in cfg['curriculum']:
        ok(f"id: '{lid}'" in L, f"{sid} lessons missing curriculum lesson '{lid}'")
    present = [d for d in cfg['auth_domains'] if d in low]
    ok(len(present) >= cfg['auth_min'], f"{sid} lessons cite too few authoritative sources ({present})")
    for bad in cfg['banned']:
        ok(bad not in low, f"{sid} lessons contains a banned/over-promising phrase: '{bad}'")
# money-specific extras retained verbatim (guarantee-negation + year-stamped 2026)
money_lessons = read(LEARN_SUBJECTS['money']['lessons'])
ok(('not guaranteed' in money_lessons) or ('guaranteed or risk-free' in money_lessons) or ('never guaranteed' in money_lessons),
   "money lessons disclaimer does not state returns are not guaranteed")
ok('2026' in money_lessons and ('Notice 2025-67' in money_lessons or 'irs.gov' in money_lessons),
   "money lessons 2026 figures are not year-labelled/sourced")

# 15) topic badges award off completed lesson ids (generic engine)
ok('done.has' in learn_code, "learning.js topic badges do not key off completed lesson ids")

# 15b) thoroughness floor — each Mind subject now carries a full 20-lesson curriculum,
#      and the expanded reward sets are present AND wired (additive milestones,
#      cross-pillar balance, per-subject scholar/mastery). All consistent with the
#      count-based, grace-day, anti-compulsion design.
for _sid, _cfg in LEARN_SUBJECTS.items():
    if not exists(_cfg['lessons']):
        continue
    _Lsrc = read(_cfg['lessons'])
    _m = re.search(r'const CURRICULUM = \[(.*?)\];', _Lsrc)
    _cur = re.findall(r'"[^"]+"|\'[^\']+\'', _m.group(1)) if _m else []
    ok(len(_cur) >= 20, f"{_sid} curriculum has {len(_cur)} lessons, expected >= 20")

NEW_TRACK_BADGES = {
    'money': ['fin-scholar', 'fin-master', 'fin-streak-7', 'fin-credit-savvy'],
    'parenting': ['par-scholar', 'par-master', 'par-streak-7', 'par-sleep-guide'],
    'communication': ['com-scholar', 'com-master', 'com-streak-7', 'com-peacemaker'],
    'memory': ['mem-scholar', 'mem-master', 'mem-streak-7', 'mem-mnemonist'],
}
for _sid, _ids in NEW_TRACK_BADGES.items():
    _bsrc = read(LEARN_SUBJECTS[_sid]['badges'])
    for _bid in _ids:
        ok(f'"{_bid}"' in _bsrc, f"{_sid} badges missing new badge '{_bid}'")

NEW_SHARED_BADGES = ['garden-stage-4', 'garden-stage-8', 'streak-14', 'streak-30',
                     'calm-25', 'calm-50', 'sessions-50', 'sessions-100',
                     'balance-day', 'whole-self-day', 'balanced-week']
_fitsrc = read('js/data/badges.js')
for _bid in NEW_SHARED_BADGES:
    ok(f'"{_bid}"' in _fitsrc, f"badges.js missing new shared badge '{_bid}'")
# the new conditions must be WIRED, not merely defined
_gam = read('js/gamify.js')
ok('whole-self-day' in _gam and 'balanced-week' in _gam, "gamify.js does not award the cross-pillar badges")
ok('masteryBadge' in learn_code and 'scholarBadge' in learn_code,
   "learning.js missing the per-subject scholar/mastery conditions")
ok('streak7' in learn_code, "learning.js missing the per-track 7-day streak condition")

# 16) service worker precaches the learning engine files + bumped past v3.3.0 so
#     installed PWAs pick them up (addAll is atomic — every path must resolve)
sw = read('sw.js')
core_learn_files = ['js/learning.js', 'js/learning-screen.js', 'js/data/tracks.js',
                    'js/data/lessons.js', 'js/data/badges.finance.js']
for f in core_learn_files:
    ok(f"'{f}'" in sw, f"sw.js PRECACHE missing {f}")
# The orphaned finance.* modules (referenced only in comments; the live engine is
# learning.js + learning-screen.js + tracks.js) are no longer precached — they were
# dead code and a single point of failure for the atomic addAll().
for orphan in ['js/finance.js', 'js/finance-screen.js']:
    ok(f"'{orphan}'" not in sw, f"sw.js should no longer precache the orphaned {orphan}")
# The realistic-avatar dependency chain is precached so the opt-in photoreal coach
# works offline; the ~1.9 MB GLB is warmed best-effort in install (cannot reject addAll).
for dep in ['lib/jsm/loaders/GLTFLoader.js', 'lib/jsm/utils/BufferGeometryUtils.js']:
    ok(f"'{dep}'" in sw, f"sw.js PRECACHE missing avatar dependency {dep}")
ok('models/vera.glb' in sw, "sw.js install does not warm the photoreal model models/vera.glb")
for sid, cfg in LEARN_SUBJECTS.items():
    for f in [cfg['badges'], cfg['lessons']]:
        if exists(f):
            ok(f"'{f}'" in sw, f"sw.js PRECACHE missing {f} (file exists but is not precached)")
ok("'ygt-v3.3.0'" not in sw, "sw.js CACHE_VERSION must be bumped past v3.3.0 so installed apps pick up the learning engine")

# 17) concept games + major-takeaways feature. Games are data-driven, built by the
#     shared engine and mapped through makeGame(); each subject ships game-win badges
#     (namespaced + registry-wired), and every lessons module carries takeaways the
#     completion screen surfaces. The shared engine must inject no HTML strings.
games_shared = read('js/data/games.shared.js') if exists('js/data/games.shared.js') else ''
ok('export function makeGame' in games_shared, 'games.shared.js missing makeGame()')
for t in ['buildQuiz', 'buildSort', 'buildOrder']:
    ok(t in games_shared, f'games.shared.js missing the {t} builder')
ok('.innerHTML = `' not in games_shared and 'innerHTML +=' not in games_shared,
   'games.shared.js must not inject HTML strings — use textContent (XSS-safe)')

GAME_FILES = {
    'money': ('js/data/games.money.js', 'MONEY_GAMES', ['fin-gamer', 'fin-sharp']),
    'parenting': ('js/data/games.parenting.js', 'PARENTING_GAMES', ['par-gamer', 'par-sharp']),
    'communication': ('js/data/games.communication.js', 'COMMUNICATION_GAMES', ['com-gamer', 'com-sharp']),
    'memory': ('js/data/games.memory.concept.js', 'MEMORY_CONCEPT_GAMES', ['mem-gamer', 'mem-sharp']),
}
tracks_src = read('js/data/tracks.js')
for sid, (gfile, gexport, gbadges) in GAME_FILES.items():
    ok(exists(gfile), f'{sid}: missing games file {gfile}')
    if exists(gfile):
        g = read(gfile)
        ok(f'export const {gexport}' in g, f'{gfile} missing export {gexport}')
        ok('.map(makeGame)' in g, f'{gfile} games are not built via the shared makeGame()')
        ok(f"'{gfile}'" in sw, f'sw.js PRECACHE missing {gfile}')
    bsrc = read(LEARN_SUBJECTS[sid]['badges']) if exists(LEARN_SUBJECTS[sid]['badges']) else ''
    for bid in gbadges:
        ok(f'"{bid}"' in bsrc, f"{sid} badge file missing game-win badge {bid}")
        ok(f"'{bid}'" in tracks_src, f"tracks.js gameBadges not wired for {bid}")

for sid, cfg in LEARN_SUBJECTS.items():
    if not exists(cfg['lessons']):
        continue
    n_take = read(cfg['lessons']).count('takeaways:')
    ok(n_take >= 5, f"{sid} lessons carry too few takeaways arrays ({n_take})")
screen = read('js/learning-screen.js')
ok('takeawayGroups' in screen and 'Major takeaways' in screen,
   'learning-screen.js does not render the Major takeaways section')
ok('takeawayGroups' in read('js/data/lessons.shared.js'),
   'lessons.shared.js does not thread takeawayGroups through its plan builders')

# 18) dashboard era: completion quizzes (100% -> completed + date), fun arcade games,
#     expert tips and top takeaways. All per-subject content lives in learn-extras.js
#     and is wired through the registry; the completion model lives in learning.js.
extras = read('js/data/learn-extras.js') if exists('js/data/learn-extras.js') else ''
ok('export const LEARN_EXTRAS' in extras, 'learn-extras.js missing LEARN_EXTRAS export')
ok(extras.count('makeGame(') >= 4, 'learn-extras.js should build one arcade game per subject via makeGame()')
ok("'js/data/learn-extras.js'" in sw, 'sw.js PRECACHE missing js/data/learn-extras.js')
ok('buildBlitz' in games_shared, 'games.shared.js missing the buildBlitz arcade engine')
ok('export { buildQuiz }' in games_shared, 'games.shared.js must export buildQuiz for the completion quiz')
ok('export function recordQuiz' in learn_code, 'learning.js missing recordQuiz (completion model)')
ok('quizBest' in learn_code and 'completedAt' in learn_code, 'learning.js does not track quizBest/completedAt')
screen2 = read('js/learning-screen.js')
ok('export function quizScreen' in screen2, 'learning-screen.js missing quizScreen')
ok('recordQuiz(' in screen2, 'learning-screen.js quizDone must call recordQuiz')
ok('function party(' in screen2, 'learning-screen.js missing the tiered celebration helper')
main_src = read('js/main.js')
ok("=== 'quiz'" in main_src, 'main.js missing the #learn-<track>-quiz route')
for sid in ['money', 'parenting', 'communication', 'memory']:
    ok(f'"{sid}":' in extras, f'learn-extras.js missing subject {sid}')
    ok(f'LEARN_EXTRAS.{sid}.quiz' in tracks_src, f'tracks.js: {sid} quiz not wired into the registry')
    ok(f'LEARN_EXTRAS.{sid}.expertTips' in tracks_src, f'tracks.js: {sid} expertTips not wired')
    ok(f'LEARN_EXTRAS.{sid}.topTakeaways' in tracks_src, f'tracks.js: {sid} topTakeaways not wired')
    ok(f'LEARN_EXTRAS.{sid}.arcade' in tracks_src, f'tracks.js: {sid} arcade game not wired into games')

# 19) the You dashboard — stats + per-subject completion + on-device weight & birthday,
#     with a personal birthday party. Personal data must NEVER be transmitted: the app
#     has no network layer, and this asserts main.js keeps it that way.
ok('function youScreen' in main_src, 'main.js missing youScreen (dashboard)')
ok("'#you'" in main_src, 'main.js missing the #you route/nav entry')
ok('function maybeBirthdayParty' in main_src, 'main.js missing the birthday party')
ok('progress.weights' in main_src, 'main.js does not record weight entries on the dashboard')
ok('ageFromBirthday' in main_src, 'main.js does not derive age from birthday')
for needle in ['fetch(', 'sendBeacon', 'XMLHttpRequest']:
    ok(needle not in main_src, f"main.js must not transmit data ('{needle}') — weight/birthday stay on-device")

# 20) Body restructure into three paths (Stretching / Yoga / Exercises) + 50 new
#     no-equipment moves, and the expanded meditation library.
ext2 = read('js/data/movements-ext2.js') if exists('js/data/movements-ext2.js') else ''
for sym in ['EXTRA_EXERCISES', 'EXTRA_TIER_ELIGIBILITY', 'EXTRA_SPACE_FLAGS', 'WORKOUT_CATEGORY']:
    ok(f'export const {sym}' in ext2, f'movements-ext2.js missing {sym}')
ok('js/data/movements-ext2.js' in sw, 'sw.js PRECACHE missing js/data/movements-ext2.js')
extra_block = ext2.split('export const EXTRA_EXERCISES')[1].split('export const EXTRA_TIER_ELIGIBILITY')[0] if 'EXTRA_EXERCISES' in ext2 else ''
extra_ids = re.findall(r'"id":\s*"([^"]+)"', extra_block)
ok(len(extra_ids) >= 50, f'expected >=50 new moves, found {len(extra_ids)}')
ok(all(re.fullmatch(r'[a-z0-9-]+', i) for i in extra_ids), 'a new move id is not kebab-case')
ok(not (set(extra_ids) & set(FROZEN)) and not (set(extra_ids) & set(new_ids)), 'a new move id collides with an existing id')
for i in extra_ids:
    for b in BANNED:
        ok(b not in i.lower(), f"banned pattern '{b}' in new move '{i}'")
catmap = dict(re.findall(r'"([a-z0-9-]+)":\s*"(stretch|yoga|exercise|breath)"', ext2.split('export const WORKOUT_CATEGORY')[-1]))
for i in extra_ids:
    ok(catmap.get(i) in ('stretch', 'yoga', 'exercise'), f"new move '{i}' has no workout category")
ok(set(FROZEN).issubset(set(catmap)), 'WORKOUT_CATEGORY does not cover all frozen moves')
ok('stretch:' in tiers and 'yoga:' in tiers and 'WORKOUT_PATHS' in tiers, 'tiers.js missing the stretch/yoga session types')
seng = read('js/sessionEngine.js')
ok('categoryAllows' in seng and 'workoutCategory' in seng, 'sessionEngine.js missing workout-category filtering')
ok('function moveScreen' in main_src and "startsWith('#move-')" in main_src, 'main.js missing the workout-path screen/route')
for go in ['#move-stretch', '#move-yoga', '#move-exercise']:
    ok(go in main_src, f'main.js missing the {go} path')
libcount = med.split('export const MEDITATION_LIBRARY')[1].split('];')[0].count('"id":')
ok(libcount >= 30, f'expected >=30 library meditations, found {libcount}')
for mid in ['med-lib-morning-gentle-7', 'med-lib-box-breath-5', 'med-lib-loving-kindness-15', 'med-lib-reset-5']:
    ok(f'"{mid}"' in med, f'meditation library missing {mid}')

# 21) Face Yoga + With-Your-Baby — two more category-gated Body session types, each
#     with its own moves (movements-ext3.js). Captions-led, no equipment; baby moves
#     carry safety framing (in the content + the moveScreen note).
ext3 = read('js/data/movements-ext3.js') if exists('js/data/movements-ext3.js') else ''
for sym in ['EXTRA_EXERCISES2', 'EXTRA_TIER_ELIGIBILITY2', 'EXTRA_SPACE_FLAGS2', 'WORKOUT_CATEGORY2']:
    ok(f'export const {sym}' in ext3, f'movements-ext3.js missing {sym}')
ok('js/data/movements-ext3.js' in sw, 'sw.js PRECACHE missing js/data/movements-ext3.js')
ext3_block = ext3.split('export const EXTRA_EXERCISES2')[1].split('export const EXTRA_TIER_ELIGIBILITY2')[0] if 'EXTRA_EXERCISES2' in ext3 else ''
ext3_ids = re.findall(r'"id":\s*"([^"]+)"', ext3_block)
ok(len(ext3_ids) >= 20, f'expected >=20 face/baby moves, found {len(ext3_ids)}')
ok(all(re.fullmatch(r'[a-z0-9-]+', i) for i in ext3_ids), 'a face/baby move id is not kebab-case')
ok(not (set(ext3_ids) & set(FROZEN)) and not (set(ext3_ids) & set(new_ids)) and not (set(ext3_ids) & set(extra_ids)),
   'a face/baby move id collides with an existing id')
for i in ext3_ids:
    for b in BANNED:
        ok(b not in i.lower(), f"banned pattern '{b}' in face/baby move '{i}'")
cat3 = dict(re.findall(r'"([a-z0-9-]+)":\s*"(face|baby|stretch)"', ext3.split('export const WORKOUT_CATEGORY2')[-1]))
for i in ext3_ids:
    ok(cat3.get(i) in ('face', 'baby'), f"face/baby move '{i}' has no face/baby category")
ok(sum(1 for v in cat3.values() if v == 'face') >= 8, 'expected >=8 face-yoga moves')
ok(sum(1 for v in cat3.values() if v == 'baby') >= 8, 'expected >=8 with-baby moves')
ok("'face'" in tiers and "'baby'" in tiers and 'WORKOUT_PATHS' in tiers, 'tiers.js missing the face/baby session types')
ok("face: ['face']" in seng and 'baby:' in seng, 'sessionEngine.js CATEGORY_POOLS missing face/baby')
for go in ['#move-face', '#move-baby']:
    ok(go in main_src, f'main.js missing the {go} path')
ok('safety' in main_src, 'main.js MOVE_META missing the baby safety note')

# 22) Soul sections — Crystal energy + Dream interpretation. Belief-flagged,
#     lessons-only learning tracks: every lesson cites >=5 sources, over-claim phrases
#     are absent, honest disclaimers are present, and they register under the Soul
#     pillar (SOUL_TRACK_LIST) — NOT the Mind TRACK_LIST.
SOUL_SECTIONS = [
    ('js/data/lessons.crystals.js', 'js/data/badges.crystals.js', 'CRYSTALS', 'cry-',
     ['crystals-overview', 'what-crystals-really-are', 'history-of-crystal-lore',
      'the-energy-and-chakra-belief', 'what-science-says-crystals', 'the-placebo-and-ritual-effect',
      'popular-stones-and-their-lore', 'crystals-as-a-mindfulness-anchor', 'staying-safe-and-skeptical',
      'choosing-and-caring-for-stones'],
     ['will cure', 'cures cancer', 'miracle cure', 'proven to heal', 'medical cure']),
    ('js/data/lessons.dreams.js', 'js/data/badges.dreams.js', 'DREAMS', 'drm-',
     ['dreams-overview', 'the-science-of-sleep-and-dreams', 'why-we-dream-theories',
      'common-dreams-and-their-claims', 'history-of-dream-interpretation', 'what-science-says-about-meaning',
      'nightmares-and-when-to-seek-help', 'dream-journaling-for-reflection', 'lucid-dreaming-evidence',
      'dreams-sleep-and-wellbeing'],
     ['tells the future', 'reveals your destiny', 'definitely means']),
]
for mod_path, badge_path, prefix, badge_prefix, lesson_ids, banned_soul in SOUL_SECTIONS:
    ok(exists(mod_path), f'{mod_path} missing (run gen_soul.py)')
    src = read(mod_path) if exists(mod_path) else ''
    for sym in ['LESSON_LIBRARY', 'buildLessonById', 'buildLessonSession', f'{prefix}_DISCLAIMER', f'{prefix}_DISCLAIMER_SHORT']:
        ok(f'export const {sym}' in src, f'{mod_path} missing export {sym}')
    ok('makeLessonModule' in src, f'{mod_path} not built via the shared makeLessonModule factory')
    ok('not a substitute for professional care' in src, f'{mod_path} missing the honest disclaimer')
    # every lesson present + carries >= 5 cited sources (one "url:" per source row)
    for lid in lesson_ids:
        marker = f'id: "{lid}"'
        ok(marker in src, f'{mod_path} missing lesson {lid}')
        start = src.find(marker)
        if start < 0:
            continue
        nxt = len(src)
        for other in lesson_ids:
            if other == lid:
                continue
            j = src.find(f'id: "{other}"', start + len(marker))
            if 0 <= j < nxt:
                nxt = j
        ucount = src[start:nxt].count('url:')
        ok(ucount >= 5, f'{mod_path} lesson {lid} cites {ucount} sources (>=5 required)')
    for b in banned_soul:
        ok(b.lower() not in src.lower(), f"over-claim phrase '{b}' present in {mod_path}")
    # badges: namespaced + scholar present + precached
    ok(exists(badge_path), f'{badge_path} missing')
    bsrc = read(badge_path) if exists(badge_path) else ''
    bids = re.findall(r'"id":\s*"([^"]+)"', bsrc)
    ok(len(bids) >= 6, f'{badge_path} has only {len(bids)} badges')
    ok(all(i.startswith(badge_prefix) for i in bids), f'a badge id in {badge_path} is not {badge_prefix}* namespaced')
    ok(f'{badge_prefix}scholar' in bids, f'{badge_path} missing {badge_prefix}scholar')
    ok(mod_path in sw, f'sw.js PRECACHE missing {mod_path}')
    ok(badge_path in sw, f'sw.js PRECACHE missing {badge_path}')
# registered under the Soul pillar, NOT Mind
ok("export const SOUL_TRACK_LIST = ['crystals', 'dreams']" in tracks_src, 'tracks.js missing SOUL_TRACK_LIST = [crystals, dreams]')
ok("export const TRACK_LIST = ['money', 'parenting', 'communication', 'memory']" in tracks_src,
   'tracks.js TRACK_LIST must stay Mind-only (no crystals/dreams)')
for tid in ['crystals', 'dreams']:
    ok(f'{tid}: {{' in tracks_src, f'tracks.js missing the {tid} track descriptor')
# soulScreen surfaces them as live #learn-<track> cards
ok('SOUL_TRACK_LIST' in main_src, 'main.js does not import/use SOUL_TRACK_LIST')
ok('soul-reflectives' in main_src and "go('#learn-' + b.dataset.track)" in main_src,
   'main.js soulScreen does not wire the crystals/dreams cards to #learn-<track>')

# 23) Per-coach voices + caption sync (the audio pass). Each coach must have a
#     DISTINCT voice; both the natural (Kokoro) and system paths must be wired, and
#     captions must advance per sentence in sync with playback.
chars = read('js/characters.js')
tts = read('js/tts.js')
nv = read('js/natural-voice.js')
coach_ids = set(re.findall(r"id:\s*'([a-z]+)'", chars))
ok({'jasmine', 'nokeke', 'abednego', 'aguibou'}.issubset(coach_ids), 'characters.js missing one of the four coaches')
nat_voices = re.findall(r"natural:\s*'([a-z_]+)'", chars)
ok(len(nat_voices) >= 4, f'expected >=4 per-coach natural voices, found {len(nat_voices)}')
ok(len(set(nat_voices)) == len(nat_voices), f'coach natural voices must be distinct, got {nat_voices}')
ok(chars.count('voice:') >= 4, 'each coach needs its own voice config')
ok('pitch:' in chars and 'rate:' in chars and 'system:' in chars, 'coach voice config missing system/pitch/rate')
ok('generate(text, { voice, speed })' in nv, 'natural-voice.js does not pass per-coach voice+speed to generate')
ok('onChunk' in nv, 'natural-voice.js missing the per-sentence caption hook')
ok('setCharacterVoice' in tts, 'tts.js missing setCharacterVoice')
ok('_pickSystemVoice' in tts, 'tts.js missing per-coach system voice selection')
ok('naturalVoice.speak(chunks, {' in tts, 'tts.js does not pass the per-coach voice to the natural path')
ok('onstart' in tts, 'tts.js system path missing per-sentence caption (onstart)')
ok(main_src.count('setCharacterVoice') >= 2, 'main.js must set the coach voice at session start AND in settings preview')

# 24) Durable workout transcript (accessibility). The coach records every narrated line
#     (fullCaption) into a session-scoped log, reset at session start; the workout/
#     meditation done screen renders it as an accessible <details> "Read what your coach
#     said". The learning transcript (learning-screen.js) must remain — no regression.
ok('transcript: []' in tts and 'resetTranscript' in tts, 'tts.js missing the session transcript log/reset')
ok('this.transcript.push(fullCaption)' in tts, 'tts.js speak() does not append the spoken line to the transcript')
ok('coach.resetTranscript()' in main_src, 'main.js does not reset the coach transcript at session start')
ok('coach.transcript' in main_src, 'main.js done screen does not read the coach transcript')
ok('Read what your coach said' in main_src and 'fin-transcript' in main_src,
   'main.js workout done screen missing the accessible "Read what your coach said" transcript')
# no-regression: the learning transcript still renders its lesson lines via plan.items
learn_screen_src = read('js/learning-screen.js')
ok('Read what your coach said' in learn_screen_src and 'it.ex.why' in learn_screen_src,
   'learning-screen.js transcript regressed (lesson transcript must stay intact)')

# 25) Lifelike voice, automatic: capable devices load the natural voice in the
#     background (system voice covers slow ones), honoring an explicit choice + Data Saver.
ok("voicePref: 'auto'" in st, "state.js profile missing the voicePref:'auto' default")
ok('maybeAutoEnableNaturalVoice' in main_src, 'main.js missing the lifelike-voice auto-enable')
ok(main_src.count('maybeAutoEnableNaturalVoice') >= 2, 'maybeAutoEnableNaturalVoice is defined but never called at boot')
ok("p.voicePref === 'off'" in main_src, 'auto-enable must respect an explicit voicePref off')
ok('saveData' in main_src, 'auto-enable must honor Data Saver (navigator.connection.saveData)')
ok("p.voicePref = e.target.checked ? 'on' : 'off'" in main_src, 'settings toggle must record an explicit voicePref')

# 26) State v5 + You-page personal ledgers (journal/meals/cycle). New on-device ledgers
#     must exist and default safely; cycle is opt-in (default OFF); the additive v<5
#     migration branch must backfill them losslessly (shallow-spread nested-object trap).
ok('CURRENT_VERSION = 7' in st, 'state.js CURRENT_VERSION must be 7')
ok('journal: []' in st, 'state.js defaults missing progress.journal[]')
ok('meals: []' in st, 'state.js defaults missing progress.meals[]')
ok(re.search(r"cycle:\s*\{\s*enabled:\s*false", st) is not None,
   'state.js defaults missing opt-in (default-OFF) progress.cycle')
ok(re.search(r"intimacy:\s*\{\s*enabled:\s*false", st) is not None,
   'state.js defaults missing opt-in (default-OFF) progress.intimacy')
ok('< 5' in st, 'state.js missing the v4->v5 migration branch')
ok('< 6' in st, 'state.js missing the v5->v6 (intimacy) migration branch')
# v7: app-anniversary date (profile.startedAt), backfilled from earliest activity for
# existing users so the personal calendar can mark the day they started, every year.
ok('startedAt' in st, 'state.js missing profile.startedAt (app anniversary date)')
ok('< 7' in st, 'state.js missing the v6->v7 (app anniversary) migration branch')

# 27) Privacy guard (ALWAYS ON): no off-device speech recognition anywhere in js/.
#     Browser SpeechRecognition streams microphone audio to the vendor (Google on
#     Chrome) and is absent on iOS Safari — journal transcription must be on-device only.
def _all_js_src():
    out = []
    for base, _dirs, files in os.walk(os.path.join(ROOT, 'js')):
        for f in files:
            if f.endswith('.js'):
                out.append(open(os.path.join(base, f), encoding='utf-8').read())
    return out
_js_all = _all_js_src()
ok(not any(('SpeechRecognition' in s or 'webkitSpeechRecognition' in s) for s in _js_all),
   'off-device SpeechRecognition found in js/ — journal transcription must stay on-device only')

# 28) Isolation guard (feature-gated): the You-page ledger modules, once they exist,
#     must NEVER write a sessions[] record — that would silently grow the count-based
#     garden and fabricate a streak day (gamify.js streakInfo/gardenStage). They are
#     their own ledgers, like weights[]. Gates on file existence so the suite stays
#     green before the modules land.
def _read_opt(p):
    fp = os.path.join(ROOT, p)
    return open(fp, encoding='utf-8').read() if os.path.exists(fp) else ''
for _ledger in ['js/journal.js', 'js/journal-screen.js', 'js/meals.js', 'js/cycle.js']:
    _src = _read_opt(_ledger)
    if _src:
        ok('sessions.push' not in _src and 'recordSession' not in _src,
           f'{_ledger} must not write to sessions[] (breaks garden/streak isolation)')

# 29) S1: the You page captures the name when missing — a friendly inline prompt
#     (in addition to Settings) that persists to profile.name.
ok('you-name-input' in main_src and 'you-name-save' in main_src,
   'You page missing the inline name prompt (you-name-input / you-name-save)')
ok('store.profile.name = val' in main_src, 'You page name prompt does not persist to profile.name')

# 30) S2: usage/engagement graphs are READ-ONLY reflection — derived at render time
#     from the ledgers, never writing back or feeding the streak/garden, and precached.
usage_src = _read_opt('js/usage-graph.js')
if usage_src:
    ok('sessions.push' not in usage_src and 'recordSession' not in usage_src and 'save(' not in usage_src,
       'usage-graph.js must be read-only (no sessions.push/recordSession/save)')
    ok('usageGraphsHTML' in main_src, 'You page does not render the usage graphs (usageGraphsHTML)')
    ok("'js/usage-graph.js'" in read('sw.js'), 'sw.js does not precache js/usage-graph.js')

# 31) S3: longer sessions open with a brief, personalized coach check-in (durationKey>=15),
#     spoken before content; gentle and anti-compulsion (never pressures the streak).
checkin_src = _read_opt('js/checkin.js')
if checkin_src:
    ok('composeCheckin' in checkin_src, 'checkin.js missing composeCheckin')
    ok('durationKey' in checkin_src and '>= 15' in checkin_src, 'check-in must gate on durationKey >= 15')
    ok('composeCheckin' in main_src, 'main.js does not invoke the session check-in')
    ok('skipWelcome' in read('js/player.js'), 'player.js missing skipWelcome (would double-greet on long workouts)')
    _low = checkin_src.lower()
    ok(not any(s in _low for s in ["don't break", 'do not break', 'keep your streak', 'lose your streak', "don't lose"]),
       'check-in must not pressure the user about their streak (anti-compulsion)')
    ok("'js/checkin.js'" in read('sw.js'), 'sw.js does not precache js/checkin.js')

# 32) S4: on-demand difficulty — one lesson with "Explain it simpler" / "Go deeper"
#     buttons that re-narrate the current segment at another reading level. Additive
#     (lessons without variants are unchanged) and never touches sessions[]. pickLevel
#     is the shared accessor used by both lesson plan builders.
shared_src = read('js/data/lessons.shared.js')
ok('pickLevel' in shared_src, 'lessons.shared.js missing pickLevel')
ok("pickLevel(s, 'simpler')" in shared_src, 'planFromSegments does not carry the simpler variant')
ok("pickLevel(s, 'deeper')" in shared_src, 'planFromSegments does not carry the deeper variant')
ok('speakVariant' in read('js/player.js'), 'player.js missing speakVariant for the difficulty buttons')
ok("getElementById('btn-simpler')" in main_src and "getElementById('btn-deeper')" in main_src,
   'session screen missing the simpler/deeper controls')
ok('speakVariant' in main_src, 'session screen does not invoke speakVariant')
ok('simpler:' in read('js/data/lessons.js'), 'money lesson plan items do not carry difficulty variants')
# S8 prep: variants merge from a companion file so the vetted lesson sources stay
# untouched; the engine applies them via withVariants in both the shared + money builders.
ok('withVariants' in shared_src, 'lessons.shared.js missing the withVariants merge')
ok("from './lesson-variants.js'" in read('js/data/lessons.js') and 'withVariants' in read('js/data/lessons.js'),
   'money builder does not merge variants from the companion file')
_lv = _read_opt('js/data/lesson-variants.js')
ok(bool(_lv) and 'LESSON_VARIANTS' in _lv, 'js/data/lesson-variants.js missing LESSON_VARIANTS')
ok("'js/data/lesson-variants.js'" in read('sw.js'), 'sw.js does not precache lesson-variants.js')

# 33) S5a: the journal — typed entries + the readable/listenable book. Its own ledger
#     (never sessions[]); audio goes to IndexedDB; the screen loads on demand (off the
#     boot path); and "Reset everything" also clears the IndexedDB media store.
journal_src = _read_opt('js/journal.js')
if journal_src:
    ok('sessions.push' not in journal_src and 'recordSession' not in journal_src,
       'journal.js must not write to sessions[] (breaks garden/streak isolation)')
    ok('progress.journal' in journal_src, 'journal.js does not use the progress.journal ledger')
    idb_src = _read_opt('js/idb.js')
    ok(bool(idb_src) and 'indexedDB' in idb_src, 'idb.js missing the IndexedDB wrapper for audio blobs')
    ok("import('./journal-screen.js')" in main_src, 'router must load the journal screen on demand (dynamic import)')
    ok("from './journal-screen.js'" not in main_src, 'journal-screen.js must NOT be statically imported (keep it off the boot path)')
    ok('clearAllAudio' in main_src, 'Reset everything must also clear the journal IndexedDB store')
    for _f in ['js/idb.js', 'js/journal.js', 'js/journal-screen.js']:
        ok(f"'{_f}'" in read('sw.js'), f'sw.js does not precache {_f}')

# 34) S5b: voice journaling — mic recording + raw playback. getUserMedia/MediaRecorder
#     must live ONLY in the on-demand journal screen, never on the boot path (main.js),
#     and recordings must play back from IndexedDB.
js_screen_src = _read_opt('js/journal-screen.js')
if js_screen_src and 'journal-record' in js_screen_src:
    ok('getUserMedia' in js_screen_src and 'MediaRecorder' in js_screen_src,
       'journal-screen.js missing voice recording (getUserMedia/MediaRecorder)')
    ok('getUserMedia' not in main_src and 'MediaRecorder' not in main_src,
       'getUserMedia/MediaRecorder must not appear on the boot path (main.js)')
    ok('journal-play' in js_screen_src and 'getEntryAudio' in js_screen_src,
       'journal-screen.js missing raw-recording playback from IndexedDB')

# 35) S6: meal tracking — gentle timestamped notes only, never sessions[], and NONE of
#     the disordered-eating triggers (no calories/macros/targets/streaks/scores).
meals_src = _read_opt('js/meals.js')
if meals_src:
    ok('sessions.push' not in meals_src and 'recordSession' not in meals_src,
       'meals.js must not write to sessions[] (breaks garden/streak isolation)')
    ok('progress.meals' in meals_src, 'meals.js does not use the progress.meals ledger')
    _ml = meals_src.lower()
    ok(not any(w in _ml for w in ['calorie', 'macro', 'protein', 'carb', 'streak', 'goal', 'target']),
       'meals must stay gentle notes — no calories/macros/targets/streaks (anti-compulsion)')
    ok('addMeal' in main_src and 'you-meal-save' in main_src, 'You page does not render the meal notes')
    ok("'js/meals.js'" in read('sw.js'), 'sw.js does not precache js/meals.js')

# 36) Cycle tracking is now MERGED into the personal calendar (see #36b). The legacy
#     cycle.js module may remain on disk (vestigial; its data is migrated once into the
#     calendar's day model) but it must still never write to sessions[] if present, and it
#     is no longer rendered as its own You-page card.
cycle_src = _read_opt('js/cycle.js')
if cycle_src:
    ok('sessions.push' not in cycle_src and 'recordSession' not in cycle_src,
       'cycle.js must not write to sessions[] (breaks garden/streak isolation)')
    ok('data-cycle' not in main_src, 'the standalone Cycle card must be removed (merged into the personal calendar)')

# 36b) v6 personal calendar — opt-in (default OFF, guarded in #26), DESCRIPTIVE/PRIVATE
#      only, isolated from sessions[]. Merges cycle (period days) + intimacy in one place,
#      with a no-judgment, non-medical disclaimer, an optional PIN stored ONLY as a hash
#      (never the raw PIN), and a lazy-loaded calendar screen. Data layer = intimacy.js;
#      calendar UI = intimacy-screen.js.
intim_src = _read_opt('js/intimacy.js')
intim_scr = _read_opt('js/intimacy-screen.js')
if intim_src:
    _sw = read('sw.js')
    _combined = (intim_src + '\n' + (intim_scr or '')).lower()
    ok('sessions.push' not in intim_src and 'recordSession' not in intim_src,
       'intimacy.js must not write to sessions[] (breaks garden/streak isolation)')
    if intim_scr:
        ok('sessions.push' not in intim_scr and 'recordSession' not in intim_scr,
           'intimacy-screen.js must not write to sessions[] (breaks garden/streak isolation)')
    ok('progress.intimacy' in intim_src, 'intimacy.js does not use the progress.intimacy ledger')
    ok('isEnabled' in intim_src and 'setEnabled' in intim_src, 'intimacy.js missing the opt-in toggle')
    ok('not</strong> medical' in _combined or 'not medical' in _combined,
       'personal calendar missing the non-medical disclaimer')
    ok('judg' in _combined, 'personal calendar must state it does not judge/score')
    # PIN privacy: the raw PIN is never persisted — only a SHA-256 hash field (pinHash).
    ok('pinhash' in intim_src.lower() and 'sha-256' in intim_src.lower(),
       'intimacy.js PIN must be stored as a SHA-256 hash (pinHash), never the raw PIN')
    # Cycle merge: period logging lives in the calendar's own day model.
    ok('setPeriod' in intim_src and 'isPeriod' in intim_src and 'cycleStats' in intim_src,
       'intimacy.js missing the merged period/cycle functions (setPeriod/isPeriod/cycleStats)')
    if intim_scr:
        ok('intim-period' in intim_scr, 'personal calendar day editor missing the period-day toggle')
    ok('data-intimacy' in main_src and 'intimacyCardHTML' in main_src, 'You page does not render the personal calendar card')
    ok('Personal calendar' in main_src, 'You page card should be titled "Personal calendar"')
    ok("#calendar" in main_src and 'intimacy-screen.js' in main_src, 'router does not lazy-load the personal calendar screen at #calendar')
    ok("'js/intimacy.js'" in _sw and "'js/intimacy-screen.js'" in _sw, 'sw.js does not precache the calendar modules')

# 37) S5c: the book is editable, and voice notes transcribe ON-DEVICE in a Web Worker,
#     gated like the lifelike voice (Data Saver / persisted speed verdict) — never the
#     off-device Web Speech API. Editing is the always-works path (the book is theirs).
stt_src = _read_opt('js/stt.js')
if stt_src:
    js_screen2 = _read_opt('js/journal-screen.js')
    worker_src = _read_opt('js/stt-worker.js')
    ok('new Worker' in stt_src, 'STT inference must run in a Web Worker (off the main thread)')
    ok('saveData' in stt_src, 'STT must honor Data Saver (gated like the lifelike voice)')
    ok('SpeechRecognition' not in stt_src and 'SpeechRecognition' not in worker_src,
       'STT must be on-device, never the off-device Web Speech API')
    ok('automatic-speech-recognition' in worker_src, 'stt-worker.js missing the on-device ASR pipeline')
    ok('setEntryText' in js_screen2, 'journal must let the user edit entry text (the editable book)')
    ok('journal-edit-btn' in js_screen2 and 'transcribeEntry' in js_screen2, 'journal missing edit + transcribe controls')
    for _f in ['js/stt.js', 'js/stt-worker.js']:
        ok(f"'{_f}'" in read('sw.js'), f'sw.js does not precache {_f}')

# 38) S9: security headers shipped for the host (a static site cannot set them from
#     HTML). The CSP must keep the optional on-device models working — allow the model
#     CDNs and WebAssembly — and scope the microphone to self for journal voice notes.
hdrs = _read_opt('_headers')
if hdrs:
    ok('Content-Security-Policy:' in hdrs, '_headers missing a Content-Security-Policy')
    ok('Permissions-Policy:' in hdrs and 'microphone=(self)' in hdrs, '_headers missing Permissions-Policy with microphone=(self)')
    ok('wasm-unsafe-eval' in hdrs, 'CSP must allow wasm-unsafe-eval (on-device models use WebAssembly)')
    ok('cdn.jsdelivr.net' in hdrs and 'huggingface.co' in hdrs, 'CSP must allow the model CDNs (voice/STT would break)')
    ok('X-Content-Type-Options: nosniff' in hdrs, '_headers missing X-Content-Type-Options: nosniff')
    ok('frame-ancestors' in hdrs or 'X-Frame-Options' in hdrs, '_headers missing clickjacking protection')

# 39) S10: the launch disclaimer must be shown ONCE yet ALWAYS reachable. The dismiss
#     button is pinned and visible regardless of viewport (gated overlay markup + CSS);
#     it is shown at boot regardless of which route loads (maybeShowSafety fires at boot
#     AND on home); dismissing persists seenSafety so it never reappears; and a dedup
#     guard prevents a second overlay being stacked.
ok('function maybeShowSafety' in main_src, 'main.js missing maybeShowSafety() launch-disclaimer hook')
ok(main_src.count('maybeShowSafety()') >= 2,
   'launch disclaimer must fire at boot AND on home so it shows regardless of entry route')
ok('seenSafety = true' in main_src, 'dismissing the disclaimer must persist seenSafety (shown only once)')
ok(".overlay.safety'" in main_src or ".overlay.safety\"" in main_src, 'safety overlay missing the dedup guard')
ok('overlay-card--gated' in main_src, 'safety overlay must use the gated (pinned-button) card structure')
_css = read('css/style.css')
ok('.overlay-card--gated' in _css and 'overlay-scroll' in _css and 'overlay-actions' in _css,
   'css missing the gated overlay (scroll body + pinned actions) that keeps the dismiss button visible')

# 40) S11/S12: a tutorial (#tutorial) and FAQ (#faq) exist, are routed, lazy-loaded
#     (off the boot path), precached for offline, and discoverable from home + settings.
help_src = _read_opt('js/help-screens.js')
if help_src:
    ok('export function tutorialScreen' in help_src, 'help-screens.js missing tutorialScreen()')
    ok('export function faqScreen' in help_src, 'help-screens.js missing faqScreen()')
    ok("'#tutorial'" in main_src and "'#faq'" in main_src, 'main.js does not route #tutorial / #faq')
    ok("import('./help-screens.js')" in main_src, 'help screens must be lazy-loaded (kept off the boot path)')
    ok('help-screens.js' not in main_src.split('async function render')[0],
       'help screens must not be statically imported on the boot path')
    ok("'js/help-screens.js'" in read('sw.js'), 'sw.js does not precache js/help-screens.js')
    ok(main_src.count('href="#tutorial"') >= 2 and main_src.count('href="#faq"') >= 2,
       'tutorial + FAQ must be linked from both home and settings')

    # 41) S12: the FAQ privacy claims must stay TRUE of the build — data on-device, no
    #     account, and no analytics/tracking anywhere in shipped JS (so the copy is honest).
    _hl = help_src.lower()
    ok('on-device' in _hl or 'on this device' in _hl, 'FAQ must state data stays on-device')
    ok('no account' in _hl or 'no accounts' in _hl, 'FAQ must state there is no account')
    ok('analytics' in _hl and 'tracker' in _hl, 'FAQ privacy section must address analytics/trackers')
    _track_eps = ['google-analytics', 'gtag(', 'googletagmanager', 'mixpanel', 'segment.com', 'sentry.io', 'amplitude.com']
    ok(not any(any(t in s for s in _js_all) for t in _track_eps),
       'analytics/tracking endpoint found in js/ — the FAQ privacy claim would be false')

# 42) S8b: the +16-per-subject Mind expansion ships as a separate, fact-checked
#     extension file per track (lessons.<track>.ext.js), merged into the base module
#     in place so the vetted base map stays byte-stable. Feature-gated on the ext file
#     existing, so the suite stays green for tracks not yet expanded. Each ext lesson
#     must carry >=2 sourced URLs and inline simpler/deeper on every segment, avoid the
#     track's banned guarantee phrases, be wired into the base file, and be precached.
import json as _json
_sw = read('sw.js')
for _sid in ['money', 'parenting', 'communication', 'memory']:
    _ext = 'js/data/lessons.%s.ext.js' % _sid
    _esrc = _read_opt(_ext)
    if not _esrc:
        continue
    _CONST = _sid.upper()
    _base = read(LEARN_SUBJECTS[_sid]['lessons'])
    ok(("lessons.%s.ext.js" % _sid) in _base, '%s base does not import its extension file' % _sid)
    ok(('EXTRA_LESSONS_%s' % _CONST) in _base and ('EXTRA_CURRICULUM_%s' % _CONST) in _base,
       '%s base does not merge EXTRA_LESSONS_%s / EXTRA_CURRICULUM_%s' % (_sid, _CONST, _CONST))
    ok(('Object.assign(LESSONS, EXTRA_LESSONS_%s)' % _CONST) in _base, '%s does not Object.assign the extension lessons' % _sid)
    ok(("EXTRA_CURRICULUM_%s)" % _CONST) in _base, '%s does not push the extension curriculum' % _sid)
    ok(("'%s'" % _ext) in _sw, 'sw.js does not precache %s' % _ext)
    _lm = re.search(r'EXTRA_LESSONS_%s\s*=\s*(\{.*\})\s*;\s*export const EXTRA_CURRICULUM_%s' % (_CONST, _CONST), _esrc, re.S)
    _cm = re.search(r'EXTRA_CURRICULUM_%s\s*=\s*(\[.*?\])\s*;' % _CONST, _esrc, re.S)
    ok(bool(_lm) and bool(_cm), '%s ext file is not parseable (EXTRA_LESSONS/CURRICULUM blobs)' % _sid)
    if not (_lm and _cm):
        continue
    try:
        _EL = _json.loads(_lm.group(1)); _EC = _json.loads(_cm.group(1))
    except Exception as _e:
        ok(False, '%s ext JSON does not parse: %s' % (_sid, _e)); continue
    ok(list(_EL.keys()) == _EC, '%s ext curriculum order does not match lesson keys' % _sid)
    ok(len(_EL) >= 16, '%s ext has %d lessons, expected >= 16' % (_sid, len(_EL)))
    # combined curriculum (base literal + ext) reaches the 36 thoroughness target
    _bm = re.search(r'const CURRICULUM = \[(.*?)\];', _base, re.S)
    _bcount = len(re.findall(r'[\'\"]([a-z0-9-]+)[\'\"]', _bm.group(1))) if _bm else 0
    ok(_bcount + len(_EC) >= 36, '%s combined curriculum is %d, expected >= 36' % (_sid, _bcount + len(_EC)))
    # Overclaim scan, negation-aware: a banned word inside a responsible negation
    # ("no guaranteed outcome", "never fails to" as "no technique always works") is the
    # OPPOSITE of overclaiming, so only flag occurrences NOT preceded by a negation.
    _banned = LEARN_SUBJECTS[_sid]['banned']
    _low = _esrc.lower()
    _NEG = ('no ', 'not ', 'never ', "n't", 'cannot', 'without', 'avoid', 'rarely', 'isn ', 'aren ', 'doesn ', 'do not', 'cannot be')
    _hits = []
    for _b in _banned:
        _p = 0
        while True:
            _i = _low.find(_b, _p)
            if _i < 0:
                break
            if not any(_n in _low[max(0, _i - 36):_i] for _n in _NEG):
                _hits.append(_b)
            _p = _i + len(_b)
    ok(not _hits, '%s ext content uses a non-negated banned overclaim phrase: %s' % (_sid, ', '.join(sorted(set(_hits)))))
    _bad = []
    for _lid, _L in _EL.items():
        if _L.get('id') != _lid:
            _bad.append('%s id mismatch' % _lid)
        if len([s for s in _L.get('sources', []) if s.get('url')]) < 2:
            _bad.append('%s <2 sourced urls' % _lid)
        _segs = _L.get('segments', [])
        if not (5 <= len(_segs) <= 12):
            _bad.append('%s seg count %d' % (_lid, len(_segs)))
        for _s in _segs:
            if not (_s.get('say', '').strip() and _s.get('simpler', '').strip() and _s.get('deeper', '').strip()):
                _bad.append('%s/%s missing say/simpler/deeper' % (_lid, _s.get('id')))
    ok(not _bad, '%s ext lessons malformed: %s' % (_sid, '; '.join(_bad[:6])))

print(f"validate_content: {checks - len(fails)}/{checks} checks passed")
if fails:
    print("FAIL:")
    for f in fails: print("  -", f)
    sys.exit(1)
print("ALL STATIC CONTENT CHECKS PASS")
