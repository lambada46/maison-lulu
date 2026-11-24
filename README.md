# Maison Lulu

Site vitrine pour Maison Lulu, traiteur événementiel à Avignon.

## Développement

Prérequis : Node.js 20+ et npm.

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Vérifications

```bash
npm run lint
npm run typecheck
npm run build
```

Le site est conçu pour l'export statique (dossier `out/` après `npm run build`). Pour Cloudflare Pages, utiliser la commande `npm run build` et le dossier de sortie `out`.

## Contenus à remplacer avant la mise en ligne

- Photos réelles autorisées : `public/images/{hero,aperitif,cocktail,buffet,entreprises,particuliers,savoir-faire}.webp`
- Prix indicatifs dans `src/config/site.ts`
- Coordonnées et informations légales
- Mentions légales et politique de confidentialité
- Formulaire et gestion des devis (Sprint 03)
- Désactivation de `robots: { index: false }` lorsque le site est prêt à être indexé

Les photographies manquantes affichent intentionnellement des emplacements graphiques et ne sont pas remplacées par des photos de banque d'images. Les routes secondaires restent provisoires.
