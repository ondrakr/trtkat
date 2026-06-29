import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Heart,
  HeartHandshake,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
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

type Phase = 'playing' | 'done';

function interpolate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}

export function StatsQuiz() {
  const { t } = useI18n();
  const quiz = t.data.quiz;
  const questions = quiz.questions;

  const [phase, setPhase] = useState<Phase>('playing');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(questions.length).fill(null));

  const current = questions[index];
  const picked = answers[index];
  const revealed = picked !== null;
  const isCorrect = picked === current?.correctIndex;
  const progress = ((index + (revealed ? 1 : 0)) / questions.length) * 100;
  const CategoryIcon = current ? CATEGORY_ICONS[current.category] : Heart;

  const score = useMemo(
    () => answers.reduce((sum, ans, i) => (ans === questions[i]?.correctIndex ? sum + 1 : sum), 0),
    [answers, questions],
  );

  const scoreMessage = useMemo(() => {
    const ratio = score / questions.length;
    if (ratio >= 0.875) return quiz.scorePerfect;
    if (ratio >= 0.5) return quiz.scoreGood;
    return quiz.scoreLow;
  }, [score, questions.length, quiz]);

  function reset() {
    setPhase('playing');
    setIndex(0);
    setAnswers(Array(questions.length).fill(null));
  }

  function pick(optionIndex: number) {
    if (revealed || !current) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  }

  function goPrev() {
    if (index > 0) setIndex((i) => i - 1);
  }

  function goNext() {
    if (!revealed) return;
    if (index >= questions.length - 1) {
      setPhase('done');
      return;
    }
    setIndex((i) => i + 1);
  }

  if (phase === 'done') {
    return (
      <div className="w-full">
        <div className="quiz-score-enter relative overflow-hidden rounded-3xl md:rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-trtkat-blue/10 via-slate-950/90 to-trtkat-pink/10 p-8 sm:p-10 md:p-12 text-center shadow-2xl">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-trtkat-pink/20 blur-3xl" />
          <p className="relative text-xs font-black uppercase tracking-wider text-trtkat-blue mb-2">{quiz.scoreTitle}</p>
          <p className="relative text-5xl sm:text-6xl md:text-7xl font-black text-white mb-2">
            {score}
            <span className="text-2xl sm:text-3xl text-slate-500">/{questions.length}</span>
          </p>
          <p className="relative text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed">{scoreMessage}</p>
          <button
            type="button"
            onClick={reset}
            className="relative inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-black text-white hover:bg-white/10 hover:border-white/25 transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            {quiz.tryAgain}
          </button>
        </div>
        <StatsDataExplore />
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -inset-px rounded-3xl md:rounded-[2.5rem] bg-gradient-to-r from-trtkat-blue/20 via-transparent to-trtkat-pink/20 opacity-60" />

      <div className="relative flex min-h-[580px] sm:min-h-[560px] flex-col rounded-3xl md:rounded-[2.5rem] border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-sm">
        <div className="px-5 sm:px-8 md:px-10 pt-5 sm:pt-6">
          <div className="mb-4 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-trtkat-gradient transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              <CategoryIcon className="h-3.5 w-3.5 text-trtkat-blue" />
              {quiz.categoryLabels[current.category]}
            </span>
            <span className="text-xs font-bold tabular-nums text-slate-500">
              {interpolate(quiz.progress, { current: index + 1, total: questions.length })}
            </span>
          </div>
        </div>

        <div key={index} className="quiz-enter flex flex-1 flex-col px-5 sm:px-8 md:px-10 pb-5 sm:pb-6 md:pb-8">
          <h3 className="mt-5 sm:mt-6 min-h-[4.5rem] sm:min-h-[5rem] text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug text-balance">
            {current.question}
          </h3>

          <div className="mt-6 sm:mt-8 grid gap-3 sm:grid-cols-2">
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
                  style={{ animationDelay: `${optionIndex * 50}ms` }}
                  className={cn(
                    'quiz-option-enter relative text-left rounded-2xl border px-4 py-4 sm:py-5 font-bold text-sm sm:text-base transition-[border-color,background-color,transform,box-shadow] duration-300',
                    state === 'idle' &&
                      'border-white/10 bg-white/[0.03] text-slate-200 hover:border-trtkat-blue/50 hover:bg-white/[0.07] hover:shadow-[0_0_24px_rgba(79,179,240,0.12)] active:scale-[0.99]',
                    state === 'correct' &&
                      'border-emerald-400/60 bg-emerald-500/15 text-white shadow-[0_0_24px_rgba(52,211,153,0.15)]',
                    state === 'wrong' && 'border-red-400/50 bg-red-500/10 text-white',
                    state === 'missed' && 'border-white/5 bg-white/[0.02] text-slate-500 opacity-50',
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span>{option}</span>
                    {state === 'correct' && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />}
                    {state === 'wrong' && <XCircle className="h-5 w-5 text-red-400 shrink-0" />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8 h-[11.5rem] sm:h-[11rem] shrink-0">
            {revealed ? (
              <div
                className={cn(
                  'quiz-reveal-enter h-full overflow-y-auto rounded-2xl border p-5 sm:p-6',
                  isCorrect ? 'border-emerald-400/30 bg-emerald-500/5' : 'border-trtkat-pink/30 bg-trtkat-pink/5',
                )}
              >
                <p className={cn('font-black text-sm mb-2', isCorrect ? 'text-emerald-400' : 'text-trtkat-pink')}>
                  {isCorrect ? quiz.correct : quiz.wrong}
                </p>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {quiz.reality}
                </p>
                <p className="text-2xl sm:text-3xl font-black text-white mb-2">{current.answer}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{current.explanation}</p>
              </div>
            ) : (
              <p className="flex h-full items-center justify-center text-center text-sm text-slate-600 px-4">
                {quiz.pickHint}
              </p>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5 sm:pt-6">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-all',
                index === 0
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white hover:bg-white/5',
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              {quiz.prev}
            </button>

            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === index
                      ? 'w-6 bg-trtkat-gradient'
                      : i < index
                        ? 'w-1.5 bg-trtkat-pink/70'
                        : 'w-1.5 bg-white/15',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={!revealed}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-black transition-all',
                revealed
                  ? 'bg-trtkat-gradient text-white shadow-[0_0_20px_rgba(240,98,161,0.25)] hover:opacity-90'
                  : 'text-slate-600 cursor-not-allowed',
              )}
            >
              {index >= questions.length - 1 ? quiz.finish : quiz.next}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
