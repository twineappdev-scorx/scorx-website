# /card build: shared contracts

Read alongside `documentation/web-demo-card-implementation-plan.md` (the plan) and `documentation/web-demo-card-prd.md` (the PRD).
Four workstreams build in parallel **in the same working tree**. Only edit files you own. If you need a change in a file you don't own, write it under "Requests to integrator" in your final report instead of editing.

**Do not `git commit`, `git push`, or `git stash`.** The integrator commits.

## Ground rules
- Static site, no build step, no npm dependencies shipped. Vanilla ES modules (`<script type="module">`), modern browsers (iOS Safari 16.4+, Chrome, Firefox).
- Design language: `css/tokens.css` (Train + Measure). Use the tokens only: no new hex colours in UI CSS except inside the card renderer. Reference: `documentation/reference/train-measure-combined.html`.
- Australian English in copy. Copy is plain and warm, without hype. The card is a "game card" or "full-time card", not a "player card" (plan 1.2).
- Accessible: real `<button>`s, labels on inputs, `aria-live` for score changes, WCAG AA contrast, keyboard usable.
- Local preview: `python3 -m http.server 8000` from the repo root, then open `http://localhost:8000/card/`. (The Jekyll front matter `---` lines show as text at the top locally. Ignore them.) Chromium + Playwright are pre-installed (`require('playwright')`). Use them to screenshot at 390×844 and 1280×800 and check your work.

## Already provided (integrator-owned, don't edit)
- `css/tokens.css`: design tokens (light + dark)
- `css/card.css`: shared primitives: `.screen-title`, `.screen-sub`, `.eyebrow`, `.panel`, `.btn .btn--primary/--ghost/--quiet/--block`, `.link-btn`, `.field .field__label .field__hint`, `.input .input--num`, `.field-row`, `.segment` (buttons with `aria-pressed`), `.check`, `.form-error`, `.notice`, `.sheet-scrim` + `.sheet`
- `card/index.html`: page shell with one empty `<section data-screen="…">` per screen
- `js/card/app.js`: router. Screen modules export `mount(el, ctx)` (once), optional `enter(ctx)` (each time shown), and optional `leave(ctx)`. `ctx = { go(name), store, sports }`. Screens: `start setup game result composer done`.
- `js/card/store.js`: game state + localStorage persistence + undo. Use `store.getState()`, `store.update(fn)`, `store.subscribe(fn)`, `store.score(team,key)`, `store.undo()`, `store.points(team)`, `store.reset(sport)`, `store.hasResumable()`, `store.cardData()`. Read the file for the state shape.
- `js/card/sports.js`: `SPORTS`, `SPORT_ORDER`, `total()`, `emptyCounts()`
- `js/card/config.js`: `CARD_REQUEST_URL`, `TURNSTILE_SITE_KEY` (both empty = dev mode), `appStoreUrl(ct)`, `deviceKind()`

## Flow
```
start ──"Score a game live"──► setup(mode=live) ──► game ──(full time)──┐
  │                                                                     ├──► composer ──(email gate passed)──► done
  └──"Game's finished? Enter the result"──► result ─────────────────────┘
start also offers "Resume <home> v <away>" when store.hasResumable().
```

## Renderer API: `js/card/render-split-rail.js` (Workstream B)
```js
export const CARD_W = 1080, CARD_H = 1920;
export const RAIL = { x, y, w, h, r };              // photo rail rect in 1080×1920 space
export async function ensureFonts();                // resolves when every card font is loaded
export async function renderSplitRail(canvas, data, opts = {});
//   canvas: HTMLCanvasElement. Renderer sets canvas.width/height = CARD_W*scale × CARD_H*scale.
//   data:   store.cardData() →
//           { sport, sportLabel, competition, round, date,
//             home:{name, initial, score, breakdown}, away:{…},
//             colours:{primary, accent, secondary} }
//   opts:   { photo: {bitmap, x, y, zoom} | null,  // bitmap = ImageBitmap|HTMLImageElement|HTMLCanvasElement;
//                                                 // x,y = focal point 0..1 within the image; zoom ≥ 1 (1 = cover)
//             preview: boolean,                    // draws the diagonal PREVIEW mark
//             scale: number }                      // 0.5 for on-screen preview, 1 for final output
//   returns canvas
export function toJpegBlob(canvas, quality = 0.9);  // Promise<Blob>
```
## Photo API: `js/card/photo.js` (Workstream B)
```js
export async function loadPhoto(file);  // → { bitmap, width, height }. EXIF-corrected, long edge ≤ 2160.
                                        // Throws Error whose .message is a user-facing sentence (e.g. HEIC on desktop).
```
## Gate API: `js/card/gate.js` (Workstream C)
```js
export async function submitCardRequest({ email, nurture, sideline, sport, source, turnstileToken });
// → { ok: true } | { ok: false, error: 'user-facing message' }
// If CARD_REQUEST_URL is empty: validate locally, console.info('[card] dev mode'), resolve { ok: true }.
```
## Analytics: `js/card/analytics.js` (Workstream C)
`track(event, props)`. It sends to `window.fbq('trackCustom', …)` if present and to `window.posthog?.capture`. Every call is wrapped in try/catch. Never send the email address, team names or anything that identifies the child. Events: `card_builder_viewed`, `card_builder_started` ({mode}), `card_preview_rendered`, `card_email_submitted` ({nurture, sideline}), `card_downloaded` ({method: 'share'|'download'}), `email_app_store_click`.

## File ownership
| Workstream | Owns |
|---|---|
| **A: Scoring** | `js/card/screens/start.js`, `setup.js`, `game.js`, `result.js`, `js/card/timer.js`, `css/card-game.css` |
| **B: Card renderer** | `js/card/render-split-rail.js`, `js/card/photo.js`, `fonts/` (self-hosted card fonts), `images/card/` (rail fallback scenes), `card/render-test.html` (dev harness, `noindex`) |
| **C: Composer, gate, backend** | `js/card/screens/composer.js`, `js/card/screens/done.js`, `js/card/gate.js`, `js/card/share.js`, `js/card/analytics.js`, `css/card-composer.css`, `supabase/**` |
| **D: Site** | `css/components.css`, `_includes/**`, `index.html`, `_layouts/default.html`, `_layouts/post.html`, `blog/index.html`, `images/qr-app-store.svg`, `compare.html`, `scorx-vs-gamechanger.html`, `_config.yml` (exclude list only) |
