import { Database } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { sectionWrap, sectionY } from '../lib/navigation';
import { RevealSection } from './RevealSection';
import { StatsQuiz } from './StatsQuiz';

export function StatsSection() {
  const { t } = useI18n();

  return (
    <RevealSection id="data" className={`${sectionY} bg-slate-900/30 border-y border-white/5`}>
      <div className={sectionWrap}>
        <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight">
            {t.data.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            <span className="md:hidden">{t.data.introMobile}</span>
            <span className="hidden md:inline">{t.data.introDesktop}</span>
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Database className="h-3.5 w-3.5 text-trtkat-pink" />
            {t.data.sourceText}
          </p>
        </div>

        <StatsQuiz />
      </div>
    </RevealSection>
  );
}
