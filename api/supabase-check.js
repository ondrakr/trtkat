import {
  authAdminListUsers,
  getSupabaseConfig,
  restCount,
} from './lib/supabase.js';
import { normalizeSupabaseUrl } from './lib/normalizeSupabaseUrl.js';

function keyKind(key) {
  if (!key) return 'missing';
  if (key.startsWith('eyJ')) return 'legacy_jwt';
  if (key.startsWith('sb_secret_')) return 'sb_secret';
  if (key.startsWith('sb_publishable_')) return 'sb_publishable';
  return 'unknown';
}

async function probe(name, fn) {
  try {
    const result = await fn();
    if (result.error) {
      return { ok: false, name, message: result.error.message, code: result.error.code ?? null };
    }
    return { ok: true, name, ...result };
  } catch (error) {
    return { ok: false, name, message: error instanceof Error ? error.message : String(error) };
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const config = getSupabaseConfig();
  const rawClientUrl = process.env.VITE_SUPABASE_URL ?? null;
  const clientUrl = normalizeSupabaseUrl(rawClientUrl) ?? null;
  const clientAnon = process.env.VITE_SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? null;

  const summary = {
    server: {
      configured: Boolean(config),
      url: config?.url ?? null,
      serviceKeyKind: keyKind(config?.key),
    },
    client: {
      url: clientUrl,
      rawUrl: rawClientUrl,
      urlHasRestV1Suffix: Boolean(rawClientUrl && /\/rest\/v1\/?$/i.test(rawClientUrl.replace(/\/$/, ''))),
      anonKeyKind: keyKind(clientAnon),
      hasLegacyAnon: Boolean(process.env.VITE_SUPABASE_ANON_KEY),
      hasPublishable: Boolean(process.env.VITE_SUPABASE_PUBLISHABLE_KEY),
    },
    checks: [],
  };

  if (!config) {
    summary.checks.push({
      ok: false,
      name: 'server_config',
      message: 'Chybí SUPABASE_URL nebo SUPABASE_SERVICE_ROLE_KEY ve Vercel.',
    });
    return res.status(503).json(summary);
  }

  const authHealth = await fetch(`${config.url}/auth/v1/health`, {
    headers: { apikey: config.key, Authorization: `Bearer ${config.key}` },
  }).then(async (response) => ({
    ok: response.ok,
    status: response.status,
    body: await response.text(),
  }));

  summary.checks.push({
    ok: authHealth.ok,
    name: 'auth_health',
    status: authHealth.status,
    body: authHealth.body.slice(0, 200),
  });

  summary.checks.push(
    await probe('web_admin_users_count', async () => {
      const { count, error } = await restCount('web_admin_users');
      return { error, count };
    }),
  );

  summary.checks.push(
    await probe('early_access_signups_count', async () => {
      const { count, error } = await restCount('early_access_signups');
      return { error, count };
    }),
  );

  summary.checks.push(
    await probe('auth_admin_list_users', async () => {
      const { users, error } = await authAdminListUsers();
      return { error, userCount: users.length };
    }),
  );

  if (clientUrl && clientAnon) {
    const clientCount = await fetch(`${clientUrl}/rest/v1/web_admin_users?select=*`, {
      headers: {
        apikey: clientAnon,
        Authorization: `Bearer ${clientAnon}`,
        Prefer: 'count=exact',
        Range: '0-0',
      },
    }).then(async (response) => {
      const text = await response.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }
      return {
        ok: response.ok,
        status: response.status,
        range: response.headers.get('content-range'),
        message: typeof data === 'object' && data?.message ? data.message : text.slice(0, 200),
        code: typeof data === 'object' && data?.code ? data.code : null,
      };
    });

    summary.checks.push({
      ok: clientCount.ok,
      name: 'client_anon_web_admin_users_count',
      status: clientCount.status,
      range: clientCount.range,
      code: clientCount.code,
      message: clientCount.message,
    });

    const clientAuth = await fetch(`${clientUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: clientAnon,
        Authorization: `Bearer ${clientAnon}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'trtkat@trtkat.cz', password: '123456' }),
    }).then(async (response) => {
      const text = await response.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }
      return {
        ok: response.ok,
        status: response.status,
        message:
          typeof data === 'object' && data
            ? data.error_description || data.msg || data.message || data.error || text.slice(0, 200)
            : text.slice(0, 200),
      };
    });

    summary.checks.push({
      ok: clientAuth.ok,
      name: 'client_anon_sign_in_trtkat',
      status: clientAuth.status,
      message: clientAuth.message,
      hint: clientAuth.ok
        ? 'Auth funguje — účet trtkat existuje.'
        : 'Auth selhalo — účet možná ještě neexistuje nebo je špatné heslo/klíč.',
    });
  } else {
    summary.checks.push({
      ok: false,
      name: 'client_env',
      message: 'Chybí VITE_SUPABASE_URL nebo VITE_SUPABASE_ANON_KEY ve Vercel.',
    });
  }

  const allOk = summary.checks.every((check) => check.ok);
  return res.status(allOk ? 200 : 502).json(summary);
}
