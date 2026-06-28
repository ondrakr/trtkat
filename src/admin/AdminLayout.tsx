import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LogOut, LayoutDashboard, FileText, Mail, Cookie } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import { cn } from '../lib/utils';

const nav = [
  { to: '/admin', end: true, label: 'Přehled', icon: LayoutDashboard },
  { to: '/admin/clanky', label: 'Články', icon: FileText },
  { to: '/admin/waitlist', label: 'Waitlist', icon: Mail },
  { to: '/admin/cookies', label: 'Cookies', icon: Cookie },
];

export function AdminLayout() {
  const { loading, session, isAdmin, signOut, configured } = useAdminAuth();

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Načítání…
      </div>
    );
  }

  if (!configured) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-xl font-black text-white mb-3">Admin není dostupný</h1>
          <p className="text-sm text-slate-400">
            Nastavte proměnné <code className="text-trtkat-pink">VITE_SUPABASE_URL</code> a{' '}
            <code className="text-trtkat-pink">VITE_SUPABASE_ANON_KEY</code> ve Vercel / .env.
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <h1 className="text-xl font-black text-white mb-3">Přístup odepřen</h1>
          <p className="text-sm text-slate-400 mb-6">Váš účet nemá roli administrátora.</p>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/15"
          >
            Odhlásit se
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <aside className="hidden md:flex w-64 flex-col border-r border-white/5 bg-slate-950/80 p-6">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-trtkat-pink">Trtkat</p>
          <h1 className="text-lg font-black text-white">Admin</h1>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors',
                  isActive ? 'bg-trtkat-gradient text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white',
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => signOut()}
          className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Odhlásit
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden border-b border-white/5 px-4 py-3 flex items-center justify-between">
          <span className="font-black text-white">Trtkat Admin</span>
          <button type="button" onClick={() => signOut()} className="text-sm text-slate-400">
            Odhlásit
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
