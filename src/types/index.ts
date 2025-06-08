/**
 * Main type export for Black Trigram (흑괘)
 * Korean Martial Arts Combat Simulator
 */

// Core type system for Black Trigram Korean martial arts game

// Base types
export type { Nullable, AnyObject, Dimensions, Coordinate } from "./common";
export type { KoreanText, BaseKoreanText, ColorValue } from "./korean-text"; // Ensure BaseKoreanText is exported if used
export type { Position } from "./common"; // Assuming Position is defined in common.ts

// Enums - export directly from enums.ts or re-export selectively
export * from "./enums"; // This will export all enums

// Game-specific types
export type {
  PlayerState,
  PlayerAttributes,
  PlayerSkills,
  PlayerEquipment, // Added
  PlayerStatus, // Added (if different from PlayerState)
  PlayerAction, // Added
  PlayerMovement, // Added
  PlayerCombatStats, // Added (if different from PlayerAttributes/Skills)
  PlayerAnimations, // Added
  PlayerArchetypeData,
  // PlayerArchetype is already exported from enums via *
} from "./player";

export type {
  KoreanTechnique,
  CombatResult,
  DamageRange,
  TechniqueEffect,
  TargetingInfo,
  CombatLogEntry,
  // DamageType is already exported from enums
  // CombatAttackType is already exported from enums
  // HitEffectType is already exported from enums
} from "./combat";

export type {
  VitalPoint,
  VitalPointEffect,
  BodyRegionData,
  AnatomyModel, // Added
  AnatomicalHit, // Added
  RegionData, // Added
  // VitalPointCategory, VitalPointSeverity, BodyRegion are exported from enums
} from "./anatomy";

export type {
  TrigramData,
  TrigramTheme,
  TrigramInteraction, // Added
  TrigramAttributes, // Added
  // TrigramStance is exported from enums
  // TrigramTechnique, // This might be an alias for KoreanTechnique filtered by stance
} from "./trigram";

export type {
  GameSettings,
  GameState,
  RoundState,
  MatchState,
  // GamePhase is exported from enums
  // GameMode is exported from enums
} from "./game";

export type {
  HitEffect,
  StatusEffect,
  TemporaryEffect,
  PersistentEffect,
  HitEffectText, // Added
  // EffectIntensity is exported from enums
  // EffectType (if different from HitEffectType)
} from "./effects";

// UI Component Props
export type {
  BaseComponentProps, // Added
  KoreanHeaderProps,
  BaseButtonProps,
  ProgressTrackerProps,
  TrigramWheelProps,
  HitEffectsLayerProps, // Added
  MenuSectionProps, // Added
  PhilosophySectionProps, // Added
  ControlsSectionProps,
  PlayerProps, // Added
  PlayerVisualsProps, // Added
  DojangBackgroundProps, // Added
  EndScreenProps,
  StanceIndicatorProps,
  KoreanPixiProgressTrackerProps,
  KoreanPixiTrigramWheelProps,
  KoreanPixiHeaderProps,
  KoreanPixiButtonProps,
} from "./components";

// Screen Props
export type {
  IntroScreenProps,
  TrainingScreenProps,
  CombatScreenProps,
  GameUIProps, // Added
  CombatHUDProps, // Added
  CombatArenaProps, // Added
  CombatControlsProps, // Added
  MatchStats, // Added (ensure this is defined in ui.ts or imported correctly)
} from "./ui"; // Assuming these are defined in ui.ts or re-exported there

// Korean Text specific types (re-exporting from korean-text.ts for clarity if needed)
export type {
  KoreanTextProps,
  KoreanTextHeaderProps, // Already in components.ts, ensure consistency
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
  FontWeight, // Alias for KoreanFontWeight
  StatusKey,
  PixiTextStyleConfig,
  KoreanPixiTextConfig,
  // KoreanTextStyle, // This might be PIXI.TextStyle or a custom config object
  // KoreanCharacterData, // Added
  // KoreanSyllable, // Added
} from "./korean-text";

// Control types
export type {
  ControlScheme,
  KeyBinding,
  StanceControlDetail,
} from "./controls";

// PIXI specific types (if you have custom declarations in pixi-react.d.ts)
// export type {
//   PixiComponentProps,
//   PixiContainerProps,
//   PixiSpriteProps,
//   PixiTextProps,
//   PixiGraphicsProps,
// } from './pixi-react.d';

// Constants (re-exporting from constants/index.ts for a single point of access if preferred)
// Alternatively, allow direct imports from './constants'
export * as Constants from "./constants"; // This makes them accessible via Constants.KOREAN_COLORS etc.
// Or re-export specific constants if preferred:
// export { KOREAN_COLORS, GAME_CONFIG, KOREAN_FONT_FAMILY_PRIMARY, KOREAN_FONT_FAMILY_SECONDARY } from "./constants";

// System-related types (if any are defined at this level)
export type {
  CombatSystemInterface,
  TrigramSystemInterface,
  VitalPointSystemInterface,
  AISystemInterface,
} from "./systems";

// Utility types (if any are defined at this level)
// export type { DeepPartial, ReadonlyRecord } from './utils';

// Core type system exports - comprehensive interface definitions

// Re-export all major type categories
export * from "./anatomy";
export * from "./audio";
export * from "./combat";
export * from "./common";
export * from "./components";
export * from "./constants";
export * from "./controls";
export * from "./effects";
export * from "./enums";
export * from "./game";
export * from "./korean-text";
export * from "./player";
export * from "./systems";
export * from "./trigram";
export * from "./ui";

// Ensure all component prop types are exported
export type {
  GameEngineProps,
  GameUIProps,
  CombatScreenProps,
  CombatArenaProps,
  CombatHUDProps,
  CombatControlsProps,
  PlayerProps,
  PlayerVisualsProps,
  DojangBackgroundProps,
  IntroScreenProps,
  TrainingScreenProps,
} from "./components";

// Essential game state types
export type {
  PlayerState,
  GameState,
  CombatResult,
  HitEffect,
  VitalPoint,
  KoreanTechnique,
  Position,
} from "./game";

// Korean text and cultural types
export type {
  KoreanText,
  KoreanTextVariant,
  KoreanTextStyle,
} from "./korean-text";

// Enum exports
export {
  PlayerArchetype,
  TrigramStance,
  CombatState,
  GamePhase,
  CombatReadiness,
} from "./enums";

// Korean text type
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
  readonly romanized?: string;
}

// Vital point type
export interface VitalPoint {
  readonly id: string;
  readonly name: KoreanText;
  readonly location: {
    readonly x: number;
    readonly y: number;
    readonly region: string;
  };
  readonly category: string;
  readonly severity: "minor" | "moderate" | "severe" | "critical";
  readonly damageMultiplier: number;
  readonly baseAccuracy: number;
  readonly baseDamage: number;
  readonly techniques?: readonly string[];
  readonly effects: readonly VitalPointEffect[];
}

export interface VitalPointEffect {
  readonly id: string;
  readonly type: string;
  readonly intensity: number;
  readonly duration: number;
  readonly description: KoreanText;
  readonly stackable: boolean;
}

// Add experience field to PlayerState
export interface PlayerSkills {
  readonly striking: number;
  readonly grappling: number;
  readonly defense: number;
  readonly focus: number;
  readonly experience: number; // Add experience field
}

// Match statistics interface
export interface MatchStatistics {
  readonly roundsWon: {
    readonly player1: number;
    readonly player2: number;
  };
  readonly totalDamageDealt: {
    readonly player1: number;
    readonly player2: number;
  };
  readonly techniquesUsed: {
    readonly player1: number;
    readonly player2: number;
  };
  readonly vitalPointsHit: {
    readonly player1: number;
    readonly player2: number;
  };
}

// Fix: Export missing types
export type { KoreanTechnique, CombatResult } from "./combat";
export type { TrigramStance } from "./enums";

// Fix: Import GameMode from the correct location
export { GameMode } from "./game";
export { GamePhase, PlayerArchetype, TrigramStance } from "./enums";
