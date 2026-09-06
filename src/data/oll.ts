export interface OllCase {
  id: string;
  name: string;
  group: string;
  alg: string;
  setupAlg?: string;
  description: string;
  isLearning?: boolean;
  isLearned?: boolean;
}

export const OLL_GROUPS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'corners', label: 'Corners (2-Look)' },
  { id: 'cross', label: 'Cross' },
  { id: 'edges', label: 'Edges' },
  { id: 'dot', label: 'Dot' },
  { id: 'square', label: 'Square' },
  { id: 'lightning', label: 'Lightning' },
  { id: 'fish', label: 'Fish' },
  { id: 'knight', label: 'Knight' },
  { id: 'awkward', label: 'Awkward' },
  { id: 'p-shape', label: 'P-Shape' },
  { id: 't-shape', label: 'T-Shape' },
  { id: 'c-shape', label: 'C-Shape' },
  { id: 'w-shape', label: 'W-Shape' },
  { id: 'l-shape', label: 'L-Shape' },
  { id: 'i-shape', label: 'I-Shape' },
  { id: 'corners-oriented', label: 'Corners Oriented' },
  { id: 'learning', label: 'Đang học' },
  { id: 'learned', label: 'Đã thuộc' },
];

export const ollCases: OllCase[] = [
  {
    "id": "oll-fish",
    "name": "OLL 27 (Fish / Sune)",
    "group": "corners",
    "alg": "R U R' U R U2 R'",
    "description": "1 corner vàng hướng lên, 3 cái còn lại nhìn ra ngoài",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-antisune",
    "name": "OLL 26 (Anti-Sune)",
    "group": "corners",
    "alg": "R U2 R' U' R U' R'",
    "description": "Ngược chiều với Sune",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-h",
    "name": "OLL 21 (H / Headlights)",
    "group": "corners",
    "alg": "F (R U R' U')3 F'",
    "description": "4 corner đối diện nhau (2 cặp đối)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-pi",
    "name": "OLL 22 (Pi)",
    "group": "corners",
    "alg": "R U2 R2 U' R2 U' R2 U2 R",
    "description": "4 corner nhìn ra 2 bên",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-l",
    "name": "OLL 25 (L / Diagonal)",
    "group": "corners",
    "alg": "x (R' U R D') (R' U' R D) x'",
    "description": "2 corner chéo nhau cùng hướng",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-t",
    "name": "OLL 24 (T / Adjacent)",
    "group": "corners",
    "alg": "x (L U R' U') (L' U R U') x'",
    "description": "2 corner cạnh nhau đối diện",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-u",
    "name": "OLL 23 (U / One-dir)",
    "group": "corners",
    "alg": "R2 D R' U2 R D' R' U2 R'",
    "description": "2 corner cạnh nhau cùng 1 hướng",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-dot",
    "name": "OLL 1 (Dot)",
    "group": "cross",
    "alg": "R U2 R2 F R F' U2 R' F R F'",
    "description": "Không có edge nào đúng hướng",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-line",
    "name": "OLL 45 (Line)",
    "group": "cross",
    "alg": "F R U R' U' F'",
    "description": "Đường thẳng ngang qua tâm (T-Shape)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-l-shape",
    "name": "OLL 44 (L-Shape)",
    "group": "cross",
    "alg": "f R U R' U' f'",
    "description": "Chữ L (2 edge liền kề, P-Shape)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-ne",
    "name": "OLL 33 (No Edges)",
    "group": "edges",
    "alg": "R U R' U' R' F R F'",
    "description": "T-Shape (2 cạnh kề lật)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-fish-shape",
    "name": "OLL 37 (Fish Shape)",
    "group": "cross",
    "alg": "F R' F' R U R U' R'",
    "description": "Dạng con cá (Mounted Fish)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-2",
    "name": "OLL 2 (Dot)",
    "group": "dot",
    "alg": "r U r' U2 r U2 R' U2 R U' r'",
    "description": "Không có cạnh vàng nào hướng lên (Dot)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-3",
    "name": "OLL 3 (Dot)",
    "group": "dot",
    "alg": "r' R2 U R' U r U2 r' U M'",
    "description": "Không có cạnh vàng nào hướng lên (Dot)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-4",
    "name": "OLL 4 (Dot)",
    "group": "dot",
    "alg": "M U' r U2 r' U' R U' R' M'",
    "description": "Không có cạnh vàng nào hướng lên (Dot)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-5",
    "name": "OLL 5 (Square Shape)",
    "group": "square",
    "alg": "l' U2 L U L' U l",
    "description": "Hình khối vuông góc 2x2 (Square)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-6",
    "name": "OLL 6 (Square Shape)",
    "group": "square",
    "alg": "r U2 R' U' R U' r'",
    "description": "Hình khối vuông góc 2x2 (Square)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-7",
    "name": "OLL 7 (Small Lightning Bolt)",
    "group": "lightning",
    "alg": "r U R' U R U2 r'",
    "description": "Hình tia sét nhỏ (Small Lightning)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-8",
    "name": "OLL 8 (Small Lightning Bolt)",
    "group": "lightning",
    "alg": "l' U' L U' L' U2 l",
    "description": "Hình tia sét nhỏ (Small Lightning)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-9",
    "name": "OLL 9 (Fish Shape)",
    "group": "fish",
    "alg": "R U R' U' R' F R2 U R' U' F'",
    "description": "Hình con cá (Fish Shape)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-10",
    "name": "OLL 10 (Fish Shape)",
    "group": "fish",
    "alg": "R U R' U R' F R F' R U2 R'",
    "description": "Hình con cá (Fish Shape)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-11",
    "name": "OLL 11 (Small Lightning Bolt)",
    "group": "lightning",
    "alg": "r U R' U R' F R F' R U2 r'",
    "description": "Hình tia sét nhỏ (Small Lightning)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-12",
    "name": "OLL 12 (Small Lightning Bolt)",
    "group": "lightning",
    "alg": "M' R' U' R U' R' U2 R U' R r'",
    "description": "Hình tia sét nhỏ (Small Lightning)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-13",
    "name": "OLL 13 (Knight Move Shape)",
    "group": "knight",
    "alg": "F U R U' R2 F' R U R U' R'",
    "description": "Hình nước đi quân mã (Knight Move)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-14",
    "name": "OLL 14 (Knight Move Shape)",
    "group": "knight",
    "alg": "R' F R U R' F' R F U' F'",
    "description": "Hình nước đi quân mã (Knight Move)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-15",
    "name": "OLL 15 (Knight Move Shape)",
    "group": "knight",
    "alg": "l' U' l L' U' L U l' U l",
    "description": "Hình nước đi quân mã (Knight Move)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-16",
    "name": "OLL 16 (Knight Move Shape)",
    "group": "knight",
    "alg": "r U r' R U R' U' r U' r'",
    "description": "Hình nước đi quân mã (Knight Move)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-17",
    "name": "OLL 17 (Dot)",
    "group": "dot",
    "alg": "F R' F' R2 r' U R U' R' U' M'",
    "description": "Không có cạnh vàng nào hướng lên (Dot)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-18",
    "name": "OLL 18 (Dot)",
    "group": "dot",
    "alg": "r U R' U R U2 r' r' U' R U' R' U2 r",
    "description": "Không có cạnh vàng nào hướng lên (Dot)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-19",
    "name": "OLL 19 (Dot)",
    "group": "dot",
    "alg": "r' R U R U R' U' M' R' F R F'",
    "description": "Không có cạnh vàng nào hướng lên (Dot)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-20",
    "name": "OLL 20 (Dot)",
    "group": "dot",
    "alg": "r U R' U' M2 U R U' R' U' M'",
    "description": "Không có cạnh vàng nào hướng lên (Dot)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-28",
    "name": "OLL 28 (Corners Oriented)",
    "group": "corners-oriented",
    "alg": "r U R' U' r' R U R U' R'",
    "description": "4 góc vàng đã hướng lên (Corners Oriented)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-29",
    "name": "OLL 29 (Awkward Shape)",
    "group": "awkward",
    "alg": "R U R' U' R U' R' F' U' F R U R'",
    "description": "Hình ziczac / thế góc lệch (Awkward)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-30",
    "name": "OLL 30 (Awkward Shape)",
    "group": "awkward",
    "alg": "F R' F R2 U' R' U' R U R' F2",
    "description": "Hình ziczac / thế góc lệch (Awkward)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-31",
    "name": "OLL 31 (P Shape)",
    "group": "p-shape",
    "alg": "R' U' F U R U' R' F' R",
    "description": "Hình chữ P",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-32",
    "name": "OLL 32 (P Shape)",
    "group": "p-shape",
    "alg": "L U F' U' L' U L F L'",
    "description": "Hình chữ P",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-34",
    "name": "OLL 34 (C Shape)",
    "group": "c-shape",
    "alg": "R U R2 U' R' F R U R U' F'",
    "description": "Hình chữ C",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-35",
    "name": "OLL 35 (Fish Shape)",
    "group": "fish",
    "alg": "R U2 R' R' F R F' R U2 R'",
    "description": "Hình con cá (Fish Shape)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-36",
    "name": "OLL 36 (W Shape)",
    "group": "w-shape",
    "alg": "L' U' L U' L' U L U L F' L' F",
    "description": "Hình chữ W",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-38",
    "name": "OLL 38 (W Shape)",
    "group": "w-shape",
    "alg": "R U R' U R U' R' U' R' F R F'",
    "description": "Hình chữ W",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-39",
    "name": "OLL 39 (Big Lightning Bolt)",
    "group": "lightning",
    "alg": "L F' L' U' L U F U' L'",
    "description": "Hình tia sét lớn (Big Lightning)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-40",
    "name": "OLL 40 (Big Lightning Bolt)",
    "group": "lightning",
    "alg": "R' F R U R' U' F' U R",
    "description": "Hình tia sét lớn (Big Lightning)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-41",
    "name": "OLL 41 (Awkward Shape)",
    "group": "awkward",
    "alg": "R U R' U R U2 R' F R U R' U' F'",
    "description": "Hình ziczac / thế góc lệch (Awkward)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-42",
    "name": "OLL 42 (Awkward Shape)",
    "group": "awkward",
    "alg": "R' U' R U' R' U2 R F R U R' U' F'",
    "description": "Hình ziczac / thế góc lệch (Awkward)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-43",
    "name": "OLL 43 (P Shape)",
    "group": "p-shape",
    "alg": "F' U' L' U L F",
    "description": "Hình chữ P",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-46",
    "name": "OLL 46 (C Shape)",
    "group": "c-shape",
    "alg": "R' U' R' F R F' U R",
    "description": "Hình chữ C",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-47",
    "name": "OLL 47 (Small L Shape)",
    "group": "l-shape",
    "alg": "R' U' R' F R F' R' F R F' U R",
    "description": "Hình chữ L nhỏ (Small L)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-48",
    "name": "OLL 48 (Small L Shape)",
    "group": "l-shape",
    "alg": "F R U R' U' R U R' U' F'",
    "description": "Hình chữ L nhỏ (Small L)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-49",
    "name": "OLL 49 (Small L Shape)",
    "group": "l-shape",
    "alg": "r U' r2 U r2 U r2 U' r",
    "description": "Hình chữ L nhỏ (Small L)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-50",
    "name": "OLL 50 (Small L Shape)",
    "group": "l-shape",
    "alg": "r' U r2 U' r2 U' r2 U r'",
    "description": "Hình chữ L nhỏ (Small L)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-51",
    "name": "OLL 51 (I Shape)",
    "group": "i-shape",
    "alg": "F U R U' R' U R U' R' F'",
    "description": "Hình thanh thẳng (I-Shape)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-52",
    "name": "OLL 52 (I Shape)",
    "group": "i-shape",
    "alg": "R U R' U R U' B U' B' R'",
    "description": "Hình thanh thẳng (I-Shape)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-53",
    "name": "OLL 53 (Small L Shape)",
    "group": "l-shape",
    "alg": "l' U2 L U L' U' L U L' U l",
    "description": "Hình chữ L nhỏ (Small L)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-54",
    "name": "OLL 54 (Small L Shape)",
    "group": "l-shape",
    "alg": "(r U2 R' U') R U R' U' R U' r'",
    "description": "Hình chữ L nhỏ (Small L)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-55",
    "name": "OLL 55 (I Shape)",
    "group": "i-shape",
    "alg": "R' F R U R U' R2 F' R2 U' R' U R U R'",
    "description": "Hình thanh thẳng (I-Shape)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-56",
    "name": "OLL 56 (I Shape)",
    "group": "i-shape",
    "alg": "(r' U' r) U' R' U R U' R' U R r' U r",
    "description": "Hình thanh thẳng (I-Shape)",
    "isLearning": false,
    "isLearned": false
  },
  {
    "id": "oll-57",
    "name": "OLL 57 (Corners Oriented)",
    "group": "corners-oriented",
    "alg": "R U R' U' M' U R U' r'",
    "description": "4 góc vàng đã hướng lên (Corners Oriented)",
    "isLearning": false,
    "isLearned": false
  }
];
