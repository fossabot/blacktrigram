/**
 * Central type exports for Black Trigram Korean martial arts game
 */

// Export all enums
export {
  CombatAttackType,
  DamageType,
  EffectIntensity,
  GameMode,
  GamePhase,
  KoreanTextSize,
  KoreanTextWeight,
  PlayerArchetype,
  TrigramStance,
  VitalPointCategory,
  VitalPointEffectType,
  VitalPointSeverity,
} from "./enums";

// Export core types
export type { PlayerArchetypeData } from "./anatomy";
export type { DamageRange, Position } from "./common";
export type { KoreanText } from "./korean-text";

// Export PlayerState from player.ts
export type { PlayerMatchStats, PlayerState } from "./player";

// Export component types
