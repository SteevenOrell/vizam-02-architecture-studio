import { Axonometric } from '@/components/drawings';
import { Reveal } from '@/components/ui/Reveal';
import { projects } from '@/content/projects';
import { studioFacts } from '@/content/studio';
import Link from 'next/link';

/**
 * Light paper hero: mixed sans and serif-italic headline, the exploded axonometric as the centred object (it bleeds off
 * the right edge on wide screens), a label block with an outline button, and a row of fictional concept figures.
 * The arrangement is the same on phones, only scaled. Reveal is the only motion.
 */
export function StudioHero() {
  const stats = [
    { value: String(projects.length), caption: 'Projects shown in this catalogue' },
    { value: String(studioFacts.founded), caption: 'Year the fictional studio opened' },
    { value: String(studioFacts.people), caption: 'People around one long table' },
    { value: String(studioFacts.cities.length), caption: `Desks, in ${studioFacts.cities.join(' and ')}` },
  ];
  return (
    <header className="relative overflow-x-clip bg-paper pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-40" data-studio-hero>
      <div className="page-x">
        <p className="meta text-stone">(02) Studio</p>
        <h1 className="mt-5 max-w-[17ch] text-[clamp(2.25rem,8.2vw,8.5rem)] font-medium leading-[0.94] tracking-[-0.045em]">
          Quiet <em className="font-serif font-light italic tracking-[-0.03em]">architecture</em>, led by materials and drawn{' '}
          <em className="font-serif font-light italic tracking-[-0.03em]">slowly by hand.</em>
        </h1>
      </div>

      <div className="relative mt-8 md:mt-12" data-studio-object>
        <Reveal className="ml-auto w-[92%] sm:w-[84%] lg:w-[72%]">
          <div className="border border-r-0 border-hairline bg-paper shadow-[0_40px_60px_-40px_rgb(27_26_23/0.35)]">
            <Axonometric className="w-full" title="Exploded axonometric drawing of a fictional house, with its floor plate, walls, structure and roofs lifted apart in four layers." />
          </div>
        </Reveal>
        <div className="page-x mt-6 w-[58%] max-w-[22rem] sm:w-[34%] lg:absolute lg:bottom-6 lg:left-0 lg:mt-0 lg:w-[24%]">
          <p className="meta flex items-center gap-2 text-graphite"><span aria-hidden className="size-1.5 bg-oxide" /> Small studio</p>
          <p className="mt-3 text-[0.9375rem] leading-snug text-stone">
            {studioFacts.people} people in two cities, one shared sample library and a table where every project begins as card and plaster.
          </p>
          <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center border border-graphite px-5 text-[0.9375rem] tracking-tight transition-colors duration-500 hover:bg-graphite hover:text-paper">
            Start a project
          </Link>
        </div>
      </div>

      <div className="page-x mt-12 md:mt-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-hairline pt-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.caption} delay={i * 0.06} className="flex flex-col-reverse justify-end">
              <dt className="meta mt-3 max-w-[22ch] text-stone">{s.caption}</dt>
              <dd className="text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-none tracking-[-0.05em]">{s.value}</dd>
            </Reveal>
          ))}
        </dl>
        <p className="meta mt-8 text-stone">Concept data. The studio, its numbers and its people are fictional.</p>
      </div>
    </header>
  );
}
