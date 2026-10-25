#!/usr/bin/env node
// 用智谱 GLM（免费模型 glm-4-flash）为草稿自动补写 hint 与 analysis，并打包为正式数据。
// 由 GitHub Actions 在纽约 20:00–23:00（与 refetch 同窗口）调用，取代人工补全环节。
// 用法：
//   ZHIPU_API_KEY=xxx node complete-dive.mjs                # CI：遵守时间窗口，写库并打包
//   ZHIPU_API_KEY=xxx node complete-dive.mjs --force --dry-run  # 本地调试：无视窗口、只打印不落盘

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = process.cwd();
const DRAFT_DIR = path.join(ROOT, 'content', 'drafts');
const DIVE_DIR = path.join(ROOT, 'content', 'dives');

const API_KEY = process.env.ZHIPU_API_KEY || '';
const MODEL = process.env.ZHIPU_MODEL || 'glm-4-flash';
const ENDPOINT = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

const FORCE = process.argv.includes('--force');
const DRY_RUN = process.argv.includes('--dry-run');

// ── 纽约时区（与 fetch-dive.mjs 的 refetch 窗口守卫一致）──
function nyClock() {
  const dtf = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false });
  const parts = dtf.formatToParts(new Date());
  const get = t => parts.find(p => p.type === t).value;
  return { hour: Number(get('hour')), minute: Number(get('minute')) };
}

// ── 与 lib/archive.ts 一致的去重 / 词数计算 ──
const norm = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3);
const jac = (a, b) => {
  const A = new Set(a), B = new Set(b);
  const inter = [...A].filter(x => B.has(x)).length;
  return inter / new Set([...A, ...B]).size;
};
const wc = s => s.trim().split(/\s+/).filter(Boolean).length;

// 泄露检查：hint 不得出现 rare/krillion 的具体答案（逐题比对，避免误伤海量 deepcut）
function leakCheck(dive, hints) {
  for (let i = 0; i < hints.length; i++) {
    const hl = (hints[i] || '').toLowerCase();
    for (const a of (dive.prompts[i]?.answers || [])) {
      if (a.tier !== 'rare' && a.tier !== 'krillion') continue;
      const s = (a.answer || '').toLowerCase().trim();
      if (s.length >= 5 && hl.includes(s)) {
        return `第 ${i + 1} 条 hint 泄露了具体答案「${a.answer}」，请改为描述类别、不要点名。`;
      }
    }
  }
  return null;
}

// 读取已发布正式期（用于 analysis 相似度去重）
function loadPublished() {
  if (!fs.existsSync(DIVE_DIR)) return [];
  return fs.readdirSync(DIVE_DIR).filter(f => f.endsWith('.json.gz')).map(f => {
    try {
      const d = JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(DIVE_DIR, f))).toString('utf8'));
      return { dive: d.dive, analysis: (d.analysis || []).join(' ') };
    } catch {
      return { dive: -1, analysis: '' };
    }
  }).filter(x => x.analysis);
}

// 抽取每题紧凑上下文（不送海量答案池，只送分布 + 少量样例）
function summarizePrompt(p) {
  const tiers = {};
  (p.answers || []).forEach(a => { tiers[a.tier] = (tiers[a.tier] || 0) + 1; });
  const sample = tier => (p.answers || []).filter(a => a.tier === tier).slice(0, 3).map(a => a.answer);
  return {
    prompt: p.prompt,
    total: (p.answers || []).length,
    tiers,
    plankton: sample('plankton'),
    schooler: sample('schooler'),
  };
}

async function chat(messages) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({ model: MODEL, messages, temperature: 0.5 }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`LLM 请求失败 ${res.status}: ${t.slice(0, 500)}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('LLM 响应缺少 choices[0].message.content');
  return content;
}

function parseJson(text) {
  const s = text.indexOf('{');
  const e = text.lastIndexOf('}');
  if (s < 0 || e <= s) throw new Error('LLM 响应中找不到 JSON 对象');
  return JSON.parse(text.slice(s, e + 1));
}

const SYSTEM = `你是 Krillion 每日答题游戏的英文内容编辑。
Krillion 每天出 7 道题，玩家要在 25 秒内说出符合题干的答案；答案按稀有度分级：
- plankton (10分)：最常见、人人都能说出的答案（送分底）
- schooler (30分)：较常见的入门答案
- rare (60分)：比较少见
- deepcut (85分)：海量冷门长尾答案
- krillion (100分)：唯一最冷门、最高分的答案

你的任务：根据 7 道题及其答案分布，为这一期补写两部分，全部用英文。

【hints】每题一条方向性提示（30~45 词）。写法示例（只点名"最明显答案"，冷门方向只说类别、绝不点名）：
- 题目「Name something with a spinning blade」→ "Fans, blenders and helicopter rotors are the obvious starters. The scoring tail lives in power tools, saws, grinders and prop-driven machinery."
- 题目「Name a branded fast-food menu item」→ "The flagship burgers are what everyone blurts first. Regional specials, retired items and breakfast or dessert spinoffs are where the points hide."
规则：可以点名最常见的 plankton/schooler 答案；但 rare/deepcut/krillion 只能用"类别/领域"来描述（如"电动工具类""地区限定款""已停产"），绝不能写出它们的具体名字。

【analysis】4~5 段（每段 60~90 词）英文整期点评，谈这期 7 题的风格、难度、开放性（答案池大小悬殊）、哪些是送分、哪些靠广度/速度拉开差距、哪些带小众色彩。要贴合本期具体题目，避免空泛套话、避免与其它期雷同。

只返回一个 JSON 对象，不要任何额外文字、说明或 markdown 代码块，格式严格如下：
{"hints":["第1题hint","第2题hint","第3题hint","第4题hint","第5题hint","第6题hint","第7题hint"],"analysis":["段落1","段落2","段落3","段落4","段落5"]}

硬性约束：
- hints 必须是 7 条、analysis 必须在 4~5 段之间，不能少。
- 整期正文（7 个 prompt + 7 个 hint + 全部 analysis）的英文总词数必须 ≥ 500，宁可写长不要写短。
- 绝不泄露 rare/deepcut/krillion 的具体答案；hint 中一旦出现具体冷门答案即判失败。`;

function buildUser(dive) {
  const lines = [`Dive #${dive.dive} — ${dive.date}\n`];
  dive.prompts.forEach((p, i) => {
    const s = summarizePrompt(p);
    lines.push(`Prompt ${i + 1}: "${p.prompt}"`);
    lines.push(`  answers: ${s.total} (krillion ${s.tiers.krillion || 0} / deepcut ${s.tiers.deepcut || 0} / rare ${s.tiers.rare || 0} / schooler ${s.tiers.schooler || 0} / plankton ${s.tiers.plankton || 0})`);
    if (s.plankton.length) lines.push(`  常见答案例(plankton): ${s.plankton.join(' | ')}`);
    if (s.schooler.length) lines.push(`  入门答案例(schooler): ${s.schooler.join(' | ')}`);
    lines.push('');
  });
  return lines.join('\n');
}

async function generate(dive) {
  const published = loadPublished();
  let feedback = '';

  for (let attempt = 1; attempt <= 5; attempt++) {
    const extra = feedback ? `\n\n【上一轮未通过，请修正】${feedback}` : '';
    const raw = await chat([
      { role: 'system', content: SYSTEM },
      { role: 'user', content: buildUser(dive) + extra },
    ]);

    let out;
    try {
      out = parseJson(raw);
    } catch (e) {
      feedback = `你上次没有返回合法 JSON（${e.message}），请严格只输出一个 JSON 对象。`;
      continue;
    }

    if (!Array.isArray(out.hints) || out.hints.length !== 7) { feedback = 'hints 必须是恰好 7 条的数组。'; continue; }
    if (out.hints.some(h => typeof h !== 'string' || !h.trim())) { feedback = '每条 hint 必须是非空字符串。'; continue; }
    if (!Array.isArray(out.analysis) || out.analysis.length < 2) { feedback = 'analysis 至少 2 段。'; continue; }

    const leak = leakCheck(dive, out.hints);
    if (leak) { feedback = leak; continue; }

    const body = [...dive.prompts.map((p, i) => p.prompt + ' ' + out.hints[i]), ...out.analysis].join(' ');
    const words = wc(body);
    if (words < 500) {
      feedback = `整期正文仅 ${words} 词（需 ≥500），请把 hints 和 analysis 写得更充实，尤其 analysis 每段扩到 80~100 词。`;
      continue;
    }

    const v = norm(out.analysis.join(' '));
    let maxSim = 0;
    for (const x of published) {
      const s = jac(v, norm(x.analysis));
      if (s > maxSim) maxSim = s;
    }
    if (maxSim > 0.7) {
      feedback = `analysis 与已有某期相似度达 ${(maxSim * 100).toFixed(0)}%（需 ≤70%），请写得更贴合本期题目、减少套话。`;
      continue;
    }

    return { hints: out.hints.map(h => h.trim()), analysis: out.analysis.map(a => a.trim()) };
  }
  throw new Error(`Dive #${dive.dive} 经多次重试仍未通过质检（最后原因：${feedback || '未知'}）`);
}

function pack(dive) {
  const problems = [];
  if (!Number.isInteger(dive.dive)) problems.push('期号非整数');
  if (!Array.isArray(dive.prompts) || dive.prompts.length !== 7) problems.push('prompts 非 7 条');
  else dive.prompts.forEach((p, i) => { if (!p.prompt || !p.hint) problems.push(`第 ${i + 1} 题缺 prompt/hint`); });
  if (!Array.isArray(dive.analysis) || dive.analysis.length < 2) problems.push('analysis 少于 2 段');
  if (problems.length) throw new Error(`打包前质检未通过: ${problems.join('; ')}`);

  const dst = path.join(DIVE_DIR, `dive-${dive.dive}.json.gz`);
  fs.mkdirSync(DIVE_DIR, { recursive: true });
  const raw = JSON.stringify(dive);
  fs.writeFileSync(dst, zlib.gzipSync(raw, { level: 9 }));
  console.log(`已打包：${dst}（${raw.length} → ${fs.statSync(dst).size} 字节）`);
}

async function main() {
  if (!API_KEY) { console.log('未配置 ZHIPU_API_KEY，跳过补全。'); return; }

  const { hour, minute } = nyClock();
  if (!FORCE && (hour < 20 || hour >= 23)) {
    console.log(`当前纽约 ${hour}:${String(minute).padStart(2, '0')}，不在 20:00–23:00 窗口，跳过（--force 可强制）。`);
    return;
  }

  if (!fs.existsSync(DRAFT_DIR)) { console.log('无草稿目录，无需补全。'); return; }
  const pending = fs.readdirSync(DRAFT_DIR).filter(f => f.endsWith('.json')).sort()
    .map(f => ({ f, data: JSON.parse(fs.readFileSync(path.join(DRAFT_DIR, f), 'utf8')) }))
    .filter(x => Array.isArray(x.data.prompts) && (x.data.prompts.some(p => !p.hint) || !Array.isArray(x.data.analysis) || x.data.analysis.length < 2));

  if (!pending.length) { console.log('没有待补全的草稿。'); return; }

  for (const item of pending) {
    const dive = item.data;
    console.log(`补全 Dive #${dive.dive} ...`);
    const gen = await generate(dive);
    dive.prompts.forEach((p, i) => { p.hint = gen.hints[i]; });
    dive.analysis = gen.analysis;

    if (DRY_RUN) {
      console.log(`[dry-run] Dive #${dive.dive} 生成结果：`);
      dive.prompts.forEach((p, i) => console.log(`  H${i + 1}: ${p.hint}`));
      dive.analysis.forEach((a, i) => console.log(`  A${i + 1}: ${a}`));
      continue;
    }

    pack(dive);
    const draftPath = path.join(DRAFT_DIR, item.f);
    fs.unlinkSync(draftPath);
    console.log(`已删除草稿：${draftPath}`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });