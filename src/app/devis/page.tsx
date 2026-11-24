import type { Metadata } from 'next'; import Link from 'next/link';
export const metadata: Metadata = {title:'Estimer mon événement'};
export default function Page(){return <section className="container placeholder-page"><p className="eyebrow">VOTRE ÉVÉNEMENT</p><h1>Bien recevoir,<br/><em>ça se prépare.</em></h1><p>Notre outil d’estimation et de demande de devis arrive bientôt. En attendant, découvrez nos formules. Aucun devis ne peut encore être envoyé depuis ce site.</p><Link href="/nos-formules" className="button">Découvrir nos formules</Link></section>}
