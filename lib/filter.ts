import { DISCIPLINES, type Discipline, type Project } from '@/content/types';

export type Filter = Discipline | 'all';

/** Accepts untrusted input (e.g. a URL search param) and returns a known filter. */
export function parseFilter(value: string | null | undefined): Filter {
  return (DISCIPLINES as readonly string[]).includes(value ?? '') ? (value as Discipline) : 'all';
}

export function filterProjects(list: Project[], filter: Filter): Project[] {
  return filter === 'all' ? list : list.filter((p) => p.discipline === filter);
}
