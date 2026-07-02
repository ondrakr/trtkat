import { useEffect, useState } from 'react';
import { fetchAuditLog } from './lib/api';

export function AdminAuditPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAuditLog()
      .then((r) => setItems(r.items))
      .catch((e) => setError(e instanceof Error ? e.message : 'Chyba'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Audit log</h1>
      <p className="text-slate-400 mb-8">
        Kdo co otevřel, změnil a proč. Záznamy nelze mazat běžným adminem.
      </p>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="glass-table rounded-2xl overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-white/5 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Čas</th>
              <th className="px-4 py-3 text-left">Admin</th>
              <th className="px-4 py-3 text-left">Akce</th>
              <th className="px-4 py-3 text-left">Zdroj</th>
              <th className="px-4 py-3 text-left">Důvod přístupu</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-slate-400">Načítání…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-slate-400">Zatím žádné záznamy.</td></tr>
            ) : (
              items.map((row) => (
                <tr key={String(row.id)} className="border-t border-white/5">
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                    {new Date(String(row.created_at)).toLocaleString('cs-CZ')}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-300">
                    {String(row.admin_user_id).slice(0, 8)}…
                  </td>
                  <td className="px-4 py-3 text-white">{String(row.action)}</td>
                  <td className="px-4 py-3 text-slate-400">
                    {String(row.resource_type)}
                    {row.resource_id ? ` / ${String(row.resource_id).slice(0, 8)}…` : ''}
                  </td>
                  <td className="px-4 py-3 text-amber-300">{row.access_reason ? String(row.access_reason) : '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
