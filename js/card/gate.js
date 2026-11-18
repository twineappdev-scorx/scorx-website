// Email gate: validates and (when a backend is configured) posts the request to the Supabase edge function.
import { CARD_REQUEST_URL } from './config.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TIMEOUT_MS = 15000;

export function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 254 && EMAIL_RE.test(email.trim());
}

/** → { ok: true } | { ok: false, error: 'user-facing message' } */
export async function submitCardRequest({ email, nurture = false, sideline = false, sport = '', source = '/card', turnstileToken = '' }) {
  const addr = String(email || '').trim();
  if (!isValidEmail(addr)) return { ok: false, error: 'Please enter a valid email address.' };

  if (!CARD_REQUEST_URL) {
    console.info('[card] dev mode: no backend configured');
    return { ok: true };
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(CARD_REQUEST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: addr, nurture: !!nurture, sideline: !!sideline, sport, source, turnstileToken }),
      signal: ctrl.signal,
    });
    if (res.ok) return { ok: true };
    if (res.status === 429) return { ok: false, error: 'Too many requests, try again in a little while.' };
    if (res.status === 400) return { ok: false, error: 'That email address doesn’t look right. Please check it and try again.' };
    if (res.status === 403) return { ok: false, error: 'We couldn’t confirm you’re human. Please try the check again.' };
    return { ok: false, error: 'Something went wrong on our side. Please try again in a moment.' };
  } catch (e) {
    if (e && e.name === 'AbortError') return { ok: false, error: 'That took too long. Check your connection and try again.' };
    return { ok: false, error: 'We couldn’t reach the server. Check your connection and try again.' };
  } finally {
    clearTimeout(timer);
  }
}
