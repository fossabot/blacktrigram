/**
 * Main type export for Black Trigram (흑괘)
 * Korean Martial Arts Combat Simulator
 */

// Core type system for Black Trigram Korean martial arts game

// Export all enums first
export * from "./enums";

// Export core types (avoid duplicates by being specific)
export type { Position, CombatCondition } from "./common";
export type { PlayerState, PlayerArchetypeData } from "./player";
export type { VitalPoint } from "./anatomy";
export type {
  KoreanTechnique,
  CombatResult,
  CombatState,
  AttackInput,
} from "./combat";
export type { HitEffect, StatusEffect, VitalPointEffect } from "./effects";
export type {
  KoreanText,
  KoreanTextStyle,
  KoreanTextProps,
  KoreanFontWeight,
  MartialVariant,
  KoreanTextVariant,
} from "./korean-text";
export type {
  TrigramData,
  TrigramTransitionCost,
  TransitionMetrics,
  TransitionPath,
  KiFlowFactors,
  StanceTransition,
} from "./trigram";
export type { AppState } from "./game";

// Export component types
export type {
  GameUIProps,
  GameEngineProps,
  IntroScreenProps,
  TrainingScreenProps,
  ProgressTrackerProps,
  TrigramWheelProps,
  BaseComponentProps,
  MenuSectionProps,
  PhilosophySectionProps,
  EndScreenProps,
  KoreanHeaderProps,
} from "./components";

// Export UI types
export type { UITheme, ColorScheme } from "./ui";

// Export system interfaces
export type {
  VitalPointSystemInterface,
  VitalPointSystemConfig,
  VitalPointHitResult,
} from "./systems";

// Export audio types
export type {
  AudioContextState,
  SoundEffect,
  AudioManagerInterface,
} from "./audio";

// Export constants (value exports)
export {
  KOREAN_COLORS,
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  TRIGRAM_STANCES_ORDER,
  VITAL_POINTS_DATA,
  KOREAN_FONT_FAMILY_PRIMARY,
  KOREAN_FONT_FAMILY_SECONDARY,
  KOREAN_FONT_FAMILY,
  GAME_CONFIG,
} from "./constants";

// Export utility functions
export { createPlayerState } from "../utils/playerUtils";
