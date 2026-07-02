import { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  addReportNote,
  fetchReportDetail,
  recordModerationAction,
  requestSensitiveAccess,
  updateReportWorkflow,
} from './lib/api';
import { SensitiveAccessGate } from './components/SensitiveAccessGate';
import { StatusBadge } from './components/AdminUi';
import { MODERATION_ACTIONS, REPORT_TYPE_LABELS, WORKFLOW_STATUS_LABELS } from './lib/mappers';

type Detail = {
  report: {
    id: string;
    type: string;
    description: string | null;
    reportedUserId: string | null;
    messageId: string | null;
    voiceMessageId: string | null;
    workflow: {
      priority: string;
      status: string;
      decision: string | null;
      decision_reason: string | null;
    };
    matchId: string | null;
    hasChatSnapshot: boolean;
  };
  notes: { id: string; note: string; created_at: string }[];
  previousReportsCount: number;
  publicProfile: { displayName: string | null; bio: string | null; status: string | null } | null;
  reportedPhoto: { id: string; url: string | null } | null;
  matchContext: { matchId: string | null; includeChat: boolean; hasChatSnapshot: boolean; note: string } | null;
  sensitiveContent: {
    message: { id: string; locked: boolean } | null;
    voice: { id: string; locked: boolean } | null;
    chatSnapshot: { locked: boolean; note: string } | null;
  };
};

export function AdminReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [decisionReason, setDecisionReason] = useState('');
  const [unlockedMessage, setUnlockedMessage] = useState<unknown>(null);
  const [unlockedVoice, setUnlockedVoice] = useState<unknown>(null);
  const [unlockedChat, setUnlockedChat] = useState<unknown>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    if (!id) return;
    setLoading(true);
    fetchReportDetail(id)
      .then((d) => setDetail(d as unknown as Detail))
      .catch((e) => setError(e instanceof Error ? e.message : 'Chyba'))
      .finally(() => setLoading(false));
  }

  useEffect(load, [id]);

  async function handleWorkflowUpdate(updates: Record<string, string>) {
    if (!id) return;
    setSaving(true);
    try {
      await updateReportWorkflow(id, updates);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba');
    } finally {
      setSaving(false);
    }
  }

  async function handleAddNote(e: FormEvent) {
    e.preventDefault();
    if (!id || !note.trim()) return;
    setSaving(true);
    try {
      await addReportNote(id, note.trim());
      setNote('');
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba');
    } finally {
      setSaving(false);
    }
  }

  async function handleModeration(actionType: string) {
    if (!id || !detail || !decisionReason.trim()) {
      setError('Vyplňte odůvodnění rozhodnutí.');
      return;
    }
    setSaving(true);
    try {
      const result = await recordModerationAction(id, {
        actionType,
        reason: decisionReason.trim(),
        targetUserId: detail.report.reportedUserId ?? undefined,
      });
      if (result.hint) setError(result.hint);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-slate-400">Načítání případu…</p>;
  if (!detail) return <p className="text-red-400">{error || 'Případ nenalezen.'}</p>;

  const { report } = detail;

  return (
    <div className="max-w-4xl">
      <Link to="/admin/reporty" className="text-sm text-trtkat-pink font-bold hover:underline">
        ← Zpět na frontu
      </Link>

      <div className="mt-4 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl font-black text-white">
            {REPORT_TYPE_LABELS[report.type as keyof typeof REPORT_TYPE_LABELS] ?? report.type}
          </h1>
          <StatusBadge value={report.workflow.priority} />
          <StatusBadge value={report.workflow.status} />
        </div>
        <p className="text-slate-400 text-sm font-mono">ID: {report.id}</p>
        {report.description && <p className="mt-3 text-slate-300">{report.description}</p>}
      </div>

      {error && <p className="text-amber-400 text-sm mb-4">{error}</p>}

      <div className="grid gap-6 mb-8">
        <section className="glass-subtle rounded-2xl p-5">
          <h2 className="text-sm font-black uppercase text-slate-400 mb-3">Veřejný profil (nahlášený)</h2>
          {detail.publicProfile ? (
            <div className="text-sm text-slate-300 space-y-1">
              <p><strong className="text-white">Jméno:</strong> {detail.publicProfile.displayName ?? '—'}</p>
              <p><strong className="text-white">Bio:</strong> {detail.publicProfile.bio ?? '—'}</p>
              <p><strong className="text-white">Stav účtu:</strong> {detail.publicProfile.status ?? '—'}</p>
              <p className="text-xs text-slate-500 mt-2">
                Citlivé preference se nezobrazují — pouze pokud jsou relevantní k případu (vyžaduje schválení app schématu).
              </p>
            </div>
          ) : (
            <p className="text-slate-500 text-sm">Profil nenalezen nebo sloupce neodpovídají schématu.</p>
          )}
          <p className="text-xs text-slate-500 mt-3">
            Předchozí reporty proti uživateli: {detail.previousReportsCount}
          </p>
        </section>

        {detail.reportedPhoto && (
          <section className="glass-subtle rounded-2xl p-5">
            <h2 className="text-sm font-black uppercase text-slate-400 mb-3">Nahlášená fotka</h2>
            {detail.reportedPhoto.url ? (
              <img
                src={detail.reportedPhoto.url}
                alt="Nahlášená fotka"
                className="max-h-64 rounded-xl border border-white/10"
              />
            ) : (
              <p className="text-slate-500 text-sm">URL fotky není v DB — ověř sloupec v profile_photos.</p>
            )}
          </section>
        )}

        {detail.matchContext && (
          <section className="glass-subtle rounded-2xl p-5">
            <h2 className="text-sm font-black uppercase text-slate-400 mb-3">Kontext vztahu (pouze tento případ)</h2>
            <p className="text-sm text-slate-300">
              Match ID: {detail.matchContext.matchId ? `${detail.matchContext.matchId.slice(0, 8)}…` : '—'}
            </p>
            <p className="text-sm text-slate-300">
              Chat snapshot v reportu: {detail.matchContext.hasChatSnapshot ? 'Ano' : 'Ne'}
            </p>
            <p className="text-sm text-slate-300">
              Include chat (app): {detail.matchContext.includeChat ? 'Ano' : 'Ne'}
            </p>
            <p className="text-xs text-slate-500 mt-2">{detail.matchContext.note}</p>
          </section>
        )}

        {detail.sensitiveContent.chatSnapshot && !unlockedChat && (
          <SensitiveAccessGate
            title="Kontext chatu (snapshot)"
            description="Zobrazí chat_snapshot z reportu nebo okolní zprávy přes match_id."
            resourceType="chat_snapshot"
            resourceId={report.id}
            reportId={report.id}
            onUnlock={async (accessReason) => {
              const res = await requestSensitiveAccess({
                id: report.id,
                accessReason,
                resourceType: 'chat_snapshot',
                resourceId: report.id,
              });
              setUnlockedChat(res.content);
            }}
          />
        )}

        {unlockedChat && (
          <section className="glass-subtle rounded-2xl p-5">
            <h2 className="text-sm font-black uppercase text-slate-400 mb-3">Kontext chatu</h2>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap overflow-auto max-h-96">
              {JSON.stringify(unlockedChat, null, 2)}
            </pre>
          </section>
        )}

        {report.messageId && !unlockedMessage && (
          <SensitiveAccessGate
            title="Nahlášená zpráva"
            description="Obsah chatu se zobrazí až po zadání důvodu. Přístup se zaloguje."
            resourceType="message"
            resourceId={report.messageId}
            reportId={report.id}
            onUnlock={async (accessReason) => {
              const res = await requestSensitiveAccess({
                id: report.id,
                accessReason,
                resourceType: 'message',
                resourceId: report.messageId!,
              });
              setUnlockedMessage(res.content);
            }}
          />
        )}

        {unlockedMessage && (
          <section className="glass-subtle rounded-2xl p-5">
            <h2 className="text-sm font-black uppercase text-slate-400 mb-3">Nahlášená zpráva</h2>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap overflow-auto">
              {JSON.stringify(unlockedMessage, null, 2)}
            </pre>
          </section>
        )}

        {report.voiceMessageId && !unlockedVoice && (
          <SensitiveAccessGate
            title="Nahlášená audio zpráva"
            description="Audio lze přehrát jen v kontextu reportu. Přístup se zaloguje."
            resourceType="voice_message"
            resourceId={report.voiceMessageId}
            reportId={report.id}
            onUnlock={async (accessReason) => {
              const res = await requestSensitiveAccess({
                id: report.id,
                accessReason,
                resourceType: 'voice_message',
                resourceId: report.voiceMessageId!,
              });
              setUnlockedVoice(res.content);
            }}
          />
        )}

        {unlockedVoice && (
          <section className="glass-subtle rounded-2xl p-5">
            <h2 className="text-sm font-black uppercase text-slate-400 mb-3">Audio zpráva</h2>
            {typeof unlockedVoice === 'object' && unlockedVoice && 'url' in (unlockedVoice as object) && (unlockedVoice as { url?: string }).url ? (
              <audio controls src={(unlockedVoice as { url: string }).url} className="w-full" />
            ) : (
              <pre className="text-sm text-slate-300 whitespace-pre-wrap">{JSON.stringify(unlockedVoice, null, 2)}</pre>
            )}
          </section>
        )}
      </div>

      <section className="glass-subtle rounded-2xl p-5 mb-8">
        <h2 className="text-sm font-black uppercase text-slate-400 mb-4">Rozhodnutí</h2>
        <textarea
          value={decisionReason}
          onChange={(e) => setDecisionReason(e.target.value)}
          placeholder="Odůvodnění rozhodnutí (povinné pro akce)"
          className="glass-input w-full rounded-xl px-4 py-3 text-white mb-4 min-h-[80px]"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { label: 'P0', key: 'priority', value: 'P0' },
            { label: 'P1', key: 'priority', value: 'P1' },
            { label: WORKFLOW_STATUS_LABELS.reviewing, key: 'status', value: 'reviewing' },
            { label: WORKFLOW_STATUS_LABELS.waiting, key: 'status', value: 'waiting' },
            { label: WORKFLOW_STATUS_LABELS.resolved, key: 'status', value: 'resolved' },
            { label: WORKFLOW_STATUS_LABELS.rejected, key: 'status', value: 'rejected' },
          ].map((btn) => (
            <button
              key={btn.label}
              type="button"
              disabled={saving}
              onClick={() => handleWorkflowUpdate({ [btn.key]: btn.value, decision_reason: decisionReason })}
              className="glass-subtle rounded-xl px-3 py-2 text-xs font-bold text-white hover:bg-white/10 disabled:opacity-50"
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {MODERATION_ACTIONS.map((btn) => (
            <button
              key={btn.action}
              type="button"
              disabled={saving}
              onClick={() => handleModeration(btn.action)}
              className="rounded-xl border border-red-500/30 px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-500/10 disabled:opacity-50"
            >
              {btn.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Akce se zapisují do web_admin_moderation_actions a audit logu. App tabulky se nemění přímo z web adminu.
        </p>
      </section>

      <section className="glass-subtle rounded-2xl p-5">
        <h2 className="text-sm font-black uppercase text-slate-400 mb-4">Interní poznámky</h2>
        <form onSubmit={handleAddNote} className="mb-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="glass-input w-full rounded-xl px-4 py-3 text-white mb-2 min-h-[60px]"
            placeholder="Nová interní poznámka…"
          />
          <button type="submit" disabled={saving} className="rounded-xl bg-trtkat-gradient px-4 py-2 text-sm font-black text-white">
            Uložit poznámku
          </button>
        </form>
        <ul className="space-y-3">
          {detail.notes.map((n) => (
            <li key={n.id} className="text-sm text-slate-300 border-t border-white/5 pt-3">
              <p>{n.note}</p>
              <p className="text-xs text-slate-500 mt-1">{new Date(n.created_at).toLocaleString('cs-CZ')}</p>
            </li>
          ))}
          {detail.notes.length === 0 && <p className="text-slate-500 text-sm">Zatím žádné poznámky.</p>}
        </ul>
      </section>
    </div>
  );
}
