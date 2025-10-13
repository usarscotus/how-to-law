import type { PropsWithChildren } from 'react';

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ProgressRing({ value, size = 72, strokeWidth = 8, label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <figure className="inline-flex flex-col items-center justify-center" aria-label={label ?? 'Progress ring'}>
      <svg width={size} height={size} className="text-muted">
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          opacity={0.2}
        />
        <circle
          stroke="var(--accent)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-foreground text-sm font-semibold"
        >
          {Math.round(value)}%
        </text>
      </svg>
      {label ? <figcaption className="mt-2 text-xs text-muted">{label}</figcaption> : null}
    </figure>
  );
}

interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="w-full">
      {label ? <p className="mb-1 text-xs uppercase tracking-wide text-muted">{label}</p> : null}
      <div className="h-2 w-full rounded-full bg-border/60">
        <div
          className="h-2 rounded-full bg-accent transition-all"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          role="progressbar"
          aria-valuenow={Math.round(value)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export default function ProgressSummary({ children }: PropsWithChildren) {
  return (
    <section className="not-prose flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-subtle">
      {children}
    </section>
  );
}
