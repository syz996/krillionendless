#!/usr/bin/env node
// 抓取当日 Krillion dive 的 7 道公开题目与全量答案，生成草稿 JSON。
// 用法：node fetch-dive.mjs
//
// 流程：
//   1. 按纽约时区算出「今天」是哪一期（Dive #1 = 2026-07-16，每天一期）。
//   2. 调用第三方接口抓取当天公开的 7 道题目与答案（见 fetchDivePrompts）。
//   3. 把题目生成草稿到 content/drafts/dive-N.json。
//   4. 人工补全 hint 与 analysis 后，打包为 content/dives/dive-N.json.gz 才参与构建：
//      node fetch-dive.mjs --pack content/drafts/dive-N.json
//      （草稿是明文 JSON 便于编辑；正式数据 gzip 存档，仓库体积约 -85%）
//
// 注意：hint 与 analysis 是人工撰写的方向性提示和特点分析，
//       不是本脚本编造；否则 build 的质检闸门（正文 <500 词 / analysis <2 段）会拦截。
//       answers 随草稿一并落地；归档页按题折叠展示全量答案（点开才剧透，含当期当天）。
//
// ── 接口数据结构（GET https://krillion.io/api/reveal?date=YYYY-MM-DD，无需鉴权）──
// 响应顶层
//   date    : string，如 "2026-10-17"
//   prompts : array，恰好 7 条
// 每条 prompt
//   id      : string，"p1" ~ "p7"
//   text    : string，题目文本  ← 本脚本只提取这个字段
//   answers : array，全量答案（含 tier 与 score，刻意不落地）
// 每条 answer
//   answer  : string
//   tier    : string，官方稀有度（krillion / deepcut / … / plankton）
//   score   : number（100 / 85 / … / 10）
//   quip    : string，一句俏皮说明
// 约束：仅纽约当日返回 200；非当日返回 403（历史期无法回填）。

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = process.cwd();
const DRAFT_DIR = path.join(ROOT, 'content', 'drafts');
const DIVE_DIR = path.join(ROOT, 'content', 'dives');

const DAY_MS = 86400000;
// Dive #1 的日期（UTC）。
const DIVE_ONE = Date.UTC(2026, 6, 16); // 2026-07-16

// 今天的纽约日期（YYYY-MM-DD）。
function todayInNewYork() {
  const dtf = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = dtf.formatToParts(new Date());
  const get = t => parts.find(p => p.type === t).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

// 由日期推算期号。
function diveNumberFor(isoDate) {
  const t = new Date(`${isoDate}T00:00:00Z`).getTime();
  return Math.round((t - DIVE_ONE) / DAY_MS) + 1;
}

/**
 * 调用 Krillion 官方 reveal 接口抓取当天 7 道题目与全量答案。
 * 端点：https://krillion.io/api/reveal?date=YYYY-MM-DD（无需鉴权）。
 * 只在纽约当日开放，其他日期返回 403。
 * 落地 text + answers（answer/tier/score）；quip 是官方俏皮注释，刻意丢弃。
 */
async function fetchDivePrompts(isoDate) {
  const url = `https://krillion.io/api/reveal?date=${isoDate}`;
  const res = await fetch(url);
  if (res.status === 403) {
    throw new Error(`接口 403：${isoDate} 的答案尚未公开（仅纽约当日开放）`);
  }
  if (!res.ok) {
    throw new Error(`接口返回 ${res.status}：${isoDate}`);
  }
  const data = await res.json();
  if (!Array.isArray(data.prompts)) {
    throw new Error('接口响应缺少 prompts 数组');
  }
  return data.prompts.map(p => ({
    text: p.text,
    answers: Array.isArray(p.answers)
      ? p.answers.map(a => ({ answer: a.answer, tier: a.tier, score: a.score }))
      : [],
  }));
}

function buildDraft(number, isoDate, prompts) {
  return {
    dive: number,
    date: isoDate,
    prompts: prompts.map(p => ({ prompt: p.text, hint: '', answers: p.answers })),
    analysis: [],
  };
}

// 读取目录下的 JSON；gzipped=true 时按 gzip 存档解压（正式数据）。
function readJsonDir(dir, gzipped = false) {
  if (!fs.existsSync(dir)) return [];
  const ext = gzipped ? '.json.gz' : '.json';
  return fs.readdirSync(dir).filter(f => f.endsWith(ext)).map(f => {
    const file = path.join(dir, f);
    try {
      const raw = gzipped ? zlib.gunzipSync(fs.readFileSync(file)) : fs.readFileSync(file, 'utf8');
      return { file: f, data: JSON.parse(raw.toString('utf8')) };
    } catch (e) {
      return { file: f, error: e.message };
    }
  });
}

// 校验 content/ 下的正式数据与草稿，打印提示；正式数据不达标则退出码 1。
function verifyContent() {
  console.log('=== 内容校验 ===');
  const dives = readJsonDir(DIVE_DIR, true);
  const drafts = readJsonDir(DRAFT_DIR);

  let bad = 0;
  for (const item of dives) {
    if (item.error) {
      console.log(`[dives] ${item.file} JSON 无效: ${item.error}`);
      bad++;
      continue;
    }
    const d = item.data;
    const problems = [];
    if (!Array.isArray(d.prompts) || d.prompts.length !== 7) {
      problems.push('prompts 须 7 条');
    } else {
      d.prompts.forEach((p, i) => {
        if (!p.prompt || !p.hint) problems.push(`第 ${i + 1} 题缺 prompt 或 hint`);
      });
    }
    if (!Array.isArray(d.analysis) || d.analysis.length < 2) problems.push('analysis 须至少 2 段');
    if (problems.length) {
      console.log(`[dives] ${item.file} 未达标: ${problems.join('; ')}`);
      bad++;
    }
  }
  console.log(`正式数据: ${dives.length} 期，${bad} 期未达标`);

  console.log(`草稿待补全: ${drafts.length} 期`);
  for (const item of drafts) {
    if (item.error) {
      console.log(`[drafts] ${item.file} JSON 无效: ${item.error}`);
      continue;
    }
    const missingHint = (item.data.prompts || []).filter(p => !p.hint).length;
    const aLen = (item.data.analysis || []).length;
    console.log(`  - ${item.file}: 缺 hint ${missingHint} 条，analysis ${aLen}/2 段`);
  }

  if (bad) {
    console.log('⚠ 存在未达标的正式数据，build 会失败。');
    process.exitCode = 1;
  } else {
    console.log('✓ 正式数据全部达标。');
  }
}

// 把补全好的草稿打包为正式 gzip 存档（content/dives/dive-N.json.gz）。
// 打包前做基础质检，未达标直接失败，别把半成品推进构建。
function packDraft(draftPath) {
  if (!fs.existsSync(draftPath)) throw new Error(`草稿不存在：${draftPath}`);
  const d = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
  const problems = [];
  if (!Number.isInteger(d.dive)) problems.push(`期号不是整数: ${d.dive}`);
  if (!Array.isArray(d.prompts) || d.prompts.length !== 7) problems.push('prompts 须 7 条');
  else d.prompts.forEach((p, i) => { if (!p.prompt || !p.hint) problems.push(`第 ${i + 1} 题缺 prompt 或 hint`); });
  if (!Array.isArray(d.analysis) || d.analysis.length < 2) problems.push('analysis 须至少 2 段');
  if (problems.length) {
    console.error(`草稿未达标，未打包：${problems.join('; ')}`);
    process.exitCode = 1;
    return;
  }
  const dst = path.join(DIVE_DIR, `dive-${d.dive}.json.gz`);
  const raw = fs.readFileSync(draftPath);
  fs.mkdirSync(DIVE_DIR, { recursive: true });
  fs.writeFileSync(dst, zlib.gzipSync(raw, { level: 9 }));
  console.log(`已打包：${dst}（${raw.length} → ${fs.statSync(dst).size} 字节）`);
}

async function main() {
  const isoDate = todayInNewYork();
  const number = diveNumberFor(isoDate);
  const slug = `dive-${number}`;

  const existing = path.join(DIVE_DIR, `${slug}.json.gz`);
  if (fs.existsSync(existing)) {
    console.log(`已存在 ${slug}.json.gz，跳过抓取`);
    return;
  }

  const prompts = await fetchDivePrompts(isoDate);
  if (!Array.isArray(prompts) || prompts.length !== 7) {
    throw new Error(`抓取到 ${prompts?.length ?? 0} 条题目（应为 7 条），日期 ${isoDate}`);
  }

  fs.mkdirSync(DRAFT_DIR, { recursive: true });
  const out = path.join(DRAFT_DIR, `${slug}.json`);
  if (!fs.existsSync(out)) {
    fs.writeFileSync(out, JSON.stringify(buildDraft(number, isoDate, prompts), null, 2) + '\n');
    console.log(`草稿已生成：content/drafts/${slug}.json`);
  } else {
    console.log(`草稿已存在：content/drafts/${slug}.json，跳过`);
  }
  console.log('下一步：人工补全 hint / analysis 后，把文件移入 content/dives/。');
}

if (process.argv.includes('--verify')) {
  verifyContent();
} else if (process.argv.includes('--pack')) {
  const i = process.argv.indexOf('--pack');
  const draft = process.argv[i + 1];
  if (!draft) {
    console.error('用法：node fetch-dive.mjs --pack content/drafts/dive-N.json');
    process.exit(1);
  }
  packDraft(draft);
} else {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}