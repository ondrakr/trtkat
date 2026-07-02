import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchReports, type ReportListItem } from './lib/api';
import { StatusBadge } from './components/AdminUi';
import { REPORT_TYPE_LABELS, isWorkflowOpen } from './lib/mappers';

export function AdminReportsPage() {
  const [items, setItems] = useState<ReportListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'urgent'>('open');

  useEffect(() => {
    fetchReports()
      .then((r) => setItems(r.items))
      .catch((e) => setError(e instanceof Error ? e.message : 'Chyba'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const status = item.workflow.status;
      const priority = item.workflow.priority;
      if (filter === 'open') return isWorkflowOpen(status);
      if (filter === 'urgent') return priority === 'P0' || priority === 'P1';
      return true;
    });
  }, [items, filter]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Reporty</h1>
          <p className="text-slate-400 mt-1">Fronta nahlášení — bez volného přístupu k chatům.</p>
        </div>
        <div className="flex gap-2">
          {(['open', 'urgent', 'all'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                filter === f ? 'bg-trtkat-gradient text-white' : 'glass-subtle text-slate-400'
              }`}
            >
              {f === 'open' ? 'Otevřené' : f === 'urgent' ? 'Urgentní' : 'Vše'}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="glass-table rounded-2xl overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">Typ</th>
              <th className="px-4 py-3">Priorita</th>
              <th className="px-4 py-3">Stav</th>
              <th className="px-4 py-3">Nahlášený</th>
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-slate-400">Načítání…</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-slate-400">Žádné reporty ve frontě.</td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white font-medium">
                    {REPORT_TYPE_LABELS[row.type as keyof typeof REPORT_TYPE_LABELS] ?? row.type}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge value={row.workflow.priority} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge value={row.workflow.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                    {row.reportedUserId?.slice(0, 8) ?? '—'}…
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {row.createdAt ? new Date(row.createdAt).toLocaleString('cs-CZ') : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/reporty/${row.id}`}
                      className="text-trtkat-pink font-bold hover:underline"
                    >
                      Otevřít
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
