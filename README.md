# KrillionEndless — Homepage MVP

A Next.js 15 + React 18 + TypeScript prototype based on the supplied homepage layout. It includes a functional seven-prompt practice round, 25-second timer, local answer matching, demo points, result screen, FAQ, and ad-slot placeholders.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Cloudflare

Runs on Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`).

```bash
npm run build     # = opennextjs-cloudflare build → .open-next/worker.js
npm run deploy    # = opennextjs-cloudflare deploy → Cloudflare Workers
```

On first run, log in to Cloudflare once:

```bash
npx wrangler login
```

Worker config lives in `wrangler.jsonc` (name `krillion-home-mvp`).

## Important data and branding notes

- `lib/prompts.ts` contains a tiny original sample bank to prove the game loop. Expand and fact-check it before launch.
- The point tiers are demo/editorial labels, not official scores or real player-frequency measurements.
- This prototype does not scrape, call, or reuse the official game's question bank.
- The archive, answers, packs, and policy links are placeholders/anchors. Build real pages before publishing them as indexable pages.
- Metadata currently sets `robots: noindex` to avoid indexing a prototype with incomplete data and pages. Change only after the content is launch-ready.
- Review trademark and copyright considerations and choose a distinct brand/domain before launch. A disclaimer alone does not guarantee that a name or design is safe to use.
- The reserved ad slots are visual placeholders, not active ad code.
