import Image from '@/components/ui/ResponsiveImage';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DISCIPLINE_LABEL, type Project } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';

/** Distinct projects with complete landscape compositions, including on phones. */
export function ScrollShowcase({ projects }: { projects: Project[] }) {
  return (
    <section aria-labelledby="showcase-title" className="page-x bg-night py-24 text-paper md:py-32">
      <div className="mx-auto max-w-[1040px]">
        <p className="meta text-stone-light">(02) Selected work</p>
        <h2 id="showcase-title" className="display-lg mt-5 max-w-[14ch]">Places to belong.</h2>
        <p className="mt-8 max-w-[48ch] text-paper/80">Two houses and a city residence. Three fictional studies in shelter, light and the spaces between.</p>
        <ol className="mt-16 space-y-20 md:space-y-28">
          {projects.map((p, i) => (
            <li key={p.slug} data-selected-project={p.slug}>
              <Reveal>
                <div className="relative aspect-[1672/941] overflow-hidden bg-night">
                  <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 1100px) 1040px, 94vw" placeholder="blur" className="object-contain" />
                </div>
                <div className="mt-6 grid gap-5 border-t border-paper/25 pt-6 md:grid-cols-2">
                  <div><p className="meta text-stone-light">0{i + 1} — {DISCIPLINE_LABEL[p.discipline]} · Fictional concept</p><h3 className="display-md mt-3">{p.title}</h3></div>
                  <div><p className="max-w-[42ch] text-paper/85">{p.summary}</p><Link href={`/projects/${p.slug}`} className="mt-5 inline-flex items-center gap-2 border-b border-paper/50 pb-1">Explore {p.title}<ArrowUpRight aria-hidden className="size-4" /></Link></div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
