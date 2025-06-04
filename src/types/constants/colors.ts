// Korean Traditional Colors (한국 전통 색상)
export const KOREAN_COLORS = {
  // Traditional Korean colors
  TRADITIONAL_RED: 0xcd2e3a as const, // 전통적인 빨강
  TRADITIONAL_BLUE: 0x003478 as const, // 전통적인 파랑
  HANBOK_WHITE: 0xf5f5dc as const, // 한복 흰색
  DANCHEONG_GREEN: 0xa6ce39 as const, // 단청 녹색
  DANCHEONG_GOLD: 0xffd700 as const, // 단청 금색
  DANCHEONG_PURPLE: 0x936eab as const, // 단청 보라색

  // Cyberpunk neon variations
  NEON_RED: 0xff0040 as const, // 네온 분홍
  ELECTRIC_BLUE: 0x00ffff as const, // 네온 청록
  CYBER_GREEN: 0x00ff41 as const, // 네온 초록
  DIGITAL_GOLD: 0xffed4e as const, // 디지털 금색
  NEON_CYAN: 0x00ffff as const, // 네온 시안 추가

  // Basic colors
  BLACK: 0x000000 as const, // 검정
  WHITE: 0xffffff as const, // 흰색
  GRAY: 0x808080 as const, // 회색
  DARK_GRAY: 0x404040 as const, // 진한 회색
  GOLD: 0xffd700 as const, // 금색 추가
  DOJANG_BLUE: 0x1e3a8a as const, // 도장 파랑 추가

  // Trigram stance colors
  GEON: 0xffd700 as const, // Gold for Heaven - 건괘
  TAE: 0x87ceeb as const, // Sky Blue for Lake - 태괘
  LI: 0xff4500 as const, // Orange Red for Fire - 리괘
  JIN: 0x9370db as const, // Medium Purple for Thunder - 진괘
  SON: 0x98fb98 as const, // Pale Green for Wind - 손괘
  GAM: 0x4169e1 as const, // Royal Blue for Water - 감괘
  GAN: 0x8b4513 as const, // Saddle Brown for Mountain - 간괘
  GON: 0x654321 as const, // Dark Brown for Earth - 곤괘

  // Element colors
  HEAVEN_GOLD: 0xffd700 as const, // 건괘 - 하늘의 금색
  LAKE_SILVER: 0xc0c0c0 as const, // 태괘 - 호수의 은색
  FIRE_RED: 0xff4500 as const, // 리괘 - 불의 빨강
  THUNDER_YELLOW: 0xffd700 as const, // 진괘 - 천둥의 노랑
  WIND_GREEN: 0x98fb98 as const, // 손괘 - 바람의 초록
  WATER_BLUE: 0x4169e1 as const, // 감괘 - 물의 파랑
  MOUNTAIN_BROWN: 0x8b4513 as const, // 간괘 - 산의 갈색
  EARTH_ORANGE: 0xcd853f as const, // 곤괘 - 땅의 주황

  // Additional colors referenced in components
  CYAN: 0x00ffff as const,
  SILVER: 0xc0c0c0 as const,
  RED: 0xff0000 as const,
  GREEN: 0x00ff00 as const,
  BLUE: 0x0000ff as const,
  YELLOW: 0xffff00 as const,
  ORANGE: 0xffa500 as const,
  PURPLE: 0x800080 as const,
  NEON_PINK: 0xff1493 as const,
  NEON_GREEN: 0x00ff41 as const,
  NEON_BLUE: 0x0080ff as const,
  ACCENT_BLUE: 0x4169e1 as const,
  GRAY_DARK: 0x404040 as const,
  GRAY_LIGHT: 0xd3d3d3 as const,
  CRITICAL_HIT: 0xff0040 as const,
  CRITICAL_RED: 0xff0000 as const,
  HEALTH_RED: 0xdc143c as const,
  STAMINA_GREEN: 0x32cd32 as const,
  VITAL_POINT: 0xff69b4 as const,
  GON_DARK_BROWN: 0x654321 as const,
  DOJANG_WALL: 0x8b4513 as const,
  WOOD_BROWN: 0xa0522d as const,
} as const;

// Cyberpunk Palette (사이버펑크 팔레트)
export const CYBERPUNK_PALETTE = {
  PRIMARY_CYAN: KOREAN_COLORS.CYAN,
  NEON_RED: KOREAN_COLORS.TRADITIONAL_RED,
  ELECTRIC_BLUE: KOREAN_COLORS.TRADITIONAL_BLUE,
  DIGITAL_GOLD: KOREAN_COLORS.GOLD,
  SHADOW_BLACK: KOREAN_COLORS.BLACK,
  TECH_WHITE: KOREAN_COLORS.WHITE,
} as const;

// Export stance colors for easy access
export const STANCE_COLORS = {
  ...KOREAN_COLORS,
  RED: KOREAN_COLORS.RED,
  GREEN: KOREAN_COLORS.GREEN,
  BLUE: KOREAN_COLORS.BLUE,
  YELLOW: KOREAN_COLORS.YELLOW,
  ORANGE: KOREAN_COLORS.ORANGE,
  PURPLE: KOREAN_COLORS.PURPLE,
  CYAN: KOREAN_COLORS.CYAN,
  // Metals
  GOLD: KOREAN_COLORS.GOLD,
  SILVER: KOREAN_COLORS.SILVER,
  NEON_CYAN: KOREAN_COLORS.NEON_CYAN,
  NEON_PINK: KOREAN_COLORS.NEON_PINK,
  NEON_GREEN: KOREAN_COLORS.NEON_GREEN,
  NEON_BLUE: KOREAN_COLORS.NEON_BLUE,
} as const;

export type KoreanColorKey = keyof typeof KOREAN_COLORS;
export type KoreanColorValue = (typeof KOREAN_COLORS)[KoreanColorKey];
