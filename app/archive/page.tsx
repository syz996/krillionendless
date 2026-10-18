import type { Metadata } from 'next';
import { DIVES, SITE, fmtDate, diveSlug, getArchiveGroups } from '../../lib/archive';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const BASE = SITE.baseUrl.replace(/\/+$/, '');

export function generateMetadata(): Metadata {
  const count = DIVES.length;
  const title = count === 1
    ? 'Krillion Dive Archive — Past Dive Answers'
    : `Krillion Dive Archive — All ${count} Past Dives & Answers`;
  return {
    title,
    description: `Every Krillion dive so far — all ${count} of them, each with its seven prompts, hints and notes. Pick any past dive and replay it in the unlimited version.`,
    alternates: { canonical: `${BASE}/archive/` },
    robots: { index: true, follow: true },
    openGraph: { type: 'website', title: 'Krillion Dive Archive', url: `${BASE}/archive/` },
  };
}

export default function ArchivePage() {
  const groups = getArchiveGroups();
  const count = DIVES.length;

  const description = `Every Krillion dive so far — all ${count} of them, each with its seven prompts, hints and notes.`;

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
        <p className="meta">All {count} dives · newest first</p>

        <div className="ad-slot">Advertisement</div>

        <p>Every Krillion dive that has run so far, newest first. Pick any date to see that dive&rsquo;s seven prompts, a hint for each one, and a note on what made it hard — or open the <a href="/">unlimited version</a> and replay it with the same 25-second timer.</p>

        <section className="groups">
          {count === 0 ? (
            <p className="small-note">Archive data is being prepared. Check back soon.</p>
          ) : groups.map(g => (
            <div className="month-group" key={g.key}>
              <h2>{g.label}</h2>
              <ul>
                {g.dives.map(d => (
                  <li key={d.dive}><a href={`/archive/${diveSlug(d.dive)}/`}>Dive #{d.dive} — {fmtDate(d.date)}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <div className="ad-slot">Advertisement</div>

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