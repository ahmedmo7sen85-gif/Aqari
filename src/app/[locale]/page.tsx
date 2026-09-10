import { notFound } from 'next/navigation';
import Studio from '@/components/Studio';
import { getDictionary } from '@/lib/i18n/dictionary';
import { isLocale, LOCALES, LOCALE_META } from '@/lib/i18n/config';
import { BRAND } from '@/config/brand';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <Studio
      locale={locale}
      dict={getDictionary(locale)}
      brandName={BRAND.name}
      locales={LOCALES.map((l) => ({ code: l, label: LOCALE_META[l].label }))}
    />
  );
}
