// Coach voice via the Web Speech API. Handles Safari/iOS quirks:
// async voice loading, long-utterance cutoffs (sentence chunking),
// and Chrome's pause-after-15s bug (periodic resume).
// An optional in-browser natural voice (see natural-voice.js) takes over
// when the user has enabled it and its model is loaded; any failure there
// falls straight back to the system voice mid-sentence.

import { naturalVoice } from './natural-voice.js';

const synth = ('speechSynthesis' in window) ? window.speechSynthesis : null;

let voices = [];
let resumeTimer = 0;

function refreshVoices() {
  if (!synth) return;
  const all = synth.getVoices() || [];
  // Prefer English voices; fall back to whatever exists.
  let en = all.filter((v) => /^en/i.test(v.lang));
  if (!en.length) en = all;
  // Privacy: prefer on-device voices — network voices send spoken text
  // (including the user's name) to the browser vendor. Only fall back to
  // network voices when the device offers no local ones.
  const local = en.filter((v) => v.localService);
  voices = local.length ? local : en;
}

if (synth) {
  refreshVoices();
  synth.addEventListener?.('voiceschanged', refreshVoices);
  // Safari sometimes only populates after a tick
  setTimeout(refreshVoices, 250);
  setTimeout(refreshVoices, 1500);
}

export const coach = {
  voiceURI: '',
  rate: 1.0,
  enabled: true,
  naturalOn: false,          // user opt-in; engages only once the model is ready
  onCaption: null,           // (text) => void — captions always render, even muted
  onSpeechStart: null,       // () => void — fires when audible speech begins (avatar lip-sync)
  onSpeechEnd: null,         // () => void — fires when audible speech ends/cancels (close the mouth)
  voice: null,               // the active coach's voice config (see characters.js)
  _sgen: 0,                  // bumped by cancel() so in-flight speech stops cleanly
  transcript: [],            // durable per-session log of every narrated line. The live
                             // #caption is transient, so this backs the workout done
                             // screen's "Read what your coach said" — a permanent record
                             // for Deaf/HoH users. Reset at session start (resetTranscript).

  // Clear the session transcript. Called when a new session starts (see sessionScreen)
  // so each session's "Read what your coach said" begins fresh.
  resetTranscript() { this.transcript = []; },

  listVoices() {
    refreshVoices();
    return voices.map((v) => ({ uri: v.voiceURI, name: v.name, lang: v.lang, default: v.default }));
  },

  // Give the coach a personality voice. Called when a session/lesson starts and on
  // coach change, so each of the four coaches sounds like a distinct person — on the
  // natural (Kokoro) path via a distinct embedding, and on the system path via a
  // preferred voice + per-coach pitch/rate. Pass a character from characters.js.
  setCharacterVoice(char) {
    this.voice = (char && char.voice) || null;
  },

  // Choose the system (Web Speech) voice for the current coach. An explicit user pick
  // in Settings wins (voiceURI); otherwise match the coach's preferred voice names,
  // best-effort across platforms; else the first available English voice.
  _pickSystemVoice() {
    if (this.voiceURI) {
      const exact = voices.find((v) => v.voiceURI === this.voiceURI);
      if (exact) return exact;
    }
    const prefs = ((this.voice && this.voice.system) || []).map((s) => s.toLowerCase());
    for (const frag of prefs) {
      const v = voices.find((vc) => (vc.name || '').toLowerCase().includes(frag));
      if (v) return v;
    }
    return voices[0] || null;
  },

  supported: !!synth,

  cancel() {
    this._sgen += 1;
    naturalVoice.cancel();
    if (synth) synth.cancel();
    clearInterval(resumeTimer);
    this._endSpeech();
  },

  _startSpeech() { if (this.onSpeechStart) { try { this.onSpeechStart(); } catch { /* lip-sync is best-effort */ } } },
  _endSpeech() { if (this.onSpeechEnd) { try { this.onSpeechEnd(); } catch { /* lip-sync is best-effort */ } } },

  // Mouth-openness target (0..1) for the avatar, or null when there is no
  // authoritative audio to track. The natural (Kokoro) voice plays through Web
  // Audio, so we return its live amplitude and the mouth tracks the real speech
  // (word-aligned, fluid). The system voice gives no audio access, so we return
  // null and the avatar falls back to an organic talking motion.
  getMouthLevel() {
    if (this.naturalOn && naturalVoice.available) return naturalVoice.getLevel();
    return null;
  },

  // Speak text (string or array of strings). Captions render even when audio is
  // off (accessibility). When audio plays, the caption advances sentence-by-sentence
  // in sync with playback. Resolves when finished or cancelled.
  speak(text, { interrupt = false } = {}) {
    const parts = (Array.isArray(text) ? text : [text]).filter(Boolean);
    if (!parts.length) return Promise.resolve();
    const fullCaption = parts.join(' ');

    // Durable transcript: record every narrated line here — before the audio-on/off
    // split below — so muted sessions are captured too. One push per speak() call (the
    // natural→system fallback is internal to this call, so it cannot double-record).
    this.transcript.push(fullCaption);

    // Chunk by sentence: iOS Safari can truncate long utterances, the natural voice
    // keeps latency low by generating one sentence at a time, and captions advance
    // one sentence at a time in sync with the audio.
    const chunks = [];
    for (const p of parts) {
      const sentences = p.match(/[^.!?]+[.!?]*/g) || [p];
      for (const s of sentences) {
        const t = s.trim();
        if (t) chunks.push(t);
      }
    }

    // Audio off: show the whole line at once so muted/Deaf users still read it, then stop.
    if (!this.enabled) {
      if (this.onCaption) this.onCaption(fullCaption);
      return Promise.resolve();
    }
    if (interrupt) this.cancel();

    // Caption tracks the spoken sentence: onChunk fires as each sentence's audio
    // begins (web path via u.onstart, natural path just before playback). Paint the
    // first line eagerly ONLY for an interrupting call, whose audio starts now — a
    // QUEUED call (e.g. the timed mid-move cues, which do not interrupt) must wait for
    // onChunk, or its caption would run ahead of the audio still playing. `played`
    // counts sentences whose audio actually began, so a natural-voice failure resumes
    // on the system voice from the unspoken tail instead of repeating spoken lines.
    let played = 0;
    const onChunk = (t) => { played += 1; if (this.onCaption) this.onCaption(t); };
    if (interrupt && this.onCaption) this.onCaption(chunks[0] || fullCaption);

    // Lip-sync hook: the avatar's mouth moves only while audio actually plays.
    // Fire start now (audio begins) and end once the whole line finishes/cancels.
    this._startSpeech();
    const endSpeech = () => this._endSpeech();

    // Two cancellation counters on purpose: naturalVoice._gen stops queued
    // and playing audio inside the voice module; coach._sgen stops THIS
    // method's fallback from speaking a line the user already cancelled.
    if (this.naturalOn && naturalVoice.available) {
      const gen = this._sgen;
      const cv = this.voice || {};
      return naturalVoice.speak(chunks, { voice: cv.natural, speed: cv.naturalSpeed, onChunk }).catch(() => {
        // generation broke — retire the natural voice for this visit and let the
        // system voice handle the REST of the line (skip sentences already spoken)
        naturalVoice.retire();
        if (gen === this._sgen) return this._webSpeak(chunks.slice(played), onChunk);
      }).finally(endSpeech);
    }

    return this._webSpeak(chunks, onChunk).finally(endSpeech);
  },

  _webSpeak(chunks, onChunk = null) {
    if (!synth || !chunks.length) return Promise.resolve();
    const voice = this._pickSystemVoice();
    const cv = this.voice || {};
    // per-coach prosody: combine the global rate with the coach's relative rate, and
    // use the coach's pitch so the four sound distinct even on one shared system voice.
    const rate = this.rate * (cv.rate || 1);
    const pitch = cv.pitch || 1.05;
    return new Promise((resolve) => {
      let i = 0;
      const next = () => {
        if (i >= chunks.length) { clearInterval(resumeTimer); resolve(); return; }
        const line = chunks[i++];
        const u = new SpeechSynthesisUtterance(line);
        if (voice) u.voice = voice;
        u.rate = rate;
        u.pitch = pitch;
        u.onstart = () => { if (onChunk) onChunk(line); };
        u.onend = next;
        u.onerror = next;
        synth.speak(u);
      };
      // Chrome desktop pauses long speech; nudge it along.
      clearInterval(resumeTimer);
      resumeTimer = setInterval(() => { if (synth.paused) synth.resume(); }, 5000);
      next();
    });
  },
};

// Replace tokens: '{name}' only ever appears as ', {name}' per content spec.
export function personalize(line, name, move = '') {
  let out = line;
  if (out.includes('{name}')) {
    out = name ? out.replaceAll('{name}', name) : out.replaceAll(', {name}', '');
  }
  if (move) out = out.replaceAll('{move}', move);
  return out;
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
