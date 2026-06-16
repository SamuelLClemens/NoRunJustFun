// Meditation runtime, derived from you-got-this-design/library/meditations.json.
// BOTH: one core "arrive / settle / rest / return" practice that scales across all six
// durations by lengthening silence (not instruction density), PLUS a small themed library.
// A meditation completes the SAME recordSession path as movement, so it grows the garden +1.

const SCRIPTS = {
  "med-core-7": {
    "id": "med-core-7",
    "minutes": 7,
    "theme": "core arrival + breath",
    "kind": "core_scaling",
    "intent": "The shortest sibling of the core \"arrive / settle / rest / return\" practice. A complete arrival-and-breath meditation that helps a postpartum woman put down the day, settle her nervous system with slow even breathing, rest in a brief optional awareness, and return gently — without striving, fixing, or performing. Instruction density is deliberately low; the work is the settling, not the talking.",
    "items": [
      {
        "id": "med-core-7-s0",
        "name": "Spoken slowly. Allow a 3-second pause af",
        "secs": 15,
        "say": "Welcome. There is nothing to get right here. Let your eyes close, or soften your gaze toward the floor."
      },
      {
        "id": "med-core-7-s1",
        "name": "Gentle body cue: settling into support. ",
        "secs": 15,
        "say": "Find a way to sit or lie down that asks nothing of you. Let the surface underneath you take your weight."
      },
      {
        "id": "med-core-7-s2",
        "name": "Silence for ~12 seconds. Let the words l",
        "secs": 20,
        "say": "You do not need to hold yourself up right now. Let it all be held for these few minutes."
      },
      {
        "id": "med-core-7-s3",
        "name": "Breath pacing: inhale ~4s, audible exhal",
        "secs": 15,
        "say": "When you are ready, take one slow breath in through the nose. And let it go with a soft sigh."
      },
      {
        "id": "med-core-7-s4",
        "name": "Breath pacing: inhale ~4s, long exhale ~",
        "secs": 20,
        "say": "One more like that. Breathe in, gather the day. Breathe out, set a little of it down."
      },
      {
        "id": "med-core-7-s5",
        "name": "Transition to settle phase. Brief silenc",
        "secs": 15,
        "say": "Now let your breath find its own slow rhythm. We will count it together, easy and even."
      },
      {
        "id": "med-core-7-s6",
        "name": "Breath pacing: guide inhale across 4 cou",
        "secs": 8,
        "say": "Breathe in for four. Soft and full."
      },
      {
        "id": "med-core-7-s7",
        "name": "Breath pacing: guide exhale across 4 cou",
        "secs": 14,
        "say": "And breathe out for four. Nothing forced."
      },
      {
        "id": "med-core-7-s8",
        "name": "Breath pacing: one full cycle, then leav",
        "secs": 33,
        "say": "Again, in your own time. In for four. Out for four."
      },
      {
        "id": "med-core-7-s9",
        "name": "Gentle body cue: breath low into belly. ",
        "secs": 25,
        "say": "Notice the breath moving low, into the belly and ribs, the way it did when you were small."
      },
      {
        "id": "med-core-7-s10",
        "name": "Permission-giving. Silence ~15s.",
        "secs": 30,
        "say": "If thoughts arrive, that is fine. You do not have to chase them or push them away. Let them drift, and come back to the breath."
      },
      {
        "id": "med-core-7-s11",
        "name": "OPTIONAL body focus with explicit non-bo",
        "secs": 25,
        "say": "If it feels right, you can rest your awareness anywhere in the body that feels easy. If noticing the body is too much today, rest with the sound of the breath instead. Either is welcome."
      },
      {
        "id": "med-core-7-s12",
        "name": "Enter REST phase. Begin sustained silenc",
        "secs": 15,
        "say": "Now, for a little while, there is nothing to do. Just breathe, and let yourself be here."
      },
      {
        "id": "med-core-7-s13",
        "name": "Silence. Held rest — roughly 70 seconds ",
        "secs": 72,
        "say": ""
      },
      {
        "id": "med-core-7-s14",
        "name": "One soft re-anchor. Spoken quietly, then",
        "secs": 23,
        "say": "Still here, still breathing. You are doing enough simply by staying."
      },
      {
        "id": "med-core-7-s15",
        "name": "Enter RETURN phase. Breath pacing: invit",
        "secs": 20,
        "say": "We will begin to come back now. No rush. Let your breath deepen, just a little."
      },
      {
        "id": "med-core-7-s16",
        "name": "Gentle body cue: small reawakening movem",
        "secs": 20,
        "say": "Let a small movement return — wiggle your fingers, or your toes. A gentle stretch if your body wants one."
      },
      {
        "id": "med-core-7-s17",
        "name": "Gentle body cue: hand to a self-chosen, ",
        "secs": 13,
        "say": "Bring a hand to rest wherever feels kind. Your heart, your belly, your lap."
      },
      {
        "id": "med-core-7-s18",
        "name": "Affirmation in Vera close voice. Soft pa",
        "secs": 14,
        "say": "You made time for yourself today, and that matters. You are exactly where you need to be."
      },
      {
        "id": "med-core-7-s19",
        "name": "Close. Let the final line settle; do not",
        "secs": 8,
        "say": "When you are ready, open your eyes. Carry a little of this quiet with you."
      }
    ]
  },
  "med-core-15": {
    "id": "med-core-15",
    "minutes": 15,
    "theme": "core breath + brief body awareness",
    "kind": "core_scaling",
    "intent": "A 15-minute core meditation following the arrive / settle / rest / return arc. It seats the practitioner in slow breath, offers a short and explicitly optional pass of gentle body awareness with a breath-or-sound alternative, holds a long quiet rest carried mostly by silence, and returns softly with a single warm affirmation. Default Meditation tier for the 15-minute length; grows the garden +1 like any showing-up day.",
    "items": [
      {
        "id": "med-core-15-s0",
        "name": "Warm, unhurried tone. No breath instruct",
        "secs": 12,
        "say": "Welcome. There is nothing to get right here. Let yourself land."
      },
      {
        "id": "med-core-15-s1",
        "name": "Gentle body cue (optional posture); allo",
        "secs": 16,
        "say": "Find a seat or a place to lie down. Let your body be held by whatever is underneath you."
      },
      {
        "id": "med-core-15-s2",
        "name": "Offer eyes-closed as a choice, never a r",
        "secs": 17,
        "say": "If it feels okay, let your eyes close. If not, soften your gaze toward the floor."
      },
      {
        "id": "med-core-15-s3",
        "name": "Box-breath cadence begins: inhale 4 coun",
        "secs": 8,
        "say": "Let us begin with the breath. Breathe in slowly through the nose for a count of four."
      },
      {
        "id": "med-core-15-s4",
        "name": "Hold 4 counts (~4s), soft and easy.",
        "secs": 7,
        "say": "Hold, gently, for four."
      },
      {
        "id": "med-core-15-s5",
        "name": "Exhale 4 counts (~4s).",
        "secs": 8,
        "say": "And release, slowly, for four."
      },
      {
        "id": "med-core-15-s6",
        "name": "Hold-out 4 counts (~4s). One full box cy",
        "secs": 10,
        "say": "And rest, empty, for four."
      },
      {
        "id": "med-core-15-s7",
        "name": "Hand the breath over. Then silence — let",
        "secs": 52,
        "say": "Stay with that square of breath. In, hold, out, rest. I will be quiet while you find your rhythm."
      },
      {
        "id": "med-core-15-s8",
        "name": "Release the count; settle into natural e",
        "secs": 30,
        "say": "Let the counting soften now. Just an easy breath in, and a long breath out."
      },
      {
        "id": "med-core-15-s9",
        "name": "Permission-giving cue. Silence ~30s.",
        "secs": 45,
        "say": "Nothing to fix. Nothing to perform. You are allowed to simply be here."
      },
      {
        "id": "med-core-15-s10",
        "name": "Trauma-aware framing — flag the body-awa",
        "secs": 13,
        "say": "We will take a short, gentle pass of awareness now. This part is completely optional."
      },
      {
        "id": "med-core-15-s11",
        "name": "Offer the breath/sound alternative expli",
        "secs": 27,
        "say": "If turning attention toward the body feels welcome, you might notice where you meet your seat. If it does not, stay with the sound of your breath instead — that is just as complete."
      },
      {
        "id": "med-core-15-s12",
        "name": "Light, non-clinical attention. Silence ~",
        "secs": 40,
        "say": "Wherever your attention rests — body, or breath, or the quiet sounds around you — let it rest lightly."
      },
      {
        "id": "med-core-15-s13",
        "name": "Gentle body cue, fully optional. Pause ~",
        "secs": 35,
        "say": "You might let the shoulders drop a little. You might let the jaw unclench. Only if it feels good."
      },
      {
        "id": "med-core-15-s14",
        "name": "Close the awareness pass without a full ",
        "secs": 40,
        "say": "There is no map to follow and nowhere you need to scan. Just this one breath, and then the next."
      },
      {
        "id": "med-core-15-s15",
        "name": "Begin the long central rest — the heart ",
        "secs": 25,
        "say": "Now we rest. I will be mostly quiet for a while. Let the breath carry you. You do not need to do anything."
      },
      {
        "id": "med-core-15-s16",
        "name": "Silence. Breath continues on its own, sl",
        "secs": 65,
        "say": ""
      },
      {
        "id": "med-core-15-s17",
        "name": "One soft re-anchor. No correction, no ju",
        "secs": 25,
        "say": "If the mind has wandered, that is completely fine. Wandering is what minds do. Come back to the breath, kindly."
      },
      {
        "id": "med-core-15-s18",
        "name": "Extended silence — the longest stretch o",
        "secs": 105,
        "say": ""
      },
      {
        "id": "med-core-15-s19",
        "name": "A single quiet touchpoint to reassure, n",
        "secs": 60,
        "say": "Still resting. Still held. There is nowhere else to be."
      },
      {
        "id": "med-core-15-s20",
        "name": "Silence continues (~60s). Let the rest b",
        "secs": 80,
        "say": ""
      },
      {
        "id": "med-core-15-s21",
        "name": "Begin the return arc. Inhale slightly fu",
        "secs": 30,
        "say": "We will begin to return now, slowly. No rush. Let one breath be a little deeper."
      },
      {
        "id": "med-core-15-s22",
        "name": "Gentle re-orientation to the room. Pause",
        "secs": 35,
        "say": "Notice the sounds of the room coming back. The light beyond your eyelids. The weight of your body."
      },
      {
        "id": "med-core-15-s23",
        "name": "Invite eyes open as a choice. Pause ~15s",
        "secs": 30,
        "say": "If you closed your eyes, let them open whenever you are ready. There is no hurry at all."
      },
      {
        "id": "med-core-15-s24",
        "name": "Gentle re-engagement cue, optional. Paus",
        "secs": 30,
        "say": "Maybe a small movement — wiggle the fingers, or roll the shoulders once. However your body wants to wake."
      },
      {
        "id": "med-core-15-s25",
        "name": "Affirmation in the established close reg",
        "secs": 25,
        "say": "You showed up, and you stayed. Rest is productive. So is gentleness."
      },
      {
        "id": "med-core-15-s26",
        "name": "Closing affirmation. Let it land, then q",
        "secs": 25,
        "say": "You are exactly where you need to be. This counts. I am glad you were here."
      },
      {
        "id": "med-core-15-s27",
        "name": "Final silence to 900s. Session records a",
        "secs": 5,
        "say": ""
      }
    ]
  },
  "med-core-20": {
    "id": "med-core-20",
    "minutes": 20,
    "theme": "core breath + body awareness + rest",
    "kind": "core_scaling",
    "intent": "The flagship core practice scaled to 20 minutes, following the arrive / settle / rest / return arc. It opens by helping the listener land out of a busy day, settles the nervous system with slow rib-and-belly breath that is gentle on the pelvic floor, offers an explicitly optional, trauma-aware body awareness pass with a breath-or-sound alternative, holds a long stretch of genuine rest with minimal instruction, and returns the listener softly while affirming that simply showing up counted. Vera voice throughout: warm, body-neutral, present-tense, permission-giving, never shaming. Completing this grows the garden +1 exactly like movement, recorded through the same recordSession path so a meditation day is a showing-up day.",
    "items": [
      {
        "id": "med-core-20-s0",
        "name": "Soft, unhurried spoken pace. No breath c",
        "secs": 14,
        "say": "Welcome in. Find a comfortable place to settle, sitting or lying down, whatever your body would like right now."
      },
      {
        "id": "med-core-20-s1",
        "name": "Warm, level tone. Permission-giving.",
        "secs": 16,
        "say": "There is nothing to fix here and nothing to get right. This is just twenty minutes that belong to you."
      },
      {
        "id": "med-core-20-s2",
        "name": "Offer the choice plainly; pause after.",
        "secs": 15,
        "say": "Let your eyes close if that feels okay. If you would rather keep them open, simply soften your gaze toward the floor."
      },
      {
        "id": "med-core-20-s3",
        "name": "Silence begins to open up after this lin",
        "secs": 25,
        "say": "Let the day land for a moment. You do not have to carry it right now."
      },
      {
        "id": "med-core-20-s4",
        "name": "Gentle body cue: invite weight to settle",
        "secs": 30,
        "say": "Notice the surface holding you. The chair, the floor, the bed. It is doing the work of holding you, so you can stop holding yourself up."
      },
      {
        "id": "med-core-20-s5",
        "name": "Begin settle phase.",
        "secs": 15,
        "say": "Now we will let the breath grow a little slower. No forcing — just an invitation."
      },
      {
        "id": "med-core-20-s6",
        "name": "Inhale cue. Pacing: slow inhale ~4 count",
        "secs": 9,
        "say": "Breathe in, and feel the ribs widen all around, like a gentle umbrella opening."
      },
      {
        "id": "med-core-20-s7",
        "name": "Exhale cue ~6 counts. No gripping, no sq",
        "secs": 10,
        "say": "And breathe out, slow and easy, longer than the breath in."
      },
      {
        "id": "med-core-20-s8",
        "name": "Inhale ~4.",
        "secs": 9,
        "say": "Again, breathe in — ribs and belly soften wide."
      },
      {
        "id": "med-core-20-s9",
        "name": "Exhale ~6. Then ~25s silence to let the ",
        "secs": 32,
        "say": "And let it go. Nothing to hold."
      },
      {
        "id": "med-core-20-s10",
        "name": "Offer count as optional. Pause ~30s.",
        "secs": 45,
        "say": "There is no perfect breath. If counting helps, breathe in for four, and out for six. If counting is a bother, just let the breath be long and kind."
      },
      {
        "id": "med-core-20-s11",
        "name": "Gentle body cue, top-down, low pressure.",
        "secs": 30,
        "say": "Let your face soften. The jaw, the space between the brows, the small muscles around the eyes."
      },
      {
        "id": "med-core-20-s12",
        "name": "Pause ~25s.",
        "secs": 40,
        "say": "And let your shoulders drop away from your ears. You can let them be heavy."
      },
      {
        "id": "med-core-20-s13",
        "name": "Hand off to silence. Sustained quiet ~50",
        "secs": 55,
        "say": "Stay with the slow breath here for a little while. I will be quiet, and you can simply let it carry you."
      },
      {
        "id": "med-core-20-s14",
        "name": "Self-compassion beat. Pause ~30s.",
        "secs": 45,
        "say": "If your mind has wandered, that is completely fine. Minds wander. Just come back to the next breath, with no scolding."
      },
      {
        "id": "med-core-20-s15",
        "name": "Set up the opt-in body pass clearly.",
        "secs": 15,
        "say": "In a moment I will offer some gentle attention to the body. This part is always optional."
      },
      {
        "id": "med-core-20-s16",
        "name": "Trauma-aware opt-out stated explicitly: ",
        "secs": 25,
        "say": "If noticing the body feels welcome today, let your attention rest softly wherever I mention. If it does not, you are invited to keep your attention on your breath, or on the sounds in the room. Either choice is the practice."
      },
      {
        "id": "med-core-20-s17",
        "name": "Frame as light, non-diagnostic. Pause ~1",
        "secs": 25,
        "say": "We are not searching for anything to change. We are only saying a quiet hello, then moving on."
      },
      {
        "id": "med-core-20-s18",
        "name": "Body cue. Those opting out stay with bre",
        "secs": 45,
        "say": "If you are with the body — notice your feet, and the lower legs. You might let them feel heavy and at rest."
      },
      {
        "id": "med-core-20-s19",
        "name": "Pause ~30s. Keep the alternative live.",
        "secs": 45,
        "say": "Now the hips, and the long muscles of the legs. Nowhere to be, nothing to tense. Or stay with your breath."
      },
      {
        "id": "med-core-20-s20",
        "name": "Body-neutral, no pelvic gripping languag",
        "secs": 45,
        "say": "The belly and the lower back. Let the breath move here all on its own, soft and unhurried."
      },
      {
        "id": "med-core-20-s21",
        "name": "Pause ~30s.",
        "secs": 45,
        "say": "The chest, the shoulders, the arms, all the way to the hands. You might let the hands be open and easy."
      },
      {
        "id": "med-core-20-s22",
        "name": "Close the body pass. Pause ~25s.",
        "secs": 45,
        "say": "And the neck, the face, the whole head, resting. A quiet hello to all of it. Or simply, the next breath."
      },
      {
        "id": "med-core-20-s23",
        "name": "Affirm both paths equally.",
        "secs": 20,
        "say": "However you spent that — body, breath, or sound — it was exactly right."
      },
      {
        "id": "med-core-20-s24",
        "name": "Begin the long rest phase. This is the h",
        "secs": 15,
        "say": "Now we arrive at rest. For the next several minutes, there is nothing to do at all."
      },
      {
        "id": "med-core-20-s25",
        "name": "Hand the breath back to autopilot. Then ",
        "secs": 30,
        "say": "You can let the breath go back to its own rhythm. You do not need to deepen it or count it. Just let it breathe you."
      },
      {
        "id": "med-core-20-s26",
        "name": "Long sustained silence. ~90s of quiet.",
        "secs": 95,
        "say": "I will be quiet now. Rest here."
      },
      {
        "id": "med-core-20-s27",
        "name": "Single soft anchor in the silence. ~90s ",
        "secs": 95,
        "say": "Still here, still resting. Nothing is required of you."
      },
      {
        "id": "med-core-20-s28",
        "name": "Gentle reassurance, then return to silen",
        "secs": 90,
        "say": "If thoughts have come and gone, that is just the mind doing its thing. You are still resting underneath them."
      },
      {
        "id": "med-core-20-s29",
        "name": "Final long rest stretch. ~75s of silence",
        "secs": 85,
        "say": "A little longer. Let yourself be held by the quiet."
      },
      {
        "id": "med-core-20-s30",
        "name": "Begin the return phase gently.",
        "secs": 15,
        "say": "We are going to begin coming back now, slowly, in your own time. No need to rush."
      },
      {
        "id": "med-core-20-s31",
        "name": "Gentle reawakening body cue, fully optio",
        "secs": 25,
        "say": "Let the breath grow just a touch fuller. Maybe a small movement returns — your fingers, your toes."
      },
      {
        "id": "med-core-20-s32",
        "name": "Return on the listener's timing. Pause ~",
        "secs": 18,
        "say": "When you are ready, and only then, let your eyes open, or lift your gaze."
      },
      {
        "id": "med-core-20-s33",
        "name": "Optional close ritual echoing kind-close",
        "secs": 14,
        "say": "If it feels welcome, rest a hand on your heart, or anywhere that feels kind, and breathe slow and easy."
      },
      {
        "id": "med-core-20-s34",
        "name": "Affirmation in Vera voice; this is a sho",
        "secs": 12,
        "say": "You gave yourself this time, and that counts as much as any movement. You really did this."
      },
      {
        "id": "med-core-20-s35",
        "name": "Soft farewell. Let the final seconds res",
        "secs": 6,
        "say": "Carry a little of this quiet with you. It is yours whenever you need it. Take care."
      }
    ]
  },
  "med-core-30": {
    "id": "med-core-30",
    "minutes": 30,
    "theme": "core full: settle, breath, body, rest",
    "kind": "core_scaling",
    "intent": "The full-length expression of the core \"arrive / settle / rest / return\" arc. The same instruction beats as the shorter siblings, but with much longer, held silences so the practitioner can actually settle, soften, and rest rather than being talked through every moment. Body awareness is offered as a guided invitation that is explicitly optional, with a breath-or-sound alternative available at every step for anyone for whom turning attention inward to the body does not feel safe today. The aim is rest and showing up, never achievement.",
    "items": [
      {
        "id": "med-core-30-s0",
        "name": "Speak slowly and warmly. No breath instr",
        "secs": 14,
        "say": "Welcome. There is nothing to get right here. You showed up, and that is the whole practice."
      },
      {
        "id": "med-core-30-s1",
        "name": "Gentle body cue: settle into a supported",
        "secs": 16,
        "say": "Find a position that feels kind for your body. Seated, lying down, leaning on something. Anything that lets you be supported."
      },
      {
        "id": "med-core-30-s2",
        "name": "Permission-giving. Eyes may stay open.",
        "secs": 14,
        "say": "You can close your eyes, or soften your gaze toward the floor. Whatever feels safe for you right now."
      },
      {
        "id": "med-core-30-s3",
        "name": "Set expectation of silence.",
        "secs": 16,
        "say": "We will take the next half hour slowly. Most of it is quiet. The quiet is the practice, not a gap in it."
      },
      {
        "id": "med-core-30-s4",
        "name": "Invite the body to be supported.",
        "secs": 18,
        "say": "Let the surface beneath you hold your weight. You do not have to hold yourself up for these few minutes."
      },
      {
        "id": "med-core-30-s5",
        "name": "Silence. Let arrival land. About 40 seco",
        "secs": 42,
        "say": ""
      },
      {
        "id": "med-core-30-s6",
        "name": "Breath awareness, no pacing yet.",
        "secs": 18,
        "say": "When you are ready, let your breath arrive. Not changing it. Just noticing the breath that is already here."
      },
      {
        "id": "med-core-30-s7",
        "name": "Silence. Natural breathing. About 40 sec",
        "secs": 42,
        "say": ""
      },
      {
        "id": "med-core-30-s8",
        "name": "First paced breath. In about four second",
        "secs": 18,
        "say": "Now, if it feels good, let one breath grow a little slower. In through the nose, and a long, easy breath out."
      },
      {
        "id": "med-core-30-s9",
        "name": "Slow, even breathing continues.",
        "secs": 16,
        "say": "Let your breath set the pace, not the clock. There is no rush in this room."
      },
      {
        "id": "med-core-30-s10",
        "name": "Silence. Several slow breaths. About 50 ",
        "secs": 56,
        "say": ""
      },
      {
        "id": "med-core-30-s11",
        "name": "Normalize wandering. Warm tone.",
        "secs": 18,
        "say": "If your mind has wandered already, that is completely normal. Wherever it went, just come back to the breath. No scolding needed."
      },
      {
        "id": "med-core-30-s12",
        "name": "Silence. Slow breathing. About 55 second",
        "secs": 60,
        "say": ""
      },
      {
        "id": "med-core-30-s13",
        "name": "Lengthen the exhale gently. In about fou",
        "secs": 18,
        "say": "Notice the breath out a little more than the breath in. The exhale is the part that helps you settle."
      },
      {
        "id": "med-core-30-s14",
        "name": "Silence. Long exhales. About 70 seconds.",
        "secs": 74,
        "say": ""
      },
      {
        "id": "med-core-30-s15",
        "name": "Release breath control. Return to natura",
        "secs": 16,
        "say": "Good. You can let the breath go back to its own rhythm now. Nothing to manage."
      },
      {
        "id": "med-core-30-s16",
        "name": "Silence. Settling. About 60 seconds.",
        "secs": 64,
        "say": ""
      },
      {
        "id": "med-core-30-s17",
        "name": "Introduce the body section. Signal choic",
        "secs": 16,
        "say": "In a moment I will offer a gentle tour through the body. This part is optional."
      },
      {
        "id": "med-core-30-s18",
        "name": "Offer the non-body alternative clearly: ",
        "secs": 22,
        "say": "If turning attention into the body does not feel good today, you are welcome to stay with the breath, or to rest your attention on any sound around you instead. That is a full and complete practice too."
      },
      {
        "id": "med-core-30-s19",
        "name": "Begin body section, or continue breath/s",
        "secs": 18,
        "say": "Whichever you choose, you are doing it right. Let us begin softly, at the feet."
      },
      {
        "id": "med-core-30-s20",
        "name": "Body cue: feet. Or stay with breath/soun",
        "secs": 16,
        "say": "Bring a little attention down to your feet. Not to change anything. Just to notice they are there."
      },
      {
        "id": "med-core-30-s21",
        "name": "Silence. Resting attention at the feet. ",
        "secs": 40,
        "say": ""
      },
      {
        "id": "med-core-30-s22",
        "name": "Body cue: legs. Unhurried.",
        "secs": 18,
        "say": "Let that attention drift up through the legs. Heavy, supported, resting."
      },
      {
        "id": "med-core-30-s23",
        "name": "Silence. About 35 seconds.",
        "secs": 40,
        "say": ""
      },
      {
        "id": "med-core-30-s24",
        "name": "Body cue: hips and belly. Body-neutral, ",
        "secs": 18,
        "say": "Notice the hips and the low belly. This part of you carried so much. You can let it be soft now."
      },
      {
        "id": "med-core-30-s25",
        "name": "Silence. About 40 seconds.",
        "secs": 44,
        "say": ""
      },
      {
        "id": "med-core-30-s26",
        "name": "Body cue: chest and back, with breath.",
        "secs": 18,
        "say": "Let your attention float up to the chest and the back. Feel them rise and fall with the breath, all on their own."
      },
      {
        "id": "med-core-30-s27",
        "name": "Silence. About 40 seconds.",
        "secs": 44,
        "say": ""
      },
      {
        "id": "med-core-30-s28",
        "name": "Body cue: shoulders and jaw. Echo of the",
        "secs": 16,
        "say": "Soften the shoulders. Let them drop away from your ears. Soften the jaw."
      },
      {
        "id": "med-core-30-s29",
        "name": "Silence. About 35 seconds.",
        "secs": 40,
        "say": ""
      },
      {
        "id": "med-core-30-s30",
        "name": "Body cue: face. Release.",
        "secs": 18,
        "say": "And the whole face. The space between your eyebrows. Let it all be smooth and unbothered."
      },
      {
        "id": "med-core-30-s31",
        "name": "Silence. About 40 seconds.",
        "secs": 42,
        "say": ""
      },
      {
        "id": "med-core-30-s32",
        "name": "Whole-body awareness, or whole field of ",
        "secs": 20,
        "say": "Now let go of any one part. Sense the whole body at once, resting, breathing, held."
      },
      {
        "id": "med-core-30-s33",
        "name": "Silence. Whole-body rest. About 50 secon",
        "secs": 60,
        "say": ""
      },
      {
        "id": "med-core-30-s34",
        "name": "Open the central rest. This is the heart",
        "secs": 18,
        "say": "From here, we simply rest. There is nothing to do for the next while. You can let go of even the instructions."
      },
      {
        "id": "med-core-30-s35",
        "name": "Permission to wander and return. Then si",
        "secs": 20,
        "say": "If your mind gets busy, that is okay. You do not have to follow it. The breath is always here to come back to."
      },
      {
        "id": "med-core-30-s36",
        "name": "Open rest. Long unbroken silence begins.",
        "secs": 152,
        "say": ""
      },
      {
        "id": "med-core-30-s37",
        "name": "One soft touchpoint mid-rest. Very gentl",
        "secs": 16,
        "say": "Still resting. No need to do anything with this quiet. Just let it hold you."
      },
      {
        "id": "med-core-30-s38",
        "name": "Open rest continues. Long unbroken silen",
        "secs": 184,
        "say": ""
      },
      {
        "id": "med-core-30-s39",
        "name": "Begin the return. Soft, gradual.",
        "secs": 18,
        "say": "We are going to begin returning, slowly. There is no hurry. Let the room come back to you in its own time."
      },
      {
        "id": "med-core-30-s40",
        "name": "Silence. Resting before re-entry. About ",
        "secs": 42,
        "say": ""
      },
      {
        "id": "med-core-30-s41",
        "name": "Re-engage breath. Gentle deepening.",
        "secs": 18,
        "say": "Notice your breath again. A little deeper now, if that feels right. One easy breath in, one slow breath out."
      },
      {
        "id": "med-core-30-s42",
        "name": "Silence. A few breaths. About 35 seconds",
        "secs": 37,
        "say": ""
      },
      {
        "id": "med-core-30-s43",
        "name": "Gentle body cue: small movements. Option",
        "secs": 20,
        "say": "Let some gentle movement come back. Maybe your fingers, maybe a slow roll of the ankles. Whatever wants to wake."
      },
      {
        "id": "med-core-30-s44",
        "name": "Silence. Small movements. About 35 secon",
        "secs": 40,
        "say": ""
      },
      {
        "id": "med-core-30-s45",
        "name": "Optional stretch. No pressure.",
        "secs": 20,
        "say": "You might stretch in any way that feels good, or just stay still a moment longer. Both are welcome."
      },
      {
        "id": "med-core-30-s46",
        "name": "Silence. About 30 seconds.",
        "secs": 35,
        "say": ""
      },
      {
        "id": "med-core-30-s47",
        "name": "Eyes open, if they were closed. Unhurrie",
        "secs": 18,
        "say": "When you are ready, let your eyes open, softly. Take in the light in the room."
      },
      {
        "id": "med-core-30-s48",
        "name": "Silence. Re-orienting. About 25 seconds.",
        "secs": 32,
        "say": ""
      },
      {
        "id": "med-core-30-s49",
        "name": "Affirmation. Honor showing up, never int",
        "secs": 20,
        "say": "You gave yourself this time. That matters, and it counts, exactly as it is."
      },
      {
        "id": "med-core-30-s50",
        "name": "Signature affirmation. Slow.",
        "secs": 20,
        "say": "You are exactly where you need to be."
      },
      {
        "id": "med-core-30-s51",
        "name": "Silence. Let the affirmation settle. Abo",
        "secs": 40,
        "say": ""
      },
      {
        "id": "med-core-30-s52",
        "name": "Close. Warm, present-tense.",
        "secs": 22,
        "say": "The practice is finished, but the calm comes with you. Carry one easy breath into the rest of your day."
      },
      {
        "id": "med-core-30-s53",
        "name": "Final words. Let silence carry to the en",
        "secs": 18,
        "say": "Thank you for being here. See you soon."
      }
    ]
  },
  "med-core-45": {
    "id": "med-core-45",
    "minutes": 45,
    "theme": "core extended with longer settling + rest",
    "kind": "core_scaling",
    "intent": "The default Meditation tier at the 45-minute length: a single arrive / settle / rest / return arc that gives a postpartum-aware woman a long, unhurried stretch of stillness. Instruction stays sparse and warm; the time is filled with rest, not more talking. The optional body-awareness pass is framed permission-first with a breath or sound alternative, so a person who does not want to focus on the body can stay regulated and included.",
    "items": [
      {
        "id": "med-core-45-s0",
        "name": "Spoken slowly, warm and low. Let a long ",
        "secs": 18,
        "say": "Welcome. There is nothing to fix and nothing to achieve in the next forty-five minutes. This is simply time to be here."
      },
      {
        "id": "med-core-45-s1",
        "name": "Allow about 25 seconds for the listener ",
        "secs": 32,
        "say": "Find a position that your body can keep for a while. Seated, lying down, propped on cushions, knees bent. Choose comfort over correctness."
      },
      {
        "id": "med-core-45-s2",
        "name": "Pause; no rush.",
        "secs": 18,
        "say": "If your eyes would like to close, let them. If you prefer them open, soften your gaze toward the floor."
      },
      {
        "id": "med-core-45-s3",
        "name": "Breath cue: inhale ~4s, exhale ~6s. Pace",
        "secs": 16,
        "say": "We begin by arriving. Take one slow breath in through the nose, and a longer breath out through the mouth."
      },
      {
        "id": "med-core-45-s4",
        "name": "Breath cue: one more slow inhale and lon",
        "secs": 18,
        "say": "And again, an easy breath in, and a soft breath out, letting the day land for a moment."
      },
      {
        "id": "med-core-45-s5",
        "name": "Silence for ~40 seconds. Let the listene",
        "secs": 48,
        "say": "Now let your breath return to its own rhythm. You do not need to manage it. Just notice it moving."
      },
      {
        "id": "med-core-45-s6",
        "name": "Spoken once, gently, then a long pause.",
        "secs": 25,
        "say": "You are exactly where you need to be. There is nowhere else you have to go right now."
      },
      {
        "id": "med-core-45-s7",
        "name": "Silence ~45 seconds. Invite the body to ",
        "secs": 65,
        "say": "Feel the support underneath you. The floor, the cushion, the chair, holding your full weight so you do not have to."
      },
      {
        "id": "med-core-45-s8",
        "name": "Soft, reassuring. Then silence ~50 secon",
        "secs": 60,
        "say": "Wherever your mind has wandered, that is completely normal. Each time you notice, you can come gently back to the breath."
      },
      {
        "id": "med-core-45-s9",
        "name": "Breath-led; emphasize the exhale. Pause ",
        "secs": 22,
        "say": "We are settling now. With each breath out, let a little more of your weight soften downward."
      },
      {
        "id": "med-core-45-s10",
        "name": "Gentle body cue, optional to follow. Lon",
        "secs": 38,
        "say": "Soften your jaw. Let your tongue rest low in your mouth. Let the space between your eyebrows be smooth."
      },
      {
        "id": "med-core-45-s11",
        "name": "Silence ~50 seconds.",
        "secs": 60,
        "say": "Let your shoulders drop away from your ears. Let your hands be heavy and open."
      },
      {
        "id": "med-core-45-s12",
        "name": "Silence ~60 seconds. Allow stillness to ",
        "secs": 80,
        "say": "There is no right way to feel today. Whatever is here, you can let it be here."
      },
      {
        "id": "med-core-45-s13",
        "name": "Permission-first framing. Slight pause.",
        "secs": 20,
        "say": "In a moment I will offer a gentle pass of awareness through the body. This is completely optional."
      },
      {
        "id": "med-core-45-s14",
        "name": "Trauma-aware opt-out. Offer the breath o",
        "secs": 32,
        "say": "If noticing the body feels uneasy today, you are welcome to skip it entirely. Instead, simply rest your attention on the sound around you, or on the feeling of the breath at the nose."
      },
      {
        "id": "med-core-45-s15",
        "name": "Reassuring. Long pause ~30 seconds befor",
        "secs": 48,
        "say": "Both choices are equally good. This is your practice. Stay with whatever keeps you feeling steady."
      },
      {
        "id": "med-core-45-s16",
        "name": "Body cue, optional. Those who opted out ",
        "secs": 70,
        "say": "If you have chosen the body, bring a soft, curious attention to your feet. Not judging them, just noticing whatever is there."
      },
      {
        "id": "med-core-45-s17",
        "name": "Slow drift. Silence ~55 seconds.",
        "secs": 75,
        "say": "Let your awareness drift slowly up through the legs and hips. There is nothing to change. You are only visiting."
      },
      {
        "id": "med-core-45-s18",
        "name": "Body-neutral, never shaming. Pause; no i",
        "secs": 75,
        "say": "Notice the belly and the back, soft and rising with the breath. This body has carried so much. You can meet it with kindness."
      },
      {
        "id": "med-core-45-s19",
        "name": "Silence ~50 seconds.",
        "secs": 70,
        "say": "Let attention float up to the chest, the shoulders, the arms, the hands. Letting each part be just as it is."
      },
      {
        "id": "med-core-45-s20",
        "name": "Close the optional pass gently. Long pau",
        "secs": 70,
        "say": "And up to the neck and the face, and the very top of the head. The whole body, simply resting and breathing."
      },
      {
        "id": "med-core-45-s21",
        "name": "Transition into the long rest. Slow, qui",
        "secs": 25,
        "say": "Now we let go of any focus on parts. For a while, there is nothing to do at all."
      },
      {
        "id": "med-core-45-s22",
        "name": "Silence begins. Hold ~75 seconds of quie",
        "secs": 95,
        "say": "Let the breath move on its own. Let thoughts come and go like weather. You can simply rest here."
      },
      {
        "id": "med-core-45-s23",
        "name": "Light anchor only. Silence ~80 seconds.",
        "secs": 120,
        "say": "If it helps to have something to return to, the breath is always here, gentle and steady."
      },
      {
        "id": "med-core-45-s24",
        "name": "Enter the longest stretch. After this li",
        "secs": 140,
        "say": "This is the deep rest. You may stay with the breath, or with the quiet, or simply drift. All of it counts as showing up."
      },
      {
        "id": "med-core-45-s25",
        "name": "One soft anchor. Then extended silence ~",
        "secs": 150,
        "say": "There is nothing to hold onto and nothing to push away. Just this breath, and then the next."
      },
      {
        "id": "med-core-45-s26",
        "name": "Reassurance, no demand. Long silence ~13",
        "secs": 150,
        "say": "If your mind has been busy, that is alright. Resting the body still rests you, even when the mind keeps moving."
      },
      {
        "id": "med-core-45-s27",
        "name": "Breath-led, sparse. Extended silence ~13",
        "secs": 150,
        "say": "Each breath out, a little more ease. Each breath in, quietly held by the world around you."
      },
      {
        "id": "med-core-45-s28",
        "name": "Affirmation drawn from Vera's voice. Lon",
        "secs": 130,
        "say": "You do not have to be finished to be enough. You are allowed to take up this time and space."
      },
      {
        "id": "med-core-45-s29",
        "name": "Minimal. Final long silence of the rest ",
        "secs": 120,
        "say": "Stay here in the quiet. We have a little while longer to simply rest."
      },
      {
        "id": "med-core-45-s30",
        "name": "Begin the return. Voice warms slightly a",
        "secs": 30,
        "say": "We are going to begin making our way back, slowly and gently. There is no hurry."
      },
      {
        "id": "med-core-45-s31",
        "name": "Breath cue: gently deepen. One slow brea",
        "secs": 40,
        "say": "Let your breath deepen a little, just by a fraction. A slightly fuller breath in, a slow breath out."
      },
      {
        "id": "med-core-45-s32",
        "name": "Re-orient to surroundings. Silence ~45 s",
        "secs": 65,
        "say": "Notice the sounds in the room again. The space around you, holding you as it has the whole time."
      },
      {
        "id": "med-core-45-s33",
        "name": "Gentle body cue, optional. Reduced-motio",
        "secs": 75,
        "say": "If it feels good, let a little movement return. Wiggle your fingers, your toes. A small stretch wherever you would like one."
      },
      {
        "id": "med-core-45-s34",
        "name": "Reflective. Long pause ~45 seconds.",
        "secs": 80,
        "say": "Take a moment to notice how you feel now, compared to when you arrived. That difference, whatever it is, is yours."
      },
      {
        "id": "med-core-45-s35",
        "name": "Affirming, anti-perfectionist. Pause.",
        "secs": 40,
        "say": "There is no grade for this. Whether your mind was calm or busy, you stayed, and you rested. That is the whole practice."
      },
      {
        "id": "med-core-45-s36",
        "name": "Affirmation in Vera's voice. Pause ~40 s",
        "secs": 80,
        "say": "Caring for yourself this way teaches everyone around you how it is done."
      },
      {
        "id": "med-core-45-s37",
        "name": "Re-entry. Gentle, unhurried. Pause ~40 s",
        "secs": 70,
        "say": "Begin to let your eyes open if they were closed, in your own time. Let the light in slowly."
      },
      {
        "id": "med-core-45-s38",
        "name": "Soft close approaching. Pause.",
        "secs": 40,
        "say": "When you are ready, you can return to the rest of your day, carrying a little of this quiet with you."
      },
      {
        "id": "med-core-45-s39",
        "name": "Closing affirmation. Warm, low. Pause.",
        "secs": 40,
        "say": "You showed up for yourself today, and showing up is strength. Thank you for being here."
      },
      {
        "id": "med-core-45-s40",
        "name": "Final words. Then quiet to the end; no f",
        "secs": 100,
        "say": "Rest as long as you like. The practice is complete whenever you are ready."
      }
    ]
  },
  "med-core-60": {
    "id": "med-core-60",
    "minutes": 60,
    "theme": "core deep: full arc with generous silence",
    "kind": "core_scaling",
    "intent": "A 60-minute core meditation following the arrive / settle / rest / return arc. The longest sibling in the med-core family: instruction density stays flat while silences lengthen generously, opening a long, unhurried rest phase. Body-neutral, permission-giving, trauma-aware. Suitable for postpartum women who may want a long restful practice without any pressure to feel a particular way.",
    "items": [
      {
        "id": "med-core-60-s0",
        "name": "Speak slowly. Allow a few seconds of qui",
        "secs": 22,
        "say": "Welcome. This is a long, slow hour, and there is nothing to get right. Settle into whatever position can hold you comfortably for a while — seated, or lying down, fully supported."
      },
      {
        "id": "med-core-60-s1",
        "name": "Pause. Let the listener arrive in their ",
        "secs": 18,
        "say": "Let your eyes close if that feels okay, or rest your gaze somewhere soft and still."
      },
      {
        "id": "med-core-60-s2",
        "name": "Warm, unhurried tone.",
        "secs": 22,
        "say": "We will arrive, then settle, then rest for a good long while, then gently return. You do not have to track any of that. I will be here."
      },
      {
        "id": "med-core-60-s3",
        "name": "Gentle body cue: invite releasing into s",
        "secs": 23,
        "say": "To begin, let the weight of your body be heavy. Let the surface beneath you take it. There is nothing to hold up right now."
      },
      {
        "id": "med-core-60-s4",
        "name": "Breath pacing: inhale ~4s, exhale ~6s.",
        "secs": 15,
        "say": "And take one slow breath in through the nose... and a long, soft breath out."
      },
      {
        "id": "med-core-60-s5",
        "name": "Breath pacing: one slow round, then sile",
        "secs": 18,
        "say": "Once more, in your own time. In... and out, letting the day land."
      },
      {
        "id": "med-core-60-s6",
        "name": "Silence ~70s. Let the breath be untouche",
        "secs": 72,
        "say": "Now let your breath go back to its own rhythm. You do not need to manage it. We will simply rest here together for a few breaths."
      },
      {
        "id": "med-core-60-s7",
        "name": "Reassuring. Then silence ~50s.",
        "secs": 60,
        "say": "If thoughts are busy, that is completely normal, especially today. You are not doing this wrong. We are only making a little room."
      },
      {
        "id": "med-core-60-s8",
        "name": "Gentle body cue: contact and support.",
        "secs": 28,
        "say": "Let us settle a little deeper. Notice three places where your body meets something — the floor, a cushion, the chair. Three points of contact, holding you."
      },
      {
        "id": "med-core-60-s9",
        "name": "Pause. Silence ~60s.",
        "secs": 72,
        "say": "Feel how each one supports you without any effort from you. You are held."
      },
      {
        "id": "med-core-60-s10",
        "name": "Gentle body cue. Pause between the two.",
        "secs": 22,
        "say": "Soften the place between your eyebrows. Let your jaw be loose, teeth slightly apart."
      },
      {
        "id": "med-core-60-s11",
        "name": "Gentle body cue. Then silence ~70s.",
        "secs": 78,
        "say": "Let your shoulders melt away from your ears. Nothing to brace against here."
      },
      {
        "id": "med-core-60-s12",
        "name": "Invite gentle attention to natural breat",
        "secs": 25,
        "say": "Now, if it feels available, bring a little attention to your breath — not changing it, just noticing the breath that is already happening."
      },
      {
        "id": "med-core-60-s13",
        "name": "Offer multiple anchors, no single right ",
        "secs": 25,
        "say": "Maybe you feel it at the nostrils, cool coming in, warmer going out. Maybe in the chest, or the belly rising and falling. Anywhere is fine."
      },
      {
        "id": "med-core-60-s14",
        "name": "Then long silence for breath-following: ",
        "secs": 160,
        "say": "We will rest our attention there for a while now. When the mind wanders off — and it will — that is the practice. You simply notice, and come back. Kindly, no scolding."
      },
      {
        "id": "med-core-60-s15",
        "name": "Single gentle redirect. Silence ~120s.",
        "secs": 125,
        "say": "Wherever your mind went, just come back to one breath. This one."
      },
      {
        "id": "med-core-60-s16",
        "name": "Reassure. Silence ~130s.",
        "secs": 135,
        "say": "There is no need to breathe deeply or perfectly. An ordinary breath is exactly enough."
      },
      {
        "id": "med-core-60-s17",
        "name": "Optional tool, offered not required. Sil",
        "secs": 155,
        "say": "If counting helps the mind settle, you might silently count each out-breath up to five, then begin again at one. Or let counting go entirely. Both are welcome."
      },
      {
        "id": "med-core-60-s18",
        "name": "Silence ~140s.",
        "secs": 145,
        "say": "Coming back once more to the breath, with the same patience you would offer someone you love."
      },
      {
        "id": "med-core-60-s19",
        "name": "Trauma-aware: explicitly offer breath OR",
        "secs": 38,
        "say": "Now I am going to offer something optional. You can rest your attention on the body for a little while — or, if attention on the body does not feel good today, you are very welcome to stay with the breath, or to listen to the sounds around you instead. All three are equally valid. Choose what feels kind."
      },
      {
        "id": "med-core-60-s20",
        "name": "Give the non-body listener clear permiss",
        "secs": 17,
        "say": "If you are staying with breath or with sound, simply continue resting there now, and let my next words drift past you."
      },
      {
        "id": "med-core-60-s21",
        "name": "Gentle body cue, low-pressure framing.",
        "secs": 20,
        "say": "If you are turning toward the body, let your attention move slowly, like warm light, with no goal of fixing or feeling anything in particular."
      },
      {
        "id": "med-core-60-s22",
        "name": "Body scan: feet. Silence ~55s.",
        "secs": 60,
        "say": "Begin wherever is easy. Perhaps the feet, heavy and far away. You do not need to move them. Just let them be noticed."
      },
      {
        "id": "med-core-60-s23",
        "name": "Body scan: legs. Silence ~60s.",
        "secs": 65,
        "say": "Letting attention drift up through the lower legs, the knees, the thighs. Whatever you find, or do not find, is okay."
      },
      {
        "id": "med-core-60-s24",
        "name": "Body scan: center. Body-neutral, no post",
        "secs": 75,
        "say": "And the hips, the lower back, the belly. This body has carried a great deal. You might let it rest now, without asking anything of it."
      },
      {
        "id": "med-core-60-s25",
        "name": "Body scan: torso/shoulders. Silence ~60s",
        "secs": 65,
        "say": "Up through the chest and the back of the heart, the breath moving quietly underneath. The shoulders, heavy."
      },
      {
        "id": "med-core-60-s26",
        "name": "Body scan: arms, hands, face. Silence ~6",
        "secs": 70,
        "say": "Down the arms to the hands, and softening the whole face — the jaw, the eyes, the small muscles you forget you are holding."
      },
      {
        "id": "med-core-60-s27",
        "name": "Reunite both paths. Silence ~80s.",
        "secs": 100,
        "say": "And now let the whole body be one thing, resting, breathing on its own. Whether you scanned, or stayed with breath, or with sound — we all arrive in the same quiet from here."
      },
      {
        "id": "med-core-60-s28",
        "name": "Transition into the long rest phase. Set",
        "secs": 30,
        "say": "We are entering the longest part now: simple rest. For a good while, I will say very little. You do not have to do anything at all. Not even meditate. Just be here, held, breathing."
      },
      {
        "id": "med-core-60-s29",
        "name": "Permission to sleep or stay. Then begin ",
        "secs": 220,
        "say": "If you drift toward sleep, that is allowed. If you stay awake and quiet, that is allowed. Let go of keeping track. I will return to gently bring you back near the end."
      },
      {
        "id": "med-core-60-s30",
        "name": "A single soft touchpoint, then silence a",
        "secs": 420,
        "say": "Resting. Nothing to reach for."
      },
      {
        "id": "med-core-60-s31",
        "name": "One brief reassurance after several minu",
        "secs": 660,
        "say": "Still here with you. Still nothing to do."
      },
      {
        "id": "med-core-60-s32",
        "name": "Final light touchpoint of the rest phase",
        "secs": 120,
        "say": "Resting on, breath by breath."
      },
      {
        "id": "med-core-60-s33",
        "name": "Begin the return phase, very softly so a",
        "secs": 30,
        "say": "Gently now, we begin to return. There is no hurry. Let my voice meet you wherever you are."
      },
      {
        "id": "med-core-60-s34",
        "name": "Breath pacing: invite slightly deeper br",
        "secs": 50,
        "say": "Let the breath become just a little fuller, a little more awake — the way you might stretch before fully waking."
      },
      {
        "id": "med-core-60-s35",
        "name": "Gentle body cue: tiny optional movement.",
        "secs": 60,
        "say": "And if it feels good, let a small movement come back — a slow curl of the fingers, a soft roll of the wrists or ankles. Only what feels welcome."
      },
      {
        "id": "med-core-60-s36",
        "name": "Permission-giving. Pause ~25s.",
        "secs": 50,
        "say": "Perhaps a gentle stretch through the whole body, or none at all. You decide what your body would like."
      },
      {
        "id": "med-core-60-s37",
        "name": "Non-judgmental reflection. Body-neutral.",
        "secs": 50,
        "say": "Notice how you feel compared to when you began this hour. Not better or worse — just however you are. That is yours to keep."
      },
      {
        "id": "med-core-60-s38",
        "name": "Invite return of vision. Pause ~25s.",
        "secs": 50,
        "say": "When you are ready, with no rush, let your eyes open if they were closed, and let the light back in slowly."
      },
      {
        "id": "med-core-60-s39",
        "name": "Affirmation in Vera voice. Celebrate sho",
        "secs": 40,
        "say": "You gave yourself a whole hour of rest today. That is real, and it counts as showing up."
      },
      {
        "id": "med-core-60-s40",
        "name": "Closing line. Warm, unhurried.",
        "secs": 50,
        "say": "Carry a little of this quiet with you. The breath comes with you wherever you go."
      },
      {
        "id": "med-core-60-s41",
        "name": "Final words. Then silence to 3600. Do no",
        "secs": 40,
        "say": "Take all the time you need before you move on. This is the end of the practice. Be gentle with yourself."
      }
    ]
  },
  "med-lib-overwhelm-7": {
    "id": "med-lib-overwhelm-7",
    "minutes": 7,
    "theme": "settling an overwhelmed mind (quick reset)",
    "kind": "library",
    "intent": "A short, trauma-aware reset for a mind that feels full or scattered. It helps an overwhelmed nervous system find one steady place to land — through orienting, slow breath, and a single point of contact — without requiring stillness, eyes closed, or attention to the body. The aim is not to empty the mind but to give it somewhere kind to rest for a few minutes, so the user leaves a little more settled than she arrived.",
    "items": [
      {
        "id": "med-lib-overwhelm-7-s0",
        "name": "Warm, unhurried tone. No music cue neede",
        "secs": 12,
        "say": "Hello, and welcome. You do not have to fix anything in the next few minutes. You only have to be here."
      },
      {
        "id": "med-lib-overwhelm-7-s1",
        "name": "Permission-giving. Pause 3 seconds after",
        "secs": 12,
        "say": "Settle into whatever position you are in. Sitting, standing, lying down, holding someone — all of it is fine."
      },
      {
        "id": "med-lib-overwhelm-7-s2",
        "name": "Offer the open-eyes option first-class, ",
        "secs": 16,
        "say": "Your eyes can close, or stay open and soft, resting on one calm spot in the room. Whichever feels safer today."
      },
      {
        "id": "med-lib-overwhelm-7-s3",
        "name": "Orienting to present safety. Gentle pace",
        "secs": 15,
        "say": "Let us begin by noticing where you are. You are not in the middle of the whole day right now. You are in this one room."
      },
      {
        "id": "med-lib-overwhelm-7-s4",
        "name": "Orienting cue — engages senses, grounds ",
        "secs": 25,
        "say": "Look around slowly, or just listen. Name one thing you can see, and one sound that is here with you."
      },
      {
        "id": "med-lib-overwhelm-7-s5",
        "name": "Normalize a busy mind explicitly — reduc",
        "secs": 18,
        "say": "Good. The mind may still feel busy. That is completely allowed. We are not emptying it, only giving it somewhere softer to rest."
      },
      {
        "id": "med-lib-overwhelm-7-s6",
        "name": "Breath as anchor. If breath feels activa",
        "secs": 16,
        "say": "Now bring your attention to your breath, wherever it is easiest to feel it. At the nose, or the chest. There is no need to change it yet."
      },
      {
        "id": "med-lib-overwhelm-7-s7",
        "name": "Trauma-aware alternative anchor — breath",
        "secs": 21,
        "say": "If watching the breath feels like too much, you can rest your attention on a sound instead, or on your feet on the floor. That counts just as much."
      },
      {
        "id": "med-lib-overwhelm-7-s8",
        "name": "Begin extended-exhale breathing — down-r",
        "secs": 15,
        "say": "When you are ready, let the next breath out slowly. A long, easy exhale. Let it be a little longer than the breath in."
      },
      {
        "id": "med-lib-overwhelm-7-s9",
        "name": "Breath pacing: in for about 4, out for a",
        "secs": 18,
        "say": "Breathe in gently. And out, slow and long. Nothing forced. Just letting the exhale carry a little of the load away."
      },
      {
        "id": "med-lib-overwhelm-7-s10",
        "name": "Hand the pace back to the user. Begin fi",
        "secs": 27,
        "say": "Let us stay with a few of those together. I will be quiet, and you can let the breath find its own slow rhythm."
      },
      {
        "id": "med-lib-overwhelm-7-s11",
        "name": "Reframe wandering as success, not failur",
        "secs": 19,
        "say": "If your thoughts wandered off into the day, that is not a mistake. Noticing is the whole practice. Just come back to one slow breath."
      },
      {
        "id": "med-lib-overwhelm-7-s12",
        "name": "Step down from controlled breathing so t",
        "secs": 16,
        "say": "Now let your breathing be ordinary again. Let it go back to normal. You can release the long exhale."
      },
      {
        "id": "med-lib-overwhelm-7-s13",
        "name": "Single point of contact — a grounding an",
        "secs": 18,
        "say": "Let us choose one steady place to rest your attention. Maybe the feeling of where your body meets the chair, the bed, or the ground."
      },
      {
        "id": "med-lib-overwhelm-7-s14",
        "name": "Restate non-body alternative clearly. Th",
        "secs": 37,
        "say": "Or, if you would rather not focus on the body at all today, simply rest on the quiet sound of the room. Both are right."
      },
      {
        "id": "med-lib-overwhelm-7-s15",
        "name": "Co-regulating reassurance, present-tense",
        "secs": 20,
        "say": "You are supported right now. The ground is holding you. There is nothing you need to carry in this exact moment."
      },
      {
        "id": "med-lib-overwhelm-7-s16",
        "name": "Third and longest open silence — roughly",
        "secs": 45,
        "say": "Stay here a little longer, in your own quiet. I will leave you some space."
      },
      {
        "id": "med-lib-overwhelm-7-s17",
        "name": "Gentle return phase. Pause 3 seconds.",
        "secs": 16,
        "say": "When you feel ready, begin to come back. No rush. Let your breath become a touch deeper."
      },
      {
        "id": "med-lib-overwhelm-7-s18",
        "name": "Re-orienting movement, all optional. Sil",
        "secs": 18,
        "say": "Maybe a small movement — wiggle your fingers, roll your shoulders, or just open your eyes if they were closed."
      },
      {
        "id": "med-lib-overwhelm-7-s19",
        "name": "Invite self-noticing without demanding a",
        "secs": 16,
        "say": "Notice how you feel now, compared to when we started. Even a small change is yours, and it counts."
      },
      {
        "id": "med-lib-overwhelm-7-s20",
        "name": "Affirmation in Vera voice — celebrates s",
        "secs": 12,
        "say": "The day is still there, but you met it with a little more steadiness. You showed up for yourself, and that is enough."
      },
      {
        "id": "med-lib-overwhelm-7-s21",
        "name": "Close. Let the final silence hold until ",
        "secs": 8,
        "say": "Whenever you are ready, carry this quiet with you. I will be here when you need it again. Take care."
      }
    ]
  },
  "med-lib-sleep-15": {
    "id": "med-lib-sleep-15",
    "minutes": 15,
    "theme": "sleep wind-down / bedtime release",
    "kind": "library",
    "intent": "A 15-minute bedtime practice that helps a tired body and a busy mind let go of the day and drift toward sleep. The arc moves from arriving and getting comfortable, through a slow downshift of the breath, into an optional gentle release of tension from the body (with a breath/sound alternative), and finally into long, unbroken silence so the listener can fall asleep without the voice calling them back. The voice deliberately thins out and softens toward the end; there is no wake-up or re-alerting, because the goal is sleep, not return to the day.",
    "items": [
      {
        "id": "med-lib-sleep-15-s0",
        "name": "Speak slowly and softly, slightly slower",
        "secs": 14,
        "say": "Welcome. There is nothing left to do tonight. This is the part of the day where you get to put everything down."
      },
      {
        "id": "med-lib-sleep-15-s1",
        "name": "Body cue: let the body be fully supporte",
        "secs": 12,
        "say": "Settle into wherever you are resting. Let the bed, or the floor, take your full weight."
      },
      {
        "id": "med-lib-sleep-15-s2",
        "name": "Opt-out offered. Silence about 8 seconds",
        "secs": 14,
        "say": "If it feels right, let your eyes close. If you would rather keep them softly open, that is fine too."
      },
      {
        "id": "med-lib-sleep-15-s3",
        "name": "Permission-giving. Pause about 8 seconds",
        "secs": 16,
        "say": "There is no posture to hold here, and nothing to get right. You are allowed to be exactly this tired."
      },
      {
        "id": "med-lib-sleep-15-s4",
        "name": "Silence about 10 seconds.",
        "secs": 18,
        "say": "Let us begin by letting the day arrive, so it can leave. Notice that you are here, lying down, breathing."
      },
      {
        "id": "med-lib-sleep-15-s5",
        "name": "Breath pacing: inhale ~4 counts, audible",
        "secs": 16,
        "say": "Take one slow breath in through the nose. And let it out with a soft sigh through the mouth."
      },
      {
        "id": "med-lib-sleep-15-s6",
        "name": "Breath pacing: inhale ~4, long exhale ~6",
        "secs": 16,
        "say": "Again. Breathe in, gently. And sigh it all the way out."
      },
      {
        "id": "med-lib-sleep-15-s7",
        "name": "Breath pacing: long exhale ~8 counts. Th",
        "secs": 20,
        "say": "Once more, the longest exhale yet. In through the nose. And a slow, complete letting go."
      },
      {
        "id": "med-lib-sleep-15-s8",
        "name": "Stop directing the breath. Silence about",
        "secs": 20,
        "say": "Now let your breath find its own quiet rhythm. You do not need to steer it anymore."
      },
      {
        "id": "med-lib-sleep-15-s9",
        "name": "Body cue: soften into support on each ex",
        "secs": 26,
        "say": "With each breath out, you can let the bed hold a little more of you. Nothing to carry now."
      },
      {
        "id": "med-lib-sleep-15-s10",
        "name": "Trauma-aware reassurance. Pause about 10",
        "secs": 20,
        "say": "If your mind is still busy, that is completely normal. A busy mind at bedtime is not a problem to fix."
      },
      {
        "id": "med-lib-sleep-15-s11",
        "name": "Silence about 14 seconds.",
        "secs": 24,
        "say": "You do not have to empty your thoughts. Just let them keep going on without you, like traffic in another street."
      },
      {
        "id": "med-lib-sleep-15-s12",
        "name": "Introduce optional body release. Pause a",
        "secs": 12,
        "say": "In a moment we will let the body soften, part by part. This part is optional."
      },
      {
        "id": "med-lib-sleep-15-s13",
        "name": "Explicit non-body alternative offered: r",
        "secs": 26,
        "say": "If turning attention to your body does not feel restful tonight, you can simply stay with the sound of my voice and the slow flow of your breath instead. Either way is right."
      },
      {
        "id": "med-lib-sleep-15-s14",
        "name": "Body cue: release the brow and forehead.",
        "secs": 18,
        "say": "If you are staying with the body, bring a soft, kind attention to your face. Let the space between your eyebrows go smooth."
      },
      {
        "id": "med-lib-sleep-15-s15",
        "name": "Body cue: release jaw and tongue. Silenc",
        "secs": 26,
        "say": "Let your jaw unclench. Let your tongue rest soft in your mouth."
      },
      {
        "id": "med-lib-sleep-15-s16",
        "name": "Body cue: drop the shoulders. Silence ab",
        "secs": 24,
        "say": "Let your shoulders melt down, away from your ears, into the surface beneath you."
      },
      {
        "id": "med-lib-sleep-15-s17",
        "name": "Body cue: release arms and hands. Silenc",
        "secs": 28,
        "say": "Soften your arms. Let your hands rest, palms heavy, fingers loose."
      },
      {
        "id": "med-lib-sleep-15-s18",
        "name": "Body cue: passive breath in torso. Silen",
        "secs": 32,
        "say": "Let your chest and belly rise and fall on their own. No effort, just the gentle tide of breathing."
      },
      {
        "id": "med-lib-sleep-15-s19",
        "name": "Body-neutral, never shaming. Body cue: r",
        "secs": 34,
        "say": "If your body has worked hard, carried much, this is its time to be off duty. Let your back and hips give their weight to the bed."
      },
      {
        "id": "med-lib-sleep-15-s20",
        "name": "Body cue: release legs and feet. Silence",
        "secs": 38,
        "say": "Let your legs grow heavy. All the way down through your knees, your ankles, the soles of your feet."
      },
      {
        "id": "med-lib-sleep-15-s21",
        "name": "Whole-body settle. Long silence about 20",
        "secs": 40,
        "say": "And now the whole body, soft and heavy and supported. There is nowhere to be but here."
      },
      {
        "id": "med-lib-sleep-15-s22",
        "name": "Gentle anchor for both body and non-body",
        "secs": 36,
        "say": "If any thought pulls you back, you can let it go on the next breath out. You can always come back to the breath."
      },
      {
        "id": "med-lib-sleep-15-s23",
        "name": "Affirmation in Vera register. Long silen",
        "secs": 44,
        "say": "Each breath out is a small letting go. The day is done. You did enough."
      },
      {
        "id": "med-lib-sleep-15-s24",
        "name": "Affirmation. Speak quieter now, near a w",
        "secs": 48,
        "say": "You are exactly where you need to be. Resting is allowed. Resting is good."
      },
      {
        "id": "med-lib-sleep-15-s25",
        "name": "Signal the taper into silence. Quiet, sl",
        "secs": 52,
        "say": "From here, I will say less and less. Let my voice fade into the quiet. You do not need to follow it."
      },
      {
        "id": "med-lib-sleep-15-s26",
        "name": "Near-whisper. Permission to fall asleep.",
        "secs": 72,
        "say": "Just breathing. Just resting. Drifting is welcome now."
      },
      {
        "id": "med-lib-sleep-15-s27",
        "name": "Very quiet, spaced words. Then extended ",
        "secs": 88,
        "say": "Heavy. Warm. Safe to let go."
      },
      {
        "id": "med-lib-sleep-15-s28",
        "name": "Final words, softest of all. No re-alert",
        "secs": 66,
        "say": "Rest now."
      }
    ]
  },
  "med-lib-selfcompassion-15": {
    "id": "med-lib-selfcompassion-15",
    "minutes": 15,
    "theme": "self-compassion / kindness to self",
    "kind": "library",
    "intent": "A 15-minute trauma-aware self-compassion practice for postpartum women 30-40. It moves from arriving and settling, through meeting a moment of difficulty with kindness, offering oneself the warmth one would give a friend, into a longer restful dwell, and a gentle return. The goal is to soften self-criticism and let warmth land in the body, never to fix or analyse. Generous silence carries the practice; the voice steps back so the kindness can be the user's own.",
    "items": [
      {
        "id": "med-lib-selfcompassion-15-s0",
        "name": "Warm, unhurried pace. No breath instruct",
        "secs": 14,
        "say": "Welcome. For the next fifteen minutes, there is nothing to fix and nothing to get right. This is simply time to be kind to yourself."
      },
      {
        "id": "med-lib-selfcompassion-15-s1",
        "name": "Announce the silences once, plainly, so ",
        "secs": 16,
        "say": "There will be long, quiet stretches in this practice. When it goes silent, that is on purpose. The quiet is yours to rest in."
      },
      {
        "id": "med-lib-selfcompassion-15-s2",
        "name": "Permission-giving. Allow a settling paus",
        "secs": 15,
        "say": "Settle into a position that feels comfortable. Seated or lying down, both are right. Let yourself be held by whatever is underneath you."
      },
      {
        "id": "med-lib-selfcompassion-15-s3",
        "name": "Offer the eyes-open option first so it n",
        "secs": 13,
        "say": "Your eyes can close, or rest softly downward — whichever feels safer for you today."
      },
      {
        "id": "med-lib-selfcompassion-15-s4",
        "name": "Breath cue: inhale roughly 4 counts, exh",
        "secs": 12,
        "say": "Take one slow breath in through the nose, and let it go with a long, soft sigh out."
      },
      {
        "id": "med-lib-selfcompassion-15-s5",
        "name": "Second slow breath, learner-paced. Do no",
        "secs": 15,
        "say": "And again, in your own time. Nothing forced. Just letting the breath out a little longer than it comes in."
      },
      {
        "id": "med-lib-selfcompassion-15-s6",
        "name": "Release breath control. Begin a settling",
        "secs": 13,
        "say": "Now let the breath go back to its own rhythm. You do not have to manage it. Let it breathe you."
      },
      {
        "id": "med-lib-selfcompassion-15-s7",
        "name": "Silence — about 20 seconds. Let the body",
        "secs": 22,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s8",
        "name": "Acknowledge the showing-up, in the regis",
        "secs": 18,
        "say": "Take a moment to notice that you came here. In the middle of everything, you gave yourself this. That is already a kind act."
      },
      {
        "id": "med-lib-selfcompassion-15-s9",
        "name": "Silence — about 15 seconds.",
        "secs": 17,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s10",
        "name": "Optional body cue, offered tentatively. ",
        "secs": 17,
        "say": "If it feels okay, you might rest one hand somewhere that feels soothing — over the heart, or on the belly. Feel the simple warmth of your own hand."
      },
      {
        "id": "med-lib-selfcompassion-15-s11",
        "name": "Trauma-aware alternative: explicitly off",
        "secs": 18,
        "say": "If a hand on the body does not feel right today, that is completely fine. Instead, you can rest your attention on the breath, or on the sounds around you. Any of these is the practice."
      },
      {
        "id": "med-lib-selfcompassion-15-s12",
        "name": "Silence — about 20 seconds. Let the chos",
        "secs": 22,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s13",
        "name": "Invite a mild difficulty only. Keep the ",
        "secs": 18,
        "say": "Now, gently, bring to mind something that has been a little hard lately. Not the heaviest thing. Just a moment where you have been hard on yourself."
      },
      {
        "id": "med-lib-selfcompassion-15-s14",
        "name": "Name common postpartum self-judgments ge",
        "secs": 18,
        "say": "Maybe a tiredness you judged yourself for. A moment you felt you were not enough. You do not need to relive it — just let it be quietly nearby."
      },
      {
        "id": "med-lib-selfcompassion-15-s15",
        "name": "Off-ramp, echoing the skip-is-allowed et",
        "secs": 14,
        "say": "If anything feels like too much, you can let the image go and simply come back to your breath. Looking after yourself is the whole point."
      },
      {
        "id": "med-lib-selfcompassion-15-s16",
        "name": "Silence — about 15 seconds.",
        "secs": 18,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s17",
        "name": "First self-compassion phrase — mindfulne",
        "secs": 12,
        "say": "See if you can offer yourself one honest sentence: this is a hard moment."
      },
      {
        "id": "med-lib-selfcompassion-15-s18",
        "name": "Silence — about 12 seconds, letting the ",
        "secs": 14,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s19",
        "name": "Second phrase — common humanity. Unhurri",
        "secs": 16,
        "say": "And another: hard moments are part of being human. You are not alone in this. So many people have felt exactly this."
      },
      {
        "id": "med-lib-selfcompassion-15-s20",
        "name": "Silence — about 13 seconds.",
        "secs": 16,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s21",
        "name": "Third phrase — kindness. Soft, almost a ",
        "secs": 14,
        "say": "And now the kindest one. Quietly, to yourself: may I be gentle with myself right now."
      },
      {
        "id": "med-lib-selfcompassion-15-s22",
        "name": "Silence — about 18 seconds.",
        "secs": 20,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s23",
        "name": "Shift to the friend-perspective. Warm an",
        "secs": 18,
        "say": "Imagine for a moment that someone you love deeply came to you feeling exactly the way you feel. Someone tired, someone trying so hard."
      },
      {
        "id": "med-lib-selfcompassion-15-s24",
        "name": "Model the kind voice. Let the words be t",
        "secs": 16,
        "say": "You would not scold them. You would soften. You might say, of course this is hard. You are doing your best, and your best is enough."
      },
      {
        "id": "med-lib-selfcompassion-15-s25",
        "name": "Turn the kindness inward. Then a long pa",
        "secs": 18,
        "say": "See if you can turn that same warmth inward now. The same patience you give so freely to others — let a little of it come home to you."
      },
      {
        "id": "med-lib-selfcompassion-15-s26",
        "name": "Silence — about 22 seconds. This is the ",
        "secs": 24,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s27",
        "name": "Echoes an existing affirmation almost ve",
        "secs": 14,
        "say": "Your body has done remarkable things. It deserves your patience, not your criticism."
      },
      {
        "id": "med-lib-selfcompassion-15-s28",
        "name": "Silence — about 16 seconds.",
        "secs": 18,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s29",
        "name": "Affirmation in Vera's register. Let it r",
        "secs": 16,
        "say": "You do not have to be finished to be enough. You are enough, in the unfinished middle of everything."
      },
      {
        "id": "med-lib-selfcompassion-15-s30",
        "name": "Silence — about 18 seconds.",
        "secs": 20,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s31",
        "name": "Release all instruction. Open the long r",
        "secs": 16,
        "say": "Now you can let the words go entirely. No more phrases to repeat. Just rest here, held by your own kindness and your own breath."
      },
      {
        "id": "med-lib-selfcompassion-15-s32",
        "name": "Re-offer both anchors equally. Then go q",
        "secs": 18,
        "say": "If your hand is resting on your heart or belly, feel it rise and fall. If not, just feel the breath moving, all on its own."
      },
      {
        "id": "med-lib-selfcompassion-15-s33",
        "name": "Long silence — about 75 seconds. This is",
        "secs": 78,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s34",
        "name": "One soft re-anchoring, mirroring the exi",
        "secs": 17,
        "say": "Wherever your mind wandered, that is okay. Wandering is not failing. Just gently come back, with the same kindness, to this quiet."
      },
      {
        "id": "med-lib-selfcompassion-15-s35",
        "name": "Silence — about 55 seconds. Let the rest",
        "secs": 57,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s36",
        "name": "Continued silence — about 18 more second",
        "secs": 20,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s37",
        "name": "Signal the turn toward returning, softly",
        "secs": 18,
        "say": "In a little while, we will begin to return. There is no hurry. Stay in the warmth a few breaths longer."
      },
      {
        "id": "med-lib-selfcompassion-15-s38",
        "name": "Silence — about 18 seconds.",
        "secs": 20,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s39",
        "name": "Begin reorienting. One deeper breath, ex",
        "secs": 18,
        "say": "Now take one slightly deeper breath in, and let it out slowly. Feeling yourself here, in this room, on this day."
      },
      {
        "id": "med-lib-selfcompassion-15-s40",
        "name": "Optional gentle re-animating movement; k",
        "secs": 20,
        "say": "Let a small amount of gentle movement come back. Maybe a soft wiggle of the fingers, or a slow roll of the shoulders. Only what feels good."
      },
      {
        "id": "med-lib-selfcompassion-15-s41",
        "name": "Silence — about 14 seconds, letting move",
        "secs": 17,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s42",
        "name": "Re-orient to the room. Soft pacing.",
        "secs": 17,
        "say": "If your eyes have been closed, let them open whenever you are ready. No rush. Let the light back in slowly."
      },
      {
        "id": "med-lib-selfcompassion-15-s43",
        "name": "Bridge the practice into the day. Warm, ",
        "secs": 20,
        "say": "See if you can carry one small piece of this kindness with you. Not as a task — just a softer way of speaking to yourself for the rest of today."
      },
      {
        "id": "med-lib-selfcompassion-15-s44",
        "name": "Silence — about 12 seconds.",
        "secs": 16,
        "say": ""
      },
      {
        "id": "med-lib-selfcompassion-15-s45",
        "name": "Close in the sessionDone register. Since",
        "secs": 16,
        "say": "You showed up for yourself today, and that is its own kind of strength. Thank you for giving yourself this time."
      },
      {
        "id": "med-lib-selfcompassion-15-s46",
        "name": "Final line, echoing the existing close. ",
        "secs": 14,
        "say": "Whenever you are ready, the practice is complete. The breath, and the kindness, come with you."
      },
      {
        "id": "med-lib-selfcompassion-15-s47",
        "name": "Closing silence to the 900-second mark. ",
        "secs": 5,
        "say": ""
      }
    ]
  },
  "med-lib-bodyscan-20": {
    "id": "med-lib-bodyscan-20",
    "minutes": 20,
    "theme": "Body scan — explicitly opt-in about body focus, trauma-aware. A slow, head-to-toe (or foot-to-head) journey of friendly attention, with a standing breath-and-sound alternative offered throughout for anyone for whom turning toward the body does not feel safe today.",
    "kind": "library",
    "intent": "Offer a settling, non-striving body scan that rebuilds a kind, neutral relationship with the body at the practitioner's own pace. Every region is an invitation, never an instruction; attention can rest on breath or sound instead of the body at any moment with zero loss. The aim is gentle awareness and permission, not relaxation-on-demand or fixing anything.",
    "items": [
      {
        "id": "med-lib-bodyscan-20-s0",
        "name": "Warm, unhurried pace. Let the voice sett",
        "secs": 14,
        "say": "Welcome. This is a body scan, and it is entirely yours to shape. There is nothing to fix here, and nothing to get right."
      },
      {
        "id": "med-lib-bodyscan-20-s1",
        "name": "Allow time to settle into position.",
        "secs": 14,
        "say": "Find a position that feels kind. Lying down, sitting, or standing are all welcome. You can change it any time."
      },
      {
        "id": "med-lib-bodyscan-20-s2",
        "name": "Spoken plainly, no pressure.",
        "secs": 14,
        "say": "Before we begin, one gentle note. In this practice we will turn attention toward the body, slowly and softly."
      },
      {
        "id": "med-lib-bodyscan-20-s3",
        "name": "Offer the opt-out clearly and warmly.",
        "secs": 16,
        "say": "If turning toward the body does not feel right today, that is completely okay. You can rest your attention on your breath, or on the sounds around you, instead."
      },
      {
        "id": "med-lib-bodyscan-20-s4",
        "name": "Silence — about ten seconds — to let the",
        "secs": 17,
        "say": "Either path is the whole practice. Choose whichever feels more like care right now."
      },
      {
        "id": "med-lib-bodyscan-20-s5",
        "name": "Gentle body cue: invite soft eyes, no in",
        "secs": 15,
        "say": "Your eyes can close, or stay open with a soft gaze. Whatever helps you feel safe."
      },
      {
        "id": "med-lib-bodyscan-20-s6",
        "name": "Breath pacing: slow inhale, roughly four",
        "secs": 8,
        "say": "Let us begin by simply arriving. One easy breath in."
      },
      {
        "id": "med-lib-bodyscan-20-s7",
        "name": "Breath pacing: long exhale, roughly six ",
        "secs": 12,
        "say": "And a slow breath out, a little longer than the breath in."
      },
      {
        "id": "med-lib-bodyscan-20-s8",
        "name": "Silence — about fifteen seconds — natura",
        "secs": 25,
        "say": "There is no special way to breathe. Just let it move on its own, and notice that it is happening."
      },
      {
        "id": "med-lib-bodyscan-20-s9",
        "name": "Gentle body cue: notice contact and supp",
        "secs": 20,
        "say": "Feel the support underneath you. The floor, the chair, the ground. It is holding you, and you do not have to do anything to deserve that."
      },
      {
        "id": "med-lib-bodyscan-20-s10",
        "name": "Silence — about twenty-five seconds.",
        "secs": 30,
        "say": "Let yourself rest into being held for a moment."
      },
      {
        "id": "med-lib-bodyscan-20-s11",
        "name": "Bridge into the scan; re-offer the opt-o",
        "secs": 20,
        "say": "When you are ready, we will begin to travel slowly through the body, like a warm light moving at its own pace. Remember, breath or sound is always an option instead."
      },
      {
        "id": "med-lib-bodyscan-20-s12",
        "name": "Gentle body cue: invite attention to the",
        "secs": 17,
        "say": "Let us start far away from the center, at the feet. If it feels okay, bring a soft, curious attention down to your feet."
      },
      {
        "id": "med-lib-bodyscan-20-s13",
        "name": "Silence — about thirty seconds — resting",
        "secs": 38,
        "say": "Not searching for anything in particular. Just noticing whatever is there, or noticing nothing at all. Both are fine."
      },
      {
        "id": "med-lib-bodyscan-20-s14",
        "name": "Silence — about twenty-five seconds.",
        "secs": 35,
        "say": "There is no right sensation to find. Warmth, coolness, tingling, or quiet. You are simply visiting, like saying a kind hello."
      },
      {
        "id": "med-lib-bodyscan-20-s15",
        "name": "Gentle body cue: invite attention up to ",
        "secs": 17,
        "say": "Now, if you wish, let that soft attention drift up into the lower legs. Shins, calves, the backs of the knees."
      },
      {
        "id": "med-lib-bodyscan-20-s16",
        "name": "Silence — about thirty seconds — resting",
        "secs": 43,
        "say": "These legs carry you through your days. You do not need to thank them or change them. Just let them be here with you."
      },
      {
        "id": "med-lib-bodyscan-20-s17",
        "name": "Permission-giving; re-offer the breath a",
        "secs": 20,
        "say": "If your mind has wandered off, that is what minds do. Gently come back, without any scolding. Or stay with the breath, if that feels easier."
      },
      {
        "id": "med-lib-bodyscan-20-s18",
        "name": "Gentle body cue: invite attention to the",
        "secs": 45,
        "say": "Let the attention rise to the upper legs. Thighs, the large muscles, resting heavy and soft."
      },
      {
        "id": "med-lib-bodyscan-20-s19",
        "name": "Silence — about twenty-five seconds.",
        "secs": 35,
        "say": "Nothing to hold, nothing to brace. If you notice gripping anywhere, see if it can soften, just a little. And if it does not, that is okay too."
      },
      {
        "id": "med-lib-bodyscan-20-s20",
        "name": "Trauma-aware framing for the center; slo",
        "secs": 23,
        "say": "We are arriving now at the center of the body, the pelvis, the hips, the belly. This area can hold a lot of story. Move here only as gently as you like."
      },
      {
        "id": "med-lib-bodyscan-20-s21",
        "name": "Re-offer the opt-out explicitly at the m",
        "secs": 20,
        "say": "If this region feels tender to visit, you are warmly invited to rest your attention on your breath instead, or on the sounds around you. You lose nothing by doing so."
      },
      {
        "id": "med-lib-bodyscan-20-s22",
        "name": "Silence — about thirty-five seconds — re",
        "secs": 47,
        "say": "If it feels okay, simply notice the breath rising and falling here, low and slow, with no agenda."
      },
      {
        "id": "med-lib-bodyscan-20-s23",
        "name": "Silence — about thirty seconds.",
        "secs": 45,
        "say": "You are allowed to take up this space. You are allowed to rest here without earning it."
      },
      {
        "id": "med-lib-bodyscan-20-s24",
        "name": "Gentle body cue: invite attention to the",
        "secs": 17,
        "say": "Let the attention float now to the back. The lower back, then slowly up along the spine."
      },
      {
        "id": "med-lib-bodyscan-20-s25",
        "name": "Silence — about thirty-five seconds — re",
        "secs": 48,
        "say": "So much is carried here, often without notice. You do not have to set anything down. Just let the back know it has your kind attention."
      },
      {
        "id": "med-lib-bodyscan-20-s26",
        "name": "Reassure about the silence; offer breath",
        "secs": 23,
        "say": "And if at any point the silence feels like a lot, the breath is right there, steady, like a friend waiting."
      },
      {
        "id": "med-lib-bodyscan-20-s27",
        "name": "Gentle body cue: invite attention to the",
        "secs": 47,
        "say": "Let us visit the hands. They are often busy. Let them be still now, palms open or resting, however is comfortable."
      },
      {
        "id": "med-lib-bodyscan-20-s28",
        "name": "Gentle body cue: invite attention to the",
        "secs": 45,
        "say": "Now up through the arms. The wrists, the forearms, the upper arms. Heavy and at ease."
      },
      {
        "id": "med-lib-bodyscan-20-s29",
        "name": "Silence — about thirty seconds.",
        "secs": 45,
        "say": "Nothing to reach for. Nothing to carry. Just arms, resting, off duty for these few minutes."
      },
      {
        "id": "med-lib-bodyscan-20-s30",
        "name": "Gentle body cue: invite attention to sho",
        "secs": 17,
        "say": "Bring a soft attention to the shoulders and the neck. A place that quietly holds the weight of long days."
      },
      {
        "id": "med-lib-bodyscan-20-s31",
        "name": "Breath pacing: one slow exhale. Then sil",
        "secs": 48,
        "say": "On your next breath out, you might let the shoulders drop a little, away from the ears. Or simply notice them, exactly as they are."
      },
      {
        "id": "med-lib-bodyscan-20-s32",
        "name": "Gentle body cue: invite attention to the",
        "secs": 20,
        "say": "Let the attention rise gently to the face. The jaw, often clenched without our knowing. Let it be a little loose."
      },
      {
        "id": "med-lib-bodyscan-20-s33",
        "name": "Silence — about thirty-five seconds — re",
        "secs": 50,
        "say": "The space between the eyebrows, softening. The eyes, resting back in their sockets. The whole face, unguarded, with no one to perform for."
      },
      {
        "id": "med-lib-bodyscan-20-s34",
        "name": "Gentle body cue: widen attention to the ",
        "secs": 20,
        "say": "And now, if it feels welcome, let attention widen to hold the whole body at once. From the feet all the way to the crown of the head."
      },
      {
        "id": "med-lib-bodyscan-20-s35",
        "name": "Silence — about forty seconds — whole-bo",
        "secs": 55,
        "say": "One body, breathing, resting, here. You do not have to scan or search any more. Just be with all of it, softly."
      },
      {
        "id": "med-lib-bodyscan-20-s36",
        "name": "Silence — about thirty-five seconds. Hon",
        "secs": 50,
        "say": "Or, if you have stayed with the breath or the sounds this whole time, rest there now, just as whole and just as welcome."
      },
      {
        "id": "med-lib-bodyscan-20-s37",
        "name": "Silence — about forty seconds — open res",
        "secs": 55,
        "say": "Let yourself simply rest. Nothing to do. Nowhere to be. This is enough. You are enough, exactly as you are right now."
      },
      {
        "id": "med-lib-bodyscan-20-s38",
        "name": "Breath pacing: a slightly fuller breath,",
        "secs": 18,
        "say": "In a moment we will come back. There is no hurry. Let the breath become a touch fuller, if it wants to."
      },
      {
        "id": "med-lib-bodyscan-20-s39",
        "name": "Gentle body cue: soft return, eyes openi",
        "secs": 17,
        "say": "If your eyes have been closed, let them open when they are ready, taking in the room slowly."
      },
      {
        "id": "med-lib-bodyscan-20-s40",
        "name": "Gentle body cue: hands to heart, matchin",
        "secs": 17,
        "say": "If it feels right, rest a hand on your heart, and let this land. You gave yourself this time. That matters."
      },
      {
        "id": "med-lib-bodyscan-20-s41",
        "name": "Affirmation in Vera voice; warm close.",
        "secs": 14,
        "say": "You showed up for yourself today, and that is its own kind of strength. Carry a little of this softness with you."
      },
      {
        "id": "med-lib-bodyscan-20-s42",
        "name": "Final words, then silence to the end at ",
        "secs": 5,
        "say": "Whenever you are ready, the practice is complete. Be gentle with yourself out there."
      }
    ]
  },
  "med-lib-morning-gentle-7": {
  "id": "med-lib-morning-gentle-7",
  "minutes": 7,
  "theme": "a gentle morning arrival",
  "kind": "library",
  "intent": "A slow, kind way to begin the day, with no rush and no list of things to become before the morning is allowed to start. It meets you wherever you are, including a broken night or a body that is tired, and lets you set one soft, optional intention rather than a goal. The aim is simply to arrive in your own morning a little more gently, however the day ahead looks.",
  "items": [
    {
      "id": "med-lib-morning-gentle-7-s0",
      "name": "Warm open. Speak unhurried, slightly slow.",
      "secs": 14,
      "say": "Good morning. Wherever you are, however you slept, you are welcome here. There is nothing you have to be ready for yet."
    },
    {
      "id": "med-lib-morning-gentle-7-s1",
      "name": "Permission for a hard night. No fixing.",
      "secs": 16,
      "say": "If the night was short, or broken, or hard, that is allowed. We are not starting the day by catching up. We are only arriving."
    },
    {
      "id": "med-lib-morning-gentle-7-s2",
      "name": "Posture freedom, eyes optional.",
      "secs": 16,
      "say": "Settle into whatever position you are in. Your eyes can close, or stay open and soft, resting on something gentle nearby. Whichever feels easier."
    },
    {
      "id": "med-lib-morning-gentle-7-s3",
      "name": "First orienting breath. No force.",
      "secs": 15,
      "say": "Let us take one easy breath together. In through the nose, and a slow breath out. Nothing forced, just a little more room than usual."
    },
    {
      "id": "med-lib-morning-gentle-7-s4",
      "name": "Short rest silence after first breath.",
      "secs": 40,
      "say": ""
    },
    {
      "id": "med-lib-morning-gentle-7-s5",
      "name": "Notice the morning is already here.",
      "secs": 18,
      "say": "Notice that the morning has already arrived without your help. The light, the sounds outside, the quiet of the room. You do not have to make any of it happen."
    },
    {
      "id": "med-lib-morning-gentle-7-s6",
      "name": "Sense one gentle thing. Senses cue.",
      "secs": 17,
      "say": "Let one kind thing reach you. The warmth of where you are resting, a sound somewhere in the house, or simply the air on your skin."
    },
    {
      "id": "med-lib-morning-gentle-7-s7",
      "name": "Open silence to let it land.",
      "secs": 60,
      "say": ""
    },
    {
      "id": "med-lib-morning-gentle-7-s8",
      "name": "Body waking, optional, no demand.",
      "secs": 18,
      "say": "If it feels okay, let your body wake the way it wants to. A small stretch, a softening of the shoulders, or no movement at all. You may skip this."
    },
    {
      "id": "med-lib-morning-gentle-7-s9",
      "name": "Longer middle rest. Hand pace back.",
      "secs": 80,
      "say": ""
    },
    {
      "id": "med-lib-morning-gentle-7-s10",
      "name": "Introduce the soft intention, optional.",
      "secs": 20,
      "say": "If you would like, you can set one soft intention for today. Not a goal, not a task. Just a single kind word to carry, like gentle, or steady, or enough."
    },
    {
      "id": "med-lib-morning-gentle-7-s11",
      "name": "Space to find or skip the word.",
      "secs": 60,
      "say": ""
    },
    {
      "id": "med-lib-morning-gentle-7-s12",
      "name": "Reassure if no word came.",
      "secs": 16,
      "say": "If no word came, that is completely fine. Some mornings the only intention is to get through, and that one counts too."
    },
    {
      "id": "med-lib-morning-gentle-7-s13",
      "name": "Gentle return to the day.",
      "secs": 16,
      "say": "When you are ready, and only then, let your breath become a little deeper. Begin to bring your attention back into the room."
    },
    {
      "id": "med-lib-morning-gentle-7-s14",
      "name": "Close. Carry it lightly.",
      "secs": 14,
      "say": "The day is yours to meet at your own pace. You have already begun, gently. Take care of yourself out there."
    }
  ],
  "disclaimers": [
    "This recording is for general relaxation and wellbeing only. It is not medical, psychological, or therapeutic advice.",
    "If you feel distressed, dizzy, or unsafe at any point, stop and open your eyes. You can pause or leave this recording whenever you need to.",
    "Quiet moments like these can sometimes bring up difficult feelings, which is especially common after birth. If that happens, please reach out to a qualified professional, your GP, your midwife, or a support service you trust."
  ]
},
  "med-lib-anxious-mind-15": {
  "id": "med-lib-anxious-mind-15",
  "minutes": 15,
  "theme": "easing an anxious, worried mind",
  "kind": "library",
  "intent": "A slow, trauma-aware practice for a mind that feels worried, racing, or on edge, helping the nervous system come down without demanding stillness or a calm you do not feel. It gently grounds the body, lengthens the exhale, and gives the worry somewhere safe to rest, while always offering a way out of any step that feels like too much. It is especially mindful that early parenthood can leave the body braced and watchful, so nothing here asks you to let your guard fully down.",
  "items": [
    {
      "id": "med-lib-anxious-mind-15-s0",
      "name": "Warm, steady open. Slightly slow pace.",
      "secs": 15,
      "say": "Hello, and welcome. If your mind feels fast or full right now, you are in the right place. You do not have to calm down to be here."
    },
    {
      "id": "med-lib-anxious-mind-15-s1",
      "name": "Normalize anxiety, no pressure to relax.",
      "secs": 18,
      "say": "We are not going to force any calm that is not ready to come. We are only going to give the worried part of you a little more room and a little more safety."
    },
    {
      "id": "med-lib-anxious-mind-15-s2",
      "name": "Posture, eyes open allowed first-class.",
      "secs": 18,
      "say": "Settle into whatever position feels safest. You can keep your eyes open, soft and low, resting on one calm spot. There is no need to close them today."
    },
    {
      "id": "med-lib-anxious-mind-15-s3",
      "name": "Orient to present safety. Right now.",
      "secs": 18,
      "say": "Let us begin by noticing where you actually are. Not in the worry, not in the day ahead. Just in this one room, in this one moment."
    },
    {
      "id": "med-lib-anxious-mind-15-s4",
      "name": "5-sense orienting cue, gentle.",
      "secs": 24,
      "say": "Look slowly around you, or just listen. Name to yourself one thing you can see, one thing you can hear, and one thing you can feel touching your skin."
    },
    {
      "id": "med-lib-anxious-mind-15-s5",
      "name": "Rest after orienting.",
      "secs": 70,
      "say": ""
    },
    {
      "id": "med-lib-anxious-mind-15-s6",
      "name": "Feet and ground anchor.",
      "secs": 20,
      "say": "Now feel where your body is held. Your feet on the floor, or your back against something solid. The ground beneath you is steady, and it does not need your effort to keep holding you."
    },
    {
      "id": "med-lib-anxious-mind-15-s7",
      "name": "Silence to feel grounded.",
      "secs": 90,
      "say": ""
    },
    {
      "id": "med-lib-anxious-mind-15-s8",
      "name": "Breath intro, no force, alternative ready.",
      "secs": 20,
      "say": "When you are ready, bring a little attention to your breath, wherever it is easiest to feel. If watching the breath feels uneasy, you can rest on your feet instead. That counts just as much."
    },
    {
      "id": "med-lib-anxious-mind-15-s9",
      "name": "Extended exhale begins. Down-regulate.",
      "secs": 18,
      "say": "Let the next breath out slowly, a long and easy exhale. Let it be a touch longer than the breath in. The slow out-breath is what tells the body it is safe."
    },
    {
      "id": "med-lib-anxious-mind-15-s10",
      "name": "Pacing a few breaths together.",
      "secs": 22,
      "say": "Breathe in gently. And out, slow and long. Again, in. And a long, soft exhale. Nothing pushed, just letting each out-breath set a little of the worry down."
    },
    {
      "id": "med-lib-anxious-mind-15-s11",
      "name": "Hand pace back. First long silence.",
      "secs": 55,
      "say": "Stay with that slow rhythm in your own time now. I will be quiet, and you can let the breath find its own easy pace."
    },
    {
      "id": "med-lib-anxious-mind-15-s12",
      "name": "Open silence with the slow breath.",
      "secs": 90,
      "say": ""
    },
    {
      "id": "med-lib-anxious-mind-15-s13",
      "name": "Worry as weather, observe not fix.",
      "secs": 22,
      "say": "If worried thoughts are still moving, you do not have to chase them or argue with them. Let them pass through like weather, while you stay with the slow breath underneath."
    },
    {
      "id": "med-lib-anxious-mind-15-s14",
      "name": "Reframe wandering as the practice.",
      "secs": 18,
      "say": "And if you drift off into a thought, that is not a failure. Noticing you have drifted is the practice itself. Just come back to one slow breath."
    },
    {
      "id": "med-lib-anxious-mind-15-s15",
      "name": "Step breath back to ordinary.",
      "secs": 16,
      "say": "Now let your breathing be ordinary again. You can release the long exhale. Let it move however it wants to."
    },
    {
      "id": "med-lib-anxious-mind-15-s16",
      "name": "Single steady place to rest.",
      "secs": 20,
      "say": "Let us choose one steady place to rest your attention. Maybe the weight of your hands, or the quiet sound of the room. Pick whatever feels kindest."
    },
    {
      "id": "med-lib-anxious-mind-15-s17",
      "name": "Co-regulating reassurance, present tense.",
      "secs": 18,
      "say": "In this exact moment, there is nothing you have to solve. You are held by the ground, and the worry can wait outside the door for a little while."
    },
    {
      "id": "med-lib-anxious-mind-15-s18",
      "name": "Settling silence before the deep rest.",
      "secs": 82,
      "say": ""
    },
    {
      "id": "med-lib-anxious-mind-15-s19",
      "name": "Longest open silence. Deep rest.",
      "secs": 180,
      "say": ""
    },
    {
      "id": "med-lib-anxious-mind-15-s20",
      "name": "Begin gentle return. No rush.",
      "secs": 18,
      "say": "When you feel ready, and there is no hurry, begin to come back. Let your breath become a little deeper, a little fuller."
    },
    {
      "id": "med-lib-anxious-mind-15-s21",
      "name": "Re-orienting movement, optional.",
      "secs": 18,
      "say": "Maybe a small movement. Wiggle your fingers, roll your shoulders, or open your eyes if they were closed. Move only as much as you want to."
    },
    {
      "id": "med-lib-anxious-mind-15-s22",
      "name": "Notice any small shift.",
      "secs": 16,
      "say": "Notice how you feel now, compared to when we began. Even the smallest softening is real, and it is yours."
    },
    {
      "id": "med-lib-anxious-mind-15-s23",
      "name": "Close, gentle and steadying.",
      "secs": 14,
      "say": "The worry may still be there, and that is alright. You met it with a slower breath and a steadier body. Take care of yourself."
    }
  ],
  "disclaimers": [
    "This recording is for general relaxation and wellbeing only. It is not medical, psychological, or therapeutic advice, and it is not a treatment for anxiety.",
    "If you feel distressed, dizzy, panicked, or unsafe at any point, stop and open your eyes. You can pause or leave this recording whenever you need to.",
    "Slowing down can sometimes bring difficult feelings closer to the surface, which is especially common after birth. If that happens, please reach out to a qualified professional, your GP, your midwife, or a support service you trust."
  ]
},
  "med-lib-box-breath-5": {
  "id": "med-lib-box-breath-5",
  "minutes": 5,
  "theme": "simple paced breathing (box breath)",
  "kind": "library",
  "intent": "A short, simple paced breathing practice that walks you through breathing in, holding, breathing out, and holding again, to gently steady the body. The holds are entirely optional, and you are invited to drop them anytime, because breath-holding does not feel right for every body, especially soon after birth. The aim is a little steadiness, not a perfect pattern, and an ordinary breath at the end.",
  "items": [
    {
      "id": "med-lib-box-breath-5-s0",
      "name": "Warm open. Set the gentle frame.",
      "secs": 13,
      "say": "Welcome. This is a simple breathing practice. We will breathe in a slow, even square, and you can shape it however suits you."
    },
    {
      "id": "med-lib-box-breath-5-s1",
      "name": "Permission to drop the holds, first-class.",
      "secs": 20,
      "say": "There will be a few gentle holds along the way. If holding your breath ever feels uncomfortable, you may drop the holds entirely and simply breathe in and out. That works just as well."
    },
    {
      "id": "med-lib-box-breath-5-s2",
      "name": "Posture, eyes optional.",
      "secs": 14,
      "say": "Settle comfortably. Let your eyes close, or stay open and soft. Let your shoulders drop away from your ears."
    },
    {
      "id": "med-lib-box-breath-5-s3",
      "name": "One natural breath first.",
      "secs": 14,
      "say": "Before we begin, take one ordinary breath, just as it is. No counting yet. Simply notice the air coming in, and going out."
    },
    {
      "id": "med-lib-box-breath-5-s4",
      "name": "Explain the gentle counts.",
      "secs": 16,
      "say": "We will count slowly to four for each part. In for four, a soft hold for four, out for four, and a soft hold for four. Let the counts be gentle, not strict."
    },
    {
      "id": "med-lib-box-breath-5-s5",
      "name": "First guided round.",
      "secs": 18,
      "say": "Let us begin. Breathe in, two, three, four. Hold softly, two, three, four. Breathe out, two, three, four. And hold, two, three, four."
    },
    {
      "id": "med-lib-box-breath-5-s6",
      "name": "Second guided round.",
      "secs": 18,
      "say": "Again. In, two, three, four. Hold, or simply pause, two, three, four. Out, two, three, four. And rest, two, three, four."
    },
    {
      "id": "med-lib-box-breath-5-s7",
      "name": "Third guided round, remind to drop holds.",
      "secs": 18,
      "say": "Once more, and remember you can let the holds go anytime. In, two, three, four. Hold, two, three, four. Out, two, three, four. Pause, two, three, four."
    },
    {
      "id": "med-lib-box-breath-5-s8",
      "name": "Hand pace back. Self-paced silence.",
      "secs": 75,
      "say": "Now continue on your own, at whatever pace feels easy. I will be quiet, and you can keep the gentle square going, or let the holds fall away."
    },
    {
      "id": "med-lib-box-breath-5-s9",
      "name": "Reassure imperfect rhythm.",
      "secs": 16,
      "say": "If the rhythm slips, or a count feels too long, just soften it. There is no perfect square. Steady and kind is the whole point."
    },
    {
      "id": "med-lib-box-breath-5-s10",
      "name": "A little more quiet space.",
      "secs": 45,
      "say": ""
    },
    {
      "id": "med-lib-box-breath-5-s11",
      "name": "Release the pattern.",
      "secs": 16,
      "say": "Now let the counting go completely. Let your breath return to its own ordinary rhythm. Nothing to hold, nothing to shape."
    },
    {
      "id": "med-lib-box-breath-5-s12",
      "name": "Notice and close.",
      "secs": 17,
      "say": "Notice the quiet that a few slow breaths can leave behind. Whenever you are ready, open your eyes, and carry a little of this steadiness with you. Take care."
    }
  ],
  "disclaimers": [
    "This recording is for general relaxation and wellbeing only. It is not medical, psychological, or therapeutic advice.",
    "If you feel dizzy, lightheaded, breathless, or unsafe at any point, stop the breathing, breathe normally, and open your eyes. You can leave this recording whenever you need to.",
    "Breathing practices can occasionally surface difficult feelings, which is especially common after birth. If that happens, please reach out to a qualified professional, your GP, your midwife, or a support service you trust."
  ]
},
  "med-lib-gratitude-10": {
  "id": "med-lib-gratitude-10",
  "minutes": 10,
  "theme": "softly noticing small good things",
  "kind": "library",
  "intent": "A gentle practice of noticing small good things, without ever pretending a hard day is anything other than hard. It makes room for whatever is heavy first, then lets you rest your attention on something ordinary and kind, with no pressure to feel grateful or to count your blessings. The aim is a quiet softening, not forced positivity, and it honours that some days the only good thing is that you are still here.",
  "items": [
    {
      "id": "med-lib-gratitude-10-s0",
      "name": "Warm open, set anti-toxic-positivity tone.",
      "secs": 15,
      "say": "Hello, and welcome. This is a quiet practice of noticing. Not of forcing yourself to feel grateful, and not of pretending anything is better than it is."
    },
    {
      "id": "med-lib-gratitude-10-s1",
      "name": "Make room for the hard first.",
      "secs": 18,
      "say": "If today has been heavy, let it be heavy. We are not going to paper over it. The hard parts are real, and they are allowed to stay in the room with us."
    },
    {
      "id": "med-lib-gratitude-10-s2",
      "name": "Posture and eyes optional.",
      "secs": 15,
      "say": "Settle into wherever you are. Let your eyes close, or stay open and soft. Let your body be held by whatever is beneath you."
    },
    {
      "id": "med-lib-gratitude-10-s3",
      "name": "One settling breath.",
      "secs": 14,
      "say": "Take one slow, easy breath. In, and a long breath out. Just letting yourself arrive here for a moment."
    },
    {
      "id": "med-lib-gratitude-10-s4",
      "name": "Rest after breath.",
      "secs": 60,
      "say": ""
    },
    {
      "id": "med-lib-gratitude-10-s5",
      "name": "Notice one small ordinary thing.",
      "secs": 20,
      "say": "Now, gently, see if there is one small ordinary thing nearby that is alright. The warmth of a drink, a soft blanket, a quiet patch of light. Nothing grand, just something small that is okay."
    },
    {
      "id": "med-lib-gratitude-10-s6",
      "name": "Space to find it, no pressure.",
      "secs": 70,
      "say": ""
    },
    {
      "id": "med-lib-gratitude-10-s7",
      "name": "Reassure if nothing comes.",
      "secs": 18,
      "say": "If nothing comes to mind, that is completely okay. Some days the kindest thing we can notice is simply that we made it this far. That counts as plenty."
    },
    {
      "id": "med-lib-gratitude-10-s8",
      "name": "Let the small thing be enough.",
      "secs": 18,
      "say": "If you did find something small, you do not have to feel any particular way about it. Just let it be there, a small okay thing, resting quietly beside everything else."
    },
    {
      "id": "med-lib-gratitude-10-s9",
      "name": "Longer middle rest.",
      "secs": 100,
      "say": ""
    },
    {
      "id": "med-lib-gratitude-10-s10",
      "name": "Notice an ordinary kindness, optional.",
      "secs": 20,
      "say": "If it feels okay, you might let one moment of ordinary kindness come to mind. Something someone did, or something you managed for someone else, however small. You may skip this entirely."
    },
    {
      "id": "med-lib-gratitude-10-s11",
      "name": "Space for the kindness, or rest.",
      "secs": 78,
      "say": ""
    },
    {
      "id": "med-lib-gratitude-10-s12",
      "name": "Gratitude does not erase the hard.",
      "secs": 20,
      "say": "Noticing a good thing does not cancel out a hard day. They can sit side by side. You are allowed to hold both at once, the tired and the tender."
    },
    {
      "id": "med-lib-gratitude-10-s13",
      "name": "Quiet space to hold both.",
      "secs": 71,
      "say": ""
    },
    {
      "id": "med-lib-gratitude-10-s14",
      "name": "Turn the noticing toward yourself.",
      "secs": 18,
      "say": "And if you can, let one small bit of that softness turn toward yourself. You are doing more than anyone sees, including, perhaps, you."
    },
    {
      "id": "med-lib-gratitude-10-s15",
      "name": "Begin gentle return.",
      "secs": 16,
      "say": "When you are ready, with no rush at all, let your breath become a little deeper. Begin to bring yourself back into the room."
    },
    {
      "id": "med-lib-gratitude-10-s16",
      "name": "Re-orienting, optional movement.",
      "secs": 16,
      "say": "Maybe a small stretch, or a slow blink, or opening your eyes if they were closed. Move only as much as feels good."
    },
    {
      "id": "med-lib-gratitude-10-s17",
      "name": "Close, honouring the whole day.",
      "secs": 13,
      "say": "Whatever kind of day this is, you noticed one small good thing inside it. That is enough. Take care of yourself."
    }
  ],
  "disclaimers": [
    "This recording is for general relaxation and wellbeing only. It is not medical, psychological, or therapeutic advice.",
    "If you feel distressed, dizzy, or unsafe at any point, stop and open your eyes. You can pause or leave this recording whenever you need to.",
    "Reflecting quietly can sometimes bring up difficult feelings, which is especially common after birth. If that happens, please reach out to a qualified professional, your GP, your midwife, or a support service you trust."
  ]
},
  "med-lib-grounding-senses-7": {
  "id": "med-lib-grounding-senses-7",
  "minutes": 7,
  "theme": "five-senses grounding",
  "kind": "library",
  "intent": "A trauma-aware grounding practice for moments of feeling scattered, foggy, or far away from yourself. It uses the five senses to gently bring your attention back to the present room, without asking for stillness, closed eyes, or focus on the body if that does not feel safe. The aim is simply to help you arrive a little more here, at your own pace.",
  "items": [
    {
      "id": "med-lib-grounding-senses-7-s0",
      "name": "Warm welcome. Unhurried tone.",
      "secs": 13,
      "say": "Hello, and welcome. If things feel scattered or far away right now, you are in a good place. There is nothing to fix. We are only going to come back, slowly, to where you are."
    },
    {
      "id": "med-lib-grounding-senses-7-s1",
      "name": "Permission for position and eyes.",
      "secs": 16,
      "say": "Stay in whatever position you are in. Sitting, standing, lying down, holding a little one. Your eyes can stay open, resting softly on the room. Open eyes are welcome here, and often help."
    },
    {
      "id": "med-lib-grounding-senses-7-s2",
      "name": "Normalize feeling far away.",
      "secs": 17,
      "say": "Feeling foggy, or a step removed from yourself, is something a tired nervous system does to cope. It is not wrong, and it is not dangerous. We will just offer it some gentle company."
    },
    {
      "id": "med-lib-grounding-senses-7-s3",
      "name": "Orient to the room first.",
      "secs": 16,
      "say": "Let us begin with the room around you. You are not inside the whole day. You are in this one space, and it is holding you right now."
    },
    {
      "id": "med-lib-grounding-senses-7-s4",
      "name": "Sense one: sight. Slow looking.",
      "secs": 24,
      "say": "Look around, slowly. Notice five things you can see. A color, a shape, a corner, the light. There is no right answer. Just let your eyes land, one thing at a time."
    },
    {
      "id": "med-lib-grounding-senses-7-s5",
      "name": "Silence for looking.",
      "secs": 37,
      "say": ""
    },
    {
      "id": "med-lib-grounding-senses-7-s6",
      "name": "Sense two: touch.",
      "secs": 24,
      "say": "Now notice four things you can feel. The floor under your feet. Fabric against your skin. The temperature of the air. The weight of your own hands resting."
    },
    {
      "id": "med-lib-grounding-senses-7-s7",
      "name": "Silence for feeling.",
      "secs": 37,
      "say": ""
    },
    {
      "id": "med-lib-grounding-senses-7-s8",
      "name": "Sense three: sound.",
      "secs": 22,
      "say": "Now listen for three sounds. Some near, some far away. The hum of the room, something outside, the quiet underneath it all. Let the sounds come to you. You do not have to chase them."
    },
    {
      "id": "med-lib-grounding-senses-7-s9",
      "name": "Silence for listening.",
      "secs": 37,
      "say": ""
    },
    {
      "id": "med-lib-grounding-senses-7-s10",
      "name": "Sense four: smell, with opt-out.",
      "secs": 22,
      "say": "Now notice two things you can smell, if there is anything there. And if not, that is completely fine. You can simply take one slow breath in through the nose, and let it out."
    },
    {
      "id": "med-lib-grounding-senses-7-s11",
      "name": "Sense five: taste, gentle.",
      "secs": 20,
      "say": "And one thing you can taste, or simply the feeling inside your own mouth. Tea, water, the air. Nothing special is needed. Just one small thing, here and now."
    },
    {
      "id": "med-lib-grounding-senses-7-s12",
      "name": "Gather the senses. Reassurance.",
      "secs": 18,
      "say": "See, hear, feel, breathe. All of these are happening right here, in the present. The present is a real place, and you are allowed to rest in it."
    },
    {
      "id": "med-lib-grounding-senses-7-s13",
      "name": "Longer open silence to settle.",
      "secs": 24,
      "say": "Stay here a little while in your own quiet. I will leave you some space. Let the room keep holding you."
    },
    {
      "id": "med-lib-grounding-senses-7-s14",
      "name": "Quiet continues.",
      "secs": 40,
      "say": ""
    },
    {
      "id": "med-lib-grounding-senses-7-s15",
      "name": "Gentle return.",
      "secs": 17,
      "say": "When you are ready, and only then, let your breath become a little deeper. Maybe wiggle your fingers, or roll your shoulders, slow and easy."
    },
    {
      "id": "med-lib-grounding-senses-7-s16",
      "name": "Notice the shift, no demand.",
      "secs": 16,
      "say": "Notice how here you feel now, compared to when we started. Even a small change is yours, and it counts. There is no level you were supposed to reach."
    },
    {
      "id": "med-lib-grounding-senses-7-s17",
      "name": "Close.",
      "secs": 20,
      "say": "You found your way back, gently, in your own time. Carry a little of this steadiness with you. I will be here whenever you need it again. Take care."
    }
  ],
  "disclaimers": [
    "This is a relaxation and grounding practice for general wellbeing, not medical, psychological, or therapeutic advice.",
    "If you feel distressed at any point, please open your eyes, stop, and tend to yourself. You can leave this practice anytime.",
    "Grounding can sometimes surface difficult feelings, especially in the postpartum period. If hard feelings arise or persist, please reach out to a qualified professional or someone you trust."
  ]
},
  "med-lib-letting-go-15": {
  "id": "med-lib-letting-go-15",
  "minutes": 15,
  "theme": "releasing tension and what you cannot control",
  "kind": "library",
  "intent": "A fifteen-minute, exhale-focused practice for softening physical tension and loosening your grip on the things outside your control. The arc moves from arriving, through slow extended exhales, into a gentle release of holding in the body, and then into spacious silence. Nothing is forced; letting go here means allowing, not pushing, and you are free to keep hold of anything you are not ready to release.",
  "items": [
    {
      "id": "med-lib-letting-go-15-s0",
      "name": "Welcome. Warm, slow.",
      "secs": 15,
      "say": "Hello, and welcome. For the next little while, there is nothing you have to hold together. You can let the day, and everything in it, set itself down for now."
    },
    {
      "id": "med-lib-letting-go-15-s1",
      "name": "Position and eyes, permission.",
      "secs": 16,
      "say": "Settle into whatever position you are in. Let whatever is beneath you take your weight. Your eyes can close, or stay open and soft on one calm spot. Whichever feels safer today."
    },
    {
      "id": "med-lib-letting-go-15-s2",
      "name": "Define letting go gently.",
      "secs": 20,
      "say": "Letting go is not pushing anything away. It is more like opening a hand that has been clenched for a long time. We will do it slowly, and only as far as feels alright to you."
    },
    {
      "id": "med-lib-letting-go-15-s3",
      "name": "Settle into present.",
      "secs": 16,
      "say": "Let us begin by simply arriving. You are here, in this one room, in this one moment. The rest of the day can wait outside the door for a while."
    },
    {
      "id": "med-lib-letting-go-15-s4",
      "name": "Notice breath, no change yet.",
      "secs": 18,
      "say": "Bring a soft attention to your breath, wherever it is easiest to feel. The nose, the chest, the belly. For now, there is nothing to change. Just notice it moving on its own."
    },
    {
      "id": "med-lib-letting-go-15-s5",
      "name": "Introduce the long exhale.",
      "secs": 18,
      "say": "When you are ready, let the next breath out slowly. A long, easy exhale, a little longer than the breath in. As if you were setting something gently down."
    },
    {
      "id": "med-lib-letting-go-15-s6",
      "name": "Exhale pacing.",
      "secs": 20,
      "say": "Breathe in, unhurried. And out, slow and long. With each exhale, you might let the shoulders drop a touch. Nothing forced. Just letting the out-breath carry a little weight away."
    },
    {
      "id": "med-lib-letting-go-15-s7",
      "name": "Silence to breathe.",
      "secs": 57,
      "say": ""
    },
    {
      "id": "med-lib-letting-go-15-s8",
      "name": "Breath alternative, trauma-aware.",
      "secs": 20,
      "say": "If watching the breath feels like too much, rest your attention on a sound in the room instead, or on the feeling of your feet on the floor. That counts just as much. There is always another way in."
    },
    {
      "id": "med-lib-letting-go-15-s9",
      "name": "Hand pace back. First silence.",
      "secs": 30,
      "say": "Let us stay with a few of those slow exhales together. I will be quiet now, and you can let the breath find its own gentle rhythm."
    },
    {
      "id": "med-lib-letting-go-15-s10",
      "name": "Silence continues.",
      "secs": 59,
      "say": ""
    },
    {
      "id": "med-lib-letting-go-15-s11",
      "name": "Release tension, head and face.",
      "secs": 22,
      "say": "Now, if it feels alright, let us soften the body where it holds. Begin with the face. Let the forehead smooth. Let the jaw unclench, the space between the eyebrows ease. On the next exhale, let it all loosen."
    },
    {
      "id": "med-lib-letting-go-15-s12",
      "name": "Silence to release.",
      "secs": 55,
      "say": ""
    },
    {
      "id": "med-lib-letting-go-15-s13",
      "name": "Release shoulders and hands.",
      "secs": 22,
      "say": "Now the shoulders. Let them fall away from the ears. The arms growing heavy. The hands, which have carried and held so much, allowed to rest open, or however they like. Breathe out, and let them be."
    },
    {
      "id": "med-lib-letting-go-15-s14",
      "name": "Silence to release.",
      "secs": 55,
      "say": ""
    },
    {
      "id": "med-lib-letting-go-15-s15",
      "name": "Release belly and legs.",
      "secs": 22,
      "say": "Now the belly, soft. The back, supported. The legs heavy and at ease. Wherever you are still holding, see if a long exhale can let it loosen, even a little. Only as far as feels safe."
    },
    {
      "id": "med-lib-letting-go-15-s16",
      "name": "Silence to release.",
      "secs": 54,
      "say": ""
    },
    {
      "id": "med-lib-letting-go-15-s17",
      "name": "Honor what stays. No force.",
      "secs": 22,
      "say": "And anything that does not want to let go today, you may keep. The body holds on for reasons. There is no failing here. Softening even one small place is plenty."
    },
    {
      "id": "med-lib-letting-go-15-s18",
      "name": "Turn to what you cannot control.",
      "secs": 24,
      "say": "Now, gently, the things on your mind. The worries, the tasks, the outcomes you cannot decide. Picture setting them on a shelf nearby, just for now. They are not gone. They are only out of your hands for these few minutes."
    },
    {
      "id": "med-lib-letting-go-15-s19",
      "name": "Exhale-release the uncontrollable.",
      "secs": 22,
      "say": "Some things are simply not yours to control, no matter how much you care. With each long exhale, you can loosen your grip on just one of them. Breathe out, and let it be what it is for now."
    },
    {
      "id": "med-lib-letting-go-15-s20",
      "name": "Reassurance, present-tense.",
      "secs": 18,
      "say": "You are supported right now. The ground is holding you. In this exact moment, there is nothing you must carry. The shelf will keep what you set down."
    },
    {
      "id": "med-lib-letting-go-15-s21",
      "name": "Longest open silence.",
      "secs": 55,
      "say": "Stay here, in your own quiet, for a while. I will leave you a long, open space. Just breathing, and letting go, as much or as little as you wish."
    },
    {
      "id": "med-lib-letting-go-15-s22",
      "name": "Silence continues.",
      "secs": 83,
      "say": ""
    },
    {
      "id": "med-lib-letting-go-15-s23",
      "name": "Silence continues.",
      "secs": 83,
      "say": ""
    },
    {
      "id": "med-lib-letting-go-15-s24",
      "name": "Step down from long exhale.",
      "secs": 16,
      "say": "Now let your breathing become ordinary again. You can release the long exhale, and simply let the breath be however it wants to be."
    },
    {
      "id": "med-lib-letting-go-15-s25",
      "name": "Gentle return.",
      "secs": 18,
      "say": "When you feel ready, and there is no rush at all, begin to come back. Let the breath deepen a touch. Maybe a small movement in the fingers or the feet."
    },
    {
      "id": "med-lib-letting-go-15-s26",
      "name": "Pick back up only what you choose.",
      "secs": 20,
      "say": "Whatever you set on the shelf is still there, if you need it. But you might find you can leave a little of it behind. You get to choose what you pick back up."
    },
    {
      "id": "med-lib-letting-go-15-s27",
      "name": "Close.",
      "secs": 20,
      "say": "You let go of something today, even if it was small, and that is real. Carry this looser, softer feeling with you. I will be here when you need it again. Take care."
    }
  ],
  "disclaimers": [
    "This is a relaxation practice for general wellbeing, not medical, psychological, or therapeutic advice.",
    "If you feel distressed at any point, please open your eyes, stop, and tend to yourself. You can leave this practice anytime.",
    "Releasing tension can sometimes surface difficult feelings, especially in the postpartum period. If hard feelings arise or persist, please reach out to a qualified professional or someone you trust."
  ]
},
  "med-lib-refocus-5": {
  "id": "med-lib-refocus-5",
  "minutes": 5,
  "theme": "quick reset between tasks",
  "kind": "library",
  "intent": "A short, practical reset to clear the residue of one task before you begin the next. It uses a few slow breaths and a simple closing-and-opening of attention to help you arrive fresh, without needing quiet, stillness, or closed eyes. The aim is a clean, gentle handover from what you just finished to what comes next.",
  "items": [
    {
      "id": "med-lib-refocus-5-s0",
      "name": "Welcome. Clear, warm.",
      "secs": 12,
      "say": "Hello. Let us take a short pause between one thing and the next. A few minutes to set down what is finished, before you pick up what comes next."
    },
    {
      "id": "med-lib-refocus-5-s1",
      "name": "Position, eyes, permission.",
      "secs": 14,
      "say": "Stay right where you are. You can keep your eyes open and soft, or let them close. There is no need to change anything about your body. Just pause."
    },
    {
      "id": "med-lib-refocus-5-s2",
      "name": "Acknowledge the last task.",
      "secs": 16,
      "say": "Whatever you were just doing, let it be done for now, finished or not. You can come back to it. For these few minutes, it does not need your attention."
    },
    {
      "id": "med-lib-refocus-5-s3",
      "name": "First slow breaths.",
      "secs": 18,
      "say": "Take one slow breath in. And a longer breath out. And again, in gently, and out slowly. Let the exhale clear a little space inside."
    },
    {
      "id": "med-lib-refocus-5-s4",
      "name": "Short silence with breath.",
      "secs": 22,
      "say": "Stay with a few of those on your own. In, and slowly out. I will be quiet for a moment."
    },
    {
      "id": "med-lib-refocus-5-s5",
      "name": "Breathing silence.",
      "secs": 36,
      "say": ""
    },
    {
      "id": "med-lib-refocus-5-s6",
      "name": "Settle attention to one point.",
      "secs": 18,
      "say": "Now bring your attention to one simple thing. The feeling of your feet on the floor, or your breath, or a steady sound in the room. Just one place to rest."
    },
    {
      "id": "med-lib-refocus-5-s7",
      "name": "Brief grounding silence.",
      "secs": 41,
      "say": ""
    },
    {
      "id": "med-lib-refocus-5-s8",
      "name": "Normalize a busy mind.",
      "secs": 16,
      "say": "If your mind is already jumping to the next task, that is completely normal. You do not have to empty it. Just let it slow down by one notch."
    },
    {
      "id": "med-lib-refocus-5-s9",
      "name": "Set a gentle intention.",
      "secs": 20,
      "say": "Now think, lightly, of the one thing you are turning to next. Not the whole list. Just the next thing. You do not have to do it well. You only have to begin it."
    },
    {
      "id": "med-lib-refocus-5-s10",
      "name": "Reassurance.",
      "secs": 16,
      "say": "You have a clean moment right now. The last thing is behind you. The next thing has not started yet. You are simply here, ready."
    },
    {
      "id": "med-lib-refocus-5-s11",
      "name": "Final short silence.",
      "secs": 40,
      "say": ""
    },
    {
      "id": "med-lib-refocus-5-s12",
      "name": "Return and orient.",
      "secs": 15,
      "say": "Let your breath become a touch deeper. Open your eyes if they were closed. Look around, and notice you are here, and ready."
    },
    {
      "id": "med-lib-refocus-5-s13",
      "name": "Close.",
      "secs": 16,
      "say": "Carry this small reset with you into what comes next. One thing at a time, gently. I will be here whenever you need another pause. Take care."
    }
  ],
  "disclaimers": [
    "This is a relaxation and focus practice for general wellbeing, not medical, psychological, or therapeutic advice.",
    "If you feel distressed at any point, please open your eyes, stop, and tend to yourself. You can leave this practice anytime.",
    "Pausing can sometimes surface difficult feelings, especially in the postpartum period. If hard feelings arise or persist, please reach out to a qualified professional or someone you trust."
  ]
},
  "med-lib-loving-kindness-15": {
  "id": "med-lib-loving-kindness-15",
  "minutes": 15,
  "theme": "loving-kindness for self and others",
  "kind": "library",
  "intent": "A fifteen-minute practice of sending gentle warmth, first to yourself and then outward to others. It is offered as an invitation, never a demand, and it makes room for ambivalence: warmth toward yourself can feel hard, and that is honored throughout. The phrases are simple wishes, and you are always free to soften them, change them, or simply rest in the breath instead.",
  "items": [
    {
      "id": "med-lib-loving-kindness-15-s0",
      "name": "Welcome. Warm, unhurried.",
      "secs": 16,
      "say": "Hello, and welcome. This is a practice of sending a little warmth, starting with yourself. If that already feels difficult, you are not alone, and you are still welcome here exactly as you are."
    },
    {
      "id": "med-lib-loving-kindness-15-s1",
      "name": "Position and eyes, permission.",
      "secs": 16,
      "say": "Settle into whatever position you are in. Your eyes can close, or stay open and soft on a calm spot. Whichever feels safer today."
    },
    {
      "id": "med-lib-loving-kindness-15-s2",
      "name": "Name that warmth can be hard.",
      "secs": 20,
      "say": "A gentle word about this practice. We will offer some kind wishes. If they feel true, lovely. If they feel forced, or even bring up the opposite, that is alright too. We are not performing warmth. We are only making a little room for it."
    },
    {
      "id": "med-lib-loving-kindness-15-s3",
      "name": "Settle with the breath.",
      "secs": 18,
      "say": "Let us begin with a few slow breaths. In gently, and out a little longer. Let the body settle, and let the heart area, the center of the chest, soften just a touch."
    },
    {
      "id": "med-lib-loving-kindness-15-s4",
      "name": "Short settling silence.",
      "secs": 68,
      "say": ""
    },
    {
      "id": "med-lib-loving-kindness-15-s5",
      "name": "Begin with self, gently.",
      "secs": 22,
      "say": "Now, if you are willing, bring yourself to mind. Not the version you think you should be. Just you, as you are today, tired and trying. You might picture yourself, or simply sense your own presence here."
    },
    {
      "id": "med-lib-loving-kindness-15-s6",
      "name": "First phrases for self.",
      "secs": 22,
      "say": "And silently, you might offer yourself a few wishes. May I be at ease. May I be gentle with myself. May I have what I need today. Say them in your own words, or just let them be near."
    },
    {
      "id": "med-lib-loving-kindness-15-s7",
      "name": "Silence to repeat.",
      "secs": 70,
      "say": ""
    },
    {
      "id": "med-lib-loving-kindness-15-s8",
      "name": "Honor ambivalence toward self.",
      "secs": 22,
      "say": "If those words feel hollow, or hard to mean, you do not have to force them. You might simply place a hand on your chest, or wish, may this be a little easier. Even that is a kindness. Ambivalence is welcome here."
    },
    {
      "id": "med-lib-loving-kindness-15-s9",
      "name": "Silence with self.",
      "secs": 70,
      "say": ""
    },
    {
      "id": "med-lib-loving-kindness-15-s10",
      "name": "Turn to someone easy to love.",
      "secs": 22,
      "say": "Now, if you would like, bring to mind someone who is easy to care for. A child, a friend, even a pet. Someone the heart softens toward without much effort. Picture them here with you."
    },
    {
      "id": "med-lib-loving-kindness-15-s11",
      "name": "Phrases for the loved one.",
      "secs": 20,
      "say": "And offer them the same wishes. May you be at ease. May you be safe. May you have what you need. Let the warmth go out to them, as much or as little as it wants to."
    },
    {
      "id": "med-lib-loving-kindness-15-s12",
      "name": "Silence to repeat.",
      "secs": 70,
      "say": ""
    },
    {
      "id": "med-lib-loving-kindness-15-s13",
      "name": "Turn to someone neutral.",
      "secs": 22,
      "say": "Now, perhaps, someone you barely know. Someone you passed today, a voice on the phone, a face in a crowd. They have a whole life, and worries much like yours. You might wish them well, too. May you be at ease."
    },
    {
      "id": "med-lib-loving-kindness-15-s14",
      "name": "Silence to repeat.",
      "secs": 67,
      "say": ""
    },
    {
      "id": "med-lib-loving-kindness-15-s15",
      "name": "Widen out, fully optional.",
      "secs": 22,
      "say": "And if it feels right, you can let the warmth widen further. To everyone in your home, your street, all the tired people doing their best tonight. May we all be at ease. And if widening feels like too much, simply return to your own breath. Either is complete."
    },
    {
      "id": "med-lib-loving-kindness-15-s16",
      "name": "Come back to self.",
      "secs": 20,
      "say": "Now come gently back to yourself. Include yourself in the warmth you have been sending out. You are as deserving of it as anyone you pictured. May you be at ease, too."
    },
    {
      "id": "med-lib-loving-kindness-15-s17",
      "name": "Reassurance, no scorekeeping.",
      "secs": 20,
      "say": "There is no amount of warmth you were supposed to feel. Some days the heart is open, some days it is guarded, and that is human. Showing up for this at all is the kindness."
    },
    {
      "id": "med-lib-loving-kindness-15-s18",
      "name": "Long open silence.",
      "secs": 55,
      "say": "Rest here for a while, in your own quiet. I will leave you a long, open space. Let any warmth that is here simply be, without needing to grow."
    },
    {
      "id": "med-lib-loving-kindness-15-s19",
      "name": "Silence continues.",
      "secs": 96,
      "say": ""
    },
    {
      "id": "med-lib-loving-kindness-15-s20",
      "name": "Silence continues.",
      "secs": 89,
      "say": ""
    },
    {
      "id": "med-lib-loving-kindness-15-s21",
      "name": "Gentle return.",
      "secs": 18,
      "say": "When you feel ready, with no rush, begin to come back. Let the breath deepen a little. A small movement in the hands or feet, and your eyes opening if they were closed."
    },
    {
      "id": "med-lib-loving-kindness-15-s22",
      "name": "Notice without demand.",
      "secs": 18,
      "say": "Notice how you feel now, compared to when we began. Whatever is here is allowed, warmth, numbness, or something in between. You met yourself gently, and that counts."
    },
    {
      "id": "med-lib-loving-kindness-15-s23",
      "name": "Close.",
      "secs": 17,
      "say": "Carry a little of this warmth with you, especially the part you offered yourself. You are worth your own kindness. I will be here whenever you need this again. Take care."
    }
  ],
  "disclaimers": [
    "This is a relaxation practice for general wellbeing, not medical, psychological, or therapeutic advice.",
    "If you feel distressed at any point, please open your eyes, stop, and tend to yourself. You can leave this practice anytime.",
    "Loving-kindness can sometimes surface difficult feelings, especially in the postpartum period. If hard feelings arise or persist, please reach out to a qualified professional or someone you trust."
  ]
},
  "med-lib-frustration-ease-10": {
  "id": "med-lib-frustration-ease-10",
  "minutes": 10,
  "theme": "softening frustration without judging it",
  "kind": "library",
  "intent": "A gentle, trauma-aware practice for moments when anger or frustration feels tight and loud inside. It does not ask you to get rid of the feeling or decide whether it is justified; it only helps you make a little safe room around it, so it has space to move and soften on its own. The aim is to be on your own side while the feeling is here, not to fix it or push it away.",
  "items": [
    {
      "id": "med-lib-frustration-ease-10-s0",
      "name": "Warm, unhurried welcome. No demand to calm down.",
      "secs": 14,
      "say": "Hello, and welcome. If you are feeling frustrated or angry right now, you are in the right place. Nothing about that needs to change for us to begin."
    },
    {
      "id": "med-lib-frustration-ease-10-s1",
      "name": "Permission for position. Pause after.",
      "secs": 13,
      "say": "Settle into however you are. Sitting, standing, pacing, lying down. You do not have to be still for this to work."
    },
    {
      "id": "med-lib-frustration-ease-10-s2",
      "name": "Eyes-open offered first-class.",
      "secs": 15,
      "say": "Your eyes can close, or stay open and soft on one spot in the room. Whichever feels safer to you today."
    },
    {
      "id": "med-lib-frustration-ease-10-s3",
      "name": "Name the feeling as allowed, not a problem.",
      "secs": 18,
      "say": "Let us start by letting the frustration simply be here. It is allowed. It is not a sign you are doing anything wrong. Feelings like this make sense."
    },
    {
      "id": "med-lib-frustration-ease-10-s4",
      "name": "Explicitly remove the judgment task.",
      "secs": 18,
      "say": "You do not have to decide right now whether the anger is fair, or too big, or justified. We are not putting it on trial. We are just making room."
    },
    {
      "id": "med-lib-frustration-ease-10-s5",
      "name": "Locate it gently, opt-out built in.",
      "secs": 20,
      "say": "If it feels okay, notice where the feeling sits. Maybe a tightness in the jaw, the chest, the hands. Or, if looking inward is too much, just rest your attention on a sound in the room instead."
    },
    {
      "id": "med-lib-frustration-ease-10-s6",
      "name": "Breath anchor with alternative.",
      "secs": 17,
      "say": "Now find your breath wherever it is easiest. At the nose, the chest, the belly. If watching the breath feels like too much, the feeling of your feet on the floor works just as well."
    },
    {
      "id": "med-lib-frustration-ease-10-s7",
      "name": "Long, slow exhale to discharge.",
      "secs": 16,
      "say": "When you are ready, let one breath out slowly. A long exhale, like a quiet sigh. Anger often softens a little on the way out."
    },
    {
      "id": "med-lib-frustration-ease-10-s8",
      "name": "Pace, gentle, no force.",
      "secs": 18,
      "say": "Breathe in, easy and unhurried. And out, long and slow. Nothing forced. Just letting each exhale loosen one small knot."
    },
    {
      "id": "med-lib-frustration-ease-10-s9",
      "name": "First open silence.",
      "secs": 30,
      "say": "Let us stay with a few of those together. I will be quiet now, and you can let the breath find its own rhythm."
    },
    {
      "id": "med-lib-frustration-ease-10-s10",
      "name": "Open silence. Hold the quiet.",
      "secs": 40,
      "say": ""
    },
    {
      "id": "med-lib-frustration-ease-10-s11",
      "name": "Open silence. Hold the quiet.",
      "secs": 30,
      "say": ""
    },
    {
      "id": "med-lib-frustration-ease-10-s12",
      "name": "Reframe the feeling as protective.",
      "secs": 20,
      "say": "Anger often shows up to protect something that matters to you, or because something felt unfair, or because you are tired and stretched thin. You can thank it for trying, even while you let it ease."
    },
    {
      "id": "med-lib-frustration-ease-10-s13",
      "name": "Permission for it to stay.",
      "secs": 18,
      "say": "If the frustration is still here, that is completely fine. We are not chasing it away. We are letting it sit beside us without running the whole show."
    },
    {
      "id": "med-lib-frustration-ease-10-s14",
      "name": "Softening image, optional.",
      "secs": 19,
      "say": "Imagine the feeling has a little more space around it now. Not gone, just less crowded. Like a tight fist slowly, gently unclenching, at its own pace."
    },
    {
      "id": "med-lib-frustration-ease-10-s15",
      "name": "Second, longer open silence.",
      "secs": 45,
      "say": "Stay here in your own quiet for a while. There is nowhere you need to be. I will leave you some space."
    },
    {
      "id": "med-lib-frustration-ease-10-s16",
      "name": "Open silence. Hold the quiet.",
      "secs": 50,
      "say": ""
    },
    {
      "id": "med-lib-frustration-ease-10-s17",
      "name": "Open silence. Hold the quiet.",
      "secs": 44,
      "say": ""
    },
    {
      "id": "med-lib-frustration-ease-10-s18",
      "name": "On-your-side reassurance.",
      "secs": 18,
      "say": "You are not a bad person for feeling this. You are a person who feels things deeply, and who is being kind to yourself right now. That matters."
    },
    {
      "id": "med-lib-frustration-ease-10-s19",
      "name": "Third open silence.",
      "secs": 35,
      "say": "A little more quiet, if you would like it. Let the breath stay slow."
    },
    {
      "id": "med-lib-frustration-ease-10-s20",
      "name": "Open silence. Hold the quiet.",
      "secs": 40,
      "say": ""
    },
    {
      "id": "med-lib-frustration-ease-10-s21",
      "name": "Gentle return.",
      "secs": 16,
      "say": "When you feel ready, begin to come back. No rush. Let your next breath become a touch deeper."
    },
    {
      "id": "med-lib-frustration-ease-10-s22",
      "name": "Optional re-orienting movement.",
      "secs": 16,
      "say": "Maybe a small movement. Unclench your hands, roll your shoulders, or open your eyes if they were closed."
    },
    {
      "id": "med-lib-frustration-ease-10-s23",
      "name": "Notice without demanding change.",
      "secs": 16,
      "say": "Notice how the feeling sits now, compared to when we started. Maybe it softened. Maybe it did not. Either way, you stayed with it kindly."
    },
    {
      "id": "med-lib-frustration-ease-10-s24",
      "name": "Affirmation. Warm close.",
      "secs": 14,
      "say": "You met something hard without turning on yourself. That takes real care. You can carry this softness with you. Take care."
    }
  ],
  "disclaimers": [
    "This is a relaxation practice for general wellbeing, not medical, psychological, or therapeutic advice.",
    "If you feel distressed at any point, you can open your eyes, stop, and leave the practice. You may step away anytime.",
    "Practices like this can sometimes surface difficult feelings, especially during the postpartum period. If anger or distress feels overwhelming or persistent, please reach out to a qualified professional or someone you trust."
  ]
},
  "med-lib-steady-confidence-7": {
  "id": "med-lib-steady-confidence-7",
  "minutes": 7,
  "theme": "quiet self-trust before something hard",
  "kind": "library",
  "intent": "A short, grounded practice for the minutes before something that feels difficult or important. It is not hype and it does not ask you to feel fearless; it helps you find a quiet, steady self-trust underneath the nerves. The aim is to remind you that you can do this at your own pace, with the steadiness that is already yours.",
  "items": [
    {
      "id": "med-lib-steady-confidence-7-s0",
      "name": "Calm, grounded welcome.",
      "secs": 14,
      "say": "Hello, and welcome. Something ahead of you might feel big right now. We are not going to pump you up. We are just going to help you feel steady."
    },
    {
      "id": "med-lib-steady-confidence-7-s1",
      "name": "Permission for position. Pause.",
      "secs": 13,
      "say": "Settle into however you are. Sitting, standing, or on your feet ready to go. All of it is fine."
    },
    {
      "id": "med-lib-steady-confidence-7-s2",
      "name": "Eyes-open offered first.",
      "secs": 14,
      "say": "Your eyes can close, or stay open and soft on one calm spot. Whichever helps you feel more here."
    },
    {
      "id": "med-lib-steady-confidence-7-s3",
      "name": "Normalize nerves explicitly.",
      "secs": 17,
      "say": "If there are nerves, let them be here. Nerves do not mean you are not ready. They often just mean this matters to you. That is allowed."
    },
    {
      "id": "med-lib-steady-confidence-7-s4",
      "name": "Grounding through contact, opt-out.",
      "secs": 18,
      "say": "Feel where your body meets the ground or the chair. Let it hold some of your weight. If focusing on the body is too much, rest on a steady sound instead."
    },
    {
      "id": "med-lib-steady-confidence-7-s5",
      "name": "Slow exhale to settle.",
      "secs": 16,
      "say": "Let one breath out slowly now. A long, easy exhale. Let your shoulders come down a little as it leaves."
    },
    {
      "id": "med-lib-steady-confidence-7-s6",
      "name": "Breath pacing, unhurried.",
      "secs": 17,
      "say": "Breathe in, gentle. And out, slow and long. You are not rushing toward the hard thing. You are right here, getting steady."
    },
    {
      "id": "med-lib-steady-confidence-7-s7",
      "name": "First open silence.",
      "secs": 30,
      "say": "Stay with a few of those breaths in your own quiet. I will give you some space."
    },
    {
      "id": "med-lib-steady-confidence-7-s8",
      "name": "Open silence. Hold the quiet.",
      "secs": 40,
      "say": ""
    },
    {
      "id": "med-lib-steady-confidence-7-s9",
      "name": "Quiet self-trust, not hype.",
      "secs": 20,
      "say": "You have done hard things before. Maybe not this exact one, but hard things. The same steadiness that carried you then is still here, underneath the nerves."
    },
    {
      "id": "med-lib-steady-confidence-7-s10",
      "name": "Permission to go at own pace.",
      "secs": 18,
      "say": "You do not have to do this perfectly. You only have to do it at your own pace, one step at a time. That is more than enough."
    },
    {
      "id": "med-lib-steady-confidence-7-s11",
      "name": "Second open silence.",
      "secs": 40,
      "say": "Rest in that for a moment. Nothing to prove right now. Just quiet, steady ground beneath you."
    },
    {
      "id": "med-lib-steady-confidence-7-s12",
      "name": "Open silence. Hold the quiet.",
      "secs": 55,
      "say": ""
    },
    {
      "id": "med-lib-steady-confidence-7-s13",
      "name": "Open silence. Hold the quiet.",
      "secs": 45,
      "say": ""
    },
    {
      "id": "med-lib-steady-confidence-7-s14",
      "name": "Grounded affirmation, present tense.",
      "secs": 18,
      "say": "Right now, you are calm enough. You are capable enough. You can meet what comes, and you can pause if you need to."
    },
    {
      "id": "med-lib-steady-confidence-7-s15",
      "name": "Gentle return toward the day.",
      "secs": 16,
      "say": "When you are ready, begin to come back. Let your breath become a touch fuller, carrying this steadiness with you."
    },
    {
      "id": "med-lib-steady-confidence-7-s16",
      "name": "Optional movement.",
      "secs": 15,
      "say": "Maybe straighten up a little, feel your feet, or open your eyes if they were closed."
    },
    {
      "id": "med-lib-steady-confidence-7-s17",
      "name": "Warm, quiet close.",
      "secs": 14,
      "say": "You are steadier than the nerves would have you believe. Go gently, at your own pace. You have got this. Take care."
    }
  ],
  "disclaimers": [
    "This is a relaxation practice for general wellbeing, not medical, psychological, or therapeutic advice.",
    "If you feel distressed at any point, you can open your eyes, stop, and leave the practice. You may step away anytime.",
    "Practices like this can sometimes surface difficult feelings, especially during the postpartum period. If anxiety or distress feels overwhelming, please reach out to a qualified professional or someone you trust."
  ]
},
  "med-lib-ease-discomfort-15": {
  "id": "med-lib-ease-discomfort-15",
  "minutes": 15,
  "theme": "gentle awareness for physical discomfort or tension",
  "kind": "library",
  "intent": "A slow, trauma-aware practice for moments of physical discomfort or tension, offering gentle, kind attention rather than trying to force the discomfort to leave. Focusing on the body is entirely optional throughout; breath and sound are offered as equal alternatives at every step. This is a relaxation practice only and is never a substitute for medical care.",
  "items": [
    {
      "id": "med-lib-ease-discomfort-15-s0",
      "name": "Warm welcome, clear non-medical framing.",
      "secs": 16,
      "say": "Hello, and welcome. If your body feels uncomfortable or tense right now, this is a gentle place to rest with that. This is not treatment. It is simply a few kind minutes for yourself."
    },
    {
      "id": "med-lib-ease-discomfort-15-s1",
      "name": "Medical-care caveat, plainly stated.",
      "secs": 18,
      "say": "This practice will not fix or diagnose anything, and it does not replace medical care. If you are in real pain or worried about your body, please let a doctor or midwife know. This is only here to keep you company."
    },
    {
      "id": "med-lib-ease-discomfort-15-s2",
      "name": "Permission for position.",
      "secs": 14,
      "say": "Settle into whatever position is kindest to your body right now. Lying down, propped up, curled on your side. There is no correct way."
    },
    {
      "id": "med-lib-ease-discomfort-15-s3",
      "name": "Eyes-open offered first.",
      "secs": 14,
      "say": "Your eyes can close, or stay open and soft. Whichever feels safer and easier to you today."
    },
    {
      "id": "med-lib-ease-discomfort-15-s4",
      "name": "Make body focus opt-in from the start.",
      "secs": 20,
      "say": "In this practice we may gently notice the body, but that is always your choice. At any point you can turn your attention to your breath or to a sound in the room instead. Those are not lesser options. They are completely equal."
    },
    {
      "id": "med-lib-ease-discomfort-15-s5",
      "name": "Breath anchor with alternative.",
      "secs": 18,
      "say": "Let us begin with the breath, wherever it is easiest to feel. At the nose, or the chest. If even the breath feels like too much, simply listen to the quietest sound you can find."
    },
    {
      "id": "med-lib-ease-discomfort-15-s6",
      "name": "Slow exhale.",
      "secs": 16,
      "say": "Let one breath out slowly now. A long, soft exhale. Let it be a little longer than the breath in."
    },
    {
      "id": "med-lib-ease-discomfort-15-s7",
      "name": "Breath pacing.",
      "secs": 18,
      "say": "Breathe in, gently. And out, slow and long. Nothing forced. Just letting each exhale soften the edges a little."
    },
    {
      "id": "med-lib-ease-discomfort-15-s8",
      "name": "First open silence.",
      "secs": 35,
      "say": "Stay with the breath in your own quiet for a while. I will give you space."
    },
    {
      "id": "med-lib-ease-discomfort-15-s9",
      "name": "Open silence. Hold the quiet.",
      "secs": 60,
      "say": ""
    },
    {
      "id": "med-lib-ease-discomfort-15-s10",
      "name": "Open silence. Hold the quiet.",
      "secs": 50,
      "say": ""
    },
    {
      "id": "med-lib-ease-discomfort-15-s11",
      "name": "Invite optional, kind body awareness.",
      "secs": 22,
      "say": "If you would like to, and only if you would like to, let your attention rest near an area that feels tense or uncomfortable. Not to change it. Just to bring it some gentle, unhurried company. If that does not feel right, stay with the breath instead."
    },
    {
      "id": "med-lib-ease-discomfort-15-s12",
      "name": "Soften the relationship to discomfort.",
      "secs": 22,
      "say": "You do not have to make the discomfort go away. We are not fighting it. We are just letting it be here without bracing against it quite so hard. Sometimes that small softening is its own relief."
    },
    {
      "id": "med-lib-ease-discomfort-15-s13",
      "name": "Breath into the area, opt-out repeated.",
      "secs": 20,
      "say": "If it helps, imagine the breath moving toward that area, like warmth, like a little more room around it. Or keep your attention entirely on the breath or a sound. Both are completely fine."
    },
    {
      "id": "med-lib-ease-discomfort-15-s14",
      "name": "Second, long open silence.",
      "secs": 55,
      "say": "Rest here for a while, in whatever way is gentlest. There is nothing you need to do. I will leave you some quiet."
    },
    {
      "id": "med-lib-ease-discomfort-15-s15",
      "name": "Open silence. Hold the quiet.",
      "secs": 60,
      "say": ""
    },
    {
      "id": "med-lib-ease-discomfort-15-s16",
      "name": "Open silence. Hold the quiet.",
      "secs": 60,
      "say": ""
    },
    {
      "id": "med-lib-ease-discomfort-15-s17",
      "name": "Permission for discomfort to remain.",
      "secs": 20,
      "say": "If the discomfort is still here, that is not a failure. Bodies hold what they hold, especially when they are healing or tired. You have given yours some kindness, and that counts."
    },
    {
      "id": "med-lib-ease-discomfort-15-s18",
      "name": "Reassurance, present tense.",
      "secs": 18,
      "say": "Right now, in this moment, you are doing enough simply by resting. The ground is holding you. You do not have to carry anything else right now."
    },
    {
      "id": "med-lib-ease-discomfort-15-s19",
      "name": "Third open silence.",
      "secs": 60,
      "say": "A longer quiet now, all yours. Let the breath stay slow and easy."
    },
    {
      "id": "med-lib-ease-discomfort-15-s20",
      "name": "Open silence. Hold the quiet.",
      "secs": 60,
      "say": ""
    },
    {
      "id": "med-lib-ease-discomfort-15-s21",
      "name": "Open silence. Hold the quiet.",
      "secs": 44,
      "say": ""
    },
    {
      "id": "med-lib-ease-discomfort-15-s22",
      "name": "Whole-body kindness, optional.",
      "secs": 22,
      "say": "If it feels okay, let a little kindness spread through the whole body, not just the sore places. This body has carried you through so much. It is doing its best. Or simply rest in the breath. Either is right."
    },
    {
      "id": "med-lib-ease-discomfort-15-s23",
      "name": "Fourth open silence.",
      "secs": 50,
      "say": "Stay as long as you like in this quiet. I am here, and there is no hurry."
    },
    {
      "id": "med-lib-ease-discomfort-15-s24",
      "name": "Open silence. Hold the quiet.",
      "secs": 40,
      "say": ""
    },
    {
      "id": "med-lib-ease-discomfort-15-s25",
      "name": "Gentle return.",
      "secs": 16,
      "say": "When you feel ready, begin to come back, slowly and carefully. Let your breath become a touch deeper."
    },
    {
      "id": "med-lib-ease-discomfort-15-s26",
      "name": "Optional, careful movement.",
      "secs": 18,
      "say": "Maybe the smallest movement. A gentle stretch only if it feels good, a wiggle of the fingers, or opening your eyes if they were closed. Move only in ways that feel kind."
    },
    {
      "id": "med-lib-ease-discomfort-15-s27",
      "name": "Notice without demanding change.",
      "secs": 16,
      "say": "Notice how your body feels now, compared to when we started. Maybe softer, maybe the same. Whatever is true is okay."
    },
    {
      "id": "med-lib-ease-discomfort-15-s28",
      "name": "Warm close.",
      "secs": 18,
      "say": "You gave your body gentle company instead of pressure today. That is a real kindness. And if you need care, please reach out for it. Take care of yourself."
    }
  ],
  "disclaimers": [
    "This is a relaxation practice for general wellbeing only. It is not medical advice and is never a substitute for professional medical care, diagnosis, or treatment.",
    "If you feel distressed or your discomfort worsens at any point, you can open your eyes, stop, and leave the practice. You may step away anytime.",
    "Practices like this can sometimes surface difficult physical or emotional feelings, especially during the postpartum period. If pain or distress feels overwhelming or persistent, please contact a doctor, midwife, or qualified professional."
  ]
},
  "med-lib-reset-5": {
  "id": "med-lib-reset-5",
  "minutes": 5,
  "theme": "tiny full reset for an overwhelmed moment",
  "kind": "library",
  "intent": "A very short, five-minute reset for the middle of a busy, overwhelming day. It asks for almost nothing: no stillness, no eyes closed, no attention to the body. The aim is simply to give your nervous system one small, kind pause, so you can return to the day a little more settled than you left it.",
  "items": [
    {
      "id": "med-lib-reset-5-s0",
      "name": "Quick, warm welcome.",
      "secs": 12,
      "say": "Hello, and welcome. This is only a few minutes. You do not have to fix anything. You only have to be here for a moment."
    },
    {
      "id": "med-lib-reset-5-s1",
      "name": "Permission for position. No stillness required.",
      "secs": 13,
      "say": "Stay exactly where you are. Sitting, standing, holding someone, mid-task. You do not need to stop everything for this to help."
    },
    {
      "id": "med-lib-reset-5-s2",
      "name": "Eyes-open offered first.",
      "secs": 13,
      "say": "Your eyes can close, or stay open and soft on one calm spot. Whichever is easier right now."
    },
    {
      "id": "med-lib-reset-5-s3",
      "name": "Orient to the present.",
      "secs": 16,
      "say": "Let us land for a second. You are not in the middle of the whole day right now. You are just here, in this one small moment."
    },
    {
      "id": "med-lib-reset-5-s4",
      "name": "One slow exhale, breath alternative noted.",
      "secs": 17,
      "say": "Let one breath out slowly. A long, easy exhale. If the breath feels like too much, just feel your feet on the floor instead. That counts."
    },
    {
      "id": "med-lib-reset-5-s5",
      "name": "A couple of paced breaths.",
      "secs": 18,
      "say": "Breathe in, gentle. And out, slow and long. Let this one exhale carry off a little of the load."
    },
    {
      "id": "med-lib-reset-5-s6",
      "name": "Short open silence.",
      "secs": 35,
      "say": "Take a few of those in your own quiet. I will be still for a moment."
    },
    {
      "id": "med-lib-reset-5-s7",
      "name": "Open silence. Hold the quiet.",
      "secs": 30,
      "say": ""
    },
    {
      "id": "med-lib-reset-5-s8",
      "name": "Normalize the busy mind.",
      "secs": 18,
      "say": "The day is still there, and the mind may still be busy. That is completely allowed. We are not emptying it, only giving it one soft pause."
    },
    {
      "id": "med-lib-reset-5-s9",
      "name": "Second short silence.",
      "secs": 40,
      "say": "A little more quiet, just for you. Let the breath stay slow and easy."
    },
    {
      "id": "med-lib-reset-5-s10",
      "name": "Open silence. Hold the quiet.",
      "secs": 30,
      "say": ""
    },
    {
      "id": "med-lib-reset-5-s11",
      "name": "Reassurance, present tense.",
      "secs": 16,
      "say": "Right now, in this small moment, there is nothing you have to carry. The ground is holding you. You are okay enough."
    },
    {
      "id": "med-lib-reset-5-s12",
      "name": "Gentle return.",
      "secs": 14,
      "say": "When you are ready, begin to come back. No rush. Let your next breath become a touch deeper."
    },
    {
      "id": "med-lib-reset-5-s13",
      "name": "Optional movement.",
      "secs": 13,
      "say": "Maybe a small movement. Roll your shoulders, or open your eyes if they were closed."
    },
    {
      "id": "med-lib-reset-5-s14",
      "name": "Warm, quick close.",
      "secs": 15,
      "say": "You gave yourself one kind pause in a full day. That is enough. Carry this little bit of quiet back with you. Take care."
    }
  ],
  "disclaimers": [
    "This is a relaxation practice for general wellbeing, not medical, psychological, or therapeutic advice.",
    "If you feel distressed at any point, you can open your eyes, stop, and leave the practice. You may step away anytime.",
    "Practices like this can sometimes surface difficult feelings, especially during the postpartum period. If overwhelm or distress feels persistent, please reach out to a qualified professional or someone you trust."
  ]
},
  "med-lib-body-scan-15": {
  "id": "med-lib-body-scan-15",
  "minutes": 15,
  "theme": "body scan",
  "kind": "library",
  "intent": "Release tension slowly from head to toe.",
  "items": [
    {
      "id": "med-lib-body-scan-15-s0",
      "name": "Arrive",
      "secs": 40,
      "say": "Welcome. There is nothing to get right here. If it feels okay, let your eyes close, or rest your gaze softly toward the floor."
    },
    {
      "id": "med-lib-body-scan-15-s1",
      "name": "Settle",
      "secs": 55,
      "say": "Find a way to sit or lie down that asks nothing of you. Let whatever is underneath take your weight, so you do not have to hold yourself up."
    },
    {
      "id": "med-lib-body-scan-15-s2",
      "name": "First breaths",
      "secs": 60,
      "say": "When you are ready, take one slow breath in, and let it go with a soft sigh. We are in no hurry at all."
    },
    {
      "id": "med-lib-body-scan-15-s3",
      "name": "Resting here",
      "secs": 50,
      "say": "Resting here."
    },
    {
      "id": "med-lib-body-scan-15-s4",
      "name": "Crown and face",
      "secs": 60,
      "say": "If it feels welcome, bring a little gentle attention to the top of the head, and the face. You might let the space between the brows soften. Only if that feels good."
    },
    {
      "id": "med-lib-body-scan-15-s5",
      "name": "Pause",
      "secs": 50,
      "say": "Resting here, with the breath moving on its own."
    },
    {
      "id": "med-lib-body-scan-15-s6",
      "name": "Neck and shoulders",
      "secs": 60,
      "say": "You might notice the neck, and the shoulders. If they would like to drop away from the ears, you can let them. If not, that is fine too."
    },
    {
      "id": "med-lib-body-scan-15-s7",
      "name": "Quiet",
      "secs": 50,
      "say": "Resting here."
    },
    {
      "id": "med-lib-body-scan-15-s8",
      "name": "Arms and hands",
      "secs": 65,
      "say": "Letting attention drift down the arms, to the hands. You might let the hands be open and heavy. Nothing to do, only noticing."
    },
    {
      "id": "med-lib-body-scan-15-s9",
      "name": "Chest and belly",
      "secs": 60,
      "say": "Now the chest, and the belly, rising and falling with the breath all on their own. You might let this whole center soften."
    },
    {
      "id": "med-lib-body-scan-15-s10",
      "name": "Pause",
      "secs": 50,
      "say": "Resting here, held by the quiet."
    },
    {
      "id": "med-lib-body-scan-15-s11",
      "name": "Hips and legs",
      "secs": 65,
      "say": "If it feels right, let the awareness move through the hips, and down the legs. Heavy, supported, at rest."
    },
    {
      "id": "med-lib-body-scan-15-s12",
      "name": "Feet",
      "secs": 50,
      "say": "And all the way to the feet. You might let them feel far away and easy, with nowhere to go."
    },
    {
      "id": "med-lib-body-scan-15-s13",
      "name": "Whole body",
      "secs": 50,
      "say": "Now let go of any one part. Sense the whole body at once, breathing, held, resting."
    },
    {
      "id": "med-lib-body-scan-15-s14",
      "name": "Long rest",
      "secs": 55,
      "say": "Resting here."
    },
    {
      "id": "med-lib-body-scan-15-s15",
      "name": "Return",
      "secs": 45,
      "say": "We will begin to come back now, slowly. Let one breath grow a little fuller, in your own time."
    },
    {
      "id": "med-lib-body-scan-15-s16",
      "name": "Close",
      "secs": 35,
      "say": "When you are ready, and only then, let a small movement return, and let your eyes open. You made this time for yourself, and that matters."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-sleep-winddown-20": {
  "id": "med-lib-sleep-winddown-20",
  "minutes": 20,
  "theme": "sleep wind-down",
  "kind": "library",
  "intent": "Let the body grow heavy and ease toward rest.",
  "items": [
    {
      "id": "med-lib-sleep-winddown-20-s0",
      "name": "Welcome",
      "secs": 45,
      "say": "Welcome. There is nothing left to do tonight. If it feels okay, let your eyes close, and let the day begin to set itself down."
    },
    {
      "id": "med-lib-sleep-winddown-20-s1",
      "name": "Settle",
      "secs": 50,
      "say": "Settle into your bed or wherever you are resting. Let the mattress or the surface beneath you carry your full weight."
    },
    {
      "id": "med-lib-sleep-winddown-20-s2",
      "name": "First breaths",
      "secs": 55,
      "say": "When you are ready, breathe in slowly, and let the breath out a little longer, like a quiet sigh of release."
    },
    {
      "id": "med-lib-sleep-winddown-20-s3",
      "name": "Resting",
      "secs": 55,
      "say": "Resting here."
    },
    {
      "id": "med-lib-sleep-winddown-20-s4",
      "name": "Heaviness begins",
      "secs": 70,
      "say": "You might let the body grow heavy now. There is nothing to hold up, nothing to brace. You can let it all sink down."
    },
    {
      "id": "med-lib-sleep-winddown-20-s5",
      "name": "Legs heavy",
      "secs": 70,
      "say": "Perhaps the legs feel heavy first, sinking softly into the bed. If that feels good, you might let them grow heavier still."
    },
    {
      "id": "med-lib-sleep-winddown-20-s6",
      "name": "Pause",
      "secs": 70,
      "say": "Resting here, sinking gently."
    },
    {
      "id": "med-lib-sleep-winddown-20-s7",
      "name": "Belly and chest",
      "secs": 70,
      "say": "Let the belly and chest soften. The breath can grow slower on its own. You do not have to make it do anything."
    },
    {
      "id": "med-lib-sleep-winddown-20-s8",
      "name": "Quiet",
      "secs": 65,
      "say": "Resting here."
    },
    {
      "id": "med-lib-sleep-winddown-20-s9",
      "name": "Shoulders and arms",
      "secs": 70,
      "say": "The shoulders may melt away from the ears. The arms grow heavy, the hands open and still."
    },
    {
      "id": "med-lib-sleep-winddown-20-s10",
      "name": "Letting the day go",
      "secs": 65,
      "say": "If thoughts of the day arrive, that is fine. You do not have to follow them tonight. You might let them drift past, like clouds in the dark."
    },
    {
      "id": "med-lib-sleep-winddown-20-s11",
      "name": "Long rest",
      "secs": 70,
      "say": "Resting here, in the quiet."
    },
    {
      "id": "med-lib-sleep-winddown-20-s12",
      "name": "Face soft",
      "secs": 60,
      "say": "Let the face soften. The jaw loose, the space between the brows smooth. Even the eyes, heavy and still behind their lids."
    },
    {
      "id": "med-lib-sleep-winddown-20-s13",
      "name": "Deeper quiet",
      "secs": 70,
      "say": "Resting here. There is nowhere to be and nothing to keep watch over."
    },
    {
      "id": "med-lib-sleep-winddown-20-s14",
      "name": "Drift",
      "secs": 70,
      "say": "You might let yourself drift now, wherever sleep would like to take you. You do not need to stay awake for the rest of this."
    },
    {
      "id": "med-lib-sleep-winddown-20-s15",
      "name": "Long silence",
      "secs": 70,
      "say": "Resting here."
    },
    {
      "id": "med-lib-sleep-winddown-20-s16",
      "name": "Soft anchor",
      "secs": 65,
      "say": "Still here, still breathing slow. The body is heavy, the night is quiet, and you can let go a little more."
    },
    {
      "id": "med-lib-sleep-winddown-20-s17",
      "name": "Final quiet",
      "secs": 70,
      "say": "Resting here."
    },
    {
      "id": "med-lib-sleep-winddown-20-s18",
      "name": "Close",
      "secs": 40,
      "say": "There is nothing more to do. Let the breath rock you gently. Sleep well, when it comes. You are exactly where you need to be."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-walking-meditation-10": {
  "id": "med-lib-walking-meditation-10",
  "minutes": 10,
  "theme": "walking meditation",
  "kind": "library",
  "intent": "Bring attention to the feeling of slow steps.",
  "items": [
    {
      "id": "med-lib-walking-meditation-10-s0",
      "name": "Arrive",
      "secs": 35,
      "say": "Welcome. Find a small stretch of ground where you can walk slowly, indoors or out. If standing feels uneasy, you are welcome to do this seated, imagining each step instead."
    },
    {
      "id": "med-lib-walking-meditation-10-s1",
      "name": "Stand",
      "secs": 40,
      "say": "Begin by simply standing still. Let your gaze rest softly a little ahead of you, or down toward the ground. Feel your feet on the floor."
    },
    {
      "id": "med-lib-walking-meditation-10-s2",
      "name": "Pause",
      "secs": 40,
      "say": "Resting here, just standing, breathing."
    },
    {
      "id": "med-lib-walking-meditation-10-s3",
      "name": "First step",
      "secs": 45,
      "say": "When you are ready, lift one foot slowly, and place it down. There is no hurry at all. You might notice the heel, then the sole, then the toes meeting the ground."
    },
    {
      "id": "med-lib-walking-meditation-10-s4",
      "name": "Other foot",
      "secs": 45,
      "say": "And the other foot, just as slowly. Feel the weight shift gently from one side to the other."
    },
    {
      "id": "med-lib-walking-meditation-10-s5",
      "name": "Quiet steps",
      "secs": 50,
      "say": "Resting your attention on the feet. Lifting, moving, placing. Slow and easy."
    },
    {
      "id": "med-lib-walking-meditation-10-s6",
      "name": "Notice sensation",
      "secs": 50,
      "say": "You might notice the texture beneath your feet, the soft press of the ground. Nothing to reach for, only what is already here in each step."
    },
    {
      "id": "med-lib-walking-meditation-10-s7",
      "name": "Pause",
      "secs": 45,
      "say": "If you would like, pause for a breath. Resting here."
    },
    {
      "id": "med-lib-walking-meditation-10-s8",
      "name": "Wandering mind",
      "secs": 50,
      "say": "If the mind has wandered off, that is completely normal. Each time you notice, you can come gently back to the feeling of the next step."
    },
    {
      "id": "med-lib-walking-meditation-10-s9",
      "name": "Continue slowly",
      "secs": 50,
      "say": "Continuing slowly, as if you had all the time in the world. Lifting, moving, placing."
    },
    {
      "id": "med-lib-walking-meditation-10-s10",
      "name": "Whole body walking",
      "secs": 50,
      "say": "You might widen your attention to the whole body moving together, balanced and unhurried, carried by each small step."
    },
    {
      "id": "med-lib-walking-meditation-10-s11",
      "name": "Slow to a stop",
      "secs": 45,
      "say": "Now let your steps slow, and come to a gentle stop. Stand for a moment, feeling both feet on the ground again."
    },
    {
      "id": "med-lib-walking-meditation-10-s12",
      "name": "Close",
      "secs": 55,
      "say": "When you are ready, you can move on at your own pace, carrying a little of this slowness with you. You made time for yourself, and that counts."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-self-compassion-12": {
  "id": "med-lib-self-compassion-12",
  "minutes": 12,
  "theme": "self-compassion",
  "kind": "library",
  "intent": "Offer yourself the kindness you would give a friend.",
  "items": [
    {
      "id": "med-lib-self-compassion-12-s0",
      "name": "Arrive",
      "secs": 35,
      "say": "Welcome. If it feels okay, let your eyes close, or soften your gaze toward the floor. There is nothing here you need to fix or perform."
    },
    {
      "id": "med-lib-self-compassion-12-s1",
      "name": "Settle",
      "secs": 45,
      "say": "Find a comfortable place to settle. You might rest a hand wherever feels kind, perhaps on the heart or the belly, if that feels welcome."
    },
    {
      "id": "med-lib-self-compassion-12-s2",
      "name": "Breath",
      "secs": 50,
      "say": "Take a few slow breaths, letting each one out a little longer. Letting the day land for a moment."
    },
    {
      "id": "med-lib-self-compassion-12-s3",
      "name": "Resting",
      "secs": 45,
      "say": "Resting here."
    },
    {
      "id": "med-lib-self-compassion-12-s4",
      "name": "A hard moment",
      "secs": 55,
      "say": "You might gently bring to mind something that has felt hard lately. Just a touch of it, only as much as feels safe. There is no need to relive anything."
    },
    {
      "id": "med-lib-self-compassion-12-s5",
      "name": "Acknowledge",
      "secs": 55,
      "say": "You might quietly acknowledge, this is a hard moment, or simply, this is hard. Naming it gently, without judging yourself for any of it."
    },
    {
      "id": "med-lib-self-compassion-12-s6",
      "name": "Pause",
      "secs": 45,
      "say": "Resting here, breathing with whatever is present."
    },
    {
      "id": "med-lib-self-compassion-12-s7",
      "name": "Common humanity",
      "secs": 55,
      "say": "You might remember that difficulty is part of being human, and that you are not alone in it. Many people, right now, are meeting something hard, just as you are."
    },
    {
      "id": "med-lib-self-compassion-12-s8",
      "name": "A friend",
      "secs": 60,
      "say": "Imagine, if it feels right, a dear friend in your exact situation. Notice the warmth and kindness you would naturally offer them, without a second thought."
    },
    {
      "id": "med-lib-self-compassion-12-s9",
      "name": "Turn it inward",
      "secs": 60,
      "say": "Now you might offer that same kindness to yourself. Perhaps quietly, may I be gentle with myself. May I give myself what I need."
    },
    {
      "id": "med-lib-self-compassion-12-s10",
      "name": "Quiet",
      "secs": 50,
      "say": "Resting here, letting the kind words settle."
    },
    {
      "id": "med-lib-self-compassion-12-s11",
      "name": "Warmth",
      "secs": 55,
      "say": "You might let a little warmth stay with you, the way it would for someone you love. You are allowed to receive your own care."
    },
    {
      "id": "med-lib-self-compassion-12-s12",
      "name": "Soft rest",
      "secs": 45,
      "say": "Resting here."
    },
    {
      "id": "med-lib-self-compassion-12-s13",
      "name": "Close",
      "secs": 65,
      "say": "When you are ready, let your eyes open, in your own time. You met yourself with kindness today, and that is enough. You are exactly where you need to be."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-breath-counting-7": {
  "id": "med-lib-breath-counting-7",
  "minutes": 7,
  "theme": "breath counting",
  "kind": "library",
  "intent": "Anchor a busy mind by counting breaths.",
  "items": [
    {
      "id": "med-lib-breath-counting-7-s0",
      "name": "Arrive",
      "secs": 30,
      "say": "Welcome. There is nothing to get right here. If it feels okay, let your eyes close, or soften your gaze toward the floor."
    },
    {
      "id": "med-lib-breath-counting-7-s1",
      "name": "Settle",
      "secs": 30,
      "say": "Find a comfortable place to settle, and let the surface beneath you take your weight."
    },
    {
      "id": "med-lib-breath-counting-7-s2",
      "name": "Natural breath",
      "secs": 35,
      "say": "Let your breath move at its own pace. We are not trying to change it, only to keep it gentle company."
    },
    {
      "id": "med-lib-breath-counting-7-s3",
      "name": "Resting",
      "secs": 30,
      "say": "Resting here."
    },
    {
      "id": "med-lib-breath-counting-7-s4",
      "name": "Begin counting",
      "secs": 40,
      "say": "When you are ready, you might silently count each breath out. Breathe in, and on the breath out, count one. The next out-breath, two."
    },
    {
      "id": "med-lib-breath-counting-7-s5",
      "name": "Count to five",
      "secs": 40,
      "say": "Continue softly up to five, then begin again at one. There is no need to rush, and no perfect count."
    },
    {
      "id": "med-lib-breath-counting-7-s6",
      "name": "Quiet practice",
      "secs": 40,
      "say": "Resting here, counting each easy breath out. One, then two, gently up to five, and back to one."
    },
    {
      "id": "med-lib-breath-counting-7-s7",
      "name": "Wandering",
      "secs": 40,
      "say": "If you lose the count, that is completely fine. Minds wander; that is what they do. Simply begin again at one, with no scolding."
    },
    {
      "id": "med-lib-breath-counting-7-s8",
      "name": "Continue",
      "secs": 40,
      "say": "Coming back to the breath, and the counting, with the same patience you would offer a friend."
    },
    {
      "id": "med-lib-breath-counting-7-s9",
      "name": "Let counting go",
      "secs": 35,
      "say": "If you would like, you might let the counting go now, and just rest with the breath as it is."
    },
    {
      "id": "med-lib-breath-counting-7-s10",
      "name": "Rest",
      "secs": 35,
      "say": "Resting here."
    },
    {
      "id": "med-lib-breath-counting-7-s11",
      "name": "Close",
      "secs": 25,
      "say": "When you are ready, let your eyes open. You gave your busy mind a quiet anchor today, and that matters."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-noting-practice-10": {
  "id": "med-lib-noting-practice-10",
  "minutes": 10,
  "theme": "noting",
  "kind": "library",
  "intent": "Gently name what arises in the mind and let it pass.",
  "items": [
    {
      "id": "med-lib-noting-practice-10-s0",
      "name": "Arrive",
      "secs": 24,
      "say": "Welcome. There is nothing to get right here. If it feels okay, let your eyes close, or rest your gaze softly toward the floor."
    },
    {
      "id": "med-lib-noting-practice-10-s1",
      "name": "Settle",
      "secs": 26,
      "say": "Find a way to sit or lie down that asks nothing of you. Let the surface beneath you take your weight."
    },
    {
      "id": "med-lib-noting-practice-10-s2",
      "name": "First breaths",
      "secs": 30,
      "say": "When you are ready, take one slow breath in, and a long, easy breath out. And one more, letting the day land for a moment. At any point, you are welcome to pause, or to open your eyes, if that feels kinder."
    },
    {
      "id": "med-lib-noting-practice-10-s3",
      "name": "Resting here",
      "secs": 38,
      "say": "Resting here, with the breath finding its own rhythm."
    },
    {
      "id": "med-lib-noting-practice-10-s4",
      "name": "Introduce noting",
      "secs": 40,
      "say": "In this practice we will simply notice what comes and goes in the mind, and give it a soft, quiet name. Nothing more is asked. You might call it noting."
    },
    {
      "id": "med-lib-noting-practice-10-s5",
      "name": "How to note",
      "secs": 38,
      "say": "When a thought arrives, you can gently say to yourself, thinking. When a feeling rises, you might say, feeling. There is no need to push anything away or hold onto it."
    },
    {
      "id": "med-lib-noting-practice-10-s6",
      "name": "A gentle name",
      "secs": 34,
      "say": "If a sound draws your attention, you could note, hearing. If a sensation arises, perhaps, sensing. A light touch, then back to the breath."
    },
    {
      "id": "med-lib-noting-practice-10-s7",
      "name": "Try it now",
      "secs": 38,
      "say": "Let us try together. Whatever shows up next, give it one soft word, and let it pass like a cloud moving across an open sky."
    },
    {
      "id": "med-lib-noting-practice-10-s8",
      "name": "Resting here",
      "secs": 46,
      "say": "Resting here. Noticing, naming, letting go."
    },
    {
      "id": "med-lib-noting-practice-10-s9",
      "name": "No wrong notes",
      "secs": 36,
      "say": "If many things arrive at once, that is fine. You do not have to catch them all. Note whatever is loudest, kindly, and return."
    },
    {
      "id": "med-lib-noting-practice-10-s10",
      "name": "Wandering is welcome",
      "secs": 34,
      "say": "If you forget to note for a while and drift off, that is completely normal. The moment you notice is the practice. You might even note, wandering, and smile."
    },
    {
      "id": "med-lib-noting-practice-10-s11",
      "name": "Quiet space",
      "secs": 48,
      "say": "Resting in the quiet now. Letting each thing be named and released, gently."
    },
    {
      "id": "med-lib-noting-practice-10-s12",
      "name": "Loosen the grip",
      "secs": 34,
      "say": "You may begin to notice that a named thing loosens its grip a little, the way a held breath softens when you let it go."
    },
    {
      "id": "med-lib-noting-practice-10-s13",
      "name": "Resting here",
      "secs": 42,
      "say": "Resting here, easy and unhurried."
    },
    {
      "id": "med-lib-noting-practice-10-s14",
      "name": "Begin to return",
      "secs": 28,
      "say": "We will begin to come back now. No rush at all. Let your breath grow just a little fuller."
    },
    {
      "id": "med-lib-noting-practice-10-s15",
      "name": "Reorient",
      "secs": 24,
      "say": "Notice the sounds of the room returning, and the weight of your body where it rests."
    },
    {
      "id": "med-lib-noting-practice-10-s16",
      "name": "Affirmation",
      "secs": 20,
      "say": "You gave the mind a kind place to rest, and that matters. You are exactly where you need to be."
    },
    {
      "id": "med-lib-noting-practice-10-s17",
      "name": "Close",
      "secs": 20,
      "say": "When you are ready, let your eyes open, and carry a little of this quiet with you."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-forgiveness-15": {
  "id": "med-lib-forgiveness-15",
  "minutes": 15,
  "theme": "forgiveness",
  "kind": "library",
  "intent": "Soften a held resentment, toward yourself or another.",
  "items": [
    {
      "id": "med-lib-forgiveness-15-s0",
      "name": "Arrive",
      "secs": 30,
      "say": "Welcome. There is nothing to fix here. If it feels right, let your eyes close, or let your gaze rest softly downward."
    },
    {
      "id": "med-lib-forgiveness-15-s1",
      "name": "Settle",
      "secs": 34,
      "say": "Find a position that feels supported and kind. Let the surface beneath you carry your weight."
    },
    {
      "id": "med-lib-forgiveness-15-s2",
      "name": "First breaths",
      "secs": 38,
      "say": "Take a slow breath in, and a long breath out. And once more, letting a little of the day settle."
    },
    {
      "id": "med-lib-forgiveness-15-s3",
      "name": "Resting here",
      "secs": 58,
      "say": "Resting here, letting the breath move on its own."
    },
    {
      "id": "med-lib-forgiveness-15-s4",
      "name": "Gentle invitation",
      "secs": 46,
      "say": "This is a practice of forgiveness, offered gently and only as far as feels right today. Forgiveness is not forgetting, and it is not saying something was okay. It is simply setting down a weight you have been carrying."
    },
    {
      "id": "med-lib-forgiveness-15-s5",
      "name": "Consent and pace",
      "secs": 42,
      "say": "You are always in charge of the pace. If anything feels like too much, you are welcome to return to the breath, or to open your eyes. Nothing here is required."
    },
    {
      "id": "med-lib-forgiveness-15-s6",
      "name": "Begin with yourself",
      "secs": 48,
      "say": "We will begin with yourself, if that feels available. Bring to mind something small you have been hard on yourself about. Not the heaviest thing, just something tender."
    },
    {
      "id": "med-lib-forgiveness-15-s7",
      "name": "Offer kindness",
      "secs": 46,
      "say": "You might silently offer, I did the best I could with what I had. Where I fell short, I offer myself a little forgiveness, in my own time."
    },
    {
      "id": "med-lib-forgiveness-15-s8",
      "name": "Resting here",
      "secs": 62,
      "say": "Resting here. Letting those words be enough, even if they only land partway."
    },
    {
      "id": "med-lib-forgiveness-15-s9",
      "name": "Toward another",
      "secs": 50,
      "say": "If it feels right, you might bring to mind someone you hold a small resentment toward. Again, not the hardest one. You stay in full control of how close you come."
    },
    {
      "id": "med-lib-forgiveness-15-s10",
      "name": "Soften the edge",
      "secs": 48,
      "say": "Without excusing anything, you might silently say, you are a person who was also struggling. As much as I am able right now, I begin to release my hold on this."
    },
    {
      "id": "med-lib-forgiveness-15-s11",
      "name": "Only as far as it goes",
      "secs": 44,
      "say": "If forgiveness will not come yet, that is completely okay. You can simply note that you are willing, someday, to set this down. Willingness is already a kind of softening."
    },
    {
      "id": "med-lib-forgiveness-15-s12",
      "name": "Quiet space",
      "secs": 68,
      "say": "Resting in the quiet now. Nothing to force. Letting whatever has loosened, loosen."
    },
    {
      "id": "med-lib-forgiveness-15-s13",
      "name": "Return to breath",
      "secs": 50,
      "say": "Let go of the images now, and come back to the simple feeling of the breath, steady and present, here with you."
    },
    {
      "id": "med-lib-forgiveness-15-s14",
      "name": "Resting here",
      "secs": 62,
      "say": "Resting here, held by the quiet."
    },
    {
      "id": "med-lib-forgiveness-15-s15",
      "name": "Self-kindness close",
      "secs": 50,
      "say": "Place a hand wherever feels kind, if you would like. You met something difficult with an open heart today, and that takes quiet courage."
    },
    {
      "id": "med-lib-forgiveness-15-s16",
      "name": "Begin to return",
      "secs": 34,
      "say": "We will begin to return now, slowly. Let your breath grow a little fuller, and let a small movement come back."
    },
    {
      "id": "med-lib-forgiveness-15-s17",
      "name": "Reorient",
      "secs": 30,
      "say": "Notice the room around you, the light, the sounds, the ground beneath you."
    },
    {
      "id": "med-lib-forgiveness-15-s18",
      "name": "Affirmation",
      "secs": 30,
      "say": "Setting down a weight, even a little, is real strength. You are exactly where you need to be."
    },
    {
      "id": "med-lib-forgiveness-15-s19",
      "name": "Close",
      "secs": 30,
      "say": "When you are ready, let your eyes open. Carry this softness gently into the rest of your day."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-stress-release-10": {
  "id": "med-lib-stress-release-10",
  "minutes": 10,
  "theme": "stress release",
  "kind": "library",
  "intent": "Set down the weight of the day.",
  "items": [
    {
      "id": "med-lib-stress-release-10-s0",
      "name": "Arrive",
      "secs": 26,
      "say": "Welcome. You have arrived, and that is enough. If it feels okay, let your eyes close, or soften your gaze toward the floor."
    },
    {
      "id": "med-lib-stress-release-10-s1",
      "name": "Settle",
      "secs": 30,
      "say": "Let yourself be held by whatever is beneath you. You do not have to hold yourself up for these few minutes."
    },
    {
      "id": "med-lib-stress-release-10-s2",
      "name": "Sigh it out",
      "secs": 34,
      "say": "Take a breath in through the nose, and let it go with a soft sigh out through the mouth. And one more, releasing the day on the out-breath. You are always free to pause, or to open your eyes, whenever you wish."
    },
    {
      "id": "med-lib-stress-release-10-s3",
      "name": "Resting here",
      "secs": 42,
      "say": "Resting here, with the breath slowing all on its own."
    },
    {
      "id": "med-lib-stress-release-10-s4",
      "name": "Name the weight",
      "secs": 42,
      "say": "You might picture the day as a heavy bag you have been carrying on one shoulder. There is no need to open it or sort through it. We are only going to set it down for a little while."
    },
    {
      "id": "med-lib-stress-release-10-s5",
      "name": "Longer exhale",
      "secs": 40,
      "say": "Let the breath out grow a little longer than the breath in. With each exhale, imagine setting the bag down, an inch at a time."
    },
    {
      "id": "med-lib-stress-release-10-s6",
      "name": "Soften the body",
      "secs": 40,
      "say": "If it feels good, let your shoulders drop away from your ears. Let your jaw unclench. Let your hands be heavy and open."
    },
    {
      "id": "med-lib-stress-release-10-s7",
      "name": "Resting here",
      "secs": 48,
      "say": "Resting here. Nothing to carry right now."
    },
    {
      "id": "med-lib-stress-release-10-s8",
      "name": "Let it be held",
      "secs": 40,
      "say": "Whatever is waiting for you can wait a few more minutes. It will still be there, and you will meet it with a little more ease."
    },
    {
      "id": "med-lib-stress-release-10-s9",
      "name": "Quiet space",
      "secs": 54,
      "say": "Resting in the quiet. Letting the weight of the day stay on the floor beside you."
    },
    {
      "id": "med-lib-stress-release-10-s10",
      "name": "One steady breath",
      "secs": 36,
      "say": "Come back to one simple breath, steady and unhurried. This breath is enough. It asks nothing of you."
    },
    {
      "id": "med-lib-stress-release-10-s11",
      "name": "Resting here",
      "secs": 40,
      "say": "Resting here, easy and unburdened."
    },
    {
      "id": "med-lib-stress-release-10-s12",
      "name": "Begin to return",
      "secs": 28,
      "say": "We will begin to come back now, slowly. Let your breath grow a little fuller."
    },
    {
      "id": "med-lib-stress-release-10-s13",
      "name": "Reorient",
      "secs": 24,
      "say": "Notice the room returning, the sounds, the light, the ground beneath you."
    },
    {
      "id": "med-lib-stress-release-10-s14",
      "name": "Affirmation",
      "secs": 24,
      "say": "You gave yourself a moment to set things down, and that matters. You are exactly where you need to be."
    },
    {
      "id": "med-lib-stress-release-10-s15",
      "name": "Close",
      "secs": 52,
      "say": "When you are ready, open your eyes. Take your time, and pick up only what you truly need to carry into the rest of your day."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-focus-clarity-8": {
  "id": "med-lib-focus-clarity-8",
  "minutes": 8,
  "theme": "focus and clarity",
  "kind": "library",
  "intent": "Settle a scattered mind before a task.",
  "items": [
    {
      "id": "med-lib-focus-clarity-8-s0",
      "name": "Arrive",
      "secs": 24,
      "say": "Welcome. Take a moment before whatever is next. If it feels okay, let your eyes close, or rest your gaze softly on one still point."
    },
    {
      "id": "med-lib-focus-clarity-8-s1",
      "name": "Settle",
      "secs": 28,
      "say": "Let your feet meet the floor, and your body be supported. There is nowhere you need to rush to in these few minutes. You are welcome to pause, or to open your eyes, at any moment that feels right for you."
    },
    {
      "id": "med-lib-focus-clarity-8-s2",
      "name": "Three breaths",
      "secs": 34,
      "say": "Take three slow breaths. In through the nose, and a long breath out. With each one, let the scattered pieces of the mind drift a little closer to center."
    },
    {
      "id": "med-lib-focus-clarity-8-s3",
      "name": "Resting here",
      "secs": 38,
      "say": "Resting here, letting the breath settle."
    },
    {
      "id": "med-lib-focus-clarity-8-s4",
      "name": "One anchor",
      "secs": 40,
      "say": "A scattered mind is simply a mind with many open doors. We will gently choose one place to rest attention, the feeling of the breath, and let the other doors quietly close for now."
    },
    {
      "id": "med-lib-focus-clarity-8-s5",
      "name": "Follow the breath",
      "secs": 40,
      "say": "Follow the next breath all the way in, and all the way out. You might notice the cool air arriving, and the warmer air leaving."
    },
    {
      "id": "med-lib-focus-clarity-8-s6",
      "name": "Resting here",
      "secs": 44,
      "say": "Resting here, one breath at a time."
    },
    {
      "id": "med-lib-focus-clarity-8-s7",
      "name": "Gather the scattered",
      "secs": 40,
      "say": "If the mind darts toward your task, or your list, that is fine. Note it kindly, and bring it back to this one breath. Each return is a small act of clarity."
    },
    {
      "id": "med-lib-focus-clarity-8-s8",
      "name": "Quiet space",
      "secs": 46,
      "say": "Resting in the quiet. Letting the mind grow still and clear, like water settling."
    },
    {
      "id": "med-lib-focus-clarity-8-s9",
      "name": "Set an intention",
      "secs": 36,
      "say": "If it feels right, you might quietly name what you are about to turn to, and offer yourself one steady wish, may I meet this with a calm and clear mind."
    },
    {
      "id": "med-lib-focus-clarity-8-s10",
      "name": "One steady breath",
      "secs": 34,
      "say": "Come back to one last full breath here, gathered and centered. The mind does not need to be empty, only steady."
    },
    {
      "id": "med-lib-focus-clarity-8-s11",
      "name": "Begin to return",
      "secs": 26,
      "say": "We will begin to come back now. Let your breath grow a little fuller, and let your attention widen to the room."
    },
    {
      "id": "med-lib-focus-clarity-8-s12",
      "name": "Reorient",
      "secs": 22,
      "say": "Notice the space around you, the light, the surface beneath you, ready and present."
    },
    {
      "id": "med-lib-focus-clarity-8-s13",
      "name": "Close",
      "secs": 28,
      "say": "You gathered yourself before beginning, and that is a quiet strength. When you are ready, let your eyes open, and carry this steadiness into what comes next."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-evening-reflection-10": {
  "id": "med-lib-evening-reflection-10",
  "minutes": 10,
  "theme": "evening reflection",
  "kind": "library",
  "intent": "Close the day with a kind backward glance.",
  "items": [
    {
      "id": "med-lib-evening-reflection-10-s0",
      "name": "Arrive",
      "secs": 26,
      "say": "Welcome to the end of the day. If it feels okay, let your eyes close, or rest your gaze somewhere soft and dim."
    },
    {
      "id": "med-lib-evening-reflection-10-s1",
      "name": "Settle",
      "secs": 30,
      "say": "Let yourself be fully held now. The day is nearly done, and there is nothing left to accomplish in these few minutes. If anything feels like too much, you are welcome to pause, or to open your eyes, at any time."
    },
    {
      "id": "med-lib-evening-reflection-10-s2",
      "name": "Soft breaths",
      "secs": 32,
      "say": "Take a slow breath in, and a long breath out. And once more, letting the shoulders soften and the day begin to close."
    },
    {
      "id": "med-lib-evening-reflection-10-s3",
      "name": "Resting here",
      "secs": 42,
      "say": "Resting here, with the breath slow and easy."
    },
    {
      "id": "med-lib-evening-reflection-10-s4",
      "name": "A kind glance back",
      "secs": 44,
      "say": "We will take a gentle look back over the day, the way you might glance kindly at a friend. Not to grade it or fix it, only to notice it with a soft heart."
    },
    {
      "id": "med-lib-evening-reflection-10-s5",
      "name": "One good moment",
      "secs": 44,
      "say": "You might bring to mind one small moment that was good, or even just okay. A cup of tea, a kind word, a breath of fresh air. Let yourself rest on it a moment."
    },
    {
      "id": "med-lib-evening-reflection-10-s6",
      "name": "Resting here",
      "secs": 46,
      "say": "Resting here, holding that small good thing gently."
    },
    {
      "id": "med-lib-evening-reflection-10-s7",
      "name": "Meet the hard parts",
      "secs": 44,
      "say": "If the day held something hard, you might acknowledge it too, without reliving it. You could simply say, that was difficult, and I made it through. You did make it through."
    },
    {
      "id": "med-lib-evening-reflection-10-s8",
      "name": "Set it down",
      "secs": 40,
      "say": "Whatever is unfinished can rest until tomorrow. The day does not need to be tidy to be complete. You are allowed to set it down now."
    },
    {
      "id": "med-lib-evening-reflection-10-s9",
      "name": "Quiet space",
      "secs": 52,
      "say": "Resting in the quiet of the evening. Letting the day grow soft and far away."
    },
    {
      "id": "med-lib-evening-reflection-10-s10",
      "name": "Offer thanks",
      "secs": 40,
      "say": "If it feels right, you might offer one quiet thank you, to the day, to your own steady effort, to your body that carried you through it."
    },
    {
      "id": "med-lib-evening-reflection-10-s11",
      "name": "Resting here",
      "secs": 46,
      "say": "Resting here, peaceful and unhurried."
    },
    {
      "id": "med-lib-evening-reflection-10-s12",
      "name": "Toward rest",
      "secs": 36,
      "say": "Let the breath grow a little slower still, the way it does as sleep draws near. There is nothing more to do tonight."
    },
    {
      "id": "med-lib-evening-reflection-10-s13",
      "name": "Affirmation",
      "secs": 30,
      "say": "You met this whole day, moment by moment, and you are here now, at its kind and quiet close. That is enough. You are enough."
    },
    {
      "id": "med-lib-evening-reflection-10-s14",
      "name": "Close",
      "secs": 48,
      "say": "You can stay here as long as you like, or drift gently toward rest. Whenever you are ready, let this quiet carry you into the night."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-acceptance-12": {
  "id": "med-lib-acceptance-12",
  "minutes": 12,
  "theme": "acceptance",
  "kind": "library",
  "intent": "Allow what is here, without struggling against it.",
  "items": [
    {
      "id": "med-lib-acceptance-12-s0",
      "name": "Arriving",
      "secs": 35,
      "say": "Welcome. There is nothing to get right here. If it feels okay, let your eyes close, or rest a soft gaze toward the floor, and let yourself begin to settle."
    },
    {
      "id": "med-lib-acceptance-12-s1",
      "name": "Settling into support",
      "secs": 40,
      "say": "Find a position that asks nothing of you. Let the surface underneath you take your weight, so you do not have to hold yourself up for these few minutes."
    },
    {
      "id": "med-lib-acceptance-12-s2",
      "name": "First breaths",
      "secs": 45,
      "say": "When you are ready, take one slow breath in through the nose, and let it go with a soft, easy sigh. There is no need to change anything yet — just letting the breath arrive."
    },
    {
      "id": "med-lib-acceptance-12-s3",
      "name": "Resting here",
      "secs": 50,
      "say": "Resting here. Letting the breath move on its own."
    },
    {
      "id": "med-lib-acceptance-12-s4",
      "name": "Noticing what is present",
      "secs": 55,
      "say": "You might gently notice what is already here this moment — a mood, a sensation, the sounds in the room. You do not have to label it or fix it. Just letting it be noticed, as it is."
    },
    {
      "id": "med-lib-acceptance-12-s5",
      "name": "Loosening the struggle",
      "secs": 50,
      "say": "If there is something you have been pushing against, you might let the pushing soften, just a little. Allowing what is here to be here, without needing it to be different right now."
    },
    {
      "id": "med-lib-acceptance-12-s6",
      "name": "Quiet space",
      "secs": 55,
      "say": "Resting here. Nothing to solve."
    },
    {
      "id": "med-lib-acceptance-12-s7",
      "name": "An invitation to allow",
      "secs": 55,
      "say": "If it feels right, you might silently offer the words, this is how it is right now. Not approving, not resigning — simply making a little room for what is already true."
    },
    {
      "id": "med-lib-acceptance-12-s8",
      "name": "Breath as a home base",
      "secs": 45,
      "say": "Whenever the struggle returns, and it may, you can always come back to one breath. This one. Letting the breath be a quiet place to rest."
    },
    {
      "id": "med-lib-acceptance-12-s9",
      "name": "Spacious rest",
      "secs": 60,
      "say": "Resting here, letting things be as they are."
    },
    {
      "id": "med-lib-acceptance-12-s10",
      "name": "Softening toward yourself",
      "secs": 50,
      "say": "Whatever you are meeting today, you might meet it with the same kindness you would offer someone you love. You are allowed to be exactly as you are in this moment."
    },
    {
      "id": "med-lib-acceptance-12-s11",
      "name": "Stillness",
      "secs": 55,
      "say": "Resting here. There is nowhere else to be."
    },
    {
      "id": "med-lib-acceptance-12-s12",
      "name": "Beginning to return",
      "secs": 40,
      "say": "We will begin to come back now, slowly, in your own time. You might let your breath grow just a little fuller, with no rush at all."
    },
    {
      "id": "med-lib-acceptance-12-s13",
      "name": "Gentle reawakening",
      "secs": 40,
      "say": "If it feels good, let a small movement return — your fingers, your toes, a soft stretch wherever your body would like one."
    },
    {
      "id": "med-lib-acceptance-12-s14",
      "name": "Closing",
      "secs": 45,
      "say": "You allowed this time for yourself, and that is enough. Whenever you are ready, let your eyes open, or lift your gaze, and carry a little of this ease with you."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-energy-vitality-8": {
  "id": "med-lib-energy-vitality-8",
  "minutes": 8,
  "theme": "energy and vitality",
  "kind": "library",
  "intent": "A gentle, awakening breath practice to invite easy, natural energy.",
  "items": [
    {
      "id": "med-lib-energy-vitality-8-s0",
      "name": "Arriving upright",
      "secs": 35,
      "say": "Welcome. If it feels right, find a position where you can sit tall and easy, or stand softly. Let your eyes close, or keep a gentle gaze ahead — whatever helps you feel steady."
    },
    {
      "id": "med-lib-energy-vitality-8-s1",
      "name": "Settling",
      "secs": 35,
      "say": "There is nothing to force here. We are simply inviting a little brightness, gently, at whatever pace feels kind to you today."
    },
    {
      "id": "med-lib-energy-vitality-8-s2",
      "name": "Noticing the breath",
      "secs": 40,
      "say": "Begin by noticing the breath that is already here. You do not need to change it yet — just feeling the air moving in, and the air moving out."
    },
    {
      "id": "med-lib-energy-vitality-8-s3",
      "name": "A fuller breath in",
      "secs": 40,
      "say": "When you are ready, you might let one breath in feel a touch fuller, drawing it low into the belly and ribs. And let it go, easily. Only as deep as feels comfortable."
    },
    {
      "id": "med-lib-energy-vitality-8-s4",
      "name": "Resting between",
      "secs": 35,
      "say": "Resting here. Letting the breath settle."
    },
    {
      "id": "med-lib-energy-vitality-8-s5",
      "name": "Inviting freshness",
      "secs": 45,
      "say": "On the next slow breath in, you might imagine drawing in something fresh and light, like cool morning air. And on the breath out, letting go of any heaviness. No effort needed — just a gentle invitation."
    },
    {
      "id": "med-lib-energy-vitality-8-s6",
      "name": "A few easy rounds",
      "secs": 45,
      "say": "Continue at your own pace, if it feels good. A smooth breath in, gathering a little energy, and a soft breath out. There is no need to rush or strain."
    },
    {
      "id": "med-lib-energy-vitality-8-s7",
      "name": "Quiet pause",
      "secs": 40,
      "say": "Resting here. Letting the breath be ordinary again."
    },
    {
      "id": "med-lib-energy-vitality-8-s8",
      "name": "Awakening the body softly",
      "secs": 45,
      "say": "If it feels welcome, you might notice a little aliveness anywhere in the body — perhaps a warmth in the hands, or a gentle steadiness in your seat. If noticing the body is too much today, simply stay with the breath instead."
    },
    {
      "id": "med-lib-energy-vitality-8-s9",
      "name": "Letting energy be easy",
      "secs": 40,
      "say": "There is no particular way you should feel. Whatever energy is here, even quiet energy, is enough. You are allowed to begin again, softly, as often as you need."
    },
    {
      "id": "med-lib-energy-vitality-8-s10",
      "name": "Settling the brightness",
      "secs": 35,
      "say": "Resting here, letting the breath return to its own easy rhythm."
    },
    {
      "id": "med-lib-energy-vitality-8-s11",
      "name": "Beginning to return",
      "secs": 25,
      "say": "We will begin to come back now. You might let your breath be natural and full, with no hurry at all."
    },
    {
      "id": "med-lib-energy-vitality-8-s12",
      "name": "Closing",
      "secs": 20,
      "say": "When you are ready, let your eyes open or lift your gaze, and carry this gentle, easy energy with you into whatever comes next."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-mindful-eating-7": {
  "id": "med-lib-mindful-eating-7",
  "minutes": 7,
  "theme": "mindful eating",
  "kind": "library",
  "intent": "Slow down and truly notice one small bite.",
  "items": [
    {
      "id": "med-lib-mindful-eating-7-s0",
      "name": "Arriving",
      "secs": 30,
      "say": "Welcome. If you have a small bite of food nearby, you might bring it close now. If not, that is perfectly fine — you can simply imagine one, and follow along in your mind."
    },
    {
      "id": "med-lib-mindful-eating-7-s1",
      "name": "Settling",
      "secs": 30,
      "say": "There is nothing to get right here. This is just a few quiet minutes to slow down and notice, with no rush and no rules."
    },
    {
      "id": "med-lib-mindful-eating-7-s2",
      "name": "Looking",
      "secs": 40,
      "say": "If it feels right, take a moment to simply look at this small bite. You might notice its colour, its shape, the way the light falls on it, as if you were seeing it for the first time."
    },
    {
      "id": "med-lib-mindful-eating-7-s3",
      "name": "Resting with it",
      "secs": 30,
      "say": "Resting here. Just being with it, with no hurry to begin."
    },
    {
      "id": "med-lib-mindful-eating-7-s4",
      "name": "Noticing scent",
      "secs": 40,
      "say": "You might gently bring it a little closer and notice any scent. And you may notice whatever arises in you — perhaps a little hunger, or some anticipation. There is no need to judge any of it."
    },
    {
      "id": "med-lib-mindful-eating-7-s5",
      "name": "The first touch",
      "secs": 45,
      "say": "When you are ready, you might place the bite on your tongue, but without chewing yet. Just letting it rest there a moment, noticing the texture, the temperature, whatever is present."
    },
    {
      "id": "med-lib-mindful-eating-7-s6",
      "name": "Slow, attentive bite",
      "secs": 50,
      "say": "Now, if it feels right, begin to chew slowly, paying attention to the taste as it unfolds and changes. There is no need to hurry on to the next bite. Just this one, fully noticed."
    },
    {
      "id": "med-lib-mindful-eating-7-s7",
      "name": "Resting here",
      "secs": 35,
      "say": "Resting here. Letting the taste linger, with nothing else to do."
    },
    {
      "id": "med-lib-mindful-eating-7-s8",
      "name": "Swallowing with awareness",
      "secs": 40,
      "say": "When you are ready, you might swallow gently, and follow the sensation for as long as you can feel it. Noticing, perhaps, a small quiet that follows."
    },
    {
      "id": "med-lib-mindful-eating-7-s9",
      "name": "Gratitude, lightly held",
      "secs": 35,
      "say": "If it feels welcome, you might take a soft moment of thanks — for this bite, for the moment, for giving yourself the time to slow down. Only if that feels right for you."
    },
    {
      "id": "med-lib-mindful-eating-7-s10",
      "name": "Resting in the after",
      "secs": 25,
      "say": "Resting here. Just being with whatever lingers, with nothing else to do."
    },
    {
      "id": "med-lib-mindful-eating-7-s11",
      "name": "Closing",
      "secs": 20,
      "say": "When you are ready, let your attention widen back to the room, and carry a little of this slowness into your next meal, whenever it comes."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
},
  "med-lib-open-awareness-20": {
  "id": "med-lib-open-awareness-20",
  "minutes": 20,
  "theme": "open awareness",
  "kind": "library",
  "intent": "Rest in spacious, choiceless awareness.",
  "items": [
    {
      "id": "med-lib-open-awareness-20-s0",
      "name": "Arriving",
      "secs": 40,
      "say": "Welcome. There is nothing to get right here, and nothing to achieve. If it feels okay, let your eyes close, or rest a soft, downward gaze, and let yourself begin to settle."
    },
    {
      "id": "med-lib-open-awareness-20-s1",
      "name": "Settling into support",
      "secs": 45,
      "say": "Find a position that can hold you comfortably for a while. Let the surface underneath you take your weight, so you can set down the work of holding yourself up."
    },
    {
      "id": "med-lib-open-awareness-20-s2",
      "name": "First breaths",
      "secs": 45,
      "say": "When you are ready, take one slow breath in, and a long, easy breath out, letting the day land for a moment. There is no need to manage the breath beyond this."
    },
    {
      "id": "med-lib-open-awareness-20-s3",
      "name": "Resting on the breath",
      "secs": 60,
      "say": "For a little while, you might let your attention rest gently on the breath, wherever you feel it most easily. When the mind wanders, that is completely fine — just coming back, kindly."
    },
    {
      "id": "med-lib-open-awareness-20-s4",
      "name": "Quiet breath rest",
      "secs": 70,
      "say": "Resting here, with the breath, on its own rhythm."
    },
    {
      "id": "med-lib-open-awareness-20-s5",
      "name": "Opening to sound",
      "secs": 60,
      "say": "Now, if it feels available, you might let the attention widen to include sound. Not searching for anything — just letting whatever sounds are here come and go, near and far, without needing to name them."
    },
    {
      "id": "med-lib-open-awareness-20-s6",
      "name": "Resting in sound",
      "secs": 70,
      "say": "Resting here. Letting sounds arrive and pass, like weather."
    },
    {
      "id": "med-lib-open-awareness-20-s7",
      "name": "Opening to sensation",
      "secs": 60,
      "say": "You might let the field of awareness widen to include the body — the contact with your seat, the air on your skin, small movements of the breath. If attention on the body feels uneasy today, you are welcome to stay with sound or breath instead."
    },
    {
      "id": "med-lib-open-awareness-20-s8",
      "name": "Resting in sensation",
      "secs": 70,
      "say": "Resting here. Nothing to hold, nothing to push away."
    },
    {
      "id": "med-lib-open-awareness-20-s9",
      "name": "Including thought",
      "secs": 60,
      "say": "Now you might let even thoughts be part of the open space. Thoughts can come and go like clouds passing through a wide sky. You do not have to follow them or chase them away — just letting them drift."
    },
    {
      "id": "med-lib-open-awareness-20-s10",
      "name": "Spacious rest",
      "secs": 70,
      "say": "Resting here, in the wide, open quiet."
    },
    {
      "id": "med-lib-open-awareness-20-s11",
      "name": "Choiceless awareness",
      "secs": 65,
      "say": "From here, there is nothing in particular to focus on. You can let awareness be open and choiceless — sounds, sensations, breath, thoughts, all simply arising and passing in the same spacious awareness."
    },
    {
      "id": "med-lib-open-awareness-20-s12",
      "name": "Open rest",
      "secs": 70,
      "say": "Resting here. Letting everything be just as it is."
    },
    {
      "id": "med-lib-open-awareness-20-s13",
      "name": "A soft re-anchor",
      "secs": 60,
      "say": "If the mind has become busy, that is just what minds do. You are still resting underneath it. There is no need to do anything with this quiet — just letting it hold you."
    },
    {
      "id": "med-lib-open-awareness-20-s14",
      "name": "Deep open rest",
      "secs": 70,
      "say": "Resting here, in spacious awareness."
    },
    {
      "id": "med-lib-open-awareness-20-s15",
      "name": "Gentle reassurance",
      "secs": 60,
      "say": "However this time has unfolded — calm or busy, clear or cloudy — it has been exactly right. You are allowed to simply be here, taking up this time and space."
    },
    {
      "id": "med-lib-open-awareness-20-s16",
      "name": "Continuing rest",
      "secs": 70,
      "say": "Resting here, with nothing required of you."
    },
    {
      "id": "med-lib-open-awareness-20-s17",
      "name": "Beginning to return",
      "secs": 45,
      "say": "We will begin to come back now, slowly, in your own time. You might let your breath grow just a little fuller, with no rush at all."
    },
    {
      "id": "med-lib-open-awareness-20-s18",
      "name": "Re-orienting",
      "secs": 50,
      "say": "Notice the sounds of the room returning, the light beyond your eyelids, the weight of your body, the space around you that has held you the whole time."
    },
    {
      "id": "med-lib-open-awareness-20-s19",
      "name": "Closing",
      "secs": 60,
      "say": "You gave yourself this spacious time, and that matters. When you are ready, let your eyes open, or lift your gaze, and carry a little of this openness with you."
    }
  ],
  "disclaimers": [
    "A gentle reminder: this is a calming practice, not medical or psychological treatment. If you feel distressed, please pause and reach out to someone you trust or a professional."
  ]
}
};

const CORE_BY_MIN = {"7": "med-core-7", "15": "med-core-15", "20": "med-core-20", "30": "med-core-30", "45": "med-core-45", "60": "med-core-60"};
export const MEDITATION_LIBRARY = [
  {
    "id": "med-lib-overwhelm-7",
    "minutes": 7,
    "theme": "settling an overwhelmed mind (quick reset)"
  },
  {
    "id": "med-lib-sleep-15",
    "minutes": 15,
    "theme": "sleep wind-down / bedtime release"
  },
  {
    "id": "med-lib-selfcompassion-15",
    "minutes": 15,
    "theme": "self-compassion / kindness to self"
  },
  {
    "id": "med-lib-bodyscan-20",
    "minutes": 20,
    "theme": "Body scan — explicitly opt-in about body focus, trauma-aware. A slow, head-to-toe (or foot-to-head) journey of friendly attention, with a standing breath-and-sound alternative offered throughout for anyone for whom turning toward the body does not feel safe today."
  },
  {"id": "med-lib-morning-gentle-7", "minutes": 7, "theme": "a gentle morning arrival"},
  {"id": "med-lib-anxious-mind-15", "minutes": 15, "theme": "easing an anxious, worried mind"},
  {"id": "med-lib-box-breath-5", "minutes": 5, "theme": "simple paced breathing (box breath)"},
  {"id": "med-lib-gratitude-10", "minutes": 10, "theme": "softly noticing small good things"},
  {"id": "med-lib-grounding-senses-7", "minutes": 7, "theme": "five-senses grounding"},
  {"id": "med-lib-letting-go-15", "minutes": 15, "theme": "releasing tension and what you cannot control"},
  {"id": "med-lib-refocus-5", "minutes": 5, "theme": "quick reset between tasks"},
  {"id": "med-lib-loving-kindness-15", "minutes": 15, "theme": "loving-kindness for self and others"},
  {"id": "med-lib-frustration-ease-10", "minutes": 10, "theme": "softening frustration without judging it"},
  {"id": "med-lib-steady-confidence-7", "minutes": 7, "theme": "quiet self-trust before something hard"},
  {"id": "med-lib-ease-discomfort-15", "minutes": 15, "theme": "gentle awareness for physical discomfort or tension"},
  {"id": "med-lib-reset-5", "minutes": 5, "theme": "tiny full reset for an overwhelmed moment"},
  {"id": "med-lib-body-scan-15", "minutes": 15, "theme": "body scan"},
  {"id": "med-lib-sleep-winddown-20", "minutes": 20, "theme": "sleep wind-down"},
  {"id": "med-lib-walking-meditation-10", "minutes": 10, "theme": "walking meditation"},
  {"id": "med-lib-self-compassion-12", "minutes": 12, "theme": "self-compassion"},
  {"id": "med-lib-breath-counting-7", "minutes": 7, "theme": "breath counting"},
  {"id": "med-lib-noting-practice-10", "minutes": 10, "theme": "noting"},
  {"id": "med-lib-forgiveness-15", "minutes": 15, "theme": "forgiveness"},
  {"id": "med-lib-stress-release-10", "minutes": 10, "theme": "stress release"},
  {"id": "med-lib-focus-clarity-8", "minutes": 8, "theme": "focus and clarity"},
  {"id": "med-lib-evening-reflection-10", "minutes": 10, "theme": "evening reflection"},
  {"id": "med-lib-acceptance-12", "minutes": 12, "theme": "acceptance"},
  {"id": "med-lib-energy-vitality-8", "minutes": 8, "theme": "energy and vitality"},
  {"id": "med-lib-mindful-eating-7", "minutes": 7, "theme": "mindful eating"},
  {"id": "med-lib-open-awareness-20", "minutes": 20, "theme": "open awareness"}
];

export const MEDITATIONS = SCRIPTS;

// Build a player-compatible plan from a meditation script. Items mirror the
// exercise shape (ex.{id,name,why,cues,sided,secs}) so the existing Player runs
// it unchanged; isMeditation tells the player to stay quiet between segments.
function planFromScript(script, durationKey) {
  const items = script.items.map((s) => ({
    ex: { id: s.id, name: s.name, why: s.say, cues: [], sided: false, secs: s.secs },
    secs: s.secs, block: 'meditation',
  }));
  const totalSecs = items.reduce((t, i) => t + i.secs, 0);
  return {
    items, totalSecs, durationKey,
    closeId: items.length ? items[items.length - 1].ex.id : '',
    isMeditation: true, meditationId: script.id, theme: script.theme,
  };
}

// The core practice that scales across all six durations (7/15/20/30/45/60).
export function buildMeditation(durationMins) {
  const id = CORE_BY_MIN[durationMins] || CORE_BY_MIN[Object.keys(CORE_BY_MIN)[0]];
  return planFromScript(SCRIPTS[id], durationMins);
}

// A specific themed-library practice by id.
export function buildMeditationById(medId) {
  const s = SCRIPTS[medId];
  if (!s) return null;
  return planFromScript(s, s.minutes);
}
