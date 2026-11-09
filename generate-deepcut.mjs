#!/usr/bin/env node
// 构建前步骤：把每个 dive 的 deepcut（85 分）答案从 gzip 存档里抽出来，
// 写成 public/data/dive-N.json（结构为 string[][]，按 prompt 顺序）。
// 归档页只静态渲染 krillion/rare/schooler/plankton（可被搜索引擎索引），
// deepcut 体量最大但查找价值最低，改由客户端按需 fetch，避免 HTML 膨胀。
//
// 导出时每个题目最多保留 LIMIT 条（读 lib/deepcut.ts 的 DEEPCUT_SHOWN，默认 150）。
// 官方答案池里 deepcut 动辄上万条（dive-110 单期 2.4 MB），没必要全给浏览器。
// 只裁这个派生文件：content/dives/*.json.gz 存档、页面上的全量统计都不动，
// 因此 sitemap 的 lastmod 与文章的 dateModified 不受影响。
//
// 由 npm 的 prebuild 钩子自动触发：npm run build 会先跑本脚本再 next build。

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = process.cwd();
const DIVE_DIR = path.join(ROOT, 'content', 'dives');
const OUT_DIR = path.join(ROOT, 'public', 'data');

// 与前端共用同一个上限：直接读 lib/deepcut.ts，避免两处各写一个数字而漂移。
function readLimit() {
  const p = path.join(ROOT, 'lib', 'deepcut.ts');
  if (!fs.existsSync(p)) return 150;
  const m = fs.readFileSync(p, 'utf8').match(/DEEPCUT_SHOWN\s*=\s*(\d+)/);
  return m ? Number(m[1]) : 150;
}

const LIMIT = readLimit();

function main() {
  if (!fs.existsSync(DIVE_DIR)) return;
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs.readdirSync(DIVE_DIR).filter(f => f.endsWith('.json.gz'));
  const dives = files.map(f => JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(DIVE_DIR, f))).toString('utf8')));
  const latest = dives.length ? Math.max(...dives.map(d => d.dive)) : 0;

  // 当期（最新一期）官方答案尚未揭晓：不导出其 deepcut，避免裸 JSON 直接泄题。
  // 次日新一期入库后，旧的当期会自动转成可导出。顺带清掉遗留的当期文件。
  const latestOut = path.join(OUT_DIR, `dive-${latest}.json`);
  if (latest && fs.existsSync(latestOut)) {
    fs.unlinkSync(latestOut);
    console.log(`已删除当期 deepcut 文件（次日揭晓后再生）：dive-${latest}.json`);
  }

  let written = 0;
  for (const dive of dives) {
    if (dive.dive === latest) continue;
    let kept = 0;
    let dropped = 0;
    const deepcut = dive.prompts.map(p => {
      const all = (p.answers || []).filter(a => a.tier === 'deepcut').map(a => a.answer);
      const cut = all.slice(0, LIMIT);
      kept += cut.length;
      dropped += all.length - cut.length;
      return cut;
    });
    const out = path.join(OUT_DIR, `dive-${dive.dive}.json`);
    fs.writeFileSync(out, JSON.stringify(deepcut));
    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`deepcut 数据已导出：public/data/dive-${dive.dive}.json（${kb} KB，${kept} 条${dropped ? `，裁掉 ${dropped} 条` : ''}）`);
    written++;
  }
  console.log(`共导出 ${written} 期 deepcut 数据（每题上限 ${LIMIT} 条）${latest ? `（当期 dive-${latest} 待次日揭晓）` : ''}。`);
}

main();
