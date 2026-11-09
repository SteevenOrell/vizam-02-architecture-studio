/**
 * Shared facts about the one fictional house ("Olive House") that every drawing in this set describes.
 * All values are metres. x runs west to east, y runs north to south, z is height above grade.
 * Keeping the numbers here is what makes the plan, elevation, section and axonometric agree with each other.
 */

export const C = {
  ink: '#23211d',
  soft: '#4b473f',
  hair: '#8c8578',
  oxide: '#9a4a2c',
  oak: '#b98a56',
  paper: '#f6f2ea',
  stone: '#ddd5c4',
  plaster: '#ebe5d8',
  glass: '#c9d3d2',
} as const;

export const SHEET_W = 1000;
export const SHEET_H = 640;

export const HOUSE = {
  /** Overall length (west to east) and the depth of the centre block. */
  length: 19.6,
  depth: 8.0,
  /** Left wing (bedroom), centre block (living), right wing (bedroom 2), as x ranges. */
  leftX: [0, 5.6],
  centreX: [5.6, 14.0],
  rightX: [14.0, 19.6],
  /** South face of the right wing sits 1 m behind the centre block. */
  rightDepth: 7.0,
  /** Terrace depth in front of the centre block and the roof overhang above it. */
  terraceDepth: 3.0,
  overhang: 1.2,
  /** Floor level above grade; roof top level of each volume; roof slab thickness. */
  ffl: 0.45,
  roofTop: { left: 3.75, centre: 3.35, right: 3.15 },
  slab: 0.3,
  /** Sliding glazing in the centre block and the oak screen that slides in front of it. */
  glazing: [6.2, 13.4],
  glazingHead: 2.9,
  screen: [6.2, 9.2],
  /** The oxide-render wall on the right wing. */
  oxide: [14.0, 15.6],
  /** Section A-A is cut at this x, looking east. */
  cutX: 10.5,
  /** Steps down from the terrace. */
  steps: [10.0, 13.0],
} as const;

/** Grid axes: lettered west-east, numbered north-south. */
export const AXES_X = [
  { id: 'A', m: 0 },
  { id: 'B', m: 5.6 },
  { id: 'C', m: 9.8 },
  { id: 'D', m: 14.0 },
  { id: 'E', m: 19.6 },
];
export const AXES_Y = [
  { id: '1', m: 0 },
  { id: '2', m: 3.6 },
  { id: '3', m: 8.0 },
];

export const ROOMS = [
  { n: '01', name: 'Entry' },
  { n: '02', name: 'Kitchen' },
  { n: '03', name: 'Living' },
  { n: '04', name: 'Dining' },
  { n: '05', name: 'Bedroom' },
  { n: '06', name: 'Bath' },
  { n: '07', name: 'Dressing' },
  { n: '08', name: 'Bedroom' },
  { n: '09', name: 'Bath' },
  { n: '10', name: 'Utility' },
  { n: '11', name: 'Terrace' },
] as const;

/** Deterministic pseudo-random numbers, so server and client always render identical drawings. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Round to one decimal for compact, stable SVG output. */
export const r1 = (n: number) => Math.round(n * 10) / 10;
export const r2 = (n: number) => Math.round(n * 100) / 100;

export const fmtM = (m: number) => m.toFixed(2);

export type DrawingProps = {
  className?: string;
  /** Overrides the default accessible name of the drawing. */
  title?: string;
};
