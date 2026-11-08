import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { nav, site } from '@/content/studio';
import { FooterNote } from '@/components/layout/FooterNote';

export function Footer() {
  const year = 2026;
  return (
    <footer className="curtain-footer on-dark bg-night text-paper">
      <div className="page-x pt-20 pb-8 lg:pt-28">
        {/* Invitation */}
        <div className="grid gap-10 border-b border-paper/15 pb-16 lg:grid-cols-12">
          <p className="meta text-stone-light lg:col-span-3">(Next) — A conversation</p>
          <div className="lg:col-span-9">
            <p className="statement max-w-[18ch] !text-[clamp(2rem,4.8vw,4.75rem)]">
              Have a site, a room or a question? Start with a brief.
            </p>
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-paper/40 px-6 py-3 transition-colors hover:bg-paper hover:text-graphite"
            >
              Start a project
              <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Index + pinned colophon */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="meta text-stone-light">Index</h2>
            <ul className="mt-4 space-y-1.5 text-[1.0625rem]">
              <li><Link className="link-underline" href="/">Home</Link></li>
              {nav.map((item) => (
                <li key={item.href}><Link className="link-underline" href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <h2 className="meta text-stone-light">Studio</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {site.address.map((l) => (<span key={l} className="block">{l}</span>))}
              <a className="link-underline mt-3 inline-block" href={`mailto:${site.email}`}>{site.email}</a>
            </address>
            <p className="mt-6 text-stone-light">Mon–Fri, 09:00–18:00 · Visits by appointment</p>
          </div>

          <aside aria-label="Contact card" className="relative min-w-0 md:col-span-2 lg:col-span-5 lg:pl-8">
            <FooterNote year={year} />
          </aside>
        </div>

        {/* Wordmark */}
        <p aria-hidden className="select-none overflow-hidden text-center font-sans font-medium leading-[0.78] tracking-[-0.07em] text-paper text-[clamp(4rem,24vw,26rem)]">
          Ostrel
        </p>

        <div className="meta mt-6 flex flex-col gap-3 border-t border-paper/15 pt-6 text-stone-light sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}</p>
          <p className="text-paper">{site.disclaimer}</p>
          <p>Not a real practice · Demo forms only</p>
        </div>
      </div>
    </footer>
  );
}
