/**
 * Deep Cut（85 分）答案在页面上最多展示多少条。
 * generate-deepcut.mjs 会用正则读这个数字，所以只改这里一处，
 * 导出的 /data/dive-N.json 和页面上的计数就会一起变。
 */
export const DEEPCUT_SHOWN = 150;

/** 页面上实际能看到的条数：按钮文案、计数都用它，别再显示全量。 */
export const shownDeepcutCount = (total: number): number =>
  Math.max(0, Math.min(total, DEEPCUT_SHOWN));
