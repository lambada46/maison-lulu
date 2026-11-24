import type { Metadata } from 'next'; import Link from 'next/link';
export const metadata: Metadata = {title:'Événements privés'};
export default function Page(){return <section className="container placeholder-page"><p className="eyebrow">POUR LES PARTICULIERS</p><h1>Les moments<br/><em>à partager.</em></h1><p>Anniversaires, fêtes de famille et retrouvailles : Maison Lulu prépare des buffets généreux et des apéritifs à partager. Plus de détails très prochainement.</p><Link href="/nos-formules" className="button">Découvrir nos formules</Link></section>}
