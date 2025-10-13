import { useEffect, useMemo, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ExternalLink } from 'lucide-react';
import { getGlossaryTerm } from '~/lib/utils';

interface TermPopoverProps {
  id: string;
  children: string | string[];
}

const STORAGE_KEY = 'htl:term-open';

export default function TermPopover({ id, children }: TermPopoverProps) {
  const term = useMemo(() => getGlossaryTerm(id), [id]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, id);
    } catch (error) {
      console.debug('term session storage unavailable', error);
    }
  }, [open, id]);

  if (!term) {
    return <span>{children}</span>;
  }

  const display = Array.isArray(children) ? children.join('') : children;

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal={false}>
      <Popover.Trigger
        asChild
        aria-describedby={`${id}-definition`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <button
          type="button"
          className="relative inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-medium text-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
        >
          <span className="underline decoration-dotted underline-offset-2">{display}</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="center"
          collisionPadding={16}
          className="z-50 w-72 rounded-2xl border border-border bg-card p-4 text-left text-sm shadow-subtle focus:outline-none"
          onCloseAutoFocus={(event) => {
            if (event) {
              event.preventDefault();
            }
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Glossary</p>
              <h3 className="mt-1 text-base font-semibold text-foreground">{term.term}</h3>
            </div>
            <Popover.Close
              className="rounded-full p-1 text-muted transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close glossary definition"
            >
              ×
            </Popover.Close>
          </div>
          <p id={`${id}-definition`} className="mt-3 text-sm leading-relaxed text-foreground">
            {term.def}
          </p>
          <a
            href={`/how-to-law/glossary/#${term.id}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            Read more
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
