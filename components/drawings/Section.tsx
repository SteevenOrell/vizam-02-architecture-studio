import { useId } from 'react';
import { C, HOUSE, type DrawingProps, r1 } from './house';
import { Bubble, DimH, DimV, Level, ScaleBar, Sheet } from './primitives';

// Section A-A, cut at x = 10.5 m and looking east, so north is on the left.
const U = 52;
const OX = 196;
const YG = 408;
const X = (y: number) => r1(OX + y * U);
const Y = (z: number) => r1(YG - z * U);
const F = HOUSE.ffl;

/** Rectangle from depth range [y0, y1] and height range [z0, z1]. */
const R = (y0: number, z0: number, y1: number, z1: number) => `M${X(y0)} ${Y(z0)}H${X(y1)}V${Y(z1)}H${X(y0)}Z`;

export function Section({ className, title = 'Section A-A through the fictional Olive House, looking east: kitchen island, living room and dining table under a flat roof with a one-metre overhang, sliding glazing, the stone terrace and steps to the olive grove.' }: DrawingProps) {
  const id = useId().replace(/:/g, '');
  const ground = Array.from({ length: 62 }, (_, i) => `M${44 + i * 14.5} ${YG + 1}l-9 11`).filter((_, i) => 44 + i * 14.5 < X(12.2) + 14).join('');
  const sedum = Array.from({ length: 40 }, (_, i) => {
    const x = X(0.2) + i * 12.2;
    return `M${r1(x)} ${Y(3.35)}q3 -6 6 0`;
  }).join('');
  const wallDoors = [
    [1.2, 2.1],
    [4.4, 5.3],
  ];

  return (
    <Sheet
      className={className}
      label={title}
      name="Section A-A"
      sheet="04"
      note="Scale bar in metres"
      defs={
        <>
          <pattern id={`${id}-ins`} width="7" height="7" patternUnits="userSpaceOnUse">
            <path d="M0 7L7 0M0 0L7 7" stroke={C.hair} strokeWidth="0.5" />
          </pattern>
          <pattern id={`${id}-gravel`} width="8" height="6" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill={C.hair} />
            <circle cx="6" cy="5" r="0.6" fill={C.hair} />
          </pattern>
          <pattern id={`${id}-stone`} width="14" height="9" patternUnits="userSpaceOnUse">
            <path d="M0 0.3H14M0 4.8H14M5 0.3V4.8M11 4.8V9" stroke={C.hair} strokeWidth="0.5" fill="none" />
          </pattern>
          <pattern id={`${id}-wall`} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.35" fill={C.hair} />
            <circle cx="4.5" cy="4.5" r="0.35" fill={C.hair} />
          </pattern>
        </>
      }
    >
      {/* Layer 0: grade, axes, background wall */}
      <g data-layer="0">
        <g className="dw-ax" data-fade>
          {[0, 3.6, 8].map((m) => <path key={m} d={`M${X(m)} 168V${YG + 60}`} />)}
        </g>
        <g data-fade>
          <path d={R(0.3, F, 7.7, 3.05)} fill={C.plaster} fillOpacity="0.8" />
          <path d={R(0.3, F, 7.7, 3.05)} fill={`url(#${id}-wall)`} />
        </g>
        <g className="dw-h" data-fade><path d={ground} /></g>
        <g className="dw-k"><path d={`M44 ${YG}H${X(-0.2)}M${X(12.2)} ${YG}H${X(12.2) + 14}`} /></g>
      </g>

      {/* Layer 1: cut elements in poché */}
      <g data-layer="1">
        {/* Foundations, insulation and slabs */}
        <path d={R(-0.25, -0.65, 0.6, 0)} fill={C.ink} className="dw-k" />
        <path d={R(7.35, -0.65, 8.3, 0)} fill={C.ink} className="dw-k" />
        <path d={R(0.6, 0, 7.35, 0.2)} fill={C.ink} className="dw-k" />
        <path d={R(0.6, 0.2, 7.35, 0.35)} fill={`url(#${id}-ins)`} className="dw-f" />
        <path d={R(0.6, 0.35, 7.7, F)} fill={C.stone} fillOpacity="0.85" className="dw-f" />
        {/* Terrace on compacted fill, held by a stone edge wall */}
        <path d={R(8.3, 0, 10.7, 0.25)} fill={`url(#${id}-gravel)`} className="dw-f" />
        <path d={R(8.0, 0.25, 10.7, F)} fill={C.stone} fillOpacity="0.9" className="dw-o" />
        <path d={R(10.7, -0.5, 11.0, F)} fill={C.stone} fillOpacity="0.9" className="dw-o" />
        <path d={R(10.7, -0.5, 11.0, F)} fill={`url(#${id}-stone)`} />
        <path d={R(11.0, 0, 11.4, 0.3)} fill={C.stone} fillOpacity="0.9" className="dw-o" />
        <path d={R(11.4, 0, 11.8, 0.15)} fill={C.stone} fillOpacity="0.9" className="dw-o" />
        {/* North wall and roof slab */}
        <path d={R(0, -0.65, 0.3, 3.05)} fill={C.ink} className="dw-k" />
        <path d={R(0, 3.05, 9.2, 3.2)} fill={C.ink} className="dw-k" />
        <path d={R(0, 3.2, 9.2, 3.3)} fill={`url(#${id}-ins)`} className="dw-f" />
        <path d={R(0, 3.3, 9.2, 3.35)} fill={C.ink} className="dw-o" />
        <path d={R(0, 3.05, 0.3, 3.35)} fill={C.ink} className="dw-k" />
        {/* Glazing: head and sill rails, two glass lines */}
        <path d={R(7.72, F, 7.98, F + 0.1)} fill={C.ink} className="dw-o" />
        <path d={R(7.72, 2.8, 7.98, 2.9)} fill={C.ink} className="dw-o" />
        <path d={R(7.72, 2.9, 7.98, 3.05)} fill={C.ink} className="dw-o" />
        <path d={`M${X(7.82)} ${Y(F + 0.1)}V${Y(2.8)}M${X(7.88)} ${Y(F + 0.1)}V${Y(2.8)}`} className="dw-f" />
      </g>

      {/* Layer 2: interior, furniture, scale figure, planting */}
      <g data-layer="2">
        {/* Doors in the east wall, seen beyond the cut */}
        <g className="dw-f">
          {wallDoors.map(([a, b]) => <path key={a} d={R(a, F, b, 2.55)} fill={C.paper} />)}
          <path d={R(0.3, F, 7.7, F + 0.1)} />
        </g>
        {/* Kitchen: counter, wall cabinets, island */}
        <path d={R(0.3, F, 0.9, 1.35)} fill={C.ink} className="dw-f" />
        <path d={R(0.25, 1.3, 0.95, 1.35)} fill={C.ink} className="dw-f" />
        <path d={R(0.3, 1.9, 0.6, 2.6)} fill={C.ink} className="dw-f" />
        <path d={R(1.9, F, 2.8, 1.3)} fill={C.ink} className="dw-f" />
        <path d={R(1.85, 1.3, 2.85, 1.37)} fill={C.ink} className="dw-f" />
        {/* Dining table, chairs, pendant */}
        <path d={R(5.4, 1.12, 6.4, 1.2)} fill={C.ink} className="dw-f" />
        <path d={`${R(5.45, F, 5.5, 1.12)}${R(6.3, F, 6.35, 1.12)}`} fill={C.ink} className="dw-f" />
        <path d={`${R(4.85, 0.82, 5.3, 0.88)}${R(4.85, 0.88, 4.9, 1.38)}${R(4.85, F, 4.88, 0.82)}${R(5.27, F, 5.3, 0.82)}`} fill={C.ink} className="dw-f" />
        <path d={`${R(6.5, 0.82, 6.95, 0.88)}${R(6.9, 0.88, 6.95, 1.38)}${R(6.5, F, 6.53, 0.82)}${R(6.92, F, 6.95, 0.82)}`} fill={C.ink} className="dw-f" />
        <path d={`M${X(5.9)} ${Y(3.05)}V${Y(2.05)}`} className="dw-f" />
        <path d={`M${X(5.9) - 12} ${Y(2.05)}A12 10 0 0 0 ${X(5.9) + 12} ${Y(2.05)}Z`} fill={C.paper} className="dw-o" />
        {/* Scale figure, 1.75 m */}
        <g className="dw-o">
          <circle cx={X(3.95)} cy={Y(F + 1.65)} r="5.5" fill={C.paper} />
          <path d={`M${X(3.95)} ${Y(F + 1.54)}V${Y(F + 0.95)}M${X(3.95) - 11} ${Y(F + 1.35)}L${X(3.95)} ${Y(F + 1.5)}L${X(3.95) + 11} ${Y(F + 1.35)}M${X(3.95)} ${Y(F + 0.95)}L${X(3.95) - 7} ${Y(F)}M${X(3.95)} ${Y(F + 0.95)}L${X(3.95) + 7} ${Y(F)}`} />
        </g>
        {/* Daybed on the terrace, beyond the cut */}
        <path d={`${R(9.0, F + 0.12, 10.2, F + 0.28)}${R(9.0, F + 0.28, 9.3, F + 0.62)}`} className="dw-f" fill={C.paper} />
        {/* Sedum on the roof */}
        <path d={sedum} className="dw-h" />
        <path d={`M${X(0.3)} ${Y(3.35)}H${X(9.2)}`} className="dw-f" />
        {/* Roof edge beam at the overhang and the oak soffit lines */}
        <path d={`M${X(8.0)} ${Y(3.05)}V${Y(3.35)}M${X(9.2)} ${Y(3.05)}V${Y(3.35)}`} className="dw-h" />
      </g>

      {/* Layer 3: dimensions and annotation */}
      <g data-layer="3">
        <DimV x={150} y1={Y(F)} y2={Y(3.05)} text="2.60" ext={[X(-0.25), X(-0.25)]} />
        <DimV x={122} y1={Y(0)} y2={Y(3.35)} text="3.35" ext={[X(-0.25), X(-0.25)]} />
        <DimH x1={X(0)} x2={X(3.6)} y={YG + 40} text="3.60" ext={[YG + 14, YG + 14]} />
        <DimH x1={X(3.6)} x2={X(8)} y={YG + 40} text="4.40" />
        <DimH x1={X(8)} x2={X(11)} y={YG + 40} text="3.00" />
        <DimH x1={X(11)} x2={X(12.2)} y={YG + 40} text="1.20" />
        <DimH x1={X(0)} x2={X(12.2)} y={YG + 66} text="12.20" ext={[YG + 14, YG + 14]} />
        <Bubble x={X(0)} y={150} id="1" />
        <Bubble x={X(3.6)} y={150} id="2" />
        <Bubble x={X(8)} y={150} id="3" />
        <Level x={X(12.2) + 34} y={Y(3.35)} text="+3.35" />
        <Level x={X(12.2) + 34} y={Y(3.05)} text="+3.05" />
        <Level x={X(12.2) + 34} y={Y(F)} text="+0.45" />
        <Level x={X(12.2) + 34} y={Y(0)} text="±0.00" />
        <text x={X(0.15)} y={Y(3.35) - 26} className="dw-t dw-ts">FLAT ROOF, SEDUM</text>
        <text x={X(9.2) - 4} y={Y(3.35) - 12} textAnchor="end" className="dw-t dw-ts dw-td">1.20 OVERHANG</text>
        <text x={X(1.3)} y={Y(3.05) + 22} textAnchor="middle" className="dw-t dw-ts dw-tb dw-halo">02 KITCHEN</text>
        <text x={X(3.95)} y={Y(F + 1.95)} textAnchor="middle" className="dw-t dw-ts dw-tb dw-halo">03 LIVING</text>
        <text x={X(5.9)} y={Y(F + 1.85) + 12} textAnchor="middle" className="dw-t dw-ts dw-tb dw-halo">04 DINING</text>
        <text x={X(9.6)} y={Y(F + 0.9)} textAnchor="middle" className="dw-t dw-ts dw-tb dw-halo">11 TERRACE</text>
        <text x={X(0)} y={Y(3.35) - 60} className="dw-t dw-tl dw-td">A  —  A  LOOKING EAST</text>
        <ScaleBar x={60} y={518} u={U} />
      </g>
    </Sheet>
  );
}
