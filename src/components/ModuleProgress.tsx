import { useEffect, useState } from 'react';
import { getProgress } from '../lib/progress';

export default function ModuleProgress({ lessonIds, size = 72 }: { lessonIds: string[]; size?: number }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    function compute() {
      const store = getProgress();
      if (!lessonIds.length) {
        setPercentage(0);
        return;
      }
      const total = lessonIds.length;
      const completed = lessonIds.filter((id) => store.lessons[id]?.completed).length;
      setPercentage(Math.round((completed / total) * 100));
    }
    compute();
    const listener = () => compute();
    window.addEventListener('lesson-progress', listener);
    return () => window.removeEventListener('lesson-progress', listener);
  }, [lessonIds]);

  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} role="img" aria-label="Module completion ring">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--muted)" strokeWidth={6} fill="transparent" opacity={0.2} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--accent)"
        strokeWidth={6}
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
        className="fill-foreground text-base font-semibold"
      >
        {percentage}%
      </text>
    </svg>
  );
}
