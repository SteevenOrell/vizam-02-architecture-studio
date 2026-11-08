import { C, HOUSE, type DrawingProps, r1 } from './house';
import { Sheet } from './primitives';

/**
 * Exploded axonometric of the house: floor plate, walls, structure and roof as four layers.
 * Geometry is built from axis-aligned boxes, projected at 30 degrees from the south-west, and sorted far to near.
 */

type Mat = 'plaster' | 'oxide' | 'oak' | 'stone' | 'steel' | 'roof';
type Box = { x0: number; y0: number; z0: number; x1: number; y1: number; z1: number; m: Mat };

const K = 19;
const COS = Math.cos(Math.PI / 6);
const OXA = 196;
const OYA = 452;

/** Lift of each layer in sheet units when fully exploded (upwards on screen). */
export const AXO_LIFT = { floor: 0, walls: 40, structure: 82, roof: 124 } as const;
export type AxoLayer = keyof typeof AXO_LIFT;

const P = (x: number, y: number, z: number): [number, number] => [r1(OXA + (x + y) * COS * K), r1(OYA + (y - x) * 0.5 * K - z * K)];
const pts = (list: [number, number][]) => list.map(([a, b]) => `${a},${b}`).join(' ');

const TONES: Record<Mat, [string, string, string]> = {
  plaster: ['#fbf8f1', '#eee8da', '#d9d0bf'],
  roof: ['#f4efe4', '#e6dfd0', '#cfc6b3'],
  oxide: ['#dcb7a4', '#c98d70', '#a9694b'],
  oak: ['#dcbd93', '#c9a06a', '#a98252'],
  stone: ['#e8e1d2', '#d6cdba', '#bfb5a0'],
  steel: ['#d9d5cb', '#bfbaae', '#a39e92'],
};

const F = HOUSE.ffl;
const TOP = { left: 3.45, centre: 3.05, right: 2.85 };

type Opening = { a: number; b: number; sill?: number; head?: number };

/** A wall run along x (fixed y range) or along y (fixed x range), with openings cut out of it. */
function wall(axis: 'x' | 'y', fixed: [number, number], a: number, b: number, zTop: number, openings: Opening[], m: Mat = 'plaster'): Box[] {
  const out: Box[] = [];
  const box = (s0: number, s1: number, z0: number, z1: number) => {
    if (s1 - s0 < 0.001 || z1 - z0 < 0.001) return;
    out.push(axis === 'x' ? { x0: s0, x1: s1, y0: fixed[0], y1: fixed[1], z0, z1, m } : { y0: s0, y1: s1, x0: fixed[0], x1: fixed[1], z0, z1, m });
  };
  let cur = a;
  for (const o of [...openings].sort((p, q) => p.a - q.a)) {
    box(cur, o.a, F, zTop);
    const sill = o.sill ?? F;
    const head = o.head ?? 2.55;
    if (sill > F) box(o.a, o.b, F, sill);
    if (head < zTop) box(o.a, o.b, head, zTop);
    cur = o.b;
  }
  box(cur, b, F, zTop);
  return out;
}

function sortBoxes(boxes: Box[]): Box[] {
  const n = boxes.length;
  const behind = (p: Box, q: Box) => p.y1 <= q.y0 + 1e-6 || p.x0 >= q.x1 - 1e-6 || p.z1 <= q.z0 + 1e-6;
  const after: number[][] = boxes.map(() => []);
  const indeg = new Array<number>(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const ij = behind(boxes[i], boxes[j]);
      const ji = behind(boxes[j], boxes[i]);
      if (ij && !ji) { after[i].push(j); indeg[j]++; }
      else if (ji && !ij) { after[j].push(i); indeg[i]++; }
    }
  }
  const order: number[] = [];
  const ready = boxes.map((_, i) => i).filter((i) => indeg[i] === 0);
  while (ready.length) {
    const i = ready.shift()!;
    order.push(i);
    for (const j of after[i]) if (--indeg[j] === 0) ready.push(j);
  }
  for (let i = 0; i < n; i++) if (!order.includes(i)) order.push(i);
  return order.map((i) => boxes[i]);
}

function Boxes({ boxes }: { boxes: Box[] }) {
  return (
    <g className="dw-m">
      {sortBoxes(boxes).map((b, i) => {
        const t = TONES[b.m];
        return (
          <g key={i}>
            <polygon points={pts([P(b.x0, b.y1, b.z0), P(b.x1, b.y1, b.z0), P(b.x1, b.y1, b.z1), P(b.x0, b.y1, b.z1)])} fill={t[1]} />
            <polygon points={pts([P(b.x0, b.y0, b.z0), P(b.x0, b.y1, b.z0), P(b.x0, b.y1, b.z1), P(b.x0, b.y0, b.z1)])} fill={t[2]} />
            <polygon points={pts([P(b.x0, b.y0, b.z1), P(b.x1, b.y0, b.z1), P(b.x1, b.y1, b.z1), P(b.x0, b.y1, b.z1)])} fill={t[0]} />
          </g>
        );
      })}
    </g>
  );
}

const slab = (x0: number, y0: number, x1: number, y1: number, z0: number, z1: number, m: Mat): Box => ({ x0, y0, x1, y1, z0, z1, m });

function buildWalls(): Box[] {
  const w = HOUSE;
  return [
    // North wall, by wing
    ...wall('x', [0, 0.3], 0, 5.6, TOP.left, [{ a: 0.9, b: 1.5, sill: 1.65 }]),
    ...wall('x', [0, 0.3], 5.6, 14, TOP.centre, [{ a: 6.4, b: 7.4 }, { a: 10.9, b: 12.9, sill: 1.35 }]),
    ...wall('x', [0, 0.3], 14, 19.6, TOP.right, [{ a: 17.7, b: 18.5, sill: 1.65 }]),
    // West wall
    ...wall('y', [0, 0.3], 0.3, 8, TOP.left, [{ a: 4.0, b: 6.5 }]),
    // South walls
    ...wall('x', [7.7, 8.0], 0, 5.6, TOP.left, [{ a: 1.2, b: 4.4 }]),
    ...wall('x', [7.7, 8.0], 5.6, 14, TOP.centre, [{ a: w.glazing[0], b: w.glazing[1], head: w.glazingHead }]),
    ...wall('x', [6.7, 7.0], 14, 15.6, TOP.right, [], 'oxide'),
    ...wall('x', [6.7, 7.0], 15.6, 19.6, TOP.right, [{ a: 16.0, b: 17.4 }]),
    // East wall of the right wing and the centre block's east wall (doors to the wings)
    ...wall('y', [19.3, 19.6], 0.3, 7.0, TOP.right, [{ a: 3.6, b: 5.4, sill: 1.35 }]),
    ...wall('y', [13.7, 14.0], 0.3, 7.7, TOP.centre, [{ a: 1.2, b: 2.1 }, { a: 4.4, b: 5.3 }]),
    // Partitions
    ...wall('y', [5.5, 5.7], 0.3, 7.7, TOP.centre, [{ a: 5.5, b: 6.4 }]),
    ...wall('x', [2.74, 2.86], 0, 5.5, TOP.left, [{ a: 0.5, b: 1.4 }, { a: 3.5, b: 4.4 }]),
    ...wall('y', [2.74, 2.86], 0.3, 2.74, TOP.left, []),
    ...wall('x', [2.74, 2.86], 14, 19.3, TOP.right, [{ a: 17.5, b: 18.4 }]),
    ...wall('y', [16.74, 16.86], 0.3, 2.74, TOP.right, []),
    ...wall('y', [8.3, 8.5], 0.3, 2.0, TOP.centre, []),
    // Oak sliding screen outside the glazing, and the fixed screen on the right wing
    slab(w.screen[0], 8.15, w.screen[1], 8.3, F, 2.9, 'oak'),
    slab(17.6, 6.55, 19.0, 6.7, F, 2.75, 'oak'),
  ];
}

function buildStructure(): Box[] {
  const out: Box[] = [];
  for (const x of [6.2, 8.0, 9.8, 11.6, 13.4]) out.push(slab(x - 0.06, 7.72, x + 0.06, 7.84, F, 3.05, 'steel'));
  for (const x of [6.0, 8.8, 11.6, 13.8]) out.push(slab(x - 0.1, 0.3, x + 0.1, 9.2, 2.75, 3.05, 'steel'));
  out.push(slab(5.6, 9.0, 14.0, 9.2, 2.75, 3.05, 'steel'));
  for (const y of [2.6, 5.6]) out.push(slab(0, y - 0.1, 5.6, y + 0.1, 3.15, 3.45, 'steel'));
  for (const y of [2.6, 5.0]) out.push(slab(14, y - 0.1, 19.6, y + 0.1, 2.55, 2.85, 'steel'));
  return out;
}

function buildRoof(): Box[] {
  return [
    slab(0, 0, 5.6, 8, 3.45, 3.75, 'roof'),
    slab(5.6, 0, 14, 9.2, 3.05, 3.35, 'roof'),
    slab(14, 0, 19.6, 7, 2.85, 3.15, 'roof'),
  ];
}

const WALLS = buildWalls();
const STRUCTURE = buildStructure();
const ROOF = buildRoof();

/** Footprint of the floor plate: house plus terrace. */
const FLOOR_POLY: [number, number][] = [[0, 0], [19.6, 0], [19.6, 11], [5.6, 11], [5.6, 8], [0, 8]];

function Floor() {
  const top = FLOOR_POLY.map(([x, y]) => P(x, y, F));
  const south = (x0: number, x1: number, y: number) => pts([P(x0, y, 0), P(x1, y, 0), P(x1, y, F), P(x0, y, F)]);
  const west = (x: number, y0: number, y1: number) => pts([P(x, y0, 0), P(x, y1, 0), P(x, y1, F), P(x, y0, F)]);
  const coursing: string[] = [];
  for (let y = 8.6; y < 11; y += 0.6) coursing.push(`M${P(5.6, y, F).join(' ')}L${P(19.6, y, F).join(' ')}`);
  for (let y = 7.6; y < 8; y += 0.6) coursing.push(`M${P(14, y, F).join(' ')}L${P(19.6, y, F).join(' ')}`);
  const ticks: string[] = [];
  for (let r = 0, y = 8.0; y < 11; y += 0.6, r++) {
    for (let x = 5.6 + (r % 2) * 0.4; x < 19.6; x += 0.8) {
      if (x < 14 && y < 8) continue;
      if (x > 5.6 && y >= 7) ticks.push(`M${P(x, y, F).join(' ')}L${P(x, Math.min(y + 0.6, 11), F).join(' ')}`);
    }
  }
  const footprint = `M${P(0, 0, F).join(' ')}L${P(19.6, 0, F).join(' ')}L${P(19.6, 7, F).join(' ')}L${P(14, 7, F).join(' ')}L${P(14, 8, F).join(' ')}L${P(0, 8, F).join(' ')}Z`;
  const t = TONES.stone;
  return (
    <g className="dw-m">
      <polygon points={south(5.6, 19.6, 11)} fill={t[1]} />
      <polygon points={south(0, 5.6, 8)} fill={t[1]} />
      <polygon points={west(0, 0, 8)} fill={t[2]} />
      <polygon points={west(5.6, 8, 11)} fill={t[2]} />
      <polygon points={pts(top)} fill={t[0]} />
      <polygon points={pts([P(0, 0, F), P(19.6, 0, F), P(19.6, 7, F), P(14, 7, F), P(14, 8, F), P(0, 8, F)])} fill="#f4efe4" />
      <path d={coursing.join('')} className="dw-h" />
      <path d={ticks.join('')} className="dw-h" />
      <path d={footprint} className="dw-d" strokeDasharray="5 3" />
    </g>
  );
}

/** Steps: two low boxes south of the terrace. */
const STEPS: Box[] = [slab(10, 11, 13, 11.4, 0, 0.3, 'stone'), slab(10, 11.4, 13, 11.8, 0, 0.15, 'stone')];

function Label({ x, y, z, n, name, note }: { x: number; y: number; z: number; n: string; name: string; note: string }) {
  const [sx, sy] = P(x, y, z);
  const tx = Math.max(sx + 54, 640);
  return (
    <g data-axo-label className="dw-d">
      <path d={`M${sx} ${sy}H${tx - 8}`} />
      <circle cx={sx} cy={sy} r="2.4" fill={C.oxide} />
      <text x={tx} y={sy - 2} className="dw-t dw-td dw-tb" stroke="none">{n} {name}</text>
      <text x={tx} y={sy + 12} className="dw-t dw-ts" stroke="none">{note}</text>
    </g>
  );
}

export function Axonometric({ className, title = 'Exploded axonometric of the fictional Olive House, seen from the south-west, with the floor plate, the walls, the steel structure and the flat roofs lifted apart in four layers.' }: DrawingProps) {
  const lift = (k: AxoLayer) => ({ transform: `translateY(${-AXO_LIFT[k]}px)` });
  // Dotted guides tie the layers' corners together
  const corners: [number, number][] = [[0, 8], [19.6, 0], [0, 0], [19.6, 7]];
  return (
    <Sheet className={className} label={title} name="Exploded axonometric" sheet="05" note="Exploded view">
      <g data-layer="0">
        <g data-axo-guides data-fade className="dw-h">
          {corners.map(([x, y], i) => (
            <path key={i} d={`M${P(x, y, F)[0]} ${P(x, y, F)[1]}V${P(x, y, F)[1] - AXO_LIFT.roof - 4}`} strokeDasharray="2 4" />
          ))}
        </g>
      </g>
      <g data-layer="1">
        <g data-axo="floor" style={lift('floor')}>
          <Floor />
          <Boxes boxes={STEPS} />
          <Label x={19.6} y={11} z={0.2} n="04" name="FLOOR PLATE" note="Stone terrace on a plinth" />
        </g>
      </g>
      <g data-layer="2">
        <g data-axo="walls" style={lift('walls')}>
          <Boxes boxes={WALLS} />
          <polygon points={pts([P(6.2, 7.85, F), P(13.4, 7.85, F), P(13.4, 7.85, 2.9), P(6.2, 7.85, 2.9)])} fill={C.glass} fillOpacity="0.28" className="dw-h" />
          <Label x={19.6} y={7} z={1.8} n="02" name="WALLS" note="Rendered masonry, oak screens" />
        </g>
        <g data-axo="structure" style={lift('structure')}>
          <Boxes boxes={STRUCTURE} />
          <Label x={19.6} y={2.6} z={2.7} n="03" name="STRUCTURE" note="Steel posts and beams" />
        </g>
      </g>
      <g data-layer="3">
        <g data-axo="roof" style={lift('roof')}>
          <Boxes boxes={ROOF} />
          <Label x={19.6} y={1.5} z={3.15} n="01" name="ROOF" note="Flat roofs with sedum" />
        </g>
      </g>
    </Sheet>
  );
}
