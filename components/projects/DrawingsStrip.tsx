import { Elevation, FloorPlan } from '@/components/drawings';
import { Reveal } from '@/components/ui/Reveal';

/** Two equal sheets from the studio's fictional house study. Not a drawing of the project on the page. */
export function DrawingsStrip() {
  const sheets = [
    { Drawing: FloorPlan, title: 'Ground floor plan of the studio house study', name: 'Plan', note: 'Ground floor, 1:100' },
    { Drawing: Elevation, title: 'South elevation of the studio house study', name: 'Elevation', note: 'South, 1:100' },
  ];
  return (
    <section aria-labelledby="drawings-title" className="page-x border-t border-hairline py-24" data-drawings-strip>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 id="drawings-title" className="display-md">Drawings</h2>
          <p className="mt-4 max-w-[34ch] text-stone">Two sheets from the studio&apos;s fictional house study, drawn in the same hand. Illustrative: they are not drawings of this project.</p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-9">
          {sheets.map(({ Drawing, title, name, note }, i) => (
            <Reveal as="li" key={name} delay={i * 0.08}>
              <figure className="m-0">
                <div className="aspect-[4/3] overflow-hidden border border-hairline bg-paper">
                  <Drawing className="size-full" title={title} />
                </div>
                <figcaption className="meta mt-3 text-stone">{name} · {note}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
