// 50 new no-equipment moves (Stretching / Yoga / Exercises) + the full workout
// CATEGORY map. Captions-led: these play with spoken cues + captions; the coach
// rests in its calm standing pose for moves without authored keyframes. Assembled
// by /tmp/gen_moves.py from reviewed JSON. Merged in main.js (pool + tierEligibility)
// and profiles.js (space flags); WORKOUT_CATEGORY drives the three Body paths.

export const EXTRA_EXERCISES = [
  {
    "id": "wall-calf-stretch",
    "name": "Calf Stretch at the Wall",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "warmup",
      "winddown"
    ],
    "sided": true,
    "secs": 50,
    "why": "Long days on your feet, often with a little one on your hip, leave the calves tight and short. Pressing into a wall lengthens them slowly so your ankles and steps feel easier.",
    "cues": [
      "Hands on the wall, one foot back",
      "Keep the back heel pressing down",
      "Lean in until you feel a gentle line up the calf",
      "Breathe and ease off if it ever feels sharp"
    ]
  },
  {
    "id": "doorway-chest-opener",
    "name": "Doorway Chest Opener",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "warmup",
      "winddown"
    ],
    "sided": false,
    "secs": 50,
    "why": "Feeding, holding and carrying all round the shoulders forward. Resting your forearms in a doorway opens the chest and front of the shoulders, so you can stand a little taller.",
    "cues": [
      "Forearms on the door frame, elbows about shoulder height",
      "Step one foot through and lean gently",
      "Feel a soft stretch across the chest, never a strain",
      "Keep your ribs soft and your breath easy"
    ]
  },
  {
    "id": "seated-side-body",
    "name": "Seated Side Body Stretch",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "warmup",
      "main",
      "winddown"
    ],
    "sided": true,
    "secs": 45,
    "why": "The sides of the body get squashed from slouching and one-armed carrying. Reaching up and over creates space along your ribs and waist, and makes a fuller breath feel possible.",
    "cues": [
      "Sit tall, both sitting bones grounded",
      "Float one arm up and lean gently to the side",
      "Keep the opposite hip heavy on the seat",
      "Reach long rather than far, breathing into your ribs"
    ]
  },
  {
    "id": "chair-quad-stretch",
    "name": "Supported Standing Quad",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "main",
      "winddown"
    ],
    "sided": true,
    "secs": 50,
    "why": "The fronts of the thighs work hard every time you stand up with a baby in arms. Holding a chair lets you stretch them safely without worrying about balance.",
    "cues": [
      "Hold the chair back with one hand",
      "Bend a knee and catch that ankle behind you",
      "Keep your knees side by side and tailbone tucked",
      "Stand tall, no need to pull hard"
    ]
  },
  {
    "id": "wall-hamstring-stretch",
    "name": "Gentle Hamstring at the Wall",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "main",
      "winddown"
    ],
    "sided": true,
    "secs": 55,
    "why": "Lying down with one leg up a wall is a kind, supported way to lengthen tight hamstrings. The floor holds your back so nothing is forced and your whole body can settle.",
    "cues": [
      "Lie down with your hips near the wall",
      "Float one leg up and rest the heel against the wall",
      "Soften the knee if the back of the leg shouts",
      "Let the other leg rest however it likes"
    ]
  },
  {
    "id": "wrist-forearm-stretch",
    "name": "Wrist and Forearm Release",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "warmup",
      "winddown"
    ],
    "sided": true,
    "secs": 40,
    "why": "New-parent wrists ache from scooping, lifting and endless holding. Gently stretching the forearm eases that tension so everyday tasks stop nagging at you.",
    "cues": [
      "Extend one arm, palm facing forward",
      "Use the other hand to draw the fingers gently back",
      "Then turn the palm down and ease the fingers under",
      "Soft and slow, easing off the moment it pinches"
    ]
  },
  {
    "id": "upper-trap-stretch",
    "name": "Upper Trap Release",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "warmup",
      "winddown"
    ],
    "sided": true,
    "secs": 45,
    "why": "The ropey muscle between neck and shoulder holds so much of the day's stress and carrying. A slow, supported tilt lets it soften and your shoulders drop away from your ears.",
    "cues": [
      "Sit or stand tall and let one arm hang heavy",
      "Tilt your ear gently toward the other shoulder",
      "Rest that hand on your head, no pulling needed",
      "Breathe into the side of your neck and let go"
    ]
  },
  {
    "id": "lateral-neck-stretch",
    "name": "Side Neck Lengthener",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "warmup",
      "winddown"
    ],
    "sided": true,
    "secs": 40,
    "why": "Hours angled toward a feeding baby leave one side of the neck tight and grumpy. This easy lengthening on each side helps your head feel balanced and free again.",
    "cues": [
      "Lengthen up through the crown of your head",
      "Slide one ear toward the same shoulder",
      "Keep both shoulders soft and level",
      "Hold lightly and switch sides with care"
    ]
  },
  {
    "id": "seated-figure-four",
    "name": "Seated Figure-Four",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "main",
      "winddown"
    ],
    "sided": true,
    "secs": 55,
    "why": "Tight hips are almost a rite of passage after pregnancy. Crossing one ankle over the opposite knee while seated opens the outer hip gently, with the chair doing all the supporting.",
    "cues": [
      "Sit tall and cross one ankle over the other knee",
      "Let that knee drift open and heavy",
      "Hinge forward a touch from the hips for more",
      "Keep your back long, never rounding or forcing"
    ]
  },
  {
    "id": "standing-calf-step",
    "name": "Standing Calf and Heel Stretch",
    "tags": [
      "stretch",
      "mobility"
    ],
    "blocks": [
      "warmup"
    ],
    "sided": true,
    "secs": 45,
    "why": "A gentle staggered-stance stretch warms the calves and ankles before you get moving. It eases that first-step stiffness and helps your stride feel smoother.",
    "cues": [
      "Stand tall, one foot a step behind the other",
      "Press the back heel softly toward the floor",
      "Keep your hips facing forward and square",
      "Hold a chair if you would like steadier balance"
    ]
  },
  {
    "id": "overhead-reach-stretch",
    "name": "Overhead Reach and Lengthen",
    "tags": [
      "stretch",
      "mobility"
    ],
    "blocks": [
      "warmup",
      "winddown"
    ],
    "sided": false,
    "secs": 45,
    "why": "After hunching over a baby all day, reaching tall toward the ceiling lengthens the whole front of the body. It feels like a full-body yawn and resets your posture.",
    "cues": [
      "Float both arms up overhead, fingers spread",
      "Grow tall from your hips to your fingertips",
      "Keep your shoulders sliding down, not bunched",
      "Lower slowly and feel the length stay"
    ]
  },
  {
    "id": "seated-spinal-rotation",
    "name": "Gentle Seated Spinal Rotation",
    "tags": [
      "stretch",
      "mobility"
    ],
    "blocks": [
      "warmup",
      "main",
      "winddown"
    ],
    "sided": true,
    "secs": 50,
    "why": "The spine craves gentle rotation after long, still hours of holding. Turning slowly in a chair frees up the mid-back and eases the everyday twist of reaching behind you.",
    "cues": [
      "Sit tall with both feet flat and grounded",
      "Turn gently from your middle, leading with the ribs",
      "Rest a hand on the chair to guide, not to crank",
      "Let your gaze follow softly and return slowly"
    ]
  },
  {
    "id": "ankle-alphabet",
    "name": "Ankle Alphabet",
    "tags": [
      "mobility"
    ],
    "blocks": [
      "warmup"
    ],
    "sided": true,
    "secs": 50,
    "why": "Swollen, stiff ankles are common in those early postpartum weeks. Drawing letters in the air keeps the joints mobile and the circulation moving, all while you sit and rest.",
    "cues": [
      "Lift one foot and let the leg relax",
      "Draw the alphabet slowly with your big toe",
      "Move from the ankle, keeping the knee quiet",
      "Make the letters big, breathing easy throughout"
    ]
  },
  {
    "id": "wall-shoulder-slide",
    "name": "Wall Shoulder Slide",
    "tags": [
      "stretch",
      "mobility"
    ],
    "blocks": [
      "warmup",
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "Reaching overhead can feel stiff when the shoulders are rounded from carrying. Sliding your arms up a wall guides them through a kind, supported range so reaching feels freer.",
    "cues": [
      "Stand facing the wall, forearms resting on it",
      "Slide your arms slowly upward as far as feels easy",
      "Keep your ribs soft and lower back long",
      "Lower with control, only going as high as comfort allows"
    ]
  },
  {
    "id": "supine-knee-to-chest",
    "name": "Gentle Knee to Chest",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "main",
      "winddown"
    ],
    "sided": true,
    "secs": 55,
    "why": "Lying down and hugging one knee in eases a tired lower back and softens the hips. The floor supports you completely, making it a calming way to wind down.",
    "cues": [
      "Lie on your back, one foot resting on the floor",
      "Draw the other knee gently toward your chest",
      "Hold behind the thigh if that feels kinder",
      "Keep your shoulders heavy and your breath slow"
    ]
  },
  {
    "id": "mountain-pose",
    "name": "Mountain Pose",
    "tags": [
      "mobility"
    ],
    "blocks": [
      "warmup"
    ],
    "sided": false,
    "secs": 45,
    "why": "Mountain Pose looks like simply standing, but it teaches your whole body to stack tall again after months of leaning over a little one. It is the quiet foundation every other pose grows from.",
    "cues": [
      "Plant both feet hip-width and even",
      "Stack your hips over your ankles",
      "Lift the crown of your head gently",
      "Breathe slow and feel grounded"
    ]
  },
  {
    "id": "easy-seat-breath",
    "name": "Easy Seat and Breath",
    "tags": [
      "mobility"
    ],
    "blocks": [
      "warmup",
      "winddown"
    ],
    "sided": false,
    "secs": 60,
    "why": "Sitting tall in Easy Seat and following your breath settles the nervous system in moments. It is a gentle way to arrive in your body before you move, or to soften at the end.",
    "cues": [
      "Cross your shins or sit on a chair",
      "Rest your hands on your thighs",
      "Lengthen up through your spine",
      "Inhale for four, exhale for four"
    ]
  },
  {
    "id": "seated-cat-cow",
    "name": "Seated Cat-Cow",
    "tags": [
      "mobility"
    ],
    "blocks": [
      "warmup"
    ],
    "sided": false,
    "secs": 50,
    "why": "Seated Cat-Cow warms the spine without ever leaving your seat, which is perfect on tired days. Linking the gentle arch and round to your breath wakes up a back that has been holding a baby all day.",
    "cues": [
      "Hands rest on your knees",
      "Inhale, open your chest and look up softly",
      "Exhale, round your back and tuck your chin",
      "Let the movement stay small and easy"
    ]
  },
  {
    "id": "standing-side-bend-flow",
    "name": "Standing Side Bend Flow",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "warmup"
    ],
    "sided": true,
    "secs": 50,
    "why": "Reaching up and over in this side bend flow opens the long muscles along your ribs and waist that compress while nursing. Each breath creates a little more space between your hips and shoulders.",
    "cues": [
      "Reach one arm up on an inhale",
      "Lean gently to the opposite side as you exhale",
      "Keep both feet evenly planted",
      "Float back to center and switch sides"
    ]
  },
  {
    "id": "standing-forward-fold-flow",
    "name": "Standing Forward Fold Flow",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "warmup",
      "main"
    ],
    "sided": false,
    "secs": 55,
    "why": "Folding forward with soft knees releases the whole back of the body and quietly calms a busy mind. Rolling up slowly afterward teaches your spine to find length one bone at a time.",
    "cues": [
      "Bend your knees as much as you like",
      "Let your head and arms hang heavy",
      "Sway side to side if it feels good",
      "Roll up slowly, head comes last"
    ]
  },
  {
    "id": "triangle-pose",
    "name": "Triangle Pose",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 50,
    "why": "Triangle Pose stretches the side body and inner legs while quietly strengthening your standing leg. Resting your hand high on your shin keeps it open and easy rather than a deep reach.",
    "cues": [
      "Step your feet wide and turn one foot out",
      "Reach forward, then rest your hand on your shin",
      "Open your top arm toward the ceiling",
      "Keep your chest broad, not folded down"
    ]
  },
  {
    "id": "wide-leg-fold",
    "name": "Wide-Leg Forward Fold",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 55,
    "why": "This wide-legged fold gives the inner thighs and hamstrings a soothing stretch while letting your head hang to release the neck. With knees soft, it feels grounding rather than intense.",
    "cues": [
      "Step your feet wide, toes facing forward",
      "Soften your knees and hinge from your hips",
      "Let your hands rest on the floor or your legs",
      "Relax your head and breathe into your back"
    ]
  },
  {
    "id": "warrior-3-wall",
    "name": "Gentle Warrior 3 at the Wall",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 50,
    "why": "Using the wall for your hands makes Warrior 3 a steady, confidence-building balance that strengthens your standing leg, hips and core. The wall does the worrying so you can focus on staying long and strong.",
    "cues": [
      "Place both hands flat on the wall",
      "Hinge forward and float one leg back low",
      "Reach back through your heel, hips level",
      "Press into the wall and breathe steady"
    ]
  },
  {
    "id": "gate-pose",
    "name": "Gate Pose",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 50,
    "why": "Kneeling and reaching over an extended leg, Gate Pose opens the side waist and ribs in a way standing bends cannot. It is a kind, supported way to find length through the whole side of your body.",
    "cues": [
      "Kneel and extend one leg out to the side",
      "Rest your bottom hand on that leg",
      "Reach your top arm up and over on an inhale",
      "Keep the bend gentle and your chest open"
    ]
  },
  {
    "id": "cobblers-pose",
    "name": "Cobbler's Pose",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "main",
      "winddown"
    ],
    "sided": false,
    "secs": 60,
    "why": "Sitting with the soles of your feet together, Cobbler's Pose gently opens the hips and inner thighs that tighten from sitting and feeding. Let the knees stay high if that is kinder today.",
    "cues": [
      "Bring the soles of your feet together",
      "Hold your ankles and sit tall",
      "Let your knees drop only as far as comfy",
      "Breathe into your hips, never force them down"
    ]
  },
  {
    "id": "sphinx-pose",
    "name": "Sphinx Pose",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 45,
    "why": "Sphinx Pose is the gentlest of chest openers, propping you on your forearms to strengthen the upper back without any deep bend. It softly counters the daily round of carrying and cradling.",
    "cues": [
      "Lie on your front, forearms down",
      "Stack your elbows under your shoulders",
      "Lift your chest just a little and lengthen",
      "Relax your shoulders away from your ears"
    ]
  },
  {
    "id": "supported-bridge",
    "name": "Supported Bridge",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main",
      "winddown"
    ],
    "sided": false,
    "secs": 55,
    "why": "Lifting into a gentle, supported Bridge wakes up the glutes and the back of the body while softly opening the front of the hips. Kept low and steady, it feels restful rather than effortful.",
    "cues": [
      "Lie down, knees bent, feet hip-width",
      "Press your feet down and lift your hips a little",
      "Keep your ribs soft, glutes gently working",
      "Lower slowly, one bone at a time"
    ]
  },
  {
    "id": "reclined-butterfly",
    "name": "Reclined Butterfly",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "winddown"
    ],
    "sided": false,
    "secs": 70,
    "why": "Lying back with the soles of your feet together lets gravity do all the work, opening the hips and chest while you simply rest. Reclined Butterfly is a permission slip to do nothing for a moment.",
    "cues": [
      "Lie on your back, soles of feet together",
      "Let your knees fall open softly",
      "Rest your arms wide, palms up",
      "Close your eyes and breathe slowly"
    ]
  },
  {
    "id": "legs-up-the-wall",
    "name": "Legs Up the Wall",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "winddown"
    ],
    "sided": false,
    "secs": 75,
    "why": "Resting your legs up a wall eases tired, swollen feet and signals your whole system to slow down. It is one of the most restorative things you can do, and you barely have to move at all.",
    "cues": [
      "Sit close to a wall and swing your legs up",
      "Let your back and hips settle on the floor",
      "Rest your arms wherever feels easy",
      "Soften your jaw and breathe long and low"
    ]
  },
  {
    "id": "savasana",
    "name": "Savasana",
    "tags": [
      "stretch"
    ],
    "blocks": [
      "winddown"
    ],
    "sided": false,
    "secs": 75,
    "why": "Savasana is the final rest that lets everything you have done soak in, calming the nervous system completely. Lying still and letting go is not lazy, it is the most important pose of all.",
    "cues": [
      "Lie on your back and let your legs relax open",
      "Rest your arms beside you, palms up",
      "Let your whole body feel heavy and supported",
      "Just breathe and let go of effort"
    ]
  },
  {
    "id": "wall-sit",
    "name": "Wall Sit",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 45,
    "why": "Leaning into the wall lets your thighs and bottom do honest work while your back stays fully supported. It builds the steady leg strength that carrying a baby up stairs quietly asks for.",
    "cues": [
      "Slide down only as far as feels kind today",
      "Keep knees stacked over ankles, not past your toes",
      "Press your whole back flat into the wall",
      "Breathe slowly instead of holding your breath"
    ]
  },
  {
    "id": "calf-raises",
    "name": "Calf Raises",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 45,
    "why": "Strong calves keep you sure-footed on stairs and steady when you are rocking a little one to sleep. Resting a hand on a wall or chair makes every rep feel safe.",
    "cues": [
      "Rest a hand on a wall or chair for balance",
      "Rise up onto the balls of your feet slowly",
      "Lower your heels with control, never dropping",
      "Keep your ankles tracking straight, not rolling out"
    ]
  },
  {
    "id": "standing-leg-curl",
    "name": "Standing Leg Curls",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 45,
    "why": "Curling your heel toward your bottom wakes up the back of the thigh, a muscle that helps protect your knees and lower back. Holding a chair keeps it gentle and unhurried.",
    "cues": [
      "Hold a chair or wall for steadiness",
      "Bend one knee, drawing the heel up behind you",
      "Keep your standing knee soft, never locked",
      "Lower the foot down slowly and switch sides at the halfway point"
    ]
  },
  {
    "id": "standing-fire-hydrant",
    "name": "Standing Fire Hydrant",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 45,
    "why": "Lifting the knee out to the side wakes up the outer hip, which keeps your pelvis stable through all that walking and lifting. The chair lets you focus on the muscle, not your balance.",
    "cues": [
      "Hold a chair back with both hands",
      "Lift one knee out to the side like opening a gate",
      "Keep your torso tall and steady, not leaning",
      "Lower with control and switch sides halfway"
    ]
  },
  {
    "id": "gentle-good-mornings",
    "name": "Gentle Good Mornings",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 45,
    "why": "Hinging forward with a flat back teaches your hips and bottom to take the load instead of your lower back. It is a kind way to rebuild the bending you do a hundred times a day.",
    "cues": [
      "Place your hands lightly on your hips",
      "Push your bottom back as you tip your chest forward",
      "Keep your back long and flat, knees softly bent",
      "Only go as far as your back stays comfortable"
    ]
  },
  {
    "id": "chair-split-squat",
    "name": "Chair Split Squat",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 50,
    "why": "Resting your back foot lightly on a chair builds one-leg strength for stairs and getting up off the floor. The chair behind you turns a tricky balance move into a steady one.",
    "cues": [
      "Rest the top of your back foot on the chair seat",
      "Lower straight down, bending your front knee",
      "Keep your front knee pointing over your toes",
      "Press up through your front heel and switch legs halfway"
    ]
  },
  {
    "id": "counter-incline-pushup",
    "name": "Counter Incline Push-Up",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 45,
    "why": "Pushing from a kitchen counter builds chest and arm strength without putting pressure on a healing belly. The higher your hands, the gentler it feels.",
    "cues": [
      "Place your hands on a sturdy counter, slightly wider than your shoulders",
      "Step your feet back so your body makes one long line",
      "Bend your elbows to lower your chest toward the counter",
      "Keep your belly gently drawn in and press back up"
    ]
  },
  {
    "id": "standing-oblique-knee-taps",
    "name": "Standing Oblique Knee Taps",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 45,
    "why": "Bringing knee to elbow while standing wakes up the waist gently, with no crunches and no pressure on your belly. It is a friendly way to reconnect with your core after baby.",
    "cues": [
      "Reach one arm up overhead",
      "Draw that elbow down toward the same-side knee as it lifts",
      "Move at a slow, controlled pace, not a swing",
      "Stay tall through your spine and switch sides halfway"
    ]
  },
  {
    "id": "standing-glute-kickback",
    "name": "Standing Glute Kickback",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 45,
    "why": "Pressing one leg straight back behind you strengthens your bottom, which quietly supports your lower back and posture. Holding a chair keeps it simple and steady.",
    "cues": [
      "Hold a chair back for balance",
      "Press one leg straight back, squeezing your bottom",
      "Keep your back tall, not arching or leaning forward",
      "Lower with control and switch legs halfway"
    ]
  },
  {
    "id": "wall-incline-hold",
    "name": "Wall Incline Hold",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 45,
    "why": "Holding a gentle straight-body lean against the wall builds whole-body steadiness without the belly pressure of floor core work. It is a safe first step back toward core strength.",
    "cues": [
      "Place your forearms or hands on the wall at chest height",
      "Step your feet back so your body is one gentle slant",
      "Draw your belly in softly and keep your hips level",
      "Breathe steadily and step closer to make it easier"
    ]
  },
  {
    "id": "gentle-bear-hold",
    "name": "Gentle Bear Hold",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 40,
    "why": "Hovering your knees just off the floor on all fours wakes up your deep core and shoulders without any crunching. Keeping the hover tiny makes it kind to a recovering belly.",
    "cues": [
      "Start on hands and knees, wrists under shoulders",
      "Tuck your toes and lift your knees just a whisper off the floor",
      "Keep your back flat like a tabletop, belly drawn in",
      "Lower your knees anytime you need a rest"
    ]
  },
  {
    "id": "standing-march-reach",
    "name": "Standing March with Reach",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "warmup",
      "main"
    ],
    "sided": false,
    "secs": 60,
    "why": "Marching while reaching your arms up warms up your whole body and gently lifts your heart rate. There is no jumping, so it stays easy on your joints and pelvic floor.",
    "cues": [
      "March in place, lifting your knees comfortably",
      "Reach both arms up as each knee rises",
      "Stay light on your feet, landing softly",
      "Slow the pace anytime you need to catch your breath"
    ]
  },
  {
    "id": "chair-tricep-dips",
    "name": "Chair Tricep Dips",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 45,
    "why": "Dipping with your hands on a sturdy chair strengthens the backs of your arms, handy for lifting and carrying. Keeping your feet close in makes it as gentle as you need.",
    "cues": [
      "Sit at the edge of a sturdy chair, hands gripping the front",
      "Slide your bottom off and bend your elbows to lower",
      "Keep your knees bent and feet close for an easier version",
      "Press back up through your palms, elbows pointing back"
    ]
  },
  {
    "id": "wall-angels",
    "name": "Wall Angels",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "Sliding your arms up and down the wall strengthens the upper back muscles that rounded shoulders forget about. It is a soothing antidote to all those hours hunched over feeding.",
    "cues": [
      "Stand with your back and head gently touching the wall",
      "Press your arms back to the wall in a goalpost shape",
      "Slide your arms up overhead, keeping contact with the wall",
      "Move slowly and only as high as stays comfortable"
    ]
  },
  {
    "id": "single-leg-balance-reach",
    "name": "Single-Leg Balance Reach",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 45,
    "why": "Balancing on one leg while reaching forward rebuilds the steadiness that pregnancy and a shifting center of gravity can scatter. A chair nearby means you can stay confident.",
    "cues": [
      "Keep a chair or wall within easy reach",
      "Stand on one leg with a soft knee",
      "Reach forward slowly, hinging from your hip",
      "Tap a fingertip down anytime, then switch legs halfway"
    ]
  },
  {
    "id": "standing-hip-abduction",
    "name": "Standing Hip Abduction",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 45,
    "why": "Lifting one leg out to the side strengthens the outer hips that keep your pelvis level when you walk. Holding a chair keeps the focus on the muscle, not on wobbling.",
    "cues": [
      "Hold a chair back with one hand",
      "Lift one leg straight out to the side",
      "Keep your toes pointing forward, body tall",
      "Lower slowly with control and switch sides halfway"
    ]
  },
  {
    "id": "squat-pulses",
    "name": "Squat Pulses",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "Small pulses at the bottom of a shallow squat give your thighs and bottom a warm, steady burn. Sitting just over a chair lets you control exactly how deep feels right.",
    "cues": [
      "Stand in front of a chair, feet hip-width apart",
      "Lower into a comfortable shallow squat",
      "Pulse gently up and down a small distance",
      "Keep your weight in your heels and chest lifted"
    ]
  },
  {
    "id": "wall-slow-mountain-climbers",
    "name": "Slow Wall Mountain Climbers",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "main"
    ],
    "sided": true,
    "secs": 50,
    "why": "Driving one knee up at a time with your hands on the wall warms the body and wakes the core, all without the belly pressure of the floor version. The slower you go, the gentler it feels.",
    "cues": [
      "Place your hands on the wall at chest height, feet stepped back",
      "Draw one knee slowly up toward your chest",
      "Lower it and switch knees at a calm, controlled pace",
      "Keep your back long and your belly gently drawn in"
    ]
  },
  {
    "id": "low-impact-jog-in-place",
    "name": "Low-Impact Jog in Place",
    "tags": [
      "cardio"
    ],
    "blocks": [
      "warmup",
      "main"
    ],
    "sided": false,
    "secs": 60,
    "why": "Keeping one foot on the floor at all times lets you build up a happy heart rate without any jarring jumps. It is cardio that respects a recovering pelvic floor.",
    "cues": [
      "Jog softly in place, keeping one foot grounded at a time",
      "Pump your arms gently to find a rhythm",
      "Land lightly through the balls of your feet",
      "Ease the pace to a march whenever you need a breather"
    ]
  },
  {
    "id": "wall-sit-march",
    "name": "Wall Sit with March",
    "tags": [
      "strength"
    ],
    "blocks": [
      "main"
    ],
    "sided": false,
    "secs": 50,
    "why": "Lifting one foot at a time during a wall sit adds a gentle challenge to your legs and hips while your back stays fully supported. It builds the kind of strength that makes everyday lifting easier.",
    "cues": [
      "Slide down the wall into a comfortable seated angle",
      "Lift one foot just off the floor, then set it down",
      "Alternate feet slowly, keeping your back pressed to the wall",
      "Rise up higher anytime to make it lighter"
    ]
  }
];

export const EXTRA_TIER_ELIGIBILITY = {
  "wall-sit": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "calf-raises": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "standing-leg-curl": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "standing-fire-hydrant": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "gentle-good-mornings": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "chair-split-squat": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "counter-incline-pushup": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "standing-oblique-knee-taps": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "standing-glute-kickback": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "wall-incline-hold": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "gentle-bear-hold": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "standing-march-reach": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "chair-tricep-dips": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "wall-angels": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "single-leg-balance-reach": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "standing-hip-abduction": [
    "no_sweat",
    "slightly_sweaty",
    "super_sweaty"
  ],
  "squat-pulses": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "wall-slow-mountain-climbers": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "low-impact-jog-in-place": [
    "slightly_sweaty",
    "super_sweaty"
  ],
  "wall-sit-march": [
    "super_sweaty"
  ]
};

export const EXTRA_SPACE_FLAGS = {
  "wall-calf-stretch": {
    "chairOk": false,
    "floorOk": false
  },
  "doorway-chest-opener": {
    "chairOk": false,
    "floorOk": false
  },
  "seated-side-body": {
    "chairOk": true,
    "floorOk": true
  },
  "chair-quad-stretch": {
    "chairOk": true,
    "floorOk": false
  },
  "wall-hamstring-stretch": {
    "chairOk": false,
    "floorOk": true
  },
  "wrist-forearm-stretch": {
    "chairOk": true,
    "floorOk": true
  },
  "upper-trap-stretch": {
    "chairOk": true,
    "floorOk": true
  },
  "lateral-neck-stretch": {
    "chairOk": true,
    "floorOk": true
  },
  "seated-figure-four": {
    "chairOk": true,
    "floorOk": true
  },
  "standing-calf-step": {
    "chairOk": true,
    "floorOk": false
  },
  "overhead-reach-stretch": {
    "chairOk": true,
    "floorOk": true
  },
  "seated-spinal-rotation": {
    "chairOk": true,
    "floorOk": true
  },
  "ankle-alphabet": {
    "chairOk": true,
    "floorOk": true
  },
  "wall-shoulder-slide": {
    "chairOk": false,
    "floorOk": false
  },
  "supine-knee-to-chest": {
    "chairOk": false,
    "floorOk": true
  },
  "mountain-pose": {
    "chairOk": false,
    "floorOk": false
  },
  "easy-seat-breath": {
    "chairOk": true,
    "floorOk": true
  },
  "seated-cat-cow": {
    "chairOk": true,
    "floorOk": true
  },
  "standing-side-bend-flow": {
    "chairOk": true,
    "floorOk": false
  },
  "standing-forward-fold-flow": {
    "chairOk": false,
    "floorOk": false
  },
  "triangle-pose": {
    "chairOk": false,
    "floorOk": false
  },
  "wide-leg-fold": {
    "chairOk": false,
    "floorOk": false
  },
  "warrior-3-wall": {
    "chairOk": false,
    "floorOk": false
  },
  "gate-pose": {
    "chairOk": false,
    "floorOk": true
  },
  "cobblers-pose": {
    "chairOk": false,
    "floorOk": true
  },
  "sphinx-pose": {
    "chairOk": false,
    "floorOk": true
  },
  "supported-bridge": {
    "chairOk": false,
    "floorOk": true
  },
  "reclined-butterfly": {
    "chairOk": false,
    "floorOk": true
  },
  "legs-up-the-wall": {
    "chairOk": false,
    "floorOk": true
  },
  "savasana": {
    "chairOk": false,
    "floorOk": true
  },
  "wall-sit": {
    "chairOk": false,
    "floorOk": false
  },
  "calf-raises": {
    "chairOk": true,
    "floorOk": false
  },
  "standing-leg-curl": {
    "chairOk": true,
    "floorOk": false
  },
  "standing-fire-hydrant": {
    "chairOk": true,
    "floorOk": false
  },
  "gentle-good-mornings": {
    "chairOk": false,
    "floorOk": false
  },
  "chair-split-squat": {
    "chairOk": true,
    "floorOk": false
  },
  "counter-incline-pushup": {
    "chairOk": false,
    "floorOk": false
  },
  "standing-oblique-knee-taps": {
    "chairOk": false,
    "floorOk": false
  },
  "standing-glute-kickback": {
    "chairOk": true,
    "floorOk": false
  },
  "wall-incline-hold": {
    "chairOk": false,
    "floorOk": false
  },
  "gentle-bear-hold": {
    "chairOk": false,
    "floorOk": true
  },
  "standing-march-reach": {
    "chairOk": false,
    "floorOk": false
  },
  "chair-tricep-dips": {
    "chairOk": true,
    "floorOk": false
  },
  "wall-angels": {
    "chairOk": false,
    "floorOk": false
  },
  "single-leg-balance-reach": {
    "chairOk": true,
    "floorOk": false
  },
  "standing-hip-abduction": {
    "chairOk": true,
    "floorOk": false
  },
  "squat-pulses": {
    "chairOk": true,
    "floorOk": false
  },
  "wall-slow-mountain-climbers": {
    "chairOk": false,
    "floorOk": false
  },
  "low-impact-jog-in-place": {
    "chairOk": false,
    "floorOk": false
  },
  "wall-sit-march": {
    "chairOk": false,
    "floorOk": false
  }
};

export const WORKOUT_CATEGORY = {
  "box-breath": "breath",
  "pelvic-breath": "breath",
  "kind-close": "breath",
  "arm-sweeps": "breath",
  "pelvic-floor-connect": "breath",
  "extended-exhale-breath": "breath",
  "neck-rolls": "stretch",
  "shoulder-rolls": "stretch",
  "side-reach": "stretch",
  "hip-circles": "stretch",
  "figure-four": "stretch",
  "butterfly": "stretch",
  "seated-twist": "stretch",
  "happy-baby": "stretch",
  "legs-up": "stretch",
  "thread-needle": "stretch",
  "forward-fold": "stretch",
  "torso-rotations": "stretch",
  "ankle-prep": "stretch",
  "wrist-prep": "stretch",
  "standing-fold-variations": "stretch",
  "reclined-twist": "stretch",
  "neck-jaw-release": "stretch",
  "cat-cow": "yoga",
  "chair-pose": "yoga",
  "warrior2": "yoga",
  "baby-cobra": "yoga",
  "tree-pose": "yoga",
  "goddess": "yoga",
  "down-dog": "yoga",
  "low-lunge": "yoga",
  "childs-pose": "yoga",
  "spinal-wave-standing": "yoga",
  "sun-flow-gentle": "yoga",
  "crescent-lunge": "yoga",
  "half-pigeon": "yoga",
  "cobra-childs-flow": "yoga",
  "warrior-1": "yoga",
  "supported-rest": "yoga",
  "bridge": "exercise",
  "bird-dog": "exercise",
  "squats": "exercise",
  "clamshell": "exercise",
  "kickbacks": "exercise",
  "dynamic-leg-swings": "exercise",
  "step-out-warmup": "exercise",
  "heel-slides": "exercise",
  "deadbug-supported": "exercise",
  "bird-dog-knee-hover": "exercise",
  "side-lying-leg-lift": "exercise",
  "wall-incline-press": "exercise",
  "reverse-lunge": "exercise",
  "sit-to-stand": "exercise",
  "wall-pushup": "exercise",
  "glute-bridge-march": "exercise",
  "standing-row": "exercise",
  "hip-hinge": "exercise",
  "marching": "exercise",
  "step-touch": "exercise",
  "step-backs": "exercise",
  "fast-feet": "exercise",
  "knee-drives": "exercise",
  "lateral-steps": "exercise",
  "shadow-box": "exercise",
  "wall-climbers": "exercise",
  "step-jacks": "exercise",
  "skater-steps": "exercise",
  "heel-digs": "exercise",
  "wall-calf-stretch": "stretch",
  "doorway-chest-opener": "stretch",
  "seated-side-body": "stretch",
  "chair-quad-stretch": "stretch",
  "wall-hamstring-stretch": "stretch",
  "wrist-forearm-stretch": "stretch",
  "upper-trap-stretch": "stretch",
  "lateral-neck-stretch": "stretch",
  "seated-figure-four": "stretch",
  "standing-calf-step": "stretch",
  "overhead-reach-stretch": "stretch",
  "seated-spinal-rotation": "stretch",
  "ankle-alphabet": "stretch",
  "wall-shoulder-slide": "stretch",
  "supine-knee-to-chest": "stretch",
  "mountain-pose": "yoga",
  "easy-seat-breath": "yoga",
  "seated-cat-cow": "yoga",
  "standing-side-bend-flow": "yoga",
  "standing-forward-fold-flow": "yoga",
  "triangle-pose": "yoga",
  "wide-leg-fold": "yoga",
  "warrior-3-wall": "yoga",
  "gate-pose": "yoga",
  "cobblers-pose": "yoga",
  "sphinx-pose": "yoga",
  "supported-bridge": "yoga",
  "reclined-butterfly": "yoga",
  "legs-up-the-wall": "yoga",
  "savasana": "yoga",
  "wall-sit": "exercise",
  "calf-raises": "exercise",
  "standing-leg-curl": "exercise",
  "standing-fire-hydrant": "exercise",
  "gentle-good-mornings": "exercise",
  "chair-split-squat": "exercise",
  "counter-incline-pushup": "exercise",
  "standing-oblique-knee-taps": "exercise",
  "standing-glute-kickback": "exercise",
  "wall-incline-hold": "exercise",
  "gentle-bear-hold": "exercise",
  "standing-march-reach": "exercise",
  "chair-tricep-dips": "exercise",
  "wall-angels": "exercise",
  "single-leg-balance-reach": "exercise",
  "standing-hip-abduction": "exercise",
  "squat-pulses": "exercise",
  "wall-slow-mountain-climbers": "exercise",
  "low-impact-jog-in-place": "exercise",
  "wall-sit-march": "exercise"
};
