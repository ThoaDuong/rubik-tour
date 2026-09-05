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
  // 3D is now the default interactive view
  const [view3D, setView3D] = useState(true);

  return (
    <div className="move-card">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div>
          <div className="move-card-symbol" style={{ color: move.color }}>
            {move.symbol}
          </div>
          <div className="move-card-name">{move.name}</div>
        </div>

        {/* 3D / 2D Toggle Button */}
        <button
          onClick={() => setView3D((v) => !v)}
          style={{
            background: !view3D ? 'var(--accent-blue-dim)' : 'var(--bg-primary)',
            border: `1px solid ${!view3D ? 'var(--accent-blue)' : 'var(--border-color)'}`,
            color: !view3D ? 'var(--accent-blue)' : 'var(--text-secondary)',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 600,
            padding: '4px 10px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
          title={view3D ? 'Xem sơ đồ 2D' : 'Xem mô hình 3D tương tác'}
        >
          {view3D ? '◀ Sơ đồ 2D' : '▶ 3D Demo'}
        </button>
      </div>

      <div className="move-card-desc">{move.description}</div>

      {/* Visual Display Container */}
      <div
        style={{
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          minHeight: 160,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 8px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {view3D ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <TwistyPlayer
              alg={move.alg}
              visualization="3D"
              controlPanel="bottom-row"
              width={160}
              height={140}
            />
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: 4 }}>
              Nhấn Play để xem mặt xoay
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <MoveImageDiagram symbol={move.symbol} size={150} />
            <div
              style={{
                marginTop: 6,
                fontSize: '11px',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: move.color,
                }}
              />
              <span>Mặt {move.face} — {move.direction === 'cw' ? 'Thuận chiều kim' : move.direction === 'ccw' ? 'Ngược chiều kim' : '180°'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
