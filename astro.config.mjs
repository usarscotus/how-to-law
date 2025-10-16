import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import matter from 'gray-matter';
import remarkTerms from './src/plugins/remark-terms.js';

const siteUrl = process.env.ASTRO_SITE ?? 'https://example.github.io/how-to-law';
const basePath = '/how-to-law';
const classroomDir = path.resolve('src/content/classroom');

function createSnippet(body) {
  if (!body) {
    return '';
  }
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[(.*?)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) {
    return '';
  }
  return text.length > 220 ? `${text.slice(0, 217)}…` : text;
}

async function readGlossary() {
  try {
    const glossaryPath = new URL('./src/content/glossary/terms.json', import.meta.url);
    const raw = await fs.readFile(glossaryPath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Unable to read glossary terms for search index.', error);
    return [];
  }
}

async function walkClassroom(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkClassroom(full)));
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function readLessons() {
  const files = await walkClassroom(classroomDir);
  const lessons = [];
  for (const filePath of files) {
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(raw);
    const relative = path.relative(classroomDir, filePath);
    const segments = relative.split(path.sep);
    const moduleSlug = segments[0];
    const lessonSlug = path.basename(relative).replace(/\.(md|mdx)$/i, '');
    const moduleTitle = parsed.data?.moduleTitle ?? moduleSlug;
    const tags = Array.isArray(parsed.data?.tags) ? parsed.data.tags : [];
    lessons.push({
      id: `${moduleSlug}-${lessonSlug}`,
      moduleSlug,
      lessonSlug,
      moduleTitle,
      title: parsed.data?.title ?? lessonSlug,
      description: parsed.data?.description ?? '',
      tags,
      content: parsed.content
    });
  }
  return lessons;
}

async function writeSearchIndex(outDir) {
  const lessons = await readLessons();
  const glossary = await readGlossary();

  const lessonDocs = lessons.map((lesson) => ({
    type: 'lesson',
    id: lesson.id,
    title: lesson.title,
    url: `${basePath}/classroom/${lesson.moduleSlug}/${lesson.lessonSlug}/`,
    module: lesson.moduleTitle,
    tags: lesson.tags,
    textSnippet: createSnippet(lesson.content)
  }));

  const glossaryDocs = glossary.map((term) => ({
    type: 'glossary',
    id: term.id,
    title: term.term,
    url: `${basePath}/glossary/#${term.id}`,
    module: 'Glossary',
    tags: term.tags ?? [],
    textSnippet: term.def
  }));

  const docs = [...lessonDocs, ...glossaryDocs];
  const outPath = path.join(outDir, 'search-index.json');
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(docs, null, 2), 'utf-8');
}

export default defineConfig({
  site: siteUrl,
  base: basePath,
  trailingSlash: 'always',
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkTerms],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['heading-link'] } }]]
    }),
    tailwind({ applyBaseStyles: false }),
    sitemap()
  ],
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const distPath = fileURLToPath(dir);
      try {
        await writeSearchIndex(distPath);
      } catch (error) {
        console.warn('Unable to generate search index in dist.', error);
      }

      try {
        await writeSearchIndex(path.resolve('public'));
      } catch (error) {
        console.warn('Unable to update search index snapshot in public/.', error);
      }
    }
  }
});
