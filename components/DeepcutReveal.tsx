'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

// deepcut（85 分）答案不静态渲染进 HTML，改为点击后从 public/data/dive-N.json 按需加载，
// 避免存档页体积随答案条数膨胀。tier/score 对 deepcut 恒定，无需在 JSON 里重复存。
export default function DeepcutReveal({ dive, promptIndex, count }: { dive: number; promptIndex: number; count: number }) {
  const [answers, setAnswers] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function load() {
    if (loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/data/dive-${dive}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: string[][] = await res.json();
      setAnswers(data[promptIndex] || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (count === 0) return null;

  if (answers === null) {
    return (
      <p className="deepcut-toggle">
        <button type="button" className="btn ghost" onClick={load} disabled={loading}>
          {loading ? <><Loader2 size={15} className="spin" /> Loading…</> : <>Show all {count.toLocaleString('en-US')} Deep Cut answers</>}
        </button>
        {error ? <span className="small-note"> Could not load — try again.</span> : null}
      </p>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Deep Cut answers</th><th>Score</th></tr></thead>
        <tbody>{answers.map((a, n) => <tr key={n}><td>{a}</td><td>85</td></tr>)}</tbody>
      </table>
    </div>
  );
}