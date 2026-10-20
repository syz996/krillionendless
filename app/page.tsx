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
  // 只传 prompt/hint 给客户端：官方 answers 体量大且 replay 模式（不计分）用不到，
  // 更不能把当期答案序列化进首页 HTML（剧透 + 1MB+ 死重）。
  const latestDive: LatestDive | undefined = last
    ? { dive: last.dive, date: last.date, prompts: last.prompts.map(p => ({ prompt: p.prompt, hint: p.hint })) }
    : undefined;
  // 最近 5 期（倒序），供首页存档区块直链使用
  const recentDives = [...DIVES]
    .reverse()
    .slice(0, 5)
    .map(d => ({ dive: d.dive, date: d.date }));
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
      <GameClient latestDive={latestDive} recentDives={recentDives} />
    </>
  );
}