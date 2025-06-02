// Korean-themed color palette for Black Trigram
export const KOREAN_COLORS = {
  // Base colors
  WHITE: 0xffffff,
  BLACK: 0x000000,
  BLUE: 0x374151, // A muted blue
  CYAN: 0x00ffff,
  SILVER: 0xc0c0c0,

  // Korean traditional colors
  TRADITIONAL_RED: 0xdc143c, // Crimson, a deep red
  KOREAN_BLUE: 0x003f7f, // Deep blue, like traditional pottery
  HANBOK_YELLOW: 0xffc72c, // Warm yellow, like traditional silk

  // Cyberpunk & UI Accent Colors
  ELECTRIC_BLUE: 0x0eaefe, // Bright, vibrant blue
  DOJANG_BLUE: 0x2c4570, // A darker, more serious blue for environments
  ACCENT_BLUE: 0x00d2ff, // A lighter, vibrant accent blue
  GOLD: 0xffd700, // Standard gold color
  DARK_BLUE: 0x1e293b, // Very dark blue, good for backgrounds
  NEON_GREEN: 0x39ff14, // Bright neon green
  NEON_PINK: 0xff007f, // Bright neon pink
  DIGITAL_GREEN: 0x00ff80, // A more digital, less intense green

  // Gray scale
  GRAY_DARKER: 0x1a202c, // Even darker gray
  GRAY_DARK: 0x2d3748,
  GRAY_MEDIUM: 0x718096,
  GRAY_LIGHT: 0xa0aec0,
  GRAY_LIGHTER: 0xedf2f7, // Even lighter gray

  // Status and Semantic Colors
  RED: 0xe53e3e, // Standard semantic red for errors/danger (was CRITICAL_RED)
  CRITICAL_RED: 0xc53030, // A slightly darker critical red
  ORANGE: 0xed8936, // For warnings or secondary alerts
  YELLOW: 0xf6e05e, // A softer yellow for attention
  GREEN: 0x48bb78, // For success or positive status
  INFO_BLUE: 0x4299e1, // For informational messages

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
