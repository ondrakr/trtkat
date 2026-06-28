import { useEffect, useMemo, useState } from 'react';
import { fetchCookieConsentsAdmin } from '../blog/service';

type Row = Awaited<ReturnType<typeof fetchCookieConsentsAdmin>>[number];

export function AdminCookiesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCookieConsentsAdmin()
      .then(setRows)
      .catch((e) => setError(e instanceof Error ? e.message : 'Chyba'))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const total = rows.length;
    const analytics = rows.filter((r) => r.analytics).length;
    const marketing = rows.filter((r) => r.marketing).length;
    const rejected = rows.filter((r) => !r.analytics && !r.marketing).length;
    return { total, analytics, marketing, rejected };
  }, [rows]);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Cookie souhlasy</h1>
      <p className="text-slate-400 mb-8">Přehled rozhodnutí návštěvníků (posledních 500 záznamů).</p>

      <div className="grid gap-4 sm:grid-cols-4 mb-8">
        {[
          { label: 'Celkem', value: stats.total },
          { label: 'Analytics ano', value: stats.analytics },
          { label: 'Marketing ano', value: stats.marketing },
          { label: 'Jen nezbytné', value: stats.rejected },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">{s.label}</p>
            <p className="text-2xl font-black text-white mt-1">{loading ? '…' : s.value}</p>
          </div>
        ))}
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="rounded-2xl border border-white/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">Visitor ID</th>
              <th className="px-4 py-3">Analytics</th>
              <th className="px-4 py-3">Marketing</th>
              <th className="px-4 py-3">Aktualizováno</th>
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
                  Zatím žádné záznamy.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-white/5">
                  <td className="px-4 py-3 font-mono text-xs text-slate-300">{row.visitor_id.slice(0, 8)}…</td>
                  <td className="px-4 py-3">{row.analytics ? '✓' : '—'}</td>
                  <td className="px-4 py-3">{row.marketing ? '✓' : '—'}</td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(row.updated_at).toLocaleString('cs-CZ')}
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
