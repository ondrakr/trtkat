import {
  authAdminCreateUser,
  authAdminListUsers,
  authAdminUpdateUser,
  getSupabaseConfig,
  restCount,
  restInsert,
} from './lib/supabase.js';

const DEFAULT_EMAIL = 'trtkat@trtkat.cz';
const DEFAULT_PASSWORD = '123456';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  if (!getSupabaseConfig()) {
    return res.status(503).json({
      error: 'supabase_not_configured',
      hint: 'Nastav SUPABASE_SERVICE_ROLE_KEY na legacy service_role JWT (eyJ…) ve Vercel.',
    });
  }

  const { count, error: countError } = await restCount('web_admin_users');

  if (countError) {
    console.error('[bootstrap-admin] count failed', countError);
    const missingTable =
      countError.code === '42P01' ||
      /relation .* does not exist/i.test(countError.message ?? '');
    return res.status(502).json({
      error: 'database_error',
      hint: missingTable
        ? 'Spusť migraci supabase/migrations/003_early_access_signups.sql'
        : 'Zkontroluj SUPABASE_SERVICE_ROLE_KEY (legacy JWT eyJ…) ve Vercel.',
      message: countError.message,
    });
  }

  if ((count ?? 0) > 0) {
    return res.status(200).json({ ok: true, already_setup: true });
  }

  const { users, error: listError } = await authAdminListUsers();
  if (listError) {
    console.error('[bootstrap-admin] list users failed', listError);
    return res.status(502).json({
      error: 'auth_list_failed',
      message: listError.message,
    });
  }

  const existing = users.find((u) => u.email?.toLowerCase() === DEFAULT_EMAIL);
  let userId = existing?.id;

  if (existing) {
    const { error } = await authAdminUpdateUser(existing.id, {
      password: DEFAULT_PASSWORD,
      email_confirm: true,
    });
    if (error) {
      console.error('[bootstrap-admin] update user failed', error);
      return res.status(502).json({ error: 'auth_update_failed', message: error.message });
    }
  } else {
    const { user, error } = await authAdminCreateUser(DEFAULT_EMAIL, DEFAULT_PASSWORD);
    if (error) {
      console.error('[bootstrap-admin] create user failed', error);
      return res.status(502).json({ error: 'auth_create_failed', message: error.message });
    }
    userId = user?.id ?? user?.user?.id;
    if (!userId) {
      return res.status(502).json({ error: 'auth_create_failed', message: 'Missing user id in response' });
    }
  }

  const { error: adminError } = await restInsert('web_admin_users', { user_id: userId });

  if (adminError) {
    console.error('[bootstrap-admin] web_admin_users insert failed', adminError);
    return res.status(502).json({ error: 'admin_insert_failed', message: adminError.message });
  }

  return res.status(200).json({
    ok: true,
    login: 'https://trtkat.cz/admin/login',
    username: 'trtkat',
    email: DEFAULT_EMAIL,
  });
}
