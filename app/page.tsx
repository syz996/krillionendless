import type { Metadata } from "next";
import GameClient, { type LatestDive } from "./GameClient";
import { homeFaqs } from "@/content/faq";
import { DIVES } from "@/lib/archive";

const ogImage = {
  url: "https://krillionendless.org/og.png",
  width: 1200,
  height: 630,
  alt: "KrillionEndless — independent Krillion practice and daily dive archive",
};

export const metadata: Metadata = {
  title: "Krillion Unlimited Game — Independent Practice Dive",
  description:
    "Play an independent rare-answer trivia practice game with seven prompts, a 25-second timer, and an original starter question bank.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Krillion Unlimited Game — Independent Practice Dive",
    description:
      "Play an independent rare-answer trivia practice game with seven prompts, a 25-second timer, and an original starter question bank.",
    url: "/",
    siteName: "KrillionEndless",
    type: "website",
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krillion Unlimited Game — Independent Practice Dive",
    description:
      "Play an independent rare-answer trivia practice game with seven prompts, a 25-second timer, and an original starter question bank.",
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};


const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KrillionEndless",
  url: "https://krillionendless.org/",
};

export default function Page() {
  const last = DIVES.length ? DIVES[DIVES.length - 1] : undefined;
  const latestDive: LatestDive | undefined = last
    ? { dive: last.dive, date: last.date, prompts: last.prompts }
    : undefined;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      <GameClient latestDive={latestDive} />
    </>
  );
}