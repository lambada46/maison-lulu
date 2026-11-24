import Link from 'next/link';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? 'brand-light' : ''}`} href="/" aria-label="Maison Lulu, accueil">
      <span className="brand-name">MAISON LULU</span>
      <span className="brand-description">TRAITEUR ÉVÉNEMENTIEL</span>
    </Link>
  );
}
