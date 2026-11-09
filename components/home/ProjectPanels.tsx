import Image from '@/components/ui/ResponsiveImage';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { initials } from '@/lib/initials';
import type { Project } from '@/content/types';

/**
 * Stacked full-bleed photo panels for three projects. Static layout: the only motion is the shared <Reveal> entrance and a
 * slow hover zoom. The same composition is used at every width (coordinates, place, title, description, designer chip).
 */
export function ProjectPanels({ projects }: { projects: Project[] }) {
  return (
    <section aria-labelledby="showcase-title" className="bg-night text-paper">
      <div className="page-x pb-14 pt-24 md:pb-20 md:pt-32">
        <p className="meta text-stone-light">(02) Selected work</p>
        <h2 id="showcase-title" className="display-lg mt-5 max-w-[14ch]">Places to belong.</h2>
        <p className="mt-8 max-w-[48ch] text-paper/80">Two houses and a city residence. Three fictional studies in shelter, light and the spaces between.</p>
      </div>
      <ol>
        {projects.map((p, i) => {
          const lead = p.architects[0];
          return (
            <li key={p.slug} data-selected-project={p.slug} className="border-t border-paper/15">
              <article className="group on-dark relative isolate flex min-h-[max(88svh,34rem)] flex-col justify-between overflow-hidden has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-8 has-[a:focus-visible]:outline-oxide-light">
                <Image
                  src={p.cover.src}
                  alt={p.cover.alt}
                  fill
                  sizes="(max-aspect-ratio: 16/9) 160svh, 100vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-arch)] group-hover:scale-[1.03]"
                  style={{ objectPosition: p.cover.focus ?? '50% 50%' }}
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 via-45% to-black/80" />

                <div className="page-x relative pt-24 [text-shadow:0_1px_12px_rgb(0_0_0/0.55)] md:pt-28">
                  <Reveal>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-12">
                      <p className="meta md:col-span-4" data-panel-coords>{p.coordinates.replace(', ', ', ')}</p>
                      <p className="meta text-right md:col-span-4 md:col-start-5 md:text-left" data-panel-place>
                        {p.location.split(',')[0]}, {p.year}
                      </p>
                      <p className="meta hidden text-right md:col-span-4 md:block">{String(i + 1).padStart(2, '0')} / 03</p>
                    </div>
                    <h3 className="mt-10 text-[clamp(3.25rem,min(13vw,17svh),10rem)] font-medium lowercase leading-[0.86] tracking-[-0.055em] [text-wrap:balance] md:ml-[33%] md:mt-14" data-panel-title>
                      {p.title}
                    </h3>
                  </Reveal>
                </div>

                <div className="page-x relative flex flex-col gap-6 pb-10 pt-16 [text-shadow:0_1px_12px_rgb(0_0_0/0.55)] sm:flex-row sm:items-end sm:justify-between md:pb-14">
                  <Reveal className="sm:order-2 sm:max-w-[28rem]">
                    <p className="text-[1.0625rem] leading-snug text-paper md:text-[1.1875rem]" data-panel-desc>{p.summary}</p>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-paper/70 pb-1 after:absolute after:inset-0 after:content-['']"
                    >
                      Explore<span className="sr-only"> {p.title}</span>
                      <ArrowUpRight aria-hidden className="size-4" />
                    </Link>
                  </Reveal>
                  <div className="flex items-center gap-3 sm:order-1" data-panel-chip>
                    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-paper/70 bg-black/35 font-mono text-[0.75rem] tracking-wide">{initials(lead)}</span>
                    <p className="meta">Designed by {lead}</p>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
