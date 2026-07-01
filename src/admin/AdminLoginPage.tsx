import { FormEvent, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

const DEFAULT_LOGIN = 'trtkat';
const DEFAULT_PASSWORD = '123456';

export function AdminLoginPage() {
  const { signIn, setupFirstAdmin, session, isAdmin, loading, configured, needsSetup } = useAdminAuth();
  const [login, setLogin] = useState(DEFAULT_LOGIN);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const autoSetupDone = useRef(false);

  useEffect(() => {
    if (loading || !configured || needsSetup !== true || autoSetupDone.current) return;

    autoSetupDone.current = true;
    setInitializing(true);
    setupFirstAdmin(DEFAULT_LOGIN, DEFAULT_PASSWORD)
      .then((result) => {
        if (result.error) setError(result.error);
      })
      .finally(() => setInitializing(false));
  }, [loading, configured, needsSetup, setupFirstAdmin]);

  if (!loading && session && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const result =
      needsSetup === true
        ? await setupFirstAdmin(login.trim(), password)
        : await signIn(login.trim(), password);

    if (result.error) setError(result.error);
    setSubmitting(false);
  }

  const busy = submitting || initializing;

  return (
    <div className="app-shell min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md glass-card rounded-3xl p-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-trtkat-pink mb-2">Trtkat</p>
        <h1 className="text-2xl font-black text-white mb-6">Přihlášení do adminu</h1>

        {!configured && (
          <p className="text-sm text-amber-400 mb-4">Supabase není nakonfigurováno. Nastavte env proměnné.</p>
        )}

        {initializing && (
          <p className="text-sm text-slate-400 mb-4">První spuštění — vytvářím admin účet…</p>
        )}

        {needsSetup === true && !initializing && (
          <p className="text-sm text-trtkat-blue mb-4">
            Admin ještě neexistuje. Přihlášení vytvoří účet <strong className="text-white">trtkat</strong> automaticky.
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Uživatelské jméno
            </label>
            <input
              id="admin-email"
              type="text"
              autoComplete="username"
              required
              placeholder="trtkat"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="glass-input w-full rounded-xl px-4 py-3 text-white outline-none focus:border-trtkat-pink/50"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Heslo
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full rounded-xl px-4 py-3 text-white outline-none focus:border-trtkat-pink/50"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={busy || !configured}
            className="w-full rounded-xl bg-trtkat-gradient py-3 font-black text-white hover:opacity-90 disabled:opacity-50"
          >
            {busy ? 'Pracuji…' : needsSetup ? 'Vytvořit admin a přihlásit' : 'Přihlásit se'}
          </button>
        </form>
      </div>
    </div>
  );
}
