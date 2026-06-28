import { useEffect, useRef, useState, type ComponentType } from 'react';
import { sectionY } from '../lib/navigation';
import { RevealSection } from './RevealSection';

function StatsFallback() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden="true">
      <div className="h-10 w-2/3 max-w-md rounded-xl bg-white/5" />
      <div className="h-24 rounded-2xl bg-white/5" />
      <div className="hidden md:grid lg:grid-cols-2 gap-8">
        <div className="h-64 rounded-2xl bg-white/5" />
        <div className="h-64 rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}

export function LazyStatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [StatsSection, setStatsSection] = useState<ComponentType | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void import('./StatsSection').then((mod) => setStatsSection(() => mod.StatsSection));
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealSection id="data" className={`${sectionY} bg-slate-900/30 border-y border-white/5`}>
      <div ref={ref}>{StatsSection ? <StatsSection /> : <StatsFallback />}</div>
    </RevealSection>
  );
}
