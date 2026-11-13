// lib/prompt-links.ts
// 每日真题（dive）→ 练习题库（/prompts/<id>/）的对应表。
// 收录标准只有一条：这道 dive 题的正确答案能在目标页的答案表里找到。
// 来源：scripts/match-prompts.mjs 初筛 + 逐条人工核对（2026-11-12，26 期 / 182 题 vs 题库 50 条）。
// 注意：题号是 1-based，与页面上「第 N 题」一致。

export type PromptLinkMap = Record<number, Record<number, string>>;

export const PROMPT_LINKS: PromptLinkMap = {
  94: { 7: 'superhero' },
  95: { 1: 'fruit' },
  96: { 7: 'fruit' },
  98: { 1: 'tv-show' },
  100: { 5: 'video-game' },
  103: { 6: 'fruit' },
  104: { 1: 'bird-type' },
  105: { 1: 'pasta-type' },
  107: { 1: 'olympic-sport', 7: 'fast-food-chain' },
  108: { 5: 'fruit' },
  109: { 2: 'holiday' },
  110: { 7: 'music-genre' },
  111: { 1: 'tv-show', 2: 'superhero', 4: 'pokemon' },
  112: { 7: 'dessert' },
  114: { 1: 'fruit', 2: 'video-game' },
  115: { 2: 'tv-show' },
  116: { 3: 'bird-type' },
  118: { 6: 'flower-type' },
};

/** 取某一期的配对，没配对的期返回空对象，直接安全渲染。 */
export function promptLinksForDive(diveNumber: number): Record<number, string> {
  return PROMPT_LINKS[diveNumber] ?? {};
}

/** 反向索引：某个题目页被哪几期出过（11-14 做「This prompt has appeared in」时用）。 */
export const PROMPT_APPEARANCES: Record<string, { dive: number; index: number }[]> = (() => {
  const out: Record<string, { dive: number; index: number }[]> = {};
  for (const [dive, items] of Object.entries(PROMPT_LINKS)) {
    for (const [index, slug] of Object.entries(items)) {
      (out[slug] ??= []).push({ dive: Number(dive), index: Number(index) });
    }
  }
  for (const list of Object.values(out)) list.sort((a, b) => b.dive - a.dive);
  return out;
})();

// 已核对后明确剔除的近似配对，别再手动加回来：
//   #105/5 超能力 → superhero（不是英雄名）
//   #119/5 流媒体原创电影或剧 → tv-show（跨到电影）
//   #112/2 不是鱼或鸟的海洋动物 → bird-type（不是鸟）
//   #106/3 策略桌游 → dice-board-game（不一定要用骰子）
//   #109/4 南美原生动物 → south-american-country（问的是动物不是国家）
//   各种「X brand」→ chocolate-brand、「country with…」→ country-k 一律不加。