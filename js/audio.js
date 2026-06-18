// All sound is generated with the Web Audio API — zero audio assets,
// zero licensing risk. The context unlocks on first user gesture (iOS rule).

let ctx = null;
let musicNodes = null;
let musicGain = null;
let sfxVolume = 0.7;   // 0..1 user-controllable chime/sfx volume (see sound.setVolume)

function ensureCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// Shared with the natural voice so the whole app uses ONE AudioContext —
// it unlocks on the same user gesture (sound.unlock) and iOS caps how many
// contexts a page may hold.
export function sharedAudioContext() {
  return ensureCtx();
}

function pluck(freq, time, dur, gain, type = 'sine') {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  // scale every chime by the user's chime-volume setting (exponential ramps need >0)
  const peak = Math.max(0.0001, gain * sfxVolume);
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(peak, time + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  o.connect(g).connect(ctx.destination);
  o.start(time);
  o.stop(time + dur + 0.05);
}

export const sound = {
  sfxOn: true,
  volume: 0.7,

  // Set the chime/sfx volume (0..1). Persisted in profile.sfxVol and applied at boot.
  setVolume(v) {
    const n = Math.max(0, Math.min(1, Number(v)));
    this.volume = sfxVolume = Number.isFinite(n) ? n : 0.7;
  },

  unlock() { ensureCtx(); },

  // Soft single chime — move transitions.
  chime() {
    if (!this.sfxOn || !ensureCtx()) return;
    const t = ctx.currentTime;
    pluck(660, t, 1.2, 0.12);
    pluck(990, t, 1.0, 0.05);
  },

  // Cheerful rising arpeggio — session complete / level up.
  fanfare() {
    if (!this.sfxOn || !ensureCtx()) return;
    const t = ctx.currentTime;
    [523, 659, 784, 1047].forEach((f, i) => {
      pluck(f, t + i * 0.13, 1.4, 0.14, 'triangle');
      pluck(f * 2, t + i * 0.13, 0.8, 0.04);
    });
  },

  // Sparkle — badge earned.
  sparkle() {
    if (!this.sfxOn || !ensureCtx()) return;
    const t = ctx.currentTime;
    [1319, 1760, 2093].forEach((f, i) => pluck(f, t + i * 0.09, 0.7, 0.07));
  },

  // Gentle tick at halfway / side switch.
  tick() {
    if (!this.sfxOn || !ensureCtx()) return;
    pluck(880, ctx.currentTime, 0.5, 0.08);
  },

  // The "Happy Birthday" melody (public domain since 2016), played as soft warm bells for
  // the birthday party. Plays regardless of the sfx on/off toggle (a birthday should always
  // sing) but still honours the user's sfx volume.
  birthdaySong() {
    if (!ensureCtx()) return;
    const t0 = ctx.currentTime + 0.2;
    const G4 = 392, A4 = 440, B4 = 493.88, C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99;
    const beat = 0.42;   // seconds per beat
    // [freq, startBeat, beats] — the classic dotted-rhythm tune in C
    const mel = [
      [G4, 0, 0.75], [G4, 0.75, 0.25], [A4, 1, 1], [G4, 2, 1], [C5, 3, 1], [B4, 4, 2],
      [G4, 6, 0.75], [G4, 6.75, 0.25], [A4, 7, 1], [G4, 8, 1], [D5, 9, 1], [C5, 10, 2],
      [G4, 12, 0.75], [G4, 12.75, 0.25], [G5, 13, 1], [E5, 14, 1], [C5, 15, 1], [B4, 16, 1], [A4, 17, 2],
      [F5, 18, 0.75], [F5, 18.75, 0.25], [E5, 19, 1], [C5, 20, 1], [D5, 21, 1], [C5, 22, 2.5],
    ];
    for (const [f, b, dur] of mel) {
      const t = t0 + b * beat;
      pluck(f, t, dur * beat * 0.95, 0.16, 'triangle');
      pluck(f * 2, t, dur * beat * 0.55, 0.035);
    }
  },
};

// ---- generative ambient music in the spirit of Sigur Rós: a low drone beneath lush,
// airy major pads and a high shimmer, washed through a long feedback delay (reverb), with
// the lowpass slowly breathing. Very slow chord drift, very quiet, user-controllable. ----

// Lush, ethereal voicings [drone, root, third, fifth, shimmer] in Hz.
const CHORDS = [
  [98.00, 196.00, 246.94, 392.00, 493.88],   // G major — open and airy
  [73.42, 146.83, 220.00, 293.66, 440.00],   // D
  [82.41, 164.81, 246.94, 329.63, 493.88],   // E minor wash
  [87.31, 174.61, 261.63, 349.23, 523.25],   // C / F colour
];

export const music = {
  on: false,
  volume: 0.5,

  start() {
    if (!ensureCtx() || musicNodes) return;
    const t = ctx.currentTime;
    musicGain = ctx.createGain();
    musicGain.gain.value = 0;
    musicGain.connect(ctx.destination);

    // soft lowpass (breathes via a slow LFO) feeding a feedback-delay reverb wash
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 1100; filter.Q.value = 0.25;
    filter.connect(musicGain);
    const delay = ctx.createDelay(1.0); delay.delayTime.value = 0.36;
    const fb = ctx.createGain(); fb.gain.value = 0.46;
    const wet = ctx.createGain(); wet.gain.value = 0.4;
    filter.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(musicGain);

    // five voices: a low drone, three pads, and a high shimmer (gently detuned = chorus)
    const oscs = [];
    const gains = [0.10, 0.085, 0.075, 0.06, 0.035];
    for (let v = 0; v < 5; v++) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = v === 4 ? 'triangle' : 'sine';
      o.detune.value = (v - 2) * 3;
      g.gain.value = gains[v];
      o.connect(g).connect(filter);
      o.start();
      oscs.push(o);
    }
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.045; lfoGain.gain.value = 300;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    let step = 0;
    const scheduleChord = () => {
      if (!musicNodes) return;
      const chord = CHORDS[step % CHORDS.length];
      const now = ctx.currentTime;
      oscs.forEach((o, i) => {
        o.frequency.cancelScheduledValues(now);
        o.frequency.setTargetAtTime(chord[i], now, 4.0);   // slow morph between chords
      });
      step++;
      musicNodes.timer = setTimeout(scheduleChord, 15000);  // long, drifting changes
    };
    musicNodes = { oscs, lfo, filter, delay, timer: 0 };
    scheduleChord();
    musicGain.gain.setTargetAtTime(0.15 * this.volume, t, 3.0);   // slow fade-in
    this.on = true;
  },

  stop() {
    if (!musicNodes) { this.on = false; return; }
    const nodes = musicNodes;
    musicNodes = null;
    this.on = false;
    clearTimeout(nodes.timer);
    if (musicGain) musicGain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.6);
    setTimeout(() => {
      nodes.oscs.forEach((o) => { try { o.stop(); } catch { /* already stopped */ } });
      try { nodes.lfo.stop(); } catch { /* already stopped */ }
    }, 1800);
  },

  setVolume(v) {
    this.volume = v;
    if (musicNodes && musicGain) musicGain.gain.setTargetAtTime(0.15 * v, ctx.currentTime, 0.4);
  },
};
