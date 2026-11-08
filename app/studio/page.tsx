import type { Metadata } from 'next';
import Image from '@/components/ui/ResponsiveImage';
import { ArrowLink, MetaRows, PageIntro, SectionLabel } from '@/components/ui/bits';
import { Reveal } from '@/components/ui/Reveal';
import { img } from '@/content/images';
import { people, processSteps } from '@/content/studio';

export const metadata: Metadata = {
  title: 'Studio',
  description: 'The people and working method of Ostrel Atelier, a fictional architecture and interiors studio (VIZAM concept).',
};

export default function StudioPage() {
  return (
    <>
      <PageIntro index="02" label="Studio" title="A small room full of models." lead="Fourteen people in two cities, one shared sample library and a long table where every project begins as card and plaster." />

      <section className="page-x grid gap-6 pb-24 md:grid-cols-12">
        <Reveal className="relative aspect-[4/3] overflow-hidden md:col-span-7">
          <Image src={img.studioBlocks} alt="Timber blocks stacked into a study model on the studio table" fill sizes="(min-width: 768px) 58vw, 100vw" placeholder="blur" className="object-cover" />
        </Reveal>
        <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden md:col-span-5 md:mt-32">
          <Image src={img.studioModel} alt="White card model of a gallery with a roof light" fill sizes="(min-width: 768px) 42vw, 100vw" placeholder="blur" className="object-cover" />
        </Reveal>
      </section>

      <section aria-labelledby="practice-title" className="page-x grid gap-12 border-t border-hairline py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel index="A" className="text-stone">Practice</SectionLabel>
          <h2 id="practice-title" className="display-md mt-4">How the studio works</h2>
        </div>
        <div className="body-copy space-y-6 text-graphite/90 lg:col-span-5">
          <p>We keep the studio small on purpose. Each project is led by one architect from first visit to handover, with a model maker and a materials lead beside them.</p>
          <p>We take on around six projects a year. That number lets us stay on site, draw every junction and come back a year after completion to see how the building has settled.</p>
        </div>
        <div className="lg:col-span-3">
          <MetaRows rows={[{ label: 'Projects / year', value: 'About 6' }, { label: 'Languages', value: 'PT, EN, DA' }, { label: 'Status', value: 'Fictional studio' }]} />
        </div>
      </section>

      <section aria-labelledby="process-title" className="page-x border-t border-hairline py-24">
        <SectionLabel index="B" className="text-stone">Process</SectionLabel>
        <h2 id="process-title" className="display-md mt-4">Five steps, no shortcuts</h2>
        <ol className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((s) => (
            <li key={s.index} className="flex h-full flex-col bg-plaster p-6 pb-10">
              <span className="meta text-oxide">{s.index}</span>
              <h3 className="mt-8 text-[1.5rem] font-medium tracking-tight">{s.title}</h3>
              <p className="mt-3 text-stone">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="people-title" className="page-x border-t border-hairline py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="C" className="text-stone">People</SectionLabel>
            <h2 id="people-title" className="display-md mt-4">The table</h2>
          </div>
          <p className="meta text-stone">Invented names — no real people are depicted</p>
        </div>
        <ul className="mt-12 border-t border-hairline">
          {people.map((p) => (
            <li key={p.name} className="grid gap-2 border-b border-hairline py-5 md:grid-cols-12 md:items-baseline">
              <span className="text-[1.375rem] font-medium tracking-tight md:col-span-4">{p.name}</span>
              <span className="meta text-stone md:col-span-3">{p.role}</span>
              <span className="text-graphite/85 md:col-span-5">{p.note}</span>
            </li>
          ))}
        </ul>
        <ArrowLink href="/contact" className="mt-12">Work with us</ArrowLink>
      </section>
    </>
  );
}
