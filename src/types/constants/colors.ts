/**
 * Korean Color System for Black Trigram (흑괘)
 * Traditional Korean colors with cyberpunk integration
 */

// Traditional Korean Colors (오방색 - Five Direction Colors)
export const TRADITIONAL_KOREAN_COLORS = {
  // 청색 (Blue) - East, Wood, Spring
  CHEONG: 0x0066cc,
  // 백색 (White) - West, Metal, Autumn
  BAEK: 0xffffff,
  // 적색 (Red) - South, Fire, Summer
  JEOK: 0xdc143c,
  // 흑색 (Black) - North, Water, Winter
  HEUK: 0x000000,
  // 황색 (Yellow) - Center, Earth
  HWANG: 0xffd700,
} as const;

// Cyberpunk Korean Colors
export const CYBERPUNK_KOREAN_COLORS = {
  NEON_CYAN: 0x00ffff,
  ELECTRIC_BLUE: 0x0080ff,
  DIGITAL_RED: 0xff0040,
  TECH_GOLD: 0xffcc00,
  SHADOW_BLACK: 0x0a0a0a,
  MATRIX_GREEN: 0x00ff41,
} as const;

// Trigram Stance Colors
export const TRIGRAM_STANCE_COLORS = {
  geon: 0xffd700, // Gold for Heaven
  tae: 0x87ceeb, // Sky Blue for Lake
  li: 0xff4500, // Orange Red for Fire
  jin: 0x9370db, // Medium Purple for Thunder
  son: 0x98fb98, // Pale Green for Wind
  gam: 0x4169e1, // Royal Blue for Water
  gan: 0x8b4513, // Saddle Brown for Mountain
  gon: 0x654321, // Dark Brown for Earth
} as const;

// Export individual stance colors for direct access
export const GEON_COLOR = TRIGRAM_STANCE_COLORS.geon;
export const TAE_COLOR = TRIGRAM_STANCE_COLORS.tae;
export const LI_COLOR = TRIGRAM_STANCE_COLORS.li;
export const JIN_COLOR = TRIGRAM_STANCE_COLORS.jin;
export const SON_COLOR = TRIGRAM_STANCE_COLORS.son;
export const GAM_COLOR = TRIGRAM_STANCE_COLORS.gam;
export const GAN_COLOR = TRIGRAM_STANCE_COLORS.gan;
export const GON_COLOR = TRIGRAM_STANCE_COLORS.gon;

// Comprehensive Korean Colors System - Single declaration
export const KOREAN_COLORS = {
  // Existing trigram colors
  geon: 0xffd700,
  tae: 0x87ceeb,
  li: 0xff4500,
  jin: 0x9370db,
  son: 0x98fb98,
  gam: 0x4169e1,
  gan: 0x8b4513,
  gon: 0x654321,

  // Core colors
  BLACK: 0x000000,
  WHITE: 0xffffff,
  GOLD: 0xffd700,
  SILVER: 0xc0c0c0,
  CYAN: 0x00ffff,
  RED: 0xff0000,
  GREEN: 0x00ff00,
  BLUE: 0x0000ff,
  YELLOW: 0xffff00,
  PURPLE: 0x800080,
  ORANGE: 0xffa500,

  // Korean martial arts specific colors
  CRITICAL_HIT: 0xff0040,
  TRADITIONAL_RED: 0xdc143c,
  DOJANG_BLUE: 0x4682b4, // Add missing DOJANG_BLUE

  // Health and status colors (mapped from existing)
  HEALTH_RED: 0xff0000,
  STAMINA_GREEN: 0x00ff00,
  HANBOK_WHITE: 0xffffff,
  HEAVEN_GOLD: 0xffd700,
  FIRE_RED: 0xff4500,
  WIND_GREEN: 0x98fb98,
  WATER_BLUE: 0x4169e1,
  MOUNTAIN_BROWN: 0x8b4513,
  EARTH_ORANGE: 0xffa500,
  WOOD_BROWN: 0x8b4513,
  DOJANG_WALL: 0x2d2d2d,
  VITAL_POINT: 0xff0040,
  CRITICAL_RED: 0xff0040,
} as const;

// Combat-specific color themes
export const COMBAT_COLORS = {
  HEALTH_CRITICAL: KOREAN_COLORS.RED,
  HEALTH_WARNING: KOREAN_COLORS.GOLD,
  HEALTH_NORMAL: KOREAN_COLORS.GREEN,
  KI_FLOW: KOREAN_COLORS.CYAN,
  STAMINA_LOW: KOREAN_COLORS.GOLD,
  DAMAGE_INDICATOR: KOREAN_COLORS.RED,
  CRITICAL_HIT: KOREAN_COLORS.GOLD,
  VITAL_POINT: KOREAN_COLORS.VITAL_POINT,
} as const;

// Dojang environment colors
export const DOJANG_COLORS = {
  FLOOR: 0x2d2d2d,
  WALLS: 0x1a1a1a,
  LIGHTING_AMBIENT: 0x333333,
  LIGHTING_ACCENT: KOREAN_COLORS.CYAN,
  TRAINING_EQUIPMENT: 0x654321,
  MEDITATION_AREA: 0x4a4a4a,
} as const;

// Export color utilities
export const getColorForStance = (
  stance: keyof typeof TRIGRAM_STANCE_COLORS
): number => {
  return TRIGRAM_STANCE_COLORS[stance];
};

export const getHealthColor = (percentage: number): number => {
  if (percentage <= 25) return COMBAT_COLORS.HEALTH_CRITICAL;
  if (percentage <= 50) return COMBAT_COLORS.HEALTH_WARNING;
  return COMBAT_COLORS.HEALTH_NORMAL;
};

export const getKiColor = (percentage: number): number => {
  const intensity = Math.floor(percentage * 2.55);
  return (intensity << 16) | (0xff << 8) | 0xff; // Blue to cyan gradient
};

// Additional Colors
export const COLORS = {
  // Existing colors...

  // Add missing colors
  ORANGE: 0xffa500,
  CRITICAL_RED: 0xff0000,
  HEALTH_RED: 0xdc143c,
  STAMINA_GREEN: 0x32cd32,
  CRITICAL_HIT: 0xff6347,
} as const;
