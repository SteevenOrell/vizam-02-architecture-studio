'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { nav, site } from '@/content/studio';
import { pad2 } from '@/lib/math';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MenuPanel({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Keep the latest callback without re-running the open/close effect on every parent render.
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const main = document.getElementById('main');
    const footer = document.querySelector('footer');
    main?.setAttribute('inert', '');
    footer?.setAttribute('inert', '');
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    // Move focus into the dialog.
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      main?.removeAttribute('inert');
      footer?.removeAttribute('inert');
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open]);

  const ease = [0.2, 0.7, 0.1, 1] as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          className="is-fixed fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.3 }}
        >
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-night/40 backdrop-blur-[6px]"
          />
          <motion.div
            ref={panel}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="on-dark absolute inset-y-0 right-0 flex w-full max-w-[38rem] flex-col overflow-y-auto bg-night text-paper"
            initial={reduce ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: reduce ? 0 : 0.6, ease }}
          >
            <div className="page-x flex h-[4.5rem] shrink-0 items-center justify-between">
              <span className="meta text-stone-light">Menu</span>
              <button
                type="button"
                onClick={onClose}
                data-autofocus
                className="flex h-11 items-center gap-2 px-1 text-[0.9375rem]"
              >
                Close <X aria-hidden className="size-5" strokeWidth={1.25} />
              </button>
            </div>

            <nav aria-label="Menu" className="page-x flex-1 py-6">
              <ul className="border-t border-paper/15">
                {[{ href: '/', label: 'Index' }, ...nav].map((item, i) => {
                  const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <motion.li
                      key={item.href}
                      className="border-b border-paper/15"
                      initial={reduce ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : 0.18 + i * 0.05, duration: 0.5, ease }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                        className="group flex items-baseline gap-5 py-3 transition-colors hover:text-oxide-light"
                      >
                        <span className="meta w-6 text-stone-light">{pad2(i)}</span>
                        <span className="display-md !text-[clamp(2rem,6vw,3.25rem)]">{item.label}</span>
                        {active && <span className="meta ml-auto text-oxide-light">Current</span>}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="page-x grid shrink-0 gap-6 border-t border-paper/15 py-8 sm:grid-cols-2">
              <div>
                <p className="meta text-stone-light">Write</p>
                <a href={`mailto:${site.email}`} className="link-underline mt-2 inline-block">{site.email}</a>
              </div>
              <div>
                <p className="meta text-stone-light">Studios</p>
                <p className="mt-2">{site.cities.join(' · ')}</p>
              </div>
              <p className="meta text-stone-light sm:col-span-2">{site.disclaimer}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
