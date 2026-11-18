// Timestamp-based period clock on top of store.clock. Never counts interval ticks:
// elapsed = elapsedMs + (running ? Date.now() - startedAt : 0), so a locked phone or a reload keeps the right time.
// Also holds a Screen Wake Lock while the clock runs (where supported).

import * as store from './store.js';

const clock = () => store.getState().clock;

export function elapsed() {
  const c = clock();
  const live = c.running && c.startedAt ? Math.max(0, Date.now() - c.startedAt) : 0;
  return Math.max(0, (c.elapsedMs || 0) + live);
}
export const remaining = () => Math.max(0, clock().periodMs - elapsed());
export const isRunning = () => !!clock().running;
export const isExpired = () => remaining() <= 0;

export function start() {
  if (clock().running) return;
  store.update(s => { s.clock.running = true; s.clock.startedAt = Date.now(); });
  syncWakeLock();
}

export function pause() {
  if (!clock().running) return;
  const e = Math.min(elapsed(), clock().periodMs);
  store.update(s => { s.clock.elapsedMs = e; s.clock.running = false; s.clock.startedAt = null; });
  syncWakeLock();
}

export function toggle() { isRunning() ? pause() : start(); }

/** If the period has run out, bank exactly periodMs and stop (never goes negative, never auto-advances). */
export function settleIfExpired() {
  const c = clock();
  if (c.running && elapsed() >= c.periodMs) {
    store.update(s => { s.clock.elapsedMs = s.clock.periodMs; s.clock.running = false; s.clock.startedAt = null; });
    syncWakeLock();
    return true;
  }
  return false;
}

/** Record a snapshot via snapshotFn(state) (called inside the update), then move to the next period, clock paused at 0. */
export function nextPeriod(snapshotFn) {
  store.update(s => {
    if (snapshotFn) snapshotFn(s);
    s.clock.period += 1;
    s.clock.elapsedMs = 0;
    s.clock.running = false;
    s.clock.startedAt = null;
  });
  syncWakeLock();
}

/** Stop the clock, banking elapsed time (used at full time). */
export function stop() { pause(); }

export function setPeriodMinutes(min) {
  store.update(s => { s.clock.periodMs = Math.round(min * 60000); });
}

export function fmt(ms) {
  const t = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
}
/** Countdown display: rounds up so a fresh 12-minute period reads 12:00. */
export function fmtRemaining(ms) {
  return fmt(Math.ceil(Math.max(0, ms) / 1000) * 1000);
}

// ── Screen Wake Lock ───────────────────────────────────────
let sentinel = null;
let attached = false;

async function acquire() {
  if (!('wakeLock' in navigator) || sentinel || document.visibilityState !== 'visible') return;
  try {
    const s = await navigator.wakeLock.request('screen');
    if (!attached || !clock().running) { s.release().catch(() => {}); return; }
    sentinel = s;
    s.addEventListener('release', () => { if (sentinel === s) sentinel = null; });
  } catch { /* denied or unsupported: the clock still works */ }
}
function release() {
  const s = sentinel; sentinel = null;
  if (s) s.release().catch(() => {});
}
function syncWakeLock() {
  if (!attached) return;
  if (clock().running) acquire(); else release();
}
function onVisible() { if (document.visibilityState === 'visible') syncWakeLock(); }

/** Call when the game screen is shown. */
export function attach() {
  if (attached) return;
  attached = true;
  document.addEventListener('visibilitychange', onVisible);
  syncWakeLock();
}
/** Call when leaving the game screen. */
export function detach() {
  attached = false;
  document.removeEventListener('visibilitychange', onVisible);
  release();
}
