'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { OllCase } from '@/data/oll';
import { PllCase } from '@/data/pll';

const TwistyPlayer = dynamic(() => import('./TwistyPlayer'), { ssr: false });

interface AlgCardProps {
  case_: OllCase | PllCase;
  type?: 'oll' | 'pll';
}

export default function AlgCard({ case_, type = 'oll' }: AlgCardProps) {
  const [copied, setCopied] = useState(false);
  const [showAnim, setShowAnim] = useState(false);

  const handleCopy = async () => {
    if (!case_.alg) return;
    await navigator.clipboard.writeText(case_.alg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOll = type === 'oll';
  const groupBadgeClass = isOll
    ? 'bg-accent-blue/15 text-accent-blue'
    : 'bg-accent-purple/15 text-accent-purple';

  const animateBtnBorder = isOll ? 'border-accent-blue text-accent-blue' : 'border-accent-purple text-accent-purple';

  const youtubeRef = 'youtubeRef' in case_ ? case_.youtubeRef : undefined;
  const isLearning = case_.isLearning;

  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-5 hover:border-border-active hover:shadow-[0_0_20px_rgba(79,90,255,0.25)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3.5 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-base font-bold text-text-primary flex items-center gap-1.5">
            {isLearning && <span title="Đang học" className="text-sm">⭐</span>}
            {case_.name}
          </div>
          <div className="text-xs text-text-muted mt-0.5">{case_.description}</div>
        </div>
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase ${groupBadgeClass}`}>
          {type.toUpperCase()}
        </span>
      </div>

      {/* Cube preview */}
      <div className="flex items-center justify-center bg-bg-primary rounded-xl p-3 border border-border-subtle min-h-[140px]">
        <TwistyPlayer
          alg={case_.alg || ''}
          visualization="3D"
          width={160}
          height={130}
          controlPanel={showAnim ? 'bottom-row' : 'none'}
          hintFacelets="floating"
        />
      </div>

      {/* Alg text - clickable to copy */}
      <div className="flex items-center gap-2">
        <button
          className="font-mono text-xs text-accent-cyan bg-bg-primary border border-border-subtle rounded-lg px-3 py-2 hover:border-accent-cyan hover:bg-accent-cyan/15 hover:text-cyan-300 transition-all flex-1 text-left select-none break-all cursor-pointer"
          onClick={handleCopy}
          title="Click để copy"
        >
          {case_.alg || '—'}
        </button>
        <button
          className={`p-2 rounded-lg text-sm flex items-center gap-1 border border-border-subtle transition-all cursor-pointer ${
            copied
              ? 'text-accent-green bg-accent-green/15 border-accent-green/30'
              : 'text-text-muted bg-bg-primary hover:text-accent-green hover:bg-accent-green/15 hover:border-accent-green/30'
          }`}
          onClick={handleCopy}
          title={copied ? 'Đã copy!' : 'Copy'}
        >
          {copied ? '✓' : '⎘'}
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 flex-wrap pt-1">
        {'probability' in case_ && (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-accent-cyan/15 text-accent-cyan">
            P: {(case_ as PllCase).probability}
          </span>
        )}
        <button
          onClick={() => setShowAnim((v) => !v)}
          className={`rounded-full text-[11px] font-semibold px-2.5 py-0.5 border cursor-pointer transition-all duration-200 bg-transparent hover:bg-white/5 ${animateBtnBorder}`}
        >
          {showAnim ? '◀ Sơ đồ tĩnh' : '▶ Animate'}
        </button>
        {youtubeRef && (
          <a
            href={youtubeRef}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 text-[11px] font-semibold flex items-center gap-1 transition-colors ml-auto"
          >
            ▶ YouTube
          </a>
        )}
      </div>
    </div>
  );
}
