'use client';

import Link from 'next/link';
import { motion, MotionConfig } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AXO_LIFT, Axonometric, Elevation, FloorPlan, Section, SitePlan } from '@/components/drawings';
import Image from '@/components/ui/ResponsiveImage';
import { studyChapters } from '@/content/home-study';
import { img } from '@/content/images';
import { pad2 } from '@/lib/math';
import {
  STUDY_MARKS,
  STUDY_SCROLL_SCREENS,
  STUDY_TOTAL,
  chapterAt,
  chapterProgress,
  settleProgress,
} from '@/lib/study-timeline';
import { prepareLayer } from './drawing-reveal';

const DRAWINGS = [SitePlan, FloorPlan, Elevation, Section, Axonometric];
const N = studyChapters.length;
/** Draw-in schedule of the four drawing layers, relative to the start of a chapter: [start, duration]. */
const LAYER_TIMING: [number, number][] = [[0.2, 0.55], [0.35, 0.65], [0.6, 0.6], [0.85, 0.55]];

/**
 * Scroll-driven section 1 of 2: "A home, drawn".
 *
 * Default markup (no JS, reduced motion, or a viewport of 250 px and under, where the layout is locked and panned) is a
 * static sequence: the photograph, then every drawing as a captioned figure.
 * Enhanced: the stage pins. A framed window with the photograph grows to fill it over a huge sliding marquee, then seven
 * chapters follow, wiping from the photograph through the drawings (each drawn in with stroke-dashoffset) and back.
 * Only transform, opacity, clip-path and stroke-dashoffset are animated. The other scroll section is CinematicPhilosophy.
 */
export function HomeToDrawings() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const railFill = useRef<HTMLSpanElement>(null);
  const barFill = useRef<HTMLSpanElement>(null);
  const knob = useRef<HTMLSpanElement>(null);
  const [chapter, setChapter] = useState(0);
  const tone = chapter === 0 || chapter === N - 1 ? 'light' : 'dark';

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const q = <T extends Element>(s: string) => el.querySelector<T>(s)!;
    const qa = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 251px)', () => {
      el.dataset.enhanced = 'true';
      const stage = q<HTMLElement>('.hs-stage');
      const photo = q<HTMLElement>('[data-photo]');
      const photoImg = q<HTMLElement>('[data-photo-img]');
      const frame = q<HTMLElement>('[data-frame]');
      const rows = qa<HTMLElement>('[data-marquee]');
      const ui = q<HTMLElement>('[data-hud]');
      const prompt = q<HTMLElement>('[data-prompt]');
      const sheetsWrap = q<HTMLElement>('[data-sheets]');
      const sheets = qa<HTMLElement>('[data-sheet]');
      const bar = q<HTMLElement>('[data-bar]');
      const scrim = q<HTMLElement>('.hs-scrim');

      // Window size: a framed window in the middle of the stage (set from JS so the clip and the frame always agree).
      let win = { w: 0, h: 0 };
      let barW = 0;
      const measure = () => {
        const W = stage.clientWidth;
        const H = stage.clientHeight;
        const w = Math.min(640, W * 0.8);
        const h = Math.min(H * 0.5, w * 0.9 + 60);
        win = { w, h };
        frame.style.width = `${w}px`;
        frame.style.height = `${h}px`;
        barW = bar.clientWidth;
      };
      measure();
      const inset = () => {
        const W = stage.clientWidth;
        const H = stage.clientHeight;
        const x = (W - win.w) / 2;
        const y = (H - win.h) / 2;
        return `inset(${y}px ${x}px ${y}px ${x}px)`;
      };
      const startScale = () => Math.max(win.w / stage.clientWidth, win.h / stage.clientHeight);

      // Line-draw layers for every drawing
      const layerSets = sheets.map((sheet) =>
        qa<SVGGElement>('[data-layer]').filter((l) => sheet.contains(l)).sort((a, b) => Number(a.dataset.layer) - Number(b.dataset.layer)).map((l) => prepareLayer(l)),
      );

      gsap.set(ui, { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${window.innerHeight * STUDY_SCROLL_SCREENS}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh: measure,
          onUpdate: (self) => {
            const t = self.progress * STUDY_TOTAL;
            setChapter(chapterAt(t));
            const p = chapterProgress(t);
            if (railFill.current) railFill.current.style.transform = `scaleY(${p})`;
            if (barFill.current) barFill.current.style.transform = `scaleX(${p})`;
            if (knob.current) knob.current.style.transform = `translateX(${p * barW}px)`;
          },
        },
      });
      trigger.current = tl.scrollTrigger ?? null;

      // Intro: the window grows to fill the stage while the marquee slides sideways and fades away.
      tl.fromTo(photo, { clipPath: inset }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 1.0, ease: 'power2.inOut' }, 0.05)
        .fromTo(photoImg, { scale: startScale }, { scale: 1, duration: 1.0, ease: 'power2.inOut' }, 0.05)
        .to(frame, { opacity: 0, duration: 0.45 }, 0.05)
        .fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.65)
        .to(prompt, { opacity: 0, duration: 0.35 }, 0)
        .fromTo(rows[0], { xPercent: -2 }, { xPercent: -34, duration: 1.4 }, 0)
        .fromTo(rows[1], { xPercent: -34 }, { xPercent: -2, duration: 1.4 }, 0)
        .to(rows, { opacity: 0, duration: 0.3 }, 1.0)
        .to(ui, { autoAlpha: 1, duration: 0.4 }, 1.0);

      // Chapters 2 to 6: wipe the sheet in, then draw its layers.
      sheets.forEach((sheet, k) => {
        const t0 = STUDY_MARKS[k + 1];
        tl.fromTo(sheet, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power2.inOut' }, t0);
        layerSets[k].forEach((layer, li) => {
          const proxy = { p: 0 };
          const [s, d] = LAYER_TIMING[Math.min(li, LAYER_TIMING.length - 1)];
          tl.to(proxy, { p: 1, duration: d, onUpdate: () => layer.apply(proxy.p) }, t0 + s);
        });
      });

      // Chapter 6: the exploded axonometric. Layers drift apart at full draw, hold, then regroup.
      const t6 = STUDY_MARKS[5];
      const groups = (['walls', 'structure', 'roof'] as const).map((k) => ({ k, g: q<SVGGElement>(`[data-axo="${k}"]`) }));
      const structure = groups[1].g;
      const extras = qa<SVGElement>('[data-axo-label],[data-axo-guides]');
      groups.forEach(({ k, g }) => {
        tl.fromTo(g, { y: 0 }, { y: -AXO_LIFT[k], duration: 0.8, ease: 'power2.inOut' }, t6 + 1.4);
        tl.to(g, { y: 0, duration: 0.8, ease: 'power2.inOut' }, t6 + 2.7);
      });
      tl.fromTo(structure, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t6 + 1.4)
        .to(structure, { opacity: 0, duration: 0.3 }, t6 + 3.3)
        .fromTo(extras, { opacity: 0 }, { opacity: 1, duration: 0.4 }, t6 + 1.9)
        .to(extras, { opacity: 0, duration: 0.3 }, t6 + 2.7);

      // Chapter 7: the drawings slide away and the photograph is back.
      tl.fromTo(sheetsWrap, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.7, ease: 'power2.inOut', immediateRender: false }, STUDY_MARKS[6]);
      tl.to({}, { duration: 0.001 }, STUDY_TOTAL - 0.001);

      return () => {
        delete el.dataset.enhanced;
        layerSets.flat().forEach((l) => l.reset());
        trigger.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  const go = (i: number) => {
    const st = trigger.current;
    if (st) {
      window.scrollTo({ top: st.start + (st.end - st.start) * settleProgress(i), behavior: 'smooth' });
    }
  };

  const current = studyChapters[chapter];
  const last = N - 1;

  return (
    <MotionConfig reducedMotion="user">
      <section ref={root} aria-labelledby="home-study-title" className="hs">
        <div className="hs-head">
          <p className="meta text-stone">Fictional design study · Olive House</p>
          <h2 id="home-study-title" className="display-lg mt-5 max-w-[14ch]">A home, drawn.</h2>
          <p className="mt-6 max-w-[48ch] text-stone body-copy">
            Begin with the photograph. Scroll to follow the house into the drawings that describe it: the site, the plan, the elevation, the section and an exploded axonometric.
          </p>
        </div>

        <div className="hs-stage">
          {/* Decorative marquee behind the window */}
          <div className="hs-marquee" aria-hidden="true">
            <span data-marquee className="hs-marquee-row">{Array.from({ length: 6 }, (_, i) => <span key={i}>Ostrel Atelier<i>/</i></span>)}</span>
            <span data-marquee className="hs-marquee-row">{Array.from({ length: 6 }, (_, i) => <span key={i}>A home, drawn<i>/</i></span>)}</span>
          </div>

          {/* The photograph (chapters 1 and 7) */}
          <figure data-photo className="hs-photo">
            <div data-photo-img className="hs-photoimg">
              <Image
                src={img.homeStudy}
                alt="Low plaster house with oak screens and a stone terrace in an olive grove"
                fill
                sizes="(max-aspect-ratio: 16/9) 178svh, 100vw"
                placeholder="blur"
                loading="eager"
                fetchPriority="low"
                className="object-cover"
              />
            </div>
            <div className="hs-scrim" aria-hidden="true" />
            <figcaption className="hs-cap"><strong>01 · {studyChapters[0].title}</strong>{studyChapters[0].caption}</figcaption>
          </figure>
          <div data-frame className="hs-frame" aria-hidden="true"><i /><i /><i /><i /><span className="meta text-graphite">Olive House · fictional concept</span></div>

          {/* The drawings (chapters 2 to 6) */}
          <div data-sheets className="hs-sheets">
            {DRAWINGS.map((Drawing, k) => {
              const c = studyChapters[k + 1];
              return (
                <div key={c.id} data-sheet className="hs-sheet" id={`study-sheet-${c.id}`}>
                  <div className="hs-sheetbox">
                    <figure className="hs-fig">
                      <div className="hs-card"><Drawing /></div>
                      <figcaption className="hs-cap"><strong>{pad2(k + 2)} · {c.title}</strong>{c.caption}</figcaption>
                    </figure>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Static ending (chapter 7) */}
          <div className="hs-final">
            <p className="meta text-stone">{pad2(N)} · {studyChapters[last].title}</p>
            <p className="statement mt-4 max-w-[28ch] !text-[clamp(1.5rem,3vw,2.5rem)]">{studyChapters[last].caption}</p>
            <Link href="/projects" className="hs-more mt-6 text-graphite">See the projects</Link>
          </div>

          <a href="#after-home-study" className="hs-skip meta">Skip the chapters</a>
          <p data-prompt className="hs-prompt meta">Scroll to explore</p>

          {/* HUD: rail, title block, counter, progress bar (pinned mode only) */}
          <div data-hud className="hs-ui" data-tone={tone}>
            <p role="status" className="visually-hidden">Chapter {chapter + 1} of {N}: {current.title}. {current.subtitle}</p>
            <nav aria-label="Home study chapters" className="hs-rail">
              <span className="hs-rail-line" aria-hidden="true" />
              <span ref={railFill} className="hs-rail-fill" aria-hidden="true" />
              {studyChapters.map((c, i) => (
                <button key={c.id} type="button" className="hs-dot" aria-label={`Chapter ${i + 1}: ${c.title}`} aria-current={i === chapter ? 'step' : undefined} onClick={() => go(i)}>
                  <span />
                </button>
              ))}
            </nav>
            <div className="hs-hud">
              <motion.div key={chapter} className="hs-hud-text" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.1, 1] }}>
                <p className="hs-kicker">{current.kicker}</p>
                <p className="hs-title" data-hud-title>{current.title}</p>
                <p className="hs-sub">{current.subtitle}</p>
                {chapter === last && <Link href="/projects" className="hs-more">See the projects</Link>}
              </motion.div>
              <div className="hs-counter" aria-hidden="true">
                <motion.span key={chapter} className="hs-count" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.2, 0.7, 0.1, 1] }}>{pad2(chapter + 1)}</motion.span>
                <span className="hs-of">/ {pad2(N)}</span>
              </div>
            </div>
            <div data-bar className="hs-bar" aria-hidden="true">
              <span ref={barFill} className="hs-bar-fill" />
              {Array.from({ length: N - 2 }, (_, i) => <i key={i} style={{ left: `${((i + 1) / (N - 1)) * 100}%` }} />)}
              <span ref={knob} className="hs-knob" />
            </div>
          </div>
        </div>
        <div id="after-home-study" tabIndex={-1} className="outline-none" />
      </section>
    </MotionConfig>
  );
}
