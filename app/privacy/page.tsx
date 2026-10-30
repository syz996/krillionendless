import type { Metadata } from 'next';
import { SITE } from '../../lib/site';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

export function generateMetadata(): Metadata {
  return {
    title: `Privacy Policy — ${SITE.domain}`,
    description: `What data ${SITE.domain} does and does not collect, how cookie-free analytics works, and how Google AdSense and its partners use cookies for advertising.`,
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
        <p className="meta">Last updated: October 30, 2026</p>

        <h2>Short version</h2>
        <p>You can play everything on this site without an account. Your answers are checked in your browser and are never sent to our servers. We do not maintain user profiles, and we do not sell personal information.</p>

        <h2>What we collect</h2>
        <ul>
          <li><strong>Answers and scores:</strong> processed locally in your browser only. Nothing you type in the practice dive is transmitted to us or stored on a server.</li>
          <li><strong>Standard hosting logs:</strong> our hosting provider may keep short-lived request logs (IP address, URL, timestamp) for security and abuse prevention, as most websites do.</li>
          <li><strong>Aggregate analytics:</strong> we use Cloudflare Web Analytics, which counts page views and basic usage without setting cookies or building individual visitor profiles.</li>
        </ul>

        <h2>Cookies</h2>
        <p>We do not set cookies in order to run the game. Third-party advertising partners may set cookies on this site as described in the next section. You can block or delete cookies in your browser settings at any time; the game itself will keep working.</p>

        <h2>Advertising and third-party cookies</h2>
        <p>This site may display advertising served by Google AdSense and its partners. When ads are shown:</p>
        <ul>
          <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.</li>
          <li>Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the internet.</li>
          <li>You may opt out of personalised advertising at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
          <li>You can also opt out of some third-party vendors&rsquo; use of cookies for personalised advertising at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info/choices</a>.</li>
          <li>For more on how Google uses information from sites that use its services, see <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google&rsquo;s partner sites page</a>.</li>
        </ul>
        <p>If you are in a region that requires it (for example the EEA, the UK or Switzerland), a consent message may be shown before personalised ads are served, and you can change your choices at any time.</p>

        <h2>Your choices</h2>
        <ul>
          <li>Use your browser settings to block or delete cookies.</li>
          <li>Use Google Ads Settings to turn off personalised advertising from Google.</li>
          <li>There is no account to delete, because we never create one.</li>
        </ul>

        <h2>Children</h2>
        <p>This site is a general-audience trivia game and is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has provided personal information to us, contact us and we will delete it.</p>

        <h2>Changes</h2>
        <p>If this policy changes materially, we will update the date above. Continued use of the site after changes means you accept the updated policy.</p>

        <h2>Contact</h2>
        <p>Questions about privacy: <a href="mailto:hello@krillionendless.org">hello@krillionendless.org</a></p>
      </main>
      <SiteFooter />
    </>
  );
}
