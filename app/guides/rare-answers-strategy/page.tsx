import type { Metadata } from 'next';
import { SITE } from '../../../lib/site';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';

const BASE = SITE.baseUrl.replace(/\/+$/, '');
const CANONICAL = `${BASE}/guides/rare-answers-strategy/`;
const TITLE = 'How to Move From Plankton Answers to Rare Ones';
const DESCRIPTION =
  'A repeatable way to reach the 60- and 85-point answers under a 25-second timer: climb one shelf inside a category instead of naming the first three things that come to mind.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: { type: 'article', title: TITLE, description: DESCRIPTION, url: CANONICAL },
};

export default function RareAnswersStrategyPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › <a href="/guides/">Guides</a> › Rare answers</nav>

        <h1>How to move from Plankton answers to rare ones</h1>
        <p className="meta">Same 25 seconds, same number of answers, a much deeper score</p>

        <p>
          Almost every player can name five fruits. Almost none of them name rambutan. The
          difference is not knowledge — most adults can recognise a rambutan if they see one — it is
          which direction the mind reaches first. This guide is about changing that direction on
          purpose, so the point jump described in{' '}
          <a href="/guides/how-scoring-works/">how Krillion scoring works</a> becomes something you
          can do rather than something that happens to you.
        </p>

        <h2>Start from the shelf, not the category</h2>
        <p>
          The Plankton answers come from the store&rsquo;s front row: apple, banana, orange. The Rare
          answers come from the same store, one aisle over: pomegranate, guava, lychee. So the move
          is not &ldquo;think harder about fruit&rdquo;, it is &ldquo;think about the produce aisle and walk one shelf
          past the display&rdquo;. Concretely:
        </p>

        <ul>
          <li><strong>Go regional.</strong> Commodity fruit you can buy anywhere is Plankton. Fruit that belongs to one region &mdash; tropical, south-asian, near-eastern &mdash; is usually Rare or above: lychee, mangosteen, durian, guava.</li>
          <li><strong>Go to the ugly ones.</strong> Answers with a memorable shape or skin read as rare because they are visually distinct: persimmon, dragon fruit, starfruit, rambutan.</li>
          <li><strong>Go to the sweet/savoury border.</strong> Answers that make a player hesitate for a second tend to sit high: fig, apricot, date.</li>
        </ul>

        <h2>Two cheap rules that add points without risk</h2>
        <p>
          <strong>Rule one: replace, do not add.</strong> You have seven prompts and 25 seconds each.
          Adding a fourth fruit to a category you have already entered buys you a lower tier than the
          first one did. Spending that second climbing one shelf instead of listing one more safe
          answer is free points.
        </p>
        <p>
          <strong>Rule two: spend the leftover seconds on one reach, not on spelling.</strong>
          Close matches count &mdash; a leading &ldquo;the&rdquo; or &ldquo;a&rdquo; will not sink an answer, and the
          scoring does not reward a clean capital letter. If there are five seconds left, type the
          risky name. If it is wrong you lose nothing you were going to get anyway.
        </p>

        <h2>Which categories pay for a reach</h2>
        <p>
          Some categories have a very fat middle, and some are thin all the way through. Fruit,
          vegetables, ice cream flavours and weather types all have a long tail of specific,
          regional or borrowed-from-another-language answers, which is where the 60s and 85s live.
          Broad prompts with only a few dozen possible answers total will top out lower &mdash; on those
          the correct play is to take the 60 and move on, not to hunt a 100 that does not exist.
        </p>
        <p>
          The answer tables on every prompt page are sorted rarest first, precisely so you can see the
          shape of a category before you play it: if the top of the list is four tropical fruits, you
          know the reach direction; if the top is a single answer, the category is thin.{' '}
          <a href="/prompts/">Browse the prompt list</a> and check the tail before a session.
        </p>

        <h2>Practise the reach, not the answer</h2>
        <p>
          Memorising fifty rare fruit names is less useful than training the reflex &ldquo;what is this
          category&rsquo;s back shelf?&rdquo;. Categories change every dive. The reflex transfers. That is
          why endless practice mode exists: the same prompts with the same timer and no daily limit,
          so you can run a category five times in a row and watch yourself stop reaching for apple.
          Try it on the <a href="/#game">unlimited practice game</a>, then compare your answers against
          the real archive in the <a href="/archive/">Krillion archive</a>.
        </p>

        <section>
          <h2>Next</h2>
          <ul className="archive">
            <li><a href="/guides/how-scoring-works/">How Krillion scoring works</a></li>
            <li><a href="/guides/daily-vs-unlimited/">Krillion daily vs endless practice</a></li>
            <li><a href="/krillion-unblocked/">Play Krillion unblocked</a></li>
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}