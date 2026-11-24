import type { MetadataRoute } from 'next';

const base = 'https://maison-lulu.fr';
const slugs = ['', '/nos-formules', '/entreprises', '/particuliers', '/a-propos', '/devis'];

export default function sitemap(): MetadataRoute.Sitemap {
  return slugs.map((slug) => ({
    url: base + slug,
    changeFrequency: slug === '' ? 'weekly' : 'monthly',
    priority: slug === '' ? 1 : slug === '/devis' ? 0.8 : 0.7,
  }));
}
