'use client';

/**
 * MoveImageDiagram
 * Shows clean diagram images for standard moves and slice/rotations.
 *
 * Direct images from 8.webp:
 *   x, y, z, M, E, S
 * Strip images:
 *   2.webp – 6-item strip (CW):  U  D  R  L  F  B
 *   3.webp – 6-item strip (CCW): U' D' R' L' F' B'
 */

import Image, { StaticImageData } from 'next/image';

import img2 from '@/images/2.webp';
import img3 from '@/images/3.webp';
import moveX from '@/images/move_x.webp';
import moveY from '@/images/move_y.webp';
import moveZ from '@/images/move_z.webp';
import moveM from '@/images/move_m.webp';
import moveE from '@/images/move_e.webp';
import moveS from '@/images/move_s.webp';

const DIRECT_IMAGES: Record<string, StaticImageData> = {
  'x': moveX,
  'y': moveY,
  'z': moveZ,
  'M': moveM,
  'E': moveE,
  'S': moveS,
};

type MoveImageConfig = {
  src: StaticImageData;
  total: number;
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
};

interface MoveImageDiagramProps {
  symbol: string;
  size?: number;
}

export default function MoveImageDiagram({ symbol, size = 180 }: MoveImageDiagramProps) {
  if (DIRECT_IMAGES[symbol]) {
    return (
      <div
        className="flex items-center justify-center rounded-xl bg-white overflow-hidden shadow-xs border border-border-subtle p-3 w-full h-full max-w-[200px] max-h-[200px]"
      >
        <Image
          src={DIRECT_IMAGES[symbol]}
          alt={symbol}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    );
  }

  const config = MOVE_CONFIG[symbol];

  if (!config) {
    return (
      <div
        className="flex items-center justify-center rounded-lg bg-bg-tertiary text-text-muted text-xs font-mono font-bold"
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
      className="overflow-hidden rounded-xl bg-white border border-border-subtle relative shrink-0 shadow-xs"
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
