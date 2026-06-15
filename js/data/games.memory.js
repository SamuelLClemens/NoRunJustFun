// Interactive memory games for the Memory learning track. These are PRACTICE — the
// lessons are explicit that games are fun warm-ups, not a proven cognitive cure.
// Each game exposes build(onComplete) -> a DOM element and calls
// onComplete({ won, score, label }) when the player finishes. Games self-clean their
// timers and guard against firing after the player navigates away (root.isConnected).
// Plain DOM (no deps); buttons are keyboard-operable.

function shuffle(a) {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

// ---- Game 1: Memory Match (concentration / recognition memory) -----------
function buildMatch(onComplete) {
  const SYMBOLS = ['🌱', '🌸', '🌼', '🍃', '🌻', '🪴', '🐝', '🦋'];
  const NAMES = { '🌱': 'seedling', '🌸': 'blossom', '🌼': 'daisy', '🍃': 'leaf', '🌻': 'sunflower', '🪴': 'plant', '🐝': 'bee', '🦋': 'butterfly' };
  const deck = shuffle(SYMBOLS.concat(SYMBOLS));
  const root = document.createElement('div');
  root.className = 'game game-match';
  let first = null, lock = false, moves = 0, matched = 0, done = false;

  const help = document.createElement('p');
  help.className = 'game-help hint';
  help.textContent = 'Flip two cards at a time and find every matching pair.';
  const status = document.createElement('p');
  status.className = 'game-status';
  status.setAttribute('role', 'status');
  const grid = document.createElement('div');
  grid.className = 'match-grid';

  const setStatus = () => { status.textContent = 'Pairs found: ' + matched + ' of ' + SYMBOLS.length + ' · moves: ' + moves; };

  deck.forEach((sym) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'match-card';
    card.dataset.sym = sym;
    card.setAttribute('aria-label', 'Memory card, face down');
    const face = document.createElement('span');
    face.setAttribute('aria-hidden', 'true');
    card.appendChild(face);
    card.addEventListener('click', () => {
      if (lock || done || card.classList.contains('matched') || card === first) return;
      card.classList.add('flipped'); face.textContent = sym;
      card.setAttribute('aria-label', 'Memory card, ' + (NAMES[sym] || 'symbol'));
      if (!first) { first = card; return; }
      moves++;
      if (first.dataset.sym === sym) {
        first.classList.add('matched'); card.classList.add('matched');
        first = null; matched++; setStatus();
        if (matched === SYMBOLS.length) {
          done = true;
          setTimeout(() => { if (root.isConnected) onComplete({ won: true, score: moves, label: 'Solved in ' + moves + ' moves' }); }, 450);
        }
      } else {
        setStatus();
        lock = true;
        const a = first, b = card;
        setTimeout(() => {
          if (!root.isConnected) return;
          [a, b].forEach((c) => { c.classList.remove('flipped'); c.querySelector('span').textContent = ''; c.setAttribute('aria-label', 'Memory card, face down'); });
          first = null; lock = false;
        }, 850);
      }
    });
    grid.appendChild(card);
  });

  setStatus();
  root.append(help, status, grid);
  return root;
}

// ---- Game 2: Sequence Recall (working-memory span) -----------------------
function buildSequence(onComplete) {
  const TILES = 4;
  const WIN_AT = 4;   // fully repeat a sequence this long to count as a win
  const CAP = 9;      // a perfect run ends here
  const root = document.createElement('div');
  root.className = 'game game-sequence';
  const seq = [];
  let input = 0, showing = false, done = false, best = 0;

  const help = document.createElement('p');
  help.className = 'game-help hint';
  help.textContent = 'Watch the tiles light up, then tap them back in the same order. The sequence grows each round — reach ' + WIN_AT + ' to win.';
  const status = document.createElement('p');
  status.className = 'game-status';
  status.setAttribute('role', 'status');
  const grid = document.createElement('div');
  grid.className = 'seq-grid';
  const tiles = [];
  for (let i = 0; i < TILES; i++) {
    const t = document.createElement('button');
    t.type = 'button';
    t.className = 'seq-tile';
    t.dataset.i = String(i);
    t.setAttribute('aria-label', 'Tile ' + (i + 1));
    t.addEventListener('click', () => handleTap(i));
    tiles.push(t); grid.appendChild(t);
  }
  const startBtn = document.createElement('button');
  startBtn.type = 'button';
  startBtn.className = 'btn btn-primary';
  startBtn.textContent = 'Start';

  const flash = (i) => new Promise((res) => {
    if (!root.isConnected) return res();
    tiles[i].classList.add('lit');
    setTimeout(() => { if (root.isConnected) tiles[i].classList.remove('lit'); setTimeout(res, 180); }, 430);
  });

  async function playSequence() {
    showing = true;
    status.textContent = 'Watch the sequence…';
    await new Promise((r) => setTimeout(r, 500));
    for (let k = 0; k < seq.length; k++) { if (!root.isConnected) return; await flash(seq[k]); }
    if (!root.isConnected) return;
    showing = false; input = 0;
    status.textContent = 'Your turn — repeat ' + seq.length + ' in order';
  }

  function nextRound() {
    seq.push(Math.floor(Math.random() * TILES));
    playSequence();
  }

  function finish(score) {
    if (done) return; done = true;
    const won = score >= WIN_AT;
    setTimeout(() => { if (root.isConnected) onComplete({ won, score, label: 'Recalled a sequence of ' + score }); }, 550);
  }

  function handleTap(i) {
    if (showing || done) return;
    tiles[i].classList.add('lit');
    setTimeout(() => { if (root.isConnected) tiles[i].classList.remove('lit'); }, 160);
    if (i === seq[input]) {
      input++;
      if (input === seq.length) {
        best = seq.length;
        if (seq.length >= CAP) { finish(best); return; }
        status.textContent = 'Nice! Next round…';
        setTimeout(() => { if (root.isConnected) nextRound(); }, 650);
      }
    } else {
      status.textContent = 'Not quite.';
      finish(best);
    }
  }

  startBtn.addEventListener('click', () => { startBtn.remove(); nextRound(); });
  status.textContent = 'Press Start when you are ready.';
  root.append(help, status, grid, startBtn);
  return root;
}

export const MEMORY_GAMES = [
  { id: 'match', name: 'Memory Match', blurb: 'Flip cards two at a time and find every matching pair.', icon: '🃏', build: buildMatch },
  { id: 'sequence', name: 'Sequence Recall', blurb: 'Watch a growing pattern light up, then tap it back in order.', icon: '🔢', build: buildSequence },
];
