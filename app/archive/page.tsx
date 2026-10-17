import type { Metadata } from 'next';
import { DIVES, SITE, fmtDate, diveSlug, getArchiveGroups } from '../../lib/archive';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

// canonical / og 绝对地址来自 SITE.baseUrl
const BASE = SITE.baseUrl.replace(/\/+$/, '');

export function generateMetadata(): Metadata {
  const count = DIVES.length;
  return {
    title: `Krillion Dive Archive — All ${count} Past Dives & Answers`,
    description: `Every Krillion dive so far — all ${count} of them, each with its seven prompts, hints and notes. Pick any past dive and replay it in the unlimited version.`,
    alternates: { canonical: `${BASE}/archive/` },
    robots: { index: true, follow: true },
    openGraph: { type: 'website', title: 'Krillion Dive Archive', url: `${BASE}/archive/` },
  };
}

export default function ArchivePage() {
  const groups = getArchiveGroups();
  const count = DIVES.length;

  return (
    <>
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
          <p>Dive #1 was played on July 16, 2026. This archive covers all {count} dives since then, and a new one is added every day.</p>
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