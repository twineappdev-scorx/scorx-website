// Holds the finished card (blob + filename) between the composer and done screens,
// and shares it (Web Share with files) or downloads it.

let result = null; // { blob, filename }

const slug = s => String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 24);

export function makeFilename(data) {
  const home = slug(data && data.home && data.home.name) || 'home';
  const away = slug(data && data.away && data.away.name) || 'away';
  const date = (data && data.date) || new Date().toISOString().slice(0, 10);
  return `scorx-${home}-v-${away}-${date}.jpg`;
}

export function setResult(blob, filename) { result = { blob, filename }; }
export function getResult() { return result; }
export function clearResult() { result = null; }

/** → 'share' | 'download' | 'cancelled' | 'none' */
export async function shareOrDownload() {
  if (!result) return 'none';
  const { blob, filename } = result;
  const file = new File([blob], filename, { type: 'image/jpeg' });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'Full-time card' });
        return 'share';
      } catch (e) {
        if (e && e.name === 'AbortError') return 'cancelled';
        // Any other share failure: fall through to a plain download.
      }
    }
  } catch { /* canShare threw: download instead */ }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  return 'download';
}
