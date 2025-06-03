// Korean martial arts color constants for cyberpunk aesthetic

// Primary Korean color palette for martial arts theme
export const KOREAN_COLORS = {
  // Traditional Korean colors
  TRADITIONAL_RED: 0xce1126, // 태극기 빨강
  TRADITIONAL_BLUE: 0x003478, // 태극기 파랑
  HANBOK_WHITE: 0xf5f5dc, // 한복 흰색
  DANCHEONG_GREEN: 0x00a651, // 단청 녹색
  DANCHEONG_GOLD: 0xffd700, // 단청 금색

  // Cyberpunk fusion colors
  NEON_CYAN: 0x00ffff, // 사이버펑크 청록
  ELECTRIC_PURPLE: 0x9d00ff, // 전기 보라
  DIGITAL_GOLD: 0xffb000, // 디지털 금
  SHADOW_BLACK: 0x0a0a0a, // 그림자 검정
  TECH_WHITE: 0xe0e0e0, // 기술 흰색

  // Trigram-specific colors (팔괘 색상)
  GEON_GOLD: 0xffd700, // 건괘 - 금색 (하늘)
  TAE_SILVER: 0xc0c0c0, // 태괘 - 은색 (호수)
  LI_RED: 0xff4500, // 리괘 - 빨강 (불)
  JIN_PURPLE: 0x9370db, // 진괘 - 보라 (천둥)
  SON_GREEN: 0x32cd32, // 손괘 - 녹색 (바람)
  GAM_BLUE: 0x4169e1, // 감괘 - 파랑 (물)
  GAN_BROWN: 0x8b4513, // 간괘 - 갈색 (산)
  GON_DARK_BROWN: 0x654321, // 곤괘 - 어두운 갈색 (땅)

  // UI and game colors
  HEALTH_GREEN: 0x00ff00, // 체력 녹색
  HEALTH_YELLOW: 0xffff00, // 체력 노랑 (경고)
  HEALTH_RED: 0xff0000, // 체력 빨강 (위험)
  KI_BLUE: 0x4169e1, // 기력 파랑
  STAMINA_ORANGE: 0xff8c00, // 체력 주황
  PAIN_RED: 0xdc143c, // 고통 빨강

  // Combat effect colors
  CRITICAL_HIT: 0xff69b4, // 치명타 분홍
  VITAL_POINT: 0xff1493, // 급소 타격 진분홍
  BLOCK_SUCCESS: 0x87ceeb, // 성공적 막기 하늘색
  COUNTER_ATTACK: 0xffa500, // 반격 주황

  // Environmental colors
  DOJANG_FLOOR: 0x8b7355, // 도장 바닥 베이지
  DOJANG_WALL: 0x2f2f2f, // 도장 벽 어두운 회색
  NEON_ACCENT: 0x00ffff, // 네온 강조색
  BLOOD_EFFECT: 0x8b0000, // 피 효과 어두운 빨강

  // Common colors for convenience
  WHITE: 0xffffff,
  BLACK: 0x000000,
  GRAY: 0x808080,
  TRANSPARENT: 0x000000, // Use with alpha

  // Add missing color aliases for backward compatibility
  GOLD: 0xffd700, // Alias for DIGITAL_GOLD
  CYAN: 0x00ffff, // Alias for NEON_CYAN
  DOJANG_BLUE: 0x4169e1, // Alias for GAM_BLUE
} as const;

// Color utility functions
export function getTrigramColor(trigram: string): number {
  const colorMap: Record<string, number> = {
    geon: KOREAN_COLORS.GEON_GOLD,
    tae: KOREAN_COLORS.TAE_SILVER,
    li: KOREAN_COLORS.LI_RED,
    jin: KOREAN_COLORS.JIN_PURPLE,
    son: KOREAN_COLORS.SON_GREEN,
    gam: KOREAN_COLORS.GAM_BLUE,
    gan: KOREAN_COLORS.GAN_BROWN,
    gon: KOREAN_COLORS.GON_DARK_BROWN,
  };

  return colorMap[trigram] || KOREAN_COLORS.WHITE;
}

export function getHealthColor(percentage: number): number {
  if (percentage > 60) return KOREAN_COLORS.HEALTH_GREEN;
  if (percentage > 30) return KOREAN_COLORS.HEALTH_YELLOW;
  return KOREAN_COLORS.HEALTH_RED;
}
