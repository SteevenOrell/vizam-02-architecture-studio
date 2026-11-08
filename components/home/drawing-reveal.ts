import { staggerProgress } from '@/lib/study-timeline';

type Item =
  | { kind: 'draw'; el: SVGElement; fill: boolean; fillBase: number }
  | { kind: 'fill'; el: SVGElement; fillBase: number }
  | { kind: 'fade'; el: SVGElement; base: number };

const SELECTOR = 'path,line,rect,circle,ellipse,polygon,polyline,text';

/**
 * Prepares one layer of a drawing for a line-draw reveal.
 * Strokes are drawn with stroke-dashoffset (pathLength is normalised to 1), filled shapes fade their fill in with the
 * outline, and text, dashed lines and anything inside a [data-fade] group simply fade. Only compositor-friendly
 * or paint-only properties are touched, never layout.
 */
export function prepareLayer(layer: Element) {
  const items: Item[] = [];
  const prev = new Map<SVGElement, [string, string]>();
  for (const el of Array.from(layer.querySelectorAll<SVGElement>(SELECTOR))) {
    if (el.closest('defs,pattern,clipPath,[data-axo-label],[data-axo-guides]')) continue;
    const cs = getComputedStyle(el);
    prev.set(el, [el.style.opacity, el.style.fillOpacity]);
    const opacity = parseFloat(cs.opacity) || 1;
    if (el.tagName === 'text' || el.closest('[data-fade]')) {
      items.push({ kind: 'fade', el, base: opacity });
      continue;
    }
    const hasStroke = cs.stroke !== 'none' && parseFloat(cs.strokeWidth) > 0;
    const hasFill = cs.fill !== 'none';
    const fillBase = parseFloat(cs.fillOpacity);
    if (hasStroke) {
      el.setAttribute('pathLength', '1');
      el.style.strokeDasharray = '1 2';
      items.push({ kind: 'draw', el, fill: hasFill, fillBase: Number.isNaN(fillBase) ? 1 : fillBase });
    } else if (hasFill) {
      items.push({ kind: 'fill', el, fillBase: Number.isNaN(fillBase) ? 1 : fillBase });
    }
  }

  const n = items.length;
  const apply = (p: number) => {
    for (let i = 0; i < n; i++) {
      const it = items[i];
      const v = staggerProgress(p, i, n);
      if (it.kind === 'draw') {
        it.el.style.strokeDashoffset = String(1 - v);
        if (it.fill) it.el.style.fillOpacity = String(it.fillBase * v);
      } else if (it.kind === 'fill') {
        it.el.style.fillOpacity = String(it.fillBase * v);
      } else {
        it.el.style.opacity = String(it.base * v);
      }
    }
  };
  const reset = () => {
    for (const it of items) {
      it.el.style.removeProperty('stroke-dasharray');
      it.el.style.removeProperty('stroke-dashoffset');
      const [o, fo] = prev.get(it.el) ?? ['', ''];
      it.el.style.opacity = o;
      it.el.style.fillOpacity = fo;
      it.el.removeAttribute('pathLength');
    }
  };
  apply(0);
  return { apply, reset };
}
