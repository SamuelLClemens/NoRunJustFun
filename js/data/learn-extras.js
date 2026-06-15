// Per-subject learning extras: the completion QUIZ (100% = subject completed),
// a fast arcade BLITZ game (built via the shared engine), EXPERT TIPS, and the
// TOP TAKEAWAYS shown in the hub. Assembled from reviewed, lesson-grounded content
// by /tmp/gen_extras.py — edit the source JSON, not this file. Consumed by the
// track registry (js/data/tracks.js).

import { makeGame } from './games.shared.js';

export const LEARN_EXTRAS = {
  "money": {
    quiz: {
      "intro": "A gentle check across all five Money Garden lessons — budgeting, compound growth, risk, retirement, and property.",
      "rounds": [
        {
          "prompt": "In the 50/30/20 budgeting guideline, what is the 20 percent meant for?",
          "options": [
            {
              "text": "Savings and paying down debt",
              "correct": true,
              "feedback": "Correct — roughly half goes to needs, 30 percent to wants, and 20 percent to savings and paying down debt."
            },
            {
              "text": "Wants like dining out and hobbies",
              "correct": false,
              "feedback": "Wants are the 30 percent slice; the 20 percent is for savings and debt."
            },
            {
              "text": "Needs like rent and groceries",
              "correct": false,
              "feedback": "Needs take about half (the 50 percent); the 20 percent is for savings and debt."
            }
          ]
        },
        {
          "prompt": "FDIC deposit insurance currently covers which of these if the bank fails?",
          "options": [
            {
              "text": "A savings account, up to the coverage limit",
              "correct": true,
              "feedback": "Correct — FDIC insurance covers deposits like checking, savings, and CDs up to 250,000 dollars per depositor, per insured bank, per ownership category."
            },
            {
              "text": "Stocks and mutual funds held at the bank",
              "correct": false,
              "feedback": "FDIC insurance does not cover stocks, bonds, mutual funds, or crypto — only deposits."
            }
          ]
        },
        {
          "prompt": "Using the Rule of 72, about how long does money take to double at a 6 percent yearly rate?",
          "options": [
            {
              "text": "About 12 years",
              "correct": true,
              "feedback": "Correct — 72 divided by 6 is about 12 years. It is an approximation that assumes a steady rate."
            },
            {
              "text": "About 6 years",
              "correct": false,
              "feedback": "Divide 72 by the rate: 72 divided by 6 is roughly 12 years, not 6."
            },
            {
              "text": "About 72 years",
              "correct": false,
              "feedback": "You divide 72 by the rate (6), giving about 12 years."
            }
          ]
        },
        {
          "prompt": "According to the lessons, what can diversification do?",
          "options": [
            {
              "text": "Reduce risk, but not erase it",
              "correct": true,
              "feedback": "Correct — diversification is a seatbelt, not a force field. When the whole market falls, even a well-spread portfolio can lose money."
            },
            {
              "text": "Completely remove the risk of losing money",
              "correct": false,
              "feedback": "No — diversification reduces risk but cannot erase it. It does not guarantee against loss."
            },
            {
              "text": "Guarantee a higher return than cash",
              "correct": false,
              "feedback": "There is no such thing as a risk-free or guaranteed-return investment; diversification only softens risk."
            }
          ]
        },
        {
          "prompt": "What is the main difference between a traditional and a Roth retirement account?",
          "options": [
            {
              "text": "When you pay tax — now (Roth) versus later (traditional)",
              "correct": true,
              "feedback": "Correct — with a traditional account you may lower taxes now and pay later; with a Roth you pay now and qualified withdrawals come out tax-free."
            },
            {
              "text": "Roth accounts are FDIC insured and traditional ones are not",
              "correct": false,
              "feedback": "Neither is FDIC insured — both hold investments. The real difference is the timing of taxes."
            },
            {
              "text": "Traditional accounts can never lose value",
              "correct": false,
              "feedback": "Both hold investments that rise and fall; the difference is when you pay tax."
            }
          ]
        },
        {
          "prompt": "Why do the lessons call an employer 401(k) match close to 'free money'?",
          "options": [
            {
              "text": "The employer adds to your account when you contribute",
              "correct": true,
              "feedback": "Correct — to get the full match you generally must contribute enough yourself to earn it, and the employer adds on top."
            },
            {
              "text": "The government guarantees the balance against any loss",
              "correct": false,
              "feedback": "Nothing guarantees the balance — the money holds investments that carry market risk. The match is 'free money' because the employer contributes alongside you."
            }
          ]
        },
        {
          "prompt": "Who does private mortgage insurance (PMI) actually protect?",
          "options": [
            {
              "text": "The lender",
              "correct": true,
              "feedback": "Correct — PMI protects the lender, not you, and adds to your monthly payment. By law it can be cancelled at 80 percent and comes off automatically at 78 percent."
            },
            {
              "text": "The homeowner / borrower",
              "correct": false,
              "feedback": "PMI protects the lender, not the borrower, even though the borrower pays for it."
            },
            {
              "text": "The home appraiser",
              "correct": false,
              "feedback": "PMI protects the lender against loss if you fall behind — not you and not the appraiser."
            }
          ]
        }
      ]
    },
    expertTips: [
      {
        "from": "Consumer-finance educator",
        "tip": "Make saving automatic on payday so the money moves before you can spend it — and keep a small buffer in checking so a transfer never triggers an overdraft."
      },
      {
        "from": "Personal-debt counselor",
        "tip": "Clearing high-interest debt is a guaranteed saving that almost no investment reliably beats, so treat a card balance above 20 percent as urgent."
      },
      {
        "from": "Investing basics instructor",
        "tip": "Start early and keep fees low, because every dollar paid in fees is a dollar that stops compounding — and remember compounding works against you on debt too."
      },
      {
        "from": "Retirement specialist",
        "tip": "If your plan offers a match, contribute enough to capture it, but know the employer's portion may take years to vest fully before it is truly yours."
      },
      {
        "from": "Real-estate finance advisor",
        "tip": "Never let a single number like cap rate decide a purchase, and respect that leverage amplifies losses as much as gains."
      }
    ],
    topTakeaways: [
      "No investment is risk-free or guaranteed — higher possible reward always rides with higher risk.",
      "Time is the quiet superpower: pay yourself first, let compounding work, and keep fees and inflation from leaking it away.",
      "Clear high-interest debt first and grab any employer match — both are close to guaranteed wins before you reach for riskier returns."
    ],
    arcade: makeGame({
      "id": "money-blitz",
      "name": "Money Blitz",
      "blurb": "Snap-judge each money question before the timer runs out — the lessons are your edge.",
      "icon": "💰",
      "type": "blitz",
      "win": "Fast and sharp — knowing the lessons paid off!",
      "items": [
        {
          "prompt": "Rent?",
          "options": [
            {
              "text": "Need",
              "correct": true
            },
            {
              "text": "Want",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Dining out?",
          "options": [
            {
              "text": "Want",
              "correct": true
            },
            {
              "text": "Need",
              "correct": false
            }
          ]
        },
        {
          "prompt": "72 / 6% doubles in?",
          "options": [
            {
              "text": "~12 yrs",
              "correct": true
            },
            {
              "text": "~6 yrs",
              "correct": false
            }
          ]
        },
        {
          "prompt": "72 / 10% doubles in?",
          "options": [
            {
              "text": "~7 yrs",
              "correct": true
            },
            {
              "text": "~14 yrs",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Pay yourself first means?",
          "options": [
            {
              "text": "Save first",
              "correct": true
            },
            {
              "text": "Spend first",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Highest interest debt: pay it?",
          "options": [
            {
              "text": "First",
              "correct": true
            },
            {
              "text": "Last",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Stocks held at a bank: FDIC?",
          "options": [
            {
              "text": "Not covered",
              "correct": true
            },
            {
              "text": "Covered",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Savings account: FDIC?",
          "options": [
            {
              "text": "Covered",
              "correct": true
            },
            {
              "text": "Not covered",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Risk-free investment exists?",
          "options": [
            {
              "text": "No",
              "correct": true
            },
            {
              "text": "Yes",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Diversification erases risk?",
          "options": [
            {
              "text": "No",
              "correct": true
            },
            {
              "text": "Yes",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Highest historical return/risk?",
          "options": [
            {
              "text": "Stocks",
              "correct": true
            },
            {
              "text": "Cash",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Safest, lowest-earning bucket?",
          "options": [
            {
              "text": "Cash",
              "correct": true
            },
            {
              "text": "Stocks",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Roth: tax paid when?",
          "options": [
            {
              "text": "Now",
              "correct": true
            },
            {
              "text": "Later",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Employer match is?",
          "options": [
            {
              "text": "Free money",
              "correct": true
            },
            {
              "text": "A loan",
              "correct": false
            }
          ]
        },
        {
          "prompt": "PMI protects?",
          "options": [
            {
              "text": "Lender",
              "correct": true
            },
            {
              "text": "You",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Leverage magnifies?",
          "options": [
            {
              "text": "Both ways",
              "correct": true
            },
            {
              "text": "Gains only",
              "correct": false
            }
          ]
        }
      ]
    }),
  },
  "parenting": {
    quiz: {
      "intro": "A gentle knowledge check across the parenting path — warm, firm, and judgement-free. There are no trick questions, just the ideas the lessons teach.",
      "rounds": [
        {
          "prompt": "When a young child has a tantrum, what is usually going on?",
          "options": [
            {
              "text": "The feeling is bigger than they can manage on their own",
              "correct": true,
              "feedback": "Right. Tantrums are mostly overwhelm and a developing brain, not deliberate defiance — your child is having a hard time, not giving you one."
            },
            {
              "text": "They are deliberately misbehaving to manipulate you",
              "correct": false,
              "feedback": "Not quite. In the early years a tantrum usually means the emotion is simply too big to handle alone, not a calculated attempt to control you."
            },
            {
              "text": "They have not been punished firmly enough yet",
              "correct": false,
              "feedback": "Not quite. The lessons frame tantrums as normal development and overwhelm — harsh punishment is not what is missing."
            }
          ]
        },
        {
          "prompt": "What does the word 'discipline' actually point toward?",
          "options": [
            {
              "text": "Teaching a child what to do next time",
              "correct": true,
              "feedback": "Yes. Discipline comes from a root meaning to teach or to learn — it is about guiding good behavior, not making a child suffer."
            },
            {
              "text": "Making a child suffer for a mistake",
              "correct": false,
              "feedback": "Not quite. The lessons reframe discipline as teaching, not punishment that causes suffering."
            }
          ]
        },
        {
          "prompt": "Which parenting style is linked with the steadiest outcomes?",
          "options": [
            {
              "text": "Warmth combined with clear, firm limits (authoritative)",
              "correct": true,
              "feedback": "Right. Baumrind's authoritative blend — lots of warmth plus firm limits held with care — is the hug and the guardrail together."
            },
            {
              "text": "High rules with little warmth (authoritarian)",
              "correct": false,
              "feedback": "Not quite. That is the authoritarian extreme: many demands, not much listening."
            },
            {
              "text": "Lots of warmth with few limits (permissive)",
              "correct": false,
              "feedback": "Not quite. That is the permissive extreme: warm, but short on limits and follow-through."
            }
          ]
        },
        {
          "prompt": "Why does naming a child's feeling out loud help?",
          "options": [
            {
              "text": "It quiets the brain's alarm and helps the feeling become smaller",
              "correct": true,
              "feedback": "Yes — 'name it to tame it.' Putting a word to the emotion brings the thinking brain back online without agreeing the behavior was okay."
            },
            {
              "text": "It tells the child their reaction was acceptable",
              "correct": false,
              "feedback": "Not quite. Naming a feeling validates the emotion; it does not endorse the behavior, and you can still hold the limit."
            }
          ]
        },
        {
          "prompt": "What is the most useful order when a child is melting down?",
          "options": [
            {
              "text": "Connect first, then guide",
              "correct": true,
              "feedback": "Right. Connection before correction — reach your child with warmth first, and cooperation tends to follow more easily."
            },
            {
              "text": "Correct the behavior first, connect afterward",
              "correct": false,
              "feedback": "Not quite. The lessons put connection first; children cooperate more readily with the adults they feel close to."
            }
          ]
        },
        {
          "prompt": "According to the praise research, what is best to praise?",
          "options": [
            {
              "text": "The effort and strategy the child used",
              "correct": true,
              "feedback": "Yes. Process praise names what a child can repeat next time, while praising the trait ('you're so smart') can backfire after a setback."
            },
            {
              "text": "The child's natural intelligence or talent",
              "correct": false,
              "feedback": "Not quite. Praising the trait can leave children feeling ability is fixed and a setback is proof they have run out of it."
            }
          ]
        },
        {
          "prompt": "How should a parent think about sleep and screens?",
          "options": [
            {
              "text": "Aim for the overall pattern and quality, not a single perfect night or minute count",
              "correct": true,
              "feedback": "Right. Sleep guidance comes as ranges, media as a quality-first plan — forgive the off days and watch the broader rhythm."
            },
            {
              "text": "Hit an exact sleep number and screen-minute limit every single day",
              "correct": false,
              "feedback": "Not quite. The lessons offer ranges and a values-based media plan, not rigid daily targets that define your worth as a parent."
            }
          ]
        }
      ]
    },
    expertTips: [
      {
        "from": "Developmental pediatrician",
        "tip": "Treat most early misbehavior as normal growth — respond to the behaviors you want and gently show your child what to do instead, rather than punishing what you do not want."
      },
      {
        "from": "Child psychologist",
        "tip": "Welcome the feeling and hold the limit at the same time; your calm presence lets a young child borrow your steadiness until they grow their own."
      },
      {
        "from": "Early-childhood educator",
        "tip": "Connect before you correct, and use specific labeled praise like 'you put your cup right in the sink' so your child knows exactly which effort you noticed."
      },
      {
        "from": "Pediatric sleep specialist",
        "tip": "Aim for your child's sleep range and a familiar daily rhythm, and keep screens out of meals and the hour before bed to protect rest and family time."
      },
      {
        "from": "Family therapist",
        "tip": "Describe the behavior, not your child's character, with an I-message, and set firm limits with a calm voice while following through every time."
      }
    ],
    topTakeaways: [
      "Lead with warmth and hold firm, caring limits — connection before correction, and big feelings are overwhelm, not defiance.",
      "Discipline means teaching, not punishing: skip spanking and shaming, praise effort over the trait, and follow through calmly every time.",
      "This is general parenting education, not medical advice — aim for the overall pattern, forgive the off days, and reach out to a qualified professional for any real concern."
    ],
    arcade: makeGame({
      "id": "parenting-blitz",
      "name": "Warm or Firm",
      "blurb": "A 16-snippet blitz — read each tiny moment and tap the gentle, lesson-true response before time runs out.",
      "icon": "🌱",
      "type": "blitz",
      "win": "Fast and sharp — knowing the lessons paid off!",
      "items": [
        {
          "prompt": "Toddler melting down over a fallen tower.",
          "options": [
            {
              "text": "Connect",
              "correct": true
            },
            {
              "text": "Punish",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"You're so smart!\"",
          "options": [
            {
              "text": "Trait",
              "correct": true
            },
            {
              "text": "Effort",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"You kept trying different ways!\"",
          "options": [
            {
              "text": "Effort",
              "correct": true
            },
            {
              "text": "Trait",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Child screaming because feeling is too big.",
          "options": [
            {
              "text": "Overwhelm",
              "correct": true
            },
            {
              "text": "Defiance",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Discipline really means...",
          "options": [
            {
              "text": "Teach",
              "correct": true
            },
            {
              "text": "Punish",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Best style: warmth plus firm limits.",
          "options": [
            {
              "text": "Authoritative",
              "correct": true
            },
            {
              "text": "Permissive",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Tempted to spank or shame the child.",
          "options": [
            {
              "text": "Skip it",
              "correct": true
            },
            {
              "text": "Do it",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"I know it's hard — tablet still goes away.\"",
          "options": [
            {
              "text": "Warm and firm",
              "correct": true
            },
            {
              "text": "Cave in",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Naming a feeling out loud first.",
          "options": [
            {
              "text": "Calms alarm",
              "correct": true
            },
            {
              "text": "Rewards it",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"Good job!\" vs naming what you saw.",
          "options": [
            {
              "text": "Be specific",
              "correct": true
            },
            {
              "text": "Stay vague",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Order when guiding an upset child.",
          "options": [
            {
              "text": "Connect first",
              "correct": true
            },
            {
              "text": "Correct first",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"You are so messy!\" — better as...",
          "options": [
            {
              "text": "I-message",
              "correct": true
            },
            {
              "text": "Character attack",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Getting cooperation at bath time.",
          "options": [
            {
              "text": "Offer a real choice",
              "correct": true
            },
            {
              "text": "Threaten",
              "correct": false
            }
          ]
        },
        {
          "prompt": "A consequence you only sometimes enforce.",
          "options": [
            {
              "text": "Follow through",
              "correct": true
            },
            {
              "text": "Enforce randomly",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Screens at dinner and the hour before bed.",
          "options": [
            {
              "text": "Keep them out",
              "correct": true
            },
            {
              "text": "Let them stay",
              "correct": false
            }
          ]
        },
        {
          "prompt": "One rough night of bad sleep.",
          "options": [
            {
              "text": "Watch the pattern",
              "correct": true
            },
            {
              "text": "Panic over one night",
              "correct": false
            }
          ]
        }
      ]
    }),
  },
  "communication": {
    quiz: {
      "intro": "A knowledge check across the Nonviolent Communication framework (Rosenberg / CNVC) — observation vs. evaluation, feeling vs. thought, need vs. strategy, request vs. demand, and empathy and safety. Educational only.",
      "rounds": [
        {
          "prompt": "Which statement is an observation rather than an evaluation?",
          "options": [
            {
              "text": "The dishes are still in the sink.",
              "correct": true,
              "feedback": "Correct. An observation is what a camera or recorder could capture — the dishes in the sink — with no story or judgement added."
            },
            {
              "text": "You are so lazy.",
              "correct": false,
              "feedback": "That is an evaluation. A camera cannot record 'lazy'; it can only record what someone did. 'Lazy' is a judgement laid on top."
            },
            {
              "text": "You are always inconsiderate.",
              "correct": false,
              "feedback": "That is an evaluation wrapped in the word 'always'. The fact gets lost inside the judgement, which invites defending instead of listening."
            }
          ]
        },
        {
          "prompt": "Per the lesson, what is the purpose of Nonviolent Communication?",
          "options": [
            {
              "text": "Connection and mutual understanding, so everyone's needs can be heard.",
              "correct": true,
              "feedback": "Correct. The aim is connection and mutual understanding — to understand and be understood — not winning, and not being polite on the surface."
            },
            {
              "text": "Winning the argument by phrasing things politely.",
              "correct": false,
              "feedback": "Not quite. NVC is explicitly not about winning an argument or being nice on the surface; the goal is connection, not getting our way."
            },
            {
              "text": "A technique for managing or changing how others behave.",
              "correct": false,
              "feedback": "No — the lesson is clear that NVC is not a technique for managing or manipulating others; it cannot control anyone and promises no particular outcome."
            }
          ]
        },
        {
          "prompt": "Which one is a genuine feeling rather than a faux feeling (a thought about what someone did)?",
          "options": [
            {
              "text": "Lonely",
              "correct": true,
              "feedback": "Correct. 'Lonely' points inward to your own emotional state. A real feeling describes what is alive in you without diagnosing anyone."
            },
            {
              "text": "Ignored",
              "correct": false,
              "feedback": "'Ignored' is a faux feeling — it describes what you think someone did to you. If 'I think that...' fits, it was a thought wearing a feeling's clothes."
            }
          ]
        },
        {
          "prompt": "The lessons cite a 2007 UCLA study (Lieberman et al.). What did putting a feeling into words do?",
          "options": [
            {
              "text": "It was linked to reduced activity in the amygdala, the brain's alarm center.",
              "correct": true,
              "feedback": "Correct. Affect labeling — naming the emotion — was linked to calmer amygdala activity. It is independent research, offered as a clue, not proof that NVC works."
            },
            {
              "text": "It permanently cured the underlying emotion.",
              "correct": false,
              "feedback": "No. Naming a feeling is not a cure and does not erase it; the study suggests it may take some heat out of the moment, with results that vary."
            }
          ]
        },
        {
          "prompt": "What is the difference between a need and a strategy in NVC?",
          "options": [
            {
              "text": "A need is universal and names no person; a strategy is one specific way to meet it.",
              "correct": true,
              "feedback": "Correct. The moment a wish names a who, what, when, or where, you have landed on a strategy — not the universal need underneath."
            },
            {
              "text": "A need names a specific person or action; a strategy is the deeper human longing.",
              "correct": false,
              "feedback": "That is reversed. The need is the universal, person-free longing (like connection); the strategy is the specific action, such as 'text me back tonight.'"
            },
            {
              "text": "A need and a strategy are two words for the same thing.",
              "correct": false,
              "feedback": "No — distinguishing them is the key idea. Most conflict is a clash of strategies, not of needs, and one need has many possible roads."
            }
          ]
        },
        {
          "prompt": "According to the lesson, how can you tell whether you made a request or a demand?",
          "options": [
            {
              "text": "By your own reaction to a 'no' — curiosity suggests a request; expecting a yes suggests a demand.",
              "correct": true,
              "feedback": "Correct. A request and a demand can sound identical; the difference shows up after a 'no'. A request leaves room for a true yes or no."
            },
            {
              "text": "By whether you used the word 'please' and a polite tone.",
              "correct": false,
              "feedback": "Not quite. The test is not in the words — a demand can wear polite clothes. It is in how you respond when you imagine hearing 'no'."
            }
          ]
        },
        {
          "prompt": "Across the lessons, when is NVC the right tool, and what comes first if you are unsafe?",
          "options": [
            {
              "text": "It is for ordinary friction between people who are safe; in abuse, coercion, or danger, your safety comes first and you seek professional help.",
              "correct": true,
              "feedback": "Correct. NVC is educational, not therapy or crisis support, and never a tool for abuse or danger. If unsafe, safety comes first — reach out for professional help."
            },
            {
              "text": "It is a way to safely de-escalate an abuser by empathizing carefully.",
              "correct": false,
              "feedback": "No. You are never required to empathize your way through harm. NVC cannot resolve abuse, coercion, or danger; your safety comes first."
            }
          ]
        }
      ]
    },
    expertTips: [
      {
        "from": "NVC trainer",
        "tip": "Before the judgement lands, ask what a camera would have caught and lead with that observation — 'the last three times we met, you arrived late' invites listening, while 'you're always late' invites a fight."
      },
      {
        "from": "Clinical psychologist",
        "tip": "When a word like 'ignored' or 'disrespected' shows up, swap in 'I think that' to test it; the genuine feeling underneath — lonely, hurt, tense — is what actually steadies your nervous system when you name it."
      },
      {
        "from": "Conflict mediator",
        "tip": "Most arguments are a clash of strategies, not of needs, so drop beneath 'I want a night out' to the need (connection, rest) and new options neither side had seen often appear."
      },
      {
        "from": "Communication coach",
        "tip": "Make your ask positive, concrete, and doable now, then notice your reaction to an imagined 'no' — curiosity means you made a request, while expecting a yes means it was a demand in polite clothes."
      },
      {
        "from": "Crisis-line counselor",
        "tip": "NVC is for ordinary friction between people who are basically safe; it is never a tool for abuse, coercion, or danger — there your safety comes first, so reach out for professional help rather than the right phrasing."
      }
    ],
    topTakeaways: [
      "Lead with observations a camera could record and genuine feelings that point inward — not evaluations or 'faux feelings' that diagnose what someone else did.",
      "Beneath every feeling is a universal human need we all share, and most conflict is a clash of strategies, not of needs — one need has many roads.",
      "A real request leaves room for a true yes or no (a demand pressures), and NVC is educational only — never for abuse or danger, where your safety comes first."
    ],
    arcade: makeGame({
      "id": "communication-blitz",
      "name": "NVC Blitz",
      "blurb": "Sort each phrase into the right NVC bucket before the clock runs out.",
      "icon": "💬",
      "type": "blitz",
      "win": "Fast and sharp — knowing the lessons paid off!",
      "items": [
        {
          "prompt": "\"You're so lazy.\"",
          "options": [
            {
              "text": "Observation",
              "correct": false
            },
            {
              "text": "Evaluation",
              "correct": true
            }
          ]
        },
        {
          "prompt": "\"The dishes are still in the sink.\"",
          "options": [
            {
              "text": "Observation",
              "correct": true
            },
            {
              "text": "Evaluation",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"You're always late.\"",
          "options": [
            {
              "text": "Observation",
              "correct": false
            },
            {
              "text": "Evaluation",
              "correct": true
            }
          ]
        },
        {
          "prompt": "\"You arrived after the time we agreed.\"",
          "options": [
            {
              "text": "Observation",
              "correct": true
            },
            {
              "text": "Evaluation",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"I feel ignored.\"",
          "options": [
            {
              "text": "Feeling",
              "correct": false
            },
            {
              "text": "Thought",
              "correct": true
            }
          ]
        },
        {
          "prompt": "\"I feel lonely.\"",
          "options": [
            {
              "text": "Feeling",
              "correct": true
            },
            {
              "text": "Thought",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"I feel disrespected.\"",
          "options": [
            {
              "text": "Feeling",
              "correct": false
            },
            {
              "text": "Thought",
              "correct": true
            }
          ]
        },
        {
          "prompt": "\"I feel discouraged.\"",
          "options": [
            {
              "text": "Feeling",
              "correct": true
            },
            {
              "text": "Thought",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"I want you to text me back tonight.\"",
          "options": [
            {
              "text": "Strategy",
              "correct": true
            },
            {
              "text": "Need",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Connection and belonging",
          "options": [
            {
              "text": "Need",
              "correct": true
            },
            {
              "text": "Strategy",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"Let's go out tonight.\"",
          "options": [
            {
              "text": "Strategy",
              "correct": true
            },
            {
              "text": "Need",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Rest and ease",
          "options": [
            {
              "text": "Need",
              "correct": true
            },
            {
              "text": "Strategy",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"Stop interrupting me.\"",
          "options": [
            {
              "text": "Request",
              "correct": false
            },
            {
              "text": "Demand",
              "correct": true
            }
          ]
        },
        {
          "prompt": "\"Would you text me if you're running late?\"",
          "options": [
            {
              "text": "Request",
              "correct": true
            },
            {
              "text": "Demand",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"Are you worried, and wanting reassurance?\"",
          "options": [
            {
              "text": "Empathy guess",
              "correct": true
            },
            {
              "text": "Advice",
              "correct": false
            }
          ]
        },
        {
          "prompt": "\"Here's exactly what you should do.\"",
          "options": [
            {
              "text": "Empathy guess",
              "correct": false
            },
            {
              "text": "Advice",
              "correct": true
            }
          ]
        }
      ]
    }),
  },
  "memory": {
    quiz: {
      "intro": "Seven questions across everything you learned — score 100% to complete Memory.",
      "rounds": [
        {
          "prompt": "Memory works in three stages. Which list names them in order?",
          "options": [
            {
              "text": "Encoding, storage, retrieval",
              "correct": true,
              "feedback": "Right — take it in, hold it over time, then find it again."
            },
            {
              "text": "Retrieval, encoding, storage",
              "correct": false,
              "feedback": "The order is encoding (taking it in) first, then storage, then retrieval."
            },
            {
              "text": "Storage, retrieval, encoding",
              "correct": false,
              "feedback": "Encoding comes first — you have to take something in before you can store or retrieve it."
            }
          ]
        },
        {
          "prompt": "Hermann Ebbinghaus's \"forgetting curve\" describes what?",
          "options": [
            {
              "text": "Without review, we forget much of new material fast — but a timed review flattens the curve",
              "correct": true,
              "feedback": "Exactly — the curve is not destiny; a short review at the right moment pushes back against it."
            },
            {
              "text": "Memories are stored permanently and never fade",
              "correct": false,
              "feedback": "The opposite — without review we forget a large share within the first day, which is why well-timed reviews help."
            }
          ]
        },
        {
          "prompt": "For lasting memory, which is better supported by the research?",
          "options": [
            {
              "text": "Spacing reviews across several days",
              "correct": true,
              "feedback": "Yes — the spacing effect: same effort, far better staying power than cramming."
            },
            {
              "text": "Cramming everything into one long session",
              "correct": false,
              "feedback": "Cramming feels productive but fades fast; spreading reviews across days builds more durable memory."
            }
          ]
        },
        {
          "prompt": "What is retrieval practice, and why does it help?",
          "options": [
            {
              "text": "Pulling information out of memory — the effortful recall is a 'desirable difficulty' that strengthens it",
              "correct": true,
              "feedback": "Correct — Roediger and Karpicke found recalling beats rereading for long-term retention, even though it feels harder."
            },
            {
              "text": "Re-reading and highlighting until it feels familiar",
              "correct": false,
              "feedback": "That feeling of ease can fool you; the effortful act of recalling is what does the heavy lifting."
            }
          ]
        },
        {
          "prompt": "How does the memory palace (method of loci) work?",
          "options": [
            {
              "text": "Place vivid images of what you want to recall along a route you know by heart, then take the mental walk",
              "correct": true,
              "feedback": "Right — in the Dresler 2017 study, trained volunteers' recall of a 72-word list rose sharply. It is a learnable skill, not magic."
            },
            {
              "text": "Repeat a list flatly out loud until it sticks",
              "correct": false,
              "feedback": "Loci works by linking items to places and vivid images along a familiar route — far easier to retrieve than flat repetition."
            }
          ]
        },
        {
          "prompt": "Which everyday habits genuinely support memory?",
          "options": [
            {
              "text": "Enough sleep, regular movement, and giving one thing your attention at a time",
              "correct": true,
              "feedback": "Yes — sleep helps file new experiences, movement supports thinking and sleep, and undivided attention helps moments land."
            },
            {
              "text": "Pulling all-nighters and multitasking during study",
              "correct": false,
              "feedback": "All-nighters skip the sleep that files memories, and divided attention means the moment often never lands at all."
            }
          ]
        },
        {
          "prompt": "Brain-training games: what does the honest evidence say?",
          "options": [
            {
              "text": "You reliably improve at the game itself (near transfer), but evidence it sharpens everyday thinking (far transfer) is weak and contested",
              "correct": true,
              "feedback": "Correct — the 2014 Stanford / Max Planck consensus urged caution, and in 2016 the FTC acted against Lumosity for overstated claims."
            },
            {
              "text": "They clearly and reliably improve general thinking in daily life",
              "correct": false,
              "feedback": "Not so — gains tend to stay narrow to the game; far transfer to everyday thinking is weak and contested."
            }
          ]
        }
      ]
    },
    expertTips: [
      {
        "from": "Cognitive scientist",
        "tip": "Most slips are not lost memories but poor encoding — give a moment your full attention so it lands in the first place."
      },
      {
        "from": "Learning researcher",
        "tip": "Break study into short sessions across days and let the gaps work; an expanding schedule of one day, then three, then a week is a fine start."
      },
      {
        "from": "Study-skills coach",
        "tip": "Close the book and recall the main points before you peek — that effortful retrieval builds memory more than rereading, even when it feels harder."
      },
      {
        "from": "Memory-technique trainer",
        "tip": "For lists you care about, place vivid images along a route you know by heart and take the mental walk; it is a learnable skill that rewards practice."
      },
      {
        "from": "Sleep and cognition specialist",
        "tip": "Protect your sleep, move your body in ways you enjoy, and focus on one thing at a time — gentle supports the research genuinely backs."
      }
    ],
    topTakeaways: [
      "Memory follows rules you can work with: pay attention when encoding, space your reviews, test yourself, and protect sleep.",
      "Effortful methods — spacing and retrieval practice — feel harder than cramming or rereading, and that desirable difficulty is exactly what makes memory stick.",
      "Brain games reliably make you better at the game itself (near transfer), but evidence they sharpen everyday thinking (far transfer) is weak and contested — the real gains come from how you study and live."
    ],
    arcade: makeGame({
      "id": "memory-blitz",
      "name": "Memory Blitz",
      "blurb": "Tap the better memory habit before the clock runs out — knowing the lessons is your edge.",
      "icon": "🧠",
      "type": "blitz",
      "win": "Fast and sharp — knowing the lessons paid off!",
      "items": [
        {
          "prompt": "Best for lasting memory?",
          "options": [
            {
              "text": "Space it",
              "correct": true
            },
            {
              "text": "Cram it",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Brain games sharpen everyday thinking?",
          "options": [
            {
              "text": "Weak evidence",
              "correct": true
            },
            {
              "text": "Proven",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Better than rereading?",
          "options": [
            {
              "text": "Test yourself",
              "correct": true
            },
            {
              "text": "Highlight more",
              "correct": false
            }
          ]
        },
        {
          "prompt": "First stage of memory?",
          "options": [
            {
              "text": "Encoding",
              "correct": true
            },
            {
              "text": "Retrieval",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Night before a big test?",
          "options": [
            {
              "text": "Sleep well",
              "correct": true
            },
            {
              "text": "All-nighter",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Getting good at a game is...",
          "options": [
            {
              "text": "Near transfer",
              "correct": true
            },
            {
              "text": "Far transfer",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Memorize a list by...",
          "options": [
            {
              "text": "Memory palace",
              "correct": true
            },
            {
              "text": "Reading it flat",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Recall feels harder. That is...",
          "options": [
            {
              "text": "Desirable difficulty",
              "correct": true
            },
            {
              "text": "A sign to stop",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Forgetting curve fades fastest...",
          "options": [
            {
              "text": "The first day",
              "correct": true
            },
            {
              "text": "After a year",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Hold more in working memory by...",
          "options": [
            {
              "text": "Chunking",
              "correct": true
            },
            {
              "text": "Loose digits",
              "correct": false
            }
          ]
        },
        {
          "prompt": "While studying, you should...",
          "options": [
            {
              "text": "Focus on one thing",
              "correct": true
            },
            {
              "text": "Scroll and listen",
              "correct": false
            }
          ]
        },
        {
          "prompt": "The FTC fined which brain-game maker?",
          "options": [
            {
              "text": "Lumosity",
              "correct": true
            },
            {
              "text": "No one",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Spacing schedule that works?",
          "options": [
            {
              "text": "Expanding gaps",
              "correct": true
            },
            {
              "text": "All at once",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Name new info that sticks better is...",
          "options": [
            {
              "text": "Linked to what you know",
              "correct": true
            },
            {
              "text": "Memorized flat",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Movement helps memory because it...",
          "options": [
            {
              "text": "Supports sleep and thinking",
              "correct": true
            },
            {
              "text": "Does nothing",
              "correct": false
            }
          ]
        },
        {
          "prompt": "Why play brain games?",
          "options": [
            {
              "text": "They are fun",
              "correct": true
            },
            {
              "text": "They raise IQ",
              "correct": false
            }
          ]
        }
      ]
    }),
  }
};
