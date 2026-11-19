# ScorX app facts for website copy

**Last verified:** 2026-11-19, by owner interview against the current App Store build.
**Use with:** `pricing.json` (prices, limits, tier lists). If this file and `pricing.json` disagree, stop and ask the owner. Don't pick one.

This file is the only feature reference for site copy. Agents can't see the app repo, so anything not listed here is unverified: leave existing copy alone and raise it in your hand-off note.

---

## Owner decisions (2026-11-19)

| ID | Question | Answer |
|---|---|---|
| D1 | Free tier limits | **Real: 5 teams, 25 players, 20 saved games.** The site must change to match. |
| D1b | What happens at the 20-game cap | **New games are blocked.** To save another, delete a game or upgrade to Premium. The 20 is a total, not per month. |
| D2 | Train tiers | Within Train, **only AI training recommendations and the full run drill library (sprint/interval drills and custom run drills) are Premium.** Everything else in Train is Free: Development Plan, BHAG, goal mode, **age/sex benchmarking (moved from Premium to Free)**, drill and play libraries including save/import, Training Sessions and Run Session, drill assignment and team results, favourites, injury prevention programs. |
| D3a | Athleticism metrics | **14 baseline metrics**, plus custom metrics: Free 1, Premium unlimited. Replace every "10 metrics". |
| D3b | Trial scope | **Full Premium for 30 days, no card**, with no team/player/game limits during the trial. (The scope doc said the trial excluded export and limits. That was wrong.) |
| D3c | Free card wording | Keep **"One standard Player Card style"**. The full card library, Share Cards carousel, sticker cards and card configurator are Premium. |
| D4 | Released in the App Store build | **All of these: voice stat recording, PlayHQ spreadsheet import, Training Sessions + Run Session, Drill and Play Animators, Share Cards carousel, iPad Team Mode, game pack export/import, Share Extension.** Still not released (don't mention): the Home feed / Home landing. |
| D5 | Support email | **scorxapp@gmail.com** everywhere. No change. |
| D6 | Analytics | **PostHog is live in the app.** "No tracking" is false and must come off the site. Use "No ads. We never sell your data." The owner updates `privacy.html` separately; agents don't edit legal text about analytics. |
| D7 | Minimum iOS | **iOS 18.0.** Voice recording needs iOS 26 or later; say that wherever voice is mentioned. |

### Second round of owner decisions (2026-11-19)

| ID | Question | Answer |
|---|---|---|
| D8 | Voice recording tier | **Premium** (confirmed). |
| D9 | "30-day money-back guarantee" | **Remove it.** Premium is billed through the App Store, so refunds go through Apple. Say "Cancel anytime in your App Store settings." |
| D10 | Data after the trial ends or Premium stops, when over the Free limits | **Everything is kept and stays viewable (read-only).** You can't add new games, teams or players until you're under the limit or upgrade. |
| D11 | "25 players" | **25 players in total across the account**, not per team. |
| D12 | iCloud end-to-end encryption | **Unknown. Make no encryption claim.** Say "syncs through your own iCloud account" (Premium). |
| D13 | Competitor claims without a source (prices, user counts, "150+ stats", Spond "ads") | **Remove them.** Keep only qualitative differences that can be checked. |
| D14 | Racquet sports stats | Simplified game tracking **plus aces and let/stroke calls**. **Not** serve % and **not** pickleball kitchen violations. |
| D15 | Drill library scope | **AFL drills, plus running drills for every sport.** Don't promise other sports' skill drills. |
| D16 | Privacy policy | Draft a PostHog/analytics section for owner and legal review on a separate branch. It must not ship without approval. |
| D17 | `train.html` primary keyword | **Research first** (seo-strategy) before shipping. |

---

## Features by pillar

Tier: **F** = ScorX Free, **P** = ScorX Premium.

### Score
| Feature | Tier | Notes |
|---|---|---|
| Live scoring, 16 sports (10 team, 6 racquet) | F | Racquet sports: simplified game tracking plus aces and let/stroke calls (D14) |
| Team mode and individual stat recording | F | |
| Voice stat recording | P | Team sports only, iOS 26 and later |
| Quick score, offline | F | |
| Player rotations and playing time | F | |
| Match Invitations (distributed stat recording) | F | |
| Spreadsheet team import (PlayHQ .xlsx/.csv) | F | Write "PlayHQ" as plain text; no logo, no partnership implied |
| Game pack export/import | F | |
| iPad Team Mode (magnet board, lineup planning) | F | |
| Share Extension | F | |

### Track
| Feature | Tier | Notes |
|---|---|---|
| Game history and per-game activity timeline | F | Free keeps up to 20 saved games; Premium unlimited |
| Season and career stats, Career Timeline | F | |
| Post-Game Triage Dashboard | F | |
| Perception vs Reality | F | |
| Player sentiment and reflections | F | |
| One standard Player Card style | F | |
| Full card library, Share Cards carousel, sticker cards, card configurator | P | |
| AI Season Narratives | P | |
| PDF/CSV export, iCloud sync | P | |

### Train
| Feature | Tier | Notes |
|---|---|---|
| Measure: 14 baseline metrics, log results, trend + progress chart | F | |
| Age and sex-specific benchmarking | F | Changed from Premium on 2026-11-19 |
| Goal mode (target per metric, goal line on chart) | F | |
| Custom metrics | F: 1, P: unlimited | |
| BHAG (one big player-level goal) | F | Explain it before using the acronym |
| Development Plan (skills, 2 drills each, outcome goal, S&C goal) | F | |
| Run drills: Beep Test, 800m TT, 2km TT | F | |
| Full run drill library (sprint, interval) | P | |
| Custom run drills | P | |
| Drill Library + Drill Animator | F | AFL drills, plus running drills for every sport (D15) |
| Play Library + Play Animator | F | |
| Training Sessions + Run Session (beep pacing) | F | |
| Drill assignment to a squad, team results | F | |
| Favourite drills | F | |
| Injury prevention and general programs | F | |
| AI training recommendations and AI athleticism insight | P | Regenerates every 30 days or after 5 games |

### Premium extras
Unlimited teams, players, games and custom metrics; Family Sharing (5 members); 30-day full trial, no card.

---

## Claims that are now false (remove or reword)
- "Unlimited teams, players and games" for Free, and "no caps / no limits / no retention limit / no roster caps".
- "10 athleticism metrics".
- "Benchmarking is Premium".
- "Training/Train section is Premium" (only AI recommendations and the full run drill library are).
- "No tracking".

### Third round of owner decisions (2026-11-19)

| ID | Question | Answer |
|---|---|---|
| D18 | Meta Pixel on the website | **Keep it, but only behind a cookie consent banner.** Nothing loads until the visitor clicks Accept (Meta Pixel and `js/card/analytics.js`). Declining or ignoring the banner means no tracking. The choice is remembered, and a "Cookie settings" link in the footer lets visitors change it. |
| D19 | Trust line | **"No ads. We never sell your data. Data collection is opt-in and only used to improve the app."** The wording may be shortened to fit, but keep all three points. |
| D20 | App analytics (PostHog) | **Opt-in in the current App Store build.** Off until the user opts in. Used for app improvement only. |
| D21 | `train.html` keyword | **Multi-sport first, AFL second**, e.g. title "Junior Training App: AFL Drills, Beep Test and Fitness Tests". Point AFL-only drill searches at the future `/afl-drills.html`. Research: `documentation/seo-train-keywords.md` on branch `seo-train-keywords`. |
| D22 | `terms.html` legal claims ("no third-party analytics", "no data sharing", E2E encryption) | **Add these to the legal draft branch** `privacy-draft-posthog` for owner/lawyer approval. Don't change them in the release. |
