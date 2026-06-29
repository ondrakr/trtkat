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
  const [revealed, setRevealed] = useState<boolean[]>(() => Array(questions.length).fill(false));

  const current = questions[index];
  const picked = answers[index];
  const isRevealed = revealed[index];
  const isCorrect = picked === current?.correctIndex;
  const progress = ((index + 1) / questions.length) * 100;
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
    setRevealed(Array(questions.length).fill(false));
  }

  function pick(optionIndex: number) {
    if (isRevealed || !current) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
    setRevealed((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }

  function goPrev() {
    if (index > 0) setIndex((i) => i - 1);
  }

  function goNext() {
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

  const showCorrect = isRevealed && isCorrect;
  const showWrong = isRevealed && !isCorrect;

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -inset-px rounded-3xl md:rounded-[2.5rem] bg-gradient-to-r from-trtkat-blue/20 via-transparent to-trtkat-pink/20 opacity-60" />

      <div className="relative flex min-h-[520px] sm:min-h-[500px] flex-col rounded-3xl md:rounded-[2.5rem] border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-sm">
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
          <h3 className="mt-5 sm:mt-6 min-h-[4rem] sm:min-h-[4.5rem] text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug text-balance">
            {current.question}
          </h3>

          <div className="mt-6 sm:mt-8 flex-1 min-h-[16rem] sm:min-h-[15rem]">
            {!isRevealed ? (
              <div className="grid h-full gap-3 sm:gap-4 sm:grid-cols-2">
                {current.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => pick(optionIndex)}
                    style={{ animationDelay: `${optionIndex * 50}ms` }}
                    className="quiz-option-enter flex min-h-[4.5rem] sm:min-h-[5.5rem] items-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 sm:px-6 sm:py-6 text-left font-bold text-base sm:text-lg text-slate-200 transition-[border-color,background-color,transform,box-shadow] duration-300 hover:border-trtkat-blue/50 hover:bg-white/[0.07] hover:shadow-[0_0_28px_rgba(79,179,240,0.14)] active:scale-[0.99]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div
                className={cn(
                  'quiz-reveal-enter flex h-full flex-col justify-center rounded-2xl sm:rounded-3xl border p-6 sm:p-8 md:p-10',
                  showCorrect && 'border-emerald-400/40 bg-emerald-500/10 shadow-[0_0_40px_rgba(52,211,153,0.12)]',
                  showWrong && 'border-red-400/40 bg-red-500/10 shadow-[0_0_40px_rgba(248,113,113,0.1)]',
                )}
              >
                <div className="flex items-start gap-3 mb-4">
                  {showCorrect && <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400 shrink-0 mt-0.5" />}
                  {showWrong && <XCircle className="h-6 w-6 sm:h-7 sm:w-7 text-red-400 shrink-0 mt-0.5" />}
                  <p className={cn('font-black text-base sm:text-lg', showCorrect && 'text-emerald-400', showWrong && 'text-red-400')}>
                    {showCorrect ? quiz.correct : quiz.wrong}
                  </p>
                </div>

                {showWrong && picked !== null && (
                  <p className="text-sm text-slate-500 mb-3 line-through decoration-red-400/60">{current.options[picked]}</p>
                )}

                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {quiz.reality}
                </p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">{current.answer}</p>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-3xl">{current.explanation}</p>
              </div>
            )}
          </div>

          <div className="mt-6 sm:mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5 sm:pt-6">
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
              className="inline-flex items-center gap-1.5 rounded-xl bg-trtkat-gradient px-4 py-2.5 text-sm font-black text-white shadow-[0_0_20px_rgba(240,98,161,0.25)] hover:opacity-90 transition-all"
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
