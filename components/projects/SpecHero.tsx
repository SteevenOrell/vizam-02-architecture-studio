import Image from '@/components/ui/ResponsiveImage';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DISCIPLINE_LABEL, type Project } from '@/content/types';
import { splitTitle } from '@/lib/split-title';

function firstSentence(text: string): string {
  const m = text.match(/^.+?[.!?](?=\s|$)/);
  return (m ? m[0] : text).trim();
}

/** Full-bleed project hero: display title, glass spec card, three tags and two short description columns. */
export function SpecHero({ project: p }: { project: Project }) {
  const { lead, accent } = splitTitle(p.title);
  const specs: [string, string][] = [
    ['Studio', 'Ostrel Atelier (fictional)'],
    ['Architects', p.architects.join(', ')],
    ['Location', p.location],
    ['Area', `${p.area.toLocaleString('en-GB')} m²`],
    ['Year', String(p.year)],
    ['Category', DISCIPLINE_LABEL[p.discipline]],
  ];

  return (
    <header className="project-hero on-dark relative isolate flex min-h-[max(92svh,36rem)] flex-col overflow-hidden bg-night text-paper">
      <Image src={p.cover.src} alt={p.cover.alt} fill priority sizes="(max-aspect-ratio: 16/9) 178svh, 100vw" placeholder="blur" className="object-cover" style={{ objectPosition: p.cover.focus ?? '50% 50%' }} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 via-40% to-black/85" />
      {/* Extra shade behind the small meta and tags at the top, which can sit on a bright sky */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-black/50 via-black/25 to-transparent" />

      <div className="page-x relative flex flex-1 flex-col gap-8 pb-10 pt-24 [text-shadow:0_1px_14px_rgb(0_0_0/0.5)] md:gap-10 md:pb-14 md:pt-28">
        <div>
          <Link href="/projects" className="meta inline-flex min-h-11 items-center gap-2 text-paper hover:underline">
            <ArrowLeft aria-hidden className="size-3.5" /> All projects
          </Link>
          <div className="mt-3 flex items-start justify-between gap-4">
            <p className="meta whitespace-pre-line text-paper" data-hero-meta>
              {DISCIPLINE_LABEL[p.discipline]} · {p.year}
              {'\n'}
              {p.coordinates.replace(', ', ',\n')}
            </p>
            <ul className="meta space-y-1 text-right text-paper" aria-label="Project tags" data-hero-tags>
              {p.tags.map((t) => (
                <li key={t}>— {t}</li>
              ))}
            </ul>
          </div>
        </div>

        <h1 className="text-[clamp(3.25rem,min(13vw,20svh),12rem)] font-medium leading-[0.86] tracking-[-0.055em] [text-wrap:balance]" data-hero-title>
          {lead}
          {accent && (
            <>
              {' '}
              <span className="font-serif font-light italic tracking-[-0.03em]">{accent}</span>
            </>
          )}
        </h1>

        <div className="mt-auto grid items-end gap-6 md:grid-cols-12 md:gap-10">
          <dl
            className="rounded-xl border border-paper/35 bg-night/85 p-5 text-[0.9375rem] leading-relaxed shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)] [text-shadow:none] supports-[backdrop-filter]:bg-black/40 supports-[backdrop-filter]:backdrop-blur-md md:col-span-5 lg:col-span-4"
            data-spec-card
          >
            {specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 py-0.5">
                <dt className="text-paper/80">{k}</dt>
                <dd className="font-medium text-paper">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="grid gap-4 text-[0.9375rem] leading-snug text-paper sm:grid-cols-2 sm:gap-8 md:col-span-7 lg:col-span-6 lg:col-start-7" data-hero-desc>
            <p>{p.summary}</p>
            <p>{firstSentence(p.intro)}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
