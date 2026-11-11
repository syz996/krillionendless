"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, Waves } from 'lucide-react';
import { normalizeAnswer, findAnswer, PROMPTS, TIERS, type AnswerEntry } from '../lib/prompts';
import { SITE } from '../lib/site';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import HomeSeo from '../components/HomeSeo';
import DiveStage from '../components/DiveStage'; // [1] 新增

type Round = { text: string; hint: string; answers: AnswerEntry[]; id?: string };
type RoundResult = { prompt: string; answer: string; accepted: boolean; tier?: string; points: number; timedOut?: boolean; lockedOut?: boolean; passed?: boolean };

export type LatestDive = { dive: number; date: string; prompts: { prompt: string; hint: string }[] };
export type RecentDive = { dive: number; date: string };
type Faq = { q: string; a: string };

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

export default function HomePage({ latestDive, recentDives = [], faqs = [] }: { latestDive?: LatestDive; recentDives?: RecentDive[]; faqs?: Faq[] }) {
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
  const [sink, setSink] = useState(0);            // [2] 已下潜格数（答对一题 +1）
  const [shake, setShake] = useState(0);          // [2] 答错时自增，驱动面板重播动画
  const [flash, setFlash] = useState<0 | 1 | 2>(0);
const [flashKind, setFlashKind] = useState<'ok' | 'no'>('ok');
  const [entryNote, setEntryNote] = useState(''); // [3] 从 ?dive=/历史期进来时的提示文案
  const [air, setAir] = useState(3);               // [7] 3 罐氧气：超时或 Pass 扣一罐
  const [outOfAir, setOutOfAir] = useState(false); // [7] 氧气耗尽收尾，结算显示 OUT OF AIR
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

  // [7] 氧气耗尽：把最后一题结果记上，直接进结算
  function endDiveNow(result: RoundResult, nextAir: number) {
    setAir(nextAir);
    setResults(prev => [...prev, result]);
    lockRef.current = false;
    setStarted(false);
    setFinished(true);
    setOutOfAir(true);
    setNotice('');
    setFeedback('');
    setMissHint(null);
    setTierNote(null);
    setLockedPrompt(null);
    setWrongCount(0);
  }

  // [3] 入口参数：/prompts/pokemon/ → /?prompt=pokemon 直接从这个词开局；存档页 → /?dive=117 回放当期
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const promptId = params.get('prompt');
    const diveNo = Number(params.get('dive'));
    if (promptId) {
      const target = PROMPTS.find(p => p.id === promptId);
      if (target) {
        const first: Round = { text: target.text, hint: target.hint, answers: target.answers, id: target.id };
        const rest = shuffle(PROMPTS.filter(p => p.id !== promptId)).slice(0, 6).map(p => ({ text: p.text, hint: p.hint, answers: p.answers, id: p.id }));
        setMode('practice');
        setRounds([first, ...rest]);
        setCurrent(0); setSeconds(25); setAnswer(''); setNotice(''); setFeedback('');
        setResults([]); setWrongCount(0); setMissHint(null); setTierNote(null); setLockedPrompt(null);
        setSink(0); setShake(0); setAir(3); setOutOfAir(false); setFinished(false); setStarted(true); setCopyState('idle');
        lockRef.current = false;
        return;
      }
    }
    if (Number.isFinite(diveNo) && diveNo > 0) {
      if (latestDive && diveNo === latestDive.dive) {
        startGame('replay');
      } else {
        setEntryNote(`Dive #${diveNo} is archived — replay Dive #${latestDive?.dive ?? '—'} or start a fresh practice dive.`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!started || finished) return;
    const id = window.setInterval(() => { if (!lockRef.current) setSeconds(s => Math.max(0, s - 1)); }, 1000);
    return () => window.clearInterval(id);
  }, [started, finished, current]);

  useEffect(() => {
    if (!started || finished || !currentPrompt || lockRef.current || seconds !== 0) return;
    lockRef.current = true;
    const nextAir = Math.max(0, air - 1);
    const result: RoundResult = { prompt: currentPrompt.text, answer: '', accepted: false, points: 0, timedOut: true };
    setShake(n => n + 1);
    window.setTimeout(() => {
      if (nextAir <= 0) {
        endDiveNow(result, 0);
      } else {
        setAir(nextAir);
        lockRef.current = false;
        moveNext(result);
      }
    }, 500);
  }, [seconds, started, finished, currentPrompt, air, moveNext]);

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
    setSink(0); setShake(0); setEntryNote(''); setAir(3); setOutOfAir(false); // [6] 重置舞台与氧气
  }

  function submitAnswer() {
    if (!started || !currentPrompt || lockRef.current || mode !== 'practice') return;
    const cleaned = normalizeAnswer(answer);
    if (!cleaned) { setNotice('Type an answer first.'); return; }
    const match = findAnswer(cleaned, currentPrompt.answers);
    if (!match) {
      const misses = wrongCount + 1;
      setWrongCount(misses);
      setShake(n => n + 1); // [4] 答错：面板抖动重播
      setTierNote(null);
      setMissHint({ count: currentPrompt.answers.length, slug: currentPrompt.id || '' });
      setNotice(misses === 1
        ? `Not in our ${currentPrompt.answers.length} accepted answers — keep typing, wrong guesses cost no air.`
        : `Still not in our ${currentPrompt.answers.length} accepted answers — keep typing.`);
      return;
    }
    lockRef.current = true;
    setNotice('');
    setMissHint(null);
    setLockedPrompt(null);
    const meta = TIERS.find(t => t.name === match.tier);
    setFeedback(`Correct — ${match.tier} · +${match.points} pts`);
    setSink(n => n + 1); // [5] 答对：潜水员下沉一格、背景变深一档
    if (match.points >= 100) setAir(a => Math.min(3, a + 1)); // [7] 100 分档还一罐氧气
    setTierNote(`${match.tier} is ${meta?.label?.toLowerCase()} — ${meta?.blurb || ''}`);
    const result: RoundResult = { prompt: currentPrompt.text, answer: answer.trim(), accepted: true, tier: match.tier, points: match.points };
    window.setTimeout(() => { lockRef.current = false; moveNext(result); }, 1500);
  }

  function passPrompt() {
    if (!started || !currentPrompt || lockRef.current || mode !== 'practice') return;
    lockRef.current = true;
    const nextAir = Math.max(0, air - 1);
    const result: RoundResult = { prompt: currentPrompt.text, answer: '', accepted: false, points: 0, passed: true };
    setShake(n => n + 1);
    window.setTimeout(() => {
      if (nextAir <= 0) {
        endDiveNow(result, 0);
      } else {
        setAir(nextAir);
        lockRef.current = false;
        moveNext(result);
      }
    }, 400);
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
        <section className="hero"><div className="eyebrow"><Waves size={15} /> INDEPENDENT PRACTICE MODE</div><h1>Krillion Unlimited</h1><p className="sub">No daily limit — play Krillion Unlimited unblocked in your browser, free and with no download. An original practice dive you can start whenever you like.</p></section>

        <section className="game" id="game" aria-label="Play the independent practice game">
          {!started && !finished ? <div className="intro-state"><div className="game-top"><span className="dive">PRACTICE DIVE</span><span>7 prompts · 25 seconds each</span></div><div className="intro-icon"><Waves size={30} /></div><h2>Ready to dive?</h2><p>{entryNote || 'Answer seven prompts — randomized practice questions, or a replay of the latest daily dive from the archive.'}</p><div className="intro-actions"><button className="btn" onClick={() => startGame('practice')}>Start practice dive <ArrowRight size={17} /></button>{latestDive ? <button className="btn ghost" onClick={() => startGame('replay')}>Replay Dive #{latestDive.dive}</button> : null}</div></div> : null}
          {started && currentPrompt ? <DiveStage depth={sink} total={rounds.length} shake={shake} flash={flash} outOfAir={outOfAir}>
            <div className="game-top"><span className="dive">{mode === 'replay' ? `DIVE #${latestDive?.dive} REPLAY` : 'PRACTICE DIVE'}</span><span>Prompt <strong>{current + 1}</strong> / {rounds.length}</span></div>
            <div className="progress"><span style={{ width: `${((current + 1) / rounds.length) * 100}%` }} /></div>
            {mode === 'practice' ? <div className={`air-bar${air <= 1 ? ' low' : ''}`} aria-label={`${air} of 3 air left`}>{Array.from({ length: 3 }, (_, i) => <span key={i} className={i < air ? 'on' : ''} aria-hidden="true" />)}<em>{air === 0 ? 'OUT OF AIR' : `${air} air`}</em></div> : null}
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
              <button className="pass-btn" type="button" onClick={passPrompt}>Pass · −1 air</button>
              {lockedPrompt ? <div className="locked-reveal" aria-live="polite"><p>Locked — here are all {lockedPrompt.answers.length} accepted answers for “{lockedPrompt.prompt}”.</p><ul>{[...lockedPrompt.answers].sort((a, b) => b.points - a.points).map(a => <li key={a.aliases[0]}>{a.aliases[0]} · {a.points}</li>)}</ul><button className="btn ghost" type="button" onClick={() => { const locked: RoundResult = { prompt: currentPrompt.text, answer: '', accepted: false, points: 0, lockedOut: true }; setLockedPrompt(null); lockRef.current = false; moveNext(locked); }}>Continue to next prompt <ArrowRight size={16} /></button></div> : null}
            </> : <>
              <div className="game-row"><button className="btn" type="button" onClick={nextPrompt}>Next prompt <ArrowRight size={17} /></button></div>
              <p className="feedback" aria-live="polite">Think of your answer, then open the hint or move on.</p>
            </>}
            <details className="hint-reveal"><summary>Reveal hint</summary><div className="hint"><strong>Hint:</strong> {currentPrompt.hint}</div></details>
            {mode === 'practice' ? <ul className="tiers">{TIERS.map(tier => <li key={tier.name}>{tier.name} · {tier.points}</li>)}</ul> : null}
          </DiveStage> : null}
                    {finished && mode === 'practice' ? <div className="results-state"><div className="game-top"><span className={`dive${outOfAir ? ' air-out' : ''}`}>{outOfAir ? 'OUT OF AIR' : 'DIVE COMPLETE'}</span><span>{results.length} / {rounds.length} prompts</span></div><div className="score-number">{score}<span> pts</span></div>{best ? <p className="best-pick">Best pick: {best.prompt} — {best.tier} (+{best.points} pts)</p> : null}<p className="depth">Estimated practice depth: {score * 10} m</p><p className="disclaimer">Practice score only. The answer list and tiers are our own data, not official Krillion scoring or player statistics.</p><div className="result-list">{results.map((item, index) => { const bank = rounds[index]?.answers ?? []; const mine = item.accepted && bank.length ? findAnswer(normalizeAnswer(item.answer), bank) : undefined; return <div key={`${item.prompt}-${index}`}><div className="result-row"><div><strong>{index + 1}. {item.prompt}</strong><p>{item.timedOut ? 'Time ran out · −1 air' : item.passed ? 'Passed · −1 air' : item.lockedOut ? 'Locked out after three misses' : item.accepted ? `Your answer: ${item.answer}` : 'No accepted answer'}</p></div><div className="result-points"><strong>{item.points}</strong><span>{item.tier ? `${item.tier} · ${tierLabel(item.tier)}` : 'No Echo'}</span></div></div>{bank.length ? <details className="answer-reveal"><summary>Reveal all answers</summary><ul>{[...bank].sort((a, b) => b.points - a.points).map(entry => <li key={entry.aliases[0]} className={entry === mine ? 'mine' : undefined}>{entry.aliases[0]} · {entry.points}</li>)}</ul></details> : null}</div>; })}</div><div className="intro-actions"><button className="btn" onClick={() => startGame('practice')}><RotateCcw size={16} /> Play another dive</button><button className="btn ghost" type="button" onClick={copyResult}>{copyState === 'ok' ? 'Copied!' : copyState === 'fail' ? 'Copy failed' : 'Copy result'}</button></div></div> : null}
          {finished && mode === 'replay' ? <div className="results-state"><div className="game-top"><span className="dive">REPLAY COMPLETE</span><span>{rounds.length} / {rounds.length} prompts</span></div><div className="score-number">{inTimeCount}<span> / {rounds.length} in time</span></div><p className="depth">Replay of Dive #{latestDive?.dive}</p><p className="disclaimer">Replay mode uses the archive&rsquo;s public prompts and hints only — there is no scoring in this mode.</p><div className="result-list">{results.map((item, index) => <div className="result-row" key={`${item.prompt}-${index}`}><div><strong>{index + 1}. {item.prompt}</strong><p>{item.timedOut ? 'Time ran out' : 'Answered in time'}</p></div></div>)}</div><div className="intro-actions"><button className="btn" onClick={() => startGame('replay')}><RotateCcw size={16} /> Replay again</button>{latestDive ? <a className="btn ghost" href={`/archive/dive-${latestDive.dive}/`}>Open Dive #{latestDive.dive} page <ArrowRight size={16} /></a> : null}</div></div> : null}
        </section>

        <nav className="quicklinks" aria-label="Explore more"><a href="#faq-section">Answers &amp; hints <ArrowRight size={15} /></a><a href="/prompts/">Prompt library <ArrowRight size={15} /></a><a href="/archive/">Practice archive <ArrowRight size={15} /></a></nav>

        <section className="content-section"><h2>How to play this practice dive</h2><p>Answer seven short, open-ended prompts. Each prompt has a 25-second timer. If your answer matches one of the accepted answers in the practice question bank, you earn its preset points. Wrong guesses cost no air — keep typing until the timer runs out. You start with three tanks of air: a timeout or a pass costs one, and a One in a Krillion answer gives one back. Empty all three and the dive ends. You can also replay the latest daily dive from the archive — same seven prompts, same timer, no scoring.</p><div className="steps-grid"><article><span>01</span><h3>Read the prompt</h3><p>Check the category carefully and think of a specific answer that fits.</p></article><article><span>02</span><h3>Submit one answer</h3><p>Exact and close matches are accepted — a leading “the” or “a” will not sink an answer.</p></article><article><span>03</span><h3>Review your score</h3><p>At the end, review your points and see which prompts you answered.</p></article></div>
          <h3 className="subheading">Practice scoring tiers</h3><div className="table-wrap"><table><thead><tr><th>Tier</th><th>Practice label</th><th>Points</th></tr></thead><tbody>{TIERS.map(tier => <tr key={tier.name}><td>{tier.name}</td><td>{tier.label}</td><td>{tier.points}</td></tr>)}</tbody></table></div>
        </section>

        <section className="content-section" id="archive-section"><h2>Practice archive</h2><p>Every dive we have logged is collected in the archive — each with its seven prompts, a hint for each one, a short note on what made that dive hard, and the official answer list once the day has passed. A new page is added every day.</p>{recentDives.length ? <ul className="recent-dives">{recentDives.map(d => <li key={d.dive}><a href={`/archive/dive-${d.dive}/`}>Dive #{d.dive} — {fmtDate(d.date)}</a></li>)}</ul> : null}<div className="archive-live"><strong>The archive is live</strong><a className="btn" href="/archive/">Browse all dives <ArrowRight size={16} /></a></div></section>
        <HomeSeo latestDive={latestDive} recentDives={recentDives} />
        <section className="content-section" id="faq-section"><h2>Frequently asked questions</h2>{faqs.map((f, n) => <details key={f.q} open={n === 0}><summary>{f.q}</summary><p>{f.a}</p></details>)}</section>
      </main>
      <SiteFooter />
    </>
  );
}
