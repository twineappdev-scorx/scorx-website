// Per-sport scoring + period config for the /card web demo.
// `buttons` are the tappable plates in the game view; `points` is what one tap adds to the total.
// `breakdown(score)` returns the small line under the total on the card (AFL only), or ''.

export const SPORTS = {
  afl: {
    id: 'afl', label: 'AFL', name: 'Australian Football',
    periods: 4, periodLabel: 'Q', periodName: 'Quarter', periodMinutes: 12,
    buttons: [
      { key: 'g', label: 'G', name: 'goal', points: 6 },
      { key: 'b', label: 'B', name: 'behind', points: 1 },
    ],
    breakdown: s => `${s.g || 0}.${s.b || 0}`,
  },
  netball: {
    id: 'netball', label: 'Netball', name: 'Netball',
    periods: 4, periodLabel: 'Q', periodName: 'Quarter', periodMinutes: 10,
    buttons: [{ key: 'goal', label: 'Goal', name: 'goal', points: 1 }],
    breakdown: () => '',
  },
  basketball: {
    id: 'basketball', label: 'Basketball', name: 'Basketball',
    periods: 4, periodLabel: 'Q', periodName: 'Quarter', periodMinutes: 10,
    buttons: [
      { key: 'p1', label: '+1', name: 'free throw', points: 1 },
      { key: 'p2', label: '+2', name: 'two pointer', points: 2 },
      { key: 'p3', label: '+3', name: 'three pointer', points: 3 },
    ],
    breakdown: () => '',
  },
  soccer: {
    id: 'soccer', label: 'Soccer', name: 'Soccer',
    periods: 2, periodLabel: 'H', periodName: 'Half', periodMinutes: 25,
    buttons: [{ key: 'goal', label: 'Goal', name: 'goal', points: 1 }],
    breakdown: () => '',
  },
};

export const SPORT_ORDER = ['afl', 'netball', 'basketball', 'soccer'];

/** Total points from a counts object, e.g. {g:13, b:6} → 84 for AFL. */
export function total(sportId, counts) {
  const sport = SPORTS[sportId];
  return sport.buttons.reduce((sum, b) => sum + (counts[b.key] || 0) * b.points, 0);
}

/** Empty counts object for a sport, e.g. {g:0, b:0}. */
export function emptyCounts(sportId) {
  return Object.fromEntries(SPORTS[sportId].buttons.map(b => [b.key, 0]));
}
