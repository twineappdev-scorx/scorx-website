# ScorX Website Lead Capture PRD: Web Demo Card, Homepage Hero & Email Capture

**Document Version:** 1.0
**Date:** November 2026
**Status:** Draft. Open questions remain.
**Surface:** scorx.com.au (Jekyll site). No iOS app changes are required.
**Builds on:** existing card design, Supabase (new features forward), PostHog, ScorX blog / footy mum content system

---

## 1. Executive Summary

### Problem Statement

scorx.com.au works as a download page, but it can't capture anyone. Its only conversion is an App Store tap, so every visitor who isn't ready to install an iOS app right now leaves with no way back in. That includes most blog readers arriving from search, everyone on a desktop, and every Android parent. The 27-post blog sequence is bringing in solution-aware parents and then losing them.

The homepage makes this worse in three ways:

- **The hero has no visual impact.** On desktop, the whole first screen is a four-line all-caps headline and a four-line subhead. The player card is the reason parents want ScorX, and it doesn't appear until you scroll. There is no main button above the fold except the small "Download Free" in the nav bar.
- **There are too many exits.** The homepage sends visitors to about 8 different places (App Store, AFL page, How It Works, Athletes, Pricing, Coaches, the graphic generator page, the blog). The secondary hero button ("See ScorX for AFL") pulls people away from the download at the moment they're most ready.
- **There is no social proof.** No quotes, no club names, no user numbers.

### Solution

Three linked changes:

1. **Rebuild the homepage hero** so the card is the first thing a visitor sees, with fewer and clearer buttons.
2. **Add a Web Demo Card builder.** A parent makes a one-game player card in the browser in about 30 seconds and sees a preview straight away. They enter their email to get the full-resolution image delivered. Delivering the image is what makes the email address real.
3. **Add email capture and follow-up.** Card requesters can opt in, separately, to (a) a short ScorX nurture sequence that pushes toward installing the app, and (b) The ScorX Sideline blog digest.

### Core Design Principle

**A web card is a moment. The app is the season.** The web card has to be good enough that a parent is proud to share it. It also has to stay clearly limited to one game, so it sells the app instead of replacing it. Every email and every piece of copy around the web card says the same thing: *"This is one game. ScorX builds one every week, and a season of them is proof they're improving."* This uses the homepage's existing line ("One card is a moment. A season of them is proof.") and keeps the "ask little, return pride" principle: little effort in, immediate pride out.

---

## 2. Feature Requirements

### 2.1 Homepage Hero Redesign

**Layout**
- Split layout on desktop: headline and buttons on the left, a real ScorX player card on the right.
- The card should have light motion (e.g. stats counting up, or the card settling into place). Keep it subtle and fast, and respect `prefers-reduced-motion`.
- On mobile, the card sits directly below a shortened headline and is visible above the fold on a standard iPhone viewport.

**Headline and subhead**
- Keep the hook, but cut it so it fits on 2–3 lines at hero size. Direction: *"18 games this season. Did they actually improve?"* Final wording is copy work, not fixed by this PRD.
- Cut the subhead to one line. Direction: *"Track their games from the sideline. Share a player card the whole family will love. Free."* Move the sports list (AFL, basketball, netball, rugby + 16 sports) out of the hero, either into a small strip of sport chips below it or onto the Sports page.

**Buttons (device-aware)**

| Visitor | Primary button | Secondary button |
|---|---|---|
| iPhone / iPad | "Download free on the App Store" | "Make a free card now" (web demo) |
| Desktop | "Make a free card now" (web demo) | App Store badge + QR code ("Scan with your iPhone") |
| Android | "Make a free card now" (web demo) | None for the App Store. Optional Android waitlist (see Open Questions) |

- Remove "Playing junior footy? See ScorX for AFL" from the hero. AFL visitors get to the AFL page through nav or search.
- The trust line stays below the buttons: "Free forever. No credit card. Built in Australia."

### 2.2 Homepage Structure Changes

- **Social proof strip** directly under the hero: at least one named parent quote (first name, club or suburb), and one club reference (e.g. Kenmore Bears, with the club's permission). If there's a usable App Store rating, show it. One real quote is enough for v1. Don't wait for a full testimonial section.
- **Pricing section:** keep only the free reassurance on the homepage ("ScorX Free: $0 forever. No credit card. No trial. No artificial limits."). Move the Premium tier detail (A$49.99/yr, AI recommendations, benchmarking, exports) to /pricing, with a single "See Premium" link. This follows the existing principle that Premium prompts belong at emotionally important moments, not on a first visit.
- **Coaches section:** shrink to one line plus a link ("Coach a team? ScorX is free for coaches →"). Coaches mostly arrive through a direct link and should land on /coaches.
- **Card builder promo block:** add a mid-page section ("Try it now: make their card from Saturday's game") linking to the web demo card.
- **Footer:** replace scorxapp@gmail.com with an @scorx.com.au address.
- **Blog posts:** add the demo card call to action at the end of every post (and optionally mid-post on long posts). This is where most of the uncaptured traffic is.

### 2.3 Web Demo Card Builder

**Location**
- A dedicated page at `/card` (shareable, linkable from blog posts, Facebook, Instagram bio, and club newsletters).
- Opened from the homepage hero, a mid-page block, the end of every blog post, and sport pages.

**Inputs (kept small, aiming for under 30 seconds)**

1. Sport (choose from the v1 sports list, see Open Questions)
2. Player first name (first name only, matching the existing children's privacy default)
3. Jersey number (optional)
4. Team name and opposition name
5. Final score (sport-appropriate fields, e.g. goals/behinds for AFL, matching in-app terminology)
6. One standout stat: a sport-specific picker with a number (e.g. AFL: disposals, goals, tackles, marks; netball: goals, intercepts, feeds), pre-filled with a sensible default
7. Caption: use the Quick Card caption chips (e.g. "Proud of you, {name}.", "Best on ground, {name}.", plus the loss-appropriate "Tough game, proud of how {team} fought."), with free text as an option
8. Colour treatment: ScorX brand (default) or two team colours from a simple picker

**No photo upload in v1** (see Out of Scope).

**Rendering**
- The card is rendered **in the browser** (canvas or SVG to PNG). Nothing is sent to the server until the parent asks for the full-resolution version.
- The visual design must match the in-app card closely enough that a parent who later installs the app recognises it. This is a second rendering path, so the risk of the two drifting apart is accepted. Treat the in-app card as the source of truth and review the web template whenever the in-app card changes.
- The card carries the standard ScorX branding/footer ("Made with ScorX · scorx.com.au"), as in-app cards do.

**Preview and email gate**
- After the inputs, the parent sees the card **on screen straight away** as a lower-resolution preview with a light "Preview" mark.
- Directly under the preview: **"Email me the full-size card to share."** Email field, consent checkboxes (2.4), and submit.
- Accepted: a parent can screenshot the preview. It still carries the ScorX brand, so sharing it still spreads the brand. Don't over-engineer protection against this.
- Hiding the card until an email is entered is **explicitly rejected**. Showing the value first is what makes the email exchange feel fair, and it reduces junk addresses.

**After submit**
- Confirmation on screen: "Card sent to {email}. Check your inbox (and spam, just in case)."
- Immediately below it, the app pitch: "That's one game. ScorX makes one every week, and builds the season story." Show the App Store button (iOS), or the QR code (desktop).

### 2.4 Email Capture & Consent

The form has **one required field** (email) and **two separate, unticked checkboxes**:

- ☐ "Send me a few tips on getting more out of ScorX" (nurture sequence, 2.5)
- ☐ "Subscribe to The ScorX Sideline, our blog for sports parents" (blog digest, 2.6)

Rules:
- Delivering the requested card is a transactional email and is sent whether or not either box is ticked.
- Without the relevant opt-in, nothing else is sent. No nurture emails and no Sideline issues.
- Every marketing email identifies ScorX as the sender and includes a working one-click unsubscribe, as required under the Spam Act 2003. The legal wording must be checked before launch. This PRD isn't legal advice.
- The blog page also gets a standalone Sideline subscribe form (email + one consent tick) so readers can subscribe without making a card.

### 2.5 Email Flows

**Email 1: Card delivery (transactional, immediate)**
- Subject direction: "{Name}'s player card is ready"
- Full-res card attached and shown in the email body
- One line of pride, one line of pitch: "Want one of these after every game, without the typing? ScorX builds them from the sideline."
- App Store button with a campaign-tagged link (App Store Connect campaign token) so installs can be attributed to the email

**Nurture sequence (only with nurture consent), 3 emails, then stop**

| # | Timing | Job | Direction |
|---|---|---|---|
| N1 | The Thursday/Friday evening before the next weekend | Get them to record the next game live | "This Saturday, record it live. Two minutes to set up, card ready at the siren." |
| N2 | About a week after N1 | Show the season value | "One card is a moment. A season of them is proof." Trends, game history, the family sharing a season. |
| N3 | About two weeks after N1 | Answer the main objection | "Won't this make me *that* parent?" Developing, not monitoring. Then the App Store link. |

- No Premium upsell anywhere in the sequence. The goal is installs and recorded games. Premium prompts stay in the app at emotionally important moments.
- The sequence can't tell whether someone has installed (there's no account link between web email and app). It stays short on purpose so installers aren't nagged.
- Seasonality: if a parent's chosen sport is out of season, N1 copy changes to a "preseason / next season" framing. In v1 this is a simple sport-to-season lookup.

**The ScorX Sideline (only with Sideline consent)**
- An automated digest built from the Jekyll RSS feed. Default is fortnightly, sent only when there's at least one new post.
- Must cost **no extra writing effort**. If keeping it going needs a hand-written newsletter, that's new scope that conflicts with the minimal-scope principle and must be decided separately.
- Footer of each issue: "Make a free card from Saturday's game →" (links to /card).

### 2.6 Data, Privacy & Storage

**What's stored (Supabase `web_subscribers` table or equivalent)**
- Email address
- Nurture consent (bool + timestamp), Sideline consent (bool + timestamp)
- Source (`/card`, `blog-footer`, `sideline-form`), sport chosen, created timestamp
- Unsubscribe status

**What's not stored**
- Player first name, team names, stats, caption, or the card image. The rendered PNG is passed through an edge function to the email provider for delivery and is **not saved or logged** by ScorX.
- Be honest about this in the privacy policy: the card image (which contains a child's first name) passes through ScorX's server and the email provider so it can be delivered. It is not kept.

**Alignment with existing privacy commitments**
- First names only on web cards, same as the in-app default.
- Assess against the in-scope children's privacy obligations (Australian Children's Online Privacy Code work, Privacy Impact Assessment practice) before launch.
- **Conflict to resolve before launch:** the homepage promises "privacy-first (no ads, no tracking)." Adding analytics to the website (2.7) has to be done in a way that keeps that claim true (cookieless, no third-party ad tracking), or the claim has to be reworded. Don't ship analytics that quietly breaks a promise on the homepage.

**Abuse protection**
- Rate-limit card emails per IP and per address.
- Add a lightweight bot check (e.g. Cloudflare Turnstile) on submit.
- A delivered image can only go to the address that requested it, which limits misuse.

### 2.7 Measurement

**Baseline first (before any homepage changes go live)**
- Record, for the last 4–8 weeks: homepage → App Store click rate; blog session → App Store click rate; split by desktop / iOS / Android.
- This tells us whether the problem is capture (blog readers never click) or the App Store listing (they click but don't install). If it's the listing, that work comes first.

**Funnel events (PostHog, cookieless mode)**
`card_builder_viewed` → `card_builder_started` → `card_preview_rendered` → `card_email_submitted` (with consent flags) → `card_email_delivered` → `email_app_store_click`, plus `hero_cta_click` by variant and device.

**Install attribution:** App Store Connect campaign tokens on every web and email App Store link (`hero`, `card-confirm`, `email-delivery`, `nurture-n1` … `sideline`).

**Success measures (targets set after 2 weeks of live data, not guessed now)**
- Preview → email submit rate
- Share of blog sessions that start the card builder
- Email → App Store click rate and attributed installs
- Nurture and Sideline opt-in rates; unsubscribe rate per email

---

## 3. Delivery Phases

| Phase | Scope | Backend needed | Why this order |
|---|---|---|---|
| 0 | Baseline measurement, campaign tokens on existing App Store links | None | Can't judge any change without it |
| 1 | Hero redesign, button changes, social proof strip, pricing/coach slimming, footer email, desktop QR | None (static site only) | Quick wins. Fixes the first-screen problem straight away |
| 2 | `/card` builder, preview, email gate, delivery email, subscriber table, blog-post CTA | Supabase edge function + email provider | The lead magnet itself |
| 3 | Nurture sequence, The ScorX Sideline digest, standalone Sideline form | Email automation + RSS-to-email | Only worth building once Phase 2 is collecting addresses |

---

## Out of Scope

| Feature | Rationale |
|---|---|
| Photo upload on the web card | Creates a store of children's photos and raises the privacy load sharply. Also adds friction |
| Web accounts / saving web cards | A web account is a second product surface. The app is where the record lives |
| Importing web cards into the app's game history | Web cards are typed from memory, not recorded live. Pulling them into the season record would dilute the integrity of ScorX's data artifacts (cards, the worm) |
| Multi-game or season cards on the web | Season value is the reason to install. Giving it away on the web removes the reason |
| Full stat entry on the web | Turns a 30-second demo into a chore, going against "ask little, return pride" |
| Premium upsell in web emails | Premium prompts belong in the app at emotionally important moments |
| Hand-written newsletter | New ongoing content commitment. The Sideline is an automated digest of the existing blog |
| Android app | Not part of this PRD. Android visitors get the web card and the Sideline |
| Club-specific landing pages | Separate initiative already on the horizon |
| A/B testing infrastructure | Phase 1 vs baseline comparison is enough for v1. Run formal tests only once traffic supports them |

---

## 4. Open Questions

1. **v1 sports list.** Which 3–4 sports get web card templates first? The default proposal is AFL, netball, basketball, then a fourth chosen by Search Console traffic.
2. **Preview mark strength.** How strong should the preview mark be: a small "Preview" corner mark, or a lower-res image only? The lighter the mark, the more pride but the fewer emails.
3. **Merge or separate consent boxes?** Two boxes is cleaner for consent and matches the request. One combined box would probably get more opt-ins. The default is two.
4. **"No tracking" claim vs website analytics.** Keep the claim and use cookieless analytics only, or reword the claim?
5. **Email provider.** It needs transactional sends, a simple 3-step sequence, and RSS-to-email. Choose between one provider for everything vs a transactional provider (Resend/Postmark) plus a newsletter tool.
6. **Android waitlist.** Add an optional "Tell me when ScorX is on Android" box for Android visitors as demand data? It's cheap to collect, but it creates an implied promise.
7. **Social proof permissions.** Get written OK from Kenmore Bears (and any quoted parent) before naming them on the homepage.

---

*Builds on: in-app card design (source of truth for the web template), Quick Card caption chips, children's privacy defaults (first names only), Premium prompt timing principle, Supabase + PostHog stack, ScorX blog / Jekyll RSS feed.*
