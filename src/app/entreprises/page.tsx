import type { Metadata } from 'next'; import Link from 'next/link';
export const metadata: Metadata = {title:'Événements professionnels'};
export default function Page(){return <section className="container placeholder-page"><p className="eyebrow">POUR LES ENTREPRISES</p><h1>Recevoir,<br/><em>sans complication.</em></h1><p>Réunions, séminaires, inaugurations et vernissages : Maison Lulu prépare une offre de cocktails et buffets aux accents méditerranéens. Plus de détails très prochainement.</p><Link href="/nos-formules" className="button">Découvrir nos formules</Link></section>}
