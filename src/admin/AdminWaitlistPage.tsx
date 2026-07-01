import { useEffect, useState } from 'react';
import { fetchWaitlistAdmin } from '../blog/service';

type Row = Awaited<ReturnType<typeof fetchWaitlistAdmin>>[number];

export function AdminWaitlistPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWaitlistAdmin()
      .then(setRows)
      .catch((e) => setError(e instanceof Error ? e.message : 'Chyba'))
      .finally(() => setLoading(false));
  }, []);

  function exportCsv() {
    const header = 'email,source,page,created_at\n';
    const body = rows
      .map((r) => `${r.email},${r.source},${r.page ?? ''},${r.created_at}`)
      .join('\n');
    const blob = new Blob([header + body], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trtkat-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Předběžný přístup</h1>
          <p className="text-slate-400 mt-1">E-maily ze stránky /ziskat-aplikaci (tabulka early_access_signups).</p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          disabled={!rows.length}
          className="glass-subtle rounded-xl px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10 disabled:opacity-40"
        >
          Export CSV
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="glass-table rounded-2xl overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Zdroj</th>
              <th className="px-4 py-3">Stránka</th>
              <th className="px-4 py-3">Datum</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-slate-400">
                  Načítání…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-slate-400">
                  Zatím žádné registrace.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-white/5">
                  <td className="px-4 py-3 font-medium text-white">{row.email}</td>
                  <td className="px-4 py-3 text-slate-400">{row.source}</td>
                  <td className="px-4 py-3 text-slate-400">{row.page ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(row.created_at).toLocaleString('cs-CZ')}
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
