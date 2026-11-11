"use client";
import { type ReactNode } from 'react';

export default function DiveStage({ depth, total, shake, children }: {
  depth: number; total: number; shake: number; children: ReactNode;
}) {
  const d = Math.min(6, depth);
  return (
    <div className={`stage stage--d${d}`}>
      <div className="stage__ray" aria-hidden="true" />
      <div className="stage__water" aria-hidden="true" />
      <div className="stage__surface" aria-hidden="true" />
      <div className="stage__ruler" aria-hidden="true">
        {[0, 100, 200, 300].map(m => <span key={m} style={{ top: `${(m / 300) * 100}%` }}>{m}m</span>)}
      </div>
      <div className="stage__fish stage__fish--a" aria-hidden="true" />
      <div className="stage__fish stage__fish--b" aria-hidden="true" />
      <div className="stage__fish stage__fish--c" aria-hidden="true" />
      <div className="stage__coral" aria-hidden="true" />
      <div className="stage__silt" aria-hidden="true" />
      <div className="stage__motes" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => <i key={i} style={{ left: `${7 + i * 9}%`, animationDelay: `${i * 0.7}s` }} />)}
      </div>
      <div className="stage__rail" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => <span key={i} className={i < depth ? 'on' : ''} />)}
      </div>
      <div className="stage__diver" style={{ top: `${10 + (d / Math.max(1, total)) * 66}%` }} aria-hidden="true">
        <svg viewBox="0 0 24 32" width="34" height="45" shapeRendering="crispEdges">
          <rect x="11" y="6" width="2" height="2" fill="#8fe3ff" />
          <rect x="6" y="8" width="12" height="8" fill="#ffd166" />
          <rect x="8" y="10" width="8" height="4" fill="#0b3550" />
          <rect x="9" y="11" width="2" height="2" fill="#bff4ff" />
          <rect x="13" y="11" width="2" height="2" fill="#bff4ff" />
          <rect x="4" y="9" width="2" height="6" fill="#c9553a" />
          <rect x="5" y="10" width="1" height="4" fill="#8a3524" />
          <rect x="8" y="16" width="8" height="8" fill="#28d9c8" />
          <rect x="10" y="17" width="4" height="6" fill="#1aa99c" />
          <rect x="15" y="17" width="3" height="2" fill="#ffd166" />
          <rect x="7" y="20" width="2" height="2" fill="#ffd166" />
          <rect x="9" y="24" width="3" height="4" fill="#0f5f86" />
          <rect x="12" y="24" width="3" height="4" fill="#0f5f86" />
          <rect x="7" y="27" width="5" height="2" fill="#ff8a5c" />
          <rect x="12" y="27" width="5" height="2" fill="#ff8a5c" />
        </svg>
        <span className="stage__bub" /><span className="stage__bub stage__bub--2" />
      </div>
      <div className="stage__panel" key={shake}>{children}</div>
    </div>
  );
}
