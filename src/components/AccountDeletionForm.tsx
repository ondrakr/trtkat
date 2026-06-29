import { useState, type FormEvent } from 'react';
import { submitAccountDeletion } from '../lib/accountDeletion';

type AccountDeletionFormProps = {
  locale: 'cs' | 'en';
};

const copy = {
  cs: {
    title: 'Webový formulář pro smazání účtu',
    emailLabel: 'E-mail účtu',
    emailPlaceholder: 'vas@email.cz',
    noteLabel: 'Poznámka (volitelné)',
    notePlaceholder: 'Stručný důvod nebo upřesnění',
    confirmLabel: 'Potvrzuji, že chci trvale smazat svůj účet Trtkat a všechna s ním spojená data.',
    submit: 'Odeslat žádost o smazání',
    successTitle: 'Žádost odeslána',
    successBody: 'Ověříme vaši žádost a smažeme účet do 30 dnů. Potvrzení pošleme na e-mail účtu.',
    passwordWarning: 'Nikdy neposílejte heslo.',
    errors: {
      invalid_email: 'Zadejte platný e-mail účtu.',
      confirm_required: 'Potvrďte, že chcete účet smazat.',
      submit_failed: 'Odeslání se nezdařilo. Zkuste to znovu nebo napište na privacy@trtkat.cz.',
      network: 'Chyba sítě. Zkuste to později.',
    },
  },
  en: {
    title: 'Web account deletion form',
    emailLabel: 'Account email',
    emailPlaceholder: 'you@email.com',
    noteLabel: 'Note (optional)',
    notePlaceholder: 'Brief reason or clarification',
    confirmLabel: 'I confirm that I want to permanently delete my Trtkat account and all associated data.',
    submit: 'Submit deletion request',
    successTitle: 'Request submitted',
    successBody: 'We will verify your request and delete the account within 30 days. Confirmation will be sent to the account email.',
    passwordWarning: 'Never send your password.',
    errors: {
      invalid_email: 'Enter a valid account email.',
      confirm_required: 'Confirm that you want to delete the account.',
      submit_failed: 'Submission failed. Try again or email privacy@trtkat.cz.',
      network: 'Network error. Please try later.',
    },
  },
} as const;

export function AccountDeletionForm({ locale }: AccountDeletionFormProps) {
  const t = copy[locale];
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!confirmed) {
      setError(t.errors.confirm_required);
      return;
    }

    setSubmitting(true);
    const result = await submitAccountDeletion({ email, note: note.trim() || undefined });
    setSubmitting(false);

    if (result.ok === false) {
      setError(t.errors[result.error]);
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="glass-subtle rounded-2xl p-6 sm:p-8 my-10 border border-trtkat-pink/20">
        <h2 className="text-xl font-black text-white mb-2">{t.successTitle}</h2>
        <p className="text-slate-300 leading-relaxed">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-subtle rounded-2xl p-6 sm:p-8 my-10 space-y-5">
      <h2 className="text-xl font-black text-white">{t.title}</h2>

      <div>
        <label htmlFor="deletion-email" className="mb-2 block text-sm font-bold text-slate-300">
          {t.emailLabel}
        </label>
        <input
          id="deletion-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-trtkat-pink/50 focus:outline-none focus:ring-2 focus:ring-trtkat-pink/20"
        />
      </div>

      <div>
        <label htmlFor="deletion-note" className="mb-2 block text-sm font-bold text-slate-300">
          {t.noteLabel}
        </label>
        <textarea
          id="deletion-note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t.notePlaceholder}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-trtkat-pink/50 focus:outline-none focus:ring-2 focus:ring-trtkat-pink/20 resize-y min-h-[96px]"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-trtkat-pink focus:ring-trtkat-pink/30"
        />
        <span className="text-sm text-slate-300 leading-relaxed">{t.confirmLabel}</span>
      </label>

      <p className="text-xs text-slate-500 font-medium">{t.passwordWarning}</p>

      {error && (
        <p className="text-sm font-bold text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-trtkat-pink px-6 py-3 text-sm font-black text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? '…' : t.submit}
      </button>
    </form>
  );
}
