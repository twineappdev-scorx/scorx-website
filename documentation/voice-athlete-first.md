# Voice guide: athlete first (Nov 2026)

The site speaks **to the athlete**. The hero sets the tone: "Don't just score your game. *Grow your game.*" / "Live scoring, stats that show real progress, and training tools to work on what matters. Every card celebrates the effort you put in."

## Rules
1. **"You" is the athlete.** Your game, your stats, your season, your training, the effort you put in. Not "your kid", "your child", "your son/daughter", "they", "their".
2. **Parents and coaches are the support crew, not the subject.** Keep them in where it's true and useful, especially for scoring: juniors usually can't hold a phone mid-game, so say so honestly. Patterns:
   - "Score it yourself after the game, or have a parent or coach tap it in from the sideline."
   - "Share it with your family" (not "the whole family will love").
   - "Your parents can follow every game" (Family Sharing is a Premium feature; keep the feature name as is).
3. **Tone:** for athletes about 10–18. Direct, warm, sporty and respectful. Not childish, no slang, no hype, no exclamation marks. Focus on effort, progress and getting better, not winning or ranking. Never compare an athlete against teammates.
4. **The three pillars:** scoring, stats tracking, training tools. Cards celebrate effort. The app is the season, and the web card is one game.
5. **Facts don't change.** Take prices, tiers and features from `pricing.json` only. Per `documentation/app-facts.md` (2026-11-19): AI training recommendations, the full run drill library, voice recording, the full card library, AI Season Narratives, export, iCloud sync and unlimited teams/players/games are **Premium**; don't imply they're free. Benchmarking and the other Train tools are Free. Free is limited to 5 teams, 25 players and 20 saved games. Keep the established claims in CLAUDE.md. Never mention the Family/Coach/Club tiers.
6. **SEO:** keep each page's primary keyword phrase (e.g. "junior AFL stats app", "netball stats app") in its `<title>`, H1 and meta description, but rewrite the surrounding words athlete first. Meta descriptions 150–160 characters. When visible FAQ text changes, update the matching FAQPage JSON-LD so they stay identical.
7. **Australian English.** Use the sport's own terms (disposals, behinds, centre pass, etc.).
8. **Don't touch:** `_posts/**` (parent-audience SEO articles), `coaches.html` (coach audience), `privacy.html`, `terms.html` (legal wording about parents/guardians stays), feature names, prices, the App Store/CTA structure and links, and page layout/CSS. This is a copy change only.
9. **Children's privacy:** athlete-first copy must never ask a young athlete for personal details. Where a page asks for an email, the integrator adds a parent/guardian note.

## Quick swaps
| Parent-first | Athlete-first |
|---|---|
| Track your kid's stats from the sideline | Track your stats, game by game |
| See if they're actually improving | See if you're actually improving |
| Share a card the whole family will love | Share your card with family and friends |
| Your child's season story | Your season story |
| Proud parent moment | Your moment |
