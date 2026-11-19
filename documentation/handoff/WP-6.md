# WP-6 hand-off: audience pages

Branch: `wp-6-audiences` (from `claude/zealous-rubin-a0gycr`). Files changed: `athletes.html`, `coaches.html` (plus screenshots in `documentation/handoff/screens/wp-6/`).

## athletes.html (athlete voice)
- New H1 "Record Every Game. Build Your Athlete Development Plan.", new meta description (156 chars).
- Prose 4-step loop replaced by a five-step screenshot-led walkthrough (Measure, set a goal, plan, drills, re-test), all tagged Free. Step 1 uses `measureview.webp`; steps 2 to 5 are `.x-shot__slot` placeholders (A-03, A-04, A-05, A-01).
- "Step 1 & 2" and "Step 3 & 4" headings removed. All `.tier-badge` replaced by `.x-tier` chips.
- Facts fixed: 14 metrics (was ten, with a metric list I couldn't verify), benchmarking now Free, Development Plan and drills Free, only AI recommendations Premium, limits (5 teams, 25 players, 20 saved games), comparison table rebuilt. FAQ and JSON-LD regenerated from one source and verified identical (8 Q&As).
- Links `css/components.css` only (not tokens.css: components have their own fallbacks, and tokens.css overrides legacy fonts). A page-scoped `<style>` holds the walkthrough layout.

## coaches.html (coach voice)
- New H1 and meta (156 chars), explicit Free vs Premium section (dashboard free, weekly AI recommendations Premium), limits stated.
- New sections: Plan Your Training (plays and drills, Training Sessions and Run Session), Test Your Squad, iPad Team Mode (`lineup_ipad.png`, `gameplan_ipad.png`), squad import ("Import your squad from a PlayHQ export", Free) and voice recording (Premium, team sports, iOS 26 or later).
- "Team training focus" retitled "What to work on this week", noting it comes from post-game triage, not the session planner.
- Fixed: unlimited claims, "Premium unlocks Train and benchmarking" (false), iCloud sync marked Premium. FAQ expanded to 11 Q&As (adds training/testing, import, voice, iPad); JSON-LD verified identical.
- Four `<img>` tags pointed at files that never existed (`coach-match-invite.png`, `coach-rotations.png`, `coach-perception-reality.png`, `coach-triage-dashboard.png`). Triage now uses `ipad/dashboard_ipad.png`; the other three are ASSET NEEDED slots.

## Verification
Jekyll build OK. Playwright at 375/768/1280: no horizontal scroll, no broken images (`documentation/handoff/screens/wp-6/{athletes,coaches}-{375,768,1280}.png`). Claim grep: remaining hits are all true per app-facts (Premium unlimited, 14 metrics, "written").

## Open items for the owner
- **Voice recording tier is not owner-confirmed.** I used Premium per `pricing.json`. Confirm.
- Unverified existing copy left as is: the Below Average / Average / Above Average / Excellent benchmark labels, the AI recommendation disclaimer line, "BHAG" described as one big player-level goal (acronym not expanded), session PDF export being Premium (inferred from "PDF/CSV export" in app-facts).
- Is "25 players" per team or in total? Copy repeats pricing.json wording.
- ASSET NEEDED slots: A-03, A-04, A-05, A-01 (athletes); A-11, A-16, A-17, A-18, A-19, A-24 (coaches, as HTML comments); plus the three missing coach screenshots above.
- Cross-file: none.
