# Privacy policy draft: PostHog analytics (for owner and legal review)

**Status:** DRAFT. Do not merge or publish without owner and legal approval.
**Branch:** `privacy-draft-posthog`
**Basis:** owner decisions D6 and D16 in `documentation/app-facts.md` (PostHog product analytics is live in the app).

**This is not legal advice.** The wording was drafted from the owner's confirmation that PostHog is live and nothing else. It has not been checked against the app's code, the PostHog configuration or the law. A qualified Australian privacy lawyer should review it before it is published. Every `<mark>[OWNER TO CONFIRM: ...]</mark>` in `privacy.html` is a fact I could not verify and did not invent.

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


## Questions for the owner (plain English)

Answered and removed: opt-in vs opt-out (D20), website Pixel scope (D18), terms/encryption handling (D22).

1. Does PostHog run in the **US cloud or the EU cloud**?
2. Is there a **data processing agreement** with PostHog?
3. What is the **identifier** PostHog uses? Anonymous, or tied to an account, Apple ID or email? Does it reset on reinstall?
4. What exactly is sent? Please give the **full list of events and properties**. Are player names, team names, scores, photos, contact details or locations ever sent?
5. Are **session recordings, screenshots, autocapture, IP address or geolocation, or crash reporting** switched on in PostHog?
6. How long does PostHog **keep the data**, and is it then deleted or de-identified?
7. **Where in the app** does the user opt in, and can they turn it off again in the same place? Does the opt-in screen say the same thing as the policy? If someone wants their analytics data deleted, how do they ask?
8. Does opt-in work the same for **children under 16 (or 13)**? Is there an age gate or a parent/guardian step before a child can opt in?
9. Is PostHog the **only third-party SDK or service** in the app? Are Google Analytics and the Facebook SDK definitely absent from the app?
10. Is the traffic to PostHog **encrypted (HTTPS)**?
11. Which **minimum age** is right: 4+ (policy) or 13+ (Terms, with parental permission under 18)? It must also match the App Store age rating.
12. Which **Meta Pixel events** are sent (PageView only, or also clicks on download buttons)? Is **Advanced Matching** on? Are **custom or lookalike audiences or retargeting** used? Do you run ads on Meta at all?
13. What does **`js/card/analytics.js`** collect, where does it send data, and for how long is it kept?
14. What are the **cookie lifetimes**, and what is used to remember the banner choice?
15. Are any ads targeted at **under-18s**, or audiences built from their visits?
16. Can the policy say it is **GDPR/CCPA compliant**, or only "written with reference to"?

**For the lawyer (not the owner):**
- Does the Meta Pixel, even consent-based, count as **"sharing"** under the CCPA/CPRA, and does that affect "We never sell your data" and the need for a "Do Not Sell or Share" link?
- Is consent the right **lawful basis** under GDPR for the opt-in analytics and the cookie banner, including for children?
- Is the **APP 8** wording right for PostHog and Meta (overseas disclosure)?
- Does the **Terms** text in sections 2, 6 and 14 work as drafted?

## Related items found but NOT changed (out of scope, please decide)

- `privacy.html` still says data is stored "using encrypted SQLite database", and gives specific CloudKit retention (30 days, 7 business days deletion). I could not verify these.
- `llms.txt`, `agent.json`, `support.html` and the schema data may repeat "no tracking" claims. A site-wide search for "tracking", "analytics", "third part" and "GDPR" is advised before publish.
- The cookie banner and footer "Cookie settings" link are being built by another agent. The policy text describes the intended behaviour and must be re-checked against the built banner.

## App Store privacy label

Before publishing, check the App Store Connect **App Privacy** ("nutrition label") answers match the policy. In particular:

- **Data Used to Track You** vs **Data Linked to You** vs **Data Not Linked to You**. PostHog usage data (product interaction, device ID or user ID, diagnostics) must be declared under the right category, and the "linked to identity" answer depends on question 3.
- If the identifier is linked to the user, declare it as **Linked to You**. Declare **Used to Track You** only if the data is combined with third-party data for advertising or shared with data brokers (the policy says it is not).
- Apple's App Tracking Transparency requirement should be considered if anything is classed as tracking. Opt-in analytics should still be declared on the label; check how Apple expects opt-in collection to be shown.
- The label, this policy and the in-app consent or settings must all say the same thing.

## Build check

Built with `jekyll build`. `privacy.html`, `terms.html` and `about.html` render, with the draft banner and highlighted placeholders visible.
