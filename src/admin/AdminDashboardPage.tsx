import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminStats } from '../blog/service';
import { fetchModerationDashboard } from './lib/api';
import { StatCard } from './components/AdminUi';

export function AdminDashboardPage() {
  const [mod, setMod] = useState<Awaited<ReturnType<typeof fetchModerationDashboard>> | null>(null);
  const [content, setContent] = useState({ posts: 0, waitlist: 0, consents: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetchModerationDashboard().catch((e) => {
        setError(e instanceof Error ? e.message : 'Moderace nedostupná');
        return null;
      }),
      fetchAdminStats(),
    ])
      .then(([m, c]) => {
        setMod(m);
        setContent(c);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Přehled</h1>
      <p className="text-slate-400 mb-8">
        Moderace a bezpečnost — bez citlivého obsahu na dashboardu.
      </p>

      {error && (
        <p className="text-amber-400 text-sm mb-4 glass-subtle rounded-xl p-4">
          {error}. Spusť migraci 006 a ověř SUPABASE_SERVICE_ROLE_KEY.
        </p>
      )}

      <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4">Moderace</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mb-10">
        <StatCard label="Otevřené reporty" value={loading ? '…' : (mod?.openReports ?? 0)} to="/admin/reporty" alert />
        <StatCard label="Urgentní (P0/P1)" value={loading ? '…' : (mod?.urgentReports ?? 0)} to="/admin/reporty" alert />
        <StatCard label="Child safety" value={loading ? '…' : (mod?.childSafety ?? 0)} to="/admin/child-safety" alert />
        <StatCard label="GDPR žádosti" value={loading ? '…' : (mod?.gdprRequests ?? 0)} to="/admin/gdpr" />
        <StatCard label="Po lhůtě" value={loading ? '…' : (mod?.overdueCases ?? 0)} to="/admin/reporty" alert />
        <StatCard label="Odvolání" value={loading ? '…' : (mod?.pendingAppeals ?? 0)} to="/admin/odvolani" />
      </div>

      <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4">Web obsah</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/admin/clanky" className="glass-subtle glass-interactive rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Články</p>
          <p className="mt-2 text-3xl font-black text-white">{loading ? '…' : content.posts}</p>
        </Link>
        <Link to="/admin/waitlist" className="glass-subtle glass-interactive rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Předběžný přístup</p>
          <p className="mt-2 text-3xl font-black text-white">{loading ? '…' : content.waitlist}</p>
        </Link>
        <Link to="/admin/cookies" className="glass-subtle glass-interactive rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Cookies</p>
          <p className="mt-2 text-3xl font-black text-white">{loading ? '…' : content.consents}</p>
        </Link>
      </div>
    </div>
  );
}
