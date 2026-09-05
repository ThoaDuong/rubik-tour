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

  const handleCopy = async () => {
    if (!case_.alg) return;
    await navigator.clipboard.writeText(case_.alg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOll = type === 'oll';
  const groupBadgeClass = isOll
    ? 'bg-accent-blue/10 text-accent-blue'
    : 'bg-accent-purple/10 text-accent-purple';

  const youtubeRef = 'youtubeRef' in case_ ? case_.youtubeRef : undefined;
  const isLearning = case_.isLearning;

  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-5 hover:border-accent-blue hover:shadow-lg hover:shadow-accent-blue/5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3.5 animate-fade-in shadow-xs">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-base font-bold text-text-primary flex items-center gap-1.5">
            {isLearning && <span title="Đang học" className="text-sm">⭐</span>}
            {case_.name}
          </div>
          <div className="text-xs text-text-secondary mt-0.5">{case_.description}</div>
        </div>
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase ${groupBadgeClass}`}>
          {type.toUpperCase()}
        </span>
      </div>

      {/* Cube preview - animated 3D player by default */}
      <div className="flex items-center justify-center bg-slate-900 rounded-xl p-3 border border-slate-800 transition-all duration-200 overflow-hidden h-[230px]">
        <TwistyPlayer
          alg={case_.alg || ''}
          visualization="3D"
          width="100%"
          height={230}
          controlPanel="bottom-row"
          hintFacelets="floating"
          cameraDistance={5.8}
        />
      </div>

      {/* Alg text - clickable to copy */}
      <div className="flex items-center gap-2">
        <button
          className="font-mono text-xs font-semibold text-accent-cyan bg-slate-50 border border-border-subtle rounded-lg px-3 py-2 hover:border-accent-cyan hover:bg-accent-cyan/10 hover:text-sky-700 transition-all flex-1 text-left select-none break-all cursor-pointer"
          onClick={handleCopy}
          title="Click để copy"
        >
          {case_.alg || '—'}
        </button>
        <button
          className={`p-2 rounded-lg text-sm flex items-center gap-1 border border-border-subtle transition-all cursor-pointer ${
            copied
              ? 'text-accent-green bg-accent-green/10 border-accent-green/30 shadow-xs'
              : 'text-text-muted bg-white hover:text-accent-green hover:bg-accent-green/10 hover:border-accent-green/30'
          }`}
          onClick={handleCopy}
          title={copied ? 'Đã copy!' : 'Copy'}
        >
          {copied ? '✓' : '⎘'}
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 flex-wrap pt-1 min-h-[26px]">
        {'probability' in case_ && (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-accent-cyan/10 text-accent-cyan">
            P: {(case_ as PllCase).probability}
          </span>
        )}
        {youtubeRef && (
          <a
            href={youtubeRef}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-600 text-[11px] font-semibold flex items-center gap-1 transition-colors ml-auto"
          >
            ▶ YouTube
          </a>
        )}
      </div>
    </div>
  );
}
