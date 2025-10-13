import fs from 'node:fs/promises';
import { visit } from 'unist-util-visit';

const cache = {
  regex: null,
  map: null
};

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildPattern(term) {
  return term
    .trim()
    .split(/\s+/)
    .map((part) => escapeRegExp(part))
    .join('\\s+');
}

async function loadTerms() {
  if (cache.regex && cache.map) {
    return cache;
  }
  try {
    const glossaryUrl = new URL('../content/glossary/terms.json', import.meta.url);
    const raw = await fs.readFile(glossaryUrl, 'utf-8');
    const terms = JSON.parse(raw);
    const patterns = [];
    const termMap = new Map();

    for (const entry of terms) {
      if (!entry?.term || !entry?.id) continue;
      const normalized = entry.term.toLowerCase().replace(/\s+/g, ' ').trim();
      if (!normalized) continue;
      patterns.push(buildPattern(entry.term));
      termMap.set(normalized, entry.id);
      if (Array.isArray(entry.aliases)) {
        for (const alias of entry.aliases) {
          const aliasNormalized = alias.toLowerCase().replace(/\s+/g, ' ').trim();
          if (!aliasNormalized) continue;
          patterns.push(buildPattern(alias));
          termMap.set(aliasNormalized, entry.id);
        }
      }
    }

    if (!patterns.length) {
      cache.regex = null;
      cache.map = termMap;
      return cache;
    }

    cache.regex = new RegExp(`\\b(${patterns.join('|')})\\b`, 'gi');
    cache.map = termMap;
    return cache;
  } catch (error) {
    console.warn('remark-terms: unable to load glossary terms', error);
    cache.regex = null;
    cache.map = new Map();
    return cache;
  }
}

export default function remarkTerms() {
  return async (tree) => {
    const { regex, map } = await loadTerms();
    if (!regex || !map?.size) {
      return;
    }

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      if (
        parent.type === 'link' ||
        parent.type === 'inlineCode' ||
        parent.type === 'code' ||
        parent.type === 'mdxJsxTextElement' ||
        parent.type === 'mdxJsxFlowElement'
      ) {
        return;
      }

      const value = node.value;
      if (!value || !regex.test(value)) {
        regex.lastIndex = 0;
        return;
      }

      regex.lastIndex = 0;
      const segments = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(value)) !== null) {
        const start = match.index;
        const matched = match[0];
        const normalized = matched.toLowerCase().replace(/\s+/g, ' ').trim();
        const termId = map.get(normalized);
        if (!termId) {
          continue;
        }
        if (start > lastIndex) {
          segments.push({ type: 'text', value: value.slice(lastIndex, start) });
        }
        segments.push({
          type: 'mdxJsxTextElement',
          name: 'Term',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'id',
              value: termId
            }
          ],
          children: [{ type: 'text', value: matched }]
        });
        lastIndex = start + matched.length;
      }

      if (segments.length) {
        if (lastIndex < value.length) {
          segments.push({ type: 'text', value: value.slice(lastIndex) });
        }
        parent.children.splice(index, 1, ...segments);
        return index + segments.length;
      }
    });
  };
}
