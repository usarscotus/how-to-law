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
  smj: 'subject-matter jurisdiction',
  pj: 'personal jurisdiction',
  jmol: 'judgment as a matter of law',
  jnov: 'judgment as a matter of law',
  scotus: 'Supreme Court',
  cert: 'certiorari',
  frcp: 'Federal Rules of Civil Procedure',
  frcrp: 'Federal Rules of Criminal Procedure',
  fre: 'Federal Rules of Evidence',
  'rule 404b': '404(b)'
};

export function expandQuery(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return '';
  let processed = normalized;
  const additionalTerms: string[] = [];
  const entries = Object.entries(SYNONYMS).sort((a, b) => b[0].length - a[0].length);
  for (const [rawKey, rawValue] of entries) {
    const key = rawKey.toLowerCase();
    const normalizedValue = rawValue.toLowerCase();
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedKey}\\b`, 'g');
    processed = processed.replace(regex, () => {
      additionalTerms.push(key, normalizedValue);
      return normalizedValue;
    });
  }
  const tokens = processed.split(/\s+/).filter(Boolean);
  const extras = additionalTerms.flatMap((term) => term.split(/\s+/).filter(Boolean));
  const unique = new Set<string>();
  tokens.forEach((token) => unique.add(token));
  extras.forEach((token) => unique.add(token));
  return Array.from(unique).join(' ');
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
