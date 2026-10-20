import type { Metadata } from 'next';
import { SITE } from '../../lib/site';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

export function generateMetadata(): Metadata {
  return {
    title: `About ${SITE.domain} — Independent Krillion Practice Site`,
    description: `What ${SITE.domain} is: an independent, fan-made site for practicing Krillion-style rare-answer prompts and browsing a daily dive archive.`,
    alternates: { canonical: `${SITE.baseUrl.replace(/\/+$/, '')}/about/` },
    robots: { index: true, follow: true },
  };
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › About</nav>
        <h1>About {SITE.domain}</h1>
        <p className="meta">Independent practice site · fan-made</p>

        <p>{SITE.domain} is an independent, fan-made website with two parts: an unlimited practice dive you can play as often as you like, and a daily archive that logs each official dive&rsquo;s seven prompts with a hint for every one of them.</p>
        <p>We built it because the official game runs once a day and, once you have played it, there is no easy way to review what came up or to keep practicing. The practice dive here fills that gap: same seven-prompt, 25-second format, playable back to back.</p>
        <p>A few things we deliberately do <strong>not</strong> do:</p>
        <ul>
          <li>We publish each dive&rsquo;s answer list only after that dive is no longer live, so nothing is spoiled while you can still play it.</li>
          <li>We do not run an account system — nothing you type here is sent to a server.</li>
          <li>We do not claim any affiliation with the official game.</li>
        </ul>
        <p>{SITE.domain} is not affiliated with, endorsed by, or connected to the official Krillion game at krillion.io. All trademarks belong to their respective owners.</p>
      </main>
      <SiteFooter />
    </>
  );
}