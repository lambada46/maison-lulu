import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import { Photo } from '@/components/photo';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Traiteur pour entreprises à Avignon — Cocktails & buffets',
  description: 'Un traiteur pour vos événements professionnels à Avignon : séminaires, réunions, vernissages et inaugurations. Découvrez les cocktails et buffets Maison Lulu.',
};

const situations = [
  { title: 'Séminaires & réunions', description: 'Un buffet pratique et généreux pour prolonger les échanges autour d’une bonne table.' },
  { title: 'Inaugurations & vernissages', description: 'Des bouchées faciles à partager, pour accompagner un verre sans interrompre les conversations.' },
  { title: 'Soirées d’équipe', description: 'Un cocktail dînatoire convivial, à organiser sans multiplier les interlocuteurs.' },
];
const formulaInfo = [
  { slug: 'aperitif', detail: 'Pour accompagner un verre et marquer le moment.' },
  { slug: 'cocktail', detail: 'Pour une réception debout qui tient lieu de repas.' },
  { slug: 'buffet', detail: 'Pour déjeuner ou dîner ensemble, sans service à table.' },
];

export default function EntreprisesPage() {
  return <>
    <section className="audience-hero container">
      <div className="audience-hero-copy">
        <p className="eyebrow">TRAITEUR ENTREPRISE · AVIGNON & ALENTOURS</p>
        <h1>Vos événements,<br/><em>sans complication.</em></h1>
        <p>Un séminaire, une inauguration, un verre entre collègues ? Maison Lulu prépare des apéritifs, cocktails et buffets aux accents méditerranéens, avec une offre claire et une organisation simple.</p>
        <div className="audience-hero-actions">
          <Link className="button" href="/devis?type=professionnel">Estimer mon événement <ArrowUpRight size={16} /></Link>
          <Link className="text-link" href="#formules-pro">Découvrir les formules <ArrowRight size={16} /></Link>
        </div>
      </div>
      <Photo name="entreprises" className="audience-hero-photo" label="LES RENDEZ-VOUS QUI COMPTENT" alt="Buffet méditerranéen à partager lors d'un événement professionnel"/>
    </section>

    <section className="audience-section audience-soft">
      <div className="container">
        <div className="audience-section-header"><p className="eyebrow">POUR QUELLES OCCASIONS ?</p><h2>Des moments de travail.<br/><em>Et de convivialité.</em></h2></div>
        <div className="audience-situations">{situations.map((item, i) => <article key={item.title}><span>0{i+1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      </div>
    </section>

    <section className="audience-section" id="formules-pro">
      <div className="container">
        <div className="audience-section-header"><p className="eyebrow">UNE OFFRE CLAIRE</p><h2>La bonne formule,<br/><em>pour la bonne occasion.</em></h2><p>Des propositions imaginées pour vous éviter un devis à l’aveugle. Le tarif définitif dépendra des besoins de votre réception.</p></div>
        <div className="audience-formula-grid">
          {site.formulas.map((item, i) => <article key={item.slug} className="audience-formula">
            <span className="eyebrow">FORMULE 0{i+1}</span>
            <h3>{item.title}</h3>
            <p>{formulaInfo[i].detail}</p>
            <strong>À partir de {item.price} € <small>/ personne*</small></strong>
            <Link className="text-link" href={`/devis?type=professionnel&formule=${item.slug}`}>Estimer cette formule <ArrowUpRight size={16}/></Link>
          </article>)}
        </div>
        <p className="audience-footnote">* Tarifs TTC indicatifs en cours de validation, hors livraison et services complémentaires. Composition à confirmer lors du devis.</p>
      </div>
    </section>

    <section className="audience-section audience-soft"><div className="container audience-duo">
      <div><p className="eyebrow">NOTRE FAÇON DE FAIRE</p><h2>De bonnes choses.<br/><em>Moins d’allers-retours.</em></h2></div>
      <div><p>Maison Lulu est née de deux restaurants avignonnais : Chez Lulu et Mamma Corsica. Nous aimons les bonnes tables, les produits choisis avec soin et les choses faites simplement.</p>
        <ul className="audience-benefits"><li><Check size={17}/> Des formules pensées à l’avance</li><li><Check size={17}/> Quelques choix de personnalisation</li><li><Check size={17}/> Une première estimation sans laisser vos coordonnées</li></ul>
      </div>
    </div></section>

    <section className="audience-bottom"><div className="container">
      <p className="eyebrow">VOTRE PROCHAIN ÉVÉNEMENT</p>
      <h2>Commençons <em>simplement.</em></h2>
      <p>Choisissez une formule, indiquez le nombre de convives et découvrez votre budget indicatif.</p>
      <Link className="button button-ivory" href="/devis?type=professionnel">Estimer mon événement <ArrowUpRight size={16}/></Link>
    </div></section>
  </>;
}
