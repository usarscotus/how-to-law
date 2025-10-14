import type { CollectionEntry } from 'astro:content';
import terms from '~/content/glossary/terms.json';

export type ModuleMeta = {
  id: string;
  title: string;
  description: string;
};

export const modules: ModuleMeta[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    description:
      'Core concepts about what law is, where it comes from, and how legal rules fit together.'
  },
  {
    id: 'courts',
    title: 'Courts & Jurisdiction',
    description:
      'Structure of the federal court system and the limits on judicial power over cases and parties.'
  },
  {
    id: 'constitutional-law',
    title: 'Constitutional Law',
    description:
      'Authority of the Constitution, separation of powers, and the protection of individual rights.'
  },
  {
    id: 'criminal-law',
    title: 'Criminal Law (Substantive)',
    description:
      'Elements of major offenses, culpable mental states, and defenses that excuse or justify conduct.'
  },
  {
    id: 'criminal-procedure',
    title: 'Criminal Procedure',
    description:
      'Investigatory rules, charging decisions, and courtroom safeguards for the accused.'
  },
  {
    id: 'civil-procedure',
    title: 'Civil Procedure',
    description:
      'Steps in a civil lawsuit from filing through judgment and the rules that guide each phase.'
  },
  {
    id: 'evidence',
    title: 'Evidence',
    description:
      'Admissibility, relevance, privileges, and burdens that govern proof at trial.'
  },
  {
    id: 'scotus-practice',
    title: 'Appellate & Supreme Court Practice',
    description:
      'Strategies, standards of review, and procedural requirements for appellate advocacy before the Supreme Court.'
  },
  {
    id: 'remedies',
    title: 'Remedies',
    description:
      'Available forms of relief after liability is established, including damages and equitable orders.'
  }
];

export const moduleMap = new Map(modules.map((module) => [module.id, module]));

export function getModuleMeta(id: string): ModuleMeta | undefined {
  return moduleMap.get(id);
}

type GlossaryTerm = (typeof terms)[number];

export const glossaryTerms: GlossaryTerm[] = terms;
export const glossaryMap = new Map(glossaryTerms.map((term) => [term.id, term]));

export function getGlossaryTerm(id: string): GlossaryTerm | undefined {
  return glossaryMap.get(id);
}

function extractLessonParts(
  value: string | undefined
): { module: string; lessonSlug: string } | null {
  if (!value) {
    return null;
  }

  const segments = value
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (segments[0] === 'classroom') {
    segments.shift();
  }

  if (segments.length >= 2) {
    return {
      module: segments[0]!,
      lessonSlug: segments.slice(1).join('/')
    };
  }

  return null;
}

function hasEntryId(
  entry: CollectionEntry<'classroom'>
): entry is CollectionEntry<'classroom'> & { id: string } {
  return 'id' in entry && typeof entry.id === 'string';
}

function buildModuleSlugCandidate(entry: CollectionEntry<'classroom'>): string | undefined {
  const slug = entry.data.slug?.trim();

  if (slug) {
    const module = entry.data.module?.trim();

    if (module) {
      return `${module}/${slug}`;
    }

    return slug;
  }

  return undefined;
}

export function toLessonUrl(entry: CollectionEntry<'classroom'>): string {
  const entryId = hasEntryId(entry) ? entry.id : undefined;
  const moduleSlugCandidate = buildModuleSlugCandidate(entry);

  const parts =
    extractLessonParts(entry.slug) ??
    extractLessonParts(moduleSlugCandidate) ??
    extractLessonParts(entryId);

  if (parts) {
    return `/how-to-law/classroom/${parts.module}/${parts.lessonSlug}/`;
  }

  const fallbackSource = entry.slug ?? moduleSlugCandidate ?? entryId ?? '';

  const fallbackSegments = fallbackSource
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (fallbackSegments[0] === 'classroom') {
    fallbackSegments.shift();
  }

  const module = fallbackSegments[0] ?? 'lesson';
  const lessonSlug = fallbackSegments.slice(1).join('/') || module;

  return `/how-to-law/classroom/${module}/${lessonSlug}/`;
}

export function formatNumber(value: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    ...options
  }).format(value);
}

export function getLessonOrder(entry: CollectionEntry<'classroom'>): number {
  if (typeof entry.data.order === 'number') {
    return entry.data.order;
  }

  const slugPart = entry.slug.split('/').pop() ?? '';
  const match = slugPart.match(/^(\d+)/);
  if (match) {
    return Number.parseInt(match[1], 10);
  }

  return Number.MAX_SAFE_INTEGER;
}
