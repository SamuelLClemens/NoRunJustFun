// "Playful · for the bedroom" — a tasteful, opt-in Soul section of intimacy games and
// bedroom tips. CONSENTING ADULTS only; everything here is PG-13 wellness framing —
// ideas to talk about and try (together or solo), never pressure, never explicit or
// medical advice. Consent, comfort and communication come first, always. Lazy-loaded by
// the router at #bedroom so it never touches the boot path. Self-contained: no coach,
// audio, session, or stored state — just playful prompts rendered on demand.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Playful "sparks" — gentle invitations to try together or adapt solo.
const SPARKS = [
  'Put on a song and let it set your pace.',
  'Swap who takes the lead.',
  'Slow everything down by half for five minutes.',
  'Make eye contact — and hold it.',
  'Move somewhere new in the house.',
  'Give a two-minute massage with no agenda.',
  'Whisper one thing you find irresistible about them.',
  'Try a different time of day.',
  'Dim the lights or light a candle.',
  'Take turns describing what feels good, out loud.',
  'Start fully clothed and take your time.',
  'Add a blindfold — if you both like the idea.',
  'Trade slow, lingering kisses with no rush to anything else.',
  'Let one person be still while the other explores.',
  'Put phones in another room and be fully here.',
  'Ask for exactly what you want, kindly and clearly.',
  'Build anticipation all day with a single playful text.',
  'Focus on one kind of touch and savor it.',
];

// Truth or Dare, bedroom edition — connection first, all tasteful and optional.
const TRUTHS = [
  'What is something you have wanted to try but never said out loud?',
  'Where do you most love to be touched?',
  'What is your favorite memory of us together?',
  'What helps you feel most relaxed and present?',
  'What is one small thing that always turns you on?',
  'What does feeling desired look like for you?',
  'Is there a fantasy you would feel safe sharing?',
  'What is one thing you would like more of?',
  'What makes you feel closest to me afterward?',
  'What is a compliment you wish you heard more often?',
];
const DARES = [
  'Give a sixty-second kiss with no rush to anything else.',
  'Offer a two-minute shoulder or back rub.',
  'Describe, out loud, one thing you would like to do next.',
  'Trade one slow, genuine compliment about each other.',
  'Hold a long, full hug and just breathe together.',
  'Run a single fingertip slowly along their arm.',
  'Look into their eyes and say one honest thing you want.',
  'Pick the next song and dance one slow song together.',
  'Show, gently, one place you love being touched.',
  'Whisper your favorite thing about tonight so far.',
];

// Yes / No / Maybe — a calm, consent-forward way to explore together.
const EXPLORE = [
  'A slower, longer warm-up than usual.',
  'Trying a new position you have both been curious about.',
  'Taking turns being completely in charge.',
  'Adding music, candlelight, or a different room.',
  'Using a toy together.',
  'A massage that may or may not lead anywhere.',
  'Talking through a shared fantasy.',
  'A morning rather than a night.',
  'Sending playful messages earlier in the day.',
  'A longer, unhurried wind-down afterward.',
];

// Tasteful, body-positive, consent-forward tips — wellness, never explicit or medical.
const TIPS = [
  { t: 'Talk before, during, and after', b: 'A quick "is this good?" and an honest "I would love more of that" do more than any technique. Consent is ongoing and can be checked in on anytime.' },
  { t: 'There is no rush', b: 'Warming up slowly — touch, kissing, anticipation — makes everything that follows more comfortable and more pleasurable for most bodies.' },
  { t: 'Lubrication helps almost everyone', b: 'It reduces friction and increases comfort and sensation. A water-based lube is a simple, friendly upgrade; reapply whenever you like.' },
  { t: 'Breathe and soften', b: 'Tension and speed are not the goal. Slow breathing keeps you present and lets sensation build. Relaxing the jaw and shoulders relaxes everything.' },
  { t: 'Change one variable', b: 'Pace, place, time of day, who leads, lighting, position — shifting just one keeps things fresh without any pressure to perform.' },
  { t: 'Aftercare counts', b: 'A cuddle, some water, a kind word, a few quiet minutes together. The wind-down is part of the experience, not an afterthought.' },
  { t: 'Build the body that helps', b: 'Hip mobility, core strength, and a responsive pelvic floor make active intimacy more comfortable. The Sexercise path in Body is made for exactly this.' },
  { t: 'Make a yes / no / maybe list', b: 'Sharing what you each enjoy, what is off the table, and what you are curious about turns guesswork into a shared map. The Explore game above is a gentle start.' },
  { t: 'Solo exploration is valid', b: 'Knowing your own body — what you like, what you do not — makes everything easier to share. It is self-knowledge, full stop.' },
  { t: 'Presence beats performance', b: 'Confidence comes from attention, not from a checklist. Being fully with your partner (or yourself) is the most attractive thing there is.' },
  { t: 'Care for your health', b: 'Contraception and STI care are simple acts of self-respect and mutual respect, with zero shame attached. A clinician can answer anything specific.' },
  { t: 'Laugh when it is funny', b: 'Bodies make sounds, plans go sideways, things get silly. Sharing a laugh is intimacy too — it keeps the whole thing warm and human.' },
];

const DISCLAIMER = 'For consenting adults. Everything here is optional and tasteful — ideas to talk about and try together or adapt solo, never pressure. Consent, comfort, and communication always come first. This is playful wellbeing, not medical or explicit advice, and it is for anyone, any relationship, any orientation.';

function gamesHTML() {
  return `
    <section class="card bedroom-game">
      <h2>🎲 Spin the spark</h2>
      <p class="hint">A gentle invitation to try together (or adapt for yourself).</p>
      <button class="btn btn-primary" id="bd-spark">Spin the spark</button>
      <p class="bedroom-result" id="bd-spark-out" aria-live="polite"></p>
    </section>
    <section class="card bedroom-game">
      <h2>💬 Truth or dare</h2>
      <p class="hint">Connection first — draw a card, skip any you do not feel like.</p>
      <div class="bedroom-btn-row">
        <button class="btn" id="bd-truth">Truth</button>
        <button class="btn" id="bd-dare">Dare</button>
      </div>
      <p class="bedroom-result" id="bd-td-out" aria-live="polite"></p>
    </section>
    <section class="card bedroom-game">
      <h2>🃏 Yes / No / Maybe</h2>
      <p class="hint">Draw an idea and each say yes, no, or maybe — a calm way to find what you both want.</p>
      <button class="btn btn-primary" id="bd-explore">Draw a card</button>
      <p class="bedroom-result" id="bd-explore-out" aria-live="polite"></p>
    </section>`;
}

function tipsHTML() {
  return `
    <section class="card">
      <details class="fin-lib-details">
        <summary class="fin-lib-summary">
          <span class="fin-lib-summary-txt"><strong>Tips &amp; tricks for the bedroom</strong><small>${TIPS.length} tasteful, body-positive ideas — open when you want</small></span>
          <span class="fin-lib-chevron" aria-hidden="true">▾</span>
        </summary>
        <ul class="bedroom-tips">${TIPS.map((x) => `<li><strong>${esc(x.t)}</strong><span>${esc(x.b)}</span></li>`).join('')}</ul>
      </details>
    </section>`;
}

export function bedroomScreen() {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = `
    <header class="topbar"><a class="back" href="#soul">← Soul</a><h1 class="page-title" tabindex="-1">Playful · for the bedroom</h1></header>
    <main class="narrow bedroom-screen">
      <p class="hint cycle-disclaimer">${DISCLAIMER}</p>
      ${gamesHTML()}
      ${tipsHTML()}
    </main>`;
  const h1 = app.querySelector('.page-title'); if (h1) try { h1.focus(); } catch { /* ok */ }

  const spark = document.getElementById('bd-spark');
  if (spark) spark.addEventListener('click', () => { document.getElementById('bd-spark-out').textContent = pick(SPARKS); });
  const truth = document.getElementById('bd-truth');
  if (truth) truth.addEventListener('click', () => { document.getElementById('bd-td-out').textContent = '💬 ' + pick(TRUTHS); });
  const dare = document.getElementById('bd-dare');
  if (dare) dare.addEventListener('click', () => { document.getElementById('bd-td-out').textContent = '🔥 ' + pick(DARES); });
  const explore = document.getElementById('bd-explore');
  if (explore) explore.addEventListener('click', () => { document.getElementById('bd-explore-out').textContent = pick(EXPLORE); });
}
