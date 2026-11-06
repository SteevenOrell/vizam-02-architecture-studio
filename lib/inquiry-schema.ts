import { z } from 'zod';

export const PROJECT_TYPES = ['residential', 'interiors', 'hospitality', 'cultural', 'workplace', 'other'] as const;
export const SERVICES = ['architecture', 'interiors', 'renovation', 'landscape', 'furniture'] as const;
export const SIZES = ['under-100', '100-300', '300-1000', 'over-1000', 'unsure'] as const;
export const BUDGETS = ['under-250k', '250k-750k', '750k-2m', 'over-2m', 'undisclosed'] as const;
export const TIMELINES = ['asap', '6-months', '12-months', 'exploring'] as const;

export const LABELS = {
  projectType: {
    residential: 'Residential', interiors: 'Interiors', hospitality: 'Hospitality',
    cultural: 'Cultural', workplace: 'Workplace', other: 'Something else',
  },
  services: {
    architecture: 'Architecture', interiors: 'Interior architecture', renovation: 'Renovation & reuse',
    landscape: 'Landscape', furniture: 'Furniture & objects',
  },
  size: { 'under-100': 'Under 100 m²', '100-300': '100–300 m²', '300-1000': '300–1,000 m²', 'over-1000': 'Over 1,000 m²', unsure: 'Not sure yet' },
  budget: { 'under-250k': 'Under €250k', '250k-750k': '€250k–750k', '750k-2m': '€750k–2m', 'over-2m': 'Over €2m', undisclosed: 'Prefer not to say' },
  timeline: { asap: 'As soon as possible', '6-months': 'Within 6 months', '12-months': 'Within a year', exploring: 'Just exploring' },
} as const;

const trimmed = (max: number) => z.string().trim().max(max, { error: `Keep this under ${max} characters.` });

/** Single source of truth: used by the client form (RHF resolver) and re-run in the server action. */
export const inquirySchema = z.object({
  name: trimmed(80).min(2, { error: 'Please tell us your name.' }),
  email: z.string().trim().max(120, { error: 'Keep this under 120 characters.' }).pipe(z.email({ error: 'Enter a valid email address, like name@example.com.' })),
  phone: trimmed(30)
    .refine((v) => v === '' || /^[+()\d\s.-]{6,30}$/.test(v), { error: 'Use digits, spaces and + ( ) - only.' }),
  organisation: trimmed(100),
  projectType: z.enum(PROJECT_TYPES, { error: 'Choose the type of project.' }),
  services: z.array(z.enum(SERVICES)).min(1, { error: 'Choose at least one service.' }).max(SERVICES.length),
  location: trimmed(120).min(2, { error: 'Where is the site? A city or region is enough.' }),
  size: z.enum(SIZES, { error: 'Choose an approximate size.' }),
  budget: z.enum(BUDGETS, { error: 'Choose a budget range (or “Prefer not to say”).' }),
  timeline: z.enum(TIMELINES, { error: 'Choose a timeline.' }),
  message: trimmed(2000).min(20, { error: 'Tell us a little more — at least 20 characters.' }),
  consent: z.literal(true, { error: 'Please confirm you understand this is a demo form.' }),
  // Anti-spam: must stay empty (hidden from people), and the form must have been open for a moment.
  website: z.string().max(200).optional(),
  startedAt: z.number().int().nonnegative().optional(),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryData = z.output<typeof inquirySchema>;

export type InquiryResult =
  | { ok: true; message: string; reference: string }
  | { ok: false; message: string; fieldErrors?: Partial<Record<keyof InquiryData, string>> };

export const MIN_FILL_MS = 1200;
