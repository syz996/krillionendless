import type { Metadata } from 'next';
import { DIVES, SITE, hasAnswers, fmtDate, diveSlug, getArchiveGroups } from '../../lib/archive';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const BASE = SITE.baseUrl.replace(/\/+$/, '');

// 从数据算「有多少期已带官方答案」，文案跟着数据走，避免手写承诺超前于实际。
const count = DIVES.length;
const withAnswers = DIVES.filter(hasAnswers).length;
const allHaveAnswers = withAnswers === count;
const firstWithAnswers = withAnswers > 0 ? DIVES.find(hasAnswers)!.dive : undefined;

const firstSentence = (s: string) => {
  const m = s?.match(/^.*?[.!?](?:\s|$)/);
  return m ? m[0].trim() : s;
};

export function generateMetadata(): Metadata {
  const title = count === 1
    ? (allHaveAnswers ? 'Krillion Dive Archive — Past Dive Prompts, Hints & Answers' : 'Krillion Dive Archive — Past Dive Prompts & Hints')
    : (allHaveAnswers ? `Krillion Dive Archive — All ${count} Past Dives, Prompts, Hints & Answers` : `Krillion Dive Archive — All ${count} Past Dives, Prompts & Hints`);
  const description = count === 1
    ? (allHaveAnswers ? 'The one Krillion dive so far, with its seven prompts, hints and the full official answer list.' : 'The one Krillion dive so far, with its seven prompts and hints.')
    : (allHaveAnswers
      ? `Every Krillion dive so far — all ${count} of them, each with its seven prompts, hints and the full official answer list.`
      : (firstWithAnswers
        ? `Every Krillion dive so far — all ${count} of them, each with its seven prompts and hints; dives from #${firstWithAnswers} on also include the full official answer list.`
        : `Every Krillion dive so far — all ${count} of them, each with its seven prompts, hints and notes.`));
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/archive/` },
    robots: { index: true, follow: true },
    openGraph: { type: 'website', title: 'Krillion Dive Archive', url: `${BASE}/archive/` },
  };
}

export default function ArchivePage() {
  const groups = getArchiveGroups();

  const description = count === 1
    ? (allHaveAnswers ? 'The one Krillion dive so far, with its seven prompts, hints and the full official answer list.' : 'The one Krillion dive so far, with its seven prompts and hints.')
    : (allHaveAnswers ? `Every Krillion dive so far — all ${count} of them, each with its seven prompts, hints and the full official answer list.` : `Every Krillion dive so far — all ${count} of them, each with its seven prompts, hints and notes.`);

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Krillion Dive Archive',
    description,
    url: `${BASE}/archive/`,
    isPartOf: { '@type': 'WebSite', name: SITE.brand, url: `${BASE}/` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [...DIVES].reverse().map((d, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Dive #${d.dive}`,
        url: `${BASE}/archive/${diveSlug(d.dive)}/`,
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Archive', item: `${BASE}/archive/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › Archive</nav>

        <h1>Krillion Dive Archive</h1>
        <p className="meta">{count === 1 ? 'One dive' : `All ${count} dives`} · newest first</p>

        <p>Every Krillion dive that has run so far, newest first. Pick any date to see that dive&rsquo;s seven prompts, a hint for each one, a note on what made it hard, and {allHaveAnswers ? <>the full official answer list for every dive</> : firstWithAnswers ? <>the full official answer list from Dive #{firstWithAnswers} onward</> : <>its prompts and hints</>}, collapsed prompt by prompt. Or open the <a href="/">unlimited version</a> and replay it with the same 25-second timer.</p>

        {count > 0 ? <p className="small-note">The newest dive publishes with its prompts and hints only — the official answer list is added the following day.</p> : null}

        <section className="groups">
          {count === 0 ? (
            <p className="small-note">Archive data is being prepared. Check back soon.</p>
          ) : groups.map(g => (
            <div className="month-group" key={g.key}>
              <h2>{g.label}</h2>
              <ul>
                {g.dives.map(d => (
                  <li key={d.dive}><a href={`/archive/${diveSlug(d.dive)}/`}>Dive #{d.dive} — {fmtDate(d.date)}</a>{d.analysis?.[0] ? <p className="dive-summary">{firstSentence(d.analysis[0])}</p> : null}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <details>
          <summary>How far back does this archive go?</summary>
          <p>
            {count === 0
              ? 'The archive is being prepared. Check back soon.'
              : DIVES[0] === DIVES[DIVES.length - 1]
                ? `This archive starts at Dive #${DIVES[0].dive} (${fmtDate(DIVES[0].date)}), and a new page is added every day.`
                : `This archive currently covers Dive #${DIVES[0].dive} (${fmtDate(DIVES[0].date)}) through Dive #${DIVES[DIVES.length - 1].dive} (${fmtDate(DIVES[DIVES.length - 1].date)}), and a new page is added every day.`}
          </p>
        </details>
        <details>
          <summary>Is this the official Krillion archive?</summary>
          <p>No. This is an independent, fan-made archive — not affiliated with the official game at krillion.io.</p>
        </details>
      </main>
      <SiteFooter />
    </>
  );
}