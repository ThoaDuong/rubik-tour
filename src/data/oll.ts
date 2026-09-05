export interface OllCase {
  id: string;
  name: string;
  group: string;
  alg: string;
  setupAlg?: string;
  description: string;
  youtubeRef?: string;
  isLearning?: boolean;
}

export const OLL_GROUPS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'cross', label: 'Cross' },
  { id: 'corners', label: 'Corners' },
  { id: 'edges', label: 'Edges' },
  { id: 'learning', label: '⭐ Đang học' },
];

export const ollCases: OllCase[] = [
  // ─── CROSS ───────────────────────────────────────────────────────────────
  {
    id: 'oll-dot',
    name: 'Dot',
    group: 'cross',
    alg: "R U2 R2 F R F' U2 R' F R F'",
    description: 'Không có edge nào đúng hướng',
    isLearning: false,
  },
  {
    id: 'oll-cross',
    name: 'Cross',
    group: 'cross',
    alg: "F (R U R' U')3 F'",
    description: 'Cross hoàn chỉnh, không cần alg',
    isLearning: false,
  },
  {
    id: 'oll-line',
    name: 'Line',
    group: 'cross',
    alg: "F R U R' U' F'",
    description: 'Đường thẳng ngang qua tâm',
    isLearning: false,
  },
  {
    id: 'oll-l-shape',
    name: 'L-Shape',
    group: 'cross',
    alg: "f R U R' U' f'",
    description: 'Chữ L (2 edge liền kề)',
    isLearning: false,
  },

  // ─── CORNERS (CFOP 2-look OLL) ────────────────────────────────────────
  {
    id: 'oll-fish',
    name: 'Fish / Sune',
    group: 'corners',
    alg: "R U R' U R U2 R'",
    description: '1 corner vàng hướng lên, 3 cái còn lại nhìn ra ngoài',
    youtubeRef: 'https://www.youtube.com/watch?v=GhmYBgLoQQg',
    isLearning: true,
  },
  {
    id: 'oll-antisune',
    name: 'Anti-Sune',
    group: 'corners',
    alg: "R U2 R' U' R U' R'",
    description: 'Ngược chiều với Sune',
    isLearning: false,
  },
  {
    id: 'oll-h',
    name: 'H (Headlights)',
    group: 'corners',
    alg: "F (R U R' U')3 F'",
    description: '4 corner đối diện nhau (2 cặp đối)',
    youtubeRef: 'https://www.youtube.com/watch?v=GhmYBgLoQQg',
    isLearning: true,
  },
  {
    id: 'oll-pi',
    name: 'Pi',
    group: 'corners',
    alg: "R U2 R2 U' R2 U' R2 U2 R",
    description: '4 corner nhìn ra 2 bên',
    youtubeRef: 'https://www.youtube.com/watch?v=GhmYBgLoQQg',
    isLearning: true,
  },
  {
    id: 'oll-l',
    name: 'L (Diagonal)',
    group: 'corners',
    alg: "x (R' U R D') (R' U' R D)",
    description: '2 corner chéo nhau cùng hướng',
    youtubeRef: 'https://www.youtube.com/watch?v=GhmYBgLoQQg',
    isLearning: true,
  },
  {
    id: 'oll-t',
    name: 'T (Adjacent)',
    group: 'corners',
    alg: "x (L U R' U') (L' U R U')",
    description: '2 corner cạnh nhau đối diện',
    youtubeRef: 'https://www.youtube.com/watch?v=GhmYBgLoQQg',
    isLearning: true,
  },
  {
    id: 'oll-u',
    name: 'U (One-dir)',
    group: 'corners',
    alg: "R2 D R' U2 R D' R' U2 R'",
    description: '2 corner cạnh nhau cùng 1 hướng',
    youtubeRef: 'https://www.youtube.com/watch?v=GhmYBgLoQQg',
    isLearning: true,
  },

  // ─── EDGES ───────────────────────────────────────────────────────────────
  {
    id: 'oll-ne',
    name: 'No Edges',
    group: 'edges',
    alg: "R U R' U' R' F R F'",
    description: 'Không có edge nào đúng hướng',
    isLearning: false,
  },
];
