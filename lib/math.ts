/** Wraps an index into [0, length). */
export function wrapIndex(i: number, length: number): number {
  if (length <= 0) return 0;
  return ((i % length) + length) % length;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

/** Keyboard handling for an ARIA slider with a 0–100 range. Returns the new value, or null if the key is not handled. */
export function sliderKeyValue(key: string, value: number, { step = 2, page = 10 } = {}): number | null {
  switch (key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      return clamp(value - step, 0, 100);
    case 'ArrowRight':
    case 'ArrowUp':
      return clamp(value + step, 0, 100);
    case 'PageDown':
      return clamp(value - page, 0, 100);
    case 'PageUp':
      return clamp(value + page, 0, 100);
    case 'Home':
      return 0;
    case 'End':
      return 100;
    default:
      return null;
  }
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
