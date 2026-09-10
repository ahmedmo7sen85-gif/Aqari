import { DEFAULT_LOCALE, type Locale } from './config';
import en from './locales/en';
import ar from './locales/ar';
import fr from './locales/fr';
import es from './locales/es';
import de from './locales/de';
import it from './locales/it';
import pt from './locales/pt';
import tr from './locales/tr';

/**
 * Every locale must define every key of `en`. A locale that is missing a key,
 * or invents one, fails `npm run typecheck` — that is the mechanism that keeps
 * the product genuinely multi-language instead of English-with-fallbacks
 * (brief §6).
 */
export type MessageKey = keyof typeof en;
export type Dictionary = Record<MessageKey, string>;

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar, fr, es, de, it, pt, tr };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

export function createTranslator(locale: Locale): Translate {
  const dict = getDictionary(locale);
  return (key, vars) => {
    const raw = dict[key];
    if (!vars) return raw;
    return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
      name in vars ? String(vars[name]) : match,
    );
  };
}
