# Money Garden — Financial Education module: audit report

Additive merge of a financial-education + gamification + garden-facelift module
into the existing "You Got This!" PWA. Branch `feat/finance-garden` (off
`feat/coach-cast`). This report covers the Section 6 final audit.

## What was added

- **Content** — `js/data/lessons.js`: five educational, independently fact-checked
  and cross-sourced lessons (budgeting & FDIC insurance, compound growth, risk &
  diversification, retirement accounts with 2026 IRS limits, property basics), plus
  a spoken intro. Each lesson opens with a spoken disclaimer, pairs risks with
  benefits, spells numbers out for text-to-speech, and carries a per-lesson sources
  list with year-labelled figures.
- **Domain logic** — `js/finance.js`: `finishFinance`, `recordLessonComplete`,
  `recordGameComplete`, `checkFinanceBadges`, `financeStreak`.
- **Badges** — `js/data/badges.finance.js`: seven distinct finance badges
  (gold + veronica-periwinkle), visually different from the green fitness set.
- **Hub & completion UI** — `js/finance-screen.js`: the Money Garden hub (reused
  duration picker, persistent disclaimer, lesson catalog, shared-garden snapshot,
  a one-tap "lifelike voice" prompt) and the completion screen (garden growth,
  badges, sources list, collapsible transcript).
- **Theming** — `css/style.css` (appended): the Money Garden sub-theme, the
  glasses overlay, and the distinct finance-badge treatment.
- **Validator** — `scripts/validate_content.py`: +41 finance checks (now 689/689).

## Confirmation: nothing existing changed without approval

Every edit to an existing file is additive and behaviour-preserving for the
fitness/meditation flows (verified in-browser — a workout still plays normally and
never shows glasses):

- `js/state.js` — added `progress.finance` to `defaults()`; **no** version bump
  (the existing `migrate()` spread back-fills it).
- `js/player.js` — one line: record `plan.kind` (existing plans fall back
  unchanged).
- `js/main.js` — finance imports, the `#money` nav anchor, finance routes,
  `startFinanceLesson`, the `'lesson'` chip label, the optional `plan.onDone`
  hook in `sessionScreen`, and partitioned finance badges. Existing routes,
  screens, and the workout/meditation `done` path are unchanged.
- `js/data/badges.js` — unchanged (finance badges live in a separate file,
  composed at the import site).
- `css/style.css`, `sw.js` — appended only; existing rules and precache entries
  are byte-stable. `CACHE_VERSION` bumped `ygt-v3.2.0` → `v3.3.0`; the four new
  finance files are precached.

## Acceptance criteria

1. Existing features unchanged; static suite green (689/689) — **pass** (workout
   regression verified in-browser).
2. Finance reachable from main nav on mobile & desktop (`#money`, no media query) — **pass**.
3. Glasses transition on fitness → finance — **pass** (CSS overlay; finance-only).
4. Finance duration selector reuses the workout picker (`.duration-grid`/`.duration-btn`, 7/15/20/30/45/60) — **pass**.
5. Distinct finance badges awarded on completion — **pass** (7 badges; gold/periwinkle; partitioned).
6. Garden reflects combined fitness + finance activity — **pass** (one shared `+1` per completion).
7. Responsive at mobile & desktop — **pass** (inherits the app's centered column).
8. Disclaimer visible; no guaranteed returns — **pass** (banner + spoken + done-screen; validator-enforced banned phrasing).
9. Sources list for fact-heavy lessons; no unverifiable claim stated as fact — **pass** (per-lesson sources, year-labelled; unverifiable items were flagged in research, not stated).
10. No secrets/PII; no console/network errors in normal use — **pass** (verified; finance state is localStorage-only; self-hosted).

## Adversarial audit findings & resolutions

A five-dimension review (additivity, correctness, accessibility, accuracy,
security) ran over the diff. No high-severity issues. Resolutions:

- **(medium) Welcome could be "completed" standalone**, growing the garden while
  recording nothing — *fixed*: the welcome is now intro-only (`buildLessonById`
  returns null; removed from the catalog); it remains the spoken intro inside a
  duration-scaled session.
- **(medium) Finance earned movement-themed time badges** (early-bird "Sunrise
  Stretch Club", night-owl "Moonlight Mover") — *fixed*: `startHour` is omitted
  from the finance session record, so those conditions evaluate false for finance.
- **(low) Heading announced "veronica flower Money Garden"** — *fixed*: the brand
  flower is now decorative (`aria-hidden`), so the heading reads "Money Garden".
- **(info) Retirement lesson omitted the 2026 super catch-up** — *fixed*: added the
  $11,250 (ages 60–63) figure as an extension segment.
- **(info) Source `href` had no scheme allowlist** — *fixed (defensive)*: a
  `safeUrl` guard emits only `http(s)` hrefs.
- **(low, by design) Finance advances shared consistency/garden badges** (first
  session, day-streak, sessions-25, garden-bloom) — *accepted & documented*: this
  is the intended "unified reward ecosystem", and it matches the pre-existing
  behaviour where meditation already advances these shared badges. Finance never
  touches `totalMins`, `durationsTried`, `tiersTried`, `moveCounts`, or
  `breathCloses`, so minutes-based levels and the fitness duration/move badges
  cannot be inflated.

## Known limitations

- Lesson narration uses the device's system voice by default; the higher-quality
  on-device Kokoro voice is one tap away (surfaced in the hub) but is opt-in (a
  one-time ~90 MB download). Pre-generated self-hosted audio is a possible future
  optimization (not built — it would not raise quality over Kokoro and adds repo
  weight and licensing care).
- Interactive finance mini-games are not in this release (lessons first, by
  decision); the data model and `recordGameComplete` are ready for them.
- Year-dependent figures (2026 IRS limits; FDIC; credit-card APR) are labelled with
  their year and isolated in `lessons.js`/`SRC` for easy annual updates.

## Sources (authoritative, per lesson)

- **Budgeting & safety net** — FDIC (deposit insurance); SEC Investor.gov (rainy-day
  fund, paying off high-interest debt); CFPB (emergency fund); Federal Reserve G.19
  (credit-card APR, Q4 2025).
- **Compound growth** — SEC Investor.gov (compound interest, risk); CFPB; SEC fees
  bulletin; Nebraska Dept. of Banking & Finance (Rule of 72).
- **Risk & diversification** — SEC Investor.gov (risk & return, diversification,
  asset allocation, past performance).
- **Retirement accounts** — IRS (2026 limits / Notice 2025-67; traditional vs Roth;
  vesting; COLA increases).
- **Property basics** — CFPB (PMI); Federal Reserve / CFPB (PMI cancellation); IRS
  Pub 527 (depreciation) & Topic 409; SEC Investor.gov (REITs, leverage); J.P.
  Morgan (cap rate concept).

*Educational only — not financial advice.*
