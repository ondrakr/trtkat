import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings2, X } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import {
  getStoredConsent,
  hasConsentDecision,
  persistConsent,
  type CookiePreferences,
} from '../lib/cookies';
import { cn } from '../lib/utils';

export function CookieConsent() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!hasConsentDecision()) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const openSettings = () => {
      const stored = getStoredConsent();
      setAnalytics(stored?.analytics ?? false);
      setMarketing(stored?.marketing ?? false);
      setSettingsOpen(true);
      setVisible(true);
    };
    window.addEventListener('trtkat:open-cookie-settings', openSettings);
    return () => window.removeEventListener('trtkat:open-cookie-settings', openSettings);
  }, []);

  const apply = useCallback(async (prefs: CookiePreferences) => {
    await persistConsent(prefs);
    setVisible(false);
    setSettingsOpen(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-md shadow-2xl p-5 sm:p-6">
        {!settingsOpen ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 id="cookie-title" className="text-base font-black text-white mb-2">
                {t.cookies.title}
              </h2>
              <p id="cookie-desc" className="text-sm text-slate-400 leading-relaxed">
                {t.cookies.description}{' '}
                <Link to="/ochrana-soukromi" className="text-trtkat-blue hover:text-white underline-offset-2 hover:underline">
                  {t.cookies.privacyLink}
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                onClick={() => apply({ necessary: true, analytics: false, marketing: false })}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold text-slate-300 hover:bg-white/5"
              >
                {t.cookies.rejectOptional}
              </button>
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/5"
              >
                <Settings2 className="h-4 w-4" />
                {t.cookies.customize}
              </button>
              <button
                type="button"
                onClick={() => apply({ necessary: true, analytics: true, marketing: false })}
                className="rounded-xl bg-trtkat-gradient px-4 py-2.5 text-sm font-black text-white"
              >
                {t.cookies.acceptAll}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-black text-white">{t.cookies.settingsTitle}</h2>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                aria-label="Close"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="rounded-xl border border-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-white text-sm">{t.cookies.necessaryTitle}</p>
                    <p className="text-xs text-slate-400 mt-1">{t.cookies.necessaryDesc}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 uppercase">{t.cookies.alwaysOn}</span>
                </div>
              </div>

              <label className="flex items-start justify-between gap-4 rounded-xl border border-white/5 p-4 cursor-pointer">
                <div>
                  <p className="font-bold text-white text-sm">{t.cookies.analyticsTitle}</p>
                  <p className="text-xs text-slate-400 mt-1">{t.cookies.analyticsDesc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-trtkat-pink"
                />
              </label>

              <label className="flex items-start justify-between gap-4 rounded-xl border border-white/5 p-4 cursor-pointer">
                <div>
                  <p className="font-bold text-white text-sm">{t.cookies.marketingTitle}</p>
                  <p className="text-xs text-slate-400 mt-1">{t.cookies.marketingDesc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-trtkat-pink"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={() => apply({ necessary: true, analytics: false, marketing: false })}
                className={cn('rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold text-slate-300 hover:bg-white/5')}
              >
                {t.cookies.saveMinimal}
              </button>
              <button
                type="button"
                onClick={() => apply({ necessary: true, analytics, marketing })}
                className="rounded-xl bg-trtkat-gradient px-4 py-2.5 text-sm font-black text-white"
              >
                {t.cookies.saveChoices}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
