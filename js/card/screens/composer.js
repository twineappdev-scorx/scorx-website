// Composer: customise the card (photo, colours, details), live preview, and the email gate.
import { renderSplitRail, toJpegBlob, ensureFonts, RAIL, CARD_W, CARD_H } from '../render-split-rail.js';
import { loadPhoto } from '../photo.js';
import { submitCardRequest } from '../gate.js';
import { setResult, makeFilename, clearResult } from '../share.js';
import { track } from '../analytics.js';
import { TURNSTILE_SITE_KEY } from '../config.js';

let root, ctx, canvas, bitmap = null;      // bitmap lives in memory only
let timer = null, renderSeq = 0, previewTracked = false, hintShown = false;
let turnstileToken = '', turnstileId = null, turnstileLoading = null;
const $ = sel => root.querySelector(sel);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Called by done.js ("Make another card") so a new game never inherits the old photo. */
export function clearPhoto() { bitmap = null; }

export function mount(el, c) {
  root = el; ctx = c;
  window.addEventListener('scorx-card-reset', clearPhoto);
  root.innerHTML = `
    <button type="button" class="link-btn composer-back" data-act="back">&larr; Back</button>
    <h1 class="screen-title">Your full-time card</h1>
    <p class="screen-sub" data-el="summary" aria-live="polite"></p>

    <div class="cmp-preview">
      <canvas class="cmp-canvas" data-el="canvas" aria-label="Preview of your full-time card" role="img"></canvas>
      <p class="cmp-hint" data-el="hint" hidden>Drag to move the photo</p>
    </div>

    <span class="eyebrow">Make it yours</span>
    <div class="panel cmp-options">
      <div class="cmp-photo-row">
        <button type="button" class="btn btn--quiet cmp-add" data-act="photo" data-el="photoBtn">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l1.6-2.4h6.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.6"/></svg>
          <span data-el="photoLabel">Add photo</span>
        </button>
        <button type="button" class="link-btn" data-act="removePhoto" data-el="removeBtn" hidden>Remove</button>
        <input type="file" accept="image/*" data-el="file" hidden>
      </div>
      <p class="form-error" data-el="photoError" role="alert" hidden></p>
      <label class="field cmp-zoom" data-el="zoomWrap" hidden>
        <span class="field__label">Zoom</span>
        <input type="range" min="1" max="3" step="0.01" value="1" data-el="zoom" aria-label="Photo zoom">
      </label>

      <span class="field__label cmp-lbl">Colours</span>
      <div class="segment" role="group" aria-label="Colour scheme">
        <button type="button" data-mode="scorx" aria-pressed="true">ScorX</button>
        <button type="button" data-mode="team" aria-pressed="false">Team colours</button>
      </div>
      <div class="cmp-colours" data-el="colours" hidden>
        <label class="cmp-swatch"><input type="color" data-col="primary" aria-label="Background colour"><span>Background</span></label>
        <label class="cmp-swatch"><input type="color" data-col="accent" aria-label="Highlight colour"><span>Highlight</span></label>
        <label class="cmp-swatch"><input type="color" data-col="secondary" aria-label="Away badge colour"><span>Away badge</span></label>
      </div>

      <details class="cmp-details">
        <summary>Edit details</summary>
        <div class="cmp-details__body">
          <div class="field-row">
            <label class="field"><span class="field__label">Home team</span><input class="input" data-f="home.name" maxlength="28" autocomplete="off"></label>
            <label class="field"><span class="field__label">Home initial</span><input class="input input--num" data-f="home.initial" maxlength="1" autocomplete="off"></label>
          </div>
          <div class="field-row">
            <label class="field"><span class="field__label">Away team</span><input class="input" data-f="away.name" maxlength="28" autocomplete="off"></label>
            <label class="field"><span class="field__label">Away initial</span><input class="input input--num" data-f="away.initial" maxlength="1" autocomplete="off"></label>
          </div>
          <div class="field-row">
            <label class="field"><span class="field__label">Competition</span><input class="input" data-f="competition" maxlength="40" autocomplete="off"></label>
            <label class="field"><span class="field__label">Round</span><input class="input" data-f="round" maxlength="12" autocomplete="off"></label>
          </div>
          <button type="button" class="link-btn" data-act="changeScore">Change the score</button>
        </div>
      </details>
    </div>

    <form class="panel cmp-gate" data-el="gate" novalidate>
      <h2 class="cmp-h2">Get the full-size card</h2>
      <p class="cmp-sub">We’ll unlock a high-res copy to save and share.</p>
      <label class="field">
        <span class="field__label">Email</span>
        <input class="input" type="email" name="email" autocomplete="email" inputmode="email" required placeholder="you@example.com">
      </label>
      <label class="check"><input type="checkbox" name="nurture"><span>Send me a few tips on getting more out of ScorX</span></label>
      <label class="check"><input type="checkbox" name="sideline"><span>Subscribe to The ScorX Sideline, our blog for sports parents</span></label>
      <div data-el="turnstile" class="cmp-turnstile"></div>
      <p class="form-error" data-el="error" role="alert" hidden></p>
      <button class="btn btn--primary btn--block" type="submit" data-el="submit">Get my card</button>
      <p class="cmp-privacy">Your photo never leaves your device. We keep your email and the boxes you tick, nothing else. <a href="/privacy.html">Privacy policy</a></p>
    </form>
  `;
  canvas = $('[data-el="canvas"]');

  root.addEventListener('click', onClick);
  $('[data-el="file"]').addEventListener('change', onFile);
  $('[data-el="zoom"]').addEventListener('input', e => { setPhoto({ zoom: +e.target.value }); });
  root.querySelectorAll('[data-col]').forEach(i => i.addEventListener('input', () => {
    ctx.store.update(s => { s.colours[i.dataset.col] = i.value; s.colours.mode = 'team'; });
    syncColours(); schedule();
  }));
  root.querySelectorAll('[data-f]').forEach(i => i.addEventListener('input', () => {
    const [a, b] = i.dataset.f.split('.');
    ctx.store.update(s => { if (b) s[a][b] = i.value; else s[a] = i.value; });
    if (a === 'home' || a === 'away') updateSummary();
    schedule();
  }));
  $('[data-el="gate"]').addEventListener('submit', onSubmit);
  initGestures();
}

export function enter() {
  const s = ctx.store.getState();
  // Reflect saved state in the form.
  root.querySelectorAll('[data-f]').forEach(i => {
    const [a, b] = i.dataset.f.split('.');
    i.value = (b ? s[a][b] : s[a]) || '';
  });
  root.querySelectorAll('[data-col]').forEach(i => { i.value = s.colours[i.dataset.col]; });
  syncColours(); syncPhotoUi(); updateSummary();
  setError(''); setBusy(false);
  previewTracked = false;
  ensureTurnstile();
  schedule(0);
}

export function leave() { clearTimeout(timer); }

// ── UI sync ────────────────────────────────────────────────
function updateSummary() {
  const d = ctx.store.cardData();
  const h = d.home.name, a = d.away.name, hs = d.home.score, as = d.away.score;
  const sc = x => (x.breakdown && typeof x.breakdown === 'string' && x.breakdown !== String(x.score)) ? `${x.breakdown} (${x.score})` : `${x.score}`;
  let t;
  if (hs === as) t = `${h} and ${a} drew, ${sc(d.home)} all.`;
  else if (hs > as) t = `${h} beat ${a}, ${sc(d.home)} to ${sc(d.away)}.`;
  else t = `${a} beat ${h}, ${sc(d.away)} to ${sc(d.home)}.`;
  $('[data-el="summary"]').textContent = t;
}

function syncColours() {
  const m = ctx.store.getState().colours.mode;
  root.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === m)));
  $('[data-el="colours"]').hidden = m !== 'team';
}

function syncPhotoUi() {
  const has = !!bitmap;
  $('[data-el="photoLabel"]').textContent = has ? 'Change photo' : 'Add photo';
  $('[data-el="removeBtn"]').hidden = !has;
  $('[data-el="zoomWrap"]').hidden = !has;
  $('[data-el="zoom"]').value = ctx.store.getState().photo.zoom || 1;
  canvas.style.touchAction = has ? 'none' : '';
  canvas.classList.toggle('cmp-canvas--photo', has);
}

function setPhoto(patch) {
  ctx.store.update(s => { Object.assign(s.photo, patch); });
  schedule();
}

function setError(msg) { const e = $('[data-el="error"]'); e.textContent = msg; e.hidden = !msg; }
function setBusy(b) {
  const btn = $('[data-el="submit"]');
  btn.disabled = b; btn.textContent = b ? 'Making your card…' : 'Get my card';
}

// ── Preview rendering ──────────────────────────────────────
function schedule(delay = 120) { clearTimeout(timer); timer = setTimeout(draw, delay); }

async function draw() {
  const seq = ++renderSeq;
  const s = ctx.store.getState();
  try {
    await ensureFonts();
    if (seq !== renderSeq) return;
    await renderSplitRail(canvas, ctx.store.cardData(), {
      photo: bitmap ? { bitmap, x: s.photo.x, y: s.photo.y, zoom: s.photo.zoom } : null,
      preview: true, scale: 0.5,
    });
    if (!previewTracked) { previewTracked = true; track('card_preview_rendered'); }
  } catch (e) { console.error('[card] preview failed', e); }
}

// ── Actions ────────────────────────────────────────────────
function onClick(e) {
  const modeBtn = e.target.closest('[data-mode]');
  if (modeBtn) {
    ctx.store.update(s => { s.colours.mode = modeBtn.dataset.mode; });
    syncColours(); schedule(); return;
  }
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (act === 'back' || act === 'changeScore') {
    ctx.go(ctx.store.getState().mode === 'live' ? 'game' : 'result');
  } else if (act === 'photo') {
    $('[data-el="file"]').click();
  } else if (act === 'removePhoto') {
    bitmap = null;
    ctx.store.update(s => { s.photo = { x: 0.5, y: 0.5, zoom: 1 }; });
    syncPhotoUi(); schedule(0);
  }
}

async function onFile(e) {
  const input = e.target, file = input.files && input.files[0];
  const err = $('[data-el="photoError"]'); err.hidden = true;
  if (!file) return;
  try {
    const p = await loadPhoto(file);
    bitmap = p.bitmap;
    ctx.store.update(s => { s.photo = { x: 0.5, y: 0.5, zoom: 1 }; });
    syncPhotoUi(); schedule(0);
    if (!hintShown) {
      hintShown = true;
      const h = $('[data-el="hint"]'); h.hidden = false;
      setTimeout(() => { h.hidden = true; }, 5000);
    }
  } catch (ex) {
    err.textContent = (ex && ex.message) || 'We couldn’t use that photo. Please try a JPG or PNG.';
    err.hidden = false;
  } finally { input.value = ''; }
}

// ── Pan / pinch / wheel on the preview ─────────────────────
function initGestures() {
  const pts = new Map();
  let last = null, pinch0 = null;

  const toCard = (cx, cy) => {
    const r = canvas.getBoundingClientRect();
    return { x: (cx - r.left) / r.width * CARD_W, y: (cy - r.top) / r.height * CARD_H };
  };
  const inRail = p => p.x >= RAIL.x && p.x <= RAIL.x + RAIL.w && p.y >= RAIL.y && p.y <= RAIL.y + RAIL.h;
  const coverScale = () => Math.max(RAIL.w / bitmap.width, RAIL.h / bitmap.height) * (ctx.store.getState().photo.zoom || 1);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pan = (dx, dy) => { // card-space deltas → focal point change
    const k = coverScale(), p = ctx.store.getState().photo;
    ctx.store.update(s => {
      s.photo.x = clamp(p.x - dx / k / bitmap.width, 0, 1);
      s.photo.y = clamp(p.y - dy / k / bitmap.height, 0, 1);
    });
    schedule(16);
  };
  const setZoom = z => {
    z = clamp(z, 1, 3);
    $('[data-el="zoom"]').value = z;
    setPhoto({ zoom: z });
  };
  const dist = () => { const [a, b] = [...pts.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };

  canvas.addEventListener('pointerdown', e => {
    if (!bitmap) return;
    const p = toCard(e.clientX, e.clientY);
    if (pts.size === 0 && !inRail(p)) return;
    canvas.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) last = p;
    if (pts.size === 2) pinch0 = { d: dist(), z: ctx.store.getState().photo.zoom || 1 };
  });
  canvas.addEventListener('pointermove', e => {
    if (!bitmap || !pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size >= 2 && pinch0) { setZoom(pinch0.z * dist() / pinch0.d); return; }
    const p = toCard(e.clientX, e.clientY);
    if (last) pan(p.x - last.x, p.y - last.y);
    last = p;
  });
  const end = e => {
    pts.delete(e.pointerId);
    if (pts.size < 2) pinch0 = null;
    if (pts.size === 1) { const [v] = pts.values(); last = toCard(v.x, v.y); }
    if (pts.size === 0) last = null;
  };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('wheel', e => {
    if (!bitmap || !inRail(toCard(e.clientX, e.clientY))) return;
    e.preventDefault();
    setZoom((ctx.store.getState().photo.zoom || 1) * Math.exp(-e.deltaY * 0.0015));
  }, { passive: false });
}

// ── Turnstile ──────────────────────────────────────────────
function ensureTurnstile() {
  if (!TURNSTILE_SITE_KEY || turnstileId !== null) return;
  turnstileLoading = turnstileLoading || new Promise((res, rej) => {
    if (window.turnstile) return res();
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true; s.onload = () => res(); s.onerror = () => rej(new Error('turnstile'));
    document.head.appendChild(s);
  });
  turnstileLoading.then(() => {
    if (turnstileId !== null) return;
    turnstileId = window.turnstile.render($('[data-el="turnstile"]'), {
      sitekey: TURNSTILE_SITE_KEY,
      callback: t => { turnstileToken = t; },
      'expired-callback': () => { turnstileToken = ''; },
      'error-callback': () => { turnstileToken = ''; },
    });
  }).catch(() => { turnstileLoading = null; });
}
function resetTurnstile() {
  turnstileToken = '';
  try { if (turnstileId !== null) window.turnstile.reset(turnstileId); } catch { /* ignore */ }
}

// ── Gate submit ────────────────────────────────────────────
async function onSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  setError('');
  const email = form.email.value.trim();
  if (!email) { setError('Please enter your email address.'); form.email.focus(); return; }
  if (!form.email.checkValidity() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setError('Please enter a valid email address.'); form.email.focus(); return; }
  if (TURNSTILE_SITE_KEY && !turnstileToken) { setError('Please complete the quick check above, then try again.'); return; }

  setBusy(true);
  try {
    const s = ctx.store.getState();
    const nurture = form.nurture.checked, sideline = form.sideline.checked;
    const r = await submitCardRequest({ email, nurture, sideline, sport: s.sport, source: '/card', turnstileToken });
    if (!r.ok) { setError(r.error); resetTurnstile(); return; }

    const data = ctx.store.cardData();
    const out = document.createElement('canvas');
    await ensureFonts();
    await renderSplitRail(out, data, {
      photo: bitmap ? { bitmap, x: s.photo.x, y: s.photo.y, zoom: s.photo.zoom } : null,
      preview: false, scale: 1,
    });
    const blob = await toJpegBlob(out, 0.9);
    if (!blob) throw new Error('no blob');
    clearResult();
    setResult(blob, makeFilename(data));
    track('card_email_submitted', { nurture, sideline });
    form.email.value = '';
    ctx.go('done');
  } catch (ex) {
    console.error('[card] final render failed', ex);
    setError('We couldn’t make your card. Please try again.');
  } finally {
    setBusy(false);
  }
}
