-- Blog + is_admin bridge for Hetzner (app profiles has no role column).
-- Idempotent — safe to re-run.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Alias: web blog RLS historically used is_admin(); app DB uses is_web_admin().
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_web_admin();
$$;

grant execute on function public.is_admin() to anon, authenticated, service_role;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  date_published date not null,
  date_modified date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_post_translations (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  locale text not null check (locale in ('cs', 'en')),
  title text not null,
  excerpt text not null,
  meta_description text not null,
  sections jsonb not null default '[]'::jsonb,
  unique (post_id, locale)
);

create index if not exists blog_posts_status_idx on public.blog_posts (status);
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_post_translations_post_id_idx on public.blog_post_translations (post_id);

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;
alter table public.blog_post_translations enable row level security;

drop policy if exists "Public read published posts" on public.blog_posts;
create policy "Public read published posts"
  on public.blog_posts for select
  using (status = 'published');

drop policy if exists "Admin manage posts" on public.blog_posts;
create policy "Admin manage posts"
  on public.blog_posts for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public read translations for published" on public.blog_post_translations;
create policy "Public read translations for published"
  on public.blog_post_translations for select
  using (
    exists (
      select 1 from public.blog_posts p
      where p.id = post_id and p.status = 'published'
    )
  );

drop policy if exists "Admin manage translations" on public.blog_post_translations;
create policy "Admin manage translations"
  on public.blog_post_translations for all
  using (public.is_admin())
  with check (public.is_admin());

grant select on public.blog_posts to anon, authenticated;
grant select, insert, update, delete on public.blog_posts to authenticated, service_role;
grant select on public.blog_post_translations to anon, authenticated;
grant select, insert, update, delete on public.blog_post_translations to authenticated, service_role;

-- Ensure early-access / cookies / deletions readable by web admins via is_admin too
drop policy if exists "Web admins read early access signups" on public.early_access_signups;
create policy "Web admins read early access signups"
  on public.early_access_signups for select
  using (public.is_web_admin());

drop policy if exists "Admins read cookie consents" on public.cookie_consents;
create policy "Admins read cookie consents"
  on public.cookie_consents for select
  using (public.is_web_admin());

drop policy if exists "Admins read account deletion requests" on public.account_deletion_requests;
create policy "Admins read account deletion requests"
  on public.account_deletion_requests for select
  using (public.is_web_admin());

notify pgrst, 'reload schema';
