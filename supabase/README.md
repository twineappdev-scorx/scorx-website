# ScorX card backend (Supabase)

Server side for the `/card` email gate. Nothing here is deployed by the site build.

## Parts
- `migrations/001_web_subscribers.sql`: `web_subscribers` (email, consent flags and timestamps, source, sport, `verified`, unsubscribe) and `card_request_log` (SHA-256 hashes of IP and email, for rate limiting). RLS is on with no anon/authenticated policies, so only the service role can touch them.
- `functions/card-request/index.ts`: Deno edge function. CORS allowlist, body validation, Turnstile check, rate limit (5 per IP per hour, 3 per email per day), subscriber upsert (consent timestamps set only on false to true, consent never unset here). If `RESEND_ENABLED=true` and the body includes `imageBase64` (max 2MB), it emails the card via Resend and sets `verified=true`. It never logs the email or image.

## Environment variables (`supabase secrets set KEY=value`)
| Name | Purpose |
|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Provided automatically to edge functions |
| `TURNSTILE_SECRET` | Cloudflare Turnstile secret. Empty skips verification (staging only) |
| `HASH_SALT` | Random string mixed into IP/email hashes |
| `ALLOW_LOCALHOST` | `true` to allow `http://localhost:8000` (dev only) |
| `RESEND_ENABLED` | `true` to send the card by email (Stage 3) |
| `RESEND_API_KEY`, `RESEND_FROM` | Resend key and sender, e.g. `ScorX <cards@scorx.com.au>` |
| `UNSUBSCRIBE_URL` | One-click unsubscribe endpoint for `List-Unsubscribe` |

## Deploy
```bash
supabase link --project-ref <ref>
supabase db push
supabase functions deploy card-request --no-verify-jwt
```

## Leaving dev mode
In `js/card/config.js` set `CARD_REQUEST_URL` to `https://<ref>.supabase.co/functions/v1/card-request` and `TURNSTILE_SITE_KEY` to the Turnstile site key. Empty values mean the gate validates locally and unlocks without a network call.

## Stage 3 (Resend) checklist
1. Verify `scorx.com.au` in Resend; add SPF, DKIM and DMARC records in DNS.
2. Create the `cards@scorx.com.au` sender; set `RESEND_API_KEY` and `RESEND_FROM`.
3. Build the one-click unsubscribe endpoint (honouring `List-Unsubscribe-Post`); set `UNSUBSCRIBE_URL`.
4. Update `privacy.html`: the finished card (child's face and first name) passes through the edge function and Resend and is not stored. Complete the Privacy Impact Assessment and legal review of wording.
5. Client change: composer must send `imageBase64` (the final JPEG, max 2MB) and the done screen should say "Card sent to {email}" (needs a change in `gate.js`/`composer.js`).
6. Set `RESEND_ENABLED=true`; only addresses with `verified=true` count as real leads.
