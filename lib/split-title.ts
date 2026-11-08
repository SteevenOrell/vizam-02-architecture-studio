/** Splits a title so its last word can be set in a light serif italic (only when the title has two or more words). */
export function splitTitle(title: string): { lead: string; accent: string | null } {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return { lead: title.trim(), accent: null };
  return { lead: words.slice(0, -1).join(' '), accent: words[words.length - 1] };
}
