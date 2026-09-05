'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { moves, moveGroups } from '@/data/moves';

const MoveCard = dynamic(() => import('@/components/MoveCard'), { ssr: false });

export default function MovesPage() {
  const [activeGroup, setActiveGroup] = useState('basic');

  const filtered = moves.filter((m) => m.group === activeGroup);

  return (
    <>
      <div className="page-header">
        <div className="page-header-tag">Tham khảo</div>
        <h2>Ký hiệu & Chiều quay</h2>
        <p>
          Các ký hiệu tiêu chuẩn trong công thức Rubik — xem chiều quay bằng SVG diagram và minh hoạ 3D.
        </p>
      </div>

      {/* Notation cheatsheet */}
      <div style={{ padding: '16px 40px 0' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          fontSize: 13,
        }}>
          {[
            { sym: 'X', meaning: 'Mặt X quay thuận chiều kim đồng hồ' },
            { sym: "X'", meaning: 'Mặt X quay ngược chiều kim đồng hồ' },
            { sym: 'X2', meaning: 'Mặt X quay 180°' },
          ].map((item) => (
            <div key={item.sym} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--accent-cyan)',
                fontSize: 14,
                minWidth: 28,
              }}>{item.sym}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{item.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="filter-bar" style={{ paddingTop: 20 }}>
        {moveGroups.map((g) => (
          <button
            key={g.id}
            className={`filter-btn ${activeGroup === g.id ? 'active' : ''}`}
            onClick={() => setActiveGroup(g.id)}
            style={
              activeGroup === g.id
                ? { background: 'var(--accent-cyan-dim)', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }
                : {}
            }
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Move grid */}
      <div className="move-grid">
        {filtered.map((move, i) => (
          <div key={move.symbol} style={{ animationDelay: `${i * 0.05}s` }}>
            <MoveCard move={move} />
          </div>
        ))}
      </div>
    </>
  );
}
