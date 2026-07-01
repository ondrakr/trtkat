-- Umožní prvnímu uživateli vytvořit web admin z /admin/login (bez service role).
-- Spusť v Supabase SQL Editoru po migraci 003.

drop policy if exists "Public read admin presence" on public.web_admin_users;
create policy "Public read admin presence"
  on public.web_admin_users for select
  to anon, authenticated
  using (true);

drop policy if exists "First admin self-register" on public.web_admin_users;
create policy "First admin self-register"
  on public.web_admin_users for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and (select count(*) from public.web_admin_users) = 0
  );
