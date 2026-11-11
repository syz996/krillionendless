"use client";
import { type ReactNode } from 'react';

function Diver() {
  return (
    <svg viewBox="0 0 44 64" xmlns="http://www.w3.org/2000/svg">
      {/* 呼吸管 */}
      <path d="M31 10 q7 -4 5 -9" fill="none" stroke="#9fb3c4" strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="1.6" r="1.7" fill="#cfd8e3" />
      <g className="diver__body">
        {/* 气瓶（背后） */}
        <rect x="9.5" y="20" width="6.2" height="17" rx="3" fill="#c9553a" stroke="#7b2f20" strokeWidth="1" />
        <rect x="11.6" y="17.6" width="2.2" height="3.4" rx=".8" fill="#cfd8e3" />
        <rect x="11" y="22.5" width="1.5" height="11" rx=".7" fill="#e8836a" opacity=".75" />
        {/* 左手 */}
        <path d="M17 25 q-7 3 -9.6 9" fill="none" stroke="#20527a" strokeWidth="4" strokeLinecap="round" />
        <circle cx="6.6" cy="35.4" r="2.1" fill="#f0b98d" stroke="#c98f63" strokeWidth=".8" />
        {/* 腿 */}
        <g className="diver__leg diver__leg--back">
          <path d="M20.4 38 L18 50" fill="none" stroke="#143a52" strokeWidth="4.6" strokeLinecap="round" />
          <path d="M18 49.4 q-5 2.2 -7 5.2 q4 1.8 8.2 .4 z" fill="#ff8a5c" stroke="#c25f37" strokeWidth=".8" />
        </g>
        <g className="diver__leg diver__leg--front">
          <path d="M24 38 L26.4 49" fill="none" stroke="#1b4a66" strokeWidth="4.6" strokeLinecap="round" />
          <path d="M26.2 48.4 q5 1.8 7.6 4.8 q-4 1.8 -8.2 .6 z" fill="#ffa073" stroke="#c25f37" strokeWidth=".8" />
        </g>
        {/* 躯干 */}
        <path d="M17 21 q5 -2.4 10 0 l2.6 15.4 q-7.6 3 -15.2 0 z" fill="#1b4a66" stroke="#0a2434" strokeWidth="1.1" />
        <path d="M19 23 q3 -1.6 6 0 l1.4 11.2 q-4.4 1.6 -8.8 0 z" fill="#2f7196" opacity=".55" />
        <rect x="18.4" y="32.6" width="9" height="2.6" rx="1.2" fill="#ffd166" opacity=".92" />
        {/* 右手 */}
        <path d="M27 24 q7 2.4 9.6 8.4" fill="none" stroke="#1b4a66" strokeWidth="4" strokeLinecap="round" />
        <circle cx="37.2" cy="33.2" r="2.1" fill="#f0b98d" stroke="#c98f63" strokeWidth=".8" />
        {/* 头套 + 面镜 */}
        <path d="M14 13.4 q2 -10.4 8.2 -10.4 q7 0 9 10.4 q-8.2 -3 -17.2 0 z" fill="#16394f" stroke="#0a2434" strokeWidth="1" />
        <rect x="14.4" y="11" width="16.4" height="9.2" rx="3.6" fill="#0c2637" stroke="#061622" strokeWidth="1.1" />
        <rect x="16.4" y="12.6" width="6.4 h="5.8" rx="2" fill="#7fdcf7" opacity=".82" />
        <rect x="23.6" y="12.6" width="5.4" height="5.8" rx="2" fill="#5cc6e8" opacity=".7" />
        <path d="M17.6 14.4 h2.6" stroke="#eBEEFF" strokeWidth="1.1" strokeLinecap="round" opacity=".8" />
        <circle cx="15.2" cy="15.6" r="1.6" fill="#cfd8e3" stroke="#8fa2b3" strokeWidth=".7" />
        {/* 嘴 + 面颊 */}
        <ellipse cx="22.6" cy="22.6" rx="2.6" ry="1.6" fill="#f0b98d" />
        <path d="M21.2 22.4 q1.6 1.2 3.2 0" fill="none" stroke="#b9795a" strokeWidth=".9" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function Fish({ variant }: { variant: 'a' | 'b' | 'c' }) {
  const palette = {
    a: { body: '#4fd9c6', fin: '#2aa898', dark: '#0b5d57' },
    b: { body: '#ffd166', fin: '#d9a53e', dark: '#8a5f12' },
    c: { body: '#9fd4ee', fin: '#6da6c4', dark: '#2f5b73' },
  }[variant];
  return (
    <svg viewBox="0 0 48 24" xmlns="http://www.w3.org/2000/svg">
      <path className="fish__tail" d="M3 12 q5 -6.6 9.6 -3.4 L9.6 12 l3 3.4 Q7.6 18.6 3 12 z" fill={palette.fin} stroke={palette.dark} strokeWidth=".9" />
      <path d="M12 12 q0 -7 9.4 -7.4 q10 -.4 13.6 7.4 q-3.6 7.8 -13.6 7.4 Q12 19 12 12 z" fill={palette.body} stroke={palette.dark} strokeWidth="1.1" />
      <path d="M16 6.4 q5.4 -3.4 9.4 -2.6 q-1 1.8 -3.4 2.6 z" fill={palette.fin} stroke={palette.dark} strokeWidth=".8" />
      <path d="M18 17.4 q6 2.6 11 1 q-4 2.8 -11 -1 z" fill={palette.fin} opacity=".8" />
      <path d="M23 8 q2.6 4 0 8" fill="none" stroke={palette.dark} strokeWidth=".9" opacity=".6" />
      <path d="M15 9.4 q6 -2 11 0" fill="none" stroke="#ffffff" strokeWidth="1.4" opacity=".35" strokeLinecap="round" />
      <circle cx="31.6" cy="10.6" r="2.5" fill="#0a1f2e" />
      <circle cx="32.4" cy="9.8" r=".9" fill="#ffffff" opacity=".9" />
      <circle cx="31.2" cy="11.4" r=".5" fill="#ffffff" opacity=".55" />
      <path d="M36.4 13 q1.6 1 0 2" fill="none" stroke={palette.dark} strokeWidth=".8" opacity=".7" />
    </svg>
  );
}

export default function DiveStage({ depth, total, shake, air = 3, flash, outOfAir = false, children }: {
  depth: number; total: number; shake: number; air?: number;
  flash?: 'ok' | 'no' | null; outOfAir?: boolean; children: ReactNode;
}) {
  const d = Math.min(6, depth);
  const lowAir = air <= 1 && !outOfAir;
  return (
    <div
      className={`stage stage--d${d}${outOfAir ? ' stage--out' : ''}${lowAir ? ' stage--low-air' : ''}${flash ? ` stage--flash-${flash}` : ''}`}
    >
      <div className="stage__ray" aria-hidden="true" />
      <div className="stage__water" aria-hidden="true" />
      <div className="stage__surface" aria-hidden="true" />
      <div className="stage__ruler" aria-hidden="true">
        {[0, 100, 200, 300].map(m => <span key={m} style={{ top: `${(m / 300) * 100}%` }}>{m}m</span>)}
      </div>
      <div className="stage__seabed" aria-hidden="true" />
      <div className="stage__fish stage__fish--a"><Fish variant="a" /></div>
      <div className="stage__fish stage__fish--b"><Fish variant="b" /></div>
      <div className="stage__fish stage__fish--c"><Fish variant="c" /></div>
      <div className="stage__coral" aria-hidden="true" />
      <div className="stage__silt" aria-hidden="true" />
      <div className="stage__motes" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <i key={i} style={{ left: `${7 + i * 9}%`, animationDelay: `${i * 0.7}s` }} />
        ))}
      </div>
      <div className="stage__rail" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => <span key={i} className={i < depth ? 'on' : ''} />)}
      </div>
      <div
        className="stage__diver"
        style={{ top: `${10 + (Math.min(depth, total) / Math.max(1, total)) * 66}%` }}
        aria-hidden="true"
      >
        <div className="diver__swim"><Diver /></div>
        <span className="stage__bub" /><span className="stage__bub stage__bub--2" />
      </div>
      <div className="stage__panel" key={shake}>{children}</div>
    </div>
  );
}
