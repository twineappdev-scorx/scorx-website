# Asset requests: owner capture checklist

Source: `documentation/website-scope-implementation-plan.md` (sections 0 and 2, WP-3 to WP-6 and WP-8) and section 6 of the gap review. Features are limited to those `documentation/app-facts.md` marks as released. Tiers come from `app-facts.md` and `pricing.json`.

Agents building the pages must not mock up app UI. Each slot below is a planned `<!-- ASSET NEEDED: A-xx ... -->` comment. Until the file exists the section stays text-only.

---

## 1. Capture rules (apply to every asset)

**Demo data.** Use a fictional junior athlete and squad. No real children's names, faces, photos, team logos or club names.
- Athlete: "Alex M.", age 13 (Under 14), AFL, Ruck/Midfield. Initials only if the screen allows. Don't use a photo; leave the avatar as the default.
- Team: "Demo Hawks U14" (or similar, nothing that matches a real club). Squad names: generic first names only, no surnames (the existing iPad shots already use Ben, Clinton, Evan and so on; that is fine).
- Account: a Premium (trial) account so Premium screens render, plus a Free account where a tier lock is the point of the shot (A-02 and A-12 say which).
- Dates: use plausible dates within the last 6 months.
- Status bar: 9:41, full battery, full signal (Xcode simulator, or `xcrun simctl status_bar`).
- Appearance: Dark mode (matches every existing shot). Metric units (SI). Australian locale.
- No debug banners, no keyboard showing, no personal email visible in Settings.

**Devices and sizes.**

| Device | Capture at | Website export |
|---|---|---|
| iPhone (6.1 in class) | 1170 x 2532 PNG (2x of the 390 x 844 layout) | `.webp`, 800 x 1731, quality 82 (matches the existing `*.webp` shots). Keep the full-size PNG in the owner's archive. |
| iPad (11 or 13 in) | 2048 x 2732 PNG, portrait | `.webp`, 1200 px wide, quality 82. Landscape is fine for Team Mode: 2732 x 2048, export 1600 px wide. |
| Screen recording | Simulator or device at native resolution | `.mp4` H.264, max 1080 px on the long edge, 15 to 30 s, under 5 MB, no audio unless the row says so. Also supply a `-poster.webp` still (first useful frame). |

**Naming.** Lower-case, hyphens, no spaces. Train assets go in `images/train/`, everything else in `images/features/`. Don't add device frames or padding: the `.x-shot` component draws the frame. Keep the status bar and home indicator.

**Priority.** P0 = needed for the P0 pages (`train.html`, `index.html`, `athletes.html`, `coaches.html`) to ship screenshot-led. P1 = strengthens the page and can follow. P2 = nice to have.

---

## 2. Inventory: what already exists

I opened each image. Findings first, then the table.

Findings that change the plan:
- `images/measureview.webp` shows the **Measure input form** (10m Sprint, 40m Sprint, Standing Jump Height, 2km Run, Max Pushups, Max Squat, empty fields, Save Session). It does **not** show a trend chart or goal line. It fits "log results" but not "trend chart, goal line". A-01 is therefore P0.
- `images/reference/train-measure-combined.html` (mentioned in the plan) is not in this branch. Don't rely on it.
- `images/drillcreator.png` and `playcreator.png` show the **editors** (AFL oval, tokens, Phase 1, Save Drill/Save Play), not an animation during playback. They work as stopgaps for the Drill and Play Library sections; A-08 and A-09 replace them.
- The Train-tab shots show the profile "Tim, Ruck, Age 23", an adult demo profile. Fine for features, not for junior-athlete storytelling. Prefer the new Alex M. captures where a slot says "athlete".

| Existing file | Shows | Fills slot | Notes |
|---|---|---|---|
| `images/measureview.webp` (800x1731) | Measure tab input form with Speed, Power, Endurance and Strength metrics | `train.html` Measure, "log results" (stopgap); `athletes.html` walkthrough step 1 | No chart or goal line. Keep until A-01 lands. |
| `images/traintabview.webp` (800x1731) | Train tab: Training Goal card, Running Drills (10m Sprint, Standing Jump Height, Start and Record), Training Drills | `train.html` Run drills (stopgap); `coaches.html` Test your squad (stopgap) | Shows the "Complete Baseline Assessment" banner. |
| `images/drillcreator.png` (1170x2532) | Drill editor, full AFL oval, Cone/Player/Ball, Phase 1, Save Drill | `train.html` Drill library (stopgap); `index.html` season story Train shot 2 (stopgap) | Replace with A-08. |
| `images/playcreator.png` (1170x2532) | Play editor, forward-line positions, Phase 1, Save Play | `train.html` Play library (stopgap) | Replace with A-09. |
| `images/sessioneditor.png` (1170x2532) | "My session": Envelope drill, Rotation (20m Sprint, Shuttle Sprints), Edit Session, Record Session, Export PDF | `train.html` Training sessions (fills the editor slot, so A-15 is only P2); `coaches.html` Plan your training | Run Session itself is still missing (A-11). Export PDF is Premium. |
| `images/teamtabcoach.png` (1170x2532) | Coach Tools: My Coach Code, Player Analytics, Team Insights and Training, Play Library, Drill Library, Training Sessions | `coaches.html` Plan your training (hub shot) | |
| `images/ipad/lineup_ipad.png` (2048x2732) | Plan Mode, "Step 1 of 2: Plan Your Lineup", on-field positions and interchange | `coaches.html` iPad Team Mode (lineup planning); `features.html` iPad Team Mode | A lineup list, not a magnet board. See A-24. |
| `images/ipad/gameplan_ipad.png` (2048x2732) | Plan Mode, "Step 2 of 2: Configure Statistics" | `coaches.html` iPad Team Mode (game plan) | |
| `images/ipad/gamescore_ipad.png` (2048x2732) | Live scoring on iPad, per-player stat buttons | `features.html` iPad Team Mode | |
| `images/ipad/coachfeatures_ipad.png` (2048x2732) | Coach Features: My Teams, My Coach Code, Player Analytics, recent activity | `coaches.html` (iPad coach hub) | |
| `images/ipad/dashboard_ipad.png` (2048x2732) | Team triage: Current Game / Season View / Trends, data coverage, player status | `coaches.html` "What to work on this week" (post-game triage) | |
| `images/ipad/home_ipad.png` (2048x2732, 5.9 MB) | iPad launcher: Score, Review, Train, Measure and menu rows | No planned slot | Compress to webp before any use. |
| `images/playercardconfig.png`, `playercardtemplate.png` (1170x2532) | Player card configurator: Card Type, Style, Size, measurements, preview, Save/Share | `features.html` Share Cards (partial) | Shows the configurator (Premium), not the Share Cards carousel. See A-20. |
| `images/Game Card Creator.webp`, `images/finalscorecardgenerator.webp` (800x1731) | Share Cards menu: Team Logos, Game Results, Stats Overview | `features.html` Share Cards (partial) | |
| `images/playerstatscardsetup.webp`, `images/careerstatsview.webp` (800x1731) | Select Card Statistics; Player Career Statistics card builder | `features.html` Share Cards (partial) | |
| `images/newsettingsview.png` (1170x2532) | Settings: Account, "I'm a coach" toggle, Notifications, Appearance, Units, iCloud Sync | Optional iCloud Sync mention | |
| `images/hero.webp`, `game.webp`, `livestats1.webp`, `gameview*.png`, `Teamtabview.webp`, `Playertabview.webp`, `stats.webp`, `gamehistoryview.webp` and similar | Score and Track screens already used on the site | Existing pages | No new slot. |

Gaps after this inventory: no Measure trend chart, Create Metric sheet, goal-setting sheet, Development Plan, BHAG, benchmarking, animator playback, Run Session, voice recording, team import, Share Cards carousel, AI recommendations, drill assignment or team results, game pack export/import, magnet board, screen recordings or icon set.

---

## 3. Missing assets

File names are relative to the repo root. "Page and section" names the slot the other agents are building.

### 3a. Train (iPhone), `images/train/`

| ID | Device | Screen | App state to set up | File | Format | Page and section | Priority |
|---|---|---|---|---|---|---|---|
| A-01 | iPhone | Measure, metric detail with trend chart | Alex M., 40m Sprint. At least 6 results over 5 to 6 months, improving: 7.4, 7.3, 7.2, 7.1, 7.0, 6.9 s. Goal mode on with a target of 6.7 s so the **goal line** shows. Benchmark band visible if the chart shows one. | `images/train/measure-chart-goal.webp` | webp 800x1731 | `train.html` Measure (chart and goal line); `index.html` season story Train shot 1; `athletes.html` walkthrough steps 2 and 5 | **P0** |
| A-02 | iPhone | Create Metric sheet | Open the custom metric sheet from Measure. Fill in a realistic metric, for example "Kick distance", unit m, higher is better. Show the Free limit note if the app shows one. Account: Free. | `images/train/create-metric.webp` | webp 800x1731 | `train.html` Measure ("create your own metric": Free 1, Premium unlimited) | **P0** |
| A-03 | iPhone | Goal mode, set a target | The sheet or row where a target is entered for 40m Sprint (6.7 s), before saving. | `images/train/set-goal.webp` | webp 800x1731 | `athletes.html` walkthrough step 2 "set a goal"; `train.html` Measure | **P0** |
| A-04 | iPhone | Development Plan overview | Alex M. with a BHAG set (fictional, for example "Play more of every quarter"), 3 skills each with 2 drills, outcome goal and S&C goal filled in. | `images/train/development-plan.webp` | webp 800x1731 | `index.html` season story Train shot 3 (planned ASSET NEEDED slot); `athletes.html` walkthrough step 3 "plan"; `train.html` Plan | **P0** |
| A-05 | iPhone | Development Plan, one skill open | One skill (for example Kicking) expanded, showing its 2 drills. | `images/train/development-plan-drills.webp` | webp 800x1731 | `athletes.html` walkthrough step 4 "drills" | **P1** |
| A-06 | iPhone | BHAG screen | The one big player-level goal with progress. Fictional goal text. | `images/train/big-goal.webp` | webp 800x1731 | `train.html` Plan ("your big goal"); `athletes.html` | **P1** |
| A-07 | iPhone | Age and sex benchmarking | A metric (40m Sprint or 2km Run) compared with the age and sex benchmark. Benchmarking is Free. | `images/train/benchmarking.webp` | webp 800x1731 | `train.html` Measure; `features.html` Train summary | **P1** |
| A-08 | iPhone | Drill Animator, playback | An AFL drill (for example Envelope or a handball drill) paused mid-animation with players and ball visible, Phase 2 selected, playback controls showing. Use the preview, not the editor. | `images/train/drill-animator.webp` | webp 800x1731 | `train.html` Drill library; `index.html` season story Train shot 2 | **P0** (P1 if the `drillcreator.png` stopgap is accepted) |
| A-09 | iPhone | Play Animator, playback | A forward-line play paused mid-animation with movement paths visible. | `images/train/play-animator.webp` | webp 800x1731 | `train.html` Play library | **P1** |
| A-10 | iPhone | Drill Library list | 6 to 8 AFL drills, with a favourite star on 2 of them. | `images/train/drill-library.webp` | webp 800x1731 | `train.html` Drill and Play libraries (favourites, save and import) | **P1** |
| A-11 | iPhone | Run Session, mid-run | Session running with beep pacing: current drill, countdown, next drill, pause button. Use the Rotation (20m Sprint, Shuttle Sprints) so it matches `sessioneditor.png`. | `images/train/run-session.webp` | webp 800x1731 | `train.html` Training sessions; `coaches.html` Plan your training | **P0** |
| A-12 | iPhone | Run drills with the Premium lock | Run drill list with Beep Test, 800m TT and 2km TT unlocked, and the sprint and interval drills locked. Account: Free. | `images/train/run-drills-tiers.webp` | webp 800x1731 | `train.html` Run drills (Free and Premium chips) | **P1** |
| A-13 | iPhone | Record how it went | End of a session: the reflection or result screen (how it felt, notes). | `images/train/session-reflection.webp` | webp 800x1731 | `train.html` Training sessions | **P1** |
| A-14 | iPhone | AI training recommendations | A recommendation card for Alex M. after 5 games, with the refresh note if shown. Account: Premium. | `images/train/ai-recommendations.webp` | webp 800x1731 | `train.html` AI insights (Premium); `coaches.html` weekly recommendations | **P1** |
| A-15 | iPhone | Training Session editor (fuller) | Optional replacement for `sessioneditor.png`: 4 to 5 blocks (warm-up, skill drill, Rotation, run drill, cool-down) with a total time. | `images/train/session-editor.webp` | webp 800x1731 | `train.html` Training sessions | **P2** |

### 3b. Coaches and iPad

| ID | Device | Screen | App state to set up | File | Format | Page and section | Priority |
|---|---|---|---|---|---|---|---|
| A-16 | iPhone | Drill assignment | Coach Tools: assign a drill or fitness test to Demo Hawks U14 (3 to 4 players or the whole squad selected). | `images/train/coach-assign-drill.webp` | webp 800x1731 | `coaches.html` Test your squad | **P1** |
| A-17 | iPhone | Team results | Squad results for a run drill (2km Run or Beep Test), sorted, with benchmark markers. Generic first names. | `images/train/team-results.webp` | webp 800x1731 | `coaches.html` Test your squad | **P1** |
| A-24 | iPad | Team Mode magnet board | The magnet board with 18 player tokens on an AFL oval during lineup planning. | `images/features/ipad-magnet-board.webp` | webp 1200x1600 portrait, or 1600x1200 landscape | `coaches.html` iPad Team Mode; `features.html` iPad Team Mode | **P1** |
| A-33 | iPhone | Match invitation screen | Coach view of a match invitation with the player list, invite status and attendance. Generic first names. | `images/coaches/match-invite.webp` | webp 800x1731 | `coaches.html` Match Invitations (added by WP-9; the old image file never existed) | **P1** |
| A-34 | iPhone | Rotations | The rotation screen with playing time percentages and interchange history for a fictional game. | `images/coaches/rotations.webp` | webp 800x1731 | `coaches.html` Player Rotations and Playing Time (added by WP-9) | **P1** |
| A-35 | iPhone | Perception vs Reality | The chart comparing player self-assessment with recorded stats. Fictional players. | `images/coaches/perception-reality.webp` | webp 800x1731 | `coaches.html` Perception vs Reality (added by WP-9) | **P1** |

### 3c. Features page: voice, import, Share Cards, game packs, Share Extension

| ID | Device | Screen | App state to set up | File | Format | Page and section | Priority |
|---|---|---|---|---|---|---|---|
| A-18 | iPhone | Voice recording, listening | iOS 26 or later. AFL live scoring with voice recording active and a confirmation such as "Ben, tackle" visible. Account: Premium. | `images/features/voice-recording.webp` | webp 800x1731 | `features.html` Score (voice, Premium, iOS 26 and later); `coaches.html` | **P0** |
| A-19 | iPhone | Team import preview | Import from a PlayHQ-style `.xlsx` or `.csv`: the screen after choosing the file, showing the parsed roster (12 to 18 generic names) and the confirm button. Use a sample file you made, not a real export. | `images/features/team-import.webp` | webp 800x1731 | `features.html` Score (spreadsheet team import); `coaches.html` Import your squad | **P0** |
| A-20 | iPhone | Share Cards carousel | The carousel of cards for one game, swiped to the middle card, Share button visible. Account: Premium. | `images/features/share-cards-carousel.webp` | webp 800x1731 | `features.html` Track (Share Cards, Premium) | **P1** |
| A-21 | iPhone | Player Card library | Several card styles, with the Free style marked, to show Free and Premium. | `images/features/player-card-library.webp` | webp 800x1731 | `features.html` Track | **P2** |
| A-22 | iPhone | Game pack export and import | The export and import options for a game pack, with a fictional game. | `images/features/game-pack.webp` | webp 800x1731 | `features.html` Score (game pack export and import) | **P2** |
| A-23 | iPhone | Share Extension | The iOS share sheet from Files or Mail with ScorX as the target for a roster file. | `images/features/share-extension.webp` | webp 800x1731 | `features.html` Score (Share Extension) | **P2** |

### 3d. Screen recordings (15 to 30 s)

Record in Dark mode with the status bar set as in section 1. Show touches (Simulator: Show Touches; device: a visible touch indicator). No audio unless noted. Deliver the `.mp4` plus a poster still.

| ID | Device | What to record | File | Page and section | Priority |
|---|---|---|---|---|---|
| A-25 | iPhone | **Train walkthrough, 25 to 30 s.** Train tab, Measure, log a 40m Sprint result, see the trend chart and goal line, open the Development Plan, open one drill. | `images/train/train-walkthrough.mp4` + `train-walkthrough-poster.webp` | `train.html` hero or Measure | **P0** |
| A-26 | iPhone | **Run Session, 15 to 20 s.** Start a session, beep pacing for two drills, finish and record how it went. Audio on if the beeps are the point. | `images/train/run-session.mp4` + `run-session-poster.webp` | `train.html` Training sessions | **P1** |
| A-27 | iPhone | **Voice recording, 15 to 25 s.** Start scoring an AFL game, speak three stat calls ("Ben, tackle", "Clinton, handball", "goal, Evan") and show them logging. Audio on. iOS 26 or later. | `images/features/voice-recording.mp4` + `voice-recording-poster.webp` | `features.html` Score (voice); `coaches.html` | **P0** |
| A-28 | iPhone | **Drill Animator clips, 10 to 15 s each, 3 to 5 AFL drills.** Play each animation from the Drill Library, ending where it starts so it loops. One file per drill. These feed the **deferred `afl-drills.html`** page (WP-10), which is only built once clips exist. If the owner makes them with Remotion instead, replace this row. | `images/train/drills/<drill-slug>.mp4` + poster | `afl-drills.html` (deferred); `train.html` Drill library (optional) | **P2** |
| A-29 | iPhone | **Play Animator, 10 to 15 s.** One forward-line play, looping. | `images/train/play-animator.mp4` + poster | `train.html` Play library; `afl-drills.html` (deferred) | **P2** |
| A-30 | iPad | **Team Mode, 15 to 20 s.** Drag tokens on the magnet board to set a lineup, then move to scoring. | `images/features/ipad-team-mode.mp4` + poster | `coaches.html` iPad Team Mode | **P2** |

### 3e. Icons and App Store

| ID | Asset | Spec | Page | Priority |
|---|---|---|---|---|
| A-31 | Score / Track / Train icon set (optional upgrade) | WP-1 creates simple SVG icons at `images/icons/score.svg`, `track.svg` and `train.svg`. Only supply a designed set if the owner wants one: SVG, 24 px grid, 1.75 px stroke, brand turquoise `#00D4C4`, must not resemble the logo mark. Replace the three files in place. | `.x-pillars` on `index.html` and `features.html` | **P2** |
| A-32 | Updated App Store screenshots | Owner task, not a website slot. Refresh the store listing to show Train (Measure chart, Development Plan, Drill Animator), voice recording and iPad Team Mode. Reuse the A-01, A-04, A-08, A-18 and A-24 captures at the sizes App Store Connect requires. | App Store Connect | **P2** |

---

## 4. Slot summary by page

| Page | Section | Needs | Stopgap if missing |
|---|---|---|---|
| `train.html` | Hero or walkthrough video | A-25 | none |
| `train.html` | Measure | A-01, A-02, A-03, A-07 | `measureview.webp` (log results only) |
| `train.html` | Plan | A-04, A-06 | text only |
| `train.html` | Drill and Play libraries | A-08, A-09, A-10 | `drillcreator.png`, `playcreator.png` |
| `train.html` | Run drills | A-12 | `traintabview.webp` |
| `train.html` | Training sessions | A-11, A-13, A-15, A-26 | `sessioneditor.png` |
| `train.html` | AI insights (Premium) | A-14 | text only |
| `index.html` | Season story, Train block | A-01 (shot 1), A-08 (shot 2), A-04 (shot 3) | `measureview.webp`, `drillcreator.png`, text only |
| `athletes.html` | Development Plan walkthrough | A-03, A-04, A-05, A-01 | `measureview.webp` for step 1; text only |
| `coaches.html` | Match invitations, rotations, Perception vs Reality | A-33, A-34, A-35 | text only (slots hidden) |
| `coaches.html` | Plan your training | `teamtabcoach.png`, `sessioneditor.png`, A-11 | existing shots |
| `coaches.html` | Test your squad | A-16, A-17 | `traintabview.webp` |
| `coaches.html` | iPad Team Mode | A-24, A-30, existing `lineup_ipad.png`, `gameplan_ipad.png` | existing iPad shots |
| `coaches.html` | Voice, import | A-18, A-19, A-27 | text only |
| `features.html` | Voice recording | A-18, A-27 | text only |
| `features.html` | Spreadsheet team import | A-19 | text only |
| `features.html` | Share Cards | A-20, A-21 | `playercardconfig.png`, `Game Card Creator.webp` |
| `features.html` | iPad Team Mode | A-24, existing `gamescore_ipad.png` | existing iPad shots |
| `features.html` | Game packs, Share Extension | A-22, A-23 | text only |
| `afl-drills.html` (deferred) | Drill clips | A-28, A-29 | page not built |

Suggested capture order for one session: A-01, A-02, A-03 and A-25 (Measure); A-04 to A-06 (Development Plan); A-08 to A-13 and A-26 (libraries and sessions); A-18 and A-27 (voice); A-19; then the coach and iPad shots.

---

## 5. Re-run after Phase 2

The slots above are planned from the plan text, before the Phase 2 pages exist. After WP-2 to WP-7 merge, collect the real slots:

```bash
grep -rn "ASSET NEEDED" --include=*.html .
```

The integrator (WP-9) reconciles that output against this list. Every slot found in the code must map to an ID above (add a new ID if an agent created a slot this list didn't predict). Any ID with no slot in the code can be dropped or moved to P2. Update file names here if an agent used a different path. Re-run again after WP-10 for the landing pages.
