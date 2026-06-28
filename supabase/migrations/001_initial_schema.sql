-- Trtkat: blog, waitlist, cookie consents, admin profiles
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles / admin role
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role) values (new.id, 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins read all profiles"
  on public.profiles for select
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Blog
-- ---------------------------------------------------------------------------
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  date_published date not null,
  date_modified date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_post_translations (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  locale text not null check (locale in ('cs', 'en')),
  title text not null,
  excerpt text not null,
  meta_description text not null,
  sections jsonb not null default '[]'::jsonb,
  unique (post_id, locale)
);

create index blog_posts_status_idx on public.blog_posts (status);
create index blog_posts_slug_idx on public.blog_posts (slug);
create index blog_post_translations_post_id_idx on public.blog_post_translations (post_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;
alter table public.blog_post_translations enable row level security;

create policy "Public read published posts"
  on public.blog_posts for select
  using (status = 'published');

create policy "Admin manage posts"
  on public.blog_posts for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public read translations for published"
  on public.blog_post_translations for select
  using (
    exists (
      select 1 from public.blog_posts p
      where p.id = post_id and p.status = 'published'
    )
  );

create policy "Admin manage translations"
  on public.blog_post_translations for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Waitlist
-- ---------------------------------------------------------------------------
create table public.waitlist_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'waitlist',
  page text,
  created_at timestamptz not null default now()
);

create index waitlist_created_at_idx on public.waitlist_subscribers (created_at desc);

alter table public.waitlist_subscribers enable row level security;

create policy "Admins read waitlist"
  on public.waitlist_subscribers for select
  using (public.is_admin());

-- Inserts only via service role (API)

-- ---------------------------------------------------------------------------
-- Cookie consents
-- ---------------------------------------------------------------------------
create table public.cookie_consents (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  analytics boolean not null default false,
  marketing boolean not null default false,
  necessary boolean not null default true,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index cookie_consents_visitor_id_idx on public.cookie_consents (visitor_id);
create index cookie_consents_created_at_idx on public.cookie_consents (created_at desc);

create trigger cookie_consents_updated_at
  before update on public.cookie_consents
  for each row execute function public.set_updated_at();

alter table public.cookie_consents enable row level security;

create policy "Public insert cookie consent"
  on public.cookie_consents for insert
  with check (true);

create policy "Public update own consent by visitor_id"
  on public.cookie_consents for update
  using (true)
  with check (true);

create policy "Admins read cookie consents"
  on public.cookie_consents for select
  using (public.is_admin());
