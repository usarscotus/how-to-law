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

export default function ResumeProgress({ lessons }: Props) {
  const [target, setTarget] = useState<LessonRef | null>(null);

  useEffect(() => {
    const store = getProgress();
    const entries = Object.entries(store.lessons);
    if (!entries.length) return;
    const sorted = entries.sort((a, b) => b[1].updatedAt - a[1].updatedAt);
    const match = lessons.find((lesson) => lesson.id === sorted[0][0]);
    if (match) setTarget(match);
  }, [lessons]);

  if (!target) return null;

  return (
    <a
      href={target.url}
      className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent hover:bg-accent/20"
    >
      Resume "{target.title}" <ArrowRight className="h-4 w-4" />
    </a>
  );
}
