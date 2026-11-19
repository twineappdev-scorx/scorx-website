# WP-2 hand-off: pricing and limit accuracy

Branch: `wp-2-pricing` (from `claude/zealous-rubin-a0gycr`).

## Files changed
- `pricing.html`: rebuilt around one Free vs Premium comparison table (`.pt-table`, wrapped in `.x-scope`, `.x-tier` chips in headings). Source comment above the table. Added `tokens.css` and `components.css` links plus a small inline `<style>` for the table. Short plan cards kept above the table. "What's the difference?" section removed (the table replaces it). "No tracking" replaced with "No ads. We never sell your data." New H1 "ScorX Pricing: Free for Every Athlete", new meta (152 chars). FAQ rewritten (7 questions, including the 20-game cap answer) and JSON-LD regenerated to match.
- `support.html`: limits fixed in "Is ScorX really free?", Premium, trial and cancel answers; new FAQ "What happens when I reach 20 saved games?" (visible and JSON-LD).
- `terms.html` line 131: only the Free-tier limits clause replaced. **Flagged for owner review (legal text).**
- `free-junior-afl-stats-app.html`: repositioned from "no limits" to "5 teams, 25 players, 20 saved games". Title, meta (151 chars), OG/Twitter, both JSON-LD blocks, hero, feature cards, the "what free means" section (was "three kinds of free", which contradicted a capped plan), Premium and FAQ copy.
- `download.html`: trial promo line (benchmarking removed from Premium list, limits lifted).
- `about.html`: pricing paragraph, privacy paragraph (no more "no third-party data sharing" or "no tracking"), CTA line ("no artificial limits" removed).
- `sports/afl/index.html`: body line about the free AFL page now states 5/25/20.
- `how-it-works.html`, other `sports/*/index.html`: checked, no false claims (no edits). None says a sport count that contradicts 16.
- `documentation/handoff/screens/wp-2/*.png`: 375, 768, 1280 for pricing, support, free-junior-afl, download, how-it-works, about, sports-afl. No horizontal scroll at any width.

## Decisions relied on
`pricing.json` (2026-11-19) and `app-facts.md`: caps 5/25/20 total, new games blocked at 20; benchmarking Free; 14 metrics, custom 1/unlimited; trial is full Premium, no card, limits lifted; Free card "One standard Player Card style"; email unchanged (no `support@scorx` found); "No ads. We never sell your data."

## Checks
- Claim grep (`unlimited|no caps|no limit|no retention|roster cap|indefinitely|no tracking|no artificial|10 metrics|ten athleticism|no game cap`) over owned files: remaining hits are all true Premium-unlimited statements.
- FAQ check (`check_faq.py`, strips tags, unescapes, compares question and answer): pricing 7/7, support 28/28, free-junior-afl 6/6 identical.
- `jekyll build` OK. Table cells match `pricing.json` row by row.

## Open items for the owner
1. **Voice recording tier is unconfirmed.** Marked Premium (team sports, iOS 26 and later) on pricing, support and the AFL page. Confirm before publishing.
2. **Data above the limits after downgrade or trial end.** Not stated in the facts. I removed "all your data is preserved / no loss of recorded data" from the trial and cancel answers and now say only "your data stays on your device". `pricing.html` cancel FAQ still says "game data and recorded statistics are preserved on your device regardless of subscription status": confirm it holds for users above 20 games.
3. **"30-day money-back guarantee on Premium"** (pricing "All plans include") is unverified and not in the facts; left as is. Apple handles refunds, so it may be wrong.
4. `about.html` still says "GDPR and CCPA compliant"; with PostHog live, the owner/legal should check that alongside `privacy.html`.
5. `terms.html:131` also: the Premium line on 132 does not mention voice or Train; legal wording left alone.
6. Pricing page H1 now renders in the tokens.css display face because `tokens.css` is loaded; check this is the wanted look.

## Requests for other WPs
- `index.html`, `features.html`, `llms.txt`, `agent.json`: remove "unlimited teams/players/games" for Free and "10 metrics"; benchmarking is Free; trial is full Premium.
- `llms.txt` / `agent.json` / `sitemap.xml`: pricing facts to match `pricing.json`.
- `privacy.html`: owner to update for PostHog.
- `scorx-vs-gamechanger.html`: still has "no tracking" lines (not in WP-2).
- `coaches.html` and sports pages' coach blocks still say "free, forever" without naming the 5/25/20 limits; WP owner of `coaches.html` may want to add them.
