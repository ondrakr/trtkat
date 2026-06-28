-- Complete Supabase setup for Trtkat
-- 1. Run this entire file in Supabase SQL Editor
-- 2. Create admin user in Authentication → Users → Add user
-- 3. Run: update public.profiles set role = 'admin' where id = 'YOUR_USER_UUID';

\i migrations/001_initial_schema.sql
