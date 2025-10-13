import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { markPerfect, scoreLesson } from '../lib/progress';
import { cx } from '../lib/utils';

type QuizItem = {
  type: 'mc' | 'tf';
  q: string;
  choices?: string[];
  answer: number;
  explain: string;
};

type QuizProps = {
  items: QuizItem[];
  lessonId: string;
};

type ResultState = {
  selected: number | null;
  correct: boolean | null;
};

function seededShuffle<T>(values: T[], seed: string) {
  const arr = [...values];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = Math.imul(31, hash) + seed.charCodeAt(i);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.abs((hash + i) % (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Quiz({ items, lessonId }: QuizProps) {
  const questions = useMemo(() => {
    return items.map((item, index) => {
      const choices = item.type === 'tf' ? ['True', 'False'] : item.choices ?? [];
      const permuted = seededShuffle(
        choices.map((choice, choiceIndex) => ({ choice, choiceIndex })),
        `${lessonId}-${index}`
      );
      const answerIndex = permuted.findIndex((entry) => entry.choiceIndex === item.answer);
      return {
        ...item,
        choices: permuted.map((entry) => entry.choice),
        correctIndex: answerIndex
      };
    });
  }, [items, lessonId]);

  const [results, setResults] = useState<ResultState[]>(() =>
    questions.map(() => ({ selected: null, correct: null }))
  );
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => results.reduce((acc, item) => acc + (item.correct ? 1 : 0), 0),
    [results]
  );

  useEffect(() => {
    if (!submitted) return;
    scoreLesson(lessonId, score, questions.length);
    if (score === questions.length) {
      markPerfect(lessonId, questions.length);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('lesson-progress', {
          detail: { lessonId, score, total: questions.length }
        })
      );
    }
  }, [submitted, score, lessonId, questions.length]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newResults = results.map((result, index) => ({
      ...result,
      correct: result.selected === questions[index].correctIndex
    }));
    setResults(newResults);
    setSubmitted(true);
  }

  function resetQuiz() {
    setResults(questions.map(() => ({ selected: null, correct: null })));
    setSubmitted(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 space-y-6 rounded-2xl border border-muted/50 bg-card/70 p-6 shadow-subtle">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Check your understanding</h3>
        {submitted && (
          <div className="flex items-center gap-2 text-sm font-medium">
            {score === questions.length ? (
              <span className="inline-flex items-center gap-1 text-accent">
                <CheckCircle2 className="h-4 w-4" /> Perfect!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-muted">
                <XCircle className="h-4 w-4" /> {score}/{questions.length} correct
              </span>
            )}
          </div>
        )}
      </div>
      <fieldset className="space-y-8">
        <legend className="sr-only">Lesson quiz</legend>
        {questions.map((item, questionIndex) => (
          <div key={questionIndex} className="space-y-4">
            <p className="text-base font-medium text-foreground">{item.q}</p>
            <div className="space-y-3">
              {item.choices.map((choice, choiceIndex) => {
                const id = `${lessonId}-${questionIndex}-${choiceIndex}`;
                const selected = results[questionIndex]?.selected === choiceIndex;
                const isAnswer = choiceIndex === item.correctIndex;
                return (
                  <label
                    key={choiceIndex}
                    htmlFor={id}
                    className={cx(
                      'flex cursor-pointer items-center gap-3 rounded-xl border border-muted/60 bg-background/60 p-3 transition focus-within:ring-2 focus-within:ring-accent',
                      submitted && isAnswer && 'border-accent text-accent',
                      submitted && selected && !isAnswer && 'border-red-400 text-red-500'
                    )}
                  >
                    <input
                      id={id}
                      type="radio"
                      name={`question-${questionIndex}`}
                      className="sr-only"
                      value={choiceIndex}
                      onChange={() =>
                        setResults((prev) => {
                          const next = [...prev];
                          next[questionIndex] = { selected: choiceIndex, correct: null };
                          return next;
                        })
                      }
                      checked={selected}
                      disabled={submitted}
                    />
                    <span className="text-sm leading-relaxed">{choice}</span>
                  </label>
                );
              })}
            </div>
            {submitted && results[questionIndex]?.correct === false && (
              <p className="rounded-lg border border-orange-200 bg-orange-50/70 p-3 text-sm text-orange-800 dark:border-orange-900 dark:bg-orange-900/40 dark:text-orange-100">
                {item.explain}
              </p>
            )}
            {submitted && results[questionIndex]?.correct && (
              <p className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
                {item.explain}
              </p>
            )}
          </div>
        ))}
      </fieldset>
      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          disabled={submitted}
        >
          Submit answers
        </button>
        {submitted && (
          <button
            type="button"
            onClick={resetQuiz}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" /> Try again
          </button>
        )}
      </div>
    </form>
  );
}
