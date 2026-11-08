import { img } from './images';
import type { Project } from './types';

export const additionalProjects: Project[] = [
  {
    slug: 'olive-court-house', title: 'Olive Court House', location: 'Alentejo, Portugal', year: 2026,
    discipline: 'residential', area: 318, status: 'Concept',
    summary: 'A quiet garden villa in pale travertine, arranged around shade and olive trees.',
    intro: 'Offset stone volumes shelter oak-framed glazing. A terrace joins the rooms to the olive grove, while deep reveals soften the summer light.',
    story: [{ heading: 'Shelter in the grove', body: 'The garden sets the rhythm of this fictional design study. Openings face the long views; solid walls protect the bedrooms and make shaded places to sit. This illustrative concept does not represent a commissioned or completed building.' }],
    facts: [{ label: 'Project', value: 'Fictional concept' }, { label: 'Programme', value: 'Private residence' }],
    materials: ['Travertine', 'Lime plaster', 'Oak'],
    cover: { src: img.gardenVilla, alt: 'Pale travertine garden villa with oak-framed glazing among olive trees', focus: '45% 50%' }, gallery: [],
  },
  {
    slug: 'mar-de-cal', title: 'Mar de Cal', location: 'Atlantic coast, Portugal', year: 2026,
    discipline: 'residential', area: 364, status: 'Concept',
    summary: 'Curved lime-plaster walls frame the sea from a sheltered stone terrace.',
    intro: 'An arched passage connects shaded rooms to the open terrace. A low roof and curved parapet follow the horizon, keeping the coast present without exposing every room to it.',
    story: [{ heading: 'A horizon held in plaster', body: 'This fictional coastal study uses a sequence of sheltered thresholds. The arch marks the transition from the cool interior to open sky. Terracotta pots and restrained planting bring a domestic scale to the broad terrace.' }],
    facts: [{ label: 'Project', value: 'Fictional concept' }, { label: 'Programme', value: 'Coastal residence' }],
    materials: ['Lime plaster', 'Limestone', 'Terracotta'],
    cover: { src: img.coastalVilla, alt: 'Curved ivory coastal villa with an arched passage and a sea-facing limestone terrace', focus: '40% 50%' }, gallery: [],
  },
  {
    slug: 'mira-residence', title: 'Mira Residence', location: 'Lisbon, Portugal', year: 2026,
    discipline: 'residential', area: 1420, status: 'Concept',
    summary: 'A limestone apartment building with deep planted balconies and generous shared thresholds.',
    intro: 'Recessed loggias give the homes outdoor rooms with privacy from the street. Limestone piers, timber screens and bronze-framed windows establish a calm rhythm across the facade.',
    story: [{ heading: 'Outdoor rooms in the city', body: 'Each balcony is treated as a room rather than a ledge. In this fictional residential proposal, planted edges filter street views while the deep reveals temper direct sunlight. The shared entrance remains open and legible from the pavement.' }],
    facts: [{ label: 'Project', value: 'Fictional concept' }, { label: 'Programme', value: 'Apartments and shared courtyard' }],
    materials: ['Limestone', 'Oak', 'Bronze'],
    cover: { src: img.miraResidence, alt: 'Contemporary limestone apartment building with deep planted balconies and timber screens', focus: '62% 50%' }, gallery: [],
  },
];
