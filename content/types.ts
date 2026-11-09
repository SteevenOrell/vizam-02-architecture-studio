import type { StaticImageData } from 'next/image';

export const DISCIPLINES = ['residential', 'interiors', 'hospitality', 'cultural', 'workplace'] as const;
export type Discipline = (typeof DISCIPLINES)[number];

export const DISCIPLINE_LABEL: Record<Discipline, string> = {
  residential: 'Residential',
  interiors: 'Interiors',
  hospitality: 'Hospitality',
  cultural: 'Cultural',
  workplace: 'Workplace',
};

export interface Img {
  src: StaticImageData;
  alt: string;
  /** Optional CSS object-position for cover crops (keeps the key subject framed on portrait screens). */
  focus?: string;
}

/** Fictional "context" data for a project page: a lead paragraph, three headline figures and three ruled fact rows. */
export interface ProjectContext {
  lead: string;
  stats: { value: string; unit: string; caption: string }[];
  rows: { title: string; lines: { label: string; value: string }[] }[];
}

/** Fictional fields added in slice C1 (merged in content/projects.ts from content/project-details.ts). */
export interface ProjectExtras {
  /** Invented architects; the first is the lead shown as "Designed by". */
  architects: string[];
  /** Three short tag lines for the project hero. */
  tags: [string, string, string];
  /** Plausible coordinates for the fictional site, e.g. "38.7981° N, 9.3876° W". */
  coordinates: string;
  context?: ProjectContext;
}

export type ProjectBase = Omit<Project, keyof ProjectExtras>;

export interface Project extends ProjectExtras {
  slug: string;
  title: string;
  location: string;
  year: number;
  discipline: Discipline;
  /** Gross internal area in m² */
  area: number;
  status: 'Completed' | 'On site' | 'Concept';
  /** One line used on cards and the carousel */
  summary: string;
  intro: string;
  story: { heading: string; body: string }[];
  facts: { label: string; value: string }[];
  materials: string[];
  cover: Img;
  gallery: Img[];
  comparison?: { before: Img; after: Img; caption: string };
  featured?: boolean;
}

export interface JournalPost {
  slug: string;
  title: string;
  date: string; // ISO
  category: 'Essay' | 'Material' | 'Process' | 'Notes';
  excerpt: string;
  readingTime: number;
  cover: Img;
  /** Show an original SVG drawing as the cover (cards and post header) instead of the photo. The photo stays as the social image. */
  coverDrawing?: { name: 'plan' | 'elevation' | 'section' | 'site' | 'axonometric'; alt: string };
  /** Inline captioned drawing placed after the body block with this index. */
  figure?: { name: 'plan' | 'elevation' | 'section' | 'site' | 'axonometric'; after: number; title: string; caption: string };
  body: { type: 'p' | 'h2' | 'quote'; text: string }[];
}

export interface Service {
  slug: string;
  index: string;
  title: string;
  lead: string;
  scope: string[];
  deliverables: string[];
  image: Img;
}
