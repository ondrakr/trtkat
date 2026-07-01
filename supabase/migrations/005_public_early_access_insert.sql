-- Umožní zápis e-mailu z prohlížeče (anon klíč) — waitlist bez service role na serveru.
-- Spusť v Supabase SQL Editoru po migraci 003.

drop policy if exists "Public early access signup" on public.early_access_signups;
create policy "Public early access signup"
  on public.early_access_signups for insert
  to anon, authenticated
  with check (
    char_length(trim(email)) > 3
    and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    and coalesce(source, '') <> ''
  );
