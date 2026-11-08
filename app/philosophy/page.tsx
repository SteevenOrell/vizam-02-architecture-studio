import type { Metadata } from 'next';
import Image from '@/components/ui/ResponsiveImage';
import { CinematicPhilosophy } from '@/components/home/CinematicPhilosophy';
import { ArrowLink, PageIntro, SectionLabel } from '@/components/ui/bits';
import { Reveal } from '@/components/ui/Reveal';
import { img } from '@/content/images';

export const metadata: Metadata = {
  title: 'Design Philosophy',
  description: 'Light before form, weight as comfort, thresholds as rooms and materials made to age — the design philosophy of the fictional Ostrel Atelier.',
};

const materials = [
  { name: 'Lime', note: 'Breathes, repairs itself, takes pigment from the ground it came from.' },
  { name: 'Oak', note: 'Oiled, never lacquered, so it darkens with hands and sun.' },
  { name: 'Concrete', note: 'Cast once, left visible, used where weight is useful.' },
  { name: 'Paper & timber screens', note: 'For light that should arrive softly.' },
];

export default function PhilosophyPage() {
  return (
    <>
      <PageIntro index="04" label="Design philosophy" title="Light, weight, time." lead="Four principles we return to on every project, from a single room to a public building." />
      {/* The same cinematic section as on the home page (scroll-driven section 2 of 2) */}
      <CinematicPhilosophy label="(A) The sequence" headingId="philosophy-page-title" />

      <section aria-labelledby="materials-title" className="page-x grid gap-12 py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="B" className="text-stone">Materials</SectionLabel>
          <h2 id="materials-title" className="display-md mt-4">A short library</h2>
          <Reveal className="relative mt-10 aspect-[3/4] max-w-md overflow-hidden">
            <Image src={img.materialSpheres} alt="Two cast concrete spheres on a mineral floor" fill sizes="(min-width: 1024px) 34vw, 100vw" placeholder="blur" className="object-cover" />
          </Reveal>
        </div>
        <ul className="self-end border-t border-hairline lg:col-span-6 lg:col-start-7">
          {materials.map((m, i) => (
            <li key={m.name} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-hairline py-6">
              <span className="meta text-stone">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-[1.5rem] font-medium tracking-tight">{m.name}</h3>
                <p className="mt-1 text-stone">{m.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="page-x border-t border-hairline py-24">
        <blockquote className="statement mx-auto max-w-[24ch] text-center">
          “A building should look better in twenty years than on the day we leave.”
        </blockquote>
        <p className="meta mt-6 text-center text-stone">Studio motto (fictional)</p>
        <div className="mt-12 flex justify-center"><ArrowLink href="/projects">See the principles in the work</ArrowLink></div>
      </section>
    </>
  );
}
