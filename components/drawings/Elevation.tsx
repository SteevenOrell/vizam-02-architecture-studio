import { useId } from 'react';
import { AXES_X, C, HOUSE, type DrawingProps, r1, rng } from './house';
import { Bubble, DimH, Level, ScaleBar, Sheet } from './primitives';

const U = 41;
const OX = 100;
const YG = 410;
const X = (m: number) => r1(OX + m * U);
const Y = (h: number) => r1(YG - h * U);
const F = HOUSE.ffl;

const box = (x0: number, h0: number, x1: number, h1: number) => `M${X(x0)} ${Y(h0)}H${X(x1)}V${Y(h1)}H${X(x0)}Z`;

/** A potted olive sapling on the terrace. */
function Pot({ x, seed }: { x: number; seed: number }) {
  const rnd = rng(seed);
  let leaves = '';
  for (let i = 0; i < 16; i++) {
    const a = rnd() * Math.PI * 2;
    const rr = Math.sqrt(rnd()) * 20;
    const cx = X(x) + Math.cos(a) * rr;
    const cy = Y(F + 1.55) + Math.sin(a) * rr * 0.8;
    leaves += `M${r1(cx - 3)} ${r1(cy + 1.5)}L${r1(cx + 3)} ${r1(cy - 1.5)}`;
  }
  return (
    <g>
      <path d={`M${X(x) - 11} ${Y(F)}L${X(x) - 14} ${Y(F + 0.55)}H${X(x) + 14}L${X(x) + 11} ${Y(F)}Z`} fill={C.paper} className="dw-f" />
      <path d={`M${X(x)} ${Y(F + 0.55)}C${X(x) + 3} ${Y(F + 0.9)} ${X(x) - 4} ${Y(F + 1.1)} ${X(x)} ${Y(F + 1.4)}`} className="dw-f" />
      <ellipse cx={X(x)} cy={Y(F + 1.55)} rx="22" ry="16" fill={C.paper} fillOpacity="0.75" className="dw-h" />
      <path d={leaves} className="dw-h" />
    </g>
  );
}

export function Elevation({ className, title = 'South elevation of the fictional Olive House: three low plaster volumes with an oak sliding screen and full-height glazing over a stone terrace, an oxide-coloured wall at the east end and an olive tree to the west.' }: DrawingProps) {
  const id = useId().replace(/:/g, '');
  const rnd = rng(11);
  const tr = rng(5);
  // Stone coursing on the terrace plinth, with staggered vertical joints.
  let joints = '';
  for (let c = 0; c < 3; c++) {
    const h0 = c * 0.15;
    let x = 5.6 + (c % 2) * 0.25;
    while (x < 19.6) {
      if (!(x > 10 && x < 13)) joints += `M${X(x)} ${Y(h0)}V${Y(h0 + 0.15)}`;
      x += 0.45 + rnd() * 0.5;
    }
  }
  // Olive tree: canopy blobs and leaf marks, drawn after the house so it stands in front of the west end.
    const TX = 78;
  const blobs = Array.from({ length: 15 }, () => ({ cx: TX + (tr() - 0.5) * 96, cy: YG - 152 + (tr() - 0.5) * 60, rx: 22 + tr() * 14, ry: 14 + tr() * 8 }));
  let leafMarks = '';
  for (let i = 0; i < 70; i++) {
    const a = tr() * Math.PI * 2;
    const rr = Math.sqrt(tr()) * 54;
    const x = TX + Math.cos(a) * rr;
    const y = YG - 152 + Math.sin(a) * rr * 0.55;
    const t = (tr() - 0.5) * 1.2;
    leafMarks += `M${r1(x - 3.5)} ${r1(y - Math.sin(t) * 2.5)}L${r1(x + 3.5)} ${r1(y + Math.sin(t) * 2.5 + 0.5)}`;
  }
  const slats = Array.from({ length: 25 }, (_, i) => X(6.2 + i * 0.12));
  const slatsR = Array.from({ length: 12 }, (_, i) => X(17.6 + i * 0.12));
  const hatchGround = Array.from({ length: 60 }, (_, i) => `M${30 + i * 14.5} ${YG + 1}l-9 11`).filter((_, i) => 30 + i * 14.5 < X(19.6)).join('');

  return (
    <Sheet
      className={className}
      label={title}
      name="South elevation"
      sheet="03"
      note="Scale bar in metres"
      defs={
        <>
          <pattern id={`${id}-glass`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
            <path d="M0 0V9" stroke={C.hair} strokeWidth="0.4" />
          </pattern>
          <pattern id={`${id}-ox`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <path d="M0 0V5" stroke={C.oxide} strokeWidth="0.55" />
          </pattern>
          <pattern id={`${id}-render`} width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.35" fill={C.hair} />
            <circle cx="5.5" cy="5" r="0.35" fill={C.hair} />
          </pattern>
        </>
      }
    >
      {/* Layer 0: ground, axes */}
      <g data-layer="0">
        <g className="dw-ax" data-fade>
          {AXES_X.map((a) => <path key={a.id} d={`M${X(a.m)} 164V${YG + 48}`} />)}
        </g>
        <g className="dw-h" data-fade><path d={hatchGround} /></g>
        <g className="dw-k"><path d={`M30 ${YG}H${X(19.6) + 4}`} /></g>
      </g>

      {/* Layer 1: building outline */}
      <g data-layer="1">
        {/* Plaster plinth under the left wing */}
        <path d={box(0, 0.05, 5.6, F)} fill={C.plaster} className="dw-o" />
        {/* Left wing */}
        <path d={box(0, F, 5.6, HOUSE.roofTop.left)} fill={C.plaster} className="dw-k" />
        {/* Centre block */}
        <path d={box(5.6, F, 14, HOUSE.roofTop.centre)} fill={C.paper} className="dw-k" />
        {/* Right wing, set 1 m back, so lighter weight */}
        <path d={box(14, F, 19.6, HOUSE.roofTop.right)} fill={C.plaster} className="dw-o" />
        {/* Stone terrace plinth */}
        <path d={box(5.6, 0, 19.6, F)} fill={C.stone} fillOpacity="0.7" className="dw-o" />
        <path d={joints} className="dw-h" />
        <path d={`M${X(5.6)} ${Y(0.15)}H${X(19.6)}M${X(5.6)} ${Y(0.3)}H${X(19.6)}`} className="dw-h" />
        {/* Roof slab edges: a deeper line at the underside of each roof */}
        <path d={`M${X(5.6)} ${Y(3.05)}H${X(14)}`} className="dw-f" />
        <path d={`M${X(14)} ${Y(2.85)}H${X(19.6)}`} className="dw-f" />
        <path d={`M${X(0)} ${Y(3.45)}H${X(5.6)}`} className="dw-f" />
        {/* Plaster texture on the wall faces */}
        <g data-fade>
          <path d={box(0, F, 5.6, 3.75)} fill={`url(#${id}-render)`} />
          <path d={box(5.6, 2.9, 14, 3.35)} fill={`url(#${id}-render)`} />
          <path d={box(15.6, F, 19.6, 3.15)} fill={`url(#${id}-render)`} />
        </g>
        {/* Oxide wall */}
        <path d={box(14, F, 15.6, 3.15)} fill={C.oxide} fillOpacity="0.14" className="dw-o" />
        <g data-fade><path d={box(14, F, 15.6, 3.15)} fill={`url(#${id}-ox)`} /></g>
      </g>

      {/* Layer 2: openings, screens, furniture, planting */}
      <g data-layer="2">
        {/* Centre glazing: four sliding panes */}
        <path d={box(6.2, F, 13.4, HOUSE.glazingHead)} fill={C.glass} fillOpacity="0.35" className="dw-o" />
        <g data-fade><path d={box(6.2, F, 13.4, HOUSE.glazingHead)} fill={`url(#${id}-glass)`} /></g>
        <path d={[8.0, 9.8, 11.6].map((m) => `M${X(m)} ${Y(F)}V${Y(HOUSE.glazingHead)}`).join('') + `M${X(6.2)} ${Y(F + 0.1)}H${X(13.4)}M${X(6.2)} ${Y(2.8)}H${X(13.4)}`} className="dw-f" />
        {/* Left wing glazing and the tall bedroom window */}
        <path d={box(1.2, F, 4.4, 2.9)} fill={C.glass} fillOpacity="0.35" className="dw-o" />
        <g data-fade><path d={box(1.2, F, 4.4, 2.9)} fill={`url(#${id}-glass)`} /></g>
        <path d={`M${X(2.8)} ${Y(F)}V${Y(2.9)}`} className="dw-f" />
        {/* Right wing window */}
        <path d={box(16.0, F, 17.4, 2.9)} fill={C.glass} fillOpacity="0.35" className="dw-o" />
        <g data-fade><path d={box(16.0, F, 17.4, 2.9)} fill={`url(#${id}-glass)`} /></g>
        <path d={`M${X(16.7)} ${Y(F)}V${Y(2.9)}`} className="dw-f" />
        {/* Oak screens */}
        <path d={box(6.2, F, 9.2, 2.9)} fill={C.oak} fillOpacity="0.38" className="dw-o" />
        <path d={slats.map((x) => `M${x} ${Y(F)}V${Y(2.9)}`).join('')} className="dw-h" />
        <path d={box(17.6, F, 19.0, 2.75)} fill={C.oak} fillOpacity="0.38" className="dw-o" />
        <path d={slatsR.map((x) => `M${x} ${Y(F)}V${Y(2.75)}`).join('')} className="dw-h" />
        {/* Steps down to grade */}
        <path d={`M${X(10)} ${Y(F)}V${Y(0)}M${X(13)} ${Y(F)}V${Y(0)}M${X(10)} ${Y(0.3)}H${X(13)}M${X(10)} ${Y(0.15)}H${X(13)}`} className="dw-f" />
        <path d={box(10, 0, 13, F)} fill={C.paper} fillOpacity="0.9" className="dw-f" />
        <path d={`M${X(10)} ${Y(0.3)}H${X(13)}M${X(10)} ${Y(0.15)}H${X(13)}`} className="dw-f" />
        {/* Daybed on the terrace */}
        <path d={`M${X(11.1)} ${Y(F + 0.28)}H${X(13.1)}V${Y(F + 0.12)}H${X(11.1)}ZM${X(11.1)} ${Y(F + 0.12)}V${Y(F)}M${X(13.1)} ${Y(F + 0.12)}V${Y(F)}M${X(11.1)} ${Y(F + 0.28)}V${Y(F + 0.62)}H${X(11.35)}V${Y(F + 0.28)}`} className="dw-f" />
        <Pot x={5.2} seed={21} />
        <Pot x={14.55} seed={22} />
        {/* Olive tree to the west: gnarled trunk, then a cloud of foliage */}
        <g>
          <path d={`M${TX - 17} ${YG}C${TX - 8} ${YG - 22} ${TX - 12} ${YG - 50} ${TX - 8} ${YG - 78}C${TX - 14} ${YG - 96} ${TX - 22} ${YG - 104} ${TX - 30} ${YG - 118}L${TX - 24} ${YG - 122}C${TX - 14} ${YG - 108} ${TX - 6} ${YG - 98} ${TX - 1} ${YG - 90}C${TX + 4} ${YG - 104} ${TX + 12} ${YG - 116} ${TX + 24} ${YG - 128}L${TX + 29} ${YG - 122}C${TX + 16} ${YG - 108} ${TX + 10} ${YG - 94} ${TX + 8} ${YG - 78}C${TX + 9} ${YG - 52} ${TX + 12} ${YG - 24} ${TX + 22} ${YG}Z`} fill={C.paper} className="dw-o" />
          <path d={`M${TX - 4} ${YG - 6}C${TX - 2} ${YG - 30} ${TX - 6} ${YG - 52} ${TX - 2} ${YG - 76}M${TX + 6} ${YG - 4}C${TX + 3} ${YG - 28} ${TX + 4} ${YG - 50} ${TX + 3} ${YG - 74}`} className="dw-h" />
          {blobs.map((b, i) => <ellipse key={i} cx={r1(b.cx)} cy={r1(b.cy)} rx={r1(b.rx)} ry={r1(b.ry)} fill={C.paper} fillOpacity="0.92" className="dw-h" />)}
          <path d={leafMarks} className="dw-h" />
        </g>
      </g>

      {/* Layer 3: annotation */}
      <g data-layer="3">
        <DimH x1={X(0)} x2={X(5.6)} y={YG + 40} text="5.60" ext={[Y(0) + 6, Y(0) + 6]} />
        <DimH x1={X(5.6)} x2={X(14)} y={YG + 40} text="8.40" />
        <DimH x1={X(14)} x2={X(19.6)} y={YG + 40} text="5.60" />
        <DimH x1={X(0)} x2={X(19.6)} y={YG + 64} text="19.60" ext={[YG + 6, YG + 6]} />
        {AXES_X.map((a) => <Bubble key={a.id} x={X(a.m)} y={150} id={a.id} />)}
        <Level x={X(19.6) + 8} y={Y(3.75)} text="+3.75" />
        <Level x={X(19.6) + 8} y={Y(3.35)} text="+3.35" />
        <Level x={X(19.6) + 8} y={Y(F)} text="+0.45" />
        <Level x={X(19.6) + 8} y={Y(0)} text="±0.00" />
        <text x={X(16.8)} y={Y(3.15) - 7} textAnchor="middle" className="dw-t dw-ts dw-td">+3.15</text>
        <text x={X(7.7)} y={Y(3.35) - 7} textAnchor="middle" className="dw-t dw-ts">FLAT ROOF, SEDUM</text>
        <text x={X(7.7)} y={Y(F + 1.75)} textAnchor="middle" className="dw-t dw-ts dw-tb dw-halo">OAK SLIDING SCREEN</text>
        <text x={X(14.8)} y={Y(F + 1.2)} textAnchor="middle" className="dw-t dw-ts dw-td dw-halo"><tspan x={X(14.8)}>OXIDE</tspan><tspan x={X(14.8)} dy="11">RENDER</tspan></text>
        <text x={X(15.6)} y={Y(0.1) + 18} textAnchor="middle" className="dw-t dw-ts">STONE TERRACE</text>
        <text x={TX} y={YG + 18} textAnchor="middle" className="dw-t dw-ts">OLIVE</text>
        <ScaleBar x={60} y={500} u={U} />
      </g>
    </Sheet>
  );
}
