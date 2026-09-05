'use client';

import { MoveNotation } from '@/data/moves';

interface MoveCubeDiagramProps {
  move: MoveNotation;
  size?: number;
}

export default function MoveCubeDiagram({ move, size = 130 }: MoveCubeDiagramProps) {
  // Isometric projection constants
  // Center is (100, 100) in 200x200 viewBox
  const cx = 100;
  const cy = 96;

  // Axis vectors for isometric 30-degree projection:
  // Right vector (along R-axis / U-right)
  const rx = 24.5;
  const ry = -14.15;
  // Left vector (along L-axis / U-left / F-top)
  const lx = -24.5;
  const ly = -14.15;
  // Down vector (along vertical axis)
  const dx = 0;
  const dy = 28.3;

  // Helper to compute 2D point from 3D isometric coordinates (u, v, w)
  // u: 0..3 along right axis
  // v: 0..3 along left axis
  // w: 0..3 along down axis
  const pt = (u: number, v: number, w: number) => ({
    x: cx + u * rx + v * lx + w * dx,
    y: cy + u * ry + v * ly + w * dy,
  });

  // Helper to build SVG polygon path from 4 points with padding
  const quadPath = (
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    p3: { x: number; y: number },
    inset = 1.2
  ) => {
    // Compute center
    const mx = (p0.x + p1.x + p2.x + p3.x) / 4;
    const my = (p0.y + p1.y + p2.y + p3.y) / 4;

    const shrink = (p: { x: number; y: number }) => ({
      x: p.x + (mx - p.x) * (inset / 18),
      y: p.y + (my - p.y) * (inset / 18),
    });

    const s0 = shrink(p0);
    const s1 = shrink(p1);
    const s2 = shrink(p2);
    const s3 = shrink(p3);

    return `M ${s0.x.toFixed(1)} ${s0.y.toFixed(1)} L ${s1.x.toFixed(1)} ${s1.y.toFixed(1)} L ${s2.x.toFixed(1)} ${s2.y.toFixed(1)} L ${s3.x.toFixed(1)} ${s3.y.toFixed(1)} Z`;
  };

  // Determine if a specific sticker on a face is active based on move.symbol / move.face
  const isStickerActive = (face: 'U' | 'F' | 'R', row: number, col: number): boolean => {
    const sym = move.symbol;

    // Rotation moves: entire cube is active
    if (move.group === 'rotation') return true;

    // R moves
    if (sym.startsWith('R')) {
      if (face === 'R') return true;
      if (face === 'U' && col === 2) return true;
      if (face === 'F' && col === 2) return true;
      return false;
    }

    // L moves
    if (sym.startsWith('L')) {
      if (face === 'U' && col === 0) return true;
      if (face === 'F' && col === 0) return true;
      return false;
    }

    // U moves
    if (sym.startsWith('U')) {
      if (face === 'U') return true;
      if (face === 'F' && row === 0) return true;
      if (face === 'R' && row === 0) return true;
      return false;
    }

    // D moves
    if (sym.startsWith('D')) {
      if (face === 'F' && row === 2) return true;
      if (face === 'R' && row === 2) return true;
      return false;
    }

    // F moves
    if (sym.startsWith('F')) {
      if (face === 'F') return true;
      if (face === 'U' && row === 2) return true;
      if (face === 'R' && col === 0) return true;
      return false;
    }

    // B moves
    if (sym.startsWith('B')) {
      if (face === 'U' && row === 0) return true;
      if (face === 'R' && col === 2) return true;
      return false;
    }

    // Slice M (middle vertical between L and R)
    if (sym === 'M' || sym === "M'") {
      if (face === 'U' && col === 1) return true;
      if (face === 'F' && col === 1) return true;
      return false;
    }

    // Slice E (equator horizontal between U and D)
    if (sym === 'E' || sym === "E'") {
      if (face === 'F' && row === 1) return true;
      if (face === 'R' && row === 1) return true;
      return false;
    }

    // Slice S (standing vertical between F and B)
    if (sym === 'S' || sym === "S'") {
      if (face === 'U' && row === 1) return true;
      if (face === 'R' && col === 1) return true;
      return false;
    }

    return false;
  };

  const activeColor = move.color || '#3b82f6';

  // Base colors for U, F, R
  const baseU = '#eab308'; // Yellow top
  const baseF = '#ef4444'; // Red front
  const baseR = '#3b82f6'; // Blue right

  // Build 9 stickers for U (top face)
  // row: 0 (back) to 2 (front), col: 0 (left) to 2 (right)
  const stickersU = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      // u runs along col (right), v runs along row (front)
      // row 0 is back (v=3), row 2 is front (v=0)
      const u0 = c;
      const u1 = c + 1;
      const v0 = 2 - r;
      const v1 = 3 - r;

      const p0 = pt(u0, v0, 0);
      const p1 = pt(u1, v0, 0);
      const p2 = pt(u1, v1, 0);
      const p3 = pt(u0, v1, 0);

      const active = isStickerActive('U', r, c);
      stickersU.push({
        key: `U-${r}-${c}`,
        path: quadPath(p0, p1, p2, p3),
        active,
        fill: active ? activeColor : baseU,
        opacity: active ? 1 : 0.45,
      });
    }
  }

  // Build 9 stickers for F (front face)
  // row: 0 (top) to 2 (bottom), col: 0 (left) to 2 (right)
  const stickersF = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      // For F: u runs along col (0..3), w runs along row (0..3), v is at front (v=0)
      const u0 = c;
      const u1 = c + 1;
      const w0 = r;
      const w1 = r + 1;

      const p0 = pt(u0, 0, w0);
      const p1 = pt(u1, 0, w0);
      const p2 = pt(u1, 0, w1);
      const p3 = pt(u0, 0, w1);

      const active = isStickerActive('F', r, c);
      stickersF.push({
        key: `F-${r}-${c}`,
        path: quadPath(p0, p1, p2, p3),
        active,
        fill: active ? activeColor : baseF,
        opacity: active ? 1 : 0.45,
      });
    }
  }

  // Build 9 stickers for R (right face)
  // row: 0 (top) to 2 (bottom), col: 0 (front) to 2 (back)
  const stickersR = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      // For R: u=3 (right edge), v runs from 0 (front) to 3 (back), w runs 0..3 (down)
      const v0 = c;
      const v1 = c + 1;
      const w0 = r;
      const w1 = r + 1;

      const p0 = pt(3, v0, w0);
      const p1 = pt(3, v1, w0);
      const p2 = pt(3, v1, w1);
      const p3 = pt(3, v0, w1);

      const active = isStickerActive('R', r, c);
      stickersR.push({
        key: `R-${r}-${c}`,
        path: quadPath(p0, p1, p2, p3),
        active,
        fill: active ? activeColor : baseR,
        opacity: active ? 1 : 0.45,
      });
    }
  }

  // Generate Rotation Indicator Arrow based on Move
  const renderArrow = () => {
    const sym = move.symbol;
    const color = activeColor;

    switch (sym) {
      case 'R':
        // Right layer turns clockwise (looking from right) -> UP / Backwards
        return (
          <g>
            <path
              d="M 172 152 C 188 126 186 78 152 46"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points="146,42 160,43 154,55"
              fill={color}
            />
          </g>
        );

      case "R'":
        // Right layer turns counter-clockwise -> DOWN / Forwards
        return (
          <g>
            <path
              d="M 152 46 C 186 78 188 126 172 152"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points="172,158 178,145 166,147"
              fill={color}
            />
          </g>
        );

      case 'R2':
        return (
          <g>
            <path
              d="M 166 156 C 196 116 196 74 150 42"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeDasharray="6,4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon points="144,38 158,40 152,52" fill={color} />
            <polygon points="166,162 172,148 160,150" fill={color} />
            <text x="186" y="104" fill={color} fontSize="13" fontWeight="bold" fontFamily="monospace">180°</text>
          </g>
        );

      case 'L':
        // Left layer turns clockwise (looking from left) -> DOWN / Forwards
        return (
          <g>
            <path
              d="M 38 46 C 14 74 12 120 28 152"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points="28,158 34,145 22,147"
              fill={color}
            />
          </g>
        );

      case "L'":
        // Left layer turns counter-clockwise -> UP / Backwards
        return (
          <g>
            <path
              d="M 28 152 C 12 120 14 74 38 46"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points="42,40 28,43 36,54"
              fill={color}
            />
          </g>
        );

      case 'U':
        // Top layer turns clockwise (looking from top) -> turns LEFT
        return (
          <g>
            <path
              d="M 156 36 C 130 14 68 14 44 38"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points="38,42 43,28 53,36"
              fill={color}
            />
          </g>
        );

      case "U'":
        // Top layer turns counter-clockwise -> turns RIGHT
        return (
          <g>
            <path
              d="M 44 38 C 68 14 130 14 156 36"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points="162,42 147,36 157,28"
              fill={color}
            />
          </g>
        );

      case 'U2':
        return (
          <g>
            <path
              d="M 40 40 C 70 8 130 8 160 40"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeDasharray="6,4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon points="34,44 40,30 50,38" fill={color} />
            <polygon points="166,44 150,38 160,30" fill={color} />
            <text x="100" y="24" textAnchor="middle" fill={color} fontSize="13" fontWeight="bold" fontFamily="monospace">180°</text>
          </g>
        );

      case 'D':
        // Bottom layer turns clockwise (looking from bottom) -> turns RIGHT
        return (
          <g>
            <path
              d="M 48 182 C 76 196 124 196 152 182"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points="158,178 152,192 142,184"
              fill={color}
            />
          </g>
        );

      case "D'":
        // Bottom layer turns counter-clockwise -> turns LEFT
        return (
          <g>
            <path
              d="M 152 182 C 124 196 76 196 48 182"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points="42,178 58,184 48,192"
              fill={color}
            />
          </g>
        );

      case 'F':
        // Front face clockwise
        return (
          <g>
            <path
              d="M 46 112 C 46 86 78 82 88 104"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points="92,108 88,94 78,102"
              fill={color}
            />
          </g>
        );

      case "F'":
        // Front face counter-clockwise
        return (
          <g>
            <path
              d="M 88 104 C 78 82 46 86 46 112"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points="42,116 54,106 44,98"
              fill={color}
            />
          </g>
        );

      case 'B':
      case "B'":
        return (
          <g>
            <path
              d={sym === 'B' ? "M 80 18 C 110 8 160 14 176 34" : "M 176 34 C 160 14 110 8 80 18"}
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points={sym === 'B' ? "180,38 174,24 164,32" : "76,22 84,8 92,18"}
              fill={color}
            />
          </g>
        );

      case 'M':
        // Middle slice down (follows L)
        return (
          <g>
            <line x1="88" y1="42" x2="88" y2="154" stroke={color} strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />
            <polygon points="88,162 82,148 94,148" fill={color} />
          </g>
        );

      case 'E':
        // Equator slice right (follows D)
        return (
          <g>
            <line x1="42" y1="138" x2="156" y2="138" stroke={color} strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />
            <polygon points="164,138 150,132 150,144" fill={color} />
          </g>
        );

      case 'S':
        // Standing slice clockwise (follows F)
        return (
          <g>
            <circle cx="100" cy="96" r="32" fill="none" stroke={color} strokeWidth="3.5" strokeDasharray="12,6" filter="url(#glow)" />
            <polygon points="134,96 128,84 122,96" fill={color} />
          </g>
        );

      // Whole cube rotations
      case 'x':
      case "x'":
        return (
          <g>
            <path
              d={sym === 'x' ? "M 184 164 C 206 120 206 60 162 26" : "M 162 26 C 206 60 206 120 184 164"}
              fill="none"
              stroke={color}
              strokeWidth="4.5"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points={sym === 'x' ? "156,22 170,24 164,36" : "186,170 190,156 178,160"}
              fill={color}
            />
            <text x="180" y="100" fill={color} fontSize="14" fontWeight="bold" fontFamily="monospace">x</text>
          </g>
        );

      case 'y':
      case "y'":
        return (
          <g>
            <path
              d={sym === 'y' ? "M 174 24 C 130 -4 46 -4 18 24" : "M 18 24 C 46 -4 130 -4 174 24"}
              fill="none"
              stroke={color}
              strokeWidth="4.5"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <polygon
              points={sym === 'y' ? "12,28 20,14 30,22" : "180,28 162,22 172,14"}
              fill={color}
            />
            <text x="96" y="12" fill={color} fontSize="14" fontWeight="bold" fontFamily="monospace">y</text>
          </g>
        );

      case 'z':
      case "z'":
        return (
          <g>
            <circle cx="100" cy="96" r="48" fill="none" stroke={color} strokeWidth="4" strokeDasharray="16,8" filter="url(#glow)" />
            <polygon points="152,96 144,82 136,96" fill={color} />
            <text x="100" y="100" textAnchor="middle" fill={color} fontSize="15" fontWeight="bold" fontFamily="monospace">z</text>
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Glow filter for active move arrows and highlighted layers */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Cube Black Body / Backing shadow */}
      <polygon
        points="100,32 174,74 174,159 100,201 26,159 26,74"
        fill="#0d1117"
        stroke="#1e293b"
        strokeWidth="2"
      />

      {/* Top Face U Stickers */}
      <g id="stickers-U">
        {stickersU.map((s) => (
          <path
            key={s.key}
            d={s.path}
            fill={s.fill}
            opacity={s.opacity}
            stroke={s.active ? activeColor : '#090d16'}
            strokeWidth={s.active ? 1.8 : 1.2}
          />
        ))}
      </g>

      {/* Front Face F Stickers */}
      <g id="stickers-F">
        {stickersF.map((s) => (
          <path
            key={s.key}
            d={s.path}
            fill={s.fill}
            opacity={s.opacity}
            stroke={s.active ? activeColor : '#090d16'}
            strokeWidth={s.active ? 1.8 : 1.2}
          />
        ))}
      </g>

      {/* Right Face R Stickers */}
      <g id="stickers-R">
        {stickersR.map((s) => (
          <path
            key={s.key}
            d={s.path}
            fill={s.fill}
            opacity={s.opacity}
            stroke={s.active ? activeColor : '#090d16'}
            strokeWidth={s.active ? 1.8 : 1.2}
          />
        ))}
      </g>

      {/* Move Direction Arrow Overlay */}
      {renderArrow()}
    </svg>
  );
}
