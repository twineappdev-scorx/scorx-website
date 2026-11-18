// Result-only entry: sport, names, final score, then straight to the composer. Aim: under 30 seconds.
import { SPORTS, total } from '../sports.js';
import { applySport, sportSegmentHTML, teamFieldHTML, wireTeamFields, fillTeamFields } from './setup.js';

const BACK = '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M9 3L5 7.5l4 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

let root, ctx;

export function mount(el, c) {
  root = el; ctx = c;
  root.innerHTML = `
    <button type="button" class="back-link" data-act="back">${BACK}<span>Back</span></button>
    <h1 class="screen-title">Enter the <em>result</em></h1>
    <p class="screen-sub">Final score and team names. That's all we need.</p>
    <form class="panel setup-form" novalidate>
      <div class="field"><span class="field__label">Sport</span>${sportSegmentHTML()}</div>
      ${teamFieldHTML('home', 'Home team')}
      ${teamFieldHTML('away', 'Away team')}
      <div class="field"><span class="field__label" data-score-label>Final score</span>
        <div class="score-grid" data-score-grid></div>
      </div>
      <details class="more" data-more>
        <summary>Add round &amp; competition</summary>
        <div class="field-row more__body">
          <div class="field"><label class="field__label" for="r-competition">Competition</label>
            <input class="input" id="r-competition" type="text" maxlength="40" autocomplete="off" placeholder="Under 12s"></div>
          <div class="field"><label class="field__label" for="r-round">Round</label>
            <input class="input input--num" id="r-round" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" autocomplete="off" placeholder="8"></div>
        </div>
      </details>
      <p class="form-error" data-err hidden></p>
      <button type="submit" class="btn btn--primary btn--block">Make the card</button>
    </form>`;

  wireTeamFields(root, ctx.store);

  root.addEventListener('click', e => {
    if (e.target.closest('[data-act="back"]')) return ctx.go('start');
    const b = e.target.closest('[data-sport]');
    if (b && b.dataset.sport !== ctx.store.getState().sport) { applySport(ctx.store, b.dataset.sport); buildScores(); sync(); }
  });
  root.querySelector('#r-competition').addEventListener('input', e => ctx.store.update(s => { s.competition = e.target.value; }));
  root.querySelector('#r-round').addEventListener('input', e => {
    const v = e.target.value.replace(/\D/g, '');
    e.target.value = v;
    ctx.store.update(s => { s.round = v; });
  });
  root.querySelector('[data-score-grid]').addEventListener('input', onScoreInput);
  root.querySelector('form').addEventListener('submit', e => { e.preventDefault(); submit(); });
}

function buildScores() {
  const s = ctx.store.getState(), sp = SPORTS[s.sport];
  const afl = sp.buttons.length > 1 && s.sport === 'afl';
  const word = s.sport === 'basketball' ? 'Points' : 'Goals';
  root.querySelector('[data-score-label]').textContent = afl ? 'Final score (goals and behinds)' : `Final score (${word.toLowerCase()})`;
  const grid = root.querySelector('[data-score-grid]');
  grid.classList.toggle('score-grid--afl', afl);
  const col = team => {
    const counts = s[team].counts;
    const name = s[team].name.trim() || (team === 'home' ? 'Home' : 'Away');
    const shown = k => (s.finished || counts[k] > 0) ? counts[k] : '';
    const fields = afl
      ? sp.buttons.map(b => `<label class="score-in"><span class="score-in__lbl">${b.name === 'goal' ? 'Goals' : 'Behinds'}</span>
          <input class="input input--num input--big" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" data-team="${team}" data-key="${b.key}" value="${shown(b.key)}" placeholder="0"></label>`).join('')
      : `<label class="score-in"><span class="score-in__lbl">${word}</span>
          <input class="input input--num input--big" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" data-team="${team}" data-key="${sp.buttons[0].key}" value="${shown(sp.buttons[0].key)}" placeholder="0"></label>`;
    return `<div class="score-col"><span class="score-col__team" data-name="${team}"></span><div class="score-col__fields">${fields}</div>
      ${afl ? `<span class="score-col__total" data-total="${team}"></span>` : ''}</div>`;
  };
  grid.innerHTML = col('home') + col('away');
  updateNames(); updateTotals();
}

function updateNames() {
  const s = ctx.store.getState();
  for (const team of ['home', 'away']) {
    const el = root.querySelector(`[data-name="${team}"]`);
    if (el) el.textContent = s[team].name.trim() || (team === 'home' ? 'Home' : 'Away');
  }
}
function updateTotals() {
  const s = ctx.store.getState();
  for (const team of ['home', 'away']) {
    const el = root.querySelector(`[data-total="${team}"]`);
    if (el) el.textContent = `= ${total(s.sport, s[team].counts)}`;
  }
}

function onScoreInput(e) {
  const t = e.target;
  if (!t.dataset.key) return;
  const v = t.value.replace(/\D/g, '');
  t.value = v;
  const n = v === '' ? 0 : parseInt(v, 10);
  ctx.store.update(s => { s[t.dataset.team].counts[t.dataset.key] = n; });
  updateTotals(); showErr('');
}

function showErr(msg) {
  const el = root.querySelector('[data-err]');
  el.textContent = msg; el.hidden = !msg;
}

function sync() {
  const s = ctx.store.getState();
  root.querySelectorAll('[data-sport]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sport === s.sport)));
  showErr('');
}

export function enter() {
  const s = ctx.store.getState();
  fillTeamFields(root, s);
  root.querySelector('#r-competition').value = s.competition || '';
  root.querySelector('#r-round').value = s.round || '';
  root.querySelector('[data-more]').open = !!(s.competition || s.round);
  buildScores(); sync();
  // keep the score-column headings in step with the team names as they're typed
  if (!root._nameWired) {
    root._nameWired = true;
    root.addEventListener('input', e => { if (e.target.dataset && e.target.dataset.f === 'name') updateNames(); });
  }
}

function submit() {
  const s = ctx.store.getState();
  if (!s.home.name.trim() || !s.away.name.trim()) return showErr('Add both team names.');
  const inputs = [...root.querySelectorAll('[data-score-grid] input')];
  const keys = new Set(inputs.map(i => i.dataset.team));
  const blank = [...keys].filter(team => inputs.filter(i => i.dataset.team === team).every(i => i.value === ''));
  if (blank.length) return showErr('Enter a score for each team. A 0 is fine.');
  ctx.store.update(st => {
    st.home.name = st.home.name.trim(); st.away.name = st.away.name.trim();
    if (!st.home.initial) st.home.initial = st.home.name.charAt(0).toUpperCase();
    if (!st.away.initial) st.away.initial = st.away.name.charAt(0).toUpperCase();
    st.mode = 'result'; st.finished = true; st.history = [];
  });
  ctx.go('composer');
}
