import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { StoreBadges } from './StoreBadges';
import { LangDropdown } from './LangDropdown';
import { NavAnchor } from './NavAnchor';
import { cn } from '../lib/utils';

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

const links = [
  { id: 'jak-to-funguje', key: 'about' as const },
  { id: 'funkce', key: 'features' as const },
  { id: 'data', key: 'stats' as const },
  { id: 'duvera', key: 'references' as const },
  { id: 'stahnout', key: 'download' as const },
];

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { t } = useI18n();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const labelMap = {
    about: t.nav.about,
    features: t.nav.features,
    stats: t.nav.stats,
    references: t.nav.references,
    download: t.nav.download,
  };

  return (
    <div
      className={cn('fixed inset-0 z-[70] md:hidden', open ? 'pointer-events-auto' : 'pointer-events-none')}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        className={cn(
          'absolute inset-0 glass-overlay transition-opacity duration-200 ease-out',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col border-l border-white/10 glass-strong shadow-2xl transition-transform duration-200 ease-out will-change-transform',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <LangDropdown />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className="glass-subtle rounded-xl p-2.5 text-slate-300 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            {links.map(({ id, key }) => (
              <li key={key}>
                <NavAnchor
                  id={id}
                  onNavigate={onClose}
                  className="block rounded-xl px-4 py-3.5 text-base font-bold text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {labelMap[key]}
                </NavAnchor>
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
