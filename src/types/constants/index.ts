// Central export hub for all Black Trigram game constants

// Import KOREAN_COLORS before using it
import { KOREAN_COLORS } from "./colors"; // STANCE_VISUAL_THEMES removed from here
import { GAME_CONFIG as CORE_GAME_CONFIG } from "./game"; // Alias to avoid name clash
import { COMBAT_CONTROLS as CORE_COMBAT_CONTROLS } from "./controls";

// Re-export all color constants
export * from "./colors"; // This exports everything from colors.ts, including STANCE_VISUAL_THEMES
export * from "./combat";
export * from "./controls";
export * from "./game";
export * from "./player";
export * from "./techniques";
export * from "./trigram";
export * from "./typography";
export * from "./vital-points";

// Make sure AUDIO_CONFIG is exported if it exists, e.g.
// export * from "./audio"; // If there is an audio.ts constants file
// Or if it's defined in one of the above, ensure it's exported from there.
// For now, assuming AUDIO_CONFIG might be part of GAME_CONFIG or a similar general constants file.
// If DEFAULT_AUDIO_CONFIG is a specific object, it should be defined and exported here or in a dedicated audio constants file.
// Example:
export const AUDIO_CONFIG = {
  MASTER_VOLUME: 0.7,
  SFX_VOLUME: 0.8,
  MUSIC_VOLUME: 0.6,
  AMBIENT_VOLUME: 0.5,
  FADE_DURATION: 1000, // ms
  MAX_CONCURRENT_SOUNDS: 10,
  // Add other audio-related constants here
} as const;

// Export combined constants
export const GAME_CONSTANTS = {
  ...KOREAN_COLORS, // Now properly imported
  // ...other constants...
  ...CORE_GAME_CONFIG,
} as const;

// Export Korean color constants with cyberpunk theme
// The line below is redundant if `export * from "./colors";` is used and STANCE_VISUAL_THEMES is in colors.ts
// And KOREAN_COLORS is also exported via `export * from "./colors";`
// export { KOREAN_COLORS, STANCE_VISUAL_THEMES } from "./colors"; // This line can be removed if `export * from "./colors"` covers it.
// For clarity and to ensure STANCE_VISUAL_THEMES is explicitly available if `export *` behavior is nuanced:
export { STANCE_VISUAL_THEMES } from "./colors"; // Explicitly re-export if not covered or to be very clear.
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
export { CORE_COMBAT_CONTROLS as COMBAT_CONTROLS }; // Re-export with original name
