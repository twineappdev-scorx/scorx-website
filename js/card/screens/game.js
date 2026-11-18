// Live game view (grid scoreboard) + full-time summary.
import * as timer from '../timer.js';
import { SPORTS, total } from '../sports.js';

const I = {
  back: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M9 3L5 7.5l4 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  undo: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3L2 5.5 5 8M2 5.5h6.5a3 3 0 010 6H5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  more: '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="3" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="13" cy="8" r="1.5" fill="currentColor"/></svg>',
  play: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M4.5 2.8v9.4L12 7.5z" fill="currentColor" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  pause: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M4.5 3v9M10.5 3v9" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
  next: '<svg width="17" height="13" viewBox="0 0 17 13" fill="none" aria-hidden="true"><path d="M2 2l6 4.5L2 11M11 2v9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  flag: '<svg width="17" height="15" viewBox="0 0 17 15" fill="none" aria-hidden="true"><path d="M3 14V2M3 2.5h9l-2 3 2 3H3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

let root, ctx, el = {}, unsub = null, tick = null, sheetCleanup = null;
let lastPts = null;      // for the aria-live announcement

export function mount(node, c) {
  root = node; ctx = c;
  root.innerHTML = `
    <div class="gm-hdr">
      <button type="button" class="icbtn" data-act="back" aria-label="Back to start. The game stays saved.">${I.back}</button>
      <div class="gm-title"><div class="gm-t1" data-t1></div><div class="gm-t2" data-t2></div></div>
      <button type="button" class="undo" data-act="undo" aria-label="Undo last score"><span aria-hidden="true">${I.undo}</span><span class="badge" data-undo-n>0</span></button>
      <button type="button" class="icbtn" data-act="more" aria-label="More options" aria-haspopup="dialog">${I.more}</button>
    </div>
    <h1 class="sr-only" data-h1>Live game</h1>

    <div data-live>
      <div class="timer">
        <div class="timer-row">
          <div class="clock"><span class="qchip" data-chip></span><span class="time" data-time role="timer" aria-label="Time remaining">0:00</span><span class="rem" data-rem>remaining</span></div>
          <div class="ctrl">
            <button type="button" class="pause" data-act="toggle" aria-label="Start the clock"></button>
            <button type="button" class="next" data-act="next"><span data-next-icon></span><span class="nl" data-next-label>Next</span></button>
          </div>
        </div>
        <div class="pbar-wrap">
          <div class="pbar-meta"><span data-elapsed>0:00 elapsed</span><span data-plen></span></div>
          <div class="pbar"><div class="fill" data-fill></div></div>
        </div>
      </div>

      <div class="board">
        <div class="board-top">
          <div class="live"><span class="dot"></span><span class="lb">Live</span></div>
          <div class="hint" data-hint></div>
        </div>
        <div class="sb-grid" data-grid></div>
      </div>
      <p class="period-line" data-pline hidden></p>
    </div>

    <div class="ft" data-ft hidden>
      <span class="eyebrow ft__eyebrow">Full time</span>
      <div class="ft__board">
        <div class="ft__team"><span class="ft__name" data-ft-name="home"></span><span class="ft__score" data-ft-score="home"></span><span class="ft__bd" data-ft-bd="home"></span></div>
        <span class="ft__dash" aria-hidden="true">–</span>
        <div class="ft__team"><span class="ft__name" data-ft-name="away"></span><span class="ft__score" data-ft-score="away"></span><span class="ft__bd" data-ft-bd="away"></span></div>
      </div>
      <p class="period-line" data-ft-pline hidden></p>
      <button type="button" class="btn btn--primary btn--block" data-act="card">Make the card</button>
      <button type="button" class="btn btn--quiet btn--block ft__back" data-act="unfinish">Back to the game</button>
    </div>

    <div class="sr-only" aria-live="polite" role="status" data-live-region></div>`;

  for (const k of ['t1', 't2', 'h1', 'undo-n', 'chip', 'time', 'rem', 'elapsed', 'plen', 'fill', 'hint', 'grid', 'pline', 'live', 'ft', 'ft-pline', 'live-region', 'next-label', 'next-icon'])
    el[k] = root.querySelector(`[data-${k}]`);
  el.undo = root.querySelector('[data-act="undo"]');
  el.toggle = root.querySelector('[data-act="toggle"]');
  el.next = root.querySelector('[data-act="next"]');
  el.timer = root.querySelector('.timer');

  root.addEventListener('click', onClick);
}

// ── Lifecycle ──────────────────────────────────────────────
export function enter() {
  buildGrid();
  const s = ctx.store.getState();
  lastPts = { home: ctx.store.points('home'), away: ctx.store.points('away') };
  timer.settleIfExpired();
  timer.attach();
  unsub = ctx.store.subscribe(render);
  tick = setInterval(paintClock, 250);
  render();
}

export function leave() {
  if (unsub) { unsub(); unsub = null; }
  if (tick) { clearInterval(tick); tick = null; }
  closeSheet();
  timer.detach();
}

// ── Building ───────────────────────────────────────────────
function buildGrid() {
  const s = ctx.store.getState(), sp = SPORTS[s.sport];
  const n = sp.buttons.length + 1;
  el.grid.style.setProperty('--cols', n);
  el.grid.dataset.cols = n;
  let html = `<div class="sb-head team"></div>` +
    sp.buttons.map(b => `<div class="sb-head">${b.label}</div>`).join('') + `<div class="sb-head pts">PTS</div>`;
  for (const team of ['home', 'away']) {
    html += `<div class="sb-team" data-name="${team}"></div>` +
      sp.buttons.map(b => `<button type="button" class="plate tap" data-team="${team}" data-key="${b.key}"><span data-count></span></button>`).join('') +
      `<div class="plate pts" data-pts="${team}"><span></span></div>`;
  }
  el.grid.innerHTML = html;
  const labels = sp.buttons.map(b => b.label);
  el.hint.textContent = labels.length === 1
    ? `Tap ${labels[0]} to score` : `Tap ${labels.slice(0, -1).join(', ')} or ${labels[labels.length - 1]} to score`;
}

// ── Rendering ──────────────────────────────────────────────
const teamName = (s, t) => s[t].name.trim() || (t === 'home' ? 'Home' : 'Away');

function periodTag(s, snap, i) {
  const sp = SPORTS[s.sport];
  if (snap.final) return 'FT';
  if (sp.periods === 4) return ['QT', 'HT', '3QT'][snap.period - 1] || `${sp.periodLabel}${snap.period}`;
  if (sp.periods === 2) return 'HT';
  return `${sp.periodLabel}${snap.period}`;
}
const fmtScore = (s, counts) => s.sport === 'afl' ? SPORTS.afl.breakdown(counts) : String(total(s.sport, counts));

function periodLine(s, includeFinal) {
  const snaps = s.periodScores.filter(p => includeFinal || !p.final);
  return snaps.map((p, i) => `${periodTag(s, p, i)} ${fmtScore(s, p.home)} – ${fmtScore(s, p.away)}`).join('  ·  ');
}

function render() {
  const s = ctx.store.getState(), sp = SPORTS[s.sport];
  const home = teamName(s, 'home'), away = teamName(s, 'away');

  // header
  const comp = s.competition.trim(), rd = s.round.trim();
  el.t1.textContent = comp && rd ? `${comp} · Round ${rd}` : comp || (rd ? `Round ${rd}` : `${home} v ${away}`);
  el.t2.textContent = `${sp.name} · ${home} v ${away}`;
  const n = s.history.length;
  el['undo-n'].textContent = n;
  el.undo.disabled = n === 0 || s.finished;
  el.undo.hidden = s.finished;
  el.undo.setAttribute('aria-label', n ? `Undo last score, ${n} to undo` : 'Undo last score');

  el.live.hidden = s.finished;
  el.ft.hidden = !s.finished;
  el.h1.textContent = s.finished ? 'Full time' : 'Live game';

  if (s.finished) { renderFullTime(s, sp, home, away); return; }

  // grid
  for (const team of ['home', 'away']) {
    const nm = el.grid.querySelector(`[data-name="${team}"]`);
    nm.textContent = teamName(s, team); nm.title = teamName(s, team);
    el.grid.querySelectorAll(`.plate.tap[data-team="${team}"]`).forEach(p => {
      const b = sp.buttons.find(x => x.key === p.dataset.key), c = s[team].counts[b.key] || 0;
      p.firstChild.textContent = c;
      p.setAttribute('aria-label', `${teamName(s, team)} ${b.name}, ${c}`);
    });
    el.grid.querySelector(`[data-pts="${team}"] span`).textContent = ctx.store.points(team);
  }
  const ph = ctx.store.points('home'), pa = ctx.store.points('away');
  if (lastPts && (lastPts.home !== ph || lastPts.away !== pa)) el['live-region'].textContent = `${home} ${ph}, ${away} ${pa}`;
  lastPts = { home: ph, away: pa };

  // period line
  const line = periodLine(s, false);
  el.pline.hidden = !line; el.pline.textContent = line;

  // timer chrome
  const last = s.clock.period >= sp.periods;
  el.chip.textContent = `${sp.periodLabel}${s.clock.period}`;
  el['next-label'].textContent = last ? 'Full time' : 'Next';
  el['next-icon'].innerHTML = last ? I.flag : I.next;
  el.next.setAttribute('aria-label', last ? 'Finish the game: full time' : `End ${sp.periodName.toLowerCase()} and go to the next`);
  el.plen.textContent = `${timer.fmt(s.clock.periodMs)} ${sp.periodName.toLowerCase()}`;
  paintClock();
}

function paintClock() {
  if (!el.time || (unsub === null)) return;
  timer.settleIfExpired();
  const s = ctx.store.getState();
  if (s.finished) return;
  const rem = timer.remaining(), run = timer.isRunning(), done = rem <= 0;
  const text = timer.fmtRemaining(rem);
  if (el.time.textContent !== text) el.time.textContent = text;
  el.rem.textContent = done ? 'Time' : 'remaining';
  el.timer.classList.toggle('is-zero', done);
  el.timer.classList.toggle('is-running', run);
  const el_ms = Math.min(timer.elapsed(), s.clock.periodMs);
  el.elapsed.textContent = `${timer.fmt(el_ms)} elapsed`;
  el.fill.style.width = `${Math.min(100, (el_ms / s.clock.periodMs) * 100)}%`;
  const label = run ? 'Pause the clock' : 'Start the clock';
  if (el.toggle.dataset.state !== String(run)) {
    el.toggle.dataset.state = String(run);
    el.toggle.innerHTML = run ? I.pause : I.play;
    el.toggle.setAttribute('aria-label', label);
  }
}

function renderFullTime(s, sp, home, away) {
  for (const t of ['home', 'away']) {
    root.querySelector(`[data-ft-name="${t}"]`).textContent = teamName(s, t);
    root.querySelector(`[data-ft-score="${t}"]`).textContent = ctx.store.points(t);
    const bd = sp.breakdown(s[t].counts);
    root.querySelector(`[data-ft-bd="${t}"]`).textContent = bd;
  }
  const line = periodLine(s, false);
  el['ft-pline'].hidden = !line; el['ft-pline'].textContent = line;
}

// ── Actions ────────────────────────────────────────────────
function snapshot(s, final) {
  s.periodScores.push({
    period: s.clock.period, final: !!final,
    home: { ...s.home.counts }, away: { ...s.away.counts },
  });
}

function finishGame() {
  timer.pause();
  ctx.store.update(s => { snapshot(s, true); s.finished = true; });
  const b = root.querySelector('[data-act="card"]'); if (b) b.focus();
}

function unfinish() {
  ctx.store.update(s => {
    const i = s.periodScores.length - 1;
    if (i >= 0 && s.periodScores[i].final) s.periodScores.pop();
    s.finished = false;
  });
}

function onScore(btn) {
  const { team, key } = btn.dataset;
  ctx.store.score(team, key);
  navigator.vibrate?.(10);
  for (const node of [btn.firstChild, el.grid.querySelector(`[data-pts="${team}"] span`)]) {
    node.classList.remove('bump'); void node.offsetWidth; node.classList.add('bump');
  }
}

function onClick(e) {
  const plate = e.target.closest('.plate.tap');
  if (plate) return onScore(plate);
  const b = e.target.closest('[data-act]');
  if (!b) return;
  switch (b.dataset.act) {
    case 'back': ctx.go('start'); break;
    case 'undo': ctx.store.undo(); break;
    case 'toggle': timer.toggle(); break;
    case 'next': {
      const s = ctx.store.getState();
      if (s.clock.period >= SPORTS[s.sport].periods) finishGame();
      else timer.nextPeriod(st => snapshot(st, false));
      break;
    }
    case 'more': openSheet(); break;
    case 'card': ctx.go('composer'); break;
    case 'unfinish': unfinish(); break;
  }
}

function openSheet() {
  closeSheet();
  const scrim = document.createElement('div');
  scrim.className = 'sheet-scrim';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true'); sheet.setAttribute('aria-labelledby', 'gm-sheet-t');
  sheet.innerHTML = `<h3 id="gm-sheet-t">Game options</h3><p>Ending now takes the score as it stands and moves on to the card.</p>
    <div class="sheet__actions"><button type="button" class="btn btn--primary btn--block" data-sheet="end">End game now (full time)</button>
    <button type="button" class="btn btn--quiet btn--block" data-sheet="cancel">Cancel</button></div>`;
  const onKey = ev => { if (ev.key === 'Escape') closeSheet(); };
  scrim.addEventListener('click', closeSheet);
  sheet.addEventListener('click', ev => {
    const b = ev.target.closest('[data-sheet]');
    if (!b) return;
    closeSheet();
    if (b.dataset.sheet === 'end') finishGame();
  });
  document.addEventListener('keydown', onKey);
  document.body.append(scrim, sheet);
  sheetCleanup = () => { scrim.remove(); sheet.remove(); document.removeEventListener('keydown', onKey); };
  sheet.querySelector('[data-sheet="cancel"]').focus();
}
function closeSheet() { if (sheetCleanup) { sheetCleanup(); sheetCleanup = null; } }
