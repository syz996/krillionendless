'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, Waves } from 'lucide-react';
import { normalizeAnswer, PROMPTS, TIERS } from '../lib/prompts';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

type RoundResult = { prompt: string; answer: string; accepted: boolean; tier?: string; points: number; timedOut?: boolean };

function shuffle<T,>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function HomePage() {
  const [rounds, setRounds] = useState(() => shuffle(PROMPTS).slice(0, 7));
  const [current, setCurrent] = useState(0);
  const [seconds, setSeconds] = useState(25);
  const [answer, setAnswer] = useState('');
  const [notice, setNotice] = useState('');
  const [feedback, setFeedback] = useState('');
  const [results, setResults] = useState<RoundResult[]>([]);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lockRef = useRef(false);
  const currentPrompt = rounds[current];
  const score = useMemo(() => results.reduce((sum, item) => sum + item.points, 0), [results]);

  const moveNext = useCallback((result: RoundResult) => {
    setResults(prev => [...prev, result]);
    setNotice('');
    setFeedback('');
    setAnswer('');
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
    const id = window.setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
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

  function startGame() {
    setRounds(shuffle(PROMPTS).slice(0, 7));
    setCurrent(0); setSeconds(25); setAnswer(''); setNotice(''); setFeedback(''); setResults([]); setFinished(false); setStarted(true); lockRef.current = false;
  }

  function submitAnswer() {
    if (!started || !currentPrompt || lockRef.current) return;
    const cleaned = normalizeAnswer(answer);
    if (!cleaned) { setNotice('Type an answer first.'); return; }
    const match = currentPrompt.answers.find(entry => entry.aliases.some(alias => normalizeAnswer(alias) === cleaned));
    if (!match) {
      setNotice('Not in this demo answer list. Try another answer while time remains.');
      return;
    }
    lockRef.current = true;
    setNotice('');
    setFeedback(`Correct — ${match.tier} · +${match.points} pts`);
    const result: RoundResult = { prompt: currentPrompt.text, answer: answer.trim(), accepted: true, tier: match.tier, points: match.points };
    window.setTimeout(() => { lockRef.current = false; moveNext(result); }, 700);
  }

  return (
    <>
      <SiteHeader />
      <main className="wrap" id="top">
        <section className="hero"><div className="eyebrow"><Waves size={15} /> INDEPENDENT PRACTICE MODE</div><h1>Krillion Unlimited</h1><p className="sub">No daily limit — play an original practice dive whenever you like.</p></section>
        <div className="ad-slot" aria-label="Reserved advertising placement">Advertisement</div>

        <section className="game" id="game" aria-label="Play the independent practice game">
          {!started && !finished ? <div className="intro-state"><div className="game-top"><span className="dive">PRACTICE DIVE</span><span>7 prompts · 25 seconds each</span></div><div className="intro-icon"><Waves size={30} /></div><h2>Ready to dive?</h2><p>Answer seven original prompts. Accepted answers receive demo points from our hand-curated practice list.</p><button className="btn" onClick={startGame}>Start dive <ArrowRight size={17} /></button></div> : null}
          {started && currentPrompt ? <>
            <div className="game-top"><span className="dive">Practice Dive #{current + 1}</span><span>Prompt <strong>{current + 1}</strong> / {rounds.length}</span></div>
            <div className="progress"><span style={{ width: `${((current + 1) / rounds.length) * 100}%` }} /></div>
            <p className="prompt">{currentPrompt.text}</p>
            <div className={`timer ${seconds <= 7 ? 'urgent' : ''}`} aria-live="polite">{seconds}</div>
            <form className="game-row" onSubmit={e => { e.preventDefault(); submitAnswer(); }}>
              <input ref={inputRef} value={answer} onChange={e => { setAnswer(e.target.value); setNotice(''); }} placeholder="Type your answer…" autoComplete="off" aria-label="Your answer" />
              <button className="btn" type="submit">Submit</button>
            </form>
            <p className="feedback" aria-live="polite">{feedback || ' '}</p>
            <p className={`notice ${notice ? 'visible' : ''}`} aria-live="polite">{notice || ' '}</p>
            <div className="hint"><strong>Hint:</strong> {currentPrompt.hint}</div>
            <ul className="tiers">{TIERS.map(tier => <li key={tier.name}>{tier.name} · {tier.points}</li>)}</ul>
          </> : null}
          {finished ? <div className="results-state"><div className="game-top"><span className="dive">DIVE COMPLETE</span><span>7 / 7 prompts</span></div><div className="score-number">{score}<span> pts</span></div><p className="depth">Estimated practice depth: {score * 10} m</p><p className="disclaimer">Practice score only. The answer list and tiers are original demo data, not official Krillion scoring or player statistics.</p><div className="result-list">{results.map((item, index) => <div className="result-row" key={`${item.prompt}-${index}`}><div><strong>{index + 1}. {item.prompt}</strong><p>{item.timedOut ? 'Time ran out' : item.accepted ? `Your answer: ${item.answer}` : 'No accepted answer'}</p></div><div className="result-points"><strong>{item.points}</strong><span>{item.tier || 'No Echo'}</span></div></div>)}</div><button className="btn" onClick={startGame}><RotateCcw size={16} /> Play another dive</button></div> : null}
        </section>

        <nav className="quicklinks" aria-label="Explore more"><a href="#faq-section">Answers &amp; hints <ArrowRight size={15} /></a><a href="/archive/">Practice archive <ArrowRight size={15} /></a><a href="#planned-pages">Geography pack <ArrowRight size={15} /></a><a href="#planned-pages">Games like Krillion <ArrowRight size={15} /></a></nav>
        <div className="ad-slot">Advertisement</div>

        <section className="content-section"><h2>How to play this practice dive</h2><p>Answer seven short, open-ended prompts. Each prompt has a 25-second timer. If your answer matches one of the accepted aliases in this prototype’s question bank, you earn its preset demo score. If it does not match, you can try again before time runs out.</p><div className="steps-grid"><article><span>01</span><h3>Read the prompt</h3><p>Check the category carefully and think of a specific answer that fits.</p></article><article><span>02</span><h3>Submit one answer</h3><p>Accepted spelling variants are supported for a small number of answers.</p></article><article><span>03</span><h3>Review your score</h3><p>At the end, review your points and see which prompts you answered.</p></article></div>
          <h3 className="subheading">Practice scoring tiers</h3><div className="table-wrap"><table><thead><tr><th>Tier</th><th>Practice label</th><th>Points</th></tr></thead><tbody>{TIERS.map(tier => <tr key={tier.name}><td>{tier.name}</td><td>{tier.points >= 85 ? 'Less obvious demo answer' : tier.points >= 30 ? 'Specific demo answer' : 'Common demo answer'}</td><td>{tier.points}</td></tr>)}</tbody></table></div><p className="small-note">These points are manually assigned to this prototype’s sample answers for testing gameplay. They are not calculated from real player submissions.</p>
        </section>

        <section className="content-section" id="archive-section"><h2>Practice archive</h2><p>Every dive we have logged is collected in the archive — each with its seven prompts, a hint for each one, and a short note on what made that dive hard. A new page is added every day.</p><div className="archive-live"><strong>The archive is live</strong><a className="btn" href="/archive/">Browse all dives <ArrowRight size={16} /></a></div></section>
        <section className="content-section" id="faq-section"><h2>Frequently asked questions</h2><details open><summary>Is this the official Krillion game?</summary><p>No. This is an independent prototype for practice and experimentation. It is not affiliated with or endorsed by the operator of the official game.</p></details><details><summary>Are these official answers or rarity scores?</summary><p>No. This starter version uses an original sample question bank and manually assigned demo tiers. It does not use official answer data or live player-frequency data.</p></details><details><summary>Why might my correct answer be rejected?</summary><p>This is a small demo list, not a complete knowledge database. A factually valid answer can be missing until the answer bank and its accepted aliases are reviewed and expanded.</p></details><details><summary>Can I replay it?</summary><p>Yes. Select “Play another dive” after the results screen to start another randomized practice round.</p></details><details><summary>Does this site store my answers?</summary><p>This prototype checks answers in your browser and does not send them to a server. Analytics, ads, or accounts should only be added with a matching privacy notice.</p></details><details><summary>Is it free?</summary><p>Yes — free to play, no account, no download. The site is supported by ads, nothing else.</p></details><details><summary>When does the official daily dive reset?</summary><p>At midnight New York time — that is when the official board flips to a new dive. Our archive adds each dive’s page the same day, so you can cross-check against the <a href="/archive/">archive</a>.</p></details><details><summary>Can I share my result?</summary><p>Yes. After a dive, copy the result line and paste it anywhere — it lists your answers and your score without spoiling the prompts.</p></details></section>
        <section className="content-section" id="planned-pages"><h2>More practice pages</h2><p>Answer guides, historical dives, themed packs, and similar-game pages are planned, but are not implemented in this homepage MVP yet.</p></section>
        <div className="ad-slot">Advertisement</div>
      </main>
      <SiteFooter />
    </>
  );
}
