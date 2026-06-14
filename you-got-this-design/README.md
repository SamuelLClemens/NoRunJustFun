# You Got This! — content & garden-game design package

This directory is the expert-panel deliverable for expanding the **"You Got This!"** offline PWA
(internal name *No Run Just Fun*, store key `nrjf.store`) to the new session matrix and gamified
retention loop. It is **design + machine-usable content only** — nothing here has been wired into the
app, and nothing has been committed. The design EXTENDS the existing app; it never restructures it.

## Read this first

- **`PANEL-REPORT.md`** — the full report: executive summary, the three delegated decisions, the
  personalization engine, the garden economy with its ethical sign-off, the vetting record, and the
  engineering/accessibility plan — all with the named expert voices and the on-the-record debates.

## What maps into the app

| This package | Lands in / extends |
|---|---|
| `library/movements.json` | `js/data/exercises.js` — keep the 29 frozen ids byte-stable; **append** the 39 new ids; add optional `tierEligibility` to each move. New moves need a `poses.js` rig, a documented rig-reuse, or the already-wired caption-only fallback (`POSES[id] \|\| null`). |
| `library/sessions.postpartum.json` | output of a new **tier-aware assembler** in `js/sessionEngine.js` (same engine, new `tierProfile` arg). Sessions here are reference/spec output. |
| `library/meditations.json` | new `js/data/meditation.js` + a `buildMeditation(mins)` that emits the existing `{items,totalSecs,durationKey}` contract. |
| `personalization.json` | new `js/data/profiles.js` + intake UI; rules run client-side, no runtime clinical judgment. |
| `garden.json` (`growthConfig`) | `js/gamify.js` / `js/data/garden.js` — **garden growth stays +1 per completed action; do not weight by intensity.** |
| store v2 | `js/state.js` — bump `CURRENT_VERSION` to 2; additive `migrate()` branch (see `PANEL-REPORT.md` §6). |
| service worker | `sw.js` — add the new `js/data/*.js` to `PRECACHE`, bump `CACHE_VERSION`. |

## Hard invariants (do not violate)

- The 29 exercise ids are frozen — never rename or reorder; new content appends.
- The postpartum safety envelope holds in **every** tier: no crunches, sit-ups, full planks, jumping,
  or impact; exhale-on-effort; a machine-enforced minimum incline (no "lower the incline" path to a
  floor plank); a machine-enforced "never past this point" limit on back-bends.
- **Garden growth is +1 per completed action, intensity multiplier locked at 1.0.** This is bound by a
  standing ethical condition (see `garden.json` → `ethicalSignoff`): any future proposal to weight the
  garden by intensity, add a variable/random reward, add a wilting/decay mechanic, or ship a guilt
  notification must return to the panel before merge.
- Super Sweaty requires a HARD screening gate (12+ weeks, provider-cleared, symptom-free) — never an
  advisory checkbox.

## Build prerequisites before vigorous tiers route to real users (Definition of Done in §6)

1. Implement the PAR-Q+/postpartum screening data model and red-flag gates (store v2).
2. Build the chair/floor accessibility substitution path.
3. Append the new movement ids + rigs (or ship them caption-only) and the `DURATIONS` constant.

## Status

- Movement vetting: 49 approved / 19 approved-with-modification / 0 rejected; 14 ideas refused.
- Session vetting: **18/18** sessions pass the adversarial safety gate (one, `gt-60-super-sweaty-pp`,
  was revised per the gate's findings and re-cleared).
- Per the org rule and good practice: land any implementation on a **feature branch via PR**, never on
  `main`; commit no secrets or PII (the app stores all data on-device and transmits nothing).
