import { ArrowRight, Clock, History } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';

function formatPeriod(period: string) {
  if (period.includes('→')) {
    const [from, to] = period.split('→').map((part) => part.trim());
    return { from, to };
  }
  return { from: period.trim(), to: null };
}

export function StatsTimeline() {
  const { t } = useI18n();

  return (
    <section className="mt-4 glass-card rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.15em] text-trtkat-blue mb-2 flex items-center gap-2">
            <History className="h-4 w-4" />
            {t.data.timelineAccordion}
          </p>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">{t.data.timelineTitle}</h3>
        </div>
      </div>

      <div className="relative">
        <div
          className="hidden md:block absolute top-[1.125rem] left-[4.5rem] right-[4.5rem] h-0.5 bg-gradient-to-r from-trtkat-pink/40 via-trtkat-blue/40 to-trtkat-pink/40"
          aria-hidden="true"
        />

        <ol className="grid gap-6 md:grid-cols-3 md:gap-4 lg:grid-cols-6 lg:gap-3">
          {t.data.timeline.map((item, index) => {
            const { from, to } = formatPeriod(item.period);
            return (
            <li key={`${item.period}-${item.label}`} className="relative flex md:flex-col md:items-center md:text-center">
              <div className="flex md:flex-col md:items-center gap-4 md:gap-3 w-full">
                <div className="relative z-10 shrink-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-trtkat-pink/50 bg-slate-950 shadow-[0_0_16px_rgba(240,98,161,0.25)]">
                    <Clock className="h-4 w-4 text-trtkat-pink" />
                  </div>
                  {index < t.data.timeline.length - 1 && (
                    <div className="md:hidden absolute left-1/2 top-full h-6 w-0.5 -translate-x-1/2 bg-gradient-to-b from-trtkat-pink/50 to-trtkat-blue/50" />
                  )}
                </div>

                <div className="flex-1 min-w-0 glass-subtle rounded-2xl p-4 md:p-3 lg:p-4 hover:border-white/15 transition-colors">
                  <time className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-trtkat-blue">
                    {from}
                    {to && (
                      <>
                        <ArrowRight className="h-3 w-3 opacity-70" />
                        {to}
                      </>
                    )}
                  </time>
                  <p className="mt-2 text-sm font-bold text-white leading-snug">{item.label}</p>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">{item.value}</p>
                </div>
              </div>
            </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-8 text-xs text-slate-500 border-t border-white/5 pt-5">
        {t.data.sourceLabel}: {t.data.sourceText}
      </p>
    </section>
  );
}
