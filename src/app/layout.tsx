import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnalyticsConsent } from '@/components/analytics-consent';
import './globals.css';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-editorial', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-interface', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Maison Lulu — Traiteur événementiel à Avignon', template: '%s | Maison Lulu' },
  description: 'Maison Lulu, traiteur à Avignon. Apéritifs, cocktails dînatoires et buffets méditerranéens pour vos événements professionnels et privés. Découvrez nos formules.',
  metadataBase: new URL('https://maison-lulu.fr'),
  alternates: { canonical: '/' },
  robots: { index: false, follow: false }, // Remove only when launch assets, pricing and legal details are approved.
  openGraph: { title: 'Maison Lulu — Bien recevoir, simplement.', description: 'Apéritifs, cocktails et buffets aux accents méditerranéens à Avignon.', locale: 'fr_FR', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body className={`${cormorant.variable} ${manrope.variable}`}><Header /><main id="contenu">{children}</main><Footer /><AnalyticsConsent /></body></html>;
}
