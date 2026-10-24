
import { SITE } from '../lib/site';

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <nav>
          <a href="/prompts/">Prompts</a>
          <a href="/archive/">Archive</a>
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
        </nav>

        <p>
          <strong>{SITE.domain}</strong> is an independent, fan-made project.
          It is not affiliated with, endorsed by, or connected to the official
          Krillion game at krillion.io. Game mechanics are described here for
          informational purposes only.
        </p>

        <p>© 2026 {SITE.domain}</p>

        {/* Smol Launch verification badge */}
        <div className="mt-4 flex justify-center">
          <a
            href="https://smollaunch.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Featured on Smol Launch"
          >
            <img
              src="https://smollaunch.com/badges/featured.svg"
              alt="Krillion Endless — Featured on Smol Launch"
              loading="lazy"
              width="250"
              height="60"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
