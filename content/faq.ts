export type Faq = { q: string; a: string };

// 首页 FAQ：答案的可展示数量从数据算，避免手写 full/every 超前于实际。
export function getHomeFaqs(answeredCount: number, totalDives: number): Faq[] {
  return [
    { q: "Is this the official Krillion game?", a: "No. This is an independent practice site. It is not affiliated with or endorsed by the operator of the official game." },
    { q: "Are these official answers or rarity scores?", a: `The practice dive uses our own question bank and practice points. The archive is different — it publishes the official answer list with rarity tiers and scores, showing answers for ${answeredCount} of ${totalDives} logged dives, collapsed prompt by prompt. The latest dive shows prompts and hints only, and its answers follow the next day.` },
    { q: "Why might my correct answer be rejected?", a: "This is a curated question bank, not a complete knowledge database. A factually valid answer can be missing until the bank is expanded." },
    { q: "Can I replay it?", a: "Yes. The homepage offers a randomized practice dive, plus a replay of the latest daily dive from the archive — same seven prompts and 25-second timer, with no scoring." },
    { q: "Does this site store my answers?", a: "The game checks answers in your browser and does not send them to a server." },
    { q: "Is it free?", a: "Yes — free to play. No account, no download, no paywall." },
    { q: "When does the official daily dive reset?", a: "At midnight New York time — that is when the official board flips to a new dive. Each archive page goes up the same day; its full answer list follows the next day." },
    { q: "Can I share my result?", a: "Yes. After a dive, copy the result line and paste it anywhere — it lists your answers and your score without spoiling the prompts." },
  ];
}