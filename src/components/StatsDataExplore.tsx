import { lazy, Suspense, useState } from 'react';
import {
  Heart,
  HeartHandshake,
  Lightbulb,
  MonitorSmartphone,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { cn } from '../lib/utils';
import { ErrorBoundary } from './ErrorBoundary';
import { StatsChartFallback } from './StatsChartFallback';
import { StatsGenderLegend, StatsGenderValue } from './StatsGenderValue';
import { StatsTimeline } from './StatsTimeline';

const StatsChart = lazy(() => import('./StatsChart').then((m) => ({ default: m.StatsChart })));

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

function ChartSkeleton() {
  return <div className="h-[340px] rounded-[2rem] glass-subtle animate-pulse" />;
}

export function StatsDataExplore() {
  const { t } = useI18n();
  const [activeStatCategory, setActiveStatCategory] = useState(t.data.statCategories[0].key);

  const currentStats =
    t.data.statCategories.find((item) => item.key === activeStatCategory) ?? t.data.statCategories[0];
  const currentChart = t.data.charts[activeStatCategory] ?? t.data.charts.prvniseks;
  const ActiveIcon = CATEGORY_ICONS[currentStats.key] ?? Heart;

  return (
    <div className="mt-12 sm:mt-16 md:mt-20 pt-12 sm:pt-16 border-t border-white/10">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">{t.data.quiz.exploreTitle}</h3>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">{t.data.quiz.exploreIntro}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        {t.data.statCategories.map((category) => {
          const Icon = CATEGORY_ICONS[category.key] ?? Heart;
          const active = activeStatCategory === category.key;
          return (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveStatCategory(category.key)}
              className={cn(
                'inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border',
                active
                  ? 'bg-trtkat-gradient text-white border-transparent shadow-[0_0_20px_rgba(240,98,161,0.25)]'
                  : 'glass-subtle glass-interactive text-slate-300 hover:bg-white/10',
              )}
            >
              <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-white' : 'text-trtkat-blue')} />
              {category.label}
            </button>
          );
        })}
      </div>

      {currentStats.insight && (
        <div className="mb-8 md:mb-10 glass-card rounded-2xl border-trtkat-blue/20 bg-gradient-to-r from-trtkat-pink/10 via-transparent to-trtkat-blue/10 p-5 sm:p-6">
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
            <h4 className="text-xl sm:text-2xl font-black text-white">{currentStats.title}</h4>
          </div>
          <p className="text-sm text-slate-500 mb-4">{t.data.compareHint || t.data.quiz.exploreHint}</p>
          <StatsGenderLegend womenLabel={t.data.womenLabel} menLabel={t.data.menLabel} />

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-5">
            {currentStats.stats.map((stat) => (
              <div
                key={stat.title}
                className="glass-subtle glass-interactive relative overflow-hidden p-4 sm:p-5 rounded-2xl"
              >
                {hasGenderSplit(stat.value) && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-trtkat-pink via-white/20 to-trtkat-blue" />
                )}
                <div className="mb-2">
                  <StatsGenderValue value={stat.value} size="sm" />
                </div>
                <div className="text-slate-200 font-bold text-sm">{stat.title}</div>
                <p className="text-slate-500 mt-2 text-xs leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:sticky lg:top-24">
          <ErrorBoundary fallback={<StatsChartFallback chart={currentChart} />}>
            <Suspense fallback={<ChartSkeleton />}>
              <StatsChart chart={currentChart} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>

      <StatsTimeline />
    </div>
  );
}
