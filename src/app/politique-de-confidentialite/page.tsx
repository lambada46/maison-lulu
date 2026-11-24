import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Politique de confidentialité', robots: { index: false, follow: false } };
export default function Page() {
  return <section className="container placeholder-page">
    <p className="eyebrow">VIE PRIVÉE</p><h1>Vos données,<br/><em>notre attention.</em></h1>
    <p>Lorsque vous envoyez une demande de devis, Maison Lulu utilise votre nom, votre adresse e-mail, votre numéro de téléphone si renseigné, ainsi que les informations relatives à votre événement pour répondre à votre demande et préparer une proposition commerciale.</p>
    <p>Ces informations sont transmises par l’intermédiaire du prestataire technique d’envoi d’e-mails configuré pour le site. Aucun paiement n’est effectué lors de la demande.</p>
    <p><strong>Avant l’ouverture commerciale :</strong> compléter cette politique avec l’identité et les coordonnées du responsable de traitement, le prestataire choisi, la durée de conservation, la base légale, les droits des personnes et le contact pour les exercer.</p>
  </section>;
}
