'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { img } from '@/content/images';
import { principles } from '@/content/studio';
import { pad2 } from '@/lib/math';

const STATEMENT = 'We begin with light, then weight, then time. Everything else is a consequence.';

/**
 * Scroll-driven section 2 of 2 — the cinematic philosophy sequence.
 * Default markup (no JS / reduced motion): an image, the statement and four principles as a readable grid.
 * Enhanced: the stage pins inside a letterbox that slowly opens; the statement brightens word by word;
 * then four "chapters" cross-dissolve, each with its own image, counter and caption.
 */
export function CinematicPhilosophy({ label = '(04) Philosophy', headingId = 'philosophy-title' }: { label?: string; headingId?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const n = principles.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      el.dataset.enhanced = 'true';
      const words = gsap.utils.toArray<HTMLElement>('[data-word]', el);
      const bars = gsap.utils.toArray<HTMLElement>('[data-bar]', el);
      const lead = el.querySelector<HTMLElement>('[data-lead-img]');
      const statement = el.querySelector<HTMLElement>('[data-statement]');
      const chImgs = gsap.utils.toArray<HTMLElement>('[data-ch-img]', el);
      const chText = gsap.utils.toArray<HTMLElement>('[data-ch-text]', el);
      const chIndicator = el.querySelector<HTMLElement>('[data-ch-indicator]');

      gsap.set(bars, { scaleY: 1 });
      gsap.set(lead, { scale: 1.18 });
      gsap.set(words, { opacity: 0.14 });
      gsap.set(chImgs, { autoAlpha: 0, scale: 1.08 });
      gsap.set(chText, { autoAlpha: 0, y: 40 });
      gsap.set(chIndicator, { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${window.innerHeight * (n + 2.5)}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * tl.duration() - 2;
            const i = Math.max(0, Math.min(n - 1, Math.floor(t)));
            if (counter.current) counter.current.textContent = pad2(i + 1);
          },
        },
      });

      // Act 1 — the letterbox opens and the statement brightens word by word.
      tl.to(bars, { scaleY: 0.28, duration: 2 }, 0)
        .to(lead, { scale: 1, duration: 2 }, 0)
        .to(words, { opacity: 1, stagger: 1.4 / words.length, duration: 0.3 }, 0.1);

      // Act 2 — chapters cross-dissolve.
      tl.to(statement, { autoAlpha: 0, y: -40, duration: 0.4 }, 2)
        .to(lead, { autoAlpha: 0, duration: 0.5 }, 2)
        .to(chIndicator, { autoAlpha: 1, duration: 0.3 }, 2);
      for (let i = 0; i < n; i++) {
        const at = 2 + i;
        tl.to(chImgs[i], { autoAlpha: 1, scale: 1, duration: 0.6 }, at)
          .to(chText[i], { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.2);
        if (i < n - 1) {
          tl.to(chText[i], { autoAlpha: 0, y: -30, duration: 0.25 }, at + 0.8)
            .to(chImgs[i], { autoAlpha: 0, duration: 0.5 }, at + 0.85);
        }
      }
      tl.to({}, { duration: 0.5 });

      return () => {
        delete el.dataset.enhanced;
      };
    });

    return () => mm.revert();
  }, [n]);

  return (
    <section aria-labelledby={headingId} className="relative bg-night text-paper">
      <div ref={root} className="group/cine on-dark relative overflow-hidden">
        <div className={`page-x py-24 group-data-[enhanced=true]/cine:h-[100svh] group-data-[enhanced=true]/cine:p-0`}>
          {/* Lead image inside a letterbox */}
          <div className={`relative aspect-[16/9] overflow-hidden group-data-[enhanced=true]/cine:absolute group-data-[enhanced=true]/cine:inset-0 group-data-[enhanced=true]/cine:aspect-auto`}>
            <div data-lead-img className="absolute inset-0 will-change-transform">
              <Image src={img.philosophyWindow} alt="Empty room opening onto a misty landscape through a full-height window" fill sizes="100vw" placeholder="blur" className="object-cover" />
            </div>
            <div aria-hidden className="absolute inset-0 bg-black/45" />
            {principles.map((p) => (
              <div key={p.index} data-ch-img className={`absolute inset-0 hidden group-data-[enhanced=true]/cine:block`}>
                <Image src={p.image.src} alt="" fill sizes="100vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-black/55" />
              </div>
            ))}
            <div aria-hidden data-bar className={`absolute inset-x-0 top-0 hidden h-[22%] origin-top bg-night group-data-[enhanced=true]/cine:block`} />
            <div aria-hidden data-bar className={`absolute inset-x-0 bottom-0 hidden h-[22%] origin-bottom bg-night group-data-[enhanced=true]/cine:block`} />
          </div>

          {/* Statement */}
          <div data-statement className={`relative mt-12 group-data-[enhanced=true]/cine:page-x group-data-[enhanced=true]/cine:absolute group-data-[enhanced=true]/cine:inset-0 group-data-[enhanced=true]/cine:mt-0 group-data-[enhanced=true]/cine:flex group-data-[enhanced=true]/cine:flex-col group-data-[enhanced=true]/cine:justify-center`}>
            <p className="meta text-stone-light">{label}</p>
            <h2 id={headingId} className="statement mt-6 max-w-[22ch] !text-[clamp(2rem,5.2vw,5.5rem)]">
              {STATEMENT.split(' ').map((w, i) => (
                <span key={i} data-word className="inline-block whitespace-pre">{w}{' '}</span>
              ))}
            </h2>
          </div>

          {/* Chapters */}
          <ol className={`mt-16 grid gap-10 sm:grid-cols-2 group-data-[enhanced=true]/cine:mt-0`}>
            {principles.map((p) => (
              <li
                key={p.index}
                data-ch-text
                className={`grid gap-4 group-data-[enhanced=true]/cine:page-x group-data-[enhanced=true]/cine:absolute group-data-[enhanced=true]/cine:inset-x-0 group-data-[enhanced=true]/cine:bottom-[18%] group-data-[enhanced=true]/cine:md:grid-cols-12`}
              >
                <div className={`relative aspect-[4/3] overflow-hidden group-data-[enhanced=true]/cine:hidden`}>
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className={`group-data-[enhanced=true]/cine:md:col-span-7`}>
                  <p className="meta text-stone-light">Principle {p.index}</p>
                  <h3 className="display-md mt-2">{p.title}</h3>
                </div>
                <p className={`max-w-[36ch] text-[1.0625rem] text-paper/85 group-data-[enhanced=true]/cine:md:col-span-5 group-data-[enhanced=true]/cine:self-end`}>{p.body}</p>
              </li>
            ))}
          </ol>

          <div aria-hidden data-ch-indicator className={`page-x pointer-events-none absolute inset-x-0 top-[24%] hidden group-data-[enhanced=true]/cine:block`}>
            <span className="meta tabular-nums text-paper/80"><span ref={counter}>01</span> / {pad2(n)} — Principles</span>
          </div>
        </div>
      </div>
    </section>
  );
}
