# Train page keywords (decision D17)

**Researched:** 19 November 2026
**Page:** `train.html`
**Status:** recommendation only. `train.html` has not been edited.

## Confidence and method limits

**Overall confidence: low to moderate (roughly 55 to 60 percent) that this is the best primary keyword; high (about 85 percent) that the current one is not.**

- The only search tool available is a US-only web search that returns summaries. It does not return a real google.com.au SERP, autocomplete, "People also ask" or volumes.
- No volume or difficulty data was available. Everything below about competition is inferred from which pages and apps the summaries surfaced. Treat it as a hypothesis to check in Google Search Console after launch.
- Before relying on this, someone should run each candidate in an Australian browser and compare the SERP with the notes below.

## Recommendation

| | |
|---|---|
| **Primary keyword** | **junior AFL training app** |
| **Secondary keywords** | AFL training drills app; beep test app; junior fitness testing app; junior athlete training app |
| **Title (54 characters)** | `Junior AFL Training App: Drills, Fitness Tests \| ScorX` |
| **H1** | `A Junior AFL Training App: Drills, Fitness Tests and Your Plan` |
| **Meta description (153 characters)** | `Junior AFL training app: run footy drills, log your beep test and fitness tests, follow your development plan and see your progress. Most tools are free.` |

Apply the same title and description to `og:title`, `og:description`, `twitter:title`, `twitter:description` and the JSON-LD `description`. The FAQ text and its FAQPage JSON-LD must stay identical to each other.

Body copy should still say the page works for 16 sports through running drills (D15), so the AFL-first keyword does not make non-AFL athletes feel excluded. It should also keep the athlete-first voice: the keyword is a label, the wording around it is "you" and "your".

## Why "junior athlete training app" is not the primary

It is the current target and nobody researched it. What the search showed:

- The SERP for the broad phrase is a mix of sport-body pages (AIS, Athletics Australia, Artistic Swimming), a coach safeguarding course, one start-up news story, a few low-profile apps (iNSPIRE Sport, Sportly, The Champion Academy) and TrainingPeaks. There is no single dominant intent. That is a sign Google is guessing, which is a chance but also means the phrase may not be searched much as written.
- "Athlete" in Australian junior sport skews towards athletics, swimming and elite pathways. A parent or junior footballer is more likely to say "footy", "AFL" or the sport name.
- It is generic, so it cannot be matched against any real feature the page uniquely does. ScorX's drill content is AFL-first.
- It stays useful as a secondary keyword and as a natural descriptor in body copy.

## Candidate assessment

Intent: A = app download, I = informational. Competition is judged from the summaries only.

| Candidate | Intent | Who appears to rank | Voice fit | Can the page satisfy it? | Verdict |
|---|---|---|---|---|---|
| junior AFL training app | A | Few true apps. Rookie Me Coach (coach-side, paid), Ball Magnets (free, player-side), Footy Skills Lab (Google/AFL, 2021) | Strong. Athlete is the user | Yes. Drill Library and Animator, running drills, Beep Test, Development Plan, Training Sessions | **Primary** |
| AFL training drills app | A/I | Same set, plus Sportplan, AFL Pro (old), Footy Drills (old, free), club and Sherrin drill pages | Strong | Yes, honestly, but the page is not a 650-drill coach library. Rookie Me has far more | Secondary |
| beep test app | A | App Store listings dominate: Bleep Test Lite, Beepio, BEEP Beep Test Coach, Bleep Test, Beep Test Solo (several free) | Fine | Partly. ScorX runs a beep test with pacing inside Run Session, but the searcher wants a standalone timer | Secondary. Expect to rank poorly against dedicated apps; useful for long-tail |
| junior fitness testing app (kids' sport fitness tests) | A/I | Fitness Tests (ConnectedPE), Jaguar Athletics, topendsports.com. All US presidential-test or PE flavoured. No Australian junior sport result seen | Strong (benchmarking by age and sex, no teammate comparison) | Yes. 14 metrics, Beep Test, 800m and 2km time trials, age and sex benchmarks, all free | Secondary. Least contested and a real differentiator |
| youth athlete development plan | I | Template sites (template.net, FirstRep), YouCoach, 24-7 Athletes, US-centric | Strong | Partly. A template-seeking searcher wants a download | Leave to `athletes.html` and the existing post |
| junior footy training session planner | A (coach) | easy2coach, Rookie Me, Total Sessions, Onside, Teamo, Coach Blitz, Pembee templates | Weak. Searcher is a coach | Partly. Training Sessions exist, but this is a coach tool | Leave to `coaches.html` or a future page |
| athlete training plan app | A | Endurance apps: Runna, TrainingPeaks, TriDot, TrainAsONE, Edge, Freeletics | Fine | No. Searchers want adult race or gym plans | Avoid |

Two further observations:
- No result in the junior footy session-planner search was specific to Australian junior football. The gap is real but is a coach-side gap.
- Nothing I found combined player-facing drills, fitness testing, benchmarking and a development plan for juniors. That combination is the page's real angle, and "junior AFL training app" is the closest honest label for it.

## Routing the other keywords

| Keyword or theme | Serve it with | Reason |
|---|---|---|
| junior footy training session planner, AFL session plan template, training plan for a junior team | `coaches.html` now. A future `/training-session-planner.html` if Search Console shows demand | Coach intent, and competitors are coach tools. The athlete-first voice on `train.html` would not match |
| AFL drills (a drill list, "best kick drills for juniors") | A future `/afl-drills.html` page with a drill-by-drill list. `train.html` keeps "AFL training drills app" as a secondary | Informational list intent. A list page would beat an app page, and it can link to Train |
| youth athlete development plan, individual development plan | `athletes.html` (already keyworded this way) and the 2026-07-14 post | Already owned |
| beep test app, beep test score meaning, beep test levels chart | Secondary on `train.html`. A future short explainer post could capture the informational side | Page can only partly satisfy the app intent |
| athlete training plan app | Do not target | Wrong audience and unwinnable |

## Cannibalisation risks

| Existing page or post | Overlap | Risk | Mitigation |
|---|---|---|---|
| `index.html` ("Junior AFL Stats App") | Shares "junior AFL" and "app" | Low to medium. Different head terms (stats vs training) | Never put "stats app" in the Train title or H1. Link the homepage to Train with "training" anchor text and Train back with "stats" anchor text |
| `features.html` ("Youth Athlete Tracking & AI Training") | "training", "AI", "youth athlete" | Medium. Its H1 contains "AI Sports Training Recommendations" | Do not use "AI training" in Train's primary or title. AI is Premium and a minor part of the page. Features should not claim "junior AFL training app" |
| `athletes.html` ("Athlete Development Plans") | Development Plan, measure and re-test | Medium on the "development plan" theme | Keep "development plan" out of Train's title. Mention it in the description only as a feature. Link Train to Athletes with "development plan" anchor text |
| `coaches.html` | Training plans, sessions | Medium on "training session" terms | Keep "session planner" off Train. Link to coaches for squad assignment |
| `sports.html` | "AFL" and "16 sports" | Low | None needed |
| Post 2026-05-05 (building speed) | "acceleration drills for kids", "junior athlete speed training" | Low to medium on "drills" | Train should not target speed or acceleration drill phrases. Link the post from Train |
| Post 2026-07-14 (individual development plan) | "junior development plan" | Medium if Train targets "development plan" | Same mitigation as `athletes.html` |
| Post 2026-07-07 (testing days) | "testing days youth sport" | Low to medium on fitness testing | Train targets the app intent ("fitness testing app"), the post targets the explainer. Cross-link both ways |
| Post 2026-05-26 (warm-up and injury prevention) | Injury prevention programs | Low | Link only |
| Post 2026-05-06 (coach a junior AFL team) | "run great training sessions" | Low. Coach audience | None needed |

## What to check after launch

1. Search Console, 6 to 8 weeks after the change: impressions and position for the primary and each secondary. If "junior AFL training app" gets almost no impressions but "beep test" or "fitness test" queries show up, rebalance towards those.
2. Look at the live google.com.au SERP and autocomplete for each candidate before the page is published, since that was not possible here.
3. Check whether Google AU shows App Store listings for "beep test app". If it does, treat that term as long-tail only.
4. Re-check the claims about competitors before naming any of them on the site. They come from search summaries (see the caveat in `competitor-research-2026-08.md`) and are for internal use only.

## Sources consulted (search summaries, not primary reads)

- Junior athlete training apps in Australia: bandt.com.au (iNSPIRE Sport), apps.apple.com (Sportly, The Champion Academy), ausport.gov.au, athletics.com.au
- Beep test apps: apps.apple.com listings for Beepio, Bleep Test Lite, Bleep Test, BEEP Beep Test Coach, Beep Test Solo
- AFL drills: coach.rookieme.com, apps.apple.com (Ball Magnets), blog.google (Footy Skills Lab), sportplan.net, sherrin.com.au
- Development plans: apps.apple.com (24-7 Athletes), youcoach.com, template.net
- Session planners: easy2coach.net, apps.apple.com (Total Sessions, Onside Training, Coach Blitz, Footy Drills), teamo.chat, pembee.app
- Fitness testing: apps.apple.com (Fitness Tests, Bleep Tests), innovativetimingsystems.com, topendsports.com
- Training plan apps: 220triathlon.com, outsideonline.com, mymottiv.com
