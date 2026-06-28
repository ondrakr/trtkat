import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { sectionWrap, sectionY } from '../lib/navigation';
import { ErrorBoundary } from './ErrorBoundary';
import { RevealSection } from './RevealSection';
import { StatsChart } from './StatsChart';
import { StatsChartFallback } from './StatsChartFallback';

export function StatsSection() {
  const { t } = useI18n();
  const [activeStatCategory, setActiveStatCategory] = useState(t.data.statCategories[0].key);

  const currentStats =
    t.data.statCategories.find((item) => item.key === activeStatCategory) ?? t.data.statCategories[0];
  const currentChart = t.data.charts[activeStatCategory] ?? t.data.charts.seznamovani;

  return (
    <RevealSection id="data" className={`${sectionY} bg-slate-900/30 border-y border-white/5`}>
      <div className={sectionWrap}>
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-white mb-3 sm:mb-4 leading-tight">{t.data.title}</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-4xl">
            <span className="md:hidden">{t.data.introMobile}</span>
            <span className="hidden md:inline">{t.data.introDesktop}</span>
        </p>
        </div>

        <div className="hidden md:flex flex-wrap gap-3 mb-8">
          {t.data.statCategories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveStatCategory(category.key)}
              className={`px-4 py-2 rounded-xl text-sm md:text-base font-bold transition-colors border ${activeStatCategory === category.key ? 'bg-trtkat-gradient text-white border-transparent' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="md:hidden space-y-3 mb-8">
          {t.data.statCategories.map((category) => (
            <details key={category.key} className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <summary className="cursor-pointer font-bold text-white">{category.label}</summary>
              <div className="mt-3 space-y-2">
                {category.stats.map((stat) => (
                  <div key={`${category.key}-${stat.title}`} className="text-sm text-slate-300">
                    <span className="text-trtkat-pink font-black mr-2">{stat.value}</span>
                    {stat.title}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>

        <div className="hidden md:grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-3">{currentStats.title}</h3>
            <p className="text-slate-400 mb-6">{t.data.compareHint}</p>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
              {currentStats.stats.map((stat) => (
                <div key={stat.title} className="p-5 md:p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-black text-trtkat-pink mb-1">{stat.value}</div>
                  <div className="text-slate-200 font-bold">{stat.title}</div>
                  <p className="text-slate-500 mt-2 text-sm md:text-base">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <ErrorBoundary fallback={<StatsChartFallback chart={currentChart} />}>
              <StatsChart chart={currentChart} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
