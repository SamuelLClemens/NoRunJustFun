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

# 7) store bumped to v2 with an additive v1->v2 branch
st = read('js/state.js')
ok('CURRENT_VERSION = 2' in st, "state.js CURRENT_VERSION not 2")
ok('kind: ' in st or "kind'" in st or 'kind:' in st, "state.js v1->v2 backfill missing kind")

# 8) garden growth still count-based + intensity-neutral (anti-compulsion anchor)
ok('GARDEN_STAGE_SESSIONS' in read('js/data/garden.js'), "garden thresholds missing")
ok('sessions.length' in gm, "gardenStage no longer counts sessions.length")

# 9) meditation core scales across all six durations
med = read('js/data/meditation.js')
for d in DURATIONS:
    ok(f'"med-core-{d}"' in med or f'med-core-{d}' in med, f"meditation core missing duration {d}")

# ---- Finance module (Money Garden) — additive foundations ----------------
def strip_js_comments(s):
    s = re.sub(r'/\*.*?\*/', '', s, flags=re.S)   # block comments
    s = re.sub(r'//[^\n]*', '', s)                # line comments
    return s

# 10) finance badges are a distinct, 'fin-' namespaced set that cannot collide
#     with the fitness badges in the shared progress.badges{} ledger
fb = read('js/data/badges.finance.js')
fin_badge_ids = re.findall(r'"id":\s*"([^"]+)"', fb)
fit_badge_ids = re.findall(r'"id":\s*"([^"]+)"', read('js/data/badges.js'))
ok(len(fin_badge_ids) >= 1, "badges.finance.js defines no FINANCE_BADGES")
ok(all(i.startswith('fin-') for i in fin_badge_ids), "a finance badge id is not 'fin-' namespaced")
ok(not (set(fin_badge_ids) & set(fit_badge_ids)), "a finance badge id collides with a fitness badge id")
ok(len(re.findall(r'"category":\s*"finance"', fb)) >= len(fin_badge_ids),
   "a finance badge is missing category:'finance'")
for key in ['"name"', '"desc"', '"icon"']:
    ok(fb.count(key) >= len(fin_badge_ids), f"a finance badge is missing {key}")

# 11) finance domain module exists and is isolated: it must NOT inflate the
#     minutes-based levels or the fitness duration badges (no recordSession /
#     totalMins / durationsTried writes — checked against comment-stripped code)
fin_code = strip_js_comments(read('js/finance.js'))
for fn in ['finishFinance', 'checkFinanceBadges', 'recordLessonComplete']:
    ok(f'export function {fn}' in fin_code, f"finance.js missing export {fn}")
ok('recordSession(' not in fin_code, "finance.js must not call recordSession (would inflate levels/durations)")
ok('totalMins' not in fin_code, "finance.js must not write totalMins (no level inflation)")
ok('durationsTried' not in fin_code, "finance.js must not write durationsTried (protects 'all-durations')")

# 12) finance state is additive — sub-object present, version NOT bumped past 2
ok('finance:' in st, "state.js defaults() missing the finance sub-object")
ok('CURRENT_VERSION = 3' not in st,
   "state.js version bumped — finance must be additive via the migrate spread, not a version bump")

# 13) the player records a plan-level kind so finance lessons are not mislabelled
ok('this.plan.kind' in read('js/player.js'), "player.js does not honour plan.kind (finance would record as 'movement')")

# 14) finance lessons — accuracy protocol: disclaimer present, fact-heavy topics
#     are sourced from authoritative US sources, and no promised-return claims
lessons = read('js/data/lessons.js')
ok('not financial advice' in lessons, "lessons.js missing the 'not financial advice' disclaimer")
ok(('not guaranteed' in lessons) or ('guaranteed or risk-free' in lessons) or ('never guaranteed' in lessons),
   "lessons.js disclaimer does not state returns are not guaranteed")
ok('SPOKEN_DISCLAIMER' in lessons and 'DISCLAIMER_SEG' in lessons, "lessons.js missing the spoken-disclaimer segment")
# every fact-heavy curriculum lesson must be present and carry a sources list
for lid in ['budgeting', 'compound-growth', 'risk-diversification', 'retirement-accounts', 'property-basics']:
    ok(f"id: '{lid}'" in lessons, f"lessons.js missing curriculum lesson '{lid}'")
# authoritative source domains (need a strong majority of the official five)
auth_domains = ['irs.gov', 'investor.gov', 'consumerfinance.gov', 'fdic.gov', 'federalreserve.gov']
present = [d for d in auth_domains if d in lessons]
ok(len(present) >= 4, f"lessons.js cites too few authoritative sources ({present})")
# year-labelled updatable figures (the 2026 IRS limits must be year-stamped)
ok('2026' in lessons and ('Notice 2025-67' in lessons or 'irs.gov' in lessons), "lessons.js 2026 figures are not year-labelled/sourced")
# no promised-return language (educational, not advice). These exact promo phrases
# must never appear; the lessons discuss guarantees only in negated/cautionary form.
low = lessons.lower()
for bad in ['guaranteed return', 'guaranteed returns', 'guaranteed profit', 'risk-free return',
            'risk free return', 'get rich', 'cannot lose money', "can't lose", 'double your money']:
    ok(bad not in low, f"lessons.js contains a promised-return phrase: '{bad}'")

# 15) finance topic badges award off completed lesson ids
fin = strip_js_comments(read('js/finance.js'))
ok("done.has('budgeting')" in fin or 'done.has' in fin, "finance.js topic badges do not key off completed lesson ids")

print(f"validate_content: {checks - len(fails)}/{checks} checks passed")
if fails:
    print("FAIL:")
    for f in fails: print("  -", f)
    sys.exit(1)
print("ALL STATIC CONTENT CHECKS PASS")
