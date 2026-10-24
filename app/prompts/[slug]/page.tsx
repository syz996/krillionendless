import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROMPTS, TIERS } from '../../../lib/prompts';
import { PROMPT_GUIDES } from '../../../lib/prompt-guides';
import { SITE } from '../../../lib/site';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';

const BASE = SITE.baseUrl.replace(/\/+$/, '');

export const dynamicParams = false;

export function generateStaticParams() {
  return PROMPTS.map(p => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const prompt = PROMPTS.find(p => p.id === slug);
  if (!prompt) return {};

  const canonical = `${BASE}/prompts/${prompt.id}/`;
  const title = `${prompt.text} — Practice Answers`;
  const description = `All ${prompt.answers.length} accepted answers for the practice prompt “${prompt.text}”, with rarity tiers and points. Independent ${SITE.brand} question bank — not official Krillion data.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { type: 'article', title, description, url: canonical },
  };
}

export default async function PromptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = PROMPTS.find(p => p.id === slug);
  if (!prompt) notFound();

  const idx = PROMPTS.findIndex(p => p.id === prompt.id);
  const related = Array.from({ length: 6 }, (_, k) => PROMPTS[(idx + 1 + k) % PROMPTS.length]);
  const sorted = [...prompt.answers].sort((a, b) => b.points - a.points);
  const canonical = `${BASE}/prompts/${prompt.id}/`;
  const guide = PROMPT_GUIDES[prompt.id];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Prompts', item: `${BASE}/prompts/` },
      { '@type': 'ListItem', position: 3, name: prompt.text, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › <a href="/prompts/">Prompts</a> › Practice prompt</nav>

        <h1>{prompt.text}</h1>
        <p className="meta">{prompt.answers.length} accepted answers · practice rarity tiers · independent question bank</p>

        {guide ? <section className="prompt-guide"><h2>How this prompt works</h2><p>{guide}</p></section> : null}

        <p>Below is the full accepted-answer list for this prompt from the {SITE.brand} practice bank, sorted from rarest to most common. The tiers and points are our own editorial labels for the <a href="/#game">unlimited practice game</a> — they are not official Krillion answers, rarity data or player statistics. The hint for this prompt: {prompt.hint}</p>

        <div className="table-wrap"><table>
          <thead><tr><th>Answer</th><th>Tier</th><th>Points</th></tr></thead>
          <tbody>
            {sorted.map(entry => (
              <tr key={entry.aliases[0]}>
                <td>{entry.aliases[0]}{entry.note ? <span className="small-note"> — {entry.note}</span> : null}</td>
                <td>{entry.tier}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table></div>

        <div className="tier-legend">
          {TIERS.map(t => <p key={t.name}><strong>{t.name}</strong> · {t.points} pts ({t.label.toLowerCase()}) — {t.blurb}</p>)}
        </div>

        <p className="small-note">Practice tiers run from Plankton ({TIERS[0].points} pts, most common) to One in a Krillion ({TIERS[TIERS.length - 1].points} pts, rarest). Exact and close matches are accepted — a leading “the” or “a” will not sink an answer.</p>

        <section>
          <h2>More practice prompts</h2>
          <ul className="archive">
            {related.map(p => (
              <li key={p.id}><a href={`/prompts/${p.id}/`}>{p.text}</a></li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
