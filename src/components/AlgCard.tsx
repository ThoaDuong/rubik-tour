'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { OllCase } from '@/data/oll';
import { PllCase } from '@/data/pll';
import { CrossCase } from '@/data/cross';
import { F2lCase } from '@/data/f2l';
import { useLearningStatus } from '@/hooks/useLearningStatus';
import {
  StarIconSolid,
  CheckIcon,
  CheckIconSolid,
  ClipboardDocumentIcon,
} from '@/components/Icons';

const TwistyPlayer = dynamic(() => import('./TwistyPlayer'), { ssr: false });

interface AlgCardProps {
  case_: OllCase | PllCase | CrossCase | F2lCase;
  type?: 'oll' | 'pll' | 'cross' | 'f2l';
}

export default function AlgCard({ case_, type = 'oll' }: AlgCardProps) {
  const [copied, setCopied] = useState(false);
  const { getStatus, toggleLearning, toggleLearned } = useLearningStatus();

  const status = getStatus(case_.id);
  const isLearning = status === 'learning';
  const isLearned = status === 'learned';

  const handleCopy = async () => {
    if (!case_.alg) return;
    await navigator.clipboard.writeText(case_.alg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOll = type === 'oll';
  const isPll = type === 'pll';
  const isCross = type === 'cross';
  // f2l is the remaining type

  let groupBadgeClass = 'bg-accent-blue/10 text-accent-blue'; // oll default
  if (isPll) groupBadgeClass = 'bg-accent-purple/10 text-accent-purple';
  else if (isCross) groupBadgeClass = 'bg-emerald-500/10 text-emerald-600';
  else if (!isOll) groupBadgeClass = 'bg-orange-500/10 text-orange-600'; // f2l

  // Dynamic card border & background based on status
  let cardBorderClass =
    'border border-border-subtle hover:border-accent-blue hover:shadow-lg hover:shadow-accent-blue/5 hover:-translate-y-0.5 shadow-xs';
  if (isLearning) {
    cardBorderClass =
      'border-2 border-amber-400 ring-2 ring-amber-400/20 shadow-md shadow-amber-400/5 hover:-translate-y-0.5 bg-amber-500/[0.015]';
  } else if (isLearned) {
    cardBorderClass =
      'border-2 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md shadow-emerald-500/5 hover:-translate-y-0.5 bg-emerald-500/[0.015]';
  }

  return (
    <div
      className={`bg-bg-card rounded-2xl p-5 transition-all duration-200 flex flex-col gap-3.5 animate-fade-in ${cardBorderClass}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-base font-bold text-text-primary flex items-center gap-1.5 flex-wrap">
            {isLearning && (
              <StarIconSolid
                title="Đang học"
                className="w-4 h-4 text-amber-500 shrink-0 animate-pulse"
              />
            )}
            {isLearned && (
              <span
                title="Đã thuộc"
                className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white shrink-0 shadow-xs"
              >
                <CheckIconSolid className="w-2.5 h-2.5" />
              </span>
            )}
            <span className="truncate">{case_.name}</span>
          </div>
          <div className="text-xs text-text-secondary mt-0.5">{case_.description}</div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${groupBadgeClass}`}
          >
            {type.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Cube preview - animated 3D player by default */}
      <div className="flex items-center justify-center bg-slate-900 rounded-xl p-3 border border-slate-800 transition-all duration-200 overflow-hidden h-[230px]">
        <TwistyPlayer
          alg={case_.alg || ''}
          experimentalSetupAnchor="end"
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
          className={`p-2 rounded-lg text-sm flex items-center justify-center border border-border-subtle transition-all cursor-pointer ${
            copied
              ? 'text-accent-green bg-accent-green/10 border-accent-green/30 shadow-xs'
              : 'text-text-muted bg-white hover:text-accent-green hover:bg-accent-green/10 hover:border-accent-green/30'
          }`}
          onClick={handleCopy}
          title={copied ? 'Đã copy!' : 'Copy'}
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 text-emerald-600 stroke-2" />
          ) : (
            <ClipboardDocumentIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Footer: Learning toggle buttons */}
      <div className="flex items-center justify-between gap-2 flex-wrap pt-1 min-h-[30px]">
        <div className="flex items-center gap-2">
          {/* Status buttons: [ ⭐ Đang học ] [ ✓ Đã thuộc ] */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80">
            <button
              onClick={() => toggleLearning(case_.id)}
              title={isLearning ? 'Bỏ trạng thái đang học' : 'Đánh dấu đang học (Viền vàng)'}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isLearning
                  ? 'bg-amber-400 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-amber-700 hover:bg-white'
              }`}
            >
              <StarIconSolid
                className={`w-3.5 h-3.5 shrink-0 ${
                  isLearning ? 'text-slate-900' : 'text-amber-500'
                }`}
              />
              <span>Đang học</span>
            </button>
            <button
              onClick={() => toggleLearned(case_.id)}
              title={isLearned ? 'Bỏ trạng thái đã thuộc' : 'Đánh dấu đã thuộc (Viền xanh)'}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isLearned
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white'
              }`}
            >
              <CheckIconSolid
                className={`w-3.5 h-3.5 shrink-0 ${
                  isLearned ? 'text-white' : 'text-emerald-600'
                }`}
              />
              <span>Đã thuộc</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
