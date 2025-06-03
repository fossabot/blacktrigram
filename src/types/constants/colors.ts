// Korean martial arts color palette for Black Trigram (흑괘)

export const KOREAN_COLORS = {
  // Traditional Korean colors (전통 한국 색상)
  TRADITIONAL_RED: 0xcd2e3a, // 전통적인 빨강
  TRADITIONAL_BLUE: 0x003478, // 전통적인 파랑
  HANBOK_WHITE: 0xf5f5dc, // 한복 흰색
  DANCHEONG_GREEN: 0xa61e1e, // 단청 녹색
  DANCHEONG_GOLD: 0xffd700, // 단청 금색
  DANCHEONG_PURPLE: 0x9370db, // 단청 보라색

  // Basic spectrum colors
  RED: 0xff0000, // 빨강
  GREEN: 0x00ff00, // 초록
  BLUE: 0x0000ff, // 파랑
  YELLOW: 0xffff00, // 노랑
  ORANGE: 0xffa500, // 주황
  PURPLE: 0x800080, // 보라
  CYAN: 0x00ffff, // 청록
  WHITE: 0xffffff, // 흰색
  BLACK: 0x000000, // 검정
  GOLD: 0xffd700, // 금색
  SILVER: 0xc0c0c0, // 은색

  // Cyberpunk neon palette - FIXED: Removed duplicates
  NEON_CYAN: 0x00ffff, // 네온 청록
  NEON_PINK: 0xff10f0, // 네온 분홍 - Changed from duplicate
  NEON_GREEN: 0x39ff14, // 네온 초록 - Kept brighter version
  NEON_BLUE: 0x1e90ff, // 네온 파랑

  // Trigram specific colors (팔괘 색상)
  HEAVEN_GOLD: 0xffd700, // 건괘 - 하늘의 금색
  LAKE_SILVER: 0xc0c0c0, // 태괘 - 호수의 은색
  FIRE_RED: 0xff4500, // 리괘 - 불의 빨강
  THUNDER_YELLOW: 0xffd700, // 진괘 - 천둥의 노랑
  WIND_GREEN: 0x32cd32, // 손괘 - 바람의 초록
  WATER_BLUE: 0x4169e1, // 감괘 - 물의 파랑
  MOUNTAIN_BROWN: 0x8b4513, // 간괘 - 산의 갈색
  EARTH_ORANGE: 0xd2691e, // 곤괘 - 땅의 주황

  // Game state colors - FIXED: Removed duplicates, used unique names
  HEALTH_RED: 0xff3333, // 체력 빨강 - Made distinct from RED
  KI_BLUE: 0x3366ff, // 기력 파랑 - Made distinct from BLUE
  STAMINA_GREEN: 0x33ff33, // 스태미나 초록
  CRITICAL_HIT: 0xff6600, // 치명타 주황 - Changed from duplicate RED
  VITAL_POINT: 0xff0040, // 급소 타격 분홍 - Made distinct
  BLEED_RED: 0xd00000, // 출혈 진한 빨강 - Made distinct

  // UI colors
  DOJANG_BLUE: 0x1a237e, // 도장 파랑
  GON_DARK_BROWN: 0x654321, // 곤괘 진한 갈색
  GRAY_DARK: 0x333333, // 진한 회색
  GRAY_LIGHT: 0xcccccc, // 밝은 회색
  CRITICAL_RED: 0xff0000, // 치명적 빨강

  // Stance-specific colors for Korean martial arts
  GEON: 0xffd700, // 건괘 - 하늘
  TAE: 0x87ceeb, // 태괘 - 호수
  LI: 0xff4500, // 리괘 - 불
  JIN: 0x9370db, // 진괘 - 천둥
  SON: 0x98fb98, // 손괘 - 바람
  GAM: 0x4169e1, // 감괘 - 물
  GAN: 0x8b4513, // 간괘 - 산
  GON: 0x654321, // 곤괘 - 땅
} as const;

// Cyberpunk color palette aliases
export const CYBERPUNK_PALETTE = {
  PRIMARY_CYAN: KOREAN_COLORS.CYAN,
  NEON_RED: KOREAN_COLORS.TRADITIONAL_RED,
  ELECTRIC_BLUE: KOREAN_COLORS.DOJANG_BLUE,
  DIGITAL_GOLD: KOREAN_COLORS.GOLD,
  SHADOW_BLACK: KOREAN_COLORS.BLACK,
  TECH_WHITE: KOREAN_COLORS.WHITE,
} as const;

// Export individual color values for convenience
export const {
  RED,
  GREEN,
  BLUE,
  YELLOW,
  ORANGE,
  PURPLE,
  CYAN,
  WHITE,
  BLACK,
  GOLD,
  SILVER,
  NEON_CYAN,
  NEON_PINK,
  NEON_GREEN,
  NEON_BLUE,
  GEON,
  TAE,
  LI,
  JIN,
  SON,
  GAM,
  GAN,
  GON,
} = KOREAN_COLORS;
