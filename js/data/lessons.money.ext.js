// Extension lessons for the money track (S8b). Merged into the base module at load.
// Authored + fact-checked separately; each segment carries its own simpler/deeper variants.
export const EXTRA_LESSONS_MONEY = {
  "understanding-income-tax": {
    "id": "understanding-income-tax",
    "title": "How Income Tax Works",
    "topic": "understanding-income-tax",
    "blurb": "A gentle, plain-language walk through how United States federal income tax is built, so the numbers on your return feel a little less mysterious.",
    "takeaways": [
      "Federal income tax uses progressive brackets, and a higher rate applies only to the portion of income that falls inside that bracket, not to all of your income.",
      "Your marginal rate is the rate on your next dollar, while your effective rate is the total tax you pay divided by your total income, and the effective rate is usually lower.",
      "You generally subtract either the standard deduction or your itemized deductions, whichever lowers your tax more, and you cannot use both.",
      "Federal income tax is pay-as-you-go through paycheck withholding, so a refund means you overpaid during the year and a bill means you underpaid.",
      "Adjusting your Form W-4 changes how much is withheld, and the free IRS Tax Withholding Estimator can help you check whether it is on track."
    ],
    "yearLabel": "",
    "sources": [
      {
        "org": "Internal Revenue Service",
        "title": "Federal income tax rates and brackets",
        "url": "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets",
        "year": ""
      },
      {
        "org": "Internal Revenue Service",
        "title": "Tax basics: Understanding the difference between standard and itemized deductions",
        "url": "https://www.irs.gov/newsroom/tax-basics-understanding-the-difference-between-standard-and-itemized-deductions",
        "year": ""
      },
      {
        "org": "Internal Revenue Service",
        "title": "Tax withholding: How to get it right",
        "url": "https://www.irs.gov/newsroom/tax-withholding-how-to-get-it-right",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Guide to filing your taxes in 2026",
        "url": "https://www.consumerfinance.gov/consumer-tools/guide-to-filing-your-taxes/",
        "year": "2026"
      }
    ],
    "segments": [
      {
        "id": "understanding-income-tax-s0",
        "name": "Welcome",
        "secs": 16,
        "core": true,
        "say": "Taxes can feel a little intimidating, so let us take this slowly and kindly. In this lesson we will look at how United States federal income tax actually works, step by step. We will cover what gets taxed, how the brackets work, the deduction that lowers your bill, and why some people get a refund while others owe. The goal is simply to make the numbers feel less mysterious.",
        "simpler": "Taxes can feel scary, so we will go slow. This lesson explains how federal income tax in the United States works, one piece at a time, so the numbers make more sense.",
        "deeper": "This lesson introduces the architecture of the United States federal individual income tax. We will move from the income base, through the bracketed rate structure and the principal deduction mechanisms, to the annual reconciliation between amounts withheld and the final liability. The aim is conceptual fluency rather than computation."
      },
      {
        "id": "understanding-income-tax-s1",
        "name": "Gross vs. taxable income",
        "secs": 18,
        "core": true,
        "say": "Not every dollar you earn is taxed. You start with your gross income, which is roughly everything you took in. Then you subtract certain amounts, such as a deduction, to arrive at your taxable income. It is this smaller, taxable income, not your full earnings, that the tax brackets are actually applied to. So the first kind thing to know is that the number being taxed is usually less than what you made.",
        "simpler": "You do not pay tax on every dollar you earn. You begin with everything you made, subtract some amounts like a deduction, and what is left is your taxable income. The tax is figured on that smaller number.",
        "deeper": "Gross income encompasses income from most sources. From it, taxpayers subtract certain adjustments and a deduction to derive taxable income, the figure to which the statutory rate schedule is applied. Distinguishing gross income from taxable income clarifies why the base for the rate schedule is typically smaller than total earnings."
      },
      {
        "id": "understanding-income-tax-s2",
        "name": "How brackets work",
        "secs": 20,
        "core": true,
        "say": "Federal income tax is progressive, which means it is charged in layers called brackets. Each bracket has its own rate, and the rates rise as income rises. Here is the part many people misunderstand. When your income reaches a higher bracket, you do not pay that higher rate on everything. According to the Internal Revenue Service, you pay the higher rate only on the part of your income that falls inside that new bracket. The income below it is still taxed at the lower rates.",
        "simpler": "The tax is split into layers called brackets, and each layer has a rate that goes up as you earn more. Moving into a higher bracket does not raise the rate on all your money. The higher rate only hits the part of your income inside that new layer.",
        "deeper": "The federal schedule is marginal and progressive: income is partitioned into successive bands, each taxed at its own rate. A common misconception is that crossing a bracket threshold reprices all income. In fact, as the Internal Revenue Service explains, the higher rate applies only to the increment of income within the new bracket, while earlier dollars remain taxed at their respective lower rates."
      },
      {
        "id": "understanding-income-tax-s3",
        "name": "Marginal vs. effective rate",
        "secs": 20,
        "core": true,
        "say": "Because of those layers, two different rates describe your taxes. Your marginal rate is the rate on your next dollar earned, that is, the top bracket your income reaches. Your effective rate is the total tax you pay divided by your total income. Since the lower brackets pull the overall figure down, your effective rate is usually noticeably lower than your marginal rate. So if someone says they are in the twenty-two percent bracket, they are not paying twenty-two percent of everything.",
        "simpler": "There are two rates worth knowing. The marginal rate is what your next dollar is taxed at, your top bracket. The effective rate is your total tax divided by your total income, and it is usually lower. Being in the twenty-two percent bracket does not mean twenty-two percent of all your money.",
        "deeper": "Two summary statistics arise from the bracketed structure. The marginal rate is the rate applied to the final dollar of taxable income, equivalently the rate of the highest bracket reached. The effective, or average, rate is total tax liability divided by total income. Because lower-bracket income dilutes the average, the effective rate is generally below the marginal rate, which is why a stated bracket overstates the share of income actually paid."
      },
      {
        "id": "understanding-income-tax-s4",
        "name": "The standard deduction",
        "secs": 18,
        "core": true,
        "say": "The most common way to lower your taxable income is the standard deduction. It is a flat amount you subtract, set by the Internal Revenue Service based on your filing status, with extra amounts in some situations, such as being sixty-five or older. The amount is adjusted a little each year. Most taxpayers simply take the standard deduction because it is straightforward and, for them, it lowers their tax the most.",
        "simpler": "The easiest way to shrink your taxable income is the standard deduction. It is a set amount you subtract, based on your filing status, and it changes a bit each year. Most people just take it because it is simple and gives them the lowest tax.",
        "deeper": "The standard deduction is a fixed statutory subtraction calibrated to filing status, with additional amounts for circumstances such as age sixty-five or older or blindness, and it is indexed annually. The Internal Revenue Service notes that most taxpayers claim it, both for administrative simplicity and because, for the majority, it yields the lower overall tax relative to itemizing."
      },
      {
        "id": "understanding-income-tax-s5",
        "name": "Itemizing instead",
        "secs": 19,
        "core": false,
        "say": "The alternative is to itemize. Itemizing means adding up specific qualifying expenses, such as mortgage interest, state and local taxes, charitable gifts, and large medical costs. The Internal Revenue Service is clear that you choose one path or the other, not both. The general rule is to take whichever is larger, since most people use the option that gives them the lowest overall tax. Itemizing tends to help when those particular expenses add up to more than the standard deduction.",
        "simpler": "Instead of the standard deduction, you can itemize, which means adding up certain costs like mortgage interest, charitable gifts, and big medical bills. You pick one method, not both. The idea is to use whichever is bigger so your tax ends up lower.",
        "deeper": "Itemizing aggregates qualifying expenditures reported on Schedule A, including state and local taxes, deductible mortgage interest, charitable contributions, and qualifying medical expenses. The standard deduction and itemizing are mutually exclusive. Rational filers select the larger of the two, since, as the Internal Revenue Service frames it, taxpayers generally use whichever option produces the lowest overall tax; itemizing prevails only when eligible expenses exceed the standard deduction."
      },
      {
        "id": "understanding-income-tax-s6",
        "name": "Withholding through the year",
        "secs": 20,
        "core": true,
        "say": "Federal income tax is pay-as-you-go, which means you pay it gradually as you earn, not all at once in spring. For most workers this happens through withholding, where your employer takes a portion of each paycheck and sends it to the Internal Revenue Service on your behalf. How much they withhold is guided by the Form W-4 you filled out. So all year long, you are quietly prepaying your tax in small pieces.",
        "simpler": "You do not pay all your tax at once. It is pay-as-you-go, so your employer takes a slice of each paycheck and sends it to the Internal Revenue Service for you. The Form W-4 you filled out tells them how much to take.",
        "deeper": "The federal income tax operates on a pay-as-you-go basis: liability is settled incrementally as income is earned. For wage earners this is implemented through withholding, in which the employer remits a portion of each paycheck to the Internal Revenue Service. The withholding rate is parameterized by the employee's Form W-4, effectively distributing the annual liability across pay periods as prepayment."
      },
      {
        "id": "understanding-income-tax-s7",
        "name": "Refund or bill",
        "secs": 20,
        "core": false,
        "say": "When you file, you reconcile what you actually owe against what was already withheld. If you withheld more than your final tax, the difference comes back as a refund, which the Consumer Financial Protection Bureau describes as getting your over-withholding back. If you withheld too little, you owe the balance, and very large shortfalls can even bring a penalty. A refund is not free money. It is simply your own overpayment being returned.",
        "simpler": "At filing time, you compare your real tax to what was already taken from your paychecks. Paid too much, and you get a refund. Paid too little, and you owe the rest. A refund is just your own extra money coming back, not a bonus.",
        "deeper": "Filing reconciles the computed annual liability against cumulative withholding and any estimated payments. An excess of payments over liability is refunded; the Consumer Financial Protection Bureau characterizes this as recovering over-withholding. A deficit produces a balance due, and substantial underpayment may trigger penalties. Framed correctly, a refund is the return of an interest-free overpayment rather than a gain."
      },
      {
        "id": "understanding-income-tax-s8",
        "name": "Gentle close",
        "secs": 16,
        "core": false,
        "say": "So, in short, you are taxed on your taxable income, through rising brackets where only the top slice meets the top rate, after a deduction, with the bill settled gradually through withholding. If your refund or balance surprises you, you can adjust your Form W-4, and the Internal Revenue Service offers a free withholding estimator. Please remember this is general educational information, not financial advice. For your own decisions, it is wise to speak with a licensed tax professional.",
        "simpler": "In short, tax is figured on your taxable income, brackets only charge the top rate on the top slice, a deduction lowers things, and you prepay through withholding. You can change your Form W-4 anytime. This is general education, not financial advice, so for your own situation, talk with a licensed tax professional.",
        "deeper": "To summarize: liability is assessed on taxable income via a marginal bracket schedule, reduced by a deduction, and prepaid through withholding, then reconciled at filing. Withholding is adjustable through the Form W-4, and the Internal Revenue Service provides a free withholding estimator. This material is general educational information, not financial advice; consult a licensed tax professional for personal decisions."
      }
    ]
  },
  "reading-your-paycheck": {
    "id": "reading-your-paycheck",
    "title": "Reading Your Paycheck",
    "topic": "reading-your-paycheck",
    "blurb": "A gentle walk through what each line on your paycheck means, so the gap between what you earn and what you take home stops feeling like a mystery.",
    "takeaways": [
      "Gross pay is what you earn before anything is taken out; net pay is the take-home amount after deductions.",
      "Federal income tax is withheld from each paycheck based on the Form W-4 you give your employer, and your employer sends it to the IRS in your name.",
      "FICA funds Social Security and Medicare: employees pay six point two percent for Social Security and one point four five percent for Medicare, for a combined seven point six five percent.",
      "Many states also withhold state income tax, though the rules vary widely from state to state.",
      "Pre-tax deductions, such as some retirement or health contributions, come out before income tax is figured, which can lower the income that is taxed."
    ],
    "yearLabel": "2026",
    "sources": [
      {
        "org": "Internal Revenue Service",
        "title": "Topic no. 751, Social Security and Medicare withholding rates",
        "url": "https://www.irs.gov/taxtopics/tc751",
        "year": "2026"
      },
      {
        "org": "Internal Revenue Service",
        "title": "What people new to the workforce need to know about income tax withholding",
        "url": "https://www.irs.gov/newsroom/what-people-new-to-the-workforce-need-to-know-about-income-tax-withholding",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Examining elements of a paycheck",
        "url": "https://www.consumerfinance.gov/consumer-tools/educator-tools/youth-financial-education/teach/activities/examining-elements-paycheck/",
        "year": ""
      }
    ],
    "segments": [
      {
        "id": "reading-your-paycheck-s0",
        "name": "Welcome",
        "secs": 16,
        "core": true,
        "say": "Hello, and welcome. A paycheck can feel like a wall of numbers and abbreviations, and that is completely normal. Today we will read it together, slowly and kindly, so that by the end the lines feel familiar rather than confusing. There is nothing you need to fix right now. We are simply learning to see what is already there.",
        "simpler": "Hi there. Paychecks have a lot of confusing numbers and short codes on them. We are going to go through them slowly so they start to make sense. You do not have to change anything today. We are just learning to read it.",
        "deeper": "Welcome. A pay statement is essentially a structured ledger of one pay period: it records gross earnings, statutory and voluntary withholdings, and the resulting net disbursement. Our aim here is descriptive literacy, learning to interpret each field and the relationships between them, rather than optimization. Understanding the document is the foundation that any later decision rests on."
      },
      {
        "id": "reading-your-paycheck-s1",
        "name": "Gross pay and net pay",
        "secs": 18,
        "core": true,
        "say": "The first thing worth knowing is the difference between two numbers. Gross pay is what you earn before anything is taken out. Net pay, sometimes called take-home pay, is the amount you actually receive after deductions. The Consumer Financial Protection Bureau puts the big idea simply: the money you earn from your job is different from the money that lands in your pocket. The space between the two is where the rest of this lesson lives.",
        "simpler": "There are two main numbers. Gross pay is what you earn before anything is removed. Net pay, or take-home pay, is what is left after things are taken out. The Consumer Financial Protection Bureau says it plainly: what you earn and what you actually get are not the same. Everything else we cover explains the gap between them.",
        "deeper": "Two figures anchor the statement. Gross pay reflects total compensation for the period before any reductions. Net pay is the residual after all withholdings and deductions are applied, the amount actually disbursed to the worker. The Consumer Financial Protection Bureau frames this distinction as the central idea of paycheck literacy. The remaining segments itemize the categories that account for the difference between gross and net."
      },
      {
        "id": "reading-your-paycheck-s2",
        "name": "Federal income tax withholding",
        "secs": 20,
        "core": true,
        "say": "One of the largest deductions for many people is federal income tax. In the United States, income tax is pay-as-you-go, meaning it is collected gradually across the year rather than all at once. Your employer withholds an amount from each paycheck and sends it to the I R S in your name. How much they withhold is based on the information you give on a form called the W-4, and on how much you earn.",
        "simpler": "A big deduction for many people is federal income tax. In the United States you pay this little by little all year instead of in one lump. Your employer takes some out of each paycheck and sends it to the I R S for you. The amount depends on what you wrote on a form called the W-4 and on how much you earn.",
        "deeper": "Federal income tax is administered on a pay-as-you-go basis, so liability is satisfied incrementally through periodic withholding rather than a single annual remittance. The employer acts as a withholding agent, deducting an estimated amount each pay period and remitting it to the Internal Revenue Service on the employee's behalf. The withheld amount is computed from the elections on Form W-4 together with the employee's earnings, which is why the W-4 has such a direct effect on each paycheck."
      },
      {
        "id": "reading-your-paycheck-s3",
        "name": "FICA: Social Security and Medicare",
        "secs": 21,
        "core": true,
        "say": "Next you will often see FICA, or a line for Social Security and Medicare. These are payroll taxes set by law. For employees, the Social Security rate is six point two percent of wages, and the Medicare rate is one point four five percent, which together come to seven point six five percent. According to the I R S, for twenty twenty-six the Social Security portion applies up to a wage base of one hundred eighty-four thousand five hundred dollars, while Medicare has no wage cap.",
        "simpler": "You will often see FICA, or separate lines for Social Security and Medicare. These are payroll taxes required by law. For workers, Social Security takes six point two percent of pay and Medicare takes one point four five percent, which adds up to seven point six five percent. The I R S says that in twenty twenty-six, Social Security only applies up to one hundred eighty-four thousand five hundred dollars of wages, but Medicare has no upper limit.",
        "deeper": "FICA, the Federal Insurance Contributions Act tax, funds Social Security's old-age, survivors, and disability insurance and Medicare's hospital insurance. The statutory employee rates are six point two percent for Social Security and one point four five percent for Medicare, a combined seven point six five percent, and employers match these amounts. Per the Internal Revenue Service, the Social Security component is capped at a contribution and benefit base of one hundred eighty-four thousand five hundred dollars for twenty twenty-six, whereas Medicare applies to all covered wages without a ceiling."
      },
      {
        "id": "reading-your-paycheck-s4",
        "name": "Additional Medicare tax",
        "secs": 17,
        "core": false,
        "say": "There is one more Medicare detail worth a calm mention. The I R S notes that an Additional Medicare Tax of zero point nine percent applies to wages above two hundred thousand dollars in a calendar year, and employers withhold it on the amount over that threshold. For most people this line never appears, but it helps to know what it is if you ever see it.",
        "simpler": "There is one more Medicare note. The I R S says an extra Medicare tax of zero point nine percent applies to wages over two hundred thousand dollars in a year, and employers take it out on the amount above that line. Most people never see this, but it is good to recognize if it shows up.",
        "deeper": "Beyond the base rate, the Internal Revenue Service imposes an Additional Medicare Tax of zero point nine percent on wages exceeding two hundred thousand dollars within a calendar year. Employers are obligated to withhold this surtax on the excess above the two hundred thousand dollar threshold without regard to the employee's filing status, even though the employee's ultimate liability may differ once joint income is considered at filing. For most earners the line simply does not appear."
      },
      {
        "id": "reading-your-paycheck-s5",
        "name": "State and local withholding",
        "secs": 17,
        "core": false,
        "say": "Below the federal lines, many paychecks also show state income tax, and sometimes a local or city tax. The rules here vary a great deal. Some states tax income at a flat rate, some use brackets, and a handful do not have a state income tax at all. Because the details differ so much by location, it is worth checking the specific rules where you live rather than assuming.",
        "simpler": "Under the federal lines, many paychecks also show state income tax, and sometimes a city tax. These rules are very different from place to place. Some states use one flat rate, some use brackets, and a few have no state income tax. Because it varies so much, check the rules for where you actually live.",
        "deeper": "Subnational withholding adds another layer. State income tax regimes diverge considerably: some jurisdictions apply a flat statutory rate, others use graduated brackets, and several levy no state income tax whatsoever. Certain municipalities impose local income or wage taxes as well. Given this heterogeneity, the only reliable source for your figures is the rule set for your specific state and locality rather than a national generalization."
      },
      {
        "id": "reading-your-paycheck-s6",
        "name": "Pre-tax deductions",
        "secs": 19,
        "core": true,
        "say": "You may also see deductions that are not taxes at all, such as contributions to a retirement plan or a share of health insurance. Some of these are pre-tax, meaning they come out of your pay before income tax is calculated. Because pre-tax deductions reduce the earnings that get taxed, they can lower the income tax withheld, even though they also reduce your take-home pay. Seeing them as choices, rather than losses, can help.",
        "simpler": "Some deductions are not taxes, like money for a retirement plan or your part of health insurance. A few of these are pre-tax, which means they come out before income tax is figured. Since they lower the pay that gets taxed, they can shrink the income tax taken out, even though they also lower your take-home amount. It helps to see them as choices, not just losses.",
        "deeper": "Not every reduction is a tax. Contributions to certain retirement accounts and the employee share of some benefits, such as health premiums, may be classified as pre-tax deductions, subtracted from gross pay before income tax withholding is computed. Because they reduce taxable wages, they can lower the income tax withheld in the same period, while simultaneously reducing net pay. The framing matters: these are elective allocations of compensation rather than involuntary losses."
      },
      {
        "id": "reading-your-paycheck-s7",
        "name": "Putting it together",
        "secs": 18,
        "core": false,
        "say": "So here is the whole picture. Start with gross pay. Subtract federal income tax, FICA for Social Security and Medicare, any state or local tax, and any pre-tax deductions you have chosen. What remains is your net, or take-home, pay. Reading it in that order, one line at a time, turns a confusing stub into a story you can follow.",
        "simpler": "Here is the full picture. Start with gross pay. Take away federal income tax, FICA for Social Security and Medicare, any state or city tax, and any pre-tax deductions you picked. What is left is your net, or take-home, pay. Reading it in that order, line by line, turns a confusing stub into something you can follow.",
        "deeper": "The statement resolves into a simple sequence. Begin with gross earnings, then apply, in turn, federal income tax withholding, FICA contributions for Social Security and Medicare, applicable state and local taxes, and any elected pre-tax deductions. The remainder is net pay. Working through the document in this ordered fashion converts an opaque list of abbreviations into a transparent, reconcilable derivation of take-home pay."
      },
      {
        "id": "reading-your-paycheck-s8",
        "name": "A gentle close",
        "secs": 15,
        "core": false,
        "say": "Take a breath. You can now read the main lines of your paycheck, and that is a real and useful skill. Please remember that this is general educational information, not financial or tax advice. For decisions about your own situation, it is wise to talk with a licensed professional, such as a tax advisor or accountant, who can look at your full picture. Be kind to yourself as you learn.",
        "simpler": "Take a breath. You can now read the main lines of your paycheck, and that is a real skill. Please remember this is general learning, not financial or tax advice. For your own situation, it is smart to talk with a licensed professional, like a tax advisor or accountant, who can see your whole picture. Be gentle with yourself as you learn.",
        "deeper": "Take a moment to acknowledge the progress. You can now parse the principal components of a pay statement, a genuinely transferable competency. This material is general educational information and does not constitute financial or tax advice. For decisions specific to your circumstances, consulting a licensed professional, such as a tax advisor or certified accountant, who can evaluate your complete financial picture is the prudent path. Approach the learning with patience."
      }
    ]
  },
  "student-loans-basics": {
    "id": "student-loans-basics",
    "title": "Student Loans, Explained",
    "topic": "student-loans-basics",
    "blurb": "A calm, plain walk through how student loans work, so the words on your statements feel a little less mysterious.",
    "takeaways": [
      "Federal student loans tend to carry fixed rates and stronger borrower protections, while private loans vary by lender and may use variable rates.",
      "On a Direct Subsidized loan the government covers interest while you are enrolled and during the grace period; on an unsubsidized loan, interest accrues from disbursement.",
      "Federal loans offer income-driven repayment plans that can lower monthly payments based on income and household size, sometimes to a very low amount.",
      "A federal loan generally enters default after about nine months without payment, while many private loans default after roughly three missed payments.",
      "If repayment becomes hard, contacting your loan servicer early opens options; this lesson is educational only and not financial advice."
    ],
    "yearLabel": "",
    "sources": [
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "What are the main differences between federal student loans and private student loans?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-are-the-main-differences-between-federal-student-loans-and-private-student-loans-en-545",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Options for repaying your federal and private student loans",
        "url": "https://www.consumerfinance.gov/paying-for-college/repay-student-debt/federal-and-private-student-loans/",
        "year": ""
      },
      {
        "org": "Federal Student Aid (U.S. Department of Education)",
        "title": "Subsidized and Unsubsidized Loans",
        "url": "https://studentaid.gov/understand-aid/types/loans/subsidized-unsubsidized",
        "year": ""
      }
    ],
    "segments": [
      {
        "id": "student-loans-basics-s0",
        "name": "A gentle start",
        "secs": 16,
        "core": true,
        "say": "If you have a student loan, the paperwork can feel like a foreign language. Let us slow down together. In the next few minutes we will gently unpack the words on your statements: federal and private loans, subsidized and unsubsidized, how interest grows, and the choices you have for paying it back. Nothing here is a test, and nothing here is advice about your own money. It is simply a calmer map of the landscape.",
        "simpler": "Student loan papers can be confusing. We will go slowly and explain the common words, like federal versus private loans and how interest works. This is just a friendly overview, not advice about your personal situation.",
        "deeper": "Student lending sits at the intersection of federal policy and private credit markets, and the terminology reflects that split. Over the next several segments we will build a shared vocabulary: loan origin (federal versus private), interest treatment (subsidized versus unsubsidized), accrual mechanics, repayment architecture, and delinquency and default. Framing it as a map, rather than a directive, keeps the focus on understanding the structure rather than prescribing a course of action."
      },
      {
        "id": "student-loans-basics-s1",
        "name": "Federal versus private",
        "secs": 20,
        "core": true,
        "say": "The first big fork is where the loan comes from. Federal student loans are made through the United States Department of Education. Private loans come from banks, credit unions, or other lenders. According to the Consumer Financial Protection Bureau, federal loans usually carry fixed interest rates and offer flexible repayment and hardship protections, while private loans vary by lender and may use variable rates, meaning the payment can change over time. The terms on private loans are generally not as flexible as on federal loans.",
        "simpler": "Loans come from two main places. Federal loans come from the government and usually have a fixed rate and more ways to get help if money is tight. Private loans come from banks or other lenders, and their rates and rules change from lender to lender, sometimes with a rate that can go up.",
        "deeper": "The federal-versus-private distinction is the most consequential variable in the entire framework because it determines which statutory protections attach to the debt. Federal Direct Loans are originated under Title Four of the Higher Education Act and carry standardized fixed rates plus a defined menu of repayment, deferment, forbearance, and forgiveness mechanisms. Private education loans are governed by the individual lender's contract and applicable consumer-credit law; their rates may be fixed or variable, and their hardship terms are discretionary rather than guaranteed. The CFPB notes that private repayment terms are generally not as flexible as federal ones and vary by lender."
      },
      {
        "id": "student-loans-basics-s2",
        "name": "Subsidized versus unsubsidized",
        "secs": 20,
        "core": true,
        "say": "Within federal loans there is another important pair of words: subsidized and unsubsidized. A Direct Subsidized loan is offered to students who show financial need, and the federal government pays the interest while you are enrolled at least half time and during the grace period after you leave school. A Direct Unsubsidized loan is not based on need, and the borrower is responsible for the interest from the moment the loan is paid out. That single difference can quietly change how much you owe later.",
        "simpler": "Federal loans come in two flavors. A subsidized loan is for students who show they need help with money, and the government pays the interest while you are in school and for a short grace period after. An unsubsidized loan is open to more students, but you owe the interest from the start. That gap can add up over time.",
        "deeper": "Subsidized and unsubsidized status governs who bears the interest cost during in-school, grace, and certain deferment periods. For Direct Subsidized Loans, awarded on demonstrated financial need, the Department of Education pays accruing interest while the borrower is enrolled at least half time and through the post-enrollment grace period. Direct Unsubsidized Loans are not need-based, and interest accrues to the borrower from disbursement. The practical consequence is the timing of when interest begins to compound against the borrower, which Federal Student Aid identifies as the central distinction between the two."
      },
      {
        "id": "student-loans-basics-s3",
        "name": "How interest grows",
        "secs": 19,
        "core": false,
        "say": "Interest is the cost of borrowing, and it is helpful to understand how it grows. On an unsubsidized loan, interest begins accruing as soon as the money is disbursed, even while you are still in school. If that unpaid interest is added to your balance, a process often called capitalization, future interest is then calculated on the larger amount. This is why two people who borrowed the same sum can end up owing different totals, depending on when interest started and whether it was paid along the way.",
        "simpler": "Interest is what you pay for borrowing. On an unsubsidized loan it starts adding up right away, even in school. If that unpaid interest gets rolled into your balance, you then pay interest on a bigger number. So when interest starts, and whether you chip away at it, really matters.",
        "deeper": "Interest accrual is a function of the principal balance, the rate, and time. On unsubsidized debt, accrual begins at disbursement regardless of enrollment status. Capitalization is the event in which accrued, unpaid interest is added to principal, expanding the base on which subsequent interest is computed. Because capitalization typically occurs at defined milestones, the borrower who services interest during deferral periods preserves a smaller principal base than one who allows it to capitalize, even at an identical rate. Federal Student Aid emphasizes that on subsidized loans the government covers in-school interest, sparing the borrower this early accrual."
      },
      {
        "id": "student-loans-basics-s4",
        "name": "Repayment plan choices",
        "secs": 20,
        "core": true,
        "say": "When repayment begins, federal loans offer more than one path. There is a standard plan with steady payments, and there are income-driven repayment plans that base your monthly payment on your income and household size. The Consumer Financial Protection Bureau notes that an income-driven plan can reduce a monthly payment to as low as zero dollars in some situations, and that some of these plans can lead to forgiveness of a remaining balance after many years of qualifying payments. Private loans set their own terms and rarely offer this same flexibility.",
        "simpler": "Once you start paying back federal loans, you have choices. One option is steady, even payments. Another ties your payment to how much you earn and your family size, which can make payments much smaller, sometimes even zero. After many years on those plans, a leftover balance may be forgiven. Private loans usually do not offer this.",
        "deeper": "Federal repayment architecture spans a standard amortized schedule and a family of income-driven repayment plans that compute the monthly obligation from discretionary income and household size rather than from the balance alone. The CFPB indicates these plans can lower payments to as little as zero dollars and that certain plans extend forgiveness of remaining balances after a defined term of qualifying payments. Selecting among them involves trade-offs between monthly cash flow and total interest paid over time, which is why the Department of Education provides a Loan Simulator to model outcomes. Private loans generally lack equivalent income-sensitive structures."
      },
      {
        "id": "student-loans-basics-s5",
        "name": "Delinquency and default",
        "secs": 20,
        "core": true,
        "say": "Two words often cause worry: delinquency and default. A loan becomes delinquent the day after a missed payment. Default is more serious and happens later. The Consumer Financial Protection Bureau explains that it takes about nine months of no payment for most federal loans to go into default, while many private loans can default after only about three missed monthly payments. Default on a federal loan can lead to consequences such as garnishment of wages, your federal tax refund, or even part of Social Security. The kindest first step is rarely silence.",
        "simpler": "Delinquency means you missed a payment. Default is the bigger problem that comes later. For most federal loans, default happens after about nine months of no payments; many private loans default after about three missed payments. With federal loans, default can mean money taken from your paycheck, tax refund, or Social Security. Reaching out early helps more than staying quiet.",
        "deeper": "Delinquency commences the day after a scheduled payment is missed; default is a distinct, later legal status. The CFPB places the federal default threshold at roughly nine months of non-payment, whereas many private loans treat approximately three missed payments as default, reflecting contractual rather than statutory timelines. Federal default activates administrative collection powers, including wage garnishment and offset of federal tax refunds and certain Social Security benefits. Private lenders may pursue litigation but cannot intercept a tax refund. The asymmetry underscores why early contact with the servicer, before default crystallizes, generally preserves the widest set of options."
      },
      {
        "id": "student-loans-basics-s6",
        "name": "Ways back from default",
        "secs": 19,
        "core": false,
        "say": "If a federal loan does reach default, it is not the end of the road. The Consumer Financial Protection Bureau describes two main paths back: rehabilitation and consolidation. Rehabilitation tends to be better for your credit history, while consolidation is usually faster. For a private loan, the route is less standardized, and you would ask your lender or servicer directly about options, which might include setting up a payment plan. In every case, talking with the servicer is how the doors reopen.",
        "simpler": "Defaulting on a federal loan is not permanent. There are two main ways back: rehabilitation, which is gentler on your credit, and consolidation, which is faster. For private loans, you ask the lender what they offer, like a payment plan. Either way, talking to whoever handles your loan is the key.",
        "deeper": "Federal default resolution offers two principal mechanisms. Loan rehabilitation involves a series of agreed, reasonable payments and tends to be more favorable to credit history once completed. Consolidation combines eligible loans into a new Direct Consolidation Loan and is generally the faster route out of default. The CFPB frames these as the two standard federal pathways. Private loans lack a uniform statutory cure; resolution depends on negotiation with the lender or servicer, potentially including a structured payment plan. Across both categories, servicer engagement is the procedural gateway to any remedy."
      },
      {
        "id": "student-loans-basics-s7",
        "name": "A calm close",
        "secs": 16,
        "core": false,
        "say": "Take a breath. You now have a clearer map: where loans come from, what subsidized and unsubsidized mean, how interest grows, the repayment paths available, and how default works and how to step back from it. Please remember that this is general educational information, not financial advice. For decisions about your own loans, it is wise to talk with your loan servicer or a licensed professional who can look at your full situation. You have done something kind for yourself by learning this.",
        "simpler": "Nice work. You now understand the basics: where loans come from, what the main words mean, how interest grows, your repayment choices, and how default works. Remember, this is general information, not advice for your own money. For your personal decisions, talk to your loan servicer or a licensed professional. Learning this was a good thing to do for yourself.",
        "deeper": "To consolidate: we have traced loan origin, interest treatment, accrual and capitalization mechanics, the federal repayment menu including income-driven plans, and the delinquency-to-default continuum with its cure pathways. This material is educational in nature and does not constitute financial advice; individual circumstances determine the optimal strategy. A loan servicer or a licensed financial professional can evaluate the borrower's complete situation, including tax posture and long-term goals, before any binding decision is made. Building this conceptual scaffolding is a constructive first step toward informed engagement."
      }
    ]
  },
  "auto-loans-and-financing": {
    "id": "auto-loans-and-financing",
    "title": "Financing a Car Wisely",
    "topic": "auto-loans-and-financing",
    "blurb": "A gentle, plain-language walk through how car loans really work, so the numbers feel a little less mysterious.",
    "takeaways": [
      "The APR is a fuller picture of a loan's cost than the interest rate alone, because it folds in lender fees as well as interest.",
      "A longer loan term lowers the monthly payment but usually means paying more interest over the life of the loan.",
      "A larger down payment means you borrow less, which can lower both your monthly payment and your total financing cost.",
      "Negative equity, or being upside down, is owing more on the loan than the car is worth.",
      "Because every lender must disclose the APR, you can compare offers by lining up APR against APR, not APR against interest rate."
    ],
    "yearLabel": "",
    "sources": [
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Auto loan answers: key terms",
        "url": "https://www.consumerfinance.gov/consumer-tools/auto-loans/answers/key-terms/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "What is the difference between a loan interest rate and the APR?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Should I trade in my car if it is not paid off? (negative equity)",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-negative-equity-in-an-auto-loan-en-749/",
        "year": ""
      }
    ],
    "segments": [
      {
        "id": "auto-loans-and-financing-s0",
        "name": "A calm start",
        "secs": 16,
        "core": true,
        "say": "Welcome. Buying a car is one of the bigger purchases many of us make, and the financing part can feel like a wall of numbers. Today we will gently take it apart, one piece at a time, so that words like A P R, loan term, and down payment feel friendly instead of fuzzy.",
        "simpler": "Hi there. A car is a big buy, and the money side can look confusing. We will go slow and explain the main words one at a time so they make sense.",
        "deeper": "Welcome. Vehicle financing sits at the intersection of a large consumer purchase and a structured credit product, which is why it can feel opaque. Over the next few minutes we will decompose the contract into its core variables, principal, rate, term, and the costs layered on top, so the vocabulary becomes a set of tools rather than a barrier."
      },
      {
        "id": "auto-loans-and-financing-s1",
        "name": "Interest rate versus APR",
        "secs": 20,
        "core": true,
        "say": "First, two words that look alike but are not. The interest rate is what you pay the lender for borrowing the money, on top of the amount you borrowed. The A P R, or annual percentage rate, is broader. It is the interest rate plus the lender's fees, such as origination charges, all expressed as a yearly percentage. So the A P R gives you a fuller picture of what the loan really costs.",
        "simpler": "There are two rates that sound similar. The interest rate is just the cost of borrowing. The A P R is that cost plus the lender's fees, all rolled into one yearly percentage. So the A P R shows the whole price of the loan better.",
        "deeper": "The distinction is meaningful. The nominal interest rate prices only the cost of the borrowed principal. The annual percentage rate is a composite measure that incorporates the interest rate together with finance charges such as origination fees, expressed as an annualized percentage. Because the A P R internalizes those mandatory costs, it is the more complete signal of the true cost of credit, which is precisely why disclosure rules require it."
      },
      {
        "id": "auto-loans-and-financing-s2",
        "name": "What the loan term changes",
        "secs": 20,
        "core": true,
        "say": "Next, the loan term, which is simply the length of the loan, usually measured in months. Stretching the loan over more months can lower the monthly payment, which feels nice. But there is a trade. A longer loan generally means you pay more interest over the life of the loan. A shorter term costs more each month, yet less in total.",
        "simpler": "The loan term is how long you take to pay, usually in months. A longer loan means smaller monthly payments, but you pay more interest in the end. A shorter loan costs more each month but less overall.",
        "deeper": "The term is the amortization horizon, conventionally expressed in months. Extending it redistributes a fixed financed amount across more periods, reducing each scheduled payment. The trade-off is that interest accrues against the outstanding balance for longer, so the cumulative interest paid over the life of the loan rises. A shorter term inverts this, raising the periodic obligation while compressing total interest. The decision balances monthly cash flow against lifetime cost."
      },
      {
        "id": "auto-loans-and-financing-s3",
        "name": "The power of a down payment",
        "secs": 19,
        "core": true,
        "say": "Now the down payment. This is the money you put toward the car up front, and it can be cash, the value of a trade-in, or both. The more you put down, the less you need to borrow. Borrowing less can lower your monthly payment and lower the total amount you pay to finance the car.",
        "simpler": "A down payment is the money you pay up front, in cash or as a trade-in. The more you pay now, the less you have to borrow, which can shrink your monthly payment and the total cost.",
        "deeper": "The down payment reduces the financed principal at origination and can be funded by cash, trade-in equity, or a combination. By lowering the amount borrowed, it reduces the loan-to-value ratio and, holding rate and term constant, decreases both the periodic payment and the aggregate finance charges paid across the loan. It also provides an equity cushion against the vehicle's depreciation."
      },
      {
        "id": "auto-loans-and-financing-s4",
        "name": "The total cost of credit",
        "secs": 18,
        "core": true,
        "say": "It helps to look past the monthly payment to the total cost of credit. That is how much you will pay for the car altogether, including the principal you borrowed, the interest, and any down payment or trade-in, over the whole life of the loan. Two loans with the same monthly payment can have very different total costs.",
        "simpler": "Try to look at the full price, not just the monthly payment. The total cost is everything you pay for the car, the amount borrowed plus interest plus your down payment, across the whole loan. Two loans can have the same monthly payment but cost very different amounts in the end.",
        "deeper": "Anchoring on the monthly payment alone can be misleading, because it obscures term and rate effects. The total cost of credit aggregates principal, interest, and the down payment or trade-in contributed over the full life of the loan. Two offers can converge on an identical payment yet diverge sharply in lifetime cost when term and A P R differ, which is why the total figure, not the installment, is the more honest basis for comparison."
      },
      {
        "id": "auto-loans-and-financing-s5",
        "name": "Depreciation and being upside down",
        "secs": 21,
        "core": false,
        "say": "Cars tend to lose value over time, while the loan balance only falls as you pay it down. Sometimes the balance falls slower than the value, and you end up owing more than the car is worth. That is called negative equity, or being upside down. For example, if you owe ten thousand dollars and the car is now worth eight thousand, you have two thousand dollars of negative equity.",
        "simpler": "Cars usually lose value as time passes. If your loan shrinks slower than the car's value, you can owe more than the car is worth. That is called negative equity, or being upside down. For instance, owing ten thousand dollars on a car now worth eight thousand means you are two thousand dollars upside down.",
        "deeper": "Vehicles depreciate, while the loan balance declines only along the amortization schedule. When depreciation outpaces principal reduction, the outstanding balance exceeds the vehicle's market value, a condition termed negative equity, or being upside down. Concretely, a ten thousand dollar balance against an eight thousand dollar valuation yields two thousand dollars of negative equity. Larger down payments and shorter terms both reduce the likelihood and duration of this exposure."
      },
      {
        "id": "auto-loans-and-financing-s6",
        "name": "Why negative equity follows you",
        "secs": 19,
        "core": false,
        "say": "Negative equity matters most when you want to trade in or sell. If you owe more than your trade-in is worth, a dealer or lender may offer to roll that extra balance into a new auto loan. That can feel convenient, but it makes the new loan more expensive, because you are now borrowing for two cars at once.",
        "simpler": "Negative equity really shows up when you trade in or sell. If you owe more than the car is worth, the lender might add that gap onto your next loan. It feels easy, but it makes the new loan cost more, since you are paying for the old car and the new one together.",
        "deeper": "The consequence of negative equity crystallizes at disposition. When the payoff balance exceeds trade-in value, lenders may roll the unpaid difference into the financing for the next vehicle. While operationally convenient, this carries the deficit forward, enlarging the new principal and making the subsequent loan more expensive, effectively financing part of a depreciated prior asset on top of the new purchase, which can deepen the upside-down position."
      },
      {
        "id": "auto-loans-and-financing-s7",
        "name": "Comparing offers fairly",
        "secs": 18,
        "core": false,
        "say": "Here is a gentle habit that helps. Because every lender is required to disclose the A P R, you can use it to compare offers side by side. Just be sure you are comparing A P R to A P R, not an A P R against a plain interest rate, since those are not the same thing. Looking at term and total cost together rounds out the picture.",
        "simpler": "A helpful habit. Every lender has to tell you the A P R, so you can line up offers and compare. Just make sure you compare A P R to A P R, not an A P R to a plain interest rate, because they are different. Also check the loan length and total cost.",
        "deeper": "A disciplined comparison leverages mandatory A P R disclosure as a standardized yardstick across lenders. The integrity of the comparison depends on matching like to like, A P R against A P R rather than against a nominal interest rate, since the former includes finance charges and the latter does not. Supplementing the A P R with term length and total cost of credit captures the cash-flow and lifetime-cost dimensions that a single rate cannot fully convey."
      },
      {
        "id": "auto-loans-and-financing-s8",
        "name": "A kind close",
        "secs": 15,
        "core": false,
        "say": "That is the heart of it. A P R over interest rate, term against total cost, a solid down payment, and an eye on staying right side up. Please remember that this is general educational information, not financial advice, and for decisions about your own situation it is wise to speak with a licensed professional you trust.",
        "simpler": "That is the main idea. Watch the A P R, the loan length, the total cost, and your down payment, and try not to go upside down. Remember, this is just general learning, not financial advice. For your own choices, talk with a licensed professional you trust.",
        "deeper": "To summarize the framework: privilege the A P R over the nominal rate, weigh term against total cost of credit, use the down payment to limit financed principal, and monitor equity to avoid an upside-down position. Please treat this as general educational information rather than financial advice; individual circumstances vary, and a licensed professional can tailor guidance to your specific situation."
      }
    ]
  },
  "insurance-basics": {
    "id": "insurance-basics",
    "title": "How Insurance Works",
    "topic": "insurance-basics",
    "blurb": "A gentle walk through the shared idea behind insurance and the words on your bill, so the basics feel a little less mysterious.",
    "takeaways": [
      "Insurance pools money from many people so that the few who face a loss can be helped.",
      "A premium is what you pay for coverage whether or not you ever file a claim.",
      "A deductible is what you pay first; copays are fixed charges; the out-of-pocket maximum caps your yearly share for covered care.",
      "Common types include health, auto, home, and renters, and each protects against a different kind of loss.",
      "This is general education, not financial advice, so a licensed professional is the right guide for your own choices."
    ],
    "yearLabel": "",
    "sources": [
      {
        "org": "HealthCare.gov (U.S. Centers for Medicare & Medicaid Services)",
        "title": "Your total costs for health care: Premium, deductible, and out-of-pocket costs",
        "url": "https://www.healthcare.gov/choose-a-plan/your-total-costs/",
        "year": ""
      },
      {
        "org": "HealthCare.gov (U.S. Centers for Medicare & Medicaid Services)",
        "title": "Out-of-pocket maximum/limit - Glossary",
        "url": "https://www.healthcare.gov/glossary/out-of-pocket-maximum-limit/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "What is homeowner's insurance? Why is homeowner's insurance required?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-homeowners-insurance-why-is-homeowners-insurance-required-en-162/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Dealing with property damage (homeowners and renters insurance)",
        "url": "https://www.consumerfinance.gov/consumer-tools/disasters-and-emergencies/dealing-with-property-damage/",
        "year": ""
      },
      {
        "org": "Federal Trade Commission",
        "title": "Credit-Based Insurance Scores: Impacts on Consumers of Automobile Insurance (Report to Congress)",
        "url": "https://www.ftc.gov/sites/default/files/documents/reports/credit-based-insurance-scores-impacts-consumers-automobile-insurance-report-congress-federal-trade/p044804facta_report_credit-based_insurance_scores.pdf",
        "year": "2007"
      }
    ],
    "segments": [
      {
        "id": "insurance-basics-s0",
        "name": "A soft place to start",
        "secs": 18,
        "core": true,
        "say": "Welcome. Today we will sit with one of the most reassuring ideas in everyday money: insurance. At heart, insurance is a way for many people to share a risk that none of them could easily carry alone. You pay a little, steadily, so that if something hard happens, you are not facing the whole cost by yourself. Let us take it slowly, one friendly word at a time.",
        "simpler": "Hi there. Let's talk about insurance. The simple idea is this: lots of people each chip in a small amount, so that if something bad happens to one of them, there is money to help. You pay a bit regularly so a big surprise bill does not land on you all at once. We will go slow.",
        "deeper": "Welcome. Insurance is a contractual arrangement for transferring and distributing risk. Rather than each household bearing the full financial consequence of a rare but costly event, individuals contribute modest, predictable payments into a shared arrangement that compensates those who experience a covered loss. The underlying principle is the pooling of independent risks across many participants, which makes an unpredictable individual cost into a manageable collective one."
      },
      {
        "id": "insurance-basics-s1",
        "name": "Why pooling works",
        "secs": 20,
        "core": true,
        "say": "Here is the quiet magic. In any large group, only some people will face a serious loss in a given year, but no one knows in advance who. When everyone contributes, the many payments together cover the few who need help. Insurers study how likely different losses are, and they use that to decide what to charge. On average, people who are more likely to file a claim are asked to pay more, and those less likely pay less.",
        "simpler": "Here is why it works. In a big group, only a few people will have something go badly wrong each year, and nobody knows who ahead of time. Everyone pays in, and that shared money covers the few who need it. Companies look at how risky something is, so people more likely to have a claim usually pay more, and people less likely pay less.",
        "deeper": "This is the mechanism of risk pooling. Across a large population, the proportion experiencing a covered loss in any period is far more predictable than any single person's outcome, a consequence of the law of large numbers. Insurers estimate the expected frequency and severity of claims and price accordingly. As a result, higher-risk participants are generally charged higher premiums and lower-risk participants lower premiums, so that price more closely matches the risk of loss each participant brings to the pool."
      },
      {
        "id": "insurance-basics-s2",
        "name": "The premium",
        "secs": 16,
        "core": true,
        "say": "Now the words on your bill. The first is the premium. A premium is the amount you pay to keep your coverage, often every month, whether or not you ever use it. Think of it as the price of being part of the pool. Even in a quiet year with no claims, the premium is what keeps your protection in place.",
        "simpler": "Let's look at the words you will see. The first is the premium. That is the amount you pay to have insurance, usually each month, even if you never use it. It is the cost of being covered. In a year where nothing goes wrong, you still pay it to stay protected.",
        "deeper": "The premium is the recurring charge paid to maintain the policy in force, commonly billed monthly. It is owed regardless of whether any claim is made, because it represents your contribution to the risk pool and the cost of the insurer standing ready to pay covered losses. Premiums are distinct from the cost-sharing amounts that apply only when you actually receive a covered service or file a claim."
      },
      {
        "id": "insurance-basics-s3",
        "name": "The deductible",
        "secs": 18,
        "core": true,
        "say": "Next is the deductible. This is the amount you pay out of your own pocket for covered costs before your plan begins to pay its share. For example, in health coverage you generally pay for certain covered services yourself until you reach your deductible, and then the plan starts contributing. A plan with a higher deductible often has a lower premium, and a lower deductible often comes with a higher premium.",
        "simpler": "Next is the deductible. This is what you pay yourself first, before the insurance starts paying. With health coverage, you usually cover certain bills yourself until you hit that amount, then the plan pitches in. Plans with a bigger deductible often have a smaller monthly premium, and the other way around too.",
        "deeper": "The deductible is the threshold of covered expenses you must satisfy from your own funds before the insurer begins paying its portion. In health plans, you typically pay in full for many covered services until the deductible is met, after which the plan shares costs. There is generally an inverse relationship between deductible and premium: accepting a higher deductible, and thus retaining more first-dollar risk yourself, usually lowers the premium, and vice versa."
      },
      {
        "id": "insurance-basics-s4",
        "name": "Copays and your share",
        "secs": 18,
        "core": false,
        "say": "Two more health terms help round this out. A copayment, or copay, is a fixed amount you pay for a covered service, such as a set fee for a doctor visit. Coinsurance is a little different: it is a percentage of the cost you pay, while the plan pays the rest. Together, copays, coinsurance, and the deductible make up your share of covered costs.",
        "simpler": "Two more health words. A copay is a set price you pay for a service, like a fixed fee when you see a doctor. Coinsurance is a percentage instead: you pay part, and the plan pays the rest. Your copays, your coinsurance, and your deductible all add up to your part of the covered bills.",
        "deeper": "These are forms of cost sharing. A copayment is a fixed dollar amount due for a particular covered service, while coinsurance is a defined percentage of the allowed cost that you bear, with the plan covering the remainder. The deductible, copayments, and coinsurance together constitute your out-of-pocket responsibility for covered care, each applying at a different point in how a claim is settled."
      },
      {
        "id": "insurance-basics-s5",
        "name": "The out-of-pocket maximum",
        "secs": 20,
        "core": true,
        "say": "Here is a comforting one. The out-of-pocket maximum is the most you would have to pay during a year for your share of covered services. Once your deductible, copays, and coinsurance add up to that limit, the plan generally pays one hundred percent of covered costs for the rest of the year. It is worth knowing that your monthly premiums, and care that is not covered, do not count toward this limit.",
        "simpler": "Here is a reassuring one. The out-of-pocket maximum is the most you will pay in a year for your share of covered care. Once your deductible, copays, and coinsurance reach that cap, the plan usually pays all of the covered costs for the rest of the year. Note that your monthly premiums, and anything not covered, do not count toward it.",
        "deeper": "The out-of-pocket maximum is the annual ceiling on a member's cost sharing for covered, in-network services. Once accumulated deductibles, copayments, and coinsurance reach this limit, the plan ordinarily pays the full allowed amount for covered benefits for the remainder of the plan year. Importantly, premiums and amounts for non-covered services generally do not accrue toward the maximum, so they sit outside this protective cap."
      },
      {
        "id": "insurance-basics-s6",
        "name": "The main types",
        "secs": 20,
        "core": true,
        "say": "Now the everyday kinds you are most likely to meet. Health insurance helps with the cost of medical care. Auto insurance covers cars, and almost all states require some form of it when you buy or lease a vehicle. Home insurance pays for losses and damage to your property from events like a fire or a burglary, and lenders generally require it when you have a mortgage. Renters insurance is its gentle cousin: it covers your belongings if they are damaged or stolen inside a place you rent.",
        "simpler": "Now the common kinds you will run into. Health insurance helps pay for medical care. Auto insurance covers cars, and nearly every state requires it when you buy or lease one. Home insurance pays for damage or loss to your property, like from a fire or theft, and lenders usually require it if you have a mortgage. Renters insurance is similar but covers your stuff inside a place you rent.",
        "deeper": "Consider the principal lines most households encounter. Health insurance finances medical care through the cost-sharing structure already described. Auto insurance covers losses involving a vehicle, and nearly all states mandate coverage upon purchase or lease. Homeowner's insurance indemnifies losses and damage to property from perils such as fire or burglary and is typically required by mortgage lenders to protect the collateral; note that standard policies commonly exclude flood damage. Renters insurance is the analogous coverage for a tenant's personal belongings within a rented dwelling, since the landlord's policy does not protect a renter's possessions."
      },
      {
        "id": "insurance-basics-s7",
        "name": "Choosing what fits",
        "secs": 18,
        "core": false,
        "say": "When people compare plans, they often weigh the premium against the deductible and the out-of-pocket maximum together. A lower monthly premium can mean paying more when you actually need care, while a higher premium can mean less to pay at that moment. There is no single right answer; the better fit depends on your situation, your budget, and how much certainty feels safe to you.",
        "simpler": "When choosing a plan, people look at the premium next to the deductible and the out-of-pocket maximum. A cheaper monthly cost can mean paying more when you need care, and a pricier one can mean paying less right then. There is no one right choice; it depends on your life, your budget, and what feels safe to you.",
        "deeper": "Plan selection involves a trade-off across the premium, the deductible, and the out-of-pocket maximum considered jointly rather than in isolation. A lower premium typically shifts more cost onto you at the point of service, whereas a higher premium reduces that exposure. The optimal balance is genuinely personal, turning on your expected use, cash flow, and tolerance for variability, which is why comparing total potential costs rather than premium alone tends to be more informative."
      },
      {
        "id": "insurance-basics-s8",
        "name": "A kind close",
        "secs": 16,
        "core": false,
        "say": "That is the heart of it: a pool of many, a premium to belong, a deductible and copays for your share, and a cap that protects you in a hard year. Please remember this is general educational information, not financial advice. For decisions about your own coverage, it is wise to talk with a licensed professional who can look at your particular needs. Be gentle with yourself as you learn.",
        "simpler": "So that is the core: many people share the cost, you pay a premium to join, a deductible and copays are your part, and the out-of-pocket maximum protects you in a bad year. Remember, this is general learning, not financial advice. For your own coverage choices, talk with a licensed professional who can look at your situation. Go easy on yourself.",
        "deeper": "In summary, the architecture is consistent across lines: a pool funded by premiums, cost sharing through deductibles, copayments, and coinsurance, and an annual out-of-pocket ceiling that limits exposure. This material is general education and not financial advice. Because coverage decisions depend on individual circumstances, consulting a licensed insurance professional or advisor is the appropriate step for personalized guidance. Approach the learning with patience."
      }
    ]
  },
  "life-insurance-explained": {
    "id": "life-insurance-explained",
    "title": "Life Insurance, Explained",
    "topic": "life-insurance-explained",
    "blurb": "A gentle, plain-language walk through what life insurance is, how term and whole life differ, who tends to need it, and how people think about how much makes sense.",
    "takeaways": [
      "Life insurance pays money to the people you name when the insured person dies.",
      "Term life covers you for a set period and is usually the simplest, lowest-cost option.",
      "Whole and other permanent policies last for life and build a cash value, with higher premiums and fees.",
      "Coverage matters most when other people depend on your income or unpaid work.",
      "Many people size coverage by adding up what they would want replaced or paid off, not by guessing."
    ],
    "yearLabel": "",
    "sources": [
      {
        "org": "U.S. Securities and Exchange Commission (Investor.gov)",
        "title": "Variable Life Insurance",
        "url": "https://www.investor.gov/introduction-investing/investing-basics/investment-products/insurance-products/variable-life",
        "year": ""
      },
      {
        "org": "U.S. Securities and Exchange Commission, Office of Investor Education and Advocacy",
        "title": "Investor Bulletin: Variable Life Insurance",
        "url": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-22",
        "year": "2018"
      },
      {
        "org": "USAGov (USA.gov)",
        "title": "Military survivor benefits and life insurance",
        "url": "https://www.usa.gov/military-survivor-benefits",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Learning about insurance",
        "url": "https://www.consumerfinance.gov/consumer-tools/educator-tools/youth-financial-education/teach/activities/learning-about-insurance/",
        "year": ""
      }
    ],
    "segments": [
      {
        "id": "life-insurance-explained-s0",
        "name": "Why this topic matters",
        "secs": 18,
        "core": true,
        "say": "Let us take a calm look at life insurance. At its heart, it is a simple promise. You pay a company over time, and in return the company promises to pay money to the people you choose if you die while you are covered. Insurance is one way to help reduce the financial shock when a hard life event happens. There is nothing morbid about understanding it. It is really a way of caring for the people who count on you.",
        "simpler": "Life insurance is a deal. You pay a company a little at a time. If you die while you are covered, they pay money to the people you pick. It is just a way to soften the money side of a hard loss and to look after the people who depend on you.",
        "deeper": "Life insurance is a contract in which the policyholder makes premium payments and the insurer agrees to pay a sum to named beneficiaries upon the death of the insured during the coverage period. Like insurance generally, it functions as a tool for transferring and pooling financial risk, helping to reduce the financial costs that follow a difficult life event. Framing it as an act of provision, rather than a prediction of death, tends to make the decision clearer."
      },
      {
        "id": "life-insurance-explained-s1",
        "name": "What the payout is",
        "secs": 16,
        "core": true,
        "say": "The money the company pays out is called the death benefit. It is the amount your beneficiaries receive when you die. Your beneficiaries are simply the people, or sometimes an organization, that you name to receive that money. Put plainly, life insurance benefits pay money to the survivors of a policyholder who dies. That payout is the whole reason the policy exists.",
        "simpler": "The payment the company makes is called the death benefit. The people you name to get it are your beneficiaries. So the main job of a life insurance policy is to pay money to your survivors after you are gone.",
        "deeper": "The death benefit is the contractually specified sum payable to the designated beneficiaries upon the insured's death. Beneficiaries are the parties, whether individuals or an entity, nominated to receive that benefit, and the designation can usually be revised over the life of the policy. Because the benefit is the policy's core function, clarity and currency of the beneficiary designation matter as much as the coverage amount itself."
      },
      {
        "id": "life-insurance-explained-s2",
        "name": "Term life insurance",
        "secs": 18,
        "core": true,
        "say": "There are two broad families. The first is term life insurance. It covers you for a set period, a term, such as ten, twenty, or thirty years. If you die during that window, your beneficiaries receive the death benefit. If the term ends and you are still living, the coverage simply stops. Term policies are usually the most straightforward and the least expensive, because you are paying for protection only, with no built-in savings piece.",
        "simpler": "The first kind is term life. It covers you for a set number of years, like ten, twenty, or thirty. Die during that time, and your people get paid. Outlive the term, and the coverage just ends. It is usually the simplest and cheapest, because you are only paying for protection.",
        "deeper": "Term life insurance provides a death benefit for a defined coverage period, after which the policy expires unless renewed or converted. Because it carries no cash value or investment component, the premium reflects primarily the cost of mortality risk for the term, which is why term coverage is generally the lowest-cost way to obtain a given death benefit. The trade-off is that protection is temporary and may become costly or unavailable to renew at older ages."
      },
      {
        "id": "life-insurance-explained-s3",
        "name": "Whole and permanent life insurance",
        "secs": 20,
        "core": true,
        "say": "The second family is permanent insurance, and whole life is the classic example. It is designed to last your whole life rather than a fixed term, and alongside the death benefit it builds a cash value over time. Because of that, the premiums are higher than for term coverage. There are also fees and expenses, and the policy can lapse, meaning it ends without value, if you do not keep enough cash value and premiums to cover those costs.",
        "simpler": "The second kind is permanent insurance, and whole life is the main example. It is meant to last your entire life, and it slowly builds up a cash value as well as paying a death benefit. That makes it cost more than term. It also has fees, and if you do not keep paying enough, it can lapse and end with nothing.",
        "deeper": "Permanent policies, of which whole life is the traditional form, are structured to remain in force for the insured's lifetime and accumulate a cash value in addition to the death benefit. The higher premiums reflect both the lifetime coverage and the savings element. These policies carry fees and expenses, and a policy may lapse, terminating without value, if the cash value and premiums are insufficient to cover its ongoing charges. Variants such as variable life add investment options whose performance can raise or lower the cash value, introducing investment risk."
      },
      {
        "id": "life-insurance-explained-s4",
        "name": "A note on cash value and risk",
        "secs": 17,
        "core": false,
        "say": "It helps to know what cash value really is. In a permanent policy, the cash value rises and falls based on the premiums you pay, the policy's fees and expenses, and, in some policies, the performance of investment options you choose. In those investment-linked policies, you can actually lose money, including your initial investment, if the chosen options perform poorly. So the savings piece is not a guaranteed gain in every kind of policy.",
        "simpler": "Cash value is the savings part inside a permanent policy. It goes up and down depending on what you pay in, the fees, and, in some policies, how the investments do. In those investment-type policies you can even lose money if the investments do poorly. So it is not a sure thing in every case.",
        "deeper": "Cash value reflects premiums paid, less the policy's fees and expenses, and in investment-linked contracts, the performance of the chosen investment options, which are often mutual-fund-like sub-accounts. In variable life insurance the cash value carries genuine investment risk: poor performance can reduce the account value and the policyholder can lose money, including the initial investment. This is why such products are generally unsuited to short-term saving and why the savings element should not be treated as a guaranteed gain."
      },
      {
        "id": "life-insurance-explained-s5",
        "name": "Who actually needs coverage",
        "secs": 19,
        "core": true,
        "say": "Now, who really needs life insurance? The honest answer is, it depends on whether other people would feel a financial gap if your income or unpaid work disappeared. People with children, a partner who relies on their earnings, or shared debts often have the strongest reason for coverage. Someone with no dependents and no shared obligations may need little or none. The question is not your age. It is who would be left financially exposed.",
        "simpler": "So who needs it? Mostly people whose income or work others depend on. If you have kids, a partner who counts on your pay, or shared debts, you likely have a real reason for coverage. If nobody depends on you financially and you share no debts, you may need little or none. It is about who would be left short, not your age.",
        "deeper": "The need for life insurance turns on financial dependency rather than on age or life stage in the abstract. Where others rely on the insured's earnings or unpaid labor, such as caregiving, or where joint obligations like a mortgage or co-signed debt exist, the death benefit can replace lost income and discharge liabilities, preventing dependents from being financially exposed. Conversely, an individual with no dependents and no shared obligations may derive little marginal benefit from coverage, making the dependency analysis the appropriate starting point."
      },
      {
        "id": "life-insurance-explained-s6",
        "name": "How people estimate how much",
        "secs": 20,
        "core": true,
        "say": "When it comes to how much coverage makes sense, many people build it from the things they would want handled. They add up income they would want to replace for the years their family would need it, debts they would want paid off such as a mortgage, and future costs they care about, like a child's education. Then they subtract savings and any other coverage already in place. The remaining gap is a rough guide to how much coverage to consider.",
        "simpler": "How much should you get? Many people add it up from real needs. Income they would want to replace for a while, debts to clear like a mortgage, and big future costs like school. Then they subtract savings and any coverage they already have. Whatever gap is left is a rough guide to how much to think about.",
        "deeper": "A common needs-based approach sums the obligations a death benefit would ideally cover: a number of years of income replacement, outstanding debts such as a mortgage, and anticipated future expenses like education, then nets out existing assets and any coverage already in force, including employer-provided or government survivor benefits. The residual represents an estimated coverage gap. This bottom-up method is generally more defensible than rules of thumb, because it ties the amount to the household's actual financial structure rather than to a single multiplier."
      },
      {
        "id": "life-insurance-explained-s7",
        "name": "Coverage you may already have",
        "secs": 16,
        "core": false,
        "say": "It is also worth remembering you may already hold some coverage. Many jobs include group life insurance, and certain situations carry their own protections. For example, qualifying active duty service members are automatically covered by Servicemembers Group Life Insurance. Surviving family members may also qualify for government survivor benefits. Counting what you already have keeps you from paying for more than you need.",
        "simpler": "Remember you might already have some coverage. Lots of jobs include group life insurance, and some situations come with their own. For instance, qualifying active duty service members are automatically covered by Servicemembers Group Life Insurance, and survivors may qualify for government benefits. Counting what you have stops you from over-buying.",
        "deeper": "An accurate needs estimate accounts for coverage already in force. Employer-sponsored group life insurance is common, and certain populations have program-based coverage; for example, qualifying active duty service members are automatically enrolled in Servicemembers Group Life Insurance, with related options for veterans. Survivors may also be eligible for government survivor benefits. Incorporating these existing protections prevents over-insuring and reduces unnecessary premium outlay."
      },
      {
        "id": "life-insurance-explained-s8",
        "name": "A gentle close",
        "secs": 15,
        "core": false,
        "say": "So, to bring it home. Term covers a set period simply and affordably, permanent lasts for life and builds cash value at higher cost, and the real question is who depends on you and what you would want covered. Please treat all of this as general educational information, not financial advice. For a decision that fits your own life, it is wise to talk with a licensed professional who can look at your full situation.",
        "simpler": "To wrap up. Term is simple and cheap for a set time, permanent lasts for life and builds cash value but costs more, and the key question is who depends on you and what you would want handled. This is general education, not financial advice. For your own choice, talk with a licensed professional who can see your whole picture.",
        "deeper": "In summary, term insurance offers temporary, low-cost protection, while permanent insurance provides lifelong coverage with a cash-value component at higher cost, and the appropriate amount follows from a needs analysis grounded in dependency and obligations. This lesson is general educational information and not financial advice. Because product suitability, tax treatment, and beneficiary planning are situation-specific, consulting a licensed professional who can review your complete circumstances is the prudent next step."
      }
    ]
  },
  "net-worth-and-cash-flow": {
    "id": "net-worth-and-cash-flow",
    "title": "Net Worth and Cash Flow",
    "topic": "net-worth-and-cash-flow",
    "blurb": "A gentle, judgment-free look at two simple numbers — what you own minus what you owe, and the money flowing in and out each month — and why they help you see your whole picture.",
    "takeaways": [
      "Net worth is everything you own (assets) minus everything you owe (liabilities); it can be positive or negative, and a negative number is a starting point, not a verdict.",
      "Cash flow is the money coming in versus the money going out over a month, and tracking it shows where your money actually goes.",
      "Income measures one month; net worth measures the result of many months, which makes it a steadier long-term scoreboard.",
      "Tracking spending for a few weeks, then comparing the total to your take-home pay, reveals patterns that small everyday costs can hide.",
      "Reviewing your net worth statement about once a year is a calm way to see progress over time."
    ],
    "yearLabel": "",
    "sources": [
      {
        "org": "U.S. Securities and Exchange Commission (Investor.gov)",
        "title": "Figure Out Your Finances",
        "url": "https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/figure-out-your-finances",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Assess your spending",
        "url": "https://www.consumerfinance.gov/owning-a-home/prepare/assess-your-spending/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Creating a cash flow budget (Your Money, Your Goals tool)",
        "url": "https://files.consumerfinance.gov/f/documents/cfpb_creating-cash-flow-budget_tool_2021-08.pdf",
        "year": "2021"
      }
    ],
    "segments": [
      {
        "id": "net-worth-and-cash-flow-s0",
        "name": "Two friendly numbers",
        "secs": 16,
        "core": false,
        "say": "Welcome. Today we will get to know two friendly numbers that quietly tell the story of your money. The first is your net worth, and the second is your cash flow. Neither one is a grade or a judgment. They are simply gentle mirrors that help you see where you are, so you can decide, calmly, where you would like to go.",
        "simpler": "Hi. We are going to learn two money numbers: net worth and cash flow. They are not grades and they are not here to judge you. They just show you where you are right now, so you can pick where to head next.",
        "deeper": "We will explore two complementary financial metrics. Net worth is a stock measure, capturing your overall position at a single point in time, while cash flow is a flow measure, capturing movement of money across a period. Treating both as descriptive instruments rather than evaluative scores keeps the focus on informed, self-directed decisions."
      },
      {
        "id": "net-worth-and-cash-flow-s1",
        "name": "What net worth means",
        "secs": 18,
        "core": true,
        "say": "Net worth is one of the simplest ideas in personal finance. According to the Securities and Exchange Commission, you add up everything you own, called your assets, and then subtract everything you owe, called your liabilities. What is left over is your net worth. It is a single snapshot of your financial position on a given day.",
        "simpler": "Net worth is easy: add up everything you own, then subtract everything you owe. The number left is your net worth. The government's investor site explains it just like that. It is a quick picture of where you stand today.",
        "deeper": "The Securities and Exchange Commission defines net worth as total assets minus total liabilities. Assets span cash, accounts, investments, and the value of property; liabilities span mortgages, loans, and credit balances. Because it is computed at a moment in time, net worth functions as a balance-sheet snapshot rather than a record of activity over a period."
      },
      {
        "id": "net-worth-and-cash-flow-s2",
        "name": "Positive and negative",
        "secs": 18,
        "core": true,
        "say": "Your net worth can be positive or negative. If what you own is larger than what you owe, it is positive. If what you owe is larger, it is negative. The Securities and Exchange Commission notes that a negative net worth is not a reason to despair. For many people, especially early on, it is simply a starting point, and a thoughtful plan can help turn it positive over time.",
        "simpler": "Net worth can be a plus or a minus. Own more than you owe, and it is positive. Owe more than you own, and it is negative. The SEC says a negative number is nothing to panic about. It is often just a starting point, and a good plan can change it over time.",
        "deeper": "A positive net worth indicates assets exceed liabilities; a negative net worth indicates the reverse. The Securities and Exchange Commission frames negative net worth as common and remediable rather than alarming, noting that following a financial plan can move the figure toward positive. This reframing reduces the tendency to treat a single number as a fixed identity."
      },
      {
        "id": "net-worth-and-cash-flow-s3",
        "name": "What cash flow means",
        "secs": 18,
        "core": true,
        "say": "Now to the second number. Cash flow is the money coming in compared with the money going out over a period of time, usually a month. The Consumer Financial Protection Bureau describes building a cash flow budget by starting with the money you have, adding the income you receive, and subtracting what you spend. When more comes in than goes out, your cash flow is positive.",
        "simpler": "The second number is cash flow. It is the money coming in versus the money going out in a month. The Consumer Financial Protection Bureau says to start with what you have, add what you earn, and take away what you spend. If more comes in than goes out, that is positive cash flow.",
        "deeper": "Cash flow tracks inflows against outflows over a defined interval, typically monthly. The Consumer Financial Protection Bureau's cash flow budget method begins with a starting balance, adds income received, and subtracts expenditures, with the resulting net indicating whether the period generated a surplus or a shortfall. Unlike net worth, this is fundamentally a measure of movement over time."
      },
      {
        "id": "net-worth-and-cash-flow-s4",
        "name": "Seeing where money goes",
        "secs": 18,
        "core": false,
        "say": "Cash flow becomes useful when you actually watch it. The Consumer Financial Protection Bureau suggests tracking your spending, for example by reviewing your account statements over several months or jotting down what you spend, and then comparing the total to your take-home pay. This gentle habit often reveals patterns that small, everyday expenses can quietly hide.",
        "simpler": "Cash flow really helps once you watch it. The Consumer Financial Protection Bureau suggests tracking what you spend, maybe by checking your statements for a few months or writing purchases down, then comparing it to your take-home pay. Little daily costs add up, and this habit makes them visible.",
        "deeper": "Observation gives cash flow its practical value. The Consumer Financial Protection Bureau recommends reviewing bank and card statements across several months or recording expenditures directly, then comparing aggregated spending against take-home pay. This surfaces the cumulative weight of frequent small outlays, which individually feel negligible but collectively shape the monthly result."
      },
      {
        "id": "net-worth-and-cash-flow-s5",
        "name": "How the two connect",
        "secs": 18,
        "core": true,
        "say": "Here is where the two numbers meet. Your cash flow each month is like the weather, and your net worth is like the climate. Months of positive cash flow, where you spend less than you receive, tend to lift your net worth over time, because the surplus can pay down what you owe or add to what you own. The monthly flow gradually shapes the long-term snapshot.",
        "simpler": "Here is how they fit together. Cash flow is the weather each month, and net worth is the climate over years. When you regularly spend less than you bring in, that extra can pay off debts or build savings, and your net worth slowly rises. The monthly habit shapes the big picture.",
        "deeper": "The two metrics are linked through accumulation. A recurring monthly surplus can be directed toward reducing liabilities or acquiring assets, both of which raise net worth, while persistent deficits erode it. Thus cash flow operates as the mechanism by which a point-in-time balance sheet evolves, making consistent flow patterns the primary driver of long-run financial position."
      },
      {
        "id": "net-worth-and-cash-flow-s6",
        "name": "Why net worth is a steadier scoreboard",
        "secs": 20,
        "core": true,
        "say": "This is why many people find net worth a steadier long-term scoreboard than income alone. Income tells you about a single month, and it can rise or fall sharply. Net worth reflects the accumulated result of many months of choices about saving, spending, and paying down debt. Because it captures the whole picture rather than one moment, it tends to move more slowly and tell a fuller story.",
        "simpler": "This is why net worth is often a better long-term scoreboard than just income. Income is only one month and can jump around. Net worth is the result of many months of saving, spending, and paying off debt. It shows the whole picture, so it moves slowly and tells a fuller story.",
        "deeper": "Income is a single-period flow that can be volatile and does not, by itself, reveal accumulated position. Net worth integrates the outcomes of many periods of saving, consumption, and debt repayment into one figure, which is why it serves as a more stable longitudinal indicator. Its slower movement reduces the noise inherent in any one month's earnings or spending."
      },
      {
        "id": "net-worth-and-cash-flow-s7",
        "name": "A calm yearly check-in",
        "secs": 16,
        "core": false,
        "say": "A kind way to use net worth is as an occasional check-in rather than a daily worry. The Securities and Exchange Commission suggests updating your net worth statement about once a year to keep track of how you are doing. Once a year is gentle and patient, and it lets you notice progress without the pressure of watching every small change.",
        "simpler": "A nice way to use net worth is as a once-in-a-while check-in, not a daily stress. The SEC suggests updating your net worth statement about once a year. That is gentle and patient, and it lets you see progress without sweating every tiny move.",
        "deeper": "The Securities and Exchange Commission recommends updating a net worth statement annually. An annual cadence suits a slow-moving stock measure: it captures meaningful change while filtering out short-term fluctuation, and it frames the metric as a periodic reflective practice rather than a source of continuous, anxiety-inducing monitoring."
      },
      {
        "id": "net-worth-and-cash-flow-s8",
        "name": "A gentle close",
        "secs": 16,
        "core": false,
        "say": "So that is the pair: net worth, what you own minus what you owe, and cash flow, the money moving in and out each month. Watch the flow, check the snapshot now and then, and be patient with yourself. Please remember this is general educational information, not financial advice, and for decisions about your own situation it is wise to speak with a licensed professional you trust.",
        "simpler": "So there they are: net worth, which is what you own minus what you owe, and cash flow, the money moving in and out each month. Watch the flow, check the snapshot once in a while, and go easy on yourself. Remember, this is general education, not financial advice, so talk with a licensed professional for your own decisions.",
        "deeper": "In summary, net worth captures position as assets minus liabilities, while cash flow captures monthly movement; observing the latter and periodically reviewing the former forms a sustainable practice. This material is general educational information rather than personalized financial advice, and individual decisions warrant consultation with a licensed professional familiar with your circumstances."
      }
    ]
  },
  "social-security-basics": {
    "id": "social-security-basics",
    "title": "Social Security Basics",
    "topic": "social-security-basics",
    "blurb": "A gentle walk through how United States Social Security retirement benefits are earned and how the timing of claiming can shape them.",
    "takeaways": [
      "You generally need forty work credits, about ten years of covered work, to qualify for retirement benefits.",
      "You can earn up to four credits each year; in twenty twenty-six one credit comes from about eighteen hundred ninety dollars in covered earnings.",
      "For people born in nineteen sixty or later, full retirement age is sixty-seven.",
      "Claiming as early as sixty-two permanently lowers the monthly amount, while delaying past full retirement age raises it up to age seventy.",
      "This is general educational information, not financial advice; a licensed professional can help with personal decisions."
    ],
    "yearLabel": "2026",
    "sources": [
      {
        "org": "Social Security Administration (SSA)",
        "title": "Benefits Planner: Social Security Credits and Benefit Eligibility",
        "url": "https://www.ssa.gov/benefits/retirement/planner/credits.html",
        "year": "2026"
      },
      {
        "org": "Social Security Administration (SSA)",
        "title": "Benefits Planner: Retirement Age and Benefit Reduction (Born in 1960 or Later)",
        "url": "https://www.ssa.gov/benefits/retirement/planner/agereduction.html",
        "year": ""
      },
      {
        "org": "Social Security Administration (SSA)",
        "title": "Benefits Planner: Delayed Retirement Credits",
        "url": "https://www.ssa.gov/benefits/retirement/planner/delayret.html",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau (CFPB)",
        "title": "Planning for Retirement (claiming-age comparison tool)",
        "url": "https://www.consumerfinance.gov/consumer-tools/retirement/",
        "year": ""
      }
    ],
    "segments": [
      {
        "id": "social-security-basics-s0",
        "name": "A friendly start",
        "secs": 16,
        "core": true,
        "say": "Welcome. Social Security is a United States program that can provide monthly income in retirement, based on your own work history. In the next few minutes we will look gently at how you become eligible, what full retirement age means, and how the timing of when you claim can shape your monthly amount. Take this at your own pace.",
        "simpler": "Hi there. Social Security is a government program that can pay you money each month after you stop working, based on the jobs you have had. We will calmly cover how you qualify, what full retirement age is, and how when you start matters.",
        "deeper": "Welcome. Social Security's Old-Age, Survivors, and Disability Insurance program provides a monthly retirement benefit tied to an individual's earnings record under covered employment. This lesson surveys three pillars: eligibility through accumulated credits, the statutory full retirement age, and the actuarial adjustments applied when benefits are claimed before or after that age."
      },
      {
        "id": "social-security-basics-s1",
        "name": "Earning credits",
        "secs": 18,
        "core": true,
        "say": "Eligibility is built from work credits. When you work and pay Social Security taxes, you earn credits. You can earn up to four credits in a single year. In twenty twenty-six, you earn one credit for about every eighteen hundred ninety dollars in covered earnings, so reaching the yearly maximum does not take a large income.",
        "simpler": "You qualify by earning credits. When you work and pay Social Security taxes, you build up credits. You can get at most four in a year. In twenty twenty-six, about eighteen hundred ninety dollars of covered pay equals one credit, so you do not need to earn a lot to hit four for the year.",
        "deeper": "Eligibility derives from quarters of coverage, commonly called credits. Credits accrue from earnings subject to Social Security payroll taxation, with a statutory maximum of four credits annually. For twenty twenty-six, the earnings threshold per credit is approximately eighteen hundred ninety dollars, an amount indexed over time, meaning the four-credit ceiling is attainable well below median annual earnings."
      },
      {
        "id": "social-security-basics-s2",
        "name": "How many credits you need",
        "secs": 18,
        "core": true,
        "say": "For retirement benefits, most people need forty credits. Because you can earn at most four credits a year, forty credits generally means about ten years of work over your lifetime. Those years do not have to be in a row. Once you reach forty credits, earning more does not increase the count; nobody needs more than forty.",
        "simpler": "To get retirement benefits, most people need forty credits. Since you can only earn four a year, that usually adds up to about ten years of work. The years can be spread out. After forty credits, extra ones do not change the total.",
        "deeper": "The retirement insured-status requirement is generally forty credits. Given the four-credit annual cap, this corresponds to roughly ten years of covered employment, though the years need not be consecutive. Forty credits is the maximum required for fully insured status; additional credits beyond that threshold do not alter eligibility, since insured status is binary rather than cumulative past forty."
      },
      {
        "id": "social-security-basics-s3",
        "name": "Credits versus the amount",
        "secs": 17,
        "core": false,
        "say": "Here is a helpful distinction. Credits decide whether you qualify, but they do not set the size of your benefit. The amount is based on your highest thirty-five years of earnings. So credits open the door, while your long-term earnings record shapes how much arrives each month.",
        "simpler": "An important point: credits only decide if you qualify, not how much you get. Your benefit amount comes from your best thirty-five years of pay. So credits get you in the door, and your earnings over the years decide the size of the check.",
        "deeper": "It is essential to separate eligibility from benefit computation. Credits establish insured status only. The benefit amount is derived from indexed earnings across the highest thirty-five years, which feed the average indexed monthly earnings and, in turn, the primary insurance amount. Thus credits are a gating mechanism, whereas the earnings history governs the magnitude of the monthly benefit."
      },
      {
        "id": "social-security-basics-s4",
        "name": "Full retirement age",
        "secs": 17,
        "core": true,
        "say": "Full retirement age is the age at which you can receive your unreduced benefit. For people born in nineteen sixty or later, that age is sixty-seven. It is a reference point: claiming at full retirement age gives you one hundred percent of your calculated benefit, and the choices on either side adjust the amount up or down.",
        "simpler": "Full retirement age is when you can get your full, unreduced benefit. If you were born in nineteen sixty or later, that age is sixty-seven. Claiming right at that age gives you the whole amount you earned, and claiming earlier or later changes it.",
        "deeper": "Full retirement age is the statutory anchor at which the primary insurance amount is payable without actuarial reduction or increase. For cohorts born in nineteen sixty or later, it is sixty-seven. It functions as the baseline equal to one hundred percent of the computed benefit, around which early-claiming reductions and delayed-retirement increases are symmetrically defined."
      },
      {
        "id": "social-security-basics-s5",
        "name": "Claiming earlier",
        "secs": 19,
        "core": true,
        "say": "You can start as early as age sixty-two, but the monthly amount is permanently lower. For someone whose full retirement age is sixty-seven, claiming at sixty-two reduces the monthly benefit by about thirty percent, and that reduction lasts for the rest of the benefit. Starting earlier can still make sense for some people; it simply means smaller monthly payments over a longer stretch.",
        "simpler": "You can begin as early as sixty-two, but your monthly check will be permanently smaller. If your full retirement age is sixty-seven, starting at sixty-two cuts the monthly amount by about thirty percent for good. Earlier can still be the right call for some people, just with smaller payments spread over more years.",
        "deeper": "Benefits may commence as early as age sixty-two, subject to a permanent actuarial reduction tied to the number of months before full retirement age. For a full-retirement-age-sixty-seven cohort, claiming at sixty-two yields roughly a thirty percent permanent reduction in the monthly amount. The reduction reflects the longer expected payout horizon and is not recovered later; whether it is advantageous depends on individual circumstances rather than a universal rule."
      },
      {
        "id": "social-security-basics-s6",
        "name": "Delaying past full retirement age",
        "secs": 19,
        "core": true,
        "say": "If you wait beyond full retirement age, your benefit grows through delayed retirement credits, by roughly eight percent for each year you delay, up to age seventy. After seventy there is no further increase from waiting. So between sixty-two and seventy, the timing of your start can meaningfully change your monthly amount.",
        "simpler": "If you wait past full retirement age, your benefit goes up by about eight percent for each year you hold off, until age seventy. Waiting past seventy adds nothing more. So when you start, anywhere from sixty-two to seventy, can really change your monthly amount.",
        "deeper": "Deferring claiming beyond full retirement age accrues delayed retirement credits at approximately eight percent per year, accumulating monthly until age seventy, at which point they cease. The result is a higher permanent monthly benefit. Across the sixty-two to seventy claiming window, the combined effect of early reductions and delayed credits produces a substantial spread in monthly benefit levels for an otherwise identical earnings record."
      },
      {
        "id": "social-security-basics-s7",
        "name": "Weighing the tradeoff",
        "secs": 18,
        "core": false,
        "say": "There is no single right age for everyone. Claiming earlier gives smaller payments sooner; waiting gives larger payments later. Health, other income, work plans, and a spouse's situation can all matter. Free official tools, such as the Consumer Financial Protection Bureau's Planning for Retirement tool, let you explore how different start ages might look for you.",
        "simpler": "There is no one perfect age for everybody. Start early and you get smaller checks sooner; wait and you get bigger checks later. Your health, other money coming in, work plans, and a spouse can all play a part. Free official tools, like the Consumer Financial Protection Bureau's retirement tool, help you compare start ages.",
        "deeper": "The claiming decision is fundamentally a tradeoff between payment size and payment duration, with no universally optimal age. Relevant factors include life expectancy considerations, other income and assets, continued employment, and spousal and survivor dynamics. Official noncommercial resources, such as the Consumer Financial Protection Bureau's Planning for Retirement tool, let individuals model how alternative start ages affect projected monthly benefits."
      },
      {
        "id": "social-security-basics-s8",
        "name": "A gentle close",
        "secs": 15,
        "core": false,
        "say": "To recap: you build eligibility through credits, full retirement age sets your baseline, and the age you claim adjusts the amount. Please remember this is general educational information, not financial advice. For decisions about your own situation, it is wise to talk with a licensed professional. Be kind to yourself as you plan.",
        "simpler": "Quick recap: credits get you qualified, full retirement age is your baseline, and when you start changes the amount. Remember, this is general learning, not financial advice. For your own choices, it helps to speak with a licensed professional. Go easy on yourself while you plan.",
        "deeper": "In summary, credits establish insured status, full retirement age defines the unreduced baseline, and the chosen claiming age applies an actuarial adjustment. This material is general educational information and not financial advice. Personal claiming and retirement decisions warrant consultation with a licensed professional who can account for your full circumstances."
      }
    ]
  },
  "understanding-medicare": {
    "id": "understanding-medicare",
    "title": "Understanding Medicare",
    "topic": "understanding-medicare",
    "blurb": "A gentle, plain-language tour of Medicare's four parts, who can join, and what each part generally helps pay for.",
    "takeaways": [
      "Medicare is the federal health insurance program mainly for people sixty-five and older, and for some younger people with certain disabilities, ESRD, or ALS.",
      "Part A helps cover hospital and inpatient care; for most people who paid Medicare taxes long enough it carries no monthly premium.",
      "Part B helps cover doctor visits, outpatient care, and preventive services, and it carries a monthly premium.",
      "Part C, or Medicare Advantage, is a private plan that bundles Parts A and B and usually drug coverage, often adding extras like vision, hearing, or dental.",
      "Part D helps cover prescription drugs and is offered through private plans; signing up late can lead to a lasting penalty."
    ],
    "yearLabel": "2025",
    "sources": [
      {
        "org": "Medicare.gov (Centers for Medicare & Medicaid Services)",
        "title": "Parts of Medicare",
        "url": "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/parts-of-medicare",
        "year": ""
      },
      {
        "org": "Medicare.gov (Centers for Medicare & Medicaid Services)",
        "title": "Drug coverage basics (Part D)",
        "url": "https://www.medicare.gov/health-drug-plans/part-d/basics",
        "year": ""
      },
      {
        "org": "Centers for Medicare & Medicaid Services (CMS.gov)",
        "title": "Original Medicare (Part A and B) Eligibility and Enrollment",
        "url": "https://www.cms.gov/medicare/enrollment-renewal/original-part-a-b",
        "year": ""
      }
    ],
    "segments": [
      {
        "id": "understanding-medicare-s0",
        "name": "A gentle welcome",
        "secs": 16,
        "core": true,
        "say": "Welcome. Today we will take a calm, unhurried look at Medicare, the federal health insurance program in the United States. Medicare can feel like a maze of letters and rules, so we will move slowly and explain each part in plain words. Our only goal is to help you feel a little more at ease with the basics.",
        "simpler": "Hi there. Medicare is a government health insurance program in the United States. It can seem confusing, so we are going to go slow and explain it simply, one piece at a time.",
        "deeper": "Welcome. Medicare is a federal social insurance program administered by the Centers for Medicare and Medicaid Services. In this lesson we orient ourselves to its structure, its named parts, and its core eligibility logic, building a mental framework you can return to before any specific enrollment decision."
      },
      {
        "id": "understanding-medicare-s1",
        "name": "Who can join, and when",
        "secs": 20,
        "core": true,
        "say": "Medicare is mainly for people who are sixty-five or older. Some younger people can also qualify, including those who have received Social Security disability benefits for twenty-four months, and people with ALS, sometimes called Lou Gehrig's disease, or with end-stage renal disease, which is permanent kidney failure. Many people first become eligible right around their sixty-fifth birthday.",
        "simpler": "Most people get Medicare at age sixty-five. Some younger people qualify too, like those who have gotten Social Security disability for two years, or who have ALS or serious permanent kidney failure.",
        "deeper": "Eligibility rests on three principal pathways: reaching age sixty-five, completing twenty-four months of Social Security or Railroad Retirement disability entitlement, or carrying a qualifying diagnosis. ALS confers entitlement immediately upon disability benefits beginning, and end-stage renal disease follows its own distinct enrollment rules separate from the standard age-based timeline."
      },
      {
        "id": "understanding-medicare-s2",
        "name": "Part A, hospital insurance",
        "secs": 20,
        "core": true,
        "say": "Part A is often called hospital insurance. It helps cover inpatient care in a hospital, care in a skilled nursing facility after a hospital stay, hospice care, and some home health care. For most people who paid Medicare taxes through work long enough, about ten years, Part A comes with no monthly premium. That is why many people sign up for it as soon as they are eligible.",
        "simpler": "Part A is the hospital part. It helps pay when you stay in a hospital, a nursing facility after a hospital stay, hospice care, or some care at home. Most people who worked and paid Medicare taxes for about ten years pay no monthly fee for it.",
        "deeper": "Part A funds inpatient hospital services, post-acute skilled nursing facility care contingent on a qualifying prior inpatient stay, hospice, and limited home health benefits. Premium-free entitlement generally requires roughly forty quarters of Medicare-taxed earnings, by oneself or through a spouse; those with insufficient quarters may instead buy in by paying a monthly premium."
      },
      {
        "id": "understanding-medicare-s3",
        "name": "Part B, medical insurance",
        "secs": 20,
        "core": true,
        "say": "Part B is medical insurance. It helps cover medically necessary services like doctor visits and outpatient care, along with many preventive services meant to catch problems early or keep you well. Unlike Part A, Part B usually has a monthly premium that most people pay. Together, Part A and Part B are known as Original Medicare.",
        "simpler": "Part B is the medical part. It helps pay for doctor visits, outpatient care, and check-ups that keep you healthy or catch problems early. It usually has a monthly cost. Part A and Part B together are called Original Medicare.",
        "deeper": "Part B covers physician services, outpatient care, durable medical equipment, and a broad menu of preventive services delivered with minimal or no cost sharing. It is premium-bearing for nearly all beneficiaries, with the standard premium set annually. Parts A and B jointly constitute Original Medicare, the fee-for-service backbone of the program."
      },
      {
        "id": "understanding-medicare-s4",
        "name": "Part C, Medicare Advantage",
        "secs": 21,
        "core": true,
        "say": "Part C, also called Medicare Advantage, is an alternative way to get your coverage. These are plans offered by private companies that Medicare approves. A Medicare Advantage plan bundles your Part A and Part B, and usually your drug coverage too, into one plan. Many of these plans add extra benefits that Original Medicare does not include, such as vision, hearing, or dental care.",
        "simpler": "Part C is also called Medicare Advantage. These are plans from private companies approved by Medicare. They put your Part A, Part B, and usually drug coverage together in one plan, and often add extras like vision, hearing, or dental.",
        "deeper": "Part C plans are administered by private insurers under contract with Medicare and must furnish at least the equivalent of Parts A and B, typically integrating Part D pharmacy benefits. They commonly extend supplemental benefits beyond Original Medicare and operate within defined provider networks and service areas, which shapes both access and out-of-pocket structure."
      },
      {
        "id": "understanding-medicare-s5",
        "name": "Part D, prescription drugs",
        "secs": 20,
        "core": true,
        "say": "Part D helps cover the cost of prescription drugs, including many recommended vaccines. It is offered through private plans approved by Medicare. You can get drug coverage as a standalone plan added to Original Medicare, or built into a Medicare Advantage plan. If you go without creditable drug coverage for too long, you may face a late enrollment penalty that lasts.",
        "simpler": "Part D helps pay for prescription medicines and many shots. Private plans approved by Medicare offer it. You can add it to Original Medicare or get it inside a Medicare Advantage plan. Waiting too long to sign up can mean a lasting extra fee.",
        "deeper": "Part D delivers outpatient prescription drug coverage exclusively through private plans, available either as a standalone product layered onto Original Medicare or embedded within a Medicare Advantage plan. Maintaining creditable coverage matters: extended gaps without it can trigger a permanent late enrollment penalty added to the monthly premium."
      },
      {
        "id": "understanding-medicare-s6",
        "name": "How the parts fit together",
        "secs": 19,
        "core": false,
        "say": "Here is the simple shape of it. Most people choose one of two paths. The first is Original Medicare, which is Part A and Part B, often paired with a separate Part D drug plan. The second is a Medicare Advantage plan, which is Part C and usually folds the drug coverage in. Both paths give you the core Part A and Part B benefits.",
        "simpler": "There are really two main paths. One is Original Medicare, which is Part A plus Part B, often with a separate Part D drug plan added. The other is a Medicare Advantage plan, Part C, which usually includes the drug coverage. Either way you get the basic Part A and Part B benefits.",
        "deeper": "The program resolves into two coverage architectures. Original Medicare combines Parts A and B, frequently supplemented by a standalone Part D plan and sometimes a separate Medigap policy for cost sharing. Medicare Advantage consolidates A, B, and usually D under a single private plan. Each beneficiary elects one architecture, and both guarantee the underlying Part A and B entitlements."
      },
      {
        "id": "understanding-medicare-s7",
        "name": "Timing and signing up",
        "secs": 18,
        "core": false,
        "say": "Timing matters. Many people who are already receiving Social Security benefits are signed up for Parts A and B automatically. Others need to sign up themselves, usually through Social Security, around the time they turn sixty-five. Signing up on time helps you avoid gaps in coverage and certain late penalties, though some people who are still working delay Part B on purpose.",
        "simpler": "When you sign up matters. If you already get Social Security, you may be enrolled in Parts A and B automatically. Others sign up themselves, usually through Social Security, around age sixty-five. Signing up on time helps avoid gaps and penalties, though some still-working people choose to wait on Part B.",
        "deeper": "Enrollment is either automatic for those already drawing Social Security or Railroad Retirement benefits, or by active application through the Social Security Administration. The Initial Enrollment Period brackets the sixty-fifth birthday month. Coordinating with active employer coverage can justify a deliberate Part B deferral under a Special Enrollment Period, avoiding the otherwise applicable late penalty."
      },
      {
        "id": "understanding-medicare-s8",
        "name": "A kind closing",
        "secs": 17,
        "core": false,
        "say": "That is the gentle overview. Parts A and B form the core, Part C bundles them privately, and Part D adds drug coverage. Please remember that this is general educational information, not financial or insurance advice. Your situation is your own, so for personal decisions, please talk with a licensed professional or a trusted official Medicare counselor. Be well.",
        "simpler": "That is the basic picture. Parts A and B are the core, Part C bundles them through a private plan, and Part D covers medicines. This is just general learning, not advice for your situation. For your own choices, please talk to a licensed professional or an official Medicare counselor. Take care.",
        "deeper": "To summarize: Parts A and B anchor the program, Part C repackages them through private administration, and Part D supplies pharmacy coverage. This lesson is general educational content, not financial or insurance advice. Because eligibility, costs, and trade-offs are highly individual, consult a licensed professional or an official, unbiased Medicare counselor before acting."
      }
    ]
  },
  "wills-and-beneficiaries": {
    "id": "wills-and-beneficiaries",
    "title": "Wills and Beneficiaries",
    "topic": "wills-and-beneficiaries",
    "blurb": "A gentle, plain-language tour of why a will matters, how beneficiary forms can quietly override it, and why keeping those forms current is an act of care for the people you love.",
    "takeaways": [
      "A will is your written instructions for who receives the money and property you leave behind, called your estate.",
      "Without a will, the law of your state decides who inherits, not you.",
      "Some accounts pass directly to a named beneficiary or surviving co-owner, outside the will entirely.",
      "Because those designations can override your will, the form on file is what usually controls who receives the account.",
      "Reviewing your beneficiary forms after big life changes helps your wishes and your paperwork stay in agreement."
    ],
    "yearLabel": "",
    "sources": [
      {
        "org": "Internal Revenue Service (IRS)",
        "title": "Retirement topics - Beneficiary",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-beneficiary",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau (CFPB)",
        "title": "What happens if I have a joint bank account with someone who died?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-happens-if-i-have-a-joint-bank-account-with-someone-who-died-en-1101/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau (CFPB)",
        "title": "Does a person's debt go away when they die?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/does-a-persons-debt-go-away-when-they-die-en-1463/",
        "year": ""
      }
    ],
    "segments": [
      {
        "id": "wills-and-beneficiaries-s0",
        "name": "A quiet kind of care",
        "secs": 18,
        "core": false,
        "say": "Welcome. Today we sit gently with a tender subject: what happens to the things you leave behind, and the people you love. Two small pieces of paperwork do most of the quiet work here. One is a will. The other is a set of beneficiary forms. Understanding how they fit together is one of the kindest gifts you can prepare for your family.",
        "simpler": "Hi. We are going to talk softly about a hard topic: who gets your money and belongings after you are gone. Two main things handle this, a will and beneficiary forms. Knowing how they work together is a real gift to your family.",
        "deeper": "Welcome. This lesson examines the architecture of estate transfer at its most accessible level: the interplay between a testamentary instrument, your will, and contractual or titling-based transfers, your beneficiary designations. Grasping how these two channels coordinate, and where they diverge, is foundational to thoughtful, conflict-reducing planning for those who survive you."
      },
      {
        "id": "wills-and-beneficiaries-s1",
        "name": "What a will actually does",
        "secs": 20,
        "core": true,
        "say": "A will is simply your written instructions for who should receive the money and property you leave behind. Everything you leave is called your estate. In a will you can name the people or causes you want to receive things, and you can name someone you trust to carry out your wishes. That person is often called an executor, administrator, or personal representative.",
        "simpler": "A will is a letter that says who gets your stuff after you die. All your stuff together is called your estate. In the will you pick who gets what, and you pick a trusted person to actually hand things out for you.",
        "deeper": "A will is a testamentary document expressing your directives regarding the disposition of your estate, the aggregate of the money and property you leave behind. Within it you designate beneficiaries and appoint a fiduciary to administer your wishes. Depending on jurisdiction and appointment method, that fiduciary is termed an executor, an administrator, or a personal representative, all of whom carry legal authority to settle the estate."
      },
      {
        "id": "wills-and-beneficiaries-s2",
        "name": "Without a will",
        "secs": 20,
        "core": true,
        "say": "If someone dies without a will, the money and property they leave behind do not simply vanish. Instead, the law of their state decides who inherits. State law sets an order, often starting with a spouse and children. The outcome may match what the person would have chosen, or it may not. A will lets you, rather than a default rule, make that choice.",
        "simpler": "If you die without a will, your stuff does not disappear. The rules of your state decide who gets it, usually family first, like a husband, wife, or kids. That might match what you wanted, or it might not. A will lets you decide instead of a fixed rule.",
        "deeper": "In the absence of a valid will, an estate is distributed according to the intestacy statutes of the decedent's state. These statutes impose a fixed hierarchy of heirs, commonly prioritizing a surviving spouse and descendants, and applied uniformly without regard to the decedent's unexpressed preferences. Drafting a will substitutes your considered intent for this statutory default, and reduces the uncertainty your survivors would otherwise navigate."
      },
      {
        "id": "wills-and-beneficiaries-s3",
        "name": "The forms that skip the will",
        "secs": 21,
        "core": true,
        "say": "Here is the part many people find surprising. Some of your most valuable accounts do not pass through your will at all. When an account is jointly owned with rights of survivorship, the money passes directly to the surviving owner when one owner dies. Many retirement accounts and life insurance policies work in a similar way, paying directly to whoever is named on the beneficiary form.",
        "simpler": "Here is the surprising part. Some of your biggest accounts skip the will completely. If two people own an account together with survivor rights, the money goes straight to the one who is still living. Many retirement and life insurance accounts also pay straight to the person named on their own form.",
        "deeper": "A significant share of personal wealth transfers outside probate through non-probate mechanisms. Assets held in joint tenancy with right of survivorship vest automatically in the surviving co-owner upon death. Similarly, retirement accounts and life insurance proceeds pass by contract to the designated beneficiary on file. These transfers operate independently of the will, governed instead by titling and beneficiary documentation."
      },
      {
        "id": "wills-and-beneficiaries-s4",
        "name": "When the form overrides the will",
        "secs": 20,
        "core": true,
        "say": "Because these accounts pay the person named on the form, the form can override what your will says. Imagine a will that leaves everything to your current family, while an old retirement form still names someone from many years ago. For that account, the named beneficiary on file is generally what controls, not the words in the will. The paperwork quietly has the final say.",
        "simpler": "Because these accounts pay whoever is named on their form, the form can beat the will. Picture a will that says give everything to my family now, but an old account still lists a name from long ago. For that account, the old name usually wins. The form, not the will, decides.",
        "deeper": "Because beneficiary-designated and survivorship assets transfer by their own terms, a current designation generally supersedes any conflicting provision in the will for that specific asset. A will cannot redirect a 401(k) whose beneficiary form names a former partner. This creates a well-known failure mode, where stale designations divert assets contrary to the decedent's later intent, since the controlling instrument is the designation itself."
      },
      {
        "id": "wills-and-beneficiaries-s5",
        "name": "Keeping designations current",
        "secs": 19,
        "core": true,
        "say": "This is why reviewing your beneficiary forms matters so much. Life changes: marriages, separations, births, and losses. Each of these is a gentle reminder to check who is still named on your accounts, and to update the forms if your wishes have changed. The goal is simply that your paperwork and your heart point in the same direction.",
        "simpler": "This is why checking your beneficiary forms matters. Life changes, you get married, you split up, a baby arrives, someone passes away. Each change is a nudge to look at who is named on your accounts and fix it if needed, so the forms match what you actually want.",
        "deeper": "Periodic review of beneficiary designations is essential precisely because these instruments are self-executing and durable. Major life events, marriage, divorce, the birth of a child, the death of a named beneficiary, each warrant reexamination of the designations on file. Aligning your documentation with your present intentions closes the gap between what you wish and what the controlling paperwork would actually execute."
      },
      {
        "id": "wills-and-beneficiaries-s6",
        "name": "A note on retirement accounts",
        "secs": 20,
        "core": false,
        "say": "Retirement accounts deserve a special mention. The person you name is generally whoever you choose to receive the account after you die, named through the rules your plan sets. There are also tax rules about how quickly an inherited account must be paid out, with gentler timelines for certain people, such as a surviving spouse, a minor child, or a beneficiary close to your own age.",
        "simpler": "Retirement accounts are worth a closer look. The person you name is the one you pick to get the account after you die, following your plan's rules. There are also tax rules about how fast the money must come out, with easier timelines for some people, like a husband, wife, young child, or someone near your age.",
        "deeper": "Retirement accounts merit particular attention. The beneficiary is any person or entity the owner selects to receive the account upon death, designated under procedures the plan establishes. Inherited accounts are further subject to distribution rules that condition the withdrawal timeline on the beneficiary's status, affording extended treatment to eligible designated beneficiaries such as a surviving spouse, a minor child, a disabled or chronically ill individual, or one not substantially younger than the owner."
      },
      {
        "id": "wills-and-beneficiaries-s7",
        "name": "Closing, with care",
        "secs": 18,
        "core": false,
        "say": "Take a breath. You now hold the core idea: a will speaks for your estate, while beneficiary forms speak directly for the accounts they name, and can override the will. Please remember that this is general educational information, not financial or legal advice. For your own situation, it is wise and kind to talk with a licensed professional who can guide you personally.",
        "simpler": "Take a breath. Here is the main point: a will handles your estate, but beneficiary forms handle their own accounts and can beat the will. Remember, this is just general learning, not financial or legal advice. For your own life, it helps to talk with a licensed professional who can guide you.",
        "deeper": "To consolidate: the will governs the probate estate, while beneficiary designations and survivorship titling govern their respective assets directly and can supersede the will. This lesson is general educational information, not financial or legal advice. Because estate matters are jurisdiction-specific and highly individual, consulting a licensed professional for guidance tailored to your circumstances is both prudent and caring."
      }
    ]
  },
  "renting-vs-buying": {
    "id": "renting-vs-buying",
    "title": "Renting vs Buying a Home",
    "topic": "renting-vs-buying",
    "blurb": "A calm, judgment-free look at the real tradeoffs between renting and buying a home, so you can think clearly about what fits your own life.",
    "takeaways": [
      "Neither renting nor buying is automatically better; the right choice depends on your finances, how long you plan to stay, and what you value.",
      "Buying usually means large upfront costs such as a down payment and closing costs, while renting usually means a smaller deposit and more flexibility to move.",
      "Homeowners pay for property taxes, insurance, utilities, and all maintenance and repairs, so an emergency fund matters.",
      "Owning can slowly build equity, which is simply the value of your home minus what you still owe on your mortgage.",
      "Buying and selling carry fees, taxes, and commissions, so staying long enough often helps those costs make sense."
    ],
    "yearLabel": "",
    "sources": [
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "What are some of the financial considerations of buying a home?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-are-some-of-the-financial-considerations-of-buying-a-home-en-119/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Ready to buy a home?",
        "url": "https://www.consumerfinance.gov/consumer-tools/mortgages/ready-to-buy-a-home/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "What is a home equity line of credit (HELOC)?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-line-of-credit-heloc-en-107/",
        "year": ""
      }
    ],
    "segments": [
      {
        "id": "renting-vs-buying-s0",
        "name": "A choice, not a verdict",
        "secs": 18,
        "core": true,
        "say": "Welcome. Today we gently explore one of the biggest housing questions many people face: whether to rent or to buy a home. There is no single right answer here, and choosing to rent is not a failure any more than buying is a finish line. This is simply a look at the real tradeoffs, so you can think clearly and kindly about what fits your own life.",
        "simpler": "Hi there. We are going to look at whether it is better to rent a place or buy one. There is no one correct answer. Renting is not bad and buying is not the only goal. We will just walk through the honest pros and cons so you can decide what works for you.",
        "deeper": "Welcome. The rent-versus-buy decision is best framed not as a moral hierarchy but as a contextual financial and lifestyle tradeoff. Each path optimizes for different things: liquidity and mobility on one side, asset accumulation and stability on the other. The aim of this lesson is to surface those tradeoffs explicitly, so the decision rests on your own circumstances rather than on cultural assumptions about what people are supposed to do."
      },
      {
        "id": "renting-vs-buying-s1",
        "name": "What it costs to start",
        "secs": 20,
        "core": true,
        "say": "Let us begin with upfront costs, because they differ a lot. To rent, you usually need a security deposit and perhaps the first month of rent. To buy, you typically need a down payment, which is a portion of the price. For example, on a two hundred thousand dollar home, a twenty percent down payment is forty thousand dollars, while a five percent down payment is ten thousand dollars. So buying often asks for far more money up front.",
        "simpler": "First, the money you need to get started is very different. Renting usually means a deposit and maybe one month of rent. Buying means a down payment, which is part of the home's price. On a two hundred thousand dollar home, twenty percent down is forty thousand dollars, and five percent down is ten thousand dollars. So buying usually needs much more cash at the start.",
        "deeper": "Consider the entry cost asymmetry. A rental typically requires a refundable security deposit plus initial rent, a relatively modest sum. A purchase requires a down payment expressed as a percentage of the purchase price. On a two hundred thousand dollar home, the Consumer Financial Protection Bureau illustrates that twenty percent equals forty thousand dollars and five percent equals ten thousand dollars. The down payment percentage also interacts with later costs, which we will examine next, so the figure is not merely a one-time hurdle but a structural choice."
      },
      {
        "id": "renting-vs-buying-s2",
        "name": "Closing costs and mortgage insurance",
        "secs": 19,
        "core": true,
        "say": "Buying carries more than a down payment. There are also closing costs, which is money set aside for the many fees of finalizing a purchase, along with moving costs and early repairs. And if your down payment is below twenty percent, your lender may require you to pay for mortgage insurance. None of this is meant to scare you. It simply helps to know the full picture before you compare a monthly rent to a monthly mortgage payment.",
        "simpler": "Buying is not just the down payment. You also pay closing costs, which cover the many fees to finish the deal, plus moving and early repairs. And if you put down less than twenty percent, your lender may make you pay for mortgage insurance. This is not to worry you. It just helps to see the whole cost before comparing rent to a mortgage.",
        "deeper": "Beyond the down payment, a purchase incurs closing costs, a category covering the fees required to finalize the transaction, as well as moving expenses and near-term repairs. The Consumer Financial Protection Bureau also notes that when a down payment falls below twenty percent, the lender may require mortgage insurance, which adds to the monthly obligation. The analytical point is that a like-for-like comparison must place total carrying costs of ownership against rent, not merely principal and interest against rent."
      },
      {
        "id": "renting-vs-buying-s3",
        "name": "The ongoing costs of owning",
        "secs": 20,
        "core": true,
        "say": "Owning a home brings costs that continue every year. As a homeowner you pay property taxes, homeowners and other insurance, water, and other utilities. The Consumer Financial Protection Bureau notes these costs can be higher than what you paid as a renter, and they may rise over the life of the loan. When you rent, some of these costs are often included or handled by the landlord, which can make budgeting simpler.",
        "simpler": "Owning a home costs money every year, not just at the start. Homeowners pay property taxes, insurance, water, and utilities. These can be more than what you paid while renting, and they can go up over time. When you rent, the landlord often covers some of these, so your budget can be easier to plan.",
        "deeper": "Ownership introduces a recurring cost structure: property taxes, homeowners and other insurance, water, and utilities. The Consumer Financial Protection Bureau observes that these may exceed prior rental costs and can increase over the term of the mortgage. Renting frequently bundles or externalizes some of these expenses to the landlord, reducing variance in the tenant's monthly outlay. This distinction matters for cash-flow predictability, not only for total cost, and is often underweighted when people compare headline rent and mortgage figures."
      },
      {
        "id": "renting-vs-buying-s4",
        "name": "Who fixes the leaky faucet",
        "secs": 18,
        "core": false,
        "say": "Here is a difference people feel day to day: maintenance. When you own, you are responsible for repairs, from a small leaky faucet to a major job like replacing a roof. Because of this, the Consumer Financial Protection Bureau suggests building an emergency fund for unexpected expenses. When you rent, the landlord usually handles repairs, which trades some control for less responsibility and fewer surprise bills.",
        "simpler": "Here is a difference you notice in daily life: repairs. When you own, fixing things is on you, from a small leaky faucet to a big job like a new roof. So it helps to keep an emergency fund. When you rent, the landlord usually fixes things, so you have less control but also fewer surprise repair bills.",
        "deeper": "Maintenance responsibility is a defining practical distinction. Ownership transfers the full repair burden to the occupant, spanning minor fixes such as a leaky faucet to major capital expenditures such as roof replacement. The Consumer Financial Protection Bureau accordingly recommends an emergency reserve for unexpected expenses. Renting shifts this risk and effort to the landlord. The tradeoff is one of control versus exposure: owners gain authority over the property but absorb its repair liability and timing risk, while renters cede control in exchange for insulation from those costs."
      },
      {
        "id": "renting-vs-buying-s5",
        "name": "Building equity over time",
        "secs": 19,
        "core": true,
        "say": "Now for something often called the upside of buying: equity. Equity is the value of your home minus the amount you owe on your mortgage. As you pay down the loan, and if the home holds or grows in value, your equity can grow too. When you rent, your payments go to your landlord rather than building this kind of ownership. That is a real difference, though it is only one part of the whole picture.",
        "simpler": "Now for a common reason people buy: equity. Equity is your home's value minus what you still owe on the mortgage. As you pay down the loan, and if the home keeps its value, your equity can grow. When you rent, that money goes to the landlord instead. That is a real difference, but it is just one piece of the decision.",
        "deeper": "Equity is defined by the Consumer Financial Protection Bureau as the value of your home minus the amount you owe on your mortgage. It can accumulate through two mechanisms: amortization, as principal is repaid, and appreciation, if the property holds or gains value. Rent payments do not generate this ownership stake. However, equity is not guaranteed, since home values can also decline, and it is illiquid relative to other assets. It is therefore one meaningful factor among several, not a standalone case for buying."
      },
      {
        "id": "renting-vs-buying-s6",
        "name": "Flexibility and how long you stay",
        "secs": 20,
        "core": false,
        "say": "Time matters more than people expect. Buying and selling a home are expensive processes involving many fees, taxes, and commissions. Because of that, it often helps to plan to stay long enough for those costs to be worthwhile. Renting tends to offer more flexibility to move for a job, a relationship, or simply a change of heart. So part of this choice is honestly asking how settled your life feels right now.",
        "simpler": "Time matters a lot here. Buying and then selling a home costs a lot in fees, taxes, and commissions. So it usually helps to plan on staying long enough to make those costs worth it. Renting makes it easier to move for a job, a partner, or just a fresh start. So part of choosing is being honest about how settled you feel right now.",
        "deeper": "Time horizon is a central variable. The Consumer Financial Protection Bureau emphasizes that buying and selling are expensive processes involving fees, taxes, and commissions, which implies a breakeven period one must clear for ownership to be economically sensible. Renting preserves optionality, the ability to relocate cheaply for employment, relationships, or preference. The decision thus partly reduces to an honest estimate of locational and life stability, since a short expected tenure can make the transaction costs of ownership difficult to recover."
      },
      {
        "id": "renting-vs-buying-s7",
        "name": "Steady income and qualifying",
        "secs": 17,
        "core": false,
        "say": "One more practical note. To get a mortgage, lenders look at your ability to repay and your history of paying bills on time. So buying often asks for stable income and reasonably healthy credit. Renting can also involve checks, but the bar for a long-term loan is usually higher. There is no shame in either situation; it simply shapes which path is realistic for you right now.",
        "simpler": "One more practical point. To get a mortgage, lenders check whether you can repay it and whether you pay bills on time. So buying usually needs steady income and decent credit. Renting can have checks too, but a long loan usually asks for more. Neither situation is anything to be ashamed of. It just affects what is realistic for you now.",
        "deeper": "Mortgage qualification adds an underwriting dimension absent from most rentals. Lenders assess capacity to repay and credit history, so ownership typically presupposes stable income and reasonably sound credit. Rental applications may involve screening as well, but the threshold for a multi-year secured loan is generally higher and more documentation-intensive. This is a gating factor rather than a value judgment: it determines feasibility and terms, and it can shift over time as income and credit profiles change."
      },
      {
        "id": "renting-vs-buying-s8",
        "name": "Gently closing",
        "secs": 16,
        "core": false,
        "say": "Let us close with a breath. Renting and buying are simply two different tools, each suited to different lives and seasons. Whatever you choose can be wise if it fits your real situation. Please remember that this is general educational information, not financial advice. For a decision this personal, it is worth talking with a licensed professional, such as a housing counselor or financial advisor, who can look at your specific circumstances.",
        "simpler": "Let us finish with a calm breath. Renting and buying are just two different tools, each good for different lives and times. Whatever you pick can be smart if it truly fits your situation. Please remember this is general learning, not financial advice. For something this personal, talk with a licensed professional, like a housing counselor or financial advisor, who can look at your own details.",
        "deeper": "To conclude: framing renting and buying as competing tools rather than ranked outcomes leads to better-aligned decisions, because each optimizes for different priorities across different life stages. A choice that fits your actual constraints and goals is a sound one. This lesson is general educational information and not financial advice. Given the magnitude and personal nature of housing decisions, consulting a licensed professional, such as a housing counselor or financial advisor, who can evaluate your specific circumstances is the prudent next step."
      }
    ]
  },
  "building-credit-from-scratch": {
    "id": "building-credit-from-scratch",
    "title": "Building Credit From Scratch",
    "topic": "building-credit-from-scratch",
    "blurb": "A gentle, step-by-step look at how to begin a credit history when you have little or none yet, using safe and well-established tools.",
    "takeaways": [
      "Credit history is built mainly by borrowing a small amount and paying it back on time, every time, so lenders can see a track record.",
      "A secured credit card lets you put down a cash deposit, then borrow against it, which is a common starting point when you have no history.",
      "A credit-builder loan from a bank or credit union helps you build credit and savings together, usually paid back in small amounts over six to twenty-four months.",
      "Becoming an authorized user on a trusted person's well-managed account is another recognized path to start a credit record.",
      "This lesson is general educational information, not financial advice; a licensed professional can help with your personal situation."
    ],
    "yearLabel": "",
    "sources": [
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "What are some ways to start or rebuild a good credit history?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-are-some-ways-to-start-or-rebuild-a-good-credit-history-en-2155/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "What is a credit score?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-score-en-315/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Targeting credit builder loans (research report)",
        "url": "https://www.consumerfinance.gov/data-research/research-reports/targeting-credit-builder-loans/",
        "year": "2020"
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "Becoming Credit Visible (Data Point)",
        "url": "https://files.consumerfinance.gov/f/documents/BecomingCreditVisible_Data_Point_Final.pdf",
        "year": "2017"
      }
    ],
    "segments": [
      {
        "id": "building-credit-from-scratch-s0",
        "name": "Starting from zero is normal",
        "secs": 18,
        "core": true,
        "say": "Welcome. If you have little or no credit history, you are in good company, and there is nothing wrong with starting from zero. Credit is simply a record of how you borrow money and pay it back. In this lesson we will walk gently through a few well-known, safe ways to begin building that record, one small, steady step at a time.",
        "simpler": "Lots of people start with no credit, and that is totally fine. Credit is just a record of money you borrow and pay back. We will go through a few safe ways to start building it, slowly and calmly.",
        "deeper": "A thin or nonexistent credit file is a common and expected starting condition, not a defect. Credit history is the documented record of how you manage borrowed funds over time. This lesson surveys established, low-risk methods for establishing an initial credit record through deliberate, incremental activity rather than any single shortcut."
      },
      {
        "id": "building-credit-from-scratch-s1",
        "name": "What a credit score reflects",
        "secs": 19,
        "core": true,
        "say": "A credit score is a prediction of how likely you are to pay a loan back on time, based on information in your credit reports. According to the Consumer Financial Protection Bureau, most credit scores range from three hundred to eight hundred fifty. The score is built from things like your bill-paying history, so a steady record of paying on time is one of the most important pieces you can create.",
        "simpler": "A credit score is a number that guesses how likely you are to pay back what you borrow. Most scores fall between three hundred and eight fifty. A big part of it is whether you pay your bills on time, so paying on time really matters.",
        "deeper": "A credit score is a model-derived prediction of repayment behavior, computed by a scoring model from the data in your credit reports. The Consumer Financial Protection Bureau notes that most scores fall within a three hundred to eight hundred fifty range, and that bill-paying history is among the factors these models weigh. Because payment history is so central, a consistent on-time record is the highest-leverage input an early borrower can establish."
      },
      {
        "id": "building-credit-from-scratch-s2",
        "name": "Secured credit cards",
        "secs": 20,
        "core": true,
        "say": "One common first step is a secured credit card. The Consumer Financial Protection Bureau explains that you put in an amount of cash, for example five hundred dollars, and then you can spend up to that amount on the card. Your deposit acts as a safety net for the lender, which makes you easier to approve. As you use it modestly and pay the bill on time, that activity helps you build a positive history.",
        "simpler": "A secured credit card is a good first step. You put down some cash, like five hundred dollars, and then you can spend up to that much on the card. Because your deposit backs it up, you are easier to approve. Use it a little and pay on time, and you start building good credit.",
        "deeper": "A secured credit card requires a refundable cash deposit, for instance five hundred dollars, which typically sets your available credit line. Because the deposit collateralizes the account, issuers face reduced risk and approval is more accessible to applicants without history. The card otherwise functions normally; modest utilization paired with on-time repayment generates the positive payment record that scoring models reward."
      },
      {
        "id": "building-credit-from-scratch-s3",
        "name": "Credit-builder loans",
        "secs": 21,
        "core": true,
        "say": "Another gentle tool is a credit-builder loan. The Consumer Financial Protection Bureau describes it as a way to build credit and savings at the same time, through a loan from your bank or credit union that you pay back in small payments, usually over six to twenty-four months. In a twenty twenty research report, the Bureau found these loans were especially helpful for people who started out without existing debt.",
        "simpler": "A credit-builder loan helps you build credit and savings together. Your bank or credit union sets up the loan, and you pay it back in small amounts, usually over six to twenty-four months. A government study from twenty twenty found it worked especially well for people who had no other debt to start with.",
        "deeper": "A credit-builder loan inverts the usual sequence: the institution holds the loaned funds, often in a locked savings account, while you repay in small installments, typically across six to twenty-four months, so you accumulate savings as you establish payment history. A twenty twenty Consumer Financial Protection Bureau research report found the product was particularly effective for participants who entered without existing debt, both in establishing a score and improving it."
      },
      {
        "id": "building-credit-from-scratch-s4",
        "name": "Becoming an authorized user",
        "secs": 19,
        "core": true,
        "say": "You can also become an authorized user on someone else's credit card, such as a trusted family member with a well-managed account. The Consumer Financial Protection Bureau's research on how people become credit visible notes that many consumers establish their first credit record with the help of someone else, including as an authorized user. Choose this only with someone whose payment habits you trust, since their handling of the account can affect you.",
        "simpler": "You can be added as an authorized user on a trusted person's credit card, like a family member who pays well. Government research shows many people get their first credit record this way. Only do this with someone you trust to pay on time, because how they manage the card can affect you too.",
        "deeper": "Authorized-user status lets a primary cardholder add you to an account, after which its history may be reported under your name as well. Consumer Financial Protection Bureau research on the transition out of credit invisibility indicates that many consumers acquire their first credit record with another person's help, including via authorized-user arrangements. Because the primary holder's payment behavior and utilization can flow onto your file, the counterparty's reliability is the decisive consideration."
      },
      {
        "id": "building-credit-from-scratch-s5",
        "name": "On-time payments are the engine",
        "secs": 18,
        "core": true,
        "say": "Whichever tool you choose, the engine underneath all of them is the same: paying on time, every time. The Consumer Financial Protection Bureau emphasizes that paying on time helps you build a strong credit history and can lower your costs of borrowing in the future. Even small payments count, so it is often wise to start with amounts you know you can comfortably repay.",
        "simpler": "No matter which option you pick, the real key is paying on time, every single time. The government says this builds strong credit and can make borrowing cheaper later. Even small payments count, so start with amounts you know you can easily pay back.",
        "deeper": "Across every instrument, consistent on-time repayment is the common mechanism that drives positive outcomes. The Consumer Financial Protection Bureau stresses that paying on time builds a strong credit history and can reduce future borrowing costs. Since the behavior matters more than the amount, sizing obligations to your reliable cash flow protects the very payment record you are working to establish."
      },
      {
        "id": "building-credit-from-scratch-s6",
        "name": "Where your activity is recorded",
        "secs": 17,
        "core": false,
        "say": "Your payments are reported to the three nationwide credit reporting companies, which build the credit reports that scores draw from. Not every product reports to all three, so when you choose a card or loan it is reasonable to ask whether and where your payments will be reported. Reporting is what turns your steady habits into a visible track record.",
        "simpler": "Your payments get reported to the three big national credit reporting companies, and those reports are what scores are based on. Not every card or loan reports to all three, so it is fair to ask before you sign up. Reporting is how your good habits actually show up.",
        "deeper": "Payment activity is furnished to the three nationwide consumer reporting agencies, whose reports supply the underlying data for scoring models. Furnishing practices vary by product, so confirming whether and to which agencies a card or loan reports is a reasonable diligence step before opening it. Without furnishing, otherwise exemplary repayment behavior simply does not become part of your visible credit record."
      },
      {
        "id": "building-credit-from-scratch-s7",
        "name": "A patient, kind close",
        "secs": 16,
        "core": false,
        "say": "Building credit from scratch is a patient process, and steady small steps add up over months, not days. Be gentle with yourself as the record grows. Please remember that this is general educational information, not financial advice. For decisions about your own situation, it is best to talk with a licensed professional you trust.",
        "simpler": "Building credit takes patience, and small steady steps add up over months, not days. Go easy on yourself as it grows. Remember, this is just general learning, not financial advice. For your own situation, talk with a licensed professional you trust.",
        "deeper": "Establishing a credit file is inherently gradual; meaningful history accrues over months of consistent activity rather than abruptly. Approach the process with self-compassion as the record matures. This material is general educational information and not financial advice; for choices specific to your circumstances, consult a qualified, licensed professional."
      }
    ]
  },
  "debt-collection-rights": {
    "id": "debt-collection-rights",
    "title": "Your Debt Collection Rights",
    "topic": "debt-collection-rights",
    "blurb": "A calm, plain-language tour of the federal protections you have when a debt collector reaches out, so you can respond from a place of knowing rather than worry.",
    "takeaways": [
      "The Fair Debt Collection Practices Act limits how third-party collectors may treat you, and the Consumer Financial Protection Bureau enforces it.",
      "Generally a collector may not contact you before eight in the morning or after nine at night, and may not harass, threaten, or lie to you.",
      "A collector must send you validation information, usually in its first message or within five days, so you can tell whether the debt is really yours.",
      "If you dispute the debt in writing within thirty days, the collector must pause collecting the disputed amount until it sends you verification.",
      "If something feels wrong, you can ask the collector to stop contacting you in writing and report problems to the Consumer Financial Protection Bureau."
    ],
    "yearLabel": "2021",
    "sources": [
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "What laws limit what debt collectors can say or do?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-laws-limit-what-debt-collectors-can-say-or-do-en-329/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "What information does a debt collector have to give me about a debt they're trying to collect from me?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/what-information-does-a-debt-collector-have-to-give-me-about-the-debt-en-331/",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "When and how often can a debt collector call me on the phone?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/when-and-how-often-can-a-debt-collector-call-me-on-the-phone-en-2110/",
        "year": "2021"
      }
    ],
    "segments": [
      {
        "id": "debt-collection-rights-s0",
        "name": "You have rights here",
        "secs": 18,
        "core": true,
        "say": "If a debt collector has reached out to you, take a breath, because you are not without protections. In the United States, a federal law called the Fair Debt Collection Practices Act sets firm rules for how third-party collectors may treat you. In this lesson we will gently walk through what collectors may not do, the information they must give you, and how you can ask them to prove a debt is really yours.",
        "simpler": "Getting a call or letter from a debt collector can feel scary, but you are not powerless. A federal law called the Fair Debt Collection Practices Act protects you. Here we will look at what collectors are not allowed to do, what they have to tell you, and how to ask them to prove the debt.",
        "deeper": "The Fair Debt Collection Practices Act, often abbreviated FDCPA, is the principal federal statute governing the conduct of third-party debt collectors. It establishes consumer protections that operate regardless of whether the underlying debt is valid, and it frames collection as a regulated activity rather than an unconstrained one. This lesson surveys three pillars: prohibited conduct, the collector's affirmative disclosure duties, and your right to dispute and demand verification."
      },
      {
        "id": "debt-collection-rights-s1",
        "name": "Who the law covers",
        "secs": 16,
        "core": false,
        "say": "These rules apply mainly to companies that collect debts for someone else, such as collection agencies and many debt buyers. The Consumer Financial Protection Bureau, a federal agency, writes the detailed rules and helps enforce this law. Knowing that an agency stands behind these protections can make it easier to speak up when something does not feel right.",
        "simpler": "These rules mostly cover businesses that collect debts owed to other people, like collection agencies. A government agency called the Consumer Financial Protection Bureau makes the detailed rules and helps enforce them. So there is a real agency on your side if a collector crosses a line.",
        "deeper": "The FDCPA principally regulates third-party debt collectors, including collection agencies and many debt buyers, rather than original creditors collecting their own accounts in their own name. The Consumer Financial Protection Bureau holds rulemaking and, for entities within its jurisdiction, supervisory and enforcement authority. Understanding which actors fall within the statute's scope helps you calibrate which protections apply to a given contact."
      },
      {
        "id": "debt-collection-rights-s2",
        "name": "When they may contact you",
        "secs": 18,
        "core": false,
        "say": "A collector generally may not contact you at a time or place they know is inconvenient for you. Unless you have agreed otherwise, that usually means no contact before eight in the morning or after nine at night, in your local time. If your employer does not allow these kinds of personal contacts at work and the collector knows that, they should not reach you there either.",
        "simpler": "Collectors cannot contact you at times or places they know are bad for you. Usually that means not before eight in the morning and not after nine at night, your time, unless you said it was okay. And if your job does not allow these contacts at work, and they know that, they should not contact you there.",
        "deeper": "The statute presumes that contact before eight in the morning or after nine in the evening, in the consumer's local time, is at an inconvenient time absent the consumer's agreement, and it likewise restricts contact at any time or place the collector knows or should know is inconvenient. Workplace contact is constrained where the collector knows or has reason to know the employer prohibits such personal communications. These are default rules; a consumer's express consent can alter the permissible window."
      },
      {
        "id": "debt-collection-rights-s3",
        "name": "How often they may call",
        "secs": 18,
        "core": true,
        "say": "There are also limits on how often a collector may call. Under the Consumer Financial Protection Bureau's Debt Collection Rule, which took effect in late twenty twenty-one, a collector is presumed to be breaking the rules if it calls you more than seven times within a seven-day period about a particular debt, or if it calls you again within seven days after it actually spoke with you by phone about that debt.",
        "simpler": "There are limits on how many times a collector can call. Under a rule that started in late twenty twenty-one, a collector is presumed to be breaking the rules if it calls you more than seven times in seven days about one debt, or calls you again within seven days after it already talked to you on the phone about that debt.",
        "deeper": "The Debt Collection Rule, effective November thirtieth, twenty twenty-one, operationalizes the statutory prohibition on repeated or continuous telephone contact through a rebuttable presumption. A collector is presumed to violate the rule if, regarding a particular debt, it places more than seven calls within seven consecutive calendar days, or places any call within seven consecutive calendar days after a telephone conversation about that debt. The presumption is a compliance benchmark rather than an absolute numeric ceiling, but it gives consumers a concrete reference point."
      },
      {
        "id": "debt-collection-rights-s4",
        "name": "What they may never do",
        "secs": 20,
        "core": true,
        "say": "No matter the amount owed, a collector may not harass, oppress, or abuse you. They may not use threats of violence, obscene language, or repeated calls meant to annoy you. They may not lie, for example by misstating how much you owe, pretending to be an attorney or a government official, or falsely threatening arrest or legal action they do not intend to take. Harassment and deception are simply not allowed.",
        "simpler": "No matter how much you owe, a collector cannot harass or abuse you. They cannot threaten violence, swear at you, or call over and over just to bother you. They cannot lie, like saying you owe more than you do, pretending to be a lawyer or the government, or falsely saying you will be arrested. That behavior is against the rules.",
        "deeper": "The FDCPA prohibits conduct that is harassing, oppressive, or abusive, including threats of violence, use of obscene or profane language, and telephone calls placed repeatedly with intent to annoy. Separately, it bars false, deceptive, or misleading representations, such as misstating the character or amount of the debt, falsely implying attorney or governmental affiliation, or threatening action, including arrest or litigation, that is unlawful or not actually intended. These prohibitions hold irrespective of the debt's validity."
      },
      {
        "id": "debt-collection-rights-s5",
        "name": "The validation notice",
        "secs": 18,
        "core": true,
        "say": "You also have a right to know what you are being asked to pay. A collector must give you validation information, usually in its first message to you or within five days of first contacting you. This notice should identify the collector, name the creditor, show the amount and an itemization of the debt, and explain how to dispute it. It exists so you can tell whether the debt is really yours.",
        "simpler": "You have a right to know what the debt is. A collector has to give you validation information, usually in its first message or within five days of first contacting you. It should say who the collector is, who the original lender is, how much the debt is and a breakdown of it, and how to dispute it. This helps you check whether the debt is even yours.",
        "deeper": "The collector must furnish validation information, either within the initial communication or in writing within five days thereafter. Required disclosures include identification of the collector and the creditor, the amount of the debt with an itemization reflecting interest, fees, payments, and credits since an itemization date, and instructions for disputing the debt or requesting the original creditor's identity. The notice's purpose is to enable the consumer to recognize and, where appropriate, contest the alleged obligation."
      },
      {
        "id": "debt-collection-rights-s6",
        "name": "Disputing a debt",
        "secs": 20,
        "core": true,
        "say": "If a debt does not look right, you can dispute it. If you send the collector a written dispute or a request for verification within thirty days of receiving the validation information, the collector must pause collecting the amount you are disputing until it has adequately responded to your request. Putting your dispute in writing, and keeping a copy, gives you a clear record and triggers this important protection.",
        "simpler": "If the debt looks wrong, you can dispute it. If you send the collector a written dispute or ask them to verify the debt within thirty days of getting the validation information, they have to stop collecting the disputed amount until they properly answer you. Write it down and keep a copy, so you have a record and get this protection.",
        "deeper": "Upon receipt of the validation information, the consumer has a thirty-day window to dispute the debt or request verification in writing. A timely written dispute obligates the collector to cease collection of the disputed amount until it provides verification, such as a copy of a judgment or the creditor's identity, adequately responding to the request. Documenting the dispute in writing both preserves an evidentiary record and is the act that activates the collector's pause-and-verify obligation."
      },
      {
        "id": "debt-collection-rights-s7",
        "name": "Asking them to stop",
        "secs": 16,
        "core": false,
        "say": "You can also tell a collector to stop contacting you. If you make that request in writing, the collector generally must stop, though they may still contact you once to confirm they will stop or to tell you about a specific action they intend to take. Remember that asking them to stop contacting you does not by itself make the debt go away, so it is worth understanding your options first.",
        "simpler": "You can tell a collector to stop contacting you. If you ask in writing, they generally have to stop, though they can reach out one more time to confirm they will stop or to tell you about a specific step they plan to take. But asking them to stop does not erase the debt, so it helps to know your options first.",
        "deeper": "A consumer may invoke a cease-communication right by notifying the collector in writing to stop contact. Thereafter the collector must generally refrain from further communication, subject to narrow exceptions, such as a single notice confirming cessation or advising of a specific remedy the collector intends to invoke. Crucially, this right governs communication, not the underlying liability; exercising it neither extinguishes the debt nor halts other lawful collection avenues the creditor may pursue."
      },
      {
        "id": "debt-collection-rights-s8",
        "name": "A gentle close",
        "secs": 16,
        "core": false,
        "say": "So when a collector reaches out, you have real protections: limits on when and how often they may contact you, a ban on harassment and deception, and the right to ask them to prove the debt. Please keep in mind that this is general educational information, not financial or legal advice. For your own situation, it is wise to talk with a licensed professional, such as a consumer attorney or a reputable nonprofit counselor.",
        "simpler": "So if a collector contacts you, you have real protections: limits on when and how often they can reach you, a ban on harassment and lies, and the right to make them prove the debt. Just remember this is general learning, not financial or legal advice. For your own situation, it is smart to talk with a licensed professional, like a consumer lawyer or a trusted nonprofit counselor.",
        "deeper": "To summarize, the FDCPA framework gives consumers temporal and frequency limits on contact, prohibitions against harassment and deceptive representations, and procedural rights to validation, dispute, and cessation of communication. This overview is general educational information and not financial or legal advice. Because application turns on specific facts, jurisdiction, and the type of debt, consulting a licensed professional, such as a consumer-protection attorney or an accredited nonprofit credit counselor, is the prudent course for any personal decision."
      }
    ]
  },
  "employer-401k-and-match": {
    "id": "employer-401k-and-match",
    "title": "Your 401(k) and the Match",
    "topic": "employer-401k-and-match",
    "blurb": "A gentle, plain-language tour of how a workplace 401(k) works, what an employer match is, and how vesting and the traditional versus Roth choice shape your savings.",
    "takeaways": [
      "A 401(k) lets you save for retirement straight from your paycheck, and the money you put in is always one hundred percent yours.",
      "Many employers match part of what you contribute, so saving at least enough to earn the full match is a kind thing to do for your future self.",
      "Employer contributions can follow a vesting schedule, meaning their portion becomes fully yours only after you have worked there for a set time.",
      "A traditional 401(k) is funded with pre-tax money and taxed when you withdraw it; a Roth 401(k) is funded with after-tax money so qualified withdrawals are generally tax-free.",
      "This is general educational information, not financial advice, and a licensed professional can help with your personal situation."
    ],
    "yearLabel": "2025",
    "sources": [
      {
        "org": "Internal Revenue Service",
        "title": "401(k) plan overview",
        "url": "https://www.irs.gov/retirement-plans/plan-sponsor/401k-plan-overview",
        "year": ""
      },
      {
        "org": "Internal Revenue Service",
        "title": "Retirement topics - Vesting",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-vesting",
        "year": ""
      },
      {
        "org": "Internal Revenue Service",
        "title": "Retirement topics - 401(k) and profit-sharing plan contribution limits",
        "url": "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits",
        "year": "2025"
      },
      {
        "org": "U.S. Securities and Exchange Commission (Investor.gov)",
        "title": "Traditional and Roth 401(k) Plans",
        "url": "https://www.investor.gov/additional-resources/retirement-toolkit/employer-sponsored-plans/traditional-and-roth-401k-plans",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "My kids are asking about whether to enroll in their employer's 401(k)s. What should I tell them?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/my-kids-are-asking-about-whether-to-enroll-in-their-employers-401ks-what-should-i-tell-them-en-1655/",
        "year": ""
      }
    ],
    "segments": [
      {
        "id": "employer-401k-and-match-s0",
        "name": "Welcome",
        "secs": 16,
        "core": true,
        "say": "Welcome. Today we will gently walk through your workplace four oh one k. It can sound like a wall of numbers and letters, but at heart it is simply a way to save for retirement straight from your paycheck. We will take it one calm step at a time, with no pressure and no jargon left unexplained.",
        "simpler": "Hi there. A four oh one k is just a savings account for retirement that takes money out of your paycheck for you. It sounds complicated, but we will go slow and explain everything.",
        "deeper": "Welcome. A four oh one k is an employer-sponsored, tax-advantaged retirement plan named after a section of the Internal Revenue Code. It belongs to the family of defined contribution plans, meaning your future balance depends on what is contributed and how the investments perform, rather than a fixed promised benefit. We will unpack each moving part deliberately."
      },
      {
        "id": "employer-401k-and-match-s1",
        "name": "How contributions work",
        "secs": 18,
        "core": true,
        "say": "Here is the basic idea. You choose a percentage of your pay to set aside, and your employer routes that money into your four oh one k before it ever reaches your bank account. This is called an elective deferral. Because it happens automatically through payroll, saving becomes a quiet habit rather than a monthly decision you have to make.",
        "simpler": "You pick how much of each paycheck to save, and your job sends that part into your four oh one k automatically. Since it happens on its own, you do not have to remember to save each time.",
        "deeper": "You elect a contribution rate, and your employer withholds that amount through payroll deductions and deposits it into your account. The Internal Revenue Service calls these elective deferrals. Automating the deferral leverages inertia in your favor: the default behavior becomes saving, which research in behavioral economics associates with higher participation, though specific figures are beyond this lesson."
      },
      {
        "id": "employer-401k-and-match-s2",
        "name": "Your money is always yours",
        "secs": 15,
        "core": true,
        "say": "One reassuring point to hold onto. The money you contribute yourself, your own elective deferrals, is always one hundred percent vested. That means it is fully yours from the very first day, no matter how long you stay with the company or when you decide to leave.",
        "simpler": "The money you put in yourself is always yours, completely. Even if you quit tomorrow, you get to keep every dollar you contributed.",
        "deeper": "Your own elective deferrals are, by law, one hundred percent vested and nonforfeitable at all times. Vesting refers to nonforfeitable ownership. Regardless of tenure or the manner of your separation from the employer, the principal you deferred, along with its associated investment gains or losses, remains entirely yours."
      },
      {
        "id": "employer-401k-and-match-s3",
        "name": "The employer match",
        "secs": 19,
        "core": true,
        "say": "Now to the part many people love most, the match. As a benefit, some employers will match a portion of what you contribute, adding their own money on top of yours. Because of this, it is often wise to save at least enough to earn the full matching contribution your employer offers. Skipping it is a little like leaving part of your pay on the table.",
        "simpler": "Some employers add their own money to match part of what you save. That is free money for your future, so it is smart to save at least enough to get the full match they offer.",
        "deeper": "Many employers offer matching contributions as an incentive, contributing a defined amount keyed to your elective deferrals, for example a percentage of the first several percent of pay you defer. Contributing at least up to the match threshold captures the full employer incentive; saving below it forgoes compensation you are otherwise entitled to receive."
      },
      {
        "id": "employer-401k-and-match-s4",
        "name": "Understanding vesting",
        "secs": 20,
        "core": true,
        "say": "Here is one gentle catch with employer money. Their contributions can come with a vesting schedule, which decides when their portion truly becomes yours. With cliff vesting, you own all of it at once after a set period, such as three years. With graded vesting, you own a growing slice each year, often reaching full ownership by around six years of service.",
        "simpler": "The money your employer adds may take time to fully become yours. Sometimes you get it all at once after a few years. Other times you earn a bigger share each year until it is all yours, often by about six years.",
        "deeper": "Employer contributions may be subject to a vesting schedule that renders their portion nonforfeitable only after a period of service. Under cliff vesting, the employee becomes fully vested abruptly after a defined interval, such as three years. Under graded vesting, the vested percentage rises incrementally with each year of service, with a maximum graded schedule extending across six years; employees must in any case be fully vested by the plan's normal retirement age."
      },
      {
        "id": "employer-401k-and-match-s5",
        "name": "Traditional versus Roth",
        "secs": 20,
        "core": true,
        "say": "Your four oh one k may also offer two flavors. A traditional four oh one k uses pre-tax money, so you lower your taxable income now and pay taxes later when you withdraw. A Roth four oh one k uses after-tax money, so there is no break today, but qualified withdrawals later are generally tax-free. With traditional, the tax benefit is now; with Roth, it comes later.",
        "simpler": "There are two types. Traditional means you skip taxes now but pay them when you take the money out. Roth means you pay taxes now but take the money out tax-free later. One helps you now, the other helps you later.",
        "deeper": "Plans may permit pre-tax deferrals, designated Roth deferrals, or both. Traditional pre-tax contributions reduce current taxable income, and both contributions and earnings are taxed upon distribution. Designated Roth contributions are included in taxable income in the year deferred, while qualified distributions of contributions and earnings are generally tax-free. The choice hinges on expectations about current versus future tax circumstances."
      },
      {
        "id": "employer-401k-and-match-s6",
        "name": "How much you can save",
        "secs": 19,
        "core": false,
        "say": "There are yearly limits on how much you can defer, and they tend to rise over time. For twenty twenty-five, the employee deferral limit is twenty-three thousand five hundred dollars, with an extra catch-up of seven thousand five hundred dollars if you are fifty or older. For twenty twenty-six, those figures rise to twenty-four thousand five hundred and eight thousand dollars. Your plan documents will show the current numbers.",
        "simpler": "The government caps how much you can put in each year, and the cap usually grows. In twenty twenty-five it was twenty-three thousand five hundred dollars, plus more if you are fifty or older. Check your plan for this year's number.",
        "deeper": "Annual elective deferral limits are set by the Internal Revenue Service and adjusted for cost of living. For twenty twenty-five, the employee deferral limit is twenty-three thousand five hundred dollars, with a catch-up of seven thousand five hundred dollars for those aged fifty and over; for twenty twenty-six these rise to twenty-four thousand five hundred and eight thousand dollars respectively. Separate, higher overall limits govern combined employee and employer additions."
      },
      {
        "id": "employer-401k-and-match-s7",
        "name": "A calm close",
        "secs": 17,
        "core": false,
        "say": "Take a breath. You now understand the heart of it: contributions, the match, vesting, and the traditional versus Roth choice. Please remember that this is general educational information, not financial advice. For decisions about your own situation, it is wise and kind to yourself to talk with a licensed professional. You are doing a good thing by learning.",
        "simpler": "Nice work. You now know the main parts: what you put in, the match, when employer money becomes yours, and traditional versus Roth. This is just general learning, not advice. For your own choices, talk to a licensed professional.",
        "deeper": "You have now covered the core architecture of a workplace four oh one k: elective deferrals, employer matching, vesting schedules, and the traditional versus designated Roth distinction. This lesson is general educational information and not financial advice. For decisions calibrated to your personal tax position, time horizon, and goals, consult a licensed financial or tax professional."
      }
    ]
  },
  "saving-for-college-529": {
    "id": "saving-for-college-529",
    "title": "Saving for College with a 529",
    "topic": "saving-for-college-529",
    "blurb": "A gentle, plain-language tour of how 529 college savings plans work, what makes them tax-friendly, and how they fit alongside other ways to save.",
    "takeaways": [
      "A 529 is a tax-advantaged savings plan, authorized by Section 529 of the tax code, made to help families save for education.",
      "There are two main kinds: education savings plans, which invest your money, and prepaid tuition plans, which lock in tuition at participating schools.",
      "Money in a 529 grows free of federal income tax, and withdrawals are tax-free when used for qualified education expenses.",
      "Withdrawals not used for qualified expenses can owe income tax plus an additional ten percent federal penalty on the earnings.",
      "Plans charge fees that vary widely, so it helps to compare fee schedules and ask questions before choosing one."
    ],
    "yearLabel": "",
    "sources": [
      {
        "org": "U.S. Securities and Exchange Commission (Investor.gov)",
        "title": "An Introduction to 529 Plans — Investor Bulletin",
        "url": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/introduction-529-plans-investor-bulletin",
        "year": ""
      },
      {
        "org": "Internal Revenue Service",
        "title": "Topic no. 313, Qualified tuition programs (QTPs)",
        "url": "https://www.irs.gov/taxtopics/tc313",
        "year": ""
      },
      {
        "org": "Consumer Financial Protection Bureau",
        "title": "How much do 529 plans cost?",
        "url": "https://www.consumerfinance.gov/ask-cfpb/how-much-do-529-plans-cost-en-2080/",
        "year": ""
      }
    ],
    "segments": [
      {
        "id": "saving-for-college-529-s0",
        "name": "A warm welcome",
        "secs": 16,
        "core": true,
        "say": "Saving for school can feel like a big mountain, so let us take it one gentle step at a time. Today we will look at a tool called a five twenty-nine plan, a savings account built to help families set money aside for education. There is no pressure here, just a calm look at how it works.",
        "simpler": "Paying for college can feel overwhelming. We will slowly walk through one helpful tool, the 529 plan, which is a special account for saving toward school. Nothing to worry about, just learning together.",
        "deeper": "We are introducing the qualified tuition program, commonly called a 529 plan after the section of the Internal Revenue Code that authorizes it. Throughout this lesson we will frame it as one savings vehicle among several, examining its structure, its tax treatment, and the practical trade-offs a family might weigh."
      },
      {
        "id": "saving-for-college-529-s1",
        "name": "What a 529 is",
        "secs": 18,
        "core": true,
        "say": "A five twenty-nine plan is a tax-advantaged savings plan made to encourage saving for future education costs. It is named after Section five twenty-nine of the federal tax code, and these plans are sponsored by states, state agencies, or schools. In plain terms, it is a special account that the government gives helpful tax treatment so families can save a little more easily.",
        "simpler": "A 529 plan is a savings account with tax perks, created to help people save for school. It gets its name from a part of the tax law. States or schools run these plans.",
        "deeper": "A 529 plan is legally a qualified tuition program established and maintained by a state, a state agency, or an eligible educational institution under Section 529 of the Internal Revenue Code. Its defining feature is preferential federal tax treatment of investment earnings, which we will examine, granted in exchange for the funds being directed toward education."
      },
      {
        "id": "saving-for-college-529-s2",
        "name": "Two kinds of plans",
        "secs": 20,
        "core": true,
        "say": "There are two main types. An education savings plan lets you open an investment account that can grow over time for the beneficiary's future education. A prepaid tuition plan instead lets you buy units or credits now, at today's prices, to be used later at participating colleges. Each works differently, so it helps to know which one a plan offers.",
        "simpler": "There are two kinds of 529 plans. One is an investment account that can grow over time. The other lets you pay for tuition now at today's prices, to use later at certain colleges. They are not the same, so it is good to check which kind you are looking at.",
        "deeper": "Education savings plans are investment accounts whose value rises and falls with the chosen portfolios of mutual funds or similar holdings. Prepaid tuition plans are fundamentally different instruments: the account holder purchases units or credits at current rates for future use at participating institutions, effectively hedging against tuition inflation rather than seeking market returns. The two carry distinct risk profiles."
      },
      {
        "id": "saving-for-college-529-s3",
        "name": "The tax advantage",
        "secs": 20,
        "core": true,
        "say": "Here is the heart of why people use these plans. Money in a five twenty-nine grows free of federal income tax while it sits in the account. And when you take the money out for qualified education expenses, those earnings are not subject to federal income tax, and in many cases not to state tax either. That tax-free growth is the main draw.",
        "simpler": "The big reason people like 529 plans is taxes. The money grows without being taxed by the federal government while it is in the account. And when you use it for school, you usually do not pay tax on the growth. Sometimes you skip state tax too.",
        "deeper": "The core benefit is the tax-deferred, and ultimately tax-free, treatment of earnings. Investment gains accumulate without federal income tax inside the account, and qualified distributions escape federal income tax on those earnings entirely; many states extend parallel treatment. This compounding without an annual tax drag is the principal advantage 529 plans offer over fully taxable accounts."
      },
      {
        "id": "saving-for-college-529-s4",
        "name": "What counts as qualified",
        "secs": 20,
        "core": true,
        "say": "Qualified expenses are the costs the plan is meant for. They generally include tuition, fees, books, and room and board at eligible colleges and other postsecondary schools. Plans can also cover a limited amount of tuition each year at elementary or secondary schools, and those rules have changed in recent years, so it is worth checking the current limit. Knowing what qualifies helps the money go where it is meant to.",
        "simpler": "Qualified expenses are the things the plan is allowed to pay for. That usually means college tuition, fees, books, and room and board. You can also use a limited amount each year for kindergarten through twelfth grade tuition, though the exact limit has changed recently, so check what applies now. Knowing the rules helps you use the money the right way.",
        "deeper": "Qualified higher education expenses encompass tuition, mandatory fees, books, supplies, and room and board for beneficiaries enrolled at institutions eligible for federal student aid programs. A separate provision also permits a capped amount of elementary and secondary tuition per beneficiary each year; that cap has been revised by recent legislation, so the current statutory figure should be confirmed before relying on it. Definitions are specific, so confirming eligibility before withdrawing matters."
      },
      {
        "id": "saving-for-college-529-s5",
        "name": "If you use it elsewhere",
        "secs": 18,
        "core": false,
        "say": "Life changes, and sometimes plans do not go as expected. If you withdraw money and do not use it for qualified expenses, the earnings portion can be subject to state and federal income taxes, plus an additional ten percent federal tax penalty on those earnings. It is not the end of the world, but it is worth knowing before you take money out.",
        "simpler": "Sometimes plans change. If you take money out and do not spend it on school, the part that was growth may get taxed, and there is an extra ten percent federal penalty on that growth. Good to know before you withdraw.",
        "deeper": "Non-qualified distributions trigger ordinary income tax on the earnings portion at both the federal and, typically, state levels, plus an additional ten percent federal penalty assessed on those earnings. The contributions themselves, having been made with after-tax dollars, are returned without further tax. Certain exceptions to the penalty exist, but the general rule rewards keeping funds directed toward education."
      },
      {
        "id": "saving-for-college-529-s6",
        "name": "Fees and contributions",
        "secs": 19,
        "core": false,
        "say": "A couple of practical notes. Contributions to a five twenty-nine are not deductible on your federal taxes, though some states offer their own breaks. And plans charge fees that vary; for example, some charge an annual maintenance fee, often somewhere around ten to fifty dollars, along with management fees. Comparing fee schedules before you choose can make a real difference over time.",
        "simpler": "Two useful things to know. You do not get a federal tax deduction for putting money in, though some states give a break. And plans charge fees that differ a lot, like a yearly fee that is often roughly ten to fifty dollars. Comparing fees before you pick a plan can save you money.",
        "deeper": "Contributions are not federally deductible, since the benefit lies in tax-free growth rather than an upfront deduction, though many states grant a state-level deduction or credit. Cost structures vary considerably across plans and may include enrollment fees, annual maintenance fees often in the range of ten to fifty dollars, program management fees, and underlying asset management fees. Because fees compound against returns, comparing schedules is consequential."
      },
      {
        "id": "saving-for-college-529-s7",
        "name": "How it compares",
        "secs": 19,
        "core": false,
        "say": "A five twenty-nine is one tool among several. Its strength is tax-free growth when the money goes toward education. Other approaches, like a regular savings account or a brokerage account, may offer more flexibility for any purpose but without the same tax break. Many families weigh how certain they are about future schooling when they decide where to save.",
        "simpler": "A 529 is just one option. Its main strength is tax-free growth for school costs. A normal savings or investment account can be used for anything, but it does not have the same tax perk. People often think about how sure they are about future school plans when choosing.",
        "deeper": "Positioning the 529 against alternatives clarifies its trade-offs. Taxable brokerage and savings accounts offer unrestricted use but forfeit the tax-free compounding that a 529 provides for education. The 529's advantage is conditional on qualified use; its constraint is that misalignment with educational purposes invites tax and penalty. The optimal mix often turns on a family's confidence in future educational spending and desire for liquidity."
      },
      {
        "id": "saving-for-college-529-s8",
        "name": "A gentle close",
        "secs": 16,
        "core": false,
        "say": "Take a breath; you now understand the shape of a five twenty-nine plan. Remember this is general educational information, not financial advice, and everyone's situation is different. For decisions about your own money, it is wise to speak with a licensed professional who can look at your full picture. You are doing a kind thing by learning.",
        "simpler": "Nice work. You now know the basics of a 529 plan. This is just general learning, not financial advice, and every situation is different. For your own choices, it is smart to talk with a licensed professional who knows your details. Learning this is a caring step.",
        "deeper": "To summarize: the 529 plan offers tax-advantaged growth for education in exchange for directed use, with costs and rules that warrant comparison. This lesson is general educational information and not financial advice; individual circumstances, including state-specific provisions and personal goals, vary materially. Consulting a licensed financial professional or tax advisor for personalized guidance is the prudent next step."
      }
    ]
  },
  "gig-and-self-employment-taxes": {
    "id": "gig-and-self-employment-taxes",
    "title": "Taxes for Gig and Self-Employment",
    "topic": "gig-and-self-employment-taxes",
    "blurb": "A calm, plain-language walk through how taxes work when you earn money from gig work or working for yourself, so the season feels a little less daunting.",
    "takeaways": [
      "Income from gig work or self-employment is generally taxable even when no form arrives and even when you are paid in cash.",
      "A W-2 employee usually has tax withheld for them, while a 1099 independent contractor is typically responsible for handling their own taxes.",
      "Self-employment tax covers Social Security and Medicare at fifteen point three percent, applied to about ninety-two point three five percent of your net earnings.",
      "If you expect to owe one thousand dollars or more, you generally pay estimated tax in four installments across the year using Form 1040-ES.",
      "Keeping records of business expenses throughout the year can lower the income you are taxed on, so save your receipts as you go."
    ],
    "yearLabel": "2024",
    "sources": [
      {
        "org": "Internal Revenue Service",
        "title": "Gig economy tax center",
        "url": "https://www.irs.gov/businesses/gig-economy-tax-center",
        "year": ""
      },
      {
        "org": "Internal Revenue Service",
        "title": "Manage taxes for your gig work",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/manage-taxes-for-your-gig-work",
        "year": ""
      },
      {
        "org": "Internal Revenue Service",
        "title": "Self-employment tax (Social Security and Medicare taxes)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
        "year": "2024"
      },
      {
        "org": "Internal Revenue Service",
        "title": "Topic no. 554, Self-employment tax",
        "url": "https://www.irs.gov/taxtopics/tc554",
        "year": ""
      },
      {
        "org": "Internal Revenue Service",
        "title": "Estimated taxes",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes",
        "year": ""
      }
    ],
    "segments": [
      {
        "id": "gig-and-self-employment-taxes-s0",
        "name": "A gentler start",
        "secs": 18,
        "core": true,
        "say": "If you drive, deliver, freelance, sell, or take on side work, taxes can feel like a fog. Let us walk through it slowly and kindly. The goal here is not to make you an expert overnight, but to help the words and the steps feel familiar, so the season ahead feels a little lighter.",
        "simpler": "Doing gig or freelance work and worried about taxes? We will go through it slowly. By the end the basic steps should feel familiar, not scary.",
        "deeper": "Earnings from gig platforms, freelancing, contracting, and informal side work all fall under the broad category of self-employment income for federal tax purposes. This lesson orients you to the core concepts and vocabulary so that later, more detailed guidance becomes easier to follow."
      },
      {
        "id": "gig-and-self-employment-taxes-s1",
        "name": "Most of it is taxable",
        "secs": 18,
        "core": true,
        "say": "Here is the first thing the Internal Revenue Service wants people to know. Money you earn from gig work is generally taxable, and you are expected to report it on your tax return. That holds true even if no form shows up in the mail, even for part-time or side work, and even when you are paid in cash.",
        "simpler": "Almost all gig money counts for taxes. You report it even if you got no paperwork and even if you were paid in cash.",
        "deeper": "The IRS gig economy guidance states that income must be reported regardless of whether it appears on an information return, and regardless of whether it is paid in cash, property, goods, or virtual currency. The absence of a form does not remove the reporting obligation; it simply shifts more of the recordkeeping onto you."
      },
      {
        "id": "gig-and-self-employment-taxes-s2",
        "name": "Ten ninety-nine versus W-2",
        "secs": 20,
        "core": true,
        "say": "Two little labels matter a lot. If you do gig work as an employee, you usually receive a W-2, and your employer withholds tax from each paycheck for you. If you do it as an independent contractor, you may receive a ten ninety-nine, and no one withholds for you. That second path means the responsibility to set money aside and pay rests with you.",
        "simpler": "A W-2 means you are an employee and your boss takes out taxes for you. A ten ninety-nine means you work for yourself, nobody takes taxes out, so you handle it.",
        "deeper": "Worker classification drives the tax mechanics. Employees have income, Social Security, and Medicare taxes withheld at source via Form W-2. Independent contractors, often documented on a Form 1099, receive gross pay with no withholding, making them responsible for both income tax and self-employment tax. The IRS suggests confirming your status with the payer if it is unclear."
      },
      {
        "id": "gig-and-self-employment-taxes-s3",
        "name": "What self-employment tax is",
        "secs": 20,
        "core": true,
        "say": "When you work for yourself, you owe something called self-employment tax. It funds Social Security and Medicare, the same programs a regular paycheck pays into. The rate is fifteen point three percent. That breaks into twelve point four percent for Social Security and two point nine percent for Medicare. You generally owe it once your net earnings reach four hundred dollars.",
        "simpler": "Self-employment tax pays into Social Security and Medicare. It is fifteen point three percent total, and you usually owe it once you clear four hundred dollars of profit.",
        "deeper": "Self-employment tax substitutes for the combined employer and employee shares of Social Security and Medicare contributions. The aggregate rate of fifteen point three percent comprises a twelve point four percent old-age, survivors, and disability insurance component and a two point nine percent hospital insurance component. The filing trigger is net earnings from self-employment of four hundred dollars or more."
      },
      {
        "id": "gig-and-self-employment-taxes-s4",
        "name": "On net, not gross",
        "secs": 18,
        "core": false,
        "say": "A comforting detail. Self-employment tax is not charged on every dollar you bring in. It applies to your net earnings, meaning your income after business expenses. The Internal Revenue Service generally figures the taxable base as about ninety-two point three five percent of those net earnings. And you can deduct one-half of your self-employment tax when figuring your adjusted gross income.",
        "simpler": "You are taxed on profit, not total sales. The taxable part is about ninety-two point three five percent of your profit, and you get to subtract half of the self-employment tax later.",
        "deeper": "The self-employment tax base equals approximately ninety-two point three five percent of net earnings from self-employment, where net earnings are revenue minus allowable business expenses. A partially offsetting deduction permits subtracting one-half of the self-employment tax when computing adjusted gross income, which mirrors the deductibility of the employer share in a traditional employment arrangement."
      },
      {
        "id": "gig-and-self-employment-taxes-s5",
        "name": "Paying as you go",
        "secs": 20,
        "core": true,
        "say": "The United States tax system is pay-as-you-go. Employees meet that through withholding. When no one withholds for you, you generally pay estimated tax in four installments across the year, using Form 1040-ES. As a general rule, you make these payments if you expect to owe one thousand dollars or more when you file. The usual due dates fall in April, June, September, and the following January.",
        "simpler": "Taxes are meant to be paid throughout the year, not all at once. If you will owe about a thousand dollars or more, you send payments four times a year using Form 1040-ES.",
        "deeper": "The pay-as-you-go principle requires tax to be remitted as income is earned. In the absence of withholding, taxpayers use quarterly estimated payments computed on Form 1040-ES. The general threshold for being required to make estimated payments is an expected balance due of one thousand dollars or more, with the four payment periods generally due in mid-April, mid-June, mid-September, and mid-January of the following year."
      },
      {
        "id": "gig-and-self-employment-taxes-s6",
        "name": "Avoiding the penalty",
        "secs": 19,
        "core": false,
        "say": "There is a safe harbor that helps you avoid an underpayment penalty. In general, you are protected if you pay at least ninety percent of the current year's tax, or one hundred percent of the prior year's tax, whichever is smaller. If you also hold a regular job, one gentle option is to raise the withholding on that paycheck rather than mailing separate estimated payments.",
        "simpler": "To dodge a penalty, generally pay the smaller of ninety percent of this year's tax or one hundred percent of last year's. If you also have a normal job, you can just have more taken from that paycheck instead.",
        "deeper": "The estimated tax safe harbor generally shields a taxpayer from an underpayment penalty when payments equal at least the lesser of ninety percent of the current year's liability or one hundred percent of the prior year's liability. Higher-income taxpayers may face a stricter prior-year threshold. Increasing wage withholding via Form W-4 is an alternative to discrete estimated payments, since withholding is treated as paid evenly across the year."
      },
      {
        "id": "gig-and-self-employment-taxes-s7",
        "name": "Track your expenses",
        "secs": 19,
        "core": true,
        "say": "Now the part that can work in your favor. The Internal Revenue Service lets you lower the amount you are taxed on by deducting certain business expenses. The kindest habit is simple. Collect and keep your records and receipts as the year goes, rather than hunting for them in a panic later. Good records make your deductions easier to support and your filing far calmer.",
        "simpler": "You can subtract real business costs, which lowers your tax. Just save receipts and records all year so it is easy when filing time comes.",
        "deeper": "Ordinary and necessary business expenses reduce net earnings, thereby reducing both income tax and the self-employment tax base. Contemporaneous recordkeeping, retaining receipts and documentation throughout the year, substantiates these deductions and reduces the risk of unsupported claims. Specific deductibility depends on applicable rules and limits, which is why methodical records matter."
      },
      {
        "id": "gig-and-self-employment-taxes-s8",
        "name": "A kind closing",
        "secs": 16,
        "core": false,
        "say": "Take a breath. You now know the shape of it: report your income, understand self-employment tax, pay along the way, and keep good records. Please remember this is general educational information, not financial advice. For decisions about your own situation, it is wise to talk with a licensed tax professional who can look at your full picture.",
        "simpler": "Nice work. Report income, know about self-employment tax, pay through the year, and keep records. This is general info, not advice, so check with a licensed tax pro for your own case.",
        "deeper": "You now hold a working framework: income reporting, self-employment tax mechanics, estimated payments, and recordkeeping. This material is educational and general in nature and does not constitute financial or tax advice. Individual circumstances vary, so consulting a licensed tax professional is prudent before making personal decisions."
      }
    ]
  }
};

export const EXTRA_CURRICULUM_MONEY = [
  "understanding-income-tax",
  "reading-your-paycheck",
  "student-loans-basics",
  "auto-loans-and-financing",
  "insurance-basics",
  "life-insurance-explained",
  "net-worth-and-cash-flow",
  "social-security-basics",
  "understanding-medicare",
  "wills-and-beneficiaries",
  "renting-vs-buying",
  "building-credit-from-scratch",
  "debt-collection-rights",
  "employer-401k-and-match",
  "saving-for-college-529",
  "gig-and-self-employment-taxes"
];
