import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
export const metadata: Metadata = { title: 'Nos formules' };
export default function Page() { return <section className="container placeholder-page"><p className="eyebrow">NOS FORMULES</p><h1>À chaque occasion,<br/><em>sa formule.</em></h1><p>Nos formules sont en cours de finalisation. Découvrez les trois formats proposés par Maison Lulu.</p><div className="formula-grid">{site.formulas.map(f=><div key={f.slug}><h2 style={{fontSize:36}}>{f.title}</h2><p>{f.description}</p><strong>À partir de {f.price} € / personne*</strong></div>)}</div><p style={{fontSize:12,marginTop:30}}>* Prix indicatifs sous réserve de validation.</p><Link className="button" href="/devis">Nous contacter</Link></section>; }
