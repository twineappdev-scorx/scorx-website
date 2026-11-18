-- Web demo card: subscribers and rate-limit log. Written only by the card-request edge function (service role).

create extension if not exists citext;

create table if not exists public.web_subscribers (
  id uuid primary key default gen_random_uuid(),
  email citext unique not null,
  nurture_consent boolean not null default false,
  nurture_consent_at timestamptz,
  sideline_consent boolean not null default false,
  sideline_consent_at timestamptz,
  source text,
  sport text,
  verified boolean not null default false,   -- true once a card was actually delivered by email (Stage 3)
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists web_subscribers_updated_at on public.web_subscribers;
create trigger web_subscribers_updated_at before update on public.web_subscribers
  for each row execute function public.set_updated_at();

-- Rate limiting: SHA-256 hashes only, never raw IPs or emails.
create table if not exists public.card_request_log (
  ip_hash text not null,
  email_hash text not null,
  created_at timestamptz not null default now()
);
create index if not exists card_request_log_ip_idx on public.card_request_log (ip_hash, created_at desc);
create index if not exists card_request_log_email_idx on public.card_request_log (email_hash, created_at desc);

-- RLS on with no anon/authenticated policies: only the service role (edge function) can read or write.
alter table public.web_subscribers enable row level security;
alter table public.card_request_log enable row level security;
