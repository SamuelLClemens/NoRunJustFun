// Off-main-thread speech-to-text for the journal. Runs in a MODULE Web Worker so the
// (CPU-heavy) Whisper inference never janks the UI. The model + library are fetched
// once from a public CDN — exactly like the Kokoro voice — and nothing the user
// recorded is ever sent anywhere; transcription happens entirely on this device.
//
// Protocol (postMessage): {type:'load'} -> {type:'loaded'} | {type:'error'};
// {type:'transcribe', audio:Float32Array(16kHz mono)} -> {type:'result', text} | {type:'error'}.

const TRANSFORMERS_ESM = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2';
const MODEL_ID = 'onnx-community/whisper-tiny.en';

let transcriber = null;

self.onmessage = async (e) => {
  const msg = e.data || {};
  if (msg.type === 'load') {
    try {
      const mod = await import(TRANSFORMERS_ESM);
      if (mod.env) { mod.env.allowLocalModels = false; }
      transcriber = await mod.pipeline('automatic-speech-recognition', MODEL_ID, { dtype: 'q8' });
      self.postMessage({ type: 'loaded' });
    } catch (err) {
      self.postMessage({ type: 'error', error: String(err && err.message || err) });
    }
    return;
  }
  if (msg.type === 'transcribe') {
    if (!transcriber) { self.postMessage({ type: 'error', error: 'not loaded' }); return; }
    try {
      const out = await transcriber(msg.audio);
      const text = (out && (Array.isArray(out) ? out[0] && out[0].text : out.text)) || '';
      self.postMessage({ type: 'result', text: String(text).trim() });
    } catch (err) {
      self.postMessage({ type: 'error', error: String(err && err.message || err) });
    }
  }
};
