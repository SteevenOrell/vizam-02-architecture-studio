/** Chapters of the "A home, drawn" scroll section. Local, CMS-ready content. */
export type StudyChapter = {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  /** Longer caption used in the static (reduced motion / no JS) sequence. */
  caption: string;
};

export const studyChapters: StudyChapter[] = [
  {
    id: 'home',
    kicker: 'Photograph',
    title: 'The home',
    subtitle: 'A low plaster house on a stone terrace, in an olive grove',
    caption: 'Olive House, a fictional concept: low plaster volumes, oak screens and a stone terrace in an olive grove.',
  },
  {
    id: 'site',
    kicker: 'Drawing 01',
    title: 'Site plan',
    subtitle: 'Forty by twenty-three metres, the old olive tree kept',
    caption: 'Site plan. The house sits on a forty by twenty-three metre plot, reached from the north across a gravel court. The existing olive tree is retained.',
  },
  {
    id: 'plan',
    kicker: 'Drawing 02',
    title: 'Ground-floor plan',
    subtitle: 'Kitchen, living and dining open to the terrace',
    caption: 'Ground-floor plan. An open kitchen, living and dining room faces the terrace; a bedroom wing sits at each end.',
  },
  {
    id: 'elevation',
    kicker: 'Drawing 03',
    title: 'Elevation',
    subtitle: 'Oak screens slide across full-height glazing',
    caption: 'South elevation. Three low volumes, an oak sliding screen over the glazing, and an oxide-coloured wall at the east end.',
  },
  {
    id: 'section',
    kicker: 'Drawing 04',
    title: 'Section',
    subtitle: 'A one-metre roof overhang shades the glass',
    caption: 'Section A-A, looking east. A flat roof reaches one metre past the glazing to shade the stone terrace.',
  },
  {
    id: 'axonometric',
    kicker: 'Drawing 05',
    title: 'Exploded axonometric',
    subtitle: 'Floor, walls, structure and roof drift apart, then regroup',
    caption: 'Exploded axonometric. The floor plate, the walls, the steel structure and the roofs, lifted apart so each layer can be read.',
  },
  {
    id: 'living',
    kicker: 'The whole',
    title: 'A place to live',
    subtitle: 'Drawn first, then made: a quiet home, carefully',
    caption: 'Drawn first, then made: a quiet home, carefully. Every line on these sheets is a decision about light, weight and shelter.',
  },
];
