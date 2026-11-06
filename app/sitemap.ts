import type { MetadataRoute } from 'next';
import { posts } from '@/content/journal';
import { projects } from '@/content/projects';
import { site } from '@/content/studio';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/projects', '/studio', '/services', '/philosophy', '/journal', '/contact'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}` })),
    ...posts.map((p) => ({ url: `${site.url}/journal/${p.slug}`, lastModified: p.date })),
  ];
}
