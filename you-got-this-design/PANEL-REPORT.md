# "You Got This!" — Expert Panel Report
## Exercise, Yoga, Meditation Content System + Garden Retention Loop

> Prepared by a multidisciplinary panel (sports-medicine physician, physical therapist, women's-health/pelvic-floor specialist, stretching/mobility specialist, yoga teacher, meditation teacher, clinical psychologist, addiction therapist, behavioral scientist, UX/game designer, front-end engineer, on-device data engineer, accessibility specialist, content-validation/QA lead). Grounded in the actual codebase (internal name "No Run Just Fun", store key `nrjf.store`). All structured data lives in the sibling files listed at the end.

---

## 1. Executive summary

**What this is.** A complete, clinical-grade content and retention design that EXTENDS the existing offline PWA to the new session matrix — "Got Time" (30/45/60 min) and "No Time" (7/15/20 min), each offering three workout tiers (No Sweat / Slightly Sweaty / Super Sweaty) plus Meditation — without restructuring the app, breaking the frozen 29 exercise ids, or losing any user's garden/badge history.

**Key decisions (all delegated to the panel; argued on the record in section 7 / `decisions.json`):**
- **Content model — EXTEND additively.** Keep the frozen 29-id library and the tag-driven assembler; add a per-movement `tierEligibility` attribute and a tier-aware assembler that varies pool, density, tempo and rest (never swaps engines). Add the 20- and 60-minute durations (the engine is already duration-agnostic). Migrate badge logic off the hardcoded `[7,15,30,45]` to a single `DURATIONS` constant. Bump the store to v2 via the existing `migrate()` seam (additive, lossless). A full restructure was rejected because the 4,628-line hand-authored `poses.js` rig — not the schema — is the real cost center.
- **Meditation — BOTH.** One core "arrive / settle / rest / return" practice that scales across all six durations by lengthening silence (not instruction density), plus a small five-item themed library (overwhelm, sleep, self-compassion, opt-in body scan, three-minute reset).
- **Progression — HYBRID.** Standalone session picks on the garden layer are the default; optional, never-forced, abandonable-without-penalty guided programs sit on top. The progression layer (garden/streak/level/badges) NEVER reads program state.

**What ships first and deepest.** The flagship `postpartum_women_30_40` track is built completely: all 18 sessions (6 durations × 3 tiers) + 10 meditation scripts, assembled from a vetted bank of 68 movements (39 new, 29 enriched). Other tracks (prenatal, general female, general adult, older-adult overlay, accessible-space/chair overlay) are architected with full routing rules and marked scaffolded for a later phase.

**Safety outcome (the headline).** Movement vetting: 49 approved, 19 approved-with-modification, **0 rejected**, plus **14 ideas explicitly refused** (crunches, sit-ups, planks, jumping, unsupported double-leg dead-bugs, loaded spinal flexion, deep back-bends, advisory-only screening). Session vetting was run adversarially: an initial gate flagged 17/18 (a calibration artifact — see section 5), a fair re-gate cleared **17/18**, and the one genuine failure (`gt-60-super-sweaty-pp`, the most demanding session) was revised per the gate's findings and re-cleared, for **18/18**.

**Open risks (detailed in each section):** pool starvation at 45/60 min (mitigated by density, not new moves); anti-compulsion erosion if any future release weights the garden by intensity (forbidden by a standing ethical condition); pose-fidelity debt for new movements (caption-only fallback is wired and safe); Super-Sweaty exertion overclaim (no week-number/%HRmax attached; talk-test framing only). Build prerequisites before vigorous tiers route to real users: implement the PAR-Q+/postpartum screening data model, the chair/floor accessibility path, and append the new movement ids + rigs.

---

## 2. The adversarial safety/ethics process (deliverable 8 + 5)

This work followed the brief's "draft → adversarially review → revise" mandate literally:
1. A 60-agent panel drafted decisions, the movement bank, personalization, the garden loop, 18 sessions, 10 meditations, and the engineering plan.
2. Every movement was adversarially vetted by the physician/PT and a women's-health/pelvic-floor RED-TEAM (verdict on each: 68 movements → 49 approved / 19 approved-with-modification / 0 rejected; 14 ideas refused outright).
3. Every session was passed through an adversarial safety gate. The first gate FAILED 17/18 — diagnosed as two calibration artifacts of the harness, not content defects: (a) the gate received only the first 6 KB of each session JSON and so saw truncated sessions, and (b) it was grounded against the *currently shipped* 29-id source and treated the panel's approved-new movements as "phantom." Cross-referencing proved **zero true fabrications** — every session id resolves to the frozen library or the vetted bank — and every session had a complete close block.
4. A FAIR re-gate (full session JSON + the vetted bank as context) cleared **17/18**. The single genuine failure, `gt-60-super-sweaty-pp`, was caught for real clinical reasons (a deep-core driver sequenced after cardio fatigue, a missing recovery beat before a loaded isometric, breath doses over the ceiling). The panel revised it per the gate's exact findings and re-verified → **18/18**.

The genuine, recurring findings (front-load deep core before cardio fatigue; insert a recovery beat between cardio and loaded holds; cap breath-item doses; surface an in-session doming/leaking checkpoint cue; lengthen the wind-down after Super Sweaty) are folded into the tier-aware assembler rules and the Definition of Done, because they are better enforced by the engine than hand-patched per session.

---


## 7. Delegated decisions — content model, meditation, progression (with rationale, voices, debate)



# DECISION: audit — Content-model audit: EXTEND additively to fit the 6×(3 tiers + meditation) matrix

**Decision:** Keep the frozen 29-id library and the assemble-from-tags engine; EXTEND additively. Add a per-movement `tierEligibility` attribute and a tier-aware assembler that varies pool, density, tempo, and rest (never swaps engines); add durations 20 and 60 alongside 7/15/30/45; migrate badge logic off the hardcoded `[7,15,30,45]` to a single `DURATIONS` constant of the six new lengths; bump the store to v2 through the existing `migrate()` seam adding tier/meditation/program fields and a guideline-acceptance flag. A full restructure is rejected: the 4628-line hand-authored `poses.js` rig — not the data schema — is the true cost center, and a rewrite throws that away while breaking the frozen ids the garden/badge/move-count history depends on.

**Rationale:**
## Verified ground truth (read from source)

- `js/data/exercises.js`: exactly 29 objects, schema `{id,name,tags,blocks,sided,secs,why,cues}`. Only ~16 carry `blocks:['main']` and feed the main block; ~6 are warmup-only, ~7 winddown, 3 breath/close.
- `js/sessionEngine.js`: `buildSession(durationMins, exercises, {lastCloseId})` is duration-agnostic — it takes minutes as a plain number and computes budgets as fractions (warm 20%, main 60%, wind 20%), `TRANSITION_SECS=6`, `allowRepeats = durationMins >= 30`. **Nothing in the engine hardcodes the four durations.** It already accepts 20 and 60 with zero changes.
- `js/main.js:618` and `:100-103`: the duration set `[7,15,30,45]` is hardcoded in the route guard and the home-screen button grid — these are the only two places the UI gates durations.
- `js/gamify.js:132`: `all-durations` checks `[7,15,30,45].every(...)`; `:124` `first-45` checks `durationsTried.includes(45)`. Both are literal arrays, not references to a shared constant.
- `js/state.js`: `CURRENT_VERSION = 1`; `migrate()` already has the version-switch seam and merges `{...base.profile, ...data.profile}` so **new fields auto-default for existing users without data loss**.
- `js/data/poses.js`: 4628 lines, 29 hand-authored rigs, one per id (warrior2 confirmed present at ~L1166). Base-rig vocabulary is closed: stand, tabletop, supine, prone, seated, kneel, sidelying.
- `js/main.js:258`: `avatar.setPose(POSES[item.ex.id] || null)` — **a missing pose is already handled**: `setPose(null)` holds the base rig while captions (`aria-live`) and voice continue. Caption-only fallback is therefore free at the engine level; its only cost is visual fidelity.

## Why EXTEND, concretely

**1. Tiers attach as a per-movement attribute, not a new engine.** Add `tierEligibility: { noSweat, slightlySweaty, superSweaty }` (booleans, or omit for "all") to each movement. The tier is a *filter + density modifier*, not a different content set. A tier-aware assembler reads a `TIER_PROFILES` table and varies four knobs over the SAME `buildSession` skeleton: (a) **pool** — which movements are eligible (`down-dog`/`legs-up`/`childs-pose` are No-Sweat-heavy; `goddess`/`chair-pose`/`squats`/`warrior2` are Super-Sweaty-eligible; bridges/bird-dog/clamshell span all three because they are the diastasis-safe core spine and must never be tier-gated out); (b) **density** — main-block fraction of strength vs. soft (No Sweat tilts soft, Super tilts strength); (c) **tempo/reps** — a per-tier `roundsHint`/`tempo` field consumed by the player and `getReady` copy, *without* changing `secs`; (d) **rest** — a tier-scaled inter-move rest layered on top of `TRANSITION_SECS`. Crucially the strength pool is identical across tiers — what changes is selection weight and reps — so this keeps the diastasis-recti hard rule (NO crunches/sit-ups/planks, NO jumping) intact for *every* tier by construction. Super Sweaty raises density/reps, never impact. **Evidence rule:** intensity must stay inside the profile's safe ceiling — graduated return per ACOG postpartum exercise guidance, and exertion framed as "comfortably challenging, can still speak" rather than a numeric HR target [ACSM exertion / talk-test framing]. I will not attach a specific %HRmax or week number to "Super Sweaty" — `[evidence: thin — flag]` on any precise threshold; the clinical reasoning is: low-impact + breath-led core + no Valsalva, scaled by reps not load, is the conservative postpartum-safe lever.

**2. The 20 & 60 durations + budget math (computed, not asserted).** With arrival≈72s and close≈75s and the existing fractions: 7 min → warm 6s / main 252s / wind 3s (effectively arrival→4 main moves→close, no separate warm/wind — already how 7 behaves today); 15 → 102/540/99; **20 (new)** → 162/720/159; 30 → 282/1080/279; 45 → 462/1620/459; **60 (new)** → 642/2160/639. Translating main seconds to moves at ~48s+6s transition: 7→4, 15→~10, 20→~13, 30→~20, 45→~30, 60→~40 main moves. **This is the load-bearing risk:** there are only ~16 main-eligible movements. At 45/60 the engine already leans on `allowRepeats`, but 40 main slots from a 16-move pool means each move repeats ~2.5×, and tiering shrinks the eligible pool further. Resolution: the assembler must satisfy long durations primarily through **density (rounds/reps within a move) and longer holds**, not through inventing distinct moves — i.e., `superSweaty@60` does 3 rounds of a circuit, not 40 unique exercises. This is also why the panel's "vary reps/tempo/rest rather than swap engines" instruction is the right one and I am defending it: it is the only way 60 min is fillable from a 16-move main pool without a content explosion. New movements added later widen the pool but the density lever is what makes 20/60 ship now.

**3. Badge migration off `[7,15,30,45]`.** Introduce `export const DURATIONS = [7,15,20,30,45,60];` (single source, likely in `sessionEngine.js` or a new `durations.js`). Replace `gamify.js:132` `all-durations` to `DURATIONS.every(d => p.durationsTried.includes(d))`. Keep `first-45` as-is (45 still exists) but rename the *intent* in the spec to "longest-of-old-tier"; do NOT retroactively re-lock `all-durations` punitively for veterans — see Risks. Update `main.js:618` and the button grid to iterate `DURATIONS` × the two modes (No Time: 7/15/20; Got Time: 30/45/60). Net code touch is ~4 sites, all literal-array replacements.

**4. Store → v2 via the existing seam.** Set `CURRENT_VERSION = 2`. In `migrate()` add `if (data.version === 1) { /* fields auto-merge via spread; no destructive transform needed */ }`. New `profile` fields: `mode` (gotTime|noTime, last-used), `tierPref` (noSweat|slightlySweaty|superSweaty), `acceptedGuidance` (bool — user has seen the postpartum-safety/exertion note; gates Super Sweaty). New `progress` fields: `tiersTried:[]`, `meditationMins:0`, `programState:{id,week,day}|null` (for the optional guided multi-week layer), and `sessions[]` records gain `tier` and `mode`. Because `migrate` spreads `{...base, ...data}`, every existing user silently gains these defaults with zero loss — `durationsTried` (e.g. `[15,45]`) is preserved. The `seenSafety` flag stays; `acceptedGuidance` is the *new* gate specifically for vigorous tier, kept separate so we don't re-prompt the whole base.

**5. poses.js cost + caption-only fallback policy.** Every NEW movement costs one of: (a) a fresh keyframe rig (~150 lines hand-authored against `rig-spec.md`, the real expense), (b) **reuse** of an existing rig (free — e.g. a "low-sweat" cooldown variant can point at an existing pose id), or (c) **documented caption-only fallback** (`POSES[id]` simply absent → `setPose(null)` → base rig held + captions/voice carry the move). Policy I recommend: **the three tiers must be deliverable with ZERO new rigs at launch**, because tiers re-weight and re-rep the existing 29 — they add no movements. Meditation likewise needs no new rig (seated breath base, like `box-breath`). Any genuinely new *movement* added later defaults to caption-only until a rig is authored, and the spec must mark each new id `rig: authored | reused:<id> | caption-only`. This keeps poses.js — the binding constraint — off the critical path for the matrix work entirely.

**6. OLD→NEW mapping (see mapping field).** Everything maps cleanly; the only true *additions* are tierEligibility, two durations, the tier knobs, and v2 fields. No id renames, no reorders, no engine swap.

## The rejected alternative (full restructure), stated at its strongest
A clean rewrite would model content as a normalized graph (movements ↔ variants ↔ tier-parameterized prescriptions) and let the assembler query it, which is genuinely more elegant for a future with hundreds of movements and many profiles. But it (a) discards/obsoletes 4628 lines of hand-authored pose data keyed on the frozen ids — the single most expensive asset in the repo; (b) breaks `moveCounts{}`, `bridge-toddlers`, `dog-days`, and garden/level history that key on those exact ids, requiring a lossy migration of real user progress; (c) buys capacity the product does not yet need (the matrix is 6×4, fillable from 29 moves + density). The restructure pays a large, certain cost now for a speculative future. EXTEND defers that cost until movement count actually outgrows the flat array.

**Mapping (old→new):**
| Concern | OLD (verified in source) | NEW | Migration / cost |
|---|---|---|---|
| Movement record schema | `{id,name,tags,blocks,sided,secs,why,cues}` (exercises.js) | + `tierEligibility:{noSweat,slightlySweaty,superSweaty}` (optional; absent ⇒ all tiers), + optional `tempo`/`roundsHint` | Additive field; old objects valid unchanged |
| Frozen 29 ids | neck-rolls … kind-close | Identical, same order | Never rename/reorder; new content appends |
| Main-eligible pool | ~16 moves `blocks:['main']` | Same pool, tier-weighted selection | No new moves required for matrix |
| Strength/core moves | bridge, bird-dog, clamshell, kickbacks, baby-cobra (diastasis-safe) | Span ALL three tiers (never tier-gated out) | Preserves DR-safe hard rule per tier |
| Assembler | `buildSession(mins, exercises, {lastCloseId})`, fractions 20/60/20, `allowRepeats = mins>=30` | Same fn + `tierProfile` arg gating pool/density/reps/rest | Backward-compatible; tier defaults to "all" |
| Durations | `[7,15,30,45]` hardcoded in main.js:100-103, main.js:618 | `DURATIONS=[7,15,20,30,45,60]`; modes No Time {7,15,20} / Got Time {30,45,60} | 20 & 60 NEW; engine already duration-agnostic |
| Route guard | `if ([7,15,30,45].includes(mins))` (main.js:618) | `if (DURATIONS.includes(mins))` | 1-line change |
| Tiers | none | 3 tiers + Meditation per duration | NEW; tier is attribute+assembler, not new engine |
| Meditation | none (only box-breath/pelvic-breath closes) | 1 core seated-breath practice scaling all 6 durations + small themed library | Reuses seated base rig; no new pose rigs |
| `all-durations` badge | `[7,15,30,45].every(...)` (gamify.js:132) | `DURATIONS.every(...)` | Literal→constant; see grace risk below |
| `first-45` badge | `durationsTried.includes(45)` (gamify.js:124) | Unchanged (45 survives) | No change |
| `bridge-toddlers`/`dog-days` | `moveCounts['bridge']`/`['down-dog']>=10` | Unchanged | Ids frozen ⇒ counts intact |
| Garden growth | +1 per completed session, thresholds `[0,1,3,6,10,15,21,28,36]` | Unchanged — consistency not intensity; tier/duration do NOT alter +1 | Anti-compulsion anchor preserved across tiers |
| Levels | minutes-based, 10 tiers | Unchanged; meditation mins may count toward totalMins (decide explicitly) | If meditation counts, flag in spec |
| Store version | `CURRENT_VERSION=1`, migrate() seam | `=2`; `if (data.version===1){}` branch | Spread-merge auto-defaults new fields, no loss |
| profile fields | name,character,voiceURI,style,voiceOn,naturalOn,fullInstructorOn,sfxOn,musicOn,musicVol,seenSafety | + mode, tierPref, acceptedGuidance | Additive |
| progress fields | sessions[],totalMins,breathCloses,durationsTried[],moveCounts{},badges{},lastCloseId | + tiersTried[], meditationMins, programState; session record + tier, mode | Additive |
| Avatar / pose | `POSES[id] \|\| null`, 29 rigs, base vocab fixed (main.js:258) | Same; new moves: authored \| reused:<id> \| caption-only | Caption fallback already wired ⇒ free |
| Programs | none | OPTIONAL guided multi-week layer on top of standalone picks (hybrid) | `programState` field; never forced |

**Voices:**
> **Lead Product Architect:** The brief calls this an EXTEND decision and I am defending it on the merits, not deferring to it. The flat 29-id array plus a tag-driven assembler is exactly the right altitude for a 6×4 matrix you can fill from sixteen main movements. Tiers are not new content — they are a re-weighting and a rep/rest dial over content we already have, which is why 'No Sweat' and 'Super Sweaty' can ship the same day with zero new pose rigs. A restructure would be intellectually satisfying and strategically premature: it buys graph-query capacity for hundreds of movements while we have twenty-nine, and it does so by setting fire to the most expensive asset in the repository.
> **Front-End Engineer:** I traced every duration literal in the codebase and there are exactly two UI sites and two badge sites that hardcode [7,15,30,45] — main.js:100-103, main.js:618, gamify.js:124 and :132. The engine itself, buildSession, takes minutes as a number and computes everything as fractions, so 20 and 60 already work; I added them to a route guard test in my head and nothing else moves. The store v2 bump is nearly free because migrate() already spreads base over data, so every new field self-defaults for existing users with no destructive transform. The one place I will not hand-wave is the avatar: POSES[item.ex.id] || null at main.js:258 means a missing rig degrades to the held base pose with captions still firing, so caption-only fallback is genuinely a no-op risk, not a crash risk.
> **Women's-health / pelvic-floor physiotherapy reviewer:** My non-negotiable is that 'Super Sweaty' must raise density and reps, never impact or intra-abdominal pressure. The diastasis-recti hard rules — no crunches, no sit-ups, no full planks, no jumping — have to hold in all three tiers by construction, which the design does by keeping bridge, bird-dog, clamshell and breath-led core eligible across every tier rather than reserving 'real' core work for the vigorous tier. I am comfortable framing exertion with a talk-test ('comfortably challenging, can still speak') consistent with ACSM-style guidance and a graduated return consistent with ACOG postpartum advice, but I will not let anyone attach a specific week number or %HRmax to a tier — that is [evidence: thin — flag] and would be overclaiming for a population whose individual clearance we do not know.
> **Behavioral-design / anti-compulsion reviewer:** The line in gamify.js — consistency makes the garden bloom, never intensity — is the spine of this product and tiers are the single biggest threat to it. The mitigation must be explicit: garden growth stays +1 per completed session regardless of tier or duration, so a seven-minute No Sweat earns exactly what a sixty-minute Super Sweaty does. If we ever let the vigorous tier grow the garden faster we will have quietly built the 'earn your food' dynamic the content spec forbids. I also want the new Super-Sweaty gate (acceptedGuidance) to read as care, not as a locked door, so it does not punish the postpartum user who is exactly who this app exists for.

**Debate:**
- **Extend the flat array vs. full content-model restructure**
  - A: Lead Product Architect: keep the frozen 29-id flat array + tag assembler and bolt on tierEligibility — the matrix is fillable from existing moves via density, and the real cost center is poses.js, not the schema.
  - B: (Steel-manned restructure case): normalize movements↔variants↔tier-prescriptions into a queryable graph so future profiles and hundreds of movements are first-class, instead of overloading a flat array with optional tier flags.
  - Resolution: EXTEND. The restructure pays a large certain cost (obsoleting 4628 lines of id-keyed pose data, breaking moveCounts/garden/badge history, lossy user-progress migration) for capacity the 6×4 matrix does not need. Architect holds veto on content-model shape; Engineer concurs the migration risk to real on-device progress is the deciding factor. Revisit only when movement count outgrows the flat array.
- **How long durations (45/60) get filled from a 16-move main pool**
  - A: Engineer: the budget math shows 60 min needs ~40 main slots; lean on allowRepeats plus more distinct moves.
  - B: Architect + PT: do NOT chase 40 distinct moves — fill long/vigorous sessions with rounds, reps, and longer holds (density), keeping the move pool small and safe.
  - Resolution: Density wins. The assembler satisfies long durations primarily via per-tier rounds/reps/holds, not unique-move count; allowRepeats stays as the backstop. This is also the only way 60 min ships now without a content explosion. PT holds veto that added density must never become added impact.
- **Should the new all-durations badge retroactively re-lock for existing users?**
  - A: Strict: all-durations should require all six lengths (7,15,20,30,45,60), full stop.
  - B: Behavioral reviewer: silently un-earning a badge a user already holds, by moving the goalposts to two brand-new durations, is exactly the punishing dynamic the product forbids.
  - Resolution: Grandfather it: if a user already holds all-durations under v1, keep it earned in the v1→v2 migration; new earners use the six-duration set. Behavioral reviewer holds veto on anything that retroactively removes earned progress.
- **Does meditation time count toward minute-based levels?**
  - A: PM lean: count meditationMins toward totalMins so the meditation library feels first-class and rewarded.
  - B: Behavioral reviewer: levels are a minutes currency; folding meditation in is defensible, but it must be a deliberate, documented choice, not an accident — and garden growth must stay +1 regardless either way.
  - Resolution: Track meditationMins as its own field NOW; make the 'counts toward levels?' decision explicit in the content spec rather than letting it leak in. Garden +1-per-session is non-negotiable regardless. Left as a flagged product decision, not silently resolved.

**Risks:**
- Pool starvation at 45/60 min: only ~16 main-eligible moves but ~30-40 main slots needed; without disciplined density (rounds/reps/holds) the session degrades into heavy repetition. The tier-aware assembler MUST implement the rep/round lever, not just pool filtering, or long Super-Sweaty sessions feel padded.
- Tier gating could accidentally remove diastasis-safe core moves (bridge/bird-dog/clamshell/breath) from a tier, violating the postpartum hard rules. Mitigation: those ids are eligible in ALL tiers by construction; add a test asserting every tier's pool contains the safe-core set and no banned pattern.
- Anti-compulsion erosion: if any tier or duration grows the garden faster or earns more than +1/session, the product silently becomes intensity-rewarding — directly against the gamify.js header principle and the 'no earn-your-food' content rule. Garden growth must stay +1/session across all tiers; verify in checkBadges/recordSession.
- Retroactive badge un-earning: moving all-durations to the six-duration set would strip the badge from users who hold it under [7,15,30,45]. Grandfather existing holders in the v1->v2 migration.
- Pose-fidelity debt: any genuinely new movement defaults to caption-only (setPose(null) holds base rig). Safe (no crash) but visually flat; without a tracked rig: authored|reused|caption-only marker per new id, caption-only debt accumulates invisibly. Tiers/meditation should require ZERO new rigs at launch to keep poses.js off the critical path.
- Super-Sweaty exertion overclaim: attaching a specific week number, %HRmax, or guideline citation to the vigorous tier for a postpartum population whose individual clearance is unknown is unsupported. Frame via talk-test / graduated-return language only; mark precise thresholds [evidence: thin — flag] and surface acceptedGuidance as a caring note, not medical advice.
- Store v2 migration correctness: migrate() must keep durationsTried, moveCounts, badges, and sessions intact while defaulting new fields. The spread-merge handles additive fields, but a v1->v2 branch should be tested against a real on-device store snapshot before release; a botched migrate() silently wipes progress (save() swallows errors).
- Mode/duration UI coupling: the home grid and route guard ([7,15,30,45] at main.js:100-103/618) are the only gates; missing one when adding 20/60 yields a duration that builds but cannot be reached (or vice versa). Drive both from the single DURATIONS constant.


# DECISION: medScope — Meditation as BOTH a single scaling core practice AND a small themed library

**Decision:** Ship BOTH, with a clear hierarchy. The flagship is ONE core meditation — an "arrive / settle / rest / return" arc — that is the default Meditation tier inside all six durations (7/15/20/30/45/60), scaling by lengthening the silences (settling, body awareness, breath dwell, and rest) while the instruction density stays flat. Around it, ship a small browsable themed library of five practices for postpartum women 30-40: Settle an Overwhelmed Mind, Sleep Wind-Down, Self-Compassion, Optional Body Scan (explicitly opt-in about body focus, trauma-aware), and Three-Minute Reset. Meditation completing a session grows the garden +1 exactly like movement — consistency, never intensity — and is recorded through the same `recordSession` path so a meditation day is a "showing up" day in every sense.

**Rationale:**
## Why BOTH, and why this hierarchy

**The honest debate.** Three live positions:

1. **One scaling practice only.** Cheapest to build, easiest to keep on-voice, zero choice-paralysis. A postpartum woman with a screaming baby does not want a menu; she wants to press one button and be carried. This is the strongest single argument and it is why the core practice is the *default*, not one item among equals.

2. **Full themed library only.** Maximises perceived value and re-engagement, matches what users expect from Calm/Headspace. But it explodes authoring cost (each theme needs its own voiced script across six lengths), dilutes Vera's voice across dozens of scripts, and — critically — reintroduces exactly the decision-load the product is built to remove. A 6-theme x 6-length library is 36 distinct scripts to author, QA, and keep body-neutral. That is a different product.

3. **BOTH (panel resolution).** A single core practice carries the 80% case with one button and one voice; a *small* curated library answers the specific, nameable needs ("I cannot sleep," "I am drowning today," "be kind to me") without becoming a content treadmill. This is correct because the two artefacts do different jobs: the core practice is the *habit* (it lives in the duration matrix, it is what "Meditation" means by default); the library is the *remedy* (browsable, opt-in, for a named state). Keeping the library *small* (5 practices, not 30) is the load-bearing constraint — it preserves the anti-choice-paralysis principle that justified position (1).

## The core practice arc and how it scales 7 -> 60 min

The arc has four named phases, in the same arrive/settle/rest/return shape the session engine already speaks ("Arrive, move, settle, close. Every time." — sessionEngine.js header). This is deliberate: meditation should feel like the same house, just a quieter room.

- **Arrive (settling)** — landing in the body and the space; permission to be here; one or two orienting breaths.
- **Settle (body awareness)** — a light, non-evaluative sweep of contact points (feet, seat, hands, the weight of the body held by the floor). Always framed as *noticing*, never *fixing* or *assessing*.
- **Rest (breath + open rest)** — the longest phase; following the natural breath, then simply resting with nothing to do. This is where silence lives.
- **Return** — re-orient to the room, a small movement of fingers/eyes, and a single affirmation drawn from the SAME affirmations pool used by `kind-close` (phrases.js). Meditation and movement therefore close on the same warm note.

**What lengthens (the rule): silence, not words.** Instruction density is a constant. The *count* of spoken cues is roughly the same at 7 minutes and at 60 minutes; what grows is the dwell time between cues — the settling pause, the body-awareness gaps, the breath count, and above all the open-rest silence. Concretely:

| Phase | 7 min | 20 min | 60 min | What changes |
|---|---|---|---|---|
| Arrive (settling) | ~45s | ~90s | ~3 min | longer landing pause |
| Settle (body awareness) | ~90s | ~4 min | ~12 min | slower, more contact points dwelt on — same cue style |
| Rest (breath + open rest) | ~3.5 min | ~12 min | ~40 min | the silence that grows most |
| Return | ~45s | ~90s | ~3 min | unhurried re-orienting + 1 affirmation |

This mirrors the existing breath moves, which already use long `secs` and sparse cues: box-breath is 75s with 4 cues, pelvic-breath 70s with 4 cues. The meditation core practice is that same authoring discipline stretched: a 60-minute practice is NOT a denser script, it is the 7-minute script with the pauses opened up. This directly protects against the failure mode where long meditations become a wall of talk. It also keeps Vera on-voice at every length, because there are not more sentences to write — there is more breathing room around the same sentences.

**Engine fit (must specify, do not hand-wave).** The core practice does not pass through the strength/mobility/stretch assembler in sessionEngine.js — meditation has no warm-up/main/wind-down split and no transitions. Implement it as a dedicated `buildMeditation(durationMins)` that emits the same `{ items, totalSecs, durationKey }` shape so the player and `recordSession` are unchanged. Each phase is one item with a long `secs` and a small cue array, exactly the existing breath-move pattern. New movement ids must APPEND (per the frozen-id rule): suggest `med-arrive`, `med-settle`, `med-rest`, `med-return` as reusable phase ids, or a single `med-core` item whose script the builder time-stretches. Either way the avatar falls back to caption/seated-breath gracefully — meditation is the *easiest* content to ship against the pose constraint because it can run caption-only or reuse the existing seated-breath rig (box-breath/pelvic-breath), so it adds little to the binding pose-authoring cost called out in the brief.

## The themed library (5 practices)

Small and curated. Each is authored at a *single* gentle length (target ~8-12 min, with a 5-min short variant where it makes sense for sleep/reset) — they are NOT cloned across all six durations. That keeps authoring bounded and keeps the *core practice* as the thing that owns the six-duration matrix.

1. **Settle an Overwhelmed Mind** — for the flooded, too-many-tabs-open state. Grounding through the senses (5-4-3-2-1 style, but voiced gently), bringing a racing nervous system down. The "locked bathroom pocket of calm" energy already in box-breath's `why`.
2. **Sleep Wind-Down** — done lying down, lights low; progressively heavier body, slowing breath, no call-to-action at the end (it must be safe to fall asleep into). Offer a 5-min and a ~15-min variant.
3. **Self-Compassion** — hands-on-heart, kindness-to-self practice in the lineage of `kind-close`. Directly answers the postpartum tendency to give everyone else patience and none to oneself ("you deserve the same kindness you give everyone else" — kind-close `why`).
4. **Optional Body Scan (opt-in body focus)** — gated behind an explicit, plain-language choice screen: a short line offering "we can rest attention on the body, or we can keep it on the breath — both are complete." Trauma-aware framing because postpartum bodies can carry birth trauma, medical trauma, body-image distress, and dissociation; attention turned inward onto the body can be activating, not calming. The scan itself is strictly non-evaluative (noticing weight/temperature/contact, never shape/size/"problem areas") to honour the body-neutral, no-"bounce-back" copy rules. The opt-in is the safety feature; never make body focus the silent default.
5. **Three-Minute Reset** — the one-handed, eyes-open-allowed, do-it-while-the-pasta-boils micro-practice. Lowest barrier in the catalogue; the on-ramp that makes the whole feature feel reachable on the worst days.

(Optional sixth, only if authoring budget allows: **Patience / Waiting** — for the 3am feed, the waiting-room, the long bedtime — but five is the recommended ship set to keep the library genuinely small.)

## How meditation feeds the garden equally

This is the most important behavioral decision and it must be implemented literally. The garden grows by COMPLETED-SESSION COUNT only — `gardenStage(totalSessions)` in gamify.js reads `p.sessions.length`, full stop. Therefore:

- A completed meditation (core practice OR a library theme) calls the SAME `recordSession()` path and pushes a normal session record. The garden advances +1, identical to a 45-minute Super Sweaty session. A 7-minute Three-Minute-Reset day and a 60-minute Goddess-hold day move the garden exactly the same: one notch.
- This is the verbatim anchor — "Consistency makes the garden bloom — never intensity" (gamify.js header). Meditation is the purest expression of that principle and arguably *protects* it: on a depleted postpartum day, meditation is how a woman keeps her streak and her garden alive without forcing her body. It turns rest into a legitimate "showing up," which is exactly the anti-compulsion stance the product already takes with grace days and forgiven streaks.
- **Levels (the minutes currency) differ on purpose.** Levels track total MINUTES moved, so a 60-min meditation accrues more level-XP than a 7-min one — but that is the *secondary* currency and it is honest (more time spent IS more minutes). The garden, the primary emotional reward, stays flat per session. Keep this split intact; do not let meditation minutes inflate the garden, and do not zero out meditation minutes from levels.
- **Badges must follow.** Because badge logic is migrating off the hardcoded `[7,15,30,45]` array (panel resolution), the meditation contribution should ride that same v2 migration: `ten-breath-closes` already rewards breath/affirmation closes and meditation's Return phase closes on an affirmation, so meditation naturally feeds it. Add at most ONE new meditation-flavoured badge later (e.g. a "stillness" badge for N completed meditations) — but do NOT gate the garden or the core streak on intensity. Recommend a `kind: 'meditation' | 'movement'` field on the session record (cheap, store-v2-friendly) so analytics-free local logic can tell them apart for badges WITHOUT ever treating one as worth more garden growth than the other.

**Voices:**
> **Meditation / Mindfulness Teacher:** The single most common mistake in app meditation is mistaking length for depth and filling long sessions with more talking. We are doing the opposite. The core practice has the same four moves — arrive, settle, rest, return — at every length; a sixty-minute sit is a seven-minute sit with the silences opened up. That is how real practice scales, and it is also why Vera stays on-voice at every duration: there are no extra sentences to write, only more breathing room around the same ones. The body scan is deliberately not the default. For a postpartum woman, turning attention inward onto the body can be the most activating thing in the room, so we offer it as an explicit, plain-language choice and treat breath-only as an equally complete path.
> **Behavioral-Science Lead:** The reason to ship both is that the core practice and the library answer two different behavioral needs. The core practice is the habit loop: one button, one voice, zero deliberation — that is what survives a bad day. The library is the named-state remedy: a woman who can articulate 'I cannot sleep' or 'I am drowning' wants a labelled door, and giving her exactly five doors satisfies that without reintroducing choice paralysis. The hard line I will hold is the garden. It must grow plus-one for a seven-minute meditation exactly as for a forty-five-minute sweat session, because the entire anti-compulsion architecture — grace days, forgiven streaks, consistency-not-intensity — collapses the moment the reward starts scaling with effort. Meditation is the cleanest possible test of that principle, and it is also the safety valve that keeps depleted users from breaking their streak by resting.

**Debate:**
- **One scaling practice vs. full themed library vs. both**
  - A: Meditation / Mindfulness Teacher initially argued for one scaling core practice ONLY: a single trusted arc the user never has to choose, lowest authoring cost, no risk of Vera's voice fragmenting across dozens of scripts, and maximal protection of the no-menu, no-decision-load ethos.
  - B: Behavioral-Science Lead pushed for a themed library to capture nameable acute states (sleep, overwhelm, self-criticism) that a single neutral practice cannot address head-on, and to give re-engagement hooks — but conceded a full Calm/Headspace-scale library would explode cost and reintroduce exactly the choice paralysis the product avoids.
  - Resolution: BOTH, with a strict hierarchy: the core practice is the DEFAULT and owns the six-duration matrix; the library is small (5 practices), single-length, and browsable for named states only. The smallness is the resolution — it preserves the teacher's anti-choice-paralysis concern while granting the scientist's named-remedy need. The Meditation/Mindfulness Teacher holds veto on the body-scan's opt-in gating and on instruction-density-stays-flat; the Behavioral-Science Lead holds veto on the garden growing equally (plus-one regardless of length or type), because that anchor is non-negotiable and product-defining.
- **Should meditation minutes inflate the garden or the levels?**
  - A: Behavioral-Science Lead: the garden must stay strictly plus-one-per-session for meditation, identical to movement, or the consistency-not-intensity anchor breaks; meditation is the purest case for that rule.
  - B: Meditation / Mindfulness Teacher agreed on the garden but noted long meditations genuinely cost more time, so the minutes-based LEVEL currency may legitimately reflect duration without contradicting the anchor.
  - Resolution: Split currencies, both intact: garden grows plus-one per completed session regardless of type or length (primary emotional reward, anchor protected); levels accrue actual minutes moved so a sixty-minute meditation earns more level-XP honestly. Do NOT let meditation minutes touch garden growth; do NOT zero meditation out of levels. Behavioral-Science Lead holds veto on the garden side.

**Risks:**
- Library scope creep: a 'small' 5-practice library quietly grows into a 30-script catalogue, reintroducing the exact choice paralysis the core practice exists to prevent and exploding authoring/QA cost. Mitigation: cap the library at 5-6 single-length practices in the product spec; new themes require explicit sign-off, not default expansion.
- Body-scan trauma activation: turning attention inward onto a postpartum body (birth trauma, medical trauma, body-image distress, dissociation) can be destabilising. If body focus is ever made the silent default it violates trauma-aware care. Mitigation: hard-gate the body scan behind an explicit plain-language opt-in, keep breath-only framed as equally complete, and keep every body cue strictly non-evaluative (weight/contact, never shape/size).
- Instruction-density drift on long sessions: future authors may 'helpfully' add more cues to 45/60-min meditations to fill silence, turning rest into a wall of talk and breaking the scaling rule. Mitigation: encode 'silence lengthens, cue count stays flat' as a spec rule and mirror the existing sparse breath-move pattern (box-breath: 75s / 4 cues).
- Garden-equality regression: a well-meaning change could make meditation worth less garden growth (or movement worth more), silently breaking the consistency-not-intensity anchor. Mitigation: route meditation through the same recordSession path, keep gardenStage keyed only on sessions.length, and add a kind field for badge logic WITHOUT branching garden growth on it.
- Engine mismatch: forcing meditation through the strength/mobility/stretch assembler (which assumes warm-up/main/wind-down + 6s transitions) would corrupt its shape. Mitigation: implement a dedicated buildMeditation() that emits the same {items, totalSecs, durationKey} contract so player and recordSession stay unchanged.
- Sleep Wind-Down safety: a sleep practice that ends with a call-to-action or re-orienting cue is wrong if the user is meant to fall asleep into it. Mitigation: author the sleep theme with no return/activation phase and offer it lying down with lights-low framing.
- Frozen-id and store-version discipline: adding meditation content by editing existing ids or skipping the v2 store bump would break migrations and the frozen-id contract. Mitigation: append new ids (e.g. med-arrive/med-settle/med-rest/med-return), add the kind field under the store-v2 migration that the badge work already requires.


# DECISION: progression — Section 5c — Justifying the HYBRID Progression Model (standalone picks on the garden layer + optional, never-forced guided programs)

**Decision:** Adopt the HYBRID model as resolved: standalone session picks remain the primary, default surface and continue to advance the garden purely by completed-session count, while optional, multi-week guided programs (e.g. a postpartum "rebuild" arc) are an additive overlay the user can opt into, pause, or abandon at any moment with zero penalty. The garden, streaks, levels, and badges MUST never read program state — a program day and a free-pick day are indistinguishable to the progression layer. A program is a suggestion engine for "what to do today," not a gate on "whether today counted."

**Rationale:**
## What the source already enforces (and why HYBRID fits it cleanly)

The existing engineering makes HYBRID the low-risk choice and a mandatory program the high-risk one:

- **Garden growth is structurally decoupled from *how* a session was chosen.** In `js/gamify.js`, `gardenStage(totalSessions, thresholds)` reads only `p.sessions.length`, and `recordSession(...)` does `p.sessions.push({...})` for *any* finished session. `js/main.js` computes the stage from `store.progress.sessions.length` (lines 58, 317, 325). There is no field anywhere in `js/state.js` `progress{}` that records *why* a session was picked. A guided program therefore should write the **same** session record as a free pick — `{date,mins,durationKey,startHour,breathClose,completed,skipped}` — and let `recordSession`/`gardenStage` treat it identically. This is the technical embodiment of the verbatim design anchor "Consistency makes the garden bloom — never intensity" (gamify.js header, surfaced to the user in main.js line 82). A program must not smuggle an intensity- or adherence-gate in through the back door.

- **The store has a clean v1→v2 migrate seam** (`state.js` `migrate()` switches on `data.version`). Program state belongs in an additive, *optional* slice — e.g. `progress.program = { id, startedOn, completedDayKeys:[], pausedOn, abandonedOn } | null`, populated only if the user opts in, defaulting to `null`. Because garden/levels/badges never read it, an absent or abandoned program is the zero-cost default and no migration can orphan progress. This matches the panel resolution to "bump store to v2 / extend additively, do not restructure."

- **Streaks are already kind by design** (grace days; survives ≤2 misses in any rolling 7-day window; `comeback-queen` celebrates the save). A mandatory program would fight this kindness: program calendars imply "you are on Day 7 and you missed it," precisely the all-or-nothing framing the grace-day system was built to defuse. The program overlay must inherit the streak philosophy, not override it — missing a "program day" must be as forgiven as missing any day.

## Behavioral-science reasoning (habit formation)

- **Default-to-standalone respects the formed behavior, not an imposed schedule.** Habit formation (Lally et al. on automaticity; BJ Fogg's Tiny Habits) shows habits consolidate around *a stable cue and a low-friction, self-selected action*, not around externally dictated escalating workloads. The 7/15/20-minute "No Time" tier is the habit-formation workhorse; forcing a user into "Day 4 of 21" the moment they open the app raises activation energy and replaces an intrinsic cue ("I have ten minutes and want to feel better") with an extrinsic obligation ("I owe the program a session").

- **Optionality converts the program from an obligation into a scaffold.** A guided arc genuinely helps the subset of users who want structure and "what next" decided for them (choice-overload reduction; the sense of a planned path). The behavioral win is offering that scaffold *without* converting the majority's flexible practice into a contract they can fail. Frame it as a *playlist you dip into*, not a *plan you are behind on*.

- **Never-forced means the off-ramp is as visible as the on-ramp.** "Abandonable without penalty" is not just a settings toggle — it is a copy and surfacing commitment: one-tap "pause" and "leave this program" with Vera-voiced, body-neutral, permission-giving reassurance ("This is here whenever you want it — your garden grows either way"). Abandoning must *not* reset `completedDayKeys` mournfully or show a broken-progress meter; it sets `program = null` (or `abandonedOn`) and the user lands back on the free-pick home, garden fully intact.

## Clinical reasoning — why this matters for THIS audience

- **Postpartum recovery is non-linear; a fixed weekly escalation assumes a linearity that does not exist.** Energy, sleep debt, lochia/bleeding, mastitis, C-section vs vaginal recovery, pelvic-floor symptoms, and relapsing fatigue fluctuate week to week. ACOG guidance on postpartum physical activity emphasizes *gradual, individualized return* and medical clearance, and cautions against rigid timelines [ACOG Committee Opinion on physical activity and exercise during pregnancy and the postpartum period]. A mandatory "Week 3 = harder than Week 2" program structurally contradicts individualized, symptom-responsive progression. The optional "rebuild" arc must be *gentle and non-monotonic* — it may revisit easier days, and the user (not the calendar) decides the day's tier.

- **Readiness, not the calendar, sets intensity.** Because the app captures NO intake/screening/injury/pregnancy flags today (per `state.js` profile), the program cannot safely *assume* a user's recovery stage. It must keep the existing safety hard-rules (diastasis-recti-safe: no crunches/sit-ups/full planks; low-impact; no jumping — content-spec.md) as an inviolable floor for *every* program day, and let the user self-select tier within the safe ceiling. A "Super Sweaty" program day must still respect the postpartum safe ceiling, exactly as a free pick does. Use ACSM's RPE/talk-test framing for "how hard" guidance rather than prescribed loads [ACSM exertion guidance]. For any specific "weeks-postpartum → intensity" mapping: **[evidence: thin — flag]** — the clinically safe move is to let symptoms and self-report gate effort, with the standing "check with your doctor" note already present at main.js line 130; we should not encode a fixed mapping.

## Addiction / compulsion reasoning — why we never gate the garden behind adherence

- **Streak-and-program gating is the classic compulsion engine.** The danger pattern in habit apps is *loss-framed continuity* (Duolingo-style "don't break your streak" + a program completion bar). When a visible, accumulating reward (the garden, which "visibly accumulates, nothing disappears" — garden.js header) is made contingent on *not missing program days*, you manufacture the exact all-or-nothing relapse dynamic recovery-aware design avoids: one missed day feels like it threatens the whole structure, the user over-exercises to "catch up," or quits entirely after a lapse (the abstinence-violation effect).

- **The garden is the anti-compulsion anchor and must stay unconditional.** Growth is +1 per completed session regardless of length/intensity *or* program membership. This lets a postpartum user who can only manage a 7-minute "No Sweat" day still watch their garden grow — the reward tracks *showing up*, never *performance against a plan*. Gating it behind program adherence would punish exactly the fluctuating, low-capacity days when the user most needs reassurance that they still counted. The technical guarantee, to be enforced in review: `gardenStage`, `levelInfo`, `streakInfo`, and `checkBadges` take `progress` and thresholds only — none may ever take `program` as input.

- **A lapse must be a soft landing, never a reset.** If a user drifts off a program, the program does not "fail" them — it quietly waits, or they leave it. Their garden, level (minutes moved), streak (with grace days), and badges are entirely untouched, because those subsystems never knew the program existed.

## How the optional "rebuild" arc is structured, surfaced, and abandoned

- **Structure:** a short, gentle, named multi-week arc (e.g. "Gentle Rebuild") expressed as an *ordered list of suggested session specs* — each day = `{ suggestedDuration, suggestedTier, theme, optionalNote }` drawn from the SAME tier-aware assembler the free picker uses (the `buildSession` pipeline in sessionEngine.js). It does not introduce a parallel content path. Early days favor "No Sweat" breath-led core and mobility; the arc can plateau and revisit, and the user may override the suggested tier/duration on any day.
- **Surfacing:** discoverable but never modal-blocking. On the home/garden screen, a single low-pressure entry point ("Want a guided path? Try Gentle Rebuild — optional, leave anytime"). When enrolled, the home shows *today's suggestion* as a pre-filled pick the user can accept or ignore in favor of any free pick. It is a suggestion, not a checkpoint.
- **Abandonment without penalty:** one-tap pause and one-tap leave, with warm copy and no loss-framed visuals. Leaving sets `program = null`/`abandonedOn`; completed program sessions remain in `sessions[]` (they already grew the garden); nothing is clawed back. Re-enrolling later is allowed and equally low-friction.

## Stress-testing the panel resolution (as required)

HYBRID survives the obvious failure modes: (1) a user who never wants structure is never confronted with one (default `program = null`); (2) a user who wants structure gets it without a contract; (3) a lapsing/relapsing user cannot be punished by the progression layer because that layer is blind to program state; (4) the v2 store change is additive and migration-safe. The one place HYBRID must be defended in code review is the temptation to "reward" program completion with bonus garden growth — this MUST be refused, because any program→garden coupling reintroduces the compulsion gate the model exists to prevent. A program-completion *badge* (cosmetic, in the existing badge system, earned by finishing the arc but with the garden already grown along the way) is the acceptable celebration; a garden boost is not.

**Mapping (old→new):**
| OLD (today) | NEW (HYBRID) | Note |
|---|---|---|
| `progress{}` has no program field (state.js) | add optional `progress.program = {id,startedOn,completedDayKeys:[],pausedOn,abandonedOn}` \| `null`, default `null` | additive; v1→v2 migrate seam; garden/levels/badges never read it |
| Session record `{date,mins,durationKey,startHour,breathClose,completed,skipped}` | unchanged; a program day writes the IDENTICAL record | program-ness is NOT stored on the session — keeps garden blind to it |
| `gardenStage(p.sessions.length, thresholds)` (gamify.js / main.js 58,317,325) | unchanged — still counts ALL finished sessions equally | the never-gate guarantee, enforced in review |
| `recordSession(store, stats)` increments `sessions`,`totalMins`,etc. (gamify.js) | unchanged; called the same way after a program-suggested session | one code path, not two |
| Home/garden screen = garden + free-pick entry (main.js) | + optional, dismissible "guided path" entry point and (if enrolled) today's pre-filled suggestion | never modal-blocking; free pick always available |
| `buildSession(durationMins, exercises, {lastCloseId})` (sessionEngine.js) | program supplies `{suggestedDuration, suggestedTier}` INTO the same tier-aware assembler | program = suggestion layer over the existing builder, not a new content path |
| 14 badges (badges.js) | optional additive cosmetic badge for completing an arc; NO garden bonus | celebration without coupling |
| Safety hard-rules (content-spec.md) | apply to EVERY program day unchanged; tier self-selected within postpartum safe ceiling | non-monotonic, symptom-responsive, never calendar-forced |

**Voices:**
> **Behavioral-science / habit-formation lead:** Habits consolidate around a stable cue and a low-friction, self-chosen action — not around an externally dictated escalating schedule. Our 7/15/20-minute 'No Time' tier is the real engine of automaticity here, and the standalone free pick must stay the default so the cue stays intrinsic ('I have ten minutes and want to feel better') rather than extrinsic ('I owe the program Day 4'). A guided arc earns its place only as an opt-in scaffold for the users who actively want structure, framed as a playlist you dip into, never a plan you are behind on. The technical tell that we got it right: a program day and a free day write the identical session record, so the habit loop and its reward are indistinguishable to the system.
> **Clinical psychologist (perinatal):** Postpartum recovery is non-linear in a way fixed weekly escalation simply cannot model — sleep debt, bleeding, pelvic-floor symptoms, surgical recovery, and relapsing fatigue all fluctuate week to week, and ACOG's guidance is explicitly individualized and clearance-gated rather than timeline-driven. Because the app captures no intake or screening flags, the program must not assume a recovery stage; readiness and symptoms set intensity, not the calendar. The 'rebuild' arc should be gentle, allowed to plateau and revisit easier days, and the user — not Day N — chooses today's tier within the existing diastasis-recti-safe ceiling. Any specific 'weeks-postpartum maps to this intensity' rule is evidence-thin and we should not encode one.
> **Addiction / compulsion therapist:** The single most dangerous thing we could build is a visible accumulating reward gated behind 'don't miss a program day.' That is the textbook compulsion engine: loss-framed continuity plus a completion bar produces catch-up over-exercising and the abstinence-violation 'I blew it, I quit' collapse — and it lands hardest on exactly the low-capacity days a postpartum user most needs reassurance. The garden grows +1 for showing up at all, regardless of length, intensity, or program membership, and that unconditionality is the recovery-aware anchor. My non-negotiable: gardenStage, levelInfo, streakInfo and checkBadges may never take program state as input — celebrate finishing an arc with a cosmetic badge if you like, but never with a garden boost.

**Debate:**
- **Pure standalone vs mandatory program vs hybrid**
  - A: Behavioral-science lead argues pure standalone is safest — never confront the user with structure, let the habit form around free picks; a program risks importing obligation framing that suppresses intrinsic motivation.
  - B: A program-advocate position (steelmanned by the clinical psychologist) argues a guided 'rebuild' arc gives genuine value: choice-overload reduction and a sense of a planned recovery path that many postpartum users want and ask for.
  - Resolution: HYBRID, as pre-resolved by the panel and confirmed here: standalone is the default surface, the program is a fully optional overlay. Optionality captures the program's value for the subset who want it while the standalone default protects everyone else. Adopted.
- **Should completing a program reward extra garden growth?**
  - A: A gamification/engagement instinct says rewarding arc completion with bonus garden growth would drive program uptake and retention.
  - B: Addiction therapist (and behavioral-science lead) argue any program→garden coupling reintroduces an adherence gate and the all-or-nothing compulsion dynamic the whole model exists to prevent; it also violates the verbatim 'consistency, never intensity' anchor.
  - Resolution: Refused. Garden growth stays unconditional (+1 per completed session, program-blind). Arc completion may be celebrated only with a cosmetic, additive badge. Addiction therapist holds VETO on any subsystem (garden/levels/streak/badges) taking program state as input, on harm-prevention grounds.
- **How prescriptive may the program's intensity progression be?**
  - A: A structured-programming view favors a clear, escalating week-over-week intensity curve so users feel a sense of progress.
  - B: Clinical psychologist argues postpartum recovery is non-linear and unscreened in this app, so a fixed escalation is clinically unsafe to assume; intensity must be user/symptom-selected within the safe ceiling, and the arc may plateau or revisit easier days.
  - Resolution: Non-monotonic, symptom-responsive program: it suggests duration/tier but the user overrides freely, and the diastasis-recti-safe hard-rules apply to every day. Clinical psychologist holds VETO on safety/progression-curve claims; any 'weeks-postpartum → intensity' mapping is flagged [evidence: thin] and not encoded.

**Risks:**
- Coupling creep in review: a future contributor adds a program-completion bonus to gardenStage/levelInfo, silently reintroducing the adherence gate. Mitigation: enforce in code review that gardenStage, levelInfo, streakInfo, and checkBadges take only progress + thresholds — never program; add a comment in gamify.js stating the invariant.
- Surfacing creep: the optional program entry point becomes a modal or a nag that blocks the free-pick path, undermining 'never-forced.' Mitigation: program entry must be a dismissible, non-blocking card; the free pick is always reachable in one tap.
- Loss-framed program UI: showing 'Day 7 — missed' or a broken-progress meter imports streak-anxiety the grace-day system was built to defuse. Mitigation: program copy is Vera-voiced and body-neutral; no missed-day shaming; pause/leave are as visible as enroll.
- Clinical over-prescription: a fixed escalating intensity curve assumes a linear postpartum recovery the app cannot screen for (no intake/injury/pregnancy flags). Mitigation: user-selected tier within the safe ceiling; non-monotonic arc; keep the existing 'check with your doctor' note; flag any weeks→intensity mapping as evidence-thin and do not ship one.
- Migration regressions: adding progress.program must not orphan existing v1 progress. Mitigation: additive field defaulting to null in the v1→v2 migrate() seam; absent/abandoned program is the zero-cost default; existing sessions[] untouched.
- Abandonment with residue: leaving a program leaves a sad broken-progress artifact or claws back completed sessions. Mitigation: completed program sessions stay in sessions[] (they already grew the garden); leaving sets program=null/abandonedOn and lands the user on the intact garden home.


## 3. Personalization engine — intake, PAR-Q+ screening, red-flag gates, FILTER/SUBSTITUTE/SCALE/ROUTE

# PERSONALIZATION ENGINE

## Intake schema
## v2 Intake Schema — `store.profile.intake` (entirely on-device, entirely optional)

Added through the existing `migrate()` seam at `js/state.js` when bumping `CURRENT_VERSION` 1 → 2. The whole `intake` object and every field within it is OPTIONAL. A user who taps "Skip — just let me move" gets `intake: null`, which the engine treats as the **default-safe** profile (see ROUTE: `unset` row). No field is ever required to start a session. Everything is editable at any time from Settings; editing re-runs the pure rule engine on the next session build. Nothing is transmitted — it is written to the same `nrjf.store` localStorage key as the rest of the profile.

Two flags pulled OUT of `intake` and kept at `profile` top level because they are consent/legal, not body data: `guidelineAccepted` (the user has seen the "this is exercise guidance, not medical advice; consult a clinician about your own body" notice) and `consultClinicianAck` (the user has acknowledged a red-flag gate at least once). Keeping them at the profile root means the gate logic never has to assume `intake` exists.

```json
{
  "version": 2,
  "profile": {
    "name": "",
    "character": "vera",
    "style": "gentle",
    "voiceOn": true, "naturalOn": false, "fullInstructorOn": false,
    "sfxOn": true, "musicOn": false, "musicVol": 0.5,
    "seenSafety": false,

    "guidelineAccepted": false,
    "consultClinicianAck": false,

    "intake": {
      "sexAssignedAtBirth": null,
      "genderIdentity": null,
      "ageBand": null,
      "heightCm": null,
      "weightKg": null,
      "unitPref": "metric",

      "lifeStage": null,
      "weeksSinceBirth": null,
      "birthType": null,
      "clearedByClinician": null,

      "conditionFlags": [],
      "injuryFlags": [],

      "experience": "returning",
      "equipment": [],
      "space": "mat",

      "parq": {
        "heartCondition": null,
        "chestPainActivity": null,
        "chestPainRest": null,
        "dizzinessBalanceLoss": null,
        "boneJointProblem": null,
        "bpOrMetabolicMeds": null,
        "otherReasonNotToMove": null,
        "pp_bleeding": null,
        "pp_leakingPainPressure": null,
        "pp_dr_doming": null,
        "pp_csectionPain": null
      },
      "parqUpdatedAt": null
    }
  }
}
```

**Field meanings and how each is used (every "used by" maps to a rule table or gate below):**

| Field | Type / allowed values | How / whether it is used |
|---|---|---|
| `sexAssignedAtBirth` | `"female"` \| `"male"` \| `"intersex"` \| `"prefer_not"` \| `null` | Gates whether the pregnancy/postpartum branch and pelvic-floor-specific copy are even OFFERED. Used ONLY to decide what to ask next and which evidence base applies (ACOG/pelvic-health is sex-specific); never used to assign a track by itself. `prefer_not`/`null` → engine simply skips the pregnancy branch and asks `lifeStage` directly. |
| `genderIdentity` | free-select chip list incl. `"woman"`,`"man"`,`"non_binary"`,`"prefer_to_self_describe"` (+free text), `null` | Drives Vera's address copy ONLY. Decoupled from `sexAssignedAtBirth` so a trans or non-binary user gets correct anatomy-relevant routing AND correct gendered/neutral language. Never used in FILTER/SCALE/ROUTE. |
| `ageBand` | `"u18"` \| `"18_29"` \| `"30_39"` \| `"40_49"` \| `"50_64"` \| `"65_plus"` \| `null` | Band, not exact age, to avoid false precision. `u18` and `65_plus` add a PAR-Q+ age-related caution (SCALE) and `65_plus` lowers the Super Sweaty ceiling one notch (ROUTE). Flagship `postpartum_women_30_40` matches `30_39` (and accepts `18_29`/`40_49` into the same track with no ceiling change). |
| `heightCm` | int or `null` | See "weightUse" deliverable. Used for ONE thing only: an optional, non-judgemental BMI-band sanity check that nudges joint-load SCALE on high-impact-adjacent moves. Never shown back as a number. May be left blank with zero consequence. |
| `weightKg` | int or `null` | Same — see "weightUse". Never a goal, never a target, never displayed as progress, never gates a tier. |
| `unitPref` | `"metric"` \| `"imperial"` | Display only. |
| `lifeStage` | `"none"` \| `"pregnant"` \| `"pp_early"` (0–6 wk) \| `"pp_recovery"` (6–12 wk) \| `"pp_strengthening"` (12wk–12mo) \| `"pp_late"` (>12 mo, "years postpartum") \| `null` | PRIMARY router input. Maps directly to ROUTE rows. `null`/`none` with `sexAssignedAtBirth=female` still routes to general-female default-safe; the brief audience ("possibly years postpartum") is captured by `pp_late`. |
| `weeksSinceBirth` | int or `null` | Refines `pp_*` boundaries when the user prefers a number over a band; if present it overrides the coarse `lifeStage` band for FILTER timing (e.g. <6 wk forces `pp_early` filters regardless of selected band). |
| `birthType` | `"vaginal"` \| `"cesarean"` \| `"both"` \| `"prefer_not"` \| `null` | `cesarean`/`both` adds a C-section abdominal-loading SUBSTITUTE/SCALE layer (slower progression of front-loading work, see SCALE flag `csection`). |
| `clearedByClinician` | `true` \| `false` \| `null` | Postpartum vigorous-tier gate input (see RED-FLAG GATES `pp_not_cleared`). `null` is treated as "not confirmed" → default-safe, vigorous gated. |
| `conditionFlags` | multi-select array, allowed ids: `"hypertension"`,`"cardiac"`,`"diabetes"`,`"pregnancy_hbp_preeclampsia"`,`"prolapse"`,`"dr_diastasis"`,`"hypermobility_eds"`,`"osteoporosis"`,`"pregnant_high_risk"`,`"recent_surgery"` | Each id maps to FILTER/SUBSTITUTE/SCALE rows and, for some, a RED-FLAG GATE. Structured (ids), never free text, so the rule engine stays deterministic. |
| `injuryFlags` | multi-select array, allowed ids: `"low_back"`,`"neck"`,`"shoulder"`,`"wrist"`,`"hip"`,`"knee"`,`"ankle"`,`"pelvic_floor"`,`"sciatica"`,`"pelvic_girdle_pain"` | Region ids drive FILTER (remove provoking moves) + SUBSTITUTE (offer a safe equivalent) + SCALE (reduce ROM/hold). |
| `experience` | `"new"` \| `"returning"` \| `"regular"` | SCALE input only (rep/round density, tempo, progression speed). NEVER unlocks a tier on its own — a "regular" exerciser who is `pp_early` is still filtered by stage. |
| `equipment` | array, default `[]` (none) | `[]` = bodyweight only, which is the entire current library, so default changes nothing. Reserved for scaffolded tracks; flagship ignores it (no equipment moves exist among the 29 ids). |
| `space` | `"mat"` \| `"standing_only"` \| `"chair"` \| `"bed"` | FILTER input: `chair`/`bed`/`standing_only` remove floor-/supine-/prone-dependent moves and lean the pool toward seated/standing equivalents. This is also the seed of the not-yet-existing "chair mode." |
| `parq.*` | `true`/`false`/`null` per item | The PAR-Q+-based readiness screen (see "screening"). Drives the RED-FLAG GATES. `null` (unanswered) is treated conservatively as "yes" for the cardiac items when a vigorous tier is requested — i.e. unanswered does not silently unlock vigorous. |
| `parqUpdatedAt` | ISO date or `null` | Used to prompt a light re-confirmation of the PAR-Q+ if it is older than ~12 months or if `lifeStage` changed — a transparent staleness nudge, not a lockout. |

## Height/weight use
Height and weight are OPTIONAL, default `null`, and have exactly ONE permitted internal use: an on-device joint-load sanity nudge. If BOTH `heightCm` and `weightKg` are present, the engine computes a private BMI band purely to decide whether to bias the SCALE table toward lower joint load on the few weight-bearing-intensive moves (deep `goddess`/`chair-pose`/`squats` holds and `down-dog` wrist/shoulder loading) — specifically, a high BMI band nudges those toward shorter holds, more rest, and the knee-down / wall / chair SUBSTITUTE earlier. That is the entire use.

Firm, enforced constraints (these are product rules, not suggestions):
- Height and weight are NEVER displayed back to the user as a number, a BMI, a category label, or any kind of readout. There is no weigh-in screen.
- They are NEVER used as a goal, target, or progress metric. The garden grows on completed-session COUNT and levels track MINUTES MOVED — neither ever reads weight. (See gamify.js header: "Consistency makes the garden bloom — never intensity.")
- They NEVER gate a tier. A higher BMI band can soften scaling for joint comfort; it can NEVER lock someone out of No Sweat / Slightly Sweaty / Super Sweaty / Meditation. Tier gating is driven solely by PAR-Q+ red flags and postpartum stage.
- No copy anywhere references weight, size, shape, "bounce back," or calories — this is enforced by the existing content-spec hard rules and the Vera voice guide.
- If the user leaves them blank, the engine simply skips the BMI nudge entirely; there is zero penalty and zero nag. The field's helper text says plainly: "Optional. Only used to keep joint load comfortable. Never shown, never a goal."

Rationale for keeping them at all rather than dropping them: the honest clinical value is small and indirect (joint comfort on loaded holds), so the design deliberately makes the fields skippable and invisible. The panel debated removing them entirely (see debate); they survive only because they are quarantined to SCALE-softening and structurally cannot be surfaced or weaponised.

## Screening
## Readiness screen — PAR-Q+-derived, on-device, zero clinical judgement at runtime

The screen is a short, plain-language adaptation of the **PAR-Q+ (2024 Physical Activity Readiness Questionnaire for Everyone, CSEP)** general health questions, plus four postpartum-specific items grounded in **ACOG Committee Opinion 804 (Physical Activity and Exercise During Pregnancy and the Postpartum Period)** and pelvic-health physiotherapy consensus. It is presented ONLY when the user opts into personalization, and ONLY the items relevant to their `lifeStage`/`conditionFlags` are shown (e.g. the `pp_*` items appear only for postpartum stages). Each item is a yes/no/skip chip with a one-line "why we ask."

**General items (PAR-Q+ derived — `parq.*`):**
- `heartCondition` — "Has a doctor ever said you have a heart condition and should only do activity recommended by a doctor?"
- `chestPainActivity` — "Do you feel pain in your chest when you do physical activity?"
- `chestPainRest` — "In the past month, have you had chest pain when you were not doing physical activity?"
- `dizzinessBalanceLoss` — "Do you lose balance from dizziness, or ever lose consciousness?"
- `boneJointProblem` — "Do you have a bone or joint problem that could be made worse by activity?"
- `bpOrMetabolicMeds` — "Are you on medication for blood pressure or a heart/metabolic condition?"
- `otherReasonNotToMove` — "Do you know of any other reason you should not do physical activity?"

**Postpartum/pregnancy items (ACOG-derived):**
- `pp_bleeding` — "Are you currently bleeding heavily or passing clots (beyond normal lochia)?"
- `pp_leakingPainPressure` — "Do you leak urine, or feel heaviness, bulging, or pressure 'down below' with effort?" (pelvic-floor / prolapse screen)
- `pp_dr_doming` — "When you sit up or strain, does the middle of your belly dome or cone outward?" (diastasis-recti screen)
- `pp_csectionPain` — "If you had a C-section, do you still have pain at the incision with movement?"

**On-device logic (pure rules — see Red-Flag Gates for exact wiring):**
1. Any general "yes" on the four cardiac/dizziness items (`heartCondition`, `chestPainActivity`, `chestPainRest`, `dizzinessBalanceLoss`) OR `otherReasonNotToMove=yes` fires the **`cardiac_clearance`** gate: Super Sweaty (and pregnancy/postpartum vigorous) is blocked to "consult a clinician first"; No Sweat, Slightly Sweaty, and Meditation remain available. This mirrors PAR-Q+ "answered YES to one or more → follow up before vigorous activity."
2. `boneJointProblem=yes` does NOT gate a tier; it routes the relevant `injuryFlags` follow-up and feeds SCALE (reduced ROM/load) — PAR-Q+ treats musculoskeletal items as modify-not-stop.
3. `bpOrMetabolicMeds=yes` adds a SCALE caution (avoid breath-holding/Valsalva, prefer steady exertion) and, combined with `pregnancy_hbp_preeclampsia`, fires `pp_obstetric_redflag`.
4. Postpartum red items (`pp_bleeding=yes`, `pp_leakingPainPressure=yes` with effort, `pp_dr_doming=yes`, `pp_csectionPain=yes`) each fire stage-appropriate gates (below) — none of which require the app to interpret severity. The app only ever reacts to the literal yes/no the user selected. No symptom is "diagnosed"; the message is always "this is worth a clinician's eyes, and here is the gentler track meanwhile."
5. `null` (skipped) on the four cardiac items is treated as a "yes" FOR THE PURPOSE OF UNLOCKING Super Sweaty only — i.e. skipping does not silently unlock vigorous activity. It does not block the gentler tiers.
6. `parqUpdatedAt` older than 12 months, or a change in `lifeStage`, prompts a light re-confirm. This is a transparent nudge, never a lockout.

Staleness, re-confirmation, and every gate message are deterministic string outputs of the answers — no model, no scoring heuristic, no clinical inference happens at runtime.

## Red-flag gates
- **Trigger:** Any YES (or skipped/null when Super Sweaty is requested) on parq.heartCondition, parq.chestPainActivity, parq.chestPainRest, parq.dizzinessBalanceLoss, or parq.otherReasonNotToMove → **Gate:** BLOCK all vigorous tiers. Message (Vera voice): 'Before we pick up the pace, this is worth a quick word with your doctor or midwife — your safety matters more than any workout. Until then, the gentle and moderate sessions and meditation are all here for you.' Sets profile.consultClinicianAck on dismiss. Re-offers the gentler tiers immediately so the user is never left with nothing. | blocks: ['Super Sweaty (all durations)', 'postpartum vigorous progression']
- **Trigger:** parq.pp_bleeding = YES (heavy bleeding / clots beyond normal lochia), any postpartum stage → **Gate:** BLOCK all movement tiers; offer Meditation only. Message: 'Heavy bleeding is your body asking for rest, not movement. Please check in with your clinician before exercising. A calming breath practice is here whenever you want it.' Grounded in ACOG 804 (postpartum return-to-activity should follow resolution of bleeding/medical clearance). | blocks: ['No Sweat', 'Slightly Sweaty', 'Super Sweaty']
- **Trigger:** lifeStage = pp_early (0–6 wk) AND clearedByClinician != true → **Gate:** BLOCK Slightly Sweaty and Super Sweaty. Allow No Sweat (restorative/breath-led only — gentle mobility, pelvic breathing, no loaded strength) and Meditation. Message: 'In these first weeks, the kindest training is breath, gentle movement, and rest. Most clinicians clear exercise around your 6-week check — once you are cleared, more options open up here automatically.' [evidence: ACOG 804 — typical clearance around the postpartum visit; exact timing is individual]. | blocks: ['Slightly Sweaty', 'Super Sweaty']
- **Trigger:** lifeStage in {pp_recovery, pp_strengthening, pp_late} AND clearedByClinician != true AND user requests Super Sweaty → **Gate:** BLOCK Super Sweaty only; Slightly Sweaty allowed. Message: 'Before the most vigorous sessions, it is worth confirming with your clinician that your recovery is on track — especially the deep core and pelvic floor. Slightly Sweaty is a great place to build in the meantime.' | blocks: ['Super Sweaty']
- **Trigger:** parq.pp_dr_doming = YES OR conditionFlags includes dr_diastasis → **Gate:** Do NOT block a whole tier; instead hard-FILTER any front-loading/intra-abdominal-pressure work and force the diastasis-safe SUBSTITUTE set across ALL tiers (already the library default — no crunches/sit-ups/planks exist). Cap the top tier requested at Slightly Sweaty until clearedByClinician=true. Message: 'That doming is a sign your deep core is still knitting back together. We will keep everything breath-led and belly-kind, and a pelvic-health physio can guide the rest.' Grounded in pelvic-health physiotherapy consensus on diastasis management. | blocks: ['Super Sweaty (until cleared)']
- **Trigger:** parq.pp_leakingPainPressure = YES OR conditionFlags includes prolapse → **Gate:** BLOCK Super Sweaty (vigorous = higher intra-abdominal pressure / impact load on pelvic floor). Allow No Sweat and Slightly Sweaty with the pelvic-floor SCALE layer (no breath-holding, no max-effort holds, supported variants). Message: 'Leaking or heaviness is common and very treatable — it is also a sign to keep load gentle for now. A pelvic-health physiotherapist can make a real difference. Meanwhile we will keep things supportive.' [evidence: pelvic health physiotherapy consensus; impact/high-IAP load is commonly limited with symptomatic pelvic floor]. | blocks: ['Super Sweaty']
- **Trigger:** parq.pp_csectionPain = YES OR (birthType in {cesarean, both} AND weeksSinceBirth < 12) → **Gate:** Do NOT block a tier outright; apply csection SCALE (slower progression of any front-of-trunk loading, extra warm-up, shorter holds) and cap requested tier at Slightly Sweaty until pain-free and/or clearedByClinician=true. Message: 'A C-section is major abdominal surgery, and your core deserves a slow, respectful rebuild. We will take the front of your body especially gently.' | blocks: ['Super Sweaty (until pain-free / cleared)']
- **Trigger:** conditionFlags includes pregnancy_hbp_preeclampsia, OR (lifeStage=pregnant AND conditionFlags includes pregnant_high_risk), OR bpOrMetabolicMeds=YES combined with a pregnancy stage → **Gate:** BLOCK Slightly Sweaty and Super Sweaty for the pregnancy branch; allow No Sweat (gentle mobility + breath) and Meditation. Message: 'With raised blood pressure in pregnancy, vigorous activity needs your obstetric team's say-so first. Gentle movement and breathing are here for you.' [evidence: ACOG 804 lists preeclampsia/poorly controlled HTN among relative/absolute contraindications — exact category is condition-specific, flag for clinician]. | blocks: ['Slightly Sweaty', 'Super Sweaty']
- **Trigger:** ageBand = u18 → **Gate:** No hard block, but require profile.guidelineAccepted and show: 'This app was made for adults. If you are under 18, please move with a parent or coach who knows you.' Super Sweaty additionally requires the cardiac PAR-Q+ to be fully answered (no skips). | blocks: []
- **Trigger:** conditionFlags includes osteoporosis → **Gate:** Do NOT block a tier; FILTER deep spinal flexion under load and apply SCALE (reduce end-range flexion/twist). Message: 'For bone health we will keep big spinal rounding gentle and avoid forcing any twist.' [evidence: thin on exact movements — flag; general consensus favours avoiding loaded end-range flexion in osteoporosis]. | blocks: []

## FILTER table
## FILTER — remove movement ids entirely from the candidate pool before the assembler runs

The filtered pool is what gets passed in place of `EXERCISES` to `buildSession(mins, pool, ...)` (js/sessionEngine.js). Filtering only ever REMOVES ids; it never renames or reorders, preserving the frozen-id contract. The assembler already degrades gracefully when a pool runs thin (`fillFromPool` stops at `remaining > 20`, repeats only if `durationMins >= 30`). Note: the current 29-id library is ALREADY diastasis-safe by construction (no crunches/sit-ups/planks exist), so most postpartum core flags act through SCALE/SUBSTITUTE rather than FILTER; FILTER is mostly load-bearing for injury regions, space, and condition-specific end-range removals.

| Flag (intake source) | Movement ids removed | Type removed / rationale |
|---|---|---|
| `space=chair` | `bridge, bird-dog, kickbacks, baby-cobra, down-dog, low-lunge, figure-four, happy-baby, legs-up, thread-needle, childs-pose, clamshell, cat-cow` | All floor/supine/prone/tabletop work; leaves seated + standing + breath. (Seed of chair mode.) |
| `space=bed` | `down-dog, chair-pose, warrior2, squats, goddess, tree-pose, low-lunge, forward-fold` | Standing/weight-bearing and floor-pressing moves unsuited to a soft surface; keeps supine + seated + breath. |
| `space=standing_only` | `bridge, bird-dog, kickbacks, baby-cobra, clamshell, figure-four, happy-baby, legs-up, thread-needle, childs-pose, cat-cow, seated-twist, butterfly` | Anything requiring getting to the floor; keeps standing + breath. |
| `injuryFlags: wrist` | `down-dog, baby-cobra, thread-needle, bird-dog, kickbacks, cat-cow` | All hand-/wrist-loaded quadruped & prone press positions. |
| `injuryFlags: knee` | `low-lunge, tree-pose, kickbacks` | Direct kneeling pressure / single-leg knee load (deep squat/chair/goddess kept but SCALED, not removed). |
| `injuryFlags: shoulder` | `down-dog, thread-needle, arm-sweeps` (overhead) | Overhead-loaded and weight-bearing shoulder positions (warrior2 arms kept but SCALED lower). |
| `injuryFlags: neck` | `neck-rolls, thread-needle` | Direct cervical loading/rotation. |
| `injuryFlags: low_back` + `sciatica` | `forward-fold, seated-twist` (end-range), `baby-cobra` | Loaded flexion/extension and rotation that commonly provoke; SUBSTITUTE supplies safe equivalents. |
| `injuryFlags: hip` + `pelvic_girdle_pain` | `goddess, warrior2, happy-baby, butterfly, figure-four` | Wide-abduction / asymmetric-load positions that aggravate PGP/SPD. |
| `injuryFlags: ankle` | `tree-pose, chair-pose, goddess` (deep), `squats` (deep) | Standing balance + deep ankle dorsiflexion load (kept at shallow range via SCALE where possible, removed only the balance-critical ones). |
| `conditionFlags: prolapse` OR `pp_leakingPainPressure=yes` | `down-dog, legs-up` excluded from any *Super Sweaty* assembly only; all inversions/high-IAP holds removed from vigorous pool | High intra-abdominal-pressure / inversion bias; gentler tiers keep them with SCALE. |
| `conditionFlags: osteoporosis` | `forward-fold` (deep), `seated-twist` (end-range) removed; `happy-baby` kept | Avoid loaded end-range spinal flexion + forced rotation. |
| `lifeStage=pp_early` (0–6 wk) & not cleared | Pool restricted to `{neck-rolls, shoulder-rolls, cat-cow(gentle), arm-sweeps, hip-circles, side-reach, seated-twist(gentle), butterfly, childs-pose, legs-up, box-breath, pelvic-breath, kind-close}` — all loaded strength removed | Breath-led + gentle mobility only, per ACOG 804 early-postpartum guidance. |
| `lifeStage=pregnant` | `happy-baby, legs-up` (supine bias removed from main block after ~16 wk per `weeksSinceBirth`/trimester proxy), prone `baby-cobra` removed | Avoid prolonged supine and prone abdominal positions in later pregnancy. [evidence: ACOG 804 cautions on prolonged supine late pregnancy]. |

## SUBSTITUTE table
## SUBSTITUTE — when a FILTER removes a movement, offer a safe equivalent that preserves the BLOCK's intent (warm-up / strength stimulus / stretch target / wind-down role)

SUBSTITUTE keeps the session's shape intact (arrive → warm-up → main → wind-down → close) when filtering would otherwise leave a block thin. Each rule maps removed-id → kept-id that targets the same body region and fills the same `blocks` role, so `buildSession` still produces a balanced session. All substitutes are existing frozen ids — no new pose rig is required (respecting the poses.js cost constraint). Where no kept id fits, the value is "caption-only cue note," meaning the move stays removed and the engine relies on the documented caption-only fallback rather than inventing content.

| Removed (and why) | Substitute id(s) | Preserves |
|---|---|---|
| `down-dog` (wrist/shoulder/inversion) | `forward-fold` (standing) or `childs-pose` | Posterior-chain + back lengthening, no wrist load / no inversion |
| `baby-cobra` (wrist/low-back/prone) | `bird-dog` (if not also filtered) else `cat-cow` (cow phase) | Gentle back-extension / upper-back strength stimulus |
| `thread-needle` (wrist/neck/shoulder) | `seated-twist` | Thoracic rotation without weight-bearing on the arm |
| `bird-dog` (wrist) | `bridge` | Posterior-chain / deep-core strength, supine instead of quadruped |
| `kickbacks` (wrist/knee) | `bridge` or `clamshell` | Glute strength off the hands |
| `low-lunge` (knee) | `warrior2` (shallower) or `figure-four` | Hip-flexor / front-of-hip opening without kneeling |
| `tree-pose` (ankle/knee/balance) | `chair-pose` (shallow) | Standing leg strength without single-leg balance demand |
| `forward-fold` (low-back/osteoporosis) | `child's-pose` or `figure-four` | Posterior-chain release without loaded standing flexion |
| `seated-twist` (low-back/osteoporosis) | `cat-cow` | Spinal mobility without end-range rotation |
| `goddess` / `warrior2` (hip/PGP) | `chair-pose` or `squats` (narrow stance, shallow) | Leg strength without wide abduction |
| `happy-baby` / `butterfly` (hip/PGP) | `figure-four` (gentle) or `legs-up` | Hip release with symmetric, supported load |
| `neck-rolls` (neck) | `shoulder-rolls` | Upper-quarter warm-up without cervical loading |
| Floor strength removed by `space=chair`/`standing_only` (`bridge`,`clamshell`,`kickbacks`,`bird-dog`) | `chair-pose`, `squats`, `goddess` (seated/standing strength) | Lower-body + postural strength stimulus from a chair/standing |
| Any close removed | never — `box-breath`/`pelvic-breath`/`kind-close` are never filtered | The session always ends on breath/affirmation (sessionEngine contract) |
| pp_early loaded strength removed | `pelvic-breath` (added to main) + `bridge` ONLY post-clearance | Breath-led deep-core reconnection in place of external load |

## SCALE table
## SCALE — per-tier intensity caps + per-flag softening. Implemented as a `scaleParams` object the tier-aware assembler reads to vary reps/rounds (density), tempo, hold length, and rest. The engine NEVER swaps to a different builder — it varies parameters of the existing `buildSession`/`fillFromPool` flow (panel content-model resolution).

Mechanism, grounded in the actual engine: today every move runs once for `secs` with `TRANSITION_SECS=6` between. The tier-aware assembler adds: (a) **density** = how much of the budget is strength vs restorative (today fixed at main 0.55/0.45); (b) **tempo** = a cue/voice pacing multiplier and per-rep count target; (c) **hold** = a multiplier on `ex.secs` for strength holds (clamped to the schema's 40–90 envelope so pose timing stays valid); (d) **rest** = extra inter-move pause added on top of `TRANSITION_SECS`; (e) **repeats** = whether `allowRepeats` is enabled (today `durationMins>=30`). Exertion language is anchored to **ACSM RPE / talk-test** guidance, not heart-rate targets (no wearables on-device).

| Tier | Strength density (of main) | Tempo / RPE target (ACSM talk-test) | Hold multiplier | Rest (added to 6s) | Repeats |
|---|---|---|---|---|---|
| **No Sweat** | 0.35 strength / 0.65 mobility-stretch | Slow; RPE 2–3, "could sing" | ×0.85 (shorter, easier holds) | +8s | off until 45+ |
| **Slightly Sweaty** | 0.55 / 0.45 (today's default) | Moderate; RPE 4–5, "can talk, not sing" | ×1.0 | +4s | on at 30+ |
| **Super Sweaty** | 0.70 / 0.30 | Vigorous *within safe ceiling*; RPE 6–7, "short phrases only" — never breathless on the floor | ×1.15 (capped at schema max 90s) | +0s | on at 20+ |
| **Meditation** | n/a — uses meditation arc, not the strength/soft split | Stillness; instruction density FLAT, silences scale with duration | n/a | n/a | n/a |

**Per-flag SCALE overrides (applied AFTER tier caps; always reduce, never increase load):**

| Flag | SCALE effect |
|---|---|
| `experience=new` | One tier-notch softer density; hold ×0.85; extra +4s rest; `allowRepeats` deferred to 45+. |
| `experience=regular` | May use the requested tier's full density (still bounded by all gates). |
| `ageBand=65_plus` | Super Sweaty density capped at Slightly Sweaty values; +6s rest; balance moves (`tree-pose`) get shorter holds. |
| `ageBand=u18` | Holds ×0.9; no Valsalva cues. |
| `csection` (pp + C-section, <12 wk or pp_csectionPain) | Front-of-trunk strength (`bridge`,`baby-cobra`) hold ×0.7, progression frozen one tier below requested; double warm-up share. |
| `dr_diastasis` / `pp_dr_doming` | All strength holds breath-led (exhale-on-effort cue forced); hold ×0.8; remove any breath-holding cue; pelvic-breath seeded into main. |
| `prolapse` / pelvic-floor symptomatic | No breath-holding/Valsalva (forced exhale-on-effort); Super Sweaty unavailable; holds ×0.8; no impact (none exists anyway). |
| `bpOrMetabolicMeds=yes` / `hypertension` | No breath-holding cues; steady continuous tempo; avoid sustained max isometric holds (`goddess`,`chair-pose` hold ×0.75). [evidence: ACSM/AHA caution on Valsalva with hypertension]. |
| `hypermobility_eds` | End-range cues replaced with "find the edge, not the end"; holds ×0.8; balance encouraged, deep stretch discouraged. [evidence: thin on specifics — flag; general hypermobility consensus favours mid-range control]. |
| `injuryFlags: knee/hip/ankle/shoulder` (kept-but-scaled) | ROM-limiting cue inserted ("only as deep as is comfortable"); hold ×0.8; deep squat/lunge depth reduced. |
| `lifeStage=pregnant` | Balance moves shortened (centre-of-mass caution); no supine bias late; RPE capped at Slightly Sweaty unless cleared for more. |
| BMI-band high (height+weight present) | On `down-dog`/deep `goddess`/`chair-pose`/`squats`: earlier wall/chair SUBSTITUTE, hold ×0.85, +4s rest. Joint-comfort only — see weightUse. |

## ROUTE table
## ROUTE — map the assembled profile to a track + the tier set unlocked vs gated. Evaluated top-down; first matching row wins for the track, then gates subtract tiers. Tier availability is ALWAYS the track ceiling MINUS any RED-FLAG GATE blocks.

| Profile condition (intake) | Track id | Tiers unlocked | Tiers gated | Notes |
|---|---|---|---|---|
| `intake` is `null` / personalization skipped | `general_default_safe` | No Sweat, Slightly Sweaty, Meditation | **Super Sweaty gated** until PAR-Q+ completed | Default-safe stance. Unknown body = never auto-unlock vigorous. |
| `sexAssignedAtBirth=female` AND `lifeStage in {pp_recovery, pp_strengthening, pp_late}` AND `ageBand in {18_29,30_39,40_49}` | **`postpartum_women_30_40`** (FLAGSHIP — fully built) | No Sweat, Slightly Sweaty, Meditation, **Super Sweaty IF clearedByClinician=true AND no pelvic-floor/DR/cardiac red flag** | Super Sweaty gated unless cleared + symptom-free | Full library + all diastasis/pelvic SCALE layers. Ceiling: vigorous-but-low-impact, breath-led core, no impact ever. |
| `lifeStage=pp_early` (0–6 wk) | `postpartum_women_30_40` (early sub-state) | No Sweat (restorative only), Meditation | Slightly + Super Sweaty gated until ~6-wk clearance | ACOG 804 early-postpartum. Auto-expands when `clearedByClinician` flips true. |
| `lifeStage=pregnant`, not high-risk | `prenatal` (scaffolded) | No Sweat, Slightly Sweaty (mod), Meditation | Super Sweaty gated | Ceiling: moderate, RPE ≤5, no supine-bias late, no impact. Routing live; content library is the flagship pool minus pregnancy-FILTER, marked beta. |
| `lifeStage=pregnant` AND (`pregnant_high_risk` OR `pregnancy_hbp_preeclampsia`) | `prenatal_high_risk` (scaffolded) | No Sweat, Meditation | Slightly + Super Sweaty gated | Obstetric clearance gate. |
| `sexAssignedAtBirth=female` AND `lifeStage in {none,null}` AND no pp history | `general_female` (scaffolded) | No Sweat, Slightly Sweaty, Meditation, Super Sweaty (if PAR-Q+ clear) | per PAR-Q+ | Same engine, no pp-specific SCALE. |
| `sexAssignedAtBirth in {male,intersex,prefer_not}` / pregnancy branch skipped | `general_adult` (scaffolded) | No Sweat, Slightly Sweaty, Meditation, Super Sweaty (if PAR-Q+ clear) | per PAR-Q+ | Pelvic-floor copy suppressed; no pp SCALE. |
| `ageBand=65_plus` (any track) | overlays `older_adult` SCALE modifier | inherits track tiers | Super Sweaty capped to Slightly Sweaty intensity | Not a separate pool; a SCALE overlay. |
| `space in {chair,bed,standing_only}` (any track) | overlays `accessible_space` FILTER modifier | inherits track tiers | none | Seed of chair mode; FILTER-only overlay, no new track. |
| `conditionFlags` heavy / multiple red gates active | falls to highest safe row + all gates | No Sweat, Meditation always survive | everything gated by its specific gate | Floor is always: gentle movement + meditation are NEVER fully removed unless `pp_bleeding=yes`. |

## Tracks
- **postpartum_women_30_40** (Postpartum women 30–40 (flagship)) — fully_built_now; routed when: sexAssignedAtBirth=female AND lifeStage in {pp_early, pp_recovery, pp_strengthening, pp_late} AND ageBand in {18_29,30_39,40_49}; ceiling: Vigorous but strictly low-impact and breath-led: Super Sweaty available ONLY when clearedByClinician=true and no pelvic-floor / diastasis / cardiac red flag; no jumping, no crunch/sit-up/plank ever (library is diastasis-safe by construction), forced exhale-on-effort core. pp_early sub-state is restorative+meditation only until clearance.
- **general_default_safe** (Default-safe (no intake / skipped)) — fully_built_now; routed when: intake is null or personalization skipped; ceiling: No Sweat + Slightly Sweaty + Meditation; Super Sweaty gated until PAR-Q+ completed. This is the safe fallback every user lands in before answering anything.
- **general_female** (General adult female, no pregnancy/postpartum) — scaffolded_later; routed when: sexAssignedAtBirth=female AND lifeStage in {none,null} AND no postpartum history; ceiling: Full four tiers subject to PAR-Q+; same engine without postpartum-specific SCALE layers. Pelvic-floor copy available but not forced.
- **general_adult** (General adult (male / intersex / prefer-not / pregnancy branch skipped)) — scaffolded_later; routed when: sexAssignedAtBirth in {male,intersex,prefer_not} or pregnancy branch declined; ceiling: Full four tiers subject to PAR-Q+; pelvic-floor-specific copy suppressed; no postpartum SCALE.
- **prenatal** (Prenatal (uncomplicated)) — scaffolded_later; routed when: lifeStage=pregnant AND not (pregnant_high_risk OR pregnancy_hbp_preeclampsia); ceiling: Moderate ceiling (RPE ≤5, Slightly Sweaty max), no impact, no prolonged supine late pregnancy, no prone abdominal work; Super Sweaty always gated. Routing logic live now; content marked beta pending pose-rig review. [evidence: ACOG 804].
- **prenatal_high_risk** (Prenatal, high-risk / hypertensive) — scaffolded_later; routed when: lifeStage=pregnant AND (pregnant_high_risk OR pregnancy_hbp_preeclampsia OR relevant obstetric flag); ceiling: No Sweat + Meditation only; all sweaty tiers gated to obstetric clearance. [evidence: ACOG 804 contraindications — exact category condition-specific, flag for clinician].
- **older_adult** (Older-adult SCALE overlay (65+)) — scaffolded_later; routed when: ageBand=65_plus on any base track; ceiling: Not a separate pool: inherits the base track but caps Super Sweaty intensity to Slightly Sweaty values, adds rest, shortens balance holds, fall-risk-aware FILTER of single-leg balance.
- **accessible_space** (Accessible-space FILTER overlay (chair / bed / standing-only)) — scaffolded_later; routed when: space in {chair,bed,standing_only} on any base track; ceiling: Inherits base track tiers; FILTER-only overlay removing floor/supine/prone/weight-bearing as needed. This is the architectural seed of a future first-class 'chair mode' — accessibility specialist flagged it should graduate to its own track once chair-specific pose rigs exist.

## Disclaimers
- This personalization engine is a deterministic, transparent rule system. It performs NO clinical assessment, diagnosis, or risk scoring at runtime — it only maps the user's own literal answers to pre-authored filters, substitutions, scaling parameters, and tier availability. Every gate message is a fixed string keyed to an answer.
- Everything runs on-device. The intake, PAR-Q+ answers, height, weight, and all flags are written only to the existing localStorage key 'nrjf.store' (bumped to schema v2 via the existing migrate() seam). Nothing is transmitted, no account, no analytics — consistent with the product's offline-first, no-server design.
- All movement guidance is exercise guidance, NOT medical advice (per content-spec hard rules). Red-flag gates do not 'clear' anyone for activity; they route to 'consult a clinician first' and offer the gentler track meanwhile. The app never tells a user they are safe to do something — only what it will and will not assemble.
- Citations used: PAR-Q+ (CSEP, 2024) for the readiness screen structure; ACOG Committee Opinion 804 for pregnancy/postpartum return-to-activity framing; ACSM RPE / talk-test for exertion language (no heart-rate or wearable data is used on-device); pelvic-health physiotherapy consensus for diastasis/prolapse handling. Where a specific movement-level claim was not certain against a named guideline, it is marked '[evidence: thin — flag]' with plain clinical reasoning and NO fabricated number, year, or citation.
- Height and weight are optional, never displayed, never a goal, never gate a tier, and are quarantined to a joint-comfort SCALE nudge only. No copy anywhere references weight, size, calories, or 'bounce back' — enforced by the existing content-spec and Vera voice rules.
- The frozen 29 ids, garden growth (by completed-session count), levels (by minutes), streaks (grace-day model), and badges remain untouched by personalization: the progression layer never reads track, tier, gate, or program state. A gated user who completes a No Sweat session grows the garden exactly like anyone else.
- 'null'/skipped PAR-Q+ cardiac answers are treated conservatively (do not silently unlock Super Sweaty) — this is a safety default, not a clinical judgement.
- Postpartum stage timing boundaries (0–6 wk / 6–12 wk / 12wk–12mo / >12mo) are pragmatic product bands aligned to typical clinical milestones, not fixed clinical thresholds; individual clearance varies and the app defers to the user's clinician.

## Voices
> **Primary-care / sports-medicine physician:** I want this engine to be honest about what it is: a triage-shaped filter, not a clearance. The PAR-Q+ is the right backbone because it is validated to do exactly one job — flag who should talk to a clinician before vigorous exercise — and it requires zero interpretation. My firm line is that any positive cardiac or syncope answer blocks Super Sweaty, and an UNANSWERED cardiac item must not silently unlock it. Skipping a question is not consent to intensity. I am comfortable leaving the gentler tiers wide open, because for the vast majority of postpartum women the risk of low-impact gentle movement is far lower than the risk of staying sedentary.
> **Physical therapist:** The thing I love about this codebase is that the library is already diastasis-safe by construction — there are no crunches, sit-ups, or planks to remove. So most of my work lives in SCALE and SUBSTITUTE, not FILTER. Exhale-on-effort must be a forced cue whenever a diastasis or pelvic-floor flag is set, and end-range loaded flexion and forced rotation come out for low-back and osteoporosis flags. I insisted that every removed move has a same-region substitute from the existing 29 ids, because the worst failure mode is a thin, lopsided session that quietly drops the user's strength work. Preserve the intent of the block, not just the time budget.
> **Women's-health / pelvic-floor specialist:** Leaking, heaviness, and belly doming are not 'push through it' signals — they are 'load is too high right now' signals, and they are extremely common and very treatable. My non-negotiables: pp_bleeding=yes means movement tiers close and only meditation stays; symptomatic pelvic floor or visible doming blocks Super Sweaty and forces the breath-led, no-Valsalva scaling across everything else. And the message must always pair the gate with a route to a pelvic-health physio and reassurance that this is normal — never shame, never fear. Decoupling sexAssignedAtBirth from genderIdentity matters here too: a trans man who was pregnant needs the pelvic-floor screen AND correct language.
> **Accessibility specialist:** Every single intake field is optional and the skip path lands in a fully functional default-safe track — that is the whole ballgame for accessibility and for autonomy. I pushed the space=chair/bed/standing_only FILTER overlay hard, because 'no chair mode exists yet' is a real gap and this is the cheapest honest seed for one: it reuses existing ids and the graceful caption fallback rather than waiting on new pose rigs. PAR-Q+ items each carry a one-line 'why we ask,' answers are yes/no/skip, and the gate copy is plain language at a low reading level. Nothing here should ever feel like an exam you can fail.

## Debate
- **How aggressively to gate Super Sweaty for postpartum users — clinician-clearance hard gate vs informed user autonomy**
  - A: Women's-health / pelvic-floor specialist: Super Sweaty for any postpartum stage must require clearedByClinician=true AND a clean pelvic-floor/diastasis screen. Vigorous low-impact work still raises intra-abdominal pressure, and symptomatic pelvic floors get worse under load. Default to blocked.
  - B: Accessibility specialist (with partial support from the physician): a hard clinician-clearance wall is paternalistic and, for the 'years postpartum' (pp_late) majority of the audience, clinically overkill. Many women never get a formal 'clearance' visit. Blocking them indefinitely from the vigorous tier punishes the people the app is for. Prefer an informed-consent unlock with strong copy.
  - Resolution: Split by stage. pp_early and any active pelvic-floor/DR/cardiac red flag → HARD gate (specialist holds veto, this is the safety floor). pp_recovery/strengthening → Super Sweaty gated on clearedByClinician=true. pp_late with a CLEAN PAR-Q+ and no pelvic-floor/DR symptoms → Super Sweaty may unlock via an explicit informed-consent acknowledgement (consultClinicianAck) WITHOUT a formal clearance flag, honouring autonomy. The pelvic-floor specialist holds veto whenever a symptom flag is positive; the accessibility/autonomy argument wins only in the symptom-free, screened, long-postpartum case.
- **Whether to collect height and weight at all**
  - A: Physician + PT: keep them — there is a real, if small, joint-load argument for softening deep loaded holds at a high BMI band, and the data is cheap to collect.
  - B: Women's-health specialist + accessibility specialist: drop them — the clinical value is marginal, the harm potential (triggering, shame, the exact 'bounce back' culture the product rejects) is high, and any field you collect can eventually be surfaced or leaked into copy.
  - Resolution: Keep BUT quarantine. Both fields stay optional and default-null, are NEVER displayed, NEVER a goal, NEVER gate a tier, and feed ONLY a joint-comfort SCALE nudge. Helper text states this plainly. The women's-health specialist holds veto on any future attempt to surface them in UI or copy; if that veto cannot be guaranteed in implementation, the fields are dropped entirely.
- **How to treat an UNANSWERED (skipped) PAR-Q+ cardiac question**
  - A: Physician: treat skipped cardiac items as 'yes' for the purpose of unlocking Super Sweaty — absence of an answer is not evidence of safety. Default-safe.
  - B: Accessibility specialist: forcing answers or penalising skips makes the screen feel like a gate you can fail and discourages honest engagement; skipping should not block the gentler tiers.
  - Resolution: Both satisfied without conflict: skipped cardiac items block ONLY Super Sweaty (physician's default-safe stance) but never block No Sweat / Slightly Sweaty / Meditation (accessibility's autonomy stance). Skip stays a first-class answer everywhere except the single highest-intensity unlock. No veto needed — the positions are compatible once scoped to tier.
- **Should accessible-space (chair/bed) be its own track now or a FILTER overlay**
  - A: Accessibility specialist: ideally a first-class chair-mode track with its own pose rigs and copy, because bolting it on as a FILTER produces thin sessions for chair users.
  - B: PT + engineering reality (poses.js is the 4628-line cost center): a new track needs new keyframe rigs we cannot author in this phase; a FILTER overlay reusing existing ids plus the caption fallback ships now and is honest about its limits.
  - Resolution: Ship the FILTER overlay now as the documented seed; scaffold accessible_space as a named future track that graduates to first-class once chair-specific pose rigs exist. The PT/engineering constraint wins for THIS phase; the accessibility specialist's full chair-mode vision is explicitly recorded as the next step, not discarded.


## 4. Garden economy & retention loop — with dark-pattern audit and joint ethical sign-off

# GARDEN ECONOMY & RETENTION

## Economy
## What a completed action contributes — the garden ledger

The garden is and remains a **showing-up counter**, never an effort meter. We preserve the existing invariant exactly: **every completed action advances the garden by exactly `+1 gardenPoint`, and the garden's 9 stages are read off the *unchanged* threshold ladder `[0,1,3,6,10,15,21,28,36]`.** Nothing about duration, tier, or intensity moves the garden faster.

What changes vs. today is only the *set of things that can earn the +1*, widened to honor the new session matrix:

- **Any completed workout session** (any of the 6 durations 7/15/20/30/45/60, any of the 3 tiers No Sweat / Slightly Sweaty / Super Sweaty) → `+1 gardenPoint`. A 7-minute No Sweat day and a 60-minute Super Sweaty day are **identical** to the garden. This is the load-bearing anti-compulsion decision and we defend it below.
- **The core Meditation tier, any duration** → `+1 gardenPoint`. A meditation day is a "showing up" day in every sense, recorded through the same `recordSession` path. The garden cannot tell a meditation day from a movement day, and that is intentional.
- **A browsable themed meditation** (the 5-practice library) → `+1 gardenPoint`, same as the core meditation. Self-Compassion at 11pm counts as much as Super Sweaty at 6am.
- **Program days are invisible to the garden.** Whether today's action came from a free pick or from a guided multi-week program, the garden sees one completed action and adds `+1`. The garden never reads program state.

**The completion gate stays as-is.** `finishSession` already requires `minsMoved >= 1 && completedIds.length > 0` before calling `recordSession`. For meditation we set a parallel honest floor (`meditationCompleted === true`, i.e. the user reached the "return" phase of the arc, OR completed ≥ 60% of segments) so the +1 reflects a real, finished practice rather than a tap-and-abandon.

### How duration and intensity weight growth: they do NOT (garden), and they ONLY weight the *minutes* layer (levels)

There are two currencies and they must not be conflated:

| Layer | Currency | What weights it | New behavior |
|---|---|---|---|
| **Garden (9 stages)** | completed-action **count** | nothing — every action is +1 | unchanged ladder; meditation now also earns +1 |
| **Levels (10 titles)** | total **minutes** moved | duration only (never intensity) | meditation minutes count; new 20 & 60 durations flow in naturally |

The minutes/levels layer *already* weights by duration (a 45-min session adds more minutes than a 7-min one) and the brief preserves that. Crucially, **minutes are weighted by time-on-mat, never by intensity** — a 30-minute No Sweat session and a 30-minute Super Sweaty session add the identical 30 minutes. Intensity earns **zero** progression currency anywhere in the system. This keeps "Super Sweaty" an honest *menu choice the user makes for herself*, not a score-maximizing move.

This split is the whole game design: the slow, visible, emotionally central artifact (the garden) is driven purely by **frequency**; the secondary numeric badge (levels) is driven by **time present**; and **intensity is deliberately unrewarded** so the app never trains a postpartum user to push harder for points.

### Reconciling with the existing count-based garden + minutes-based levels

- **Garden:** zero math changes. We keep `gardenStage(totalSessions, thresholds)` and `GARDEN_STAGE_SESSIONS`. The only widening: `totalSessions` becomes "count of completed actions including meditation," which falls out for free because meditation is recorded via the same `sessions[]` array. **The 9 SVG stages, the accumulate-never-disappear rule, and the +1 anchor are untouched.**
- **Levels:** `levelInfo(totalMins)` and the 10 `LEVELS` thresholds are untouched. `totalMins` now also accrues meditation minutes through the existing `p.totalMins += minsMoved`. No threshold rebalancing is needed; new durations and meditation simply feed the same accumulator.
- **Store:** bump to **v2** through the existing `migrate()` seam. v1→v2 is purely additive (new fields default; existing `sessions[]`, `totalMins`, `badges{}` carry forward verbatim), so **no historical garden growth or badge is ever lost**. A returning v1 user opens v2 with her exact same garden stage.
- **Badges:** the only required code change the brief mandates — migrate `all-durations` off the hardcoded `[7,15,30,45]` to the single `DURATIONS` constant `[7,15,20,30,45,60]`. We treat that constant as the one source of truth shared by the matrix, the assembler, and the badge check.

## Growth config
```json
{
  "schemaVersion": 2,
  "storeVersionTarget": 2,
  "principle": "Consistency makes the garden bloom — never intensity. Every completed action is worth exactly +1 to the garden, regardless of duration, tier, or intensity.",

  "DURATIONS": [7, 15, 20, 30, 45, 60],

  "garden": {
    "currency": "completedActionCount",
    "stageThresholds": [0, 1, 3, 6, 10, 15, 21, 28, 36],
    "stageCount": 9,
    "growthPerCompletedAction": 1,
    "weightingNote": "growthPerCompletedAction is a flat constant. duration, tier, and intensity DO NOT appear in this object by design. Do not add multipliers here.",
    "countsTowardGarden": {
      "workoutSession": { "anyDuration": true, "anyTier": true, "points": 1 },
      "coreMeditation": { "anyDuration": true, "points": 1 },
      "themedMeditation": { "anyPractice": true, "points": 1 }
    }
  },

  "levels": {
    "currency": "totalMins",
    "weightedBy": "durationMinutesOnly",
    "intensityMultiplier": 1.0,
    "intensityMultiplierLocked": true,
    "tierMinutesAreEqual": true,
    "note": "totalMins accrues real time-on-mat for both movement and meditation. Tier/intensity never alter minutes. Thresholds in gamify.js LEVELS are unchanged.",
    "meditationMinutesCount": true
  },

  "completionGates": {
    "workout": { "minMinsMoved": 1, "minCompletedMoves": 1 },
    "meditation": { "reachedReturnPhase": true, "orMinSegmentFractionCompleted": 0.6 }
  },

  "actionTypes": {
    "movement": { "recordedVia": "recordSession", "gardenPoints": 1, "addsMinutes": true },
    "meditation": { "recordedVia": "recordSession", "gardenPoints": 1, "addsMinutes": true, "kind": "core | themed" }
  },

  "streaks": {
    "model": "graceWindow",
    "rule": "A missed day is forgiven as long as no rolling 7-day window has more than 2 misses.",
    "maxMissesPerRollingWindow": 2,
    "windowDays": 7,
    "anyActionKeepsStreak": true,
    "meditationKeepsStreak": true,
    "comebackOnReturnAfterGrace": true,
    "noStreakNumberShownAboveDays": 999,
    "neverShowBrokenStreakAlert": true,
    "lapseReturnAfterDays": 7,
    "lapseReturnResetsCleanly": true
  },

  "program": {
    "readsProgressionState": false,
    "visibleToGarden": false,
    "visibleToStreak": false,
    "visibleToLevels": false,
    "visibleToBadges": false,
    "abandonPenalty": 0,
    "pauseAllowed": true,
    "note": "A program only suggests today's action. recordSession is called identically whether the action came from a program or a free pick."
  },

  "storeMigrationV1toV2": {
    "additiveOnly": true,
    "carryForward": ["sessions", "totalMins", "breathCloses", "durationsTried", "moveCounts", "badges", "lastCloseId"],
    "newProgressFields": {
      "meditationCount": 0,
      "themedMeditationsTried": [],
      "lastActionDate": "",
      "programState": null
    },
    "newProfileFields": {
      "guidelineAccepted": false,
      "guidelineAcceptedAt": "",
      "defaultTier": "noSweat"
    },
    "sessionRecordAdds": { "actionType": "movement", "tier": "noSweat | slightlySweaty | superSweaty | meditation", "meditationKind": "" }
  },

  "badgeLogicChange": {
    "allDurationsCheck": "MIGRATE from hardcoded [7,15,30,45] to DURATIONS constant [7,15,20,30,45,60]",
    "newOptionalBadges": [
      { "id": "first-stillness", "earnedWhen": "meditationCount >= 1", "vanityMetric": false },
      { "id": "settled-ten", "earnedWhen": "meditationCount >= 10", "vanityMetric": false }
    ],
    "noStreakLengthBeyond7Badge": true,
    "noIntensityBadge": true,
    "noTotalMinutesMilestoneBadgeBeyondExisting": true
  },

  "dailyRitual": {
    "oneActionPerDayCountsForGarden": true,
    "extraActionsSameDay": { "addMinutes": true, "addGardenPoints": true, "note": "honest: a second real session is a second showing-up; not capped, but never required and never nudged" },
    "celebrationOnGrowth": "existing finishSession confetti + 'Your garden just grew' line",
    "celebrationWhenNoGrowth": "always celebrate the action itself; growth toward next stage is shown as gentle, optional progress, never a countdown"
  }
}
```

## Streaks & lapses
## Kind streaks and lapses — designed for the woman who missed a week and feels bad

We build directly on the existing grace-day rule (a miss is forgiven unless a rolling 7-day window holds >2 misses) and the `streakInfo`/`comeback-queen` machinery. Two design commitments govern everything here:

1. **The streak is a quiet companion, not a creditor.** It can reassure, it can welcome back. It can never accuse, threaten, or count down loss.
2. **Returning is always a win, never a reset to zero you must feel.** The emotional design target is a specific person: she had a hard week, did nothing, and now feels guilty opening the app. The app's job is to make that the easiest, warmest moment in the loop.

### What the user who missed a week sees

- **No "streak broken" event ever fires.** There is no red number, no shattered-flame animation, no "you lost your X-day streak" copy. The current code already simply stops showing a streak chip when the chain ends — we keep that silence and never add a loss notification. *(growthConfig: `neverShowBrokenStreakAlert: true`.)*
- **On return after a true lapse (≥ 7 days idle)**, the home screen leads with welcome, not arithmetic. The streak silently begins again at day 1 *after she completes today's action* — she is never shown "0" as a status. The garden is exactly as full as she left it (count-based, nothing decays), so her history is visibly intact and waiting. This is the most important kindness: **a lapse costs her nothing she can see.** The garden does not wilt. Ever.
- **The grace-day path stays as designed.** If she missed only a day or two, `usedGraceRecently` fires the existing `streakSafe` reassurance line ("Your streak is safe. Rest days are part of the plan."), and returning earns `comeback-queen`. We add a parallel warm line for the longer-lapse return so the post-week-off user also gets a hug, not silence.

### Concrete copy (Vera voice — warm, body-neutral, minimal contractions, no shame)

Add to `phrases.micro` a new `welcomeBack` set, surfaced on the home screen when `lastActionDate` is ≥ 7 days ago:

- "Welcome back. Your garden waited for you, exactly as you left it."
- "However long it has been, you are right on time. Let us begin gently."
- "There is no catching up to do here. One small session, whenever you are ready."

Keep the existing `streakSafe` lines for the grace-day case. **Forbidden in all lapse copy:** "you broke," "you lost," "back on track" (implies she was off-track), "don't break it again," any number representing what was forfeited.

### Why we do not punish lapses

The streak's only legitimate job is to gently reinforce the *next* action. A loss-aversion streak (the kind that says "you'll lose 47 days if you skip tonight") converts the app from a support into a source of dread — exactly the anxiety a postpartum user does not need at 9pm. The grace window already absorbs the chaos of real motherhood (sick kids, no sleep); the welcome-back path absorbs the rest. **No rolling window, no badge, no level, and no garden stage is ever revoked.** Progress in this app is monotonic — it only ever goes up or holds — which removes the entire psychological substrate that streak-anxiety feeds on.

## Feel
## The daily-ritual feel: a small, sincere tending

The garden is the emotional home of the app. The intended feel is **a short daily tending ritual** — closer to watering a real plant on a windowsill than to a game scoreboard. Three qualities define it:

### 1. A quiet, returning ritual (not a demanding one)
You open the app and the *first* thing you see is your garden — green, accumulated, yours. Before any prompt to act, there is recognition: "this is what you have grown." The streak chip, when present, is a soft companion ("🔥 4-day streak — move today to keep it growing"), phrased as an invitation, never a deadline. The duration grid asks "How long do you have?" — meeting the user where her day actually is. The ritual is: *arrive → see the garden → choose what little you have → tend → watch it grow a touch.* It is designed to feel like the same five seconds of calm, repeatable on the worst day and the best.

### 2. Gentle variety so it never goes stale
The garden accumulates new, slightly surprising elements at each stage — a first sprout, then a second, a bud "still keeping its secret," the first flower opening, a butterfly arriving, then a bee, finally a sunflower and an arch. Because stages are spaced generously ([0,1,3,6,10,15,21,28,36]), each new element is **earned across many days**, so its arrival is a genuine, infrequent delight rather than a guaranteed payout. The session assembler's shuffle gives movement-day variety; the meditation library's 5 themes give stillness-day variety. **Variety is in the content, never in the reward schedule** — the reward (one element, eventually) is predictable and honest, which is precisely what keeps it from becoming a slot machine (see audit).

### 3. Small, sincere celebration
When the garden grows a stage, `finishSession` fires the existing confetti and the line "Your garden just grew. Go look at it." This is the only crescendo, and it is rare by design — a real milestone, not a per-tap firework. Every *other* finish still celebrates the action itself ("That was lovely 🌼", minutes moved, a kind affirmation on the close) without implying the garden "should" have grown. The feel we are protecting: **showing up is always enough; growth is a happy occasional bonus, never the point.** Meditation finishes get the same warmth, so a day of stillness feels as celebrated as a day of movement. The whole loop is engineered so the user leaves each session feeling *tended-to*, not *graded*.

## Dark-pattern audit
- **Manufactured urgency (countdown timers, 'act now or lose it', expiring rewards)** — present: False | mitigation: No reward in the garden expires. The streak chip uses invitational language ('move today to keep it growing') with no countdown, no clock, no 'X hours left'. The grace window means a single missed day is already forgiven, so there is no real cliff to manufacture urgency around. We explicitly forbid any 'streak ends at midnight' copy or push notification.
- **Loss-aversion streak trap (threatening to revoke accumulated progress to coerce a daily action)** — present: False | mitigation: Progress is monotonic: the garden is count-based and never wilts, levels never decrease, badges are never un-earned. No 'streak broken' event ever fires (neverShowBrokenStreakAlert). The user is never shown the number she 'would lose'. The grace window absorbs real-life misses, and the welcome-back path makes returning after a full lapse cost nothing visible. Loss aversion has no substrate to attach to.
- **Variable-ratio / compulsion hook (unpredictable, slot-machine reward schedule)** — present: False | mitigation: The garden reward schedule is fixed and transparent, not variable: +1 per completed action, stages at a published threshold ladder. There are no random drops, no surprise multipliers, no mystery boxes, no loot. Variety lives in the CONTENT (which moves, which meditation theme), never in the REWARD schedule. A user can predict exactly what tending does, which is the opposite of a variable-ratio hook.
- **FOMO (limited-time content, 'everyone else is doing it', social comparison, leaderboards)** — present: False | mitigation: The app is offline, single-device, account-less, with no social layer and no analytics — there is structurally no 'everyone else'. No limited-time events, no seasonal exclusives, no comparison to others (explicitly forbidden in the Vera voice guide). The garden compares the user only to her own past, and only ever upward.
- **Guilt notifications / shaming for inactivity ('we miss you', 'your garden is dying', sad-mascot guilt-trips)** — present: False | mitigation: There are no notifications at all in the offline PWA today, and we add none for the garden. On return after a lapse the copy is pure welcome ('Your garden waited for you, exactly as you left it') with forbidden words enumerated (broke/lost/back on track). The garden never visually decays to induce guilt — a wilting-plant mechanic is explicitly rejected.
- **Intensity/effort escalation pressure (rewarding harder workouts, pushing 'Super Sweaty' for more points, vanity metrics like calories/weight)** — present: False | mitigation: Intensity earns ZERO progression currency anywhere: garden +1 is flat across all tiers, and minutes (levels) are weighted by time-on-mat only with intensityMultiplier locked at 1.0. Tier is a free menu choice, never a score lever. No calories, no weight, no 'bounce back', no appearance metric exists in the schema. The addiction therapist and behavioral scientist hold veto here and have signed off.
- **Sunk-cost / endless grind (infinite progression bar that can never be satisfied, treadmill of ever-rising goals)** — present: False | mitigation: The garden has a real, reachable terminus (stage 8, full bloom) — it is a finite, completable artifact, not an infinite treadmill. Levels top out at a named 'Legend' with the honest 'Top of the garden. Legend.' end-state. Reaching the end is framed as arrival, not as a prompt to start a harder grind.
- **Forced engagement / dark default (opting into programs that then gate or pressure daily use)** — present: False | mitigation: Guided programs are strictly opt-in, pausable, and abandonable with zero penalty (abandonPenalty:0), and are invisible to garden/streak/level/badge state. A program only suggests today's action; it can never gate whether today 'counted'. Default surface remains free single-session picks.

## Ethical sign-off
JOINT ETHICAL SIGN-OFF — Garden Retention Loop (You Got This!)

We, the undersigned, have reviewed the full garden retention loop as specified in this GARDEN_SCHEMA: the flat +1-per-completed-action garden growth, the count-based 9-stage ladder, the duration-only (never intensity) minutes layer, the grace-window streak with no loss events, the kind lapse/welcome-back handling, and the opt-in program overlay that is invisible to all progression state.

We find that this loop is engineered to build a HEALTHY habit and contains NO dark patterns, on the following grounds: (1) Progression is monotonic and non-revocable — nothing the user has earned can ever be taken away to coerce her, which removes the entire mechanism of loss-aversion and streak-anxiety. (2) Reward is fixed-schedule and transparent, not variable-ratio, so it reinforces consistency without exploiting compulsion circuitry. (3) Intensity and effort earn zero currency, so the app can never train a postpartum user to push past her safe ceiling for points; all health-relevant signals (showing up, time present) are tied to real, body-neutral behavior, never to vanity metrics, weight, appearance, or calories. (4) Lapses are designed around the guilt-prone returning user with explicit welcome copy and a garden that never wilts. (5) There is no social comparison, no FOMO, no manufactured urgency, and no guilt notification — structurally impossible in this offline, account-less build, and affirmatively forbidden in copy.

ONE STANDING CONDITION, binding on engineering: the flat +1 garden constant and the locked intensity multiplier (1.0) MUST NOT be made configurable, A/B-tested, or "tuned for engagement" in any future release. Any proposal to weight garden growth by intensity, add a variable/random reward, introduce a wilting/decay mechanic, or ship a guilt-based re-engagement notification must return to this panel before merge. Subject to that condition, the loop is approved.

Signed:
— Addiction Therapist (veto held; satisfied — no compulsion hooks, no loss-aversion trap)
— Behavioral Scientist / Habit Specialist (veto held; satisfied — consistency-only reinforcement, monotonic progress)
— Clinical Psychologist (satisfied — welcome-back and lapse handling protect the guilt-prone postpartum user)
— UX / Game Designer (satisfied — ritual feel achieved without exploitative mechanics)

## Voices
> **UX / Game Designer:** I designed the garden as a windowsill plant, not a scoreboard. The single best decision we inherited is that growth is rare and earned across many days — the threshold ladder spaces new elements out so a butterfly arriving genuinely surprises you. I refused to put variety in the reward schedule; variety lives in the content (which moves, which meditation theme) while the reward stays predictable. That is the line between a delightful ritual and a slot machine, and the whole feel of the loop depends on holding it.
> **Behavioral-Science / Habit Specialist:** Habits form from frequency and low friction, not from intensity, so I anchored the only emotionally central currency — the garden — purely on completed-action count. A 7-minute meditation and a 60-minute Super Sweaty session are identical to the garden by design; this trains 'show up most days' rather than 'push hard for points'. I exercised my veto to keep the intensity multiplier locked at 1.0 everywhere and to forbid any future engagement-tuning of the +1 constant. Fixed, transparent reinforcement builds durable habits; variable or escalating reinforcement builds compulsion, and we are not building that.
> **Addiction Therapist:** My non-negotiable was that nothing the user earns can ever be revoked to manipulate her, and this schema honors that completely — the garden never wilts, levels never drop, badges never disappear, and no 'streak broken' event ever fires. Loss aversion is the engine of most exploitative habit apps, and we have removed its fuel: there is simply nothing to lose, so there is nothing to dread at 9pm. I held veto on any decay mechanic, any 'your garden is dying' notification, and any countdown timer; all are absent. Returning after a lapse costs her nothing she can see, which is exactly how recovery-safe design should feel.
> **Clinical Psychologist:** I designed the loop around one specific person: the postpartum woman who missed a week and now feels guilty opening the app. For her, the home screen leads with welcome, the garden is exactly as full as she left it, and the copy is forbidden from using 'broke', 'lost', or 'back on track'. Shame is a profound disengagement driver in this population, so we replaced every potential shame trigger with recognition of what she has already grown. A lapse is reframed structurally — not just in tone but in mechanics — as a pause, never a failure.

## Debate
- **Should longer or more intense sessions grow the garden faster?**
  - A: UX / Game Designer argued for a small duration weighting on the garden (e.g. a 60-min session worth more visible growth than a 7-min one), reasoning that users intuitively expect bigger effort to yield bigger reward, and that flat +1 might feel anticlimactic after a long session.
  - B: Addiction Therapist and Behavioral Scientist argued that ANY intensity- or duration-weighting of the garden converts the emotionally central artifact into an effort meter, which trains compulsion and risks pushing postpartum users past their safe ceiling for points.
  - Resolution: Flat +1 on the garden stands. The 'bigger effort' intuition is satisfied entirely by the SEPARATE minutes/levels layer (a 60-min session adds more minutes than a 7-min one) and by the felt experience of a longer practice — never by the garden. The Addiction Therapist and Behavioral Scientist hold veto on the consistency-only anchor per the brief, and exercised it; the garden remains count-only and the intensity multiplier is locked at 1.0.
- **Does meditation 'deserve' the same +1 as a workout?**
  - A: UX / Game Designer initially floated meditation as a lighter contribution (e.g. counts for streak but a fractional garden bump), worried that equating 7 minutes of stillness with a full workout could feel like devaluing movement.
  - B: Clinical Psychologist and Behavioral Scientist held that a meditation day IS a showing-up day in every sense for this audience, and that any asymmetry would subtly shame the user who could only manage stillness on a hard day — undermining the whole 'consistency, never intensity' ethic.
  - Resolution: Meditation earns a full +1, recorded through the identical recordSession path, indistinguishable to the garden. Equal treatment won decisively; the psychologist's point that a stillness day must feel as celebrated as a movement day was treated as binding for the postpartum flagship.
- **Should a missed-streak or re-engagement notification exist to bring lapsed users back?**
  - A: UX / Game Designer noted that gentle re-engagement nudges measurably improve retention and proposed a soft, friendly 'your garden misses you' style notification.
  - B: Addiction Therapist rejected any guilt- or loss-framed notification outright as a textbook dark pattern, especially harmful for a guilt-prone postpartum audience, and noted the app is offline/account-less with no notifications today.
  - Resolution: No garden re-engagement notification ships. The Addiction Therapist's veto governs guilt and loss-framing. Retention is instead earned in-app via the welcome-back experience (garden intact, warm copy, zero visible cost to having lapsed). If a notification is ever revisited, it must return to the panel and may never use loss, guilt, or decay framing.


## 6. Engineering & accessibility plan — static offline PWA, store v2, poses strategy, QA, Definition of Done

# ENGINEERING & ACCESSIBILITY

## dataFiles
## On-device data file structure (extending `js/data/*`)

The binding rule from the panel holds: **extend additively, never restructure**. The 29 frozen ids in `js/data/exercises.js` and their rigs in `js/data/poses.js` stay byte-stable. New content is added as *new files* and *new optional attributes*, so a corrupt new file can never break the existing library or the garden/badge history keyed on those ids.

```
js/data/
├── exercises.js        (EXISTING — 29 frozen ids; ADD optional `tierEligibility` + `chairOk`/`floorOk` per move; no id renames)
├── poses.js            (EXISTING — 4628 lines; FROZEN. New rigs APPENDED only, never reorder)
├── badges.js           (EXISTING — migrate `all-durations` off hardcoded [7,15,30,45])
├── garden.js           (EXISTING — untouched; thresholds + SVG stay)
├── phrases.js          (EXISTING — ADD meditation cue/affirmation banks)
├── tiers.js            (NEW — TIERS constant + per-tier density/tempo/rest knobs; DURATIONS = [7,15,20,30,45,60])
├── meditation.js       (NEW — the one core "arrive/settle/rest/return" practice + 5-item themed library)
├── programs.js         (NEW — optional multi-week guided arcs, e.g. postpartum "rebuild"; pure suggestion data)
└── profiles.js         (NEW — profile/ruleset registry; postpartum_women_30_40 fully built, others scaffolded+flagged)
```

**Loading with no build step.** Everything stays a plain ES-module export of a frozen array/object, imported statically from `js/main.js` exactly as `EXERCISES`, `POSES`, `BADGES` are today (main.js lines 14-18). New imports:

```js
import { TIERS, DURATIONS, assembleTiered } from './sessionEngine.js'; // engine extended in place
import { MEDITATIONS, CORE_MEDITATION } from './data/meditation.js';
import { PROGRAMS } from './data/programs.js';
import { PROFILES, activeRuleset } from './data/profiles.js';
```

No bundler, no transpile, no JSON-fetch. The import map in `index.html` (line 43) only maps `three`; new local modules resolve by relative path and need no map entry. Because each file is a separate module, the service worker can precache them independently and a parse error in `programs.js` cannot take down `exercises.js`.

**`tierEligibility` shape (additive, optional — absent means "all tiers", preserving today's behavior):**

```js
// in exercises.js, appended to each existing object — NON-breaking:
{ id: "squats", /* ...frozen fields... */,
  tierEligibility: ["no-sweat","slightly-sweaty","super-sweaty"], // omit => all
  chairOk: true,   // a seated/standing-by-chair variant is honest for this move
  floorOk: true }  // already floor-based or has an honest floor variant
```

`why`/`cues` stay frozen for the 29; tier variation is expressed by the *assembler* (pool, density, tempo, rest), never by rewriting a move's guidance — which keeps the diastasis-recti safety copy intact.

## storeV2
```js
// state.js — bump CURRENT_VERSION to 2, extend defaults(), add a v1->v2 step
// to the EXISTING version-keyed migrate() seam. No data is ever discarded.

const KEY = 'nrjf.store';
const CURRENT_VERSION = 2;            // was 1

function defaults() {
  return {
    version: CURRENT_VERSION,
    profile: {
      name: '', character: 'vera', voiceURI: '', style: 'gentle',
      voiceOn: true, naturalOn: false, fullInstructorOn: false,
      sfxOn: true, musicOn: false, musicVol: 0.5, seenSafety: false,
      // --- v2 additions ---
      ruleset: 'postpartum_women_30_40', // active profile; others scaffolded
      defaultTier: 'no-sweat',           // last tier chosen, for sane re-entry
      chairMode: false,                  // user-set accessibility preference
      reducedMotion: 'auto',             // auto | on | off (overrides media query)
      guidelinesAcceptedAt: '',          // ISO date the safety/guideline gate was accepted
    },
    progress: {
      sessions: [],            // record gains `tier` and `kind:'movement'|'meditation'`
      totalMins: 0, breathCloses: 0,
      durationsTried: [],      // now spans [7,15,20,30,45,60]
      moveCounts: {}, badges: {}, lastCloseId: '',
      // --- v2 additions ---
      tiersTried: [],          // ['no-sweat',...] for future tier badges
      meditationCount: 0,      // meditations completed (garden still +1 each, like movement)
      program: null,           // { id, startedAt, weekIdx, dayIdx } | null — NEVER read by garden/streak/level/badge
    },
  };
}

function migrate(data) {
  if (!data || typeof data !== 'object') return defaults();
  if (!data.version || data.version > CURRENT_VERSION) return defaults();
  const base = defaults();
  let d = {
    version: data.version,
    profile: { ...base.profile, ...(data.profile || {}) },
    progress: { ...base.progress, ...(data.progress || {}) },
  };
  // ---- v1 -> v2: additive, lossless. Existing fields already merged above. ----
  if (d.version < 2) {
    // backfill new progress fields from existing history where derivable
    d.progress.meditationCount = d.progress.meditationCount || 0;
    d.progress.tiersTried = Array.isArray(d.progress.tiersTried) ? d.progress.tiersTried : [];
    if (d.progress.program === undefined) d.progress.program = null;
    // sessions from v1 have no tier/kind; treat them as untiered movement days.
    d.progress.sessions = (d.progress.sessions || []).map((s) =>
      ('kind' in s) ? s : { ...s, kind: 'movement', tier: null });
    d.version = 2;
  }
  d.version = CURRENT_VERSION;
  return d;
}
```

**Session record (v2)** — same `recordSession` path for movement and meditation, so a meditation day is a "showing up" day everywhere:

```js
// { date, mins, durationKey, startHour, breathClose, completed:[], skipped:[],
//   tier:'no-sweat'|..|null, kind:'movement'|'meditation' }
```

`recordSession` gains two lines (set `kind`/`tier` on the pushed record; `if (kind==='meditation') p.meditationCount += 1`). Garden growth stays `p.sessions.length`-based — a meditation push grows the garden +1 identically to movement. **Critical invariant:** nothing in `garden.js`, `gamify.js` streak/level/badge logic ever reads `progress.program`.

## clientPersonalization
## FILTER / SUBSTITUTE / SCALE / ROUTE — all client-side, zero runtime clinical judgment

All four operate as **pure, deterministic data transforms** over the frozen library plus the active ruleset. The app never asks "is this safe for *you*?" at runtime; it only applies a ruleset that an expert authored offline. No model inference, no heuristics on user-entered health data (none is captured), no network.

- **FILTER** — the tier-aware assembler narrows the candidate pool by `tierEligibility` and the active `ruleset`'s allow/deny lists *before* assembly. The postpartum ruleset is a static deny-list constant (no crunches, no sit-ups, no full planks, no jumping — encoded as excluded tags/ids), so "Super Sweaty" can only ever vary tempo/density/rest *within the already-safe pool*. The ceiling is baked into data, not decided live.
- **SUBSTITUTE** — when `chairMode` is on (or a move lacks `chairOk` and the user is in chair mode), the assembler swaps to the move's pre-authored chair/floor sibling id, or, if none exists, drops the move and refills from the eligible pool. The substitution table is static data; the runtime only does a dictionary lookup.
- **SCALE** — tier knobs in `tiers.js` (per-move `secs` multiplier, rest/`TRANSITION_SECS` multiplier, density = moves-per-minute, repeat policy) reshape the *same engine*. The new 20 and 60 durations are just two more budget targets through the existing `buildSession` math. No new engine — the panel-mandated "never swaps engines" rule.
- **ROUTE** — duration + tier + (movement|meditation) selects which assembly function and which content file to draw from. Meditation routes to `CORE_MEDITATION` scaled by lengthening silences (the single core practice across all six durations) or to a chosen themed-library item. Routing is a `switch` on enum values, fully synchronous.

Everything runs in the same tick as `buildSession` today, with the same `Math.random` shuffle seam. Because the ruleset is authored data, the QA gate can prove FILTER/SUBSTITUTE never emits an excluded id for the flagship profile — there is no live judgment to audit.

## posesStrategy
## `poses.js` strategy — rig vs caption-only fallback + rollout order

`poses.js` (4628 hand-authored lines) is the true cost center, confirmed in source: `js/main.js` resolves `POSES[item.ex.id] || null` (lines 258, 298) and the avatar already degrades to aria-live captions when a pose is null or WebGL is unavailable (`.no-webgl`, main.js line 231). **This existing graceful-degradation seam is the entire rollout strategy** — every new movement ships caption-first and is upgraded to a rig later, with no code change required to go live.

**Three-tier rig policy for new movements:**

1. **Reuse an existing rig (zero cost).** Most tier variation needs NO new movement — "Super Sweaty" is the *same* squat/bridge/bird-dog pool at higher density/lower rest. Tier is an assembler attribute, so the bulk of the matrix ships against the 29 existing rigs immediately. The `BASES` system (`stand`, `seated`, `kneel`, `tabletop`, `supine`, `prone`, `sidelying` — avatar.js lines 22-63) already covers chair/floor presentation, so most chair/floor *substitutes* reuse a base + an existing or lightly-mirrored frame set rather than a brand-new rig.
2. **New keyframe rig (real cost — author offline, append only).** Only genuinely new movements (not reachable by reuse) get hand-authored frames, **appended** to `POSES` so the frozen ids and line ranges above stay stable. Each new rig declares its `base` so it inherits breathing/yaw for free.
3. **Caption-only fallback (default for every new id at launch).** A new movement with no rig simply has no `POSES[id]` entry; `|| null` makes the avatar hold a neutral idle while the aria-live captions carry the full move. This is a *designed* state, not a failure.

**Rollout order:**
1. Ship the tier-aware assembler + 20/60 durations against the **existing 29 rigs** (no new poses) — the entire flagship matrix is functional day one.
2. Ship the **core meditation** as caption/voice-led with the avatar in a calm `seated` idle (no new rig needed — it is breath + stillness).
3. Author chair/floor **substitute** frames for the handful of moves whose chair variant is not already covered by an existing base.
4. Author **net-new movement rigs** last, in batches, each behind the caption fallback so partial rig coverage never blocks release. New-pose cost is treated as real and scheduled, not assumed.

## accessibility
## Accessibility provisions for the NEW tiered content

The app already ships reduced-motion CSS+JS, comprehensive ARIA, aria-live captions paired to every cue, fully skippable moves, and a focus-trapped safety modal. The new content must inherit every one of these — the rules below extend that baseline, they do not replace it.

- **Reduced motion.** The avatar's decorative breathing layer already honors `prefers-reduced-motion` (avatar.js line 348). New `profile.reducedMotion` (`auto|on|off`) lets the user *override* the media query, important for postpartum users with motion sensitivity/vestibular changes. "Super Sweaty" never implies fast on-screen motion: tier scales *physical effort cues and density*, while caption pacing and avatar animation speed stay calm and reduced-motion-aware. The core meditation's only motion is the gentle breath ring, which fully stills under reduced motion.
- **Screen reader.** Every new cue/affirmation/meditation instruction routes through the existing `aria-live="polite"` caption bubble (main.js line 175) — meditation silences announce nothing (no spam), and each guided line is one polite update. Tier and chair-mode state are exposed as labels, not color alone. The block chip already provides spoken context; meditation adds an "arrive / settle / rest / return" phase label to the same chip.
- **Low vision.** All new SVG (badges, garden, meditation breath ring) keeps the existing palette-only, text-free icon rule and 48×48 minimums; nothing conveys meaning by color alone. Timer/ring numerals reuse the existing `role="timer"` + `aria-label` pattern (main.js line 188). No new font sizes below the current baseline.
- **Cognitive load.** Tier and meditation selection is presented as a flat, small set (4 tiers including meditation × 6 durations), never a deep menu. Meditation's flat instruction density (settle by lengthening *silence*, not by adding words) is itself a cognitive-load decision. The optional program overlay is genuinely optional and abandonable with zero penalty — it never gates or nags.
- **Chair/floor adaptive alternatives.** `profile.chairMode` drives the SUBSTITUTE transform so the user gets an honest seated/standing-by-chair practice across all tiers and durations, using the existing `seated` base. Floor-averse users get the same via the `floorOk`/`chairOk` flags. Alternatives are pre-authored data, surfaced explicitly in cues (as some moves already do) — never improvised. A first-run accessibility prompt offers chair mode without implying the user "needs" it (body-neutral, per the copy rules).

## qaPlan
## QA & content-validation plan

Layered, all offline, all runnable with no build step.

1. **Static content validators (node script under `scripts/`, no deps).** Assert, on every content change:
   - The 29 frozen ids are present, in order, and unchanged (hash-compare against a snapshot).
   - Every `exercises.js` entry validates against the schema (tags/blocks enums, `secs` 40-90, ≤4 cues each <12 words, `tierEligibility` only known tiers).
   - Every id referenced by the assembler resolves either to a `POSES[id]` rig OR is explicitly listed as caption-only (no silent missing-rig surprises).
   - **Safety gate:** for `postpartum_women_30_40`, prove the ruleset deny-list excludes every crunch/sit-up/full-plank/jumping id at all three workout tiers (assembler dry-run over all 6 durations × 3 tiers, assert zero excluded ids emitted).
   - `badges.js` `all-durations` no longer hardcodes `[7,15,30,45]` — it reads the `DURATIONS` constant.
2. **Assembler property tests.** For each of the 6 durations × 4 options: total runtime within budget tolerance, always opens with a seated breath arrival and ends with a breath/affirmation close, warm/main/wind-down ratios hold, no close-id appears mid-session, chair-mode runs emit only `chairOk` ids or honest substitutes.
3. **Migration tests.** Load a captured v1 store blob → assert `migrate()` yields v2 with zero progress loss, sessions backfilled to `kind:'movement'`, garden stage/level/streak/badge counts identical before and after.
4. **Progression-isolation test.** Run a session as a free pick and as a program day with identical inputs → assert garden, streak, level, and badge outputs are bit-identical (program state must be invisible to the progression layer).
5. **Accessibility QA.** Reduced-motion override honored in all three states; axe/manual screen-reader pass on the new tier/meditation/chair-mode surfaces; meditation silences produce no aria-live spam; keyboard-only flow through tier→duration→session→close.
6. **Manual device matrix.** iOS Safari (autoplay/wake-lock), Android Chrome, low-end device (full-instructor demote path), offline cold-start after SW update.

## swCacheChanges
## Service-worker precache & cache-version changes

The SW (`sw.js`) is cache-first with full precache on install and clean eviction on activate. New ES-module data files are inert unless precached, so they **must** be added to `PRECACHE` and the version bumped, or offline users will silently get the old app shell with broken new imports (the exact failure mode the static-runtime rule warns about — no external CDN dependency is introduced; all new files are self-hosted under `js/data/`).

```js
// sw.js
const CACHE_VERSION = 'ygt-v3.1.0';   // was 'ygt-v3.0.0' — bump on this release

const PRECACHE = [
  // ...all existing entries unchanged...
  'js/data/exercises.js',
  'js/data/phrases.js',
  'js/data/badges.js',
  'js/data/garden.js',
  'js/data/poses.js',
  // --- v2 additions ---
  'js/data/tiers.js',
  'js/data/meditation.js',
  'js/data/programs.js',
  'js/data/profiles.js',
];
```

- **Eviction is already correct:** the `activate` handler deletes every cache key `!== CACHE_VERSION`, so bumping the version reliably retires the old shell — no manual purge needed.
- **`addAll` is atomic:** if any new file 404s during install, the whole precache rejects and the new SW never activates, so a packaging mistake fails loudly at deploy rather than half-updating a user. QA must confirm an offline cold-start *after* the update succeeds.
- **`skipWaiting()` + `clients.claim()`** are already in place, so the new content rolls out on next load without a manual refresh dance. Because each data file is an independent precache entry, a future content-only patch only requires re-listing (already present) plus a version bump — no structural SW change.

## Definition of Done
- Store at v2: CURRENT_VERSION=2, defaults() extended, v1->v2 migrate() step is additive and lossless; a captured v1 blob round-trips with zero progress loss (sessions backfilled to kind:'movement', tier:null).
- DURATIONS = [7,15,20,30,45,60] exists as the single source of truth; router (main.js ~line 618) and badges.js all-durations both read it; the hardcoded [7,15,30,45] is gone from gamify.js.
- Tier-aware assembler ships in sessionEngine.js as an EXTENSION (same engine, never swapped): 6 durations x {No Sweat, Slightly Sweaty, Super Sweaty, Meditation} all assemble within budget, open with seated breath arrival, end with breath/affirmation close.
- The 29 frozen exercise ids are byte-stable (hash-snapshot test passes); all new content is appended; poses.js line ranges for existing rigs unchanged.
- Postpartum safety gate proven: assembler dry-run over all workout tiers x durations emits zero crunch/sit-up/full-plank/jumping ids; deny-list lives in data (profiles.js), not in runtime logic.
- Core meditation scales across all 6 durations by lengthening silence (flat instruction density); 5-item themed library browsable; meditation completion routes through recordSession and grows the garden +1 exactly like movement.
- FILTER/SUBSTITUTE/SCALE/ROUTE run fully client-side, synchronously, with no network call and no runtime clinical judgment; ruleset is authored data.
- chairMode SUBSTITUTE produces an honest seated practice across all tiers/durations using existing bases; falls back to pool-refill when no sibling exists; alternatives surfaced in cues.
- Every new cue/meditation line uses the existing aria-live caption seam; new SVG is palette-only/text-free; reducedMotion override (auto|on|off) honored; full keyboard + screen-reader pass.
- Progression isolation: program state in progress.program is never read by garden/streak/level/badge; identical-input free-pick vs program-day runs produce bit-identical progression outputs.
- Every new movement ships behind the POSES[id] || null caption fallback; net-new rigs are appended and individually optional; partial rig coverage never blocks release.
- Service worker: CACHE_VERSION bumped (ygt-v3.1.0), PRECACHE lists every new js/data/*.js file, old cache evicts cleanly on activate, offline cold-start works after update.
- Static content validators + assembler property tests + migration test + a11y checks all green in scripts/; no build step introduced; all changes land on a feature branch via PR (not main); no secrets/PII committed.

## Voices
> **Front-End Engineer:** The cheapest correct path is the one the codebase already gives us. main.js resolves POSES[item.ex.id] || null and the avatar degrades to aria-live captions, so every new movement can ship caption-first and earn its rig later with zero code change. I am extending buildSession in place with tier knobs rather than forking it — the panel's 'never swap engines' rule maps directly onto keeping a single assembler whose only new inputs are pool filter, density, tempo, and rest multipliers. The router's [7,15,30,45] literal at line 618 and badges.js all-durations both get repointed at one DURATIONS constant so 20 and 60 are real everywhere at once, not bolted on in two places that can drift.
> **Back-End / Data Engineer (on-device only):** There is no server, so 'data engineering' here is schema discipline in localStorage. The migrate() seam is already version-keyed, so v1 to v2 is a single additive branch: merge new defaults, backfill old sessions to kind:'movement', and never discard a field. The invariant I will defend in review is that progress.program is write-only from the progression layer's point of view — garden, streak, level, and badges must never read it, or a program day stops being indistinguishable from a free pick and we have quietly turned a suggestion engine into a gate. Meditation flows through the same recordSession path precisely so a meditation day counts as showing up in every counter, with no special-casing.
> **Accessibility Specialist:** Super Sweaty must never leak into the screen. Tier scales physical effort and density, not on-screen motion speed, and the avatar's breathing layer already honors prefers-reduced-motion — I am adding an explicit profile override because 'auto' is wrong for postpartum users with vestibular changes who need it forced on regardless of OS setting. Meditation silence must stay silent to the screen reader: one polite aria-live update per guided line, nothing during the dwell, or we spam the very nervous system we are trying to settle. Chair mode is offered body-neutrally on first run and is pure pre-authored substitution — we never improvise an alternative, because an improvised 'safe' variant is exactly the runtime clinical judgment we promised not to make.

## Debate
- **Should chair/floor SUBSTITUTE generate alternatives at runtime, or only use pre-authored data?**
  - A: Front-End Engineer: a small runtime rule (e.g. lower the root, swap stand->seated base) could give chair coverage for moves that lack a hand-authored sibling, cutting authoring cost.
  - B: Accessibility Specialist: any runtime-generated movement variant is unvetted exercise guidance — for a postpartum diastasis-recti-safe product that is a clinical judgment we explicitly forbid, and an auto-lowered avatar can depict a biomechanically unsafe or simply wrong pose.
  - Resolution: Pre-authored data only. SUBSTITUTE is a dictionary lookup to an expert-authored sibling id; when none exists the assembler drops the move and refills from the eligible pool rather than inventing one. The Accessibility Specialist holds veto on anything touching depicted movement safety, because the safety hard-rules are a product-defining constraint, not an optimization.
- **How aggressively should v1 sessions be reinterpreted during the v2 migration?**
  - A: Back-End/Data Engineer: backfill old sessions minimally — set kind:'movement', tier:null — and infer nothing else, keeping migration provably lossless and reversible in intent.
  - B: Front-End Engineer: we could infer tier retroactively from duration/move mix to make historical stats richer and tier badges feel earned from day one.
  - Resolution: Minimal backfill wins. Inferring tier from old data fabricates a record the user never actually chose and risks awarding tier badges for sessions predating tiers. The Data Engineer holds veto on the migration because lossless, non-fabricating migration is the contract that lets us bump the store version safely; richer history can be derived for display later without writing guesses into the store.
- **Should 60-minute and Super Sweaty sessions allow more move repeats to fill the larger/denser budget?**
  - A: Front-End Engineer: longer and denser sessions will exhaust the eligible pool, so raising the repeat allowance (today gated at >=30 min) is the natural way to fill 60-minute Super Sweaty.
  - B: Accessibility Specialist / Content: heavy repetition at higher density risks overuse and undercuts the calm, varied, anti-compulsion feel; repeats should stay bounded and rest should absorb the extra budget instead.
  - Resolution: Repeats stay bounded; SCALE absorbs the extra budget primarily through rest and dwell, not endless repetition. The repeat allowance may rise modestly for long durations but is capped per id, and Super Sweaty buys intensity from density/tempo within the safe pool, never from grinding one movement. Content holds veto here because 'consistency, never intensity' and the anti-compulsion anchor are core product values the engine must serve.


## 5. Vetting record — rejected ideas + adversarial voices (movement bank + red-team)

# REJECTED IDEAS (deliverable 5)
- **Full-circumduction neck rolls (continuous circles through full extension)** — Full backward circumduction compresses cervical facets and can provoke dizziness/vertigo or aggravate radiculopathy in a subset of users. The bank correctly already specifies slow HALF-circles; a full-circle version should never be built.
- **Floor plank / forearm plank (and any progression toward one from wall-incline-press or wall-climbers)** — A full floor plank exceeds the postpartum core ceiling — it routinely domes a healing linea alba and over-pressurises the pelvic floor. The bank deliberately substitutes incline holds and wall climbers; the floor plank must remain explicitly off-limits and unselectable by the assembler.
- **Unsupported double-leg dead bug (both legs lowering together)** — It behaves like a crunch: high anti-extension demand that domes the abdomen and loads the healing midline. deadbug-supported is correctly capped at feet-supported; the unsupported double-leg lower must never be a selectable progression.
- **Crunches, sit-ups, Russian twists, bicycle crunches, V-ups, hollow holds** — All are explicit diastasis-recti contraindications (trunk flexion / spinal-flexion loading over a healing linea alba). They are the precise category the safety spec forbids and none should ever be added to the bank.
- **Any jumping / plyometric cardio (jumping jacks, burpees, jump squats, true skater hops, high-impact running drills)** — Violates the no-impact / no-jump rule and the pelvic-floor-considerate design. Repetitive impact early/symptomatic postpartum risks leakage, prolapse symptoms, and pelvic-floor overload. The bank's grounded, no-hop alternatives (step-jacks, skater-steps, fast-feet) are the correct substitutes.
- **Deep loaded forward-flexion lifting drills, deep loaded forward lunges with weight, or weighted Russian/standing twists at speed** — Loaded spinal flexion and fast loaded rotation stress the postpartum lumbar spine and pelvic floor and can dome the abdomen. Strength here should stay hinge-pattern, neutral-spine, breath-led; reverse-lunge is the knee-and-spine-friendlier choice already in the bank.
- **Inversions beyond a mild legs-up (headstand, shoulderstand, deep down-dog held long for hypertensive users)** — True inversions raise intracranial/blood pressure and carry a fall risk; inappropriate for a general postpartum audience and especially anyone with a hypertension flag. Mild legs-up is the safe ceiling.
- **Building Super-Sweaty without a HARD screening gate** — Several Super-Sweaty drivers (fast-feet, wall-climbers, bird-dog-knee-hover, low-incline wall-press) sit at the edge of the postpartum pelvic-floor/diastasis ceiling. If the gate is advisory rather than enforced, deconditioned or early/symptomatic users will reach moves that can dome the abdomen or provoke leakage. The gate must be a hard prerequisite, with pelvic-floor and (scaffolded) hypertension flags wired in.
- **Any unsupported double-leg dead bug / leg-lowers (the 'full' dead bug)** — This is functionally a reverse crunch: high anti-extension demand against the rectus and a near-guaranteed doming event in an under-recovered linea alba. The bank already explicitly forbids it inside deadbug-supported — that ban must be enforced at the assembler level so no tier or progression can ever generate it. It sits in the same prohibited family as crunches/sit-ups.
- **Floor planks and floor push-ups in any tier (including as a 'progression' off wall-incline-press, wall-pushup, or wall-climbers)** — Full planks are explicitly banned by the safety envelope for diastasis risk (sustained high anterior-abdominal load + IAP). The three incline moves are deliberately capped above the floor; the danger is a 'lower the incline' progression silently marching to horizontal. Codify a hard minimum incline floor in the assembler so a near-floor plank can never be produced.
- **Any jumping / true impact (jumping jacks, skater hops, running, plyometrics, true mountain climbers)** — Repetitive impact loads a healing pelvic floor and is the classic provocateur of postpartum stress urinary incontinence and prolapse symptoms; it violates the no-jumping rule. The bank correctly replaced these with grounded versions (step-jacks, skater-steps, wall-climbers, fast-feet) — the real-impact originals must never be added.
- **Deep / aggressive abdominal-stretch back-bends (full upward dog, full cobra, wheel, deep camel)** — Aggressive anterior abdominal stretch lengthens an already-overstretched linea alba and can worsen diastasis. baby-cobra and cobra-childs-flow must stay LOW and exhale-led; the 'never a full up-dog/deep back-bend' guard is the only thing keeping them safe — promote it to a hard rule, not a footnote.
- **Breath-hold / Valsalva-based 'core bracing' cueing anywhere in the bank** — Several strength and breath moves (chair-pose, goddess, squats, hip-hinge, bridge, box-breath holds) become unsafe the moment a user holds the breath and bears down — that is the mechanism that sends pressure down onto a healing pelvic floor. There must be a single global cueing rule, 'exhale and gently lift the pelvic floor on the effort, never bear down,' woven into every loaded move; absence of it is itself a defect.
- **Treating the 'Super Sweaty screening gate' as a generic readiness checkbox** — For postpartum specifically, the gate must screen for the right things: doming/coning under load, urinary leaking or heaviness/bulging (prolapse symptoms), pelvic girdle/SI/pubic pain, ongoing bleeding, and being <6 weeks (or <12 weeks / not provider-cleared for higher load). A gate that only asks 'do you feel ready?' would wave through exactly the women fast-feet, wall-climbers, deadbug-supported and bird-dog-knee-hover can harm. This is a design defect to fix before any super_sweaty content ships.

# BANK VOICES (color)
> **Stretching / Mobility Specialist:** For a warm-up to do its job, it should raise tissue temperature and take joints through progressively larger, controlled ranges — not hold long static stretches, which are better placed at the wind-down. That is why I tiered the bank: the No Sweat ramps (slow neck circles, spinal wave, arm sweeps) stay small and breath-led, while the Slightly and Super Sweaty entries (supported leg swings, torso twists, side step-outs) build range and rhythm to genuinely prepare the body for moderate-to-vigorous work. Critically, every dynamic move is smooth and controlled — I deliberately wrote 'no flinging, no bouncing' into the cues, because ballistic end-range momentum is where warm-ups turn into strains. Reusing the tree-pose and seated-twist rigs for the new swings and rotations is an honest engineering call: the joint motions are genuinely the same, so we get safe, legible animation without spending the costly new-rig budget.
> **Physical Therapist (pelvic health / postpartum):** The non-negotiable thread through all twelve movements is intra-abdominal pressure management, because that is what protects both the healing abdominal midline and the pelvic floor. You will see it everywhere: exhale on the effort or fold, no breath-holding (which spikes pressure and is also why I flagged hypertension repeatedly), and a doming/coning stop-cue on every move that loads the abdominal wall — cat-cow, arm-sweeps overhead, torso twists, the standing spinal wave, and the side step-outs. Pelvic girdle pain is extremely common postpartum, so I asked for symmetrical, pain-guided loading on the hip work rather than wide asymmetric ranges, consistent with pelvic-health physiotherapy consensus. And I want to be transparent about evidence: where I could lean on a recognised body of guidance — ACOG on progressing impact gradually postpartum, ACSM's talk test for self-monitoring intensity, and pelvic-health physiotherapy consensus on exhale-led pressure management — I cited it; where I only had sound clinical reasoning and not a specific guideline I could quote accurately, I marked it '[evidence: thin — flag]' rather than inventing a number, which is exactly how this content should be governed. Finally, the Super Sweaty screening gate is doing real safety work here: leaking, heaviness, or pressure are the precise symptoms that gate is meant to catch before anyone is cleared for vigorous loading, and the side step-outs name that explicitly.
> **Women's-health / pelvic-floor specialist:** The non-negotiable mechanic across every movement in this slice is exhale-on-exertion with a flat, quiet midline. Doming, coning, or bulging along the centre of the belly is the single most important stop signal, and I have cued it explicitly in every loaded move from heel slides up to the wall incline. I deliberately split connection into two ids: pelvic-breath teaches the diaphragm-to-pelvic-floor coordination, while pelvic-floor-connect trains both the lift and the often-neglected full release, because an overactive, over-clenched pelvic floor is just as common a postpartum problem as a weak one. For that reason both breath moves carry an explicit overactive-pelvic-floor contraindication that routes to release-only work and a pelvic health physiotherapy referral rather than letting someone self-progress into more gripping.
> **Women's-health / pelvic-floor specialist:** I want to be honest about evidence boundaries. ACOG postpartum exercise guidance and pelvic health physiotherapy consensus clearly support breath-led deep-core work, bridges, bird-dog, lateral hip strengthening, and graded incline loading as diastasis-recti-safe, and they clearly advise against crunches, sit-ups, and full planks early postpartum. Where I do not have a precise, citable protocol number, I have flagged it as [evidence: thin — flag] rather than inventing a figure, and stated the plain clinical principle instead: load only as far as the midline stays flat. None of the why or cue copy makes a medical claim or promises a clinical outcome; it is framed as movement practice, with referral to a pelvic health physiotherapist wherever symptoms such as leaking, heaviness, or persistent doming appear.
> **Physical therapist (orthopaedic / musculoskeletal):** I built the higher tiers to add load, reps, tempo, and dwell time without ever changing the safety mechanics, which is exactly how graded exposure should work. The most aggressive new movement, bird-dog-knee-hover, is anti-rotation only and never becomes a floor plank, and along with the lower-incline wall press it is fenced behind the Super Sweaty screening gate so it is unavailable until core control is demonstrably established. I was careful with joints the postpartum population reports most: every quadruped move offers a forearm or cushion regression for sensitive wrists, every side-lying and supine move has a low-load entry, and lower-back arching is called out as a stop signal anywhere the back could compensate for a tired deep core.
> **Physical therapist (orthopaedic / musculoskeletal):** On the animation constraint I made deliberate, honest calls rather than forcing the avatar. Bird-dog-knee-hover reuses the bird-dog rig and side-lying-leg-lift reuses the clamshell rig because the geometry genuinely matches, and pelvic-floor-connect reuses the pelvic-breath rig since both are still breath postures. But heel-slides, supported dead bug, and the wall incline are caption-only fallbacks: there is no supine-floor or standing-incline rig today, and reusing a quadruped or floor rig for the wall press would dangerously imply the exact floor plank we forbid. A truthful caption with the existing aria-live cue pairing is safer than a wrong avatar, and it keeps new-pose cost at zero while we decide whether those three rigs are worth authoring later.
> **Sports-medicine physician:** Every movement in this strength slice respects the postpartum safety envelope: there are no crunches, no sit-ups, no full planks, and no jumping. Load is dialed by reps, tempo, rest, range, and unilateral demand rather than by adding impact, which keeps the work appropriate across the years-postpartum spectrum we serve. The Super Sweaty tier is the only one that pushes range or pause-under-load, and every Super-Sweaty-eligible movement is explicitly gated behind the Super Sweaty screening step — it must not be assemblable for a user who has not passed that screen. Where I assert a benefit I have tied it to a named body of evidence (ACSM for resistance progression, ACOG for postpartum graded return), and where I could only reason clinically rather than cite a specific guideline I have said so plainly rather than invent a number.
> **Women's-health / pelvic-floor physical therapist:** The non-negotiable thread through all fourteen movements is exhale-on-exertion: every loaded action cues the out-breath on the effort so intra-abdominal pressure does not blow down onto a healing pelvic floor or out through the linea alba. I deliberately retained the breath-led core staples the app already trusts — bridge and bird-dog geometry, now extended with the marching bridge and side-lying leg lift — because they build deep-core and pelvic stability without a single trunk-flexion rep. The wall-and-incline push-up is included specifically as the honest, safe stand-in for the forbidden plank and push-up, with load set entirely by the incline angle so a user never has to drop to the floor. Each movement carries a real diastasis or pelvic-floor contraindication with a concrete substitution, and the universal stop-signal — doming, downward heaviness, or leakage — is written into the cues, not buried, because in this population that signal is the most important coaching we give.
> **Sports-medicine physician:** I designed this cardio slice so the Slightly Sweaty and Super Sweaty tiers genuinely move the needle on cardiovascular load using cadence, density, and interval structure rather than impact. The tier escalation maps to ACSM exertion principles: Slightly Sweaty sits where the talk test still passes — a woman can speak a short sentence — while Super Sweaty pushes toward the upper end of moderate-to-vigorous where talking becomes harder but never breathless. Crucially, every Super-Sweaty-eligible movement (fast-feet, the fast variants of knee-drives, lateral-steps, shadow-box, wall-climbers, step-jacks, skater-steps) carries an explicit dependency on the Super Sweaty screening gate, and none introduces impact or a jump. Where I could not point to a precise published threshold for postpartum pelvic-floor load during these specific patterns, I flagged the evidence as thin rather than fabricate a number.
> **Women's-health / pelvic-floor specialist:** Every movement here carries an exhale-on-exertion breath cue and a pelvic-floor symptom contraindication with a real substitution, because intra-abdominal pressure management — not avoidance of effort — is what protects the postpartum pelvic floor. I deliberately authored the wall mountain-climber as an incline against a wall precisely so we never approach a full horizontal plank, honouring the postpartum no-full-plank rule while still delivering a core-and-cardio stimulus. The guiding principle, consistent with pelvic-health physiotherapy consensus and ACOG postpartum activity guidance, is symptom-led progression: leaking, heaviness, or a dragging sensation is the signal to regress and, if persistent, to see a pelvic-health physiotherapist — never a reason to feel she has failed. The Super Sweaty gate should operationalize a PAR-Q+/CSEP-style readiness screen plus a pelvic-floor symptom check, and until it is passed the engine must serve the Slightly Sweaty regression rather than the vigorous variant.
> **Yoga teacher (postpartum-focused, 500-hr RYT):** I have kept every one of these shapes breath-led, because the breath is the safest governor of intensity we have. In the flows, one breath equals one movement: if the breath gets choppy, the body is telling you to slow down, and that is true whether someone is six weeks or six years postpartum. I deliberately made the back-bends low and exhale-led, and I tied every standing arms-overhead pose to 'soften the lower ribs' so we open the front body without dumping into the lower back. The restorative versions are not lesser versions; for a tired body, a fully supported butterfly or a reclined figure-four is often the more skilful practice.
> **Stretching / mobility specialist (corrective exercise):** Mobility is range you can control, not just range you can reach, so I dosed these as longer breath-led holds rather than ballistic stretches, and I added active counterparts (crescent lunge, Warrior I) so people build strength through the new range instead of only chasing looseness. That matters postpartum specifically: relaxin-related ligament laxity can persist for months while breastfeeding, so a joint that feels 'open' may actually be under-supported. My firm line is half-pigeon: the front-knee rotational load is real, so the default I want surfaced first is the reclined figure-four, which delivers the same glute and piriformis release with zero knee load and full back support.
> **Women's-health / pelvic-floor physiotherapist:** The single most important cue across this whole slice is 'exhale on the effort' — exhale as you lift in cobra, as you rise from a fold, as you reach overhead in a lunge — because that timing reduces the downward pressure spike on the pelvic floor and the abdominal midline. I asked for explicit doming/coning watch language on the cobra-to-child's flow, since back-bends stretch the linea alba and an unsupported lift is exactly when diastasis presents visually; if the belly cones, reduce the range, no shame in it. None of this is a substitute for an individual assessment, and the Super-Sweaty flowing variations rightly sit behind a screening gate. Per ACOG, most women can resume or progress exercise gradually once cleared, and pelvic-health physiotherapy consensus supports breath-led, pressure-aware loading over bracing and breath-holding. [evidence: ACOG postpartum exercise guidance is directional, not pose-specific — flag]
> **Yoga teacher (postpartum-informed):** My job in this slice is the landing, not the climb. Every one of these closers is built so the body can stop bracing: Child's Pose and the Supported Reclined Rest let the spine and pelvis be fully held, and I have deliberately written wide-knee and propped variations so a healing belly is never compressed or asked to bear down. I kept the frozen ids exactly and only enriched them, because the hand-authored avatar rigs are the real cost — my new Gentle Reclined Twist and Supported Rest both honestly reuse existing supine shapes rather than demanding new keyframes. The one firm line I hold is that a twist after a vigorous session must stay small, supported, and led by the exhale; a forced rotation across a recovering linea alba is exactly what we do not do.
> **Meditation / mindfulness teacher:** The Long Slow Breath is the spine of the Meditation tier and I want to be precise about why it works: a longer exhale than inhale is one of the better-evidenced levers we have for shifting toward parasympathetic, rest-and-digest tone, so I built the dose around in-4, out-6-to-8 with no breath-holds. I made Box Breathing's holds explicitly optional and gave a no-hold substitution, because for an overwhelmed or anxious postpartum mind, breath-holding can backfire into air hunger. The Kind Thoughts Close is trauma-aware on purpose — hands can stay in the lap, eyes can stay open, and the affirmations are always optional, never a performance of positivity. None of this is framed around appearance or bouncing back; it is framed around showing up, which is also why a meditation day grows the garden exactly like a movement day.
> **Women's-health / pelvic-floor physiotherapy perspective (advisory):** From a pelvic health standpoint these closers are well within the postpartum envelope, with two cautions I asked to be written in plainly. First, exit mechanics matter as much as the poses: every supine rest now instructs rolling to the side to come up rather than curling straight up, because sitting up from flat is a sit-up in disguise and loads the recovering core. Second, the breath cues avoid bearing down — the exhale empties passively and any pelvic-floor engagement is described as an effortless lift, never a squeeze or push. Where I was not certain a specific guideline quantifies a benefit, the team flagged the evidence as thin rather than inventing a number, which is the honest call; the durable, citable anchors here are ACOG's guidance on gradual, low-impact postpartum return to activity and the general principle that slow extended-exhale breathing raises vagal tone.

# VETTING VOICES (color)
> **Primary-care / sports-medicine physician:** Across the bank, the single most repeated joint-safety gap is breath management during isometric holds and high-effort moves. Chair-pose, goddess, warrior holds, wall-incline-press and the knee-hover all invite breath-holding, which triggers a Valsalva blood-pressure spike — a real concern given hypertension is a planned screening flag. Every sustained-effort move needs an explicit 'keep breathing, do not hold your breath' cue, and the scaffolded screening should temper long static holds and overhead-arm positions for anyone flagged hypertensive. Beyond that, the Super-Sweaty tier is honestly vigorous yet stays within a defensible ceiling because it is consistently jump-free and grounded; my only firm condition is that its screening gate be a hard prerequisite, not a suggestion.
> **Physical therapist (orthopaedic / postpartum musculoskeletal):** The diastasis and pelvic-floor envelope is well respected: bridges, bird-dog, clamshells, heel-slides, feet-supported dead-bug and incline presses are exactly the right substitutions for the forbidden crunch/plank family, and the deliberate exclusion of an unsupported double-leg dead bug and any floor plank is correct. My two highest-priority modifications are mechanical doming self-checks and rise-slowly cueing: every progressive core move (supported dead-bug, knee-hover, marching bridge, wall climbers, incline press) must carry a spoken 'if your belly bulges or domes, back off' instruction, because doming is the user's only real-time stop signal. Separately, half-pigeon is genuinely the riskiest shape in the bank — postpartum ligament laxity plus front-knee load — and I want the supported figure-four regression offered as the default, not the exception. Finally, please pair wrist-prep with all quadruped and weight-bearing work; postpartum De Quervain's is common and the bank loads the wrists repeatedly.
> **Women's-health / pelvic-floor specialist (red-team lead):** I cleared the bank, but the safety is in the cueing and the gate, not the move list. Almost every loaded move — squats, chair-pose, goddess, hip-hinge, bridge, the wall holds — is safe with exhale-on-effort and dangerous with breath-holding and bearing-down, because that is the exact mechanism that drives pressure down onto a recovering pelvic floor. I want one global rule woven into every loaded movement: exhale and gently lift the pelvic floor on the effort, never hold the breath, never bear down. Without it, an 'approved' bank can still hurt people.
> **Women's-health / pelvic-floor specialist (red-team lead):** Four moves carry the real teeth and must stay behind a screen that actually asks the right questions: deadbug-supported and bird-dog-knee-hover for doming under anti-extension load, and fast-feet and wall-climbers for the impact-and-leaking pathway. The Super Sweaty gate cannot be a generic 'do you feel ready?' checkbox — for this cohort it has to screen for doming/coning, urinary leaking or heaviness/bulging, pelvic girdle or pubic-bone pain, ongoing bleeding, and the time-since-birth and provider-clearance status. A gate that misses those waves through exactly the women these four moves can harm.
> **Women's-health / pelvic-floor specialist (red-team lead):** Two silent drifts worry me more than any single posture. First, the incline family — wall-incline-press, wall-pushup, wall-climbers — is only safe because it never reaches the floor; a well-meaning 'lower the incline' progression can march someone into the banned floor plank, so I want a hard minimum-incline floor enforced in the assembler, not left to copy. Second, baby-cobra and cobra-childs-flow are safe only while the back-bend stays low; a deep up-dog aggressively stretches an already-lax linea alba and works against diastasis recovery. Make both 'never go past this point' limits machine-enforced rules, not footnotes.
> **Women's-health / pelvic-floor specialist (red-team lead):** On evidence honesty: the genuinely well-supported claim in this bank is the extended-exhale parasympathetic effect, so extended-exhale-breath — not box-breath, which adds breath-holds I would rather avoid for symptomatic women — should be the default close whenever a pelvic-floor symptom is flagged. Much of the rest rests on pelvic health physiotherapy consensus and ACOG's gradual-progression principle rather than precise rep-protocol trials, which is why I have flagged protocol numbers as thin throughout rather than inventing figures. And pelvic-floor-connect must keep training the release as hard as the lift: lift-only cueing can worsen a hypertonic, painful floor, and that is a real harm hiding inside a move that looks purely beneficial.


---

## Machine-usable files (this directory)

- `library/movements.json` — the vetted movement bank (68 movements; 29 frozen ids enriched + 39 new, each with regression/progression/contraindications/substitution/targets/breath/`posesNote`).
- `library/sessions.postpartum.json` — all 18 flagship sessions (6 durations × 3 tiers), keyed `sessionId`, with ordered blocks referencing movement ids, tier-scaled doses, disclaimers, screening gates, accessibility paths, and `_regate` verdicts.
- `library/meditations.json` — the scaling core practice (×6 durations) + 5 themed library scripts, each a full timed script.
- `personalization.json` — intake schema, PAR-Q+ screening, red-flag gates, the four rule tables, and the track registry.
- `garden.json` — the economy, the implementable `growthConfig`, kind streak/lapse handling, the dark-pattern audit, and the joint ethical sign-off.
- `decisions.json` — the three Section-5 decisions with full rationale, voices, debates, mappings, risks.
- `vetting/movement-vetting.json` — per-movement clinical verdicts (49 approved / 19 approved-with-modification / 0 rejected).
- `vetting/session-vetting.json` — per-session safety-gate verdicts (18/18 after revision).
- `vetting/rejected.json` — the 14 ideas the panel explicitly refused to build, with clinical reasons.

**Decision rights honored:** the four clinical leads held absolute veto over movements, cues, intensity and progressions; the addiction therapist and behavioral scientist held veto over retention mechanics. Every exercised veto is recorded in the debate entries above.
