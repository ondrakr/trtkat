import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { LangDropdown } from './LangDropdown';
import { MobileNav } from './MobileNav';
import { StoreBadges } from './StoreBadges';
import { SocialLinks } from './SocialLinks';
import { useI18n } from '../i18n/I18nProvider';
import { logoSrc, sectionWrap } from '../lib/navigation';
import { cn } from '../lib/utils';

export function SiteLayout() {
  const { t } = useI18n();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 32);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navSolid = !isHome || scrolled;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-trtkat-pink/30">
      <nav
        className={cn(
          'top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300',
          isHome ? 'fixed inset-x-0' : 'sticky inset-x-0',
          navSolid
            ? 'border-b border-white/5 bg-slate-950/95 shadow-[0_8px_32px_rgba(2,6,23,0.45)] md:bg-slate-950/85 md:backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className={sectionWrap}>
          <div className="flex justify-between h-14 sm:h-16 md:h-20 items-center gap-3">
            <Link to="/" className="w-20 sm:w-24 md:w-28 shrink-0" aria-label="Trtkat">
              <img src={logoSrc} alt="Trtkat logo" className="w-full h-auto" />
            </Link>

            <div className="hidden md:flex items-center gap-5 lg:gap-8 text-sm font-300 uppercase tracking-wider text-slate-400">
              <a href="/#jak-to-funguje" className="hover:text-white transition-colors">{t.nav.about}</a>
              <a href="/#funkce" className="hover:text-white transition-colors">{t.nav.features}</a>
              <a href="/#data" className="hover:text-white transition-colors">{t.nav.stats}</a>
              <Link to="/blog" className="hover:text-white transition-colors">{t.nav.blog}</Link>
              <LangDropdown />
              <StoreBadges size="sm" className="hidden xl:flex" />
              <a
                href="/#stahnout"
                className="xl:hidden bg-trtkat-gradient text-white px-4 py-2.5 rounded-xl font-black text-xs whitespace-nowrap hover:shadow-[0_0_20px_rgba(240,98,161,0.3)] transition-all active:scale-95"
              >
                {t.nav.download}
              </a>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <LangDropdown />
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                className="rounded-xl border border-white/10 p-2.5 text-slate-200 hover:bg-white/5 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <Outlet />

      <footer className="bg-slate-950 border-t border-white/5 py-12 sm:py-16 md:py-20">
        <div className={sectionWrap}>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <img src={logoSrc} alt="Trtkat logo" className="w-28 sm:w-32 mb-4" />
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{t.meta.description}</p>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-[0.18em] text-xs mb-4">{t.footer.offer}</h4>
              <div className="flex flex-col gap-3 text-slate-400 font-bold text-sm">
                <a href="/#jak-to-funguje" className="hover:text-white transition-colors">{t.footer.howItWorks}</a>
                <a href="/#funkce" className="hover:text-white transition-colors">{t.nav.features}</a>
                <a href="/#data" className="hover:text-white transition-colors">{t.footer.stats}</a>
                <a href="/#faq" className="hover:text-white transition-colors">{t.footer.faq}</a>
                <Link to="/blog" className="hover:text-white transition-colors">{t.footer.blog}</Link>
                <a href="/#stahnout" className="hover:text-white transition-colors">{t.footer.download}</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-[0.18em] text-xs mb-4">{t.footer.legal}</h4>
              <div className="flex flex-col gap-3 text-slate-400 font-bold text-sm">
                <Link to="/ochrana-soukromi" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
                <Link to="/podminky" className="hover:text-white transition-colors">{t.footer.terms}</Link>
                <Link to="/kontakt" className="hover:text-white transition-colors">{t.footer.contact}</Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-black uppercase tracking-[0.18em] text-xs">{t.footer.followUs}</h4>
              <SocialLinks />
              <StoreBadges size="sm" />
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/5 text-center text-slate-600 text-xs md:text-sm font-medium">
            {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
