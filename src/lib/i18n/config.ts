/**
 * Localization (brief §6).
 *
 * Fully multi-language, not English-first with fallbacks: every locale ships a
 * complete dictionary and the type system enforces it (see dictionary.ts —
 * a locale missing a key fails `npm run typecheck`).
 */

export const LOCALES = ['en', 'ar', 'fr', 'es', 'de', 'it', 'pt', 'tr'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export type LocaleMeta = {
  /** Name of the language in that language. */
  label: string;
  dir: 'ltr' | 'rtl';
  /** Font stacks per brief §6. */
  display: string;
  body: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { label: 'English', dir: 'ltr', display: 'var(--font-display-latin)', body: 'var(--font-body-latin)' },
  ar: { label: 'العربية', dir: 'rtl', display: 'var(--font-display-arabic)', body: 'var(--font-body-arabic)' },
  fr: { label: 'Français', dir: 'ltr', display: 'var(--font-display-latin)', body: 'var(--font-body-latin)' },
  es: { label: 'Español', dir: 'ltr', display: 'var(--font-display-latin)', body: 'var(--font-body-latin)' },
  de: { label: 'Deutsch', dir: 'ltr', display: 'var(--font-display-latin)', body: 'var(--font-body-latin)' },
  it: { label: 'Italiano', dir: 'ltr', display: 'var(--font-display-latin)', body: 'var(--font-body-latin)' },
  pt: { label: 'Português', dir: 'ltr', display: 'var(--font-display-latin)', body: 'var(--font-body-latin)' },
  tr: { label: 'Türkçe', dir: 'ltr', display: 'var(--font-display-latin)', body: 'var(--font-body-latin)' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): 'ltr' | 'rtl' {
  return LOCALE_META[locale].dir;
}
