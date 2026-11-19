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

## Questions for the owner (plain English)

1. Does PostHog run in the **US cloud or the EU cloud**?
2. Is there a **data processing agreement** with PostHog in place?
3. What is the **identifier** PostHog uses? Is it random and anonymous, or tied to an account, Apple ID or email? Does it reset when the app is reinstalled?
4. What exactly is sent? Please give the **full list of events and properties**. Are player names, team names, scores, photos, contact details or locations ever sent? (The draft says they are not, marked for confirmation.)
5. Are **session recordings, screenshots, autocapture, IP address or geolocation, or crash reporting** switched on in PostHog?
6. How long does PostHog **keep the data**, and is it then deleted or de-identified?
7. Can users **opt out** inside the app? If yes, where? If not, how should someone ask us to stop collection or delete their data?
8. Is analytics **on by default for everyone**, or does it need opt-in? (This affects the consent wording and EU/UK requirements.)
9. What happens for **children under 16 (or 13)**? Is analytics disabled, reduced, or unchanged? Is there an age gate or parental control?
10. Is PostHog the **only third-party SDK or service** in the app? Any crash reporter, subscription tool or advertising/attribution SDK? Are Google Analytics and the Facebook SDK definitely absent from the app?
11. Is the traffic to PostHog **encrypted (HTTPS)**?
12. Which age is right: the policy says the app is for **ages 4+**, but the Terms say users must be **13+** (with parental permission under 18). Which should both documents say?
13. The **website** loads a Meta Pixel on its pages. Should the policy cover website cookies and the pixel, or should there be a separate section or cookie notice?
14. For EU users, what **lawful basis** do you rely on for analytics (consent or legitimate interests)? Ask legal.
15. Does your lawyer agree with the CCPA statement that we do not "sell or share" data given PostHog is used?
16. Which of GDPR, CCPA and the APPs can the policy honestly say it **complies with**, versus is written with reference to?

## Related items found but NOT changed (out of scope, please decide)

- `terms.html` section 6 ("Key privacy commitments") still says "No third-party data sharing or selling" and "No third-party analytics or tracking". These are now false and should be fixed with the policy.
- `privacy.html` and `terms.html` both claim "End-to-end encryption via iCloud" / "End-to-end encryption for CloudKit sync". Decision D12 says make no encryption claim. Left as is; needs owner decision.
- `privacy.html` still says "All data is stored locally ... using encrypted SQLite database", and specific CloudKit retention (30 days, 7 business days deletion). I could not verify these.
- `privacy.html` Data Rights and Retention mention only CloudKit deletion. Whether analytics data can be deleted per person (for example by identifier) is part of question 7.
- Other site files (`llms.txt`, `agent.json`, `support.html`, FAQ and schema) may repeat "no tracking" claims. A site-wide search for "tracking", "analytics" and "third part" is advised before publish.

## App Store privacy label

Before publishing, check the App Store Connect **App Privacy** ("nutrition label") answers match the policy. In particular:

- **Data Used to Track You** vs **Data Linked to You** vs **Data Not Linked to You**. PostHog usage data (product interaction, device ID or user ID, diagnostics) must be declared under the right category, and the "linked to identity" answer depends on question 3.
- If the identifier is linked to the user, declare it as **Linked to You**. Declare **Used to Track You** only if the data is combined with third-party data for advertising or shared with data brokers (the policy says it is not).
- Apple's App Tracking Transparency requirement should be considered if anything is classed as tracking.
- The label, this policy and the in-app consent or settings must all say the same thing.

## Build check

Built with `jekyll build`. `privacy.html` and `about.html` render, with the draft banner and highlighted placeholders visible.
