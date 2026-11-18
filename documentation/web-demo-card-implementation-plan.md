# Implementation Plan: Web Demo Card, Homepage Hero & Email Capture

**Implements:** Web Demo Card PRD v1.0 (Nov 2026), with these changes requested after the PRD:
- The demo starts with a simplified live **game view** (timer + score keeper), based on the grid-scoreboard mockup
- The output is the **Chrome** card from the card-design carousel mockup, using the score from the game view
- **Photo upload is in scope** (the PRD listed it as out of scope)
- Output is a **1080×1920 JPG**, unlocked by entering an email
- **Resend** email delivery comes in a later stage
- The site design language moves to the **Train + Measure combined** mockup

**Status:** Draft plan. Section 1 lists decisions needed before build.

---

## 1. Decisions needed before build (blockers)

These either conflict with the PRD or with something already live on the site. Each one changes what gets built.

### 1.1 The Meta Pixel contradicts the "no tracking" claim, today
25 pages (homepage, `_layouts/default.html`, `match/`, etc.) load the Meta Pixel (`fbq init 1528173681585526`). That is third-party ad tracking. Meanwhile `compare.html` and `scorx-vs-gamechanger.html` say "No tracking" and "Privacy-first (no tracking, no ads)". PRD open question 4 assumes the claim is true now and only *adding* analytics would break it. It's already broken.

The `/card` page will ask for an email and handle a child's first name and photo. Running the Meta Pixel on that page is the worst place to have it.

**Recommendation:** Remove the Meta Pixel from `/card` at minimum, and site-wide unless Facebook ad attribution is actively in use. Then either remove the "no tracking" claims or make them true (cookieless PostHog only). Decide before Phase 1 ships.

### 1.2 The Chrome design is Premium in the app
In the carousel mockup both Chrome cards are `free: false`. If the web demo gives away Chrome for free, a parent who installs ScorX on the strength of it lands on Basic and finds the design they just made behind a paywall. That reads as bait and switch, and it's the first thing they'll try in the app.

Options:
- **A.** Web uses Chrome; the app makes Chrome Score free (or free for the first card). Cleanest story.
- **B.** Web uses Chrome, and the confirmation screen says plainly "Chrome is a Premium design in the app. 30-day free trial, no card." Honest, adds friction.
- **C.** Web uses a design that's free in the app. Safest, but less wow.

**Recommendation:** A if the app team can do it, otherwise B. Don't ship without picking one.

### 1.3 Photo upload changes the PRD's privacy position
The PRD kept photos out of scope because of children's privacy. Adding them is fine **as long as the photo never leaves the device until the parent asks for email delivery**:
- Stages 2A–2C: the photo is read in the browser, drawn on a canvas, never uploaded. The JPG is made on the device. Privacy risk is close to zero.
- Stage 3 (Resend): the finished JPG, now holding a child's **face** as well as their first name, goes through a Supabase edge function to Resend. It isn't stored, but it does pass through two processors. The privacy policy and the Privacy Impact Assessment (PRD 2.6) have to cover this before Stage 3 goes live.

**Recommendation:** Accept photo upload. Process it on the device only. Don't add face detection or any server-side image work. Update `privacy.html` in the same PR as Stage 3.

### 1.4 What the email gate unlocks before Resend exists
The PRD's main idea is that *delivery makes the email real*. Before Resend, the gate can only unlock a download on the spot, so the parent can type `a@a.com` and still get the card. Expect a high junk rate until Stage 3.

**Recommendation:** Ship the gate as a download unlock in Stage 2C so the funnel can be tested. Validate the email format and use Turnstile. Store the address in Supabase. Mark Stage 2C subscribers `unverified`. In Stage 3, switch the full-resolution card to email delivery (keep the preview on screen), and only treat delivered addresses as real leads.

### 1.5 Two entry paths, not one
The PRD's main user is a parent after the game, typing from memory in about 30 seconds. The new live scorer serves a different moment: during the game. Both are valuable. Making the after-the-game parent click through a live timer would kill the 30-second goal.

**Recommendation:** The `/card` start screen offers **"Score a game live"** and **"Game's finished? Enter the final score"**. Both go to the same card composer.

### 1.6 Smaller decisions (defaults proposed)
| Question | Proposed default |
|---|---|
| v1 sports | AFL, netball, basketball, soccer (soccer is the 4th; check Search Console) |
| Card variants | Chrome Score (team result) first; Chrome Player (name + up to 3 stats) in the same release if time allows |
| Preview mark | Diagonal "PREVIEW" mark at 25% opacity on a 540×960 preview. The full 1080×1920 JPG has no mark |
| Consent boxes | Two, unticked (PRD default) |
| Footer email | Needs the actual `@scorx.com.au` mailbox to exist first (MX records set up) |
| Fonts | Fraunces + Archivo for site UI (per the reference). The card uses a condensed display face (Bebas Neue, already loaded) to match the Chrome art |

---

## 2. Design language migration (Train + Measure reference)

### 2.1 What changes
| | Current site ("Kinetic Sports Editorial") | Target (Train + Measure mockup) |
|---|---|---|
| Display type | Bebas Neue, all caps | Fraunces 600/900, with italic `em` accents in turquoise-ink |
| Body type | Plus Jakarta Sans | Archivo 400–900 |
| Surfaces | Dark navy sections with glow orbs | Light canvas `#F4F7F8`, white cards, `--line` borders, soft navy shadows. Dark mode via token swap |
| Accent | Turquoise on navy | `--turq-ink #00897C` for text/links on light (passes AA), `--turq` gradient for primary buttons |
| Radii | 20/28 cards, 14 buttons | 22 card, 14 inner, 100 pill |
| Controls | Rectangular buttons | Pill buttons, segmented controls, dashed "add" rows, eyebrow labels (0.22em tracking caps) |

Brand colours stay the same (turquoise `#00D4C4`, navy `#0F2A44`), so this is a reskin, not a rebrand. CLAUDE.md's brand rules still hold.

### 2.2 How to roll it out without breaking 30 pages
The site has no `_includes`. Nav, footer, and lots of inline `style=""` attributes are copied by hand into about 17 HTML files, and `style.css` is 3,700 lines. A full reskin in one go is high risk.

1. **Tokens first.** Add the reference token set (`--canvas`, `--surface`, `--inset`, `--line`, `--line-strong`, `--navy`, `--turq-ink`, `--mid`, `--faint`, `--r-card`, `--r-inner`, `--r-pill`) to the top of `css/style.css`, with a `prefers-color-scheme: dark` block. Map the old variables to the new ones (`--scorx-deep-navy: var(--navy)` etc.) so existing pages don't break.
2. **New component layer**, `css/components.css`: `.card`, `.eyebrow`, `.btn-pill`, `.btn-pill--ghost`, `.segment`, `.stat-row`, `.chip`. BEM-ish naming per CLAUDE.md.
3. **Convert in order:** `/card` (new, built natively in the new language) → homepage → `_layouts/default.html` + `post.html` (covers the blog) → pricing/coaches/athletes → the rest.
4. **Extract nav and footer into `_includes/`** while converting. Jekyll already builds the site, so this costs nothing and removes the copy-paste problem for every later change, including the footer email swap.
5. Swap the Google Fonts import in one place. Keep Bebas Neue loaded only where cards are drawn.

---

## 3. The `/card` web app

### 3.1 Architecture
- Static, no build step (per CLAUDE.md). Vanilla ES modules loaded with `<script type="module">`.
- No Meta Pixel on this page (see 1.1). PostHog cookieless only, if analytics is approved.
- Every tap is saved to `localStorage`, so a refresh, a phone lock or a crashed tab never loses a game.

```
card/index.html                 # Jekyll page, permalink /card/
css/card.css                    # page-specific styles on top of tokens/components
js/card/
  app.js                        # screen router + state machine
  store.js                      # state, localStorage persistence, undo history
  sports.js                     # per-sport scoring + period config
  timer.js                      # timestamp-based period clock + wake lock
  scorer.js                     # game view UI (grid scoreboard)
  composer.js                   # card options, photo, preview
  render-chrome.js              # canvas renderer for Chrome Score / Chrome Player
  photo.js                      # file → ImageBitmap, orientation, cover-crop, pan/zoom
  gate.js                       # email + consent form, Turnstile, submit
  share.js                      # Web Share (files) → download fallback
  analytics.js                  # thin wrapper; no-op if analytics is off
images/card/                    # per-sport 1080×1920 backgrounds (night-ground scenes)
supabase/                       # excluded from Jekyll
  migrations/001_web_subscribers.sql
  functions/card-request/index.ts
```

### 3.2 Screens and flow

```
Start ──► Setup ──► Game view ──► Full time ──┐
  │                                           ├──► Composer ──► Gate ──► Done (+ app pitch)
  └──► Quick result (final score form) ───────┘
```

**1. Start.** Two big options (1.5). If a saved game is found: "Resume Kenmore v Wests (Q3)".

**2. Setup** (one screen, about 20 seconds)
- Sport (segmented chips for the 4 v1 sports)
- Home and away team names. Each badge initial is auto-filled from the first letter and can be edited
- Competition and round, optional (feeds the card header: "UNDER 16S LEAGUE · ROUND 12")
- Period length: defaults per sport, editable (junior lengths vary)
- Team colours: ScorX (default) or two pickers. These drive the stripe band on the Chrome card

**3. Game view** (follows the grid-scoreboard mockup, simplified)
- Header: competition · round, sport · teams, **Undo pill with a count badge**. No delete button; "End game" lives in an overflow menu
- Timer card: period chip (Q1/H1), large tabular `mm:ss` countdown, "remaining" label, round turquoise pause/play, "Next" period button, progress bar showing elapsed / period length
- Grid scoreboard on the navy gradient panel: one row per team. The columns come from the sport config:

| Sport | Tappable plates | Derived (read-only, turquoise) |
|---|---|---|
| AFL | G, B | PTS = 6G + B |
| Netball | Goal | PTS |
| Basketball | +1, +2, +3 | PTS |
| Soccer | Goal | PTS |

- Plates press down on tap (as in the mockup), the total bumps, and there's a light `navigator.vibrate(10)` where supported
- **Period history** (score at each break) is kept, so the card can show AFL `13.6` breakdowns and later quarter-by-quarter cards
- "Full time" appears after the last period, or from the menu at any time

**Timer must survive real use on a sideline:**
- Time comes from `performance.now()`/`Date.now()` stamps saved to `localStorage` (`periodStartedAt`, `pausedElapsed`), not from counting `setInterval` ticks. Locking the phone for 10 minutes and coming back shows the right time.
- Screen Wake Lock API (iOS Safari 16.4+, Chrome) while the clock runs, reacquired on `visibilitychange`
- When time runs out, the clock flashes and shows 0:00. It does **not** auto-advance: junior umpires don't follow the clock exactly
- Test case: score a full 4 × 12 min game on an iPhone in Safari with the screen locking between quarters

**4. Quick result** (path for parents after the game): sport, teams, final score fields per sport (AFL goals + behinds), then on to the composer. Aim: under 30 seconds.

**5. Composer**
- Card picker: two cards in the carousel's tilted, scroll-snap style (Chrome Score, Chrome Player), reusing the mockup's `paint()` 3D maths
- Options in the card-carousel "detail" pattern:
  - **Add photo** (both variants): `<input type="file" accept="image/*">`. On iOS this offers camera or library and hands over JPEG. Drag to pan and pinch/slider to zoom inside a 9:16 frame
  - Chrome Player only: first name, surname initial optional (first name only by default, per the privacy rules), jersey number, up to 3 stats (sport-specific picker + number)
  - Colours: ScorX / Team colours
- Live preview at 540×960 with the PREVIEW mark, redrawn (debounced) on every change

**6. Gate** (directly under the preview, per PRD 2.3)
- "Get the full-size card": email (required), two unticked consent boxes (PRD 2.4 wording), Turnstile, submit
- On success: unlock the 1080×1920 JPG → **Share** (Web Share Level 2 with `files`, which puts "Save Image", Messages and Facebook in the iOS share sheet) or **Download** fallback on desktop
- Stage 3 switches this to "Card sent to {email}" (PRD 2.3)

**7. Done.** The app pitch: "That's one game. ScorX makes one every week, and builds the season story." App Store button with a campaign token on iOS. QR code on desktop. Android: the Sideline subscribe option.

### 3.3 The Chrome renderer (canvas)
Analysis of the mockup art (540×960 shown; we render at 1080×1920):

**Shared frame:** four white corner brackets about 36 px in from the edges, the ScorX X mark bottom right, date bottom left in tracked caps.

**Background:** photo cover-cropped if supplied. Otherwise a per-sport night-ground scene (blurred floodlights, posts or hoop, striped turf). Pre-render 4 background JPGs (about 150 KB each) instead of drawing them in code. Without a photo or scene, the fallback is the team-colour gradient with a large faint team initial (matches `srcEmpty`). A bottom-to-top dark gradient scrim always sits under the score area so the numbers stay readable on any photo.

**Chrome Score:** competition (bold condensed caps) + round (tracked) top left. In the lower third: a diagonal team-colour stripe band across the full width, "*Final*" italic over "SCORE", huge chrome home/away totals either side, AFL breakdown (`13.6`) under each, two circular team-initial badges between.

**Chrome Player:** badge + first name (small tracked) + surname/number (large condensed) top left. Up to 3 chrome stat numbers with tracked caps labels, placed in the mockup's staggered layout. Footer: "ROUND 12 V NORTHCOTE HAWKS".

**The chrome numeral effect:** draw the text 3 times: (1) dark drop shadow offset down, (2) vertical `createLinearGradient` fill with stops `#FFFFFF → #C9D1D8 → #8C969F → #F2F5F7 → #AEB7BF` for the brushed-metal horizon line, (3) a 1 px light inner stroke on top. Fit numbers to the width with `measureText` so "104" and "7" both fit.

**Fonts:** `await document.fonts.load('900 200px "Bebas Neue"')` (and every face used) before the first draw, or the first render falls back to a system font. Self-host the card fonts in `/fonts/` so canvas drawing doesn't depend on Google Fonts CORS.

**Branding:** "Made with ScorX · scorx.com.au" along the bottom edge (PRD 2.3), small, plus the X mark.

**Output:** `canvas.toBlob(cb, 'image/jpeg', 0.9)`. The file is named `scorx-kenmore-v-wests-2026-11-22.jpg`. Expect 300–600 KB.

**Source of truth:** the app's card. Before building, get the exact app layout values (fonts, sizes, stripe angle, colours) from the iOS code or design file. The mockup JPGs are only a visual reference. Add a "web template last checked against app build X" note in `render-chrome.js`.

### 3.4 Photo handling details
- Use `createImageBitmap(file, { imageOrientation: 'from-image' })` for EXIF rotation. If that fails (older Safari), fall back to `<img>` + `decode()`
- Scale large photos down to a maximum of 2160 px on the long edge on load, to keep memory sane on older iPhones
- HEIC: iOS Safari converts on file pick. On desktop Chrome a HEIC file fails to decode, so show "Please choose a JPG or PNG"
- The photo is never uploaded, logged, or stored in `localStorage` (only its pan/zoom values are)

---

## 4. Backend (Supabase), built in Stage 2C, completed in Stage 3

**Table `web_subscribers`** (PRD 2.6): `id, email (citext unique), nurture_consent bool, nurture_consent_at, sideline_consent bool, sideline_consent_at, source text, sport text, verified bool default false, unsubscribed_at, created_at`. RLS on with **no** anon policies. Only the edge function writes to it.

**Edge function `card-request`** (Deno):
1. CORS restricted to `https://www.scorx.com.au`
2. Verify the Turnstile token server-side
3. Rate limit: 5 per IP per hour, 3 per email per day (a small `rate_limits` table or Upstash)
4. Upsert the subscriber. Consent timestamps are only set on false→true
5. **Stage 2C:** return `{ ok: true }` and the client unlocks the download
6. **Stage 3:** accept the JPG as base64 (max 2 MB), send it with Resend as an attachment + inline image, set `verified=true` on successful delivery, and don't log the body

Build the function in Stage 2C with the Resend call behind a `RESEND_ENABLED` flag. Stage 3 is then mostly a config change plus the email template.

**Stage 3 prerequisites:** Resend domain verification on `scorx.com.au` (SPF, DKIM, DMARC records in DNS), a `cards@scorx.com.au` sender, a one-click unsubscribe endpoint (`List-Unsubscribe` + `List-Unsubscribe-Post` headers), and the privacy policy update (1.3).

---

## 5. Homepage and site changes (PRD 2.1–2.2)

- **Hero:** split layout. Left side: a 2–3 line Fraunces headline ("18 games this season. *Did they actually improve?*"), a one-line subhead, device-aware buttons, and the trust line. Right side: a real Chrome card, with numbers counting up on load (skipped under `prefers-reduced-motion`). Remove the "See ScorX for AFL" button
- **Device-aware buttons:** server-render the desktop version (default). A small inline script swaps it on iOS (`/iPhone|iPad/` or iPadOS `MacIntel` + touch) and on Android. With no JS, the visitor sees the desktop version, which is safe
- **Desktop QR:** a static SVG generated once for the campaign-tagged App Store URL. No runtime QR library
- **Social proof strip, pricing slim-down, coaches one-liner, card promo block, footer email:** as per the PRD. The footer change becomes a one-file edit once nav/footer are in `_includes` (2.2)
- **Blog CTA:** add the demo-card block to `_layouts/post.html` after `{{ content }}`. One edit covers all 27 posts
- **Campaign tokens:** add `?pt=…&ct=hero|card-confirm|email-delivery…&mt=8` to every App Store link (PRD 2.7)

---

## 6. Delivery stages

| Stage | Scope | Depends on | Size |
|---|---|---|---|
| **0** | Decisions in §1; baseline App Store click rates; campaign tokens on existing links; Meta Pixel decision | Nothing | 0.5 day |
| **1A** | Design tokens + component layer; `_includes` for nav/footer | 0 | 1–2 days |
| **1B** | Homepage hero rebuild, social proof, pricing/coaches slim-down, footer email (PRD Phase 1) | 1A, real quote + permissions, mailbox | 1–2 days |
| **2A** | `/card` setup, live game view, quick result, persistence, wake lock | 1A | 2–3 days |
| **2B** | Composer + Chrome Score/Player canvas renderer + photo upload + preview mark | 2A, exact app card values, sport backgrounds | 3–4 days |
| **2C** | Email gate, Turnstile, Supabase table + `card-request` function (no Resend yet), share/download, done screen, blog-post CTA, homepage promo block | 2B, Supabase project, Turnstile key | 2 days |
| **3** | Resend delivery email, domain DNS, unsubscribe, privacy policy update, switch gate to "email me the card" | 2C, legal review of wording | 2 days |
| **4** | Nurture sequence (3 emails) + Sideline RSS digest + standalone Sideline form (PRD Phase 3) | 3, with addresses coming in | 2–3 days |

Each stage is its own PR. 2A is useful on its own (a free web scoreboard), so it can ship behind an unlisted URL for real sideline testing before the card exists.

---

## 7. Testing

- **Playwright smoke script** (Chromium is pre-installed; no project dependency added): setup → tap scores → undo → advance periods → full time → composer → upload a fixture photo → gate (stubbed function) → confirm the JPG blob is 1080×1920
- **Golden images:** render Chrome Score/Player with fixed inputs and compare against stored PNGs at a small tolerance, to catch drift whenever the renderer changes
- **Device matrix:** iPhone Safari (main target), iPad, Android Chrome, desktop Safari/Chrome. Check at 375 / 768 / 1280 per CLAUDE.md
- **A real game:** score one full junior game live with the screen locking between breaks before 2A goes public
- **Accessibility:** plates are `<button>`s with `aria-label="Kenmore goal, currently 3"`; the score change is announced via `aria-live="polite"`; WCAG AA contrast on `--turq-ink` text; full keyboard use on desktop

---

## 8. Risks

| Risk | Mitigation |
|---|---|
| The web card drifts from the app card | Get exact layout values from the app; golden-image tests; "last checked" note |
| A tab is killed mid-game on iOS | localStorage after every tap; timestamp clock; resume prompt |
| Junk emails before Resend | Turnstile + format check; mark `unverified`; Stage 3 switches to delivery |
| Chrome is a free design on the web but Premium in the app | Decision 1.2 before launch |
| Photo of a child in an email (Stage 3) | Process on device until requested; pass through, don't store; privacy policy + PIA first |
| Reskin breaks old pages | Token aliasing; convert page by page; `_includes` extraction |
| Canvas draws in fallback fonts | Self-hosted fonts; await `document.fonts.load` before the first draw |
