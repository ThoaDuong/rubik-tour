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
  // 3D animated is default interactive view
  const [view3D, setView3D] = useState(true);

  const getMoveTypeLabel = () => {
    if (['x', 'y', 'z'].includes(move.symbol)) {
      return `Trục ${move.symbol.toUpperCase()} — Xoay cả khối 90°`;
    }
    if (['M', 'E', 'S'].includes(move.symbol)) {
      return `Lớp giữa ${move.symbol} — Thuận 90°`;
    }
    return `Mặt ${move.face} — ${move.direction === 'cw' ? 'Thuận 90°' : 'Ngược 90°'}`;
  };

  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-5 hover:border-accent-blue hover:shadow-lg hover:shadow-accent-blue/5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3.5 animate-fade-in shadow-xs">
      {/* Header */}
      <div className="flex justify-between items-start">
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
              ? 'bg-accent-blue/10 border-accent-blue text-accent-blue shadow-xs'
              : 'bg-white border-border-subtle text-text-secondary hover:text-text-primary hover:border-accent-blue'
          }`}
          title={view3D ? 'Xem sơ đồ 2D' : 'Xem mô hình 3D'}
        >
          {view3D ? '◀ Sơ đồ 2D' : '▶ 3D Demo'}
        </button>
      </div>

      <div className="text-xs text-text-secondary leading-relaxed min-h-[32px]">{move.description}</div>

      {/* Visual Display Container - 3D default animated */}
      <div
        className={`rounded-xl border transition-all duration-200 overflow-hidden flex flex-col items-center justify-center p-3 relative h-[230px] ${
          view3D ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-border-subtle'
        }`}
      >
        {view3D ? (
          <TwistyPlayer
            alg={move.alg}
            visualization="3D"
            controlPanel="bottom-row"
            width="100%"
            height={230}
            cameraDistance={5.8}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <MoveImageDiagram symbol={move.symbol} size={180} />
          </div>
        )}
      </div>

      {/* Footer with Move details */}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="text-[11px] text-text-secondary flex items-center gap-1.5 font-medium">
          <span
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ background: move.color }}
          />
          <span>{getMoveTypeLabel()}</span>
        </div>

        <span className="font-mono text-[11px] font-bold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-md">
          {move.alg}
        </span>
      </div>
    </div>
  );
}
