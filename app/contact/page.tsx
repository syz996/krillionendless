import type { Metadata } from 'next';
import { SITE } from '../../lib/site';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

export function generateMetadata(): Metadata {
  return {
    title: `Contact ${SITE.domain}`,
    description: 'How to get in touch with the team behind this independent Krillion practice and archive site.',
    alternates: { canonical: `${SITE.baseUrl.replace(/\/+$/, '')}/contact/` },
    robots: { index: true, follow: true },
  };
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › Contact</nav>
        <h1>Contact</h1>
        <p className="meta">Questions, corrections, feedback</p>

        <p>Found a mistake in an archive page, a broken link, or a prompt we logged incorrectly? We would rather hear about it than leave it up.</p>
        <p>The fastest way to reach us is email:</p>
        <p><a href="mailto:hello@krillionendless.org">hello@krillionendless.org</a></p>

        <h2>Who runs this site</h2>
        <p>
          {SITE.domain} is maintained by one person who plays the daily dive and keeps the archive
          up to date. It is a small independent project: the dive pages are generated from the
          prompts and answers published for each dive, and the tier labels and points that let the
          lists be sorted are written by us. There is no company behind it and no team of editors,
          which is also why a correction from a player is the fastest way for a mistake to get fixed.
        </p>

        <h2>How long a reply takes</h2>
        <p>
          We check the inbox every couple of days. Expect a reply within two working days, and
          sooner if you are reporting something clearly broken, such as a dive page that will not
          load or an answer listed under the wrong prompt. If a correction needs a rebuild of the
          site, the fix usually appears within a day of the reply.
        </p>

        <h2>What we are glad to hear about</h2>
        <ul>
          <li>An answer that is missing from a dive page, or listed under the wrong tier.</li>
          <li>A prompt recorded with a typo, or attributed to the wrong dive.</li>
          <li>A page that does not load, or a link that goes nowhere.</li>
          <li>A request from a rights holder to remove content.</li>
          <li>Anything about the guides on <a href="/guides/">the guides page</a> that reads as wrong or unclear.</li>
        </ul>

        <h2>What we cannot do</h2>
        <p>
          We cannot provide official answers or hints beyond what is already published on each dive
          page. We cannot            restore or replay official dives on your behalf, and we cannot
          promise a specific score or tell you today&rsquo;s answers before they are
          published — those pages fill in on their own once the answers are out.
        </p>

        <p className="small-note">
          For context on how this site relates to the official game, see{' '}
          <a href="/about/">About</a>. For what we collect and how cookies are used, see{' '}
          <a href="/privacy/">Privacy</a>.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}