import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

function getMarkdownFiles(dir) {
  const entries = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      entries.push(...getMarkdownFiles(full));
    } else if (full.endsWith('.mdx') || full.endsWith('.md')) {
      entries.push(full);
    }
  }
  return entries;
}

function extractSummary(body) {
  const cleaned = body
    .replace(/import[^;]+;?/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.split('. ').slice(0, 2).join('. ').trim();
}

function buildSearchIndex(outDir) {
  const baseUrl = '/how-to-law';
  const lessonsDir = path.resolve('src/content/classroom');
  const glossaryPath = path.resolve('src/content/glossary/terms.json');
  const lessonDocs = getMarkdownFiles(lessonsDir).map((file) => {
    const raw = fs.readFileSync(file, 'utf-8');
    const parsed = matter(raw);
    const data = parsed.data ?? {};
    const slug = data.slug ?? path.basename(file, path.extname(file));
    const module = data.module ?? path.basename(path.dirname(file));
    const url = `${baseUrl}/classroom/${module}/${slug}/`;
    return {
      type: 'lesson',
      id: `${module}-${slug}`,
      title: data.title ?? slug,
      url,
      tags: data.tags ?? [],
      textSnippet: extractSummary(parsed.content)
    };
  });

  let glossaryDocs = [];
  if (fs.existsSync(glossaryPath)) {
    const glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf-8'));
    glossaryDocs = glossary.map((term) => ({
      type: 'glossary',
      id: term.id,
      title: term.term,
      url: `${baseUrl}/glossary/#${term.id}`,
      tags: term.tags ?? [],
      textSnippet: term.def
    }));
  }

  const searchData = [...lessonDocs, ...glossaryDocs];
  const outPath = path.join(outDir, 'search-index.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(searchData, null, 2));
}

const siteUrl = process.env.ASTRO_SITE ?? 'https://example.github.io/how-to-law';

export default defineConfig({
  site: siteUrl,
  base: '/how-to-law',
  trailingSlash: 'always',
  integrations: [react(), mdx(), tailwind({ applyBaseStyles: false }), sitemap()],
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const outDir = fileURLToPath(dir);
      buildSearchIndex(outDir);
      buildSearchIndex(path.resolve('public'));
    }
  }
});
