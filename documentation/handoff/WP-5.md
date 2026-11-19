# WP-5 hand-off: features page restructure

Branch: `wp-5-features` (from `claude/zealous-rubin-a0gycr`).

## Files changed
- `features.html` (rewritten body; Meta Pixel block untouched; added `tokens.css` and `components.css` links).
- `documentation/handoff/screens/wp-5/features-{375,768,1280}.png` (full page).
- This note.

## New outline
- H1: Youth Athlete Performance Tracking & AI Sports Training Recommendations (kept for the keyword).
- H2 `#score`: Live Game Scoring; Stat Recording; Voice Stat Recording (Premium); Import Your Team From a Spreadsheet (PlayHQ .xlsx/.csv, Free); iPad Team Mode (Free, `images/ipad/lineup_ipad.png`); Share, Invite and Move Games (game pack export/import, Share Extension, Match Invitations, attendance).
- H2 `#track`: Game History and Season Stats (20-game Free cap stated); Charts and Game Stats; Post-Game Triage and Reflections (sentiment moved here); Player Cards and Share Cards (Free style vs Premium library and carousel); Season Stories, Export and Sync (Premium); "No ads. We never sell your data."
- H2 `#train`: one summary card with Free/Premium chips and a link to `/train.html`.
- Below the pillars: FAQ heading and CTA heading are non-H2 (H3 and a styled paragraph, inline-styled to match the H2 look) so the page has exactly three H2s.
- FAQ: 9 questions. JSON-LD generated from the visible text and checked equal by script (9 of 9 match).

## Fixes applied
"10 metrics" now 14 plus custom (Free 1, Premium unlimited); "age and gender" now "age and sex"; benchmarking labelled Free; trial is full Premium for 30 days, no card; "no retention limit / no roster caps / unlimited on every plan" replaced by Free limits (5 teams, 25 players, 20 saved games) and Premium unlimited. "No analytics tracking" removed (D6). Meta description 154 characters.

## Removed
- "See ScorX in Action" and Light & Dark Mode showcase: the light/dark images (`newhomelanding*.webp`) show the home dashboard, and the Home feed must not be mentioned. Other demo images were folded into the pillar cards.
- "CloudKit uses Apple's end-to-end encryption" and "Full data export" privacy bullets: not in `app-facts.md`.

## ASSET NEEDED slots (HTML comments in the page, sections text-only)
A-18 voice recording (P0), A-19 team import (P0), A-20 Share Cards carousel (existing final score card shown meanwhile). Not added as comments, still wanted: A-22 game pack, A-23 Share Extension, A-24 iPad magnet board (the existing iPad shot is a lineup list, so the caption says "plan your lineup" only).

## Verification
- Jekyll build OK; served `_site` locally. Playwright at 375, 768, 1280 (scale 1): no horizontal scroll, all images load, h2 ids = score, track, train.
- Claim grep (unlimited, no caps, no limit, no retention, roster cap, indefinitely, no tracking, 10 metrics, gender, Basic, Home feed, exclamation marks): only true "unlimited" Premium statements remain.

## Open items for the owner
1. Voice recording tier (Premium) is from the scope doc and not owner-restated; confirm.
2. Share Extension and Match Invitations wording is deliberately generic; no detail is in app-facts.
3. "Magnet board" is not mentioned on this page because no screenshot shows it.
4. The "Coaches see the same triage across the squad" and "player photos / attendance" bullets are carried over from the old page, not re-verified.
5. `/train.html` link will 404 until WP-3 merges.
6. Other pages (nav, `sports-graphic-generator.html`) may link to removed anchors; none were found in this file.
