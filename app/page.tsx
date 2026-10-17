import type { Metadata } from "next";
import GameClient from "./GameClient";

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

export default function Page() {
  return <GameClient />;
}