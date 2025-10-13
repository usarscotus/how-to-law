import { useEffect, useState } from 'react';
import { clamp } from '../lib/utils';
import { getLessonProgress } from '../lib/progress';

type ProgressBarProps = {
  lessonId: string;
  label?: string;
};

export function ProgressBar({ lessonId, label = 'Lesson progress' }: ProgressBarProps) {
  const [value, setValue] = useState(() => getLessonProgress(lessonId)?.score ?? 0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    function handleUpdate(event: Event) {
      const detail = (event as CustomEvent).detail as { lessonId: string; score: number; total: number };
      if (detail.lessonId === lessonId) {
        setValue(detail.score);
        setTotal(detail.total);
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('lesson-progress', handleUpdate);
      const stored = getLessonProgress(lessonId);
      if (stored?.score !== undefined) {
        setValue(stored.score);
      }
      if (stored?.total !== undefined) {
        setTotal(stored.total);
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('lesson-progress', handleUpdate);
      }
    };
  }, [lessonId]);

  const percentage = total > 0 ? Math.round((value / total) * 100) : value;

  return (
    <div>
      <div className="flex items-center justify-between text-sm font-medium text-muted">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-muted/30">
        <div
          className="h-2 rounded-full bg-accent transition-all duration-300"
          style={{ width: `${clamp(percentage, 0, 100)}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        />
      </div>
    </div>
  );
}

type ProgressRingProps = {
  lessonId: string;
  size?: number;
  stroke?: number;
};

export function ProgressRing({ lessonId, size = 64, stroke = 6 }: ProgressRingProps) {
  const [value, setValue] = useState(() => getLessonProgress(lessonId)?.score ?? 0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    function handleUpdate(event: Event) {
      const detail = (event as CustomEvent).detail as { lessonId: string; score: number; total: number };
      if (detail.lessonId === lessonId) {
        setValue(detail.score);
        setTotal(detail.total);
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('lesson-progress', handleUpdate);
      const stored = getLessonProgress(lessonId);
      if (stored?.score !== undefined) {
        setValue(stored.score);
      }
      if (stored?.total !== undefined) {
        setTotal(stored.total);
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('lesson-progress', handleUpdate);
      }
    };
  }, [lessonId]);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = total > 0 ? Math.min(1, value / total) : 0;
  const offset = circumference - percentage * circumference;

  return (
    <svg width={size} height={size} role="img" aria-label="Lesson completion ring">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--muted)"
        strokeWidth={stroke}
        fill="transparent"
        opacity={0.2}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--accent)"
        strokeWidth={stroke}
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 300ms ease-out' }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-foreground text-sm font-semibold"
      >
        {Math.round(percentage * 100)}%
      </text>
    </svg>
  );
}
