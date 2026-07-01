/**
 * Vytvoří web admin účet v Supabase Auth + web_admin_users.
 * Usage: node scripts/create-web-admin.mjs [username] [password]
 * Default: trtkat / 123456 → trtkat@trtkat.cz
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const username = process.argv[2] ?? 'trtkat';
const password = process.argv[3] ?? '123456';
const email = username.includes('@') ? username : `${username}@trtkat.cz`;

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Chybí SUPABASE_URL nebo SUPABASE_SERVICE_ROLE_KEY v .env');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data: existingUsers } = await supabase.auth.admin.listUsers();
const existing = existingUsers?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());

let userId = existing?.id;

if (existing) {
  console.log(`Uživatel ${email} už existuje, aktualizuji heslo…`);
  const { error } = await supabase.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
  });
  if (error) {
    console.error('Nepodařilo se aktualizovat heslo:', error.message);
    process.exit(1);
  }
} else {
  console.log(`Vytvářím uživatele ${email}…`);
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error('Nepodařilo se vytvořit uživatele:', error.message);
    process.exit(1);
  }
  userId = data.user.id;
}

const { error: adminError } = await supabase.from('web_admin_users').upsert(
  { user_id: userId },
  { onConflict: 'user_id' },
);

if (adminError) {
  console.error('Nepodařilo se přidat do web_admin_users:', adminError.message);
  console.error('Spusť nejdřív migraci: supabase/migrations/003_early_access_signups.sql');
  process.exit(1);
}

console.log('');
console.log('Hotovo. Přihlášení do adminu:');
console.log(`  URL:      https://trtkat.cz/admin/login`);
console.log(`  Jméno:    ${username.includes('@') ? email.split('@')[0] : username}`);
console.log(`  E-mail:   ${email}`);
console.log(`  Heslo:    ${password}`);
console.log('');
