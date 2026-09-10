import type { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import './globals.css';

export const metadata: Metadata = {
  title: `${BRAND.name} — AI aesthetic visualization`,
  description: 'See your beauty goals before you decide. Your photo, your face, your request.',
};

/**
 * The root layout renders nothing but a passthrough: <html lang/dir> is set per
 * locale in src/app/[locale]/layout.tsx so RTL is a first-class path, not a
 * patch applied on top of an English shell (brief §6).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
