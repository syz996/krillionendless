import type { MetadataRoute } from 'next';
import { DIVES, SITE, diveSlug, getLastmod, isCurrentDive } from '../lib/archive';
import { PROMPTS } from '../lib/prompts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.baseUrl.replace(/\/+$/, '');
  const lm = getLastmod();
  const latestDate = DIVES.length ? DIVES[DIVES.length - 1].date : undefined;
  // lastmod 按「内容修改日」：优先取 generate-deepcut.mjs 生成的 git 提交日清单，
  // 缺失时回退为数据驱动日期（聚合页=最新期日期，dive 页=期日期）。
  const siteDate = lm.site || latestDate;
  const promptsDate = lm.prompts || siteDate;
  const diveDate = (d: (typeof DIVES)[number]) => lm.dives[String(d.dive)] || d.date;
  return [
    { url: `${base}/`, priority: 1.0, lastModified: siteDate },
    { url: `${base}/archive/`, priority: 0.8, lastModified: siteDate },
    ...DIVES.filter(d => !isCurrentDive(d)).map(d => ({ url: `${base}/archive/${diveSlug(d.dive)}/`, priority: 0.6, lastModified: diveDate(d) })),
    { url: `${base}/prompts/`, priority: 0.6, lastModified: promptsDate },
    ...PROMPTS.map(p => ({ url: `${base}/prompts/${p.id}/`, priority: 0.5, lastModified: promptsDate })),
    { url: `${base}/about/`, priority: 0.3 },
    { url: `${base}/contact/`, priority: 0.3 },
    { url: `${base}/privacy/`, priority: 0.3 },
    { url: `${base}/terms/`, priority: 0.3 },
  ];
}