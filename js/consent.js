/* ScorX cookie consent. Vanilla JS, no dependencies.
 *
 * Nothing third-party loads until the visitor clicks Accept (decision D18).
 * Choice is stored in localStorage key "scorx_consent" as {v:1, analytics:boolean, ts:number}.
 * Declining, ignoring the banner, or storage failing all mean "no tracking".
 *
 * API: window.scorxConsent = { get(), set(bool), open() }
 * Event: "scorx:consent" on window, detail {analytics:boolean}, fired on load and on every change.
 *
 * Banner markup, styles and the Meta Pixel loader all live here, so every page (layout pages and
 * hard-coded pages alike) only needs <script src="/js/consent.js" defer></script>.
 * Optional attribute on that script tag: data-pixel-auto-config="false" (used on /card).
 */
(function () {
  'use strict';
  var KEY = 'scorx_consent';
  var PIXEL_ID = '1528173681585526';
  var PIXEL_SRC = 'https://connect.facebook.net/en_US/fbevents.js';
  var script = document.currentScript;
  var autoConfigOff = !!(script && script.getAttribute('data-pixel-auto-config') === 'false');
  var pixelLoaded = false;
  var banner = null;

  // Safe stub: sends nothing, queues nothing, never throws. Replaced by the real Pixel after Accept.
  function installStub() { window.fbq = function () {}; }
  installStub();

  function read() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (o && o.v === 1 && typeof o.analytics === 'boolean') return o;
    } catch (e) { /* storage unavailable or corrupt: no consent */ }
    return null;
  }

  function get() { var o = read(); return !!(o && o.analytics === true); }

  function loadPixel() {
    if (pixelLoaded) return;
    pixelLoaded = true;
    var f = window, b = document, n, t, s;
    delete f.fbq; // drop the stub so the standard loader runs
    f.fbq = n = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    t = b.createElement('script'); t.async = true; t.src = PIXEL_SRC;
    s = b.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(t, s);
    if (autoConfigOff) f.fbq('set', 'autoConfig', false, PIXEL_ID);
    f.fbq('init', PIXEL_ID);
    f.fbq('track', 'PageView');
  }

  function clearPixelCookies() {
    var host = location.hostname.split('.');
    var domains = [''];
    for (var i = 0; i < host.length - 1; i++) domains.push('; domain=.' + host.slice(i).join('.'));
    ['_fbp', '_fbc'].forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
      });
    });
  }

  function emit(val) {
    try { window.dispatchEvent(new CustomEvent('scorx:consent', { detail: { analytics: val } })); } catch (e) { /* ignore */ }
  }

  function set(val) {
    val = val === true;
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ v: 1, analytics: val, ts: Date.now() }));
    } catch (e) { /* cannot remember: still honour the choice for this page view only */ }
    if (val) {
      loadPixel();
    } else if (pixelLoaded) {
      installStub(); // stop further sends from this page; a reload loads nothing
      clearPixelCookies();
    }
    emit(val);
    closeBanner();
  }

  function addStyles() {
    if (document.querySelector('link[data-scorx-consent]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = script && script.src ? script.src.replace(/js\/consent\.js.*$/, 'css/consent.css') : '/css/consent.css';
    l.setAttribute('data-scorx-consent', '');
    document.head.appendChild(l);
  }

  function closeBanner() {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    banner = null;
  }

  function open(focus) {
    if (banner) { if (focus) banner.querySelector('button').focus(); return; }
    addStyles();
    banner = document.createElement('section');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<div class="consent-banner__inner">' +
      '<p class="consent-banner__text">We’d like to use cookies to measure how people find ScorX. ' +
      'Nothing is collected unless you say yes. <a href="/privacy.html">Privacy policy</a></p>' +
      '<div class="consent-banner__actions">' +
      '<button type="button" class="consent-banner__btn" data-consent="accept">Accept</button>' +
      '<button type="button" class="consent-banner__btn" data-consent="decline">Decline</button>' +
      '</div></div>';
    banner.addEventListener('click', function (ev) {
      var b = ev.target.closest && ev.target.closest('[data-consent]');
      if (!b) return;
      set(b.getAttribute('data-consent') === 'accept');
    });
    // Escape closes for this page view only. It is not a choice: nothing is stored or loaded.
    banner.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeBanner(); });
    document.body.appendChild(banner);
    if (focus) banner.querySelector('button').focus();
  }

  window.scorxConsent = { get: get, set: set, open: function () { open(true); } };

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('[data-cookie-settings]');
    if (!a) return;
    ev.preventDefault();
    open(true);
  });

  function init() {
    var o = read();
    if (o && o.analytics === true) loadPixel();
    if (!o) open(false);
    emit(!!(o && o.analytics === true));
  }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();
