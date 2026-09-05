'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ollCases } from '@/data/oll';
import { pllCases } from '@/data/pll';

const TwistyPlayer = dynamic(() => import('@/components/TwistyPlayer'), { ssr: false });

// All cases being learned
const learningCases = [
  ...ollCases.filter((c) => c.isLearning).map((c) => ({ ...c, type: 'OLL' as const })),
  ...pllCases.filter((c) => c.isLearning).map((c) => ({ ...c, type: 'PLL' as const })),
];

type LearningCase = typeof learningCases[0];

function NoteDetail({ case_ }: { case_: LearningCase }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(case_.alg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const youtubeRef = 'youtubeRef' in case_ ? case_.youtubeRef : undefined;
  const accentColor = case_.type === 'OLL' ? 'var(--accent-blue)' : 'var(--accent-purple)';

  return (
    <div style={{ animation: 'fadeIn 0.3s ease both' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          display: 'inline-block',
          background: case_.type === 'OLL' ? 'var(--accent-blue-dim)' : 'var(--accent-purple-dim)',
          color: accentColor,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          padding: '3px 10px',
          borderRadius: 20,
          marginBottom: 12,
        }}>
          {case_.type}
        </div>
        <h2 style={{
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: 6,
        }}>
          {case_.name}
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>{case_.description}</p>
      </div>

      {/* Cube + Alg */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
        marginBottom: 28,
      }}>
        {/* 2D preview */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>2D TOP VIEW</div>
          <TwistyPlayer alg={case_.alg} visualization="2D" width={200} height={160} />
        </div>

        {/* 3D animated */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>3D ANIMATION</div>
          <TwistyPlayer alg={case_.alg} visualization="3D" controlPanel="bottom-row" width={200} height={160} />
        </div>
      </div>

      {/* Algorithm */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 20,
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Algorithm
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            className="algo-text"
            onClick={handleCopy}
            style={{ flex: 1, textAlign: 'left', fontSize: 16, padding: '10px 16px' }}
          >
            {case_.alg}
          </button>
          <button
            onClick={handleCopy}
            style={{
              background: copied ? 'var(--accent-green-dim)' : 'var(--bg-tertiary)',
              border: `1px solid ${copied ? 'var(--accent-green)' : 'var(--border-color)'}`,
              color: copied ? 'var(--accent-green)' : 'var(--text-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {copied ? '✓ Đã copy' : '⎘ Copy'}
          </button>
        </div>
      </div>

      {/* References */}
      {youtubeRef && (
        <div style={{
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: 20 }}>▶</span>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Học từ YouTube</div>
            <a
              href={youtubeRef}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ef4444', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
            >
              JPerm — OLL Tutorial →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NotesPage() {
  const [selected, setSelected] = useState<LearningCase>(learningCases[0]);
  const [filter, setFilter] = useState<'all' | 'OLL' | 'PLL'>('all');

  const visible = learningCases.filter((c) => filter === 'all' || c.type === filter);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Notes sidebar */}
      <div style={{
        width: 260,
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        {/* Header */}
        <div style={{ padding: '24px 16px 16px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
            ⭐ Đang học ({learningCases.length})
          </div>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 6 }}>
            {(['all', 'OLL', 'PLL'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 20,
                  border: '1px solid',
                  borderColor: filter === f ? 'var(--accent-blue)' : 'var(--border-color)',
                  background: filter === f ? 'var(--accent-blue-dim)' : 'transparent',
                  color: filter === f ? 'var(--accent-blue)' : 'var(--text-muted)',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {f === 'all' ? 'Tất cả' : f}
              </button>
            ))}
          </div>
        </div>

        {/* Case list */}
        <div style={{ flex: 1, overflow: 'auto', padding: '12px 8px' }}>
          {visible.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: selected.id === c.id ? 'var(--accent-blue-dim)' : 'transparent',
                cursor: 'pointer',
                marginBottom: 2,
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: selected.id === c.id ? 'var(--accent-blue)' : 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  background: c.type === 'OLL' ? 'var(--accent-blue-dim)' : 'var(--accent-purple-dim)',
                  color: c.type === 'OLL' ? 'var(--accent-blue)' : 'var(--accent-purple)',
                  padding: '1px 6px',
                  borderRadius: 10,
                }}>
                  {c.type}
                </span>
                {c.name}
              </div>
              <div style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                marginTop: 3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {c.alg}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main detail */}
      <div style={{ flex: 1, padding: 40, overflow: 'auto' }}>
        {selected && <NoteDetail case_={selected} />}
      </div>
    </div>
  );
}
