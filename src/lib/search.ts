export type SearchDoc = {
  type: 'lesson' | 'glossary';
  id: string;
  title: string;
  url: string;
  tags?: string[];
  textSnippet: string;
};

let cache: SearchDoc[] | null = null;

export async function loadSearchIndex() {
  if (cache) return cache;
  const res = await fetch('/how-to-law/search-index.json');
  if (!res.ok) {
    throw new Error('Failed to load search index');
  }
  const data = (await res.json()) as SearchDoc[];
  cache = data;
  return data;
}

export function groupByType(docs: SearchDoc[]) {
  return docs.reduce<Record<string, SearchDoc[]>>((acc, doc) => {
    if (!acc[doc.type]) acc[doc.type] = [];
    acc[doc.type].push(doc);
    return acc;
  }, {});
}
