#!/usr/bin/env node
// 构建前步骤：把每个 dive 的 deepcut（85 分）答案从 gzip 存档里抽出来，
// 写成 public/data/dive-N.json（结构为 string[][]，按 prompt 顺序）。
// 归档页只静态渲染 krillion/rare/schooler/plankton（可被搜索引擎索引），
// deepcut 体量最大但查找价值最低，改由客户端按需 fetch，避免 HTML 膨胀。
//
// 由 npm 的 prebuild 钩子自动触发：npm run build 会先跑本脚本再 next build。

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = process.cwd();
const DIVE_DIR = path.join(ROOT, 'content', 'dives');
const OUT_DIR = path.join(ROOT, 'public', 'data');

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
    const deepcut = dive.prompts.map(p =>
      (p.answers || []).filter(a => a.tier === 'deepcut').map(a => a.answer)
    );
    const out = path.join(OUT_DIR, `dive-${dive.dive}.json`);
    fs.writeFileSync(out, JSON.stringify(deepcut));
    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`deepcut 数据已导出：public/data/dive-${dive.dive}.json（${kb} KB，${deepcut.reduce((s, a) => s + a.length, 0)} 条）`);
    written++;
  }
  console.log(`共导出 ${written} 期 deepcut 数据${latest ? `（当期 dive-${latest} 待次日揭晓）` : ''}。`);
}

main();