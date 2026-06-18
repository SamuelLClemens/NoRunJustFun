// dreams concept games (Soul section). Honest, lesson-grounded quizzes built by
// the shared makeGame() engine. Practice, not proof — the lessons explain the
// evidence. Edit the source, not the wiring.
import { makeGame } from './games.shared.js';

export const DREAMS_CONCEPT_GAMES = [
  {
    "id": "sleep-stages-sorter",
    "name": "Stages of the Night",
    "blurb": "Sort the science of sleep cycles and where dreams live.",
    "icon": "😴",
    "type": "quiz",
    "win": "You know your way around the night.",
    "rounds": [
      {
        "prompt": "Roughly how often does sleep cycle through its stages over a night?",
        "options": [
          {
            "text": "About every 90 minutes",
            "correct": true,
            "feedback": "Correct. Sleep moves through NREM and REM in cycles of roughly 90 minutes."
          },
          {
            "text": "About every 10 minutes",
            "correct": false,
            "feedback": "Too fast. The full NREM-REM cycle runs closer to 90 minutes."
          },
          {
            "text": "Only once, near morning",
            "correct": false,
            "feedback": "Not quite. You pass through several cycles across the night."
          }
        ]
      },
      {
        "prompt": "In which stage do most vivid dreams occur?",
        "options": [
          {
            "text": "REM sleep",
            "correct": true,
            "feedback": "Correct. The most vivid, story-like dreams cluster in REM sleep."
          },
          {
            "text": "Deep NREM only",
            "correct": false,
            "feedback": "Deep NREM has some mentation, but vivid dreams are mostly a REM feature."
          },
          {
            "text": "Only while falling asleep",
            "correct": false,
            "feedback": "Brief images can appear at sleep onset, but vivid dreams concentrate in REM."
          }
        ]
      },
      {
        "prompt": "As the night goes on, REM periods tend to do what?",
        "options": [
          {
            "text": "Get longer toward morning",
            "correct": true,
            "feedback": "Correct. REM lengthens in later cycles, which is why morning dreams feel long."
          },
          {
            "text": "Disappear entirely",
            "correct": false,
            "feedback": "REM does not vanish; it actually grows in later cycles."
          },
          {
            "text": "Stay exactly the same length",
            "correct": false,
            "feedback": "Not quite. Early REM is short and later REM is longer."
          }
        ]
      },
      {
        "prompt": "What best describes NREM sleep?",
        "options": [
          {
            "text": "Non-REM stages including the deepest, restorative sleep",
            "correct": true,
            "feedback": "Correct. NREM includes light and deep stages and dominates early in the night."
          },
          {
            "text": "The stage where the eyes dart most rapidly",
            "correct": false,
            "feedback": "Rapid eye movement defines REM, not NREM."
          },
          {
            "text": "A myth with no measurable brain activity",
            "correct": false,
            "feedback": "NREM is well measured on EEG and is essential, restorative sleep."
          }
        ]
      }
    ]
  },
  {
    "id": "tradition-vs-evidence",
    "name": "Tradition or Evidence?",
    "blurb": "Tell what dream lore claims apart from what research shows.",
    "icon": "💭",
    "type": "quiz",
    "win": "Clear eyes: belief on one side, evidence on the other.",
    "rounds": [
      {
        "prompt": "What does science say about universal 'dream dictionaries' that assign one fixed meaning to each symbol?",
        "options": [
          {
            "text": "There is no scientifically validated universal dream dictionary",
            "correct": true,
            "feedback": "Correct. Fixed symbol-to-meaning keys are not supported by evidence."
          },
          {
            "text": "Researchers have confirmed a single correct meaning per symbol",
            "correct": false,
            "feedback": "No. No study has validated one universal meaning per symbol."
          },
          {
            "text": "They are proven for water and flying only",
            "correct": false,
            "feedback": "No symbol has a scientifically fixed, universal meaning."
          }
        ]
      },
      {
        "prompt": "The continuity hypothesis (Domhoff) proposes that dreams mostly do what?",
        "options": [
          {
            "text": "Reflect our waking concerns and preoccupations",
            "correct": true,
            "feedback": "Correct. Dream content largely continues what is on our minds while awake."
          },
          {
            "text": "Encode hidden messages from outside the self",
            "correct": false,
            "feedback": "That is a belief claim; the continuity view ties dreams to waking life."
          },
          {
            "text": "Show events that have not yet happened",
            "correct": false,
            "feedback": "The continuity hypothesis is about waking concerns, not foresight."
          }
        ]
      },
      {
        "prompt": "A tradition says dreaming of water means 'emotions'. How should this be framed honestly?",
        "options": [
          {
            "text": "In that tradition water is associated with emotion; science has not validated it",
            "correct": true,
            "feedback": "Correct. State the traditional association as belief and note the lack of evidence."
          },
          {
            "text": "Dreaming of water means you will face an emotional event",
            "correct": false,
            "feedback": "That treats an unproven association as fact about what will happen."
          },
          {
            "text": "Water in dreams has a proven, fixed meaning",
            "correct": false,
            "feedback": "No symbol meaning is scientifically proven or fixed."
          }
        ]
      },
      {
        "prompt": "Which statement about dream symbolism is the careful one?",
        "options": [
          {
            "text": "Symbols can feel personally meaningful, but meanings are not scientifically validated",
            "correct": true,
            "feedback": "Correct. Personal meaning is fine to explore; just do not present it as established fact."
          },
          {
            "text": "Every symbol carries the same meaning for everyone",
            "correct": false,
            "feedback": "Meaning varies by person and context; there is no universal key."
          },
          {
            "text": "Symbols have no connection to your life at all",
            "correct": false,
            "feedback": "Dreams often echo your waking concerns, so a personal link is plausible."
          }
        ]
      }
    ]
  },
  {
    "id": "common-themes-match",
    "name": "Common Dream Themes",
    "blurb": "Match well-documented themes to what they usually track.",
    "icon": "🌙",
    "type": "quiz",
    "win": "You read the recurring patterns well.",
    "rounds": [
      {
        "prompt": "Themes like falling, being chased, or teeth falling out are best understood as what?",
        "options": [
          {
            "text": "Common, documented themes that usually track stress",
            "correct": true,
            "feedback": "Correct. These recur across people and often rise with stress."
          },
          {
            "text": "Coded warnings about specific future events",
            "correct": false,
            "feedback": "They are common stress-linked themes, not coded warnings."
          },
          {
            "text": "Rare experiences only a few people ever have",
            "correct": false,
            "feedback": "These are among the most commonly reported themes."
          }
        ]
      },
      {
        "prompt": "A 'being unprepared for an exam' dream most plausibly reflects what?",
        "options": [
          {
            "text": "Waking anxiety about performance or readiness",
            "correct": true,
            "feedback": "Correct. It typically mirrors current stress about being judged or prepared."
          },
          {
            "text": "A sign that an exam result is fixed in advance",
            "correct": false,
            "feedback": "It reflects worry, not a fixed outcome."
          },
          {
            "text": "Proof of a hidden academic talent",
            "correct": false,
            "feedback": "It is about anxiety, not a hidden talent."
          }
        ]
      },
      {
        "prompt": "If a stressful theme keeps recurring, a sensible takeaway is to:",
        "options": [
          {
            "text": "Notice the waking stress it may mirror and tend to it",
            "correct": true,
            "feedback": "Correct. Recurring stress dreams are a cue to address daytime stress."
          },
          {
            "text": "Search for its single official meaning online",
            "correct": false,
            "feedback": "There is no single official meaning; look at your own life context."
          },
          {
            "text": "Assume the dream is causing the stress",
            "correct": false,
            "feedback": "The dream more often reflects stress than causes it."
          }
        ]
      }
    ]
  },
  {
    "id": "sleep-events-id",
    "name": "Name That Night Event",
    "blurb": "Identify sleep paralysis, night terrors, nightmares, and lucid dreams.",
    "icon": "🛏️",
    "type": "quiz",
    "win": "You can tell the night's events apart.",
    "rounds": [
      {
        "prompt": "Briefly being unable to move while waking is best explained as:",
        "options": [
          {
            "text": "Sleep paralysis — lingering REM muscle atonia",
            "correct": true,
            "feedback": "Correct. REM's natural muscle 'switch-off' briefly overlaps with waking."
          },
          {
            "text": "A spirit holding you down",
            "correct": false,
            "feedback": "That is folklore; the cause is lingering REM atonia."
          },
          {
            "text": "A sign of permanent paralysis",
            "correct": false,
            "feedback": "It is brief and harmless, caused by REM atonia."
          }
        ]
      },
      {
        "prompt": "Night terrors differ from nightmares mainly because they are:",
        "options": [
          {
            "text": "NREM events, common in children, often with little memory",
            "correct": true,
            "feedback": "Correct. Night terrors arise from NREM and are frequent in childhood."
          },
          {
            "text": "Always REM dreams that are vividly recalled",
            "correct": false,
            "feedback": "That describes nightmares; night terrors are NREM and poorly recalled."
          },
          {
            "text": "A type of lucid dream",
            "correct": false,
            "feedback": "They are unrelated to lucid dreaming."
          }
        ]
      },
      {
        "prompt": "Lucid dreaming was scientifically verified by which method?",
        "options": [
          {
            "text": "LaBerge's pre-agreed eye-movement signals during REM at Stanford",
            "correct": true,
            "feedback": "Correct. Sleepers signalled awareness with deliberate eye movements measurable on the lab record."
          },
          {
            "text": "Interviewing people after they woke up",
            "correct": false,
            "feedback": "Self-report alone could not verify it; the eye-signal method did."
          },
          {
            "text": "It has never been verified in any lab",
            "correct": false,
            "feedback": "It was verified by LaBerge using eye signals during REM."
          }
        ]
      },
      {
        "prompt": "Activation-synthesis (Hobson and McCarley, 1977) suggests dreams arise when:",
        "options": [
          {
            "text": "The brain weaves a narrative from spontaneous activity during sleep",
            "correct": true,
            "feedback": "Correct. The brain synthesises a story from random internal signals."
          },
          {
            "text": "An outside source plants a message in the mind",
            "correct": false,
            "feedback": "The theory is about internal brain activity, not outside messages."
          },
          {
            "text": "The body needs to display future events",
            "correct": false,
            "feedback": "It makes no claim about future events."
          }
        ]
      }
    ]
  },
  {
    "id": "care-and-grief",
    "name": "Care, Grief, and When to Get Help",
    "blurb": "Handle nightmares and grief dreams with honesty and care.",
    "icon": "⭐",
    "type": "quiz",
    "win": "Kind, honest, and safety-minded.",
    "rounds": [
      {
        "prompt": "Chronic, distressing nightmares are best regarded as:",
        "options": [
          {
            "text": "Treatable — for example with Imagery Rehearsal Therapy, so professional help is worth seeking",
            "correct": true,
            "feedback": "Correct. Sleep medicine recommends IRT; a clinician can help."
          },
          {
            "text": "Something to simply endure with no options",
            "correct": false,
            "feedback": "There are effective treatments; help is available."
          },
          {
            "text": "A certain sign of a serious physical illness",
            "correct": false,
            "feedback": "Nightmares alone are not proof of illness; a professional can assess."
          }
        ]
      },
      {
        "prompt": "Dreams of a loved one who has died are best described as:",
        "options": [
          {
            "text": "Common and often comforting, but not literal contact",
            "correct": true,
            "feedback": "Correct. Grief dreams are frequent and can soothe, without being real contact."
          },
          {
            "text": "Proof that the person is sending a message",
            "correct": false,
            "feedback": "They are a natural part of grief, not verified contact."
          },
          {
            "text": "A sign something is wrong with the dreamer",
            "correct": false,
            "feedback": "They are a normal, common experience in grief."
          }
        ]
      },
      {
        "prompt": "Which response to recurring nightmares is most supportive and honest?",
        "options": [
          {
            "text": "Acknowledge the distress and suggest talking to a sleep professional",
            "correct": true,
            "feedback": "Correct. Validate the feeling and point toward effective, professional care."
          },
          {
            "text": "Promise the nightmares mean good fortune is coming",
            "correct": false,
            "feedback": "That makes an unfounded claim instead of offering real help."
          },
          {
            "text": "Tell them to ignore it because dreams are meaningless",
            "correct": false,
            "feedback": "Dreams can matter to people; dismissal is not supportive, and care exists."
          }
        ]
      }
    ]
  }
].map(makeGame);
