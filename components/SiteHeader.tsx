import { SITE } from '../lib/site';

export default function SiteHeader() {
  return (
    <header className="site-header"><div className="wrap header-inner">
      <a className="brand" href="/" aria-label={`${SITE.brand} home`}>{SITE.brand}</a>
      <nav aria-label="Main navigation"><a href="/#game">Unlimited</a><a href="/prompts/">Prompts</a><a href="/archive/">Archive</a><a href="/#faq-section">FAQ</a></nav>
    </div></header>
  );
}