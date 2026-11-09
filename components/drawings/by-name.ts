import { Axonometric } from './Axonometric';
import { Elevation } from './Elevation';
import { FloorPlan } from './FloorPlan';
import { Section } from './Section';
import { SitePlan } from './SitePlan';

/** Lookup so content can name a drawing without importing components. */
export const DRAWINGS = { plan: FloorPlan, elevation: Elevation, section: Section, site: SitePlan, axonometric: Axonometric } as const;
export type DrawingName = keyof typeof DRAWINGS;
