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
  jasmine:  'coach-jasmine.glb',
  nokeke:   'coach-nokeke.glb',
  abednego: 'coach-abednego.glb',
  aguibou:  'coach-aguibou.glb',
};
// The shared "host" — a realistic, rigged human with full ARKit visemes (built
// free in Blender/MPFB). Used for the check-in greeter and as the fallback for
// any coach that does not yet have an identity-matched GLB. Replaces the legacy
// viseme-less Mixamo body (vera.glb) so the talking face is live by default.
const FALLBACK_MODEL = 'coach-host.glb';

function modelFileUrl(file) { return new URL('../models/' + file, import.meta.url).href; }
function modelUrlFor(character) {
  // dev/test override (e.g. window.__AVATAR_MODEL__ = 'models/facecap.glb')
  if (typeof window !== 'undefined' && window.__AVATAR_MODEL__) {
    return new URL('../' + window.__AVATAR_MODEL__, import.meta.url).href;
  }
  // `character` may be the id string OR the full character object — COACH_MODELS is keyed
  // by id, so normalize first. (Passing the object made every lookup miss and silently
  // fall back to the host, so the four distinct coach GLBs never loaded.)
  const id = (character && typeof character === 'object') ? character.id : character;
  return modelFileUrl(COACH_MODELS[id] || FALLBACK_MODEL);
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

// Logical bone → candidate names across the rigs we ship: TalkingHead/Mixamo
// ('LeftArm', 'Spine2', 'Head'), the namespaced Mixamo form ('mixamorigLeftArm'), and
// MPFB/MakeHuman ('upperarm01L', 'spine03', 'head'). The coach GLBs are MPFB-rigged and
// the host is Mixamo-rigged, so the animation layer MUST resolve through this map — the
// old hard-coded Mixamo names silently no-op'd on the coaches, leaving their arms stuck
// in the exported pose. First name that exists on the loaded skeleton wins.
const RIG = {
  lArm:  ['LeftArm', 'mixamorigLeftArm', 'upperarm01L'],
  rArm:  ['RightArm', 'mixamorigRightArm', 'upperarm01R'],
  lFore: ['LeftForeArm', 'mixamorigLeftForeArm', 'lowerarm01L'],
  rFore: ['RightForeArm', 'mixamorigRightForeArm', 'lowerarm01R'],
  lHand: ['LeftHand', 'mixamorigLeftHand', 'wristL'],
  rHand: ['RightHand', 'mixamorigRightHand', 'wristR'],
  chest: ['Spine2', 'mixamorigSpine2', 'spine03', 'Spine1', 'spine02', 'Spine', 'spine01'],
  head:  ['Head', 'mixamorigHead', 'head'],
  // --- joints used by the exercise choreography (POSES, see js/data/poses.js).
  // Same logical names as the rig-spec so the pose player resolves either rig. ---
  spine:     ['Spine', 'mixamorigSpine', 'spine01', 'spine02'],
  neck:      ['Neck', 'mixamorigNeck', 'neck01', 'neck02', 'neck03'],
  shoulderL: ['LeftArm', 'mixamorigLeftArm', 'upperarm01L'],
  shoulderR: ['RightArm', 'mixamorigRightArm', 'upperarm01R'],
  elbowL:    ['LeftForeArm', 'mixamorigLeftForeArm', 'lowerarm01L'],
  elbowR:    ['RightForeArm', 'mixamorigRightForeArm', 'lowerarm01R'],
  hipL:      ['LeftUpLeg', 'mixamorigLeftUpLeg', 'upperleg01L'],
  hipR:      ['RightUpLeg', 'mixamorigRightUpLeg', 'upperleg01R'],
  kneeL:     ['LeftLeg', 'mixamorigLeftLeg', 'lowerleg01L'],
  kneeR:     ['RightLeg', 'mixamorigRightLeg', 'lowerleg01R'],
  ankleL:    ['LeftFoot', 'mixamorigLeftFoot', 'foot01L', 'footL', 'foot.L'],
  ankleR:    ['RightFoot', 'mixamorigRightFoot', 'foot01R', 'footR', 'foot.R'],
};

// Every logical joint the pose player drives. Order matters only for readability;
// Three.js propagates the hierarchy at render. Two pelvis spines (spine/chest) +
// neck/head + the four limbs.
const MANAGED_JOINTS = [
  'spine', 'chest', 'neck', 'head',
  'shoulderL', 'shoulderR', 'elbowL', 'elbowR',
  'hipL', 'hipR', 'kneeL', 'kneeR', 'ankleL', 'ankleR',
];
const ZERO3 = [0, 0, 0];

// Base postures supply the joints a keyframe omits (rig-spec §"Base positions").
// v1 of the GLB pose player renders STANDING choreography only — floor/seated moves
// are routed to standing analogs by poseForExercise() in poses.js — so only 'stand'
// is needed here. A standing keyframe lists every joint that differs from rest, so
// the stand base contributes no extra joints (arms already rest aimed-down).
const BASES = { stand: { joints: {} } };

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

// Free ALL GPU resources of a loaded model: geometry + EVERY texture slot (not
// just .map) + materials. renderer.dispose() frees shader programs, not per-mesh
// geometry/texture memory, so on a mobile PWA that builds a fresh avatar per
// session this prevents a compounding GPU-memory leak.
const TEX_SLOTS = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'emissiveMap', 'aoMap', 'bumpMap', 'displacementMap', 'alphaMap', 'clearcoatMap', 'clearcoatRoughnessMap', 'clearcoatNormalMap', 'lightMap', 'envMap', 'specularMap'];
function disposeModel(root) {
  if (!root) return;
  root.traverse((o) => {
    if (o.geometry && o.geometry.dispose) o.geometry.dispose();
    if (o.material) {
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (!m) continue;
        for (const k of TEX_SLOTS) { const t = m[k]; if (t && t.dispose) t.dispose(); }
        m.dispose();
      }
    }
  });
}

// A soft radial blob (dark centre → transparent rim) used as the ground contact shadow.
// Built on a canvas so the edge is a smooth gradient rather than a hard polygon disc.
function makeBlobShadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  grd.addColorStop(0, 'rgba(20,40,28,0.85)');
  grd.addColorStop(0.55, 'rgba(20,40,28,0.45)');
  grd.addColorStop(1, 'rgba(20,40,28,0)');
  g.fillStyle = grd;
  g.beginPath(); g.arc(64, 64, 62, 0, Math.PI * 2); g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

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
      const roomEnv = new RoomEnvironment();
      // One small, bright soft-box high and a touch camera-side, baked INTO the
      // environment, so wet corneas (and glossy hair/skin) catch a real specular
      // highlight — the single cheapest cue that reads as "alive". toneMapped:false
      // keeps it bright through the PMREM bake.
      const catchlight = new THREE.Mesh(
        new THREE.SphereGeometry(0.34, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
      );
      catchlight.material.toneMapped = false;
      catchlight.position.set(0.7, 2.3, 1.8);
      roomEnv.add(catchlight);
      this._envRT = this._pmrem.fromScene(roomEnv, 0.04);
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

    // soft radial contact shadow grounds her — a gradient alpha (dark centre fading to
    // transparent) reads as a soft-edged cast shadow, not a hard disc.
    this._shadowTex = makeBlobShadowTexture();
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.0, 1.0),
      new THREE.MeshBasicMaterial({ map: this._shadowTex, transparent: true, opacity: 0.55, depthWrite: false }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.002;
    shadow.renderOrder = -1;
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
    this._disposed = false;              // set in dispose(); neutralizes late async callbacks
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
    this._levelProvider = null;          // () => 0..1 live audio loudness | null
    this._jaw = 0;
    this._blinkPhase = -1;               // -1 idle, >=0 mid-blink (seconds)
    this._blinkClock = 0;
    this._nextBlink = 2 + Math.random() * 3;
    this._gazeX = 0; this._gazeY = 0; this._gazeTarget = [0, 0]; this._gazeClock = 0; this._nextGaze = 1.5;
    // gesture layer — eased intensity so she shifts fluidly between calm presence
    // (idle) and animated explaining (talking); _emphasis pulses with live speech.
    this._gestureGain = 0; this._emphasis = 0; this._headNod = 0; this._headTilt = 0;
    // exercise pose player — drives the keyframed move choreography (POSES) so the
    // coach performs each exercise for the user to mirror. See setPose/_applyMovePose.
    this._pose = null;               // active pose def (a POSES entry) | null
    this._poseT = 0;                 // pose phase clock (separate from this.time)
    this._poseBlend = 0;             // 0..1 master weight: eases the whole body into a move and back to rest
    this._poseActive = false;        // true while a move is being performed (full framing)
    this._wasMoving = false;         // edge-detect leaving a pose to restore rest once
    this._restBasis = new Map();     // joint key -> { B, Binv } rest orientation in model frame
    this._basePos = null;            // grounded model position (feet at floor) to pose from
    this._restFootY = null;          // lowest foot world-y at rest, for per-frame re-grounding
    // reusable scratch objects so the per-frame pose loop allocates nothing (no GC hitch)
    this._sEuler = new THREE.Euler(0, 0, 0, 'XYZ');
    this._sQuatR = new THREE.Quaternion();
    this._sQuatRl = new THREE.Quaternion();
    this._sQuatPosed = new THREE.Quaternion();
    this._sVec = new THREE.Vector3();
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
      if (this._disposed) return;        // teardown already happened — do not spawn a fallback
      console.warn('realistic avatar failed to load:', err);
      this.failed = true;
      if (typeof this.onError === 'function') this.onError(err);
    };
    const onLoaded = (gltf) => {
      if (this._disposed) { disposeModel(gltf.scene); return; } // late GLB after teardown — free it
      const root = gltf.scene;
      this.skeleton = null;
      this.bones.clear();
      this.rest.clear();
      this.morphs.clear();
      this._resolved = {};
      this._rig = {};
      root.traverse((o) => {
        if (o.isMesh) {
          o.frustumCulled = false; o.castShadow = false;
          // MPFB/MakeHuman glTF exports flag EVERY material as alpha-BLEND + double-sided,
          // which washes the model out, breaks depth sorting, and — because the old code
          // cut every blended mesh at alphaTest 0.5 — punched holes in skin AND clothing
          // (read as "skin showing through"). Classify each mesh and make skin + clothing
          // fully OPAQUE, bias clothing toward the camera, and draw clothing last so it is
          // ALWAYS on top of the skin. Hair/lash cards keep the cutout that fixed flicker.
          const nm = o.name || '';
          // Names cover BOTH the MPFB coaches (base body = the un-suffixed collection name,
          // low-poly, cargo_pants, tank_keyhole…) AND Ready Player Me (Wolf3D_Body/Head/Teeth,
          // EyeLeft/Right, Wolf3D_Outfit_*, Wolf3D_Hair/Beard).
          const hairy    = /hair|ponytail|afro|beard|brow|lash|short0|loose|fro/i.test(nm);
          const lashBrow = hairy && /lash|brow/i.test(nm);
          const hairProper = hairy && !lashBrow;
          const isCloth  = !hairy && /cargo|pant|tank|keyhole|polo|shirt|suit|top|^bra|short(?!0)|outfit|bottom|footwear|glasses/i.test(nm);
          // Everything that is neither cloth nor hair is treated as BODY SKIN — including the
          // un-suffixed base body mesh (e.g. "Coach_jasmine"), which matches no skin keyword.
          // The old code routed that mesh to a DoubleSide alpha-0.5 cutout, which drew the
          // eye-socket back-faces as dark hollow eyes and cut edges; making it opaque +
          // single-sided fixes both. (The hidden low-poly proxy is harmless either way.)
          const mats = Array.isArray(o.material) ? o.material : (o.material ? [o.material] : []);
          for (const m of mats) {
            if (!m) continue;
            if (hairProper) {
              // hair: opaque cutout (no transparency sort → no flicker) but a LOW threshold so
              // the soft scalp/hairline strands are kept, not cut away (the bald look at 0.2).
              m.alphaTest = 0.05; m.transparent = false; m.depthWrite = true;
            } else if (lashBrow) {
              // lashes/brows: crisp cutout AND single-sided, so the card back-faces do not
              // splay out around the eyes as dark "wings".
              m.alphaTest = 0.4; m.transparent = false; m.depthWrite = true; m.side = THREE.FrontSide;
            } else if (isCloth) {
              // clothing: fully opaque + a polygon-offset bias toward the camera so it wins the
              // depth tie against coincident skin even under motion. Keep the exported DoubleSide
              // so open shells (keyhole neck, armholes, cargo cuffs) do not vanish.
              m.alphaTest = 0; m.alphaMap = null; m.transparent = false;
              m.depthWrite = true; m.depthTest = true;
              m.polygonOffset = true; m.polygonOffsetFactor = -1; m.polygonOffsetUnits = -1;
            } else {
              // body skin (incl. the base body, teeth, tongue, eyes): fully opaque, never a
              // cutout, SINGLE-SIDED so no inside-out socket/back-faces show through.
              m.alphaTest = 0; m.alphaMap = null; m.transparent = false;
              m.depthWrite = true; m.depthTest = true; m.side = THREE.FrontSide;
            }
            m.needsUpdate = true;
          }
          o.userData.isCloth = isCloth;
          o.userData.isHair = hairProper || lashBrow;
          o.userData.isSkin = !isCloth && !o.userData.isHair;
        }
        if (o.isSkinnedMesh && o.skeleton) this.skeleton = o.skeleton;
        // collect morph targets (visemes + facial expressions) across every mesh
        if (o.isMesh && o.morphTargetDictionary && o.morphTargetInfluences) {
          for (const [name, idx] of Object.entries(o.morphTargetDictionary)) {
            if (!this.morphs.has(name)) this.morphs.set(name, []);
            this.morphs.get(name).push([o, idx]);
          }
        }
      });
      // draw order: skin first, hair/face-cards between, clothing last so it is always
      // ON TOP of the skin. Safe now that every mesh is opaque — this only breaks exact
      // depth ties, it cannot mis-sort transparency (there is none left).
      root.traverse((o) => {
        if (!o.isMesh) return;
        o.renderOrder = o.userData.isSkin ? 0 : (o.userData.isCloth ? 2 : 1);
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
      this._aimArmsRest();
      // Coach GLBs export bulging eyeballs; seat them. The host is already fitted.
      if (this._modelUrl.includes('coach-') && !this._modelUrl.includes('coach-host')) this._seatEyes(0.9);
      // Snapshot the rest pose for the exercise player: the grounded position to pose
      // from, the lowest foot height for per-frame re-grounding, and each joint's rest
      // orientation in the model frame (so spec body-space angles retarget to this rig).
      this._basePos = root.position.clone();
      this._snapshotPoseBasis();
      this._restFootY = this._minFootWorldY();
      this._frameCamera();
      this._renderOnce();
      if (this._pendingStart) this._resume();
      if (typeof this.onReady === 'function') { try { this.onReady(); } catch { /* best-effort */ } }
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
      disposeModel(this.model);
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

  // Resolve a bone by name, tolerating skeletons that drop the Mixamo 'mixamorig'
  // namespace prefix (e.g. TalkingHead/MPFB exports name the bone 'LeftArm', not
  // 'mixamorigLeftArm'). Lets the Mixamo-calibrated posture/breath maps drive both.
  _boneByName(name) {
    const b = this.bones.get(name);
    if (b) return b;
    if (name.startsWith('mixamorig')) return this.bones.get(name.slice(9)) || null;
    return null;
  }

  // compose rest × delta(euler degrees) onto a bone
  _setBone(name, deg, extraDeg) {
    const bone = this._boneByName(name);
    if (!bone) return;
    const rest = this.rest.get(bone.name);
    if (!rest) return;
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

  // Resolve a logical bone (see RIG) to the actual bone on the loaded skeleton, cached.
  _bone(key) {
    if (!this._rig) this._rig = {};
    if (key in this._rig) return this._rig[key];
    let found = null;
    for (const n of (RIG[key] || [])) { const b = this.bones.get(n); if (b) { found = b; break; } }
    return (this._rig[key] = found);
  }

  // Pose a resolved bone to rest × delta(euler degrees). Safe no-op if absent.
  _poseBone(key, deg) {
    const b = this._bone(key);
    if (!b) return;
    const rest = this.rest.get(b.name);
    if (!rest) return;
    const q = rest.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(deg[0] * D2R, deg[1] * D2R, deg[2] * D2R, 'XYZ')));
    b.quaternion.copy(q);
  }

  // Rotate `bone` so its direction toward `tip` points along the WORLD vector `want`.
  // World-space aim, so it is independent of the rig's bone-local axis conventions.
  _aimBone(bone, tip, want) {
    if (!bone || !tip) return;
    const wp = (o) => { o.updateWorldMatrix(true, false); return new THREE.Vector3().setFromMatrixPosition(o.matrixWorld); };
    const wq = (o) => { o.updateWorldMatrix(true, false); const q = new THREE.Quaternion(); o.matrixWorld.decompose(new THREE.Vector3(), q, new THREE.Vector3()); return q; };
    const cur = wp(tip).sub(wp(bone)).normalize();
    const w = new THREE.Vector3(want[0], want[1], want[2]).normalize();
    const dq = new THREE.Quaternion().setFromUnitVectors(cur, w);
    const nw = dq.multiply(wq(bone));
    const pq = bone.parent ? wq(bone.parent) : new THREE.Quaternion();
    bone.quaternion.copy(pq.invert().multiply(nw));
    bone.updateWorldMatrix(true, true);
  }

  // Bring the arms to a natural resting pose REGARDLESS of how the GLB was exported:
  // aim each upper arm + forearm straight down (a touch forward). Because it uses world
  // directions it works identically on the Mixamo host and the MPFB coaches, where the
  // exported pose otherwise leaves the arms splayed out stiffly. Re-snapshots the rest
  // pose for the re-posed bones so the gesture layer animates on top of the new rest.
  _aimArmsRest() {
    if (!this.ready) return;
    // Hang the arms slightly FORWARD of the torso (+z) so the hands rest clear of the
    // hips/thighs instead of clipping in and out of them as the body breathes.
    // Upper arm near vertical but angled forward; forearm bent further forward (a soft
    // elbow) so the hands rest IN FRONT OF the thighs, never sinking into the cloth/skin.
    // The avatar has no collision, so clearance is bought with this forward bias.
    this._aimBone(this._bone('lArm'), this._bone('lFore'), [0, -1, 0.26]);
    this._aimBone(this._bone('rArm'), this._bone('rFore'), [0, -1, 0.26]);
    this._aimBone(this._bone('lFore'), this._bone('lHand'), [0, -1, 0.5]);
    this._aimBone(this._bone('rFore'), this._bone('rHand'), [0, -1, 0.5]);
    for (const k of ['lArm', 'rArm', 'lFore', 'rFore']) {
      const b = this._bone(k);
      if (b) this.rest.set(b.name, b.quaternion.clone());
    }
  }

  // Seat the eyeballs into their sockets. The MPFB-built coach GLBs export the eyes
  // slightly oversized so they protrude/bulge (reading as misplaced "goggles"); the
  // eyeballs are weighted to the eyeL/eyeR bones, so scaling those bones in shrinks the
  // eyeballs around their centre. No-op on rigs without those bones (e.g. the host,
  // whose eyes are already fitted).
  _seatEyes(scale) {
    for (const n of ['eyeL', 'eyeR']) {
      const b = this.bones.get(n);
      if (b) { b.scale.setScalar(scale); b.updateMatrix(); }
    }
  }

  // ---- exercise pose player ----------------------------------------------------
  // The POSES choreography is authored in BODY space (rig-spec: char faces +z, +x is
  // the character's left, arms hang along −y at zero). The GLB coaches have arbitrary
  // bone-local axes, so we cannot apply those Euler triples as bone-local rotations.
  // Instead we snapshot each joint's REST orientation expressed in the model's frame
  // (B), and per frame convert a body-space rotation R into the bone's local frame by
  // conjugation: R_local = B⁻¹·R·B, then compose rest×R_local. This reproduces the
  // lean rig's hierarchical local-euler composition on ANY skeleton — no per-bone
  // calibration, and twist/side-bend are preserved (a pure "aim" would lose them).
  _snapshotPoseBasis() {
    if (!this.model) return;
    this.model.updateMatrixWorld(true);
    const mq = new THREE.Quaternion();
    this.model.getWorldQuaternion(mq);          // includes the pivot yaw…
    const mqInv = mq.clone().invert();          // …which cancels below, leaving model-frame
    this._restBasis.clear();
    for (const key of MANAGED_JOINTS) {
      const b = this._bone(key);
      if (!b) continue;
      const bwq = new THREE.Quaternion();
      b.getWorldQuaternion(bwq);
      const B = mqInv.clone().multiply(bwq);    // bone's rest axes in the model frame
      this._restBasis.set(key, { B, Binv: B.clone().invert() });
    }
  }

  // Lowest foot-bone world-y (or null). Used to keep the planted foot on the floor
  // after a pose bends the legs — a cheap stand-in for inverse kinematics.
  _minFootWorldY() {
    let m = null;
    const v = this._sVec;
    for (const k of ['ankleL', 'ankleR']) {
      const b = this._bone(k);
      if (!b) continue;
      b.getWorldPosition(v);
      if (m === null || v.y < m) m = v.y;
    }
    return m;
  }

  // Drive one frame of the active move: sample + interpolate the keyframes, retarget
  // each joint into bone-local space, and re-ground so the lower foot stays planted.
  _applyMovePose() {
    const def = this._pose;
    if (!def || !this._basePos) return;
    const loop = def.loopSecs || 8;
    const reduced = !this._breathe;                 // reduced motion → hold the apex, no loop
    const phase = reduced ? 0.5 : (this._poseT % loop) / loop;
    const mirror = !reduced && !!def.mirrorHalfway && (Math.floor(this._poseT / loop) % 2 === 1);
    const frames = def.frames;

    // bracketing keyframes (frames are sorted, first t=0, last t=1)
    let a = frames[0], b = frames[frames.length - 1];
    for (let i = 0; i < frames.length - 1; i++) {
      if (phase >= frames[i].t && phase <= frames[i + 1].t) { a = frames[i]; b = frames[i + 1]; break; }
    }
    const span = (b.t - a.t) || 1;
    let lt = (phase - a.t) / span; lt = lt < 0 ? 0 : lt > 1 ? 1 : lt;
    const e = lt * lt * (3 - 2 * lt);               // smoothstep easing (rig-spec)

    // sample every managed joint; omitted joints fall back to the base value (rest)
    const base = (BASES[def.base] || BASES.stand).joints;
    const J = {};
    for (const key of MANAGED_JOINTS) {
      const va = (a.joints && a.joints[key]) || base[key] || ZERO3;
      const vb = (b.joints && b.joints[key]) || base[key] || ZERO3;
      J[key] = [va[0] + (vb[0] - va[0]) * e, va[1] + (vb[1] - va[1]) * e, va[2] + (vb[2] - va[2]) * e];
    }
    // Cap stacked torso flexion: the clothing mesh and the body skin have different vertex
    // weights across the waist, so beyond ~60° combined the top shears off the torso and
    // skin shows. Scale spine+chest proportionally (keeps the fold's shape) so clothing stays
    // on. Only ever reduces; sub-threshold poses are untouched. Runs before mirror.
    const sx = J.spine[0] + J.chest[0];
    if (sx > 60) { const k = 60 / sx; J.spine[0] *= k; J.chest[0] *= k; }
    if (sx < -40) { const k = -40 / sx; J.spine[0] *= k; J.chest[0] *= k; }   // and for back-bends
    // (No hip-flexion clamp: the clothing is now skinned to the armature — see tools/clean_glb.py —
    // so the cargo pants follow the legs through a full-depth squat/fold and the thigh no longer
    // pokes out. Clamping would only shorten the move for a problem that no longer exists.)
    if (mirror) {
      for (const [l, r] of [['shoulderL', 'shoulderR'], ['elbowL', 'elbowR'], ['hipL', 'hipR'], ['kneeL', 'kneeR'], ['ankleL', 'ankleR']]) {
        const t = J[l]; J[l] = J[r]; J[r] = t;
      }
      for (const key of MANAGED_JOINTS) J[key] = [J[key][0], -J[key][1], -J[key][2]];  // reflect across the sagittal plane
    }

    // pose from the grounded rest, upright (standing analogs never tip the root)
    this.model.position.copy(this._basePos);
    this.model.rotation.set(0, 0, 0);
    for (const key of MANAGED_JOINTS) {
      const bone = this._bone(key);
      if (!bone) continue;
      const restLocal = this.rest.get(bone.name);
      const basis = this._restBasis.get(key);
      if (!restLocal || !basis) continue;
      const d = J[key];
      const blend = this._poseBlend;
      if ((d[0] === 0 && d[1] === 0 && d[2] === 0) || blend <= 0) { bone.quaternion.copy(restLocal); continue; }
      this._sEuler.set(d[0] * D2R, d[1] * D2R, d[2] * D2R);
      this._sQuatR.setFromEuler(this._sEuler);
      this._sQuatRl.copy(basis.Binv).multiply(this._sQuatR).multiply(basis.B);   // body-space → bone-local
      this._sQuatPosed.copy(restLocal).multiply(this._sQuatRl);
      // ease rest → full pose by the master weight via quaternion slerp (shortest-path,
      // so even large-angle joints never pop on entry, exit, or loop wrap)
      if (blend >= 0.999) bone.quaternion.copy(this._sQuatPosed);
      else bone.quaternion.copy(restLocal).slerp(this._sQuatPosed, blend);
    }

    // re-ground: shift the whole body so the lowest foot returns to its rest height,
    // turning leg-bend keyframes (squats, chair, warrior) into a body that sinks with
    // feet planted instead of feet that lift toward a fixed-height pelvis. Update only the
    // two ankle chains we read (not the whole skinned rig); renderer.render does the full
    // pass once, with the corrected position.y.
    const aL = this._bone('ankleL'), aR = this._bone('ankleR');
    if (aL) aL.updateWorldMatrix(true, false);
    if (aR) aR.updateWorldMatrix(true, false);
    const fy = this._minFootWorldY();
    if (fy != null && this._restFootY != null) this.model.position.y += (this._restFootY - fy);
  }

  // Return every posed joint to rest and re-ground the body. Called once when a move
  // ends so the legs/spine/neck (which the idle gesture does not touch) do not freeze.
  _clearPose() {
    for (const key of MANAGED_JOINTS) {
      const bone = this._bone(key);
      const restLocal = bone && this.rest.get(bone.name);
      if (bone && restLocal) bone.quaternion.copy(restLocal);
    }
    this._restoreModelRest();
  }

  _restoreModelRest() {
    if (this.model && this._basePos) { this.model.position.copy(this._basePos); this.model.rotation.set(0, 0, 0); }
  }

  // ---- public API (mirrors Avatar) ----
  setCharacter(character) {
    if (character === this.character) return;
    this.character = character;
    const url = modelUrlFor(character);
    if (this.ready && url !== this._modelUrl) this._swapModel(url);
  }

  // Perform an exercise. `def` is a POSES-style keyframe object (base + loopSecs +
  // frames of body-space Euler angles per joint) chosen by poseForExercise() in
  // poses.js — already resolved to a STANDING, GLB-renderable pose (floor/seated
  // moves arrive here as standing analogs). Pass null to stop performing and return
  // to the idle/talking presence. The loop is driven each frame in _applyMovePose.
  setPose(def) {
    this._pose = (def && def.frames && def.frames.length) ? def : null;
    this._poseT = 0;
  }

  setMirrored(m) { this.mirrored = m; if (this.pivot) this.pivot.scale.x = m ? -1 : 1; }

  // Drive the mouth while the coach is speaking. Safe no-op on rigs without
  // visemes (e.g. a Mixamo body), so it can be wired unconditionally.
  setTalking(on) {
    this._talking = !!on;
    if (this._talking && this.ready && !this._raf && this._running) this._resume();
  }

  // Provide a live-loudness source (0..1) so the mouth tracks real speech audio.
  // Pass null to clear (then the organic talking motion is used). Safe no-op on
  // the lean coach, so main.js can wire it unconditionally.
  setLevelProvider(fn) { this._levelProvider = (typeof fn === 'function') ? fn : null; }

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
    if (this._raf || !this.ready || !this._running || this._disposed) return;
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
    // Performing a move (workout framing) takes over the body; lessons/meditation
    // ('talk' framing) and the rest of the time keep the idle/talking gesture.
    const moving = !!this._pose && this._framing === 'full' && this.ready && this._restBasis.size > 0;
    this._poseActive = moving;
    if (this._breathe) {
      // very soft whole-body weight-shift sway (presentation turntable)
      this.pivot.rotation.y = (14 + 1.4 * Math.sin(this.time * (Math.PI * 2) / 7.5)) * D2R;
    }
    // Master pose-blend: ease the whole body INTO a move and back OUT to rest over ~0.4s,
    // so entering or leaving a move never snaps. While the weight is non-zero we keep
    // driving the (blended) move pose; only once it has fully eased to rest do we hand the
    // body back to the idle gesture layer.
    const blendTarget = moving ? 1 : 0;
    this._poseBlend += (blendTarget - this._poseBlend) * Math.min(1, dt * 7);
    if (moving && this._poseBlend > 0.999) this._poseBlend = 1;
    if (!moving && this._poseBlend < 0.002) this._poseBlend = 0;
    if (moving || this._poseBlend > 0) {
      if (moving && this._breathe) this._poseT += dt * this.speed;   // reduced motion holds a static apex
      this._applyMovePose();                                          // blends rest<->pose by this._poseBlend
      this._wasMoving = true;
    } else {
      if (this._wasMoving) { this._clearPose(); this._wasMoving = false; }
      if (this._breathe) this._gesture(dt);
    }
    if (this.faceReady) this._animateFace(dt);
    this.renderer.render(this.scene, this.camera);
  }

  // A living gesture layer composed ON TOP of the standing posture. Always-on idle
  // micro-motion keeps her from ever freezing; while talking, an emphasis-pulsed
  // layer animates the arms, forearms, torso and head so she gestures WITH her words.
  // All amplitudes are small (a few degrees) and built from incommensurate sine
  // frequencies, so the motion is smooth, organic, and never visibly repeats.
  _gesture(dt) {
    // ramp gesture intensity up while talking, down at rest — fluid, never snapped
    const targetGain = this._talking ? 1 : 0;
    this._gestureGain += (targetGain - this._gestureGain) * Math.min(1, dt * 3.0);
    // speech emphasis: live audio loudness drives bigger gestures (hands move with
    // the words); without a signal, a slow organic pulse stands in
    let emph;
    if (this._talking && this._levelProvider) {
      let v = 0; try { const x = this._levelProvider(); if (typeof x === 'number') v = x; } catch { /* best-effort */ }
      emph = Math.min(1, v * 1.5);
    } else {
      emph = 0.5 + 0.5 * Math.sin(this.time * 2.0);
    }
    this._emphasis += (emph - this._emphasis) * Math.min(1, dt * 6);

    const t = this.time, g = this._gestureGain, e = this._emphasis;
    const talk = g * (0.45 + 0.55 * e);   // 0..~1 talking drive, pulsing with speech
    const breath = Math.sin(t * (Math.PI * 2) / 3.8);

    // chest: gentle breathing rise + a slow talking lean (resolved spine bone)
    const lean = 0.6 * Math.sin(t * 0.55) + 1.2 * talk * Math.sin(t * 1.05 + 0.5);
    this._poseBone('chest', [-1.1 * breath, 0.5 * lean, 0.3 * lean]);

    // arms: subtle asymmetric idle sway always; a livelier swing while explaining.
    // Amplitudes are deliberately small (a few degrees) since the delta rides on the
    // aimed-down rest pose and the bone-local axis varies by rig.
    const aL = 0.4 * Math.sin(t * 0.92) + 1.3 * talk * Math.sin(t * 1.70 + 0.4);
    const aR = 0.4 * Math.sin(t * 0.85 + 1.9) + 1.3 * talk * Math.sin(t * 1.60 + 2.2);
    const fL = 0.5 * Math.sin(t * 0.70 + 0.3) + 1.7 * talk * Math.sin(t * 2.35 + 0.9);
    const fR = 0.5 * Math.sin(t * 0.65 + 2.4) + 1.7 * talk * Math.sin(t * 2.20 + 2.6);
    this._poseBone('lArm', [aL, 0, 0]);
    this._poseBone('rArm', [aR, 0, 0]);
    this._poseBone('lFore', [fL, 0, 0]);
    this._poseBone('rFore', [fR, 0, 0]);

    // head nod/tilt for emphasis — folded into the head quaternion alongside gaze
    this._headNod = 0.5 * Math.sin(t * 0.70) + 2.4 * talk * Math.sin(t * 2.60 + 0.2);
    this._headTilt = 0.5 * Math.sin(t * 0.48 + 1.1) + 1.4 * talk * Math.sin(t * 1.30 + 0.8);
  }

  // Blink, gaze, resting micro-smile, and speech-driven lip-sync. All gated on the
  // presence of the relevant morphs, so any subset present still works.
  _animateFace(dt) {
    // --- lip-sync: track the real audio when we have it, else an organic motion ---
    let open = 0;
    if (this._talking) {
      let lvl = null;
      if (this._levelProvider) { try { const v = this._levelProvider(); if (typeof v === 'number') lvl = v; } catch { /* best-effort */ } }
      if (lvl != null) {
        // real audio amplitude → the mouth opens with the actual speech and
        // closes in the gaps (word-aligned + fluid). A faint shimmer keeps lips
        // alive on sustained vowels without fighting the audio.
        const shimmer = lvl > 0.05 ? 0.03 * (0.5 + 0.5 * Math.sin(this.time * 19)) : 0;
        open = Math.min(0.82, lvl * 0.95 + shimmer);
      } else {
        // no audio signal (system voice): organic syllable bursts gated into
        // word-groups so the mouth pauses like real speech, not a robotic buzz.
        const t = this.time;
        const syllable = 0.5 + 0.5 * Math.sin(t * 10.5);
        const micro = 0.65 + 0.35 * Math.sin(t * 22.3 + 1.3);
        const wordGate = Math.min(1, Math.max(0, Math.sin(t * 2.3) * 0.6 + 0.65));
        open = Math.max(0, syllable * micro * wordGate) * 0.6;
      }
    }
    // ease toward target — open quickly, close a little slower, so it never snaps
    this._jaw += (open - this._jaw) * Math.min(1, dt * (open > this._jaw ? 22 : 15));
    this._setMorph('jaw', this._jaw);
    if (this._talking && this._jaw > 0.01) {
      const ph = (Math.sin(this.time * 3.1) + 1) / 2;        // slow vowel shaping
      this._setMorph('round', this._jaw * 0.5 * ph);
      this._setMorph('wide', this._jaw * 0.42 * (1 - ph));
      this._setMorph('pucker', this._jaw * 0.18 * ph);
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
    const head = this._bone('head');
    const rest = head && this.rest.get(head.name);
    // While performing a move, the pose player owns the head (e.g. neck rolls); do not
    // overwrite it with the gaze/nod here, or the head would snap back every frame.
    if (head && rest && !this._poseActive) {
      // gaze (eye-follow) + gesture nod/tilt, composed so the head moves naturally
      const e = new THREE.Euler((this._gazeY + this._headNod) * D2R, this._gazeX * D2R, this._headTilt * D2R, 'XYZ');
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
      if (this._disposed || !this._running) return;          // never poll a disposed/stopped avatar
      if (!this.ready) { setTimeout(run, 200); return; }
      let start = 0, frames = 0, aborted = false;
      const tick = (ts) => {
        if (!this._running || aborted || this._disposed) return;
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

  // ---- dev-only Stage-0 load self-check -----------------------------------------
  // Compact per-coach capability report computed against the ACTUALLY loaded skeleton
  // and morph dictionary (not raw GLB names) — so it reflects what the engine can drive
  // after GLTFLoader name-sanitization. Pure read; no scene mutation. Surfaced via
  // ?dev=avatar. Where a capability is absent the matching rule falls back automatically.
  selfCheck() {
    const file = (this._modelUrl.split('/').pop() || '').split('?')[0];
    const resolveLogical = (key) => { for (const n of (RIG[key] || [])) if (this.bones.has(n)) return n; return null; };
    const skeleton = {};
    for (const k of ['lArm', 'rArm', 'lFore', 'rFore', 'hipL', 'hipR', 'kneeL', 'kneeR', 'ankleL', 'ankleR', 'head', 'neck', 'spine', 'chest']) skeleton[k] = resolveLogical(k);
    const armChain = !!(skeleton.lArm && skeleton.rArm && skeleton.lFore && skeleton.rFore);
    const legChain = !!(skeleton.hipL && skeleton.hipR && skeleton.kneeL && skeleton.kneeR);
    const jawBone = ['Jaw', 'jaw', 'mixamorigJaw'].find((n) => this.bones.has(n)) || null;
    const jawMorph = this._resolve('jaw');
    const visemes = ['viseme_aa', 'viseme_E', 'viseme_I', 'viseme_O', 'viseme_U', 'viseme_PP', 'viseme_CH', 'viseme_FF', 'viseme_SS', 'viseme_TH'].filter((n) => this.morphs.has(n));
    const blink = !!(this._resolve('blinkL') || this._resolve('blink'));
    const eyeBones = ['eyeL', 'eyeR', 'LeftEye', 'RightEye'].filter((n) => this.bones.has(n));
    const meshes = { skin: [], cloth: [], hair: [], other: [] };
    const glasses = [];
    if (this.model) this.model.traverse((o) => {
      if (!o.isMesh) return;
      const nm = o.name || '';
      if (/glass|spectacle|eyewear|frame/i.test(nm)) glasses.push(nm);
      if (o.userData.isSkin) meshes.skin.push(nm);
      else if (o.userData.isCloth) meshes.cloth.push(nm);
      else if (/hair|ponytail|afro|beard|brow|lash|fro|loose|short0/i.test(nm)) meshes.hair.push(nm);
      else meshes.other.push(nm);
    });
    return {
      file,
      skeleton: { armChain, legChain, head: skeleton.head, neck: skeleton.neck, spine: skeleton.spine, chest: skeleton.chest, names: skeleton },
      face: { jawBone, jawMorph, visemes, blink, morphCount: this.morphs.size },
      eyes: { eyeBones, seatable: this.bones.has('eyeL') || this.bones.has('eyeR') },
      clothing: { skin: meshes.skin, cloth: meshes.cloth, hair: meshes.hair, other: meshes.other, separable: meshes.cloth.length > 0 && meshes.skin.length > 0 },
      glasses,
    };
  }

  // Dev-only: render the loaded coach at a single, static keyframe phase of a move
  // (or idle) from an arbitrary turntable yaw, then restore all state. Used by the
  // ?dev=avatar montage to capture deepest-phase poses for the Rule 1 acceptance grid
  // without spinning up a full session. No-op until ready.
  devShowPose(def, phase = 0.5, yawDeg = 14, blend = 1) {
    if (!this.ready) return;
    const prev = { pose: this._pose, t: this._poseT, breathe: this._breathe, yaw: this.pivot.rotation.y, active: this._poseActive, blend: this._poseBlend };
    this.pivot.rotation.y = yawDeg * D2R;
    if (def && def.frames && def.frames.length) {
      this._pose = def;
      this._breathe = true;                 // honor the explicit phase (reduced-motion would pin the apex)
      this._poseT = phase * (def.loopSecs || 8);
      this._poseActive = true;
      this._poseBlend = blend;              // 0..1 master weight, to visualize the cross-fade
      this._applyMovePose();
    } else {
      this._clearPose();
      this._aimArmsRest();
    }
    this.renderer.render(this.scene, this.camera);
    this._pose = prev.pose; this._poseT = prev.t; this._breathe = prev.breathe; this._poseActive = prev.active; this._poseBlend = prev.blend; this.pivot.rotation.y = prev.yaw;
  }

  // Dev-only: a tight head-and-shoulders shot from an arbitrary yaw, for inspecting eyes
  // and hair detail. Restores the normal framing afterward.
  devHeadshot(yawDeg = 0) {
    if (!this.model) return;
    const prevYaw = this.pivot.rotation.y;
    this.pivot.rotation.y = yawDeg * D2R;
    this.model.updateMatrixWorld(true);
    const head = this._bone('head');
    const t = new THREE.Vector3();
    if (head) head.getWorldPosition(t);
    else { const b = new THREE.Box3().setFromObject(this.model); b.getCenter(t); t.y = b.max.y - 0.12; }
    const aimY = t.y + 0.04;                 // frame the whole head (incl. a tied-back ponytail)
    this.camera.position.set(t.x, aimY, t.z + 0.82);
    this.camera.lookAt(t.x, aimY, t.z);
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
    this.pivot.rotation.y = prevYaw;
    this._frameCamera();
  }

  // Dev-only: drive the mouth to a static openness (0..1) and render a talk-framed close-up,
  // proving the viseme/jaw morphs actually move the visible mouth (the rendering half of
  // speech-driven lip-sync; the signal half is coach.getMouthLevel in tts.js).
  devShowMouth(open) {
    if (!this.ready) return;
    this.setFraming('talk');
    this._setMorph('jaw', open);
    this._setMorph('round', open > 0.01 ? open * 0.5 : 0);
    this._setMorph('wide', open > 0.01 ? open * 0.3 : 0);
    this._setMorph('smileL', 0.1); this._setMorph('smileR', 0.1);
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this._disposed = true;               // neutralize any in-flight GLB load / fallback callback
    this.onError = null;
    this.stop();
    document.removeEventListener('visibilitychange', this._onVis);
    this._ro.disconnect();
    disposeModel(this.model);            // geometry + every texture slot, not just .map
    this.model = null;
    // drop detached bone refs / cached quaternions / closures so nothing zombie-references
    // a torn-down coach (defensive — main.js also nulls the instance right after)
    this.onReady = null; this._levelProvider = null; this._pose = null;
    this.bones.clear(); this.rest.clear(); this.morphs.clear();
    this._restBasis.clear(); this._rig = {};
    this._basePos = null; this._restFootY = null;
    try { if (this._envRT) this._envRT.dispose(); if (this._pmrem) this._pmrem.dispose(); if (this._shadowTex) this._shadowTex.dispose(); } catch { /* ok */ }
    this.scene.environment = null;
    this.renderer.dispose();
  }
}
