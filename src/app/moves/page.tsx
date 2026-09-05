'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { moves, moveGroups } from '@/data/moves';

const MoveCard = dynamic(() => import('@/components/MoveCard'), { ssr: false });

export default function MovesPage() {
  const [activeGroup, setActiveGroup] = useState('basic');

  const filtered = moves.filter((m) => m.group === activeGroup);

  return (
    <div className="animate-fade-in">
      <div className="p-6 md:p-10 pb-0">
        <div className="text-accent-blue text-[11px] font-bold tracking-widest uppercase mb-2">
          Tham khảo
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
          Ký hiệu & Chiều quay
        </h2>
        <p className="text-text-secondary text-sm mt-1.5 max-w-xl">
          Các ký hiệu tiêu chuẩn trong công thức Rubik — xem chiều quay bằng sơ đồ ảnh 2D và minh hoạ 3D tương tác.
        </p>
      </div>

      {/* Notation cheatsheet */}
      <div className="px-6 md:px-10 pt-5">
        <div className="bg-bg-card border border-border-subtle rounded-xl p-4 flex gap-6 flex-wrap text-xs">
          {[
            { sym: 'X', meaning: 'Mặt X quay thuận chiều kim đồng hồ' },
            { sym: "X'", meaning: 'Mặt X quay ngược chiều kim đồng hồ' },
            { sym: 'X2', meaning: 'Mặt X quay 180°' },
          ].map((item) => (
            <div key={item.sym} className="flex items-center gap-2">
              <span className="font-mono font-bold text-accent-cyan text-sm min-w-7">
                {item.sym}
              </span>
              <span className="text-text-secondary">{item.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-6 md:px-10 pt-5 flex items-center gap-2 flex-wrap">
        {moveGroups.map((g) => {
          const isActive = activeGroup === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all duration-200 ${
                isActive
                  ? 'bg-accent-cyan/15 border-accent-cyan text-accent-cyan shadow-sm'
                  : 'bg-bg-secondary border-border-subtle text-text-secondary hover:border-accent-blue hover:text-text-primary'
              }`}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Move grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 md:p-10 pt-6">
        {filtered.map((move) => (
          <MoveCard key={move.symbol} move={move} />
        ))}
      </div>
    </div>
  );
}
