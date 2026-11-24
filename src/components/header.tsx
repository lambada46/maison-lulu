'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './logo';

const links = [
  { href: '/nos-formules', label: 'Nos formules' },
  { href: '/entreprises', label: 'Entreprises' },
  { href: '/particuliers', label: 'Particuliers' },
  { href: '/a-propos', label: 'À propos' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Navigation principale">
          {links.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
          <Link className="button button-small" href="/devis">Estimer mon événement</Link>
        </nav>
        <button className="mobile-toggle" type="button" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Navigation mobile">
        {links.map(({ href, label }) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link className="button" href="/devis" onClick={() => setOpen(false)}>Estimer mon événement</Link>
      </nav>}
    </header>
  );
}
