// Tiny analytics shim. Sends to Meta Pixel custom events and PostHog if present.
// Never throws. Callers must not pass PII (no email, names, photos).

export function track(event, props = {}) {
  try { if (typeof window.fbq === 'function') window.fbq('trackCustom', event, props); } catch { /* ignore */ }
  try { if (window.posthog && typeof window.posthog.capture === 'function') window.posthog.capture(event, props); } catch { /* ignore */ }
}
