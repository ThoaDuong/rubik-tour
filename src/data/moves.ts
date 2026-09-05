export interface MoveNotation {
  symbol: string;
  name: string;
  face: 'U' | 'D' | 'F' | 'B' | 'R' | 'L' | 'M' | 'E' | 'S';
  direction: 'cw' | 'ccw' | '180';
  description: string;
  alg: string; // for twisty-player demo
  color: string;
  group?: string;
}

export const moveGroups = [
  { id: 'basic', label: 'Cơ bản (6 mặt)' },
  { id: 'slice_rotation', label: 'Lớp giữa & Xoay khối' },
];

export const moves: (MoveNotation & { group: string })[] = [
  // ─── RIGHT FACE ────────────────────────────────────────────────────────
  {
    symbol: 'R',
    name: 'Right',
    face: 'R',
    direction: 'cw',
    description: 'Mặt phải quay theo chiều kim đồng hồ (nhìn từ phải)',
    alg: 'R',
    color: '#3b82f6',
    group: 'basic',
  },
  {
    symbol: "R'",
    name: "Right Prime",
    face: 'R',
    direction: 'ccw',
    description: 'Mặt phải quay ngược chiều kim đồng hồ',
    alg: "R'",
    color: '#3b82f6',
    group: 'basic',
  },

  // ─── LEFT FACE ─────────────────────────────────────────────────────────
  {
    symbol: 'L',
    name: 'Left',
    face: 'L',
    direction: 'cw',
    description: 'Mặt trái quay theo chiều kim đồng hồ (nhìn từ trái)',
    alg: 'L',
    color: '#22c55e',
    group: 'basic',
  },
  {
    symbol: "L'",
    name: "Left Prime",
    face: 'L',
    direction: 'ccw',
    description: 'Mặt trái quay ngược chiều kim đồng hồ',
    alg: "L'",
    color: '#22c55e',
    group: 'basic',
  },

  // ─── UP FACE ───────────────────────────────────────────────────────────
  {
    symbol: 'U',
    name: 'Up',
    face: 'U',
    direction: 'cw',
    description: 'Mặt trên quay theo chiều kim đồng hồ (nhìn từ trên)',
    alg: 'U',
    color: '#fbbf24',
    group: 'basic',
  },
  {
    symbol: "U'",
    name: "Up Prime",
    face: 'U',
    direction: 'ccw',
    description: 'Mặt trên quay ngược chiều kim đồng hồ',
    alg: "U'",
    color: '#fbbf24',
    group: 'basic',
  },

  // ─── DOWN FACE ─────────────────────────────────────────────────────────
  {
    symbol: 'D',
    name: 'Down',
    face: 'D',
    direction: 'cw',
    description: 'Mặt dưới quay theo chiều kim đồng hồ (nhìn từ dưới)',
    alg: 'D',
    color: '#64748b',
    group: 'basic',
  },
  {
    symbol: "D'",
    name: "Down Prime",
    face: 'D',
    direction: 'ccw',
    description: 'Mặt dưới quay ngược chiều kim đồng hồ',
    alg: "D'",
    color: '#64748b',
    group: 'basic',
  },

  // ─── FRONT FACE ────────────────────────────────────────────────────────
  {
    symbol: 'F',
    name: 'Front',
    face: 'F',
    direction: 'cw',
    description: 'Mặt trước quay theo chiều kim đồng hồ (nhìn thẳng)',
    alg: 'F',
    color: '#ef4444',
    group: 'basic',
  },
  {
    symbol: "F'",
    name: "Front Prime",
    face: 'F',
    direction: 'ccw',
    description: 'Mặt trước quay ngược chiều kim đồng hồ',
    alg: "F'",
    color: '#ef4444',
    group: 'basic',
  },

  // ─── BACK FACE ─────────────────────────────────────────────────────────
  {
    symbol: 'B',
    name: 'Back',
    face: 'B',
    direction: 'cw',
    description: 'Mặt sau quay theo chiều kim đồng hồ (nhìn từ sau)',
    alg: 'B',
    color: '#f97316',
    group: 'basic',
  },
  {
    symbol: "B'",
    name: "Back Prime",
    face: 'B',
    direction: 'ccw',
    description: 'Mặt sau quay ngược chiều kim đồng hồ',
    alg: "B'",
    color: '#f97316',
    group: 'basic',
  },

  // ─── SLICE & ROTATION (LỚP GIỮA & XOAY CẢ KHỐI) ────────────────────────
  {
    symbol: 'M',
    name: 'Middle',
    face: 'M',
    direction: 'cw',
    description: 'Lớp giữa theo chiều của L (nhìn từ phải)',
    alg: 'M',
    color: '#a855f7',
    group: 'slice_rotation',
  },
  {
    symbol: 'E',
    name: 'Equator',
    face: 'E',
    direction: 'cw',
    description: 'Lớp giữa theo chiều của D (nhìn từ trên)',
    alg: 'E',
    color: '#06b6d4',
    group: 'slice_rotation',
  },
  {
    symbol: 'S',
    name: 'Standing',
    face: 'S',
    direction: 'cw',
    description: 'Lớp giữa theo chiều của F',
    alg: 'S',
    color: '#10b981',
    group: 'slice_rotation',
  },
  {
    symbol: 'x',
    name: 'Rotate X',
    face: 'R',
    direction: 'cw',
    description: 'Xoay toàn bộ khối Rubik lên trên theo trục R (nhìn từ phải)',
    alg: 'x',
    color: '#818cf8',
    group: 'slice_rotation',
  },
  {
    symbol: 'y',
    name: 'Rotate Y',
    face: 'U',
    direction: 'cw',
    description: 'Xoay toàn bộ khối Rubik sang trái theo trục U (nhìn từ trên)',
    alg: 'y',
    color: '#38bdf8',
    group: 'slice_rotation',
  },
  {
    symbol: 'z',
    name: 'Rotate Z',
    face: 'F',
    direction: 'cw',
    description: 'Xoay toàn bộ khối Rubik theo chiều kim đồng hồ theo trục F (nhìn từ trước)',
    alg: 'z',
    color: '#f43f5e',
    group: 'slice_rotation',
  },
];

