export async function bootstrapAdminAccount(): Promise<
  { ok: true; alreadySetup?: boolean } | { ok: false; error: string }
> {
  try {
    const response = await fetch('/api/bootstrap-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const body = (await response.json().catch(() => ({}))) as {
      error?: string;
      message?: string;
      hint?: string;
      already_setup?: boolean;
    };

    if (response.status === 503 && body.error === 'supabase_not_configured') {
      return {
        ok: false,
        error:
          'Server nemá správný SUPABASE_SERVICE_ROLE_KEY. V Supabase → API zkopíruj legacy klíč service_role (eyJ…), ne publishable.',
      };
    }

    if (response.status === 502 && body.error === 'database_error') {
      return {
        ok: false,
        error: body.message ?? body.hint ?? 'Chyba databáze na serveru.',
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        error: body.message ?? body.error ?? 'Nepodařilo se vytvořit admin účet.',
      };
    }

    return { ok: true, alreadySetup: body.already_setup };
  } catch {
    return { ok: false, error: 'Chyba sítě při vytváření admin účtu.' };
  }
}
