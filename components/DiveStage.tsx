"use client";
import { type ReactNode } from 'react';

export default function DiveStage({ depth, total, shake, children }: {
  depth: number; total: number; shake: number; children: ReactNode;
}) {
  return (
    <div className={`stage stage--d${Math.min(6, depth)}`}>
      <div className="stage__water" aria-hidden="true" />
      <div className="stage__silt" aria-hidden="true" />
      <div className="stage__fish stage__fish--a" aria-hidden="true" />
      <div className="stage__fish stage__fish--b" aria-hidden="true" />
      <div className="stage__rail" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => <span key={i} className={i < depth ? 'on' : ''} />)}
      </div>
      <div className="stage__diver" style={{ top: `${10 + (Math.min(6, depth) / Math.max(1, total)) * 66}%` }} aria-hidden="true">
        <svg viewBox="0 0 24 32" width="34" height="45">
          <circle cx="12" cy="8" r="5" fill="#ffd166" />
          <rect x="9" y="13" width="6" height="12" rx="3" fill="#28d9c8" />
          <rect x="6" y="26" width="4" height="6" rx="2" fill="#ff8a5c" />
          <rect x="14" y="26" width="4" height="6" rx="2" fill="#ff8a5c" />
        </svg>
        <span className="stage__bub" /><span className="stage__bub stage__bub--2" />
      </div>
      <div className="stage__panel" key={shake}>{children}</div>
    </div>
  );
}
