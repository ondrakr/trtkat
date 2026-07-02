import { useState } from 'react';
import { ACCESS_REASONS } from '../lib/mappers';

type Props = {
  title: string;
  description: string;
  resourceType: string;
  resourceId: string;
  reportId: string;
  onUnlock: (accessReason: string) => Promise<void>;
};

export function SensitiveAccessGate({ title, description, resourceType, resourceId, reportId, onUnlock }: Props) {
  const [reason, setReason] = useState('report_resolution');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleUnlock() {
    setLoading(true);
    setError('');
    try {
      await onUnlock(reason);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-subtle rounded-2xl border border-amber-500/20 p-5">
      <p className="text-sm font-bold text-amber-300 mb-1">{title}</p>
      <p className="text-sm text-slate-400 mb-4">{description}</p>
      <p className="text-xs text-slate-500 mb-3">
        Typ: {resourceType} · ID: {resourceId.slice(0, 8)}… · Případ: {reportId.slice(0, 8)}…
      </p>

      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
        Důvod otevření citlivého obsahu *
      </label>
      <select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="glass-input w-full rounded-xl px-3 py-2 text-sm text-white mb-3"
      >
        {ACCESS_REASONS.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Volitelná poznámka k přístupu (interní)"
        className="glass-input w-full rounded-xl px-3 py-2 text-sm text-white mb-3 min-h-[60px]"
      />

      {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

      <button
        type="button"
        disabled={loading}
        onClick={handleUnlock}
        className="rounded-xl bg-trtkat-gradient px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        {loading ? 'Ověřuji…' : 'Otevřít a zalogovat přístup'}
      </button>
    </div>
  );
}
