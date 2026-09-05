'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ollCases, OLL_GROUPS } from '@/data/oll';

const AlgCard = dynamic(() => import('@/components/AlgCard'), { ssr: false });

export default function OllPage() {
  const [activeGroup, setActiveGroup] = useState('all');

  const filtered = ollCases.filter((c) => {
    if (activeGroup === 'all') return true;
    if (activeGroup === 'learning') return c.isLearning;
    return c.group === activeGroup;
  });

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
        <p className="text-text-secondary text-sm mt-1.5">
          Làm vàng hoàn toàn mặt trên. {ollCases.length} cases, trong đó{' '}
          <span className="text-accent-blue font-semibold">
            {ollCases.filter((c) => c.isLearning).length} đang học
          </span>
          .
        </p>
      </div>

      {/* Filter */}
      <div className="px-6 md:px-10 pt-5 flex items-center gap-2 flex-wrap">
        {OLL_GROUPS.map((g) => {
          const isActive = activeGroup === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all duration-200 ${
                isActive
                  ? 'bg-accent-blue/10 border-accent-blue text-accent-blue shadow-xs'
                  : 'bg-white border-border-subtle text-text-secondary hover:border-accent-blue hover:text-text-primary'
              }`}
            >
              {g.label}
              {g.id !== 'all' && (
                <span className="ml-1 opacity-70">
                  ({g.id === 'learning'
                    ? ollCases.filter((c) => c.isLearning).length
                    : ollCases.filter((c) => c.group === g.id).length})
                </span>
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
