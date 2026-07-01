-- Předběžný přístup (e-maily z webu /ziskat-aplikaci)
-- Spusť na APP Supabase (sdílený projekt s mobilní aplikací).
-- Nemění tabulky profiles, photos, swipes, messages atd.

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Early access signups
-- ---------------------------------------------------------------------------
create table if not exists public.early_access_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'website',
  page text,
  locale text check (locale is null or locale in ('cs', 'en')),
  user_agent text,
  status text not null default 'pending'
    check (status in ('pending', 'invited', 'registered', 'unsubscribed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists early_access_signups_email_unique
  on public.early_access_signups (lower(trim(email)));

create index if not exists early_access_signups_created_at_idx
  on public.early_access_signups (created_at desc);

create index if not exists early_access_signups_status_idx
  on public.early_access_signups (status);

drop trigger if exists early_access_signups_updated_at on public.early_access_signups;
create trigger early_access_signups_updated_at
  before update on public.early_access_signups
  for each row execute function public.set_updated_at();

alter table public.early_access_signups enable row level security;

-- ---------------------------------------------------------------------------
-- Web admin (pro /admin panel na trtkat.cz — nezávislé na app profiles)
-- ---------------------------------------------------------------------------
create table if not exists public.web_admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_web_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.web_admin_users where user_id = auth.uid()
  );
$$;

drop policy if exists "Web admins read early access signups" on public.early_access_signups;
create policy "Web admins read early access signups"
  on public.early_access_signups for select
  using (public.is_web_admin());

-- Zápisy jen přes service role (API /api/waitlist) — žádná veřejná insert policy.

-- Po registraci admin účtu v Auth spusť:
-- insert into public.web_admin_users (user_id) values ('TVE-USER-UUID');
