import type { ReactNode } from 'react';
import { C, SHEET_H, SHEET_W, fmtM, r1 } from './house';

/**
 * Drawing sheet: warm paper, a ruled border and a title block. Every drawing in the set sits on one so that
 * they read as a consistent series. Line weights come from the .dw-* classes in globals.css.
 */
export function Sheet({
  children,
  className,
  label,
  name,
  sheet,
  note,
  defs,
}: {
  children: ReactNode;
  className?: string;
  /** Accessible name. */
  label: string;
  /** Drawing name for the title block. */
  name: string;
  /** Sheet number such as "03". */
  sheet: string;
  /** Short note for the title block, such as "Scale in m". */
  note: string;
  defs?: ReactNode;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${SHEET_W} ${SHEET_H}`}
      className={['dw block h-auto w-full', className].filter(Boolean).join(' ')}
      xmlns="http://www.w3.org/2000/svg"
    >
      {defs ? <defs>{defs}</defs> : null}
      <rect width={SHEET_W} height={SHEET_H} fill={C.paper} />
      {children}
      {/* Border and title block */}
      <g className="dw-o">
        <rect x="14" y="14" width="972" height="612" />
      </g>
      <g className="dw-h">
        <rect x="19" y="19" width="962" height="602" />
      </g>
      <g className="dw-o">
        <rect x="626" y="552" width="360" height="74" fill={C.paper} />
      </g>
      <g className="dw-h">
        <path d="M626 576H986M626 600H986M860 576V626" />
      </g>
      <text x="636" y="569" className="dw-t dw-tb">OSTREL ATELIER · OLIVE HOUSE</text>
      <text x="636" y="593" className="dw-t dw-tb" fill={C.ink}>{name.toUpperCase()}</text>
      <text x="870" y="593" className="dw-t">SHEET {sheet}/05</text>
      <text x="636" y="617" className="dw-t dw-td">Fictional concept</text>
      <text x="870" y="617" className="dw-t">{note}</text>
    </svg>
  );
}

/** Oblique-tick dimension string, drawn in oxide. */
export function DimH({ x1, x2, y, text, ext }: { x1: number; x2: number; y: number; text: string; ext?: [number, number] }) {
  return (
    <g className="dw-d">
      <path d={`M${r1(x1)} ${y}H${r1(x2)}`} />
      <path d={`M${r1(x1 - 3.5)} ${y + 3.5}L${r1(x1 + 3.5)} ${y - 3.5}M${r1(x2 - 3.5)} ${y + 3.5}L${r1(x2 + 3.5)} ${y - 3.5}`} />
      {ext ? <path d={`M${r1(x1)} ${ext[0]}V${y + (ext[0] > y ? -4 : 4)}M${r1(x2)} ${ext[1]}V${y + (ext[1] > y ? -4 : 4)}`} /> : null}
      <text x={r1((x1 + x2) / 2)} y={y - 5} textAnchor="middle" className="dw-t dw-td" stroke="none" fill={C.oxide}>{text}</text>
    </g>
  );
}

export function DimV({ x, y1, y2, text, ext }: { x: number; y1: number; y2: number; text: string; ext?: [number, number] }) {
  const cy = r1((y1 + y2) / 2);
  return (
    <g className="dw-d">
      <path d={`M${x} ${r1(y1)}V${r1(y2)}`} />
      <path d={`M${x - 3.5} ${r1(y1 + 3.5)}L${x + 3.5} ${r1(y1 - 3.5)}M${x - 3.5} ${r1(y2 + 3.5)}L${x + 3.5} ${r1(y2 - 3.5)}`} />
      {ext ? <path d={`M${ext[0]} ${r1(y1)}H${x + (ext[0] > x ? -4 : 4)}M${ext[1]} ${r1(y2)}H${x + (ext[1] > x ? -4 : 4)}`} /> : null}
      <text x={x - 5} y={cy} textAnchor="middle" transform={`rotate(-90 ${x - 5} ${cy})`} className="dw-t dw-td" stroke="none" fill={C.oxide}>{text}</text>
    </g>
  );
}

/** Grid axis bubble. */
export function Bubble({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10" className="dw-o" fill={C.paper} />
      <text x={x} y={y + 4} textAnchor="middle" className="dw-t dw-tb">{id}</text>
    </g>
  );
}

export function NorthArrow({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="22" className="dw-f" />
      <path d={`M${x} ${y - 20}L${x + 7} ${y + 12}L${x} ${y + 7}L${x - 7} ${y + 12}Z`} fill={C.ink} />
      <path d={`M${x} ${y - 20}L${x - 7} ${y + 12}L${x} ${y + 7}Z`} fill={C.paper} className="dw-o" />
      <text x={x} y={y - 27} textAnchor="middle" className="dw-t dw-tb">N</text>
    </g>
  );
}

/** Graphic scale bar in metres; `u` is the drawing scale in sheet units per metre. */
export function ScaleBar({ x, y, u, metres = 5, every = 1 }: { x: number; y: number; u: number; metres?: number; every?: number }) {
  return (
    <g>
      {Array.from({ length: metres }, (_, i) => (
        <rect key={i} x={r1(x + i * u)} y={y} width={r1(u)} height="5" className="dw-f" fill={i % 2 === 0 ? C.ink : C.paper} />
      ))}
      {Array.from({ length: metres + 1 }, (_, i) => i).filter((i) => i % every === 0).map((i) => (
        <text key={i} x={r1(x + i * u)} y={y + 17} textAnchor="middle" className="dw-t dw-ts">{i === metres ? `${i} m` : i}</text>
      ))}
    </g>
  );
}

/** Level marker: a small triangle on a leader with the level in metres. */
export function Level({ x, y, text, side = 'right' }: { x: number; y: number; text: string; side?: 'left' | 'right' }) {
  const dir = side === 'right' ? 1 : -1;
  return (
    <g className="dw-d">
      <path d={`M${x} ${y}H${x + dir * 26}`} />
      <path d={`M${x + dir * 9} ${y}L${x + dir * 15} ${y - 8}L${x + dir * 3} ${y - 8}Z`} fill={C.paper} />
      <text x={x + dir * 29} y={y + 4} textAnchor={side === 'right' ? 'start' : 'end'} className="dw-t dw-td" stroke="none" fill={C.oxide}>{text}</text>
    </g>
  );
}

export { fmtM };
