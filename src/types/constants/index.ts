/**
 * Main constants export for Black Trigram Korean martial arts system
 */

// Fix: Remove duplicate exports and ensure proper imports
export { CYBERPUNK_COLORS, KOREAN_COLORS } from "./colors";
export { COMBAT_CONFIG, COMBAT_CONSTANTS } from "./combat";
export { COMBAT_TIMING, DAMAGE_CONSTANTS, GAME_CONFIG } from "./game";
export { TECHNIQUE_PROPERTIES, TRIGRAM_TECHNIQUES } from "./techniques";
export {
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  KOREAN_FONT_FAMILY,
  KOREAN_FONT_WEIGHTS,
  KOREAN_TEXT_SIZES,
  PIXI_TEXT_STYLES,
} from "./typography";
export { HEALTH_COLORS, UI_CONSTANTS } from "./ui";

// Fix: Provide default export
export { KOREAN_COLORS as default } from "./colors";

// Fix: Export COMBAT_CONTROLS from controls
export { COMBAT_CONTROLS } from "./controls";

// Fix: Add missing KOREAN_TYPOGRAPHY export
export { KOREAN_TYPOGRAPHY } from "./typography";

// Fix: Add missing PIXI_FONT_WEIGHTS export
export { PIXI_FONT_WEIGHTS } from "./typography";

// Fix: Add missing ANIMATION_DURATIONS export
export { ANIMATION_DURATIONS } from "./animations";

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

export const MAX_TRANSITION_COST_KI = 50;
export const MAX_TRANSITION_COST_STAMINA = 30;
export const MAX_TRANSITION_TIME_MILLISECONDS = 1000;

// Re-export from sub-modules
export * from "./techniques";
