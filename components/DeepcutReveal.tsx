'use client';

import { Component, useState, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

// 首次展开渲染多少行、每次「再显示更多」追加多少行
const FIRST = 200;
const STEP = 500;

// 就近错误边界：这块崩了只影响这一个答案表，不会把整页换成兜底页
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return <p className="small-note">Could not show this answer list. Reload the page and try again.</p>;
    }
    return this.props.children;
  }
}

function Reveal({ dive, promptIndex, count }: { dive: number; promptIndex: number; count: number }) {
  const [answers, setAnswers] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [shown, setShown] = useState(FIRST);

  async function load() {
    if (loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/data/dive-${dive}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: unknown = await res.json();
      const raw = Array.isArray(data) ? data[promptIndex] : [];
      // 只留字符串：任何一条坏数据都不会再把整页带崩
      setAnswers(Array.isArray(raw) ? raw.filter((x): x is string => typeof x === 'string') : []);
      setShown(FIRST);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (count === 0) return null;

  if (answers === null) {
    return (
      <p className="deepcut-toggle" translate="no">
        <button type="button" className="btn ghost" onClick={load} disabled={loading}>
          {loading ? <><Loader2 size={15} className="spin" /> Loading…</> : <>Show {count.toLocaleString('en-US')} Deep Cut answers</>}
        </button>
        {error ? <span className="small-note"> Could not load — try again.</span> : null}
      </p>
    );
  }

  if (answers.length === 0) {
    return (
      <p className="deepcut-toggle" translate="no">
        <span className="small-note">No answers loaded for this prompt.</span>
      </p>
    );
  }

  const visible = answers.slice(0, shown);

  return (
    <div className="table-wrap" translate="no">
      <table>
        <thead><tr><th>Deep Cut answers</th><th>Score</th></tr></thead>
        <tbody>{visible.map((a, n) => <tr key={n}><td>{a}</td><td>85</td></tr>)}</tbody>
      </table>
      {shown < answers.length ? (
        <p className="deepcut-toggle">
          <button type="button" className="btn ghost" onClick={() => setShown(s => s + STEP)}>
            Show {Math.min(STEP, answers.length - shown).toLocaleString('en-US')} more
          </button>
          <span className="small-note"> {shown.toLocaleString('en-US')} of {answers.length.toLocaleString('en-US')} shown</span>
        </p>
      ) : null}
    </div>
  );
}

export default function DeepcutReveal(props: { dive: number; promptIndex: number; count: number }) {
  return <Boundary><Reveal {...props} /></Boundary>;
}
