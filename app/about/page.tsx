import type { Metadata } from 'next';
import { SITE } from '../../lib/site';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

export function generateMetadata(): Metadata {
  return {
    title: `About ${SITE.domain} — Independent Krillion Practice Site`,
    description: `What ${SITE.domain} is: an independent, fan-made site for practising Krillion-style rare-answer prompts, with a daily dive archive built from publicly submitted player answers.`,
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

        <h2>Why this site exists</h2>
        <p>The official game runs once a day and, once you have played it, there is no easy way to review what came up or to keep practising. The practice dive here fills that gap: the same seven-prompt, 25-second format, playable back to back, with no daily limit.</p>

        <h2>Where the archive data comes from</h2>
        <p>The archive is compiled from answers that players submit publicly while a dive is live. We do not host the game, do not generate the prompts, and do not have any privileged access to official data. What we add on top is the organisation:</p>
        <ul>
          <li><strong>One page per dive</strong>, dated, so a past day&rsquo;s prompts are easy to find again.</li>
          <li><strong>A hint for every prompt</strong>, written in our own words to nudge you toward the rarest answers without giving them away.</li>
          <li><strong>Answer lists kept collapsed</strong> — nothing is spoiled unless you open a prompt yourself.</li>
          <li><strong>Corrections welcome</strong> — if an answer looks wrong or a dive page is missing something, tell us and we will fix it.</li>
        </ul>
        <p>Because answers are collected while a dive is running, an archive page published earlier in the day may hold fewer answers than the same page later on. We refresh each page as a dive closes, so what you see the next day is the fuller list.</p>

        <h2>What we deliberately do not do</h2>
        <ul>
          <li>We do not run an account system — nothing you type here is sent to a server.</li>
          <li>We do not sell, resell or bundle any answer list as a product.</li>
          <li>We do not claim any affiliation with the official game.</li>
        </ul>

        <h2>Independence</h2>
        <p>{SITE.domain} is not affiliated with, endorsed by, or connected to the official Krillion game at krillion.io. All trademarks belong to their respective owners. If you are a rights holder and want something changed or removed, contact us and we will respond promptly.</p>

        <h2>Contact</h2>
        <p>Anything at all: <a href="mailto:hello@krillionendless.org">hello@krillionendless.org</a></p>
      </main>
      <SiteFooter />
    </>
  );
}
