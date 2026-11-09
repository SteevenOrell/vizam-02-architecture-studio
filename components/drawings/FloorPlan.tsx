import { useId } from 'react';
import { AXES_X, AXES_Y, C, type DrawingProps, r1, rng } from './house';
import { Bubble, DimH, DimV, ScaleBar, Sheet } from './primitives';

// Drawing scale: sheet units per metre, and the sheet position of the house's north-west corner.
const U = 36;
const OX = 170;
const OY = 110;
const X = (m: number) => r1(OX + m * U);
const Y = (m: number) => r1(OY + m * U);

type Seg = [number, number];
/** A wall run as a list of solid segments along one axis; gaps are doors and windows. */
function runH(y0: number, y1: number, segs: Seg[], fill: string = C.ink) {
  return segs.map(([a, b], i) => <rect key={`${y0}-${a}-${i}`} x={X(a)} y={Y(y0)} width={r1((b - a) * U)} height={r1((y1 - y0) * U)} fill={fill} />);
}
function runV(x0: number, x1: number, segs: Seg[], fill: string = C.ink) {
  return segs.map(([a, b], i) => <rect key={`${x0}-${a}-${i}`} x={X(x0)} y={Y(a)} width={r1((x1 - x0) * U)} height={r1((b - a) * U)} fill={fill} />);
}

/** Door symbol: leaf at 90 degrees and the swing arc. Hinge, closed direction and open direction are unit vectors. */
function Door({ hx, hy, cx, cy, ox, oy, len = 0.9 }: { hx: number; hy: number; cx: number; cy: number; ox: number; oy: number; len?: number }) {
  const r = len * U;
  const hp = [X(hx), Y(hy)];
  const ce = [r1(hp[0] + cx * r), r1(hp[1] + cy * r)];
  const oe = [r1(hp[0] + ox * r), r1(hp[1] + oy * r)];
  const sweep = cx * oy - cy * ox > 0 ? 1 : 0;
  return (
    <g>
      <path d={`M${hp[0]} ${hp[1]}L${oe[0]} ${oe[1]}`} className="dw-o" />
      <path d={`M${ce[0]} ${ce[1]}A${r1(r)} ${r1(r)} 0 0 ${sweep} ${oe[0]} ${oe[1]}`} className="dw-h" />
    </g>
  );
}

/** Window symbol: three parallel lines through the wall thickness. */
function Win({ x0, y0, x1, y1 }: { x0: number; y0: number; x1: number; y1: number }) {
  const horizontal = x1 - x0 > y1 - y0;
  const a = [X(x0), Y(y0)];
  const b = [X(x1), Y(y1)];
  if (horizontal) {
    const ym = r1((a[1] + b[1]) / 2);
    return <path d={`M${a[0]} ${a[1]}H${b[0]}M${a[0]} ${ym}H${b[0]}M${a[0]} ${b[1]}H${b[0]}M${a[0]} ${a[1]}V${b[1]}M${b[0]} ${a[1]}V${b[1]}`} className="dw-f" />;
  }
  const xm = r1((a[0] + b[0]) / 2);
  return <path d={`M${a[0]} ${a[1]}V${b[1]}M${xm} ${a[1]}V${b[1]}M${b[0]} ${a[1]}V${b[1]}M${a[0]} ${a[1]}H${b[0]}M${a[0]} ${b[1]}H${b[0]}`} className="dw-f" />;
}

const rect = (x0: number, y0: number, x1: number, y1: number) => `M${X(x0)} ${Y(y0)}H${X(x1)}V${Y(y1)}H${X(x0)}Z`;

function Leaves({ cx, cy, r, seed, n = 26 }: { cx: number; cy: number; r: number; seed: number; n?: number }) {
  const rnd = rng(seed);
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2;
    const rr = Math.sqrt(rnd()) * r * 0.92;
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr;
    const t = rnd() * Math.PI;
    d += `M${r1(x - Math.cos(t) * 4)} ${r1(y - Math.sin(t) * 4)}L${r1(x + Math.cos(t) * 4)} ${r1(y + Math.sin(t) * 4)}`;
  }
  return <path d={d} />;
}

export function FloorPlan({ className, title = 'Ground-floor plan of the fictional Olive House: an entry, an open kitchen, living and dining room facing a stone terrace, and a bedroom wing at each end.' }: DrawingProps) {
  const id = useId().replace(/:/g, '');
  const terrace = `M${X(5.6)} ${Y(8)}V${Y(11)}H${X(19.6)}V${Y(7)}H${X(14)}V${Y(8)}Z`;
  const slats = Array.from({ length: 25 }, (_, i) => X(6.2 + i * 0.12));

  return (
    <Sheet
      className={className}
      label={title}
      name="Ground-floor plan"
      sheet="02"
      note="Scale in m"
      defs={
        <pattern id={`${id}-stone`} width="14" height="9" patternUnits="userSpaceOnUse">
          <path d="M0 0.3H14M0 4.8H14M5 0.3V4.8M11 4.8V9" stroke={C.hair} strokeWidth="0.45" fill="none" />
        </pattern>
      }
    >
      {/* Layer 0: grid axes, terrace, tree */}
      <g data-layer="0">
        <g className="dw-ax" data-fade>
          {AXES_X.map((a) => <path key={a.id} d={`M${X(a.m)} 58V${Y(12.2)}`} />)}
          {AXES_Y.map((a) => <path key={a.id} d={`M${X(-0.8)} ${Y(a.m)}H890`} />)}
        </g>
        <path d={terrace} fill={C.stone} fillOpacity="0.55" className="dw-h" />
        <path d={terrace} fill={`url(#${id}-stone)`} />
        {/* Existing olive tree to the west, retained */}
        <circle cx={X(-2)} cy={Y(6)} r={r1(1.9 * U)} fill={C.paper} fillOpacity="0.5" className="dw-f" />
        <g className="dw-h"><Leaves cx={X(-2)} cy={Y(6)} r={1.9 * U} seed={7} n={34} /></g>
        <circle cx={X(-2)} cy={Y(6)} r="4" fill={C.ink} />
      </g>

      {/* Layer 1: walls */}
      <g data-layer="1">
        <g className="dw-k">
          {runH(0, 0.3, [[0, 0.9], [1.5, 6.4], [7.4, 10.9], [12.9, 17.7], [18.5, 19.6]])}
          {runV(0, 0.3, [[0, 4.0], [6.5, 8.0]])}
          {runH(7.7, 8.0, [[0, 1.2], [4.4, 5.6], [5.6, 6.2], [13.4, 14.0]])}
          {runH(6.7, 7.0, [[15.6, 16.0], [17.4, 19.6]])}
          {runV(19.3, 19.6, [[0, 3.6], [5.4, 7.0]])}
          {runV(13.7, 14.0, [[7.0, 8.0]])}
        </g>
        {runH(6.7, 7.0, [[14, 15.6]], C.oxide)}
        <g className="dw-f">
          {runV(5.5, 5.7, [[0, 5.5], [6.4, 8.0]])}
          {runV(13.9, 14.1, [[0, 1.2], [2.1, 4.4], [5.3, 7.0]])}
          {runH(2.74, 2.86, [[0, 0.5], [1.4, 3.5], [4.4, 5.6], [14, 17.5], [18.4, 19.6]])}
          {runV(2.74, 2.86, [[0, 2.8]])}
          {runV(16.74, 16.86, [[0, 2.8]])}
          {runV(8.3, 8.5, [[0.3, 2.0]])}
        </g>
      </g>

      {/* Layer 2: openings, doors, furniture, screen */}
      <g data-layer="2">
        <Win x0={1.2} y0={7.7} x1={4.4} y1={8.0} />
        <Win x0={0} y0={4.0} x1={0.3} y1={6.5} />
        <Win x0={0.9} y0={0} x1={1.5} y1={0.3} />
        <Win x0={10.9} y0={0} x1={12.9} y1={0.3} />
        <Win x0={17.7} y0={0} x1={18.5} y1={0.3} />
        <Win x0={16.0} y0={6.7} x1={17.4} y1={7.0} />
        <Win x0={19.3} y0={3.6} x1={19.6} y1={5.4} />
        {/* Sliding glazing: two tracks */}
        <g className="dw-f">
          <path d={`M${X(6.2)} ${Y(7.78)}H${X(13.4)}M${X(6.2)} ${Y(7.92)}H${X(13.4)}`} />
          <path d={`M${X(6.2)} ${Y(7.7)}V${Y(8)}M${X(13.4)} ${Y(7.7)}V${Y(8)}`} />
        </g>
        <Door hx={6.4} hy={0.15} cx={1} cy={0} ox={0} oy={1} len={1} />
        <Door hx={5.6} hy={5.5} cx={0} cy={1} ox={-1} oy={0} />
        <Door hx={0.5} hy={2.8} cx={1} cy={0} ox={0} oy={-1} />
        <Door hx={4.4} hy={2.8} cx={-1} cy={0} ox={0} oy={-1} />
        <Door hx={14} hy={1.2} cx={0} cy={1} ox={1} oy={0} />
        <Door hx={14} hy={4.4} cx={0} cy={1} ox={1} oy={0} />
        <Door hx={18.4} hy={2.8} cx={-1} cy={0} ox={0} oy={-1} />

        {/* Furniture, in fine line */}
        <g className="dw-h">
          {/* bedroom 05 */}
          <path d={rect(2.3, 3.1, 3.9, 5.2) + rect(2.45, 3.18, 3.0, 3.58) + rect(3.2, 3.18, 3.75, 3.58) + rect(1.85, 3.1, 2.2, 3.45) + rect(4.0, 3.1, 4.35, 3.45)} />
          {/* bedroom 08 */}
          <path d={rect(16.0, 3.1, 17.6, 5.2) + rect(16.15, 3.18, 16.7, 3.58) + rect(16.9, 3.18, 17.45, 3.58) + rect(15.55, 3.1, 15.9, 3.45) + rect(17.7, 3.1, 18.05, 3.45)} />
          {/* living 03 */}
          <path d={rect(6.4, 4.4, 8.8, 5.3) + rect(6.4, 4.4, 8.8, 4.6) + rect(7.0, 5.9, 8.2, 6.5)} />
          <path d={rect(6.15, 5.6, 9.4, 7.3)} strokeDasharray="3 3" />
          {/* dining 04 */}
          <path d={rect(10.1, 5.4, 12.5, 6.4)} />
          {[10.4, 11.15, 11.9].map((x) => <path key={x} d={rect(x, 4.85, x + 0.45, 5.3) + rect(x, 6.5, x + 0.45, 6.95)} />)}
          {/* kitchen 02 */}
          <path d={rect(8.7, 0.3, 13.6, 0.9) + rect(9.3, 1.9, 11.7, 2.8)} />
          <circle cx={X(10.0)} cy={Y(2.35)} r="5" />
          <path d={`M${X(11.0)} ${Y(2.1)}h8M${X(11.0)} ${Y(2.35)}h8M${X(11.0)} ${Y(2.6)}h8`} />
          {/* bath 06 */}
          <path d={rect(0.4, 0.4, 1.3, 1.3) + `M${X(0.4)} ${Y(0.4)}L${X(1.3)} ${Y(1.3)}`} />
          <path d={rect(1.7, 0.35, 2.5, 0.8)} />
          <ellipse cx={X(2.4)} cy={Y(2.25)} rx="7" ry="9" />
          {/* bath 09 */}
          <path d={rect(17.0, 0.4, 17.9, 1.3) + `M${X(17.0)} ${Y(0.4)}L${X(17.9)} ${Y(1.3)}`} />
          <path d={rect(18.1, 0.35, 18.7, 0.7)} />
          <ellipse cx={X(19.05)} cy={Y(1.35)} rx="7" ry="9" />
          {/* utility 10 */}
          <path d={rect(14.3, 0.4, 15.0, 1.0) + rect(15.15, 0.4, 15.85, 1.0)} />
          {/* terrace 11 */}
          <path d={rect(11.0, 9.0, 13.2, 10.2) + rect(11.0, 9.0, 13.2, 9.35)} />
          {/* steps */}
          <path d={`M${X(10)} ${Y(11)}V${Y(11.8)}H${X(13)}V${Y(11)}M${X(10)} ${Y(11.4)}H${X(13)}`} />
          {/* potted olives */}
          <circle cx={X(5.95)} cy={Y(8.6)} r="9" />
          <circle cx={X(14.55)} cy={Y(7.6)} r="9" />
          <Leaves cx={X(5.95)} cy={Y(8.6)} r={9} seed={3} n={5} />
          <Leaves cx={X(14.55)} cy={Y(7.6)} r={9} seed={4} n={5} />
        </g>
        {/* Oak sliding screen outside the glazing, and a dashed outline of the roof overhang */}
        <g className="dw-f">
          <path d={`M${X(6.2)} ${Y(8.15)}H${X(9.2)}V${Y(8.3)}H${X(6.2)}Z`} fill={C.oak} fillOpacity="0.25" />
          <path d={slats.map((x) => `M${x} ${Y(8.15)}V${Y(8.3)}`).join('')} className="dw-h" />
        </g>
        <path d={`M${X(5.6)} ${Y(8)}V${Y(9.2)}H${X(14)}V${Y(8)}`} className="dw-ax" data-fade style={{ opacity: 0.8 }} />
        <path d={`M${X(10.5)} ${Y(-0.5)}V${Y(12.2)}`} className="dw-k" strokeDasharray="14 4 2 4" data-fade style={{ stroke: C.oxide }} />
      </g>

      {/* Layer 3: labels and dimensions */}
      <g data-layer="3">
        {[
          ['01', 'ENTRY', 7.0, 2.7], ['02', 'KITCHEN', 12.65, 2.2], ['03', 'LIVING', 7.65, 7.3], ['04', 'DINING', 12.0, 7.3],
          ['05', 'BEDROOM', 2.8, 6.4], ['06', 'BATH', 1.75, 1.75], ['07', 'DRESSING', 4.2, 1.5], ['08', 'BEDROOM', 17.0, 6.2],
          ['09', 'BATH', 18.0, 2.05], ['10', 'UTILITY', 15.6, 1.9], ['11', 'TERRACE', 8.6, 10.3],
        ].map(([n, t, x, y]) => (
          <text key={n as string} x={X(x as number)} y={Y(y as number)} textAnchor="middle" className="dw-t dw-tb dw-halo">
            <tspan x={X(x as number)} className="dw-ts" fill={C.oxide}>{n}</tspan>
            <tspan x={X(x as number)} dy="13">{t}</tspan>
          </text>
        ))}
        <text x={X(8.3)} y={Y(9.1)} textAnchor="middle" className="dw-t dw-ts dw-td dw-halo">ROOF ABOVE</text>
        <text x={X(10.5) + 7} y={Y(-0.35)} className="dw-t dw-td dw-halo">A</text>
        <text x={X(10.5) + 7} y={Y(12.2)} className="dw-t dw-td dw-halo">A</text>
        <text x={X(-2)} y={Y(8.55)} textAnchor="middle" className="dw-t dw-ts dw-halo">EXISTING OLIVE</text>
        <DimH x1={X(0)} x2={X(19.6)} y={70} text="19.60" ext={[Y(0) - 4, Y(0) - 4]} />
        <DimH x1={X(0)} x2={X(5.6)} y={90} text="5.60" />
        <DimH x1={X(5.6)} x2={X(14)} y={90} text="8.40" />
        <DimH x1={X(14)} x2={X(19.6)} y={90} text="5.60" />
        <DimV x={930} y1={Y(0)} y2={Y(7)} text="7.00" ext={[X(19.6) + 4, X(19.6) + 4]} />
        <DimV x={956} y1={Y(0)} y2={Y(8)} text="8.00" ext={[X(19.6) + 4, X(14) + 4]} />
        {AXES_X.map((a) => <Bubble key={a.id} x={X(a.m)} y={42} id={a.id} />)}
        {AXES_Y.map((a) => <Bubble key={a.id} x={904} y={Y(a.m)} id={a.id} />)}
        <ScaleBar x={60} y={530} u={U} />
      </g>
    </Sheet>
  );
}
