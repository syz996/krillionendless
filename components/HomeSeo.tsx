// app/components/HomeSeo.tsx
import Link from "next/link";

/* ---------- 期号推算：唯一需要维护的两行 ---------- */
const ANCHOR_NUMBER = 116; // 已知期号
const ANCHOR_ISO = "2026-11-08"; // 该期对应的日期（UTC）
const DAY = 86_400_000;
// 如果你的构建在当期发布之前跑，把这里改成 1，避免链到还没生成的页面
const PUBLISH_LAG_DAYS = 0;

const dateFmt = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
});

export type Dive = {
    number: number;
    slug: string;
    dateLabel: string;
    path: string;
};

function diveAt(number: number): Dive {
    const ms = Date.parse(`${ANCHOR_ISO}T00:00:00Z`) + (number - ANCHOR_NUMBER) * DAY;
    const slug = `dive-${number}`;
    return { number, slug, dateLabel: dateFmt.format(new Date(ms)), path: `/archive/${slug}/` };
}

export function latestDive(now: Date = new Date()): Dive {
    const todayMs = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const days = Math.floor((todayMs - Date.parse(`${ANCHOR_ISO}T00:00:00Z`)) / DAY);
    return diveAt(ANCHOR_NUMBER + Math.max(0, days) - PUBLISH_LAG_DAYS);
}

/* ---------- 内容 ---------- */
const FAQ = [
    {
        q: "What is Krillion Unlimited?",
        a: "Krillion Unlimited is a free practice version of the daily Krillion answer game: seven prompts, a 25-second timer, and as many dives as you want instead of one per day.",
    },
    {
        q: "Is Krillion Unlimited free? Do I need an account?",
        a: "It is free and needs no sign-up. Open the page, press play, and the first prompt starts immediately.",
    },
    {
        q: "Is Krillion Unlimited unblocked at school or work?",
        a: "It runs in the browser with no download and no login, so it loads on most school, work and Chromebook networks. If a filter blocks the domain, try another network or the workarounds on the unblocked page.",
    },
    {
        q: "How is it different from the official daily Krillion?",
        a: "The official game gives you one dive per day and its answer list is based on real player answers. KrillionEndless is an independent practice bank: the tiers and points are our own editorial labels, not official Krillion data.",
    },
];

const CATEGORIES = [
    { href: "/prompts/pokemon/", label: "Pokémon" },
    { href: "/prompts/fruit/", label: "fruit" },
    { href: "/prompts/african-country/", label: "African countries" },
    { href: "/prompts/pizza-topping/", label: "pizza toppings" },
    { href: "/prompts/dessert/", label: "desserts" },
    { href: "/prompts/european-capital/", label: "European capitals" },
];

export default function HomeSeo({ latest }: { latest?: Dive }) {
    const dive = latest ?? latestDive();
    const previous = diveAt(dive.number - 1);

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
        <section>
            {/* 当期入口：最新一期的答案次日才补，所以这里写 prompts & hints */}
            <div>
                <h2>Today&rsquo;s Krillion prompts &amp; hints — Dive #{dive.number}</h2>
                <p>
                    {dive.dateLabel} · all seven prompts with a hint each. The official answer list is added
                    the next day.
                </p>
                <p>
                    <Link href={dive.path}>See Dive #{dive.number} prompts &amp; hints →</Link>
                </p>
                <p>
                    Want answers right now? <Link href={previous.path}>Dive #{previous.number} full answers</Link>{" "}
                    ({previous.dateLabel}) are already published, or browse{" "}
                    <Link href="/archive/">the full archive</Link> back to Dive #94.
                </p>
            </div>
            <h2>Practice by category</h2>
            <p>
                Drill the prompts that show up most in dives:{" "}
                {CATEGORIES.map((c, i) => (
                    <span key={c.href}>
                        <Link href={c.href}>{c.label}</Link>
                        {i < CATEGORIES.length - 1 ? ", " : ", or "}
                    </span>
                ))}
                <Link href="/prompts/">all 50 prompts</Link>.
            </p>

            <h2>What is Krillion Unlimited?</h2>
            <p>
                Krillion Unlimited is the practice version of the Krillion answer game. Each dive gives you
                seven prompts, a 25-second timer per prompt, and a scoring band that runs from Plankton (10
                points) up to One in a Krillion (100 points). The official game hands out one dive a day;
                this page gives you unlimited dives so you can drill the prompts you keep losing points on.
            </p>

            <h2>How to play</h2>
            <ol>
                <li>Press play — no account, no download.</li>
                <li>Read the prompt and type your best answer before the 25-second timer runs out.</li>
                <li>Each answer lands in a tier: the more obvious the answer, the fewer points it scores.</li>
                <li>Finish all seven prompts, then start another dive straight away.</li>
            </ol>

            <h2>Krillion Unlimited vs. the daily dive</h2>
            <p>
                The daily dive is one round per day and its answer list goes up the next day; the practice
                mode on this page never runs out. Practising unlimited does not change the official game —
                it just lets you rehearse the answer bands without waiting for tomorrow.
            </p>

            <h2>Play unblocked, on any device</h2>
            <p>
                Everything runs in the browser, so it works on a school Chromebook, a work laptop, an iPad
                or a phone. No extension, no install. If the page will not load on your network, see{" "}
                <Link href="/krillion-unblocked/">Krillion Unlimited unblocked</Link> for the workarounds.
            </p>

            <h2>Practice by category</h2>
            <p>
                The prompt bank is grouped by the kinds of prompts that show up in dives:{" "}
                {CATEGORIES.map((c, i) => (
                    <span key={c.href}>
                        <Link href={c.href}>{c.label}</Link>
                        {i < CATEGORIES.length - 1 ? ", " : ", or "}
                    </span>
                ))}
                <Link href="/prompts/">all 50 prompts</Link>.
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
        </section>
    );
}