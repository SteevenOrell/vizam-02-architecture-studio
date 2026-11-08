import Image from '@/components/ui/ResponsiveImage';
import Link from 'next/link';
import { DISCIPLINE_LABEL, type Project } from '@/content/types';

/** Equal-size project card: fixed image ratio, caption row (title / area), one-line meta. */
export function ProjectCard({ project, index, sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' }: { project: Project; index?: number; sizes?: string }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group flex h-full flex-col" data-testid="project-card">
      <div className="relative aspect-[3/2] overflow-hidden bg-hairline">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-arch)] group-hover:scale-[1.04]"
        />
        {index !== undefined && (
          <span className="meta absolute left-3 top-3 bg-plaster/90 px-2 py-1 text-graphite">{String(index + 1).padStart(2, '0')}</span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4 border-b border-hairline pb-2">
        <h3 className="text-[1.125rem] font-medium tracking-tight">
          <span className="link-underline">{project.title}</span>
        </h3>
        <span className="meta shrink-0 text-stone">{project.area.toLocaleString('en-GB')} m²</span>
      </div>
      <p className="meta mt-2 text-stone">
        {DISCIPLINE_LABEL[project.discipline]} · {project.location} · {project.year}
      </p>
    </Link>
  );
}
