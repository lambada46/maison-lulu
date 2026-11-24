import type { MetadataRoute } from 'next';

// Remain unindexed until legal pages, photos, pricing and form are ready.
// When launching, update this file AND the robots metadata in layout.tsx.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', disallow: '/' } };
}
