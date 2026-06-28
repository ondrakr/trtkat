import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { detectLocale, persistLocale, type Locale } from './detectLocale';
import { getCopy, type SiteCopy } from './translations';

type I18nContextValue = {
  locale: Locale;
  t: SiteCopy;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  const setLocale = (next: Locale) => {
    persistLocale(next);
    setLocaleState(next);
  };

  const t = useMemo(() => getCopy(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t.meta.description);
  }, [locale, t.meta.title, t.meta.description]);

  const value = useMemo(() => ({ locale, t, setLocale }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
