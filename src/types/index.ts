/**
 * Main types export for Black Trigram Korean martial arts system
 */

// Core data types
export type { Position, Dimensions, KoreanText } from "./common";

// Enums (import as values to avoid conflicts)
export {
  PlayerArchetype,
  TrigramStance,
  GameMode,
  DamageType,
  EnumCombatAttackType,
  VitalPointCategory,
  VitalPointSeverity,
  BodyRegion,
  EffectIntensity,
  AudioCategory,
  // Fix: Add missing enum exports
  VitalPointEffectType,
  GameEventType,
} from "./enums";

// Player types - Fix: Use correct exports
export type {
  PlayerState,
  PlayerStats, // Fix: Now exported
  PlayerMatchStatistics, // Fix: Now exported
  PlayerArchetypeData,
} from "./player";

// Combat types - Fix: Use correct exports
export type {
  CombatResult,
  CombatEvent,
  KoreanTechnique,
  CombatAction, // Fix: Now exported
  DamageCalculation, // Fix: Now exported
  CombatPhase, // Fix: Now exported
  CombatState, // Fix: Now exported
  HitResult,
} from "./combat";

// Game types
export type {
  GameState,
  MatchStatistics,
  GameEvent,
  RoundResult,
} from "./game";

// Anatomy types
export type {
  VitalPoint,
  VitalPointEffect,
  AnatomicalHit,
  VitalPointHitResult,
  AnatomicalLocation,
  BodyPart,
  AnatomyModel,
} from "./anatomy";

// Trigram types - Fix: Use correct exports
export type {
  TrigramData,
  TrigramTheme,
  TrigramEffectivenessMatrix,
  StanceTransition, // Fix: Now exported
} from "./trigram";

// Audio types
export type {
  AudioAsset,
  MusicTrack,
  SoundEffect,
  VoiceLine,
  AudioConfig,
  AudioEvent,
  AudioState,
  AudioManager,
} from "./audio";

// Effects types - Fix: Use correct exports
export type {
  VisualEffect, // Fix: Now exported as interface
  ParticleEffect,
  StatusEffect,
  EffectSystem, // Fix: Now exported as interface
} from "./effects";

// UI types - Fix: Use correct exports
export type {
  UITheme,
  ComponentState, // Fix: Now exported
  InteractionEvent, // Fix: Now exported
} from "./ui";

// Korean text types - Fix: Use correct exports
export type {
  KoreanTextStyle,
  KoreanTextProps, // Fix: Now exported
  KoreanTextSize,
  KoreanTextWeight,
  KoreanTextAlignment, // Fix: Now exported
} from "./korean-text";

// Component types
export type * from "./components";

// System types - Fix: Use correct exports
export type {
  CombatSystem, // Fix: Now exported as interface
  TrigramSystem, // Fix: Now exported as interface
  VitalPointSystem, // Fix: Now exported as interface
  SystemEvent,
} from "./systems";

// Controls types - Fix: Import correct exports
export type {
  COMBAT_CONTROLS as CombatControlsConfig,
  // Remove StanceControl export as it doesn't exist
} from "./controls";

// Constants
export * from "./constants";
