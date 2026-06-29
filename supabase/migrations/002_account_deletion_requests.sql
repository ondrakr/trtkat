-- Account deletion requests for web form (Apple/Google compliance)
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
  using (public.is_admin());
