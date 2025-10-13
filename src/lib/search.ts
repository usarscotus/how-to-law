export type SearchDocument = {
  id: string;
  type: 'lesson' | 'glossary';
  title: string;
  url: string;
  module: string;
  tags: string[];
  textSnippet: string;
};

export const SEARCH_INDEX_PATH = '/how-to-law/search-index.json';

export const SYNONYMS: Record<string, string> = {
  pc: 'probable cause',
  scotus: 'Supreme Court',
  constitution: 'Constitution'
};

export function expandQuery(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return '';
  const parts = normalized.split(/\s+/);
  const expanded = parts.flatMap((part) => {
    const synonym = SYNONYMS[part];
    return synonym ? [part, synonym] : [part];
  });
  return Array.from(new Set(expanded)).join(' ');
}

export function highlightMatches(text: string, query: string) {
  if (!query) return text;
  const escaped = query
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  if (!escaped) return text;
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

export async function fetchSearchDocuments(signal?: AbortSignal): Promise<SearchDocument[]> {
  const response = await fetch(SEARCH_INDEX_PATH, { credentials: 'omit', signal });
  if (!response.ok) {
    throw new Error(`Search index request failed: ${response.status}`);
  }
  return (await response.json()) as SearchDocument[];
}
