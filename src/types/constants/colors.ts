// Korean-themed color palette for Black Trigram
export const KOREAN_COLORS = {
  // Base colors
  WHITE: 0xffffff,
  BLACK: 0x000000,
  RED: 0xff0047,
  BLUE: 0x374151,
  YELLOW: 0xffd700,
  CYAN: 0x00ffff,
  SILVER: 0xc0c0c0,

  // Korean traditional colors
  TRADITIONAL_RED: 0xdc143c,
  KOREAN_BLUE: 0x003f7f,
  HANBOK_YELLOW: 0xffc72c,
  ELECTRIC_BLUE: 0x0eaefe,
  DOJANG_BLUE: 0x2c4570,
  ACCENT_BLUE: 0x00d2ff,
  GOLD: 0xffd700,
  DARK_BLUE: 0x1e293b,
  NEON_GREEN: 0x39ff14,
  NEON_PINK: 0xff007f,
  DIGITAL_GREEN: 0x00ff80,

  // Gray scale
  GRAY_DARK: 0x2d3748,
  GRAY_LIGHT: 0xa0aec0,
  GRAY_MEDIUM: 0x718096,

  // Status colors
  CRITICAL_RED: 0xe53e3e,
  ORANGE: 0xed8936,
  GREEN: 0x48bb78,

  // Trigram stance colors (팔괘 색상)
  geon: 0xffd700, // ☰ Heaven - Gold
  tae: 0x87ceeb, // ☱ Lake - Sky Blue
  li: 0xff4500, // ☲ Fire - Orange Red
  jin: 0x9370db, // ☳ Thunder - Medium Orchid
  son: 0x98fb98, // ☴ Wind - Pale Green
  gam: 0x4169e1, // ☵ Water - Royal Blue
  gan: 0x8b4513, // ☶ Mountain - Saddle Brown
  gon: 0x654321, // ☷ Earth - Dark Brown
} as const;

export type KoreanColor = keyof typeof KOREAN_COLORS;
