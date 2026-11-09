import { Elevation, FloorPlan, Section } from '@/components/drawings';
import { Reveal } from '@/components/ui/Reveal';

/** "What you receive": three sheets from the fictional house study, equal size, captioned. */
export function DeliverableSheets() {
  const sheets = [
    { Drawing: Elevation, name: 'Elevation', caption: 'Every face of the building, with levels, openings and materials marked.', title: 'South elevation sheet from a fictional house study' },
    { Drawing: Section, name: 'Section', caption: 'A slice through the house that shows height, structure and where daylight lands.', title: 'Section A-A sheet from a fictional house study' },
    { Drawing: FloorPlan, name: 'Plan', caption: 'Rooms, walls, doors and dimensions at 1:100, ready for planning and for the builder.', title: 'Ground floor plan sheet from a fictional house study' },
  ];
  return (
    <section aria-labelledby="receive-title" className="page-x border-t border-hairline py-24" data-deliverables>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="meta text-stone">Sheets</p>
          <h2 id="receive-title" className="display-md mt-4">What you receive</h2>
        </div>
        <p className="max-w-[44ch] text-stone lg:col-span-5 lg:col-start-7">
          Whatever the service, the drawing set is the core of the work. These three sheets come from a fictional concept house, drawn in our own hand to show the level of detail.
        </p>
      </div>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sheets.map(({ Drawing, name, caption, title }, i) => (
          <Reveal as="li" key={name} delay={i * 0.08}>
            <figure className="m-0 flex h-full flex-col">
              <div className="aspect-[25/16] overflow-hidden border border-hairline bg-paper">
                <Drawing className="size-full" title={title} />
              </div>
              <figcaption className="mt-4">
                <span className="meta text-oxide">{String(i + 1).padStart(2, '0')} · {name}</span>
                <span className="mt-2 block max-w-[38ch] text-stone">{caption}</span>
                <span className="meta mt-2 block text-stone">Fictional concept sheet</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
