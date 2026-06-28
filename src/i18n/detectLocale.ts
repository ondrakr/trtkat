export type Locale = 'cs' | 'en' | 'el';

const STORAGE_KEY = 'trtkat-locale';
const LOCALES: Locale[] = ['cs', 'en', 'el'];

export function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'cs';

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LOCALES.includes(stored as Locale)) return stored as Locale;

  const preferred = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const lang of preferred) {
    const code = lang.toLowerCase();
    if (code.startsWith('cs')) return 'cs';
    if (code.startsWith('el')) return 'el';
    if (code.startsWith('en')) return 'en';
  }

  return 'cs';
}

export function persistLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale);
}
