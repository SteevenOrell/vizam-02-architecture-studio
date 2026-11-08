'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DISCIPLINE_LABEL, type Project } from '@/content/types';
import { pad2 } from '@/lib/math';

/**
 * Scroll-driven section 1 of 2 — "Selected work".
 * Without JS or with prefers-reduced-motion: a plain, readable list (the default markup).
 * With motion allowed: the stage pins; the first frame is complete and readable, then each
 * following project is revealed by an upward clip-path wipe while its caption replaces the previous one.
 */
export function ScrollShowcase({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const n = projects.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      el.dataset.enhanced = 'true';
      const frames = gsap.utils.toArray<HTMLElement>('[data-frame]', el);

      const captions = gsap.utils.toArray<HTMLElement>('[data-caption]', el);
      const bar = el.querySelector<HTMLElement>('[data-bar]');

      gsap.set(frames[0], { clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.set(frames.slice(1), { clipPath: 'inset(100% 0% 0% 0% round 0px)' });

      gsap.set(captions, { autoAlpha: 0, y: 40 });
      gsap.set(captions[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${window.innerHeight * (n + 0.5)}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(n - 1, Math.floor(self.progress * (n + 0.5)));
            if (counter.current) counter.current.textContent = pad2(i + 1);
          },
        },
      });

      // Hold the full photograph on entry; no tiny crop or magnification.
      tl.to({}, { duration: 1 }, 0);

      // Following steps: wipe the next frame up over the previous one.
      for (let i = 1; i < n; i++) {
        tl.to(captions[i - 1], { autoAlpha: 0, y: -30, duration: 0.25 }, i)
          .to(frames[i], { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1 }, i)
          .to(captions[i], { autoAlpha: 1, y: 0, duration: 0.35 }, i + 0.6);
      }
      if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: n, ease: 'none' }, 0);
      tl.to({}, { duration: 0.5 }); // short hold on the last project

      triggerRef.current = tl.scrollTrigger ?? null;
      return () => {
        delete el.dataset.enhanced;
        triggerRef.current = null;
      };
    });

    return () => mm.revert();
  }, [n]);

  /** Keyboard users tabbing into a caption link are scrolled to that project's step. */
  const focusStep = (i: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const y = st.start + (st.end - st.start) * ((i + 0.9) / (n + 0.5));
    window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <section aria-labelledby="showcase-title" className="relative bg-night text-paper">
      <div className="page-x flex flex-col gap-6 pt-24 pb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="meta text-stone-light">(02) Selected work</p>
          <h2 id="showcase-title" className="display-lg mt-5 max-w-[12ch]">Four buildings, slowly.</h2>
        </div>
        <p className="max-w-[36ch] text-paper/80">
          Scroll to walk through a house, a hotel, a pavilion and a workplace — each drawn around the way light enters it.
        </p>
      </div>

      <div ref={root} className="group/show relative on-dark">
        <ol className="page-x grid gap-16 pb-24 group-data-[enhanced=true]/show:block group-data-[enhanced=true]/show:h-[100svh] group-data-[enhanced=true]/show:p-0 group-data-[enhanced=true]/show:pb-0">
          {projects.map((p, i) => (
            <li
              key={p.slug}
              className="grid gap-6 md:grid-cols-12 group-data-[enhanced=true]/show:absolute group-data-[enhanced=true]/show:inset-0 group-data-[enhanced=true]/show:block"
            >
              <div
                data-frame
                className="relative aspect-[4/3] overflow-hidden md:col-span-8 group-data-[enhanced=true]/show:absolute group-data-[enhanced=true]/show:inset-0 group-data-[enhanced=true]/show:aspect-auto"
              >
                <div className="absolute inset-0">
                  <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(max-aspect-ratio: 16/9) 178svh, 100vw" placeholder="blur" className="object-cover" />
                </div>
                <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-black/70 via-black/10 to-transparent group-data-[enhanced=true]/show:block" />
              </div>

              <div
                data-caption
                className="flex flex-col justify-end md:col-span-4 group-data-[enhanced=true]/show:page-x group-data-[enhanced=true]/show:absolute group-data-[enhanced=true]/show:inset-x-0 group-data-[enhanced=true]/show:bottom-20 group-data-[enhanced=true]/show:md:grid group-data-[enhanced=true]/show:md:grid-cols-12 group-data-[enhanced=true]/show:md:items-end group-data-[enhanced=true]/show:md:gap-6"
              >
                <div className="md:col-span-7">
                  <p className="meta text-paper/80">
                    {pad2(i + 1)} — {DISCIPLINE_LABEL[p.discipline]} · {p.year}
                  </p>
                  <h3 className="display-md mt-3">{p.title}</h3>
                </div>
                <div className="mt-4 md:col-span-5">
                  <p className="max-w-[38ch] text-paper/90">{p.summary}</p>
                  <p className="meta mt-3 text-paper/75">{p.location} · {p.area.toLocaleString('en-GB')} m²</p>
                  <Link
                    href={`/projects/${p.slug}`}
                    onFocus={() => focusStep(i)}
                    className="group mt-4 inline-flex items-center gap-2 border-b border-paper/50 pb-1 hover:border-paper"
                  >
                    Read the project <span className="sr-only">{p.title}</span>
                    <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Step indicator, only meaningful in the pinned version */}
        <div aria-hidden className="page-x pointer-events-none absolute inset-x-0 top-24 hidden items-center gap-4 group-data-[enhanced=true]/show:flex">
          <span className="meta tabular-nums"><span ref={counter}>01</span> / {pad2(n)}</span>
          <span className="relative h-px w-32 bg-paper/30"><span data-bar className="absolute inset-0 origin-left bg-paper" /></span>
        </div>
      </div>
    </section>
  );
}
