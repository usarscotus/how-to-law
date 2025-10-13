import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cx } from '../lib/utils';

type Link = {
  href: string;
  label: string;
};

type Props = {
  links: Link[];
};

export default function MobileNav({ links }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="inline-flex items-center justify-center rounded-full border border-muted/60 bg-card p-2 text-sm font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="sr-only">Toggle navigation</span>
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      <div
        id="mobile-nav"
        className={cx(
          'absolute left-4 right-4 top-20 z-40 origin-top rounded-2xl border border-muted/30 bg-card/95 p-4 shadow-subtle transition duration-200',
          open ? 'pointer-events-auto opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-3 text-base font-medium">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 hover:bg-accent/10"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
