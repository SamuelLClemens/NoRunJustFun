// Data-driven concept games for the Mind learning tracks. Three generic,
// dependency-free, keyboard-operable game types built from a DATA config, so each
// subject simply declares its games as data (see games.<subject>.js):
//
//   quiz  — one scenario at a time; pick the best answer; see why. Teaches by
//           rehearsing realistic choices.
//   sort  — categorise each item into the right bucket (tap-based, not drag, so it
//           is keyboard- and screen-reader friendly).
//   order — arrange steps into the single correct sequence.
//
// makeGame(spec) turns a plain spec object ({ id, name, blurb, icon, type, ... })
// into the { id, name, blurb, icon, win?, build } shape the hub + gameScreen expect.
// build(onComplete) renders a DOM element and calls onComplete({ won, score, label })
// when finished. Late callbacks/timers are guarded by root.isConnected, so navigating
// away mid-game is always safe. Games are PRACTICE, framed honestly by the lessons.

function shuffle(a) {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

// ---- Quiz: pick the best answer to a scenario, with feedback -------------
function buildQuiz(config, onComplete) {
  const rounds = config.rounds || [];
  const threshold = config.winThreshold || Math.ceil(rounds.length * 0.7);
  const root = el('div', 'game game-quiz');
  const help = el('p', 'game-help hint', config.intro || 'Pick the best answer — you will see why after each one.');
  const status = el('p', 'game-status'); status.setAttribute('role', 'status');
  const stage = el('div', 'quiz-stage');
  root.append(help, status, stage);
  let i = 0, score = 0, done = false;

  const setStatus = () => { status.textContent = 'Question ' + (i + 1) + ' of ' + rounds.length + ' · score ' + score; };

  const render = () => {
    if (done) return;
    stage.innerHTML = '';
    const r = rounds[i];
    setStatus();
    const q = el('p', 'quiz-prompt', r.prompt);
    const opts = el('div', 'quiz-opts');
    const fb = el('p', 'quiz-feedback'); fb.setAttribute('role', 'status');
    const next = el('button', 'btn btn-primary quiz-next', i + 1 < rounds.length ? 'Next' : 'See result');
    next.type = 'button'; next.style.display = 'none';
    const correctText = (r.options.find((o) => o.correct) || {}).text;
    shuffle(r.options).forEach((o) => {
      const b = el('button', 'quiz-opt', o.text); b.type = 'button';
      b.addEventListener('click', () => {
        if (done || b.disabled) return;
        Array.from(opts.children).forEach((c) => { c.disabled = true; });
        if (o.correct) { b.classList.add('correct'); score++; }
        else {
          b.classList.add('wrong');
          Array.from(opts.children).forEach((c) => { if (c.textContent === correctText) c.classList.add('correct'); });
        }
        fb.textContent = o.feedback || (o.correct ? 'Correct.' : 'Not quite.');
        setStatus();
        next.style.display = '';
        next.focus();
      });
      opts.appendChild(b);
    });
    next.addEventListener('click', () => { i++; if (i >= rounds.length) finish(); else render(); });
    stage.append(q, opts, fb, next);
  };

  const finish = () => {
    if (done) return; done = true;
    const won = score >= threshold;
    setTimeout(() => { if (root.isConnected) onComplete({ won, score, label: 'Scored ' + score + ' of ' + rounds.length }); }, 350);
  };

  render();
  return root;
}

// ---- Sort: tap the bucket each item belongs in --------------------------
function buildSort(config, onComplete) {
  const items = config.items || [];
  const buckets = config.buckets || [];
  const order = shuffle(items);
  const threshold = config.winThreshold || Math.ceil(order.length * 0.8);
  const root = el('div', 'game game-sort');
  const help = el('p', 'game-help hint', config.intro || 'Where does each one belong? Tap a category.');
  const status = el('p', 'game-status'); status.setAttribute('role', 'status');
  const stage = el('div', 'sort-stage');
  root.append(help, status, stage);
  let i = 0, score = 0, done = false;

  const setStatus = () => { status.textContent = 'Item ' + (i + 1) + ' of ' + order.length + ' · score ' + score; };

  const render = () => {
    if (done) return;
    stage.innerHTML = '';
    const it = order[i];
    setStatus();
    const card = el('div', 'sort-item', it.text);
    const opts = el('div', 'sort-buckets');
    const fb = el('p', 'quiz-feedback'); fb.setAttribute('role', 'status');
    const next = el('button', 'btn btn-primary quiz-next', i + 1 < order.length ? 'Next' : 'See result');
    next.type = 'button'; next.style.display = 'none';
    const correctLabel = (buckets.find((x) => x.id === it.bucket) || {}).label;
    buckets.forEach((bk) => {
      const b = el('button', 'sort-bucket', bk.label); b.type = 'button';
      b.addEventListener('click', () => {
        if (done || b.disabled) return;
        Array.from(opts.children).forEach((c) => { c.disabled = true; });
        if (it.bucket === bk.id) { b.classList.add('correct'); score++; }
        else {
          b.classList.add('wrong');
          Array.from(opts.children).forEach((c) => { if (c.textContent === correctLabel) c.classList.add('correct'); });
        }
        fb.textContent = it.feedback || (it.bucket === bk.id ? 'Correct.' : 'That one belongs elsewhere.');
        setStatus();
        next.style.display = '';
        next.focus();
      });
      opts.appendChild(b);
    });
    next.addEventListener('click', () => { i++; if (i >= order.length) finish(); else render(); });
    stage.append(card, opts, fb, next);
  };

  const finish = () => {
    if (done) return; done = true;
    const won = score >= threshold;
    setTimeout(() => { if (root.isConnected) onComplete({ won, score, label: 'Sorted ' + score + ' of ' + order.length + ' correctly' }); }, 350);
  };

  render();
  return root;
}

// ---- Order: tap the steps into the correct sequence ---------------------
function buildOrder(config, onComplete) {
  const steps = config.steps || [];
  const root = el('div', 'game game-order');
  const help = el('p', 'game-help hint', config.prompt || 'Tap the steps in the right order, first to last.');
  const status = el('p', 'game-status'); status.setAttribute('role', 'status');
  const answer = el('ol', 'order-answer');
  const pool = el('div', 'order-pool');
  const actions = el('div', 'game-done-btns');
  root.append(help, status, answer, pool, actions);
  let chosen = [], done = false;

  const reset = () => {
    chosen = []; done = false;
    answer.innerHTML = ''; pool.innerHTML = ''; actions.innerHTML = '';
    status.textContent = 'Tap them in order, first to last.';
    shuffle(steps.map((s, idx) => ({ s, idx }))).forEach((o) => {
      const b = el('button', 'order-chip', o.s); b.type = 'button';
      b.addEventListener('click', () => {
        if (done || b.disabled) return;
        b.disabled = true; b.classList.add('used');
        chosen.push(o.idx);
        answer.appendChild(el('li', 'order-pick', o.s));
        if (chosen.length === steps.length) check();
      });
      pool.appendChild(b);
    });
  };

  const check = () => {
    if (done) return; done = true;
    let correctCount = 0;
    Array.from(answer.children).forEach((li, pos) => {
      const ok = chosen[pos] === pos; // steps[] is the correct order, so position p should hold original index p
      if (ok) correctCount++;
      li.classList.add(ok ? 'correct' : 'wrong');
    });
    const won = correctCount === steps.length;
    status.textContent = won ? 'Perfect order!' : (correctCount + ' of ' + steps.length + ' in the right place.');
    if (!won) {
      const again = el('button', 'btn', 'Try again'); again.type = 'button';
      again.addEventListener('click', () => reset());
      actions.appendChild(again);
    }
    const cont = el('button', 'btn btn-primary', 'Continue'); cont.type = 'button';
    cont.addEventListener('click', () => {
      setTimeout(() => { if (root.isConnected) onComplete({ won, score: correctCount, label: correctCount + ' of ' + steps.length + ' in order' }); }, 10);
    });
    actions.appendChild(cont);
  };

  reset();
  return root;
}

// Turn a plain spec into the game object the hub + gameScreen consume.
export function makeGame(spec) {
  const build = (onComplete) => {
    if (spec.type === 'quiz') return buildQuiz(spec, onComplete);
    if (spec.type === 'sort') return buildSort(spec, onComplete);
    if (spec.type === 'order') return buildOrder(spec, onComplete);
    const e = el('div', 'game'); e.textContent = 'This game is unavailable.'; return e;
  };
  return { id: spec.id, name: spec.name, blurb: spec.blurb, icon: spec.icon, win: spec.win, lose: spec.lose, build };
}
