import type { Metadata } from 'next';
import { SITE } from '../../lib/site';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const BASE = SITE.baseUrl.replace(/\/+$/, '');
const CANONICAL = `${BASE}/guides/`;

const GUIDES = [
  {
    slug: 'how-scoring-works',
    title: 'How Krillion scoring works, from Plankton to One in a Krillion',
    blurb:
      'The six practice tiers, what each point value means, and a worked example from the Name a fruit prompt.',
  },
  {
    slug: 'rare-answers-strategy',
    title: 'How to move from Plankton answers to rare ones',
    blurb:
      'A repeatable way to climb one shelf inside a category instead of naming the first three things that come to mind.',
  },
  {
    slug: 'daily-vs-unlimited',
    title: 'Krillion daily vs endless practice: what is the difference',
    blurb:
      'How the official daily dive, our unlimited practice mode and the answer archive fit together.',
  },
];

export const metadata: Metadata = {
  title: 'Krillion Guides: Scoring, Rare Answers and Daily Play',
  description:
    'Short guides to the Krillion practice game — how the six rarity tiers score, how to reach rare answers inside the time limit, and how the daily dive differs from endless practice.',
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Krillion Guides: Scoring, Rare Answers and Daily Play',
    description:
      'How Krillion practice scoring works, how to reach rare answers, and how the daily dive differs from endless practice.',
    url: CANONICAL,
  },
};

export default function GuidesPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › Guides</nav>

        <h1>Krillion guides</h1>
        <p className="meta">Scoring, rare answers and how the daily dive differs from practice</p>

        <p>
          Three short guides that explain how this site scores answers, how to push a name from the
          obvious end of a category to the rare end, and how the official daily dive relates to the
          unlimited practice game and the archive.
        </p>

        <ul className="archive">
          {GUIDES.map(g => (
            <li key={g.slug}>
              <a href={`/guides/${g.slug}/`}>{g.title}</a>
              <p className="small-note">{g.blurb}</p>
            </li>
          ))}
        </ul>

        <section>
          <h2>Go straight to the data</h2>
          <p>
            Every archived dive lists its prompts, the hints and the full accepted-answer list with
            tiers and points: start at the <a href="/archive/">Krillion archive</a>. If you would
            rather practise than read, the <a href="/#game">unlimited practice game</a> replays the
            same prompts with the same 25-second timer and no daily limit.
          </p>
        </section>

        <p className="small-note">
          {SITE.domain} is an independent, fan-made project. It is not affiliated with the official
          game at krillion.io, and the tiers and points on this site are our own editorial labels for
          practice — not official Krillion scoring.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}