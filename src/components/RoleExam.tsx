import { useEffect, useMemo, useState } from 'react';
import { ROLE_EXAMS, type RoleExam } from '~/lib/roleExams';

interface AreaBreakdown {
  area: string;
  correct: number;
  total: number;
}

const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

function calculateBreakdown(exam: RoleExam, responses: Record<string, string>) {
  const breakdownMap = new Map<string, { correct: number; total: number }>();
  exam.questions.forEach((question) => {
    const existing = breakdownMap.get(question.area) ?? { correct: 0, total: 0 };
    existing.total += 1;
    if (responses[question.id] === question.answer) {
      existing.correct += 1;
    }
    breakdownMap.set(question.area, existing);
  });
  return Array.from(breakdownMap.entries()).map(([area, stats]) => ({
    area,
    correct: stats.correct,
    total: stats.total
  }));
}

export default function RoleExam() {
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const selectedExam = useMemo(() => ROLE_EXAMS.find((exam) => exam.id === selectedExamId) ?? null, [selectedExamId]);

  useEffect(() => {
    const handleCopy = (event: ClipboardEvent | MouseEvent) => {
      event.preventDefault();
      if ('clipboardData' in event && event.clipboardData) {
        event.clipboardData.clearData();
        event.clipboardData.setData('text/plain', 'Copying is disabled during the assessment.');
      }
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('contextmenu', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('contextmenu', handleCopy);
    };
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    setResponses({});
    setShowResults(false);
    setValidationError(null);
  }, [selectedExamId]);

  const handleSelectExam = (examId: string) => {
    setSelectedExamId(examId);
  };

  const handleSelectChoice = (questionId: string, choiceId: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: choiceId }));
    setValidationError(null);
  };

  const handleNext = () => {
    if (!selectedExam) return;
    const question = selectedExam.questions[currentIndex];
    if (!responses[question.id]) {
      setValidationError('Select an option to continue.');
      return;
    }
    setCurrentIndex((prev) => Math.min(prev + 1, selectedExam.questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setValidationError(null);
  };

  const handleFinish = () => {
    if (!selectedExam) return;
    const unanswered = selectedExam.questions.filter((question) => !responses[question.id]);
    if (unanswered.length > 0) {
      setValidationError('Answer every question before finishing the assessment.');
      return;
    }
    setShowResults(true);
  };

  const handleRestart = () => {
    setResponses({});
    setCurrentIndex(0);
    setShowResults(false);
    setValidationError(null);
  };

  const handleChooseAnother = () => {
    setSelectedExamId(null);
    setResponses({});
    setCurrentIndex(0);
    setShowResults(false);
    setValidationError(null);
  };

  if (!selectedExam) {
    return (
      <section className="space-y-12">
        <header className="text-center space-y-4">
          <h2 className="text-3xl font-semibold text-foreground">Select a role-specific knowledge test</h2>
          <p className="mx-auto max-w-3xl text-base text-foreground/80">
            Choose the assessment that matches your desired courtroom role. Each test contains 30 scenario-driven questions
            covering the corresponding lessons. Progress is saved only during your current session to encourage focused study.
          </p>
        </header>
        <div className="grid gap-8 lg:grid-cols-2">
          {ROLE_EXAMS.map((exam) => (
            <article
              key={exam.id}
              className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-border bg-card/90 p-6 shadow-subtle transition hover:border-accent/60 hover:shadow-lg"
            >
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">{exam.subtitle}</p>
                <h3 className="text-xl font-semibold text-foreground">{exam.title}</h3>
                <p className="text-sm text-foreground/75">{exam.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {exam.focusAreas.map((area) => (
                    <li key={area} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs uppercase tracking-wide text-muted">30 questions · untimed · single attempt per session</p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectExam(exam.id)}
                className="w-full rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-subtle transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Start {exam.title}
              </button>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const totalQuestions = selectedExam.questions.length;
  const currentQuestion = selectedExam.questions[currentIndex];
  const selectedChoice = responses[currentQuestion.id];
  const progress = ((currentIndex + (selectedChoice ? 1 : 0)) / totalQuestions) * 100;

  const score = useMemo(() => {
    if (!showResults || !selectedExam) return 0;
    return selectedExam.questions.reduce((sum, question) => {
      return sum + (responses[question.id] === question.answer ? 1 : 0);
    }, 0);
  }, [responses, selectedExam, showResults]);

  const breakdown: AreaBreakdown[] = useMemo(() => {
    if (!showResults || !selectedExam) return [];
    return calculateBreakdown(selectedExam, responses);
  }, [responses, selectedExam, showResults]);

  return (
    <section className="space-y-10">
      <header className="flex flex-col gap-3 rounded-3xl border border-border bg-card/90 p-6 shadow-subtle lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{selectedExam.subtitle}</p>
          <h2 className="text-2xl font-semibold text-foreground">{selectedExam.title}</h2>
          <p className="text-sm text-foreground/75">{selectedExam.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleChooseAnother}
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Choose another test
          </button>
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Restart test
          </button>
        </div>
      </header>

      {!showResults ? (
        <div className="space-y-6 rounded-3xl border border-border bg-card/90 p-6 shadow-subtle">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted">
              <span>
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span>{currentQuestion.area}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-border/60">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{currentQuestion.prompt}</h3>
            <fieldset className="space-y-3">
              {currentQuestion.choices.map((choice) => {
                const inputId = `${selectedExam.id}-${currentQuestion.id}-${choice.id}`;
                const isChecked = selectedChoice === choice.id;
                return (
                  <label
                    key={choice.id}
                    htmlFor={inputId}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 text-sm transition focus-within:ring-2 focus-within:ring-accent ${
                      isChecked ? 'border-accent/60 bg-accent/10' : 'border-border bg-card'
                    }`}
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name={currentQuestion.id}
                      value={choice.id}
                      checked={isChecked}
                      onChange={() => handleSelectChoice(currentQuestion.id, choice.id)}
                      className="mt-1 h-4 w-4 cursor-pointer accent-accent"
                    />
                    <span className="text-foreground/90">{choice.label}</span>
                  </label>
                );
              })}
            </fieldset>
          </div>
          {validationError ? (
            <p className="rounded-2xl border border-amber-400/70 bg-amber-500/10 px-4 py-2 text-sm text-amber-700 dark:text-amber-200" role="alert">
              {validationError}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition disabled:cursor-not-allowed disabled:opacity-50 hover:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Previous
              </button>
              {currentIndex + 1 === totalQuestions ? (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-subtle transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Submit test
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-subtle transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Next question
                </button>
              )}
            </div>
            <p className="text-sm text-muted">
              Responses are not scored until you submit. You can navigate freely before finishing.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 rounded-3xl border border-border bg-card/90 p-6 shadow-subtle">
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold text-foreground">Assessment results</h3>
            <p className="text-sm text-foreground/80">
              You answered {score} of {totalQuestions} questions correctly.
            </p>
            <p className="text-base font-semibold text-foreground">
              Grade: {formatPercent(score / totalQuestions)}
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="min-w-full divide-y divide-border text-left text-sm">
              <thead className="bg-background/80 text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Area</th>
                  <th scope="col" className="px-4 py-3 font-medium">Correct</th>
                  <th scope="col" className="px-4 py-3 font-medium">Total</th>
                  <th scope="col" className="px-4 py-3 font-medium">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card/80">
                {breakdown.map((entry) => (
                  <tr key={entry.area} className="text-foreground/90">
                    <td className="px-4 py-3 font-medium">{entry.area}</td>
                    <td className="px-4 py-3">{entry.correct}</td>
                    <td className="px-4 py-3">{entry.total}</td>
                    <td className="px-4 py-3">{formatPercent(entry.total === 0 ? 0 : entry.correct / entry.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted">
            Review areas with lower percentages in the classroom modules before attempting another role or returning to practice.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-subtle transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Retake this test
            </button>
            <button
              type="button"
              onClick={handleChooseAnother}
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition hover:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Select a different test
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
