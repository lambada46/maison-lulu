export const site = {
  name: 'Maison Lulu',
  tagline: 'Bien recevoir, simplement.',
  description: 'Traiteur événementiel à Avignon',
  region: 'Avignon & alentours',
  contact: { email: '', phone: '', address: '', siret: '' },
  formulas: [
    { slug: 'aperitif', title: "L’Apéritif", price: 19, description: 'Pour accompagner un verre et partager un moment convivial.', image: 'aperitif' },
    { slug: 'cocktail', title: 'Le Cocktail', price: 29, description: 'Un assortiment de bouchées salées et sucrées pour une réception debout.', image: 'cocktail' },
    { slug: 'buffet', title: 'Le Buffet', price: 35, description: 'Une table généreuse pour partager un repas complet.', image: 'buffet' },
  ],
} as const;
// Les tarifs sont des hypothèses à confirmer, PAS une offre commerciale validée.
