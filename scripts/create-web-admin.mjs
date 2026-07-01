/**
 * Vytvoří web admin účet v Supabase Auth + web_admin_users.
 * Usage: node scripts/create-web-admin.mjs [username] [password]
 * Default: trtkat / 123456 → trtkat@trtkat.cz
 */
import { config } from 'dotenv';
import {
  authAdminCreateUser,
  authAdminListUsers,
  authAdminUpdateUser,
  getSupabaseConfig,
  restInsert,
} from '../api/lib/supabase.js';

config();

const username = process.argv[2] ?? 'trtkat';
const password = process.argv[3] ?? '123456';
const email = username.includes('@') ? username : `${username}@trtkat.cz`;

if (!getSupabaseConfig()) {
  console.error('Chybí SUPABASE_URL nebo SUPABASE_SERVICE_ROLE_KEY v .env');
  process.exit(1);
}

const { users, error: listError } = await authAdminListUsers();
if (listError) {
  console.error('Nepodařilo se načíst uživatele:', listError.message);
  process.exit(1);
}

const existing = users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
let userId = existing?.id;

if (existing) {
  console.log(`Uživatel ${email} už existuje, aktualizuji heslo…`);
  const { error } = await authAdminUpdateUser(existing.id, {
    password,
    email_confirm: true,
  });
  if (error) {
    console.error('Nepodařilo se aktualizovat heslo:', error.message);
    process.exit(1);
  }
} else {
  console.log(`Vytvářím uživatele ${email}…`);
  const { user, error } = await authAdminCreateUser(email, password);
  if (error) {
    console.error('Nepodařilo se vytvořit uživatele:', error.message);
    process.exit(1);
  }
  userId = user?.id ?? user?.user?.id;
  if (!userId) {
    console.error('Chybí user id v odpovědi Auth API');
    process.exit(1);
  }
}

const { error: adminError } = await restInsert('web_admin_users', { user_id: userId });

if (adminError) {
  if (adminError.code === '23505') {
    console.log('Uživatel už je v web_admin_users.');
  } else {
    console.error('Nepodařilo se přidat do web_admin_users:', adminError.message);
    console.error('Spusť nejdřív migraci: supabase/migrations/003_early_access_signups.sql');
    process.exit(1);
  }
}

console.log('');
console.log('Hotovo. Přihlášení do adminu:');
console.log(`  URL:      https://trtkat.cz/admin/login`);
console.log(`  Jméno:    ${username.includes('@') ? email.split('@')[0] : username}`);
console.log(`  E-mail:   ${email}`);
console.log(`  Heslo:    ${password}`);
console.log('');
