'use client';

import { useEffect, useRef, useState } from 'react';

interface TwistyPlayerProps {
  alg?: string;
  experimentalSetupAlg?: string;
  visualization?: '3D' | '2D' | 'experimental-2D-LL' | 'PG3D';
  background?: 'none' | 'checkered' | 'auto';
  controlPanel?: 'none' | 'bottom-row' | 'auto';
  hintFacelets?: 'none' | 'floating';
  width?: number;
  height?: number;
}

export default function TwistyPlayer({
  alg = '',
  experimentalSetupAlg,
  visualization = '3D',
  background = 'none',
  controlPanel = 'none',
  hintFacelets = 'floating',
  width = 180,
  height = 140,
}: TwistyPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLElement | null>(null);
  const [error, setError] = useState(false);

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
          visualization,
          background,
          controlPanel,
          hintFacelets,
        });

        // Style it
        player.style.width = `${width}px`;
        player.style.height = `${height}px`;
        player.style.display = 'block';

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
  }, [alg, experimentalSetupAlg, visualization, background, controlPanel, hintFacelets, width, height]);

  if (error) {
    return (
      <div
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: '12px',
          textAlign: 'center',
        }}
      >
        🎲<br />
        <span style={{ fontSize: '10px', marginTop: 4 }}>Cube preview<br />unavailable</span>
      </div>
    );
  }

  return <div ref={containerRef} style={{ width, height }} />;
}
