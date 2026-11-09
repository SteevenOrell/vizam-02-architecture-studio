import { Section } from '@/components/drawings';
import { ArrowLink } from '@/components/ui/bits';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Very large, light-weight closing statement whose lines overlap an original section drawing printed as a negative
 * (light lines on night). A solid-to-clear gradient sits behind the lines so text keeps AA contrast over the linework.
 * The composition is the same on phones; the drawing is cropped, the lines only scale.
 */
export function ClosingStatement() {
  const lines = ['Quiet', 'comes', 'as', 'standard.'];
  const indent = ['ml-0', 'ml-[18%]', 'ml-[44%]', 'ml-[6%]'];
  return (
    <section aria-labelledby="closing-title" className="on-dark relative overflow-hidden bg-night text-paper" data-closing-statement>
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[1600px] overflow-hidden sm:aspect-[16/10] lg:aspect-[16/9]" data-closing-stage>
        <div aria-hidden className="absolute left-1/2 top-[56%] w-[205%] -translate-x-1/2 -translate-y-1/2 opacity-60 [filter:invert(1)_hue-rotate(180deg)] sm:top-1/2 sm:w-[112%]" data-closing-drawing>
          <Section className="w-full" title="Section drawing of a fictional house, printed as a negative" />
        </div>
        {/* Legibility band behind the text: opaque at the text side, clearing towards the drawing */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(100deg,rgb(20_19_15/0.92)_0%,rgb(20_19_15/0.7)_42%,rgb(20_19_15/0.15)_100%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night to-transparent" />
        <div className="page-x absolute inset-0 flex flex-col justify-center">
          <Reveal>
            <h2 id="closing-title" className="font-sans text-[clamp(3rem,17vw,5.5rem)] font-normal sm:text-[clamp(3rem,12vw,11rem)] leading-[0.92] tracking-[-0.055em]">
              {lines.map((l, i) => (
                <span key={l} className={`block ${indent[i]} ${i % 2 === 1 ? 'font-serif font-light italic tracking-[-0.03em]' : ''}`}>{l}{i < lines.length - 1 ? ' ' : ''}</span>
              ))}
            </h2>
          </Reveal>
        </div>
      </div>
      <div className="page-x grid gap-6 pb-20 pt-10 md:grid-cols-12 md:items-end">
        <p className="meta text-stone-light md:col-span-5">Section A-A, printed as a negative. Fictional concept sheet from a VIZAM study.</p>
        <p className="max-w-[46ch] text-paper/85 md:col-span-4 md:col-start-7">
          Quiet is not a style we add at the end. It is what is left when light, weight and materials have each been given their place.
        </p>
        <div className="md:col-span-2 md:col-start-11"><ArrowLink href="/projects">See it in the work</ArrowLink></div>
      </div>
    </section>
  );
}
