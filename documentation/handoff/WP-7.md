# WP-7 hand-off: comparison and sports overview pages

Branch: `wp-7-compare` (from `claude/zealous-rubin-a0gycr`).

## Files changed
`compare.html`, `scorx-vs-gamechanger.html`, `sports.html`, `sports-graphic-generator.html`. Screenshots: `documentation/handoff/screens/wp-7/{page}-{375,768,1280}.png`.

## Claims fixed
- Limits: "unlimited teams, players and games" / "free forever ... no caps" replaced with Free = 5 teams, 25 players, 20 saved games, Premium unlimited (compare.html strengths, choosing guide, trial FAQ; GameChanger FAQ + JSON-LD; sports-graphic-generator FAQ + JSON-LD, pricing card and hero line, where "unlimited graphics" became "no limit on graphics per game, from up to 20 saved games").
- Benchmarking: now shown as Free, "14 metrics, age and sex" ("age/gender" removed).
- Tiers: Premium description no longer lists benchmarking (generator page); trial wording says full Premium.
- "No tracking" (all occurrences, both comparison pages) replaced with "No ads. We never sell your data." or short forms. `privacy.html` untouched.
- Racquet sports (sports.html): removed stat-recording claims (aces, serve %, let/stroke, kitchen violations, spins) and "precise tracking"; now "simplified game tracking", in cards, subtitle and FAQ (visible text and JSON-LD identical).
- App size rows and mentions removed (ScorX was 24 MB on one page and 11.5 MB on the other; research doc says sizes are unverified).
- Train rows added to both comparison tables: Development Plan, Drill Library, Play Library, Training Sessions, Fitness Tests. Free/Premium split follows app-facts.md.
- Sport count (16, 10 team + 6 racquet) and email (scorxapp@gmail.com) were already correct.

## Competitor handling
The research doc covers only AU junior stat apps and has no data on GameChanger, TeamSnap or Spond. So every new competitor cell reads "Not checked" (no "No" or "-" claimed), with an HTML comment citing the doc. I removed the unsupported competitor privacy claims ("Extensive tracking", "Moderate") and the competitor app sizes.

## Verification
Jekyll build OK. Visible FAQ text equals FAQPage JSON-LD on all three pages with FAQs. Meta descriptions 152, 154, 152, 158 characters. No horizontal scroll at 375, 768 or 1280 (scrollWidth equals viewport). Claim grep clean except legitimate "No limit on graphics per game" and HTML comments about removed size rows.

## Open items
- Existing unsourced competitor claims remain (GameChanger A$149.99, TeamSnap $109.99, "Not supported", "Basic", trial lengths, 150+ stats, 20M+ users, Spond ads). The research doc does not support them; owner should verify or remove. compare.html now says competitor details were last checked August 2026.
- Generator page: app-facts.md lists the "Share Cards carousel" as Premium, while this page presents score and team stat graphics as Free. Owner to confirm that split.
- Voice-recording tier is still open in app-facts.md; not mentioned on these pages.
