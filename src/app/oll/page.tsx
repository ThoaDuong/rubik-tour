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
    <>
      <div className="page-header">
        <div className="page-header-tag">Thư viện</div>
        <h2>OLL — Orientation of Last Layer</h2>
        <p>
          Làm vàng hoàn toàn mặt trên. {ollCases.length} cases, trong đó{' '}
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
            {ollCases.filter((c) => c.isLearning).length} đang học
          </span>
          .
        </p>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        {OLL_GROUPS.map((g) => (
          <button
            key={g.id}
            className={`filter-btn ${activeGroup === g.id ? 'active' : ''}`}
            onClick={() => setActiveGroup(g.id)}
          >
            {g.label}
            {g.id !== 'all' && (
              <span style={{ marginLeft: 4, opacity: 0.6 }}>
                ({g.id === 'learning'
                  ? ollCases.filter((c) => c.isLearning).length
                  : ollCases.filter((c) => c.group === g.id).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="cards-grid">
        {filtered.map((c, i) => (
          <div key={c.id} style={{ animationDelay: `${i * 0.04}s` }}>
            <AlgCard case_={c} type="oll" />
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ color: 'var(--text-muted)', padding: '40px 0', gridColumn: '1 / -1' }}>
            Không có case nào trong nhóm này.
          </div>
        )}
      </div>
    </>
  );
}
