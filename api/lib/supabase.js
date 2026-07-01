import { createClient } from '@supabase/supabase-js';

export function getServiceClient() {
  const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL)?.replace(/\/$/, '');
  /** Admin API vyžaduje legacy service_role JWT (eyJ…), ne publishable key. */
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  if (key.startsWith('sb_publishable_')) {
    console.error('[supabase] SUPABASE_SERVICE_ROLE_KEY must be service_role JWT (eyJ…), not publishable');
    return null;
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
