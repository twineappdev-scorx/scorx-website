// STUB — Workstream B replaces this. Draws a placeholder so other screens can integrate.
export const CARD_W = 1080, CARD_H = 1920;
export const RAIL = { x: 476, y: 56, w: 548, h: 1660, r: 48 };
export async function ensureFonts() {}
export async function renderSplitRail(canvas, data, opts = {}) {
  const s = opts.scale || 1; canvas.width = CARD_W * s; canvas.height = CARD_H * s;
  const c = canvas.getContext('2d'); c.scale(s, s);
  c.fillStyle = data.colours.primary; c.fillRect(0, 0, CARD_W, CARD_H);
  c.fillStyle = '#fff'; c.font = '900 120px sans-serif';
  c.fillText(`${data.home.score} – ${data.away.score}`, 60, 900);
  if (opts.photo) { c.save(); c.beginPath(); c.rect(RAIL.x, RAIL.y, RAIL.w, RAIL.h); c.clip(); c.drawImage(opts.photo.bitmap, RAIL.x, RAIL.y, RAIL.w, RAIL.h); c.restore(); }
  if (opts.preview) { c.font = '900 160px sans-serif'; c.globalAlpha = .25; c.fillText('PREVIEW', 120, 1200); }
  return canvas;
}
export function toJpegBlob(canvas, quality = 0.9) { return new Promise(r => canvas.toBlob(r, 'image/jpeg', quality)); }
