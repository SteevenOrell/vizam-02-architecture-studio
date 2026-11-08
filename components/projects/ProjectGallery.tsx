'use client';

import Image from '@/components/ui/ResponsiveImage';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Img } from '@/content/types';
import { pad2, wrapIndex } from '@/lib/math';

/**
 * Editorial gallery + lightbox built on the native <dialog> (modal focus trap, Esc to close,
 * focus returned to the opening button by the browser). Arrow keys browse inside the lightbox.
 */
export function ProjectGallery({ images, title }: { images: Img[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const n = images.length;

  const open = (i: number) => {
    setActive(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = (d: number) => setActive((i) => wrapIndex(i + d, n));

  // First image spans two columns; the rest are equal tiles.
  return (
    <>
      <ul className="mx-auto grid max-w-[1040px] gap-4 md:grid-cols-2" data-testid="gallery">
        {images.map((image, i) => (
          <li key={i} className={i === 0 ? 'md:col-span-2' : ''}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden bg-hairline"
              aria-label={`Open image ${i + 1} of ${n} in full screen: ${image.alt}`}
            >
              <span className={`relative block ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <Image src={image.src} alt="" fill sizes={i === 0 ? '(min-width: 1100px) 1040px, 100vw' : '(min-width: 1100px) 512px, (min-width: 768px) 50vw, 100vw'} placeholder="blur" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-arch)] group-hover:scale-[1.03]" />
              </span>
              <span className="meta absolute bottom-3 right-3 flex items-center gap-2 bg-plaster/90 px-2 py-1 text-graphite opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand aria-hidden className="size-3" /> View
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={`${title} — image viewer`}
        className="is-fixed on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-night/95 p-0 text-paper backdrop:bg-black/70"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
        }}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        <div className="flex h-full flex-col">
          <div className="page-x flex h-16 shrink-0 items-center justify-between">
            <p className="meta tabular-nums" aria-live="polite">{pad2(active + 1)} / {pad2(n)} — {title}</p>
            <button type="button" onClick={close} autoFocus className="flex h-11 items-center gap-2 px-1">
              Close <X aria-hidden className="size-5" strokeWidth={1.25} />
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <Image key={active} src={images[active].src} alt={images[active].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="page-x flex h-20 shrink-0 items-center justify-between gap-4">
            <p className="line-clamp-2 max-w-[60ch] text-paper/85">{images[active].alt}</p>
            <div className="flex gap-1">
              <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="grid size-11 place-items-center rounded-full hover:bg-paper/15">
                <ArrowLeft aria-hidden className="size-5" strokeWidth={1.25} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next image" className="grid size-11 place-items-center rounded-full hover:bg-paper/15">
                <ArrowRight aria-hidden className="size-5" strokeWidth={1.25} />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
