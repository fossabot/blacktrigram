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
export type {
  VitalPoint,
  AnatomicalLocation,
  VitalPointHitResult,
  RegionData, // Ensure this is exported
} from "./anatomy";
export type { KoreanTechnique, CombatResult, AttackInput } from "./combat";
// Remove CombatState from combat.ts export since it's now in enums
export type { HitEffect, StatusEffect, VitalPointEffect } from "./effects";
export type {
  KoreanText,
  KoreanTextProps,
  KoreanTextHeaderProps,
  KoreanTitleProps,
  KoreanTechniqueTextProps,
  KoreanStatusTextProps,
  KoreanMartialTextProps,
  KoreanTextSize,
  KoreanFontWeight,
  KoreanTextVariant,
  KoreanTextEmphasis,
  MartialVariant,
  HonorLevel,
  FontWeight,
  StatusKey,
  ColorValue,
  PixiTextStyleConfig,
  KoreanPixiTextConfig,
} from "./korean-text";
export type {
  TrigramData,
  TrigramTransitionCost,
  TransitionMetrics,
  TransitionPath,
  KiFlowFactors,
  StanceTransition,
  TrigramEffectivenessMatrix,
  TrigramTransitionRule,
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
export type { DamageRange } from "./common";
