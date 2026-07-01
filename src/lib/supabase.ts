import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const url = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
/** Legacy anon JWT (eyJ…) je spolehlivější než sb_publishable_ pro Auth + REST. */
const publicKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && publicKey);

let client: SupabaseClient<Database> | null = null;

export function getSupabase() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured');
  }
  if (!client) {
    client = createClient<Database>(url!, publicKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}
