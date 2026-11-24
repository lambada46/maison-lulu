import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import { Photo } from '@/components/photo';
import { site } from '@/config/site';
import { offers } from '@/config/offers';
import { FormulaChoices } from '@/components/formula-choices';

export const metadata: Metadata = {
  title: 'Nos formules — Apéritifs, cocktails & buffets',
  description: 'Découvrez les trois formules de Maison Lulu : apéritifs à partager, cocktails dînatoires et buffets froids à Avignon. Une cuisine généreuse, une organisation simple.',
};

export default function Page() {
  return (
    <>
      <section className="container offers-hero">
        <p className="eyebrow">MAISON LULU · NOS FORMULES</p>
        <h1>À chaque occasion,<br/><em>sa formule.</em></h1>
        <p>Trois façons de recevoir. Une même envie : une cuisine généreuse, inspirée par la Provence et la Corse, et une organisation sans complication.</p>
        <div className="offers-quicknav" aria-label="Explorer les formules">
          {site.formulas.map((formula, index) => <a href={`#${formula.slug}`} key={formula.slug}><span>0{index + 1}</span> {formula.title} <ArrowDown size={16}/></a>)}
        </div>
      </section>

      {site.formulas.map((formula) => {
        const offer = offers[formula.slug];
        return (
          <section className="offer-section" id={formula.slug} key={formula.slug}>
            <div className="container">
              <div className="offer-topline"><span>FORMULE {offer.number}</span><span>{offer.format.toUpperCase()}</span></div>
              <div className="offer-grid">
                <div className="offer-media">
                  <Photo name={formula.image} alt={`Présentation de ${formula.title} : cuisine méditerranéenne à partager`} label={formula.title.toUpperCase()}/>
                  <p>Nos photographies de cuisine sont en préparation.</p>
                </div>
                <div className="offer-content">
                  <p className="eyebrow">{offer.caption.toUpperCase()}</p>
                  <h2>{formula.title}</h2>
                  <p className="offer-headline">{offer.headline}</p>
                  <p className="offer-intro">{offer.intro}</p>
                  <div className="offer-facts">
                    <div><span>Pour quelle occasion ?</span><strong>{offer.occasion}</strong></div>
                    <div><span>Le bon format</span><strong>{offer.serving}</strong></div>
                  </div>
                  <div className="offer-price"><small>PRIX INDICATIF À PARTIR DE</small><strong>{formula.price} € <span>/ personne</span></strong></div>
                  <a className="text-link" href={`#composition-${formula.slug}`}>Découvrir la composition <ArrowDown size={16}/></a>
                </div>
              </div>

              <div className="offer-details" id={`composition-${formula.slug}`}>
                <div className="offer-menu">
                  <p className="eyebrow">DANS VOTRE FORMULE</p>
                  <h3>Le plaisir <em>de partager.</em></h3>
                  {offer.menu.map((section) => <div className="offer-menu-group" key={section.heading}>
                    <h4>{section.heading}</h4>
                    <ul>{section.items.map((item) => <li key={item}><Check size={15} aria-hidden="true"/>{item}</li>)}</ul>
                  </div>)}
                  <p className="offer-menu-note">{offer.note}</p>
                </div>
                <FormulaChoices offer={offer}/>
              </div>
            </div>
          </section>
        );
      })}

      <section className="offers-bottom">
        <div className="container">
          <p className="eyebrow">BIEN RECEVOIR, SIMPLEMENT.</p>
          <h2>Vous avez l’occasion.<br/><em>Nous avons la formule.</em></h2>
          <p>Professionnels ou particuliers, à Avignon et aux alentours. Parlons de votre événement.</p>
          <Link href="/devis" className="button button-ivory">Estimer mon événement <ArrowUpRight size={17}/></Link>
          <p className="offer-disclaimer">Les cartes, tarifs et options présentés sont des propositions de lancement en cours de validation. Livraison, quantités finales, allergènes et prestations complémentaires à préciser avant toute commande.</p>
        </div>
      </section>
    </>
  );
}
