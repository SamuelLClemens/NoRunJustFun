// Tutorial ("how to use the site") and FAQ screens.
//
// Loaded on demand from the router (#tutorial / #faq) so this copy never rides the boot
// path. Both are static renders into #app, styled with the app's existing card/topbar
// vocabulary. The FAQ's privacy claims are deliberately factual and conservative — every
// statement here is true of the shipped code: all state lives in localStorage + an
// on-device IndexedDB store; there is no account, server, analytics, or tracking; the
// lifelike voice and journal transcription run on-device; and the ONLY network endpoints
// the app can reach are the opt-in model CDNs (see _headers connect-src and
// docs/security-headers.md), which it downloads FROM — never uploading anything about you.

import { store } from './state.js';
import { getCharacter } from './characters.js';

const app = document.getElementById('app');

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function coachName() {
  try { return getCharacter(store.profile.character).name; } catch { return 'your coach'; }
}

// ----------------------------------------------------------------- Tutorial

export function tutorialScreen() {
  const coach = esc(coachName());
  const steps = [
    {
      ic: '🌱', title: 'Welcome',
      body: `<strong>Vernal Plot</strong> is a free, private companion for your body, mind, and soul — your plot, in bloom. There is no account and nothing to sign up for — just open it and begin. Everything you do stays on this device.`,
    },
    {
      ic: '🧭', title: 'Pick a pillar',
      body: `From the home screen, choose one of three ways to grow: <strong>Body</strong> to move (gentle to vigorous, no equipment), <strong>Mind</strong> to learn (money, parenting, communication, memory, and more), or <strong>Soul</strong> to be still (meditation and calm).`,
    },
    {
      ic: '⏱️', title: 'Choose how long you have',
      body: `Each pillar asks how many minutes you have today. Short or long, ${coach} guides you the whole way. Every move and every lesson has a skip button — skipping is self-care, never failure.`,
    },
    {
      ic: '🎚️', title: 'Learn at your level',
      body: `Inside a lesson you will see two buttons: <strong>“Explain it simpler”</strong> re-explains the idea in plain, everyday words, and <strong>“Go deeper”</strong> opens it up at a more advanced, university level. Tap either one any time you want a point re-explained.`,
    },
    {
      ic: '💚', title: 'Your coach and voice',
      body: `Choose your coach and voice in <a href="#settings">Settings</a>. On capable devices a warm, lifelike voice turns on by itself — entirely on this device. Captions always stay on, and you can mute the voice whenever you like.`,
    },
    {
      ic: '🪴', title: 'Grow your garden',
      body: `Every session you finish grows your garden and adds a day to your streak. It grows by <strong>consistency, never intensity</strong>. Miss a day? A gentle grace keeps your streak from breaking. This is a place to be kind to yourself.`,
    },
    {
      ic: '📖', title: 'Make it yours on the You page',
      body: `<a href="#you">You</a> holds your name, a private <a href="#journal">journal</a> you can type or speak (it becomes a book you can read or hear in ${coach}’s voice), gentle meal notes, optional cycle tracking, and a quiet picture of the days you showed up.`,
    },
    {
      ic: '🔒', title: 'Private by design',
      body: `Nothing you do here leaves your device. No account, no server, no tracking. See the <a href="#faq">FAQ</a> for exactly how your privacy is protected.`,
    },
  ];

  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">How to use the app</h1></header>
    <main class="narrow help-screen">
      <p class="hint help-intro">A two-minute tour. You can return here any time from the home screen or Settings.</p>
      ${steps.map((s, i) => `
        <section class="card help-step">
          <div class="help-step-head">
            <span class="help-num" aria-hidden="true">${i + 1}</span>
            <h2 class="help-step-title"><span class="help-ic" aria-hidden="true">${s.ic}</span> ${esc(s.title)}</h2>
          </div>
          <p>${s.body}</p>
        </section>`).join('')}
      <section class="card help-cta">
        <p>That is everything you need. Ready when you are.</p>
        <div class="help-links">
          <a class="btn btn-primary" href="#">Start</a>
          <a class="btn" href="#faq">Read the FAQ</a>
          <a class="btn" href="#safety">Safety notice</a>
        </div>
      </section>
    </main>`;
}

// ----------------------------------------------------------------- FAQ

export function faqScreen() {
  const privacy = [
    `Everything you do — your progress, journal entries, voice recordings, meal notes, and cycle logs — is stored only on this device, inside your browser. There is no account and no server holding any of it.`,
    `No analytics, no trackers, no ads, and no third-party scripts. The app never measures, profiles, or reports what you do.`,
    `The lifelike coach voice and the journal’s voice-to-text both run <strong>on your device</strong>. Your recordings and words are processed locally and are never uploaded.`,
    `The only thing the app ever fetches from the internet is the optional voice and transcription model files, and only if your device opts in. That download pulls files toward you — it sends nothing about you — and once cached, the feature works offline.`,
    `You can erase everything in one tap: <a href="#settings">Settings → Reset my data</a> clears both the on-device storage and the recordings store.`,
    `Once it has loaded, the app works fully offline, and it honors your device’s Data Saver and reduced-motion settings.`,
  ];

  const qa = [
    { q: 'Is it free?', a: `Yes, completely. There is no subscription, no account, and no ads.` },
    { q: 'Do I need to sign up or log in?', a: `No. There are no accounts. Your progress simply lives on this device.` },
    { q: 'Is my data really private?', a: `Yes — see “Your privacy” above. In short: it stays on your device, and there is nowhere for it to be sent.` },
    { q: 'What happens if I clear my browser or switch devices?', a: `Because your data is stored only on this device, clearing your browser’s site data or uninstalling the app removes it, and it does not follow you to another device. That is the honest trade-off for having no server and no account.` },
    { q: 'How do the garden and streak work?', a: `Every session you finish grows your garden and counts the day. It rewards <strong>consistency, never intensity</strong>, and a gentle grace protects your streak after an occasional missed day. Skipping a move never counts against you.` },
    { q: 'What do “Explain it simpler” and “Go deeper” do?', a: `Inside a lesson, those buttons re-explain the current idea — in plainer everyday words, or at a more advanced, university level. Tap whichever you need, whenever you need it.` },
    { q: 'Can I change my coach or turn the voice off?', a: `Yes, both in <a href="#settings">Settings</a>. Captions always stay on, so you can follow along silently.` },
    { q: 'How does the journal work?', a: `On the <a href="#you">You</a> page. You can type an entry or record your voice; each is time-stamped and becomes a book you can read or hear in your coach’s voice. You can edit any entry — it is your journal.` },
    { q: 'Is the meal or cycle tracking medical?', a: `No. Meal notes are gentle, free-text reminders — no calories, macros, or targets. Cycle tracking is optional and descriptive only; it does not predict ovulation or fertile days, is not birth control, and does not replace a clinician.` },
    { q: 'Does this give medical or financial advice?', a: `No. It offers gentle, general guidance for learning and wellbeing. For medical, legal, or financial decisions, please talk with a qualified professional.` },
    { q: 'How do I use it offline?', a: `Once the app has loaded once, you can install it to your home screen and it works without a connection.` },
  ];

  app.innerHTML = `
    <header class="topbar"><a class="back" href="#">← Back</a><h1 class="page-title">Questions &amp; privacy</h1></header>
    <main class="narrow help-screen">
      <section class="card privacy-hero" aria-label="Your privacy">
        <h2><span aria-hidden="true">🔒</span> Your privacy — built in, not promised</h2>
        <p class="hint">These are not marketing claims. They are simply how the app is built.</p>
        <ul class="privacy-list">
          ${privacy.map((p) => `<li>${p}</li>`).join('')}
        </ul>
      </section>

      <h2 class="help-faq-heading">Frequently asked</h2>
      ${qa.map((item) => `
        <details class="card faq-item">
          <summary>${esc(item.q)}</summary>
          <div class="faq-answer"><p>${item.a}</p></div>
        </details>`).join('')}

      <section class="card help-cta">
        <div class="help-links">
          <a class="btn btn-primary" href="#tutorial">How to use the app</a>
          <a class="btn" href="#safety">Safety notice</a>
        </div>
      </section>
    </main>`;
}
