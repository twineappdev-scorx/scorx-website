# Junior AFL stat app — competitor research

**Gathered:** 2 August 2026
**Purpose:** source data for `compare.html` and any future comparison pages.
**Not published** — `documentation/` is in the `_config.yml` exclude list.

---

## Read this before using any figure below

Every figure here came from **search-result summaries, not primary sources.** This
environment's network policy blocks outbound fetching: `apps.apple.com`, the iTunes
lookup API, and every competitor domain (`trackstats.com.au`, `quikkicks.com.au`,
`statline.com.au`) all returned `403` at the proxy. Only server-side web search was
available, which returns a model's summary of a page rather than the page.

So: **treat everything below as a lead to verify, not a fact to publish.** Each row has
a confidence rating. Nothing here has been put on the live site.

The one exception worth calling out: the **24 MB app size** now shown on `compare.html`
came from the SEO strategy document, not from my own check of the App Store listing.
I could not verify it. Worth confirming.

---

## Findings

| App | Free offering | Paid tier | Confidence | Basis |
|---|---|---|---|---|
| **TrackStats** | Free, "no subscriptions and no barriers" | None stated | **Medium-high** | Two searches agree; both appear to read trackstats.com.au. Matches the SEO doc. |
| **KickChasers** | "Free for a limited time" | Not stated | **Medium** | Two searches agree, both citing the App Store listing. Note this is *not* the same as permanently free. |
| **QuikKicks** | Free tier exists | Pro **A$29/year** — unlimited games, up to 4 kids | **Medium** | Two independent searches returned the same figure and the same "4 kids" detail. |
| **Statline** | Free: **1 team, 1 player, 5 games** | Pro **US$29/yr or US$7.99/mo** — unlimited, all 7 sports | **Medium** | One detailed search. Sports listed: basketball, soccer, AFL, rugby league, rugby union, oztag, touch. |
| **Footy Metrics** | Unknown | Unknown | **None** | Search explicitly failed to find pricing. Developer: Matt Battersby. iOS + Android. |
| **StatsChat** | Unknown | Unknown | **None** | Voice-capture AFL stats, grassroots clubs. No pricing found. |
| **StatsMapp** | Free + premium plans | Not quantified | **Low** | 6 sports incl. AFL. "Premium unlocks more storage and post-game features." |

---

## What this changes strategically

**1. The strongest contrast is Statline, not KickChasers.**
Statline's free tier — 1 team, 1 player, 5 games — is the sharpest possible foil for
ScorX Free's unlimited teams/players/games. It's also a near-exact match for ScorX's
*own* retired free tier (the one still described in the old CLAUDE.md). Statline is
multi-sport with parent framing, which makes it the closest positional rival, more so
than the AFL-only stat pads.

**2. "Free for a limited time" is a real opening.**
If KickChasers' listing genuinely says this, then the category's most visible free
option carries no commitment to stay free. "Free forever, and here's what that means"
is a defensible differentiator — which is how the new landing page is framed, without
naming anyone.

**3. Paid tiers cluster around $29/year.**
QuikKicks at A$29 and Statline at US$29 both sit below ScorX Premium's A$49.99/year.
Worth knowing before any price-led comparison: ScorX is not the cheapest paid option,
so competing on headline price is the wrong move. The free tier is the stronger card.

**4. The content-moat finding holds.**
Nothing in this research contradicts the SEO doc's central point: no competitor runs an
ongoing content operation.

---

## To publish named comparisons, verify these first

For each of TrackStats, KickChasers, QuikKicks and Statline:

1. Current App Store listing — price, IAP tiers, app size, last-updated date
2. The developer's own pricing page — exact tier names and limits
3. Whether any "limited time" framing is still present
4. Screenshot or archive each source with a date, so the claim is defensible later

Then add a visible "verified [date]" line to any page carrying the figures, and diarise
a re-check each pre-season. The current `compare.html` sat on February 2025 data for
roughly eighteen months, which is how the Family-tier and 11.5 MB errors survived.

---

## Sources

- [KickChasers — App Store](https://apps.apple.com/au/app/kickchasers/id6759518991)
- [TrackStats](https://www.trackstats.com.au/)
- [Quik Kicks Junior Footy Stats](https://quikkicks.com.au/)
- [Footy Metrics — App Store](https://apps.apple.com/us/app/footy-metrics/id6744909954)
- [Statline](https://statline.live/) · [Statline App Store listing](https://apps.apple.com/us/app/statline/id6759094506)
- [StatsChat](https://statschat.app/)
- [StatsMapp — Google Play](https://play.google.com/store/apps/details?id=com.blamptyltd.statsmapp)
