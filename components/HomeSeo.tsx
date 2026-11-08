import Link from "next/link";

const ANCHOR_NUMBER = 116;
const ANCHOR_ISO = "2026-11-08";
const DAY = 86_400_000;
const PUBLISH_LAG_DAYS = 0;

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
});

function diveAt(n: number) {
  const ms = Date.parse(`${ANCHOR_ISO}T00:00:00Z`) + (n - ANCHOR_NUMBER) * DAY;
  return { number: n, dateLabel: dateFmt.format(new Date(ms)), path: `/archive/dive-${n}/` };
}

function latestDive(now: Date = new Date()) {
  const todayMs = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const days = Math.floor((todayMs - Date.parse(`${ANCHOR_ISO}T00:00:00Z`)) / DAY);
  return diveAt(ANCHOR_NUMBER + Math.max(0, days) - PUBLISH_LAG_DAYS);
}

const CATEGORIES = [
  { href: "/prompts/pokemon/", label: "Pokémon" },
  { href: "/prompts/fruit/", label: "fruit" },
  { href: "/prompts/african-country/", label: "African countries" },
  { href: "/prompts/pizza-topping/", label: "pizza toppings" },
  { href: "/prompts/dessert/", label: "desserts" },
  { href: "/prompts/european-capital/", label: "European capitals" },
];

export default function HomeSeo() {
  const dive = latestDive();
  const previous = diveAt(dive.number - 1);

  return (
    <section>
      <h2>Today&rsquo;s Krillion prompts &amp; hints — Dive #{dive.number}</h2>
      <p>
        {dive.dateLabel} · all seven prompts with a hint each. The official answer list is added the
        next day.
      </p>
      <p>
        <Link href={dive.path}>See Dive #{dive.number} prompts &amp; hints →</Link>
      </p>
      <p>
        Want answers right now? <Link href={previous.path}>Dive #{previous.number} full answers</Link>{" "}
        ({previous.dateLabel}) are already published, or browse{" "}
        <Link href="/archive/">the full archive</Link> back to Dive #94.
      </p>

      <h2>Krillion Unlimited vs. the daily dive</h2>
      <p>
        The daily dive is one round per day and its answer list goes up the next day; the practice
        mode on this page never runs out. Practising unlimited does not change the official game —
        it just lets you rehearse the answer bands without waiting for tomorrow.
      </p>

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

      <h2>Play unblocked, on any device</h2>
      <p>
        Everything runs in the browser, so it works on a school Chromebook, a work laptop, an iPad
        or a phone. No extension, no install. If the page will not load on your network, see{" "}
        <Link href="/krillion-unblocked/">Krillion Unlimited unblocked</Link> for the workarounds.
      </p>
    </section>
  );
}
