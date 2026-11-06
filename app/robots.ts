import type { MetadataRoute } from 'next';
import { site } from '@/content/studio';

// Concept site: disallow indexing until it is published intentionally.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', disallow: '/' }], sitemap: `${site.url}/sitemap.xml` };
}
