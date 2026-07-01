import { getSupabase, isSupabaseConfigured } from './supabase';

export type WaitlistError = 'invalid_email' | 'submit_failed' | 'network';

export async function submitWaitlist(
  email: string,
  options: { locale?: 'cs' | 'en'; page?: string } = {},
): Promise<{ ok: true } | { ok: false; error: WaitlistError }> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false, error: 'invalid_email' };
  }

  const payload = {
    email: normalized,
    page: options.page ?? '/ziskat-aplikaci',
    source: 'early_access',
    locale: options.locale ?? null,
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('early_access_signups').insert(payload);

      if (!error) {
        return { ok: true };
      }

      if (error.code === '23505') {
        return { ok: true };
      }

      // RLS policy chybí — zkusíme serverové API
      if (error.code !== '42501') {
        console.warn('[waitlist] direct insert failed', error.message);
      }
    } catch {
      // fallback na API
    }
  }

  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.status === 400) {
      return { ok: false, error: 'invalid_email' };
    }

    if (!response.ok) {
      return { ok: false, error: 'submit_failed' };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: 'network' };
  }
}
