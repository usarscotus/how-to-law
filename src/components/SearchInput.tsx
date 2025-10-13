import { useEffect, useMemo, useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import FlexSearch from 'flexsearch';
import { groupByType, loadSearchIndex, type SearchDoc } from '../lib/search';

const documentIndex: any = new (FlexSearch as any).Document({
  tokenize: 'forward',
  document: {
    id: 'id',
    index: ['title', 'textSnippet', 'tags'],
    store: ['id', 'title', 'textSnippet', 'url', 'tags', 'type']
  }
});

let seeded = false;

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchDoc[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function seed() {
      if (seeded) return;
      setLoading(true);
      const docs = await loadSearchIndex();
      docs.forEach((doc) => documentIndex.add(doc));
      seeded = true;
      setLoading(false);
    }
    seed();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const matched = documentIndex.search({ query, limit: 10, enrich: true }) as Array<any>;
    const unique = new Map<string, SearchDoc>();
    matched.forEach((group) => {
      group.result?.forEach((item: any) => {
        const doc = item.doc as SearchDoc | undefined;
        if (doc && !unique.has(doc.id)) {
          unique.set(doc.id, doc);
        }
      });
    });
    setResults(Array.from(unique.values()));
  }, [query]);

  const grouped = useMemo(() => groupByType(results), [results]);

  return (
    <div className="space-y-4">
      <label htmlFor="global-search" className="block text-sm font-medium text-muted">
        Search lessons & glossary
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          id="global-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={loading ? 'Loading index…' : 'Search by topic, term, or module'}
          className="w-full rounded-full border border-muted/60 bg-background/80 px-10 py-3 text-base shadow-subtle placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/60"
          aria-label="Search How to Law"
        />
      </div>
      {query && results.length === 0 && !loading && (
        <p className="text-sm text-muted">No results yet. Try different keywords or check spelling.</p>
      )}
      <div className="space-y-6">
        {Object.entries(grouped).map(([type, docs]) => (
          <section key={type} aria-label={`${type} results`} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{type}</h3>
            <ul className="space-y-2">
              {docs.map((doc) => (
                <li key={doc.id}>
                  <a
                    href={doc.url}
                    className="flex items-center justify-between rounded-xl border border-muted/50 bg-card/70 p-4 text-left transition hover:border-accent"
                  >
                    <div>
                      <p className="text-base font-semibold text-foreground">{doc.title}</p>
                      <p className="mt-1 text-sm text-muted">{doc.textSnippet}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
