import { SITE } from '../lib/site';

export default function SiteFooter() {
  return (
    <footer className="foot"><div className="wrap"><nav><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav><p><strong>{SITE.domain}</strong> is an independent, fan-made project. It is not affiliated with, endorsed by, or connected to the official Krillion game at krillion.io. Game mechanics are described here for informational purposes only.</p><p>© 2026 {SITE.domain}</p></div></footer>
  );
}