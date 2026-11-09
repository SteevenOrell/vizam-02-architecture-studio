import { useId } from 'react';
import { C, type DrawingProps, r1, rng } from './house';
import { DimH, DimV, NorthArrow, ScaleBar, Sheet } from './primitives';

// Site: a 40 m x 23 m plot, north up. The house origin (north-west corner) sits at site (HX, HY).
const U = 19;
const OX = 96;
const OY = 92;
const PW = 40;
const PD = 23;
const HX = 9;
const HY = 5;
const X = (m: number) => r1(OX + m * U);
const Y = (m: number) => r1(OY + m * U);
const hx = (m: number) => X(HX + m);
const hy = (m: number) => Y(HY + m);

const poly = (pts: [number, number][]) => `M${pts.map(([a, b]) => `${r1(a)} ${r1(b)}`).join('L')}Z`;

/** Contour line, a gentle fall to the south-east. */
function contour(k: number) {
  const pts: string[] = [];
  for (let m = 0; m <= PW; m += 1) {
    const y = 3.6 + k * 4.1 + 1.5 * Math.sin(m / 8 + k * 0.9) + m * 0.07;
    pts.push(`${m === 0 ? 'M' : 'L'}${X(m)} ${Y(Math.min(PD, Math.max(0, y)))}`);
  }
  return pts.join('');
}

export function SitePlan({ className, title = 'Site plan of the fictional Olive House on a forty by twenty-three metre plot: the house and terrace at the centre, a gravel court and drive from the north, an olive grove all around and the existing olive tree retained to the west.' }: DrawingProps) {
  const id = useId().replace(/:/g, '');
  const rnd = rng(19);
  // Olive grove on a loose grid, kept clear of the house, terrace, drive and the retained tree.
  const rocks: [number, number][][] = [
    [[22, 19], [24, 18.3], [25.2, 19.3], [24.2, 20.6], [22.4, 20.4]],
    [[13.5, 20.2], [15.2, 19.6], [16.2, 20.8], [14.6, 21.6]],
    [[36, 13], [37.5, 12.4], [38.5, 13.6], [37, 14.4]],
  ];
  const trees: { x: number; y: number; r: number }[] = [];
  for (let gx = 2.5; gx < PW - 1; gx += 5.6) {
    for (let gy = 2.2; gy < PD - 1; gy += 5.2) {
      const x = gx + (rnd() - 0.5) * 1.6;
      const y = gy + (rnd() - 0.5) * 1.4;
      const inHouse = x > HX - 3.6 && x < HX + 23 && y > HY - 4.6 && y < HY + 15.2;
      const nearRock = rocks.some((r) => Math.hypot(r[0][0] - x, r[0][1] - y) < 3.6);
      if (!inHouse && !nearRock) trees.push({ x, y, r: 1.35 + rnd() * 0.5 });
    }
  }
  let marks = '';
  for (const t of trees) {
    for (let i = 0; i < 5; i++) {
      const a = rnd() * Math.PI * 2;
      const rr = Math.sqrt(rnd()) * t.r * U * 0.75;
      const cx = X(t.x) + Math.cos(a) * rr;
      const cy = Y(t.y) + Math.sin(a) * rr;
      const q = rnd() * Math.PI;
      marks += `M${r1(cx - Math.cos(q) * 3)} ${r1(cy - Math.sin(q) * 3)}L${r1(cx + Math.cos(q) * 3)} ${r1(cy + Math.sin(q) * 3)}`;
    }
  }
  const stone = `M${hx(5.6)} ${hy(8)}V${hy(11)}H${hx(19.6)}V${hy(7)}H${hx(14)}V${hy(8)}Z`;
  const drive = poly([[X(HX + 6.0), Y(0)], [X(HX + 8.4), Y(0)], [X(HX + 8.4), Y(2.2)], [X(HX + 12.5), Y(2.7)], [X(HX + 12.5), Y(HY)], [X(HX + 2.4), Y(HY)], [X(HX + 2.4), Y(2.7)], [X(HX + 6.0), Y(2.2)]]);

  return (
    <Sheet
      className={className}
      label={title}
      name="Site plan"
      sheet="01"
      note="Scale in m"
      defs={
        <>
          <pattern id={`${id}-gravel`} width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.6" fill={C.soft} />
            <circle cx="5" cy="4.5" r="0.5" fill={C.soft} />
            <circle cx="3" cy="6.2" r="0.45" fill={C.soft} />
          </pattern>
          <pattern id={`${id}-stone`} width="12" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 0.3H12M0 4.3H12M5 0.3V4.3M10 4.3V8" stroke={C.hair} strokeWidth="0.45" fill="none" />
          </pattern>
          <pattern id={`${id}-sedum`} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.7" fill={C.hair} />
            <circle cx="4.5" cy="4.5" r="0.7" fill={C.hair} />
          </pattern>
          <clipPath id={`${id}-plot`}>
            <rect x={X(0)} y={Y(0)} width={PW * U} height={PD * U} />
          </clipPath>
        </>
      }
    >
      {/* Layer 0: plot, contours, grove, rocks */}
      <g data-layer="0">
        <g clipPath={`url(#${id}-plot)`}>
          <g className="dw-h">{[0, 1, 2, 3, 4].map((k) => <path key={k} d={contour(k)} />)}</g>
        </g>
        <g className="dw-ax" data-fade>
          <path d={`M${X(3)} ${Y(3)}H${X(PW - 3)}V${Y(PD - 3)}H${X(3)}Z`} />
        </g>
        <path d={`M${X(0)} ${Y(0)}H${X(PW)}V${Y(PD)}H${X(0)}Z`} className="dw-k" strokeDasharray="22 5 3 5" data-fade />
        <g className="dw-f">
          {trees.map((t, i) => <circle key={i} cx={X(t.x)} cy={Y(t.y)} r={r1(t.r * U)} fill={C.paper} fillOpacity="0.6" />)}
        </g>
        <path d={marks} className="dw-h" />
        <g className="dw-h">
          {trees.map((t, i) => <circle key={i} cx={X(t.x)} cy={Y(t.y)} r="1.6" fill={C.ink} />)}
        </g>
        <g className="dw-f">
          {rocks.map((r, i) => <path key={i} d={poly(r.map(([a, b]) => [X(a), Y(b)] as [number, number]))} fill={C.stone} />)}
        </g>
      </g>

      {/* Layer 1: drive, terrace, the house in roof plan */}
      <g data-layer="1">
        <path d={drive} fill={C.stone} fillOpacity="0.45" className="dw-f" />
        <path d={drive} fill={`url(#${id}-gravel)`} />
        <path d={stone} fill={C.stone} fillOpacity="0.6" className="dw-f" />
        <path d={stone} fill={`url(#${id}-stone)`} />
        {/* Roofs: left wing, centre block with overhang, right wing */}
        <g className="dw-k">
          <path d={`M${hx(0)} ${hy(0)}H${hx(5.6)}V${hy(8)}H${hx(0)}Z`} fill={C.plaster} />
          <path d={`M${hx(5.6)} ${hy(0)}H${hx(14)}V${hy(9.2)}H${hx(5.6)}Z`} fill={C.paper} />
          <path d={`M${hx(14)} ${hy(0)}H${hx(19.6)}V${hy(7)}H${hx(14)}Z`} fill={C.plaster} />
        </g>
        <g className="dw-h" data-fade>
          <path d={`M${hx(5.6)} ${hy(0)}H${hx(14)}V${hy(9.2)}H${hx(5.6)}Z`} fill={`url(#${id}-sedum)`} />
          <path d={`M${hx(14)} ${hy(0)}H${hx(19.6)}V${hy(7)}H${hx(14)}Z`} fill={`url(#${id}-sedum)`} />
        </g>
        {/* Parapet lines */}
        <g className="dw-f">
          <path d={`M${hx(0.3)} ${hy(0.3)}H${hx(5.3)}V${hy(7.7)}H${hx(0.3)}Z`} />
          <path d={`M${hx(5.9)} ${hy(0.3)}H${hx(13.7)}V${hy(8.9)}H${hx(5.9)}Z`} />
          <path d={`M${hx(14.3)} ${hy(0.3)}H${hx(19.3)}V${hy(6.7)}H${hx(14.3)}Z`} />
        </g>
        {/* Existing olive, retained */}
        <circle cx={hx(-2)} cy={hy(6)} r={r1(2.1 * U)} fill={C.paper} fillOpacity="0.75" className="dw-o" />
      </g>

      {/* Layer 2: oxide wall, screen, steps, tree marks, gravel court details */}
      <g data-layer="2">
        <path d={`M${hx(14)} ${hy(7)}H${hx(15.6)}`} stroke={C.oxide} strokeWidth="4" fill="none" />
        <path d={`M${hx(6.2)} ${hy(8.2)}H${hx(9.2)}`} stroke={C.oak} strokeWidth="3" fill="none" />
        <path d={`M${hx(10)} ${hy(11)}V${hy(11.8)}H${hx(13)}V${hy(11)}M${hx(10)} ${hy(11.4)}H${hx(13)}`} className="dw-f" />
        <path d={Array.from({ length: 12 }, (_, i) => `M${hx(-2) + Math.cos(i * 0.52) * 14} ${hy(6) + Math.sin(i * 0.52) * 14}l${(i % 3) * 3 - 3} 4`).join('')} className="dw-h" />
        <circle cx={hx(-2)} cy={hy(6)} r="3" fill={C.ink} />
        {/* Entry arrow on the drive */}
        <path d={`M${X(HX + 7.2)} ${Y(-1.2)}V${Y(1.5)}M${X(HX + 7.2) - 6} ${Y(1.5) - 8}L${X(HX + 7.2)} ${Y(1.5)}L${X(HX + 7.2) + 6} ${Y(1.5) - 8}`} className="dw-d" />
      </g>

      {/* Layer 3: dimensions and labels */}
      <g data-layer="3">
        <DimH x1={X(0)} x2={X(PW)} y={66} text="40.00" ext={[Y(0) - 4, Y(0) - 4]} />
        <DimV x={X(PW) + 24} y1={Y(0)} y2={Y(PD)} text="23.00" ext={[X(PW) + 4, X(PW) + 4]} />
        <DimH x1={X(0)} x2={hx(0)} y={Y(HY + 4)} text="9.00" />
        <DimV x={hx(0) - 16} y1={Y(0)} y2={hy(0)} text="5.00" />
        <text x={X(0) + 8} y={Y(PD) - 8} className="dw-t dw-ts dw-td dw-halo">PLOT BOUNDARY</text>
        <text x={X(3) + 6} y={Y(3) + 13} className="dw-t dw-ts">3 M SETBACK</text>
        <text x={hx(7.2)} y={hy(-3.2)} textAnchor="start" className="dw-t dw-ts dw-td dw-halo" dx="10">ENTRY</text>
        <text x={hx(7.3)} y={hy(-1.6)} textAnchor="middle" className="dw-t dw-ts dw-halo">GRAVEL COURT</text>
        <text x={hx(-2)} y={hy(8.8)} textAnchor="middle" className="dw-t dw-ts dw-halo">EXISTING OLIVE</text>
        <text x={hx(2.8)} y={hy(4.4)} textAnchor="middle" className="dw-t dw-ts dw-tb">+3.75</text>
        <text x={hx(9.8)} y={hy(4.4)} textAnchor="middle" className="dw-t dw-ts dw-tb">+3.35</text>
        <text x={hx(16.8)} y={hy(3.7)} textAnchor="middle" className="dw-t dw-ts dw-tb">+3.15</text>
        <text x={hx(9.8)} y={hy(5.3)} textAnchor="middle" className="dw-t dw-ts dw-td">ROOF PLAN</text>
        <text x={hx(8.6)} y={hy(10.4)} textAnchor="middle" className="dw-t dw-ts dw-halo">STONE TERRACE</text>
        <text x={X(32)} y={Y(13.8)} textAnchor="middle" className="dw-t dw-ts">OLIVE GROVE</text>
        <NorthArrow x={X(PW) + 54} y={Y(2.4)} />
        <ScaleBar x={60} y={534} u={U} metres={10} every={5} />
      </g>
    </Sheet>
  );
}
