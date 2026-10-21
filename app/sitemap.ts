import type { MetadataRoute } from 'next';
import { DIVES, SITE, diveSlug, isCurrentDive } from '../lib/archive';
import { PROMPTS } from '../lib/prompts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.baseUrl.replace(/\/+$/, '');
  const latestDate = DIVES.length ? DIVES[DIVES.length - 1].date : undefined;
  return [
    { url: `${base}/`, priority: 1.0, lastModified: latestDate },
    { url: `${base}/archive/`, priority: 0.8, lastModified: latestDate },
    ...DIVES.filter(d => !isCurrentDive(d)).map(d => ({ url: `${base}/archive/${diveSlug(d.dive)}/`, priority: 0.6, lastModified: d.date })),
    { url: `${base}/prompts/`, priority: 0.6, lastModified: latestDate },
    ...PROMPTS.map(p => ({ url: `${base}/prompts/${p.id}/`, priority: 0.5, lastModified: latestDate })),
    { url: `${base}/about/`, priority: 0.3 },
    { url: `${base}/contact/`, priority: 0.3 },
    { url: `${base}/privacy/`, priority: 0.3 },
    { url: `${base}/terms/`, priority: 0.3 },
  ];
}