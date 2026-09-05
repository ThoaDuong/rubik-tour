'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MoveNotation } from '@/data/moves';
import MoveImageDiagram from './MoveImageDiagram';

const TwistyPlayer = dynamic(() => import('./TwistyPlayer'), { ssr: false });

interface MoveCardProps {
  move: MoveNotation;
}

export default function MoveCard({ move }: MoveCardProps) {
  // 3D is default interactive view
  const [view3D, setView3D] = useState(true);

  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-5 hover:border-border-active hover:shadow-[0_0_20px_rgba(79,90,255,0.25)] hover:-translate-y-0.5 transition-all duration-200 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-mono text-3xl font-bold leading-none mb-1.5" style={{ color: move.color }}>
            {move.symbol}
          </div>
          <div className="text-xs font-semibold text-text-primary">{move.name}</div>
        </div>

        {/* 3D / 2D Toggle Button */}
        <button
          onClick={() => setView3D((v) => !v)}
          className={`rounded-full text-[11px] font-semibold px-2.5 py-1 border transition-all duration-200 flex items-center gap-1 cursor-pointer ${
            !view3D
              ? 'bg-accent-blue/15 border-accent-blue text-accent-blue shadow-sm'
              : 'bg-bg-primary border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-active'
          }`}
          title={view3D ? 'Xem sơ đồ 2D' : 'Xem mô hình 3D tương tác'}
        >
          {view3D ? '◀ Sơ đồ 2D' : '▶ 3D Demo'}
        </button>
      </div>

      <div className="text-xs text-text-muted mb-3.5 leading-relaxed min-h-[32px]">{move.description}</div>

      {/* Visual Display Container */}
      <div className="bg-bg-primary rounded-xl border border-border-subtle min-h-[160px] flex flex-col items-center justify-center p-3 relative overflow-hidden">
        {view3D ? (
          <div className="flex flex-col items-center w-full">
            <TwistyPlayer
              alg={move.alg}
              visualization="3D"
              controlPanel="bottom-row"
              width={160}
              height={140}
            />
            <div className="text-[10px] text-text-muted mt-1 font-medium">
              Nhấn Play để xem mặt xoay
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <MoveImageDiagram symbol={move.symbol} size={150} />
            <div className="mt-2 text-[11px] text-text-muted flex items-center gap-1.5">
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{ background: move.color }}
              />
              <span>
                Mặt {move.face} — {move.direction === 'cw' ? 'Thuận chiều kim' : move.direction === 'ccw' ? 'Ngược chiều kim' : '180°'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
