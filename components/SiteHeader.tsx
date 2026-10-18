import { SITE } from '../lib/site';

export default function SiteHeader() {
  return (
    <header className="site-header"><div className="wrap header-inner">
      <a className="brand" href="/" aria-label={`${SITE.brand} home`}>{SITE.brand}</a>
      <nav aria-label="Main navigation"><a href="/#game">Unlimited</a><a href="/archive/">Archive</a><a href="/#faq-section">Answers</a></nav>
    </div></header>
  );
}