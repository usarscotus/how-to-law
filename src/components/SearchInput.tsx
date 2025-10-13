import { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import FlexSearch from 'flexsearch';
import {
  expandQuery,
  fetchSearchDocuments,
  highlightMatches,
  type SearchDocument
} from '~/lib/search';

type EnrichedResult = {
  field: string;
  result: Array<{
    doc?: SearchDocument;
  }>;
};

type FlexDocument = {
  add: (id: string, doc: SearchDocument) => void;
  search: (query: string, options: { enrich: true }) => EnrichedResult[];
};

const FlexDocumentCtor = (FlexSearch as unknown as {
  Document: new (options: unknown) => FlexDocument;
}).Document;

function groupResults(docs: SearchDocument[]) {
  return docs.reduce<Record<'lesson' | 'glossary', SearchDocument[]>>(
    (acc, doc) => {
      acc[doc.type].push(doc);
      return acc;
    },
    { lesson: [], glossary: [] }
  );
}

export default function SearchInput() {
  const indexRef = useRef<FlexDocument>();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<SearchDocument[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const docs = await fetchSearchDocuments();
        if (cancelled) return;
        const documentIndex = new FlexDocumentCtor(
          {
            tokenize: 'forward',
            document: {
              id: 'id',
              store: true,
              index: [
                { field: 'title', weight: 9 },
                { field: 'tags', weight: 5 },
                { field: 'textSnippet', weight: 3 }
              ]
            }
          }
        );
        docs.forEach((doc) => documentIndex.add(doc.id, doc));
        indexRef.current = documentIndex;
      } catch (err) {
        console.error('Search index failed to load', err);
        if (!cancelled) setError('Unable to load search index.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const index = indexRef.current;
    const expanded = expandQuery(query);
    if (!index || !expanded) {
      setResults([]);
      return;
    }
    const hits = index.search(expanded, { enrich: true });
    const documents: SearchDocument[] = [];
    for (const fieldResult of hits) {
      fieldResult.result.forEach((entry) => {
        if (entry.doc) {
          documents.push(entry.doc);
        }
      });
    }
    const unique = new Map<string, SearchDocument>();
    documents.forEach((doc) => {
      if (!unique.has(doc.id)) {
        unique.set(doc.id, doc);
      }
    });
    setResults(Array.from(unique.values()));
  }, [query]);

  const grouped = useMemo(() => groupResults(results), [results]);
  const highlightQuery = useMemo(() => expandQuery(query), [query]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <label htmlFor="site-search" className="sr-only">
          Search the site
        </label>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          id="site-search"
          type="search"
          autoComplete="off"
          placeholder="Search lessons and glossary"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-full border border-border bg-card py-3 pl-12 pr-4 text-base text-foreground shadow-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>
      {loading ? <p className="text-sm text-muted">Loading search index…</p> : null}
      {error ? <p className="text-sm text-amber-600">{error}</p> : null}
      {!loading && !error && query && results.length === 0 ? (
        <p className="text-sm text-muted">No results for “{query}”. Try different keywords.</p>
      ) : null}
      {!loading && results.length > 0 ? (
        <div className="space-y-8">
          {(['lesson', 'glossary'] as const).map((type) => {
            const docs = grouped[type];
            if (!docs.length) return null;
            const heading = type === 'lesson' ? 'Lessons' : 'Glossary';
            return (
              <section key={type} aria-label={`${heading} results`} className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">{heading}</h2>
                <ul className="space-y-3">
                  {docs.map((doc) => (
                    <li key={doc.id}>
                      <a
                        href={doc.url}
                        className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 shadow-subtle transition hover:-translate-y-0.5 hover:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <p
                            className="text-base font-semibold text-foreground"
                            dangerouslySetInnerHTML={{ __html: highlightMatches(doc.title, highlightQuery) }}
                          />
                          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                            {doc.module}
                          </span>
                        </div>
                        <p
                          className="text-sm text-foreground/90"
                          dangerouslySetInnerHTML={{ __html: highlightMatches(doc.textSnippet, highlightQuery) }}
                        />
                        {doc.tags?.length ? (
                          <p className="text-xs uppercase tracking-wide text-muted">
                            {doc.tags.join(' · ')}
                          </p>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
