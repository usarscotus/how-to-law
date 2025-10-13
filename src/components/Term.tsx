import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import terms from '../content/glossary/terms.json';
import { cx } from '../lib/utils';

type TermProps = {
  id: string;
  className?: string;
};

const termMap = new Map(terms.map((entry) => [entry.id, entry]));

export default function Term({ id, className }: TermProps) {
  const entry = termMap.get(id);
  const [open, setOpen] = useState(false);
  const label = entry ? `${entry.term} definition` : 'Term definition';

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild aria-haspopup="dialog" aria-expanded={open} aria-controls={`${id}-definition`}>
        <button
          type="button"
          className={cx(
            'underline decoration-dotted underline-offset-4 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
            className
          )}
          aria-label={label}
        >
          {entry?.term ?? id}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="center"
          sideOffset={8}
          className="z-50 max-w-xs rounded-xl border border-muted/60 bg-card p-4 text-sm text-foreground shadow-subtle data-[state=open]:animate-fade"
          id={`${id}-definition`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
            <BookOpen className="h-4 w-4" aria-hidden />
            Term
          </div>
          <h4 className="mt-2 text-base font-semibold">{entry?.term ?? id}</h4>
          <p className="mt-2 leading-relaxed text-muted">{entry?.def ?? 'Definition coming soon.'}</p>
          {entry?.cite && <p className="mt-2 text-xs text-muted">Source: {entry.cite}</p>}
          <a
            href={`/how-to-law/glossary/#${id}`}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            onClick={() => setOpen(false)}
          >
            Learn more
          </a>
          <Popover.Arrow className="fill-card" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
