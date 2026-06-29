import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import type { Locale } from '../i18n/detectLocale';

const LOCALES: { code: Locale; flag: string; label: string }[] = [
  { code: 'cs', flag: '🇨🇿', label: 'Čeština' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
];

export function LangDropdown() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((item) => item.code === locale) ?? LOCALES[0];

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={current.label}
        className="glass-subtle flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
      >
        <span className="text-base leading-none" aria-hidden="true">
          {current.flag}
        </span>
        <span className="hidden sm:inline uppercase tracking-wide text-xs">{current.code}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="glass-popover absolute right-0 top-[calc(100%+0.5rem)] z-[60] min-w-[11rem] overflow-hidden rounded-xl py-1 shadow-2xl"
        >
          {LOCALES.map(({ code, flag, label }) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={locale === code}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                  locale === code
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-lg leading-none" aria-hidden="true">
                  {flag}
                </span>
                <span className="font-medium">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
