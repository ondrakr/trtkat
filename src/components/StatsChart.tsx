import { BarChart } from 'lucide-react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  BarChart as RechartsBarChart,
} from 'recharts';
import { useI18n } from '../i18n/I18nProvider';
import type { ChartCategory } from '../i18n/translations/types';

type StatsChartProps = {
  chart: ChartCategory;
};

const PINK = '#f062a1';
const BLUE = '#4fb3f0';

export function StatsChart({ chart }: StatsChartProps) {
  const { t } = useI18n();
  const isGrouped = chart.type === 'grouped';
  const womenKey = chart.seriesLabels?.women ?? t.data.womenLabel;
  const menKey = chart.seriesLabels?.men ?? t.data.menLabel;

  const groupedData = isGrouped
    ? chart.data.map((d) => ({
        label: d.label,
        [womenKey]: d.women ?? 0,
        [menKey]: d.men ?? 0,
      }))
    : [];

  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl">
      <h3 className="text-base sm:text-xl font-black text-white mb-2 flex items-center gap-3">
        <BarChart className="w-6 h-6 text-trtkat-blue shrink-0" />
        {chart.title}
      </h3>
      <p className="text-sm text-slate-400 mb-6 leading-relaxed">{chart.subtitle}</p>
      <div className="h-[260px] md:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          {isGrouped ? (
            <RechartsBarChart data={groupedData} barGap={4} barCategoryGap="18%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontWeight: 'bold', fontSize: 11 }}
              />
              <YAxis hide />
              <Tooltip
                formatter={(value: number) => [`${value}${chart.suffix}`, '']}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  backgroundColor: '#020617',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 12 }}
                formatter={(value) => <span className="text-slate-300 text-xs font-bold">{value}</span>}
              />
              <Bar dataKey={womenKey} fill={PINK} radius={[8, 8, 0, 0]} barSize={28} isAnimationActive={false} />
              <Bar dataKey={menKey} fill={BLUE} radius={[8, 8, 0, 0]} barSize={28} isAnimationActive={false} />
            </RechartsBarChart>
          ) : (
            <RechartsBarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontWeight: 'bold', fontSize: 11 }}
              />
              <YAxis hide />
              <Tooltip
                formatter={(value: number) => [`${value}${chart.suffix}`, t.data.tooltipValue]}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  backgroundColor: '#020617',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                }}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={48} isAnimationActive={false}>
                {chart.data.map((entry, index) => (
                  <Cell key={`${entry.label}-${index}`} fill={index % 2 === 0 ? PINK : BLUE} />
                ))}
              </Bar>
            </RechartsBarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
