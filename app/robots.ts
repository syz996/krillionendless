import type { MetadataRoute } from 'next';
import { SITE } from '../lib/archive';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const base = SITE.baseUrl.replace(/\/+$/, '');
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
  };
}