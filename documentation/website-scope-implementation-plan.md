# Implementation plan: Website Scope Gap Review (2026-11-19)

Source: `website-scope.md` (gap review dated 2026-11-19). This plan turns it into work packages that Sonnet agents can run in parallel without editing the same files.

Branch model: each work package (WP) runs on its own branch cut from the integration branch `claude/zealous-rubin-a0gycr` (or its own worktree). The integrator (WP-9) merges them. Owner approval is needed before anything reaches `main`, because GitHub Pages deploys from `main`.

---

## 0. Corrections to the scope doc

Read these before starting. They change parts of the scope.

1. **The headline P0 contradicts this repo's source of truth.** `pricing.json` (updated 2026-06-06) and `CLAUDE.md` both say Free has unlimited teams, players and games. The scope doc says the app now caps "Basic" at 5 teams, 25 players and 20 stored games (tier table verified 2026-10-28). One of them is wrong. The owner decides (D1) and records the answer in `pricing.json` before any agent edits pricing copy. Agents must not "fix" limits on their own reading of the scope doc.
2. **"Basic" is the app's internal tier name.** The site calls the tier **ScorX Free**. Don't put "Basic" in site copy.
3. **The site is Jekyll on GitHub Pages, not plain static HTML.** It has `_config.yml`, `_includes/site-header.html`, `_includes/site-footer.html`, `_layouts/` and `_posts/`. `CLAUDE.md` says "no build process"; that is out of date. Every page needs front matter (`---` block) for includes to work. Ten root pages use the header include. These pages hard-code their own header and footer and need separate edits: `404.html`, `sports/*/index.html` (8 pages), `card/index.html`, `blog/index.html`, `match/index.html`, `go/index.html`.
4. **Agents can't check the app.** `TierLimits`, `SubscriptionService`, the app `CLAUDE.md` and `Documentation/` live in the app repo, which these sessions can't reach. Every "verify against the app" item in the scope doc goes to the owner as a decision (section 1). The answers are written into `pricing.json` and `documentation/app-facts.md`, and agents only read those files.
5. **Voice guide scope.** `documentation/voice-athlete-first.md` rule 8 says don't touch `coaches.html` or layout/CSS. That rule was for the earlier copy-only pass. For this work: athlete-facing pages follow the voice guide; `coaches.html` keeps the coach voice; new layout and CSS are allowed only where a WP says so.
6. **Screenshots.** Only some Train assets exist: `images/measureview.webp`, `images/drillcreator.png`, `images/playcreator.png`, `images/ipad/*.png`, `documentation/reference/train-measure-combined.html`. There are none for Development Plan, Create Metric, Run Session, voice recording or team import. Agents must not invent UI mock-ups that pretend to be the app. Use existing images, or leave a commented `<!-- ASSET NEEDED: ... -->` slot and keep the section text-only until the owner supplies the image.
7. **The "no tracking" claim is live** on `pricing.html` and on seven lines of `scorx-vs-gamechanger.html`. If PostHog autocapture ships in the app, that claim and `privacy.html` are wrong. This is a legal question for the owner (D6), not a copy edit.
8. **Out of scope for agents:** the `/afl-drills.html` animation clips (Remotion tooling is on the owner's machine), App Store screenshots, and anything marked "In progress" in the app (Home feed, Share Extension unless D4 says released).

---

## 1. Phase 0: owner decisions (ANSWERED 2026-11-19)

All answered. WP-0 is done: answers are in `documentation/app-facts.md` and `pricing.json`. In short: Free caps are real (5/25/20, new games blocked at the cap); in Train only AI recommendations and the full run drill library are Premium (benchmarking is now Free); 14 metrics + custom (1/unlimited); the trial is full Premium; Free card stays "one standard Player Card style"; every D4 feature is released except the Home feed; email stays scorxapp@gmail.com; PostHog is live so "no tracking" goes; minimum iOS 18.0. The table below is kept for reference.

| ID | Decision | Blocks |
|---|---|---|
| D1 | Free tier limits: does the app cap Free at 5 teams / 25 players / 20 games, or are they unlimited? If capped, is the 20-game cap total or rolling, and what happens at the cap (read-only, delete oldest, upsell)? | WP-2, WP-3, WP-4, WP-6, WP-7 |
| D2 | Tier of: Development Plan, BHAG, Goal mode, benchmarking, Coach Drill Assign / Team Results, favourite drills, injury prevention programs, Drill/Play Library viewing (vs save/import) | WP-3, WP-4, WP-5, WP-6 |
| D3 | Metric count wording: "14 baseline metrics + custom (Free 1, Premium unlimited)"? Is the Free card "final score + top 3 activities"? Exact trial scope (excludes export and quantity limits?) | WP-2, WP-3, WP-4, WP-5 |
| D4 | Released in the current App Store build (yes/no each): voice recording (iOS 26), spreadsheet/PlayHQ import, Share Cards carousel, game pack export/import, Share Extension, iPad Team Mode, Run Session with beep pacing, Drill Animator (AFL), Play Animator | WP-3, WP-4, WP-5, WP-6, WP-10 |
| D5 | Canonical support email: keep `scorxapp@gmail.com` or move to `support@scorx.app` (or an `@scorx.com.au` mailbox, per the note in `_config.yml`)? Is that mailbox live? | WP-1 |
| D6 | Does the app send analytics (PostHog)? If yes, approve replacement wording for "no tracking" and confirm the privacy policy will be updated by the owner/legal | WP-7, WP-9 |
| D7 | Minimum iOS version still 18.0? (needed if voice is described as iOS 26 only) | WP-5 |

Original recommendation on D1 (owner chose: change the site): if the app really caps Free, change the site, not the app, unless the caps were an accident. The site has promised "unlimited" since April 2026, so existing users may have more than 20 games. Check what the app does to them before you write the new copy.

---

## 2. Work packages

Each WP lists the files it **owns** (only it may edit them). Any WP may **read** any file. If a WP needs a change in a file it doesn't own, it writes the request in its hand-off note and doesn't make the edit.

Every WP must:
- read `CLAUDE.md`, `documentation/voice-athlete-first.md`, `pricing.json` and `documentation/app-facts.md` first;
- use Australian English and no exclamation marks;
- keep the visible FAQ text and FAQPage JSON-LD identical when either changes;
- keep meta descriptions 150–160 characters, with the page's primary keyword in title, H1 and meta;
- serve the site locally with `bundle exec jekyll serve` if Jekyll is available, else `python3 -m http.server 8000` (includes won't render; check the raw markup instead);
- check at 375px, 768px and 1280px with Playwright and attach screenshots to the hand-off note;
- end with a hand-off note in `documentation/handoff/WP-N.md`: files changed, decisions relied on, open items, cross-file requests.

### WP-0: Facts lock: DONE 2026-11-19
**Depends on:** D1–D7 answered.
**Owns:** `pricing.json`, `documentation/app-facts.md` (new), `CLAUDE.md`.
1. Create `documentation/app-facts.md`: one table per pillar (Score / Track / Train) listing each feature, its tier (Free/Premium), its release status, and the user-facing name. Copy the decisions table from section 1 with the answers filled in. Add a header line: "Last verified against app version X on DATE". This file is the only feature reference for later WPs.
2. Update `pricing.json`: `limits` per D1, Free feature list (metric count, Free card description), add a `train` feature list split by tier, set `updated`. Bump `schema` minor version if fields are added.
3. Update `CLAUDE.md`: say the site is Jekyll on GitHub Pages; fix the File Structure (Coach/Club tiers and "4 pricing tiers" are stale); point pricing rules at `pricing.json` and feature facts at `app-facts.md`; update "Key Statistics & Claims" if D1/D3 change them.
**Done when:** the two files exist and are valid (`python3 -m json.tool pricing.json`), and no line of `CLAUDE.md` contradicts them.

### WP-1: Shared components, navigation and contact email (serial, after WP-0)
**Owns:** `_includes/site-header.html`, `_includes/site-footer.html`, `_config.yml`, `css/components.css`, `css/tokens.css`, the header/footer blocks only of `404.html`, `sports/*/index.html`, `card/index.html`, `blog/index.html`, `match/index.html`, `go/index.html`.
1. **Navigation:** add "Train" (→ `/train.html`) to the header include and to every hard-coded header listed above. Use `active="train"` support. Keep the order: Athletes, Coaches, Train, Sports, Pricing, Blog, Make a card, Download Free. Check the mobile menu at 375px still fits. If it doesn't, drop "Make a card" from the top level into the footer only after asking the owner.
2. **Footer:** add Train under the product links in the include and the hard-coded footers.
3. **Contact email (D5):** no change. scorxapp@gmail.com stays everywhere. Only check that no page uses `support@scorx.app`.
4. **Components** (append to `css/components.css`, documented with a comment header, using existing tokens):
   - `.x-tier` with `--free` and `--premium` modifiers: small chip. Match the existing pricing-page chip style. WCAG AA contrast in light and dark.
   - `.x-pillars`: three-column Score / Track / Train grid. Stacks at < 768px. Each column has an icon slot, heading, 3–4 bullets, and a link.
   - `.x-shot`: a screenshot figure (phone or iPad frame, caption, `loading="lazy"`, width/height set) for screenshot-led sections.
   - Pillar icons: inline SVG in `images/icons/score.svg`, `track.svg`, `train.svg`. Use simple strokes in brand turquoise. They must not look like the logo mark.
5. Add a demo of all three components to `documentation/components-demo.html` (excluded from the build), so later WPs can copy the markup.
**Done when:** every page's nav contains Train (`grep -L 'train.html' *.html sports/*/index.html card/index.html blog/index.html` returns only pages with no nav), the components render at three widths, and the hand-off lists the email occurrences per owning file.

### Phase 2: parallel (WP-2 to WP-8 run together after WP-1 merges)

### WP-2: Pricing and limit accuracy (P0)
**Owns:** `pricing.html`, `support.html`, `terms.html` (one line only, see below), `free-junior-afl-stats-app.html`, `download.html`, `how-it-works.html`, `about.html`, body of `sports/*/index.html` (not header/footer).
1. Rebuild `pricing.html` around **one comparison table** generated by hand from `pricing.json` + `app-facts.md`. Rows: teams, players, stored games, scoring (16 sports), voice recording, team import, game history, athleticism metrics, custom metrics, Development Plan, drills, plays, training sessions, run drills, AI training recommendations, AI Season Narratives, benchmarking, cards, export, iCloud sync, Family Sharing. Columns: Free, Premium. Mark with ✓ / limit text / —. Use `.x-tier` chips in the headings.
2. Put an HTML comment at the top of the table: `<!-- Source: pricing.json updated YYYY-MM-DD; app-facts.md verified against app vX. Update when TierLimits changes. -->`. Don't show it on the page.
3. Fix every limit claim to match D1: `pricing.html:29, 49, 139, 203, 224`, `support.html:57, 322`, `sports/afl/index.html:268`, and any found by `grep -rniE "unlimited|no caps|no limit|no retention|roster cap|indefinitely" --include=*.html .` in owned files. Update the FAQPage JSON-LD to match.
4. Trial wording (D3): "Try full Premium free for 30 days, no card required." The trial has no exclusions and lifts the limits.
5. `terms.html:131` mentions unlimited teams/players/games. Don't rewrite legal text: if D1 changes the limits, replace only that clause with the new limits and flag it for owner review in the hand-off.
6. Apply the email changes WP-1 listed for these files.
7. Sports pages: check each one says 16 sports and doesn't contradict tiers.
8. Replace "no tracking" on `pricing.html` (~line 181) with "No ads. We never sell your data."
9. Explain the 20-game cap honestly in the pricing FAQ: "Free keeps up to 20 saved games. When you reach 20, delete a game or upgrade to Premium to save more."
**Done when:** the grep in step 3 returns only true statements; the pricing table matches `pricing.json` cell for cell; FAQ JSON-LD equals the visible text.

### WP-3: `/train.html` (P0, new page)
**Owns:** `train.html` (new), `css/train.css` (new, only if components.css isn't enough), `images/train/` (new).
Build per scope 5.2, athlete-first voice, using `features.html` as the structural template (front matter, `{% include site-header.html active="train" %}`, SEO block, JSON-LD).
Sections, each with a Free/Premium chip per `app-facts.md`:
1. **Measure:** 14 metrics (or D3 wording), log results, trend chart, goal line, create your own metric. Use `images/measureview.webp`.
2. **Plan:** BHAG (call it "your big goal"; explain it before using the acronym, or don't use it), Development Plan (skills, 2 drills each, outcome goal, S&C goal).
3. **Drill and Play libraries:** animated drills and plays; say "AFL drills first, more sports coming" only if the owner confirms the roadmap. Use `images/drillcreator.png`, `images/playcreator.png`.
4. **Run drills:** Beep Test, 800m and 2km time trials Free; full sprint/interval library and custom run drills Premium.
5. **Training sessions (Free):** build from blocks, run with beep pacing, record how it went. Released.
6. **AI insights (Premium):** keep the "regenerates every 30 days or after 5 games" rule from `pricing.json`.
7. **Training safety:** a short supervision note mirroring the in-app disclaimer (owner supplies the exact text, or use: "Train with a coach or adult nearby, warm up first, and stop if something hurts.").
8. **Pressure line:** "Goals you control, not leaderboards."
9. CTA block identical in structure to other pages.
Meta: title around "Training app for junior athletes: drills, plans and fitness tests | ScorX"; pick the primary keyword with the owner or the `seo-strategy` skill. Add `SoftwareApplication` featureList JSON-LD.
Don't edit `sitemap.xml` or `llms.txt` (WP-9 does). Put the requested entries in the hand-off.
**Done when:** the page renders at three widths, every feature line has a tier chip that matches `app-facts.md`, there's no unreleased feature, and every image has alt text.

### WP-4: Home page (P0)
**Owns:** `index.html`.
1. Hero: keep "Don't just score your game. Grow your game." Add the subhead "Score it. Track it. Train it." Replace the "training tools" chip (line ~303) with concrete words ("drills, plans, fitness tests"). Leave the sport chips "+12 more" as they are, but check that 4 + 12 = 16.
2. Add an `.x-pillars` section directly under the hero. Score → `/features.html#score`, Track → `/features.html#track`, Train → `/train.html`.
3. "The season story" section (~line 448): add a Train block with up to 3 `.x-shot` images (Measure chart; Drill Animator; third is an ASSET NEEDED slot for Development Plan).
4. Fix `index.html:458` "no game limits" and the pricing teaser (~480) per D1.
5. Update the home FAQ + its JSON-LD and the `SoftwareApplication` JSON-LD (offers, featureList) to match `pricing.json`.
6. Keep the page order otherwise. Don't touch the card-maker section.
**Done when:** the claim grep from WP-2 step 3 is clean for `index.html`; the pillars and Train block render at three widths; Lighthouse performance doesn't drop by more than 5 points (lazy-load all new images).

### WP-5: Features page restructure (P0/P1)
**Owns:** `features.html`.
1. Regroup the existing features under three H2s with ids `score`, `track`, `train`. Train on this page is a summary with a link to `/train.html`, not a copy of it.
2. Add (only those D4 marks released): voice stat recording (Premium, team sports, iOS 26), spreadsheet team import (PlayHQ .xlsx/.csv), Share Cards carousel, iPad Team Mode (use `images/ipad/*`), game pack export/import.
3. Move player sentiment and reflections under Track.
4. Fix: "10 metrics" → "14 metrics, plus your own"; "age and gender" → "age and sex"; benchmarking is now **Free** (remove the Premium label); trial = full Premium for 30 days; replace "no retention limit…on every plan" and "no roster caps" with the Free limits (5 teams, 25 players, 20 saved games; unlimited on Premium).
5. Update the meta description and FAQPage JSON-LD to match.
**Done when:** the page has exactly three pillar H2s; every Premium feature is labelled; the claim grep is clean.

### WP-6: Audience pages (P0/P1)
**Owns:** `athletes.html`, `coaches.html`.
- `athletes.html` (athlete voice): replace the prose development-plan loop with a screenshot-led walkthrough of the Development Plan (Measure → set a goal → plan → drills → re-test). Use `.x-shot` and ASSET NEEDED slots where screenshots don't exist. Add tier chips.
- `coaches.html` (coach voice, voice guide rule 1 doesn't apply here):
  - Make the free/Premium line explicit: dashboard free, weekly AI recommendations Premium.
  - Add "Plan your training" (Plays, Drills, Training Sessions, Run Session) and "Test your squad" (run drills, team results) per D2/D4.
  - Add iPad Team Mode (magnet board, lineup planning) using `images/ipad/lineup_ipad.png`, `gameplan_ipad.png`.
  - Add voice recording and "Import your squad from a PlayHQ export" if released.
  - Retitle "Team training focus" to something like "What to work on this week" and say it comes from post-game triage, not the session planner.
**Done when:** both pages match `app-facts.md`, and coaches.html contains no feature D4 marks unreleased.

### WP-7: Comparison and sports overview pages (P1/P2)
**Owns:** `compare.html`, `scorx-vs-gamechanger.html`, `sports.html`, `sports-graphic-generator.html`.
1. Audit each for the scope doc's issues (limits, metric count, tiers, sport count = 16 incl. Volleyball and Water Polo, email). These pages weren't reviewed in the scope doc.
2. Add Train rows to the comparison tables: development plan, drill library, play library, training sessions, fitness tests. Mark competitors "—" only where `documentation/competitor-research-2026-08.md` supports it. If unsure, leave the cell out; don't guess.
3. "No tracking" (7 occurrences in `scorx-vs-gamechanger.html`, plus `compare.html` if present): replace with "No ads. We never sell your data." or a short form of it ("No ads, no data selling"). Don't edit `privacy.html`; the owner updates it.
**Done when:** every competitor claim cites the research doc in an HTML comment, and the claim grep is clean.

### WP-8: Asset shot list (P1; can start in Phase 0)
**Owns:** `documentation/asset-requests.md` (new).
Compile one list of every `ASSET NEEDED` slot the other WPs created, plus scope section 6: device, screen, app state to set up (e.g. "Measure chart with a goal line, 6+ data points, 40m sprint"), file name, size, format (webp, 2x), and the page it goes on. Note the 15–30 s screen recordings for Train and voice. This is the owner's capture checklist. Re-run it after Phase 2 to collect the final slots: `grep -rn "ASSET NEEDED" --include=*.html .`
**Done when:** every slot in the codebase appears in the list once.

### Phase 3: integration (serial)

### WP-9: Integrator
**Owns:** `llms.txt`, `agent.json`, `sitemap.xml`, `robots.txt`, merge commits.
1. Merge WP-1, then WP-2 to WP-7 in this order: WP-2, WP-5, WP-3, WP-4, WP-6, WP-7. Resolve conflicts in favour of the file owner.
2. Apply cross-file requests from all hand-off notes.
3. Update `llms.txt` and `agent.json` (pricing, limits, Train features, contact, `updated`), and add `train.html` (and any Phase 4 pages) to `sitemap.xml`.
4. Site-wide checks (all must pass):
   - `grep -rniE "unlimited|no caps|no limit|no retention|roster cap|indefinitely|10 (athleticism )?metrics|no tracking" --include=*.html --include=*.txt --include=*.json . | grep -v documentation/`: each hit is true per `app-facts.md`.
   - `grep -rnE "\b(Family|Coach|Club) (tier|plan)|ScorX Basic" --include=*.html .` returns nothing.
   - The email grep shows only the D5 address.
   - Every FAQPage JSON-LD matches its visible FAQ (write a small Python check that parses both).
   - `npx html-validate` on changed pages; a link check with no broken internal links.
   - Playwright screenshots of every changed page at 375/768/1280 px in light and dark mode; no horizontal scroll at 375 px.
5. Write `documentation/handoff/RELEASE.md`: summary, decisions used, outstanding ASSET NEEDED slots, legal items for owner (terms line, privacy/tracking).
6. Open a PR to `main` only when the owner asks.

### Phase 4: P2 landing pages (after Phase 3 ships)

### WP-10: Landing pages
**Owns:** new files only.
- `import-playhq.html`: released (D4), so build it. Content: what file to export from PlayHQ, three steps, supported formats, what's imported and what isn't, privacy note. Write "PlayHQ" as a plain name, with no logo and nothing that implies a partnership.
- `training-session-planner.html`: AFL-first; coach voice; links to `/train.html`.
- `afl-drills.html`: **deferred.** It needs animation clips made with the owner's Remotion tooling. Only build it if the clips are supplied.
- Use the `seo-strategy` / `seo-content-audit` skills for keyword targets. Hand sitemap/llms entries to WP-9 (re-run it for these pages).

---

## 3. Schedule and parallelism

| Step | WPs | Parallel? | Gate to next step |
|---|---|---|---|
| 0 | Owner answers D1–D7; WP-8 starts the shot list | — | D1–D3 answered |
| 1 | WP-0 | single agent | `pricing.json` + `app-facts.md` merged |
| 2 | WP-1 | single agent | nav + components merged |
| 3 | WP-2, WP-3, WP-4, WP-5, WP-6, WP-7 | 6 agents at once (disjoint file ownership) | all hand-offs written |
| 4 | WP-8 refresh, WP-9 | serial | owner review |
| 5 | WP-10 | 1–2 agents | WP-9 re-run |

Shared-file risk: only WP-1 edits CSS that others rely on, and only WP-9 edits `llms.txt`, `agent.json` and `sitemap.xml`. If a Phase 3 agent needs a new CSS rule, it goes in a page-scoped `<style>` block or `css/train.css` (WP-3 only) and is flagged for WP-9 to lift into `components.css`.

## 4. Prompt template for each agent

> You are implementing work package WP-N from `documentation/website-scope-implementation-plan.md` in the scorx-website repo. Read that section, section 0 and the "Every WP must" list. Then read `CLAUDE.md`, `documentation/voice-athlete-first.md`, `pricing.json` and `documentation/app-facts.md`. Edit only the files your WP owns. Where facts aren't in `app-facts.md` or `pricing.json`, don't guess: leave the existing copy and record the question in your hand-off note. Work on branch `wp-N-<short-name>` from `claude/zealous-rubin-a0gycr`. Commit when you're done, push the branch, and write `documentation/handoff/WP-N.md`. Don't open a PR.

## 5. Mapping to scope doc

| Scope section | WP |
|---|---|
| 2.1 Free-tier limits | D1 → WP-0, WP-2, WP-4, WP-5 |
| 2.2 Other mismatches | D2/D3/D5 → WP-0, WP-2, WP-5, WP-6, WP-7 |
| 3 Train gap | WP-3, WP-4, WP-6 |
| 4 Missing features | D4 → WP-5, WP-6 |
| 5.1 Score/Track/Train | WP-1 (components, nav), WP-4, WP-5 |
| 5.2 Build Train out | WP-3, WP-4, WP-6 |
| 5.3 Pricing table | WP-2 |
| 5.4 Missing feature copy | WP-5, WP-6 |
| 5.5 Landing pages | WP-7 (compare), WP-10 |
| 5.6 Trust/analytics | D6 → WP-3, WP-7, WP-9 |
| 6 Assets | WP-8 |
| 8 Open questions | Section 1 (D1–D7); Q5 answered: the source is this repo |
