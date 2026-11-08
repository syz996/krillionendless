// lib/promptMeta.ts
export function promptMetadata(slug: string, display: string, answerCount: number) {
  const title = `${display} — Krillion Answers & Practice Tiers`;
  const description = `${answerCount} accepted answers for the “${display}” prompt, with Krillion rarity tiers and points. Independent KrillionEndless question bank — not official Krillion data.`;
  return {
    title,
    description,
    alternates: { canonical: `https://krillionendless.org/prompts/${slug}/` },
  };
}