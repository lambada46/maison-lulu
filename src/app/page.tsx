import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Photo } from '@/components/photo';
import { site } from '@/config/site';

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">TRAITEUR · AVIGNON & ALENTOURS</p>
          <h1>Bien recevoir,<br/><em>simplement.</em></h1>
          <p className="hero-description">Apéritifs, cocktails et buffets aux accents méditerranéens pour vos événements professionnels et privés.</p>
          <div className="hero-actions"><Link className="button" href="/devis">Estimer mon événement <ArrowUpRight size={17}/></Link><Link className="text-link" href="/nos-formules">Découvrir nos formules <ArrowUpRight size={16}/></Link></div>
          <p className="hero-note">Une cuisine généreuse. Une organisation simple.</p>
        </div>
        <Photo className="hero-photo" name="hero" alt="Table de buffet méditerranéen composée de mets à partager" label="L'ART DE RECEVOIR" />
      </section>

      <section className="section section-formulas" id="formules">
        <div className="container">
          <div className="section-heading"><p className="eyebrow">NOS FORMULES</p><h2>À chaque occasion,<br/><em>sa formule.</em></h2><p>Trois façons de recevoir, des formules généreuses et des tarifs clairs.</p></div>
          <div className="formula-grid">
            {site.formulas.map((formula) => <Link key={formula.slug} className="formula-card" href={`/nos-formules#${formula.slug}`}>
              <Photo className="formula-photo" name={formula.image} alt={`Présentation de la formule ${formula.title}`} label={formula.title.toUpperCase()}/>
              <div className="formula-title-row"><h3>{formula.title}</h3><ArrowUpRight size={21} /></div>
              <p>{formula.description}</p><span className="formula-price">À partir de {formula.price} € <small>/ personne</small></span>
            </Link>)}
          </div>
          <p className="pricing-warning">Tarifs indicatifs en cours de validation. Devis personnalisé sur demande.</p>
        </div>
      </section>

      <section className="section how-section">
        <div className="container how-grid"><div><p className="eyebrow">COMMENT ÇA MARCHE</p><h2>Recevoir n’a jamais été <em>aussi simple.</em></h2><Link className="text-link" href="/devis">Estimer mon événement <ArrowUpRight size={16}/></Link></div>
          <ol className="steps"><li><span>01</span><h3>Choisissez votre formule</h3></li><li><span>02</span><h3>Indiquez le nombre de convives</h3></li><li><span>03</span><h3>Demandez votre devis</h3></li></ol>
        </div>
      </section>

      <section className="section occasions-section">
        <div className="container"><div className="section-heading"><p className="eyebrow">VOS OCCASIONS</p><h2>Toutes les bonnes raisons <em>de se retrouver.</em></h2></div>
          <div className="occasion-grid">
            <Link href="/entreprises" className="occasion-card"><Photo name="entreprises" alt="Buffet pour une réception professionnelle" label="PROFESSIONNELS"/><div className="occasion-copy"><h3>Événements professionnels</h3><p>Séminaires, inaugurations, réunions, vernissages et soirées d’entreprise.</p><span className="text-link">Découvrir nos offres entreprises <ArrowUpRight size={16}/></span></div></Link>
            <Link href="/particuliers" className="occasion-card"><Photo name="particuliers" alt="Buffet pour une réception privée" label="PARTICULIERS"/><div className="occasion-copy"><h3>Événements privés</h3><p>Anniversaires, fêtes de famille et moments entre amis.</p><span className="text-link">Découvrir nos offres particuliers <ArrowUpRight size={16}/></span></div></Link>
          </div></div>
      </section>

      <section className="section story-section"><div className="container story-grid">
        <Photo name="savoir-faire" alt="Cuisine artisanale méditerranéenne" label="NOTRE SAVOIR-FAIRE"/>
        <div><p className="eyebrow">NOTRE HISTOIRE</p><h2>Deux restaurants.<br/><em>Une même passion.</em></h2><p>Maison Lulu est née du savoir-faire de deux restaurants avignonnais, Chez Lulu et Mamma Corsica. Une cuisine généreuse, inspirée par la Provence et la Corse, pensée pour les moments que l’on partage.</p><div className="restaurant-names"><span>CHEZ LULU</span><span>MAMMA CORSICA</span></div><Link className="text-link" href="/a-propos">Découvrir Maison Lulu <ArrowUpRight size={16}/></Link></div>
      </div></section>

      <section className="final-cta"><div className="container final-cta-inner"><p className="eyebrow">MAISON LULU · AVIGNON</p><h2>On se retrouve autour<br/>d’une <em>belle table ?</em></h2><p>Imaginez votre prochain événement avec Maison Lulu.</p><Link href="/devis" className="button button-ivory">Estimer mon événement <ArrowUpRight size={17}/></Link></div></section>
    </>
  );
}
