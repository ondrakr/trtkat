import { Link } from 'react-router-dom';
import { ArrowLeft, Smartphone } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { SEO } from '../components/SEO';
import { DOWNLOAD_PAGE_PATH } from '../config/stores';
import { sectionWrap, sectionY } from '../lib/navigation';

export function ComingSoonPage() {
  const { t } = useI18n();

  return (
    <>
      <SEO title={t.comingSoon.title} description={t.comingSoon.body} path={DOWNLOAD_PAGE_PATH} noindex />
      <main className={`${sectionY} relative flex-grow overflow-hidden`}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-trtkat-pink/15 blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-12%] h-80 w-80 rounded-full bg-trtkat-blue/15 blur-[100px]" />
        </div>

        <div className={`${sectionWrap} relative max-w-2xl`}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.blog.backHome}
          </Link>

          <div className="rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-slate-900/60 p-8 sm:p-10 md:p-12 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-trtkat-gradient text-white shadow-lg">
              <Smartphone className="h-8 w-8" />
            </div>

            <span className="inline-block rounded-full border border-trtkat-pink/30 bg-trtkat-pink/10 px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] text-trtkat-pink mb-5">
              {t.comingSoon.badge}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              {t.comingSoon.heading}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-lg mx-auto mb-8">
              {t.comingSoon.body}
            </p>

            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              {t.comingSoon.platforms}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
