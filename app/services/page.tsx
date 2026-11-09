import type { Metadata } from 'next';
import Image from '@/components/ui/ResponsiveImage';
import { ArrowLink, PageIntro } from '@/components/ui/bits';
import { DeliverableSheets } from '@/components/studio/DeliverableSheets';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/content/studio';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Architecture, interior architecture, renovation, hospitality and furniture design — services of the fictional Ostrel Atelier.',
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro index="03" label="Services" title="Five ways to begin." lead="Most projects combine two or three of these. All of them start with a visit, a measured survey and a model." />
      <div className="page-x pb-12">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className="grid scroll-mt-24 gap-8 border-t border-hairline py-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="meta text-oxide">{s.index}</p>
              <h2 id={`${s.slug}-title`} className="display-md mt-3">{s.title}</h2>
              <p className="statement mt-6 !text-[clamp(1.25rem,2vw,1.75rem)] text-graphite/90">{s.lead}</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-4">
              <div>
                <h3 className="meta text-stone">Scope</h3>
                <ul className="mt-3 space-y-2">{s.scope.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <h3 className="meta text-stone">You receive</h3>
                <ul className="mt-3 space-y-2">{s.deliverables.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
            <Reveal delay={0.05 * i} className="relative aspect-[4/3] overflow-hidden lg:col-span-3">
              <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 25vw, 100vw" placeholder="blur" className="object-cover" />
            </Reveal>
          </section>
        ))}
      </div>
      <DeliverableSheets />
      <div className="page-x border-t border-hairline pb-24 pt-12">
        <ArrowLink href="/contact">Describe your project</ArrowLink>
      </div>
    </>
  );
}
