import Link from 'next/link';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><Logo light /><p>Une cuisine généreuse. Une organisation simple.</p><small>Traiteur événementiel à Avignon</small></div>
        <nav aria-label="Navigation de pied de page">
          <Link href="/nos-formules">Nos formules</Link><Link href="/entreprises">Entreprises</Link>
          <Link href="/particuliers">Particuliers</Link><Link href="/a-propos">À propos</Link>
          <Link href="/devis">Demander un devis</Link>
        </nav>
        <nav aria-label="Informations légales"><Link href="/mentions-legales">Mentions légales</Link><Link href="/politique-de-confidentialite">Confidentialité</Link></nav>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} Maison Lulu · Avignon</div>
    </footer>
  );
}
