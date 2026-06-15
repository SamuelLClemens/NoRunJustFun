// Educational finance lessons for the Money Garden. EDUCATIONAL ONLY — not
// advice. Every fact-heavy lesson carries a `sources` list (authoritative US
// sources: SEC investor.gov, IRS, CFPB, the Federal Reserve, the FDIC) and any
// figure that changes yearly is labelled with the YEAR it applies to so it is
// easy to update. Numbers are spelled out in `say` text so text-to-speech
// pronounces them naturally ("twenty-four thousand five hundred", not "24,500").
//
// Content was authored from independently fact-checked research, cross-verified
// against at least two reputable/official sources (slice 2). Figures verified as
// of June 2026: 2026 IRS limits per Notice 2025-67; FDIC limit in effect 2026;
// credit-card APR per Federal Reserve G.19 Q4 2025; IRS Pub 527 (2025).
//
// A lesson = ordered segments { id, name, secs, say, core? }. The Player narrates
// each segment's `say` with always-on captions. Lessons reuse the meditation
// playback path (quiet, segment-by-segment) by setting isMeditation:true on the
// plan; `kind:'finance'` (recorded via player.js) is what distinguishes them.
//
// The duration picker assembles a study session by chaining lessons (core
// segments on short picks, full depth on longer picks) to fit the chosen length.
// A catalog lesson (#fin-lib-<id>) plays its full segment list, opened by the
// spoken disclaimer.

export const FINANCE_DISCLAIMER = "This is educational information, not financial advice. It is not a substitute for a licensed financial professional, and nothing here is a recommendation to buy, sell, or hold anything. No investment is guaranteed or risk-free, and you can lose money. Dollar figures are labelled with the year they apply to and can change.";

export const FINANCE_DISCLAIMER_SHORT = "Educational only — not financial advice, and no returns are guaranteed.";

const SPOKEN_DISCLAIMER = "One honest note before we start: this is education, not financial advice, and nothing here is risk free or guaranteed. Take what is useful, and check anything important with a professional you trust.";

const DISCLAIMER_SEG = { id: 'fin-disclaimer', name: 'Before we begin', secs: 14, core: true, say: SPOKEN_DISCLAIMER };

const segDur = (s) => Math.max(5, Math.round(s.secs || 10));
const lessonSecs = (segs) => segs.reduce((t, s) => t + segDur(s), 0);

function dedupeSources(list) {
  const seen = new Set();
  const out = [];
  for (const s of list) {
    const k = (s && s.url) || JSON.stringify(s);
    if (!seen.has(k)) { seen.add(k); out.push(s); }
  }
  return out;
}

// ---- sources (authoritative; reused across segments of a lesson) ---------
const SRC = {
  fdicInsurance: { org: 'FDIC', title: 'Understanding Deposit Insurance', url: 'https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance', year: '2026' },
  secRainyDay: { org: 'SEC (Investor.gov)', title: 'Save for a Rainy Day', url: 'https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/save-rainy-day', year: '' },
  cfpbEmergency: { org: 'CFPB', title: 'An essential guide to building an emergency fund', url: 'https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/', year: '' },
  secPayoffDebt: { org: 'SEC (Investor.gov)', title: 'Pay Off Credit Cards or Other High-Interest Debt', url: 'https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/pay-credit-cards-or-other-high-interest', year: '' },
  fedG19: { org: 'Federal Reserve', title: 'Consumer Credit — G.19', url: 'https://www.federalreserve.gov/releases/g19/current/', year: 'Q4 2025' },
  secCompound: { org: 'SEC (Investor.gov)', title: 'What is Compound Interest?', url: 'https://www.investor.gov/additional-resources/information/youth/teachers-classroom-resources/what-compound-interest', year: '' },
  cfpbCompound: { org: 'CFPB', title: 'How does compound interest work?', url: 'https://www.consumerfinance.gov/ask-cfpb/how-does-compound-interest-work-en-1683/', year: '' },
  secRisk: { org: 'SEC (Investor.gov)', title: 'What is Risk?', url: 'https://www.investor.gov/introduction-investing/investing-basics/what-risk', year: '' },
  secFees: { org: 'SEC', title: 'How Fees and Expenses Affect Your Investment Portfolio', url: 'https://www.sec.gov/investor/alerts/ib_fees_expenses.pdf', year: '' },
  neRule72: { org: 'Nebraska Dept. of Banking & Finance', title: 'Doubling Your Money: the Rule of 72', url: 'https://ndbf.nebraska.gov/doubling-your-money-rule-72', year: '' },
  secRiskReturn: { org: 'SEC (Investor.gov)', title: 'Risk and Return', url: 'https://www.investor.gov/additional-resources/information/youth/teachers-classroom-resources/risk-and-return', year: '' },
  secDiversify: { org: 'SEC (Investor.gov)', title: 'Diversify Your Investments', url: 'https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/diversify-your-investments', year: '' },
  secAsset: { org: 'SEC (Investor.gov)', title: "Beginners' Guide to Asset Allocation", url: 'https://www.investor.gov/additional-resources/general-resources/publications-research/info-sheets/beginners-guide-asset', year: '' },
  secPastPerf: { org: 'SEC (Investor.gov)', title: 'Mutual Funds — Past Performance', url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/mutual-funds-past-performance', year: '' },
  irs2026: { org: 'IRS', title: '401(k) limit increases to $24,500 for 2026; IRA limit increases to $7,500', url: 'https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500', year: '2026' },
  irsRothTrad: { org: 'IRS', title: 'Traditional and Roth IRAs', url: 'https://www.irs.gov/retirement-plans/traditional-and-roth-iras', year: '' },
  irsVesting: { org: 'IRS', title: 'Vesting Schedules for Matching Contributions', url: 'https://www.irs.gov/retirement-plans/issue-snapshot-vesting-schedules-for-matching-contributions', year: '' },
  irsCola: { org: 'IRS', title: 'COLA Increases for Dollar Limitations on Benefits and Contributions', url: 'https://www.irs.gov/retirement-plans/cola-increases-for-dollar-limitations-on-benefits-and-contributions', year: '2026' },
  cfpbPmi: { org: 'CFPB', title: 'What is private mortgage insurance?', url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-private-mortgage-insurance-en-122/', year: '' },
  cfpbPmiRemove: { org: 'CFPB', title: 'When can I remove PMI from my loan?', url: 'https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/', year: '' },
  secLeverage: { org: 'SEC (Investor.gov)', title: 'Leveraged Investing Strategies — Know the Risks', url: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/leveraged-investing-strategies-know-risks-using-these-advanced-investment-tools', year: '' },
  irsPub527: { org: 'IRS', title: 'Publication 527 — Residential Rental Property', url: 'https://www.irs.gov/publications/p527', year: '2025' },
  irsTopic409: { org: 'IRS', title: 'Topic No. 409 — Capital Gains and Losses', url: 'https://www.irs.gov/taxtopics/tc409', year: '' },
  secReit: { org: 'SEC (Investor.gov)', title: 'Investor Bulletin: Publicly Traded REITs', url: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-65', year: '' },
  jpmCapRate: { org: 'J.P. Morgan', title: 'Cap Rates, Explained', url: 'https://www.jpmorgan.com/insights/real-estate/commercial-term-lending/cap-rates-explained', year: '' },
};

// ---- lesson content (verified) -------------------------------------------

const WELCOME = {
  id: 'welcome-money', title: 'Welcome to your Money Garden', topic: 'intro',
  blurb: 'A gentle, no-jargon start — what this is, and what it is not.', sources: [],
  segments: [
    { id: 'w-hello', name: 'Welcome', secs: 18, core: true, say: "Welcome to your Money Garden. Money can feel heavy, so we will keep this light, plain, and judgement free. A few minutes at a time, and this garden grows right alongside your workouts and your calm." },
    { id: 'w-frame', name: 'How this works', secs: 15, core: true, say: "I will take one idea at a time, in everyday words, and always show the risks right next to the rewards. There is nothing to buy here and nothing to sign up for." },
    { id: 'w-disclaimer', name: 'One honest note', secs: 15, core: true, say: SPOKEN_DISCLAIMER },
    { id: 'w-close', name: 'Ready when you are', secs: 10, core: true, say: "That is the whole promise. Whenever you are ready, pick a topic, and let us plant something good together." },
  ],
};

const BUDGETING = {
  id: 'budgeting', title: 'Budgeting & your safety net', topic: 'budgeting',
  blurb: 'A simple split for your money, an emergency cushion, and why high-interest debt comes first.',
  yearLabel: 'FDIC limit in effect 2026; card APR per Federal Reserve G.19, Q4 2025',
  sources: [SRC.fdicInsurance, SRC.secRainyDay, SRC.cfpbEmergency, SRC.secPayoffDebt, SRC.fedG19],
  segments: [
    { id: 'b-plan', name: 'A job for every dollar', secs: 22, core: true, say: "Budgeting just means giving every dollar a job before the month spends it for you. One popular starting point is the fifty, thirty, twenty guideline: about half your take-home pay for needs, thirty percent for wants, and twenty percent for savings and paying down debt. It is a rule of thumb, not a law, and it will not fit everyone, especially on a tight or uneven income, so treat it as a starting shape." },
    { id: 'b-payself', name: 'Pay yourself first', secs: 20, core: true, say: "The trick that makes saving stick is to pay yourself first: move money to savings before you have a chance to spend it. The easiest way is to make it automatic, by splitting your direct deposit or setting a small recurring transfer each payday. You never see it, so you never miss it. Just keep a little buffer in checking so an automatic transfer never triggers an overdraft fee." },
    { id: 'b-cushion', name: 'Your emergency cushion', secs: 20, core: true, say: "Life surprises you, a car repair, a medical bill, a gap between jobs. An emergency fund is cash set aside just for that. Many financial pros suggest somewhere around three to six months of living expenses, though the right amount truly depends on your situation. Even a small starter cushion of a few hundred dollars beats none. Keep it somewhere safe and easy to reach, like a savings account." },
    { id: 'b-debt', name: 'Knock out high-interest debt', secs: 22, core: true, say: "If you carry a balance on a credit card, paying it down is one of the most powerful money moves there is. The Securities and Exchange Commission puts it plainly: almost no investment reliably beats the guaranteed savings of clearing high-interest debt. Card rates have been above twenty percent. The Federal Reserve measured the average at around twenty-one percent at the end of twenty twenty-five. One approach, the avalanche, pays the highest-rate debt first while you keep up the minimums on the rest." },
    { id: 'b-fdic', name: 'Where your savings are safe', secs: 22, core: false, say: "Money in a bank that is F D I C insured is protected if that bank fails, currently up to two hundred fifty thousand dollars per depositor, per insured bank, for each ownership category. That limit has been in place since twenty ten. One catch worth knowing: this covers deposits like checking, savings, and certificates of deposit. It does not cover stocks, bonds, mutual funds, or crypto, and it is not a promise that investments will not lose value." },
    { id: 'b-tradeoffs', name: 'The honest trade-offs', secs: 18, core: false, say: "A couple of caveats, because money is personal. A big cushion sitting in a low-interest account is safe and handy, but over many years inflation can quietly shrink what it buys. And whether to build savings first or attack debt first is a genuine trade-off, with no single right answer, just the one that keeps you going." },
    { id: 'b-close', name: 'Your takeaway', secs: 14, core: true, say: "So: give your dollars a job, pay yourself first automatically, build a little cushion, and treat high-interest debt as urgent. Small and steady wins here, just like in the garden." },
  ],
};

const COMPOUND = {
  id: 'compound-growth', title: 'Compound growth', topic: 'investing',
  blurb: 'Interest on interest, the Rule of 72, and the quiet drag of fees and inflation.',
  sources: [SRC.secCompound, SRC.cfpbCompound, SRC.secRisk, SRC.secFees, SRC.neRule72],
  segments: [
    { id: 'c-what', name: 'Interest on interest', secs: 15, core: true, say: "Compound growth is interest earning more interest. You earn a return on your original money, and then you earn a return on those returns too. Over time, that little snowball can get surprisingly large." },
    { id: 'c-example', name: "The SEC's small example", secs: 24, core: true, say: "Here is the Securities and Exchange Commission's own example. Put in one hundred dollars at five percent a year. After year one you have one hundred five dollars. After year two, one hundred ten dollars and twenty-five cents. That extra twenty-five cents is interest earned on your interest. Now leave that same hundred dollars alone: it grows to more than one hundred sixty-two dollars in ten years, and almost three hundred forty dollars in twenty-five, with no new money added. Time does the heavy lifting." },
    { id: 'c-rule72', name: 'The Rule of seventy-two', secs: 18, core: true, say: "Want a quick estimate of how long money takes to double? Divide seventy-two by the yearly rate. At six percent, about twelve years. At ten percent, a little over seven. It is only an approximation, and it assumes a steady rate, but it is a handy back-of-the-envelope trick." },
    { id: 'c-risk', name: 'The other edge', secs: 18, core: true, say: "Two honest warnings. First, the very same math works against you on debt: a credit-card balance compounds in the lender's favor. Second, growth is never guaranteed. Investments can and do lose value, and unlike a bank deposit, stocks and funds are not F D I C insured." },
    { id: 'c-fees', name: 'The quiet leak: fees', secs: 22, core: false, say: "Fees matter more than they look, because every dollar paid in fees is a dollar that stops compounding. The S E C shows a hypothetical one hundred thousand dollar portfolio earning four percent for twenty years. With a quarter-percent yearly fee it grows to about two hundred eight thousand dollars. With a one percent fee, only about one hundred seventy-nine thousand. That is nearly thirty thousand dollars, lost just to fees." },
    { id: 'c-inflation', name: 'And inflation', secs: 16, core: false, say: "Inflation is the other quiet leak. As prices rise, each dollar buys a little less. If your money grows slower than prices, your real return can be negative even when the dollar amount goes up. So when you hear a growth number, ask what it looks like after fees and after inflation." },
    { id: 'c-close', name: 'Your takeaway', secs: 13, core: true, say: "Start early, let it sit, keep fees low, and remember that compounding cuts both ways. Patience is the secret ingredient." },
  ],
};

const RISK = {
  id: 'risk-diversification', title: 'Risk, reward & not betting the farm', topic: 'investing',
  blurb: "Why higher reward means higher risk, and how spreading out helps (but isn't magic).",
  sources: [SRC.secRiskReturn, SRC.secDiversify, SRC.secAsset, SRC.secPastPerf],
  segments: [
    { id: 'r-linked', name: 'Risk and reward are linked', secs: 20, core: true, say: "In investing, risk and reward are tied together. Taking more risk only gives you the potential for a greater return, never a promise of one. As the Securities and Exchange Commission puts it, there is no such thing as a risk-free investment, and in general, the higher the possible return, the higher the chance of losing money." },
    { id: 'r-eggs', name: "Don't put all your eggs in one basket", secs: 18, core: true, say: "Diversification is a fancy word for an old idea: do not put all your eggs in one basket. You spread your money across different investments, so that when one zigs, another may zag, and a loss in one place can be softened by a gain in another." },
    { id: 'r-limits', name: "What diversification can't do", secs: 18, core: true, say: "Here is the honest part. Diversification reduces risk, but it does not erase it. When the whole market falls, most things tend to fall together, so even a well-spread portfolio can lose money. Think of it as a seatbelt, not a force field." },
    { id: 'r-classes', name: 'Stocks, bonds, and cash', secs: 20, core: true, say: "Most investments fall into three buckets. Stocks have historically offered the highest returns and the highest risk. Bonds are usually steadier but more modest. Cash is the safest but earns the least, and over time it may not even keep up with inflation. None is best; they simply do different jobs." },
    { id: 'r-onefund', name: "One fund isn't automatically diverse", secs: 16, core: false, say: "A common trap: owning a single fund and feeling diversified. If that fund is concentrated in one sector or a handful of companies, you may be less spread out than you think. It is worth peeking at what a fund actually holds." },
    { id: 'r-personal', name: 'The right mix is yours', secs: 18, core: false, say: "And past performance does not predict the future. Last year's winner can be next year's laggard, which is exactly why the S E C requires that warning. The right mix depends on your time horizon, how long until you need the money, and your stomach for ups and downs. There is no one correct formula." },
    { id: 'r-close', name: 'Your takeaway', secs: 13, core: true, say: "Higher reward rides with higher risk, spreading out helps but is not magic, and the right mix is personal. Slow and diversified beats betting the farm." },
  ],
};

const RETIREMENT = {
  id: 'retirement-accounts', title: 'Retirement accounts', topic: 'retirement',
  blurb: '401(k)s and IRAs, traditional versus Roth, the 2026 limits, and the magic of an employer match.',
  yearLabel: '2026 limits, per IRS Notice 2025-67 (announced November 2025)',
  sources: [SRC.irs2026, SRC.irsRothTrad, SRC.irsVesting, SRC.irsCola],
  segments: [
    { id: 'rt-what', name: 'Accounts built for later', secs: 16, core: true, say: "Retirement accounts like a four oh one k and an I R A are special because of how they are taxed. The government gives you a break to encourage saving for later. A four oh one k is usually offered through work; an I R A you can open on your own." },
    { id: 'rt-tax', name: 'Traditional versus Roth', secs: 24, core: true, say: "The big choice is when you pay tax. With a traditional account, your contributions may lower your taxes now, and you pay tax later when you withdraw in retirement. With a Roth, you pay tax now, and qualified withdrawals later, including the growth, come out tax-free. Roth earnings are tax-free only if you are at least fifty-nine and a half and have had the account five years. Neither is automatically better; it is really a bet on your future tax rate." },
    { id: 'rt-limits', name: 'The twenty twenty-six limits', secs: 24, core: true, say: "Here are the twenty twenty-six limits from the I R S. You can put up to twenty-four thousand five hundred dollars of your own pay into a four oh one k. Across your I R As, up to seven thousand five hundred dollars in total. If you are fifty or older, you can add catch-up contributions: eight thousand more in a four oh one k, and eleven hundred more in an I R A. These numbers change most years, so always check the current figure." },
    { id: 'rt-match', name: 'Free money: the match', secs: 20, core: true, say: "If your employer offers a four oh one k match, that is about the closest thing to free money in personal finance. They add to your account when you contribute. To get the full match, you generally have to put in enough of your own pay to earn it. Whether a match exists, and how big it is, is set by your specific plan, so check yours." },
    { id: 'rt-vesting', name: 'The catch: vesting and lock-up', secs: 24, core: false, say: "Two honest catches. First, vesting. Your own contributions are always one hundred percent yours, but the employer's match may take a few years on the job to fully own. By law, up to a three-year cliff, or a six-year graded schedule. Leave early and you can forfeit the unvested match. Second, this money is meant for retirement. Pulling it out of a traditional account before fifty-nine and a half can mean a ten percent penalty plus regular income tax." },
    { id: 'rt-marketrisk', name: 'Not a savings account', secs: 16, core: false, say: "And remember, these accounts hold investments like stock and bond funds, which rise and fall. The return is never guaranteed; the balance can go down as well as up. The account is just the wrapper. What is inside still carries market risk." },
    { id: 'rt-close', name: 'Your takeaway', secs: 14, core: true, say: "If there is a match, try to grab it. Choose traditional or Roth based on your tax picture, mind the yearly limits, and know the money is parked for the long haul. Future you will be grateful." },
  ],
};

const PROPERTY = {
  id: 'property-basics', title: 'Property & real estate basics', topic: 'property',
  blurb: 'Mortgages, PMI, cap rate, leverage, depreciation, and REITs — the concepts and the risks.',
  yearLabel: 'Tax concepts per IRS Publication 527 (2025)',
  sources: [SRC.cfpbPmi, SRC.cfpbPmiRemove, SRC.secLeverage, SRC.jpmCapRate, SRC.irsPub527, SRC.irsTopic409, SRC.secReit],
  segments: [
    { id: 'p-mortgage', name: 'Mortgages and the down payment', secs: 18, core: true, say: "Most people buy property with a mortgage, a loan secured by the home itself. Your down payment is the slice you pay up front. On a conventional loan, if you put down less than twenty percent, lenders generally require private mortgage insurance, called P M I." },
    { id: 'p-pmi', name: 'What PMI really is', secs: 22, core: true, say: "Here is the catch with P M I: it protects the lender, not you. It is an extra cost added to your monthly payment, and it does not stop a foreclosure if you fall behind. The good news, by law you can ask to cancel it once you owe eighty percent of the original value, and it must come off automatically at seventy-eight percent, as long as you are current on payments." },
    { id: 'p-leverage', name: 'Leverage cuts both ways', secs: 20, core: true, say: "Borrowing to invest is called leverage, and it magnifies both gains and losses. Put twenty percent down, and a rise in the home's value is amplified against your smaller stake. But so is a fall: a modest price drop can wipe out a big chunk of the money you put in. Leverage is power, and power can hurt." },
    { id: 'p-caprate', name: 'Cap rate, in plain words', secs: 22, core: true, say: "Investors size up a rental with the cap rate: the property's yearly net operating income divided by its price, written as a percentage. A higher cap rate usually signals higher potential return and higher risk. But it is just a one-year snapshot. It ignores your mortgage and assumes nothing changes, so it should never be the only thing you look at." },
    { id: 'p-depreciation', name: 'Depreciation and its sting', secs: 22, core: false, say: "Taxes get interesting. The I R S lets you depreciate a residential rental building over twenty-seven and a half years, deducting a slice each year, though you can never depreciate the land, only the building. The sting comes at sale: that depreciation is recaptured, and the I R S can tax it at a rate of up to twenty-five percent. A benefit now, a bill later." },
    { id: 'p-reit', name: 'REITs versus owning directly', secs: 22, core: false, say: "Not ready to be a landlord? A R E I T is a company that owns income-producing real estate, and by law it must pay out at least ninety percent of its taxable income to shareholders. A publicly traded R E I T trades like a stock and is easy to buy and sell. Non-traded R E I Ts can be hard to sell. Either way, real estate is sensitive to interest rates and carries real risk." },
    { id: 'p-close', name: 'Your takeaway', secs: 16, core: true, say: "Direct ownership means vacancies, repairs, and a property you cannot sell overnight. A R E I T trades that for less control. No real estate is guaranteed; values and rents can fall. Understand the leverage, respect the risks, and never let a single number make the decision." },
  ],
};

const LESSONS = {
  'welcome-money': WELCOME,
  'budgeting': BUDGETING,
  'compound-growth': COMPOUND,
  'risk-diversification': RISK,
  'retirement-accounts': RETIREMENT,
  'property-basics': PROPERTY,
};

// Curriculum order for the duration-scaled study session.
const CURRICULUM = ['budgeting', 'compound-growth', 'risk-diversification', 'retirement-accounts', 'property-basics'];

// Catalog cards for the hub, ordered welcome-first then curriculum.
export const LESSON_LIBRARY = ['welcome-money', ...CURRICULUM]
  .filter((id) => LESSONS[id])
  .map((id) => {
    const L = LESSONS[id];
    const segs = id === 'welcome-money' ? L.segments : [DISCLAIMER_SEG, ...L.segments];
    return { id, title: L.title, blurb: L.blurb, minutes: Math.max(1, Math.round(lessonSecs(segs) / 60)), sourceCount: (L.sources || []).length };
  });

// exported so the validator can assert sourcing/disclaimer/banned-claim rules
export { LESSONS };

// ---- plan builders (player-compatible) -----------------------------------

function planFromSegments(segs, meta) {
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
    // kind:'finance' is what the Player records, so finance is never a meditation.
    isMeditation: true,
    isLesson: true,
    kind: 'finance',
    lessonIds: meta.lessonIds,
    lessonTitles: meta.lessonTitles,
    sources: meta.sources,
    title: meta.title,
  };
}

// A specific catalog lesson by id, at its natural length. Topic lessons open
// with the spoken disclaimer so it is heard every time (the welcome already
// carries its own).
export function buildLessonById(id) {
  const L = LESSONS[id];
  if (!L) return null;
  const isWelcome = id === 'welcome-money';
  const segs = isWelcome ? L.segments : [DISCLAIMER_SEG, ...L.segments];
  return planFromSegments(segs, {
    durationKey: Math.max(1, Math.round(lessonSecs(segs) / 60)),
    lessonIds: isWelcome ? [] : [id],
    lessonTitles: isWelcome ? [] : [L.title],
    sources: dedupeSources(L.sources || []),
    title: L.title,
  });
}

// A duration-scaled study session: open with the welcome framing, then chain
// curriculum lessons until the chosen length is filled. Short picks take each
// lesson's CORE essentials; longer picks (15 min or more) go to full depth.
// Content is finite, so the session never pads with filler — it covers as much
// of the curriculum as fits, up to the whole thing.
export function buildLessonSession(durationMins) {
  const budget = durationMins * 60;
  const wantDepth = durationMins >= 15;
  const order = ['welcome-money', ...CURRICULUM.filter((id) => LESSONS[id])];
  const segs = [];
  const lessonIds = [];
  const lessonTitles = [];
  let sources = [];
  let used = 0;

  const add = (id, chosen) => {
    segs.push(...chosen);
    used += chosen.reduce((t, s) => t + segDur(s), 0);
    if (id !== 'welcome-money') {
      lessonIds.push(id);
      lessonTitles.push(LESSONS[id].title);
      sources = sources.concat(LESSONS[id].sources || []);
    }
  };

  for (const id of order) {
    const L = LESSONS[id];
    const core = L.segments.filter((s) => s.core !== false);
    const full = L.segments;
    const chosen = wantDepth ? full : core;
    const cost = chosen.reduce((t, s) => t + segDur(s), 0);
    if (!segs.length || used + cost <= budget) { add(id, chosen); continue; }
    // depth did not fit — try this topic's core only before giving up on it
    const coreCost = core.reduce((t, s) => t + segDur(s), 0);
    if (used + coreCost <= budget) { add(id, core); }
    // else skip this topic; a later, shorter one may still fit
  }

  return planFromSegments(segs, {
    durationKey: durationMins,
    lessonIds,
    lessonTitles,
    sources: dedupeSources(sources),
    title: 'Money basics',
  });
}
