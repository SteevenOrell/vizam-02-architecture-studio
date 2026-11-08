'use client';

import Image from '@/components/ui/ResponsiveImage';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { img } from '@/content/images';

const chapters = [
  ['The complete home', 'A sheltered terrace, an olive grove, and rooms drawn around the light.'],
  ['Ground', 'A stone platform establishes the threshold between landscape and home.'],
  ['Walls', 'Solid planes define shelter while keeping the garden in view.'],
  ['Openings', 'Deep reveals temper daylight and frame the long horizon.'],
  ['Roof', 'A light horizontal canopy shades the terrace and the glazing.'],
  ['Structure', 'The parts separate to show how mass, span and light work together.'],
  ['A place to live', 'The layers return to one whole: a quiet home, carefully made.'],
];

/** Original schematic architectural study, not a measured model of the generated concept. */
export function HomeStudy() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [chapter, setChapter] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      el.dataset.studyMotion = 'true';
      const photo = el.querySelector('[data-study-photo]');
      const diagram = el.querySelector('[data-study-diagram]');
      const roof = el.querySelector('[data-study-roof]');
      const walls = el.querySelector('[data-study-walls]');
      const openings = el.querySelector('[data-study-openings]');
      gsap.set(diagram, { autoAlpha: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top+=72', end: '+=3200', pin: true, scrub: 0.5, onUpdate: self => setChapter(Math.min(6, Math.floor(self.progress * 7))) } });
      tl.to({}, { duration: 0.6 })
        .to(photo, { autoAlpha: 0, duration: 0.5 })
        .to(diagram, { autoAlpha: 1, duration: 0.5 }, '<')
        .fromTo(walls, { opacity: 0.15 }, { opacity: 1, duration: 0.6 })
        .fromTo(openings, { opacity: 0 }, { opacity: 1, duration: 0.6 })
        .to(roof, { y: -65, duration: 0.7 })
        .to(walls, { y: -20, duration: 0.6 })
        .to(roof, { y: 0, duration: 0.7 })
        .to(walls, { y: 0, duration: 0.5 }, '<')
        .to(photo, { autoAlpha: 1, duration: 0.6 })
        .to(diagram, { autoAlpha: 0, duration: 0.6 }, '<');
      trigger.current = tl.scrollTrigger ?? null;
      return () => { delete el.dataset.studyMotion; trigger.current = null; };
    });
    return () => mm.revert();
  }, []);
  const go = (i: number) => {
    const st = trigger.current;
    if (st) window.scrollTo({ top: st.start + (st.end - st.start) * ((i + 0.3) / 7), behavior: 'instant' });
  };
  return (
    <section ref={root} aria-labelledby="study-title" className="home-study page-x bg-plaster py-16 md:py-20">
      <div className="mx-auto max-w-[1040px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div><p className="meta text-stone">Anatomy of a home · Fictional design study</p><h2 id="study-title" className="display-md mt-4">From landscape to living.</h2></div>
          <p className="max-w-[28ch] text-sm text-stone">Begin with the home. Scroll to explore the layers that give it shape.</p>
        </div>
        <div className="study-visual relative aspect-[1672/941] overflow-hidden bg-[#d8d2c6]">
          <div data-study-photo className="absolute inset-0"><Image src={img.homeStudy} alt="Low plaster home with oak screens and a stone terrace in an olive grove" fill sizes="(min-width: 850px) 800px, 94vw" placeholder="blur" className="object-contain" /></div>
          <div data-study-diagram className="absolute inset-0 invisible" aria-hidden="true">
            <svg viewBox="0 0 800 450" className="h-full w-full" fill="none" stroke="#514b40" strokeWidth="1.5">
              <path d="M100 310 470 155 720 270 350 425Z" fill="#bbb19d" />
              <g data-study-walls><path d="M150 285V185L480 70V170Z" fill="#eee8db"/><path d="M480 70 670 155V255L480 170Z" fill="#c9bfab"/><path d="M150 185 340 270V370L150 285Z" fill="#e1d8c6"/><path d="M340 270 670 155V255L340 370Z" fill="#ded3bd"/></g>
              <g data-study-openings fill="#786d58" fillOpacity=".55"><path d="M375 273 450 247V318L375 344Z"/><path d="M475 239 550 213V284L475 310Z"/><path d="M575 205 640 182V253L575 276Z"/></g>
              <g data-study-roof><path d="M125 178 477 53 700 149 344 281Z" fill="#f3eee3"/><path d="M125 178V190L344 292V281Z" fill="#b9ad97"/><path d="M344 281 700 149V161L344 292Z" fill="#c8bda7"/></g>
            </svg>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto]">
          <div className="min-h-24"><p className="meta text-stone">0{chapter + 1} / 07 · Schematic concept</p><h3 className="mt-2 text-2xl tracking-tight">{chapters[chapter][0]}</h3><p className="mt-2 max-w-[58ch] text-sm text-stone">{chapters[chapter][1]}</p></div>
          <nav aria-label="Home study chapters" className="study-controls flex flex-wrap items-start gap-2">
            {chapters.map(([title], i) => <button key={title} type="button" aria-label={title} aria-current={chapter === i ? 'step' : undefined} onClick={() => go(i)} className={`grid size-11 place-items-center rounded-full border text-sm ${chapter === i ? 'border-graphite bg-graphite text-paper' : 'border-stone text-graphite hover:bg-paper'}`}>{i + 1}</button>)}
          </nav>
        </div>
        <ol className="study-static mt-8 grid gap-6 border-t border-hairline pt-6 sm:grid-cols-2">{chapters.slice(1).map(([title, text]) => <li key={title}><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm text-stone">{text}</p></li>)}</ol>
      </div>
    </section>
  );
}
