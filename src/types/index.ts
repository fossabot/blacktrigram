/**
 * Central type exports for Black Trigram Korean martial arts game
 */

// Export all enums
export {
  GameMode,
  GamePhase,
  PlayerArchetype,
  TrigramStance,
  VitalPointCategory,
  VitalPointSeverity,
  VitalPointEffectType,
  EffectIntensity,
  DamageType,
  CombatAttackType,
  KoreanTextSize,
  KoreanTextWeight,
} from "./enums";

// Export core types
export type { KoreanText } from "./korean-text";
export type { Position, DamageRange } from "./common";
export type {
  PlayerArchetypeData
} from "./anatomy";

// Export PlayerState from player.ts
export type { PlayerState, PlayerMatchStats } from "./player";

// Export combat types
// Export game types
export type { GameState, MatchStatistics } from "./game";

// Export component types
// Export UI types
// Export system types
