import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIVES, SITE, answersPublished, fmtDate, diveSlug, getDiveByNumber, type DiveAnswer } from '../../../lib/archive';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';

const BASE = SITE.baseUrl.replace(/\/+$/, '');

// 官方答案里 deepcut 档可能是物种级/公司级穷举（单题几千条），渲染时封顶避免页面过重。
// 其余档位（krillion / rare / schooler / plankton）始终全量展示。
const DEEPCUT_CAP = 150;

function layoutAnswers(answers: DiveAnswer[]): { shown: DiveAnswer[]; hidden: number } {
  const deepcut = answers.filter(a => a.tier === 'deepcut');
  const others = answers.filter(a => a.tier !== 'deepcut');
  const kept = deepcut.slice(0, DEEPCUT_CAP);
  return {
    shown: [...others, ...kept].sort((a, b) => b.score - a.score),
    hidden: deepcut.length - kept.length,
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
      ? `What were the answers in Krillion Dive #${dive.dive}? All seven prompts from ${displayDate} with hints and the full official answer list, published once the dive was no longer live.`
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
    robots: { index: true, follow: true },
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

  const faq = [...(dive.faq || []), ...SITE.defaultFaq];

  const canonical = `${BASE}/archive/${diveSlug(dive.dive)}/`;
  const showAnswers = answersPublished(dive);
  const title = dive.overrides?.title || (showAnswers
    ? `Krillion Dive #${dive.dive} Answers, Prompts & Hints (${displayDate})`
    : `Krillion Dive #${dive.dive} Prompts & Hints (${displayDate})`);
  const description = dive.overrides?.description
    || (showAnswers
      ? `What were the answers in Krillion Dive #${dive.dive}? All seven prompts from ${displayDate} with hints and the full official answer list, published once the dive was no longer live.`
      : `What were the prompts in Krillion Dive #${dive.dive}? Here are all seven prompts from ${displayDate}, with a hint for each — plus how to replay the dive.`);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: [`${BASE}/og.png`],
    datePublished: dive.date,
    dateModified: dive.date,
    mainEntityOfPage: canonical,
    author: { '@type': 'Organization', name: SITE.brand },
    publisher: { '@type': 'Organization', name: SITE.brand },
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

        <h1>Krillion Dive #{dive.dive} Prompts &amp; Hints</h1>
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
            <p>This dive is no longer live, so the full official answer list is published below — each answer with its rarity tier and score. The prompts and hints above stay spoiler-free for anyone still catching up.</p>
            {dive.prompts.map((p, i) => p.answers?.length ? (
              <details key={i}>
                <summary>{i + 1}. {p.prompt} ({p.answers.length} answers)</summary>
                {(() => { const { shown, hidden } = layoutAnswers(p.answers!); return <>
                  <div className="table-wrap"><table>
                    <thead><tr><th>Answer</th><th>Tier</th><th>Score</th></tr></thead>
                    <tbody>{shown.map(a => (
                      <tr key={a.answer}><td>{a.answer}</td><td>{a.tier}</td><td>{a.score}</td></tr>
                    ))}</tbody>
                  </table></div>
                  {hidden > 0 ? <p className="small-note">+ {hidden.toLocaleString('en-US')} more Deep Cut answers not shown. Every tier above Deep Cut is complete.</p> : null}
                </>; })()}
              </details>
            ) : null)}
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