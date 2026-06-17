# Security headers & content security policy

"You Got This!" is a fully client-side, on-device PWA. There is no backend, no
account system, and no analytics. The only network activity beyond the app's own
self-hosted files is the **optional, opt-in** download of two on-device AI models
(the lifelike coach voice and the journal's speech-to-text), fetched once from public
CDNs and then run entirely on the device. Nothing the user types, says, records, eats,
or logs is ever transmitted.

Because a static site cannot set HTTP response headers from its own HTML, the headers
live in [`_headers`](../_headers) (Netlify / Cloudflare Pages format). Apply them at the
host. The local preview server ignores the file, so it never affects development.

## Headers

- **Referrer-Policy: no-referrer** — never leak the URL to third parties.
- **X-Content-Type-Options: nosniff** — no MIME sniffing.
- **X-Frame-Options: DENY** / **frame-ancestors 'none'** — the app cannot be framed
  (clickjacking protection).
- **Cross-Origin-Opener-Policy: same-origin** — isolate the browsing context.
- **Permissions-Policy** — microphone is allowed only for this origin (the journal's
  voice notes need it); camera, geolocation, payment, usb, and FLoC are disabled.

## Content-Security-Policy — why each allowance exists

- `default-src 'self'` — everything defaults to first-party only.
- `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net`
  - `'self'` — the app's ES modules.
  - `'unsafe-inline'` — required only for the inline `<script type="importmap">` in
    `index.html` (maps the `three` bare specifier). The app injects no inline event
    handlers and HTML-escapes all dynamic content (enforced by the validator), so the
    residual XSS surface is minimal. To drop this, replace the importmap with a relative
    `three` import and remove `'unsafe-inline'`.
  - `'wasm-unsafe-eval'` — the on-device models (Kokoro voice, Whisper transcription)
    run via WebAssembly (ONNX Runtime Web). **Without this, those features break.**
  - `https://cdn.jsdelivr.net` — the kokoro-js and @huggingface/transformers ES bundles.
- `worker-src 'self' blob:` / `child-src 'self' blob:` — the speech-to-text worker
  (`js/stt-worker.js`).
- `connect-src 'self' https://cdn.jsdelivr.net https://huggingface.co https://cdn-lfs.huggingface.co https://*.hf.co`
  — fetching the model weight files. **If these are removed, the lifelike voice and
  transcription cannot download and will fall back to the system voice / manual text.**
- `img-src 'self' data: blob:` / `media-src 'self' blob:` — inline SVG/icons and journal
  audio playback (object URLs).
- `style-src 'self' 'unsafe-inline'` — the stylesheet plus a few inline style attributes.
- `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` — lock down the rest.

## First-deploy checklist

1. Deploy with `_headers` applied.
2. Load the app; confirm it boots and a session plays (proves `script-src`/`style-src`).
3. Turn on the lifelike voice in Settings and record a journal voice note; confirm the
   models download and run (proves `connect-src` + `wasm-unsafe-eval` + `worker-src`).
4. If either model fails to load, widen `connect-src`/`script-src` for the model host
   shown failing in the console — do not remove `'wasm-unsafe-eval'`.
