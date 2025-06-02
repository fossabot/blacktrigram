// filepath: /workspaces/blacktrigram/src/types/constants/index.ts
export * from "./colors";
export * from "./combat";
export * from "./game"; // Will define GAME_CONFIG here
export * from "./player";
export * from "./techniques";
export * from "./trigram";
export * from "./typography";
export * from "./vital-points";

// Export specific, widely used constants for easier access.
// These are defined in their respective files but also exported here for convenience.

export { GAME_CONFIG } from "./game"; // Centralized GAME_CONFIG
export { KOREAN_COLORS } from "./colors"; // Centralized KOREAN_COLORS

export { COMBAT_CONSTANTS, COMBAT_CONFIG, DAMAGE_RANGES } from "./combat";

export { PLAYER_ARCHETYPES_DATA, ARCHETYPE_ORDER } from "./player";

export {
  KOREAN_TECHNIQUE_DAMAGE,
  TECHNIQUE_TIMINGS,
  TECHNIQUE_PROPERTIES,
} from "./techniques";

export {
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  TRIGRAM_STANCES_ORDER,
} from "./trigram";

export {
  KOREAN_FONT_FAMILY,
  KOREAN_FONT_FAMILY_EXTENDED,
  KOREAN_FONT_FAMILY_STRING,
  KOREAN_FONT_FAMILY_PRIMARY,
  KOREAN_TEXT_SIZES,
  KOREAN_FONT_SIZES,
  KOREAN_FONT_WEIGHTS,
  KOREAN_LINE_HEIGHTS,
} from "./typography";

export { VITAL_POINTS_DATA } from "./vital-points"; // Assuming VITAL_POINTS_DATA will be populated in vital-points.ts

// UI layout constants - these seem fine here if they are general UI constants.
export const UI_LAYOUT = {
  HEADER_HEIGHT: 80,
  SIDEBAR_WIDTH: 250,
  FOOTER_HEIGHT: 60,
  PADDING: 16,
  BORDER_RADIUS: 8,
} as const;

// Combat timing constants - these seem fine here if they are general combat timing constants.
// However, consider moving to combat.ts if they are very specific to combat system logic.
export const COMBAT_TIMING = {
  ATTACK_WINDOW_MS: 200,
  COUNTER_WINDOW_MS: 150,
  BLOCK_WINDOW_MS: 300,
  STANCE_CHANGE_DURATION_MS: 400,
  RECOVERY_TIME_MS: 500,
} as const;
