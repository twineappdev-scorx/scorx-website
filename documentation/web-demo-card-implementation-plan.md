# Implementation Plan: Web Demo Card, Homepage Hero & Email Capture

**Implements:** Web Demo Card PRD v1.0 (Nov 2026), with these changes requested after the PRD:
- The demo starts with a simplified live **game view** (timer + score keeper), based on the grid-scoreboard mockup
- The output is the **Split Rail** final-score card from the card-design carousel mockup (free in the app), using the score from the game view
- **Photo upload is in scope** (the PRD listed it as out of scope)
- Output is a **1080×1920 JPG** (9:16 portrait, the final card format), unlocked by entering an email
- Two entry points: **live scoring** or **result only**
- **Resend** email delivery comes in a later stage
- The site design language moves to the **Train + Measure combined** mockup

**Status:** Draft plan, rev 2 (18 Nov 2026). Decisions 1.1, 1.2, 1.5 and the card format are settled. 1.3, 1.4 and 1.6 still need sign-off.

---

## 1. Decisions

### 1.1 "No tracking" and website analytics: RESOLVED
"No tracking" is a claim about the **app**, not the website. The website keeps the Meta Pixel and can add PostHog. PRD open question 4 is closed.

One condition for `/card`: Meta Pixel's **automatic advanced matching** reads email fields on the page and sends hashed values to Meta. On a page that collects parents' emails next to a child's card, that shouldn't happen without them knowing. Turn off automatic advanced matching for `/card` (`fbq('set', 'autoConfig', false, PIXEL_ID)` before `init`), or check that it's off in Events Manager, and send only the explicit funnel events (`card_preview_rendered`, `card_email_submitted`). The privacy policy should mention the website pixel.

Wording on `compare.html` and `scorx-vs-gamechanger.html` ("No tracking") should say "in the app" so the website pixel doesn't make it look untrue. This is a small copy fix and can go in Stage 1B.

### 1.2 Which card the web demo makes: RESOLVED, Split Rail
The web demo uses **Split Rail** (`finalScoreSplit`), which is **free in the app**. A parent who installs will find the same design there, so there's no bait and switch. Chrome stays Premium and isn't on the web.

What this means for the PRD:
- Split Rail is a **team result card** with a photo, not a player stat card. The PRD inputs for player first name, jersey number, standout stat and caption chips **don't appear on this card** and are dropped from v1. That makes the demo faster, and no child's name goes on the card at all. The photo is the personal part.
- The PRD's "player card" wording in the hero and in emails should become "game card" or "their card from Saturday" so the copy matches what the parent gets.
- A player variant can come later if the data shows parents want one (pick a design that's free in the app).

### 1.2a Card format: RESOLVED
Final output is **9:16 portrait at 1080×1920** (the in-app card ratio), as a JPG. The on-screen preview is the same layout at 540×960.

### 1.3 Photo upload changes the PRD's privacy position
The PRD kept photos out of scope because of children's privacy. Adding them is fine **as long as the photo never leaves the device until the parent asks for email delivery**:
- Stages 2A–2C: the photo is read in the browser, drawn on a canvas, never uploaded. The JPG is made on the device. Privacy risk is close to zero.
- Stage 3 (Resend): the finished JPG, now holding a child's **face** as well as their first name, goes through a Supabase edge function to Resend. It isn't stored, but it does pass through two processors. The privacy policy and the Privacy Impact Assessment (PRD 2.6) have to cover this before Stage 3 goes live.

**Recommendation:** Accept photo upload. Process it on the device only. Don't add face detection or any server-side image work. Update `privacy.html` in the same PR as Stage 3.

### 1.4 What the email gate unlocks before Resend exists
The PRD's main idea is that *delivery makes the email real*. Before Resend, the gate can only unlock a download on the spot, so the parent can type `a@a.com` and still get the card. Expect a high junk rate until Stage 3.

**Recommendation:** Ship the gate as a download unlock in Stage 2C so the funnel can be tested. Validate the email format and use Turnstile. Store the address in Supabase. Mark Stage 2C subscribers `unverified`. In Stage 3, switch the full-resolution card to email delivery (keep the preview on screen), and only treat delivered addresses as real leads.

### 1.5 Two entry paths: RESOLVED
The `/card` start screen offers **"Score a game live"** and **"Game's finished? Enter the result"**. Both go to the same card composer. The result-only path keeps the PRD's 30-second goal.

### 1.6 Smaller decisions (defaults proposed)
| Question | Proposed default |
|---|---|
| v1 sports | AFL, netball, basketball, soccer (soccer is the 4th; check Search Console) |
| Card variants | Split Rail only in v1 |
| Preview mark | Diagonal "PREVIEW" mark at 25% opacity on a 540×960 preview. The full 1080×1920 JPG has no mark |
| Web branding on the card | Keep the app's footer band (ScorX tile + "GROW YOUR GAME") and add "scorx.com.au" on the right of the band (PRD 2.3 wants the URL on web cards). Confirm with the app team, or add the URL to the app card too so they stay identical |
| Consent boxes | Two, unticked (PRD default) |
| Footer email | Needs the actual `@scorx.com.au` mailbox to exist first (MX records set up) |
| Fonts | Fraunces + Archivo for site UI (per the reference). The card uses Archivo 900 italic for "FULL TIME" and the scores, and a condensed face (Bebas Neue or Oswald, whichever matches the app) for team names and labels. Confirm the app's actual fonts |

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
  render-split-rail.js          # canvas renderer for the Split Rail card
  photo.js                      # file → ImageBitmap, orientation, cover-crop, pan/zoom
  gate.js                       # email + consent form, Turnstile, submit
  share.js                      # Web Share (files) → download fallback
  analytics.js                  # thin wrapper; no-op if analytics is off
images/card/                    # per-sport fallback rail images (night-ground scenes), ~550×1660
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
- Team colours: ScorX (default) or two pickers. These drive the Split Rail background and accent colours

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

**4. Quick result** (path for parents after the game): sport, team names, final score fields per sport (AFL goals + behinds), round optional, then on to the composer. Aim: under 30 seconds.

**5. Composer** (one card, so no carousel picker; uses the carousel mockup's "detail" screen pattern)
- **Add photo:** `<input type="file" accept="image/*">`. On iOS this offers camera or library and hands over JPEG. The photo fills the **rail** (the tall framed panel on the right), so the crop is tall and narrow (about 1:3). Drag to pan and pinch/slider to zoom inside the rail frame. Without a photo, the rail shows the sport's night-ground scene
- **Colours:** ScorX / Team colours (segmented, as in the mockup)
- **Edit details:** team names, round and competition from setup, editable here in case of typos
- Live preview at 540×960 with the PREVIEW mark, redrawn (debounced) on every change

**6. Gate** (directly under the preview, per PRD 2.3)
- "Get the full-size card": email (required), two unticked consent boxes (PRD 2.4 wording), Turnstile, submit
- On success: unlock the 1080×1920 JPG → **Share** (Web Share Level 2 with `files`, which puts "Save Image", Messages and Facebook in the iOS share sheet) or **Download** fallback on desktop
- Stage 3 switches this to "Card sent to {email}" (PRD 2.3)

**7. Done.** The app pitch: "That's one game. ScorX makes one every week, and builds the season story." App Store button with a campaign token on iOS. QR code on desktop. Android: the Sideline subscribe option.

### 3.3 The Split Rail renderer (canvas, 1080×1920, 9:16 portrait)
Layout taken from the mockup art. Coordinates below are at 1080×1920 (mockup px × 2) and should be checked against the app's real values.

**Background:** a vertical gradient of the primary colour (mockup: maroon `#7C1430`, getting lighter at the top and going almost black by the bottom third), plus a large faint ring arc behind the left column. ScorX colour mode: navy `#0F2A44` → `#081B2E`, with turquoise accent.

**Left column** (x ≈ 56–470):
- "FULL" in white and "TIME" in the **accent colour** (mockup: gold `#F2C14E`), both heavy italic, about 120 px, top left
- Sport (tracked caps, muted) and "ROUND 12" (smaller, muted) under it
- **Home block:** a circular badge (about 200 px, accent ring, team initial in accent) → team name in condensed caps white → score in large heavy italic → AFL breakdown `13.6` in muted text
- A short divider line
- **Away block:** a dark filled badge with the initial in the secondary colour (mockup: light blue `#8EC5F0`) → name → score → breakdown
- **Winner's score in the accent colour, loser's in white.** In a draw, both are white. The breakdown line only appears for AFL. Other sports leave it out
- Team names use shrink-to-fit with `measureText` down to a minimum size, then wrap to 2 lines ("BAYSIDE BULLDOGS" is about the longest that fits on one)

**Right rail** (x ≈ 476–1024, y ≈ 56–1716): a rounded rectangle (r ≈ 48) with a 6 px accent border. The photo is cover-cropped inside it and clipped to that rounded shape, using the parent's pan/zoom. Fallback: the sport's night-ground scene (pre-rendered JPGs, about 550×1660, about 120 KB each). With nothing at all, a blurred navy gradient (matches `srcEmpty`).

**Footer band** (y ≈ 1790–1920): darker strip, ScorX tile icon + "ScorX" + "GROW YOUR GAME" in turquoise tracked caps on the left, "scorx.com.au" on the right (see 1.6).

**Fonts:** `await document.fonts.load(...)` for every face used before the first draw, or the first render falls back to a system font. Self-host the card fonts in `/fonts/` so canvas drawing doesn't depend on Google Fonts CORS.

**Output:** `canvas.toBlob(cb, 'image/jpeg', 0.9)`, 1080×1920. The file is named `scorx-kenmore-v-wests-2026-11-22.jpg`. Expect 300–600 KB with a photo.

**Source of truth:** the app's Split Rail card. Before building, get the exact app layout values (fonts, sizes, colours, rail position, radius) from the iOS code or design file. The mockup JPGs are only a visual reference. Add a "web template last checked against app build X" note in `render-split-rail.js`.

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

**CTA hierarchy (owner decision, 18 Nov 2026):** the card is a demo. The App Store download is the main action everywhere (homepage hero on iOS and desktop, blog post CTA, `/card` app bar and start screen). The card builder is always the secondary "Or try it first: make a free card". This overrides PRD 2.1's desktop row, which made the card primary. Exception: Android visitors can't install, so their hero keeps the card as primary.

- **Hero:** split layout. Left side: a 2–3 line Fraunces headline ("18 games this season. *Did they actually improve?*"), a one-line subhead, device-aware buttons, and the trust line. Right side: a real Split Rail card (same renderer as `/card`, so the homepage shows exactly what the demo makes), with scores counting up on load (skipped under `prefers-reduced-motion`). Remove the "See ScorX for AFL" button
- **Device-aware buttons:** server-render the desktop version (default). A small inline script swaps it on iOS (`/iPhone|iPad/` or iPadOS `MacIntel` + touch) and on Android. With no JS, the visitor sees the desktop version, which is safe
- **Desktop QR:** a static SVG generated once for the campaign-tagged App Store URL. No runtime QR library
- **Social proof strip, pricing slim-down, coaches one-liner, card promo block, footer email:** as per the PRD. The footer change becomes a one-file edit once nav/footer are in `_includes` (2.2)
- **Blog CTA:** add the demo-card block to `_layouts/post.html` after `{{ content }}`. One edit covers all 27 posts
- **Campaign tokens:** add `?pt=…&ct=hero|card-confirm|email-delivery…&mt=8` to every App Store link (PRD 2.7)

---

## 6. Delivery stages

| Stage | Scope | Depends on | Size |
|---|---|---|---|
| **0** | Remaining decisions (1.3, 1.4, 1.6); baseline App Store click rates; campaign tokens on existing links; Pixel advanced matching off for `/card` | Nothing | 0.5 day |
| **1A** | Design tokens + component layer; `_includes` for nav/footer | 0 | 1–2 days |
| **1B** | Homepage hero rebuild, social proof, pricing/coaches slim-down, footer email (PRD Phase 1) | 1A, real quote + permissions, mailbox | 1–2 days |
| **2A** | `/card` setup, live game view, quick result, persistence, wake lock | 1A | 2–3 days |
| **2B** | Composer + Split Rail canvas renderer + rail photo upload with pan/zoom + preview mark | 2A, exact app card values, sport rail backgrounds | 2–3 days |
| **2C** | Email gate, Turnstile, Supabase table + `card-request` function (no Resend yet), share/download, done screen, blog-post CTA, homepage promo block | 2B, Supabase project, Turnstile key | 2 days |
| **3** | Resend delivery email, domain DNS, unsubscribe, privacy policy update, switch gate to "email me the card" | 2C, legal review of wording | 2 days |
| **4** | Nurture sequence (3 emails) + Sideline RSS digest + standalone Sideline form (PRD Phase 3) | 3, with addresses coming in | 2–3 days |

Each stage is its own PR. 2A is useful on its own (a free web scoreboard), so it can ship behind an unlisted URL for real sideline testing before the card exists.

---

## 7. Testing

- **Playwright smoke script** (Chromium is pre-installed; no project dependency added): setup → tap scores → undo → advance periods → full time → composer → upload a fixture photo → gate (stubbed function) → confirm the JPG blob is 1080×1920
- **Golden images:** render Split Rail with fixed inputs (AFL win, netball draw, long team names, with and without a photo) and compare against stored PNGs at a small tolerance, to catch drift whenever the renderer changes
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
| Web card isn't available free in the app | Resolved: Split Rail is free in the app |
| Hero/email copy promises a "player card" but the card is a team result | Reword to "game card" (1.2) |
| Photo of a child in an email (Stage 3) | Process on device until requested; pass through, don't store; privacy policy + PIA first |
| Reskin breaks old pages | Token aliasing; convert page by page; `_includes` extraction |
| Canvas draws in fallback fonts | Self-hosted fonts; await `document.fonts.load` before the first draw |
