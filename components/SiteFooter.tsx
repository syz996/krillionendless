
import { SITE } from '../lib/site';

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <nav>
          <a href="/">Krillion Unlimited</a>
          <a href="/archive/">Krillion archive</a>
          <a href="/prompts/">Prompts</a>
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

        {/* Directory badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
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

          <a
            href="https://twelve.tools"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Featured on Twelve Tools"
          >
            <img
              src="https://twelve.tools/badge0-white.svg"
              alt="Featured on Twelve Tools"
              loading="lazy"
              width="148"
              height="40"
            />
          </a>
          <a href="https://nicklaunches.com/" target="_blank" rel="noopener">
            <img src="https://nicklaunches.com/badges/featured-dark.png" alt="Krillion Unlimited on Nick Launches" loading="lazy" width="244" height="56" /></a>
          <a href="https://postmake.io/submit" target="_blank" rel="noopener"><img src="https://postmake.io/postmake_badge_light.png" alt="Featured on the Postmake directory" width="240" /></a>
        </div>
      </div>
    </footer>
  );
}
