// Done: the finished card, save/share, and the app pitch (device-aware).
import { getResult, shareOrDownload } from '../share.js';
import { track } from '../analytics.js';
import { appStoreUrl, deviceKind } from '../config.js';
import { clearPhoto } from './composer.js';

let root, ctx, objUrl = null;
const $ = sel => root.querySelector(sel);

export function mount(el, c) {
  root = el; ctx = c;
  root.addEventListener('click', async e => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'share') {
      const btn = e.target.closest('[data-act]');
      btn.disabled = true;
      try {
        const method = await shareOrDownload();
        if (method === 'share' || method === 'download') track('card_downloaded', { method });
      } finally { btn.disabled = false; }
    } else if (act === 'again') {
      clearPhoto();
      ctx.store.reset();
      ctx.go('start');
    } else if (act === 'edit') {
      ctx.go('composer');
    } else if (e.target.closest('[data-appstore]')) {
      track('card_app_store_click', { device: deviceKind() });
    }
  });
}

export function enter() {
  releaseUrl();
  const res = getResult();
  if (!res) { ctx.go('composer'); return; } // nothing to show (e.g. page reloaded)
  objUrl = URL.createObjectURL(res.blob);
  const kind = deviceKind();
  const badge = `<a class="done-badge" href="${appStoreUrl('card-confirm')}" data-appstore rel="noopener">
      <img src="/images/app-store-badge.svg" alt="Download on the App Store" height="48">
    </a>`;
  let pitch;
  if (kind === 'ios') pitch = badge;
  else if (kind === 'android') pitch = `<p class="done-note">ScorX is on iPhone for now. We’ll email you if you ticked the Sideline box.</p>`;
  else pitch = `<div class="done-desktop">${badge}
      <figure class="done-qr"><img src="/images/qr-app-store.svg" alt="Scan with your iPhone to get ScorX" width="120" height="120"><figcaption>Scan with your iPhone</figcaption></figure></div>`;

  root.innerHTML = `
    <h1 class="screen-title">Your card is ready</h1>
    <p class="screen-sub">Save it to your photos or share it straight to the family chat.</p>
    <div class="done-card"><img src="${objUrl}" alt="Your finished full-time card"></div>
    <button type="button" class="btn btn--primary btn--block" data-act="share">Save or share</button>
    ${kind === 'ios' ? '<p class="done-tip">Tip: choose Save Image to put it in Photos.</p>' : ''}
    <section class="panel done-pitch">
      <h2 class="cmp-h2">That’s one game.</h2>
      <p class="cmp-sub">ScorX makes one every week, and builds the season story.</p>
      ${pitch}
    </section>
    <div class="done-actions">
      <button type="button" class="btn btn--ghost" data-act="again">Make another card</button>
      <button type="button" class="link-btn" data-act="edit">Back to edit</button>
    </div>`;
}

export function leave() { releaseUrl(); }

function releaseUrl() { if (objUrl) { URL.revokeObjectURL(objUrl); objUrl = null; } }
