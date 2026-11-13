import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = process.cwd();
const DIVE_DIR = path.join(ROOT, 'content', 'dives');

// 1) 题库：从 lib/prompts.ts 抓相邻的 { id, text }
const src = fs.readFileSync(path.join(ROOT, 'lib', 'prompts.ts'), 'utf8');
const PROMPTS = [...src.matchAll(/id:\s*'([^']+)',\s*text:\s*'((?:[^'\\]|\\.)*)'/g)]
  .map(m => ({ id: m[1], text: m[2].replace(/\\'/g, "'") }));
console.error(`题库: ${PROMPTS.length} 条`);

// 2) 全部期数据
const files = fs.readdirSync(DIVE_DIR).filter(f => /^dive-\d+\.json\.gz$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
const rows = [];
for (const f of files) {
  const dive = JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(DIVE_DIR, f))).toString('utf8'));
  (dive.prompts || []).forEach((p, i) => rows.push({ dive: dive.dive, idx: i + 1, prompt: p.prompt }));
}
console.error(`期数据: ${files.length} 期, ${rows.length} 题`);

// 3) 归一化 + 双向词覆盖打分
const STOP = new Set(['name','a','an','the','of','in','with','whose','that','has','have','is','are','on','at','by','for','from','to','and','or','english','word','title','includes','include','starts','start','begins','begin','starting','beginning','letter','you','can','type','types','think']);
const norm = s => s.toLowerCase().replace(/[’']s\b/g, '').replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(w => w && !STOP.has(w));
const setOf = s => new Set(norm(s));
const bank = PROMPTS.map(p => ({ ...p, words: setOf(p.text) }));

const scored = rows.map(r => {
  const dw = setOf(r.prompt);
  let best = { id: '-', text: '-', score: 0 };
  for (const b of bank) {
    let hitBank = 0; for (const w of b.words) if (dw.has(w)) hitBank++;
    let hitDive = 0; for (const w of dw) if (b.words.has(w)) hitDive++;
    const score = ((b.words.size ? hitBank / b.words.size : 0) + (dw.size ? hitDive / dw.size : 0)) / 2;
    if (score > best.score) best = { id: b.id, text: b.text, score };
  }
  return { ...r, ...best };
});

// 4) 输出
const band = (lo, hi) => scored.filter(s => s.score >= lo && s.score < hi);
const row = s => `| ${s.score.toFixed(2)} | #${s.dive} 第${s.idx}题 | ${s.prompt} | \`${s.id}\` | ${s.text} |`;
const tbl = (arr) => arr.length ? arr.sort((x, y) => y.score - x.score).map(row).join('\n') : '_无_';

const out = [
  `# 题面 ↔ 题库对应关系`, ``,
  `期数据 ${files.length} 期 / ${rows.length} 题；题库 ${PROMPTS.length} 条`, ``,
  `## A. 确认匹配（≥ 0.50）`, ``, `| 分 | 位置 | 题面 | 题库 id | 题库 text |`, `|---|---|---|---|---|`, tbl(band(0.5, 2)), ``,
  `## B. 需人工确认（0.34 – 0.50）`, ``, `| 分 | 位置 | 题面 | 题库 id | 题库 text |`, `|---|---|---|---|---|`, tbl(band(0.34, 0.5)), ``,
  `## C. 无匹配（< 0.34）`, ``, `共 ${band(0, 0.34).length} 题，不用逐条看。`, ``,
].join('\n');
fs.writeFileSync(path.join(ROOT, 'prompt-match.md'), out);
console.log(`A 确认 ${band(0.5,2).length} / B 待确认 ${band(0.34,0.5).length} / C 无匹配 ${band(0,0.34).length}`);
console.log('清单已写到 prompt-match.md');