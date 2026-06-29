import { useMemo, useRef, useState, type TouchEvent } from 'react';
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

const SWIPE_THRESHOLD = 48;

type Phase = 'playing' | 'done';

function interpolate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}

function useSwipeNavigation(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);

  function onTouchStart(e: TouchEvent) {
    start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function onTouchEnd(e: TouchEvent) {
    if (!start.current) return;
    const dx = e.changedTouches[0].clientX - start.current.x;
    const dy = e.changedTouches[0].clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return;
    if (dx > 0) onSwipeRight();
    else onSwipeLeft();
  }

  return { onTouchStart, onTouchEnd };
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
  const isLastQuestion = index >= questions.length - 1;

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
    if (isLastQuestion) {
      setPhase('done');
      return;
    }
    setIndex((i) => i + 1);
  }

  const swipe = useSwipeNavigation(goNext, goPrev);

  if (phase === 'done') {
    return (
      <div className="w-full min-w-0">
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
    <div className="relative w-full min-w-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-r from-trtkat-blue/20 via-transparent to-trtkat-pink/20 opacity-60" />

      <div className="relative flex min-h-[520px] sm:min-h-[500px] flex-col rounded-3xl md:rounded-[2.5rem] border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-sm overflow-hidden">
        <div className="px-4 sm:px-8 md:px-10 pt-4 sm:pt-6 min-w-0">
          <div className="mb-4 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-trtkat-gradient transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-3 min-w-0">
            <span className="inline-flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
              <CategoryIcon className="h-3.5 w-3.5 shrink-0 text-trtkat-blue" />
              <span className="truncate">{quiz.categoryLabels[current.category]}</span>
            </span>
            <span className="shrink-0 text-[10px] sm:text-xs font-bold tabular-nums text-slate-500">
              {interpolate(quiz.progress, { current: index + 1, total: questions.length })}
            </span>
          </div>
        </div>

        <div
          key={index}
          className="quiz-enter quiz-swipe-area flex flex-1 flex-col px-4 sm:px-8 md:px-10 pb-4 sm:pb-6 md:pb-8 min-w-0"
          onTouchStart={swipe.onTouchStart}
          onTouchEnd={swipe.onTouchEnd}
        >
          <h3 className="mt-4 sm:mt-6 min-h-[3.5rem] sm:min-h-[4.5rem] text-lg sm:text-2xl md:text-3xl font-black text-white leading-snug text-balance break-words">
            {current.question}
          </h3>

          <div className="mt-5 sm:mt-8 flex-1 min-h-[14rem] sm:min-h-[15rem] min-w-0">
            {!isRevealed ? (
              <div className="grid h-full gap-2.5 sm:gap-4 sm:grid-cols-2 min-w-0">
                {current.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => pick(optionIndex)}
                    style={{ animationDelay: `${optionIndex * 50}ms` }}
                    className="quiz-option-enter flex min-h-[4rem] sm:min-h-[5.5rem] items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 sm:px-6 sm:py-6 text-left font-bold text-sm sm:text-lg text-slate-200 break-words transition-[border-color,background-color,transform,box-shadow] duration-300 hover:border-trtkat-blue/50 hover:bg-white/[0.07] hover:shadow-[0_0_28px_rgba(79,179,240,0.14)] active:scale-[0.99]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div
                className={cn(
                  'quiz-reveal-enter flex h-full flex-col justify-center rounded-2xl sm:rounded-3xl border p-5 sm:p-8 md:p-10 min-w-0 overflow-y-auto',
                  showCorrect && 'border-emerald-400/40 bg-emerald-500/10 shadow-[0_0_40px_rgba(52,211,153,0.12)]',
                  showWrong && 'border-red-400/40 bg-red-500/10 shadow-[0_0_40px_rgba(248,113,113,0.1)]',
                )}
              >
                <div className="flex items-start gap-3 mb-3 sm:mb-4 min-w-0">
                  {showCorrect && <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400 shrink-0 mt-0.5" />}
                  {showWrong && <XCircle className="h-6 w-6 sm:h-7 sm:w-7 text-red-400 shrink-0 mt-0.5" />}
                  <p
                    className={cn(
                      'font-black text-sm sm:text-lg break-words',
                      showCorrect && 'text-emerald-400',
                      showWrong && 'text-red-400',
                    )}
                  >
                    {showCorrect ? quiz.correct : quiz.wrong}
                  </p>
                </div>

                {showWrong && picked !== null && (
                  <p className="text-sm text-slate-500 mb-3 line-through decoration-red-400/60 break-words">
                    {current.options[picked]}
                  </p>
                )}

                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {quiz.reality}
                </p>
                <p className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 break-words">
                  {current.answer}
                </p>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed break-words">{current.explanation}</p>
              </div>
            )}
          </div>

          <div className="mt-5 sm:mt-8 border-t border-white/10 pt-4 sm:pt-6 min-w-0">
            <div className="hidden sm:flex justify-center gap-1.5 mb-4">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === index ? 'w-6 bg-trtkat-gradient' : i < index ? 'w-1.5 bg-trtkat-pink/70' : 'w-1.5 bg-white/15',
                  )}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between sm:gap-4">
              <button
                type="button"
                onClick={goPrev}
                disabled={index === 0}
                aria-label={quiz.prev}
                className={cn(
                  'inline-flex items-center justify-center gap-1 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold transition-all min-w-0',
                  index === 0
                    ? 'text-slate-600 cursor-not-allowed'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 sm:border-transparent',
                )}
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <span className="truncate">{quiz.prev}</span>
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label={isLastQuestion ? quiz.finish : quiz.next}
                className="inline-flex items-center justify-center gap-1 rounded-xl bg-trtkat-gradient px-3 py-2.5 text-xs sm:text-sm font-black text-white shadow-[0_0_20px_rgba(240,98,161,0.25)] hover:opacity-90 transition-all min-w-0"
              >
                <span className="truncate sm:hidden">{isLastQuestion ? quiz.finishShort : quiz.next}</span>
                <span className="truncate hidden sm:inline">{isLastQuestion ? quiz.finish : quiz.next}</span>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
