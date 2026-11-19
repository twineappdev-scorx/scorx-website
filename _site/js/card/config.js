// Deployment config for /card. Empty values = dev mode (see documentation/card-build-contracts.md).

// Supabase edge function `card-request` URL. Empty → gate validates locally and unlocks without a network call.
export const CARD_REQUEST_URL = '';

// Cloudflare Turnstile site key. Empty → Turnstile widget is skipped.
export const TURNSTILE_SITE_KEY = '';

// App Store Connect provider token (pt=…) for campaign attribution. Empty → link carries ct only.
export const APP_STORE_PROVIDER_TOKEN = '';

const APP_STORE_BASE = 'https://apps.apple.com/au/app/scorx/id6753859833';

/** Campaign-tagged App Store link. ct: 'hero' | 'card-confirm' | 'email-delivery' | 'nurture-n1' … */
export function appStoreUrl(ct) {
  const p = new URLSearchParams();
  if (APP_STORE_PROVIDER_TOKEN) p.set('pt', APP_STORE_PROVIDER_TOKEN);
  p.set('ct', ct);
  p.set('mt', '8');
  return `${APP_STORE_BASE}?${p}`;
}

/** 'ios' | 'android' | 'desktop' — iPadOS reports MacIntel with touch. */
export function deviceKind() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'desktop';
}
