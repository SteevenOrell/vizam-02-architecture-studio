import { img } from './images';
import type { JournalPost } from './types';

export const posts: JournalPost[] = [
  {
    slug: 'the-stair-as-a-room',
    title: 'The stair as a room',
    date: '2026-09-18',
    category: 'Essay',
    excerpt: 'Why we draw staircases first, and why the best ones are wide enough to sit on.',
    readingTime: 5,
    cover: { src: img.journalSpiral, alt: 'Spiral staircase in black and white with a single light at the top' },
    figure: { name: 'plan', after: 1, title: 'Ground floor plan of a fictional house study', caption: 'Fictional concept sheet: a ground-floor plan, drawn the way we draw every house, with the circulation worked out before the rooms.' },
    body: [
      { type: 'p', text: 'In most houses the stair is a corridor turned on its side: the shortest way between two floors. We prefer to treat it as a room that happens to rise.' },
      { type: 'h2', text: 'Landings are the point' },
      { type: 'p', text: 'A landing is the only place in a house where you are between two worlds. Give it a window, a ledge or a bench, and it becomes the place where children read and guests linger.' },
      { type: 'quote', text: 'If a stair is generous, the whole section of the house relaxes around it.' },
      { type: 'p', text: 'We now start most residential projects with a cardboard model of the stair alone. Everything else follows from how it catches the light.' },
    ],
  },
  {
    slug: 'notes-on-lime',
    title: 'Notes on lime',
    date: '2026-07-02',
    category: 'Material',
    excerpt: 'Lime plaster breathes, repairs itself and ages with grace. A short field guide from our sites.',
    readingTime: 4,
    cover: { src: img.materialSpheres, alt: 'Two cast spheres resting on a smooth mineral floor' },
    body: [
      { type: 'p', text: 'Lime is slower than gypsum, less forgiving to apply and far more forgiving to live with. It lets walls exchange moisture with the air, which keeps old buildings healthy.' },
      { type: 'h2', text: 'What we specify' },
      { type: 'p', text: 'Three coats on masonry, a final limewash tinted with local earth pigments, and no sealer. Small cracks are part of the finish; larger ones are filled with the same mix.' },
      { type: 'p', text: 'This article is part of a fictional journal written for a VIZAM concept site.' },
    ],
  },
  {
    slug: 'drawing-with-daylight',
    title: 'Drawing with daylight',
    date: '2026-04-21',
    category: 'Process',
    excerpt: 'How a year of sun studies decides where a single window goes.',
    readingTime: 6,
    cover: { src: img.journalBlinds, alt: 'Blinds filtering sunlight into a long corridor' },
    coverDrawing: { name: 'section', alt: 'Section drawing of a fictional house under a flat roof with a deep overhang, used to study where daylight lands' },
    body: [
      { type: 'p', text: 'Before we draw a plan we draw the sun. A simple model, a lamp and a turntable tell us more about a site than a week of desk studies.' },
      { type: 'h2', text: 'Morning, noon, evening' },
      { type: 'p', text: 'We map which rooms need which hour. Bedrooms want the morning, kitchens the midday, living rooms the long evening light. Windows are then placed, sized and shaded to serve that hour first.' },
      { type: 'quote', text: 'A window is a clock before it is a view.' },
    ],
  },
  {
    slug: 'after-the-strip-out',
    title: 'After the strip-out',
    date: '2026-01-30',
    category: 'Notes',
    excerpt: 'What an empty, damaged room can tell you before you decide what to keep.',
    readingTime: 3,
    cover: { src: img.journalRenovation, alt: 'Derelict room with peeling plaster and debris on the floor' },
    body: [
      { type: 'p', text: 'The first visit after demolition is the most honest moment in a renovation. Damp, cracks and old openings show where the building has been working hardest.' },
      { type: 'p', text: 'We photograph everything, mark what can stay, and only then begin to design. More often than not, the old walls end up being the best part of the new interior.' },
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
}
