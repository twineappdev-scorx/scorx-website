# Release note: website scope work (WP-0 to WP-9)

Branch: `wp-9-integration` (cut from `claude/zealous-rubin-a0gycr`, which already holds WP-0 to WP-8). Nothing here is merged to `main`. GitHub Pages deploys from `main`, so the owner decides when it ships. No PR has been opened.

## 1. What changed, by work package

| WP | Result |
|---|---|
| WP-0 | `documentation/app-facts.md` and `pricing.json` locked to the owner's 2026-11-19 answers: Free is capped at 5 teams, 25 players and 20 saved games (new games blocked at the cap); benchmarking is Free; 14 baseline metrics plus custom (Free 1, Premium unlimited); the trial is full Premium; PostHog is live so "no tracking" is gone. `CLAUDE.md` updated (Jekyll, two tiers). |
| WP-1 | "Train" added to the header and footer includes and to every hard-coded nav. New shared components in `css/components.css`: `.x-tier` (Free/Premium chip), `.x-pillars` (Score / Track / Train), `.x-shot` (screenshot figure). Three SVG pillar icons. |
| WP-2 | `pricing.html` rebuilt around one Free vs Premium table; `support.html`, `download.html`, `about.html`, `free-junior-afl-stats-app.html` and the AFL sport page corrected for the limits; new "What happens at 20 saved games?" FAQ. One clause in `terms.html` changed (see section 5). |
| WP-3 | New `/train.html` (Measure, Plan, Drill and Play libraries, Run drills, Training Sessions, AI insights, safety, FAQ) with `css/train.css`. |
| WP-4 | Home page: Score / Track / Train pillars, a Train block, accurate pricing teaser, FAQ and JSON-LD refreshed, "no tracking" removed. |
| WP-5 | `features.html` restructured into Score, Track and Train pillars; voice recording, PlayHQ import, iPad Team Mode, game packs and Share Cards added; false claims removed. |
| WP-6 | `athletes.html`: five-step development walkthrough, all facts corrected. `coaches.html`: explicit Free vs Premium, Plan your training, Test your squad, iPad Team Mode, import, voice. |
| WP-7 | `compare.html`, `scorx-vs-gamechanger.html`, `sports.html`, `sports-graphic-generator.html`: limits, tiers, tracking and racquet claims fixed; app-size rows and unsupported competitor privacy claims removed. |
| WP-8 | `documentation/asset-requests.md`: the owner's screenshot and recording checklist. |
| WP-9 | This pass (below). |

### WP-9 changes
1. `llms.txt`, `agent.json`: rewritten to match `pricing.json` and `app-facts.md` (Free limits, Premium unlimited, 14 metrics plus custom, benchmarking Free, Train features by tier, trial is full Premium, "No ads. We never sell your data."). `/train.html` added to both. `agent.json` `updated` is 2026-11-19 and gains `free_limits`, `premium_limits`, `trial` and `train` objects; `free_tier_unlimited` is now `false`. `llms.txt` structure unchanged.
2. `sitemap.xml`: `train.html` was already emitted by the template's page loop, so a second explicit entry would have duplicated it. Instead the loop now gives it `weekly` / `0.8`. Verified in `_site/sitemap.xml` (one entry).
3. Empty screenshot slots hidden. `css/components.css` has a clearly commented TEMPORARY block: `.x-shot__slot { display: none }` plus rules that hide the orphaned figure and caption, and collapse the surrounding layout so there is no empty column. All `ASSET NEEDED` comments stay in the HTML. Remove the block when the images land. Layout fixes (checked at 375 and 1280):
   - `index.html` Train block: the 3-column grid is now a centred flex row, so two shots sit centred instead of leaving a gap.
   - `athletes.html`: walkthrough steps with no image collapse to one column.
   - `train.html`: sections whose only media was a slot become single column.
   - `coaches.html`: feature blocks with only a slot become single column.
4. "Not checked" cells: all 25 removed. The Train rows left both comparison tables. Each page now has a ScorX-only list, "Training tools in ScorX" (Development Plan, Drill Library, Play Library, Training Sessions, Fitness tests, Data and ads), with a comment citing the research doc. No competitor facts were invented. The "Data and Ads" row also went, since it only held "Not checked" cells. No horizontal scroll at 375 px.
5. "Free forever" lines now carry the limits: home hero trust line, home coach line, athletes closing line, the coach block of all eight `sports/*/index.html` pages, `sports-graphic-generator.html`, and the `free-junior-afl-stats-app.html` Open Graph description. Headings that overclaimed ("Free for every coach. No exceptions.") were softened.
6. `sports/*/index.html` navs gain "Make a card" (`/card/`), matching `_includes/site-header.html`. `match/index.html` footer year is now 2026.
7. Duplicated CSS lifted: `.x-section-head`, `.x-faq` and `.closer` base rules now live once in `components.css`; the page-scoped colour overrides stay in `index.html` and `train.css`. Verified: `/train.html` renders pixel-identical before and after (compared against a build with the old CSS); `index.html` is pixel-identical at 375 px, and at 1280 px was compared against a first-run capture that also differed from a repeat capture of the same code, so treat it as unproven, though the rules moved are textually identical.
8. Extra fixes found by the checks: `sports-graphic-generator.html` FAQPage JSON-LD was missing the "Will new graphic formats be added?" Q&A and the "See the full sports list." sentence (pre-existing drift), now matched to the visible FAQ; three raw `&` in `coaches.html` headings encoded.
9. Three coach screenshots with no ID in the shot list (match invitations, rotations, Perception vs Reality) added to `documentation/asset-requests.md` as A-33 to A-35.
10. Reusable scripts: `documentation/handoff/check_faq.py` and `documentation/handoff/check_links.py`.

## 2. Check results

| Check | Result |
|---|---|
| `jekyll build` | Passes, no warnings. |
| Internal link check (`check_links.py` over `_site`, hrefs, srcs, srcsets and `#fragments`) | 2,252 links in 57 pages, 0 broken. The script was proven by planting a bad link and a bad anchor. |
| FAQPage JSON-LD vs visible FAQ (`check_faq.py`, run over all root pages, `sports/*` and `train.html`) | 11 pages with a FAQPage, all identical: athletes 8, coaches 11, features 9, free-junior-afl 6, index 8, pricing 7, scorx-vs-gamechanger 5, sports-graphic-generator 10, sports 6, support 28, train 5. The 8 `sports/*/index.html` pages have no FAQ or FAQPage. `compare.html` has `<details>` blocks (a trial guide) but no FAQPage schema. |
| `grep -rnE "\b(Family\|Coach\|Club) (tier\|plan)\|ScorX Basic"` | No matches. |
| Email grep | Built site: only `scorxapp@gmail.com` (plus the `you@example.com` form placeholder in the card tool). Source only: `cards@scorx.com.au` appears in `supabase/README.md` as a planned Resend sender, not a contact address. No `support@scorx.app` on the site. |
| Claim grep (`unlimited`, `no caps`, `no limit`, `no retention`, `roster cap`, `indefinitely`, `10 metrics`, `no tracking`) | Every site hit is true per `app-facts.md`: Premium "unlimited" statements, the Free vs Premium tables, "No limit on graphics per game" (the generator page, true on both plans), and the 14-metric lines. Exceptions are legal pages, listed in section 5: `privacy.html:294` ("retained indefinitely while subscription is active") and the "No third-party analytics or tracking" lines in `terms.html`. |
| `npx html-validate` (installed in a scratch folder, `html-validate:recommended` with style and a11y-pedantic rules off, run on built output for 11 changed pages) | Remaining findings are pre-existing and shared: the Meta Pixel `<noscript><img>` inside `<head>`, a footer `aria-label` on a non-landmark element on every page, and an inline `<style>` after the body start on `index.html`. The three `&` errors in `coaches.html` were fixed. |
| Playwright, deviceScaleFactor 1, 375 and 1280 px, `documentation/handoff/screens/wp-9/` | index, train, features, pricing, athletes, coaches, compare, scorx-vs-gamechanger: `scrollWidth` equals the viewport at both widths, so there is no horizontal scroll at 375 px. 768 px and dark mode were not re-shot in this pass; earlier WPs have 768 px shots in their own `screens/wp-N/` folders. |

## 3. Outstanding ASSET NEEDED slots

`grep -rn "ASSET NEEDED" --include=*.html .` finds 22 comments across five pages. 13 sit above a hidden `.x-shot__slot`, so those sections show text only right now; the rest are comment-only (the section is text-only by design).

| Page | Slot IDs in code | Hidden placeholder? |
|---|---|---|
| `index.html` | A-01 (comment only; `measureview.webp` shown), A-04 | A-04 hidden |
| `athletes.html` | A-03, A-04, A-05, A-01 | all four hidden |
| `train.html` | A-01, A-04, A-12, A-11, A-14 | all five hidden |
| `coaches.html` | A-33, A-34, A-35 (match invite, rotations, Perception vs Reality; IDs added in this pass), A-11, A-16, A-24, A-19, A-18 | A-33, A-34, A-35 hidden; the rest comment only |
| `features.html` | A-18, A-19, A-20 | none (comments only) |

Reconciliation with `documentation/asset-requests.md`: every slot in the code now maps to an ID. The only unlisted ones were the three coach screenshots (previously `coach-match-invite`, `coach-rotations`, `coach-perception-reality`, files that never existed); they are now A-33 to A-35. IDs in the list with no slot in the code yet: A-02, A-06, A-07, A-08, A-09, A-10, A-13, A-15, A-17, A-21, A-22, A-23, A-25 to A-32. These are fine as a wish list, or can move to P2. Priorities for the owner's capture session: A-01, A-03, A-04, A-05 (Measure and Development Plan, seen on four pages), A-11, A-12, A-14, then A-18 and A-19.

When an image arrives: replace the `.x-shot__slot` div with a `.x-shot__frame` containing the `<img>` (width and height set), delete the `ASSET NEEDED` comment, and when the last slot is gone delete the TEMPORARY block in `css/components.css`.

## 4. Owner decisions still open (left unchanged on purpose)

1. **"30-day money-back guarantee on Premium"** on `pricing.html` (line 189). Not in `app-facts.md`; Apple handles refunds, so it may be wrong.
2. **Voice recording tier.** Shown as Premium (team sports, iOS 26 or later) on pricing, support, features, coaches and the AFL page. The owner confirmed it is released but did not restate the tier.
3. **Existing competitor prices and user counts** (GameChanger A$149.99, TeamSnap $109.99, "Not supported", "Basic", trial lengths, 150+ stats, 20M+ users, Spond ads). `documentation/competitor-research-2026-08.md` does not support them. `compare.html` says details were last checked August 2026.
4. **Racquet sports wording** ("simplified game tracking", no stat recording claims). Left as WP-7 set it.
5. **"AFL drills first, more sports on the way"** on `train.html` (and its FAQ): the "more sports" roadmap is not in `app-facts.md`.
6. **Data after downgrade or trial end.** The facts say nothing about users above 20 games. The pricing cancel FAQ still says game data is preserved on the device regardless of subscription; confirm it holds above 20 games.
7. Smaller items from the hand-offs: whether "25 players" is per team or in total; the generator page presents score and team stat graphics as Free while `app-facts.md` lists the Share Cards carousel as Premium; BHAG is explained but the carry-over coach copy uses the acronym unexpanded; the unverified Below Average / Average / Above Average / Excellent benchmark labels and the AI recommendation disclaimer on athletes and coaches; the primary keyword for `train.html` ("training app for junior athletes") was chosen without owner confirmation; the home page "Saturday morning" card still says "The family's commented" (parent voice).
8. `match/index.html` nav is Features / Sports / Pricing / How It Works plus Train. It has no "Make a card" or Athletes/Coaches links, and the task only asked for the footer year there.

## 5. Legal items for the owner (no agent edited these)

- **`privacy.html` and PostHog.** PostHog is live in the app. The policy still says "We don't use third-party trackers" (line 93), "No third-party analytics or tracking services" (line 189), and "We do not use Google Analytics, Facebook SDK, or similar services" (lines 200 to 202). These need rewriting by the owner or legal. Line 294 ("Data retained indefinitely while subscription is active") should be checked against the 20-game cap at the same time.
- **Meta Pixel.** Most pages of the website (all except 404, about and the blog index) load a Meta (Facebook) Pixel (`fbq('init', ...)`). That sits awkwardly beside the "no Facebook SDK" and "no third-party tracking" statements and needs the same review, plus a cookie or consent decision for EU and California visitors.
- **`terms.html`.** WP-2 replaced the Free-tier limits clause (line 131) to say 5 teams, 25 players and 20 saved games. The Premium line on 132 does not mention voice recording or Train. Lines 220 to 221 say "No third-party data sharing or selling" and "No third-party analytics or tracking", which conflict with PostHog. The owner or legal should approve the clause and the analytics lines.
- **"GDPR and CCPA compliant"** on `about.html` (line 130). With PostHog live and the Meta Pixel on the site, confirm that claim or soften it. `privacy.html` also lists GDPR and CCPA rights sections.
- The site wording now says "No ads. We never sell your data." everywhere that "no tracking" used to appear; this is accurate on the owner's D6 answer, but it does not replace the privacy policy update.

## 6. Before this goes to `main`

1. Owner answers section 4 and 5 items, or accepts the current wording.
2. Look at the `wp-9` screenshots, especially hidden-slot layouts on `athletes.html` and `train.html`.
3. Push is not deploy: merge to `main` only when ready, because Pages builds from `main`.
