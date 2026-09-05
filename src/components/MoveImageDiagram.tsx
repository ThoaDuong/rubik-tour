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
  total: number;
  index: number;
};

const MOVE_CONFIG: Record<string, MoveImageConfig> = {
  // ── CW ──────────────────────────────────────
  'U':  { src: img2, total: 6, index: 0 },
  'D':  { src: img2, total: 6, index: 1 },
  'R':  { src: img2, total: 6, index: 2 },
  'L':  { src: img2, total: 3, index: 3 },
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
  "x'": { src: img6, total: 4, index: 1 },
  'y':  { src: img6, total: 4, index: 2 },
  "y'": { src: img6, total: 4, index: 2 },
  'z':  { src: img6, total: 4, index: 3 },
  "z'": { src: img6, total: 4, index: 3 },
};

// Wait, notice 'L' in img2 had total: 6! Let's make sure it's total: 6
MOVE_CONFIG['L'] = { src: img2, total: 6, index: 3 };

interface MoveImageDiagramProps {
  symbol: string;
  size?: number;
}

export default function MoveImageDiagram({ symbol, size = 140 }: MoveImageDiagramProps) {
  const config = MOVE_CONFIG[symbol];

  if (!config) {
    return (
      <div
        className="flex items-center justify-center rounded-lg bg-bg-tertiary text-text-muted text-xs"
        style={{ width: size, height: size }}
      >
        {symbol}
      </div>
    );
  }

  const { src, total, index } = config;
  const stripWidth = total * size;

  return (
    <div
      className="overflow-hidden rounded-lg relative shrink-0"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute top-0"
        style={{
          width: stripWidth,
          height: size,
          left: -(index * size),
        }}
      >
        <Image
          src={src}
          alt={symbol}
          width={stripWidth}
          height={size}
          className="w-full h-full object-fill"
          priority
        />
      </div>
    </div>
  );
}
