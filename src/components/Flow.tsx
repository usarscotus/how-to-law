import { ReactNode, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cx } from '../lib/utils';

type Step = {
  title: string;
  description: ReactNode;
};

type FlowProps = {
  steps: Step[];
  label?: string;
};

export default function Flow({ steps, label = 'Procedure flow' }: FlowProps) {
  const [active, setActive] = useState(0);

  return (
    <div aria-label={label} className="my-8 space-y-4 rounded-2xl border border-muted/60 bg-card/70 p-6 shadow-subtle">
      <div className="flex flex-wrap items-center gap-2" role="list">
        {steps.map((step, index) => (
          <button
            key={index}
            role="listitem"
            type="button"
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                setActive((prev) => (prev + 1) % steps.length);
              }
              if (event.key === 'ArrowLeft') {
                setActive((prev) => (prev - 1 + steps.length) % steps.length);
              }
            }}
            className={cx(
              'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              active === index
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-muted/60 bg-background/60 text-foreground hover:border-accent/60'
            )}
            aria-pressed={active === index}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              {index + 1}
            </span>
            {step.title}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-muted/50 bg-background/70 p-5 text-sm leading-relaxed">
        <header className="flex items-center gap-2 text-base font-semibold">
          <ChevronRight className="h-4 w-4" aria-hidden />
          {steps[active]?.title}
        </header>
        <div className="mt-2 text-muted">{steps[active]?.description}</div>
      </div>
    </div>
  );
}
