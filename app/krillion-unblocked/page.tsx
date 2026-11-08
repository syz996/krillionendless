// app/krillion-unblocked/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Krillion Unlimited Unblocked — Play at School or Work",
  description:
    "Krillion Unlimited unblocked: play free in the browser with no download and no login. Works on school Chromebooks, work laptops, iPads and phones — plus what to try when a network blocks it.",
  alternates: { canonical: "https://krillionendless.org/krillion-unblocked/" },
  openGraph: {
    title: "Krillion Unlimited Unblocked — Play at School or Work",
    description:
      "No download, no login. Here is how to play Krillion Unlimited on a locked-down school or work network.",
    url: "https://krillionendless.org/krillion-unblocked/",
  },
};

const FAQ = [
  {
    q: "Is Krillion Unlimited actually unblocked?",
    a: "There is nothing to install and nothing to sign into, which removes the two most common reasons a school or work network blocks a game site. Whether a specific filter blocks this domain depends on your school or employer — no site can promise otherwise.",
  },
  {
    q: "Does it work on a school Chromebook?",
    a: "Yes. It is a web page with keyboard input, so it runs in Chrome on a managed Chromebook the same way it runs on a laptop. No extension is needed.",
  },
  {
    q: "Can I play on an iPad or phone?",
    a: "Yes. The prompt input opens the on-screen keyboard and the timer runs the same 25 seconds.",
  },
  {
    q: "What if the page will not load at school?",
    a: "Try a hard refresh first, then a different network (phone hotspot). If the domain itself is blocked, the game will not load — that is a network decision, not a site outage.",
  },
];

export default function Page() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <h1>Krillion Unlimited Unblocked</h1>
        <p>
          Krillion Unlimited runs entirely in the browser: no download, no account, no extension. That
          means it opens on the devices and networks people actually use during the day — a school
          Chromebook, a work laptop, an iPad in a lecture hall — and you can start a practice dive in
          one click.
        </p>

        <h2>Why browser games get blocked — and why this one usually is not</h2>
        <p>
          Filters on school and work networks mostly flag two things: an executable download and a
          login screen. KrillionEndless has neither. The whole game is one HTML page plus a small JS
          bundle, so it behaves like any other scriptable page behind the filter. If your network
          allows general web browsing, this page usually loads too.
        </p>

        <h2>Play it now</h2>
        <p>
          <Link className="btn" href="/">
            Start a Krillion Unlimited dive →
          </Link>
        </p>

        <h2>If the page will not load on your network</h2>
        <ol>
          <li>Hard refresh (Ctrl/Cmd + Shift + R) — a cached redirect is the most common false alarm.</li>
          <li>Try a phone hotspot to confirm the site itself is up.</li>
          <li>Try a different browser — a managed Chromebook profile sometimes blocks new domains until an admin clears them.</li>
          <li>If the domain is blocked outright, nothing on this page can get around it; that is a network policy decision.</li>
        </ol>

        <h2>Other ways to play today</h2>
        <p>
          Want the official prompts instead of practice ones? Open{" "}
          <Link href="/archive/">the Krillion archive</Link> for every dive from #94 onwards, with
          hints and the full answer list per prompt, or jump straight to the latest dive from the{" "}
          <Link href="/">home page</Link>. The <Link href="/prompts/">prompt bank</Link> is the place
          to drill a single category such as <Link href="/prompts/pokemon/">Pokémon</Link> or{" "}
          <Link href="/prompts/fruit/">fruit</Link>.
        </p>

        <h2>Frequently asked questions</h2>
        <dl>
          {FAQ.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
