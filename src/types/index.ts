/**
 * Main type export for Black Trigram (흑괘)
 * Korean Martial Arts Combat Simulator
 */

// Core type system for Black Trigram Korean martial arts game

// Export all enums first
export * from "./enums";

// Export core types (avoid duplicates by being specific)
export type {
  Position,
  CombatCondition,
  DamageRange,
  // KoreanText as CommonKoreanText, // This was aliasing a potentially problematic local type from common.ts
  ColorValue as CommonColorValue,
} from "./common"; // Aliased to avoid name clashes if re-exporting KoreanText from korean-text.ts
export type {
  PlayerState,
  PlayerArchetypeData,
  PlayerAttributes, // Should now be found
  PlayerSkills, // Should now be found
} from "./player"; // Added PlayerAttributes, PlayerSkills
export type {
  VitalPoint,
  VitalPointEffect,
  VitalPointHitResult,
  AnatomicalLocation,
  RegionData,
  VitalPointCategory, // Re-exporting from anatomy which aliases from enums
  VitalPointSeverity, // Re-exporting from anatomy which aliases from enums
  BodyPart,
  AnatomyModel,
} from "./anatomy";
export type {
  KoreanTechnique,
  CombatResult,
  AttackInput,
  HitResult,
  CombatAnalysis,
  CombatEvent, // Added
  TechniqueType,
} from "./combat"; // Added TechniqueType
export type {
  HitEffect,
  StatusEffect,
  EffectModifier,
  HitEffectText, // Added
} from "./effects"; // Added HitEffectText
export type {
  KoreanText, // This is the primary KoreanText from korean-text.ts
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
  TrigramStance,
  TrigramData,
  TrigramEffectivenessMatrix,
  TrigramSystemInterface,
  TrigramTransitionCost,
  TransitionMetrics,
  TransitionPath,
  TrigramTransitionRule,
  StanceTransition, // Added
} from "./trigram";

// Export control types
export type { CombatControlsConfig, StanceControlDetail } from "./controls";

// Export game types
export type {
  AppState,
  GameState,
  GameSettings,
  GameScreen,
  SessionData,
  TrainingStats,
  CombatStats,
} from "./game";

// Export component types
export type {
  GameUIProps,
  GameEngineProps,
  IntroScreenProps,
  TrainingScreenProps,
  CombatScreenProps,
  CombatHUDProps,
  CombatArenaProps,
  CombatControlsProps,
  ProgressTrackerProps,
  TrigramWheelProps,
  BaseComponentProps,
  MenuSectionProps,
  PhilosophySectionProps,
  EndScreenProps,
  KoreanHeaderProps,
  PlayerProps,
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
  AudioState, // Added AudioState
  IAudioManager, // Added IAudioManager
  MusicTrackId, // Added MusicTrackId
  SoundEffectId, // Added SoundEffectId
  AudioAsset, // Added AudioAsset
  AudioPlaybackOptions, // Added AudioPlaybackOptions
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
  COMBAT_CONTROLS, // Ensure COMBAT_CONTROLS is exported here
} from "./constants";

// Export utility functions
export { createPlayerState } from "../utils/playerUtils";
// export type { DamageRange } from "./common"; // Already exported
export type { BodyRegion } from "./enums";
