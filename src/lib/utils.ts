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

export function formatNumber(value: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    ...options
  }).format(value);
}
