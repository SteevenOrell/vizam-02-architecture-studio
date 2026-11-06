/** Typographic wordmark: "Ostrel" with a cut lintel over the O. Decorative paths; the link around it carries the name. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 132 28" className={className} aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="24" height="2.6" fill="currentColor" />
      <text
        x="-1"
        y="26.5"
        fill="currentColor"
        style={{ font: '500 27px var(--font-grotesk), sans-serif', letterSpacing: '-1.6px' }}
      >
        Ostrel
      </text>
    </svg>
  );
}
