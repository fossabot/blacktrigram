/**
 * Main constants export for Black Trigram Korean martial arts system
 */

// Export individual modules to avoid conflicts
export { KOREAN_COLORS } from "./colors";
export { GAME_CONFIG, COMBAT_TIMING, DAMAGE_CONSTANTS } from "./game";
export { COMBAT_CONTROLS } from "./combat"; // Fix: Export from combat file
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
  KOREAN_FONT_WEIGHTS, // Fix: Add missing export
  PIXI_TEXT_STYLES,
} from "./typography";
export { UI_LAYOUT, UI_CONSTANTS, HEALTH_COLORS } from "./ui";
export { ANIMATION_TIMINGS, TECHNIQUE_ANIMATIONS } from "./animations";

// Export default for convenience
export { KOREAN_COLORS as default } from "./colors";
