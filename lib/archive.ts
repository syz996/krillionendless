import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { SITE } from './site';
export { SITE };

// ═══ 单期数据类型（与 content/dives/*.json 对齐）═══
export type DiveAnswer = { answer: string; tier: string; score: number };
export type DivePrompt = { prompt: string; hint: string; answers?: DiveAnswer[]; explanation?: string };
export type Dive = {
  dive: number;
  date: string;            // YYYY-MM-DD
  prompts: DivePrompt[];   // 必须 7 条
  analysis: string[];      // 特点分析，至少 2 段
  faq?: { q: string; a: string }[];
  overrides?: { title?: string; description?: string };
};

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'content');
const DIVE_DIR = path.join(CONTENT, 'dives');

// 正式期数据为 gzip 存档（content/dives/dive-N.json.gz），
// 由 node fetch-dive.mjs --pack <draft.json> 打包生成；草稿目录仍是明文 JSON。
const readDiveFile = (f: string): Dive =>
  JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(DIVE_DIR, f))).toString('utf8')) as Dive;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export const fmtDate = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

export const diveSlug = (n: number) => `dive-${n}`;

// 该期是否带官方答案数据（原始数据层面；是否「可展示」另见 answersPublished）。
export function hasAnswers(dive: Dive): boolean {
  return dive.prompts.some(p => (p.answers?.length ?? 0) > 0);
}

const wc = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3);

const jac = (a: string[], b: string[]) => {
  const A = new Set(a), B = new Set(b);
  const inter = [...A].filter(x => B.has(x)).length;
  return inter / new Set([...A, ...B]).size;
};

function loadDives(): Dive[] {
  if (!fs.existsSync(DIVE_DIR)) return [];
  const files = fs.readdirSync(DIVE_DIR).filter(f => f.endsWith('.json.gz'));
  const dives = files
    .map(readDiveFile)
    .sort((a, b) => a.dive - b.dive);

  // ── 闸门 1：字段 / 期号 / 日期 / 7 条 / 正文长度 ──
  const seen = new Set<number>();
  for (const d of dives) {
    if (!Number.isInteger(d.dive)) throw new Error(`期号不是整数: ${d.dive}`);
    if (seen.has(d.dive)) throw new Error(`期号重复: ${d.dive}`);
    seen.add(d.dive);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date || '')) throw new Error(`Dive #${d.dive} 日期格式错: ${d.date}`);
    if (!Array.isArray(d.prompts) || d.prompts.length !== 7) throw new Error(`Dive #${d.dive}: prompts 必须 7 条`);
    d.prompts.forEach((p, i) => {
      if (!p.prompt || !p.hint) throw new Error(`Dive #${d.dive} 第 ${i + 1} 条缺 prompt 或 hint`);
    });
    const body = [...d.prompts.map(p => p.prompt + ' ' + p.hint), ...(d.analysis || [])].join(' ');
    if (wc(body) < 500) throw new Error(`Dive #${d.dive}: 正文只有 ${wc(body)} 词（<500）`);
  }

  // ── 闸门 2：analysis ≥2 段 + 相似度 ≤70% ──
  const fp: [number, string[]][] = [];
  for (const d of dives) {
    if (!Array.isArray(d.analysis) || d.analysis.length < 2) throw new Error(`Dive #${d.dive}: analysis 至少 2 段`);
    const v = norm(d.analysis.join(' '));
    for (const [n, pv] of fp) {
      const s = jac(v, pv);
      if (s > 0.7) throw new Error(`Dive #${d.dive} 与 Dive #${n} 相似度 ${(s * 100).toFixed(0)}% > 70%`);
    }
    fp.push([d.dive, v]);
  }

  // ── 闸门 3：文件名 = 期号 + 日期连续 ──
  for (const f of files) {
    const d = readDiveFile(f);
    if (f !== `${diveSlug(d.dive)}.json.gz`) throw new Error(`文件名 ${f} 与期号 #${d.dive} 不一致`);
  }
  for (let i = 1; i < dives.length; i++) {
    const gap = (new Date(dives[i].date).getTime() - new Date(dives[i - 1].date).getTime()) / 86400000;
    if (gap !== 1) throw new Error(`Dive #${dives[i - 1].dive} 与 #${dives[i].dive} 日期差 ${gap} 天，应为 1 天`);
  }

  return dives;
}

export const DIVES: Dive[] = loadDives();

// 最新一期 = 仍处「当日进行中」的 live 期。官方答案在次日揭晓前不应公开：
// 当期页面不渲染答案、noindex、不进 sitemap；次日新一期入库后自动转为可展示。
export const LATEST_DIVE: Dive | undefined = DIVES.length ? DIVES[DIVES.length - 1] : undefined;

export function isCurrentDive(dive: Dive): boolean {
  return LATEST_DIVE !== undefined && dive.dive === LATEST_DIVE.dive;
}

// 该期答案是否「已公开」：有答案数据，且不是仍处当日进行的当前期。
export function answersPublished(dive: Dive): boolean {
  return hasAnswers(dive) && !isCurrentDive(dive);
}

export type ArchiveGroup = { key: string; label: string; dives: Dive[] };

// 按月份倒序分组，组内按期号倒序。
export function getArchiveGroups(): ArchiveGroup[] {
  const map = new Map<string, { key: string; label: string; dives: Dive[] }>();
  for (const dive of DIVES) {
    const [y, m] = dive.date.split('-');
    const key = `${y}-${m}`;
    if (!map.has(key)) {
      map.set(key, { key, label: `${MONTHS[Number(m) - 1]} ${y}`, dives: [] });
    }
    map.get(key)!.dives.push(dive);
  }
  return [...map.values()]
    .sort((a, b) => (a.key < b.key ? 1 : -1))
    .map(g => ({ key: g.key, label: g.label, dives: g.dives.sort((x, y) => y.dive - x.dive) }));
}

// 按期号倒序返回所有期。
export function getSortedDives(): Dive[] {
  return [...DIVES].sort((a, b) => b.dive - a.dive);
}

export function getDiveByNumber(n: number): Dive | undefined {
  return DIVES.find(d => d.dive === n);
}

// 该期内容的「最后修改日」：max(期数日, 补答案日)。
// 答案在下一期入库当日揭晓并回填（晚间 refetch 同步补全），故补答案日 = 下一期的日期；
// 末期（当期）答案尚未揭晓，取期数日本身。纯数据驱动，不依赖 git / 构建环境。
export function contentModifiedDate(dive: Dive): string {
  const idx = DIVES.findIndex(d => d.dive === dive.dive);
  const next = idx >= 0 ? DIVES[idx + 1] : undefined;
  return next && next.date > dive.date ? next.date : dive.date;
}