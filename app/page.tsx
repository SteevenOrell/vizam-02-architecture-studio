import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CinematicPhilosophy } from '@/components/home/CinematicPhilosophy';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { HomeStudy } from '@/components/home/HomeStudy';
import { ScrollShowcase } from '@/components/home/ScrollShowcase';
import { PostCard } from '@/components/journal/PostCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ArrowLink, MetaRows, SectionLabel } from '@/components/ui/bits';
import { Reveal } from '@/components/ui/Reveal';
import { posts } from '@/content/journal';
import { featuredProjects, getProject, projects } from '@/content/projects';
import { services } from '@/content/studio';

const showcase = ['olive-court-house', 'mar-de-cal', 'mira-residence'].map((s) => getProject(s)!);

export default function Home() {
  return (
    <>
      <HeroCarousel projects={featuredProjects} />

      {/* (01) Studio intro — extreme scale contrast between display type and micro meta */}
      <section aria-labelledby="intro-title" className="page-x py-28 md:py-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionLabel index="01" className="text-stone lg:col-span-3">The studio</SectionLabel>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 id="intro-title" className="display-lg max-w-[13ch]">Quiet buildings, carefully made.</h2>
            </Reveal>
            <div className="mt-14 grid gap-12 md:grid-cols-2">
              <Reveal delay={0.1}>
                <p className="statement !text-[clamp(1.4rem,2.4vw,2.25rem)]">
                  Ostrel is a small practice for architecture and interiors. We work slowly, with models and daylight, on
                  houses, hotels and rooms for culture and work.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <MetaRows
                  rows={[
                    { label: 'Founded', value: '2014 (fictional)' },
                    { label: 'Studios', value: 'Lisbon · Copenhagen' },
                    { label: 'Disciplines', value: 'Architecture, interiors, reuse, objects' },
                    { label: 'People', value: '14 architects, designers and makers' },
                  ]}
                />
                <ArrowLink href="/studio" className="mt-8">About the studio</ArrowLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ScrollShowcase projects={showcase} />

      {/* (03) Services — restrained index rows */}
      <section aria-labelledby="services-title" className="page-x py-28 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="03" className="text-stone">Services</SectionLabel>
            <h2 id="services-title" className="display-md mt-5">What we draw</h2>
          </div>
          <ArrowLink href="/services">All services</ArrowLink>
        </div>
        <ul className="mt-14 border-t border-hairline">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-hairline">
              <Link href={`/services#${s.slug}`} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-6 md:grid-cols-[6rem_1fr_1fr_auto]">
                <span className="meta text-stone">{s.index}</span>
                <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2">{s.title}</span>
                <span className="hidden max-w-[40ch] text-stone md:block">{s.lead}</span>
                <ArrowUpRight aria-hidden className="size-5 text-stone transition-colors group-hover:text-oxide" strokeWidth={1.5} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <HomeStudy />

      <CinematicPhilosophy />

      {/* (05) Index of work — equal cards, staggered columns */}
      <section aria-labelledby="index-title" className="page-x py-28 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="05" className="text-stone">Index</SectionLabel>
            <h2 id="index-title" className="display-md mt-5">More from the studio <sup className="meta align-super text-stone">({projects.filter((p) => !showcase.includes(p) && !p.featured).length})</sup></h2>
          </div>
          <ArrowLink href="/projects">See all projects</ArrowLink>
        </div>
        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.filter((p) => !showcase.includes(p) && !p.featured).map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08} className={i % 3 === 1 ? 'lg:mt-24' : ''}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* (06) Journal */}
      <section aria-labelledby="journal-title" className="page-x border-t border-hairline py-28 md:pt-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="06" className="text-stone">Journal</SectionLabel>
            <h2 id="journal-title" className="display-md mt-5">Notes from the bench</h2>
          </div>
          <ArrowLink href="/journal">All entries</ArrowLink>
        </div>
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <li key={post.slug}><PostCard post={post} /></li>
          ))}
        </ul>
      </section>
    </>
  );
}
