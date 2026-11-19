// Web template of the in-app Split Rail card; visual reference documentation/reference/split-rail-*.jpg;
// last checked against app: mockup Nov 2026.
//
// Draws the 1080x1920 (9:16) card on a canvas. All geometry is in 1080x1920 space; opts.scale only
// changes the canvas pixel size. Avoids ctx.filter, ctx.letterSpacing and a bare roundRect so it
// works on iOS Safari 16.4+.

export const CARD_W = 1080, CARD_H = 1920;
export const RAIL = { x: 476, y: 56, w: 548, h: 1660, r: 48 };

const F_DISPLAY = 'ScorXCard Display'; // Archivo 900 italic: FULL TIME, scores
const F_COND = 'ScorXCard Cond';       // Oswald 600: team names, labels
const F_UI = 'ScorXCard UI';           // Archivo 800: badge initials, ScorX wordmark
const DISPLAY = `italic 900 %spx "${F_DISPLAY}", "Archivo", "Arial Black", sans-serif`;
const COND = `600 %spx "${F_COND}", "Oswald", "Arial Narrow", sans-serif`;
const UI = `800 %spx "${F_UI}", "Archivo", Arial, sans-serif`;
const font = (tpl, px) => tpl.replace('%s', px);

const TURQ = '#1FEDD8';
const LEFT_CX = 236;     // centre of the left column
const LEFT_X = 60;       // left edge of the left column
const LEFT_W = 390;      // max text width in the left column

// ---------- fonts ----------
let fontsPromise = null;
export function ensureFonts() {
  if (fontsPromise) return fontsPromise;
  fontsPromise = (async () => {
    if (typeof FontFace === 'undefined' || !document.fonts) return;
    const base = new URL('../../fonts/', import.meta.url);
    const defs = [
      [F_DISPLAY, 'archivo-900-italic.woff2', { weight: '900', style: 'italic' }],
      [F_COND, 'oswald-600.woff2', { weight: '600', style: 'normal' }],
      [F_UI, 'archivo-800.woff2', { weight: '800', style: 'normal' }],
    ];
    await Promise.all(defs.map(async ([family, file, desc]) => {
      try {
        const ff = new FontFace(family, `url(${new URL(file, base).href}) format('woff2')`, desc);
        await ff.load();
        document.fonts.add(ff);
      } catch (e) { console.warn('[card] font failed', file, e); }
    }));
    try { await Promise.all([
      document.fonts.load(font(DISPLAY, 100), 'FULL 0123'),
      document.fonts.load(font(COND, 40), 'ABC'),
      document.fonts.load(font(UI, 40), 'ABC'),
    ]); } catch (e) { /* ignore */ }
  })();
  return fontsPromise;
}

// ---------- rail fallback images ----------
const railCache = {};
function loadRailImage(sport) {
  if (!railCache[sport]) {
    railCache[sport] = new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = new URL(`../../images/card/rail-${sport}.jpg`, import.meta.url).href;
    });
  }
  return railCache[sport];
}

// ---------- brand assets (from the site favicon) ----------
// Icon tile = /images/favicon192.png. Wordmark X = the favicon's mark, cut out on transparent
// (/images/brand/scorx-mark-on-dark.png). Never redraw the logo by hand.
const brandCache = {};
function loadBrand(name, path) {
  if (!brandCache[name]) {
    brandCache[name] = new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = new URL(path, import.meta.url).href;
    });
  }
  return brandCache[name];
}
const loadBrandAssets = () => Promise.all([
  loadBrand('icon', '../../images/favicon192.png'),
  loadBrand('mark', '../../images/brand/scorx-mark-on-dark.png'),
]);

// ---------- helpers ----------
function rrect(c, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function parseHex(h) {
  h = String(h || '').trim().replace('#', '');
  if (h.length === 3) h = h.split('').map(ch => ch + ch).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) return [15, 42, 68];
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}
function mix(hex, other, t) { // t: 0 = hex, 1 = other ([r,g,b])
  const a = parseHex(hex);
  return `rgb(${a.map((v, i) => Math.round(v + (other[i] - v) * t)).join(',')})`;
}
const WHITE = [255, 255, 255], BLACK = [0, 0, 0];

// Tracked (letter-spaced) text drawn per character. align: 'left' | 'center' | 'right'.
function trackedWidth(c, text, tracking) {
  let w = 0;
  for (const ch of text) w += c.measureText(ch).width + tracking;
  return Math.max(0, w - tracking);
}
function drawTracked(c, text, x, y, tracking, align = 'left') {
  const tw = trackedWidth(c, text, tracking);
  let cx = align === 'center' ? x - tw / 2 : align === 'right' ? x - tw : x;
  const prev = c.textAlign; c.textAlign = 'left';
  for (const ch of text) { c.fillText(ch, cx, y); cx += c.measureText(ch).width + tracking; }
  c.textAlign = prev;
  return tw;
}
// Largest size in [min,max] at which `text` fits maxW. Returns { size, fits }.
function fitSize(c, tpl, text, trackEm, maxW, max, min) {
  for (let s = max; s >= min; s -= 1) {
    c.font = font(tpl, s);
    if (trackedWidth(c, text, s * trackEm) <= maxW) return { size: s, fits: true };
  }
  return { size: min, fits: false };
}
function ellipsize(c, text, trackEm, size, maxW) {
  c.font = font(COND, size);
  let t = text;
  while (t.length > 1 && trackedWidth(c, t + '…', size * trackEm) > maxW) t = t.slice(0, -1);
  return t.trimEnd() + '…';
}
// Lay out a team name: one line shrunk to fit, else two lines, else ellipsis. Returns { size, lines }.
function layoutName(c, name, maxW) {
  const text = name.toUpperCase().replace(/\s+/g, ' ').trim();
  const em = 0.05, MAX = 40, MIN1 = 30;
  const one = fitSize(c, COND, text, em, maxW, MAX, MIN1);
  if (one.fits) return { size: one.size, lines: [text] };
  const words = text.split(' ');
  if (words.length > 1) {
    // best split minimising the wider line
    let best = null;
    for (let s = 34; s >= 24; s -= 1) {
      c.font = font(COND, s);
      let pick = null;
      for (let i = 1; i < words.length; i++) {
        const a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
        const w = Math.max(trackedWidth(c, a, s * em), trackedWidth(c, b, s * em));
        if (!pick || w < pick.w) pick = { w, lines: [a, b] };
      }
      if (pick.w <= maxW) { best = { size: s, lines: pick.lines }; break; }
      if (s === 24) best = { size: 24, lines: pick.lines };
    }
    const lines = best.lines.map(l => {
      c.font = font(COND, best.size);
      return trackedWidth(c, l, best.size * em) > maxW ? ellipsize(c, l, em, best.size, maxW) : l;
    });
    return { size: best.size, lines };
  }
  return { size: 26, lines: [ellipsize(c, text, em, 26, maxW)] };
}

// ---------- layers ----------
function drawBackground(c, colours) {
  const p = colours.primary;
  const g = c.createLinearGradient(0, 0, 0, CARD_H);
  g.addColorStop(0, mix(p, WHITE, 0.16));
  g.addColorStop(0.2, mix(p, BLACK, 0.2));
  g.addColorStop(0.45, mix(p, BLACK, 0.58));
  g.addColorStop(0.68, mix(p, BLACK, 0.78));
  g.addColorStop(1, mix(p, BLACK, 0.9));
  c.fillStyle = g; c.fillRect(0, 0, CARD_W, CARD_H);
  // large faint ring arc behind the left column
  c.save();
  c.beginPath(); c.ellipse(20, 880, 490, 560, 0, 0, Math.PI * 2);
  c.fillStyle = 'rgba(255,255,255,0.025)'; c.fill();
  c.lineWidth = 3; c.strokeStyle = 'rgba(255,255,255,0.06)'; c.stroke();
  c.restore();
}

function drawHeader(c, data, colours) {
  c.textBaseline = 'alphabetic'; c.textAlign = 'left';
  c.font = font(DISPLAY, 128);
  c.fillStyle = '#fff'; c.fillText('FULL', LEFT_X, 172);
  c.fillStyle = colours.accent; c.fillText('TIME', LEFT_X, 282);

  c.fillStyle = 'rgba(255,255,255,0.5)';
  const sport = String(data.sportLabel || '').toUpperCase();
  c.font = font(COND, 26);
  drawTracked(c, sport, LEFT_X - 2, 360, 5);

  const bits = [];
  if (data.competition) bits.push(String(data.competition).toUpperCase());
  if (data.round) {
    const r = String(data.round).trim();
    bits.push(/^\d+$/.test(r) ? `ROUND ${r}` : r.toUpperCase());
  }
  if (bits.length) {
    const line = bits.join(' · ');
    const f = fitSize(c, COND, line, 0.14, LEFT_W, 22, 14);
    c.font = font(COND, f.size);
    c.fillStyle = 'rgba(255,255,255,0.42)';
    drawTracked(c, line, LEFT_X - 2, 411, f.size * 0.14);
  }
}

function drawTeam(c, team, oy, isHome, isWinner, colours) {
  const cx = LEFT_CX;
  // badge
  const by = 736 + oy, R = 98;
  c.beginPath(); c.arc(cx, by, R, 0, Math.PI * 2);
  c.fillStyle = 'rgba(0,0,0,0.38)'; c.fill();
  if (isHome) { c.lineWidth = 7; c.strokeStyle = colours.accent; c.stroke(); }
  c.textAlign = 'center'; c.textBaseline = 'alphabetic';
  c.font = font(UI, 80);
  c.fillStyle = isHome ? colours.accent : colours.secondary;
  c.fillText(team.initial || '?', cx, by + 29);

  // name
  const nm = layoutName(c, String(team.name || ''), LEFT_W);
  c.font = font(COND, nm.size);
  c.fillStyle = '#fff';
  const lh = nm.size * 1.08, ny = 882 + oy;
  const first = ny - ((nm.lines.length - 1) * lh) / 2 + nm.size * 0.36;
  nm.lines.forEach((l, i) => drawTracked(c, l, cx, first + i * lh, nm.size * 0.05, 'center'));

  // score
  const score = String(team.score);
  const sf = fitSize(c, DISPLAY, score, 0, LEFT_W, 164, 80);
  c.font = font(DISPLAY, sf.size);
  c.fillStyle = isWinner ? colours.accent : '#fff';
  c.textAlign = 'center';
  c.fillText(score, cx, 1039 + oy + (164 - sf.size) * 0.35);

  // breakdown
  if (team.breakdown) {
    c.font = font(COND, 30);
    c.fillStyle = 'rgba(255,255,255,0.55)';
    drawTracked(c, String(team.breakdown), cx, 1106 + oy, 1.5, 'center');
  }
}

function drawLeft(c, data) {
  const { colours } = data;
  const hs = Number(data.home.score), as = Number(data.away.score);
  drawHeader(c, data, colours);
  drawTeam(c, data.home, 0, true, hs > as, colours);
  // divider
  c.fillStyle = 'rgba(255,255,255,0.32)';
  c.fillRect(LEFT_CX - 80, 1161, 160, 3);
  drawTeam(c, data.away, 566, false, as > hs, colours);
}

function drawFallbackGradient(c) {
  const { x, y, w, h } = RAIL;
  const g = c.createLinearGradient(x, y, x + w * 0.6, y + h);
  g.addColorStop(0, '#2a5a80'); g.addColorStop(0.45, '#17405f'); g.addColorStop(1, '#0c2236');
  c.fillStyle = g; c.fillRect(x, y, w, h);
  const glow = (cx, cy, r, col) => {
    const rg = c.createRadialGradient(cx, cy, 0, cx, cy, r);
    rg.addColorStop(0, col); rg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = rg; c.fillRect(x, y, w, h);
  };
  glow(x + w * 0.65, y + 200, 360, 'rgba(150,170,170,0.45)');
  glow(x + w * 0.4, y + h - 100, 340, 'rgba(110,110,60,0.35)');
}

function drawCover(c, photo) {
  const { x, y, w, h } = RAIL;
  const bm = photo.bitmap;
  const iw = bm.width || bm.naturalWidth, ih = bm.height || bm.naturalHeight;
  const zoom = Math.max(1, Number(photo.zoom) || 1);
  const s = Math.max(w / iw, h / ih) * zoom;
  const dw = iw * s, dh = ih * s;
  const fx = Math.min(1, Math.max(0, photo.x ?? 0.5)), fy = Math.min(1, Math.max(0, photo.y ?? 0.5));
  // put the focal point at the rail centre, then clamp so the image still covers the rail
  let dx = w / 2 - fx * dw, dy = h / 2 - fy * dh;
  dx = Math.min(0, Math.max(w - dw, dx));
  dy = Math.min(0, Math.max(h - dh, dy));
  c.drawImage(bm, x + dx, y + dy, dw, dh);
}

async function drawRail(c, data, opts) {
  const { x, y, w, h, r } = RAIL, b = 6;
  const accent = data.colours.accent;
  let fallback = null;
  if (!opts.photo) fallback = await loadRailImage(data.sport);
  c.save();
  rrect(c, x, y, w, h, r); c.clip();
  if (opts.photo) drawCover(c, opts.photo);
  else if (fallback) c.drawImage(fallback, x, y, w, h);
  else drawFallbackGradient(c);
  c.restore();
  // accent border
  rrect(c, x + b / 2, y + b / 2, w - b, h - b, r - b / 2);
  c.lineWidth = b; c.strokeStyle = accent; c.stroke();
}

function drawIcon(c, icon, x, y, s) {
  c.save();
  rrect(c, x, y, s, s, s * 0.22); c.clip();
  if (icon) c.drawImage(icon, x, y, s, s);
  else { c.fillStyle = '#0F2A42'; c.fillRect(x, y, s, s); }
  c.restore();
  rrect(c, x + 0.5, y + 0.5, s - 1, s - 1, s * 0.22);
  c.lineWidth = 1.5; c.strokeStyle = 'rgba(255,255,255,0.14)'; c.stroke();
}

/** Brand wordmark: "SCOR" + the favicon X mark, as in /images/Card.png. Returns the right edge. */
function drawWordmark(c, mark, x, baseline, size) {
  c.font = font(UI, size); c.fillStyle = '#fff'; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
  c.fillText('SCOR', x, baseline);
  const capH = size * 0.72;
  const mh = capH * 1.55, mw = mark ? mh * mark.width / mark.height : 0;
  const mx = x + c.measureText('SCOR').width + size * 0.08;
  if (mark) c.drawImage(mark, mx, baseline - capH / 2 - mh / 2, mw, mh);
  else c.fillText('X', mx, baseline);
  return mx + mw;
}

function drawFooter(c, brand) {
  const [icon, mark] = brand;
  c.fillStyle = 'rgba(0,0,0,0.38)'; c.fillRect(0, 1790, CARD_W, CARD_H - 1790);
  c.fillStyle = 'rgba(255,255,255,0.08)'; c.fillRect(0, 1790, CARD_W, 2);
  drawIcon(c, icon, 60, 1823, 66);
  drawWordmark(c, mark, 146, 1857, 34);
  c.font = font(UI, 21); c.fillStyle = TURQ;
  drawTracked(c, 'GROW YOUR GAME', 147, 1885, 5.4);
  c.font = font(COND, 26); c.fillStyle = 'rgba(255,255,255,0.5)';
  drawTracked(c, 'SCORX.COM.AU', 1024, 1866, 4, 'right');
}

function drawPreviewMark(c) {
  c.save();
  c.beginPath(); c.rect(0, 0, CARD_W, CARD_H); c.clip();
  c.translate(CARD_W / 2, CARD_H / 2); c.rotate(-Math.PI / 6);
  c.font = font(DISPLAY, 130); c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillStyle = 'rgba(255,255,255,0.25)';
  c.strokeStyle = 'rgba(0,0,0,0.12)'; c.lineWidth = 2;
  for (let row = -4; row <= 4; row++) {
    for (let col = -2; col <= 2; col++) {
      const px = col * 920 + (row % 2 ? 460 : 0), py = row * 430;
      c.fillText('PREVIEW', px, py); c.strokeText('PREVIEW', px, py);
    }
  }
  c.restore();
}

// ---------- public ----------
export async function renderSplitRail(canvas, data, opts = {}) {
  const [, brand] = await Promise.all([ensureFonts(), loadBrandAssets()]);
  const scale = opts.scale || 1;
  canvas.width = Math.round(CARD_W * scale);
  canvas.height = Math.round(CARD_H * scale);
  const c = canvas.getContext('2d');
  c.setTransform(scale, 0, 0, scale, 0, 0);
  c.imageSmoothingQuality = 'high';
  const colours = {
    primary: data.colours?.primary || '#0F2A44',
    accent: data.colours?.accent || TURQ,
    secondary: data.colours?.secondary || '#8EC5F0',
  };
  const d = { ...data, colours };
  drawBackground(c, colours);
  drawLeft(c, d);
  await drawRail(c, d, opts);
  drawFooter(c, brand);
  if (opts.preview) drawPreviewMark(c);
  return canvas;
}

export function toJpegBlob(canvas, quality = 0.9) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Could not create the image.'))), 'image/jpeg', quality);
  });
}
