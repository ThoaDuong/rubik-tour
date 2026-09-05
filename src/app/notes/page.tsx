'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ollCases } from '@/data/oll';
import { pllCases } from '@/data/pll';

const TwistyPlayer = dynamic(() => import('@/components/TwistyPlayer'), { ssr: false });

// All cases being learned
const learningCases = [
  ...ollCases.filter((c) => c.isLearning).map((c) => ({ ...c, type: 'OLL' as const })),
  ...pllCases.filter((c) => c.isLearning).map((c) => ({ ...c, type: 'PLL' as const })),
];

type LearningCase = (typeof learningCases)[0];

function NoteDetail({ case_ }: { case_: LearningCase }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(case_.alg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const youtubeRef = 'youtubeRef' in case_ ? case_.youtubeRef : undefined;
  const isOll = case_.type === 'OLL';
  const badgeClass = isOll
    ? 'bg-accent-blue/10 text-accent-blue'
    : 'bg-accent-purple/10 text-accent-purple';

  return (
    <div className="animate-fade-in max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div
          className={`inline-block text-[11px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-3 ${badgeClass}`}
        >
          {case_.type}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-1.5">
          {case_.name}
        </h2>
        <p className="text-text-secondary text-sm">{case_.description}</p>
      </div>

      {/* Cube + Alg previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
        {/* 2D preview */}
        <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 flex flex-col items-center gap-2 shadow-xs">
          <div className="text-xs text-text-muted font-semibold tracking-wider mb-1">
            2D TOP VIEW
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-border-subtle flex items-center justify-center h-[230px] w-full">
            <TwistyPlayer
              alg={case_.alg}
              experimentalSetupAnchor="end"
              visualization="2D"
              width="100%"
              height={210}
            />
          </div>
        </div>

        {/* 3D animated */}
        <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 flex flex-col items-center gap-2 shadow-xs">
          <div className="text-xs text-text-muted font-semibold tracking-wider mb-1">
            3D ANIMATION
          </div>
          <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-center h-[230px] w-full overflow-hidden">
            <TwistyPlayer
              alg={case_.alg}
              experimentalSetupAnchor="end"
              visualization="3D"
              controlPanel="bottom-row"
              width="100%"
              height={230}
              cameraDistance={5.8}
            />
          </div>
        </div>
      </div>

      {/* Algorithm Box */}
      <div className="bg-bg-card border border-border-subtle rounded-2xl p-5 mb-5 shadow-xs">
        <div className="text-xs text-text-muted font-semibold mb-2.5 uppercase tracking-wider">
          Algorithm
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopy}
            title="Click để copy"
            className="font-mono text-sm md:text-base font-semibold text-accent-cyan bg-slate-50 border border-border-subtle rounded-xl px-4 py-3 hover:border-accent-cyan hover:bg-accent-cyan/10 hover:text-sky-700 transition-all flex-1 text-left select-none break-all cursor-pointer"
          >
            {case_.alg}
          </button>
          <button
            onClick={handleCopy}
            className={`px-4 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 border ${
              copied
                ? 'bg-accent-green/10 text-accent-green border-accent-green/30 shadow-xs'
                : 'bg-white text-text-secondary border-border-subtle hover:text-accent-green hover:border-accent-green/30 hover:bg-accent-green/10'
            }`}
          >
            {copied ? '✓ Đã copy' : '⎘ Copy'}
          </button>
        </div>
      </div>

      {/* References */}
      {youtubeRef && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 shadow-xs">
          <span className="text-xl text-red-500">▶</span>
          <div>
            <div className="text-xs text-text-muted font-semibold">Học từ YouTube</div>
            <a
              href={youtubeRef}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 text-xs font-bold transition-colors"
            >
              JPerm — OLL Tutorial →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NotesPage() {
  const [selected, setSelected] = useState<LearningCase>(learningCases[0]);
  const [filter, setFilter] = useState<'all' | 'OLL' | 'PLL'>('all');

  const visible = learningCases.filter((c) => filter === 'all' || c.type === filter);

  return (
    <div className="flex flex-col md:flex-row min-h-screen animate-fade-in">
      {/* Notes sidebar */}
      <div className="w-full md:w-64 bg-bg-secondary border-b md:border-b-0 md:border-r border-border-subtle flex flex-col shrink-0">
        {/* Header */}
        <div className="p-5 pb-4 border-b border-border-subtle">
          <div className="text-xs font-bold text-text-primary mb-3">
            ⭐ Đang học ({learningCases.length})
          </div>
          {/* Filter tabs */}
          <div className="flex gap-1.5">
            {(['all', 'OLL', 'PLL'] as const).map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer border transition-all duration-150 ${
                    isActive
                      ? 'border-accent-blue bg-accent-blue/10 text-accent-blue shadow-xs'
                      : 'border-border-subtle bg-white text-text-muted hover:text-text-primary hover:border-accent-blue'
                  }`}
                >
                  {f === 'all' ? 'Tất cả' : f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Case list */}
        <div className="flex-1 overflow-y-auto p-2">
          {visible.map((c) => {
            const isSelected = selected.id === c.id;
            const isOll = c.type === 'OLL';
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left px-3 py-2.5 rounded-xl border-none cursor-pointer mb-1 transition-all duration-150 ${
                  isSelected
                    ? 'bg-accent-blue/10 text-accent-blue shadow-xs'
                    : 'bg-transparent text-text-primary hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      isOll
                        ? 'bg-accent-blue/15 text-accent-blue'
                        : 'bg-accent-purple/15 text-accent-purple'
                    }`}
                  >
                    {c.type}
                  </span>
                  <span className={isSelected ? 'text-accent-blue' : 'text-text-primary'}>
                    {c.name}
                  </span>
                </div>
                <div className="text-[11px] text-text-muted font-mono mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {c.alg}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main detail */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-bg-primary">
        {selected && <NoteDetail case_={selected} />}
      </div>
    </div>
  );
}
