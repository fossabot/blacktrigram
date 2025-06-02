// filepath: /workspaces/blacktrigram/src/types/constants/index.ts
export * from "./colors";
export * from "./combat";
export * from "./game";
export * from "./player";
export * from "./techniques";
export * from "./trigram";
export * from "./typography";
export * from "./vital-points";

// Add missing exports that components are importing
export { TRIGRAM_DATA, STANCE_EFFECTIVENESS_MATRIX } from "./trigram";

// Korean martial arts game constants
export const GAME_CONFIG = {
  MAX_HEALTH: 100,
  MAX_KI: 100,
  MAX_STAMINA: 100,
  ROUND_TIME_SECONDS: 180,
  MAX_ROUNDS: 3,
  DAMAGE_VARIANCE_PERCENT: 0.1,
  CRITICAL_HIT_MULTIPLIER: 1.5,
  BLOCK_DAMAGE_REDUCTION_PERCENT: 0.5,
  STANCE_CHANGE_COOLDOWN_MS: 500,
  VITAL_POINT_ACCURACY_MODIFIER: 0.8,
  BASE_KI_RECOVERY_RATE: 5,
  BASE_STAMINA_RECOVERY_RATE: 10,
} as const;

// Korean color palette for cyberpunk aesthetic
export const KOREAN_COLORS = {
  // Traditional Korean colors
  TRADITIONAL_RED: 0xd73527,
  KOREAN_BLUE: 0x003f7f,
  HANBOK_YELLOW: 0xffc72c,

  // Cyberpunk colors
  CYAN: 0x00ffff,
  NEON_PINK: 0xff007f,
  ELECTRIC_BLUE: 0x0080ff,
  DIGITAL_GREEN: 0x00ff80,
  DARK_BLUE: 0x1e293b,
  ACCENT_BLUE: 0x00d2ff,

  // Stance colors (matching trigram elements)
  geon: 0xffd700, // Heaven - Gold
  tae: 0x87ceeb, // Lake - Sky Blue
  li: 0xff4500, // Fire - Orange Red
  jin: 0x9370db, // Thunder - Purple
  son: 0x98fb98, // Wind - Light Green
  gam: 0x4169e1, // Water - Royal Blue
  gan: 0x8b4513, // Mountain - Saddle Brown
  gon: 0x654321, // Earth - Dark Brown

  // Base colors
  WHITE: 0xffffff,
  BLACK: 0x000000,
  GRAY: 0x808080,
  DOJANG_BLUE: 0x1a237e,
  GOLD: 0xffd700,
} as const;

// Combat timing constants
export const COMBAT_TIMING = {
  ATTACK_WINDOW_MS: 200,
  COUNTER_WINDOW_MS: 150,
  BLOCK_WINDOW_MS: 300,
  STANCE_CHANGE_DURATION_MS: 400,
  RECOVERY_TIME_MS: 500,
} as const;

// UI layout constants
export const UI_LAYOUT = {
  HEADER_HEIGHT: 80,
  SIDEBAR_WIDTH: 250,
  FOOTER_HEIGHT: 60,
  PADDING: 16,
  BORDER_RADIUS: 8,
} as const;
