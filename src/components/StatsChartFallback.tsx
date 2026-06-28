import { BarChart } from 'lucide-react';
import type { ChartCategory } from '../i18n/translations/types';

type StatsChartFallbackProps = {
  chart: ChartCategory;
};

export function StatsChartFallback({ chart }: StatsChartFallbackProps) {
  const maxValue = Math.max(...chart.data.map((item) => item.value), 1);

  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl mb-6">
      <h3 className="text-base sm:text-xl font-black text-white mb-6 flex items-center gap-3">
        <BarChart className="w-6 h-6 text-trtkat-blue" />
        {chart.title}
      </h3>
      <div className="space-y-4">
        {chart.data.map((item, index) => (
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
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: index % 2 === 0 ? '#f062a1' : '#4fb3f0',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
