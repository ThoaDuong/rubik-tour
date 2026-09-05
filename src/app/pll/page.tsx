'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { pllCases, PLL_GROUPS } from '@/data/pll';

const AlgCard = dynamic(() => import('@/components/AlgCard'), { ssr: false });

export default function PllPage() {
  const [activeGroup, setActiveGroup] = useState('all');

  const filtered = pllCases.filter((c) => {
    if (activeGroup === 'all') return true;
    if (activeGroup === 'learning') return c.isLearning;
    return c.group === activeGroup;
  });

  return (
    <div className="animate-fade-in pb-16">
      {/* Header */}
      <div className="p-6 md:p-10 pb-0">
        <div className="text-accent-purple text-[11px] font-bold tracking-widest uppercase mb-2">
          Thư viện
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
          PLL — Permutation of Last Layer
        </h2>
        <p className="text-text-secondary text-sm mt-1.5">
          Hoán vị các piece mặt trên. {pllCases.length} cases, xác suất mỗi case tương ứng.{' '}
          <span className="text-accent-purple font-semibold">
            {pllCases.filter((c) => c.isLearning).length} đang học
          </span>
          .
        </p>
      </div>

      {/* Filter */}
      <div className="px-6 md:px-10 pt-5 flex items-center gap-2 flex-wrap">
        {PLL_GROUPS.map((g) => {
          const isActive = activeGroup === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all duration-200 ${
                isActive
                  ? 'bg-accent-purple/10 border-accent-purple text-accent-purple shadow-xs'
                  : 'bg-white border-border-subtle text-text-secondary hover:border-accent-purple hover:text-text-primary'
              }`}
            >
              {g.label}
              {g.id !== 'all' && (
                <span className="ml-1 opacity-70">
                  ({g.id === 'learning'
                    ? pllCases.filter((c) => c.isLearning).length
                    : pllCases.filter((c) => c.group === g.id).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 md:p-10 pt-6">
        {filtered.map((c) => (
          <AlgCard key={c.id} case_={c} type="pll" />
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
