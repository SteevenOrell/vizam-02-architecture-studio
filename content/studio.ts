import { img } from './images';
import type { Img, Service } from './types';

export const site = {
  name: 'Ostrel Atelier',
  short: 'Ostrel',
  tagline: 'Architecture & interiors shaped by light, weight and time.',
  description:
    'Ostrel Atelier is a fictional architecture and interior design studio — a VIZAM concept project exploring visual storytelling for spatial practices.',
  email: 'hello@ostrel.example',
  cities: ['Lisbon', 'Copenhagen'],
  address: ['Studio 4, Pátio da Cal (fictional)', 'Lisbon, Portugal'],
  disclaimer: 'VIZAM concept project — fictional studio',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ostrel.example',
};

export const nav = [
  { href: '/projects', label: 'Projects' },
  { href: '/studio', label: 'Studio' },
  { href: '/services', label: 'Services' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Start a project' },
] as const;

export const services: Service[] = [
  {
    slug: 'architecture',
    index: '01',
    title: 'Architecture',
    lead: 'New buildings and extensions, from feasibility to the last site visit.',
    scope: ['Site and daylight studies', 'Concept and planning design', 'Technical design', 'Contract administration'],
    deliverables: ['Physical study models', 'Planning drawings', 'Construction package'],
    image: { src: img.studioModel, alt: 'White architectural study model with a roof light' },
  },
  {
    slug: 'interiors',
    index: '02',
    title: 'Interior architecture',
    lead: 'Rooms planned from the inside out: joinery, lighting, surfaces and the way you move.',
    scope: ['Spatial planning', 'Joinery and fixed furniture', 'Lighting design', 'Material and colour palettes'],
    deliverables: ['Sample boards', 'Joinery drawings', 'Lighting layouts'],
    image: { src: img.materialShoji, alt: 'Paper screen with a timber grid' },
  },
  {
    slug: 'renovation',
    index: '03',
    title: 'Renovation & reuse',
    lead: 'Careful work with existing buildings: keep what is good, repair what is honest.',
    scope: ['Condition surveys', 'Heritage consents', 'Adaptive reuse strategies', 'Low-carbon retrofit'],
    deliverables: ['Measured survey', 'Retention plan', 'Phased works schedule'],
    image: { src: img.journalRenovation, alt: 'Derelict room with peeling plaster before renovation' },
  },
  {
    slug: 'hospitality',
    index: '04',
    title: 'Hospitality',
    lead: 'Small hotels and restaurants where architecture is part of the welcome.',
    scope: ['Guest journey mapping', 'Room prototypes', 'FF&E selection', 'Operator coordination'],
    deliverables: ['Mock-up room', 'FF&E schedule', 'Brand-space guidelines'],
    image: { src: img.lumenSuite, alt: 'Hotel suite facing the sea at sunset' },
  },
  {
    slug: 'objects',
    index: '05',
    title: 'Furniture & objects',
    lead: 'One-off pieces designed with makers when nothing on the market fits the room.',
    scope: ['Bespoke furniture', 'Lighting objects', 'Door and window hardware', 'Prototype coordination'],
    deliverables: ['Prototypes', 'Maker drawings', 'Care guides'],
    image: { src: img.materialSpheres, alt: 'Two cast concrete spheres' },
  },
];

export const processSteps = [
  { index: '01', title: 'Listen', body: 'Long conversations on site. We ask how you live and what you would never change.' },
  { index: '02', title: 'Survey', body: 'Measure, photograph, study the sun. The site writes half of the brief.' },
  { index: '03', title: 'Model', body: 'We think with our hands: card, clay and timber models before any rendering.' },
  { index: '04', title: 'Detail', body: 'Every junction drawn at full scale. Quiet buildings need precise ones.' },
  { index: '05', title: 'Build & stay', body: 'We stay on site until handover — and return one year later to see how it has aged.' },
];

export interface Principle {
  index: string;
  title: string;
  body: string;
  image: Img;
}

export const principles: Principle[] = [
  {
    index: '01',
    title: 'Light before form',
    body: 'We decide where the light falls before we decide what the building looks like.',
    image: { src: img.philosophyLight, alt: 'Sunlight falling through a tall window grid onto a curved white wall' },
  },
  {
    index: '02',
    title: 'Weight is a comfort',
    body: 'Thick walls, deep reveals and heavy materials make rooms that feel safe and stay cool.',
    image: { src: img.philosophyModel, alt: 'Deep masonry window reveal and stone window seat catching daylight' },
  },
  {
    index: '03',
    title: 'Thresholds are rooms',
    body: 'Stairs, porches and window seats are where life happens. We give them space.',
    image: { src: img.philosophyStairs, alt: 'Oak stair landing with a generous built-in window seat' },
  },
  {
    index: '04',
    title: 'Made to age',
    body: 'Materials that patinate, wear and can be repaired. A building should look better in twenty years.',
    image: { src: img.materialShoji, alt: 'Paper screen with a dark timber grid' },
  },
];

export const people = [
  { name: 'Inês Ostrel', role: 'Founding architect', note: 'Leads residential and cultural work. Teaches studio once a week.' },
  { name: 'Jonas Halvorsen', role: 'Director, interiors', note: 'Joinery obsessive. Runs the Copenhagen desk.' },
  { name: 'Marta Quelhas', role: 'Associate architect', note: 'Technical design and site. Has never lost a drawing.' },
  { name: 'Teo Brandt', role: 'Model maker', note: 'Card, plaster and timber. Every project starts on his bench.' },
  { name: 'Ada Noronha', role: 'Lighting & materials', note: 'Daylight studies and the sample library.' },
  { name: 'Rui Saldanha', role: 'Project architect', note: 'Hospitality and reuse. Fluent in planning law.' },
];

/** Fictional concept data for the studio stats. The head count is the people table, so every page agrees. */
export const studioFacts = { founded: 2014, people: people.length, cities: site.cities };
