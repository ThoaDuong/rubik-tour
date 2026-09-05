export interface PllCase {
  id: string;
  name: string;
  group: string;
  alg: string;
  description: string;
  probability: string;
  isLearning?: boolean;
}

export const PLL_GROUPS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'corners', label: 'Corner' },
  { id: 'edges', label: 'Edge' },
  { id: 'both', label: 'Corner + Edge' },
  { id: 'learning', label: '⭐ Đang học' },
];

export const pllCases: PllCase[] = [
  // ─── SKIP ────────────────────────────────────────────────────────────────
  {
    id: 'pll-skip',
    name: 'Skip',
    group: 'both',
    alg: '',
    description: 'PLL đã solved',
    probability: '1/72',
    isLearning: false,
  },

  // ─── CORNERS ONLY ────────────────────────────────────────────────────────
  {
    id: 'pll-aa',
    name: 'Aa',
    group: 'corners',
    alg: "x R' U R' D2 R U' R' D2 R2",
    description: 'Adjacent corner swap (A-perm)',
    probability: '1/18',
    isLearning: true,
  },
  {
    id: 'pll-ab',
    name: 'Ab',
    group: 'corners',
    alg: "x R2 D2 R U R' D2 R U' R",
    description: 'Adjacent corner swap (mirror)',
    probability: '1/18',
    isLearning: false,
  },
  {
    id: 'pll-e',
    name: 'E',
    group: 'corners',
    alg: "x' R U' R' D R U R' D' R U R' D R U' R' D'",
    description: 'Diagonal corner swap',
    probability: '1/36',
    isLearning: false,
  },

  // ─── EDGES ONLY ──────────────────────────────────────────────────────────
  {
    id: 'pll-ua',
    name: 'Ua',
    group: 'edges',
    alg: "R U' R U R U R U' R' U' R2",
    description: '3-edge cycle CCW (U-perm)',
    probability: '1/18',
    isLearning: true,
  },
  {
    id: 'pll-ub',
    name: 'Ub',
    group: 'edges',
    alg: "R2 U R U R' U' R' U' R' U R'",
    description: '3-edge cycle CW (U-perm)',
    probability: '1/18',
    isLearning: true,
  },
  {
    id: 'pll-h',
    name: 'H',
    group: 'edges',
    alg: "M2 U M2 U2 M2 U M2",
    description: 'Swap all 4 edges opposite',
    probability: '1/72',
    isLearning: false,
  },
  {
    id: 'pll-z',
    name: 'Z',
    group: 'edges',
    alg: "M2 U M2 U M' U2 M2 U2 M'",
    description: 'Swap 4 edges adjacent pairs',
    probability: '1/36',
    isLearning: false,
  },

  // ─── CORNER + EDGE ────────────────────────────────────────────────────────
  {
    id: 'pll-t',
    name: 'T',
    group: 'both',
    alg: "R U R' U' R' F R2 U' R' U' R U R' F'",
    description: 'Swap 2 corners + 2 edges (T shape)',
    probability: '1/18',
    isLearning: true,
  },
  {
    id: 'pll-y',
    name: 'Y',
    group: 'both',
    alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    description: 'Diagonal corner + edge swaps',
    probability: '1/18',
    isLearning: false,
  },
  {
    id: 'pll-f',
    name: 'F',
    group: 'both',
    alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    description: 'F-perm',
    probability: '1/18',
    isLearning: false,
  },
  {
    id: 'pll-v',
    name: 'V',
    group: 'both',
    alg: "R' U R' U' y R' F' R2 U' R' U R' F R F",
    description: 'V-perm',
    probability: '1/18',
    isLearning: false,
  },
  {
    id: 'pll-ra',
    name: 'Ra',
    group: 'both',
    alg: "R U R' F' R U2 R' U2 R' F R U R U2 R'",
    description: 'R-perm A',
    probability: '1/18',
    isLearning: false,
  },
  {
    id: 'pll-rb',
    name: 'Rb',
    group: 'both',
    alg: "R' U2 R U2 R' F R U R' U' R' F' R2",
    description: 'R-perm B',
    probability: '1/18',
    isLearning: false,
  },
  {
    id: 'pll-ja',
    name: 'Ja',
    group: 'both',
    alg: "x R2 F R F' R U2 r' U r U2",
    description: 'J-perm A',
    probability: '1/18',
    isLearning: false,
  },
  {
    id: 'pll-jb',
    name: 'Jb',
    group: 'both',
    alg: "R U R' F' R U R' U' R' F R2 U' R'",
    description: 'J-perm B (same as T-perm variant)',
    probability: '1/18',
    isLearning: false,
  },
  {
    id: 'pll-g',
    name: 'Ga',
    group: 'both',
    alg: "R2 U R' U R' U' R U' R2 U' D R' U R D'",
    description: 'G-perm A',
    probability: '1/18',
    isLearning: false,
  },
  {
    id: 'pll-na',
    name: 'Na',
    group: 'both',
    alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
    description: 'N-perm A (hardest)',
    probability: '1/72',
    isLearning: false,
  },
];
