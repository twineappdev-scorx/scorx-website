# Privacy policy draft: PostHog analytics (for owner and legal review)

**Status:** DRAFT. Do not merge or publish without owner and legal approval.
**Branch:** `privacy-draft-posthog`
**Basis:** owner decisions D6 and D16 in `documentation/app-facts.md` (PostHog product analytics is live in the app).

**This is not legal advice.** The wording was drafted from the owner's confirmation that PostHog is live and nothing else. It has not been checked against the app's code, the PostHog configuration or the law. A qualified Australian privacy lawyer should review it before it is published. Every `<mark>[OWNER TO CONFIRM: ...]</mark>` in `privacy.html` is a fact I could not verify and did not invent.

## Update: Meta Pixel and cookie banner disabled (D23, 2026-11-19)

The owner disabled the Meta Pixel and the cookie banner on the website until ads go live (commented out, marker `ADS-OFF`). This draft now says the website uses no advertising pixels, third-party analytics or tracking cookies. The "Website Cookies and Meta Pixel" section is replaced by "Our Website", which lists the services that really do receive visitor data: GitHub Pages (hosting), Google Fonts, YouTube privacy-enhanced embeds on how-it-works, and Buttondown (newsletter). The card-maker email gate isn't live (`CARD_REQUEST_URL` is empty). The Meta-related lawyer items below (b, c) are **deferred until ads are planned**. Re-enabling ads requires restoring the consent-first Meta section from this branch's history (commit before this one) and legal review.

## Lawyer review: highest risk

Please look at these four items first. They are the points where the draft is most exposed.

1. **Account-linked analytics, same opt-in for children as young as 4, no parental step.** PostHog events are tied to a pseudonymous account identifier, so they are personal information. The app is for ages 4+ with a parent or guardian, but the analytics opt-in is the same for everyone: no separate under-16 handling and no parent or guardian step. Is the opt-in valid consent for children (Privacy Act and APPs, GDPR Article 8, CCPA rules for under-16s)? Is a parental step needed? What should the App Store age rating and privacy label say?
2. **Planned Meta retargeting on a site whose copy speaks to athletes aged 10 to 18.** No Meta ads or retargeting run today, but they may start soon. The policy discloses that the Pixel may in future be used to measure and target ads, including retargeting, for visitors who accept cookies. Please review this against Meta's policies on audiences directed at children, and against the OAIC Children's Online Privacy Code being developed in Australia, **before any ads start**.
3. **Does "We never sell your data" survive CCPA "sharing" once retargeting starts?** Retargeting through the Meta Pixel is typically cross-context behavioural advertising, which the CCPA/CPRA calls "sharing". Does the trust line need changing, and is a "Do Not Sell or Share" link needed, even with consent-first loading?
4. **No PostHog data processing agreement confirmed.** The owner is not sure one is in place, and retention is not set. Analytics data goes to the United States, so APP 8 reasonable steps and GDPR transfer rules depend on it.

**Action item for the owner before publishing:** Accept PostHog's DPA (self-serve in PostHog settings) and set or confirm the retention period before publishing.

## What was inaccurate

| # | Location | Old text | New text | Reason |
|---|---|---|---|---|
| 1 | `privacy.html` Quick Summary | "We don't sell your data. We don't use third-party trackers. We don't show ads. Your game data is yours, stored securely on your device and optionally synced via Apple iCloud (ScorX Premium)." | "We don't sell your data and we don't show ads. We use a product analytics service (PostHog) to understand how the app is used so we can improve it. We don't use that data for advertising. Your game data is stored on your device and optionally synced via Apple iCloud (ScorX Premium)." | "No third-party trackers" is false with PostHog live. Also dropped "securely", an unverified claim. |
| 2 | Data Security Measures | "No third-party analytics or tracking services" | "Analytics data is sent to PostHog over an encrypted connection [confirm HTTPS]" | Direct contradiction of D6. |
| 3 | Data Sharing heading box | "We do NOT share your data with third parties." | "We do not sell or rent your data, and we do not share it with advertisers." | False once PostHog processes usage data. |
| 4 | Data Sharing body | "The only external service we use is Apple's CloudKit..." | Lists CloudKit and PostHog Inc. as external services, plus a placeholder asking for any other SDKs | The processor list was incomplete. |
| 5 | Data Sharing "No Third-Party Analytics" block | "We do not use Google Analytics, Facebook SDK, or similar services" | Removed the "No Third-Party Analytics" heading. Kept "do not sell or rent", added "do not use your data for advertising", and kept the Google/Facebook SDK line as an unconfirmed item. Added "disclose where required by law". | "Or similar services" is false (PostHog is similar). The SDK line is unverified, so it is marked. |
| 6 | Automatically Collected / Usage Data | (no mention of third party) | Added a pointer and a new "Product Analytics (PostHog)" subsection: what is collected, processor, location, purpose, retention, opt-out, children, website | New APP 5 style disclosure. |
| 7 | How We Use Your Information | "Develop new features based on usage patterns" | "...including analytics from PostHog" | Makes the purpose link explicit. |
| 8 | Children's Privacy | (no mention of analytics) | Added "Analytics and children" paragraph, all unknowns marked. Also flagged the 4+ vs 13+ conflict. | Users are often under 16. Policy says 4+, Terms section 2 says 13+. |
| 9 | International Users | CloudKit and local only | Added PostHog processing location (placeholder) and an APP 8 cross-border paragraph | PostHog is a US company; processing location unknown. APP 8 applies to overseas disclosure. |
| 10 | Data Retention | (no analytics retention) | Added "Analytics Data" retention placeholder | Retention is unknown. |
| 11 | Introduction | (no APP reference) | Added Twine App Dev, APP 1 and APP 5 reference | Business is Australian. |
| 12 | Legal Compliance | "This Privacy Policy complies with:" | "...is written with reference to the following laws and standards [legal to confirm]:" and APP line now cites Privacy Act 1988 (Cth), APP 1, 5 and 8 | A flat "complies" claim for GDPR/CCPA is not defensible without review. |
| 13 | GDPR and CCPA rights | CCPA: "Right to opt-out of sale (we do not sell data)". GDPR: no lawful basis | CCPA line now covers "sale or sharing" with a legal check. GDPR: added lawful basis placeholder for analytics. | Analytics vendors can count as "sharing" under CCPA/CPRA. EU analytics usually needs a stated lawful basis, often consent. |
| 14 | Consent | "Collection and use of information as described in this policy" | Adds "including product analytics" with opt-in/opt-out question. Added "Turning off analytics" to ways to withdraw. | Consent wording depends on how analytics is actually controlled. |
| 15 | Last updated, effective date, footer "Last Reviewed" and "Privacy Policy Version" | October 6, 2025 / 1.0 | `[OWNER TO SET ON PUBLISH]` | Instruction. |
| 16 | Top of page | (none) | Amber "DRAFT FOR OWNER AND LEGAL REVIEW. DO NOT PUBLISH." box | So the draft cannot be mistaken for the final policy. Remove on publish. |
| 17 | `about.html` "Privacy-first, by design" card | "ScorX is GDPR and CCPA compliant. ... Read the privacy policy for the detail." | "Built with privacy in mind. Read our privacy policy. Your data lives on your device and syncs privately via iCloud with Premium." plus an HTML comment marking it for review | Compliance claims are not defensible without legal sign-off. Link is now an actual link. "No ads. We never sell your data." was kept (D6 wording). |
| 18 | `privacy.html` Quick Summary and analytics section | "...We use a product analytics service (PostHog)..." | Leads with the approved trust line "No ads. We never sell your data. Data collection is opt-in and only used to improve the app." and states app analytics is opt-in and off until the user opts in (D19, D20) | Owner confirmed opt-in. |
| 19 | `privacy.html` How to opt out, Consent, GDPR | "opt out" and "opt-in, opt-out, or always on?" placeholders | Now "How to opt in or withdraw", consent wording says analytics applies only if you opt in, GDPR line says consent-based | Answers owner question 8. In-app location of the setting is still open. |
| 20 | `privacy.html` new section "Website Cookies and Meta Pixel" | (website not covered; one placeholder) | New section: consent banner, nothing loads until Accept, what the Pixel does (Meta ad measurement and audience features), `js/card/analytics.js`, how to withdraw via footer "Cookie settings", placeholders for Advanced Matching, custom audiences, cookie lifetimes, plus a legal flag on CCPA "sharing" | D18. The Meta Pixel was on this very page. |
| 21 | `privacy.html` Data Sharing list | CloudKit and PostHog | Adds Meta Platforms (website Pixel, consent only) | List of external services must be complete. |
| 22 | `privacy.html` Cloud Storage and Security | "Security: End-to-end encryption via iCloud"; "Apple's CloudKit security infrastructure" | "Sync: Your data syncs through your own iCloud account" (no encryption claim); "Apple's CloudKit infrastructure for iCloud sync" | D12 and D22: owner is unsure it is end-to-end. |
| 23 | `terms.html` top | (none) | Draft banner | Same as privacy page. |
| 24 | `terms.html` s6 | "No third-party data sharing or selling"; "No third-party analytics or tracking"; "End-to-end encryption for CloudKit sync" | "No ads. We never sell your data"; "Data collection is opt-in and only used to improve the app"; "Your data syncs through your own iCloud account" | D22. First two are false with PostHog and the Meta Pixel. |
| 25 | `terms.html` s14 | Lists Apple services only | Adds PostHog (opt-in analytics) | Third-party list was incomplete. |
| 26 | `terms.html` s2 | "at least 13" | Unchanged, plus marker asking which age is correct | Conflicts with privacy "4+". |
| 27 | `privacy.html` PostHog section | Identifier "anonymous or pseudonymous"; region, event list, features all placeholders | Pseudonymous account identifier, so events are personal information. US cloud. Never sent: player or team names, scores, photos, contact details, location. Only crash and error reporting on; no autocapture, session replay or IP/GeoIP storage. HTTPS. | Owner answers 1 to 4 and 12. |
| 28 | `privacy.html` opt-in | "where in the app?" placeholder | Offered during onboarding, switchable any time in Settings | Owner answer 5. |
| 29 | `privacy.html` and `terms.html` age | Privacy "4+ ... under 13 without parental consent"; Terms "at least 13" | Both: "children aged 4 and over with a parent or guardian's permission or management", purchases by an adult | Owner answer 7. Must match the App Store age rating. |
| 30 | `privacy.html` Children | Placeholder about under-16 handling | States the same opt-in for everyone, no separate handling, with a prominent lawyer flag | Owner answer 6. |
| 31 | `privacy.html` Meta Pixel | "audience features, such as showing our ads"; ads questions | Measurement now; no Meta ads or retargeting today; may in future measure and target ads including retargeting for those who accept cookies; Advanced Matching off; `_fbp` about 90 days; banner choice in localStorage `scorx_consent` | Owner answers 9 and 13. |
| 32 | `privacy.html` third parties | "list any others" placeholder | PostHog only, plus Apple frameworks (StoreKit, CloudKit). Google Analytics/Facebook SDK line now unmarked. | Owner answer 8. |
| 33 | `privacy.html` Legal Compliance | "written with reference to ... [confirm]" | "written with reference to" Privacy Act/APPs, GDPR, CCPA, plus "we do not claim that it complies in full" | Owner answer 11. |
| 34 | `privacy.html`, `terms.html` heads | Meta Pixel script in head | Merged the banner's version (single `consent.js` tag). No head change by me. | Banner work on the base branch. |
| 35 | `about.html` trust card | "No ads. We never sell your data. Built with privacy in mind... syncs privately via iCloud" | "No ads. We never sell your data. Data collection is opt-in and only used to improve the app. Built with privacy in mind. Read our privacy policy. ... syncs through your own iCloud account with Premium." | Owner answer 14 and D19. |



## Questions for the owner (plain English)

Answered and removed: opt-in (D20), PostHog region (US), identifier, what is and is not sent, PostHog features, opt-in location, children's handling, minimum age, third-party SDKs, Meta plans, Advanced Matching, HTTPS, cookie lifetimes, compliance wording.

1. **PostHog DPA:** has the data processing agreement been accepted? (Action item above.)
2. **PostHog retention:** what period will you set or confirm?
3. Please attach the **final list of event names and properties** sent to PostHog, so legal can check the "never sent" list.
4. Does the **opt-in screen wording** match the policy, and how will you carry out a **deletion request** for a person's analytics data in PostHog?
5. **Meta Pixel events:** PageView only, or also clicks such as download buttons?
6. What does **`js/card/analytics.js`** collect, where does it send data, and for how long is it kept?
7. Is the **App Store age rating** set to match "4+ with a parent or guardian", and does the App Store privacy label match this policy (account-linked usage data and diagnostics)?
8. When do you expect **Meta ads or retargeting** to start? Legal should review before then.
9. The **"Last updated", "Effective date", version and "Last Reviewed"** fields need setting on publish.

## Related items found but NOT changed (out of scope, please decide)

- `privacy.html` still says data is stored "using encrypted SQLite database", and gives specific CloudKit retention (30 days, 7 business days deletion). I could not verify these.
- `llms.txt`, `agent.json`, `support.html` and the schema data may repeat "no tracking" claims. A site-wide search for "tracking", "analytics", "third part" and "GDPR" is advised before publish.
- The cookie banner (`js/consent.js`) is now merged on the base branch. The policy text describes its behaviour (nothing loads until Accept, choice stored in localStorage `scorx_consent`, footer "Cookie settings" link) and should be re-checked against the final banner.

## App Store privacy label

Before publishing, check the App Store Connect **App Privacy** ("nutrition label") answers match the policy. In particular:

- **Data Used to Track You** vs **Data Linked to You** vs **Data Not Linked to You**. PostHog usage data (product interaction, device ID or user ID, diagnostics) must be declared under the right category, and the "linked to identity" answer depends on question 3.
- If the identifier is linked to the user, declare it as **Linked to You**. Declare **Used to Track You** only if the data is combined with third-party data for advertising or shared with data brokers (the policy says it is not).
- Apple's App Tracking Transparency requirement should be considered if anything is classed as tracking. Opt-in analytics should still be declared on the label; check how Apple expects opt-in collection to be shown.
- The label, this policy and the in-app consent or settings must all say the same thing.

## Build check

Built with `jekyll build`. `privacy.html`, `terms.html` and `about.html` render, with the draft banner and highlighted placeholders visible.
