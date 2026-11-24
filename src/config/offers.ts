export type FormulaId = 'aperitif' | 'cocktail' | 'buffet';

export type ChoiceGroup = {
  title: string;
  hint: string;
  choices: readonly string[];
};

export type Offer = {
  slug: FormulaId;
  number: string;
  caption: string;
  headline: string;
  intro: string;
  occasion: string;
  format: string;
  serving: string;
  menu: readonly { heading: string; items: readonly string[] }[];
  choiceGroups: readonly ChoiceGroup[];
  note: string;
};

// Carte de lancement éditoriale, NON encore validée en fiches techniques.
// Ne pas promettre les quantités exactes, suppléments ni régimes alimentaires
// avant validation opérationnelle et calcul des coûts.
export const offers: Record<FormulaId, Offer> = {
  aperitif: {
    slug: 'aperitif',
    number: '01',
    caption: 'Le plaisir de se retrouver',
    headline: 'Un verre, de bonnes choses à partager.',
    intro: 'Une sélection de petites bouchées et de produits soigneusement choisis pour accompagner un moment convivial.',
    occasion: 'Vernissages · Inaugurations · Apéritifs entre amis',
    format: 'À partager',
    serving: 'Pour accompagner un verre',
    menu: [
      { heading: 'Sur la table', items: ['Charcuteries corses', 'Sélection de fromages', 'Olives & pain de campagne'] },
      { heading: 'Les bouchées', items: ['Mini-quiches de saison', 'Focaccias à la ricotta et aux herbes', 'Bouchées de légumes méditerranéens', 'Crostinis de brandade de morue'] },
    ],
    choiceGroups: [],
    note: 'Pensé comme un apéritif, et non comme un repas complet.',
  },
  cocktail: {
    slug: 'cocktail',
    number: '02',
    caption: 'Un repas qui se partage debout',
    headline: 'Des bouchées généreuses, sans cérémonie.',
    intro: 'Du salé, du sucré et beaucoup de gourmandise. Un cocktail dînatoire imaginé pour profiter pleinement de ses invités.',
    occasion: 'Soirées d’entreprise · Réceptions · Anniversaires',
    format: 'Bouchées & pièces à partager',
    serving: 'Pour remplacer un repas',
    menu: [
      { heading: 'Côté salé', items: ['Mini-quiches de saison', 'Focaccias aux légumes & à la ricotta', 'Mini-brioches au bœuf effiloché', 'Bouchées de saumon au citron', 'Verrines de légumes de saison', 'Sélection de charcuteries & fromages'] },
      { heading: 'Côté sucré', items: ['Mini-fiadone', 'Moelleux à la châtaigne', 'Brownie maison'] },
    ],
    choiceGroups: [
      { title: 'Une touche végétarienne', hint: 'Choisissez le caractère de votre assortiment.', choices: ['Assortiment maison', 'Accent végétarien'] },
      { title: 'La douceur du moment', hint: 'Une préférence pour la note sucrée ?', choices: ['Fiadone corse', 'Moelleux à la châtaigne', 'Assortiment de douceurs'] },
    ],
    note: 'Les substitutions sont des préférences à confirmer dans le devis, selon saison et disponibilité.',
  },
  buffet: {
    slug: 'buffet',
    number: '03',
    caption: 'La table généreuse',
    headline: 'Un vrai repas, à partager librement.',
    intro: 'De belles préparations froides, des salades de saison et des desserts maison : l’esprit d’une grande table méditerranéenne.',
    occasion: 'Déjeuners d’équipe · Fêtes de famille · Grandes tablées',
    format: 'Grandes pièces & plats à partager',
    serving: 'Pour un repas complet',
    menu: [
      { heading: 'Pour commencer', items: ['Charcuteries corses & sélection de fromages', 'Ricotta aux herbes', 'Légumes de saison rôtis'] },
      { heading: 'Au centre de la table', items: ['Filet mignon de porc rôti aux herbes', 'Saumon au citron et à l’huile d’olive', 'Salade de riz de Camargue', 'Salade de lentilles aux herbes fraîches'] },
      { heading: 'Pour finir', items: ['Fiadone', 'Moelleux à la châtaigne', 'Brownie maison'] },
    ],
    choiceGroups: [
      { title: 'Votre pièce principale', hint: 'Quelle préparation préférez-vous mettre en avant ?', choices: ['Filet mignon de porc aux herbes', 'Saumon rôti au citron', 'Assortiment des deux'] },
      { title: 'Votre salade', hint: 'Une base généreuse pour accompagner le repas.', choices: ['Riz de Camargue', 'Lentilles aux herbes', 'Pois chiches méditerranéens'] },
      { title: 'Votre dessert', hint: 'Une note douce pour terminer.', choices: ['Fiadone', 'Moelleux à la châtaigne', 'Brownie maison'] },
    ],
    note: 'Les choix illustrent la personnalisation envisagée. La composition exacte et les éventuels suppléments seront confirmés sur devis.',
  },
};
