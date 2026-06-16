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
  takeaways: [ "Give every dollar a job before the month spends it.", "Pay yourself first by making savings automatic each payday.", "Build a small cushion; even a few hundred dollars beats none.", "High-interest debt is urgent — clearing it is a guaranteed saving." ],
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
  takeaways: [ "Compounding is interest earning more interest over time.", "Rule of 72: divide 72 by the rate to estimate doubling time.", "Fees and inflation quietly leak away part of your growth.", "Compounding cuts both ways — debt grows against you too." ],
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
  takeaways: [ "Higher possible reward always rides with higher risk.", "No investment is risk-free, and growth is never promised.", "Diversification reduces risk but cannot erase it.", "Past performance does not predict the future; the right mix is yours." ],
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
  takeaways: [ "An employer match is the closest thing to free money.", "Traditional versus Roth is mainly a bet on future taxes.", "Contribution limits change most years, so check the current figure.", "This money holds investments and is parked for the long haul." ],
  yearLabel: '2026 limits, per IRS Notice 2025-67 (announced November 2025)',
  sources: [SRC.irs2026, SRC.irsRothTrad, SRC.irsVesting, SRC.irsCola],
  segments: [
    { id: 'rt-what', name: 'Accounts built for later', secs: 16, core: true, say: "Retirement accounts like a four oh one k and an I R A are special because of how they are taxed. The government gives you a break to encourage saving for later. A four oh one k is usually offered through work; an I R A you can open on your own." },
    { id: 'rt-tax', name: 'Traditional versus Roth', secs: 24, core: true, say: "The big choice is when you pay tax. With a traditional account, your contributions may lower your taxes now, and you pay tax later when you withdraw in retirement. With a Roth, you pay tax now, and qualified withdrawals later, including the growth, come out tax-free. Roth earnings are tax-free only if you are at least fifty-nine and a half and have had the account five years. Neither is automatically better; it is really a bet on your future tax rate." },
    { id: 'rt-limits', name: 'The twenty twenty-six limits', secs: 24, core: true, say: "Here are the twenty twenty-six limits from the I R S. You can put up to twenty-four thousand five hundred dollars of your own pay into a four oh one k. Across your I R As, up to seven thousand five hundred dollars in total. If you are fifty or older, you can add catch-up contributions: eight thousand more in a four oh one k, and eleven hundred more in an I R A. These numbers change most years, so always check the current figure." },
    { id: 'rt-supercatch', name: 'A boost for ages sixty to sixty-three', secs: 16, core: false, say: "One more twenty twenty-six rule worth knowing. If you are between sixty and sixty-three, a special super catch-up lets you add eleven thousand two hundred fifty dollars to your four oh one k, instead of the usual eight thousand. It is a short window, so it is worth using if you can." },
    { id: 'rt-match', name: 'Free money: the match', secs: 20, core: true, say: "If your employer offers a four oh one k match, that is about the closest thing to free money in personal finance. They add to your account when you contribute. To get the full match, you generally have to put in enough of your own pay to earn it. Whether a match exists, and how big it is, is set by your specific plan, so check yours." },
    { id: 'rt-vesting', name: 'The catch: vesting and lock-up', secs: 24, core: false, say: "Two honest catches. First, vesting. Your own contributions are always one hundred percent yours, but the employer's match may take a few years on the job to fully own. By law, up to a three-year cliff, or a six-year graded schedule. Leave early and you can forfeit the unvested match. Second, this money is meant for retirement. Pulling it out of a traditional account before fifty-nine and a half can mean a ten percent penalty plus regular income tax." },
    { id: 'rt-marketrisk', name: 'Not a savings account', secs: 16, core: false, say: "And remember, these accounts hold investments like stock and bond funds, which rise and fall. The return is never guaranteed; the balance can go down as well as up. The account is just the wrapper. What is inside still carries market risk." },
    { id: 'rt-close', name: 'Your takeaway', secs: 14, core: true, say: "If there is a match, try to grab it. Choose traditional or Roth based on your tax picture, mind the yearly limits, and know the money is parked for the long haul. Future you will be grateful." },
  ],
};

const PROPERTY = {
  id: 'property-basics', title: 'Property & real estate basics', topic: 'property',
  blurb: 'Mortgages, PMI, cap rate, leverage, depreciation, and REITs — the concepts and the risks.',
  takeaways: [ "PMI protects the lender, not you, and adds to your payment.", "Leverage magnifies both gains and losses on your stake.", "Cap rate is one yearly snapshot, never the whole picture.", "No real estate is guaranteed; values and rents can fall." ],
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
  "credit-score-basics": {
    id: "credit-score-basics", title: "Credit scores, plainly", topic: "credit",
    blurb: "What a score really is, the rough ranges, what nudges it up or down, and how to see yours for free.",
    takeaways: [ "A credit score is a prediction of how likely you are to repay, drawn from your credit reports.", "Many scores run from three hundred to eight fifty, but ranges differ, and you have more than one score.", "Paying on time and keeping balances low are the biggest things you control.", "You can see a score for free, but watch for sign-ups that charge after a short trial." ],
    yearLabel: "",
    sources: [
      { org: "CFPB", title: "What is a credit score?", url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-score-en-315/", year: "" },
      { org: "CFPB", title: "Where can I get my credit scores?", url: "https://www.consumerfinance.gov/ask-cfpb/where-can-i-get-my-credit-scores-en-316/", year: "" },
      { org: "CFPB", title: "Do I have to pay for my credit score?", url: "https://www.consumerfinance.gov/ask-cfpb/do-i-have-to-pay-for-my-credit-score-en-1265/", year: "" }
    ],
    segments: [
      { id: "credit-score-basics-s0", name: "What a score actually is", secs: 20, core: true, say: "Let us start plainly. A credit score is just a prediction of how likely you are to pay a loan back on time. The Consumer Financial Protection Bureau describes it exactly that way, a prediction built from the information in your credit reports. It is not a judgement of you as a person. It is a number that lenders lean on." },
      { id: "credit-score-basics-s1", name: "The rough ranges", secs: 22, core: true, say: "Many scores run from three hundred at the low end to eight fifty at the high end, with a higher number making it easier to qualify and often earning you a lower interest rate. Here is an honest caveat though: different companies use different ranges, so there is no single magic cut-off. And you do not have just one score. You have several, calculated from different data at different times." },
      { id: "credit-score-basics-s2", name: "What moves it up or down", secs: 24, core: true, say: "A handful of things move the needle most. Paying your bills on time helps; missing payments hurts. So does how much of your available credit you are using, how long you have had accounts, the mix of loans you carry, and how often you apply for new credit. Negative marks like collections or bankruptcy weigh it down for years. The good news is that the two biggest levers, paying on time and keeping balances low, are squarely in your hands." },
      { id: "credit-score-basics-s3", name: "How to check yours free", secs: 22, core: true, say: "You can see a score without paying. Many major credit card companies and lenders now show their customers a score every month, right on the statement or after you log in. A non-profit credit counselor, or a housing counselor trained by the Department of Housing and Urban Development, can also pull a report and score with you for free. Either route costs you nothing." },
      { id: "credit-score-basics-s4", name: "The catch with free scores", secs: 20, core: false, say: "Now the catch, because warm advice still tells the truth. Some sites advertise a free score but only hand it over once you sign up for monitoring with a monthly fee. These often start as a free trial, sometimes as short as one week, and if you forget to cancel you are on the hook. So before you enter a card number, read what you are really agreeing to." },
      { id: "credit-score-basics-s5", name: "Report versus score", secs: 18, core: false, say: "One more thing worth untangling. Your free yearly credit reports, from the official annual site, are not the same as your score. The reports list your accounts and history; the score is the number calculated from them. Both matter, and checking the report is how you catch mistakes that might be dragging the number down." },
      { id: "credit-score-basics-s6", name: "Your takeaway", secs: 14, core: true, say: "So: a score is a prediction, not a verdict. Pay on time, keep balances low, check it for free, and read the fine print before signing up for anything. Small, steady habits are what move it, and they move it in your favor." }
    ],
  },
  "paying-down-debt": {
    id: "paying-down-debt", title: "Paying down debt", topic: "debt",
    blurb: "Avalanche versus snowball, why minimums come first, and the honest case for attacking your highest rate.",
    takeaways: [ "Always keep up the minimum payment on every debt, then aim your extra money at one target.", "The avalanche pays the highest interest rate first and usually costs you the least over time.", "The snowball pays the smallest balance first and gives you quick wins for momentum.", "Clearing high-interest debt is a reliable saving few investments can match, but it is not investing.", "Be wary of consolidation offers that look too good; introductory rates expire and fees add up." ],
    yearLabel: "",
    sources: [
      { org: "SEC (Investor.gov)", title: "Pay Off Credit Cards or Other High-Interest Debt", url: "https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/pay-credit-cards-or-other-high-interest", year: "" },
      { org: "CFPB", title: "What do I need to know about consolidating my credit card debt?", url: "https://www.consumerfinance.gov/ask-cfpb/what-do-i-need-to-know-if-im-thinking-about-consolidating-my-credit-card-debt-en-1861/", year: "" }
    ],
    segments: [
      { id: "paying-down-debt-s0", name: "First, protect the minimums", secs: 20, core: true, say: "Before any clever strategy, one rule keeps you safe: make at least the minimum payment on every single debt, every month. Missing a minimum can mean late fees, a higher rate, and a dent in your credit. So the plan is always the same shape. Cover all the minimums first, then take whatever extra money you have and point it, like a spotlight, at just one debt." },
      { id: "paying-down-debt-s1", name: "The avalanche", secs: 22, core: true, say: "The first strategy is called the avalanche, the highest interest rate method. You aim your extra money at the debt charging the most interest, because that is the one quietly costing you the most. It may not feel dramatic at first, but clearing your priciest debt first saves you the most money over time. Once it is gone, you roll that freed-up payment onto the next highest rate." },
      { id: "paying-down-debt-s2", name: "The snowball", secs: 22, core: true, say: "The second strategy is the snowball. Here you aim your extra money at the smallest balance instead, regardless of its rate, just to knock it out fast. The reward is momentum: you see a debt fully disappear quickly, which keeps you going. The honest trade-off is that you may pay a bit more in total interest, because you are not attacking the costliest debt first. Both are valid; the best one is the one you will actually stick with." },
      { id: "paying-down-debt-s3", name: "Why high-interest debt comes first", secs: 24, core: true, say: "Here is why high-interest debt feels so urgent. The Securities and Exchange Commission puts it bluntly: no investment strategy pays off as well as, or with less risk than, eliminating high-interest debt. Most credit cards charge as much as eighteen percent or more if you carry a balance, and virtually no investment reliably matches an eighteen percent return. So paying that card down can be one of the most dependable uses of your money, though, to be clear, it is paying off debt, not investing." },
      { id: "paying-down-debt-s4", name: "About consolidation", secs: 22, core: false, say: "You may hear that consolidating, rolling several debts into one, is the easy answer. Sometimes it helps, but the Consumer Financial Protection Bureau urges caution. A balance-transfer card often has a low introductory rate that jumps later, plus a transfer fee. A longer loan can lower your monthly payment yet cost more in total. And borrowing against your home turns unsecured debt into a debt that could cost you the house if you fall behind. Be wary of any offer that seems too good to be true." },
      { id: "paying-down-debt-s5", name: "Find the root cause", secs: 18, core: false, say: "One gentle truth the bureau adds: a payoff plan works best when you also get to the bottom of why the debt built up. No strategy and no consolidation fixes a budget that runs short every month. Pairing the math with a small change in spending, even a tiny one, is what makes the progress last." },
      { id: "paying-down-debt-s6", name: "Your takeaway", secs: 14, core: true, say: "So: cover every minimum, then attack one debt at a time. Choose the avalanche to save the most, or the snowball for momentum. Treat high-interest debt as urgent, and read consolidation offers with clear eyes. Steady beats clever here." }
    ],
  },
  "banking-and-apy": {
    id: "banking-and-apy", title: "Banks, savings & APY", topic: "banking",
    blurb: "Checking versus savings, what APY really measures, the FDIC insurance limit, and the fees to watch.",
    takeaways: [ "Checking is for everyday spending; savings is for setting money aside, often at a higher rate.", "APY rolls the interest rate plus compounding into one yearly number, so you can compare fairly.", "FDIC insurance covers up to two hundred fifty thousand dollars per depositor, per bank, per ownership category.", "Insurance covers deposits like checking, savings, and CDs, not stocks, bonds, funds, or crypto.", "Fees like monthly maintenance and overdraft can quietly outweigh the interest you earn." ],
    yearLabel: "FDIC limit per Deposit Insurance At A Glance (in effect 2026)",
    sources: [
      { org: "FDIC", title: "Deposit Insurance At A Glance", url: "https://www.fdic.gov/resources/deposit-insurance/brochures/deposits-at-a-glance", year: "2026" },
      { org: "FDIC", title: "VI-3 Truth in Savings (Regulation DD)", url: "https://www.fdic.gov/consumer-compliance-examination-manual/vi-3-truth-savings", year: "" }
    ],
    segments: [
      { id: "banking-and-apy-s0", name: "Checking versus savings", secs: 20, core: true, say: "Two everyday accounts do two different jobs. A checking account is your hub for spending: paychecks land there, and bills and card payments flow out. A savings account is a quieter spot to set money aside, usually paying a bit more interest in exchange for fewer everyday withdrawals. Most people use both, checking for the month, savings for the goals and the rainy day." },
      { id: "banking-and-apy-s1", name: "What APY really means", secs: 24, core: true, say: "When you compare savings accounts you will see a number called A P Y, the annual percentage yield. Under the federal Truth in Savings rule, it is defined as a percentage that reflects the total interest you would earn over a full year, based on the interest rate and how often the interest compounds. That is the useful part: A P Y rolls the rate and the compounding together into one figure, so you can compare two banks fairly, side by side." },
      { id: "banking-and-apy-s2", name: "Rate versus yield", secs: 18, core: false, say: "So why two numbers, the interest rate and the A P Y? The interest rate is the plain rate before compounding. The A P Y is what you actually end up with after the interest earns a little interest of its own through the year. When you shop, compare A P Y to A P Y. It is the honest apples-to-apples number, and it is always at least as high as the plain rate." },
      { id: "banking-and-apy-s3", name: "The FDIC safety net", secs: 24, core: true, say: "Here is the reassuring part. Money in a bank that is F D I C insured is protected if that bank fails, up to two hundred fifty thousand dollars per depositor, per insured bank, for each ownership category. So a single person at one bank is covered to that amount, and you can be covered for more by spreading across banks or ownership categories. The F D I C pays you dollar for dollar, up to the limit. It is one of the steadiest safety nets in all of finance." },
      { id: "banking-and-apy-s4", name: "What insurance does not cover", secs: 22, core: true, say: "Now the honest limit. That insurance covers deposits, things like checking, savings, money market deposit accounts, and certificates of deposit. It does not cover stocks, bonds, mutual funds, annuities, life insurance, or cryptocurrency, even if you bought them through the same bank. Those can lose value, and no federal insurance steps in. So the safety net is real, but it is only for deposits." },
      { id: "banking-and-apy-s5", name: "Watch the fees", secs: 22, core: false, say: "One thing can quietly undo a good rate: fees. Banks may charge a monthly maintenance fee, a paper-statement fee, an out-of-network A T M fee, or an overdraft fee when you spend more than you have. The Truth in Savings rule requires the bank to disclose these, so they are findable. The trap is that on a modest balance, the fees can easily outweigh the interest you earn. It is worth reading the fee schedule before you open anything." },
      { id: "banking-and-apy-s6", name: "Your takeaway", secs: 14, core: true, say: "So: checking for spending, savings for setting aside. Compare by A P Y, keep your balance under the insurance limit, remember that only deposits are insured, and read the fee schedule. A boring, well-chosen account is a quietly powerful thing." }
    ],
  },
  "emergency-fund-deeper": {
    id: "emergency-fund-deeper", title: "Your emergency fund, deeper", topic: "budgeting",
    blurb: "How much to set aside, where to keep it safe and reachable, and starter goals that actually fit a real budget.",
    takeaways: [ "There is no single right number; size your fund to your own past surprise expenses, not a one-size-fits-all rule.", "A few hundred dollars set aside beats none, and a small starter goal is easier to keep than a huge one.", "Keep it safe and easy to reach, like an F D I C insured savings account, separate from your everyday spending money.", "Automatic transfers make saving stick, but leave a buffer so a transfer never triggers an overdraft fee.", "Cash left in a low-interest account is safe and handy, yet over many years inflation can quietly shrink what it buys." ],
    yearLabel: "",
    sources: [
      { org: "Consumer Financial Protection Bureau", title: "An essential guide to building an emergency fund", url: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/", year: "" },
      { org: "U.S. Securities and Exchange Commission (Investor.gov)", title: "Save and Invest", url: "https://www.investor.gov/introduction-investing/investing-basics/save-and-invest", year: "" },
      { org: "Federal Deposit Insurance Corporation", title: "Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/", year: "" }
    ],
    segments: [
      { id: "emergency-fund-deeper-s0", name: "What it is for", secs: 18, core: true, say: "An emergency fund is cash you set aside on purpose, for the surprises that life hands everyone: a car repair, a medical bill, a gap between jobs. The Consumer Financial Protection Bureau describes it as money that is there so an unexpected cost does not turn into debt. It is a cushion, not an investment." },
      { id: "emergency-fund-deeper-s1", name: "How much, really", secs: 24, core: true, say: "Here is the honest answer on how much: it depends on your situation. The C F P B suggests thinking about the most common surprise expenses you have had in the past, and what they cost. Many financial pros point to somewhere around three to six months of living expenses as a fuller goal, but that is a target to grow toward, not a starting line. The right number is the one that fits your life." },
      { id: "emergency-fund-deeper-s2", name: "Start small on purpose", secs: 20, core: true, say: "If three to six months sounds impossible right now, you are not alone, and you do not need it on day one. The C F P B is clear that even a small amount can provide some financial security. A starter goal of a few hundred dollars is a real win, because a smaller goal is one you can actually reach, and reaching it keeps you going." },
      { id: "emergency-fund-deeper-s3", name: "Where to keep it", secs: 22, core: true, say: "Where you keep it matters. The C F P B calls a dedicated bank or credit union account one of the safest places to put your money. The fund should be safe, easy to reach when a real emergency hits, and in a place where you are not tempted to spend it on a non-emergency. Keeping it a little out of sight, separate from your everyday checking, helps it stay untouched." },
      { id: "emergency-fund-deeper-s4", name: "Make it automatic", secs: 20, core: false, say: "The trick that makes this stick is to make saving automatic. The C F P B suggests setting up a small recurring transfer, or if you get direct deposit, splitting your paycheck so a slice lands in savings before you see it. You never handle that money, so you never miss it. Just keep a small buffer in checking, so an automatic transfer never tips you into an overdraft fee." },
      { id: "emergency-fund-deeper-s5", name: "Safe, but not free of trade-offs", secs: 22, core: false, say: "One honest caveat. Cash sitting in a savings account is safe and reachable, and if the bank is F D I C insured it is protected up to the legal limit if that bank fails. But a savings rate is usually modest, and over many years inflation can quietly shrink what your cushion buys. That is a fair price for safety. An emergency fund is meant to be steady and boring, not to grow your wealth; that job belongs to other money." },
      { id: "emergency-fund-deeper-s6", name: "Your takeaway", secs: 14, core: true, say: "So: size the fund to your own surprises, start small and let it grow, keep it safe and reachable, and make the saving automatic. A boring, untouched cushion is one of the kindest things you can build for your future self." }
    ],
  },
  "credit-card-traps": {
    id: "credit-card-traps", title: "Credit-card traps", topic: "budgeting",
    blurb: "How the grace period, the minimum-payment trap, and revolving interest really work, in plain words, with the risks shown next to the perks.",
    takeaways: [ "If your card has a grace period, paying the full balance by the due date each month means you owe no interest on purchases.", "Lose the grace period, and interest starts piling on new purchases from the day you buy them, not at the end of the month.", "Paying only the minimum is a trap: it stretches the debt for years and multiplies what you pay in interest.", "Credit-card interest compounds in the lender's favor, often above twenty percent a year, so a balance grows fast if left alone.", "The most powerful move is to pay the full statement balance every month; if you cannot, pay as much above the minimum as you can." ],
    yearLabel: "Rate figure: March twenty twenty-six, Federal Reserve G.19",
    sources: [
      { org: "Consumer Financial Protection Bureau", title: "What is a grace period for a credit card?", url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-grace-period-for-a-credit-card-en-47/", year: "" },
      { org: "Consumer Financial Protection Bureau", title: "How does my credit card company calculate the amount of interest I owe?", url: "https://www.consumerfinance.gov/ask-cfpb/how-does-my-credit-card-company-calculate-the-amount-of-interest-i-owe-en-51/", year: "" },
      { org: "Consumer Financial Protection Bureau", title: "Minimum payment warning box: three-year payoff", url: "https://www.consumerfinance.gov/ask-cfpb/a-box-on-my-credit-card-bill-says-that-i-will-pay-off-the-balance-in-three-years-if-i-pay-a-certain-amount-what-does-that-mean-do-i-have-to-pay-that-much-if-i-pay-that-much-and-make-new-purchases-will-i-still-owe-nothing-after-three-years-en-36/", year: "" },
      { org: "Federal Reserve", title: "Consumer Credit G.19 (credit card interest rates)", url: "https://www.federalreserve.gov/releases/g19/current/", year: "2026" }
    ],
    segments: [
      { id: "credit-card-traps-s0", name: "The friendly version", secs: 18, core: false, say: "A credit card can be a genuinely useful tool. Used one way, it is almost free: you borrow for a few weeks and pay nothing extra. Used another way, it becomes one of the most expensive debts most people ever carry. The whole difference comes down to a few rules, so let us walk through them plainly." },
      { id: "credit-card-traps-s1", name: "The grace period", secs: 24, core: true, say: "First, the grace period. The Consumer Financial Protection Bureau defines it as the stretch between the end of your billing cycle and the date your payment is due. If your card has one, and you pay your bill in full and on time each month, you owe no interest on purchases at all. That is the card at its best. The catch: not every card offers a grace period, and cash advances usually have none, so interest starts the moment you take the cash." },
      { id: "credit-card-traps-s2", name: "How you lose it", secs: 22, core: true, say: "Here is the trap. The C F P B explains that if you do not pay your balance in full, you can lose the grace period, for that month and the month after. Once it is gone, interest is charged on new purchases starting on the very day you make them. So carrying a balance does not just cost interest on the old debt; it can quietly switch off the free period on everything new you buy too." },
      { id: "credit-card-traps-s3", name: "How the interest stacks up", secs: 24, core: true, say: "Now the math, gently. The C F P B explains that many issuers calculate interest daily, on your average daily balance, using a daily rate drawn from your A P R. Because it is charged daily, the interest itself can start earning interest. That is compounding, working in the lender's favor. And these rates are high: the Federal Reserve measured the average credit-card rate at around twenty-one percent a year in March twenty twenty-six. A balance left alone at that rate grows surprisingly fast." },
      { id: "credit-card-traps-s4", name: "The minimum-payment trap", secs: 24, core: true, say: "This is the big one. Your statement shows a minimum payment, and it is tempting to pay just that. But the C F P B is blunt: paying only the minimum stretches the debt across years and piles up far more interest. By law, your bill must show a second number, the amount needed to clear the balance in three years, precisely so you can see how much faster a larger payment frees you. The minimum is the floor you are allowed to pay, never the smart target." },
      { id: "credit-card-traps-s5", name: "The honest upside", secs: 18, core: false, say: "To be fair, there is a real upside when you stay in the grace period. You get a short, no-cost loan every month, a record of your spending, fraud protections that cash does not offer, and on-time payments can help build your credit history. None of that requires paying a cent of interest. The perks are only worth it if the balance is cleared in full; otherwise the interest swamps every reward." },
      { id: "credit-card-traps-s6", name: "What to actually do", secs: 20, core: false, say: "So what works in practice? Pay the full statement balance every month if you possibly can, which keeps the grace period alive and the cost at zero. If a month is tight and you must carry a balance, pay as far above the minimum as you can, because the C F P B notes the more you pay, the less interest you owe over time. And treat a high-rate balance as urgent; paying it down is one of the most powerful money moves there is." },
      { id: "credit-card-traps-s7", name: "Your takeaway", secs: 14, core: true, say: "In short: protect the grace period by paying in full, never settle for the minimum, and remember that card interest compounds against you. The card is a fine tool right up until you carry a balance; after that, the meter is running." }
    ],
  },
  "spotting-money-scams": {
    id: "spotting-money-scams", title: "Spotting money scams", topic: "investing",
    blurb: "The common scams, the red flags they share, simple ways to protect yourself, and exactly where to report them.",
    takeaways: [ "Nearly every scam shares the same red flags: pressure to act now, an offer that sounds too good, and an unusual way to pay.", "Be wary of any pitch promising high returns with little or no risk; real investing always pairs reward with risk.", "If someone demands payment by gift card, wire transfer, or cryptocurrency, treat it as a scam until proven otherwise.", "Slow down and verify: check an investment professional's registration at investor.gov before sending any money.", "Report investment fraud to the S E C, and other scams through the proper channel; reporting helps stop the next victim." ],
    yearLabel: "",
    sources: [
      { org: "Consumer Financial Protection Bureau", title: "What are some classic warning signs of possible fraud and scams?", url: "https://www.consumerfinance.gov/ask-cfpb/what-are-some-classic-warning-signs-of-possible-fraud-and-scams-en-2094/", year: "" },
      { org: "U.S. Securities and Exchange Commission (Investor.gov)", title: "Common Scams", url: "https://www.investor.gov/additional-resources/spotlight/common-scams", year: "" },
      { org: "Consumer Financial Protection Bureau", title: "What are some common types of scams?", url: "https://www.consumerfinance.gov/ask-cfpb/what-are-some-common-types-of-scams-en-2092/", year: "" },
      { org: "U.S. Securities and Exchange Commission (Investor.gov)", title: "Protect Your Money: How to Avoid Investment Scams", url: "https://www.investor.gov/protect-your-investments/fraud/protect-your-money", year: "" }
    ],
    segments: [
      { id: "spotting-money-scams-s0", name: "Why this matters", secs: 16, core: false, say: "Money scams are not rare, and they are not a sign you are foolish. Scammers are skilled, and they target everyone. The good news is that almost every scam follows the same handful of patterns. Learn those patterns once, and you can spot a stranger you have never met. That is what this lesson is for." },
      { id: "spotting-money-scams-s1", name: "The common shapes", secs: 24, core: true, say: "Scams come in familiar shapes. The Securities and Exchange Commission warns about relationship and investment schemes, where someone builds trust online or by text, then steers you into a phony investment. The Consumer Financial Protection Bureau adds impostor scams, where someone claims to be your bank, the government, or even a family member, and advance-fee scams, where you must pay a fee or tax up front to unlock a prize or a payout that never arrives." },
      { id: "spotting-money-scams-s2", name: "The red flags they share", secs: 24, core: true, say: "Here is the part worth memorizing, because it cuts across all of them. The S E C and the C F P B point to the same warning signs: pressure to act right now before the deal disappears, an offer that sounds too good to be true, and a pitch promising high returns with little or no risk. Add unsolicited contact you did not ask for, and requests for your personal or account information. When several of these show up together, the odds of a scam climb sharply." },
      { id: "spotting-money-scams-s3", name: "The payment tell", secs: 22, core: true, say: "If you remember one thing, remember this. The C F P B notes that scammers love payment methods that are hard to trace and hard to reverse: gift cards, wire transfers, cryptocurrency, and payment apps. No legitimate business, bank, or government agency will demand you pay a debt or a fee in gift cards. The instant someone insists on one of these, treat it as a scam until you have proven otherwise." },
      { id: "spotting-money-scams-s4", name: "How to protect yourself", secs: 22, core: true, say: "Protecting yourself is mostly about slowing down. Scammers manufacture urgency precisely because a calm person checks the facts. So pause, and verify independently: hang up and call the real number yourself, and never use a number or link the caller gave you. For any investment, the S E C urges you to confirm the seller's registration using the free background tools at investor.gov. A genuine opportunity survives a few questions; a scam falls apart under them." },
      { id: "spotting-money-scams-s5", name: "An honest limit", secs: 16, core: false, say: "One honest caveat: no checklist catches everything. Scams evolve, and a polished one can fool careful people, so feeling fooled is never a character flaw. Treat these red flags as a strong filter, not a force field. When something feels off, that instinct is worth more than any single rule, and it costs nothing to wait a day before sending money." },
      { id: "spotting-money-scams-s6", name: "Where to report", secs: 20, core: false, say: "If you spot or fall for a scam, reporting it matters, both to help your own case and to protect the next person. For investment fraud, the S E C takes tips and complaints; you can find the link at investor.gov. For other scams, the C F P B can take a complaint at consumerfinance.gov. Reporting is free, and even an attempt that did not cost you anything is worth flagging." },
      { id: "spotting-money-scams-s7", name: "Your takeaway", secs: 14, core: true, say: "So, the pattern to carry with you: urgency, an offer too good to be true, and a strange way to pay. Slow down, verify on your own, and report what you find. A scam needs your speed and your silence; deny it both, and you take away its power." }
    ],
  },
  "index-funds-and-etfs": {
    id: "index-funds-and-etfs", title: "Index funds & ETFs", topic: "investing",
    blurb: "What an index is, how one fund can hold hundreds of companies, and the honest differences between ETFs and mutual funds.",
    takeaways: [ "An index is just a list that tracks a slice of the market; an index fund tries to copy it, not beat it.", "One index fund can spread your money across hundreds of companies in a single purchase, which softens any one company's bad day.", "Index funds usually charge less than funds run by stock-pickers, and over many years lower costs leave more in your pocket.", "Mutual funds price once a day; ETFs trade all day at a market price that can drift a little above or below what they actually hold.", "Spreading out lowers risk but never removes it; when the whole market falls, a broad fund falls too, and these funds are not F D I C insured." ],
    yearLabel: "",
    sources: [
      { org: "SEC (Investor.gov)", title: "Index Fund", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/index-fund", year: "" },
      { org: "SEC (Investor.gov)", title: "Characteristics of Mutual Funds and Exchange-Traded Funds (ETFs) — Investor Bulletin", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/characteristics-mutual-funds-exchange-traded-funds", year: "" },
      { org: "SEC (Investor.gov)", title: "Exchange-Traded Funds (ETFs)", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/mutual-funds-and-exchange-traded-2", year: "" }
    ],
    segments: [
      { id: "index-funds-and-etfs-s0", name: "What an index is", secs: 18, core: true, say: "Start with the word index. An index is just a list that measures a slice of the market, like the five hundred large American companies in one famous index. It is a yardstick, not something you buy. It simply tells you how that group of companies did today." },
      { id: "index-funds-and-etfs-s1", name: "A fund that copies the list", secs: 22, core: true, say: "An index fund is a fund that tries to copy that list. The Securities and Exchange Commission describes it as a fund that follows a passive strategy, aiming for roughly the same return as a particular index, before fees. So instead of paying someone to guess which companies will win, you simply hold a little of all of them and ride the whole group." },
      { id: "index-funds-and-etfs-s2", name: "Diversification in one buy", secs: 20, core: true, say: "Here is the quiet magic. One broad index fund can spread your money across hundreds of companies in a single purchase. If one company stumbles, it is only a sliver of the whole, so a bad day for one stock barely moves your total. That spreading out is called diversification, and a fund makes it easy." },
      { id: "index-funds-and-etfs-s3", name: "Where it can't help", secs: 20, core: true, say: "Now the honest limit. Spreading out softens the blow when one company falls, but it cannot protect you when the whole market drops, because then most things fall together. A broad fund can and does lose value, and unlike a bank deposit, funds are not F D I C insured. Think of diversification as a seatbelt, not a force field." },
      { id: "index-funds-and-etfs-s4", name: "ETF or mutual fund?", secs: 24, core: true, say: "Index funds come in two wrappers. A mutual fund is priced once a day, after the market closes, so when you place an order you will not know the exact price until the end of the day. An exchange traded fund, or E T F, trades all day on an exchange like a stock, at whatever the market price is right then. The S E C notes that an E T F's market price can sit a little above or below the value of what it actually holds, a premium or a discount." },
      { id: "index-funds-and-etfs-s5", name: "The cost angle", secs: 20, core: false, say: "Cost is a big reason people choose index funds. Because the fund just copies a list instead of paying experts to pick stocks, its yearly fee tends to be low. The S E C points out that over long stretches, lower fees and expenses can leave you with meaningfully more. Still, low cost does not mean no risk; a cheap fund full of falling stocks still falls." },
      { id: "index-funds-and-etfs-s6", name: "Look inside before you trust it", secs: 18, core: false, say: "One trap worth knowing. Not every fund is broadly spread. Some hold only a narrow sector, and some E T Fs even track a single stock, which is barely diversified at all. The name on the label is not enough, so it is always worth peeking at what a fund actually holds before assuming it is safe and spread out." },
      { id: "index-funds-and-etfs-s7", name: "Your takeaway", secs: 14, core: false, say: "So: an index is a list, an index fund copies that list cheaply, and one fund can hold hundreds of companies at once. E T Fs trade all day, mutual funds price once a day, and neither one removes market risk. Broad and low cost is a sensible starting shape, not a promise." }
    ],
  },
  "dollar-cost-averaging": {
    id: "dollar-cost-averaging", title: "Investing a little at a time", topic: "investing",
    blurb: "Putting in the same amount on a schedule, no matter the price — what it really does for you, and what it honestly cannot do.",
    takeaways: [ "Dollar-cost averaging means investing the same amount at regular intervals, no matter what the price is doing that day.", "When prices are low your fixed amount buys more shares, and when prices are high it buys fewer, all without you trying to guess the market.", "The biggest real benefit is behavioural: a steady schedule keeps you investing through scary stretches instead of freezing or panic-selling.", "It does not protect you from loss; if the market keeps falling, the value of what you already hold falls with it.", "It is time in the market, not timing the market, that tends to matter, so the habit beats the perfect moment." ],
    yearLabel: "",
    sources: [
      { org: "SEC (Investor.gov)", title: "Dollar Cost Averaging", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging", year: "" },
      { org: "SEC (Investor.gov)", title: "Don't Panic, Plan It! — Director's Take", url: "https://www.investor.gov/additional-resources/spotlight/formerdirectorlorischock-directors-take/dont-panic-plan-it", year: "" }
    ],
    segments: [
      { id: "dollar-cost-averaging-s0", name: "The plain idea", secs: 18, core: true, say: "Dollar-cost averaging is a fancy name for a simple habit. The Securities and Exchange Commission describes it as investing your money in equal portions, at regular intervals, no matter the ups and downs of the market. Same amount, same schedule, like fifty dollars on the first of every month, rain or shine." },
      { id: "dollar-cost-averaging-s1", name: "What the schedule does", secs: 22, core: true, say: "Because the amount stays fixed but prices wander, something quietly helpful happens. The S E C explains that the same amount of money buys more shares when the price is low, and fewer shares when the price is high. You are not trying to guess the bottom; the schedule does the buying for you, leaning into cheaper prices automatically." },
      { id: "dollar-cost-averaging-s2", name: "The real benefit is you", secs: 22, core: true, say: "The honest, biggest benefit is behavioural. When the market drops and the headlines turn scary, the natural urge is to stop or to sell. The S E C warns that selling when you see prices fall can be a mistake, since that is often a fine time to keep buying. A fixed schedule takes the emotion out and keeps you steadily investing through the rough patches." },
      { id: "dollar-cost-averaging-s3", name: "What it cannot do", secs: 22, core: true, say: "Now the caveat, because there is always one. A schedule does not shield you from loss. If the market keeps sliding, the value of the shares you already own slides too, and your steady buying does not stop that. The S E C frames the upside as setting you up for gains when the market recovers, not as protection while it is still falling. There is no promise it ends ahead." },
      { id: "dollar-cost-averaging-s4", name: "Time, not timing", secs: 18, core: true, say: "Here is the line worth keeping. The S E C puts it as time in the market, not timing of the market, that generally leads to long-term success. Nobody reliably calls the perfect day to buy. A boring, automatic schedule sidesteps that whole guessing game, and consistency tends to beat cleverness over the years." },
      { id: "dollar-cost-averaging-s5", name: "A fair point against it", secs: 20, core: false, say: "To be even-handed, there is a counter-argument. If you happen to have a lump sum and the market generally drifts upward over long stretches, investing it all at once has often grown more than spreading it out, simply because it spends more time invested. Dollar-cost averaging trades a bit of that potential for a calmer ride and an easier habit. Which matters more is personal." },
      { id: "dollar-cost-averaging-s6", name: "Your takeaway", secs: 14, core: false, say: "So: pick an amount, pick a rhythm, and keep going regardless of the price. It buys more when things are cheap, keeps you steady when things are scary, and asks no fortune-telling. Just remember it is a discipline for staying invested, not a shield against losing money." }
    ],
  },
  "investment-fees": {
    id: "investment-fees", title: "Fees that eat returns", topic: "investing",
    blurb: "Expense ratios, sales loads, and the uncomfortable math of how a small yearly fee quietly compounds against you over decades.",
    takeaways: [ "An expense ratio is the fund's yearly fee, taken straight out of the fund's assets, so it lowers your return whether the market goes up or down.", "A sales load is a one-time charge for buying or selling certain funds; many low-cost funds have none at all.", "Fees compound against you: the S E C's own example shows a one percent yearly fee costing nearly thirty thousand dollars more than a quarter-percent fee over twenty years.", "A higher-cost fund has to perform better than a cheaper one just to leave you in the same place.", "Low fees are not the only thing that matters and they never remove market risk, but they are one of the few costs you can actually control." ],
    yearLabel: "",
    sources: [
      { org: "SEC (Investor.gov)", title: "How Fees and Expenses Affect Your Investment Portfolio — Investor Bulletin", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated", year: "" },
      { org: "SEC (Investor.gov)", title: "Mutual Fund and ETF Fees and Expenses — Investor Bulletin", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/mutual-fund-and-etf-fees-and-expenses-investor-bulletin", year: "" }
    ],
    segments: [
      { id: "investment-fees-s0", name: "Fees are invisible, not free", secs: 18, core: true, say: "Fees are easy to ignore because you rarely write a cheque for them. They are taken quietly, straight out of the fund itself. The Securities and Exchange Commission says it plainly: when fees are paid out of fund assets, the value of the fund drops, and so does the value of every investor's shares. You feel it as a slightly smaller balance, never a bill." },
      { id: "investment-fees-s1", name: "The expense ratio", secs: 22, core: true, say: "The main one to know is the expense ratio. It is the fund's yearly operating cost, written as a small percentage of the money you have in it, maybe a quarter of a percent for a plain index fund, or well over one percent for a fund run by active stock-pickers. It is charged every single year, in good markets and bad, whether the fund made money or lost it." },
      { id: "investment-fees-s2", name: "Loads and other charges", secs: 22, core: true, say: "Watch also for a sales load, a one-time charge some funds add. The S E C describes a front-end load you pay when you buy, and a back-end load you pay when you sell. It is a fee to compensate the person selling the fund, not a payment that helps your money grow. Plenty of low-cost funds carry no load at all, so it is worth checking before you commit." },
      { id: "investment-fees-s3", name: "The compounding sting", secs: 24, core: true, say: "Here is why small fees matter so much. The S E C runs a hypothetical: a one hundred thousand dollar portfolio earning four percent a year for twenty years. With a quarter-percent yearly fee it grows to about two hundred eight thousand dollars. With a one percent fee, only about one hundred seventy-nine thousand. That gap, nearly thirty thousand dollars, is lost purely to fees, because every dollar paid in fees is a dollar that stops compounding for you." },
      { id: "investment-fees-s4", name: "The bar a costly fund must clear", secs: 18, core: true, say: "There is a simple way to feel the weight of it. The S E C notes that a fund with higher costs has to perform better than a cheaper fund just to give you the same result. So a pricey fund is not only taking more, it is starting each year a step behind, and it has to out-run that handicap before you see a single extra dollar." },
      { id: "investment-fees-s5", name: "Fees aren't the whole story", secs: 20, core: false, say: "A fair caveat, so this does not become fee-obsession. Low cost is not the only thing that matters; a cheap fund can still hold the wrong things and lose value, and fees never remove market risk. There can also be hidden costs, like trading expenses inside the fund, that the headline number leaves out. But of all the forces acting on your money, fees are one of the very few you can actually control." },
      { id: "investment-fees-s6", name: "Where to look", secs: 16, core: false, say: "Practically, the expense ratio and any loads are spelled out in the fund's prospectus, in a fee table near the front. You do not have to read every page. Find that table, compare the yearly expense ratio against similar funds, and ask whether any load is worth it. A few minutes there can quietly protect years of growth." },
      { id: "investment-fees-s7", name: "Your takeaway", secs: 14, core: false, say: "So: fees come out silently, they repeat every year, and they compound against you for decades. Check the expense ratio, avoid needless loads, and remember a costly fund must beat a cheap one just to break even with it. You cannot control the market, but you can control what you pay." }
    ],
  },
  "stocks-and-bonds": {
    id: "stocks-and-bonds", title: "Stocks & bonds, plainly", topic: "investing",
    blurb: "What a share and a bond each are, and how they differ in risk and reward.",
    takeaways: [ "A stock is a slice of ownership; a bond is a loan you make to an issuer.", "Stocks can grow more but swing more; bonds pay set interest but are not risk free.", "If a company fails, bondholders are paid before common stockholders.", "Neither one is FDIC insured, and both can lose value." ],
    yearLabel: "",
    sources: [
      { org: "SEC (Investor.gov)", title: "Stocks", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks", year: "" },
      { org: "SEC (Investor.gov)", title: "Bonds", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds", year: "" }
    ],
    segments: [
      { id: "stocks-and-bonds-s0", name: "Owning versus lending", secs: 18, core: true, say: "Here is the whole idea in one breath. A stock is a little slice of owning a company. A bond is a loan you make to a company or a government. So one makes you a part owner, and the other makes you a lender. That single difference shapes almost everything else." },
      { id: "stocks-and-bonds-s1", name: "What a share is", secs: 22, core: true, say: "When you buy a share of stock, the Securities and Exchange Commission says you own a share of that company. You can gain in two ways: the price can rise, which is called capital appreciation, and the company may pay out part of its earnings to you as a dividend. Both are possibilities, though, not promises. A company can stop paying dividends, and the price can just as easily fall." },
      { id: "stocks-and-bonds-s2", name: "What a bond is", secs: 24, core: true, say: "A bond, the S E C explains, is a debt security, a bit like an I O U. You lend money for a set time. In return the issuer promises to pay you a stated rate of interest along the way, and to pay back the original amount, called the face value or par value, when the bond matures. That steadier income is the appeal. But that promise is only as good as the borrower, which brings us to the risks." },
      { id: "stocks-and-bonds-s3", name: "The risks, side by side", secs: 24, core: true, say: "Both carry risk; they just carry different kinds. Stocks can swing hard. The S E C notes that large company stocks as a group have lost money on average about one year in every three. Bonds feel calmer, yet they are not risk free. The issuer can default and miss payments, and if you sell before maturity, rising rates can leave the bond worth less than its face value. Calmer is not the same as safe." },
      { id: "stocks-and-bonds-s4", name: "Who gets paid first", secs: 20, core: false, say: "Here is a difference that matters most on the worst day. If a company goes bankrupt and its assets are sold off, the S E C points out that common stockholders are last in line. Lenders, including bondholders, get paid before owners do. So an owner may carry more upside in good times, and more exposure when things go badly. Reward and risk travel together." },
      { id: "stocks-and-bonds-s5", name: "A fair word on safety", secs: 18, core: false, say: "One honest reminder. Unlike money in an F D I C insured bank account, neither stocks nor bonds are F D I C insured. There is no backstop that returns your money if the market falls. That is not a reason to avoid them, only a reason to understand that the chance of higher growth comes with the real chance of loss." },
      { id: "stocks-and-bonds-s6", name: "Your takeaway", secs: 14, core: true, say: "So, plainly: a stock is owning, a bond is lending. Stocks can grow more but move more; bonds pay set interest but still carry risk. Knowing which one you hold, and why, is half the work." }
    ],
  },
  "inflation-and-rates": {
    id: "inflation-and-rates", title: "Inflation & interest rates", topic: "economy",
    blurb: "Why prices rise, what the Federal Reserve does, and how rates reach your money.",
    takeaways: [ "Inflation is a broad rise in prices that slowly shrinks what a dollar buys.", "The Fed aims for about two percent inflation over the longer run.", "The Fed mainly works through the federal funds rate, the cost of overnight bank borrowing.", "Higher rates cool borrowing and spending; lower rates encourage them — with a lag, not a switch." ],
    yearLabel: "",
    sources: [
      { org: "Federal Reserve", title: "What is inflation, and how does the Federal Reserve evaluate changes in the rate of inflation?", url: "https://www.federalreserve.gov/faqs/economy_14419.htm", year: "" },
      { org: "Federal Reserve", title: "How does the Federal Reserve affect inflation and employment?", url: "https://www.federalreserve.gov/faqs/money_12856.htm", year: "" }
    ],
    segments: [
      { id: "inflation-and-rates-s0", name: "What inflation really is", secs: 18, core: true, say: "Inflation, in the Federal Reserve's words, is the increase in the prices of goods and services over time. It is not about one item getting pricier; it is the whole basket drifting up. The quiet effect is that the same dollar buys a little less than it used to. That is what people mean by losing purchasing power." },
      { id: "inflation-and-rates-s1", name: "The two percent goal", secs: 20, core: true, say: "The Fed aims for inflation of about two percent a year over the longer run, measured mainly by a broad price index called personal consumption expenditures. Why a target above zero? Because steady, low, predictable inflation helps households and businesses plan. Notice the honest part, though: it is a goal the Fed steers toward, not a dial it can set exactly. Inflation can run hotter or cooler than they would like." },
      { id: "inflation-and-rates-s2", name: "The Fed's main lever", secs: 22, core: true, say: "The Federal Reserve's main tool is an interest rate, the federal funds rate. That is the rate banks charge each other to borrow overnight. By raising or lowering its target range for that one rate, the Fed nudges the cost of borrowing across the whole economy. It does not set the rate on your car loan or your savings account directly, but it leans on the conditions that shape them." },
      { id: "inflation-and-rates-s3", name: "How rates touch your money", secs: 24, core: true, say: "Here is the chain in plain terms. When the Fed lowers rates, the Federal Reserve says it becomes cheaper to borrow, so households are more willing to buy goods and services, which can warm up spending and prices. When it raises rates, borrowing costs more, spending tends to cool, and that can ease inflation. For you, that often shows up as the rate on a mortgage, a credit card, or a savings account moving over time." },
      { id: "inflation-and-rates-s4", name: "Why it is not instant", secs: 20, core: false, say: "An important caveat the Fed states openly: the link from rate changes to inflation and jobs is not direct or immediate. Many forces move prices, from supply shocks to global events. Rate changes work with a lag and through many channels at once, so the effect is real but slow and imperfect. Anyone who promises a precise outcome from a single rate move is overselling it." },
      { id: "inflation-and-rates-s5", name: "What it means for savers", secs: 20, core: false, say: "For your own money, inflation and rates pull in opposite directions. Rising prices slowly erode cash that is sitting still. Higher interest rates can help, because savings accounts and similar deposits may pay more. But there is no promise that a savings rate keeps pace with inflation, so cash that earns less than prices rise can quietly lose ground even as the balance looks the same." },
      { id: "inflation-and-rates-s6", name: "Your takeaway", secs: 14, core: true, say: "So: inflation is the slow rise in prices, the Fed steers toward about two percent using one key interest rate, and those moves ripple to your loans and your savings, slowly and never perfectly. Knowing the direction helps, even when the timing is fuzzy." }
    ],
  },
  "saving-for-goals": {
    id: "saving-for-goals", title: "Saving for goals", topic: "saving",
    blurb: "Short versus long goals, sinking funds, and matching the account to the timeline.",
    takeaways: [ "Name the goal and its timeline first; the timeline points to the right account.", "Short-term money belongs somewhere safe and easy to reach; long-term money can take more risk.", "A sinking fund saves a little each month so a known future cost is not a shock.", "Keep goal savings separate from your emergency fund so one does not raid the other." ],
    yearLabel: "FDIC limit in effect 2026",
    sources: [
      { org: "SEC (Investor.gov)", title: "Save for a Rainy Day", url: "https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/save-rainy-day", year: "" },
      { org: "FDIC", title: "Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance", year: "2026" },
      { org: "CFPB", title: "An essential guide to building an emergency fund", url: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/", year: "" }
    ],
    segments: [
      { id: "saving-for-goals-s0", name: "Name the goal, name the date", secs: 18, core: true, say: "Saving works best when the goal has a name and a rough date. A short-term goal might be weeks or a few months away, like holiday gifts or a small repair. A long-term goal stretches over many months or years, like a home down payment or a child's schooling. The timeline is not a detail; it quietly decides where the money should live." },
      { id: "saving-for-goals-s1", name: "Match the account to the timeline", secs: 24, core: true, say: "Here is the key move. The Securities and Exchange Commission points to a trade-off between security and growth. Money you will need soon belongs somewhere safe and easy to reach, like a savings account, even though it earns a low rate. Money you will not touch for years can lean toward investing for more potential growth, accepting that it can rise and fall along the way. The closer the goal, the safer the home." },
      { id: "saving-for-goals-s2", name: "What a sinking fund is", secs: 22, core: true, say: "A sinking fund is a simple habit with a fancy name. Instead of being surprised by a known future cost, you set aside a little each month ahead of time. Picture car insurance due once a year, or holiday spending. Divide the total by the months you have, and save that small slice. When the bill lands, the money is already waiting, and it never becomes an emergency." },
      { id: "saving-for-goals-s3", name: "Keep goals out of the emergency fund", secs: 20, core: true, say: "One guardrail makes all of this hold together. The Consumer Financial Protection Bureau describes an emergency fund as cash set aside specifically for unplanned expenses. Keep your goal savings separate from that fund. If they share one pot, a surprise bill can quietly drain the vacation money, or a tempting goal can leave you bare when a true emergency hits. Two buckets, two jobs." },
      { id: "saving-for-goals-s4", name: "Where safe money is safe", secs: 20, core: false, say: "When the goal is near, safety matters more than yield. Money in an F D I C insured bank account is protected if the bank fails, up to two hundred fifty thousand dollars per depositor, per insured bank, for each ownership category. One honest limit: that covers deposits like checking, savings, and certificates of deposit. It does not cover stocks, bonds, mutual funds, or crypto, so investments held for short-term goals carry the market's ups and downs." },
      { id: "saving-for-goals-s5", name: "The honest trade-off", secs: 18, core: false, say: "There is a real tension worth naming. Play it safe with everything, and over many years inflation can chip away at what your cash buys. Reach for growth with money you need soon, and a downturn could arrive right when you must spend. Neither is free. Matching the timeline to the risk is simply choosing which trade-off fits the goal in front of you." },
      { id: "saving-for-goals-s6", name: "Your takeaway", secs: 14, core: true, say: "So: name the goal and its date, keep near-term money safe and reachable, let far-off money grow, fund the known costs a little at a time, and never let goals and emergencies share one pot. Steady and on purpose wins here." }
    ],
  },
  "roth-vs-traditional-deep": {
    id: "roth-vs-traditional-deep", title: "Roth vs traditional, deeper", topic: "retirement",
    blurb: "Tax-now versus tax-later, who can contribute, the five-year rule, and conversions at a glance.",
    takeaways: [ "The core choice is when you pay tax: now with a Roth, or later with a traditional account.", "A Roth withdrawal is tax-free only if you are at least fifty-nine and a half and the account is five years old.", "High earners can be phased out of contributing directly to a Roth IRA.", "Neither is automatically better; it depends on your tax picture now versus later, which no one can know for sure." ],
    yearLabel: "2026 IRA limits and income ranges, per IRS Notice 2025-67 (announced November 2025)",
    sources: [
      { org: "IRS", title: "Traditional and Roth IRAs", url: "https://www.irs.gov/retirement-plans/traditional-and-roth-iras", year: "" },
      { org: "IRS", title: "Roth IRAs", url: "https://www.irs.gov/retirement-plans/roth-iras", year: "" },
      { org: "IRS", title: "Publication 590-B, Distributions from IRAs (qualified distributions and the 5-year period)", url: "https://www.irs.gov/publications/p590b", year: "" },
      { org: "IRS", title: "401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500", url: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500", year: "2026" }
    ],
    segments: [
      { id: "roth-vs-traditional-deep-s0", name: "Tax now or tax later", secs: 22, core: true, say: "The whole Roth versus traditional question comes down to one thing: when do you pay tax? With a traditional account, you may take a deduction now and pay tax later, when you withdraw in retirement. With a Roth, you pay tax now, on the way in, and qualified withdrawals later come out tax-free. The I R S puts it plainly: traditional contributions you can deduct if you qualify, while Roth contributions are not deductible." },
      { id: "roth-vs-traditional-deep-s1", name: "The honest catch in each", secs: 22, core: true, say: "Here is the trade-off on each side. The traditional deduction feels good today, but every dollar you pull out later, including the growth, is taxed as ordinary income, and a tax rate you cannot predict. The Roth gives up the break now, so it costs you more this year. You are really making a bet on whether your tax rate will be higher today or in the future, and nobody knows that for certain." },
      { id: "roth-vs-traditional-deep-s2", name: "The five-year rule", secs: 24, core: true, say: "A Roth has a rule that surprises people. For the earnings to come out tax-free, the I R S says the withdrawal must be a qualified distribution: made after a five-year period that starts with your first contribution, and made after you reach fifty-nine and a half, or for death, disability, or a first home. Miss either test and the growth can be taxed, and sometimes penalized. Your own contributions are a different story, but do not assume the earnings are free until both boxes are checked." },
      { id: "roth-vs-traditional-deep-s3", name: "Who can contribute", secs: 24, core: true, say: "Not everyone can put money straight into a Roth I R A. Your contribution can be limited or blocked based on your income and filing status. For twenty twenty-six, the I R S phases out Roth contributions between one hundred fifty-three thousand and one hundred sixty-eight thousand dollars for single filers, and between two hundred forty-two thousand and two hundred fifty-two thousand for married couples filing jointly. A traditional I R A has no income cap on contributing, though whether you can deduct it may be limited if a workplace plan covers you." },
      { id: "roth-vs-traditional-deep-s4", name: "Conversions at a glance", secs: 20, core: false, say: "There is a side door called a conversion: moving money from a traditional account into a Roth. The honest part is that you pay income tax on the converted amount in the year you do it, which can be a real bill. And converted dollars carry their own five-year clock before they can come out penalty-free. Conversions can make sense, but the timing and the tax hit are genuinely complicated, so this is a spot to get personalized help." },
      { id: "roth-vs-traditional-deep-s5", name: "The 2026 limits", secs: 20, core: false, say: "A quick number to anchor on. For twenty twenty-six, the I R S sets the total you can put across your I R As at seven thousand five hundred dollars, with an extra eleven hundred dollar catch-up if you are fifty or older. That cap is shared between traditional and Roth combined, not each. These figures change most years with inflation, so always confirm the current number before you rely on it." },
      { id: "roth-vs-traditional-deep-s6", name: "Your takeaway", secs: 14, core: true, say: "So: tax now with a Roth, tax later with a traditional. Mind the income limits, respect the five-year rule before counting on tax-free growth, and treat conversions as a careful, taxable decision. The right answer is the one that fits your own tax story." }
    ],
  },
  "hsa-and-fsa": {
    id: "hsa-and-fsa", title: "HSAs and FSAs", topic: "budgeting",
    blurb: "Health savings accounts, the triple tax advantage, who is eligible, and how an FSA differs.",
    takeaways: [ "An HSA can be deductible going in, tax-free as it grows, and tax-free coming out for qualified medical costs.", "You can only contribute to an HSA while you are covered by a qualifying high-deductible health plan.", "An FSA is set up by an employer and is largely use-it-or-lose-it each year.", "Being in a general health FSA generally blocks you from contributing to an HSA." ],
    yearLabel: "2026 HSA limits per IRS Revenue Procedure 2025-19",
    sources: [
      { org: "IRS", title: "Publication 969, Health Savings Accounts and Other Tax-Favored Health Plans", url: "https://www.irs.gov/publications/p969", year: "" },
      { org: "IRS", title: "Revenue Procedure 2025-19 (2026 HSA and HDHP inflation-adjusted amounts)", url: "https://www.irs.gov/pub/irs-drop/rp-25-19.pdf", year: "2026" }
    ],
    segments: [
      { id: "hsa-and-fsa-s0", name: "What an HSA is", secs: 18, core: true, say: "A health savings account, or H S A, is a personal account for medical costs that comes with an unusual tax deal. It is yours to keep, it follows you from job to job, and any money you do not spend simply rolls over and stays invested. Think of it as a savings account built specifically for health expenses." },
      { id: "hsa-and-fsa-s1", name: "The triple tax advantage", secs: 24, core: true, say: "People call the H S A a triple tax advantage, and the I R S backs up all three parts. One: you can deduct your contributions even if you do not itemize. Two: the interest and earnings in the account are tax-free as they grow. Three: distributions are tax-free when you pay qualified medical expenses. Few accounts get a tax break on the way in, while growing, and on the way out, all at once." },
      { id: "hsa-and-fsa-s2", name: "The eligibility catch", secs: 22, core: true, say: "Here is the honest catch. You can only put money into an H S A while you are covered by a high-deductible health plan, which the I R S defines each year. A high deductible means you pay more out of your own pocket before insurance kicks in, so it does not suit everyone, especially anyone who expects heavy medical bills. The triple tax break is real, but it is tied to a plan that carries real out-of-pocket risk." },
      { id: "hsa-and-fsa-s3", name: "How an FSA differs", secs: 24, core: true, say: "A flexible spending arrangement, or F S A, sounds similar but works differently. The I R S notes that health F S As are employer-established benefit plans, so you cannot open one on your own, and the self-employed cannot use them. The biggest difference is use-it-or-lose-it: F S A money generally must be spent within the plan year, with at most a small carryover or short grace period if your plan allows it. An H S A, by contrast, simply rolls over." },
      { id: "hsa-and-fsa-s4", name: "They usually do not mix", secs: 18, core: false, say: "One trap worth knowing. The I R S says that if you are covered by a general-purpose health F S A, you generally cannot make H S A contributions at the same time. There are narrow exceptions, like a limited-purpose F S A for dental and vision, but the default is that a regular F S A blocks the H S A. So check before you sign up for both." },
      { id: "hsa-and-fsa-s5", name: "The 2026 numbers", secs: 20, core: false, say: "For some anchor figures, the I R S set the twenty twenty-six H S A contribution limits at four thousand four hundred dollars for self-only coverage and eight thousand seven hundred fifty dollars for family coverage, with an extra thousand dollars if you are fifty-five or older. F S A limits are set separately and are typically lower. All of these amounts change most years, so confirm the current number before you plan around it." },
      { id: "hsa-and-fsa-s6", name: "Your takeaway", secs: 14, core: true, say: "So: an H S A offers a rare triple tax break, but only with a high-deductible plan that shifts cost onto you. An F S A is employer-run and mostly use-it-or-lose-it, and the two usually do not stack. Match the account to your real health picture, not just the tax perk." }
    ],
  },
  "first-home-and-mortgage": {
    id: "first-home-and-mortgage", title: "Buying a first home", topic: "property",
    blurb: "Down payment, PMI, fixed versus adjustable rates, closing costs, and what to watch.",
    takeaways: [ "A bigger down payment lowers your loan and can avoid PMI, but it ties up cash you may need elsewhere.", "PMI protects the lender, not you, and can be removed as you build equity.", "A fixed rate stays steady; an adjustable rate can rise after its intro period.", "Closing costs are real money on top of the down payment, and the Loan Estimate limits how much they can change." ],
    yearLabel: "",
    sources: [
      { org: "CFPB", title: "What is private mortgage insurance?", url: "https://www.consumerfinance.gov/ask-cfpb/what-is-private-mortgage-insurance-en-122/", year: "" },
      { org: "CFPB", title: "When can I remove private mortgage insurance (PMI) from my loan?", url: "https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/", year: "" },
      { org: "CFPB", title: "Can my final mortgage costs increase from what was on my Loan Estimate?", url: "https://www.consumerfinance.gov/ask-cfpb/can-my-final-mortgage-costs-increase-from-what-was-on-my-loan-estimate-en-172/", year: "" }
    ],
    segments: [
      { id: "first-home-and-mortgage-s0", name: "The down payment", secs: 22, core: true, say: "Your down payment is the slice of the price you pay up front, with a mortgage covering the rest. A bigger down payment means a smaller loan, a lower monthly payment, and often a better rate. The honest trade-off is that the cash is gone into the house: pour in too much and you can leave yourself short for emergencies, repairs, and the cost of actually moving in. Bigger is not always better." },
      { id: "first-home-and-mortgage-s1", name: "What PMI really is", secs: 24, core: true, say: "If you put down less than twenty percent on a conventional loan, the lender will usually require private mortgage insurance, or P M I. The Consumer Financial Protection Bureau is blunt about who it helps: P M I protects the lender, not you, if you stop making payments. It is most often a monthly premium added on top of your mortgage payment. So it is a real cost that buys you no protection of your own." },
      { id: "first-home-and-mortgage-s2", name: "Getting PMI off", secs: 22, core: false, say: "The good news is P M I is not forever. The C F P B says you have the right to ask your servicer to cancel it once your balance is scheduled to reach eighty percent of the home's original value, and the servicer must automatically end it at seventy-eight percent, as long as you are current on payments. Until then, treat P M I as a monthly cost worth working to remove as you build equity." },
      { id: "first-home-and-mortgage-s3", name: "Fixed versus adjustable", secs: 24, core: true, say: "Mortgage rates come in two basic flavors. A fixed rate stays the same for the life of the loan, so your principal and interest payment never changes, which makes budgeting easy. An adjustable rate, or A R M, usually starts lower, but after an intro period it can move with an index, and your payment can rise, sometimes sharply. The lower starting rate is the reward; the risk is that you cannot be sure what you will owe in a few years." },
      { id: "first-home-and-mortgage-s4", name: "Closing costs", secs: 24, core: true, say: "Beyond the down payment, you owe closing costs: fees for the loan, the appraisal, title work, taxes, and more, often a meaningful sum. Your lender must give you a Loan Estimate up front, and the C F P B explains it has teeth: some costs cannot increase at all, some can rise by no more than ten percent in total, and only certain costs can change freely. If a capped cost jumps without a valid change in circumstance, you may be owed a refund." },
      { id: "first-home-and-mortgage-s5", name: "What to watch", secs: 20, core: false, say: "A few honest warnings before you sign. A home is not a liquid asset; you cannot sell it overnight if money gets tight, and values can fall as well as rise. The monthly payment is more than principal and interest: property taxes, insurance, and upkeep add up and tend to climb over time. Stretch to the very top of what a lender will approve, and a job loss or repair can turn a dream into a strain." },
      { id: "first-home-and-mortgage-s6", name: "Your takeaway", secs: 14, core: true, say: "So: size the down payment without draining your cushion, know that P M I protects the lender and can be removed, weigh a steady fixed rate against a riskier adjustable one, and read the Loan Estimate closely. Buy the home you can comfortably carry, not the biggest one you can borrow for." }
    ],
  },
};

// Curriculum order for the duration-scaled study session.
const CURRICULUM = ['budgeting', 'compound-growth', 'risk-diversification', 'retirement-accounts', 'property-basics', "credit-score-basics", "paying-down-debt", "banking-and-apy", "emergency-fund-deeper", "credit-card-traps", "spotting-money-scams", "index-funds-and-etfs", "dollar-cost-averaging", "investment-fees", "stocks-and-bonds", "inflation-and-rates", "saving-for-goals", "roth-vs-traditional-deep", "hsa-and-fsa", "first-home-and-mortgage"];

// Catalog cards for the hub, ordered welcome-first then curriculum.
export const LESSON_LIBRARY = CURRICULUM
  .filter((id) => LESSONS[id])
  .map((id) => {
    const L = LESSONS[id];
    const segs = [DISCLAIMER_SEG, ...L.segments];
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
    takeawayGroups: meta.takeawayGroups || [],
    sources: meta.sources,
    title: meta.title,
  };
}

// A specific catalog lesson by id, at its natural length. Topic lessons open
// with the spoken disclaimer so it is heard every time (the welcome already
// carries its own).
export function buildLessonById(id) {
  const L = LESSONS[id];
  // welcome is the intro used only inside buildLessonSession; it is not a
  // standalone, completable lesson (no content/sources to "complete"), so
  // #fin-lib-welcome-money resolves to null and the route falls back to the hub.
  if (!L || id === 'welcome-money') return null;
  const segs = [DISCLAIMER_SEG, ...L.segments];
  return planFromSegments(segs, {
    durationKey: Math.max(1, Math.round(lessonSecs(segs) / 60)),
    lessonIds: [id],
    lessonTitles: [L.title],
    takeawayGroups: (L.takeaways && L.takeaways.length) ? [{ title: L.title, points: L.takeaways }] : [],
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
  const takeawayGroups = [];
  let sources = [];
  let used = 0;

  const add = (id, chosen) => {
    segs.push(...chosen);
    used += chosen.reduce((t, s) => t + segDur(s), 0);
    if (id !== 'welcome-money') {
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
    // depth did not fit — try this topic's core only before giving up on it
    const coreCost = core.reduce((t, s) => t + segDur(s), 0);
    if (used + coreCost <= budget) { add(id, core); }
    // else skip this topic; a later, shorter one may still fit
  }

  return planFromSegments(segs, {
    durationKey: durationMins,
    lessonIds,
    lessonTitles,
    takeawayGroups,
    sources: dedupeSources(sources),
    title: 'Money basics',
  });
}
