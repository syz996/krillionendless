import type { Metadata } from 'next';
import { SITE } from '../../../lib/site';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';

const BASE = SITE.baseUrl.replace(/\/+$/, '');
const CANONICAL = `${BASE}/guides/how-scoring-works/`;
const TITLE = 'How Krillion Scoring Works: Plankton to One in a Krillion';
const DESCRIPTION =
  'What the six practice tiers mean — Plankton at 10 points up to One in a Krillion at 100 — with a worked example from the Name a fruit prompt and what the numbers do to a seven-prompt dive.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: { type: 'article', title: TITLE, description: DESCRIPTION, url: CANONICAL },
};

export default function HowScoringWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › <a href="/guides/">Guides</a> › Scoring</nav>

        <h1>How Krillion scoring works</h1>
        <p className="meta">Six tiers, 10 to 100 points, and what the numbers actually reward</p>

        <p>
          Krillion asks you to name something inside a category while a 25-second timer runs, and it
          scores how <em>hard</em> your answer was to come up with — not whether it was correct.
          &ldquo;Apple&rdquo; for <em>Name a fruit</em> is right, and it scores almost nothing. &ldquo;Rambutan&rdquo;
          is also right, and it scores everything. This page explains the six tiers we use on{' '}
          {SITE.domain}, what each point value means, and why the same answer can feel expensive on
          one prompt and cheap on another.
        </p>

        <h2>The six tiers, from most common to rarest</h2>
        <p>
          Every answer on this site carries a tier label and a point value. The labels describe how
          crowded the answer is inside its category: the crowded end is the first thing most players
          type, the rare end is the answer almost nobody reaches in 25 seconds.
        </p>

        <div className="table-wrap"><table>
          <thead><tr><th>Tier</th><th>Points</th><th>What it means</th></tr></thead>
          <tbody>
            <tr><td>Plankton</td><td>10</td><td>The first thing most players type — safe, but it barely scores.</td></tr>
            <tr><td>Too Clever</td><td>15</td><td>A cheeky borderline answer that edges just above the obvious.</td></tr>
            <tr><td>Schooler</td><td>30</td><td>Familiar to most players, though not the very first guess.</td></tr>
            <tr><td>Rare</td><td>60</td><td>Uncommon — most people won&rsquo;t pull it in the time limit.</td></tr>
            <tr><td>Deep Cut</td><td>85</td><td>A genuine deep-catalogue pull that few players get.</td></tr>
            <tr><td>One in a Krillion</td><td>100</td><td>Almost nobody names it — the deepest score on the board.</td></tr>
          </tbody>
        </table></div>

        <p>
          The gap between the bottom and the top is not linear in difficulty: Plankton to Schooler is
          three times the points, Schooler to One in a Krillion is a little over three times again.
          In practice the jump from 30 to 60 is where most players stall, because the answers above
          Schooler stop being things you can see in front of you and start being things you have to
          recall.
        </p>

        <h2>A worked example: Name a fruit</h2>
        <p>
          The <a href="/prompts/fruit/">Name a fruit</a> prompt is the clearest case because the
          category is familiar to everyone while the scoring spread is the full width of the table.
          All 30 accepted answers sit across four of the six tiers:
        </p>

        <ul>
          <li><strong>Plankton (10 pts):</strong> apple, banana, orange, grape, strawberry — the front row of any grocery store.</li>
          <li><strong>Schooler (30 pts):</strong> mango, pineapple, peach, pear, cherry, kiwi, blueberry, lemon, watermelon and the other berries.</li>
          <li><strong>Rare (60 pts):</strong> pomegranate, apricot, fig, passion fruit, guava, lychee, papaya.</li>
          <li><strong>Deep Cut (85 pts):</strong> dragon fruit, persimmon, mangosteen, durian.</li>
          <li><strong>One in a Krillion (100 pts):</strong> rambutan — the hairy tropical fruit almost nobody reaches for.</li>
        </ul>

        <p>
          Notice what the tiers are <em>not</em> measuring. Rambutan is not more of a fruit than an
          apple, and durian is not harder to spell than pomegranate. The tiers measure how quickly a
          player&rsquo;s mind travels from the category name to the answer. Apple is one step. Rambutan is
          a remember-it-exists step, and under a 25-second clock that is a different kind of task.
        </p>

        <h2>Why the same answer can score differently</h2>
        <p>
          An answer&rsquo;s tier is set by its place inside its own prompt, not by the answer itself.
          &ldquo;Mango&rdquo; is a Schooler at 30 points for <em>Name a fruit</em>, but if a prompt asked for
          tropical fruit specifically, mango would be the obvious first reach and could sit at the
          Plankton end instead. A prompt like <em>Name a vegetable</em> pulls a different crowd to the
          top than <em>Name an ice cream flavor</em> does, even at the same tier.
        </p>

        <p>
          This is also why a low score is not a mistake. Plankton is a legitimate answer: it is
          correct, it is safe, and on a bad prompt it may be the only thing you can produce in time.
          The scoring rewards the risk of reaching further, not the safety of being right.
        </p>

        <h2>What seven prompts do to a dive</h2>
        <p>
          A dive is seven prompts. If you answer every prompt with the first thing that comes to
          mind, you are playing a Plankton dive and the ceiling is about 70 points. Swapping two of
          those for a Rare answer moves you past 100 without a single extra correct answer — same
          number of right answers, different shelf. That is the whole game: the number of names you
          produce never changes, only how far down each category you reach.
        </p>

        <p className="small-note">
          The tiers and points on this site are our own editorial labels for practice, not official
          Krillion scoring or player statistics. They exist so you can compare two answers inside the
          same category. Close matches count: a leading &ldquo;the&rdquo; or &ldquo;a&rdquo; will not sink an
          answer, so do not waste the clock on articles or spelling clean-up.
        </p>

        <section>
          <h2>Next</h2>
          <ul className="archive">
            <li><a href="/guides/rare-answers-strategy/">How to move from Plankton answers to rare ones</a></li>
            <li><a href="/guides/daily-vs-unlimited/">Krillion daily vs endless practice</a></li>
            <li><a href="/prompts/">Browse every practice prompt</a></li>
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}