import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DevisWizard } from '@/components/devis-wizard';

export const metadata: Metadata = {
  title: 'Estimer mon événement',
  description: 'Estimez le budget de votre apéritif, cocktail ou buffet à Avignon. Choisissez votre formule, personnalisez-la et demandez un devis Maison Lulu.',
};

export default function DevisPage() {
  return <Suspense fallback={<section className="container devis-page"><p>Chargement du simulateur…</p></section>}><DevisWizard /></Suspense>;
}
