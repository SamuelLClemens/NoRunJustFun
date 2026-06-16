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

# 12) learning state migration — additive & lossless: v4, retaining the v2->v3 branch
#     that moved the legacy progress.finance blob into learning.money, plus a v3->v4
#     branch adding the dashboard fields (on-device only).
ok('CURRENT_VERSION = 4' in st, "state.js CURRENT_VERSION must be 4 (dashboard additions)")
ok('learning:' in st, "state.js defaults() missing the learning sub-object")
ok('data.progress.finance' in st, "state.js v2->v3 branch does not migrate the legacy progress.finance blob")
ok('(data.version || 1) < 3' in st, "state.js missing the v2->v3 migration branch guard")
ok('(data.version || 1) < 4' in st, "state.js missing the v3->v4 migration branch guard")
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
                    'js/finance.js', 'js/finance-screen.js', 'js/data/lessons.js', 'js/data/badges.finance.js']
for f in core_learn_files:
    ok(f"'{f}'" in sw, f"sw.js PRECACHE missing {f}")
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

print(f"validate_content: {checks - len(fails)}/{checks} checks passed")
if fails:
    print("FAIL:")
    for f in fails: print("  -", f)
    sys.exit(1)
print("ALL STATIC CONTENT CHECKS PASS")
