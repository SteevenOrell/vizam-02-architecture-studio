import { additionalProjects } from './additional-projects';
import { img } from './images';
import type { Discipline, Project } from './types';

// Fictional projects for a fictional studio (VIZAM concept). Photographs are stock images (see assets/images/CREDITS.md).
export const projects: Project[] = [
  ...additionalProjects,
  {
    slug: 'halden-house',
    title: 'Halden House',
    location: 'Sintra hills, Portugal',
    year: 2025,
    discipline: 'residential',
    area: 412,
    status: 'Completed',
    featured: true,
    summary: 'A family house of stacked concrete volumes that opens to a single sheltered lawn.',
    intro:
      'Three cast volumes are offset to give every room a different horizon. The ground floor is one continuous threshold between kitchen, terrace and lawn; the upper floors retreat into quiet.',
    story: [
      {
        heading: 'Weight and shelter',
        body: 'The client asked for a house that would feel calm in a storm. We answered with mass: board-marked concrete, deep reveals and a cantilevered upper floor that turns the terrace into a covered room for half the year.',
      },
      {
        heading: 'One staircase, many speeds',
        body: 'A folded timber stair is the only vertical route. Its landings are wide enough to sit on, so the stair becomes a reading room, a lookout and the place where the house gathers in the evening.',
      },
      {
        heading: 'Light by the hour',
        body: 'Openings were placed after a year of sun studies. Bedrooms receive the morning, the living spaces the long western light, and the bathrooms a single high slot that moves across the wall through the day.',
      },
    ],
    facts: [
      { label: 'Client', value: 'Private' },
      { label: 'Programme', value: 'Family house, studio, guest wing' },
      { label: 'Structure', value: 'In-situ concrete, timber floors' },
      { label: 'Energy', value: 'Ground-source heat pump, passive cooling' },
    ],
    materials: ['Board-marked concrete', 'Oiled oak', 'Lime plaster', 'Basalt paving'],
    cover: { src: img.haldenCover, alt: 'Dusk view of a house of stacked concrete volumes with lit interiors above a lawn', focus: '32% 50%' },
    gallery: [
      { src: img.haldenStair, alt: 'Curved white stair rising through a timber-lined stairwell' },
      { src: img.haldenBedroom, alt: 'Bedroom with concrete walls and a tall window casting soft daylight on the bed' },
      { src: img.materialSpheres, alt: 'Two cast concrete spheres on a polished concrete floor' },
    ],
  },
  {
    slug: 'lumen-rooms',
    title: 'Lumen Rooms',
    location: 'Comporta, Portugal',
    year: 2024,
    discipline: 'hospitality',
    area: 2860,
    status: 'Completed',
    featured: true,
    summary: 'A 24-room coastal hotel where every corridor ends in daylight.',
    intro:
      'A former cannery shed became a low, slow hotel. We kept the industrial shell, cut long light wells through the roof and organised the rooms around three courtyards of pine and sand.',
    story: [
      {
        heading: 'Arrival as a pause',
        body: 'The lobby is a single tall room of raw plaster and warm lamplight. There is no counter: guests are welcomed at a low table, and the view to the first courtyard does the rest.',
      },
      {
        heading: 'Rooms that face the weather',
        body: 'Each room has one large window and one small one. The large window frames the sea or the pines; the small one, at bed height, is for the morning breeze.',
      },
      {
        heading: 'Water at night',
        body: 'The pool is lit only from below and from the surrounding rooms, so the garden stays dark enough to see the stars.',
      },
    ],
    facts: [
      { label: 'Client', value: 'Independent operator (fictional)' },
      { label: 'Keys', value: '24 rooms, 3 suites' },
      { label: 'Scope', value: 'Architecture, interiors, landscape' },
      { label: 'Heritage', value: 'Adaptive reuse of an industrial shed' },
    ],
    materials: ['Lime plaster', 'Travertine', 'Pine', 'Woven rush'],
    cover: { src: img.lumenSuite, alt: 'Suite bedroom facing a wide window with the sea at sunset', focus: '52% 50%' },
    gallery: [
      { src: img.lumenReception, alt: 'Marble reception counter in a bright hall with dark joinery' },
      { src: img.lumenPool, alt: 'Courtyard pool lit at dusk, surrounded by timber pavilions' },
    ],
  },
  {
    slug: 'saline-pavilion',
    title: 'Saline Pavilion',
    location: 'Aveiro lagoon, Portugal',
    year: 2026,
    discipline: 'cultural',
    area: 1240,
    status: 'On site',
    featured: true,
    summary: 'A white exhibition hall that floats above the salt pans like a folded sheet of paper.',
    intro:
      'A small museum of salt-making, raised on a plinth above flood level. A single gallery wraps around a sunken court; visitors climb a lit stair to a roof terrace over the lagoon.',
    story: [
      {
        heading: 'A plinth for the tide',
        body: 'The building sits on a concrete table that lets seasonal water pass beneath it. From the path it reads as one white form; up close its surface shows the grain of the formwork.',
      },
      {
        heading: 'The lit stair',
        body: 'The route to the roof is a narrow stair washed by a hidden line of light, an instrument for slowing down between the bright galleries and the open sky.',
      },
    ],
    facts: [
      { label: 'Client', value: 'Municipal foundation (fictional)' },
      { label: 'Programme', value: 'Gallery, archive, learning room, roof terrace' },
      { label: 'Procurement', value: 'Two-stage design and build' },
      { label: 'Completion', value: 'Expected 2026' },
    ],
    materials: ['White concrete', 'Salt-glazed tile', 'Galvanised steel', 'Cork'],
    cover: { src: img.salineCover, alt: 'White concrete exhibition pavilion with a folded roof above calm salt pans', focus: '50% 50%' },
    gallery: [
      { src: img.salineModel, alt: 'White study model of a pavilion with a roof light and a sunken court' },
      { src: img.salineStair, alt: 'Concrete stair washed by a hidden line of warm light' },
      { src: img.journalStair, alt: 'Black and white view down a sculptural concrete staircase' },
    ],
  },
  {
    slug: 'casa-velo',
    title: 'Casa Velo',
    location: 'Alentejo, Portugal',
    year: 2023,
    discipline: 'residential',
    area: 236,
    status: 'Completed',
    featured: true,
    summary: 'A single-storey courtyard house with a veil of white walls against the heat.',
    intro:
      'A long, low house drawn as a series of white walls that cast shade on each other. The courtyard, pool and kitchen form one axis; bedrooms sit at the quiet end behind a timber screen.',
    story: [
      {
        heading: 'Walls before windows',
        body: 'In a hot landscape, the walls do the work. Their thickness keeps the rooms cool and their position decides what you see: the horizon from the kitchen, the courtyard from the bath.',
      },
      {
        heading: 'A kitchen to live in',
        body: 'The kitchen is the largest room in the house, with an oak island, open shelves and a full-height window onto the courtyard.',
      },
    ],
    facts: [
      { label: 'Client', value: 'Private' },
      { label: 'Programme', value: 'Holiday house, 3 bedrooms' },
      { label: 'Structure', value: 'Rammed earth and lime render' },
      { label: 'Water', value: 'Rainwater harvesting for the garden' },
    ],
    materials: ['Lime render', 'Rammed earth', 'Oak', 'Terracotta'],
    cover: { src: img.casaVeloCover, alt: 'A low white house with a long glazed living room opening onto a pool and lawn', focus: '60% 50%' },
    gallery: [
      { src: img.casaVeloKitchen, alt: 'Bright kitchen with an oak island, pendant lamps and open shelves' },
      { src: img.casaVeloFacade, alt: 'Minimal white walls and a slatted screen along a narrow passage' },
      { src: img.philosophyWindow, alt: 'Empty room framing a misty landscape through a full-height window' },
    ],
  },
  {
    slug: 'northfold-works',
    title: 'Northfold Works',
    location: 'Porto, Portugal',
    year: 2024,
    discipline: 'workplace',
    area: 1680,
    status: 'Completed',
    featured: true,
    summary: 'A columned warehouse turned into a calm workplace for a design collective.',
    intro:
      'We removed every partition we could and let the column grid organise the floor: desks in the light, meeting rooms in the middle, a long kitchen table at the heart.',
    story: [
      {
        heading: 'The grid is the plan',
        body: 'The original concrete columns define bays of eight desks. Plants, shelving and acoustic curtains are set between them so that the space can change without construction.',
      },
      {
        heading: 'Rooms for thinking',
        body: 'Small meeting rooms face north for even light. Each has a whiteboard wall, a table for six and nothing else.',
      },
    ],
    facts: [
      { label: 'Client', value: 'Design collective (fictional)' },
      { label: 'Capacity', value: '110 workstations' },
      { label: 'Scope', value: 'Interior architecture, furniture, lighting' },
      { label: 'Certification', value: 'Targeting low-embodied-carbon fit-out' },
    ],
    materials: ['Polished screed', 'Birch plywood', 'Wool felt', 'Powder-coated steel'],
    cover: { src: img.northfoldCover, alt: 'Open-plan workplace with concrete beams, oak tables and plants', focus: '50% 50%' },
    gallery: [
      { src: img.northfoldMeeting, alt: 'Meeting room with a long table, white chairs and a whiteboard wall' },
      { src: img.northfoldWindows, alt: 'Quiet corner of tables and chairs by tall windows' },
    ],
  },
  {
    slug: 'mire-apartment',
    title: 'Mire Apartment',
    location: 'Lisbon, Portugal',
    year: 2025,
    discipline: 'interiors',
    area: 148,
    status: 'Completed',
    summary: 'A nineteenth-century apartment reorganised around one long, soft room.',
    intro:
      'Four small rooms became one living space with a kitchen at one end and a library at the other. The original cornices were kept; everything new is low, warm and movable.',
    story: [
      {
        heading: 'Keep the shell',
        body: 'Ceiling heights, cornices and parquet stayed. New walls stop short of the ceiling so the original room shapes remain legible.',
      },
      {
        heading: 'Soft edges',
        body: 'Rounded furniture, bouclé, limewash and linen. The palette is drawn from the stone of the street outside.',
      },
    ],
    facts: [
      { label: 'Client', value: 'Private' },
      { label: 'Scope', value: 'Interior architecture, furniture selection' },
      { label: 'Duration', value: '9 months on site' },
      { label: 'Heritage', value: 'Listed facade, interior alterations' },
    ],
    materials: ['Limewash', 'Bouclé', 'Oak parquet', 'Linen'],
    cover: { src: img.mireAfter, alt: 'Light living room with a low sofa, a round coffee table and soft daylight', focus: '55% 50%' },
    gallery: [
      { src: img.mireCover, alt: 'Wide view of a pale living and dining space with a long sofa' },
      { src: img.mireBefore, alt: 'Empty period room with tall windows and parquet before the works' },
    ],
    comparison: {
      before: { src: img.mireBefore, alt: 'Existing condition: empty period room with parquet and tall windows' },
      after: { src: img.mireAfter, alt: 'Completed living room with low furniture and limewashed walls' },
      caption: 'Existing condition and completed living room. Illustrative pairing of two photographs.',
    },
  },
  {
    slug: 'ombra-townhouse',
    title: 'Ombra Townhouse',
    location: 'Copenhagen, Denmark',
    year: 2026,
    discipline: 'interiors',
    area: 210,
    status: 'Completed',
    summary: 'A stripped townhouse reborn in concrete, shadow and a single gallery wall.',
    intro:
      'The house had been gutted by a previous owner. We left the raw walls visible where they were sound and introduced a polished floor, deep window seats and one wall for the owner’s photographs.',
    story: [
      {
        heading: 'Honest repairs',
        body: 'Rather than hide the old plaster, we sealed it. New elements are cast or polished so the difference between old and new stays visible.',
      },
      {
        heading: 'A bedroom like a gallery',
        body: 'The main bedroom is lit from one tall window and one picture light. The bed sits low, on a plinth of the same concrete as the floor.',
      },
    ],
    facts: [
      { label: 'Client', value: 'Private collector (fictional)' },
      { label: 'Scope', value: 'Full interior renovation' },
      { label: 'Duration', value: '14 months' },
      { label: 'Reuse', value: '70 % of existing walls retained' },
    ],
    materials: ['Microcement', 'Sealed plaster', 'Smoked oak', 'Steel'],
    cover: { src: img.ombraAfter, alt: 'Concrete bedroom with a low bed and a large dark photograph on the wall', focus: '50% 50%' },
    gallery: [
      { src: img.journalBlinds, alt: 'Corridor with floor-to-ceiling blinds filtering daylight' },
      { src: img.ombraBefore, alt: 'Empty room with raw plaster walls and a timber floor before renovation' },
    ],
    comparison: {
      before: { src: img.ombraBefore, alt: 'Existing condition: bare room with raw plaster walls and worn floor' },
      after: { src: img.ombraAfter, alt: 'Completed bedroom with polished concrete and a single gallery wall' },
      caption: 'Existing condition and completed bedroom. Illustrative pairing of two photographs.',
    },
  },
  {
    slug: 'kiln-yard-studios',
    title: 'Kiln Yard Studios',
    location: 'Braga, Portugal',
    year: 2022,
    discipline: 'workplace',
    area: 640,
    status: 'Completed',
    summary: 'Brick, steel and a planted wall: a ceramics workshop with a loft for visitors.',
    intro:
      'An old kiln shed now houses a ceramics workshop, a shop and a small loft for residencies. A steel stair and a living wall divide the working floor from the visitors’ route.',
    story: [
      {
        heading: 'Workshop first',
        body: 'Kilns, wheels and drying racks dictated the plan. The public route was threaded around them so visitors can watch without interrupting.',
      },
      {
        heading: 'A green wall that works',
        body: 'The planted wall humidifies the drying room and screens the loft. It is fed by rainwater collected from the roof.',
      },
    ],
    facts: [
      { label: 'Client', value: 'Ceramics cooperative (fictional)' },
      { label: 'Programme', value: 'Workshop, shop, residency loft' },
      { label: 'Structure', value: 'Retained brick shell, new steel mezzanine' },
      { label: 'Landscape', value: 'Rain-fed living wall' },
    ],
    materials: ['Reclaimed brick', 'Steel', 'Concrete', 'Living wall'],
    cover: { src: img.kilnLoft, alt: 'Loft with exposed brick, a steel stair, a living wall and low seating', focus: '50% 50%' },
    gallery: [
      { src: img.materialShoji, alt: 'Paper screen with a dark timber grid in soft light' },
      { src: img.studioBlocks, alt: 'Wooden blocks stacked into an architectural study model' },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

/** The project shown after the given one (wraps around). */
export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export function countByDiscipline(list: Project[] = projects): Record<Discipline | 'all', number> {
  const out = { all: list.length, residential: 0, interiors: 0, hospitality: 0, cultural: 0, workplace: 0 };
  for (const p of list) out[p.discipline] += 1;
  return out;
}
