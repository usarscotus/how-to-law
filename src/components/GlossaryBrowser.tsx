import { useMemo, useState } from 'react';
import terms from '../content/glossary/terms.json';

export default function GlossaryBrowser() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return terms;
    const q = query.toLowerCase();
    return terms.filter((term) => term.term.toLowerCase().includes(q) || term.def.toLowerCase().includes(q));
  }, [query]);

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, typeof terms>>((acc, term) => {
      const letter = term.term[0]?.toUpperCase() ?? '#';
      acc[letter] = acc[letter] ?? [];
      acc[letter].push(term);
      return acc;
    }, {});
  }, [filtered]);

  const letters = useMemo(() => Object.keys(grouped).sort(), [grouped]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-muted/40 bg-card/80 p-5 shadow-subtle">
        <label htmlFor="glossary-filter" className="block text-sm font-medium text-muted">
          Filter terms
        </label>
        <input
          id="glossary-filter"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type to filter definitions"
          className="mt-2 w-full rounded-full border border-muted/50 bg-background/70 px-4 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/60"
        />
      </div>
      <nav className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-muted">
        {letters.map((letter) => (
          <a key={letter} href={`#${letter}`} className="rounded-full border border-muted/30 px-2 py-1 hover:border-accent">
            {letter}
          </a>
        ))}
      </nav>
      <div className="space-y-12">
        {letters.map((letter) => (
          <section key={letter} id={letter} className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground">{letter}</h2>
            <dl className="mt-4 space-y-6">
              {grouped[letter].map((term) => (
                <div key={term.id} id={term.id} className="rounded-2xl border border-muted/30 bg-card/70 p-5 shadow-subtle">
                  <dt className="text-lg font-semibold text-foreground">{term.term}</dt>
                  <dd className="mt-2 text-sm text-muted">{term.def}</dd>
                  {term.cite && <p className="mt-2 text-xs text-muted">Source: {term.cite}</p>}
                  <a href={`/how-to-law/search/?q=${encodeURIComponent(term.term)}`} className="mt-3 inline-block text-xs font-semibold text-accent hover:underline">
                    Find lessons
                  </a>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
