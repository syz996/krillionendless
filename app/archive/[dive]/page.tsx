import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIVES, SITE, fmtDate, diveSlug, getDiveByNumber } from '../../../lib/archive';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';

const BASE = SITE.baseUrl.replace(/\/+$/, '');

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
  const title = dive.overrides?.title || `Krillion Dive #${dive.dive} Answers & Hints (${displayDate})`;
  const description = dive.overrides?.description
    || `What were the prompts in Krillion Dive #${dive.dive}? Here are all seven prompts from ${displayDate}, with a hint for each — plus how to replay the dive.`;
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { type: 'article', title, description, url: canonical },
  };
}

export default async function DivePage({ params }: { params: Promise<{ dive: string }> }) {
  const { dive: slug } = await params;
  const number = parseNumber(slug);
  const dive = number == null ? undefined : getDiveByNumber(number);
  if (!dive) notFound();

  const displayDate = fmtDate(dive.date);

  // 相关期：前后各 2 期（按距离排序取 5，首尾自动缩短）
  const related = DIVES
    .filter(x => x.dive !== dive.dive)
    .sort((a, b) => Math.abs(a.dive - dive.dive) - Math.abs(b.dive - dive.dive))
    .slice(0, 5);

  const idx = DIVES.findIndex(x => x.dive === dive.dive);
  const prev = idx > 0 ? DIVES[idx - 1] : undefined;
  const next = idx >= 0 && idx < DIVES.length - 1 ? DIVES[idx + 1] : undefined;

  const faq = [...(dive.faq || []), ...SITE.defaultFaq];

  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › <a href="/archive/">Archive</a> › Dive #{dive.dive}</nav>

        <h1>Krillion Dive #{dive.dive} Answers &amp; Hints</h1>
        <p className="meta">{displayDate} · {dive.prompts.length} prompts · 25 seconds each</p>

        <div className="ad-slot">Advertisement</div>

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

        <section>
          <h2>What made this dive hard</h2>
          {dive.analysis.map((para, i) => <p key={i}>{para}</p>)}
        </section>

        <div className="ad-slot">Advertisement</div>

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