import type { Metadata } from 'next'; import Link from 'next/link';
export const metadata: Metadata = {title:'À propos'};
export default function Page(){return <section className="container placeholder-page"><p className="eyebrow">NOTRE HISTOIRE</p><h1>Deux restaurants.<br/><em>Une même passion.</em></h1><p>Maison Lulu est née du savoir-faire de deux restaurants avignonnais, Chez Lulu et Mamma Corsica. Une cuisine généreuse, inspirée par la Provence et la Corse, pensée pour les moments que l’on partage.</p><Link className="button" href="/nos-formules">Nos formules</Link></section>}
