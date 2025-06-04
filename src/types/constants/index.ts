// Central export hub for all Black Trigram game constants

import { KOREAN_COLORS } from "./colors";

// Export all constants from their respective files
export * from "./colors";
export * from "./combat";
export * from "./game";
export * from "./player";
export * from "./techniques";
export * from "./trigram";
export * from "./typography";
export * from "./vital-points";

// Export Korean color constants with cyberpunk theme
export { KOREAN_COLORS } from "./colors";
export { TRIGRAM_DATA, STANCE_EFFECTIVENESS_MATRIX } from "./trigram";

// Fix: Add missing constants that systems reference - REMOVE DUPLICATES
export const MAX_TRANSITION_COST_KI = 50;
export const MAX_TRANSITION_COST_STAMINA = 40;
export const MAX_TRANSITION_TIME_MILLISECONDS = 2000;

// Fix: Export player archetype data
export { PLAYER_ARCHETYPE_DATA } from "./player";

// Fix: Add missing color constants that PixiComponents.tsx references
export const KOREAN_COLORS_EXTENDED = {
  ...KOREAN_COLORS,
  DOJANG_BLUE: 0x1e40af,
  NEON_CYAN: 0x00ffff,
  GOLD: 0xffd700,
} as const;
