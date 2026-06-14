// AUTO-DERIVED from the vetted panel library (you-got-this-design/library/movements.json).
// EXTENDS the frozen 29-id exercises.js WITHOUT modifying it: new movements + tier metadata
// live here and are merged at import time, so js/data/exercises.js stays byte-stable.
// Every new movement ships caption-first: poses.js has no rig for these ids yet, so the
// avatar holds its base pose (POSES[id] || null) while the aria-live captions carry the move.

export const NEW_EXERCISES = [
  {
    "id": "dynamic-leg-swings",
    "name": "Supported Leg Swings",
    "tags": [
      "mobility"
    ],
    "blocks": [
      "warmup"
    ],
    "sided": true,
    "secs": 40,
    "why": "A brisker, fuller-range dynamic warm-up to prime the hips for moderate and vigorous lower-body work, while a wall or chair keeps it safe and steady.",
    "cues": [
      "Hold your support and stand tall",
      "Swing the leg easy, like a pendulum",
      "Let the torso stay quiet and steady",
      "Smooth swings, no flinging"
    ]
  },
  {
    "id": "torso-rotations",
    "name": "Gentle Standing Torso Twists",
    "tags": [
      "mobility"
    ],
    "blocks": [
      "warmup"
    ],
    "sided": false,
    "secs": 45,
    "why": "Wake up rotational spinal mobility — the motion behind reaching into the back seat — and raise core temperature before moderate or vigorous work.",
    "cues": [
      "Turn from your middle, hips stay quiet",
      "Let your arms swing easy and heavy",
      "Rotate from the mid-back, not the neck",
      "Smooth and rhythmic, side to side"
    ]
  },
  {
    "id": "ankle-prep",
    "name": "Ankle Wake-Ups",
    "tags": [
      "mobility"
    ],
    "blocks": [
      "warmup"
    ],
    "sided": true,
    "secs": 45,
    "why": "Prepare the ankles and lower legs for standing strength and balance work, and ease the stiffness that builds from being on the feet all day with a baby.",
    "cues": [
      "Point your toes away, then flex them back",
      "Move slow through the whole range",
      "Draw easy circles with your foot",
      "Switch feet when you are ready"
    ]
  },
  {
    "id": "wrist-prep",
    "name": "Wrist and Hand Warm-Up",
    "tags": [
      "mobility"
    ],
    "blocks": [
      "warmup"
    ],
    "sided": false,
    "secs": 40,
    "why": "Prepare the wrists and hands for any tabletop or weight-bearing work and relieve the strain that builds from constant baby-lifting and feeding holds.",
    "cues": [
      "Circle your wrists slow, both ways",
      "Open wide, then soft fists",
      "Ease into a gentle forearm stretch",
      "Shake your hands out, nice and loose"
    ]
  },
  {
    "id": "spinal-wave-standing",
    "name": "Standing Spinal Wave",
    "tags": [
      "mobility"
    ],
    "blocks": [
      "warmup"
    ],
    "sided": false,
    "secs": 45,
    "why": "Mobilise the spine segment by segment and gently release the back of the body — a calming, breath-led ramp that suits the gentle No Sweat tier while still warming a moderate session.",
    "cues": [
      "Chin drops, roll down bone by bone",
      "Knees soft, let everything hang heavy",
      "Stack back up slowly from the base",
      "Head comes up last, easy does it"
    ]
  },
  {
    "id": "step-out-warmup",
    "name": "Side Step-Outs",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "warmup"
    ],
    "sided": false,
    "secs": 45,
    "why": "A genuinely low-impact way to raise the heart rate and warm the whole body for moderate and vigorous sessions, honouring the no-jumping rule while still getting the blood moving.",
    "cues": [
      "Step out and together, light and low",
      "Keep it smooth, both feet stay grounded",
      "Add your arms if you want a little more",
      "Find your rhythm, you set the pace"
    ]
  },
  {
    "id": "heel-slides",
    "name": "Heel Slides",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main",
      "warmup"
    ],
    "sided": true,
    "secs": 50,
    "why": "An early, low-load way to load the deep core through limb movement without any trunk flexion, a classic next step after connection breathing. Heel slides are a standard progression in postpartum / diastasis-recti rehab taught by pelvic health physiotherapists.",
    "cues": [
      "Exhale, slide one heel slowly away",
      "Keep your belly flat, no doming or bulging",
      "Stop where your back stays still",
      "Inhale, slide it home with control"
    ]
  },
  {
    "id": "deadbug-supported",
    "name": "Supported Dead Bug",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 50,
    "why": "A controlled deep-core loader that trains anti-extension stability without ever flexing the spine, keeping it firmly inside the no-crunch / no-sit-up envelope. Feet-supported dead-bug variants are standard progressions in postpartum and diastasis-recti rehab.",
    "cues": [
      "Feet supported, back soft and quiet",
      "Exhale, lower one heel slowly",
      "Belly stays flat, no doming or bulging",
      "Inhale, bring it back, then switch"
    ]
  },
  {
    "id": "bird-dog-knee-hover",
    "name": "Bird Dog Knee Hover",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 45,
    "why": "A vigorous-within-ceiling core progression that keeps the proven diastasis-recti-safe bird-dog mechanics while adding hover load, deliberately avoiding the full plank entirely. Anti-rotation quadruped progressions are an accepted late-stage postpartum core step in pelvic health physiotherapy practice; gating it to Super Sweaty with screening reflects that it is appropriate only once core control is well established.",
    "cues": [
      "Hover the knees low, spine long and strong",
      "Exhale, reach arm and opposite leg",
      "Hips dead level, no twist, no doming",
      "Inhale, return slow, then rest the knees"
    ]
  },
  {
    "id": "side-lying-leg-lift",
    "name": "Side-Lying Leg Lift",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 50,
    "why": "Builds lateral hip and pelvic stability through a longer lever than clamshell, supporting gait and easing lower-back load, with no abdominal flexion at all. Lateral hip strengthening is a routine part of pelvic health physiotherapy postpartum programming and is fully diastasis-recti-safe.",
    "cues": [
      "Hips stacked, top leg long",
      "Exhale, lift to about hip height",
      "Toes forward, lead with the heel",
      "Lower slow, keep your waist long"
    ]
  },
  {
    "id": "wall-incline-press",
    "name": "Wall Incline Hold",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 40,
    "why": "Delivers a graded anti-extension core hold while explicitly avoiding the floor plank that the safety envelope forbids; the incline is fully adjustable so the same movement serves every tier. Incline / wall planks are the standard pelvic-floor-and-diastasis-safe entry to plank-family loading in postpartum physiotherapy.",
    "cues": [
      "Hands on the wall, one long line",
      "Exhale, gently draw the deep core up",
      "Belly flat, no doming, keep breathing",
      "Higher hands make it kinder"
    ]
  },
  {
    "id": "pelvic-floor-connect",
    "name": "Pelvic Floor Connect",
    "tags": [
      "breath"
    ],
    "blocks": [
      "main",
      "warmup",
      "close"
    ],
    "sided": false,
    "secs": 75,
    "why": "A focused pelvic-floor connection practice that trains both the lift AND the equally important release, the cornerstone skill the postpartum flagship is built around. Pelvic-floor muscle training is endorsed in ACOG postpartum guidance and is a central pelvic health physiotherapy intervention.",
    "cues": [
      "Inhale, let the pelvic floor soften open",
      "Exhale, gently lift and sip upward",
      "Hold light for a moment, keep breathing",
      "Let it fully release, jaw and bottom soft"
    ]
  },
  {
    "id": "reverse-lunge",
    "name": "Steady Reverse Lunge",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 50,
    "why": "A knee-friendly single-leg strength builder, more forgiving than a forward lunge because the front knee stays stacked, training the carry-and-stair strength of daily life. [evidence: reverse lunges reduce anterior knee shear versus forward lunges (general biomechanics reasoning); load progression per ACSM, postpartum graded return per ACOG.]",
    "cues": [
      "Step back soft, lower with control",
      "Most of your weight in your front heel",
      "Chest tall, back knee drops down",
      "Press up slow, no need to rush"
    ]
  },
  {
    "id": "sit-to-stand",
    "name": "Sit-to-Stand",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "The single most functional strength rehearsal for postpartum life: getting up off the floor or a chair with a baby in arms, scaled safely from a chair. [evidence: sit-to-stand is a validated functional lower-limb strength and rise-capacity exercise (clinical functional-assessment use); postpartum-appropriate and graded per ACOG.]",
    "cues": [
      "Nose over toes, then press to stand",
      "Push through your heels",
      "Lower slow, kiss the seat",
      "Hands free if you can, that is plenty"
    ]
  },
  {
    "id": "wall-pushup",
    "name": "Wall & Incline Push-Up",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "A pressing-strength builder and the postpartum-safe stand-in for push-ups and planks, with load dialed entirely by the incline angle. [evidence: incline push-ups are a graded regression of the push-up pattern (ACSM resistance-training progression); chosen specifically to avoid the prohibited full plank per diastasis-recti safety consensus.]",
    "cues": [
      "Body long, one straight line",
      "Bend the elbows, chest toward the wall",
      "Exhale, press the wall away",
      "Steeper means easier, your call"
    ]
  },
  {
    "id": "glute-bridge-march",
    "name": "Marching Bridge",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 50,
    "why": "A progression of the trusted bridge that adds single-leg pelvic stability — exactly the control needed to carry a baby on one hip without the back complaining. [evidence: bridging and marching bridges are core-stability staples and are diastasis-recti-safe alternatives to crunches per pelvic-health physiotherapy consensus; load progression per ACSM.]",
    "cues": [
      "Exhale, float the hips up level",
      "Lift one foot, keep your hips still",
      "Like balancing a tray on your pelvis",
      "Slow and even, no rushing"
    ]
  },
  {
    "id": "standing-row",
    "name": "Standing Row",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "Strengthen the pulling muscles of the upper back to counter the rounded-forward posture of feeding and carrying, with no equipment required. [evidence: rowing strengthens scapular retractors to balance habitual flexed posture (general musculoskeletal reasoning); resistance progression via band per ACSM; postpartum-appropriate.]",
    "cues": [
      "Pull your elbows back along your ribs",
      "Squeeze the shoulder blades together",
      "Open the chest, drop the shoulders",
      "Release forward slow and controlled"
    ]
  },
  {
    "id": "hip-hinge",
    "name": "Hip Hinge",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "Teach the flat-backed hip hinge — the single most important pattern for lifting a car seat or a toddler without hurting the back. [evidence: the hip hinge is the foundational safe-lifting pattern in injury-prevention and occupational-health guidance (general consensus); postpartum graded loading per ACOG and pelvic-health physiotherapy breath cues.]",
    "cues": [
      "Push your hips back, back stays flat",
      "Slide your hands down your thighs",
      "Feel it in the backs of your legs",
      "Squeeze your glutes to stand tall"
    ]
  },
  {
    "id": "marching",
    "name": "Standing March",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "warmup",
      "main"
    ],
    "sided": false,
    "secs": 60,
    "why": "A friendly, accessible way to lift the heart rate and warm the whole body without any impact — the gateway cardio move that everyone can do.",
    "cues": [
      "Lift one knee, set it down softly",
      "Let your arms swing easy and natural",
      "Keep a pace where you could still chat",
      "Stand tall, crown of your head lifting"
    ]
  },
  {
    "id": "step-touch",
    "name": "Step-Touch",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "warmup",
      "main"
    ],
    "sided": false,
    "secs": 60,
    "why": "A rhythmic, low-skill side-to-side move that warms the body and gently raises heart rate — easy to follow even while distracted.",
    "cues": [
      "Step wide, then tap your feet together",
      "Stay low and quiet, no bouncing",
      "Let a gentle sway carry you side to side",
      "Add a soft arm swing if it feels good"
    ]
  },
  {
    "id": "step-backs",
    "name": "Step-Backs",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "A gentle alternating step that builds leg strength and elevates heart rate while keeping both feet in contact with the ground — no impact.",
    "cues": [
      "Step back, tap lightly, and return",
      "Press through your front heel to stand tall",
      "Keep your chest lifted, no leaning forward",
      "Find a steady, repeatable rhythm"
    ]
  },
  {
    "id": "fast-feet",
    "name": "Light Fast Feet",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "An interval-style burst that genuinely elevates heart rate for the Super Sweaty tier while keeping both feet low and contact soft — vigorous without impact.",
    "cues": [
      "Quick little feet, stay low to the floor",
      "Light and fast — no hopping, no bouncing",
      "Pump your arms to keep the rhythm",
      "Slow to a march to catch your breath"
    ]
  },
  {
    "id": "knee-drives",
    "name": "Standing Knee Drives",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 40,
    "why": "A full-body knee-and-arm drive that raises heart rate and builds coordinated core control, scalable from controlled to vigorous without any impact.",
    "cues": [
      "Drive your knee up, pull your arms down",
      "Exhale as the knee comes up",
      "Stand tall, keep the standing leg strong",
      "Lower with control, no flopping down"
    ]
  },
  {
    "id": "lateral-steps",
    "name": "Lateral Steps",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "warmup",
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "A low, athletic side-to-side travel that warms the hips and lifts heart rate while keeping both feet grounded — impact-free conditioning.",
    "cues": [
      "Stay low and step side to side",
      "Weight in your heels, chest lifted",
      "Smooth and controlled, no bouncing",
      "Push the floor away with each step"
    ]
  },
  {
    "id": "shadow-box",
    "name": "Shadow Boxing",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 60,
    "why": "An empowering upper-body cardio move that lifts heart rate and channels energy, with both feet planted and zero impact — a confidence builder.",
    "cues": [
      "Punch forward, then back to guard",
      "Exhale sharply with each punch",
      "Keep your knees soft, feet planted",
      "Let your waist rotate, stay tall"
    ]
  },
  {
    "id": "wall-climbers",
    "name": "Wall Mountain-Climbers",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 40,
    "why": "A postpartum-safe, plank-free way to get a climber-style cardio and core stimulus using a wall — vigorous-capable while honouring the no-full-plank rule.",
    "cues": [
      "Long line from head to heels",
      "Draw one knee up, then the other",
      "Exhale as the knee comes in",
      "Keep your hips quiet, no bouncing"
    ]
  },
  {
    "id": "step-jacks",
    "name": "Step-Out Jacks",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "warmup",
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "A no-jump take on the classic jumping jack that delivers the same full-body cardio rhythm while keeping one foot grounded — impact-free and pelvic-floor-considerate.",
    "cues": [
      "Step wide, sweep your arms up",
      "Step in, arms come down",
      "One foot always stays on the floor",
      "Big arms, soft knees, no hopping"
    ]
  },
  {
    "id": "skater-steps",
    "name": "Skater Steps",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "A graceful, grounded skater pattern that lifts heart rate and challenges lateral strength and balance without the jump or impact of a true skater hop.",
    "cues": [
      "Step back and across, like a slow skate",
      "Stay low, sweep your arm with you",
      "Press back to centre with control",
      "Feet stay grounded — no hopping"
    ]
  },
  {
    "id": "heel-digs",
    "name": "Heel Digs",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "warmup",
      "main"
    ],
    "sided": false,
    "secs": 45,
    "why": "A gentle, low-skill warm-up and cardio move pairing alternating heel reaches with an arm pull — accessible, grounded, and easy on the pelvic floor.",
    "cues": [
      "Dig one heel forward, pull your arms back",
      "Keep it low and rhythmic, no bouncing",
      "Switch heels at a comfortable pace",
      "Soft knees, tall chest, easy breath"
    ]
  },
  {
    "id": "sun-flow-gentle",
    "name": "Gentle Sunrise Flow",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "warmup",
      "main"
    ],
    "sided": true,
    "secs": 60,
    "why": "A flowing, breath-linked warm-up-into-main sequence that wakes the whole body, links movement to breath, and scales from a restorative wake-up to a gentle low-impact cardio flow. A flowing alternative to the existing static warm-up moves.",
    "cues": [
      "Inhale arms up, exhale fold soft",
      "One breath, one movement, no rush",
      "Bend your knees whenever you like",
      "Let your breath lead the whole flow"
    ]
  },
  {
    "id": "crescent-lunge",
    "name": "Crescent Lunge",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 40,
    "why": "A standing, energized hip-flexor opener and leg-strengthener that adds heat and balance to the main block while staying jump-free and low-impact — the active counterpart to the restorative low-lunge.",
    "cues": [
      "Lift the back knee, leg long and strong",
      "Front knee over your ankle",
      "Reach your arms up, ribs soft",
      "Stand tall and breathe steady"
    ]
  },
  {
    "id": "half-pigeon",
    "name": "Gentle Half-Pigeon",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "main",
      "winddown"
    ],
    "sided": true,
    "secs": 60,
    "why": "A deep but optional outer-hip and glute release for stubborn carrying-side tension, offered with strong props and a fully supported regression because the front-knee load makes it the riskiest hip opener in the bank.",
    "cues": [
      "Front shin in, support under your hip",
      "Square your hips, no forcing",
      "Stay tall or melt forward, your choice",
      "Let the outer hip slowly soften"
    ]
  },
  {
    "id": "standing-fold-variations",
    "name": "Standing Forward Fold Variations",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "warmup",
      "main",
      "winddown"
    ],
    "sided": false,
    "secs": 45,
    "why": "A small family of forward-fold options spanning supported, classic, and wide-legged so the same posterior-chain release scales across warm-up, main, and wind-down and across mobility levels. Complements the existing rag-doll fold with safer, more graded entry points.",
    "cues": [
      "Half-fold first, back long and flat",
      "Soft knees, then hang heavy",
      "Step wide and fold between your feet",
      "Roll up slow, head comes up last"
    ]
  },
  {
    "id": "cobra-childs-flow",
    "name": "Cobra to Child's Flow",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "main",
      "winddown"
    ],
    "sided": false,
    "secs": 60,
    "why": "A soothing breath-linked spinal flow that counters the forward-curl of feeding and carrying by gently opening the chest, then resting the back — pairing the existing baby-cobra and child's-pose into one wave. Diastasis-safe by keeping the back-bend low and exhale-led.",
    "cues": [
      "Inhale, lift your chest just a little",
      "Low is lovely, lead with your upper back",
      "Exhale, melt back to child's pose",
      "Move like a slow wave with your breath"
    ]
  },
  {
    "id": "warrior-1",
    "name": "Warrior I",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 45,
    "why": "A grounded, powerful standing strength-and-stability pose that builds leg strength and confidence, complementing the existing Warrior II with a square-hipped, forward-facing shape. Adds heat to the main block while staying jump-free and low-impact.",
    "cues": [
      "Front knee over your ankle, back heel down",
      "Hug your back hip forward",
      "Sweep your arms up, shoulders soft",
      "Stand strong and proud, keep breathing"
    ]
  },
  {
    "id": "supported-rest",
    "name": "Supported Reclined Rest",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "winddown",
      "close"
    ],
    "sided": false,
    "secs": 60,
    "why": "A fully-supported final rest (a gentle, propped relaxation pose) that lets the body release completely — essential after vigorous Super Sweaty work where deliberate down-regulation matters most. Supported relaxation and slow breathing promote parasympathetic recovery after exertion, aligning with general autonomic-recovery principles and ACOG's emphasis on gentle postpartum progression [evidence: slow-breathing parasympathetic effect well supported; pose-specific trials thin — flag].",
    "cues": [
      "Let the cushion hold all your weight",
      "Palms up, arms heavy and wide",
      "Let your face go completely slack",
      "There is nowhere to be but here"
    ]
  },
  {
    "id": "reclined-twist",
    "name": "Gentle Reclined Twist",
    "tags": [
      "mobility"
    ],
    "blocks": [
      "winddown",
      "close"
    ],
    "sided": true,
    "secs": 40,
    "why": "A slow, supported lying twist that decompresses the spine and releases the lower back at the end of a session, restoring gentle rotation lost to all the carrying and feeding. Controlled, low-load spinal rotation is appropriate in postpartum recovery when kept gentle and breath-led, consistent with pelvic health physiotherapy consensus and ACOG's gradual-progression guidance.",
    "cues": [
      "Knees drift to one side, slow and soft",
      "Keep both shoulders heavy on the mat",
      "Rest your knees on a cushion if they hover",
      "Turn your gaze away if your neck likes it"
    ]
  },
  {
    "id": "neck-jaw-release",
    "name": "Neck and Jaw Release",
    "tags": [
      "mobility"
    ],
    "blocks": [
      "winddown",
      "close"
    ],
    "sided": true,
    "secs": 60,
    "why": "A targeted release for the neck and jaw — where the tension of looking down at a little face, and the unconscious clench of a long day, both collect. Releasing habitual jaw and neck tension is a recognised relaxation cue; the soft-sigh exhale supports a parasympathetic shift [evidence: jaw-relaxation-as-stress-release is widely taught but trial evidence is thin — flag; extended-exhale autonomic effect is well supported].",
    "cues": [
      "Let one ear drift toward your shoulder",
      "Let the weight of your head do the work",
      "Unclench your jaw, let the teeth part",
      "Soft sigh out — let the face go slack"
    ]
  },
  {
    "id": "extended-exhale-breath",
    "name": "Long Slow Breath",
    "tags": [
      "breath"
    ],
    "blocks": [
      "close",
      "main"
    ],
    "sided": false,
    "secs": 75,
    "why": "A longer guided breath built around a lengthened exhale — the most reliable, portable way to down-shift after effort and the backbone of the Meditation tier's rest phase. Slow breathing with a prolonged exhale is well documented to increase parasympathetic (vagal) tone and support stress and heart-rate down-regulation; this is among the better-supported claims in the bank, consistent with ACSM/breathing-physiology literature [evidence: solid for the extended-exhale parasympathetic mechanism].",
    "cues": [
      "Breathe in slow, about four",
      "Let the exhale stretch longer, six or eight",
      "Feel your belly soften as you empty",
      "Let the long breath out do the calming"
    ]
  }
];

// tier eligibility for ALL movements (frozen 29 + new). Absent => all tiers.
export const TIER_ELIGIBILITY = {
  "neck-rolls": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "shoulder-rolls": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "hip-circles": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "arm-sweeps": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "side-reach": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "cat-cow": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "dynamic-leg-swings": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "torso-rotations": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "ankle-prep": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "wrist-prep": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "spinal-wave-standing": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "step-out-warmup": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "bridge": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "bird-dog": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "pelvic-breath": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "clamshell": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "kickbacks": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "heel-slides": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "deadbug-supported": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "bird-dog-knee-hover": [
    "super_sweaty"
  ],
  "side-lying-leg-lift": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "wall-incline-press": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "pelvic-floor-connect": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "chair-pose": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "warrior2": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "squats": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "baby-cobra": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "tree-pose": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "goddess": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "reverse-lunge": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "sit-to-stand": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "wall-pushup": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "glute-bridge-march": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "standing-row": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "hip-hinge": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "marching": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "step-touch": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "step-backs": [
    "slightly_sweaty"
  ],
  "fast-feet": [
    "super_sweaty"
  ],
  "knee-drives": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "lateral-steps": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "shadow-box": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "wall-climbers": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "step-jacks": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "skater-steps": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "heel-digs": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "down-dog": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "low-lunge": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "figure-four": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "butterfly": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "seated-twist": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "thread-needle": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "forward-fold": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "sun-flow-gentle": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "crescent-lunge": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "half-pigeon": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "standing-fold-variations": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "cobra-childs-flow": [
    "no_sweat",
    "slightly_sweaty"
  ],
  "warrior-1": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "childs-pose": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "happy-baby": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "legs-up": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "box-breath": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "kind-close": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "supported-rest": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "reclined-twist": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "neck-jaw-release": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "extended-exhale-breath": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ]
};

// chair/floor adaptive flags (accessibility). chairOk: an honest seated/standing variant exists.
export const SPACE_FLAGS = {
  "neck-rolls": {
    "chairOk": true,
    "floorOk": false
  },
  "shoulder-rolls": {
    "chairOk": true,
    "floorOk": false
  },
  "hip-circles": {
    "chairOk": true,
    "floorOk": false
  },
  "arm-sweeps": {
    "chairOk": true,
    "floorOk": false
  },
  "side-reach": {
    "chairOk": true,
    "floorOk": false
  },
  "cat-cow": {
    "chairOk": false,
    "floorOk": true
  },
  "dynamic-leg-swings": {
    "chairOk": true,
    "floorOk": false
  },
  "torso-rotations": {
    "chairOk": true,
    "floorOk": false
  },
  "ankle-prep": {
    "chairOk": true,
    "floorOk": false
  },
  "wrist-prep": {
    "chairOk": true,
    "floorOk": false
  },
  "spinal-wave-standing": {
    "chairOk": true,
    "floorOk": false
  },
  "step-out-warmup": {
    "chairOk": true,
    "floorOk": false
  },
  "bridge": {
    "chairOk": false,
    "floorOk": true
  },
  "bird-dog": {
    "chairOk": false,
    "floorOk": true
  },
  "pelvic-breath": {
    "chairOk": true,
    "floorOk": false
  },
  "clamshell": {
    "chairOk": false,
    "floorOk": true
  },
  "kickbacks": {
    "chairOk": false,
    "floorOk": true
  },
  "heel-slides": {
    "chairOk": false,
    "floorOk": true
  },
  "deadbug-supported": {
    "chairOk": false,
    "floorOk": true
  },
  "bird-dog-knee-hover": {
    "chairOk": false,
    "floorOk": true
  },
  "side-lying-leg-lift": {
    "chairOk": false,
    "floorOk": true
  },
  "wall-incline-press": {
    "chairOk": true,
    "floorOk": false
  },
  "pelvic-floor-connect": {
    "chairOk": true,
    "floorOk": false
  },
  "chair-pose": {
    "chairOk": true,
    "floorOk": false
  },
  "warrior2": {
    "chairOk": true,
    "floorOk": false
  },
  "squats": {
    "chairOk": true,
    "floorOk": false
  },
  "baby-cobra": {
    "chairOk": false,
    "floorOk": true
  },
  "tree-pose": {
    "chairOk": true,
    "floorOk": false
  },
  "goddess": {
    "chairOk": true,
    "floorOk": false
  },
  "reverse-lunge": {
    "chairOk": true,
    "floorOk": false
  },
  "sit-to-stand": {
    "chairOk": true,
    "floorOk": false
  },
  "wall-pushup": {
    "chairOk": true,
    "floorOk": false
  },
  "glute-bridge-march": {
    "chairOk": false,
    "floorOk": true
  },
  "standing-row": {
    "chairOk": true,
    "floorOk": false
  },
  "hip-hinge": {
    "chairOk": true,
    "floorOk": false
  },
  "marching": {
    "chairOk": true,
    "floorOk": false
  },
  "step-touch": {
    "chairOk": true,
    "floorOk": false
  },
  "step-backs": {
    "chairOk": true,
    "floorOk": false
  },
  "fast-feet": {
    "chairOk": true,
    "floorOk": false
  },
  "knee-drives": {
    "chairOk": true,
    "floorOk": false
  },
  "lateral-steps": {
    "chairOk": true,
    "floorOk": false
  },
  "shadow-box": {
    "chairOk": true,
    "floorOk": false
  },
  "wall-climbers": {
    "chairOk": true,
    "floorOk": false
  },
  "step-jacks": {
    "chairOk": true,
    "floorOk": false
  },
  "skater-steps": {
    "chairOk": true,
    "floorOk": false
  },
  "heel-digs": {
    "chairOk": true,
    "floorOk": false
  },
  "down-dog": {
    "chairOk": false,
    "floorOk": true
  },
  "low-lunge": {
    "chairOk": false,
    "floorOk": true
  },
  "figure-four": {
    "chairOk": false,
    "floorOk": true
  },
  "butterfly": {
    "chairOk": true,
    "floorOk": false
  },
  "seated-twist": {
    "chairOk": true,
    "floorOk": false
  },
  "thread-needle": {
    "chairOk": false,
    "floorOk": true
  },
  "forward-fold": {
    "chairOk": true,
    "floorOk": false
  },
  "sun-flow-gentle": {
    "chairOk": true,
    "floorOk": true
  },
  "crescent-lunge": {
    "chairOk": true,
    "floorOk": false
  },
  "half-pigeon": {
    "chairOk": false,
    "floorOk": true
  },
  "standing-fold-variations": {
    "chairOk": true,
    "floorOk": false
  },
  "cobra-childs-flow": {
    "chairOk": false,
    "floorOk": true
  },
  "warrior-1": {
    "chairOk": true,
    "floorOk": false
  },
  "childs-pose": {
    "chairOk": false,
    "floorOk": true
  },
  "happy-baby": {
    "chairOk": false,
    "floorOk": true
  },
  "legs-up": {
    "chairOk": false,
    "floorOk": true
  },
  "box-breath": {
    "chairOk": true,
    "floorOk": false
  },
  "kind-close": {
    "chairOk": true,
    "floorOk": false
  },
  "supported-rest": {
    "chairOk": false,
    "floorOk": true
  },
  "reclined-twist": {
    "chairOk": false,
    "floorOk": true
  },
  "neck-jaw-release": {
    "chairOk": true,
    "floorOk": false
  },
  "extended-exhale-breath": {
    "chairOk": true,
    "floorOk": false
  }
};

// Hard safety deny-list patterns enforced by the assembler at every tier.
export const DENY_PATTERNS = ["crunch", "situp", "sit-up", "plank", "jump", "burpee", "hop", "v-up", "russian-twist", "wheel"];
