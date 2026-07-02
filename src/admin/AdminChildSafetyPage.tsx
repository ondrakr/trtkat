import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchReports, type ReportListItem } from './lib/api';
import { StatusBadge } from './components/AdminUi';
import { isChildSafetyType, REPORT_TYPE_LABELS } from './lib/mappers';

export function AdminChildSafetyPage() {
  const [items, setItems] = useState<ReportListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports()
      .then((r) => setItems(r.items.filter((i) => isChildSafetyType(i.type))))
      .catch((e) => setError(e instanceof Error ? e.message : 'Chyba'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Child safety</h1>
      <p className="text-slate-400 mb-8">
        Urgentní fronta — podezření na nezletilého, CSAM/CSEA. Okamžitá priorita P0.
      </p>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="glass-table rounded-2xl overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">Typ</th>
              <th className="px-4 py-3">Priorita</th>
              <th className="px-4 py-3">Stav</th>
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-slate-400">Načítání…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-slate-400">Žádné child-safety případy.</td></tr>
            ) : (
              items.map((row) => (
                <tr key={row.id} className="border-t border-white/5 bg-red-500/5">
                  <td className="px-4 py-3 text-red-300 font-bold">
                    {REPORT_TYPE_LABELS[row.type as keyof typeof REPORT_TYPE_LABELS] ?? row.type}
                  </td>
                  <td className="px-4 py-3"><StatusBadge value={row.workflow.priority} /></td>
                  <td className="px-4 py-3"><StatusBadge value={row.workflow.workflow_status} /></td>
                  <td className="px-4 py-3 text-slate-400">
                    {row.createdAt ? new Date(row.createdAt).toLocaleString('cs-CZ') : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/reporty/${row.id}`} className="text-trtkat-pink font-bold">Řešit</Link>
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
