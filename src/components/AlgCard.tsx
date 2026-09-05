'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { OllCase } from '@/data/oll';
import { PllCase } from '@/data/pll';

const TwistyPlayer = dynamic(() => import('./TwistyPlayer'), { ssr: false });

interface AlgCardProps {
  case_: OllCase | PllCase;
  type?: 'oll' | 'pll';
}

export default function AlgCard({ case_, type = 'oll' }: AlgCardProps) {
  const [copied, setCopied] = useState(false);
  const [showAnim, setShowAnim] = useState(false);

  const handleCopy = async () => {
    if (!case_.alg) return;
    await navigator.clipboard.writeText(case_.alg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const groupColor = type === 'oll'
    ? 'badge-blue'
    : 'badge-purple';

  const accentColor = type === 'oll'
    ? 'var(--accent-blue)'
    : 'var(--accent-purple)';

  const youtubeRef = 'youtubeRef' in case_ ? case_.youtubeRef : undefined;
  const isLearning = case_.isLearning;

  return (
    <div className="alg-card animate-fade-in">
      {/* Header */}
      <div className="alg-card-header">
        <div>
          <div className="alg-card-name" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {isLearning && <span title="Đang học" style={{ fontSize: 14 }}>⭐</span>}
            {case_.name}
          </div>
          <div className="alg-card-desc">{case_.description}</div>
        </div>
        <span className={`badge ${groupColor}`}>
          {type.toUpperCase()}
        </span>
      </div>

      {/* Cube preview */}
      <div className="alg-card-cube">
        <TwistyPlayer
          alg={case_.alg || ''}
          visualization="3D"
          width={160}
          height={130}
          controlPanel={showAnim ? 'bottom-row' : 'none'}
          hintFacelets="floating"
        />
      </div>

      {/* Alg text - clickable to copy */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          className="algo-text"
          onClick={handleCopy}
          title="Click để copy"
          style={{ flex: 1, textAlign: 'left' }}
        >
          {case_.alg || '—'}
        </button>
        <button
          className="copy-btn"
          onClick={handleCopy}
          title={copied ? 'Đã copy!' : 'Copy'}
        >
          {copied ? '✓' : '⎘'}
        </button>
      </div>

      {/* Footer */}
      <div className="alg-card-footer">
        {'probability' in case_ && (
          <span className="badge badge-cyan">P: {(case_ as PllCase).probability}</span>
        )}
        <button
          onClick={() => setShowAnim(v => !v)}
          style={{
            background: 'none',
            border: `1px solid ${accentColor}`,
            color: accentColor,
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
          }}
        >
          {showAnim ? '2D view' : '▶ Animate'}
        </button>
        {youtubeRef && (
          <a
            href={youtubeRef}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ef4444',
              fontSize: 11,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            ▶ YouTube
          </a>
        )}
      </div>
    </div>
  );
}
