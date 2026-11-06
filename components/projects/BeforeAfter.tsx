'use client';

import Image from 'next/image';
import { MoveHorizontal } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Img } from '@/content/types';
import { clamp, sliderKeyValue } from '@/lib/math';

/**
 * Before/after comparison. The handle is an ARIA slider (0–100 = share of the "before" image shown):
 * Arrow keys ±2, Page Up/Down ±10, Home/End; pointer drag or click anywhere on the image.
 */
export function BeforeAfter({ before, after, caption, title }: { before: Img; after: Img; caption: string; title: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromPointer = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.round(clamp(((clientX - r.left) / r.width) * 100, 0, 100)));
  };

  return (
    <figure>
      <div
        ref={box}
        className="relative aspect-[3/2] touch-pan-y select-none overflow-hidden bg-hairline"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
        data-testid="before-after"
      >
        <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1024px) 75vw, 100vw" className="object-cover" placeholder="blur" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1024px) 75vw, 100vw" className="object-cover" placeholder="blur" />
        </div>
        <span className="meta absolute left-3 top-3 bg-night/80 px-2 py-1 text-paper">Before</span>
        <span className="meta absolute right-3 top-3 bg-plaster/90 px-2 py-1 text-graphite">After</span>

        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-paper shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" style={{ left: `${pos}%` }} />
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Before and after comparison, ${title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pos}
          aria-valuetext={`${pos}% before, ${100 - pos}% after`}
          aria-orientation="horizontal"
          onKeyDown={(e) => {
            const v = sliderKeyValue(e.key, pos);
            if (v !== null) {
              e.preventDefault();
              setPos(v);
            }
          }}
          className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-paper text-graphite shadow-lg focus-visible:outline-offset-4"
          style={{ left: `${pos}%` }}
        >
          <MoveHorizontal aria-hidden className="size-5" strokeWidth={1.5} />
        </div>
      </div>
      <figcaption className="meta mt-3 text-stone">{caption}</figcaption>
    </figure>
  );
}
