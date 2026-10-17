import type { Metadata } from "next";
import GameClient from "./GameClient";
import { homeFaqs } from "@/content/faq";

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
  },
  twitter: {
    card: "summary",
    title: "Krillion Unlimited Game — Independent Practice Dive",
    description:
      "Play an independent rare-answer trivia practice game with seven prompts, a 25-second timer, and an original starter question bank.",
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
      <GameClient />
    </>
  );
}