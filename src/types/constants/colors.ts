/**
 * Korean Martial Arts Color System
 * Cyberpunk aesthetic with traditional Korean elements
 */

// Korean martial arts color palette with cyberpunk aesthetic
export const KOREAN_COLORS = {
  // Player archetype colors
  MUSA_PRIMARY: 0xff8000, // Orange - Traditional warrior
  AMSALJA_PRIMARY: 0x440044, // Dark purple - Shadow assassin
  HACKER_PRIMARY: 0x00ff88, // Neon green - Cyber warrior
  JEONGBO_PRIMARY: 0x0088ff, // Blue - Intelligence operative
  JOJIK_PRIMARY: 0xdc143c, // Crimson - Organized crime

  // Trigram stance colors (based on traditional I Ching)
  TRIGRAM_GEON_PRIMARY: 0xffffff, // White - Heaven
  TRIGRAM_TAE_PRIMARY: 0x87ceeb, // Sky blue - Lake
  TRIGRAM_LI_PRIMARY: 0xff4500, // Red-orange - Fire
  TRIGRAM_JIN_PRIMARY: 0xffff00, // Yellow - Thunder
  TRIGRAM_SON_PRIMARY: 0x90ee90, // Light green - Wind
  TRIGRAM_GAM_PRIMARY: 0x000080, // Navy blue - Water
  TRIGRAM_GAN_PRIMARY: 0x8b4513, // Brown - Mountain
  TRIGRAM_GON_PRIMARY: 0x228b22, // Forest green - Earth

  // UI colors with cyberpunk theme
  PRIMARY_CYAN: 0x00ffff, // Neon cyan
  PRIMARY_BLUE: 0x0088ff,
  SECONDARY_BLUE: 0x0066cc, // Add missing color
  SECONDARY_BLUE_DARK: 0x001144,
  SECONDARY_BLUE_LIGHT: 0x88ccff,
  SECONDARY_YELLOW: 0xffcc00,
  SECONDARY_YELLOW_LIGHT: 0xffe066,
  ACCENT_PRIMARY: 0xff00ff, // Magenta
  ACCENT_RED: 0xff0000, // Red
  ACCENT_SECONDARY: 0x00ff00, // Lime green
  ACCENT_GOLD: 0xffd700,
  ACCENT_PURPLE: 0x9933ff,
  ACCENT_CYAN: 0x00ffff, // Add if missing

  // Add missing accent colors
  ACCENT_ORANGE: 0xff8800, // Orange for warnings
  ACCENT_YELLOW: 0xffdd00, // Yellow for medium effects
  ACCENT_GREEN: 0x00ff00, // Green for positive effects
  ACCENT_BLUE: 0x0088ff, // Blue for special effects

  // Background colors
  UI_BACKGROUND_DARK: 0x0a0a0a,
  UI_BACKGROUND_MEDIUM: 0x1a1a1a,
  UI_BACKGROUND_LIGHT: 0x2a2a2a,

  // Text colors
  TEXT_PRIMARY: 0xffffff,
  TEXT_SECONDARY: 0xcccccc,
  TEXT_TERTIARY: 0x888888,
  TEXT_ACCENT: 0x00ffff,
  TEXT_BRIGHT: 0xffffff, // Added for bright text, e.g., titles on dark overlay

  // Status colors
  POSITIVE_GREEN: 0x00ff00,
  WARNING_YELLOW: 0xffff00,
  WARNING_ORANGE: 0xff9900,
  NEGATIVE_RED: 0xff0000,

  // Combat effect colors
  CRITICAL_HIT: 0xff0080,
  VITAL_POINT_HIT: 0xff4000,
  BLOCKED_ATTACK: 0x808080,
  PERFECT_STRIKE: 0xff8000,

  // Vital point colors
  VITAL_POINT_NORMAL: 0x00ff00,
  VITAL_POINT_WEAK: 0xffff00,
  VITAL_POINT_CRITICAL: 0xff0000,

  // Border and outline colors
  UI_BORDER: 0x444444,
  UI_BORDER_LIGHT: 0x666666,
  UI_STEEL_GRAY: 0x708090,
  UI_GRAY: 0x808080, // Add missing color
  UI_GRAY_LIGHT: 0xc0c0c0,
  UI_DISABLED_FILL: 0x333333,
  UI_DISABLED_BORDER: 0x444444,
  ACTIVE_BORDER: 0x00ffff,

  // Basic colors
  BLACK_SOLID: 0x000000,
  WHITE_SOLID: 0xffffff,

  // Player colors
  PLAYER_1_COLOR: 0x00ffff, // Cyan for Player 1
  PLAYER_2_COLOR: 0xff00ff, // Magenta for Player 2

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
  DEBUG_TEXT: 0xff00ff,

  // ...existing code...
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
