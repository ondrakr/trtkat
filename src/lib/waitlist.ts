export type WaitlistError = 'invalid_email' | 'submit_failed' | 'network';

export async function submitWaitlist(
  email: string,
  options: { locale?: 'cs' | 'en'; page?: string } = {},
): Promise<{ ok: true } | { ok: false; error: WaitlistError }> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false, error: 'invalid_email' };
  }

  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: normalized,
        page: options.page ?? '/ziskat-aplikaci',
        source: 'early_access',
        locale: options.locale,
      }),
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
