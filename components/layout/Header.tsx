'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav } from '@/content/studio';
import { pad2 } from '@/lib/math';
import { MenuPanel } from './MenuPanel';
import { Wordmark } from './Wordmark';

/** Routes that open on a full-bleed dark image, where the header starts in light text. */
function hasDarkHero(pathname: string) {
  return pathname === '/' || /^\/projects\/[^/]+$/.test(pathname);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Close the menu on navigation (state adjusted during render, as React recommends, rather than in an effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  const light = hasDarkHero(pathname) && !scrolled && !open;

  return (
    <>
      <header
        data-tone={light ? 'light' : 'dark'}
        className={[
          'is-fixed fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color] duration-500 ease-[var(--ease-arch)]',
          light ? 'on-dark text-paper' : 'text-graphite',
          scrolled && !light ? 'bg-plaster/85 backdrop-blur-md' : 'bg-transparent',
          'translate-y-0',
        ].join(' ')}
      >
        {light && (
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/45 to-transparent" />
        )}
        <div className="page-x relative flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="group flex items-baseline gap-2" aria-label="Ostrel Atelier, home">
            <Wordmark className="h-[1.35rem] w-auto" />{' '}
            <span className="meta hidden opacity-70 sm:inline">Atelier</span>
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {nav.slice(0, 5).map((item, i) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className="group flex items-start gap-1 text-[0.9375rem] tracking-tight"
                    >
                      <span className="meta mt-[-0.15rem] text-xs">{pad2(i + 1)}</span>
                      <span className={`link-underline ${active ? 'bg-[length:100%_1px]' : ''}`}>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={[
                'hidden rounded-full border px-4 py-2 text-[0.875rem] tracking-tight transition-colors md:inline-block',
                light ? 'border-paper/60 hover:bg-paper hover:text-graphite' : 'border-graphite/70 hover:bg-graphite hover:text-paper',
              ].join(' ')}
            >
              Start a project
            </Link>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
              className="group flex h-11 items-center gap-3 px-1 text-[0.9375rem] tracking-tight"
            >
              <span>Menu</span>
              <span aria-hidden className="flex w-6 flex-col gap-[5px]">
                <span className="h-px w-full bg-current transition-transform duration-300 group-hover:translate-x-1" />
                <span className="h-px w-2/3 bg-current transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MenuPanel open={open} onClose={() => { setOpen(false); menuButton.current?.focus(); }} pathname={pathname} />
    </>
  );
}
