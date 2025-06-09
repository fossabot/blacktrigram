// This file re-exports UI components and related types.

// Export Base UI Components from ./base/index.ts
export * from "./base"; // This will export BaseButton, KoreanHeader, etc.

// Export KoreanPixiComponents and PixiComponents if they are distinct and needed
// If KoreanPixiComponents are the primary Pixi components, ensure they are well-defined.
// export { KoreanPixiButton, KoreanPixiHeader, KoreanPixiProgressTracker, KoreanPixiTrigramWheel } from "./base/KoreanPixiComponents";
// export { PixiButton, PixiTrigramWheel as GenericPixiTrigramWheel } from "./base/PixiComponents"; // Alias if names conflict

// Export specific types needed by consuming modules
// These should ideally come from the main /src/types/index.ts or /src/types/ui.ts
export type {
  CombatScreenProps,
  GameUIProps,
  IntroScreenProps,
  LoadingScreenProps,
  MainMenuScreenProps,
  SettingsScreenProps,
  TrainingModeUIProps,
  VictoryPoseScreenProps,
  VitalPointDisplayProps,
  // BaseButtonProps, // Already exported from ./base
  // ProgressTrackerProps, // Already exported from ./base (if it exists there)
  // HitEffectsLayerProps, // If this is a UI component prop
} from "../../types/ui"; // Assuming these are defined in or re-exported from ui.ts

export type {
  MatchStats, // If used by EndScreenProps etc.
} from "../../types";

// Clean single exports only - remove duplicates

// Export base components
export * from "./base";

// Export Player components with aliases to avoid conflict
export { Player as UIPlayer } from "./Player";
export { PlayerVisuals as UIPlayerVisuals } from "./PlayerVisuals";

// Re-export common types
export type {
  PlayerState,
  KoreanText,
  TrigramStance,
  HitEffect,
} from "../../types";

// Default exports for compatibility
export { default as ArchetypeDisplayDefault } from "./ArchetypeDisplay";
export { default as EndScreenDefault } from "./EndScreen";
export { default as HealthBarDefault } from "./HealthBar";
export { default as HitEffectsLayerDefault } from "./HitEffectsLayer";
export { default as KoreanHeaderDefault } from "./KoreanHeader";
export { default as PlayerDefault } from "./Player";
export { default as PlayerVisualsDefault } from "./PlayerVisuals";
export { default as ProgressTrackerDefault } from "./ProgressTracker";
export { default as RoundTimerDefault } from "./RoundTimer";
export { default as ScoreDisplayDefault } from "./ScoreDisplay";
export { default as StanceIndicatorDefault } from "./StanceIndicator";
export { default as TrigramWheelDefault } from "./TrigramWheel";

// UI components export - cleaned up to remove duplicates and non-existent files

// Export existing UI components only
export { ArchetypeDisplay } from "./ArchetypeDisplay";
export { EndScreen } from "./EndScreen";
export { HealthBar } from "./HealthBar";
export { HitEffectsLayer } from "./HitEffectsLayer"; // Fix: Use default export
export { KoreanHeader } from "./KoreanHeader";
export { Player } from "./Player";
export { PlayerVisuals } from "./PlayerVisuals";
export { ProgressTracker } from "./ProgressTracker";
export { RoundTimer } from "./RoundTimer";
export { ScoreDisplay } from "./ScoreDisplay";
export { StanceIndicator } from "./StanceIndicator";
export { TrigramWheel } from "./TrigramWheel";

// Base UI components
export * from "./base";

// Export types for existing components
export type {
  ArchetypeDisplayProps,
  EndScreenProps,
  HealthBarProps,
  ProgressTrackerProps,
  RoundTimerProps,
  StanceIndicatorProps,
  TrigramWheelProps,
} from "../../types/components";
