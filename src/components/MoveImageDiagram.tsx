'use client';

/**
 * MoveImageDiagram
 * Shows a cropped portion of the move-notation strip images from /src/images/.
 *
 * Image contents:
 *   2.webp  – 6-item strip (CW):  U  D  R  L  F  B
 *   3.webp  – 6-item strip (CCW): U' D' R' L' F' B'
 *   4.webp  – 6-item strip (180°):U2 D2 R2 L2 F2 B2
 *   7.webp  – 3-item strip (Slice):M  E  S
 *   6.jpg   – 4-item strip (Rot): [Ban đầu]  x  y  z
 */

import Image from 'next/image';

// --- Static imports so Next.js can optimise/fingerprint assets ----------
import img2 from '@/images/2.webp';
import img3 from '@/images/3.webp';
import img4 from '@/images/4.webp';
import img6 from '@/images/6.jpg';
import img7 from '@/images/7.webp';

type MoveImageConfig = {
  src: typeof img2;
  /** Total items in the strip */
  total: number;
  /** 0-based index of this move in the strip */
  index: number;
};

const MOVE_CONFIG: Record<string, MoveImageConfig> = {
  // ── CW ──────────────────────────────────────
  'U':  { src: img2, total: 6, index: 0 },
  'D':  { src: img2, total: 6, index: 1 },
  'R':  { src: img2, total: 6, index: 2 },
  'L':  { src: img2, total: 6, index: 3 },
  'F':  { src: img2, total: 6, index: 4 },
  'B':  { src: img2, total: 6, index: 5 },
  // ── CCW ─────────────────────────────────────
  "U'": { src: img3, total: 6, index: 0 },
  "D'": { src: img3, total: 6, index: 1 },
  "R'": { src: img3, total: 6, index: 2 },
  "L'": { src: img3, total: 6, index: 3 },
  "F'": { src: img3, total: 6, index: 4 },
  "B'": { src: img3, total: 6, index: 5 },
  // ── 180° ────────────────────────────────────
  'U2': { src: img4, total: 6, index: 0 },
  'D2': { src: img4, total: 6, index: 1 },
  'R2': { src: img4, total: 6, index: 2 },
  'L2': { src: img4, total: 6, index: 3 },
  'F2': { src: img4, total: 6, index: 4 },
  'B2': { src: img4, total: 6, index: 5 },
  // ── Slice ───────────────────────────────────
  'M':  { src: img7, total: 3, index: 0 },
  'E':  { src: img7, total: 3, index: 1 },
  'S':  { src: img7, total: 3, index: 2 },
  // ── Rotations ───────────────────────────────
  'x':  { src: img6, total: 4, index: 1 },
  "x'": { src: img6, total: 4, index: 1 }, // no prime image – reuse x
  'y':  { src: img6, total: 4, index: 2 },
  "y'": { src: img6, total: 4, index: 2 }, // reuse y
  'z':  { src: img6, total: 4, index: 3 },
  "z'": { src: img6, total: 4, index: 3 }, // reuse z
};

interface MoveImageDiagramProps {
  symbol: string;
  /** Display size in px (width = height) */
  size?: number;
}

/**
 * Crops a single cell out of a horizontal image strip using overflow:hidden +
 * negative translateX so only the target column is visible.
 */
export default function MoveImageDiagram({ symbol, size = 140 }: MoveImageDiagramProps) {
  const config = MOVE_CONFIG[symbol];

  if (!config) {
    // Fallback: generic cube overview image
    return (
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          background: 'var(--bg-tertiary)',
          color: 'var(--text-muted)',
          fontSize: 12,
        }}
      >
        {symbol}
      </div>
    );
  }

  const { src, total, index } = config;

  // We render the full strip at (total * size) wide inside a (size) container,
  // then shift it left by (index * size) to show only the target cell.
  const stripWidth = total * size;

  return (
    <div
      style={{
        width: size,
        height: size,
        overflow: 'hidden',
        borderRadius: 8,
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: stripWidth,
          height: size,
          position: 'absolute',
          top: 0,
          left: -(index * size),
        }}
      >
        <Image
          src={src}
          alt={symbol}
          width={stripWidth}
          height={size}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'fill',
          }}
          priority
        />
      </div>
    </div>
  );
}
