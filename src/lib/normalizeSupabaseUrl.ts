/**
 * Normalizuje Supabase project URL.
 * Vercel env někdy obsahuje omylem /rest/v1 — supabase-js pak volá /rest/v1/rest/v1/… (PGRST125).
 */
export function normalizeSupabaseUrl(url?: string) {
  if (!url) return url;
  return url.replace(/\/$/, '').replace(/\/rest\/v1\/?$/i, '');
}
