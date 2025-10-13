import { useEffect, useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { getLessonProgress, toggleLessonComplete } from '../lib/progress';

export default function LessonCompletion({ lessonId }: { lessonId: string }) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const stored = getLessonProgress(lessonId);
    if (stored?.completed) setCompleted(true);
    const listener = (event: Event) => {
      const detail = (event as CustomEvent).detail as { lessonId: string; score: number; total: number };
      if (detail.lessonId === lessonId && detail.score === detail.total) {
        setCompleted(true);
      }
    };
    window.addEventListener('lesson-progress', listener);
    return () => window.removeEventListener('lesson-progress', listener);
  }, [lessonId]);

  function handleToggle() {
    const next = !completed;
    const updated = toggleLessonComplete(lessonId, next);
    setCompleted(updated.completed);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center gap-2 rounded-full border border-muted/60 bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-pressed={completed}
    >
      {completed ? <CheckCircle className="h-4 w-4 text-accent" /> : <Circle className="h-4 w-4" />}
      {completed ? 'Marked complete' : 'Mark lesson complete'}
    </button>
  );
}
