'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ollCases, OLL_GROUPS } from '@/data/oll';
import { useLearningStatus } from '@/hooks/useLearningStatus';
import { StarIconSolid, CheckIconSolid } from '@/components/Icons';

const AlgCard = dynamic(() => import('@/components/AlgCard'), { ssr: false });

export default function OllPage() {
  const [activeGroup, setActiveGroup] = useState('all');
  const { getStatus, isMounted } = useLearningStatus();

  const filtered = ollCases.filter((c) => {
    if (activeGroup === 'all') return true;
    if (activeGroup === 'learning') return getStatus(c.id) === 'learning';
    if (activeGroup === 'learned') return getStatus(c.id) === 'learned';
    return c.group === activeGroup;
  });

  const learningCount = isMounted
    ? ollCases.filter((c) => getStatus(c.id) === 'learning').length
    : 0;
  const learnedCount = isMounted
    ? ollCases.filter((c) => getStatus(c.id) === 'learned').length
    : 0;

  return (
    <div className="animate-fade-in pb-16">
      {/* Header */}
      <div className="p-6 md:p-10 pb-0">
        <div className="text-accent-blue text-[11px] font-bold tracking-widest uppercase mb-2">
          Thư viện
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
          OLL — Orientation of Last Layer
        </h2>
        <p className="text-text-secondary text-sm mt-1.5 flex items-center gap-2 flex-wrap">
          <span>Làm vàng hoàn toàn mặt trên. {ollCases.length} cases</span>
          <span>•</span>
          <span className="text-amber-600 font-semibold flex items-center gap-1.5">
            <StarIconSolid className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{learningCount} đang học</span>
          </span>
          <span>•</span>
          <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
            <CheckIconSolid className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{learnedCount} đã thuộc</span>
          </span>
        </p>
      </div>

      {/* Filter */}
      <div className="px-6 md:px-10 pt-5 flex items-center gap-2 flex-wrap">
        {OLL_GROUPS.map((g) => {
          const isActive = activeGroup === g.id;
          let count: number | null = null;
          if (g.id === 'learning') {
            count = learningCount;
          } else if (g.id === 'learned') {
            count = learnedCount;
          } else if (g.id !== 'all') {
            count = ollCases.filter((c) => c.group === g.id).length;
          }

          let activeStyle = 'bg-accent-blue/10 border-accent-blue text-accent-blue shadow-xs';
          if (g.id === 'learning') {
            activeStyle = 'bg-amber-400/15 border-amber-400 text-amber-700 shadow-xs';
          } else if (g.id === 'learned') {
            activeStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 shadow-xs';
          }

          return (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? activeStyle
                  : 'bg-white border-border-subtle text-text-secondary hover:border-accent-blue hover:text-text-primary'
              }`}
            >
              {g.id === 'learning' && (
                <StarIconSolid className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              )}
              {g.id === 'learned' && (
                <CheckIconSolid className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              )}
              <span>{g.label}</span>
              {count !== null && (
                <span className="opacity-70">({count})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 md:p-10 pt-6">
        {filtered.map((c) => (
          <AlgCard key={c.id} case_={c} type="oll" />
        ))}
        {filtered.length === 0 && (
          <div className="text-text-muted py-10 col-span-full text-center">
            Không có case nào trong nhóm này.
          </div>
        )}
      </div>
    </div>
  );
}
