import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { LangDropdown } from './LangDropdown';
import { MobileNav } from './MobileNav';
import { NavAnchor } from './NavAnchor';
import { StoreBadges } from './StoreBadges';
import { SocialLinks } from './SocialLinks';
import { useI18n } from '../i18n/I18nProvider';
import { logoSrc, sectionWrap, smoothScrollToId } from '../lib/navigation';
import { frostedNavStyle } from '../lib/frostedGlass';

export function SiteLayout() {
  const { t } = useI18n();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { pathname, hash } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isHome || !hash) return;
    const id = hash.replace('#', '');
    if (!id) return;
    const timer = window.setTimeout(() => smoothScrollToId(id), 0);
    return () => window.clearTimeout(timer);
  }, [isHome, hash]);

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

  const navbar = (
    <nav className="fixed inset-x-0 top-0 z-[60]" style={navSolid ? frostedNavStyle : undefined}>
      <div className={sectionWrap}>
          <div className="flex h-14 sm:h-16 md:h-20 items-center justify-between gap-3">
            <Link to="/" className="w-20 shrink-0 sm:w-24 md:w-28" aria-label="Trtkat">
              <img src={logoSrc} alt="Trtkat logo" className="h-auto w-full" />
            </Link>

            <div className="hidden items-center gap-5 text-sm font-300 uppercase tracking-wider text-slate-400 md:flex lg:gap-8">
              <NavAnchor id="jak-to-funguje" className="transition-colors hover:text-white">
                {t.nav.about}
              </NavAnchor>
              <NavAnchor id="funkce" className="transition-colors hover:text-white">
                {t.nav.features}
              </NavAnchor>
              <NavAnchor id="data" className="transition-colors hover:text-white">
                {t.nav.stats}
              </NavAnchor>
              <NavAnchor id="duvera" className="transition-colors hover:text-white">
                {t.nav.references}
              </NavAnchor>
              <LangDropdown />
              <StoreBadges size="sm" className="hidden xl:flex" />
              <NavAnchor
                id="stahnout"
                className="whitespace-nowrap rounded-xl bg-trtkat-gradient px-4 py-2.5 text-xs font-black text-white transition-all hover:shadow-[0_0_20px_rgba(240,98,161,0.3)] active:scale-95 xl:hidden"
              >
                {t.nav.download}
              </NavAnchor>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <LangDropdown />
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                className="glass-subtle rounded-xl p-2.5 text-slate-200 transition-colors hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
    </nav>
  );

  return (
    <div className="app-shell flex min-h-screen flex-col text-slate-100 selection:bg-trtkat-pink/30">
      {mounted ? createPortal(navbar, document.body) : null}

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="page-content flex min-h-0 flex-1 flex-col min-w-0">
        <Outlet />

        <footer className="glass-strong border-t border-white/5 py-12 sm:py-16 md:py-20">
          <div className={sectionWrap}>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <img src={logoSrc} alt="Trtkat logo" className="mb-4 w-28 sm:w-32" />
                <p className="max-w-xs text-sm leading-relaxed text-slate-500">{t.meta.description}</p>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-white">{t.footer.offer}</h4>
                <div className="flex flex-col gap-3 text-sm font-bold text-slate-400">
                  <a href="/#jak-to-funguje" className="transition-colors hover:text-white">{t.footer.howItWorks}</a>
                  <a href="/#funkce" className="transition-colors hover:text-white">{t.nav.features}</a>
                  <a href="/#data" className="transition-colors hover:text-white">{t.footer.stats}</a>
                  <Link to="/blog" className="transition-colors hover:text-white">{t.footer.blog}</Link>
                  <a href="/#stahnout" className="transition-colors hover:text-white">{t.footer.download}</a>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-white">{t.footer.legal}</h4>
                <div className="flex flex-col gap-3 text-sm font-bold text-slate-400">
                  <Link to="/privacy" className="transition-colors hover:text-white">{t.footer.privacy}</Link>
                  <Link to="/terms" className="transition-colors hover:text-white">{t.footer.terms}</Link>
                  <Link to="/community-guidelines" className="transition-colors hover:text-white">{t.footer.community}</Link>
                  <Link to="/account-deletion" className="transition-colors hover:text-white">{t.footer.accountDeletion}</Link>
                  <Link to="/child-safety" className="transition-colors hover:text-white">{t.footer.childSafety}</Link>
                  <Link to="/support" className="transition-colors hover:text-white">{t.footer.contact}</Link>
                  <Link to="/cookies" className="transition-colors hover:text-white">{t.footer.cookieSettings}</Link>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.18em] text-white">{t.footer.followUs}</h4>
                <SocialLinks />
                <StoreBadges size="sm" />
              </div>
            </div>

            <div className="mt-10 border-t border-white/5 pt-8 text-center text-xs font-medium text-slate-600 md:text-sm">
              {t.footer.copyright}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
