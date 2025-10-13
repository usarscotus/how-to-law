import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getProgress } from '../lib/progress';

type LessonRef = {
  id: string;
  title: string;
  url: string;
};

type Props = {
  lessons: LessonRef[];
};

export default function ModuleContinue({ lessons }: Props) {
  const [target, setTarget] = useState<LessonRef | null>(null);

  useEffect(() => {
    const store = getProgress();
    const firstIncomplete = lessons.find((lesson) => !store.lessons[lesson.id]?.completed);
    setTarget(firstIncomplete ?? lessons[lessons.length - 1] ?? null);
  }, [lessons]);

  if (!target) return null;

  return (
    <a
      href={target.url}
      className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-4 py-2 text-sm font-semibold text-accent hover:border-accent hover:bg-accent/10"
    >
      Continue: {target.title}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}
