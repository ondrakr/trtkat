import { useState } from 'react';
import { ChevronDown, Database } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { sectionWrap, sectionY } from '../lib/navigation';
import { cn } from '../lib/utils';
import { ErrorBoundary } from './ErrorBoundary';
import { RevealSection } from './RevealSection';
import { StatsChart } from './StatsChart';
import { StatsChartFallback } from './StatsChartFallback';

export function StatsSection() {
  const { t } = useI18n();
  const [activeStatCategory, setActiveStatCategory] = useState(t.data.statCategories[0].key);

  const currentStats =
    t.data.statCategories.find((item) => item.key === activeStatCategory) ?? t.data.statCategories[0];
  const currentChart = t.data.charts[activeStatCategory] ?? t.data.charts.prvniseks;

  return (
    <RevealSection id="data" className={`${sectionY} bg-slate-900/30 border-y border-white/5`}>
      <div className={sectionWrap}>
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-white mb-3 sm:mb-4 leading-tight">
            {t.data.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-4xl">
            <span className="md:hidden">{t.data.introMobile}</span>
            <span className="hidden md:inline">{t.data.introDesktop}</span>
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Database className="h-3.5 w-3.5 text-trtkat-pink" />
            {t.data.sourceText}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
          {t.data.statCategories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveStatCategory(category.key)}
              className={cn(
                'px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm md:text-base font-bold transition-colors border',
                activeStatCategory === category.key
                  ? 'bg-trtkat-gradient text-white border-transparent shadow-[0_0_20px_rgba(240,98,161,0.2)]'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10',
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {currentStats.insight && (
          <div className="mb-8 rounded-2xl border border-trtkat-pink/20 bg-trtkat-pink/5 p-5 sm:p-6">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              <span className="font-black text-trtkat-pink mr-2">Insight</span>
              {currentStats.insight}
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 xl:gap-16 items-start mb-10 md:mb-14">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-white mb-2">{currentStats.title}</h3>
            <p className="text-sm text-slate-500 mb-6">{t.data.compareHint}</p>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              {currentStats.stats.map((stat) => (
                <div
                  key={stat.title}
                  className="p-4 sm:p-5 md:p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/15 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-trtkat-pink mb-1 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-slate-200 font-bold text-sm sm:text-base">{stat.title}</div>
                  <p className="text-slate-500 mt-2 text-xs sm:text-sm leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:sticky lg:top-24">
            <ErrorBoundary fallback={<StatsChartFallback chart={currentChart} />}>
              <StatsChart chart={currentChart} />
            </ErrorBoundary>
          </div>
        </div>

        <details className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <summary className="cursor-pointer list-none px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-trtkat-blue mb-1">
                {t.data.timelineAccordion}
              </p>
              <h3 className="text-lg sm:text-xl font-black text-white">{t.data.timelineTitle}</h3>
            </div>
            <ChevronDown className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-180 shrink-0" />
          </summary>
          <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.data.timeline.map((item) => (
                <div key={`${item.period}-${item.label}`} className="rounded-xl border border-white/5 bg-slate-950/50 p-4">
                  <time className="text-[10px] font-black uppercase tracking-wider text-trtkat-pink">{item.period}</time>
                  <p className="mt-2 text-sm font-bold text-white">{item.label}</p>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate-500">
              {t.data.sourceLabel}: {t.data.sourceText}
            </p>
          </div>
        </details>
      </div>
    </RevealSection>
  );
}
