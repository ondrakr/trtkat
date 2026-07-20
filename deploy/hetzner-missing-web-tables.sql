-- Idempotent web tables missing on Hetzner after app import.
-- Safe to re-run.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.cookie_consents (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  analytics boolean not null default false,
  marketing boolean not null default false,
  necessary boolean not null default true,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cookie_consents_visitor_id_idx on public.cookie_consents (visitor_id);
create index if not exists cookie_consents_created_at_idx on public.cookie_consents (created_at desc);

drop trigger if exists cookie_consents_updated_at on public.cookie_consents;
create trigger cookie_consents_updated_at
  before update on public.cookie_consents
  for each row execute function public.set_updated_at();

alter table public.cookie_consents enable row level security;

drop policy if exists "Public insert cookie consent" on public.cookie_consents;
create policy "Public insert cookie consent"
  on public.cookie_consents for insert
  with check (true);

drop policy if exists "Public update own consent by visitor_id" on public.cookie_consents;
create policy "Public update own consent by visitor_id"
  on public.cookie_consents for update
  using (true)
  with check (true);

drop policy if exists "Admins read cookie consents" on public.cookie_consents;
create policy "Admins read cookie consents"
  on public.cookie_consents for select
  using (
    exists (
      select 1 from public.web_admin_users w where w.user_id = auth.uid()
    )
    or coalesce((select is_moderator from public.profiles p where p.id = auth.uid()), false)
  );

create table if not exists public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  note text,
  source text not null default 'web_form',
  status text not null default 'pending' check (status in ('pending', 'verified', 'completed', 'rejected')),
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists account_deletion_requests_email_idx on public.account_deletion_requests (email);
create index if not exists account_deletion_requests_status_idx on public.account_deletion_requests (status);
create index if not exists account_deletion_requests_created_at_idx on public.account_deletion_requests (created_at desc);

alter table public.account_deletion_requests enable row level security;

drop policy if exists "Admins read account deletion requests" on public.account_deletion_requests;
create policy "Admins read account deletion requests"
  on public.account_deletion_requests for select
  using (
    exists (
      select 1 from public.web_admin_users w where w.user_id = auth.uid()
    )
    or coalesce((select is_moderator from public.profiles p where p.id = auth.uid()), false)
  );

-- Public early-access insert (anon) if missing
drop policy if exists "Public early access signup" on public.early_access_signups;
create policy "Public early access signup"
  on public.early_access_signups for insert
  to anon, authenticated
  with check (
    char_length(trim(email)) > 3
    and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    and coalesce(source, '') <> ''
  );

grant usage on schema public to anon, authenticated;
grant insert on public.cookie_consents to anon, authenticated;
grant update on public.cookie_consents to anon, authenticated;
grant insert on public.early_access_signups to anon, authenticated;
