import { BarChart } from 'lucide-react';
import type { ChartCategory } from '../i18n/translations/types';
import { useI18n } from '../i18n/I18nProvider';

type StatsChartFallbackProps = {
  chart: ChartCategory;
};

const PINK = '#f062a1';
const BLUE = '#4fb3f0';

export function StatsChartFallback({ chart }: StatsChartFallbackProps) {
  const { t } = useI18n();
  const isGrouped = chart.type === 'grouped';

  const maxSimple = Math.max(...chart.data.map((item) => item.value ?? 0), 1);
  const maxGrouped = Math.max(
    ...chart.data.flatMap((item) => [item.women ?? 0, item.men ?? 0]),
    1,
  );

  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl">
      <h3 className="text-base sm:text-xl font-black text-white mb-2 flex items-center gap-3">
        <BarChart className="w-6 h-6 text-trtkat-blue" />
        {chart.title}
      </h3>
      <p className="text-sm text-slate-400 mb-6">{chart.subtitle}</p>
      <div className="space-y-4">
        {isGrouped
          ? chart.data.map((item) => (
              <div key={item.label} className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                {[
                  { label: t.data.womenLabel, value: item.women ?? 0, color: PINK },
                  { label: t.data.menLabel, value: item.men ?? 0, color: BLUE },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="mb-1 flex items-center justify-between text-sm font-bold">
                      <span className="text-slate-300">{row.label}</span>
                      <span style={{ color: row.color }}>
                        {row.value}
                        {chart.suffix}
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(row.value / maxGrouped) * 100}%`,
                          backgroundColor: row.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))
          : chart.data.map((item, index) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm font-bold">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="text-trtkat-pink">
                    {item.value}
                    {chart.suffix}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${((item.value ?? 0) / maxSimple) * 100}%`,
                      backgroundColor: index % 2 === 0 ? PINK : BLUE,
                    }}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
