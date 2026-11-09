import { Reveal } from '@/components/ui/Reveal';
import { getContext } from '@/content/projects';
import type { Project } from '@/content/types';

/** "Context" section: a large light paragraph, three headline figures and three numbered, thin-ruled fact rows. All fictional. */
export function ProjectContextSection({ project: p }: { project: Project }) {
  const c = getContext(p);
  return (
    <section aria-labelledby="context-title" className="on-dark bg-night py-24 text-paper md:py-32" data-project-context>
      <div className="page-x">
        <h2 id="context-title" className="meta text-paper/80">Context</h2>
        <Reveal>
          <p className="mt-8 max-w-[30ch] font-light leading-[1.08] tracking-[-0.03em] text-[clamp(1.75rem,4.2vw,4rem)] [text-wrap:balance]" data-context-lead>
            {c.lead}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-3 gap-3 md:mt-24 md:gap-10" data-context-stats>
          {c.stats.map((s) => (
            <li key={s.caption} className="min-w-0">
              <p className="flex flex-wrap items-baseline gap-x-1.5 font-light leading-none tracking-[-0.04em]">
                <span className="text-[clamp(2rem,8.5vw,7rem)]">{s.value}</span>
                {s.unit && <span className="text-[clamp(0.75rem,1.4vw,1.25rem)] tracking-normal text-paper/80">{s.unit}</span>}
              </p>
              <p className="mt-3 text-[0.8125rem] leading-snug text-paper/80 md:text-[0.9375rem]">{s.caption}</p>
            </li>
          ))}
        </ul>

        <ol className="mt-20 border-b border-paper/25 md:mt-28" data-context-rows>
          {c.rows.map((r, i) => (
            <li key={r.title} className="grid gap-4 border-t border-paper/25 py-7 sm:grid-cols-[4rem_1fr_minmax(15rem,24rem)] sm:gap-6 md:py-9">
              <p className="meta text-paper/75">/{String(i + 1).padStart(2, '0')}</p>
              <h3 className="text-[clamp(2rem,5vw,4.5rem)] font-light leading-none tracking-[-0.035em] text-paper">{r.title}</h3>
              <dl className="space-y-3 text-[0.9375rem] leading-snug">
                {r.lines.map((l) => (
                  <div key={l.label}>
                    <dt className="text-paper/75">{l.label}</dt>
                    <dd className="text-paper">{l.value}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>

        <p className="meta mt-8 max-w-[70ch] text-paper/75">
          Fictional concept data: every figure, distance and name on this page is invented for the Ostrel Atelier portfolio concept and is not a measurement or a claim about a real building.
        </p>
      </div>
    </section>
  );
}
