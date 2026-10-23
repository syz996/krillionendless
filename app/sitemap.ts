import type { MetadataRoute } from 'next';
import { DIVES, SITE, contentModifiedDate, diveSlug, isCurrentDive } from '../lib/archive';
import { PROMPTS } from '../lib/prompts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.baseUrl.replace(/\/+$/, '');
  const latestDate = DIVES.length ? DIVES[DIVES.length - 1].date : undefined;
  return [
    { url: `${base}/`, priority: 1.0, lastModified: latestDate },
    { url: `${base}/archive/`, priority: 0.8, lastModified: latestDate },
    // dive 页 lastmod = max(期数日, 补答案日)：答案在下一期入库当日揭晓并回填，
    // 该日才是页面内容的真实修改日，Google 由此拿到「补了答案」的更新信号。
    ...DIVES.filter(d => !isCurrentDive(d)).map(d => ({ url: `${base}/archive/${diveSlug(d.dive)}/`, priority: 0.6, lastModified: contentModifiedDate(d) })),
    { url: `${base}/prompts/`, priority: 0.6, lastModified: latestDate },
    ...PROMPTS.map(p => ({ url: `${base}/prompts/${p.id}/`, priority: 0.5, lastModified: latestDate })),
    { url: `${base}/about/`, priority: 0.3 },
    { url: `${base}/contact/`, priority: 0.3 },
    { url: `${base}/privacy/`, priority: 0.3 },
    { url: `${base}/terms/`, priority: 0.3 },
  ];
}