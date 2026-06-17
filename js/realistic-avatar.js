// Optional photoreal instructor (beta+). A rigged human character loaded from a
// compressed GLB and driven by the SAME pose intent as the lean avatar, PLUS a
// human "presence" layer: image-based lighting (so skin/hair read as real),
// blinking, eye saccades, idle breathing, a resting micro-smile, and real
// LIP-SYNC that tracks the coach's voice. Mirrors the public API of Avatar
// (avatar.js) so main.js can use either one.
//
// Lip-sync + facial life require viseme/expression MORPH TARGETS on the mesh.
// Ready Player Me avatars ship these (ARKit + Oculus Visemes); Mixamo bodies do
// NOT (no visemes, no jaw bone) — so on a Mixamo model (e.g. the legacy vera.glb)
// the face layer is simply inert and only the body/lighting upgrades apply. Drop
// per-coach GLBs in models/ and map them in COACH_MODELS to light up distinct,
// talking faces — one per coach — with zero code changes.
//
// Key detail: Blender pose-bone rotations are RELATIVE to rest, but Three.js
// bone.quaternion is ABSOLUTE local. So we snapshot each bone's rest quaternion
// at load and compose rest × delta — that makes Blender-calibrated values
// transfer verbatim.
//
// This is opt-in and falls back to the lean avatar on weak devices; budget is
// one skinned mesh, image-based lighting (no shadow maps), clamped pixel ratio.

import * as THREE from '../lib/three.module.min.js';
import { GLTFLoader } from '../lib/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from '../lib/jsm/environments/RoomEnvironment.js';
import { prefersReducedMotion } from './state.js';

const D2R = Math.PI / 180;

// Per-coach realistic faces. Empty until identity-matched GLBs (Ready Player Me
// or a Blender export using ARKit/Oculus morph-target names) are dropped in
// models/. Until then everyone falls back to the legacy body so the app still
// works — the face layer activates automatically the moment a mapped GLB exists.
const COACH_MODELS = {
  // jasmine:  'coach-jasmine.glb',
  // nokeke:   'coach-nokeke.glb',
  // abednego: 'coach-abednego.glb',
  // aguibou:  'coach-aguibou.glb',
};
const FALLBACK_MODEL = 'vera.glb';

function modelFileUrl(file) { return new URL('../models/' + file, import.meta.url).href; }
function modelUrlFor(character) {
  // dev/test override (e.g. window.__AVATAR_MODEL__ = 'models/facecap.glb')
  if (typeof window !== 'undefined' && window.__AVATAR_MODEL__) {
    return new URL('../' + window.__AVATAR_MODEL__, import.meta.url).href;
  }
  return modelFileUrl(COACH_MODELS[character] || FALLBACK_MODEL);
}

// --- device gate + persisted verdict (mirrors the natural-voice approach) ---
const VERDICT_KEY = 'nrjf.ri';   // '' | 'slow'

export function realisticVerdict() {
  try { return localStorage.getItem(VERDICT_KEY) || ''; } catch { return ''; }
}
export function markRealisticSlow() {
  try { localStorage.setItem(VERDICT_KEY, 'slow'); } catch { /* ignore */ }
}
export function clearRealisticVerdict() {
  try { localStorage.removeItem(VERDICT_KEY); } catch { /* ignore */ }
}

// True only when the device looks capable AND has not already proven too slow.
// Cheap, synchronous, conservative — the in-session watchdog catches the rest.
export function realisticInstructorSupported() {
  if (realisticVerdict() === 'slow') return false;
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return false;
  } catch { return false; }
  // very low-end heuristic: few cores AND little memory
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  if (cores <= 2 && mem <= 2) return false;
  return true;
}

// Standing posture: bring arms down from the T-pose, soft elbows, easy head.
// Values are bone-LOCAL Euler degrees relative to rest (calibrated in Blender).
// NOTE: GLTFLoader strips the ':' from Mixamo node names, so 'mixamorig:LeftArm'
// loads as 'mixamorigLeftArm'. Keys here use the sanitized form.
const POSTURE_STAND = {
  'mixamorigLeftArm': [72, 0, 8],
  'mixamorigRightArm': [72, 0, 8],
  'mixamorigLeftForeArm': [10, 0, 12],
  'mixamorigRightForeArm': [10, 0, 12],
  'mixamorigSpine': [-2, 0, 0],
};

// Bones that carry the breathing layer (gentle chest rise on inhale).
const BREATH = {
  'mixamorigSpine1': [-1.0, 0, 0],
  'mixamorigSpine2': [-1.4, 0, 0],
  'mixamorigNeck': [0.7, 0, 0],
};

// Morph-target name candidates per facial action, tried in order. Covers both the
// ARKit naming (Ready Player Me / facecap) and the Oculus Visemes naming, so the
// same engine animates either rig without per-model configuration.
const MORPHS = {
  jaw:    ['jawOpen', 'viseme_aa', 'mouthOpen'],
  wide:   ['viseme_E', 'mouthStretchLeft'],
  round:  ['viseme_O', 'mouthFunnel'],
  pucker: ['viseme_U', 'mouthPucker'],
  smileL: ['mouthSmileLeft', 'mouthSmile_L'],
  smileR: ['mouthSmileRight', 'mouthSmile_R'],
  blinkL: ['eyeBlinkLeft', 'eyesClosedL', 'eyeBlink_L'],
  blinkR: ['eyeBlinkRight', 'eyesClosedR', 'eyeBlink_R'],
  blink:  ['eyesClosed', 'blink'],
};

export class RealisticAvatar {
  constructor(canvas, character) {
    this.canvas = canvas;
    this.character = character;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    // filmic tone mapping + image-based lighting make PBR skin/hair read as real
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.05, 50);
    this.camera.position.set(0, 1.0, 3.4);
    this.camera.lookAt(0, 1.0, 0);

    // Image-based lighting: a neutral studio environment baked once via PMREM gives
    // soft, realistic reflections + ambient on MeshStandardMaterial. Direct lights
    // then add warmth and rim definition on top.
    try {
      this._pmrem = new THREE.PMREMGenerator(this.renderer);
      this._envRT = this._pmrem.fromScene(new RoomEnvironment(), 0.04);
      this.scene.environment = this._envRT.texture;
    } catch { /* IBL is an enhancement; direct lights below still light her */ }

    this.scene.add(new THREE.HemisphereLight(0xeaf6ec, 0x6f8f78, 0.55));
    const sun = new THREE.DirectionalLight(0xfff4d6, 1.05);
    sun.position.set(1.6, 2.8, 2.4);
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight(0xdfe8ff, 0.35);
    fill.position.set(-2.0, 1.2, 1.5);
    this.scene.add(fill);
    // cool rim from behind for a lifelike edge on hair/shoulders
    const rim = new THREE.DirectionalLight(0xbcd0ff, 0.7);
    rim.position.set(-1.2, 2.2, -2.6);
    this.scene.add(rim);

    // soft blob shadow grounds her
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.42, 24),
      new THREE.MeshBasicMaterial({ color: 0x1f4d2e, transparent: true, opacity: 0.16 }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.002;
    this.scene.add(shadow);

    this.pivot = new THREE.Group();      // presentation turntable
    this.pivot.rotation.y = 14 * D2R;
    this.scene.add(this.pivot);

    this.model = null;
    this.skeleton = null;
    this.rest = new Map();               // bone -> rest quaternion
    this.bones = new Map();              // name -> bone
    this.morphs = new Map();             // morph name -> [[mesh, index], ...]
    this._resolved = {};                 // logical action -> resolved morph name | null
    this.faceReady = false;              // any viseme/expression morphs present
    this.ready = false;
    this.mirrored = false;
    this.time = 0;
    this._raf = 0;
    this._last = 0;
    this._running = false;
    this._pendingStart = false;
    this.speed = 1;
    this._modelUrl = '';
    this._framing = 'full';              // 'full' (body, workouts) | 'talk' (waist-up)
    // face animation state
    this._talking = false;
    this._jaw = 0;
    this._blinkPhase = -1;               // -1 idle, >=0 mid-blink (seconds)
    this._blinkClock = 0;
    this._nextBlink = 2 + Math.random() * 3;
    this._gazeX = 0; this._gazeY = 0; this._gazeTarget = [0, 0]; this._gazeClock = 0; this._nextGaze = 1.5;
    // decorative breathing — honor reduced motion (in-app setting wins; OS fallback)
    this._breathe = !prefersReducedMotion();

    this._onVis = () => {
      if (document.hidden) this._pause();
      else if (this._running) this._resume();
    };
    document.addEventListener('visibilitychange', this._onVis);
    this._ro = new ResizeObserver(() => this.resize());
    this._ro.observe(canvas.parentElement || canvas);
    this.resize();

    this._load(modelUrlFor(character));
  }

  _load(url) {
    this._modelUrl = url;
    const loader = new GLTFLoader();
    const finishFail = (err) => {
      console.warn('realistic avatar failed to load:', err);
      this.failed = true;
      if (typeof this.onError === 'function') this.onError(err);
    };
    const onLoaded = (gltf) => {
      const root = gltf.scene;
      this.skeleton = null;
      this.bones.clear();
      this.rest.clear();
      this.morphs.clear();
      this._resolved = {};
      root.traverse((o) => {
        if (o.isMesh) { o.frustumCulled = false; o.castShadow = false; }
        if (o.isSkinnedMesh && o.skeleton) this.skeleton = o.skeleton;
        // collect morph targets (visemes + facial expressions) across every mesh
        if (o.isMesh && o.morphTargetDictionary && o.morphTargetInfluences) {
          for (const [name, idx] of Object.entries(o.morphTargetDictionary)) {
            if (!this.morphs.has(name)) this.morphs.set(name, []);
            this.morphs.get(name).push([o, idx]);
          }
        }
      });
      // collect bones + rest snapshot
      root.traverse((o) => {
        if (o.isBone) {
          this.bones.set(o.name, o);
          this.rest.set(o.name, o.quaternion.clone());
        }
      });
      this.faceReady = this._resolve('jaw') != null; // can we drive a mouth?
      // ground her: feet at y=0, centered; scale to a friendly height.
      this.pivot.add(root);
      this.model = root;
      root.updateMatrixWorld(true);
      let box = new THREE.Box3().setFromObject(root);
      let size = new THREE.Vector3(); box.getSize(size);
      const targetH = 1.7;
      const s = size.y > 0 ? targetH / size.y : 1;
      root.scale.multiplyScalar(s);
      root.updateMatrixWorld(true);
      box = new THREE.Box3().setFromObject(root);
      const center = new THREE.Vector3(); box.getCenter(center);
      root.position.x -= center.x;
      root.position.z -= center.z;
      root.position.y -= box.min.y;
      root.updateMatrixWorld(true);
      this.ready = true;
      this.failed = false;
      this._applyPosture(POSTURE_STAND);
      this._frameCamera();
      this._renderOnce();
      if (this._pendingStart) this._resume();
    };
    loader.load(url, onLoaded, undefined, (err) => {
      // a missing per-coach GLB falls back to the shared body so the app never breaks
      const fb = modelFileUrl(FALLBACK_MODEL);
      if (url !== fb) { this._modelUrl = fb; loader.load(fb, onLoaded, undefined, finishFail); return; }
      finishFail(err);
    });
  }

  // swap the model in place (e.g. on coach change once per-coach GLBs exist)
  _swapModel(url) {
    if (this.model) {
      this.pivot.remove(this.model);
      this.model.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) { const m = Array.isArray(o.material) ? o.material : [o.material]; m.forEach((x) => { if (x.map) x.map.dispose(); x.dispose(); }); }
      });
      this.model = null;
    }
    this.ready = false;
    this._load(url);
  }

  // resolve the first present morph name for a logical action; cache the result
  _resolve(key) {
    if (key in this._resolved) return this._resolved[key];
    const names = MORPHS[key] || [];
    const found = names.find((n) => this.morphs.has(n)) || null;
    this._resolved[key] = found;
    return found;
  }
  _setMorph(key, v) {
    const name = this._resolve(key);
    if (!name) return false;
    const arr = this.morphs.get(name);
    for (const [m, i] of arr) m.morphTargetInfluences[i] = v;
    return true;
  }
  _setBlinkValue(v) {
    // prefer per-eye morphs; fall back to a combined eyesClosed/blink
    if (!this._setMorph('blinkL', v)) this._setMorph('blink', v);
    this._setMorph('blinkR', v);
  }

  _frameCamera() {
    if (!this.model) return;
    this.model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(this.model);
    const h = box.max.y - box.min.y;
    const fov = this.camera.fov * D2R;
    if (this._framing === 'talk') {
      // waist-up portrait for talking screens (lessons/meditation/check-in): aim
      // at the upper chest/face and frame roughly the top third of the body.
      const aimY = box.min.y + h * 0.80;
      const portion = 0.34;
      const dist = (h * portion) / Math.tan(fov / 2);
      this.camera.position.set(0, aimY, dist + 0.1);
      this.camera.lookAt(0, aimY, 0);
    } else {
      // full body for workouts; aim at mid-torso
      const midY = box.min.y + h * 0.56;
      const dist = (h * 0.62) / Math.tan(fov / 2);
      this.camera.position.set(0, midY, dist);
      this.camera.lookAt(0, midY, 0);
    }
    this.camera.updateProjectionMatrix();
  }

  // compose rest × delta(euler degrees) onto a bone
  _setBone(name, deg, extraDeg) {
    const bone = this.bones.get(name);
    const rest = this.rest.get(name);
    if (!bone || !rest) return;
    const e = new THREE.Euler(deg[0] * D2R, deg[1] * D2R, deg[2] * D2R, 'XYZ');
    const q = rest.clone().multiply(new THREE.Quaternion().setFromEuler(e));
    if (extraDeg) {
      const e2 = new THREE.Euler(extraDeg[0] * D2R, extraDeg[1] * D2R, extraDeg[2] * D2R, 'XYZ');
      q.multiply(new THREE.Quaternion().setFromEuler(e2));
    }
    bone.quaternion.copy(q);
  }

  _applyPosture(posture) {
    if (!this.ready) return;
    for (const [name, deg] of Object.entries(posture)) this._setBone(name, deg);
  }

  // ---- public API (mirrors Avatar) ----
  setCharacter(character) {
    if (character === this.character) return;
    this.character = character;
    const url = modelUrlFor(character);
    if (this.ready && url !== this._modelUrl) this._swapModel(url);
  }

  setPose(/* def */) {
    // v3.0: standing demo posture for every move (per-exercise motion: v3.1).
    this.time = 0;
  }

  setMirrored(m) { this.mirrored = m; if (this.pivot) this.pivot.scale.x = m ? -1 : 1; }

  // Drive the mouth while the coach is speaking. Safe no-op on rigs without
  // visemes (e.g. a Mixamo body), so it can be wired unconditionally.
  setTalking(on) {
    this._talking = !!on;
    if (this._talking && this.ready && !this._raf && this._running) this._resume();
  }

  // 'talk' = waist-up portrait (lessons/meditation); 'full' = whole body (workouts)
  setFraming(mode) {
    const next = (mode === 'talk') ? 'talk' : 'full';
    if (next === this._framing) return;
    this._framing = next;
    if (this.ready) { this._frameCamera(); this._renderOnce(); }
  }

  resize() {
    const el = this.canvas.parentElement || this.canvas;
    const w = Math.max(el.clientWidth, 60);
    const h = Math.max(el.clientHeight, 60);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this._renderOnce();
  }

  start() { this._running = true; if (this.ready) this._resume(); else this._pendingStart = true; }
  stop() { this._running = false; this._pause(); }

  _pause() { cancelAnimationFrame(this._raf); this._raf = 0; this._last = 0; }

  _resume() {
    if (this._raf || !this.ready) return;
    const loop = (ts) => {
      this._raf = requestAnimationFrame(loop);
      const dt = this._last ? Math.min((ts - this._last) / 1000, 0.1) : 0.016;
      this._last = ts;
      this._tick(dt);
    };
    this._raf = requestAnimationFrame(loop);
  }

  _tick(dt) {
    this.time += dt * this.speed;
    if (this._breathe) {
      const breath = Math.sin(this.time * (Math.PI * 2) / 3.8);
      for (const [name, amp] of Object.entries(BREATH)) {
        const base = POSTURE_STAND[name] || [0, 0, 0];
        this._setBone(name, base, [amp[0] * breath, amp[1] * breath, amp[2] * breath]);
      }
      // very soft weight-shift sway
      this.pivot.rotation.y = (14 + 1.4 * Math.sin(this.time * (Math.PI * 2) / 7.5)) * D2R;
    }
    if (this.faceReady) this._animateFace(dt);
    this.renderer.render(this.scene, this.camera);
  }

  // Blink, gaze, resting micro-smile, and speech-driven lip-sync. All gated on the
  // presence of the relevant morphs, so any subset present still works.
  _animateFace(dt) {
    // --- lip-sync: organic jaw envelope while talking, eased to closed otherwise ---
    let open = 0;
    if (this._talking) {
      const t = this.time;
      const syllable = 0.5 + 0.5 * Math.sin(t * 11.0);       // ~1.7 syllables/sec
      const micro = 0.6 + 0.4 * Math.sin(t * 23.7 + 1.3);    // sub-mouth motion
      open = Math.max(0, syllable * micro) * 0.7;
    }
    this._jaw += (open - this._jaw) * Math.min(1, dt * 16);
    this._setMorph('jaw', this._jaw);
    if (this._talking) {
      const ph = (Math.sin(this.time * 3.1) + 1) / 2;        // slow vowel shaping
      this._setMorph('round', this._jaw * 0.55 * ph);
      this._setMorph('wide', this._jaw * 0.45 * (1 - ph));
      this._setMorph('pucker', this._jaw * 0.2 * ph);
    } else {
      this._setMorph('round', 0); this._setMorph('wide', 0); this._setMorph('pucker', 0);
    }

    // --- resting micro-smile so she never looks blank ---
    const smile = this._talking ? 0.08 : 0.14;
    this._setMorph('smileL', smile); this._setMorph('smileR', smile);

    if (!this._breathe) { this._setBlinkValue(0); return; } // reduced motion: still + calm

    // --- blink ---
    this._blinkClock += dt;
    if (this._blinkPhase < 0 && this._blinkClock >= this._nextBlink) this._blinkPhase = 0;
    if (this._blinkPhase >= 0) {
      this._blinkPhase += dt;
      const dur = 0.13;
      const p = this._blinkPhase / dur;
      const v = p < 0.5 ? p / 0.5 : Math.max(0, 1 - (p - 0.5) / 0.5);
      this._setBlinkValue(Math.max(0, Math.min(1, v)));
      if (this._blinkPhase >= dur) {
        this._blinkPhase = -1; this._blinkClock = 0;
        this._nextBlink = 2.2 + Math.random() * 3.8;
        this._setBlinkValue(0);
      }
    }

    // --- eye saccades via slight head turn (subtle "alive" look) ---
    this._gazeClock += dt;
    if (this._gazeClock >= this._nextGaze) {
      this._gazeTarget = [(Math.random() - 0.5) * 2.4, (Math.random() - 0.5) * 1.2];
      this._gazeClock = 0; this._nextGaze = 1.2 + Math.random() * 2.6;
    }
    this._gazeX += (this._gazeTarget[0] - this._gazeX) * Math.min(1, dt * 6);
    this._gazeY += (this._gazeTarget[1] - this._gazeY) * Math.min(1, dt * 6);
    const head = this.bones.get('mixamorigHead') || this.bones.get('Head');
    const rest = head && this.rest.get(head.name);
    if (head && rest) {
      const e = new THREE.Euler(this._gazeY * D2R, this._gazeX * D2R, 0, 'XYZ');
      head.quaternion.copy(rest.clone().multiply(new THREE.Quaternion().setFromEuler(e)));
    }
  }

  _renderOnce() { if (this.renderer && this.scene && this.ready) this.renderer.render(this.scene, this.camera); }

  // Sample sustained fps once she is loaded AND warmed up, then — only if the
  // device is genuinely, steadily slow — persist a 'slow' verdict so the NEXT
  // session quietly uses the lean coach. We deliberately do NOT hot-swap her
  // out mid-session: that is jarring, and the first seconds after load are full
  // of one-off jank (decode, shader compile) that must not count. A backgrounded
  // tab (throttled rAF) is ignored so it cannot trigger a false 'slow'.
  watchPerformance(onSlow, { warmupMs = 2200, seconds = 5, minFps = 22 } = {}) {
    const run = () => {
      if (!this.ready) { setTimeout(run, 200); return; }
      let start = 0, frames = 0, aborted = false;
      const tick = (ts) => {
        if (!this._running || aborted) return;
        if (document.hidden) { aborted = true; return; } // throttled — do not judge
        if (!start) start = ts;
        frames++;
        const el = ts - start;
        if (el >= seconds * 1000) {
          const fps = frames / (el / 1000);
          if (fps < minFps) { markRealisticSlow(); if (typeof onSlow === 'function') onSlow(fps); }
          return;
        }
        requestAnimationFrame(tick);
      };
      setTimeout(() => { if (this._running) requestAnimationFrame(tick); }, warmupMs);
    };
    run();
  }

  showPose(/* def, phase */) { this._applyPosture(POSTURE_STAND); this._renderOnce(); }

  dispose() {
    this.stop();
    document.removeEventListener('visibilitychange', this._onVis);
    this._ro.disconnect();
    if (this.model) {
      this.model.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          for (const m of mats) { if (m.map) m.map.dispose(); m.dispose(); }
        }
      });
    }
    try { if (this._envRT) this._envRT.dispose(); if (this._pmrem) this._pmrem.dispose(); } catch { /* ok */ }
    this.scene.environment = null;
    this.renderer.dispose();
  }
}
