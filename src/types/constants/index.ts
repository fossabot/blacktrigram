// Central export hub for all Black Trigram game constants

// Import KOREAN_COLORS before using it
import { KOREAN_COLORS } from "./colors";

// Re-export all color constants
export * from "./colors";
export * from "./combat";
export * from "./game";
export * from "./player";
export * from "./techniques";
export * from "./trigram";
export * from "./typography";
export * from "./vital-points";
export * from "./controls"; // Ensure COMBAT_CONTROLS is exported from here

// Export combined constants
export const GAME_CONSTANTS = {
  ...KOREAN_COLORS, // Now properly imported
  // ...other constants...
} as const;

// Export Korean color constants with cyberpunk theme
export { KOREAN_COLORS } from "./colors";
export { TRIGRAM_DATA, STANCE_EFFECTIVENESS_MATRIX } from "./trigram";

// Add missing constants that systems reference
export const MAX_TRANSITION_COST_KI = 50;
export const MAX_TRANSITION_COST_STAMINA = 40;
export const MAX_TRANSITION_TIME_MILLISECONDS = 2000;

// Export player archetype data
export { PLAYER_ARCHETYPE_DATA } from "./player";

// Add missing color constants that PixiComponents.tsx references
export const KOREAN_COLORS_EXTENDED = {
  ...KOREAN_COLORS,
  DOJANG_BLUE: 0x1e40af,
  NEON_CYAN: 0x00ffff,
  GOLD: 0xffd700,
} as const;

// Re-export game types that App.tsx needs
export type { GameState, GameScreen, SessionData, GameSettings } from "../game";
