import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

export function AdminLoginPage() {
  const { signIn, session, isAdmin, loading, configured } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const result = await signIn(email.trim(), password);
    if (result.error) setError(result.error);
    setSubmitting(false);
  }

  return (
    <div className="app-shell min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md glass-card rounded-3xl p-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-trtkat-pink mb-2">Trtkat</p>
        <h1 className="text-2xl font-black text-white mb-6">Přihlášení do adminu</h1>

        {!configured && (
          <p className="text-sm text-amber-400 mb-4">Supabase není nakonfigurováno. Nastavte env proměnné.</p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              E-mail
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            disabled={submitting || !configured}
            className="w-full rounded-xl bg-trtkat-gradient py-3 font-black text-white hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'Přihlašuji…' : 'Přihlásit se'}
          </button>
        </form>
      </div>
    </div>
  );
}
