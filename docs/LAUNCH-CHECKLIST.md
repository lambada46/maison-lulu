# Maison Lulu — vérifications avant le lancement

## Domaine et Pages
- [ ] maison-lulu.fr actif dans Cloudflare Pages > Custom domains
- [ ] https://maison-lulu.fr et HTTPS fonctionnent
- [ ] www redirige vers le domaine principal
- [ ] Vérifier les DNS MX / SPF / DKIM de la boîte de réception

## Formulaire
- [ ] Domaine d'envoi Resend vérifié
- [ ] RESEND_API_KEY, DEVIS_TO_EMAIL, DEVIS_FROM_EMAIL configurés en secrets Production
- [ ] Soumission réelle réussie, e-mail reçu et réponse au client testée
- [ ] Protection anti-abus + rate limiting avant les Google Ads
- [ ] Prévoir la sauvegarde des leads en base plutôt que de dépendre de l'e-mail seul

## Conformité commerciale et juridique
- [ ] Valider les coûts et les tarifs affichés (les trois prix sont provisoires)
- [ ] Définir minima de commande, aire de livraison, frais, modalités d'annulation et allergènes
- [ ] Compléter mentions légales, identification de l'éditeur, hébergeur et informations de contact
- [ ] Finaliser la politique de confidentialité, durée de conservation et droits RGPD
- [ ] Remplacer les images de référence par des photographies des produits réels
- [ ] Tester la chaîne de froid et les descriptions des prestations réelles

## SEO & mesure
- [x] Titres et descriptions spécifiques pour les pages Entreprises et Particuliers
- [x] Sitemap et robots préparés
- [x] Parcours de devis instrumenté pour GA4 avec consentement
- [ ] Créer la propriété GA4 et définir NEXT_PUBLIC_GA_MEASUREMENT_ID dans Cloudflare **au moment du lancement**, si vous souhaitez GA4
- [ ] Tester le consentement, les événements et la conversion finale sans données personnelles
- [ ] Enlever noindex de src/app/layout.tsx ET disallow de src/app/robots.ts lors du lancement
- [ ] Vérifier la propriété Google Search Console et soumettre sitemap.xml
- [ ] Connecter Google Ads, ne compter comme conversion principale que les demandes réellement transmises
- [ ] Tester mobile et build de production
