import type { Metadata } from 'next';
import { PROMPTS } from '../../lib/prompts';
import { SITE } from '../../lib/site';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const BASE = SITE.baseUrl.replace(/\/+$/, '');

export function generateMetadata(): Metadata {
  const count = PROMPTS.length;
  return {
    title: `Practice Prompt Library — ${count} Trivia Prompts with Answers`,
    description: `Browse all ${count} practice prompts in the ${SITE.brand} question bank — each with its full accepted-answer list, rarity tiers and points. Independent data, not official Krillion answers.`,
    alternates: { canonical: `${BASE}/prompts/` },
    robots: { index: true, follow: true },
    openGraph: { type: 'website', title: `Practice Prompt Library — ${count} Trivia Prompts`, url: `${BASE}/prompts/` },
  };
}

export default function PromptsIndexPage() {
  const count = PROMPTS.length;
  const totalAnswers = PROMPTS.reduce((sum, p) => sum + p.answers.length, 0);

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Practice Prompt Library',
    url: `${BASE}/prompts/`,
    isPartOf: { '@type': 'WebSite', name: SITE.brand, url: `${BASE}/` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › Prompts</nav>

        <h1>Practice prompt library</h1>
        <p className="meta">{count} prompts · {totalAnswers} accepted answers · independent question bank</p>

        <p>Every prompt in the {SITE.brand} practice bank, with its full accepted-answer list, rarity tier and points. These are our own editorial tiers for the unlimited practice game — they are not official Krillion answers or player statistics. Open any prompt to see all of its answers, or <a href="/#game">jump into a practice dive</a> and play seven of them at random.</p>

        <ul className="archive">
          {PROMPTS.map(p => (
            <li key={p.id}><a href={`/prompts/${p.id}/`}>{p.text}</a><p className="dive-summary">{p.answers.length} accepted answers · {p.hint}</p></li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
