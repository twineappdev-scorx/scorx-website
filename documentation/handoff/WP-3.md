# WP-3 hand-off: /train.html

Branch: `wp-3-train` (from `claude/zealous-rubin-a0gycr`).

## Files
- `train.html` (new): front matter, `site-header.html active="train"`, footer include, SEO meta, OG/Twitter, `SoftwareApplication` JSON-LD with `featureList`, FAQPage JSON-LD matching the 5 visible FAQ items.
- `css/train.css` (new): page-scoped under `body.train-page`; layout (`.tr-split`, `.tr-list`, `.tr-media`), plus FAQ and closer styles copied from the home page's inline styles. `images/train/` created for owner assets (empty).
- `documentation/handoff/screens/wp-3/train-{375,768,1280}-{light,dark}.png`.

## Page outline
Hero (H1 "The training app for junior athletes. Work on what matters.", tier legend) / Measure / Plan / Drill and Play Libraries / Run drills / Training Sessions / AI insights / Training safety / "Goals you control, not leaderboards" / FAQ / closer (App Store badge). Every feature line carries a Free or Premium chip per `app-facts.md`.

Meta: title "Training App for Junior Athletes: Drills, Plans and Fitness Tests | ScorX"; description 153 characters. Primary keyword "training app for junior athletes" (chosen by me, not confirmed with the owner).

## Decisions
- Premium chips only on: unlimited custom metrics, full run drill library, custom run drills, the three AI lines. Everything else is Free. PDF export of sessions is noted as Premium in a note (export is Premium per `app-facts.md`).
- BHAG is explained as "your big goal" first, with the acronym in brackets once.
- "AFL drills first, more sports planned" is used on the page and in the FAQ. The plan says to use it only if the owner confirms the roadmap, and `app-facts.md` marks it "AFL first" without a roadmap. Owner to confirm or I remove "and more sports are on the way".
- Images: `measureview.webp` (800x1731) captioned as the input form; `drillcreator.png` and `playcreator.png` (1170x2532) captioned as editors; `sessioneditor.png` (1170x2532); `traintabview.webp` (800x1731) as a stopgap for run drills (caption says "Train tab", it doesn't claim Premium locks). All show an adult demo profile ("Tim, age 23") and are flagged in `asset-requests.md` as stopgaps.
- Closer trust line uses "No ads. We never sell your data." (D6), not the home page's "no tracking".
- Coach drill assignment and team results are mentioned in one Free line in Sessions (athlete-first voice otherwise).
- Page includes the Meta Pixel block like the other pages.

## ASSET NEEDED slots (HTML comments in `train.html`)
- A-01 Measure trend chart with goal line (P0), beside the input form.
- A-04 Development Plan overview (P0), Plan section. A-06 big goal screen is a P1 alternative.
- A-12 Run drill list showing Free and Premium locks (P1).
- A-11 Run Session with beep pacing (P0).
- A-14 AI recommendation card (P1).
Not slotted (text-only or covered): A-02 Create Metric, A-03 Set goal, A-07 Benchmarking, A-08/A-09 animator playback (note on page says playback screens are coming), A-10 Drill Library, A-25 walkthrough video.

## Requests for other WPs
- `sitemap.xml`: add `https://www.scorx.com.au/train.html` (priority about 0.8, weekly).
- `llms.txt`: add a Train section/link: "Train: https://www.scorx.com.au/train.html. Measure (14 baseline metrics, age and sex benchmarking, goals, 1 custom metric free), big goal and Development Plan, Drill and Play Libraries with animators (AFL first), Beep Test, 800m and 2km time trials, Training Sessions and Run Session. All Free. Premium: AI training recommendations and athleticism insight, full run drill library, custom run drills, unlimited custom metrics."
- `agent.json`: add the page if it lists pages.
- WP-9: `.x-section-head`, `.x-faq` and `.closer` now exist in both `index.html` (inline) and `css/train.css`; lift into `components.css` if wanted.
- Home page closer still says "No ads, no tracking in the app" (WP-2 scope, conflicts with D6).

## Verification
- `jekyll build` OK; served `_site` with `python3 -m http.server`.
- Playwright (deviceScaleFactor 1, light and dark) at 375, 768, 1280: `scrollWidth` equals viewport width in all six runs (no horizontal scroll at 375); 0 images without alt.
- Every `.tr-list` line has a chip; no exclamation marks in copy.

## Open items
- Owner to confirm the primary keyword and the "more sports" roadmap line.
- Placeholder boxes are dashed empty frames until A-01, A-04, A-11, A-12 and A-14 arrive.
- Voice recording and other Score features are not mentioned on this page.
