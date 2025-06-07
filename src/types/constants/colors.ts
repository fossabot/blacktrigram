/**
 * Korean Martial Arts Color System
 * Cyberpunk aesthetic with traditional Korean elements
 */

// Core Korean Colors - Traditional palette
export const KOREAN_COLORS = {
  // Player Archetype Colors
  MUSA_PRIMARY: 0xff8000, // Orange - Traditional warrior
  AMSALJA_PRIMARY: 0x440044, // Dark purple - Shadow assassin
  HACKER_PRIMARY: 0x00ff88, // Neon green - Cyber warrior
  JEONGBO_PRIMARY: 0x0088ff, // Blue - Intelligence operative
  JOJIK_PRIMARY: 0xdc143c, // Crimson - Organized crime

  // Trigram Element Colors
  TRIGRAM_GEON_PRIMARY: 0xffffff, // Heaven - White
  TRIGRAM_TAE_PRIMARY: 0x87ceeb, // Lake - Sky Blue
  TRIGRAM_LI_PRIMARY: 0xff4500, // Fire - Orange Red
  TRIGRAM_JIN_PRIMARY: 0xffff00, // Thunder - Yellow
  TRIGRAM_SON_PRIMARY: 0x90ee90, // Wind - Light Green
  TRIGRAM_GAM_PRIMARY: 0x000080, // Water - Navy Blue
  TRIGRAM_GAN_PRIMARY: 0x8b4513, // Mountain - Brown
  TRIGRAM_GON_PRIMARY: 0x228b22, // Forest green - Earth

  // Text Colors
  TEXT_PRIMARY: 0xffffff, // Primary white text
  TEXT_SECONDARY: 0xcccccc, // Secondary gray text
  TEXT_TERTIARY: 0x888888, // Tertiary gray text
  TEXT_ACCENT: 0x00ffff, // Cyan accent text
  TEXT_WARNING: 0xffaa00, // Warning orange
  TEXT_ERROR: 0xff4444, // Error red
  TEXT_SUCCESS: 0x00ff88, // Success green

  // Base Colors
  WHITE_SOLID: 0xffffff,
  BLACK_SOLID: 0x000000,
  WHITE: 0xffffff, // Alias for compatibility
  BLACK: 0x000000, // Alias for compatibility

  // UI Colors
  UI_BACKGROUND_DARK: 0x0a0a0a,
  UI_BACKGROUND_MEDIUM: 0x1a1a1a,
  UI_BACKGROUND_LIGHT: 0x2a2a2a,
  UI_BORDER: 0x444444,
  UI_DISABLED_TEXT: 0x6e7681,
  UI_STEEL_GRAY: 0x656d76, // Added missing color

  // Accent Colors
  ACCENT_PRIMARY: 0xff00ff, // Magenta
  ACCENT_RED: 0xff0000, // Red accent
  ACCENT_GOLD: 0xffd700, // Gold accent
  ACCENT_PURPLE: 0x9966cc, // Purple accent
  ACCENT_PRIMARY_LIGHT: 0xffaacc, // Light pink
  ACCENT_ORANGE: 0xff8844, // Orange accent

  // Status Colors
  POSITIVE_GREEN: 0x00ff00, // Positive status
  POSITIVE_GREEN_LIGHT: 0x44ffaa, // Light positive
  NEGATIVE_RED: 0xff0000, // Negative status
  NEGATIVE_GREEN: 0x008844, // Poison/negative green
  WARNING_YELLOW: 0xffff00, // Warning status
  STATUS_STUNNED_YELLOW: 0xffdd44, // Stunned status

  // Secondary Colors
  SECONDARY_BLUE_LIGHT: 0x88ccff, // Light blue
  SECONDARY_YELLOW_LIGHT: 0xffff88, // Light yellow
  SECONDARY_BLUE_DARK: 0x003366, // Example, adjust as needed
  PRIMARY_BLUE_LIGHT: 0x66ccff, // Example, adjust as needed
  PRIMARY_CYAN: 0x00ffff, // Primary cyan
  SECONDARY_YELLOW: 0xffcc00, // Added

  // Combat State Colors
  HEALTH_FULL: 0x00ff88,
  HEALTH_HIGH: 0x88ff44,
  HEALTH_MEDIUM: 0xffaa00,
  HEALTH_LOW: 0xff4444,
  HEALTH_CRITICAL: 0xff0000,

  // Ki Energy Colors
  KI_FULL: 0x00ffff,
  KI_CHARGING: 0x44aaff,
  KI_DEPLETED: 0x666666,

  // Combat Effect Colors
  DAMAGE_LIGHT: 0xffaa44,
  DAMAGE_MEDIUM: 0xff6644,
  DAMAGE_HEAVY: 0xff2244,
  DAMAGE_CRITICAL: 0xff0000,
  BLOCK_SUCCESS: 0x44aaff,
  PERFECT_STRIKE: 0xff8000,
  WARNING_ORANGE: 0xff9900, // Added
} as const;

// Cyberpunk Palette for modern UI elements
export const CYBERPUNK_PALETTE = {
  // Neon Colors
  NEON_CYAN: 0x00fffc,
  NEON_PINK: 0xff00fd,
  NEON_GREEN: 0x00ff88,
  ELECTRIC_BLUE: 0x0099ff,

  // Dark Backgrounds
  DEEP_DARK: 0x000000,
  BACKGROUND_DARK: 0x0a0f14, // Deep, dark blue/grey
  BACKGROUND_MEDIUM: 0x1c232f,
  BACKGROUND_LIGHT: 0x2f3b4a,

  // Interface Elements
  INTERFACE_PANEL: 0x1e1e1e,
  INTERFACE_BORDER: 0x333333,
  INTERFACE_GLOW: 0x00ffff,

  // Text Colors
  TEXT_MAIN: 0xffffff,
  TEXT_SECONDARY: 0xaaaaaa,
  TEXT_ACCENT: 0x00ffff,
  TEXT_OUTLINE: 0x000000,

  // Glow Effects
  GLOW_CYAN: 0x00ffff,
  GLOW_PINK: 0xff00ff,
  GLOW_GREEN: 0x00ff00,

  // Status Effects
  TECH_WHITE: 0xf0f0f0,
  BLACK_SOLID: 0x000000,
  ACCENT_NEON_GREEN: 0x00ff88,

  // Primary Colors (aliases for compatibility)
  PRIMARY_CYAN: 0x00fffc,
  ACCENT_PINK: 0xff00ff, // Bright magenta/pink
  ACCENT_LIME: 0x32cd32, // Bright lime green
  ACCENT_ORANGE: 0xffa500, // Bright orange
  TEXT_PRIMARY: 0xe0e0e0, // Light grey for primary text
  TEXT_SECONDARY: 0xa0a0a0, // Medium grey for secondary text
  UI_BORDER: 0x4a5b70,
  UI_HIGHLIGHT: 0x00ffff,
  UI_DISABLED: 0x303030,
  VITAL_POINT_WEAK: 0xffff00, // Yellow
  VITAL_POINT_CRITICAL: 0xff0000, // Red
  VITAL_POINT_NORMAL: 0x00ff00, // Green
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
