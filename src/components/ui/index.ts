/**
 * UI components export for Black Trigram
 */

// Main UI components
export { ArchetypeDisplay } from "./ArchetypeDisplay";
export { EndScreen } from "./EndScreen";
export { HealthBar } from "./HealthBar";
export { StanceIndicator } from "./StanceIndicator";
export { ProgressTracker } from "./ProgressTracker";
export { RoundTimer } from "./RoundTimer";
export { ScoreDisplay } from "./ScoreDisplay";
export { TrigramWheel } from "./TrigramWheel";
export { KoreanHeader } from "./KoreanHeader";

// Player components
export { Player } from "./Player";
export { PlayerVisuals } from "./PlayerVisuals";

// Fix: Export as default import since HitEffectsLayer doesn't have named export
export { default as HitEffectsLayer } from "../game/HitEffectsLayer";

// Base components
export * from "./base";

// Type exports - remove duplicates and fix imports
export type {
  BaseComponentProps,
  HealthBarProps,
  StanceIndicatorProps,
  // Fix: Remove MatchStats - it should be MatchStatistics
  // MatchStats,
} from "../../types";

// Re-export component types that exist
export type {
  EndScreenProps,
  ProgressTrackerProps,
  RoundTimerProps,
  ScoreDisplayProps,
  // Fix: Remove TrigramWheelProps if it doesn't exist in components
  // TrigramWheelProps,
} from "../../types/components";
