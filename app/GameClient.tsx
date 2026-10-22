"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, Waves } from 'lucide-react';
import { normalizeAnswer, findAnswer, PROMPTS, TIERS, type AnswerEntry } from '../lib/prompts';
import { SITE } from '../lib/site';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

type Round = { text: string; hint: string; answers: AnswerEntry[]; id?: string };
type RoundResult = { prompt: string; answer: string; accepted: boolean; tier?: string; points: number; timedOut?: boolean; lockedOut?: boolean };

export type LatestDive = { dive: number; date: string; prompts: { prompt: string; hint: string }[] };
export type RecentDive = { dive: number; date: string };

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

function shuffle<T,>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function HomePage({ latestDive, recentDives = [] }: { latestDive?: LatestDive; recentDives?: RecentDive[] }) {
  const [mode, setMode] = useState<'practice' | 'replay'>('practice');
  const [rounds, setRounds] = useState<Round[]>(() => shuffle(PROMPTS).slice(0, 7).map(p => ({ text: p.text, hint: p.hint, answers: p.answers, id: p.id })));
  const [current, setCurrent] = useState(0);
  const [seconds, setSeconds] = useState(25);
  const [answer, setAnswer] = useState('');
  const [notice, setNotice] = useState('');
  const [feedback, setFeedback] = useState('');
  const [wrongCount, setWrongCount] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'ok' | 'fail'>('idle');
  const [missHint, setMissHint] = useState<{ count: number; slug: string } | null>(null);
  const [tierNote, setTierNote] = useState<string | null>(null);
  const [lockedPrompt, setLockedPrompt] = useState<{ prompt: string; answers: AnswerEntry[] } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lockRef = useRef(false);
  const currentPrompt = rounds[current];
  const score = useMemo(() => results.reduce((sum, item) => sum + item.points, 0), [results]);
  const acceptedCount = useMemo(() => results.filter(item => item.accepted).length, [results]);
  const inTimeCount = useMemo(() => results.filter(item => !item.timedOut).length, [results]);
  const best = useMemo(() => results.reduce<RoundResult | undefined>((b, r) => (r.accepted && (!b || r.points > b.points) ? r : b), undefined), [results]);
  const tierLabel = (name?: string) => name ? (TIERS.find(t => t.name === name)?.label ?? name) : 'No Echo';

  const moveNext = useCallback((result: RoundResult) => {
    setResults(prev => [...prev, result]);
    setNotice('');
    setFeedback('');
    setAnswer('');
    setWrongCount(0);
    setMissHint(null);
    setTierNote(null);
    setLockedPrompt(null);
    if (current + 1 >= rounds.length) {
      setFinished(true);
      setStarted(false);
    } else {
      setCurrent(prev => prev + 1);
      setSeconds(25);
    }
  }, [current, rounds.length]);

  useEffect(() => {
    if (!started || finished) return;
    const id = window.setInterval(() => { if (!lockRef.current) setSeconds(s => Math.max(0, s - 1)); }, 1000);
    return () => window.clearInterval(id);
  }, [started, finished, current]);

  useEffect(() => {
    if (started && seconds === 0 && currentPrompt && !lockRef.current) {
      moveNext({ prompt: currentPrompt.text, answer: '', accepted: false, points: 0, timedOut: true });
    }
  }, [seconds, started, currentPrompt, moveNext]);

  useEffect(() => {
    if (started) inputRef.current?.focus();
  }, [current, started]);

  function startGame(nextMode: 'practice' | 'replay') {
    const next: Round[] = nextMode === 'replay' && latestDive
      ? latestDive.prompts.map(p => ({ text: p.prompt, hint: p.hint, answers: [] as AnswerEntry[] }))
      : shuffle(PROMPTS).slice(0, 7).map(p => ({ text: p.text, hint: p.hint, answers: p.answers, id: p.id }));
    setMode(nextMode);
    setRounds(next);
    setCurrent(0); setSeconds(25); setAnswer(''); setNotice(''); setFeedback(''); setResults([]); setWrongCount(0);
  setMissHint(null); setTierNote(null); setLockedPrompt(null);
  setFinished(false); setStarted(true); setCopyState('idle'); lockRef.current = false;
  }

  function submitAnswer() {
    if (!started || !currentPrompt || lockRef.current || mode !== 'practice') return;
    const cleaned = normalizeAnswer(answer);
    if (!cleaned) { setNotice('Type an answer first.'); return; }
    const match = findAnswer(cleaned, currentPrompt.answers);
    if (!match) {
      const misses = wrongCount + 1;
      setWrongCount(misses);
      setTierNote(null);
      if (misses >= 3) {
        lockRef.current = true;
        setNotice('');
        setFeedback('');
        setMissHint(null);
        setLockedPrompt({ prompt: currentPrompt.text, answers: currentPrompt.answers });
      } else {
        setMissHint({ count: currentPrompt.answers.length, slug: currentPrompt.id || '' });
        setNotice(`This might be right, but it's not in our ${currentPrompt.answers.length} accepted answers — ${3 - misses} ${3 - misses === 1 ? 'try' : 'tries'} left.`);
      }
      return;
    }
    lockRef.current = true;
    setNotice('');
    setMissHint(null);
    setLockedPrompt(null);
    const meta = TIERS.find(t => t.name === match.tier);
    setFeedback(`Correct — ${match.tier} · +${match.points} pts`);
    setTierNote(`${match.tier} is ${meta?.label?.toLowerCase()} — ${meta?.blurb || ''}`);
    const result: RoundResult = { prompt: currentPrompt.text, answer: answer.trim(), accepted: true, tier: match.tier, points: match.points };
    window.setTimeout(() => { lockRef.current = false; moveNext(result); }, 1500);
  }

  function nextPrompt() {
    if (!started || !currentPrompt || lockRef.current || mode !== 'replay') return;
    lockRef.current = true;
    const result: RoundResult = { prompt: currentPrompt.text, answer: '', accepted: false, points: 0, timedOut: false };
    window.setTimeout(() => { lockRef.current = false; moveNext(result); }, 250);
  }

  async function copyResult() {
    const parts = results.map(item => item.accepted ? item.answer.trim() : item.timedOut ? '—' : '✗');
    const line = `KrillionEndless practice dive — ${score} pts, ${acceptedCount}/${rounds.length} accepted. Answers: ${parts.join(', ')}. ${SITE.baseUrl}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(line);
      } else {
        const ta = document.createElement('textarea');
        ta.value = line;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopyState('ok');
      window.setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setCopyState('fail');
      window.setTimeout(() => setCopyState('idle'), 2500);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="wrap" id="top">
        <section className="hero"><div className="eyebrow"><Waves size={15} /> INDEPENDENT PRACTICE MODE</div><h1>Krillion Unlimited</h1><p className="sub">No daily limit — play an original practice dive whenever you like.</p></section>

        <section className="game" id="game" aria-label="Play the independent practice game">
          {!started && !finished ? <div className="intro-state"><div className="game-top"><span className="dive">PRACTICE DIVE</span><span>7 prompts · 25 seconds each</span></div><div className="intro-icon"><Waves size={30} /></div><h2>Ready to dive?</h2><p>Answer seven prompts — randomized practice questions, or a replay of the latest daily dive from the archive.</p><div className="intro-actions"><button className="btn" onClick={() => startGame('practice')}>Start practice dive <ArrowRight size={17} /></button>{latestDive ? <button className="btn ghost" onClick={() => startGame('replay')}>Replay Dive #{latestDive.dive}</button> : null}</div></div> : null}
          {started && currentPrompt ? <>
            <div className="game-top"><span className="dive">{mode === 'replay' ? `DIVE #${latestDive?.dive} REPLAY` : `Practice Dive #${current + 1}`}</span><span>Prompt <strong>{current + 1}</strong> / {rounds.length}</span></div>
            <div className="progress"><span style={{ width: `${((current + 1) / rounds.length) * 100}%` }} /></div>
            <p className="prompt">{currentPrompt.text}</p>
            <div className={`timer ${seconds <= 7 ? 'urgent' : ''}`} aria-live="polite">{seconds}</div>
            {mode === 'practice' ? <>
              <form className="game-row" onSubmit={e => { e.preventDefault(); submitAnswer(); }}>
                <input ref={inputRef} value={answer} onChange={e => { setAnswer(e.target.value); setNotice(''); setMissHint(null); setTierNote(null); }} placeholder="Type your answer…" autoComplete="off" aria-label="Your answer" />
                <button className="btn" type="submit">Submit</button>
              </form>
              <p className="feedback" aria-live="polite">{feedback || ' '}</p>
              {tierNote ? <p className="tier-note" aria-live="polite">{tierNote}</p> : null}
              <p className={`notice ${notice || missHint ? 'visible' : ''}`} aria-live="polite">{notice || ' '}{missHint ? <> <a href={`/prompts/${missHint.slug}/`}>See the full accepted list</a></> : null}</p>
              {lockedPrompt ? <div className="locked-reveal" aria-live="polite"><p>Locked — here are all {lockedPrompt.answers.length} accepted answers for “{lockedPrompt.prompt}”.</p><ul>{[...lockedPrompt.answers].sort((a, b) => b.points - a.points).map(a => <li key={a.aliases[0]}>{a.aliases[0]} · {a.points}</li>)}</ul><button className="btn ghost" type="button" onClick={() => { const locked: RoundResult = { prompt: currentPrompt.text, answer: '', accepted: false, points: 0, lockedOut: true }; setLockedPrompt(null); lockRef.current = false; moveNext(locked); }}>Continue to next prompt <ArrowRight size={16} /></button></div> : null}
            </> : <>
              <div className="game-row"><button className="btn" type="button" onClick={nextPrompt}>Next prompt <ArrowRight size={17} /></button></div>
              <p className="feedback" aria-live="polite">Think of your answer, then open the hint or move on.</p>
            </>}
            <details className="hint-reveal"><summary>Reveal hint</summary><div className="hint"><strong>Hint:</strong> {currentPrompt.hint}</div></details>
            {mode === 'practice' ? <ul className="tiers">{TIERS.map(tier => <li key={tier.name}>{tier.name} · {tier.points}</li>)}</ul> : null}
          </> : null}
          {finished && mode === 'practice' ? <div className="results-state"><div className="game-top"><span className="dive">DIVE COMPLETE</span><span>{rounds.length} / {rounds.length} prompts</span></div><div className="score-number">{score}<span> pts</span></div>{best ? <p className="best-pick">Best pick: {best.prompt} — {best.tier} (+{best.points} pts)</p> : null}<p className="depth">Estimated practice depth: {score * 10} m</p><p className="disclaimer">Practice score only. The answer list and tiers are our own data, not official Krillion scoring or player statistics.</p><div className="result-list">{results.map((item, index) => { const bank = rounds[index]?.answers ?? []; const mine = item.accepted && bank.length ? findAnswer(normalizeAnswer(item.answer), bank) : undefined; return <div key={`${item.prompt}-${index}`}><div className="result-row"><div><strong>{index + 1}. {item.prompt}</strong><p>{item.timedOut ? 'Time ran out' : item.lockedOut ? 'Locked out after three misses' : item.accepted ? `Your answer: ${item.answer}` : 'No accepted answer'}</p></div><div className="result-points"><strong>{item.points}</strong><span>{item.tier ? `${item.tier} · ${tierLabel(item.tier)}` : 'No Echo'}</span></div></div>{bank.length ? <details className="answer-reveal"><summary>Reveal all answers</summary><ul>{[...bank].sort((a, b) => b.points - a.points).map(entry => <li key={entry.aliases[0]} className={entry === mine ? 'mine' : undefined}>{entry.aliases[0]} · {entry.points}</li>)}</ul></details> : null}</div>; })}</div><div className="intro-actions"><button className="btn" onClick={() => startGame('practice')}><RotateCcw size={16} /> Play another dive</button><button className="btn ghost" type="button" onClick={copyResult}>{copyState === 'ok' ? 'Copied!' : copyState === 'fail' ? 'Copy failed' : 'Copy result'}</button></div></div> : null}
          {finished && mode === 'replay' ? <div className="results-state"><div className="game-top"><span className="dive">REPLAY COMPLETE</span><span>{rounds.length} / {rounds.length} prompts</span></div><div className="score-number">{inTimeCount}<span> / {rounds.length} in time</span></div><p className="depth">Replay of Dive #{latestDive?.dive}</p><p className="disclaimer">Replay mode uses the archive&rsquo;s public prompts and hints only — there is no scoring in this mode.</p><div className="result-list">{results.map((item, index) => <div className="result-row" key={`${item.prompt}-${index}`}><div><strong>{index + 1}. {item.prompt}</strong><p>{item.timedOut ? 'Time ran out' : 'Answered in time'}</p></div></div>)}</div><div className="intro-actions"><button className="btn" onClick={() => startGame('replay')}><RotateCcw size={16} /> Replay again</button>{latestDive ? <a className="btn ghost" href={`/archive/dive-${latestDive.dive}/`}>Open Dive #{latestDive.dive} page <ArrowRight size={16} /></a> : null}</div></div> : null}
        </section>

        <nav className="quicklinks" aria-label="Explore more"><a href="#faq-section">Answers &amp; hints <ArrowRight size={15} /></a><a href="/prompts/">Prompt library <ArrowRight size={15} /></a><a href="/archive/">Practice archive <ArrowRight size={15} /></a></nav>

        <section className="content-section"><h2>How to play this practice dive</h2><p>Answer seven short, open-ended prompts. Each prompt has a 25-second timer. If your answer matches one of the accepted answers in the practice question bank, you earn its preset points. If it does not match, you can guess again — up to three attempts per prompt before it locks. You can also replay the latest daily dive from the archive — same seven prompts, same timer, no scoring.</p><div className="steps-grid"><article><span>01</span><h3>Read the prompt</h3><p>Check the category carefully and think of a specific answer that fits.</p></article><article><span>02</span><h3>Submit one answer</h3><p>Exact and close matches are accepted — a leading “the” or “a” will not sink an answer.</p></article><article><span>03</span><h3>Review your score</h3><p>At the end, review your points and see which prompts you answered.</p></article></div>
          <h3 className="subheading">Practice scoring tiers</h3><div className="table-wrap"><table><thead><tr><th>Tier</th><th>Practice label</th><th>Points</th></tr></thead><tbody>{TIERS.map(tier => <tr key={tier.name}><td>{tier.name}</td><td>{tier.label}</td><td>{tier.points}</td></tr>)}</tbody></table></div>
        </section>

        <section className="content-section" id="archive-section"><h2>Practice archive</h2><p>Every dive we have logged is collected in the archive — each with its seven prompts, a hint for each one, a short note on what made that dive hard, and the official answer list once the day has passed. A new page is added every day.</p>{recentDives.length ? <ul className="recent-dives">{recentDives.map(d => <li key={d.dive}><a href={`/archive/dive-${d.dive}/`}>Dive #{d.dive} — {fmtDate(d.date)}</a></li>)}</ul> : null}<div className="archive-live"><strong>The archive is live</strong><a className="btn" href="/archive/">Browse all dives <ArrowRight size={16} /></a></div></section>
        <section className="content-section" id="faq-section"><h2>Frequently asked questions</h2><details open><summary>Is this the official Krillion game?</summary><p>No. This is an independent practice site. It is not affiliated with or endorsed by the operator of the official game.</p></details><details><summary>Are these official answers or rarity scores?</summary><p>The practice dive uses our own question bank and practice points. The archive is different — each dive page publishes the official answer list with rarity tiers and scores, collapsed prompt by prompt.</p></details><details><summary>Why might my correct answer be rejected?</summary><p>This is a curated question bank, not a complete knowledge database. A factually valid answer can be missing until the bank is expanded.</p></details><details><summary>Can I replay it?</summary><p>Yes. The homepage offers a randomized practice dive, plus a replay of the latest daily dive from the archive — same seven prompts and 25-second timer, with no scoring.</p></details><details><summary>Does this site store my answers?</summary><p>The game checks answers in your browser and does not send them to a server.</p></details><details><summary>Is it free?</summary><p>Yes — free to play. No account, no download, no paywall.</p></details><details><summary>When does the official daily dive reset?</summary><p>At midnight New York time — that is when the official board flips to a new dive. Our archive adds each dive’s page the same day, so you can cross-check against the <a href="/archive/">archive</a>.</p></details><details><summary>Can I share my result?</summary><p>Yes. After a dive, copy the result line and paste it anywhere — it lists your answers and your score without spoiling the prompts.</p></details></section>
        </main>
      <SiteFooter />
    </>
  );
}
