// Single game state for the /card demo, persisted to localStorage after every change.
// Never stores the photo itself (only its pan/zoom), never stores the email.

import { SPORTS, emptyCounts, total } from './sports.js';

const KEY = 'scorx-card-v1';
const listeners = new Set();

export function newGame(sportId = 'afl') {
  return {
    v: 1,
    mode: null,               // 'live' | 'result'
    screen: 'start',          // start | setup | game | result | composer | done
    sport: sportId,
    competition: '',          // e.g. 'Under 16s League' (optional)
    round: '',                // e.g. '12' (optional)
    date: new Date().toISOString().slice(0, 10),
    home: { name: '', initial: '', counts: emptyCounts(sportId) },
    away: { name: '', initial: '', counts: emptyCounts(sportId) },
    colours: { mode: 'scorx', primary: '#7C1430', accent: '#F2C14E', secondary: '#8EC5F0' },
    clock: {
      period: 1,              // 1-based
      periodMs: SPORTS[sportId].periodMinutes * 60000,
      running: false,
      startedAt: null,        // Date.now() when last started
      elapsedMs: 0,           // banked elapsed time before startedAt
    },
    periodScores: [],         // [{period, home:{...counts}, away:{...counts}}] snapshot at each break
    history: [],              // undo stack: [{team:'home'|'away', key:'g'}]
    finished: false,
    photo: { x: 0.5, y: 0.5, zoom: 1 },   // pan/zoom only; the bitmap lives in memory
  };
}

let state = load() || newGame();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s && s.v === 1 ? s : null;
  } catch { return null; }
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode etc. */ }
}

export const getState = () => state;

/** Mutate via a function, then persist + notify. update(s => { s.round = '12'; }) */
export function update(fn) {
  fn(state);
  save();
  listeners.forEach(l => l(state));
}

export function replace(next) { state = next; save(); listeners.forEach(l => l(state)); }
export function reset(sportId) { replace(newGame(sportId)); }
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }

/** True if there's a saved game worth offering to resume. */
export function hasResumable() {
  const s = state;
  return !!(s.mode && !['start', 'done'].includes(s.screen) && (s.home.name || s.away.name));
}

// ── Scoring helpers ────────────────────────────────────────
export function score(team, key) {
  update(s => { s[team].counts[key] = (s[team].counts[key] || 0) + 1; s.history.push({ team, key }); });
}
export function undo() {
  update(s => {
    const last = s.history.pop();
    if (last) s[last.team].counts[last.key] = Math.max(0, (s[last.team].counts[last.key] || 0) - 1);
  });
}
export const points = team => total(state.sport, state[team].counts);

/** Data object for the card renderer (see documentation/card-build-contracts.md). */
export function cardData() {
  const s = state, sport = SPORTS[s.sport];
  const side = t => ({
    name: s[t].name || (t === 'home' ? 'Home' : 'Away'),
    initial: (s[t].initial || s[t].name || '?').trim().charAt(0).toUpperCase(),
    score: total(s.sport, s[t].counts),
    breakdown: sport.breakdown(s[t].counts),
  });
  return {
    sport: s.sport,
    sportLabel: sport.label,
    competition: s.competition,
    round: s.round,
    date: s.date,
    home: side('home'),
    away: side('away'),
    colours: s.colours.mode === 'team'
      ? { primary: s.colours.primary, accent: s.colours.accent, secondary: s.colours.secondary }
      : { primary: '#0F2A44', accent: '#1FEDD8', secondary: '#8EC5F0' },
  };
}
