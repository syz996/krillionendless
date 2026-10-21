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
  let written = 0;
  for (const f of files) {
    const dive = JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(DIVE_DIR, f))).toString('utf8'));
    const deepcut = dive.prompts.map(p =>
      (p.answers || []).filter(a => a.tier === 'deepcut').map(a => a.answer)
    );
    const out = path.join(OUT_DIR, `dive-${dive.dive}.json`);
    fs.writeFileSync(out, JSON.stringify(deepcut));
    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`deepcut 数据已导出：public/data/dive-${dive.dive}.json（${kb} KB，${deepcut.reduce((s, a) => s + a.length, 0)} 条）`);
    written++;
  }
  console.log(`共导出 ${written} 期 deepcut 数据。`);
}

main();