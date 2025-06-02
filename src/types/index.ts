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
  GamePhase,
  StatusKey,
  VitalPointCategory,
  VitalPointSeverity,
  BodyRegion,
  ComponentSize,
  KoreanFontWeight as KoreanFontWeightEnum, // Alias to avoid conflict with type
  KoreanFontStyle as KoreanFontStyleEnum, // Alias to avoid conflict with type
  TrigramStance as TrigramStanceEnum, // Alias to avoid conflict with type
  PlayerArchetype as PlayerArchetypeEnum, // Alias to avoid conflict with type
} from "./enums";
export type * from "./audio";
export type * from "./combat";
export type * from "./anatomy";
// export type * from "./korean-text"; // Exporting all from korean-text
// export type * from "./ui"; // Exporting all from ui
// To resolve conflicts, explicitly export distinct members or use 'export * as' syntax if needed.

export type {
  KoreanText,
  KoreanFontWeight, // This is a type, should not conflict with the aliased enum
  KoreanTextSize,
  KoreanTextVariant,
  KoreanTextEmphasis,
  MartialVariant,
  HonorLevel,
  KoreanTextStyle,
  KoreanTextProps,
  KoreanTextHeaderProps,
  KoreanTitleProps,
  KoreanMartialTextProps,
  KoreanTechniqueTextProps,
  KoreanStatusTextProps,
  KoreanTextAnimation,
  AnimatedKoreanTextProps,
  KoreanTypographyTheme,
  KoreanTextMetrics,
  KoreanTextRenderOptions,
  KoreanContentText,
  KoreanTextLocalization,
  KoreanTextAccessibility,
  KoreanTextValidation,
  KoreanTextProcessor,
  KoreanMartialTextPresets,
  PixiTextStyleConfig as KoreanTextPixiTextStyleConfig, // Alias to avoid conflict
  KoreanPixiTextConfig as KoreanTextKoreanPixiTextConfig, // Alias to avoid conflict
} from "./korean-text";

export type {
  TrigramWheelProps as UITrigramWheelProps, // Alias to avoid conflict
  ProgressTrackerProps as UIProgressTrackerProps, // Alias to avoid conflict
  PixiTextStyleConfig as UIPixiTextStyleConfig, // Alias if it's different from korean-text's
  KoreanPixiTextConfig as UIKoreanPixiTextConfig, // Alias if it's different
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
