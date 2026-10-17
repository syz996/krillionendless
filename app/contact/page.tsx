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
        <p className="small-note">Please note we cannot provide official answers or hints beyond what is published on each dive page, and we cannot restore or replay official dives on your behalf.</p>
      </main>
      <SiteFooter />
    </>
  );
}