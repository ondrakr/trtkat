export type Locale = 'cs' | 'en';

const STORAGE_KEY = 'trtkat-locale';
const LOCALES: Locale[] = ['cs', 'en'];

/** Čeština je výchozí — EN jen po explicitní volbě uživatele (kvůli SEO a Googlebotu). */
export function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'cs';

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LOCALES.includes(stored as Locale)) return stored as Locale;

  return 'cs';
}

export function persistLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale);
}
