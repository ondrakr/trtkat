import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  HeartHandshake,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import type { StatsQuizQuestion } from '../i18n/translations/types';
import { cn } from '../lib/utils';
import { StatsDataExplore } from './StatsDataExplore';

const CATEGORY_ICONS: Record<StatsQuizQuestion['category'], LucideIcon> = {
  prvniseks: Heart,
  seznamovani: Users,
  vztahy: HeartHandshake,
  online: MonitorSmartphone,
  bezpeci: ShieldCheck,
};

type Phase = 'intro' | 'playing' | 'done';

function interpolate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}

export function StatsQuiz() {
  const { t } = useI18n();
  const quiz = t.data.quiz;
  const questions = quiz.questions;

  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const current = questions[index];
  const revealed = picked !== null;
  const isCorrect = picked === current?.correctIndex;
  const progress = ((index + (revealed ? 1 : 0)) / questions.length) * 100;
  const CategoryIcon = current ? CATEGORY_ICONS[current.category] : Sparkles;

  const scoreMessage = useMemo(() => {
    const ratio = score / questions.length;
    if (ratio >= 0.875) return quiz.scorePerfect;
    if (ratio >= 0.5) return quiz.scoreGood;
    return quiz.scoreLow;
  }, [score, questions.length, quiz]);

  function reset() {
    setPhase('intro');
    setIndex(0);
    setPicked(null);
    setScore(0);
  }

  function pick(optionIndex: number) {
    if (revealed || !current) return;
    setPicked(optionIndex);
    if (optionIndex === current.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function advance() {
    if (index >= questions.length - 1) {
      setPhase('done');
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  return (
    <>
      <div className="max-w-2xl mx-auto">
      {phase !== 'done' && (
        <div className="mb-6 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-trtkat-gradient transition-all duration-500 ease-out"
            style={{ width: `${phase === 'intro' ? 0 : progress}%` }}
          />
        </div>
      )}

      {phase === 'intro' && (
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-slate-950/80 p-8 sm:p-10 text-center shadow-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-trtkat-pink/30 bg-trtkat-pink/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-trtkat-pink mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            {quiz.badge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">{quiz.title}</h3>
          <p className="text-slate-400 mb-8 leading-relaxed">{quiz.intro}</p>
          <button
            type="button"
            onClick={() => setPhase('playing')}
            className="inline-flex items-center gap-2 rounded-2xl bg-trtkat-gradient px-8 py-4 text-base font-black text-white shadow-[0_0_32px_rgba(240,98,161,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            {quiz.startCta}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {phase === 'playing' && current && (
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <CategoryIcon className="h-4 w-4 text-trtkat-blue" />
              {quiz.categoryLabels[current.category]}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {interpolate(quiz.progress, { current: index + 1, total: questions.length })}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-snug mb-2">{current.question}</h3>
          <p className="text-sm text-slate-500 mb-6">{quiz.pickHint}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            {current.options.map((option, optionIndex) => {
              const isPick = picked === optionIndex;
              const isAnswer = optionIndex === current.correctIndex;
              let state: 'idle' | 'correct' | 'wrong' | 'missed' = 'idle';
              if (revealed) {
                if (isAnswer) state = 'correct';
                else if (isPick) state = 'wrong';
                else state = 'missed';
              }

              return (
                <button
                  key={option}
                  type="button"
                  disabled={revealed}
                  onClick={() => pick(optionIndex)}
                  className={cn(
                    'relative text-left rounded-2xl border px-4 py-4 font-bold text-sm sm:text-base transition-all',
                    state === 'idle' &&
                      'border-white/10 bg-white/[0.03] text-slate-200 hover:border-trtkat-blue/40 hover:bg-white/[0.06]',
                    state === 'correct' && 'border-emerald-400/50 bg-emerald-500/10 text-white',
                    state === 'wrong' && 'border-red-400/50 bg-red-500/10 text-white',
                    state === 'missed' && 'border-white/5 bg-white/[0.02] text-slate-500 opacity-60',
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    {option}
                    {state === 'correct' && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />}
                    {state === 'wrong' && <XCircle className="h-5 w-5 text-red-400 shrink-0" />}
                  </span>
                </button>
              );
            })}
          </div>

          {revealed && (
            <div
              className={cn(
                'mt-6 rounded-2xl border p-5 transition-all duration-300',
                isCorrect ? 'border-emerald-400/30 bg-emerald-500/5' : 'border-trtkat-pink/30 bg-trtkat-pink/5',
              )}
            >
              <p className={cn('font-black text-sm mb-3', isCorrect ? 'text-emerald-400' : 'text-trtkat-pink')}>
                {isCorrect ? quiz.correct : quiz.wrong}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{quiz.reality}</p>
              <p className="text-2xl sm:text-3xl font-black text-white mb-2">{current.answer}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{current.explanation}</p>
              <button
                type="button"
                onClick={advance}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-black text-white hover:bg-white/15 transition-colors"
              >
                {index >= questions.length - 1 ? quiz.finish : quiz.next}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <>
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-trtkat-blue/10 to-slate-950 p-8 sm:p-10 text-center shadow-2xl">
            <p className="text-xs font-black uppercase tracking-wider text-trtkat-blue mb-2">{quiz.scoreTitle}</p>
            <p className="text-5xl sm:text-6xl font-black text-white mb-2">
              {score}
              <span className="text-2xl text-slate-500">/{questions.length}</span>
            </p>
            <p className="text-slate-300 mb-6 max-w-md mx-auto leading-relaxed">{scoreMessage}</p>
            <p className="text-xs text-slate-500 mb-8">{quiz.sourceNote}</p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-black text-white hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              {quiz.tryAgain}
            </button>
          </div>
          <StatsDataExplore />
        </>
      )}
      </div>
    </>
  );
}
