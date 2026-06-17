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
  'Undress each other slowly, one layer at a time.',
  'Set a five-minute timer and only kiss until it rings.',
  'Take a warm shower or bath together first.',
  'Narrate what you are about to do before you do it.',
  'Trade places — recreate how your very first time felt.',
  'Keep one hand always touching, wherever you both move.',
  'Let one person keep their eyes closed the whole time.',
  'Pick an outfit you know they love.',
  'Tell them, in detail, exactly what you want to do to them.',
  'Tease everywhere except where they want it most — make them ask.',
  'Use your mouth to explore somewhere new, slowly.',
  'One of you stays fully dressed while the other is not.',
  'Try edging: build them right to the brink, back off, repeat.',
  'Talk dirty in their ear and watch what it does to them.',
  'Pin their hands gently above their head and make them wait.',
  'Blindfold them and keep them guessing where your touch lands next.',
  'Set a rule: they are not allowed to touch you until you say so.',
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
  'What is the most attractive thing I do without realizing it?',
  'When do you feel most confident in your own skin?',
  'What is something new you would feel excited to learn together?',
  'What is a sound or word you love to hear in the moment?',
  'Where is somewhere you have always wanted to be kissed?',
  'What is a slow, non-physical thing that really turns you on?',
  'What is the boldest fantasy you would actually want to act out?',
  'What is the dirtiest thought you have had about me lately?',
  'Where on your body do you most want my mouth right now?',
  'Do you like being in control, or handing it over?',
  'What is the most turned on I have ever made you — and how?',
  'What is one thing you want more of, in detail?',
  'What word or sound from me drives you wild?',
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
  'Plant three slow kisses, anywhere you choose.',
  'Guide their hand to exactly where you want it.',
  'Keep eye contact for one full, unhurried minute.',
  'Give a one-minute foot or hand rub.',
  'Take ten slow breaths together, foreheads touching.',
  'Say one thing you cannot wait to do later.',
  'Use only your mouth on their neck and shoulders for two minutes.',
  'Strip off one item — their choice which.',
  'Whisper exactly what you want to do next, leaving nothing out.',
  'Tease with your fingertips and refuse to go where they ask, for one minute.',
  'Kiss your way slowly downward — they say where to stop.',
  'Take the lead and direct them completely for two minutes.',
  'Show them, hands-on, exactly how you like to be touched.',
  'Keep your hands behind your back and use only your lips.',
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
  'Reading or watching something steamy together first.',
  'A "you are not allowed to touch yet" teasing game.',
  'Keeping the lights on instead of off (or the reverse).',
  'Leaving a playful note or surprise for later.',
  'Using a blindfold or light restraints.',
  'Oral — giving or receiving — as the main event.',
  'Bringing a toy or two into the mix.',
  'Talking dirty out loud the whole time.',
  'Edging and teasing for a long build before letting go.',
  'Role-playing a scenario you both find hot.',
  'A fast, urgent quickie with clothes mostly on.',
  'One of you watching while the other puts on a show.',
];

// Desire dice — roll an action + a place for a playful, spicy combo.
const DICE_ACTIONS = ['Kiss', 'Caress', 'Massage', 'Lick', 'Nibble', 'Tease with your tongue', 'Grip', 'Trace a fingertip along', 'Breathe hotly against', 'Slowly undress to reveal', 'Plant slow kisses down'];
const DICE_SPOTS = ['the neck', 'the collarbone', 'the inner thigh', 'the lower back', 'the chest', 'the stomach', 'the hips', 'behind the ear', 'the jawline', 'wherever they guide you', 'somewhere they have to ask for'];

// Position play — bold but PG-13 ideas to try or adapt; comfort and consent first.
const POSITIONS = [
  'Face to face, wrapped close',
  'One partner on top, setting the pace',
  'From behind, slow and close',
  'Spooning, slow and deep',
  'One bent over the edge of the bed',
  'Seated, one in the other\'s lap',
  'Standing, one lifted against the wall',
  'On hands and knees',
  'Reverse — facing away, on top',
  'Side by side, legs tangled',
  'One leaning back over a stack of pillows',
  'Switch who is in charge halfway through',
];

// Would you rather — playful, spicy bedroom either/ors to talk through.
const WYR = [
  'Would you rather a slow tease or a spontaneous quickie?',
  'Would you rather give oral or receive it first?',
  'Would you rather be tied up or do the tying?',
  'Would you rather candlelight or full daylight?',
  'Would you rather lead tonight or be led?',
  'Would you rather edge for ages or dive right in?',
  'Would you rather dirty talk or be kept quiet?',
  'Would you rather use toys or just hands and mouths?',
  'Would you rather a new spot in the house or the bed?',
  'Would you rather put on a show or be the audience?',
];

// Sensory focus — pick one sense and a spicy way to play with it.
const SENSES = [
  '👀 Sight: keep the lights on and make them watch.',
  '👂 Sound: narrate what you are doing, low and slow.',
  '✋ Touch: blindfold them and let every move land by surprise.',
  '👅 Taste: explore somewhere new with just your mouth.',
  '👃 Scent: wear something they cannot resist on you.',
  '🌡️ Temperature: trail an ice cube, then warm breath, over the skin.',
  '🪶 Texture: silk, a feather, or restraints — pick your tool.',
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
  { t: 'Oral, generously', b: 'Ask what they like, start soft and slow, stay consistent once you find what works, and keep your attention on their reactions. Enthusiasm is the secret ingredient.' },
  { t: 'Most people need direct attention', b: 'For many bodies, especially with a clitoris, the climax route is direct, steady stimulation — not guesswork. Ask, watch, and follow their guidance.' },
  { t: 'Toys are teammates', b: 'A small vibrator or two can add a lot, for any body and any pairing. Bring them in together with zero ego — they are a bonus, not a replacement.' },
  { t: 'Learn to talk dirty', b: 'Start simple — "I love when you..." or "tell me what you want" — and follow the heat. Saying it out loud is often hotter than anything else.' },
  { t: 'Edge for a bigger finish', b: 'Build right to the brink, ease off, and repeat. Drawing it out a few times can make the release dramatically more intense.' },
  { t: 'Tease before you please', b: 'Anticipation is its own pleasure. Touch everywhere except the obvious, make them wait and ask — the build-up does half the work.' },
  { t: 'Negotiate the bold stuff sober and clothed', b: 'Restraints, role-play, anything new — agree on a yes/no/maybe and a safe word beforehand. Planning makes the wild parts safe and even hotter.' },
];

const DISCLAIMER = 'For consenting adults — frank, playful, and as spicy as you like. Everything here is optional: ideas to talk about and try together, or adapt solo, never pressure. Consent, comfort, and communication always come first, and any "no" is honored instantly. This is playful wellbeing, not medical advice — for any body, any relationship, any orientation.';

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
    </section>
    <section class="card bedroom-game">
      <h2>🎲 Desire dice</h2>
      <p class="hint">Roll an action and a place — then take your time with it.</p>
      <button class="btn btn-primary" id="bd-dice">Roll the dice</button>
      <p class="bedroom-result" id="bd-dice-out" aria-live="polite"></p>
    </section>
    <section class="card bedroom-game">
      <h2>🔄 Position play</h2>
      <p class="hint">A tasteful idea to try or adapt — only ever what feels good for you both.</p>
      <button class="btn btn-primary" id="bd-pos">Spin a position</button>
      <p class="bedroom-result" id="bd-pos-out" aria-live="polite"></p>
    </section>
    <section class="card bedroom-game">
      <h2>🤔 Would you rather</h2>
      <p class="hint">A playful either/or to talk through together.</p>
      <button class="btn btn-primary" id="bd-wyr">Ask one</button>
      <p class="bedroom-result" id="bd-wyr-out" aria-live="polite"></p>
    </section>
    <section class="card bedroom-game">
      <h2>🕯️ Sensory focus</h2>
      <p class="hint">Pick a single sense and play with it — slow everything else down.</p>
      <button class="btn btn-primary" id="bd-sense">Pick a sense</button>
      <p class="bedroom-result" id="bd-sense-out" aria-live="polite"></p>
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
  const dice = document.getElementById('bd-dice');
  if (dice) dice.addEventListener('click', () => { document.getElementById('bd-dice-out').textContent = `🎲 ${pick(DICE_ACTIONS)} ${pick(DICE_SPOTS)}.`; });
  const pos = document.getElementById('bd-pos');
  if (pos) pos.addEventListener('click', () => { document.getElementById('bd-pos-out').textContent = '🔄 ' + pick(POSITIONS); });
  const wyr = document.getElementById('bd-wyr');
  if (wyr) wyr.addEventListener('click', () => { document.getElementById('bd-wyr-out').textContent = pick(WYR); });
  const sense = document.getElementById('bd-sense');
  if (sense) sense.addEventListener('click', () => { document.getElementById('bd-sense-out').textContent = pick(SENSES); });
}
