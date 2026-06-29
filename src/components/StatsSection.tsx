import { Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { sectionWrap, sectionY } from '../lib/navigation';
import { RevealSection } from './RevealSection';
import { StatsQuiz } from './StatsQuiz';

function DataSourceInfo() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <span ref={ref} className="relative inline-flex align-middle ml-1.5 -mt-0.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-trtkat-pink hover:border-trtkat-pink/40 hover:bg-trtkat-pink/10 transition-all"
        aria-label={t.data.sourceLabel}
        aria-expanded={open}
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {open && (
        <span
          role="tooltip"
          className="quiz-popover absolute left-1/2 top-full z-20 mt-2 block w-64 sm:w-72 rounded-xl border border-white/10 bg-slate-900/95 p-4 text-left text-xs leading-relaxed text-slate-300 shadow-2xl backdrop-blur-md"
        >
          <span className="mb-1 block font-bold text-white">{t.data.sourceLabel}</span>
          {t.data.sourceText}
        </span>
      )}
    </span>
  );
}

export function StatsSection() {
  const { t } = useI18n();

  return (
    <RevealSection id="data" className={`${sectionY} bg-slate-900/30 border-y border-white/5`}>
      <div className={sectionWrap}>
        <div className="mb-8 sm:mb-10 md:mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight">
            {t.data.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 inline-flex flex-wrap items-center justify-center gap-x-1">
            <span className="md:hidden">{t.data.introMobile}</span>
            <span className="hidden md:inline">{t.data.introDesktop}</span>
            <DataSourceInfo />
          </p>
        </div>

        <StatsQuiz />
      </div>
    </RevealSection>
  );
}
