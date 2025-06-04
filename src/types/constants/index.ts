// Central export hub for all Black Trigram game constants

// Export all constants from their respective files
export * from "./colors";
export * from "./combat";
export * from "./player";
export * from "./techniques";
export * from "./typography";
export * from "./vital-points";
export * from "./trigram";

// Export game constants
export {
  MAX_TRANSITION_COST_KI,
  MAX_TRANSITION_COST_STAMINA,
  MAX_TRANSITION_TIME_MILLISECONDS,
  GAME_CONSTANTS,
} from "./game";

// Add GAME_CONFIG export that was missing
export const GAME_CONFIG = {
  MAX_TRANSITION_COST_KI: 50,
  MAX_TRANSITION_COST_STAMINA: 40,
  MAX_TRANSITION_TIME_MILLISECONDS: 2000,
  DEFAULT_STANCE_COOLDOWN_MS: 500,
  BASE_CRITICAL_HIT_CHANCE: 0.05,
  BASE_CRITICAL_HIT_MULTIPLIER: 1.5,
} as const;
