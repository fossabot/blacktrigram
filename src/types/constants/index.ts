/**
 * Main constants export for Black Trigram Korean martial arts system
 */

// Fix: Remove duplicate exports and ensure proper imports
export { KOREAN_COLORS } from "./colors";
export { GAME_CONFIG, COMBAT_TIMING, DAMAGE_CONSTANTS } from "./game";
export { COMBAT_CONFIG, COMBAT_CONSTANTS } from "./combat";
export { PLAYER_ARCHETYPES_DATA, DEFAULT_PLAYER_NAME } from "./player";
export { TRIGRAM_TECHNIQUES, TECHNIQUE_PROPERTIES } from "./techniques";
export { TRIGRAM_DATA, TRIGRAM_STANCES_ORDER } from "./trigram";
export {
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  KOREAN_TEXT_SIZES,
  KOREAN_FONT_FAMILY,
  KOREAN_FONT_WEIGHTS,
  PIXI_TEXT_STYLES,
} from "./typography";
export { UI_LAYOUT, UI_CONSTANTS, HEALTH_COLORS } from "./ui";
export { ANIMATION_TIMINGS, TECHNIQUE_ANIMATIONS } from "./animations";

// Fix: Provide default export
export { KOREAN_COLORS as default } from "./colors";

// Fix: Export COMBAT_CONTROLS from controls
export { COMBAT_CONTROLS } from "./controls";

export const ARCHETYPE_TECHNIQUE_BONUSES: Record<
  string,
  Record<string, number>
> = {
  // Define bonuses for each archetype
};

export const ENHANCED_DAMAGE_CONSTANTS = {
  CRITICAL_MULTIPLIER: 2.0,
  VITAL_POINT_MULTIPLIER: 1.5,
  COMBO_MULTIPLIER: 1.2,
} as const;

export const STANCE_EFFECTIVENESS_MATRIX: Record<
  string,
  Record<string, number>
> = {
  // Define effectiveness matrix
};

export const MAX_TRANSITION_COST_KI = 50;
export const MAX_TRANSITION_COST_STAMINA = 30;
export const MAX_TRANSITION_TIME_MILLISECONDS = 1000;

// Re-export from sub-modules
export * from "./trigram";
export * from "./techniques";
export * from "./player";
export * from "./vital-points";
