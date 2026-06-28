import { UserRound } from 'lucide-react';
import { cn } from '../lib/utils';

type StatsGenderValueProps = {
  value: string;
  className?: string;
  size?: 'sm' | 'lg';
};

function parseGenderPair(value: string) {
  if (!value.includes('·')) return null;
  const parts = value.split('·').map((part) => part.trim());
  if (parts.length !== 2) return null;
  return { women: parts[0], men: parts[1] };
}

export function StatsGenderValue({ value, className, size = 'lg' }: StatsGenderValueProps) {
  const pair = parseGenderPair(value);
  const textSize = size === 'lg' ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-base sm:text-lg';

  if (!pair) {
    return <div className={cn('font-black text-white leading-none', textSize, className)}>{value}</div>;
  }

  return (
    <div className={cn('flex flex-wrap gap-x-4 gap-y-2', className)}>
      <span className={cn('inline-flex items-center gap-2 font-black text-trtkat-pink leading-none', textSize)}>
        <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-trtkat-pink/15 border border-trtkat-pink/30">
          <UserRound className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
        </span>
        {pair.women}
      </span>
      <span className={cn('inline-flex items-center gap-2 font-black text-trtkat-blue leading-none', textSize)}>
        <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-trtkat-blue/15 border border-trtkat-blue/30">
          <UserRound className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
        </span>
        {pair.men}
      </span>
    </div>
  );
}

export function StatsGenderLegend({ womenLabel, menLabel }: { womenLabel: string; menLabel: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
      <span className="inline-flex items-center gap-2 text-xs font-bold text-trtkat-pink">
        <span className="h-3 w-3 rounded-sm bg-trtkat-pink" />
        <UserRound className="h-3.5 w-3.5" />
        {womenLabel}
      </span>
      <span className="inline-flex items-center gap-2 text-xs font-bold text-trtkat-blue">
        <span className="h-3 w-3 rounded-sm bg-trtkat-blue" />
        <UserRound className="h-3.5 w-3.5" />
        {menLabel}
      </span>
    </div>
  );
}
