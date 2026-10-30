import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIVES, SITE, answersPublished, contentModifiedDate, isCurrentDive, fmtDate, diveSlug, getDiveByNumber } from '../../../lib/archive';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import DeepcutReveal from '../../../components/DeepcutReveal';
import type { Dive } from '../../../lib/archive';

const BASE = SITE.baseUrl.replace(/\/+$/, '');
// 每期答案条数统计：构建时从最终答案池现算，不写进数据文件。
// 晚间 refetch 覆盖 answers 后，这里的数字会自动跟着变，不会过期。
type DiveStats = {
  total: number;
  avg: number;
  rows: { index: number; prompt: string; count: number }[];
  widest: { index: number; count: number };
  narrowest: { index: number; count: number };
  tiers: { tier: string; count: number }[];
  rarest: { answer: string; tier: string; score: number }[];
};

function diveStats(dive: Dive): DiveStats | null {
  const rows = dive.prompts
    .map((p, i) => ({ index: i + 1, prompt: p.prompt, answers: p.answers || [] }))
    .filter(r => r.answers.length > 0);
  if (!rows.length) return null;
  const total = rows.reduce((s, r) => s + r.answers.length, 0);
  const widest = rows.reduce((a, b) => (b.answers.length > a.answers.length ? b : a));
  const narrowest = rows.reduce((a, b) => (b.answers.length < a.answers.length ? b : a));
  const tiers = ['krillion', 'deepcut', 'rare', 'schooler', 'plankton']
    .map(tier => ({ tier, count: rows.reduce((s, r) => s + r.answers.filter(a => a.tier === tier).length, 0) }));
  const seen = new Set<string>();
  const rarest = rows
    .flatMap(r => r.answers.map(a => ({ answer: a.answer, tier: a.tier, score: a.score || 0 })))
    .sort((a, b) => b.score - a.score)
    .filter(a => {
      const k = a.answer.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, 5);
  return {
    total,
    avg: Math.round(total / rows.length),
    rows: rows.map(r => ({ index: r.index, prompt: r.prompt, count: r.answers.length })),
    widest: { index: widest.index, count: widest.answers.length },
    narrowest: { index: narrowest.index, count: narrowest.answers.length },
    tiers,
    rarest,
  };
}

export const dynamicParams = false;

function parseNumber(slug: string): number | null {
  const m = slug.match(/^dive-(\d+)$/);
  return m ? Number(m[1]) : null;
}

export function generateStaticParams() {
  return DIVES.map(d => ({ dive: diveSlug(d.dive) }));
}

export async function generateMetadata({ params }: { params: Promise<{ dive: string }> }): Promise<Metadata> {
  const { dive: slug } = await params;
  const number = parseNumber(slug);
  const dive = number == null ? undefined : getDiveByNumber(number);
  if (!dive) return {};

  const displayDate = fmtDate(dive.date);
  const canonical = `${BASE}/archive/${diveSlug(dive.dive)}/`;
  const showAnswers = answersPublished(dive);
  const title = dive.overrides?.title || (showAnswers
    ? `Krillion Dive #${dive.dive} Answers, Prompts & Hints (${displayDate})`
    : `Krillion Dive #${dive.dive} Prompts & Hints (${displayDate})`);
  const description = dive.overrides?.description
    || (showAnswers
      ? `What were the answers in Krillion Dive #${dive.dive}? All seven prompts from ${displayDate} with hints and the full official answer list, tier by tier.`
      : `What were the prompts in Krillion Dive #${dive.dive}? Here are all seven prompts from ${displayDate}, with a hint for each — plus how to replay the dive.`);

  const ogImage = {
    url: `${BASE}/og.png`,
    width: 1200,
    height: 630,
    alt: `${SITE.brand} — independent Krillion practice and daily dive archive`,
  };

  return {
    title,
    description,
    alternates: { canonical },
    robots: isCurrentDive(dive) ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { type: 'article', title, description, url: canonical, images: [ogImage] },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}

export default async function DivePage({ params }: { params: Promise<{ dive: string }> }) {
  const { dive: slug } = await params;
  const number = parseNumber(slug);
  const dive = number == null ? undefined : getDiveByNumber(number);
  if (!dive) notFound();

  const displayDate = fmtDate(dive.date);

  // 相关期：按与当前期的距离排序，取前 5（首尾自动缩短）
  const related = DIVES
    .filter(x => x.dive !== dive.dive)
    .sort((a, b) => Math.abs(a.dive - dive.dive) - Math.abs(b.dive - dive.dive))
    .slice(0, 5);

  const idx = DIVES.findIndex(x => x.dive === dive.dive);
  const prev = idx > 0 ? DIVES[idx - 1] : undefined;
  const next = idx >= 0 && idx < DIVES.length - 1 ? DIVES[idx + 1] : undefined;
  const showAnswers = answersPublished(dive);
  const stats = showAnswers ? diveStats(dive) : null;

  // 当期未揭晓答案时，把「答案」FAQ 换成次日揭晓的说法，避免同页与 H1 自相矛盾。
  const answersFaq = showAnswers
    ? {
        q: 'Do these pages include the official answers?',
        a: 'Yes — this dive carries the full official answer list with rarity tiers and scores, collapsed prompt by prompt so nothing is spoiled until you open it.',
      }
    : {
        q: 'When do the official answers appear?',
        a: 'This is the newest dive, so only its prompts and hints are shown. The full official answer list publishes the following day — previous dives already include theirs.',
      };
  const faq = [...(dive.faq || []), SITE.defaultFaq[0], answersFaq, ...SITE.defaultFaq.slice(1)];

  const canonical = `${BASE}/archive/${diveSlug(dive.dive)}/`;
  const title = dive.overrides?.title || (showAnswers
    ? `Krillion Dive #${dive.dive} Answers, Prompts & Hints (${displayDate})`
    : `Krillion Dive #${dive.dive} Prompts & Hints (${displayDate})`);
  const description = dive.overrides?.description
    || (showAnswers
      ? `What were the answers in Krillion Dive #${dive.dive}? All seven prompts from ${displayDate} with hints and the full official answer list, tier by tier.`
      : `What were the prompts in Krillion Dive #${dive.dive}? Here are all seven prompts from ${displayDate}, with a hint for each — plus how to replay the dive.`);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: [`${BASE}/og.png`],
    datePublished: dive.date,
    // 与 sitemap lastmod 同源：答案在下一期入库日揭晓回填，dateModified 取该日。
    dateModified: contentModifiedDate(dive),
    mainEntityOfPage: canonical,
    author: { '@type': 'Organization', name: SITE.brand },
    publisher: { '@type': 'Organization', name: SITE.brand },
    hasPart: dive.prompts
      .filter(p => p.explanation)
      .map(p => ({ '@type': 'Article', headline: p.prompt, description: p.explanation })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Archive', item: `${BASE}/archive/` },
      { '@type': 'ListItem', position: 3, name: `Dive #${dive.dive}`, item: canonical },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › <a href="/archive/">Archive</a> › Dive #{dive.dive}</nav>

        <h1>{`Krillion Dive #${dive.dive} ${showAnswers ? 'Answers, Prompts & Hints' : 'Prompts & Hints'}`}</h1>
        <p className="meta">{displayDate} · {dive.prompts.length} prompts · 25 seconds each</p>

        <section>
          <h2>Dive #{dive.dive} prompts</h2>
          <p>These are the seven prompts that came up in Dive #{dive.dive}. If you&rsquo;re replaying it, give each one a try before you read the hint underneath.</p>
          <ol className="prompts">
            {dive.prompts.map((p, i) => (
              <li key={i}>
                <strong>{p.prompt}</strong>
                <p className="prompt-hint"><strong>Hint:</strong> {p.hint}</p>
              </li>
            ))}
          </ol>
        </section>

        {showAnswers ? (
          <section>
            <h2>Dive #{dive.dive} answers</h2>
            <p>The full official answer list for this dive, with every answer&rsquo;s rarity tier and score. Each prompt is collapsed — open one only when you are ready to see its answers. The prompts and hints above stay spoiler-free.</p>
            {dive.prompts.map((p, i) => {
              const nonDeepcut = (p.answers || []).filter(a => a.tier !== 'deepcut');
              const deepcutCount = (p.answers?.length || 0) - nonDeepcut.length;
              if (!p.answers?.length) return null;
              return (
                <details key={i}>
                  <summary>{i + 1}. {p.prompt} ({p.answers.length} answers)</summary>
                  {p.explanation ? <p className="answer-note"><strong>Why this one is tricky:</strong> {p.explanation}</p> : null}
                  <div className="table-wrap"><table>
                    <thead><tr><th>Answer</th><th>Tier</th><th>Score</th></tr></thead>
                    <tbody>{nonDeepcut.sort((a, b) => b.score - a.score).map(a => (
                      <tr key={a.answer}><td>{a.answer}</td><td>{a.tier}</td><td>{a.score}</td></tr>
                    ))}</tbody>
                  </table></div>
                  <DeepcutReveal dive={dive.dive} promptIndex={i} count={deepcutCount} />
                </details>
              );
            })}
          </section>
        ) : null}

        {stats ? (
          <section>
            <h2>Dive #{dive.dive} answer pool by the numbers</h2>
            <p>Every count below is taken straight from the official answer pool for Dive #{dive.dive} &mdash; nothing here is estimated or rounded. The seven prompts accepted <strong>{stats.total.toLocaleString('en-US')}</strong> distinct answers in total, an average of {stats.avg.toLocaleString('en-US')} per prompt.</p>
            <div className="table-wrap"><table>
              <thead><tr><th>#</th><th>Prompt</th><th>Answers</th></tr></thead>
              <tbody>{stats.rows.map(r => (
                <tr key={r.index}><td>{r.index}</td><td>{r.prompt}</td><td>{r.count.toLocaleString('en-US')}</td></tr>
              ))}</tbody>
            </table></div>
            <p>Widest pool: prompt {stats.widest.index}, with {stats.widest.count.toLocaleString('en-US')} answers. Narrowest: prompt {stats.narrowest.index}, with {stats.narrowest.count.toLocaleString('en-US')}. Rarity split: {stats.tiers.filter(t => t.count > 0).map(t => `${t.count.toLocaleString('en-US')} ${t.tier}`).join(', ')}.</p>
            <p>The five highest-scoring answers of the whole dive were {stats.rarest.map((a, i) => (<span key={a.answer}>{i > 0 ? (i === stats.rarest.length - 1 ? ' and ' : ', ') : ''}<strong>{a.answer}</strong></span>))} &mdash; the ones almost nobody manages to name in 25 seconds.</p>
          </section>
        ) : null}

        <section>
          <h2>What made this dive hard</h2>
          {dive.analysis.map((para, i) => <p key={i}>{para}</p>)}
        </section>

        <section>
          <h2>Other dives</h2>
          <nav className="pager">
            {prev ? <a href={`/archive/${diveSlug(prev.dive)}/`}>← Dive #{prev.dive}</a> : <span />}
            {next ? <a href={`/archive/${diveSlug(next.dive)}/`}>Dive #{next.dive} →</a> : <span />}
          </nav>
          <ul className="archive">
            {related.map(r => <li key={r.dive}><a href={`/archive/${diveSlug(r.dive)}/`}>Dive #{r.dive} — {fmtDate(r.date)}</a></li>)}
          </ul>
        </section>

        <section>
          <h2>FAQ</h2>
          {faq.map((f, n) => (
            <details key={n} open={n === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
