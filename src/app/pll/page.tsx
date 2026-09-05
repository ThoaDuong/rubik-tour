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
    <>
      <div className="page-header">
        <div className="page-header-tag">Thư viện</div>
        <h2>PLL — Permutation of Last Layer</h2>
        <p>
          Hoán vị các piece mặt trên. {pllCases.length} cases, xác suất mỗi case tương ứng.{' '}
          <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>
            {pllCases.filter((c) => c.isLearning).length} đang học
          </span>
          .
        </p>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        {PLL_GROUPS.map((g) => (
          <button
            key={g.id}
            className={`filter-btn ${activeGroup === g.id ? 'active' : ''}`}
            onClick={() => setActiveGroup(g.id)}
            style={
              activeGroup === g.id
                ? { background: 'var(--accent-purple-dim)', borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }
                : {}
            }
          >
            {g.label}
            {g.id !== 'all' && (
              <span style={{ marginLeft: 4, opacity: 0.6 }}>
                ({g.id === 'learning'
                  ? pllCases.filter((c) => c.isLearning).length
                  : pllCases.filter((c) => c.group === g.id).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="cards-grid">
        {filtered.map((c, i) => (
          <div key={c.id} style={{ animationDelay: `${i * 0.04}s` }}>
            <AlgCard case_={c} type="pll" />
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
