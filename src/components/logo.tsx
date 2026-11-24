import Link from 'next/link';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? 'brand-light' : ''}`} href="/" aria-label="Maison Lulu, accueil">
      <span className="brand-name">
        <span className="brand-maison">MAISON</span>
        <span className="brand-lulu">LULU</span>
      </span>
      <span className="brand-description">TRAITEUR ÉVÉNEMENTIEL</span>
      <span className="brand-dot" aria-hidden="true" />
    </Link>
  );
}
