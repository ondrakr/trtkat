import { cn } from '../../lib/utils';

const STYLES: Record<string, string> = {
  P0: 'bg-red-500/20 text-red-300 border-red-500/30',
  P1: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  P2: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  P3: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  open: 'bg-blue-500/20 text-blue-300',
  reviewing: 'bg-amber-500/20 text-amber-300',
  waiting: 'bg-purple-500/20 text-purple-300',
  new: 'bg-blue-500/20 text-blue-300',
  in_progress: 'bg-amber-500/20 text-amber-300',
  resolved: 'bg-emerald-500/20 text-emerald-300',
  rejected: 'bg-slate-500/20 text-slate-400',
  escalated: 'bg-red-500/20 text-red-300',
  pending: 'bg-amber-500/20 text-amber-300',
};

export function StatusBadge({ value, className }: { value: string; className?: string }) {
  const key = value in STYLES ? value : 'P3';
  return (
    <span
      className={cn(
        'inline-flex rounded-lg border px-2 py-0.5 text-xs font-bold uppercase tracking-wide',
        STYLES[key],
        className,
      )}
    >
      {value.replace(/_/g, ' ')}
    </span>
  );
}

export function StatCard({
  label,
  value,
  to,
  alert,
}: {
  label: string;
  value: number | string;
  to?: string;
  alert?: boolean;
}) {
  const className = cn(
    'glass-subtle rounded-2xl p-6 block',
    alert && Number(value) > 0 && 'border border-red-500/30',
  );
  const inner = (
    <>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </>
  );

  if (to) {
    return (
      <a href={to} className={cn(className, 'glass-interactive hover:bg-white/5')}>
        {inner}
      </a>
    );
  }
  return <div className={className}>{inner}</div>;
}
