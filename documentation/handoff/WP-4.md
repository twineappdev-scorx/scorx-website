# WP-4 hand-off: home page

Branch: `wp-4-home` (from `claude/zealous-rubin-a0gycr`). Only `index.html` changed (the tokens.css and components.css links were already present), plus this note and screenshots.

## Changes
- Hero: headline unchanged. Added subhead "Score it. Track it. Train it." The "training tools" wording (it was in the lede, not a chip) is now "drills, plans and fitness tests". Sport chips checked: AFL, Netball, Basketball, Rugby Union + "+12 more" = 16.
- New `.x-pillars` section (`#pillars`) directly under the hero: Score to `/features.html#score`, Track to `/features.html#track`, Train to `/train.html`. Uses the WP-1 icons.
- Season story: "no game limits" now reads "Free keeps up to 20 saved games. Premium has no limit." The third card names AI training recommendations as Premium. New Train block (`.train-block`) with a lede that splits Free from Premium (14 tests, benchmarking, Development Plan, drill and play libraries are Free; AI recommendations and the full run drill library are Premium), three `.x-shot` figures, and a link to `/train.html`.
- Pricing teaser: "No credit card. Up to 5 teams, 25 players and 20 saved games. Premium removes the limits and starts with a 30-day free trial, no card required." Button is now "Compare Free and Premium".
- Closer trust line: "No ads. We never sell your data." (replaces "no tracking in the app").
- FAQ: offline answer no longer implies free iCloud sync; "Can I try before I buy?" rewritten with the limits and trial; new "What happens when I reach 20 saved games?" and "What do I get free in Train?"; sports answer drops "AI-powered insights" and says the six racquet sports use simplified tracking. FAQPage JSON-LD regenerated from the same text (8 Q&As, checked equal by script).
- JSON-LD: SoftwareApplication offers (Free limits, Premium scope, trial) and featureList match `pricing.json`; "no tracking" removed. Meta description is now 153 characters.

## Train block images
- Shot 1: `images/measureview.webp` (800x1731). This is the Measure input form, so the caption says "Log your results in Measure". Commented `ASSET NEEDED: A-01` marks where the chart and goal line image goes.
- Shot 2: `images/drillcreator.png` (1170x2532), the drill editor, captioned "Build and save your own drills". Not the Drill Animator playback (A-08).
- Shot 3: `x-shot__slot` with `ASSET NEEDED: A-04` (Development Plan).
- All have width/height and `loading="lazy"`.

## Verification
- `jekyll build` OK, served with `python3 -m http.server`.
- Playwright at 375, 768, 1280 (scale 1): scrollWidth equals viewport at all three. Screenshots in `documentation/handoff/screens/wp-4/` (`home-{w}-full|pillars|train.png`).
- Claim grep (unlimited, no limit, no tracking, artificial, 10 metrics, Basic, etc.) on `index.html`: the only hit is "Premium has no limit", which is true. No exclamation marks in copy.
- Python check: FAQ JSON-LD equals visible FAQ (8 = 8).
- Lighthouse was not run (no tool available); new images are lazy-loaded and the added CSS is small.

## Open items
- `/train.html` (WP-3) must exist for the pillar and block links.
- Owner assets: A-01 (Measure chart with goal line) and A-04 (Development Plan); A-08 would replace the drill editor shot with animator playback.
- Not touched, outside the stated scope: the `og:description` and `twitter:description` meta tags (no limit claims), the `/features.html#score` and `#track` anchors (WP-5 must provide them), the "ScorX is free for coaches" line (still true per CLAUDE.md, but coaches are subject to Free limits; WP-6 may want to confirm).
- The "Saturday morning" card still says "The family's commented", which is a parent-voice leftover; left alone as outside the brief.
