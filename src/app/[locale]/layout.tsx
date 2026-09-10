import { notFound } from 'next/navigation';
import { isLocale, LOCALES, LOCALE_META } from '@/lib/i18n/config';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * Per-locale document shell. Sets lang/dir and binds the locale's display and
 * body font stacks to the two variables the stylesheet consumes.
 *
 * Web fonts are linked at runtime rather than inlined at build time, so a build
 * in a network-restricted environment still succeeds and the page degrades to
 * the declared fallback stacks.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const meta = LOCALE_META[locale];

  return (
    <html
      lang={locale}
      dir={meta.dir}
      style={
        {
          '--font-display': meta.display,
          '--font-body': meta.body,
        } as React.CSSProperties
      }
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@400;500&family=Amiri:wght@400;700&family=Cairo:wght@400;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
