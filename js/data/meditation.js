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
  }
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
