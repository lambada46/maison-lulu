# Sprint 03 — Mise en service des demandes de devis

## Fonctionnement

Le site Next.js reste statique (`output: 'export'`). L'API `/api/devis` est une **Cloudflare Pages Function** placée à la racine du dépôt dans `functions/api/devis.js`. Un formulaire n'est marqué comme envoyé **que lorsque Resend accepte l'envoi**.

Le prix est indicatif ; livraison et options restent hors calcul.

## Activation Cloudflare

1. Acheter et connecter un domaine réel à Cloudflare Pages (par exemple `maisonlulu.fr`, **si disponible**).
2. Créer un compte Resend et vérifier un domaine (idéalement un sous-domaine d'envoi). Configurer les DNS SPF/DKIM selon les indications du fournisseur.
3. Dans **Cloudflare Dashboard > Workers & Pages > maison-lulu > Settings > Variables and Secrets**, ajouter les variables **Production** :
   - `RESEND_API_KEY` : clé API Resend (**Secret**, jamais dans GitHub ni `NEXT_PUBLIC_*`).
   - `DEVIS_TO_EMAIL` : boîte de réception effective des demandes, par exemple une adresse de votre choix.
   - `DEVIS_FROM_EMAIL` : adresse expéditrice vérifiée dans Resend, par exemple `Maison Lulu <devis@send.votre-domaine.fr>` (l'adresse est un **exemple**, pas une boîte créée).
4. Relancer le déploiement. Tester l'envoi depuis le domaine de production et confirmer la réception dans la boîte choisie (vérifier les spams).
5. Vérifier la conformité des pages légales et RGPD **avant de collecter des données réelles**.

Sans ces trois variables, la route répond HTTP 503. Aucune réussite fictive n'est affichée.

## Sécurité avant publicité Google Ads

- Honeypot et validations côté serveur sont déjà activés.
- Ajouter Turnstile (ou une protection équivalente contre les abus), avec `TURNSTILE_SECRET_KEY` côté serveur ET un widget côté client avant de rendre cette vérification obligatoire. **Ne pas configurer ce secret seul**, sinon toutes les demandes échoueront.
- Ajouter une vraie limitation de débit côté Cloudflare (WAF/rate limiting).
- Réviser le formulaire de consentement et la politique de confidentialité, et déterminer la conservation des demandes.
- Ne jamais exposer de clés Resend dans le navigateur.
- Pour le fonctionnement complet du flux, effectuer un test de bout en bout sur Cloudflare (le développement local `next dev` seul ne sert pas l'API Pages Function).

## Tests manuels

1. Choisir chaque formule et vérifier prix × invités.
2. Personnaliser buffet / cocktail et vérifier le résumé.
3. Vérifier que la livraison est indiquée « sur devis » et n'est pas facturée sans accord.
4. Tester un formulaire avec consentement absent, puis valide.
5. Test sans les secrets : erreur explicite et aucune fausse confirmation.
6. Test avec secrets corrects : e-mail reçu avec toutes les informations.
7. Tester affichage et clavier sur téléphone.

## Limites de cette première version

- Les choix de personnalisation sur la page « Nos formules » ne sont pas encore importés : seule la formule choisie est préremplie dans le devis.
- Pas de CRM, de réservation ni de paiement.
- Aucun e-mail de confirmation automatique envoyé au client.
- Prix et quantités restent à valider commercialement.
