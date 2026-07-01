import { getServiceClient } from './lib/supabase.js';

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

  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(503).json({ error: 'supabase_not_configured' });
  }

  const { count, error: countError } = await supabase
    .from('web_admin_users')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('[bootstrap-admin] count failed', countError);
    return res.status(502).json({
      error: 'database_error',
      hint: 'Spusť migraci supabase/migrations/003_early_access_signups.sql',
    });
  }

  if ((count ?? 0) > 0) {
    return res.status(200).json({ ok: true, already_setup: true });
  }

  const { data: listed } = await supabase.auth.admin.listUsers();
  const existing = listed?.users?.find((u) => u.email?.toLowerCase() === DEFAULT_EMAIL);

  let userId = existing?.id;

  if (existing) {
    const { error } = await supabase.auth.admin.updateUserById(existing.id, {
      password: DEFAULT_PASSWORD,
      email_confirm: true,
    });
    if (error) {
      console.error('[bootstrap-admin] update user failed', error);
      return res.status(502).json({ error: 'auth_update_failed' });
    }
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
      email_confirm: true,
    });
    if (error) {
      console.error('[bootstrap-admin] create user failed', error);
      return res.status(502).json({ error: 'auth_create_failed', message: error.message });
    }
    userId = data.user.id;
  }

  const { error: adminError } = await supabase.from('web_admin_users').insert({ user_id: userId });

  if (adminError) {
    console.error('[bootstrap-admin] web_admin_users insert failed', adminError);
    return res.status(502).json({ error: 'admin_insert_failed' });
  }

  return res.status(200).json({
    ok: true,
    login: 'https://trtkat.cz/admin/login',
    username: 'trtkat',
    email: DEFAULT_EMAIL,
  });
}
