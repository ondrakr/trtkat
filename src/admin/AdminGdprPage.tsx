import { useEffect, useState } from 'react';
import { fetchGdprQueue, updateGdprItem } from './lib/api';
import { StatusBadge } from './components/AdminUi';

export function AdminGdprPage() {
  const [gdpr, setGdpr] = useState<Record<string, unknown>[]>([]);
  const [deletions, setDeletions] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function load() {
    fetchGdprQueue()
      .then((r) => {
        setGdpr(r.gdprRequests);
        setDeletions(r.deletionRequests);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Chyba'))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function markCompleted(id: string, type: 'gdpr' | 'deletion') {
    try {
      await updateGdprItem({ id, type, status: 'completed' });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba');
    }
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">GDPR a souhlasy</h1>
      <p className="text-slate-400 mb-8">Žádosti o smazání, export, opravu a odvolání souhlasu.</p>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <h2 className="text-sm font-black uppercase text-slate-400 mb-3">Smazání účtu (web formulář)</h2>
      <div className="glass-table rounded-2xl overflow-x-auto mb-10">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-white/5 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">E-mail</th>
              <th className="px-4 py-3 text-left">Stav</th>
              <th className="px-4 py-3 text-left">Datum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-8 text-slate-400">Načítání…</td></tr>
            ) : deletions.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-slate-400">Žádné žádosti.</td></tr>
            ) : (
              deletions.map((row) => (
                <tr key={String(row.id)} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{String(row.email)}</td>
                  <td className="px-4 py-3"><StatusBadge value={String(row.status)} /></td>
                  <td className="px-4 py-3 text-slate-400">
                    {row.created_at ? new Date(String(row.created_at)).toLocaleString('cs-CZ') : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {row.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => markCompleted(String(row.id), 'deletion')}
                        className="text-xs font-bold text-trtkat-pink"
                      >
                        Označit vyřízeno
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h2 className="text-sm font-black uppercase text-slate-400 mb-3">Ostatní GDPR žádosti</h2>
      <div className="glass-table rounded-2xl overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-white/5 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">E-mail</th>
              <th className="px-4 py-3 text-left">Typ</th>
              <th className="px-4 py-3 text-left">Stav</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {gdpr.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-slate-400">Žádné žádosti v tabulce web_admin_gdpr_requests.</td></tr>
            ) : (
              gdpr.map((row) => (
                <tr key={String(row.id)} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{String(row.email)}</td>
                  <td className="px-4 py-3 text-slate-400">{String(row.request_type)}</td>
                  <td className="px-4 py-3"><StatusBadge value={String(row.status)} /></td>
                  <td className="px-4 py-3 text-right">
                    {row.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => markCompleted(String(row.id), 'gdpr')}
                        className="text-xs font-bold text-trtkat-pink"
                      >
                        Vyřízeno
                      </button>
                    )}
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
