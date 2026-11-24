import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Photo } from '@/components/photo';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Traiteur pour anniversaires et fêtes à Avignon',
  description: 'Pour un anniversaire, une fête de famille ou une réception entre amis à Avignon : apéritifs, cocktails et buffets méditerranéens Maison Lulu.',
};

const situations = [
  { title: 'Anniversaires', description: 'Un apéritif à partager ou un vrai buffet, selon la fête que vous imaginez.' },
  { title: 'Fêtes de famille', description: 'Une grande table généreuse, pour retrouver le plaisir d’être ensemble.' },
  { title: 'Retrouvailles & soirées', description: 'Des petites bouchées et de bonnes choses à partager, simplement.' },
];
const formulaInfo = [
  { slug: 'aperitif', detail: 'Un début de fête autour d’un verre.' },
  { slug: 'cocktail', detail: 'Une soirée gourmande, sans repas assis.' },
  { slug: 'buffet', detail: 'Une table complète, pour partager le repas.' },
];

export default function ParticuliersPage() {
  return <>
    <section className="audience-hero container">
      <div className="audience-hero-copy">
        <p className="eyebrow">TRAITEUR POUR VOS FÊTES · AVIGNON & ALENTOURS</p>
        <h1>Les bonnes raisons<br/><em>de se retrouver.</em></h1>
        <p>Anniversaire, fête de famille ou soirée entre amis : Maison Lulu imagine des apéritifs, cocktails et buffets généreux pour profiter de vos invités plutôt que de passer la journée en cuisine.</p>
        <div className="audience-hero-actions">
          <Link className="button" href="/devis?type=prive">Estimer ma réception <ArrowUpRight size={16}/></Link>
          <Link className="text-link" href="#formules-privees">Découvrir les formules <ArrowRight size={16}/></Link>
        </div>
      </div>
      <Photo name="particuliers" className="audience-hero-photo" label="LE PLAISIR DE SE RETROUVER" alt="Grande table conviviale avec des mets méditerranéens à partager"/>
    </section>

    <section className="audience-section audience-soft"><div className="container">
      <div className="audience-section-header"><p className="eyebrow">POUR QUELLES OCCASIONS ?</p><h2>À chaque fête,<br/><em>sa façon de recevoir.</em></h2></div>
      <div className="audience-situations">{situations.map((item, i) => <article key={item.title}><span>0{i+1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
    </div></section>

    <section className="audience-section" id="formules-privees"><div className="container">
      <div className="audience-section-header"><p className="eyebrow">FAITES VOTRE CHOIX</p><h2>Une formule prête.<br/><em>Quelques libertés.</em></h2><p>Nous composons la table, vous choisissez l’ambiance et quelques préférences. Et le budget reste clair dès le départ.</p></div>
      <div className="audience-formula-grid">
        {site.formulas.map((item, i) => <article className="audience-formula" key={item.slug}>
          <span className="eyebrow">FORMULE 0{i+1}</span>
          <h3>{item.title}</h3>
          <p>{formulaInfo[i].detail}</p>
          <strong>À partir de {item.price} € <small>/ personne*</small></strong>
          <Link className="text-link" href={`/devis?type=prive&formule=${item.slug}`}>Estimer cette formule <ArrowUpRight size={16}/></Link>
        </article>)}
      </div>
      <p className="audience-footnote">* Tarifs TTC indicatifs en cours de validation, hors livraison et services complémentaires. Composition à confirmer lors du devis.</p>
    </div></section>

    <section className="audience-section audience-soft"><div className="container audience-duo">
      <div><p className="eyebrow">L’ESPRIT MAISON LULU</p><h2>Comme à la maison.<br/><em>En plus gourmand.</em></h2></div>
      <div><p>La Provence rencontre la Corse, avec les recettes et le savoir-faire de Chez Lulu et Mamma Corsica. Des préparations à partager, des saveurs franches et une vraie envie de recevoir.</p>
        <ul className="audience-benefits"><li><Check size={17}/> Une cuisine conviviale et généreuse</li><li><Check size={17}/> Des choix simples pour personnaliser</li><li><Check size={17}/> Une estimation immédiate avant votre demande</li></ul>
      </div>
    </div></section>

    <section className="audience-bottom"><div className="container">
      <p className="eyebrow">ON SE RETROUVE ?</p><h2>Une belle table.<br/><em>Et du temps pour vos invités.</em></h2>
      <p>Racontez-nous votre réception en quelques clics.</p>
      <Link className="button button-ivory" href="/devis?type=prive">Estimer ma réception <ArrowUpRight size={16}/></Link>
    </div></section>
  </>;
}
