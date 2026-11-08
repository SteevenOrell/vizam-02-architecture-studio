import type { Metadata } from 'next';
import Image from '@/components/ui/ResponsiveImage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BeforeAfter } from '@/components/projects/BeforeAfter';
import { DrawingsStrip } from '@/components/projects/DrawingsStrip';
import { ProjectContextSection } from '@/components/projects/ProjectContextSection';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { SpecHero } from '@/components/projects/SpecHero';
import { MetaRows, SectionLabel } from '@/components/ui/bits';
import { Reveal } from '@/components/ui/Reveal';
import { getProject, nextProject, projects } from '@/content/projects';
import { DISCIPLINE_LABEL } from '@/content/types';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: 'Project not found' };
  return {
    title: p.title,
    description: `${p.summary} ${DISCIPLINE_LABEL[p.discipline]}, ${p.location}, ${p.year}. Fictional project — VIZAM concept.`,
    openGraph: { images: [{ url: p.cover.src.src, width: p.cover.src.width, height: p.cover.src.height, alt: p.cover.alt }] },
  };
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = nextProject(p.slug);

  return (
    <article>
      {/* Hero */}
      <SpecHero project={p} />

      {/* Intro + facts */}
      <section className="page-x grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-7">
          <SectionLabel className="text-stone">Overview</SectionLabel>
          <Reveal>
            <p className="statement mt-6">{p.intro}</p>
          </Reveal>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <MetaRows
            rows={[
              { label: 'Status', value: p.status },
              { label: 'Area', value: `${p.area.toLocaleString('en-GB')} m²` },
              ...p.facts,
              { label: 'Materials', value: p.materials.join(', ') },
            ]}
          />
          <p className="meta mt-4 text-stone">Fictional project · Illustrative imagery</p>
        </div>
      </section>

      {/* Gallery */}
      {p.gallery.length > 0 && <section aria-labelledby="gallery-title" className="page-x pb-24">
        <h2 id="gallery-title" className="meta mb-6 text-stone">Gallery — {p.gallery.length + 1} images</h2>
        <ProjectGallery images={[p.cover, ...p.gallery]} title={p.title} />
      </section>}

      {/* Story */}
      <section aria-label="Project story" className="page-x border-t border-hairline py-24">
        <ol className="grid gap-16 lg:grid-cols-3 lg:gap-10">
          {p.story.map((s, i) => (
            <Reveal as="li" key={s.heading} delay={i * 0.08}>
              <p className="meta text-stone">({String(i + 1).padStart(2, '0')})</p>
              <h2 className="mt-3 text-[1.75rem] font-medium leading-tight tracking-tight">{s.heading}</h2>
              <p className="body-copy mt-4 max-w-[46ch] text-graphite/85">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Context: fictional figures and fact rows */}
      <ProjectContextSection project={p} />

      {/* Drawings: the studio's fictional house study, on residential projects that show a gallery */}
      {p.discipline === 'residential' && p.gallery.length > 0 && <DrawingsStrip />}

      {/* Before / after */}
      {p.comparison && (
        <section aria-labelledby="compare-title" className="page-x border-t border-hairline py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel className="text-stone">Transformation</SectionLabel>
              <h2 id="compare-title" className="display-md mt-4">Before & after</h2>
              <p className="mt-4 max-w-[34ch] text-stone">Drag the handle, or focus it and use the arrow keys, to compare the existing condition with the finished room.</p>
            </div>
            <div className="lg:col-span-9">
              <BeforeAfter {...p.comparison} title={p.title} />
            </div>
          </div>
        </section>
      )}

      {/* Next project */}
      <Link href={`/projects/${next.slug}`} className="group on-dark relative mx-auto max-w-[1040px] block h-[60svh] min-h-[22rem] overflow-hidden bg-night text-paper">
        <Image src={next.cover.src} alt="" fill sizes="100vw" className="object-cover opacity-60 transition duration-[1.2s] ease-[var(--ease-arch)] group-hover:scale-[1.03] group-hover:opacity-75" />
        <span className="page-x relative flex h-full flex-col justify-end pb-12">
          <span className="meta">Next project</span>
          <span className="display-lg mt-3">{next.title}</span>
        </span>
      </Link>
    </article>
  );
}
