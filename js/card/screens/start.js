// /card landing screen: two entry paths plus resume.
import { track } from '../analytics.js';
import { appStoreUrl } from '../config.js';

const CHEV = '<svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true"><path d="M2 2l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_LIVE = '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><circle cx="13" cy="14" r="8.5" stroke="currentColor" stroke-width="2"/><path d="M13 14V9.5M10.5 3h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_RESULT = '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><rect x="4" y="3.5" width="18" height="19" rx="3" stroke="currentColor" stroke-width="2"/><path d="M8.5 9h9M8.5 13h9M8.5 17h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

let root, ctx, viewedTracked = false;

export function mount(el, c) {
  root = el; ctx = c;
  root.addEventListener('click', onClick);
}

export function enter() {
  render();
  if (!viewedTracked) { viewedTracked = true; track('card_builder_viewed'); }
}

function resumeLabel(s) {
  const home = s.home.name || 'Home', away = s.away.name || 'Away';
  let suffix = '';
  if (s.mode === 'live' && s.screen !== 'setup') {
    suffix = s.finished ? 'Full time' : `${ctx.sports.SPORTS[s.sport].periodLabel}${s.clock.period}`;
  } else if (s.mode === 'result' && s.finished) suffix = 'Full time';
  return `Resume ${home} v ${away}${suffix ? ' · ' + suffix : ''}`;
}

function render() {
  const { store } = ctx;
  const resumable = store.hasResumable();
  root.innerHTML = `
    <h1 class="screen-title start-title">Make a card from <em>Saturday's game</em>.</h1>
    <p class="screen-sub">Score it live, or enter the result afterwards. Add a photo and share your full-time card with family and friends.</p>
    ${resumable ? `
    <div class="resume panel" data-resume>
      <button type="button" class="resume__main" data-act="resume"><span class="resume__label"></span><span class="resume__chev">${CHEV}</span></button>
      <button type="button" class="link-btn resume__reset" data-act="startover">Start over</button>
    </div>` : ''}
    <div class="choices">
      <button type="button" class="choice" data-act="live">
        <span class="choice__icon">${ICON_LIVE}</span>
        <span class="choice__text"><span class="choice__title">Score a game live</span><span class="choice__sub">Timer and scoreboard. A parent or coach can tap it in from the sideline. Card ready at the siren.</span></span>
        <span class="choice__chev">${CHEV}</span>
      </button>
      <button type="button" class="choice" data-act="result">
        <span class="choice__icon">${ICON_RESULT}</span>
        <span class="choice__text"><span class="choice__title">Game's finished? Enter the result</span><span class="choice__sub">About 30 seconds.</span></span>
        <span class="choice__chev">${CHEV}</span>
      </button>
    </div>
    <p class="start-note">Free. No app or account needed for this one-game demo.</p>
    <p class="start-note start-note--app">Want a card after every game, and your whole season in one place? <a href="${appStoreUrl('card-start')}" target="_blank" rel="noopener">Get ScorX free on the App Store</a></p>`;
  if (resumable) root.querySelector('.resume__label').textContent = resumeLabel(store.getState());
}

function begin(mode) {
  const { store } = ctx;
  store.reset();
  store.update(s => { s.mode = mode; });
  track('card_builder_started', { mode });
  ctx.go(mode === 'live' ? 'setup' : 'result');
}

function confirmStartOver() {
  const scrim = document.createElement('div');
  scrim.className = 'sheet-scrim';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.setAttribute('aria-labelledby', 'so-title');
  sheet.innerHTML = `<h3 id="so-title">Start over?</h3><p>This clears the saved game on this device.</p>
    <div class="sheet__actions"><button type="button" class="btn btn--primary btn--block" data-so="yes">Yes, start over</button>
    <button type="button" class="btn btn--quiet btn--block" data-so="no">Keep my game</button></div>`;
  const close = () => { scrim.remove(); sheet.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  scrim.addEventListener('click', close);
  sheet.addEventListener('click', e => {
    const b = e.target.closest('[data-so]');
    if (!b) return;
    close();
    if (b.dataset.so === 'yes') { ctx.store.reset(); render(); }
  });
  document.addEventListener('keydown', onKey);
  document.body.append(scrim, sheet);
  sheet.querySelector('[data-so="no"]').focus();
}

function onClick(e) {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const act = b.dataset.act;
  if (act === 'live') begin('live');
  else if (act === 'result') begin('result');
  else if (act === 'resume') ctx.go(ctx.store.getState().screen);
  else if (act === 'startover') confirmStartOver();
}
