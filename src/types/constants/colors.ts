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

  // Add missing colors
  GRAY: 0x808080,
  GRAY_LIGHT: 0xcccccc,
  GRAY_MEDIUM: 0x999999,
  GRAY_DARK: 0x404040,
  TRADITIONAL_BLUE: 0x1e3a8a,
  ACCENT_BLUE: 0x3b82f6,
  TRADITIONAL_GREEN: 0x16a34a,
  NEON_RED: 0xff0040, // Added from user instructions CYBERPUNK_PALETTE
  ELECTRIC_BLUE: 0x4682b4, // Mapping to DOJANG_BLUE as per CYBERPUNK_PALETTE
  DIGITAL_GOLD: 0xffd700, // Mapping to GOLD as per CYBERPUNK_PALETTE
  SHADOW_BLACK: 0x0a0a0a, // Added from user instructions CYBERPUNK_PALETTE
  TECH_WHITE: 0xffffff, // Mapping to WHITE as per CYBERPUNK_PALETTE
} as const;

// Stance-specific visual themes (Added from instructions)
export const STANCE_VISUAL_THEMES = {
  geon: { primary: 0xffd700, secondary: 0x8b7355, glow: 0xffed4e },
  tae: { primary: 0x87ceeb, secondary: 0x4682b4, glow: 0xb0e0e6 },
  li: { primary: 0xff4500, secondary: 0x8b0000, glow: 0xff6347 },
  jin: { primary: 0x9370db, secondary: 0x4b0082, glow: 0xda70d6 },
  son: { primary: 0x98fb98, secondary: 0x228b22, glow: 0x90ee90 },
  gam: { primary: 0x4169e1, secondary: 0x191970, glow: 0x6495ed },
  gan: { primary: 0x8b4513, secondary: 0x654321, glow: 0xd2691e },
  gon: { primary: 0x654321, secondary: 0x8b4513, glow: 0xa0522d },
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

// Dojang environment colors (Updated based on DOJANG_ENVIRONMENT from instructions)
export const DOJANG_COLORS = {
  FLOOR: 0x2d2d2d, // Example, can be derived from DOJANG_ENVIRONMENT.textures
  WALLS: 0x1a1a1a, // Example, can be derived from DOJANG_ENVIRONMENT.textures
  LIGHTING_AMBIENT: 0x0a0a0a, // From DOJANG_ENVIRONMENT.lighting.ambient
  LIGHTING_ACCENT_NEON: [0x00ffff, 0xff0040, 0x00ff00], // From DOJANG_ENVIRONMENT.lighting.neonAccents
  LIGHTING_ACCENT_TRADITIONAL: 0xffd700, // From DOJANG_ENVIRONMENT.lighting.traditional
  BLOOD_STAINS: 0x8b0000, // From DOJANG_ENVIRONMENT.lighting.bloodStains
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
  ...KOREAN_COLORS, // Merge KOREAN_COLORS here to consolidate

  // Add missing colors (some might be duplicates now, review KOREAN_COLORS)
  ORANGE: 0xffa500, // Already in KOREAN_COLORS
  CRITICAL_RED: 0xff0000, // Already in KOREAN_COLORS as RED or CRITICAL_HIT
  HEALTH_RED: 0xdc143c, // Already in KOREAN_COLORS as TRADITIONAL_RED
  STAMINA_GREEN: 0x32cd32, // A specific green, KOREAN_COLORS.GREEN is 0x00ff00
  CRITICAL_HIT: 0xff6347, // A specific red/orange, KOREAN_COLORS.CRITICAL_HIT is 0xff0040
} as const;

// Korean traditional and cyberpunk color palette
export const KOREAN_COLORS_PALETTE = {
  // Traditional Korean Colors (오방색 - Obangsaek & 오간색 - Ogansaek)
  TRADITIONAL_RED: 0xd82322, // 적색 (Jeoksaek) - Fire, South, Summer
  TRADITIONAL_BLUE: 0x2a5caa, // 청색 (Cheongsaek) - Wood, East, Spring (can also be green)
  TRADITIONAL_YELLOW: 0xffc400, // 황색 (Hwangsaek) - Earth, Center, Late Summer
  TRADITIONAL_WHITE: 0xffffff, // 백색 (Baeksaek) - Metal, West, Autumn
  TRADITIONAL_BLACK: 0x000000, // 흑색 (Heuksaek) - Water, North, Winter

  // Secondary Traditional Colors (오간색 - Ogansaek)
  TRADITIONAL_GREEN: 0x006400, // 녹색 (Noksaek) - Blue-Yellow
  TRADITIONAL_LIGHT_BLUE: 0x87ceeb, // 벽색 (Byeoksaek) - Blue-White
  TRADITIONAL_BRIGHT_RED: 0xff4500, // 홍색 (Hongsaek) - Red-White
  TRADITIONAL_PURPLE: 0x800080, // 자색 (Jasaek) - Red-Black
  TRADITIONAL_OCHRE: 0xcc7722, // 유황색 (Yuhwangsaek) - Yellow-Black (Ochre/Earthy Yellow)

  // Cyberpunk Palette
  CYAN: 0x00ffff,
  NEON_PINK: 0xff00ff,
  ELECTRIC_GREEN: 0x39ff14,
  NEON_ORANGE: 0xffa500,
  NEON_RED: 0xff0040, // More vibrant red for cyberpunk
  DEEP_PURPLE: 0x301934,
  MIDNIGHT_BLUE: 0x191970,
  DOJANG_BLUE: 0x2c3e50, // A darker, more serious blue for the dojang

  // UI and General Purpose Colors
  GOLD: 0xffd700,
  SILVER: 0xc0c0c0,
  BRONZE: 0xcd7f32,
  GREY: 0x808080,
  LIGHT_GREY: 0xd3d3d3,
  DARK_GREY: 0xa9a9a9,
  BLACK: 0x000000,
  WHITE: 0xffffff,

  // Semantic Colors
  SUCCESS: 0x28a745,
  WARNING: 0xffc107,
  ERROR: 0xdc3545,
  INFO: 0x17a2b8,

  // Translucent Colors
  SHADOW_BLACK: 0x0a0a0a, // For deep shadows
  SHADOW_BLACK_70: 0x000000b3, // Black with 70% alpha (approx)
  WHITE_TRANSLUCENT_50: 0xffffff80, // White with 50% alpha
  CYAN_TRANSLUCENT_30: 0x00ffff4d, // Cyan with 30% alpha

  // Stance Specific (examples, can be expanded)
  GEON_PRIMARY: 0xffd700, // Gold
  TAE_PRIMARY: 0x87ceeb, // Light Blue
  LI_PRIMARY: 0xff4500, // Bright Red
  JIN_PRIMARY: 0x9370db, // Medium Purple
  SON_PRIMARY: 0x98fb98, // Pale Green
  GAM_PRIMARY: 0x4169e1, // Royal Blue
  GAN_PRIMARY: 0x8b4513, // Saddle Brown
  GON_PRIMARY: 0x654321, // Dark Brown

  // For UI elements like health bars, ki meters
  HEALTH_GREEN: 0x00ff00,
  KI_BLUE: 0x00bfff,
  STAMINA_YELLOW: 0xffff00,
  PAIN_RED: 0xff0000,

  // Tech/Digital Colors
  DIGITAL_GOLD: 0xffb400,
  TECH_WHITE: 0xf0f0f0,
} as const;
