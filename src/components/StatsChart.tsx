import { BarChart } from 'lucide-react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart as RechartsBarChart,
} from 'recharts';
import { useI18n } from '../i18n/I18nProvider';
import type { ChartCategory } from '../i18n/translations/types';

type StatsChartProps = {
  chart: ChartCategory;
};

export function StatsChart({ chart }: StatsChartProps) {
  const { t } = useI18n();

  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl mb-6">
      <h3 className="text-base sm:text-xl font-black text-white mb-6 flex items-center gap-3">
        <BarChart className="w-6 h-6 text-trtkat-blue" />
        {chart.title}
      </h3>
      <div className="h-[250px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 'bold' }} />
            <YAxis hide />
            <Tooltip
              formatter={(value: number) => [`${value} ${chart.suffix}`, t.data.tooltipValue]}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{
                backgroundColor: '#020617',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
              }}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={56} isAnimationActive={false}>
              {chart.data.map((entry, index) => (
                <Cell key={`${entry.label}-${index}`} fill={index % 2 === 0 ? '#f062a1' : '#4fb3f0'} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
