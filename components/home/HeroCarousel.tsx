'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DISCIPLINE_LABEL, type Project } from '@/content/types';
import { pad2, wrapIndex } from '@/lib/math';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

const INTERVAL = 7000;
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Full-bleed hero project carousel.
 * - Title rail = slide picker (buttons), plus previous/next and pause/play.
 * - Autoplay every 7 s; pauses on hover, on keyboard focus inside, when the tab is hidden, and never starts
 *   for people who prefer reduced motion. Arrow keys work when focus is inside the carousel; swipe on touch.
 */
export function HeroCarousel({ projects }: { projects: Project[] }) {
  const n = projects.length;
  const [index, setIndex] = useState(0);
  // null = follow the default (autoplay unless reduced motion); otherwise the visitor's explicit choice.
  const [choice, setChoice] = useState<'play' | 'pause' | null>(null);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const reduce = usePrefersReducedMotion();
  const rail = useRef<HTMLDivElement>(null);
  const railTrack = useRef<HTMLUListElement>(null);
  const [railX, setRailX] = useState(0);
  const touchX = useRef<number | null>(null);

  const playing = choice === 'play' || (choice === null && !reduce);
  const paused = !playing || hoverPaused || focusPaused || tabHidden;

  const go = useCallback((i: number) => setIndex(wrapIndex(i, n)), [n]);
  const next = useCallback(() => setIndex((i) => wrapIndex(i + 1, n)), [n]);
  const prev = useCallback(() => setIndex((i) => wrapIndex(i - 1, n)), [n]);

  // Autoplay timer (restarts on every slide change so the progress line and timer agree).
  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(next, INTERVAL);
    return () => window.clearTimeout(t);
  }, [paused, index, next]);

  // Pause while the tab is hidden.
  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Centre the active title in the rail.
  useIsoLayoutEffect(() => {
    const track = railTrack.current;
    const box = rail.current;
    if (!track || !box) return;
    const measure = () => {
      const item = track.children[index] as HTMLElement | undefined;
      if (!item) return;
      setRailX(box.clientWidth / 2 - (item.offsetLeft + item.offsetWidth / 2));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, [index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const current = projects[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured projects"
      data-paused={paused}
      className="on-dark relative isolate h-[100svh] min-h-[34rem] w-full overflow-hidden bg-night text-paper"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusPaused(false); }}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) { if (dx < 0) next(); else prev(); }
        touchX.current = null;
      }}
    >
      {/* Slides */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.slug}
            className="absolute inset-0"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: reduce ? 0.2 : 1.1, ease: 'easeInOut' }, scale: { duration: 6, ease: 'easeOut' } }}
          >
            <Image
              src={current.cover.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              placeholder="blur"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30" />
      </div>

      {/* Slide content (one group per slide, only the current one rendered) */}
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${n}`}
        className="page-x absolute inset-x-0 bottom-[11.5rem] sm:bottom-[12.5rem]"
      >
        <p className="sr-only" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
          {`Slide ${index + 1} of ${n}: ${current.title}, ${DISCIPLINE_LABEL[current.discipline]}, ${current.year}`}
        </p>
        <h1 className="sr-only">Ostrel Atelier — architecture and interiors (fictional studio)</h1>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.slug}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.1, 1] }}
            className="grid gap-6 md:grid-cols-12 md:items-end"
          >
            <div className="md:col-span-8">
              <p className="meta text-paper/80">
                {pad2(index + 1)} — {DISCIPLINE_LABEL[current.discipline]} · {current.location}
              </p>
              <p className="display-xl mt-3 [text-wrap:balance]">{current.title}</p>
            </div>
            <div className="md:col-span-4 md:pb-3">
              <p className="max-w-[34ch] text-[1.0625rem] leading-snug text-paper/90">{current.summary}</p>
              <Link
                href={`/projects/${current.slug}`}
                className="group mt-5 inline-flex items-center gap-2 border-b border-paper/50 pb-1 text-[0.95rem] hover:border-paper"
              >
                View {current.title}
                <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Title rail + controls */}
      <div className="absolute inset-x-0 bottom-0 border-t border-paper/20 bg-black/20 backdrop-blur-[2px]">
        <div ref={rail} className="relative h-[5.25rem] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)]">
          <ul
            ref={railTrack}
            aria-label="Choose a project"
            className="absolute left-0 top-0 flex h-full items-center gap-10 whitespace-nowrap transition-transform duration-700 ease-[var(--ease-arch)] sm:gap-16"
            style={{ transform: `translateX(${railX}px)` }}
          >
            {projects.map((p, i) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index ? 'true' : undefined}
                  className={`flex flex-col items-center px-2 py-2 text-center transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-60 hover:opacity-90'}`}
                >
                  <span className="text-[0.95rem] font-medium tracking-tight">{p.title}</span>
                  <span className="meta mt-1 text-[0.625rem] text-paper/80">{p.year} | {DISCIPLINE_LABEL[p.discipline]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="page-x flex h-[4.25rem] items-center gap-4 border-t border-paper/15 sm:gap-6">
          <span className="meta tabular-nums text-paper/90" aria-hidden>
            {pad2(index + 1)} / {pad2(n)}
          </span>
          <div aria-hidden className="relative h-px flex-1 bg-paper/25">
            <span key={`${index}-${playing}`} className={`absolute inset-0 origin-left bg-paper ${playing ? 'progress-run' : 'scale-x-0'}`} style={{ ['--duration' as string]: `${INTERVAL}ms` }} />
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={prev} aria-label="Previous project" className="grid size-11 place-items-center rounded-full transition-colors hover:bg-paper/15">
              <ArrowLeft aria-hidden className="size-5" strokeWidth={1.25} />
            </button>
            <button type="button" onClick={next} aria-label="Next project" className="grid size-11 place-items-center rounded-full transition-colors hover:bg-paper/15">
              <ArrowRight aria-hidden className="size-5" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={() => setChoice(playing ? 'pause' : 'play')}
              aria-label={playing ? 'Pause automatic slideshow' : 'Play automatic slideshow'}
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-paper/15"
            >
              {playing ? <Pause aria-hidden className="size-4" strokeWidth={1.5} /> : <Play aria-hidden className="size-4" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
