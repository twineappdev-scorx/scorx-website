// Loads a user-chosen photo for the card: EXIF-corrected, long edge <= 2160. Never uploaded or stored.
const MAX_EDGE = 2160;
const BAD = "That photo format isn't supported here. Please choose a JPG or PNG.";

async function decode(file) {
  if (typeof createImageBitmap === 'function') {
    try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch (e) { /* fall through */ }
  }
  // Fallback (older Safari): <img> honours EXIF orientation by default in modern engines.
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } finally { URL.revokeObjectURL(url); }
}

export async function loadPhoto(file) {
  if (!file || (file.type && !/^image\//i.test(file.type))) throw new Error(BAD);
  let src;
  try { src = await decode(file); } catch (e) { throw new Error(BAD); }
  const sw = src.width || src.naturalWidth, sh = src.height || src.naturalHeight;
  if (!sw || !sh) throw new Error(BAD);
  const k = Math.min(1, MAX_EDGE / Math.max(sw, sh));
  if (k === 1 && typeof ImageBitmap !== 'undefined' && src instanceof ImageBitmap) {
    return { bitmap: src, width: sw, height: sh };
  }
  const w = Math.round(sw * k), h = Math.round(sh * k);
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  if (!ctx) throw new Error(BAD);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(src, 0, 0, w, h);
  if (src.close) src.close();
  return { bitmap: cv, width: w, height: h };
}
