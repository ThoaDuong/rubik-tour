export interface CrossCase {
  id: string;
  name: string;
  group: string;
  alg: string;
  setupAlg?: string;
  description: string;
  tip?: string;
  isLearning?: boolean;
  isLearned?: boolean;
}

export const CROSS_GROUPS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'basics', label: 'Cơ bản' },
  { id: 'u-layer', label: 'Từ U Layer' },
  { id: 'd-layer', label: 'Từ D Layer' },
  { id: 'middle', label: 'Từ E Slice' },
  { id: 'efficiency', label: 'Kỹ thuật nâng cao' },
  { id: 'learning', label: 'Đang học' },
  { id: 'learned', label: 'Đã thuộc' },
];

export const crossCases: CrossCase[] = [
  // === BASICS ===
  {
    id: 'cross-edge-d-correct',
    name: 'Cạnh ở D — Đúng vị trí & chiều',
    group: 'basics',
    alg: '',
    setupAlg: "F2",
    description: 'Cạnh đã ở mặt D đúng vị trí và đúng chiều. Không cần làm gì!',
    tip: 'Đây là case lý tưởng — giữ nguyên và tiếp tục các cạnh còn lại.',
    isLearning: false,
    isLearned: false,
  },
  {
    id: 'cross-edge-d-flip',
    name: 'Cạnh ở D — Đúng vị trí nhưng bị lật',
    group: 'basics',
    alg: "F2 U F U' F",
    setupAlg: "F' U F U' F2",
    description: 'Cạnh trắng đang ở đúng vị trí ở mặt D nhưng màu trắng nhìn vào mặt bên.',
    tip: 'Đưa cạnh lên U rồi insert lại đúng chiều.',
    isLearning: false,
    isLearned: false,
  },
  {
    id: 'cross-edge-d-wrong-slot',
    name: 'Cạnh ở D — Sai vị trí',
    group: 'basics',
    alg: "F2 U' R2",
    setupAlg: "R2 U F2",
    description: 'Cạnh đang ở mặt D nhưng sai vị trí (ví dụ: cạnh F nằm ở R).',
    tip: 'Dùng D move để xoay cạnh sang slot đúng rồi insert.',
    isLearning: false,
    isLearned: false,
  },

  // === FROM U LAYER ===
  {
    id: 'cross-u-white-up',
    name: 'Cạnh ở U — Màu trắng nhìn lên',
    group: 'u-layer',
    alg: "U F2",
    setupAlg: "F2 U'",
    description: 'Cạnh cross nằm ở U layer, màu trắng hướng lên (top face), màu bên khớp với center.',
    tip: '1 U để align với center, sau đó F2 insert thẳng xuống D.',
    isLearning: false,
    isLearned: false,
  },
  {
    id: 'cross-u-white-front',
    name: 'Cạnh ở U — Màu trắng nhìn ra trước',
    group: 'u-layer',
    alg: "F' U' F",
    setupAlg: "F' U F",
    description: 'Cạnh ở UF, màu trắng nhìn vào mặt trước, màu bên nhìn lên.',
    tip: "F' đưa cạnh vào E slice, rồi dùng U' F để insert.",
    isLearning: false,
    isLearned: false,
  },
  {
    id: 'cross-u-white-right',
    name: 'Cạnh ở U — Màu trắng nhìn sang phải',
    group: 'u-layer',
    alg: "R' F R",
    setupAlg: "R' F' R",
    description: 'Cạnh ở UR, màu trắng nhìn sang mặt phải.',
    tip: "Xoay cạnh về UF bằng U move rồi xử lý tương tự.",
    isLearning: false,
    isLearned: false,
  },
  {
    id: 'cross-u-align-insert',
    name: 'Cạnh ở U — Align rồi insert',
    group: 'u-layer',
    alg: "U' F2",
    setupAlg: "F2 U",
    description: "Cạnh ở UF nhưng màu bên không khớp center. Dùng U' để align màu rồi F2.",
    tip: 'Luôn kiểm tra màu bên của cạnh phải khớp với center trước khi insert.',
    isLearning: false,
    isLearned: false,
  },

  // === FROM D LAYER / E SLICE ===
  {
    id: 'cross-middle-horizontal',
    name: 'Cạnh ở E Slice — Nằm ngang',
    group: 'middle',
    alg: "F U F'",
    setupAlg: "F U' F'",
    description: 'Cạnh nằm ở tầng giữa (FR, FL, BR, BL), màu trắng nhìn ra mặt bên.',
    tip: 'Dùng 1 face move để đưa cạnh lên U layer, sau đó xử lý bình thường.',
    isLearning: false,
    isLearned: false,
  },
  {
    id: 'cross-middle-white-front',
    name: 'Cạnh ở E Slice — Màu trắng nhìn trước',
    group: 'middle',
    alg: "U' R' U",
    setupAlg: "U' R U",
    description: 'Cạnh nằm ở FR, màu trắng nhìn ra mặt trước.',
    tip: 'Dùng R move để đưa cạnh lên UR rồi tiếp tục.',
    isLearning: false,
    isLearned: false,
  },

  // === D LAYER CASES ===
  {
    id: 'cross-d-one-move',
    name: 'Cạnh ở D Layer — Cần 1 nước',
    group: 'd-layer',
    alg: "F2",
    setupAlg: "F2",
    description: 'Cạnh đang ở FD, màu trắng nhìn vào mặt trước (và màu bên nhìn xuống D).',
    tip: 'F2 là đủ! Đây là case 1-move nhanh nhất.',
    isLearning: false,
    isLearned: false,
  },
  {
    id: 'cross-d-rotate-insert',
    name: 'Cạnh ở D Layer — Sai slot',
    group: 'd-layer',
    alg: "D' F2",
    setupAlg: "F2 D",
    description: "Cạnh ở D layer nhưng sai vị trí. Dùng D' để xoay rồi insert.",
    tip: 'Ưu tiên không làm hỏng các cạnh đã đúng khi dùng D move.',
    isLearning: false,
    isLearned: false,
  },

  // === EFFICIENCY / ADVANCED ===
  {
    id: 'cross-4move',
    name: 'Cross 4 nước — Kỹ thuật cơ bản',
    group: 'efficiency',
    alg: "F R' D' R",
    setupAlg: "R' D R F'",
    description: 'Một ví dụ điển hình của cross 4 nước. Mục tiêu: giải cross trong ≤ 8 nước.',
    tip: 'Lên sub-8 cross bằng cách luyện tập nhận diện trước khi bắt đầu xoay.',
    isLearning: false,
    isLearned: false,
  },
  {
    id: 'cross-lookahead',
    name: 'Kỹ thuật nhìn trước (Lookahead)',
    group: 'efficiency',
    alg: "D F2 D' R2",
    setupAlg: "R2 D F2 D'",
    description: 'Giải 2 cạnh liên tiếp mà không dừng lại. Thực hành nhìn trước trong khi xoay.',
    tip: 'Khi đang insert cạnh 1, hãy xác định vị trí cạnh 2 bằng mắt.',
    isLearning: false,
    isLearned: false,
  },
  {
    id: 'cross-color-neutral',
    name: 'Color Neutral — Chọn màu cross',
    group: 'efficiency',
    alg: "U2 F2 R2 D'",
    setupAlg: "D R2 F2 U2",
    description: 'Thử giải cross với màu trắng VÀ màu vàng, chọn cái nào dễ hơn.',
    tip: 'Color neutral giúp giảm trung bình 0.5 giây mỗi lần giải.',
    isLearning: false,
    isLearned: false,
  },
  {
    id: 'cross-x-cross',
    name: 'X-Cross — Giải cross + 1 F2L pair',
    group: 'efficiency',
    alg: "R' U' R F' U' F",
    setupAlg: "F' U F R' U R",
    description: 'Kỹ thuật nâng cao: giải cross và đồng thời đưa 1 cặp F2L vào vị trí.',
    tip: 'X-cross tiết kiệm được 3-5 nước so với giải riêng. Cần luyện tập nhận diện nhiều.',
    isLearning: false,
    isLearned: false,
  },
];
