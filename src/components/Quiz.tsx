import { useEffect, useMemo, useState } from 'react';

export interface QuizChoice {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  choices: QuizChoice[];
  answer: string;
  explanation: string;
}

interface QuizProps {
  id: string;
  title?: string;
  questions: QuizQuestion[];
}

const STORAGE_KEY_PREFIX = 'htl:quiz:';

export default function Quiz({ id, title = 'Knowledge Check', questions }: QuizProps) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${id}`);
      if (stored) {
        setBestScore(Number.parseInt(stored, 10));
      }
    } catch (error) {
      console.warn('Unable to read quiz score', error);
    }
  }, [id]);

  const totalQuestions = questions.length;

  const score = useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce((count, question) => {
      return count + (responses[question.id] === question.answer ? 1 : 0);
    }, 0);
  }, [submitted, questions, responses]);

  useEffect(() => {
    if (!submitted) return;
    if (score <= bestScore) return;
    setBestScore(score);
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${id}`, String(score));
    } catch (error) {
      console.warn('Unable to store quiz score', error);
    }
  }, [submitted, score, bestScore, id]);

  const handleSelect = (questionId: string, choiceId: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetry = () => {
    setResponses({});
    setSubmitted(false);
  };

  return (
    <section className="not-prose mt-12 rounded-2xl border border-border bg-card p-6 shadow-subtle">
      <header className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted">
          Best score: {bestScore}/{totalQuestions}
        </p>
      </header>
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        {questions.map((question, index) => {
          const selected = responses[question.id];
          const isCorrect = selected === question.answer;
          return (
            <fieldset key={question.id} className="space-y-3">
              <legend className="text-base font-semibold text-foreground">
                {index + 1}. {question.prompt}
              </legend>
              <div className="space-y-2">
                {question.choices.map((choice) => {
                  const inputId = `${id}-${question.id}-${choice.id}`;
                  const checked = selected === choice.id;
                  const highlight =
                    submitted && choice.id === question.answer
                      ? 'border-emerald-400/60 bg-emerald-500/10'
                      : checked
                        ? 'border-accent/60 bg-accent/10'
                        : 'border-border bg-card';
                  return (
                    <label
                      key={choice.id}
                      htmlFor={inputId}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition focus-within:ring-2 focus-within:ring-accent ${highlight}`}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name={question.id}
                        value={choice.id}
                        checked={checked}
                        onChange={() => handleSelect(question.id, choice.id)}
                        className="mt-1 h-4 w-4 cursor-pointer accent-accent"
                      />
                      <span className="text-sm text-foreground/90">{choice.label}</span>
                    </label>
                  );
                })}
              </div>
              {submitted ? (
                <p
                  className={`rounded-xl border p-3 text-sm ${
                    isCorrect
                      ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200'
                      : 'border-amber-400/60 bg-amber-500/10 text-amber-700 dark:text-amber-200'
                  }`}
                >
                  {question.explanation}
                </p>
              ) : null}
            </fieldset>
          );
        })}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-subtle transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Check answers
          </button>
          {submitted ? (
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition hover:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Try again
            </button>
          ) : null}
          {submitted ? (
            <span className="text-sm font-medium text-foreground">
              Score: {score}/{totalQuestions}
            </span>
          ) : null}
        </div>
      </form>
    </section>
  );
}
