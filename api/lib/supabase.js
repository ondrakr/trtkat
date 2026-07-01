/**
 * Server-side Supabase helpers using raw fetch.
 * Avoids supabase-js URL/path issues with sb_secret_ keys and some JWT setups.
 */

import { normalizeSupabaseUrl } from './normalizeSupabaseUrl.js';

export function getSupabaseConfig() {
  const url = normalizeSupabaseUrl(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL);
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  if (key.startsWith('sb_publishable_')) {
    console.error('[supabase] SUPABASE_SERVICE_ROLE_KEY must not be a publishable key');
    return null;
  }
  return { url, key };
}

/** @deprecated Use rest/auth helpers below. Kept for any legacy imports. */
export function getServiceClient() {
  return getSupabaseConfig() ? { configured: true } : null;
}

function serviceHeaders(key, extra = {}) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    ...extra,
  };
}

async function parseResponse(res) {
  const text = await res.text();
  if (!text) return { ok: res.ok, status: res.status, data: null, text: '' };
  try {
    return { ok: res.ok, status: res.status, data: JSON.parse(text), text };
  } catch {
    return { ok: res.ok, status: res.status, data: null, text };
  }
}

function restError(parsed) {
  const { data, text, status } = parsed;
  const message =
    (typeof data === 'object' && data && (data.message || data.msg || data.error_description)) ||
    text ||
    `HTTP ${status}`;
  const code = typeof data === 'object' && data && data.code ? data.code : String(status);
  return { message, code, status };
}

export async function restCount(table) {
  const config = getSupabaseConfig();
  if (!config) return { error: { message: 'not_configured', code: 'not_configured' }, count: null };

  const { url, key } = config;
  const res = await fetch(`${url}/rest/v1/${table}?select=*`, {
    method: 'GET',
    headers: serviceHeaders(key, {
      Prefer: 'count=exact',
      Range: '0-0',
    }),
  });

  if (!res.ok) {
    const parsed = await parseResponse(res);
    return { error: restError(parsed), count: null };
  }

  const range = res.headers.get('content-range') ?? '';
  const total = range.includes('/') ? parseInt(range.split('/')[1], 10) : 0;
  return { error: null, count: Number.isFinite(total) ? total : 0 };
}

export async function restInsert(table, row) {
  const config = getSupabaseConfig();
  if (!config) return { error: { message: 'not_configured', code: 'not_configured' } };

  const { url, key } = config;
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: serviceHeaders(key, {
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    }),
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const parsed = await parseResponse(res);
    return { error: restError(parsed) };
  }

  return { error: null };
}

export async function restUpdate(table, row, column, value) {
  const config = getSupabaseConfig();
  if (!config) return { error: { message: 'not_configured', code: 'not_configured' } };

  const { url, key } = config;
  const res = await fetch(`${url}/rest/v1/${table}?${column}=eq.${encodeURIComponent(String(value))}`, {
    method: 'PATCH',
    headers: serviceHeaders(key, {
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    }),
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const parsed = await parseResponse(res);
    return { error: restError(parsed) };
  }

  return { error: null };
}

export async function restSelectOne(table, column, value, select = 'id') {
  const config = getSupabaseConfig();
  if (!config) return { error: { message: 'not_configured', code: 'not_configured' }, data: null };

  const { url, key } = config;
  const res = await fetch(
    `${url}/rest/v1/${table}?select=${encodeURIComponent(select)}&${column}=eq.${encodeURIComponent(String(value))}&limit=1`,
    {
      method: 'GET',
      headers: serviceHeaders(key),
    },
  );

  const parsed = await parseResponse(res);
  if (!parsed.ok) {
    return { error: restError(parsed), data: null };
  }

  const rows = Array.isArray(parsed.data) ? parsed.data : [];
  return { error: null, data: rows[0] ?? null };
}

export async function authAdminListUsers() {
  const config = getSupabaseConfig();
  if (!config) return { error: { message: 'not_configured', code: 'not_configured' }, users: [] };

  const { url, key } = config;
  const res = await fetch(`${url}/auth/v1/admin/users?page=1&per_page=1000`, {
    method: 'GET',
    headers: serviceHeaders(key),
  });

  const parsed = await parseResponse(res);
  if (!parsed.ok) {
    return { error: restError(parsed), users: [] };
  }

  const users = Array.isArray(parsed.data?.users) ? parsed.data.users : [];
  return { error: null, users };
}

export async function authAdminCreateUser(email, password) {
  const config = getSupabaseConfig();
  if (!config) return { error: { message: 'not_configured', code: 'not_configured' }, user: null };

  const { url, key } = config;
  const res = await fetch(`${url}/auth/v1/admin/users`, {
    method: 'POST',
    headers: serviceHeaders(key, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
    }),
  });

  const parsed = await parseResponse(res);
  if (!parsed.ok) {
    return { error: restError(parsed), user: null };
  }

  return { error: null, user: parsed.data ?? null };
}

export async function authAdminUpdateUser(userId, updates) {
  const config = getSupabaseConfig();
  if (!config) return { error: { message: 'not_configured', code: 'not_configured' } };

  const { url, key } = config;
  const res = await fetch(`${url}/auth/v1/admin/users/${encodeURIComponent(userId)}`, {
    method: 'PUT',
    headers: serviceHeaders(key, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(updates),
  });

  const parsed = await parseResponse(res);
  if (!parsed.ok) {
    return { error: restError(parsed) };
  }

  return { error: null };
}
