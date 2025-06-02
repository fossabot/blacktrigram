/**
 * Main type export for Black Trigram (흑괘)
 * Korean Martial Arts Combat Simulator
 */

export type * from "./enums";

// Also export the enum constants as values
export {
  CombatAttackType,
  DamageType,
  EffectType,
  EffectIntensity,
  CombatReadiness,
  ConsciousnessLevel,
} from "./enums";
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

// Export all types from common except the createPlayerState function
export type {
  Position,
  Timestamp,
  EntityId,
  CombatStats,
  GameState,
  MatchState,
  DamageRange,
  CombatCondition,
  Vector2D,
  Dimensions,
  Bounds,
  ColorValue,
  RGBAColor,
  Duration,
  Probability,
  Percentage,
  PlayerId,
  ArchetypeId,
  ReadonlyRecord,
  Optional,
  DeepReadonly,
  Range,
  Velocity,
} from "./common";

// Export constants as values (not types)
export * from "./constants";

// Export utility functions as values (not types)
export { createPlayerState } from "./common";
