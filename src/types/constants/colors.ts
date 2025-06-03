// Korean martial arts color palette for Black Trigram

export const KOREAN_COLORS = {
  // Traditional Korean colors (단청색)
  TRADITIONAL_RED: 0xcd4c3a, // 전통 적색 - 단청의 붉은색
  TRADITIONAL_BLUE: 0x003468, // 전통 청색 - 단청의 파란색
  HANBOK_WHITE: 0xf5f5dc, // 한복 흰색 - 자연스러운 흰색
  DANCHEONG_GREEN: 0x00a651, // 단청 녹색
  DANCHEONG_GOLD: 0xffd700, // 단청 금색
  DANCHEONG_PURPLE: 0x9370db, // 단청 자주색

  // Cyberpunk neon colors for modern adaptation
  NEON_CYAN: 0x00ffff, // 네온 청록색
  CYAN: 0x00ffff, // 청록색
  NEON_RED: 0xff0040, // 네온 적색
  NEON_GREEN: 0x00ff00, // 네온 녹색
  NEON_PURPLE: 0xbf00ff, // 네온 자주색
  ELECTRIC_BLUE: 0x0080ff, // 전기 청색

  // Additional cyberpunk integration
  MATRIX_GREEN: 0x00ff41, // 매트릭스 녹색 - Added missing color
  HOLOGRAM_BLUE: 0x00d4ff, // 홀로그램 청색
  DATA_STREAM: 0x40e0d0, // 데이터 스트림
  CYBER_PINK: 0xff1493, // 사이버 분홍
  NEON_ORANGE: 0xff6600, // 네온 주황

  // Natural material colors for authentic dojang environment
  WOOD_BROWN: 0x8b4513, // 나무 갈색
  BAMBOO_GREEN: 0x98fb98, // 대나무 녹색
  STONE_GRAY: 0x708090, // 돌 회색
  EARTH_BROWN: 0xa0522d, // 흙 갈색
  RICE_PAPER: 0xfffff0, // 한지 색상

  // Combat and status colors
  HEALTH_GREEN: 0x32cd32, // 체력 녹색
  HEALTH_YELLOW: 0xffd700, // 체력 황색
  HEALTH_RED: 0xff4500, // 체력 적색
  DANGER_RED: 0xff4500, // 위험 적색
  WARNING_ORANGE: 0xffa500, // 경고 주황색
  KI_BLUE: 0x4169e1, // 기력 청색
  STAMINA_YELLOW: 0xffd700, // 체력 황색
  STAMINA_ORANGE: 0xffa500, // 체력 주황색

  // Special combat effect colors
  CRITICAL_HIT: 0xff0040, // 치명타 색상
  VITAL_POINT: 0xffd700, // 급소 색상
  CRITICAL_RED: 0xff0040, // 치명타 색상

  // UI and interface colors
  BLACK: 0x000000, // 검정
  WHITE: 0xffffff, // 흰색
  GRAY: 0x808080, // 회색
  LIGHT_GRAY: 0xd3d3d3, // 연한 회색
  DARK_GRAY: 0x2f2f2f, // 어두운 회색
  GRAY_DARK: 0x2f2f2f, // 어두운 회색
  GRAY_LIGHT: 0xd3d3d3, // 연한 회색
  GOLD: 0xffd700, // 금색
  SILVER: 0xc0c0c0, // 은색

  // Basic colors
  RED: 0xff0000, // 빨강
  GREEN: 0x00ff00, // 초록
  BLUE: 0x0000ff, // 파랑
  YELLOW: 0xffff00, // 노랑
  ORANGE: 0xffa500, // 주황

  // Dojang environment colors
  DOJANG_BLUE: 0x003468, // 도장 청색

  // Trigram stance colors (팔괘 색상)
  GEON_GOLD: 0xffd700, // 건괘 - 하늘/금
  TAE_CYAN: 0x87ceeb, // 태괘 - 연못/청록
  TAE_SILVER: 0xc0c0c0, // 태괘 은색
  LI_ORANGE: 0xff4500, // 리괘 - 불/주황
  JIN_PURPLE: 0x9370db, // 진괘 - 천둥/자주
  SON_GREEN: 0x98fb98, // 손괘 - 바람/녹색
  GAM_BLUE: 0x4169e1, // 감괘 - 물/청색
  GAN_BROWN: 0x8b4513, // 간괘 - 산/갈색
  GON_YELLOW: 0xdaa520, // 곤괘 - 땅/황색
  GON_DARK_BROWN: 0x654321, // 곤괘 어두운 갈색

  // Blood and damage effects
  BLEED_RED: 0xdc143c, // 출혈 적색
} as const;

export type KoreanColor = keyof typeof KOREAN_COLORS;

// Color palette groups for easy theming
export const COLOR_PALETTES = {
  TRADITIONAL: [
    KOREAN_COLORS.TRADITIONAL_RED,
    KOREAN_COLORS.TRADITIONAL_BLUE,
    KOREAN_COLORS.DANCHEONG_GREEN,
    KOREAN_COLORS.DANCHEONG_GOLD,
    KOREAN_COLORS.HANBOK_WHITE,
  ],
  CYBERPUNK: [
    KOREAN_COLORS.NEON_CYAN,
    KOREAN_COLORS.NEON_RED,
    KOREAN_COLORS.ELECTRIC_BLUE,
    KOREAN_COLORS.NEON_PURPLE,
    KOREAN_COLORS.MATRIX_GREEN,
  ],
  NATURAL: [
    KOREAN_COLORS.WOOD_BROWN,
    KOREAN_COLORS.BAMBOO_GREEN,
    KOREAN_COLORS.STONE_GRAY,
    KOREAN_COLORS.EARTH_BROWN,
    KOREAN_COLORS.RICE_PAPER,
  ],
  TRIGRAMS: [
    KOREAN_COLORS.GEON_GOLD,
    KOREAN_COLORS.TAE_CYAN,
    KOREAN_COLORS.LI_ORANGE,
    KOREAN_COLORS.JIN_PURPLE,
    KOREAN_COLORS.SON_GREEN,
    KOREAN_COLORS.GAM_BLUE,
    KOREAN_COLORS.GAN_BROWN,
    KOREAN_COLORS.GON_YELLOW,
  ],
} as const;

// Helper function to get trigram colors
export function getTrigramColor(stance: string): number {
  const colorMap: Record<string, number> = {
    geon: KOREAN_COLORS.GEON_GOLD,
    tae: KOREAN_COLORS.TAE_CYAN,
    li: KOREAN_COLORS.LI_ORANGE,
    jin: KOREAN_COLORS.JIN_PURPLE,
    son: KOREAN_COLORS.SON_GREEN,
    gam: KOREAN_COLORS.GAM_BLUE,
    gan: KOREAN_COLORS.GAN_BROWN,
    gon: KOREAN_COLORS.GON_YELLOW,
  };
  return colorMap[stance] || KOREAN_COLORS.WHITE;
}
