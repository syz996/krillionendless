import type { MetadataRoute } from 'next';
import { DIVES, SITE, diveSlug } from '../lib/archive';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.baseUrl.replace(/\/+$/, '');
  return [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/archive/`, priority: 0.8 },
    ...DIVES.map(d => ({ url: `${base}/archive/${diveSlug(d.dive)}/`, priority: 0.6 })),
    { url: `${base}/about/`, priority: 0.3 },
    { url: `${base}/contact/`, priority: 0.3 },
    { url: `${base}/privacy/`, priority: 0.3 },
    { url: `${base}/terms/`, priority: 0.3 },
  ];
}