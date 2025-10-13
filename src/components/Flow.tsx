import type { PropsWithChildren, ReactNode } from 'react';

export interface FlowStep {
  title: string;
  description: ReactNode;
}

interface FlowProps {
  title?: string;
  steps: FlowStep[];
}

export default function Flow({ title, steps }: PropsWithChildren<FlowProps>) {
  return (
    <section className="not-prose mt-8 rounded-2xl border border-border bg-card p-6 shadow-subtle">
      {title ? (
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <span className="text-xs uppercase tracking-wide text-muted">Process</span>
        </header>
      ) : null}
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
              {index + 1}
            </span>
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-foreground">{step.title}</h4>
              <div className="text-sm text-foreground/90">{step.description}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
