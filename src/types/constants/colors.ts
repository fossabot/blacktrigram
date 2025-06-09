/**
 * Korean Martial Arts Color System
 * Cyberpunk aesthetic with traditional Korean elements
 */

// Korean martial arts color palette with cyberpunk aesthetic
export const KOREAN_COLORS = {
  // Core UI Colors
  UI_BACKGROUND_DARK: 0x0a0a0a,
  UI_BACKGROUND_MEDIUM: 0x1a1a1e,
  UI_BACKGROUND_LIGHT: 0x2a2a3e,
  UI_BORDER: 0x333333,
  UI_BORDER_LIGHT: 0x555555,
  UI_DISABLED_BG: 0x222222,
  UI_DISABLED_TEXT: 0x666666,
  UI_DISABLED_FILL: 0x444444,
  UI_GRAY: 0x808080,

  // Text Colors
  TEXT_PRIMARY: 0xffffff,
  TEXT_SECONDARY: 0xcccccc,
  TEXT_TERTIARY: 0x999999,
  TEXT_ACCENT: 0x00ffff,
  TEXT_BRIGHT: 0xffffff,
  TEXT_DISABLED: 0x777777,
  TEXT_ERROR: 0xff3366, // Neon red/pink
  TEXT_SUCCESS: 0x00ff88, // Neon green
  TEXT_WARNING: 0xffb700, // Amber/Orange
  TEXT_INFO: 0x4a90e2, // Info blue

  // Primary Color Palette
  PRIMARY_CYAN: 0x00ffff,
  PRIMARY_BLUE: 0x0074d9,
  ACCENT_CYAN: 0x00d4ff, // Light cyan for cyberpunk effects
  ACCENT_BLUE: 0x39cccc,

  // Secondary Colors
  SECONDARY_BLUE: 0x001f3f,
  SECONDARY_BLUE_LIGHT: 0x0074d9,
  SECONDARY_BLUE_DARK: 0x001122,
  SECONDARY_YELLOW: 0xffdc00,
  SECONDARY_YELLOW_LIGHT: 0xffe55c, // Add missing color

  // Accent Colors
  ACCENT_GOLD: 0xffd700,
  ACCENT_PRIMARY: 0x00ffff,
  ACCENT_PURPLE: 0x8a2be2,
  ACCENT_RED: 0xff4136,
  ACCENT_YELLOW: 0xffdc00,
  ACCENT_ORANGE: 0xff851b,

  // Status Colors
  POSITIVE_GREEN: 0x2ecc40,
  NEGATIVE_RED: 0xff4136,
  NEGATIVE_RED_LIGHT: 0xff6b5b,
  NEGATIVE_RED_DARK: 0xcc0000,
  WARNING_YELLOW: 0xffdc00, // Already exists as SECONDARY_YELLOW
  WARNING_ORANGE: 0xff851b,

  // Base Colors
  BLACK_SOLID: 0x000000,
  WHITE_SOLID: 0xffffff,

  // Player colors
  PLAYER_1_COLOR: 0x0099ff, // Cyan for Player 1
  PLAYER_2_COLOR: 0xff9900, // Magenta for Player 2
  PLAYER_1_PRIMARY: 0x00d4ff, // Cyan
  PLAYER_1_SECONDARY: 0x0077aa,
  PLAYER_2_PRIMARY: 0xff6b35, // Orange
  PLAYER_2_SECONDARY: 0xcc5022,

  // Overlay colors
  OVERLAY_BACKGROUND: 0x000000, // Black for overlays

  // Add missing UI colors
  UI_DISABLED_TEXT: 0x666666, // Add missing color
  BLACK_SOLID_TRANSLUCENT: 0x000000, // Add missing color
  PRIMARY_CYAN_DARK_TRANSLUCENT: 0x004444, // Add missing color
  PRIMARY_CYAN_DARK: 0x008888, // Add missing color
  ACCENT_PRIMARY_DARK: 0xcc00cc, // Add missing color
  ACCENT_PRIMARY_LIGHT: 0xff66ff, // Add missing color
  NEGATIVE_RED_DARK: 0xcc0000, // Add missing color
  NEGATIVE_RED_LIGHT: 0xff6666, // Add missing color
  UI_BACKGROUND_SURFACE: 0x1e1e1e,
  UI_GRAY_DARK: 0x404040,
  UI_GRAY_MEDIUM: 0x606060,
  UI_LIGHT_GRAY: 0xa0a0a0,
  UI_DISABLED_BG: 0x2a2a2a,
  UI_BACKGROUND_DARK_TRANSLUCENT: 0x0a0a0a,
  PRIMARY_CYAN_LIGHT: 0x66ffff,

  // Add missing color constants
  PRIMARY_BLUE_DARK: 0x004488,
  STATUS_STUNNED_YELLOW: 0xffcc00,
  NEGATIVE_GREEN: 0x008800,
  POSITIVE_GREEN_DARK: 0x006600,
  POSITIVE_GREEN_LIGHT: 0x88ff88,

  // Add missing player colors
  PLAYER_1_COLOR: 0x0099ff,
  PLAYER_2_COLOR: 0xff9900,

  // Add missing vital point colors
  VITAL_POINT_NORMAL: 0x00ff00,
  VITAL_POINT_CRITICAL: 0xff0000,
  VITAL_POINT_WEAK: 0xffff00,

  // Debug colors
  DEBUG_HIT_SUCCESS: 0x00ff00,
  DEBUG_HIT_MISS: 0xff0000,
  DEBUG_COLLISION: 0xff00ff,
  DEBUG_GRID: 0x666666,
  DEBUG_TEXT: 0xff00ff,

  // Additional colors based on errors
  PRIMARY_RED: 0xcc0000, // Example, adjust as needed
  PRIMARY_BLUE: 0x007bff, // Example, adjust as needed
  PRIMARY_YELLOW: 0xffcc00, // Example, adjust as needed
  PRIMARY_GREEN: 0x28a745, // Example, adjust as needed
  PRIMARY_BLACK: 0x000000,
  PRIMARY_WHITE: 0xffffff,
  SECONDARY_CYAN: 0x00ffff,
  SECONDARY_MAGENTA: 0xff00ff,
  ACCENT_ORANGE: 0xffa500,
  ACCENT_PURPLE: 0x800080,
  TEXT_DARK: 0x333333,
  TEXT_LIGHT: 0xf0f0f0,
  BACKGROUND_DARK: 0x121212,
  BACKGROUND_LIGHT: 0xe0e0e0,
  NEON_PINK: 0xff007f,
  NEON_GREEN: 0x39ff14,
  NEON_BLUE: 0x00ccff,
  CRITICAL_HIT: 0xff4500, // Example: OrangeRed for critical hits
  VITAL_POINT_HIT: 0xda70d6, // Example: Orchid for vital point hits

  BLACK: 0x000000, // Added BLACK
  ACCENT_SECONDARY: 0x00aabb, // Example new color
  ACCENT_TERTIARY: 0xcc00dd, // Example new color

  // Add missing colors referenced in components
  ARENA_BACKGROUND: 0x0a0a0a,
  TEXT_ACTIVE: 0x00ffff,
  PRIMARY_ACCENT_LIGHT: 0x66ffff, // Alias for PRIMARY_CYAN_LIGHT
  SECONDARY_ACCENT_DARK: 0x001122, // Alias for SECONDARY_BLUE_DARK
  BORDER_COLOR: 0x333333, // Alias for UI_BORDER
} as const;

// Cyberpunk palette alias for backward compatibility
export const CYBERPUNK_PALETTE = {
  PRIMARY_CYAN: KOREAN_COLORS.PRIMARY_CYAN,
  ACCENT_MAGENTA: KOREAN_COLORS.ACCENT_PRIMARY,
  ACCENT_GREEN: KOREAN_COLORS.ACCENT_SECONDARY,
  BACKGROUND_DARK: KOREAN_COLORS.UI_BACKGROUND_DARK,
  BACKGROUND_MEDIUM: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
  BACKGROUND_LIGHT: KOREAN_COLORS.UI_BACKGROUND_LIGHT,
  TEXT_PRIMARY: KOREAN_COLORS.TEXT_PRIMARY,
  TEXT_SECONDARY: KOREAN_COLORS.TEXT_SECONDARY,
  TEXT_ACCENT: KOREAN_COLORS.TEXT_ACCENT,
} as const;

// Export combined color system
export const ALL_COLORS = {
  ...KOREAN_COLORS,
  ...CYBERPUNK_PALETTE,
} as const;

// Color utility type
export type ColorValue = (typeof KOREAN_COLORS)[keyof typeof KOREAN_COLORS];
export type CyberpunkColor =
  (typeof CYBERPUNK_PALETTE)[keyof typeof CYBERPUNK_PALETTE];

// Default export for convenience
export default KOREAN_COLORS;
