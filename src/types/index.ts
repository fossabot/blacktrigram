/**
 * Central type exports for Black Trigram Korean martial arts game
 * This file should be the single source of truth for all type exports
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
  CombatAttackType, // Fix: Use correct enum name
  KoreanTextSize,
  KoreanTextWeight,
} from "./enums";

// Export core types
export type { KoreanText } from "./korean-text";
export type { Position, DamageRange } from "./common";
export type { StatusEffect, HitEffect } from "./effects";
export type {
  TrigramData,
  TrigramTransitionCost,
  TrigramTransitionRule,
} from "./trigram";
export type {
  PlayerArchetypeData,
  VitalPoint,
  VitalPointEffect,
} from "./anatomy";

// Fix: Export PlayerState from player.ts, not anatomy.ts
export type { PlayerState } from "./player";

// Export combat types
export type {
  KoreanTechnique,
  CombatResult,
  CombatEventData,
  CombatStats,
} from "./combat";

// Fix: Export game types without duplicates
export type { GameState, MatchStatistics, PlayerMatchStats } from "./game";

// Export component types
export type {
  GameUIProps,
  GameEngineProps,
  TrainingScreenProps,
  CombatScreenProps,
  CombatHUDProps,
  CombatControlsProps,
  CombatArenaProps,
  IntroScreenProps,
} from "./components";

// Fix: Export UI types with correct names
export type {
  UIComponentProps, // Fix: Use correct name
  StanceIndicatorProps,
  HealthBarProps,
} from "./ui";

// Export system types
export type { CombatSystem, VitalPointSystem, TrigramSystem } from "./systems";
