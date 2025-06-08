// This file re-exports UI components and related types.

// Export Screens/Views
export { CombatScreen } from "./CombatScreen";
export { EndScreen } from "./EndScreen";
export { GameUI } from "./GameUI";
export { HealthBar } from "./HealthBar";
export { IntroScreen } from "./IntroScreen";
export { LoadingScreen } from "./LoadingScreen";
export { MainMenuScreen } from "./MainMenuScreen";
export { SettingsScreen } from "./SettingsScreen";
export { StanceIndicator } from "./StanceIndicator";
export { TrainingModeUI } from "./TrainingModeUI";
export { TrigramWheel } from "./TrigramWheel";
export { VictoryPoseScreen } from "./VictoryPoseScreen";
export { VitalPointDisplay } from "./VitalPointDisplay";

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
  EndScreenProps,
  GameUIProps,
  HealthBarProps,
  IntroScreenProps,
  LoadingScreenProps,
  MainMenuScreenProps,
  SettingsScreenProps,
  StanceIndicatorProps,
  TrainingModeUIProps,
  TrigramWheelProps, // This is likely the DOM version, ensure Pixi version is distinct if needed
  VictoryPoseScreenProps,
  VitalPointDisplayProps,
  // BaseButtonProps, // Already exported from ./base
  // ProgressTrackerProps, // Already exported from ./base (if it exists there)
  // HitEffectsLayerProps, // If this is a UI component prop
} from "../../types/ui"; // Assuming these are defined in or re-exported from ui.ts

export type {
  MatchStats, // If used by EndScreenProps etc.
} from "../../types";

// Main UI components export - clean version without duplicates

// Export base components
export * from "./base";

// Export only existing components (no duplicates)
export { EndScreen } from "./EndScreen";
export { HealthBar } from "./HealthBar";
export { ProgressTracker } from "./ProgressTracker";
export { StanceIndicator } from "./StanceIndicator";
export { TrigramWheel } from "./TrigramWheel";
export { ArchetypeDisplay } from "./ArchetypeDisplay";
export { KoreanHeader } from "./KoreanHeader";
export { Player } from "./Player";
export { PlayerVisuals } from "./PlayerVisuals";
export { RoundTimer } from "./RoundTimer";
export { ScoreDisplay } from "./ScoreDisplay";

// Export types that exist (no duplicates)
export type {
  EndScreenProps,
  HealthBarProps,
  StanceIndicatorProps,
  TrigramWheelProps,
  ProgressTrackerProps,
} from "../../types/components";

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
