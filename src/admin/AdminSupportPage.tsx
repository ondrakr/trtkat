import { useEffect, useState } from 'react';
import { fetchSupportTickets, updateSupportTicket } from './lib/api';
import { StatusBadge } from './components/AdminUi';

export function AdminSupportPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function load() {
    fetchSupportTickets()
      .then((r) => setItems(r.items))
      .catch((e) => setError(e instanceof Error ? e.message : 'Chyba'))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function escalate(id: string, to: string) {
    try {
      await updateSupportTicket({ id, status: 'escalated', escalated_to: to });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba');
    }
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Support</h1>
      <p className="text-slate-400 mb-8">
        Dotazy uživatelů — bez přístupu k chatu/fotkám, pokud to není nutné.
      </p>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="glass-table rounded-2xl overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-white/5 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">E-mail</th>
              <th className="px-4 py-3 text-left">Předmět</th>
              <th className="px-4 py-3 text-left">Stav</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-8 text-slate-400">Načítání…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-slate-400">Žádné tikety.</td></tr>
            ) : (
              items.map((row) => (
                <tr key={String(row.id)} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{String(row.email)}</td>
                  <td className="px-4 py-3 text-slate-300">{String(row.subject)}</td>
                  <td className="px-4 py-3"><StatusBadge value={String(row.status)} /></td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button type="button" onClick={() => escalate(String(row.id), 'moderation')} className="text-xs text-trtkat-pink font-bold">→ Moderace</button>
                    <button type="button" onClick={() => escalate(String(row.id), 'privacy')} className="text-xs text-trtkat-blue font-bold">→ Privacy</button>
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
