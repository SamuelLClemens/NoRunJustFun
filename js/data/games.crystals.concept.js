// crystals concept games (Soul section). Honest, lesson-grounded quizzes built by
// the shared makeGame() engine. Practice, not proof — the lessons explain the
// evidence. Edit the source, not the wiring.
import { makeGame } from './games.shared.js';

export const CRYSTALS_CONCEPT_GAMES = [
  {
    "id": "rock-or-ritual",
    "name": "Rock or Ritual",
    "blurb": "Tell the real geology from the energy claim.",
    "icon": "🪨",
    "type": "quiz",
    "win": "Sharp eye — facts and folklore kept apart!",
    "rounds": [
      {
        "prompt": "Quartz is genuinely piezoelectric, which is REAL physics used in everyday devices. Where does this property actually get used?",
        "options": [
          {
            "text": "Keeping accurate time in quartz watches",
            "correct": true,
            "feedback": "Correct. A tiny quartz crystal vibrates at a precise frequency when voltage is applied — that is real, measurable physics powering watches."
          },
          {
            "text": "Channelling life-force into the body to realign energy",
            "correct": false,
            "feedback": "No. Piezoelectricity is an electrical effect in circuits; there is no measured 'life-force' it transmits into a person."
          },
          {
            "text": "Detecting illness by glowing near sick organs",
            "correct": false,
            "feedback": "No. Crystals do not glow to diagnose anything; that is not a real or tested phenomenon."
          }
        ]
      },
      {
        "prompt": "What is quartz chemically?",
        "options": [
          {
            "text": "Silicon dioxide, hardness about 7 on the Mohs scale",
            "correct": true,
            "feedback": "Right. Quartz is silicon dioxide (SiO2), hardness roughly 7 — common, durable, and well understood."
          },
          {
            "text": "A frozen form of concentrated cosmic energy",
            "correct": false,
            "feedback": "No. That is a belief, not chemistry. Quartz is an ordinary, abundant mineral."
          },
          {
            "text": "A living organism that grows in your hand",
            "correct": false,
            "feedback": "No. Crystals are non-living minerals; they do not grow from your body heat."
          }
        ]
      },
      {
        "prompt": "A shop sells deep-orange 'citrine' very cheaply. What is most commercial citrine actually?",
        "options": [
          {
            "text": "Heat-treated amethyst",
            "correct": true,
            "feedback": "Correct. Most citrine on the market is amethyst heated until it turns orange — a real, common treatment."
          },
          {
            "text": "Citrine charged under a full moon",
            "correct": false,
            "feedback": "No. Moonlight does not change a mineral. The colour usually comes from heat treatment in a kiln."
          },
          {
            "text": "Petrified orange juice",
            "correct": false,
            "feedback": "No — that is not a thing. The orange tone comes from heating amethyst."
          }
        ]
      },
      {
        "prompt": "Which statement about crystal 'healing energy' is honest?",
        "options": [
          {
            "text": "There is no good scientific evidence for a healing energy beyond relaxation, ritual, and placebo",
            "correct": true,
            "feedback": "Correct. The calm people feel is real, but it is explained by expectation, attention, and ritual — not a special energy."
          },
          {
            "text": "Studies have proven crystals emit a healing field",
            "correct": false,
            "feedback": "No such field has been measured. Controlled studies do not support a unique healing energy."
          }
        ]
      }
    ]
  },
  {
    "id": "handle-with-care",
    "name": "Handle With Care",
    "blurb": "Some pretty stones are genuinely hazardous. Know which.",
    "icon": "⚠️",
    "type": "quiz",
    "win": "Safety first — you would not poison your tea!",
    "rounds": [
      {
        "prompt": "Why should you never soak selenite to 'cleanse' it in water?",
        "options": [
          {
            "text": "Selenite is a soft gypsum mineral and dissolves in water",
            "correct": true,
            "feedback": "Correct. Selenite is gypsum; water degrades and dissolves it, ruining the stone."
          },
          {
            "text": "Water makes its healing power leak out",
            "correct": false,
            "feedback": "No. There is no measurable power to leak — but water genuinely dissolves this soft mineral."
          },
          {
            "text": "It is perfectly fine; selenite loves long water baths",
            "correct": false,
            "feedback": "No. Soaking selenite damages it because it is water-soluble gypsum."
          }
        ]
      },
      {
        "prompt": "Which of these raw stones is genuinely TOXIC and should never be made into a 'gem elixir'?",
        "options": [
          {
            "text": "Cinnabar, which contains mercury",
            "correct": true,
            "feedback": "Correct. Cinnabar is a mercury mineral — toxic. Never put it in water you intend to drink, and avoid inhaling its dust."
          },
          {
            "text": "Clear quartz",
            "correct": false,
            "feedback": "Clear quartz is inert, but the real point stands: never make elixirs from unknown stones, since many are toxic."
          },
          {
            "text": "Rose quartz",
            "correct": false,
            "feedback": "Rose quartz is not the hazard here. Cinnabar contains mercury and is genuinely toxic."
          }
        ]
      },
      {
        "prompt": "Why handle obsidian carefully?",
        "options": [
          {
            "text": "It is volcanic glass and can have very sharp edges",
            "correct": true,
            "feedback": "Correct. Obsidian is natural glass; freshly broken edges can cut like a blade."
          },
          {
            "text": "It absorbs negative thoughts that then infect you",
            "correct": false,
            "feedback": "No. The real, physical risk is sharp glass edges — not absorbed thoughts."
          }
        ]
      },
      {
        "prompt": "Which raw minerals contain toxic heavy metals you should not grind, lick, or inhale?",
        "options": [
          {
            "text": "Malachite and azurite (copper), galena (lead), realgar and orpiment (arsenic)",
            "correct": true,
            "feedback": "Correct. These contain copper, lead, or arsenic. Avoid dust, do not make elixirs, and wash your hands after handling raw specimens."
          },
          {
            "text": "Amethyst and clear quartz",
            "correct": false,
            "feedback": "Those are relatively inert. The genuinely toxic ones are malachite, azurite, galena, realgar, and orpiment."
          }
        ]
      }
    ]
  },
  {
    "id": "what-the-study-found",
    "name": "What the Study Found",
    "blurb": "Match the claim to what evidence actually shows.",
    "icon": "🔬",
    "type": "quiz",
    "win": "Evidence-minded and honest — well done!",
    "rounds": [
      {
        "prompt": "In the well-known French and Williams experiment, what did people report when given FAKE crystals?",
        "options": [
          {
            "text": "They 'felt energy' from fakes about as readily as from real crystals",
            "correct": true,
            "feedback": "Correct. Believers reported sensations from imitation stones just as often — a classic sign of expectation, not a real energy."
          },
          {
            "text": "Only the genuine crystals produced any sensation",
            "correct": false,
            "feedback": "No. That is the point: fakes produced the same reported feelings, pointing to suggestion and placebo."
          }
        ]
      },
      {
        "prompt": "How do psychologists (e.g., the APA) explain the benefits people feel from crystals?",
        "options": [
          {
            "text": "Placebo, ritual, focused attention, and magical thinking",
            "correct": true,
            "feedback": "Correct. The calm is real, but it comes from expectation, ritual, and attention — not a property of the stone."
          },
          {
            "text": "A vibrational frequency that retunes the body's cells",
            "correct": false,
            "feedback": "No measured frequency does this. The honest explanation is placebo and ritual."
          }
        ]
      },
      {
        "prompt": "Is it accurate to say crystals can replace medical treatment?",
        "options": [
          {
            "text": "No — they are not a substitute for medical care, and using them instead can be harmful",
            "correct": true,
            "feedback": "Correct. Enjoy crystals as a calming ritual if you like, but keep following real medical advice."
          },
          {
            "text": "Yes, the right stone removes the need for doctors",
            "correct": false,
            "feedback": "No. There is no evidence for that, and delaying real care can cause harm."
          }
        ]
      },
      {
        "prompt": "Feeling calmer while holding a crystal during a quiet breathing break — what is the honest read?",
        "options": [
          {
            "text": "The calm is real and worthwhile; it comes from the pause and ritual, not the stone's 'energy'",
            "correct": true,
            "feedback": "Correct. A mindful pause genuinely helps. The stone is a cue and focus, not the active ingredient."
          },
          {
            "text": "It proves the crystal emitted healing energy",
            "correct": false,
            "feedback": "No. A relaxing ritual explains it; that does not demonstrate any special energy."
          }
        ]
      }
    ]
  },
  {
    "id": "tradition-says",
    "name": "In This Tradition…",
    "blurb": "Know the folklore as folklore — clearly labelled belief.",
    "icon": "🔮",
    "type": "quiz",
    "win": "You know the lore — and that it is lore!",
    "rounds": [
      {
        "prompt": "In crystal-healing tradition, amethyst is commonly associated with which theme? (This is the belief, not a tested fact.)",
        "options": [
          {
            "text": "Calm and clear-headedness",
            "correct": true,
            "feedback": "Correct — in the tradition. Amethyst is linked to calm and clarity, though this association is not scientifically validated."
          },
          {
            "text": "A clinically proven cure for insomnia",
            "correct": false,
            "feedback": "No. Even within the lore it is about calm; and there is no proof it treats insomnia."
          }
        ]
      },
      {
        "prompt": "In the tradition, rose quartz is most associated with what? (Belief, not evidence.)",
        "options": [
          {
            "text": "Love and self-compassion",
            "correct": true,
            "feedback": "Correct — traditionally. Rose quartz is the 'love stone' in folklore; the meaning is cultural, not a measured effect."
          },
          {
            "text": "A reliable boost to physical strength",
            "correct": false,
            "feedback": "No. That is neither the traditional theme nor supported by evidence."
          }
        ]
      },
      {
        "prompt": "Where did the popular modern birthstone lists largely come from?",
        "options": [
          {
            "text": "They were largely standardised by jewelers around 1912",
            "correct": true,
            "feedback": "Correct. The familiar lists are a relatively recent commercial standard, not ancient cosmic law."
          },
          {
            "text": "They were handed down unchanged from prehistory",
            "correct": false,
            "feedback": "No. Lists vary across cultures and history; the common modern one was set by jewelers around 1912."
          }
        ]
      },
      {
        "prompt": "A friend says 'science has confirmed that black tourmaline blocks bad energy.' What is the honest response?",
        "options": [
          {
            "text": "That is a traditional belief, not a scientific finding",
            "correct": true,
            "feedback": "Correct. You can describe the lore respectfully while being clear it has not been validated by evidence."
          },
          {
            "text": "Yes, that is established physics",
            "correct": false,
            "feedback": "No. 'Bad energy' is not a measured quantity; this is folklore, not physics."
          }
        ]
      }
    ]
  }
].map(makeGame);
