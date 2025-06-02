/**
 * Main type system export hub for Black Trigram (흑괘)
 * Korean Martial Arts Combat Simulator
 */

// =============================================================================
// ENUMS - String literal union types & Enums
// =============================================================================
export type {
  GamePhase,
  ScreenType,
  PlayerArchetype,
  CombatState,
  DamageType,
  TrigramStance,
  VitalPointCategory,
  VitalPointSeverity,
  InputAction,
  TechniqueCategory,
  TrainingMode,
  EffectType,
  AudioCategory,
  KoreanFontWeight,
  KoreanFontStyle,
  ComponentSize,
  AnimationTiming,
  DifficultyLevel,
  MatchResult,
  PhilosophyAspect,
  EffectType as StatusEffectType, // Replaced direct import with alias for EffectType
  ButtonVariant,
  LayoutDirection,
  // KoreanTextStyle, // This is an interface in korean-text.ts, the enum was KoreanTextStyleType
  AudioFormat,
  GameScreen,
  EffectIntensity,
} from "./enums";
export { CombatReadiness, ConsciousnessLevel } from "./player"; // Enums with runtime values

// =============================================================================
// CONSTANTS - Game configuration and fixed values
// =============================================================================
export * from "./constants";

// =============================================================================
// COMMON TYPES - Base shared types
// =============================================================================
export type {
  Position,
  Timestamp,
  EntityId,
  CombatStats,
  GameState,
  DamageRange,
  CombatCondition,
  // PlayerState as CommonPlayerState, // Avoid re-exporting PlayerState under a different name if possible
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
  Range,
  Velocity,
  MatchState,
  GameConfig,
} from "./common";

// =============================================================================
// KOREAN TEXT SYSTEM - Typography and localization
// =============================================================================
export type {
  KoreanText,
  KoreanTextSize,
  KoreanTextVariant,
  KoreanTextEmphasis,
  MartialVariant,
  HonorLevel,
  FontWeight,
  FontFamily,
  KoreanTextStyle as KoreanTextStyleInterface,
  KoreanTextProps,
  KoreanTextHeaderProps, // Changed from KoreanHeaderProps
  KoreanTitleProps,
  KoreanMartialTextProps, // Added for export
  KoreanTechniqueTextProps, // Added for export
  KoreanStatusTextProps, // Added for export
  KoreanTextAnimation,
  AnimatedKoreanTextProps,
  KoreanTypographyTheme,
  KoreanTextMetrics,
  KoreanTextRenderOptions,
  KoreanContentText,
  KoreanTextLocalization,
  KoreanTextAccessibility,
  KoreanTextValidation,
  KoreanTextFormatter,
  KoreanMartialTextPresets,
} from "./korean-text";

// =============================================================================
// ANATOMY SYSTEM - Vital points and anatomical targeting
// =============================================================================
export type {
  VitalPoint,
  AnatomicalLocation,
  VitalPointEffect,
  BodyRegion,
  VitalPointStrike, // This should now be found in anatomy.ts
  BodyPart,
  BodyRegionMap,
  TargetingResult,
  InjuryReport,
  VitalPointDetails,
} from "./anatomy";

// =============================================================================
// PLAYER SYSTEM - Player state and archetypes
// =============================================================================
export type {
  PlayerState,
  PlayerArchetypeData, // Added export
} from "./player";

// =============================================================================
// COMBAT SYSTEM - Fighting mechanics and results
// =============================================================================
export type {
  CombatAttackType,
  KoreanTechnique,
  CombatResult,
  HitResult, // Alias for CombatResult
  CombatAnalysis,
  // StanceTransition, // This is a result type, defined in trigram.ts
  CombatEvent,
} from "./combat";

// =============================================================================
// TRIGRAM SYSTEM - Eight trigram combat philosophy
// =============================================================================
export type {
  TrigramData,
  TrigramVisualEffect,
  TrigramEffectivenessMatrix,
  TrigramStanceState,
  TrigramPhilosophy,
  ArchetypeTrigramBonus,
  TrigramCombination,
  TrigramProgression,
  TrigramTransitionRule, // Renamed from TrigramTransition for clarity of definition
  TrigramTransitionCost, // Added
  TransitionMetrics, // Added
  TransitionPath, // Added
  KiFlowFactors, // Added
  StanceTransition, // This is the result of an attempt to change stance
  TrigramCombatStats,
  TrigramUIConfig,
  EightTrigramSystem,
  TrigramSelector,
  TrigramMasteryCertificate,
  KoreanTechnique as TrigramKoreanTechnique, // If Trigram's KoreanTechnique is different
} from "./trigram";

// =============================================================================
// EFFECTS SYSTEM - Status effects and conditions
// =============================================================================
export type {
  EffectDuration,
  EffectCategory,
  StatusEffect, // Canonical StatusEffect
  EffectModifiers,
  Condition,
  EnvironmentalEffect,
  ArchetypeEffect,
  ComboEffect,
  RecoveryEffect,
  EffectManager,
  EffectApplicationResult,
  EffectResistance,
  EffectVisual,
} from "./effects";

// =============================================================================
// GAME STATE - App state and game flow
// =============================================================================
export type {
  AppState,
  GameEngineProps,
  GameUIProps,
  TrainingScreenProps,
  EndScreenProps as GameEndScreenProps,
} from "./game";

// =============================================================================
// UI & UI COMPONENT TYPES - User interface types
// =============================================================================
export type {
  HitEffect,
  BaseComponentProps,
  // GameComponentProps, // Defined in game.ts or ui.ts if more specific
  ComponentProps,
  IntroScreenProps,
  PlayerProps,
  PlayerVisualsProps,
  HitEffectsLayerProps,
  DojangBackgroundProps,
  KoreanHeaderProps, // This is the one from components.ts for general page headers
  CombatLogProps,
  VitalPointTargetingProps,
  CombatResultDisplayProps,
  AudioControlProps,
  EndScreenProps, // from components.ts
  KoreanTextComponentProps,
  BaseButtonProps,
  BackgroundGridProps,
  CyberpunkBackgroundProps,
} from "./components";

export type {
  TrigramWheelProps,
  ProgressTrackerProps,
  PixiTextStyleConfig,
  KoreanPixiTextConfig,
  UIComponent,
  KoreanUIStyle,
  ButtonConfig,
  InputConfig,
  ModalConfig,
  NavigationItem,
  ProgressBarConfig,
  KoreanTextDisplay,
  ToastConfig,
  SelectOption,
  SelectConfig,
  TabItem,
  TabsConfig,
  TrigramIndicator,
  ArchetypeSelector,
  StatusIndicator,
  CombatHUD,
  SettingsConfig,
  LoadingConfig,
  ErrorConfig,
  TutorialStep,
  TutorialConfig,
} from "./ui";

// =============================================================================
// AUDIO SYSTEM - Sound and music management
// =============================================================================
export type {
  AudioState,
  SoundEffectId,
  MusicTrackId,
  AudioPlaybackOptions,
  AudioConfig,
  AudioAsset,
  SoundLibrary,
  MusicPlaylist,
  AudioSystemControls,
  ProceduralSoundConfig,
} from "./audio";

// =============================================================================
// SYSTEMS - Configuration and management of game systems
// =============================================================================
export type {
  CombatSystemInterface,
  VitalPointSystemInterface,
  VitalPointSystemConfig,
  TrigramSystemInterface,
  InputSystemInterface,
  GamepadState,
  AudioSystemInterface,
  AnimationSystemInterface,
  AnimationConfig,
  PhysicsSystemInterface,
  PhysicsEntityConfig,
  RenderingSystemInterface,
  RenderableConfig,
  GameSystemManager,
  SystemEvent,
  EventBusInterface,
  SystemConfig,
} from "./systems";

// The previous export `TRIGRAM_DATA_FROM_TRIGRAM` was an alias.
// This change ensures that `import { TRIGRAM_DATA } from "./types"` will work as expected.
// If there are any issues with this change, they would likely relate to where TRIGRAM_DATA is imported elsewhere in the codebase.
// Ensure all imports of TRIGRAM_DATA are updated to reflect this change, if necessary.
// If TRIGRAM_DATA is used in a way that requires it to be the default export, then additional changes may be needed.
// However, based on the provided information, this change should correctly resolve the export of TRIGRAM_DATA.
