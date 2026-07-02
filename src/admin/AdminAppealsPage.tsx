import { useEffect, useState } from 'react';
import { fetchAppeals, updateAppeal } from './lib/api';
import { StatusBadge } from './components/AdminUi';

export function AdminAppealsPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reason, setReason] = useState('');

  function load() {
    fetchAppeals()
      .then((r) => setItems(r.items))
      .catch((e) => setError(e instanceof Error ? e.message : 'Chyba'))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function resolve(id: string, status: string) {
    if (!reason.trim()) {
      setError('Vyplňte odůvodnění rozhodnutí.');
      return;
    }
    try {
      await updateAppeal({ id, status, decision_reason: reason.trim() });
      setReason('');
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba');
    }
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Odvolání</h1>
      <p className="text-slate-400 mb-8">Přezkum banů, odstranění obsahu a omezení účtu.</p>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Odůvodnění rozhodnutí (povinné)"
        className="glass-input w-full rounded-xl px-4 py-3 text-white mb-6 min-h-[60px]"
      />

      <div className="glass-table rounded-2xl overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-white/5 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">E-mail</th>
              <th className="px-4 py-3 text-left">Typ</th>
              <th className="px-4 py-3 text-left">Stav</th>
              <th className="px-4 py-3 text-left">Zpráva</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-slate-400">Načítání…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-slate-400">Žádná odvolání.</td></tr>
            ) : (
              items.map((row) => (
                <tr key={String(row.id)} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{String(row.email)}</td>
                  <td className="px-4 py-3 text-slate-400">{String(row.appeal_type)}</td>
                  <td className="px-4 py-3"><StatusBadge value={String(row.status)} /></td>
                  <td className="px-4 py-3 text-slate-400 max-w-xs truncate">{String(row.user_message)}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {row.status === 'pending' && (
                      <>
                        <button type="button" onClick={() => resolve(String(row.id), 'upheld')} className="text-xs text-slate-400 font-bold">Potvrdit</button>
                        <button type="button" onClick={() => resolve(String(row.id), 'overturned')} className="text-xs text-emerald-400 font-bold">Zrušit rozhodnutí</button>
                      </>
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
