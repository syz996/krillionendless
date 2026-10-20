// 站点全局配置（纯常量，无 fs，可被服务端与客户端组件共用）。
export const SITE = {
  baseUrl: 'https://krillionendless.org',  // 用于 canonical / sitemap / robots 的绝对地址
  brand: 'KrillionEndless',                // 品牌名
  domain: 'krillionendless.org',           // 页脚展示域名
  defaultFaq: [
    {
      q: 'Is this the official Krillion archive?',
      a: 'No. This is an independent, fan-made archive — not affiliated with the official game at krillion.io.',
    },
    {
      q: 'Do these pages include the official answers?',
      a: 'Yes — every dive page carries the full official answer list with rarity tiers and scores, collapsed prompt by prompt so nothing is spoiled until you open it.',
    },
    {
      q: 'Can I replay this dive?',
      a: 'Yes. Open the unlimited version to replay with the same 25-second timer, or come back here to review the prompts again.',
    },
  ],
};