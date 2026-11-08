import Link from "next/link";
import { PROMPTS } from "../lib/prompts";

// 期号与日期一律来自 props（app/page.tsx → GameClient → 这里）。
// 组件内不再用 new Date() 推算：静态导出时服务端 HTML 用的是构建当天，
// 浏览器用的是访客当天，UTC 零点到当天重新部署之间会差一期，
// 链接就指向还不存在的 /archive/dive-N/（404）。
// 这里也不能直接 import lib/archive —— 它用 node:fs 读 gzip 期数据，进不了客户端包。
type DiveRef = { dive: number; date: string };

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

const CATEGORIES = [
  { href: "/prompts/pokemon/", label: "Pokémon" },
  { href: "/prompts/fruit/", label: "fruit" },
  { href: "/prompts/african-country/", label: "African countries" },
  { href: "/prompts/pizza-topping/", label: "pizza toppings" },
  { href: "/prompts/dessert/", label: "desserts" },
  { href: "/prompts/european-capital/", label: "European capitals" },
];

export default function HomeSeo({
  latestDive,
  recentDives = [],
}: {
  latestDive?: DiveRef;
  recentDives?: DiveRef[];
}) {
  // 没有期数据就整段不渲染，避免渲染出指向不存在页面的链接
  if (!latestDive) return null;

  const dive = {
    number: latestDive.dive,
    dateLabel: fmtDate(latestDive.date),
    path: `/archive/dive-${latestDive.dive}/`,
  };

  // 上一期 = recentDives 里期号小于当期的最近一条。
  // 当期答案要次日才揭晓，所以当期本身不能出现在「已有完整答案」那句话里。
  const prevRef = recentDives.find(d => d.dive < latestDive.dive);
  const previous = prevRef
    ? {
        number: prevRef.dive,
        dateLabel: fmtDate(prevRef.date),
        path: `/archive/dive-${prevRef.dive}/`,
      }
    : null;

   return (
    <>
      <section className="content-section" id="todays-dive">
        <h2>Today&rsquo;s Krillion prompts &amp; hints — Dive #{dive.number}</h2>
        <p>
          {dive.dateLabel} · all seven prompts with a hint each. The official answer list is added the
          next day.
        </p>
        <p>
          <Link href={dive.path}>See Dive #{dive.number} prompts &amp; hints →</Link>
        </p>
        {previous ? (
          <p>
            Want answers right now? <Link href={previous.path}>Dive #{previous.number} full answers</Link>{" "}
            ({previous.dateLabel}) are already published, or browse{" "}
            <Link href="/archive/">the full archive</Link> back to Dive #94.
          </p>
        ) : null}
      </section>

      <section className="content-section">
        <h2>Krillion Unlimited vs. the daily dive</h2>
        <p>
          The daily dive is one round per day and its answer list goes up the next day; the practice
          mode on this page never runs out. Practising unlimited does not change the official game — it
          just lets you rehearse the answer bands without waiting for tomorrow.
        </p>
      </section>

      <section className="content-section" id="practice-by-category">
        <h2>Practice by category</h2>
        <p>
          Drill the prompts that show up most in dives:{" "}
          {CATEGORIES.map((c, i) => (
            <span key={c.href}>
              <Link href={c.href}>{c.label}</Link>
              {i < CATEGORIES.length - 1 ? ", " : ", or "}
            </span>
          ))}
          <Link href="/prompts/">all {PROMPTS.length} prompts</Link>.
        </p>
      </section>

      <section className="content-section">
        <h2>Play unblocked, on any device</h2>
        <p>
          Everything runs in the browser, so it works on a school Chromebook, a work laptop, an iPad or
          a phone. No extension, no install. If the page will not load on your network, see{" "}
          <Link href="/krillion-unblocked/">Krillion Unlimited unblocked</Link> for the workarounds.
        </p>
      </section>
    </>
  );
}
