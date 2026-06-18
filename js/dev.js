// Developer visual QA, reachable via ?dev=poses / ?dev=anim / ?dev=garden.
// Renders every pose (one shared WebGL context), every animation as a
// phase strip, or every garden stage as a reviewable grid. Not in the UI.

import { EXERCISES } from './data/exercises.js';
import { POSES } from './data/poses.js';
import { gardenSVG } from './data/garden.js';
import { CHARACTERS } from './characters.js';

export async function runDev(mode) {
  const app = document.getElementById('app');
  if (mode === 'avatar') { await runAvatarSelfCheck(app); return; }
  if (mode === 'garden') {
    app.innerHTML = '<div class="dev-grid">' + Array.from({ length: 9 }, (_, i) =>
      `<div class="dev-cell"><div class="garden-svg">${gardenSVG(i)}</div><small>stage ${i}</small></div>`,
    ).join('') + '</div>';
    return;
  }
  if (mode === 'anim') {
    // each exercise as a strip of loop phases — motion review in one image
    const { Avatar } = await import('./avatar.js');
    const work = document.createElement('canvas');
    work.width = 260; work.height = 260;
    work.style.cssText = 'position:fixed;left:-9999px;width:260px;height:260px';
    document.body.appendChild(work);
    const av = new Avatar(work, CHARACTERS[0]);
    av.resize();
    const PHASES = [0.06, 0.3, 0.55, 0.8];
    const rows = [];
    for (const ex of EXERCISES) {
      const pose = POSES[ex.id];
      if (!pose) { rows.push(`<div class="dev-cell"><div class="dev-missing">NO POSE</div><small>${ex.id}</small></div>`); continue; }
      const imgs = PHASES.map((ph) => {
        av.showPose(pose, ph);
        return `<img src="${av.renderer.domElement.toDataURL()}" width="130" height="130" alt="${ex.id} @${ph}">`;
      }).join('');
      rows.push(`<div class="dev-cell" style="grid-column:1/-1"><div style="display:flex;gap:4px">${imgs}</div><small>${ex.id} — ${pose.frames.length} frames over ${pose.loopSecs}s${pose.mirrorHalfway ? ' (sided)' : ''}</small></div>`);
    }
    av.dispose();
    work.remove();
    app.innerHTML = '<div class="dev-grid">' + rows.join('') + '</div>';
    return;
  }
  if (mode === 'poses') {
    const { Avatar } = await import('./avatar.js');
    const work = document.createElement('canvas');
    work.width = 300; work.height = 300;
    work.style.cssText = 'position:fixed;left:-9999px;width:300px;height:300px';
    document.body.appendChild(work);
    const av = new Avatar(work, CHARACTERS[0]);
    av.resize();
    const cells = [];
    const phaseParam = parseFloat(new URLSearchParams(location.search).get('phase') || '0.35');
    for (const ex of EXERCISES) {
      const pose = POSES[ex.id];
      let img = '';
      if (pose) {
        av.showPose(pose, phaseParam);
        img = `<img src="${av.renderer.domElement.toDataURL()}" width="220" height="220" alt="${ex.id}">`;
      } else {
        img = '<div class="dev-missing">NO POSE</div>';
      }
      cells.push(`<div class="dev-cell">${img}<small>${ex.id} (${pose ? pose.base : '—'})</small></div>`);
    }
    av.dispose();
    work.remove();
    app.innerHTML = '<div class="dev-grid">' + cells.join('') + '</div>';
  }
}

// ?dev=avatar — Stage-0 load self-check + Rule 1/Rule 2 acceptance montage.
// Loads every coach through the REAL realistic engine, prints the capability table
// (resolved against the loaded skeleton/morphs), measures FPS idle + mid-move on the
// reference coach, and renders deepest-phase pose shots front + 3/4 for visual review.
async function runAvatarSelfCheck(app) {
  const { RealisticAvatar } = await import('./realistic-avatar.js?v=rig12');
  const COACHES = [
    { id: 'jasmine', file: 'coach-jasmine.glb', ref: true },
    { id: 'host', file: 'coach-host.glb' },
    { id: 'nokeke', file: 'coach-nokeke.glb' },
    { id: 'abednego', file: 'coach-abednego.glb' },
    { id: 'aguibou', file: 'coach-aguibou.glb' },
  ];
  const urlFor = (file) => new URL('../models/' + file, import.meta.url).href;
  app.style.background = '#8a8f8c';
  app.innerHTML = '<p style="font:14px system-ui;padding:12px;color:#fff">Loading coaches through the realistic engine…</p>';

  const work = document.createElement('canvas');
  work.width = 380; work.height = 520;
  work.style.cssText = 'position:fixed;left:-9999px;width:380px;height:520px';
  document.body.appendChild(work);

  const whenReady = (av, ms = 20000) => new Promise((resolve, reject) => {
    const t0 = performance.now();
    const poll = () => {
      if (av.ready) return resolve();
      if (av.failed) return reject(new Error('load failed: ' + av._modelUrl));
      if (performance.now() - t0 > ms) return reject(new Error('timeout: ' + av._modelUrl));
      requestAnimationFrame(poll);
    };
    requestAnimationFrame(poll);
  });
  const measureFps = (av, ms = 1100) => new Promise((resolve) => {
    av.start();
    let frames = 0; const t0 = performance.now();
    const loop = () => { frames++; if (performance.now() - t0 >= ms) { av.stop(); resolve(Math.round(frames / ((performance.now() - t0) / 1000))); return; } requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  });
  const shot = (av, def, phase, yaw, framing, blend) => { av.setFraming(framing || 'full'); av.devShowPose(def, phase, yaw, blend === undefined ? 1 : blend); return av.renderer.domElement.toDataURL(); };
  const strip = (label, urls, w) => `<div style="display:flex;gap:6px;align-items:center;margin:6px 0"><b style="font:12px system-ui;color:#fff;width:160px">${label}</b>${urls.map((u) => `<img src="${u}" width="${w || 120}" style="background:#9aa09c;border-radius:8px">`).join('')}</div>`;

  const reports = []; const cards = []; let refMontage = ''; let fps = { idle: '—', move: '—' };

  // First coach constructed; the rest swapped in place so we keep ONE GL context.
  const first = COACHES[0];
  window.__AVATAR_MODEL__ = 'models/' + first.file;
  const av = new RealisticAvatar(work, { id: first.id });
  for (const c of COACHES) {
    try {
      if (c !== first) { av._swapModel(urlFor(c.file)); }
      await whenReady(av);
      const r = av.selfCheck();
      reports.push({ id: c.id, ...r });
      // eslint-disable-next-line no-console
      console.log('SELF-CHECK', c.id, JSON.stringify(r));
      const idleThumb = shot(av, null, 0, 18, 'full');
      cards.push(`<figure style="margin:0;text-align:center"><img src="${idleThumb}" width="150" style="background:#9aa09c;border-radius:8px"><figcaption style="font:12px system-ui;color:#fff">${c.id}${c.ref ? ' (ref)' : ''}</figcaption></figure>`);
      if (c.ref) {
        const cells = [];
        const views = [
          ['idle', null, 0],
          ['forward-fold', POSES['forward-fold'], 0.5],
          ['squats', POSES['squats'], 0.5],
          ['down-dog (authored)', POSES['down-dog'], 0.5],
        ];
        for (const [label, def, ph] of views) {
          const front = shot(av, def, ph, 0, 'full');
          const q34 = shot(av, def, ph, 35, 'full');
          cells.push(`<div style="display:flex;gap:6px;align-items:center;margin:4px 0"><b style="font:12px system-ui;color:#fff;width:140px">${label}</b><img src="${front}" width="150" style="background:#9aa09c;border-radius:8px"><img src="${q34}" width="150" style="background:#9aa09c;border-radius:8px"></div>`);
        }
        const closeup = shot(av, null, 0, 12, 'talk');
        cells.push(`<div style="display:flex;gap:6px;align-items:center;margin:8px 0"><b style="font:12px system-ui;color:#fff;width:160px">Rule 2 close-up (talk)</b><img src="${closeup}" width="220" style="background:#9aa09c;border-radius:8px"></div>`);
        // motion proof — master blend cross-fade (rest→squats) should be a smooth ramp, no snap
        cells.push(strip('entry cross-fade 0→1 (squats)', [0, 0.33, 0.66, 1].map((b) => shot(av, POSES['squats'], 0.5, 0, 'full', b))));
        // loop wrap + large-angle: side-reach (~165° arm) across the wrap (…0.9, 0.97, 0.0, 0.07)
        cells.push(strip('side-reach loop wrap', [0.9, 0.97, 0.0, 0.07].map((p) => shot(av, POSES['side-reach'], p, 18, 'full', 1))));
        // lip-sync (rendering half): mouth closed → mid → open should visibly move the mouth
        cells.push(strip('mouth open 0 → 0.45 → 0.85 (lip-sync)', [0, 0.45, 0.85].map((o) => { av.devShowMouth(o); return av.renderer.domElement.toDataURL(); }), 200));
        // headshots — inspect eyes + hair detail (front, 3/4, near-profile)
        cells.push(strip('headshot front / 3·4 / profile (eyes + hair)', [0, 30, 75].map((y) => { av.devHeadshot(y); return av.renderer.domElement.toDataURL(); }), 220));
        refMontage = cells.join('');
        fps.idle = await measureFps(av);
        av.setPose(POSES['squats']);
        fps.move = await measureFps(av);
        av.setPose(null);
      }
    } catch (e) {
      reports.push({ id: c.id, error: String(e && e.message || e) });
      cards.push(`<figure style="margin:0;text-align:center"><div style="width:150px;height:150px;display:grid;place-items:center;background:#a33;color:#fff;border-radius:8px;font:11px system-ui">${c.id}<br>FAILED</div></figure>`);
    }
  }
  // Keep the reference coach (jasmine) alive + exposed for live console tuning of eyes/hair.
  try { av._swapModel(urlFor(first.file)); await whenReady(av); } catch (e) { /* keep last loaded */ }
  window.__devAv = av;
  delete window.__AVATAR_MODEL__;

  const yn = (b) => b ? '✓' : '✗';
  const tableRows = reports.map((r) => {
    if (r.error) return `${r.id.padEnd(10)} ERROR: ${r.error}`;
    const sk = `arms ${yn(r.skeleton.armChain)} legs ${yn(r.skeleton.legChain)} head ${yn(!!r.skeleton.head)} jaw ${yn(!!r.face.jawBone)}`;
    const fc = `jawMorph ${r.face.jawMorph || '—'}  visemes ${r.face.visemes.length}  blink ${yn(r.face.blink)}  morphs ${r.face.morphCount}`;
    const ey = `eyeBones [${r.eyes.eyeBones.join(',') || '—'}] seatable ${yn(r.eyes.seatable)}`;
    const cl = `cloth[${r.clothing.cloth.join(',')}] skin[${r.clothing.skin.join(',')}] separable ${yn(r.clothing.separable)}`;
    const gl = `glasses ${r.glasses.length ? r.glasses.join(',') : 'NONE'}`;
    return `■ ${r.id}\n   skeleton: ${sk}\n   face:     ${fc}\n   eyes:     ${ey}\n   clothing: ${cl}\n   ${gl}`;
  }).join('\n\n');
  const pre = `STAGE 0 — COACH AVATAR SELF-CHECK (resolved against loaded rig)\n` +
    `reference coach: jasmine    FPS desktop-preview: idle ${fps.idle}  mid-move(squats) ${fps.move}  (on-device floor = 22fps via watchPerformance)\n\n` +
    tableRows;

  app.innerHTML =
    `<pre id="selfcheck" style="white-space:pre-wrap;font:12px/1.5 ui-monospace,monospace;color:#fff;background:#2c302e;padding:14px;border-radius:10px;margin:10px">${pre.replace(/</g, '&lt;')}</pre>` +
    `<div style="padding:0 10px"><h3 style="font:600 14px system-ui;color:#fff">Reference coach (jasmine) — deepest-phase montage (front · 3/4)</h3>${refMontage}</div>` +
    `<div style="padding:10px"><h3 style="font:600 14px system-ui;color:#fff">Spot-check (idle)</h3><div style="display:flex;gap:10px;flex-wrap:wrap">${cards.join('')}</div></div>`;
}
