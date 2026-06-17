// On-device speech-to-text controller for the journal — the same opt-in, gated
// discipline as the lifelike voice (js/natural-voice.js). It is a pure enhancement:
// when it works, a voice note's words appear in the book; when it cannot (old/slow
// device, Data Saver, offline, blocked CDN), the user simply types or edits the text
// themselves (the book is always editable). The heavy model runs in a Web Worker so it
// never janks the UI, and a persisted speed verdict means a device that proved too slow
// is not asked to pay the cost again. NEVER uses the off-device Web Speech API.

const VERDICT_KEY = 'nrjf.stt';   // persisted: 'ready' | 'slow'
const MODEL_TAG = 'whisper-tiny.en';
const MAX_RATIO = 3.0;            // transcribe slower than 3x the clip length → treat as too slow

function readVerdict() {
  try { const v = JSON.parse(localStorage.getItem(VERDICT_KEY)); return v && v.model === MODEL_TAG ? v.verdict : null; } catch { return null; }
}
function writeVerdict(verdict) {
  try { localStorage.setItem(VERDICT_KEY, JSON.stringify({ model: MODEL_TAG, verdict })); } catch { /* ok */ }
}

// Decode a recorded Blob to 16 kHz mono Float32 (what Whisper expects). Done on the
// main thread (fast); only the inference is shipped to the worker.
async function blobToPcm16k(blob) {
  const AC = (typeof AudioContext !== 'undefined') ? AudioContext : (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : null);
  if (!AC || typeof OfflineAudioContext === 'undefined') throw new Error('no audio decode');
  const arr = await blob.arrayBuffer();
  const ac = new AC();
  let decoded;
  try { decoded = await ac.decodeAudioData(arr); } finally { try { ac.close(); } catch { /* ok */ } }
  const frames = Math.max(1, Math.ceil(decoded.duration * 16000));
  const offline = new OfflineAudioContext(1, frames, 16000);
  const src = offline.createBufferSource();
  src.buffer = decoded;
  src.connect(offline.destination);
  src.start();
  const rendered = await offline.startRendering();
  return rendered.getChannelData(0);
}

export const speechToText = {
  state: 'off',       // off | loading | ready | slow | failed
  _worker: null,
  _ready: null,       // Promise<boolean> while loading

  get available() { return this.state === 'ready'; },

  // Honors Data Saver / very slow networks and a prior "slow" verdict, exactly like the
  // lifelike voice. reprobe:true forces a fresh measurement on an explicit user request.
  enable({ reprobe = false } = {}) {
    if (this.state === 'ready') return Promise.resolve(true);
    if (this._ready) return this._ready;
    if (typeof Worker === 'undefined') { this.state = 'failed'; return Promise.resolve(false); }
    const conn = (typeof navigator !== 'undefined' && navigator.connection) || {};
    if (conn.saveData || /2g$/.test(conn.effectiveType || '')) { this.state = 'slow'; return Promise.resolve(false); }
    if (!reprobe && readVerdict() === 'slow') { this.state = 'slow'; return Promise.resolve(false); }

    this.state = 'loading';
    this._ready = new Promise((resolve) => {
      let worker;
      try {
        worker = new Worker(new URL('./stt-worker.js', import.meta.url), { type: 'module' });
      } catch (e) {
        console.warn('STT worker unavailable:', e);
        this.state = 'failed'; this._ready = null; resolve(false); return;
      }
      const onMsg = (e) => {
        const m = e.data || {};
        if (m.type === 'loaded') {
          worker.removeEventListener('message', onMsg);
          this._worker = worker;
          this.state = 'ready';
          resolve(true);
        } else if (m.type === 'error') {
          worker.removeEventListener('message', onMsg);
          try { worker.terminate(); } catch { /* ok */ }
          console.warn('STT load failed, staying on manual text:', m.error);
          this.state = 'failed'; this._ready = null;
          resolve(false);
        }
      };
      worker.addEventListener('message', onMsg);
      worker.postMessage({ type: 'load' });
    });
    return this._ready;
  },

  // Transcribe one recorded Blob to text. Resolves '' on any failure (caller keeps the
  // recording and lets the user type the text). Records a one-time "slow" verdict if the
  // device is far slower than realtime, so it stops trying automatically.
  async transcribe(blob) {
    if (!blob) return '';
    const ok = await this.enable();
    if (!ok || !this._worker) return '';
    let audio;
    try { audio = await blobToPcm16k(blob); } catch (e) { console.warn('STT decode failed:', e); return ''; }
    const clipSec = audio.length / 16000;
    const t0 = (typeof performance !== 'undefined') ? performance.now() : 0;
    const text = await new Promise((resolve) => {
      const onMsg = (e) => {
        const m = e.data || {};
        if (m.type === 'result') { this._worker.removeEventListener('message', onMsg); resolve(m.text || ''); }
        else if (m.type === 'error') { this._worker.removeEventListener('message', onMsg); resolve(''); }
      };
      this._worker.addEventListener('message', onMsg);
      try { this._worker.postMessage({ type: 'transcribe', audio }, [audio.buffer]); }
      catch { this._worker.removeEventListener('message', onMsg); resolve(''); }
    });
    if (t0 && clipSec > 0) {
      const ratio = ((performance.now() - t0) / 1000) / clipSec;
      if (ratio > MAX_RATIO) writeVerdict('slow'); else writeVerdict('ready');
    }
    return text;
  },
};
