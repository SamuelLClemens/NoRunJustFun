# Mind · Body · Soul + Learning engine — audit report

A multi-slice, additive expansion of the "You Got This!" PWA on branch
`feat/finance-garden` (off the shipped finance "Money Garden" work). It (1) unified
the bespoke finance module into a generic, registry-driven **learning-track engine**,
(2) added two new **Mind** subjects — **Parenting** and **Nonviolent Communication
(NVC)** — authored by an expert panel and adversarially fact-checked, and (3)
reorganized the app into three pillars: **Mind** (learning), **Body** (workouts),
**Soul** (meditation, with reserved slots for future practices).

## What was added

- **Engine** — `js/learning.js` (`finishLearning`/`checkTrackBadges`/`trackStreak`/…),
  `js/learning-screen.js` (generic subject hub + completion), and `js/data/tracks.js`
  (the **registry** — single source of truth: theme, badges, disclaimers, lesson
  builders, instructor prop, and badge-award rules as data). `js/data/lessons.shared.js`
  holds the shared catalog + duration-scaled plan builders.
- **Content** — `js/data/lessons.parenting.js` (6 sourced lessons + welcome) and
  `js/data/lessons.communication.js` (6 NVC lessons + welcome), each authored by a
  panel of domain experts and verified against live authoritative sources.
- **Badges** — `js/data/badges.parenting.js` (`par-`, coral) and
  `badges.communication.js` (`com-`, teal): 7 distinct, namespaced badges each.
- **IA** — `js/main.js`: home pillar cards; `#mind`/`#body`/`#soul` screens; the
  generic `#learn-<track>[-<mins>|-lib-<id>]` routes; meditation lifted out of the
  workout tier chooser into Soul.
- **Theming / validator / SW** — per-subject `data-track` token re-skins in
  `css/style.css`; `scripts/validate_content.py` generalized to all subjects
  (732/732); `sw.js` `ygt-v3.5.0` precaching the new files.

## Confirmation: nothing existing changed without approval

Every edit was authorized in the approved plan and is behaviour-preserving for the
fitness/meditation flows (browser-verified — workouts and meditations still start
normally and never show a learning prop):

- `js/state.js` — `CURRENT_VERSION` 2 → 3 with a **lossless** v2→v3 branch migrating
  `progress.finance` → `progress.learning.money` (verified: a seeded v2 store keeps
  all lessons, sessions, badges, totalMins, durationsTried verbatim).
- `js/main.js` — finance routes generalized to `#learn-<track>-*` with `#money`/`#fin-*`
  back-compat redirects; existing `#play-*`/`#play-lib-*`/`#tier-*` routes unchanged.
- `js/finance.js`, `js/finance-screen.js` — reduced to thin shims bound to `'money'`.
- `css/style.css`, `sw.js` — appended/extended only.

## The accuracy protocol (how the content was built)

Both new subjects were produced by a multi-agent workflow mirroring the finance build:
six domain experts each researched and drafted one lesson with live web citations,
then an independent adversarial fact-checker verified every claim against its cited
source, enforced disclaimers/attribution/safety framing, and stripped over-promising
language. The vetted, structured output was assembled deterministically into the
engine format (no hand transcription).

- **Parenting** sources — AAP / HealthyChildren.org; CDC (Essentials for Parenting,
  developmental milestones); Harvard Center on the Developing Child (brain architecture,
  serve-and-return); Zero to Three; WHO and AASM (sleep/screens); APA, Gottman (emotion
  coaching), Thomas Gordon (I-messages), Baumrind (styles), Dweck (process praise).
- **NVC** sources — Center for Nonviolent Communication and Rosenberg's *Nonviolent
  Communication: A Language of Life*; UCLA/Lieberman et al. (2007, affect labeling) and
  Rogers & Farson (active listening) as **independent corroboration**; 988 Suicide &
  Crisis Lifeline and the National Domestic Violence Hotline for the safety boundary.
  NVC is attributed throughout as one influential framework, not settled science.

## Acceptance criteria

1. Existing features unchanged; static suite green (732/732) — **pass**.
2. Reachable from main nav (the three pillars) on mobile & desktop — **pass**.
3. Instructor cue on entering a lesson (per-subject prop) — **pass**.
4. Duration selector reuses the workout picker (7/15/20/30/45/60) — **pass**.
5. Distinct, namespaced badges per subject, awarded on completion — **pass**.
6. The one shared garden reflects combined activity across all pillars — **pass**
   (one `+1` per completion; isolation verified — `totalMins`/`durationsTried`/
   `moveCounts` untouched).
7. Responsive at mobile & desktop — **pass** (inherits the app's centered column).
8. Disclaimers visible; no over-promising — **pass** (banner + spoken + done-screen;
   validator-enforced per-subject banned phrasing).
9. Sources for fact-heavy lessons; safety/crisis framing for NVC — **pass**.
10. No secrets/PII; no console/network errors in normal use — **pass** (localStorage
    only; self-hosted; source URLs are external links opened in a new tab via `safeUrl`
    + `rel="noopener noreferrer"`).

## Adversarial audit findings & resolutions

A five-dimension review (additivity, correctness, accessibility, content accuracy/
attribution, security/PII) ran over the full diff, with each finding independently
verified. **8 raised, 6 confirmed, 2 refuted.** All 6 confirmed were fixed:

- **(medium, a11y) Coral/teal accent text failed WCAG AA on white** — `.fin-mins`
  and source links rendered the subject accent (coral 3.0:1 / teal 3.3:1). *Fixed*:
  scoped those small-text elements to the darker `--finance-ink` (7.2:1 / 6.0:1) for
  the two new subjects; money (#5B6BD0) unaffected.
- **(low, a11y) Per-subject badge-date labels below AA** — *fixed*: dates now use the
  subject ink (#8A3D26 / #1F6E63).
- **(low, a11y) Coming-soon/locked cards used `aria-disabled` on a non-interactive
  `<div>`** — *fixed*: the Mind locked subject now renders as a native `<button
  disabled>` (announced, removed from tab order); the Soul placeholders dropped the
  inert attribute (their "Coming soon" text remains perceivable).
- **(low, a11y) Mind subject emoji announced by screen readers** — *fixed*: the icon
  span is now `aria-hidden="true"` (the visible title carries the accessible name).
- **(low, correctness) A duration session covering zero lessons could grow the shared
  garden while crediting nothing to the track** — dormant with current content, but
  *fixed defensively*: `finishLearning` now returns early (no garden growth) for a
  non-game completion with zero covered lessons.
- **(info, correctness) An empty `topicBadge` list would auto-award** (`[].every` is
  vacuously true) — *fixed*: added a `length > 0` guard.

**Refuted (correctly):** the back-compat shims being orphaned (intended; kept for
installed PWAs) and `parseInt` leniency on hand-edited hashes (benign — `mins` is
constrained to the valid set before use; resolves to a clean session).

## Known limitations

- Interactive mini-games are not in this release (lessons first, by decision); the
  data model + `recordGameComplete` hooks are ready for them.
- Soul's "crystal energy" and "dream interpretation" are reserved, inert slots only;
  when built they will be framed as reflective/exploratory practices, not science.
- Lesson narration uses the device voice by default; the on-device Kokoro voice is one
  tap away (opt-in). Pre-generated audio remains a possible future optimization.
- Year-dependent figures (e.g. parenting sleep/screen guidance) are isolated in the
  lessons modules with `year` labels for easy updates.

*Educational only — not professional advice. NVC content is educational, not therapy
or crisis support.*
