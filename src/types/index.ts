/**
 * Main type system export hub for Black Trigram (흑괘)
 * Korean Martial Arts Combat Simulator
 */

export type * from "./enums";
export type * from "./common";
export type * from "./audio";
export type * from "./combat";
export type * from "./anatomy";
export type * from "./korean-text";
export type * from "./ui";
export type * from "./components";
export type * from "./systems";
export type * from "./effects";
export type * from "./game";
export type * from "./player";
export type * from "./trigram";

// Export constants as values (not types)
export {
  KOREAN_COLORS,
  GAME_CONFIG,
  COMBAT_TIMING,
  UI_LAYOUT,
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  VITAL_POINTS_DATA,
} from "./constants";

// Export enum values (not types)
export { CombatReadiness, ConsciousnessLevel } from "./enums";
