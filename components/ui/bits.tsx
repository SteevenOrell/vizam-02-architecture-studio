import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

/** Small mono label used as a section index, e.g. "(02) Selected work". */
export function SectionLabel({ index, children, className = '' }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`meta flex items-center gap-3 ${className}`}>
      {index && <span>({index})</span>}
      <span>{children}</span>
    </p>
  );
}

export function ArrowLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-3 text-[1rem] tracking-tight ${className}`}>
      <span className="link-underline">{children}</span>
      <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
    </Link>
  );
}

/** Label / value rows, as in an architectural title block. */
export function MetaRows({ rows, className = '' }: { rows: { label: string; value: ReactNode }[]; className?: string }) {
  return (
    <dl className={`divide-y divide-hairline border-y border-hairline ${className}`}>
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[minmax(7rem,38%)_1fr] gap-4 py-3">
          <dt className="meta pt-[0.2rem] text-stone">{r.label}</dt>
          <dd className="text-[0.975rem] leading-snug">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PageIntro({ index, label, title, lead }: { index: string; label: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <header className="page-x pt-36 pb-16 md:pt-44 lg:pb-24">
      <SectionLabel index={index} className="text-stone">{label}</SectionLabel>
      <h1 className="display-xl mt-6 max-w-[14ch]">{title}</h1>
      {lead && <p className="statement mt-10 max-w-[30ch] text-graphite/90 md:ml-[33%]">{lead}</p>}
    </header>
  );
}
