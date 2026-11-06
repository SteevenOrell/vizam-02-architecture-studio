/** Decorative binder clip drawn in SVG (no image asset). */
export function BinderClip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden="true" focusable="false" fill="none">
      <path d="M12 24 L8 4 Q8 1 11 1 L37 1 Q40 1 40 4 L36 24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.85" />
      <path d="M17 24 L15 8 L33 8 L31 24" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M4 24 L44 24 L40 54 L8 54 Z" fill="currentColor" />
      <path d="M8 30 L40 30" stroke="#f7f4ee" strokeOpacity="0.18" strokeWidth="1" />
    </svg>
  );
}

/** Decorative paper clip for the inquiry sheet. */
export function PaperClip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 72" className={className} aria-hidden="true" focusable="false" fill="none">
      <path
        d="M20 22 V58 Q20 68 12 68 Q4 68 4 58 V12 Q4 4 12 4 Q20 4 20 12 V52 Q20 56 14 56 Q8 56 8 52 V20"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
