'use client';

import { useEffect, useRef, useState } from 'react';

interface TwistyPlayerProps {
  alg?: string;
  experimentalSetupAlg?: string;
  experimentalSetupAnchor?: 'start' | 'end';
  experimentalStickering?: 'full' | 'OLL' | 'PLL' | string;
  visualization?: '3D' | '2D' | 'experimental-2D-LL' | 'PG3D';
  background?: 'none' | 'checkered' | 'auto';
  controlPanel?: 'none' | 'bottom-row' | 'auto';
  hintFacelets?: 'none' | 'floating';
  cameraDistance?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function TwistyPlayer({
  alg = '',
  experimentalSetupAlg,
  experimentalSetupAnchor,
  experimentalStickering,
  visualization = '3D',
  background = 'none',
  controlPanel = 'none',
  hintFacelets = 'floating',
  cameraDistance = 5.8,
  width = '100%',
  height = 160,
  className = '',
}: TwistyPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLElement | null>(null);
  const [error, setError] = useState(false);

  const styleWidth = typeof width === 'number' ? `${width}px` : width;
  const styleHeight = typeof height === 'number' ? `${height}px` : height;

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const { TwistyPlayer: Player } = await import('cubing/twisty');

        if (cancelled || !containerRef.current) return;

        // Clean up previous player
        if (playerRef.current) {
          playerRef.current.remove();
          playerRef.current = null;
        }

        const player = new Player({
          alg,
          ...(experimentalSetupAlg ? { experimentalSetupAlg } : {}),
          ...(experimentalSetupAnchor ? { experimentalSetupAnchor } : {}),
          ...(experimentalStickering ? { experimentalStickering } : {}),
          visualization,
          background,
          controlPanel,
          hintFacelets,
          ...(visualization === '3D' && cameraDistance ? { cameraDistance } : {}),
        });

        // Style it - grid allows child .wrapper to properly fill and contain
        player.style.width = '100%';
        player.style.height = '100%';
        player.style.display = 'grid';

        containerRef.current.appendChild(player);
        playerRef.current = player;
      } catch (e) {
        console.error('TwistyPlayer error:', e);
        if (!cancelled) setError(true);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (playerRef.current) {
        playerRef.current.remove();
        playerRef.current = null;
      }
    };
  }, [alg, experimentalSetupAlg, experimentalSetupAnchor, experimentalStickering, visualization, background, controlPanel, hintFacelets, cameraDistance, styleWidth, styleHeight]);

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center text-text-muted text-xs text-center"
        style={{ width: styleWidth, height: styleHeight }}
      >
        <span className="text-base">🎲</span>
        <span className="text-[10px] mt-1 leading-tight">Cube preview<br />unavailable</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`twisty-player-container flex items-center justify-center w-full h-full relative ${className}`}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}
