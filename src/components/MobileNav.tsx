import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { StoreBadges } from './StoreBadges';
import { LangDropdown } from './LangDropdown';

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

const links = [
  { href: '#jak-to-funguje', key: 'about' as const },
  { href: '#data', key: 'stats' as const },
  { href: '#benefity', key: 'benefits' as const },
  { href: '#vibe', key: 'ethics' as const },
  { href: '#stahnout-cta', key: 'download' as const },
];

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { t } = useI18n();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const labelMap = {
    about: t.nav.about,
    stats: t.nav.stats,
    benefits: t.nav.benefits,
    ethics: t.nav.ethics,
    download: t.nav.download,
  };

  return (
    <div className="fixed inset-0 z-[70] md:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col border-l border-white/10 bg-slate-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <LangDropdown />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-xl border border-white/10 p-2 text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            {links.map(({ href, key }) => (
              <li key={key}>
                <a
                  href={href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-3.5 text-base font-bold text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {labelMap[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/5 px-5 py-6 space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{t.nav.download}</p>
          <StoreBadges size="md" layout="stack" className="w-full" />
        </div>
      </div>
    </div>
  );
}
