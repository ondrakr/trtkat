export type AccountDeletionError = 'invalid_email' | 'confirm_required' | 'submit_failed' | 'network';

export async function submitAccountDeletion(payload: {
  email: string;
  note?: string;
}): Promise<{ ok: true } | { ok: false; error: AccountDeletionError }> {
  const normalized = payload.email.trim().toLowerCase();
  if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false, error: 'invalid_email' };
  }

  try {
    const response = await fetch('/api/account-deletion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: normalized,
        note: payload.note?.trim() || null,
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
