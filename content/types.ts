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
}

export interface Project {
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
