// Central export hub for all Black Trigram game constants

// Export all color constants
export * from "./colors";

// Export combat system constants
export * from "./combat";

// Export game configuration constants
export * from "./game";

// Export player archetype constants
export * from "./player";

// Export Korean martial arts technique constants
export * from "./techniques";

// Export trigram system constants
export * from "./trigram";

// Export typography constants
export * from "./typography";

// Export vital points constants
export * from "./vital-points";

// Re-export specific constants for backwards compatibility
export { KOREAN_COLORS } from "./colors";
export {
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  TRIGRAM_STANCES_ORDER,
} from "./trigram";
export { VITAL_POINTS_DATA } from "./vital-points";
export { GAME_CONFIG } from "./game";

// Export typography constants without duplicates
export {
  KOREAN_FONT_FAMILY_PRIMARY,
  KOREAN_FONT_FAMILY_SECONDARY,
  KOREAN_TEXT_SIZES,
  KOREAN_FONT_WEIGHTS,
  KOREAN_TEXT_STYLES,
} from "./typography";

// Clean single export for main font family (avoid duplicates)
export const KOREAN_FONT_FAMILY = "Noto Sans KR, Arial, sans-serif";
