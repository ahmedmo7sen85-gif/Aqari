/**
 * Single source of truth for the brand name.
 *
 * "Mirra" is a PLACEHOLDER (project brief §3 — final name not decided).
 * Rename here and nowhere else: every surface reads BRAND.name.
 */
export const BRAND = {
  name: 'Mirra',
  /** Short promise, shown under the wordmark. Localized copy lives in the dictionaries. */
  tagline_key: 'brand.tagline',
  /** Core rule, never rendered as a claim about outcomes. */
  principle_key: 'brand.principle',
} as const;

export type Brand = typeof BRAND;
