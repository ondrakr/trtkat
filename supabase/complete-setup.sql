-- Trtkat: blog, waitlist, cookie consents, admin profiles
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)
--
-- POZOR: Pro sdílenou APP databázi (mobilní app + web) NEspouštěj tento soubor.
-- Místo toho spusť: supabase/migrations/003_early_access_signups.sql

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
-- Account deletion requests (web form + API)
-- ---------------------------------------------------------------------------
create table public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  note text,
  source text not null default 'web_form',
  status text not null default 'pending' check (status in ('pending', 'verified', 'completed', 'rejected')),
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index account_deletion_requests_email_idx on public.account_deletion_requests (email);
create index account_deletion_requests_status_idx on public.account_deletion_requests (status);
create index account_deletion_requests_created_at_idx on public.account_deletion_requests (created_at desc);

alter table public.account_deletion_requests enable row level security;

create policy "Admins read account deletion requests"
  on public.account_deletion_requests for select
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
-- Auto-generated from src/blog/posts.ts — run after 001_initial_schema.sql

insert into public.blog_posts (slug, status, date_published)
values ('nezavazne-seznamovani-pro-studenty', 'published', '2026-06-01')
on conflict (slug) do update set date_published = excluded.date_published;

insert into public.blog_post_translations (post_id, locale, title, excerpt, meta_description, sections)
select p.id, 'cs', 'Nezávazné seznamování pro studenty: co to znamená v praxi', 'Jak funguje nezávazné seznámení, pro koho dává smysl a jak si nastavit jasná očekávání.', 'Průvodce nezávazným seznamováním pro studenty. Jasná očekávání, respekt a bezpečné seznámení bez zbytečného chatu.', '[{"paragraphs":["Nezávazné seznamování neznamená nezájem o druhého člověka. Znamená to, že obě strany hledají především nové kontakty, přátelství nebo společný večer — bez tlaku na vztah.","Pro studenty je typické, že chtějí poznávat lidi v novém prostředí, ale nemají vždy čas na dlouhé psaní a nejistotu z klasických seznamek."]},{"heading":"Jak na to bezpečně","paragraphs":["Základem je jasná domluva, respekt k hranicím a otevřená komunikace. Trtkat na to staví celou aplikaci — méně zbytečného chatu, víc jasna.","Pokud si nejsi jistý/á, ptej se. Souhlas a slušnost nejsou volitelné."]}]'::jsonb
from public.blog_posts p where p.slug = 'nezavazne-seznamovani-pro-studenty'
on conflict (post_id, locale) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  meta_description = excluded.meta_description,
  sections = excluded.sections;

insert into public.blog_post_translations (post_id, locale, title, excerpt, meta_description, sections)
select p.id, 'en', 'Casual dating for students: what it means in practice', 'How casual meetups work, who they suit, and how to set clear expectations.', 'A guide to casual dating for students. Clear expectations, respect, and safe meetups without endless chat.', '[{"paragraphs":["Casual dating does not mean you do not care about the other person. It means both sides are mainly looking for new contacts, friendship, or a good evening — without relationship pressure.","Students often want to meet people in a new environment but do not always have time for long chats and the uncertainty of classic dating apps."]},{"heading":"How to do it safely","paragraphs":["Clear plans, respect for boundaries, and open communication are the foundation. Trtkat is built around that — less pointless chat, more clarity.","If you are unsure, ask. Consent and decency are not optional."]}]'::jsonb
from public.blog_posts p where p.slug = 'nezavazne-seznamovani-pro-studenty'
on conflict (post_id, locale) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  meta_description = excluded.meta_description,
  sections = excluded.sections;

insert into public.blog_posts (slug, status, date_published)
values ('sexualni-vychova-co-studenti-potrebuji-vedet', 'published', '2026-06-10')
on conflict (slug) do update set date_published = excluded.date_published;

insert into public.blog_post_translations (post_id, locale, title, excerpt, meta_description, sections)
select p.id, 'cs', 'Sexuální výchova: co studenti potřebují vědět navíc', 'Základy sexualní výchovy, které v běžném životě často chybí — stručně a srozumitelně.', 'Sexuální výchova pro studenty: souhlas, hranice, komunikace a osvěta o bezpečném seznamování. Edukativní článek od Trtkat.', '[{"paragraphs":["Sexuální výchova není jen biologie ve škole. Je to schopnost komunikovat, respektovat hranice a chápat, co je pro tebe v pořádku.","Trtkat doplňuje tuto osvětu praktickým přístupem k seznamování — bez zbytečného stigmatu a bez zbytečných slov navíc."]},{"heading":"Tři principy, které stojí za zapamatování","paragraphs":["Souhlas musí být jasný a dobrovolný. Hranice si můžeš kdykoli změnit. A respekt není „nice to have“, ale minimum.","Čím dřív se naučíš mluvit o očekáváních, tím méně zklamání a nejistoty."]}]'::jsonb
from public.blog_posts p where p.slug = 'sexualni-vychova-co-studenti-potrebuji-vedet'
on conflict (post_id, locale) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  meta_description = excluded.meta_description,
  sections = excluded.sections;

insert into public.blog_post_translations (post_id, locale, title, excerpt, meta_description, sections)
select p.id, 'en', 'Sexual education: what students need to know beyond school', 'Basics of sexual education that are often missing in everyday life — briefly and clearly.', 'Sexual education for students: consent, boundaries, communication, and awareness about safe dating. An educational article from Trtkat.', '[{"paragraphs":["Sexual education is not just school biology. It is the ability to communicate, respect boundaries, and understand what is okay for you.","Trtkat complements this awareness with a practical approach to dating — without unnecessary stigma."]},{"heading":"Three principles worth remembering","paragraphs":["Consent must be clear and voluntary. Boundaries can change at any time. And respect is not optional — it is the minimum.","The earlier you learn to talk about expectations, the less disappointment and uncertainty you get."]}]'::jsonb
from public.blog_posts p where p.slug = 'sexualni-vychova-co-studenti-potrebuji-vedet'
on conflict (post_id, locale) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  meta_description = excluded.meta_description,
  sections = excluded.sections;

insert into public.blog_posts (slug, status, date_published)
values ('souhlas-a-hranice-zaklad-bezpecneho-seznamovani', 'published', '2026-06-20')
on conflict (slug) do update set date_published = excluded.date_published;

insert into public.blog_post_translations (post_id, locale, title, excerpt, meta_description, sections)
select p.id, 'cs', 'Souhlas a hranice: základ bezpečného seznamování', 'Proč je souhlas klíčový a jak si ho udržet i v nezávazném seznamování.', 'Souhlas a hranice v nezávazném seznamování. Praktický edukační článek pro studenty od aplikace Trtkat.', '[{"paragraphs":["Bezpečné seznamování stojí na jednoduchém principu: obě strany vědí, co od setkání chtějí, a respektují limity druhého.","Nezávaznost neznamená nejasnost. Právě naopak — čím jasnější domluva, tím příjemnější zkušenost."]},{"heading":"Praktické tipy","paragraphs":["Mluv očekávání nahlas, ne v insinuacích. Nech si čas, pokud něco nesedí. A nikdy nepokračuj tam, kde nemáš jistotu.","Trtkat pomáhá studentům seznamovat se s respektem — zdarma a bez zbytečného chatu."]}]'::jsonb
from public.blog_posts p where p.slug = 'souhlas-a-hranice-zaklad-bezpecneho-seznamovani'
on conflict (post_id, locale) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  meta_description = excluded.meta_description,
  sections = excluded.sections;

insert into public.blog_post_translations (post_id, locale, title, excerpt, meta_description, sections)
select p.id, 'en', 'Consent and boundaries: the foundation of safe dating', 'Why consent matters and how to maintain it in casual dating too.', 'Consent and boundaries in casual dating. A practical educational article for students from Trtkat.', '[{"paragraphs":["Safe dating is built on a simple principle: both sides know what they want from a meetup and respect each other’s limits.","Casual does not mean unclear. The clearer the plan, the better the experience."]},{"heading":"Practical tips","paragraphs":["Say expectations out loud, not in hints. Take your time if something feels off. And never continue when you are unsure.","Trtkat helps students date with respect — for free and without pointless chat."]}]'::jsonb
from public.blog_posts p where p.slug = 'souhlas-a-hranice-zaklad-bezpecneho-seznamovani'
on conflict (post_id, locale) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  meta_description = excluded.meta_description,
  sections = excluded.sections;


-- After running: create admin user in Supabase Auth, then:
-- update public.profiles set role = 'admin' where id = 'YOUR_USER_UUID';
