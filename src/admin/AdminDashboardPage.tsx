import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminStats } from '../blog/service';

export function AdminDashboardPage() {
  const [stats, setStats] = useState({ posts: 0, waitlist: 0, consents: 0, analyticsAccepted: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Články', value: stats.posts, to: '/admin/clanky' },
    { label: 'Waitlist e-maily', value: stats.waitlist, to: '/admin/waitlist' },
    { label: 'Cookie souhlasy', value: stats.consents, to: '/admin/cookies' },
    { label: 'Analytics povoleno', value: stats.analyticsAccepted, to: '/admin/cookies' },
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Přehled</h1>
      <p className="text-slate-400 mb-8">Správa obsahu, waitlistu a cookie souhlasů.</p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="glass-subtle glass-interactive rounded-2xl p-6"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{card.label}</p>
            <p className="mt-2 text-3xl font-black text-white">{loading ? '…' : card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
