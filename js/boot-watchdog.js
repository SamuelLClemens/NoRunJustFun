// Boot watchdog. The app boots by replacing the contents of #app (the splash
// <main class="hello"> lives there). If a catastrophic load failure leaves the
// splash up — a CSP block, a parse error, a missing module — the user would
// otherwise stare at "Warming up…" forever. After a grace period, surface a gentle
// reload hint. This runs as its OWN module so it executes even when main.js fails to
// load or parse. It self-cancels the instant the app has rendered.
const GRACE_MS = 9000;

setTimeout(() => {
  const splash = document.querySelector('#app .hello');
  if (!splash) return;                       // app rendered over the splash — all good
  const sub = splash.querySelector('.hello-sub');
  if (!sub || sub.dataset.stalled) return;
  sub.dataset.stalled = '1';
  sub.textContent = 'This is taking longer than usual. Please check your connection and try again.';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-primary';
  btn.style.marginTop = '12px';
  btn.textContent = 'Reload';
  btn.addEventListener('click', () => location.reload());
  sub.insertAdjacentElement('afterend', btn);
}, GRACE_MS);
