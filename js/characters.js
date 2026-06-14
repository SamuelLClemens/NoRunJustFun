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

export const CHARACTERS = [
  { id: 'jasmine', name: 'Jasmine', skin: '#C68A5E', hair: '#2B1D14', hairStyle: 'loose',
    facialHair: 'none', facialHairColor: 'none', build: 'lean',
    top: '#F1ECE0', bottom: '#3C5C57', blurb: 'Bloom at your own pace — one easy breath at a time.' },
  { id: 'nokeke', name: 'Nokeke', skin: '#6E4226', hair: '#1C140E', hairStyle: 'curls',
    facialHair: 'none', facialHairColor: 'none', build: 'athletic',
    top: '#D9A23B', bottom: '#2F3A33', blurb: 'Your strength is a gift — honor it, one kind rep at a time.' },
  { id: 'abednego', name: 'Abednego', skin: '#8A5A3A', hair: '#2E211A', hairStyle: 'bun',
    facialHair: 'stubble', facialHairColor: '#3A2C22', build: 'slim',
    top: '#E0703A', bottom: '#3A3A44', blurb: 'You come out stronger than you went in.' },
  { id: 'aguibou', name: 'Aguibou', skin: '#4A2E1E', hair: '#3A332E', hairStyle: 'short',
    facialHair: 'beard', facialHairColor: '#6B645C', build: 'broad',
    top: '#33417A', bottom: '#B07A3C', blurb: 'No rush — we build this one patient breath at a time.' },
];

export function getCharacter(id) {
  return CHARACTERS.find((c) => c.id === id) || CHARACTERS[0];
}
