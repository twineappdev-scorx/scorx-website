// Live-mode setup: sport, teams, competition, round, period length. One screen, about 20 seconds.
import { SPORTS, SPORT_ORDER, emptyCounts } from '../sports.js';

const BACK = '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M9 3L5 7.5l4 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export const autoInitial = name => (name || '').trim().charAt(0).toUpperCase();

/** Switch sport: counts, history, snapshots and period length all reset. */
export function applySport(store, id) {
  store.update(s => {
    s.sport = id;
    s.home.counts = emptyCounts(id);
    s.away.counts = emptyCounts(id);
    s.history = [];
    s.periodScores = [];
    s.clock.periodMs = SPORTS[id].periodMinutes * 60000;
    s.clock.period = 1; s.clock.elapsedMs = 0; s.clock.running = false; s.clock.startedAt = null;
  });
}

export function sportSegmentHTML() {
  return `<div class="segment" role="group" aria-label="Sport">${SPORT_ORDER.map(id =>
    `<button type="button" data-sport="${id}" aria-pressed="false">${SPORTS[id].label}</button>`).join('')}</div>`;
}

/** Team name + badge initial inputs. The initial follows the first letter until the user changes it. */
export function teamFieldHTML(team, label) {
  return `<div class="field team-field">
    <label class="field__label" for="${team}-name">${label}</label>
    <div class="team-field__row">
      <input class="input" id="${team}-name" data-team="${team}" data-f="name" type="text" maxlength="30" autocomplete="off" autocapitalize="words" placeholder="${team === 'home' ? 'Kenmore' : 'Wests'}">
      <input class="input input--num badge-in" id="${team}-init" data-team="${team}" data-f="initial" type="text" maxlength="1" autocomplete="off" autocapitalize="characters" aria-label="${label} badge initial" placeholder="K">
    </div></div>`;
}

/** Handles name/initial input events for a root containing teamFieldHTML blocks. */
export function wireTeamFields(root, store) {
  root.addEventListener('input', e => {
    const t = e.target;
    if (!t.dataset || !t.dataset.team) return;
    const team = t.dataset.team;
    if (t.dataset.f === 'name') {
      const before = store.getState()[team];
      const follows = !before.initial || before.initial === autoInitial(before.name);
      const next = autoInitial(t.value);
      store.update(s => { s[team].name = t.value; if (follows) s[team].initial = next; });
      if (follows) root.querySelector(`#${team}-init`).value = next;
      const ph = root.querySelector(`#${team}-init`);
      ph.placeholder = next || (team === 'home' ? 'K' : 'W');
    } else if (t.dataset.f === 'initial') {
      const v = t.value.trim().slice(-1).toUpperCase();
      t.value = v;
      store.update(s => { s[team].initial = v; });
    }
  });
}

export function fillTeamFields(root, s) {
  for (const team of ['home', 'away']) {
    root.querySelector(`#${team}-name`).value = s[team].name || '';
    root.querySelector(`#${team}-init`).value = s[team].initial || '';
  }
}

let root, ctx;

export function mount(el, c) {
  root = el; ctx = c;
  root.innerHTML = `
    <button type="button" class="back-link" data-act="back">${BACK}<span>Back</span></button>
    <h1 class="screen-title">Set up the <em>game</em></h1>
    <p class="screen-sub">Just the basics. You can fix names on the card later.</p>
    <form class="panel setup-form" novalidate>
      <div class="field"><span class="field__label" id="sport-lbl">Sport</span>${sportSegmentHTML()}</div>
      ${teamFieldHTML('home', 'Home team')}
      ${teamFieldHTML('away', 'Away team')}
      <div class="field-row">
        <div class="field"><label class="field__label" for="competition">Competition <span class="opt">(optional)</span></label>
          <input class="input" id="competition" type="text" maxlength="40" autocomplete="off" placeholder="Under 12s"></div>
        <div class="field"><label class="field__label" for="round">Round <span class="opt">(optional)</span></label>
          <input class="input input--num" id="round" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" autocomplete="off" placeholder="8"></div>
      </div>
      <div class="field"><label class="field__label" for="period-min"><span data-period-name>Quarter</span> length (minutes)</label>
        <input class="input input--num period-in" id="period-min" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" autocomplete="off">
        <span class="field__hint">Junior lengths vary. Change it to match your game.</span></div>
      <p class="form-error" data-err hidden></p>
      <button type="submit" class="btn btn--primary btn--block">Start game</button>
    </form>`;

  wireTeamFields(root, ctx.store);

  root.addEventListener('click', e => {
    if (e.target.closest('[data-act="back"]')) return ctx.go('start');
    const b = e.target.closest('[data-sport]');
    if (b) { applySport(ctx.store, b.dataset.sport); sync(); }
  });
  root.querySelector('#competition').addEventListener('input', e => ctx.store.update(s => { s.competition = e.target.value; }));
  root.querySelector('#round').addEventListener('input', e => {
    const v = e.target.value.replace(/\D/g, '');
    e.target.value = v;
    ctx.store.update(s => { s.round = v; });
  });
  root.querySelector('#period-min').addEventListener('input', e => {
    const v = e.target.value.replace(/\D/g, '');
    e.target.value = v;
    const n = parseInt(v, 10);
    if (n >= 1 && n <= 60) { ctx.store.update(s => { s.clock.periodMs = n * 60000; }); showErr(''); }
  });
  root.querySelector('form').addEventListener('submit', e => { e.preventDefault(); submit(); });
}

function showErr(msg) {
  const el = root.querySelector('[data-err]');
  el.textContent = msg; el.hidden = !msg;
}

function sync() {
  const s = ctx.store.getState(), sp = SPORTS[s.sport];
  root.querySelectorAll('[data-sport]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sport === s.sport)));
  root.querySelector('#period-min').value = Math.round(s.clock.periodMs / 60000);
  root.querySelector('[data-period-name]').textContent = sp.periodName;
  showErr('');
}

export function enter() {
  const s = ctx.store.getState();
  fillTeamFields(root, s);
  root.querySelector('#competition').value = s.competition || '';
  root.querySelector('#round').value = s.round || '';
  sync();
}

function submit() {
  const s = ctx.store.getState();
  const min = parseInt(root.querySelector('#period-min').value, 10);
  if (!s.home.name.trim() || !s.away.name.trim()) return showErr('Add both team names to start.');
  if (!(min >= 1 && min <= 60)) return showErr('Period length should be between 1 and 60 minutes.');
  ctx.store.update(st => {
    st.clock.periodMs = min * 60000;
    st.home.name = st.home.name.trim(); st.away.name = st.away.name.trim();
    if (!st.home.initial) st.home.initial = autoInitial(st.home.name);
    if (!st.away.initial) st.away.initial = autoInitial(st.away.name);
  });
  ctx.go('game');
}
