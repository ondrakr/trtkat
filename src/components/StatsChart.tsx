import { BarChart3 } from 'lucide-react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  BarChart as RechartsBarChart,
} from 'recharts';
import { useI18n } from '../i18n/I18nProvider';
import type { ChartCategory } from '../i18n/translations/types';
import { StatsGenderLegend } from './StatsGenderValue';

type StatsChartProps = {
  chart: ChartCategory;
};

const PINK = '#f062a1';
const BLUE = '#4fb3f0';

function formatLabel(value: unknown, suffix: string) {
  if (typeof value !== 'number') return '';
  const formatted = Number.isInteger(value) ? String(value) : value.toLocaleString('cs-CZ', { maximumFractionDigits: 2 });
  return `${formatted}${suffix}`;
}

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

  const simpleData = chart.data.filter((d) => d.value != null);

  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl">
      <h3 className="text-base sm:text-xl font-black text-white mb-2 flex items-center gap-3">
        <BarChart3 className="w-6 h-6 text-trtkat-blue shrink-0" />
        {chart.title}
      </h3>
      <p className="text-sm text-slate-400 mb-4 leading-relaxed">{chart.subtitle}</p>

      {isGrouped && <StatsGenderLegend womenLabel={womenKey} menLabel={menKey} />}

      <div className="h-[280px] md:h-[340px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          {isGrouped ? (
            <RechartsBarChart data={groupedData} barGap={6} barCategoryGap="20%" margin={{ top: 28, right: 8, left: 8, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontWeight: 'bold', fontSize: 11 }}
                interval={0}
              />
              <YAxis hide domain={[0, 'auto']} />
              <Tooltip
                formatter={(value: number, name: string) => [formatLabel(value, chart.suffix), name]}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  backgroundColor: '#020617',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                }}
              />
              <Bar dataKey={womenKey} fill={PINK} radius={[8, 8, 0, 0]} barSize={32} isAnimationActive={false}>
                <LabelList
                  dataKey={womenKey}
                  position="top"
                  formatter={(value) => formatLabel(value, chart.suffix)}
                  fill={PINK}
                  fontSize={11}
                  fontWeight={700}
                />
              </Bar>
              <Bar dataKey={menKey} fill={BLUE} radius={[8, 8, 0, 0]} barSize={32} isAnimationActive={false}>
                <LabelList
                  dataKey={menKey}
                  position="top"
                  formatter={(value) => formatLabel(value, chart.suffix)}
                  fill={BLUE}
                  fontSize={11}
                  fontWeight={700}
                />
              </Bar>
            </RechartsBarChart>
          ) : (
            <RechartsBarChart data={simpleData} margin={{ top: 28, right: 8, left: 8, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontWeight: 'bold', fontSize: 11 }}
                interval={0}
              />
              <YAxis hide domain={[0, 'auto']} />
              <Tooltip
                formatter={(value: number) => [formatLabel(value, chart.suffix), t.data.tooltipValue]}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  backgroundColor: '#020617',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                }}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={44} isAnimationActive={false}>
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(value) => formatLabel(value, chart.suffix)}
                  fill="#e2e8f0"
                  fontSize={11}
                  fontWeight={700}
                />
                {simpleData.map((entry, index) => (
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
