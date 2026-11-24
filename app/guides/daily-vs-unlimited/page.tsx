import type { Metadata } from 'next';
import { SITE } from '../../../lib/site';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';

const BASE = SITE.baseUrl.replace(/\/+$/, '');
const CANONICAL = `${BASE}/guides/daily-vs-unlimited/`;
const TITLE = "Krillion Daily vs Endless Practice: What's the Difference";
const DESCRIPTION =
  'The official daily dive, our unlimited practice mode and the answer archive explained — same seven prompts, different purpose, and why practice mode has no daily limit.';

export const metadata: Metadata = {
  title: 'Krillion Daily vs Endless Practice: What&rsquo;s the Difference',
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    title: 'Krillion Daily vs Endless Practice: What&rsquo;s the Difference',
    description: DESCRIPTION,
    url: CANONICAL,
  },
};

export default function DailyVsUnlimitedPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › <a href="/guides/">Guides</a> › Daily vs endless</nav>

        <h1>Krillion daily vs endless practice</h1>
        <p className="meta">Same seven prompts and the same timer, three different reasons to play</p>

        <p>
          The daily dive and the practice mode on this site look almost identical: seven prompts,
          categories you can answer from memory, a 25-second timer. The difference is what each one
          is for. One is a dated event you cannot repeat; the other is a drill you can run as many
          times as you like.
        </p>

        <h2>The three things on this site</h2>
        <div className="table-wrap"><table>
          <thead><tr><th>Where</th><th>What it is</th><th>When you use it</th></tr></thead>
          <tbody>
            <tr>
              <td><a href="/archive/">Krillion archive</a></td>
              <td>Every past dive with its prompts, hints and full accepted-answer list, rarest first.</td>
              <td>After the fact: check an answer, review a dive, look up a category&rsquo;s tail.</td>
            </tr>
            <tr>
              <td><a href="/#game">Unlimited practice</a></td>
              <td>Our own practice game built from the prompt bank, same timer, no daily limit.</td>
              <td>Before or instead of a daily dive: drill a category until the rare answers come first.</td>
            </tr>
            <tr>
              <td><a href="/prompts/">Prompt library</a></td>
              <td>One page per prompt with the full answer list, tiers and points.</td>
              <td>Studying: see how wide a category is before you play it.</td>
            </tr>
          </tbody>
        </table></div>

        <h2>Why the daily dive cannot be replayed</h2>
        <p>
          The official daily dive is a dated event. Once its day passes, the prompts are fixed and
          the result is fixed &mdash; there is nothing to replay. That is fine for a puzzle, and awkward
          for practice: you cannot get better at reaching a rare answer if you only get seven
          attempts a day. Endless practice mode exists to remove exactly that constraint. It is the
          same shape of task with the limit taken off, so the drill and the event do not compete.
        </p>

        <h2>Where the answers on this site come from</h2>
        <p>
          Dive pages list the prompts and the accepted answers published for that dive, with the
          tier and point labels added by this site so the lists can be sorted and compared. The
          tiers, points and rarity language are our own editorial labels for practice &mdash; they are
          not official Krillion scoring, official rarity data or player statistics. The daily dive
          itself lives at krillion.io; this site is an independent, fan-made companion.
        </p>
        <p>
          We do not publish the answers for a dive before they are out. On the day a dive runs, its
          page shows the prompts and hints only; the accepted-answer list is added once it has been
          published. That is deliberate &mdash; a page full of spoilers on the day of the dive is not
          useful to anyone who is still playing it.
        </p>

        <h2>Which one to open first</h2>
        <p>
          If you want to play today&rsquo;s dive, play it at krillion.io first, then come back to the
          archive to check what you missed. If you want to score better tomorrow, open the{' '}
          <a href="/#game">unlimited practice game</a>, pick the categories you are weakest at, and
          run them until the obvious answer stops being the first one you reach. If you are stuck
          behind a school or work network, <a href="/krillion-unblocked/">the unblocked page</a> covers
          that case.
        </p>

        <p className="small-note">
          {SITE.domain} is an independent, fan-made project and is not affiliated with, endorsed by,
          or connected to the official Krillion game at krillion.io.
        </p>

        <section>
          <h2>Next</h2>
          <ul className="archive">
            <li><a href="/guides/how-scoring-works/">How Krillion scoring works</a></li>
            <li><a href="/guides/rare-answers-strategy/">How to move from Plankton answers to rare ones</a></li>
            <li><a href="/archive/">Browse the Krillion archive</a></li>
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
