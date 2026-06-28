import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { submitWaitlist } from '../lib/waitlist';

export function WaitlistForm() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorKey, setErrorKey] = useState<'invalid_email' | 'submit_failed' | 'network'>('submit_failed');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    const result = await submitWaitlist(email);

    if (result.ok === false) {
      setErrorKey(result.error);
      setStatus('error');
      return;
    }

    setStatus('success');
    setEmail('');
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-trtkat-pink/30 bg-trtkat-pink/10 px-5 py-4 text-left">
        <p className="text-sm sm:text-base font-bold text-white">{t.comingSoon.successTitle}</p>
        <p className="mt-1 text-sm text-slate-300">{t.comingSoon.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md text-left">
      <label htmlFor="waitlist-email" className="mb-2 block text-sm font-bold text-slate-300">
        {t.comingSoon.emailLabel}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="waitlist-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder={t.comingSoon.emailPlaceholder}
          className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-base text-white placeholder:text-slate-500 outline-none transition-colors focus:border-trtkat-pink/50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-trtkat-gradient px-5 py-3 text-sm font-black text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : t.comingSoon.submitButton}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-3 text-sm font-medium text-red-400" role="alert">
          {t.comingSoon.errors[errorKey]}
        </p>
      )}
      <p className="mt-3 text-xs leading-relaxed text-slate-500">{t.comingSoon.privacyNote}</p>
    </form>
  );
}
