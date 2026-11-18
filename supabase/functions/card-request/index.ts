// Supabase edge function: card-request (Deno).
// Validates the request, checks Turnstile, rate limits, upserts the subscriber, and (Stage 3,
// behind RESEND_ENABLED) emails the finished card. Never logs the email address or the image.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const env = (k: string) => Deno.env.get(k) ?? '';
const supabase = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_IMAGE_B64 = 2 * 1024 * 1024 * 4 / 3; // ~2MB decoded
const PER_IP_HOUR = 5, PER_EMAIL_DAY = 3;

function allowedOrigins(): string[] {
  const o = ['https://www.scorx.com.au', 'https://scorx.com.au'];
  if (env('ALLOW_LOCALHOST') === 'true') o.push('http://localhost:8000');
  return o;
}

function corsHeaders(origin: string | null): Record<string, string> {
  const h: Record<string, string> = { 'Vary': 'Origin' };
  if (origin && allowedOrigins().includes(origin)) {
    h['Access-Control-Allow-Origin'] = origin;
    h['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    h['Access-Control-Allow-Headers'] = 'content-type';
    h['Access-Control-Max-Age'] = '86400';
  }
  return h;
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } });
}

async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(env('HASH_SALT') + s));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = env('TURNSTILE_SECRET');
  if (!secret) return true; // not configured: skip (dev/staging)
  if (!token) return false;
  const form = new FormData();
  form.append('secret', secret); form.append('response', token); if (ip) form.append('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    return !!(await r.json()).success;
  } catch { return false; }
}

async function upsertSubscriber(email: string, nurture: boolean, sideline: boolean, source: string, sport: string) {
  const now = new Date().toISOString();
  const { data: existing, error: readErr } = await supabase.from('web_subscribers').select('*').eq('email', email).maybeSingle();
  if (readErr) throw readErr;
  if (!existing) {
    const { error } = await supabase.from('web_subscribers').insert({
      email, source, sport,
      nurture_consent: nurture, nurture_consent_at: nurture ? now : null,
      sideline_consent: sideline, sideline_consent_at: sideline ? now : null,
    });
    if (error) throw error;
    return;
  }
  // Consent timestamps only on false -> true. Never unset consent here (unsubscribe has its own path).
  const patch: Record<string, unknown> = {};
  if (nurture && !existing.nurture_consent) { patch.nurture_consent = true; patch.nurture_consent_at = now; }
  if (sideline && !existing.sideline_consent) { patch.sideline_consent = true; patch.sideline_consent_at = now; }
  if (Object.keys(patch).length) {
    const { error } = await supabase.from('web_subscribers').update(patch).eq('email', email);
    if (error) throw error;
  }
}

// Stage 3: email the card. Behind RESEND_ENABLED so Stage 2C ships without it.
async function sendCard(email: string, imageBase64: string): Promise<boolean> {
  const unsub = env('UNSUBSCRIBE_URL');
  const headers: Record<string, string> = {};
  if (unsub) { headers['List-Unsubscribe'] = `<${unsub}>`; headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click'; }
  const html = `<div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:480px;margin:0 auto;color:#0F2A44">
    <h2>Your full-time card is ready</h2>
    <p><img src="cid:card" alt="Your full-time card" style="width:100%;max-width:360px;border-radius:12px"></p>
    <p>The full-size copy is attached. Save it and share it with the family.</p>
    <p>Want one of these after every game, without the typing? ScorX builds them from the sideline.</p>
    <p><a href="https://apps.apple.com/au/app/scorx/id6753859833?ct=email-delivery&mt=8">Get ScorX on the App Store</a></p>
    <p style="font-size:12px;color:#51677A">You asked for this card at scorx.com.au/card. ScorX, Twine App Dev.</p></div>`;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env('RESEND_FROM'), to: [email], subject: 'Your full-time card is ready', html, headers,
        attachments: [
          { filename: 'full-time-card.jpg', content: imageBase64 },
          { filename: 'card.jpg', content: imageBase64, content_id: 'card' },
        ],
      }),
    });
    return r.ok;
  } catch { return false; }
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('origin');
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin) });
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405, origin);
  if (!origin || !allowedOrigins().includes(origin)) return json({ ok: false, error: 'origin' }, 403, origin);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ ok: false, error: 'bad_json' }, 400, origin); }

  const email = String(body.email ?? '').trim().toLowerCase();
  const nurture = body.nurture === true, sideline = body.sideline === true;
  const sport = String(body.sport ?? '').slice(0, 32);
  const source = String(body.source ?? '/card').slice(0, 64);
  const token = String(body.turnstileToken ?? '');
  const imageBase64 = typeof body.imageBase64 === 'string' ? body.imageBase64 : '';

  if (!EMAIL_RE.test(email) || email.length > 254) return json({ ok: false, error: 'email' }, 400, origin);
  if (imageBase64.length > MAX_IMAGE_B64) return json({ ok: false, error: 'image_too_large' }, 413, origin);

  const ip = (req.headers.get('cf-connecting-ip') ?? req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim();
  if (!(await verifyTurnstile(token, ip))) return json({ ok: false, error: 'turnstile' }, 403, origin);

  try {
    const ipHash = await sha256(ip || 'unknown'), emailHash = await sha256(email);
    const hourAgo = new Date(Date.now() - 3600_000).toISOString(), dayAgo = new Date(Date.now() - 86400_000).toISOString();
    const [byIp, byEmail] = await Promise.all([
      supabase.from('card_request_log').select('*', { count: 'exact', head: true }).eq('ip_hash', ipHash).gte('created_at', hourAgo),
      supabase.from('card_request_log').select('*', { count: 'exact', head: true }).eq('email_hash', emailHash).gte('created_at', dayAgo),
    ]);
    if ((byIp.count ?? 0) >= PER_IP_HOUR || (byEmail.count ?? 0) >= PER_EMAIL_DAY) return json({ ok: false, error: 'rate_limited' }, 429, origin);
    await supabase.from('card_request_log').insert({ ip_hash: ipHash, email_hash: emailHash });

    await upsertSubscriber(email, nurture, sideline, source, sport);

    if (env('RESEND_ENABLED') === 'true' && imageBase64) {
      if (await sendCard(email, imageBase64)) {
        await supabase.from('web_subscribers').update({ verified: true }).eq('email', email);
      }
    }
    return json({ ok: true }, 200, origin);
  } catch (e) {
    console.error('card-request failed', e instanceof Error ? e.message : 'unknown'); // never log email/image
    return json({ ok: false, error: 'server' }, 500, origin);
  }
});
