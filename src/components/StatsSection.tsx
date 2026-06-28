import { useState } from 'react';
import {
  Database,
  Heart,
  HeartHandshake,
  Lightbulb,
  MonitorSmartphone,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { sectionWrap, sectionY } from '../lib/navigation';
import { cn } from '../lib/utils';
import { ErrorBoundary } from './ErrorBoundary';
import { RevealSection } from './RevealSection';
import { StatsChart } from './StatsChart';
import { StatsChartFallback } from './StatsChartFallback';
import { StatsGenderLegend, StatsGenderValue } from './StatsGenderValue';
import { StatsTimeline } from './StatsTimeline';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  prvniseks: Heart,
  seznamovani: Users,
  vztahy: HeartHandshake,
  online: MonitorSmartphone,
  bezpeci: ShieldCheck,
};

function hasGenderSplit(value: string) {
  return value.includes('·');
}

export function StatsSection() {
  const { t } = useI18n();
  const [activeStatCategory, setActiveStatCategory] = useState(t.data.statCategories[0].key);

  const currentStats =
    t.data.statCategories.find((item) => item.key === activeStatCategory) ?? t.data.statCategories[0];
  const currentChart = t.data.charts[activeStatCategory] ?? t.data.charts.prvniseks;
  const ActiveIcon = CATEGORY_ICONS[currentStats.key] ?? Heart;

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
          {t.data.statCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category.key] ?? Heart;
            const active = activeStatCategory === category.key;
            return (
              <button
                key={category.key}
                type="button"
                onClick={() => setActiveStatCategory(category.key)}
                className={cn(
                  'inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm md:text-base font-bold transition-all border',
                  active
                    ? 'bg-trtkat-gradient text-white border-transparent shadow-[0_0_20px_rgba(240,98,161,0.25)] scale-[1.02]'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20',
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-white' : 'text-trtkat-blue')} />
                {category.label}
              </button>
            );
          })}
        </div>

        {currentStats.insight && (
          <div className="mb-8 rounded-2xl border border-trtkat-blue/20 bg-gradient-to-r from-trtkat-pink/10 via-slate-950/50 to-trtkat-blue/10 p-5 sm:p-6">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed flex gap-3">
              <Lightbulb className="h-5 w-5 text-trtkat-pink shrink-0 mt-0.5" />
              <span>
                <span className="font-black text-trtkat-pink mr-2">Insight</span>
                {currentStats.insight}
              </span>
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 xl:gap-16 items-start mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-trtkat-gradient shadow-lg">
                <ActiveIcon className="h-5 w-5 text-white" />
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">{currentStats.title}</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">{t.data.compareHint}</p>
            <StatsGenderLegend womenLabel={t.data.womenLabel} menLabel={t.data.menLabel} />

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 mt-5">
              {currentStats.stats.map((stat) => {
                const genderSplit = hasGenderSplit(stat.value);
                return (
                  <div
                    key={stat.title}
                    className={cn(
                      'relative overflow-hidden p-4 sm:p-5 md:p-6 rounded-2xl border bg-white/[0.03] hover:bg-white/[0.05] transition-colors',
                      genderSplit ? 'border-white/10' : 'border-white/10',
                    )}
                  >
                    {genderSplit && (
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-trtkat-pink via-white/20 to-trtkat-blue" />
                    )}
                    <div className="mb-2">
                      <StatsGenderValue value={stat.value} />
                    </div>
                    <div className="text-slate-200 font-bold text-sm sm:text-base">{stat.title}</div>
                    <p className="text-slate-500 mt-2 text-xs sm:text-sm leading-relaxed">{stat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative lg:sticky lg:top-24">
            <ErrorBoundary fallback={<StatsChartFallback chart={currentChart} />}>
              <StatsChart chart={currentChart} />
            </ErrorBoundary>
          </div>
        </div>

        <StatsTimeline />
      </div>
    </RevealSection>
  );
}
