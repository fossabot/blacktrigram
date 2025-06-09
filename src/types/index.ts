/**
 * Main type export for Black Trigram (흑괘)
 * Korean Martial Arts Combat Simulator
 */

import { MatchStatistics } from "./combat";
import { HitEffect } from "./effects";
import {
  VitalPointSeverity,
  EffectType,
  EffectIntensity,
  HitEffectType,
  TrigramStance,
} from "./enums";
import { PlayerState } from "./player";

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
  PlayerCombatStats, // Already defined in player.ts
  PlayerArchetypeData,
  // PlayerArchetype is already exported from enums via *
} from "./player";

export type {
  KoreanTechnique,
  CombatResult,
  DamageRange,
  // TechniqueEffect, // Not defined, remove if not used
  // TargetingInfo, // Not defined, remove if not used
  // CombatLogEntry, // Not defined, remove if not used
  // DamageType is already exported from enums
  // CombatAttackType is already exported from enums
  // HitEffectType is already exported from enums
} from "./combat";

export type {
  VitalPoint as AnatomyVitalPoint, // Alias to avoid conflict with local definition below if any
  VitalPointEffect as AnatomyVitalPointEffect, // Alias
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

// Core type exports for Black Trigram Korean martial arts system

// Re-export all types from individual modules
export * from "./anatomy";
export * from "./audio";
export * from "./combat";
export * from "./common";
export * from "./components";
export * from "./controls";
export * from "./effects";
export * from "./enums";
export * from "./game";
export * from "./korean-text";
export * from "./player";
export * from "./systems";
export * from "./trigram";
export * from "./ui";

// Export constants
export * from "./constants";

// Re-export GameMode from enums to fix type conflicts
export { GameMode } from "./enums";

// Additional missing types
export interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[];
}

export interface DojangBackgroundProps {
  readonly width?: number;
  readonly height?: number;
  readonly animate?: boolean;
  readonly lighting?: "normal" | "dramatic" | "cyberpunk";
}

export interface GameUIProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly maxRounds: number;
  readonly combatEffects: readonly HitEffect[];
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

export interface EndScreenProps {
  readonly winner: PlayerState | null;
  readonly matchStatistics: MatchStatistics;
  readonly onRestart: () => void;
  readonly onReturnToMenu: () => void; // Fixed: renamed from onMainMenu
}

export interface TrigramDisplay {
  readonly stance: TrigramStance;
  readonly size?: number;
  readonly interactive?: boolean;
}

export interface EffectUtils {
  createHitEffect: (
    type: HitEffectType,
    attackerId: string,
    defenderId: string,
    options?: Partial<HitEffect>
  ) => HitEffect;
}
