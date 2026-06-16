// The four coach presets. A diverse, playful cast — each coach's look, build,
// and energy is derived from the meaning and origin of their name.
//   Jasmine  — calm, blossoming flow (the jasmine flower): lean, loose dark hair,
//              off-white bloom over vine-green, breath-first restorative coach.
//   Nokeke   — warm-but-firm motivator (an Igbo-evocative "cherished gift"):
//              athletic, natural coils, amber-gold over grounded forest-green.
//   Abednego — forged-resilience spark (Daniel 3, unburned in the furnace):
//              slim/wiry, top-knot + stubble, ember-coral over furnace-slate.
//   Aguibou  — patient precision (a West African Fula/Toucouleur name): broad,
//              short greying crop + beard, Fula indigo over Sahel ochre.
// Appearance is fully data-driven: hex colors + hairStyle + build + facialHair,
// all consumed by js/avatar.js. Heritage is a design suggestion, not a fixed fact.
//
// VOICE (added in the audio pass): each coach has a DISTINCT voice so the four feel
// like four different people. `voice` carries two layers, used by js/tts.js:
//   - natural / naturalSpeed: the on-device Kokoro voice embedding + its pacing — the
//     warm, human-like path (js/natural-voice.js). Two female + two male, chosen to be
//     clearly distinct (American af_/am_ vs British bm_), each matched to the persona.
//   - system / pitch / rate: the Web-Speech fallback. `system` is an ordered list of
//     voice-name fragments to prefer (best-effort across macOS/iOS/Windows/Android);
//     pitch+rate differ per coach so they still sound distinct even when the device
//     offers only one usable system voice. gender is a last-resort hint.
// Pacing/pitch also encode personality: Jasmine + Aguibou speak slower and calmer;
// Nokeke is even and warm; Abednego is a touch quicker and brighter.

export const CHARACTERS = [
  { id: 'jasmine', name: 'Jasmine', skin: '#C68A5E', hair: '#2B1D14', hairStyle: 'loose',
    facialHair: 'none', facialHairColor: 'none', build: 'lean',
    top: '#F1ECE0', bottom: '#3C5C57', blurb: 'Bloom at your own pace — one easy breath at a time.',
    voice: { natural: 'af_heart', naturalSpeed: 0.92, gender: 'female',
      system: ['Samantha', 'Allison', 'Ava', 'Serena', 'Joana', 'Karen', 'female'], pitch: 1.06, rate: 0.95 } },
  { id: 'nokeke', name: 'Nokeke', skin: '#6E4226', hair: '#1C140E', hairStyle: 'curls',
    facialHair: 'none', facialHairColor: 'none', build: 'athletic',
    top: '#D9A23B', bottom: '#2F3A33', blurb: 'Your strength is a gift — honor it, one kind rep at a time.',
    voice: { natural: 'af_bella', naturalSpeed: 1.0, gender: 'female',
      system: ['Victoria', 'Moira', 'Tessa', 'Karen', 'Zira', 'female'], pitch: 1.0, rate: 1.0 } },
  { id: 'abednego', name: 'Abednego', skin: '#8A5A3A', hair: '#2E211A', hairStyle: 'bun',
    facialHair: 'stubble', facialHairColor: '#3A2C22', build: 'slim',
    top: '#E0703A', bottom: '#3A3A44', blurb: 'You come out stronger than you went in.',
    voice: { natural: 'am_puck', naturalSpeed: 1.05, gender: 'male',
      system: ['Aaron', 'Tom', 'Reed', 'Rishi', 'David', 'male'], pitch: 0.98, rate: 1.04 } },
  { id: 'aguibou', name: 'Aguibou', skin: '#4A2E1E', hair: '#3A332E', hairStyle: 'short',
    facialHair: 'beard', facialHairColor: '#6B645C', build: 'broad',
    top: '#33417A', bottom: '#B07A3C', blurb: 'No rush — we build this one patient breath at a time.',
    voice: { natural: 'bm_george', naturalSpeed: 0.9, gender: 'male',
      system: ['Daniel', 'Arthur', 'Oliver', 'Albert', 'George', 'male'], pitch: 0.86, rate: 0.92 } },
];

export function getCharacter(id) {
  return CHARACTERS.find((c) => c.id === id) || CHARACTERS[0];
}
