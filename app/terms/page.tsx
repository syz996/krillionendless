import type { Metadata } from 'next';
import { SITE } from '../../lib/site';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

export function generateMetadata(): Metadata {
  return {
    title: `Terms of Use — ${SITE.domain}`,
    description: `Terms for using ${SITE.domain}: an independent, fan-made Krillion practice and archive site. Not affiliated with the official game.`,
    alternates: { canonical: `${SITE.baseUrl.replace(/\/+$/, '')}/terms/` },
    robots: { index: true, follow: true },
  };
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › Terms of Use</nav>
        <h1>Terms of Use</h1>
        <p className="meta">Last updated: October 2026</p>

        <h2>What this site is</h2>
        <p>{SITE.domain} is an independent, fan-made practice and archive website. It is <strong>not</strong> affiliated with, endorsed by, or connected to the official Krillion game at krillion.io or its developer. All trademarks belong to their respective owners.</p>

        <h2>Using the site</h2>
        <p>The site is provided free of charge, as is, without warranties of any kind. You may use it for personal, non-commercial purposes. You may not scrape, bulk-download, or republish substantial parts of the archive content, and you may not present it as your own.</p>

        <h2>Content and accuracy</h2>
        <p>Archive pages list each dive&rsquo;s public prompts together with hints and commentary we write ourselves. Hints are opinionated guidance, not official answers, and they may be imperfect. If something looks wrong, <a href="/contact/">tell us</a> and we will fix it.</p>

        <h2>Availability</h2>
        <p>We aim to add an archive page every day, but we make no uptime or update guarantees. Features may change or be removed.</p>

        <h2>Liability</h2>
        <p>To the maximum extent permitted by law, the site&rsquo;s operators are not liable for any loss arising from your use of the site.</p>

        <h2>Contact</h2>
        <p>Questions about these terms: <a href="mailto:hello@krillionendless.org">hello@krillionendless.org</a></p>
      </main>
      <SiteFooter />
    </>
  );
}