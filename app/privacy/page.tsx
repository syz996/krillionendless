import type { Metadata } from 'next';
import { SITE } from '../../lib/site';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

export function generateMetadata(): Metadata {
  return {
    title: `Privacy Policy — ${SITE.domain}`,
    description: `What data ${SITE.domain} does and does not collect: no accounts, no server-side answer storage, and cookie-free Cloudflare analytics.`,
    alternates: { canonical: `${SITE.baseUrl.replace(/\/+$/, '')}/privacy/` },
    robots: { index: true, follow: true },
  };
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › Privacy Policy</nav>
        <h1>Privacy Policy</h1>
        <p className="meta">Last updated: October 2026</p>

        <h2>Short version</h2>
        <p>You can play everything on this site without an account. Your answers are checked in your browser and are never sent to our servers. We do not maintain user profiles.</p>

        <h2>What we collect</h2>
        <ul>
          <li><strong>Answers and scores:</strong> processed locally in your browser only. Nothing you type in the practice dive is transmitted anywhere.</li>
          <li><strong>Standard hosting logs:</strong> our hosting provider may keep short-lived request logs (IP address, URL, timestamp) for security and abuse prevention, as most websites do.</li>
          <li><strong>Aggregate analytics:</strong> we use Cloudflare Web Analytics, which counts page views and basic usage without setting cookies or building individual visitor profiles.</li>
        </ul>

        <h2>Advertising</h2>
        <p>This site does not currently display third-party advertising. If we introduce ads (for example Google AdSense) later, that provider may use cookies or similar technologies to serve and measure ads, and — subject to your choices — to personalize them. We will update this policy before any ads go live.</p>

        <h2>Children</h2>
        <p>This site is a general-audience trivia game and is not directed at children under 13. We do not knowingly collect personal information from children.</p>

        <h2>Changes</h2>
        <p>If this policy changes materially, we will update the date above. Continued use of the site after changes means you accept the updated policy.</p>

        <h2>Contact</h2>
        <p>Questions about privacy: <a href="mailto:hello@krillionendless.org">hello@krillionendless.org</a></p>
      </main>
      <SiteFooter />
    </>
  );
}