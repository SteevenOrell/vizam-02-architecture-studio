'use client';

import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DISCIPLINE_LABEL, DISCIPLINES, type Project } from '@/content/types';
import { countByDiscipline } from '@/content/projects';
import { filterProjects, parseFilter, type Filter } from '@/lib/filter';
import { ProjectCard } from './ProjectCard';

const OPTIONS: Filter[] = ['all', ...DISCIPLINES];

/** Reads ?type= from the URL. Must sit inside <Suspense> (useSearchParams). */
export function ProjectIndexFromUrl({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  return <ProjectIndex projects={projects} initial={parseFilter(params.get('type'))} syncUrl />;
}

export function ProjectIndex({ projects, initial = 'all', syncUrl = false }: { projects: Project[]; initial?: Filter; syncUrl?: boolean }) {
  const [filter, setFilter] = useState<Filter>(initial);
  const router = useRouter();
  const pathname = usePathname();
  const counts = countByDiscipline(projects);
  const shown = filterProjects(projects, filter);

  const choose = (f: Filter) => {
    setFilter(f);
    if (syncUrl) router.replace(f === 'all' ? pathname : `${pathname}?type=${f}`, { scroll: false });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="page-x">
        <div className="flex flex-col gap-6 border-y border-hairline py-5 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter projects by discipline" className="flex flex-wrap gap-2">
            {OPTIONS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(f)}
                  disabled={f !== 'all' && counts[f] === 0}
                  className={[
                    'rounded-full border px-4 py-2 text-[0.9375rem] tracking-tight transition-colors disabled:opacity-40',
                    active ? 'border-graphite bg-graphite text-paper' : 'border-hairline hover:border-graphite',
                  ].join(' ')}
                >
                  {f === 'all' ? 'All' : DISCIPLINE_LABEL[f]}
                  <sup className="meta ml-1 text-[0.5625rem] opacity-70">{counts[f]}</sup>
                </button>
              );
            })}
          </div>
          <p className="meta text-stone" role="status" aria-live="polite" data-testid="result-count">
            Showing {shown.length} of {projects.length} projects
          </p>
        </div>

        <motion.ul layout className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" data-testid="project-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.2, 0.7, 0.1, 1] }}
              >
                <ProjectCard project={p} index={projects.indexOf(p)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </MotionConfig>
  );
}
