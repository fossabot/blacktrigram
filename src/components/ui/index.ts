/**
 * UI components exports for Black Trigram Korean martial arts game
 */

// Core UI components
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

// Hit effects
export { HitEffectsLayer } from "./HitEffectsLayer";

// Base components
export * from "./base";

// Re-export types
export type {
  UIComponentProps,
  HealthBarProps,
  StanceIndicatorProps,
  TrigramWheelProps,
  ProgressTrackerProps,
  RoundTimerProps,
  ScoreDisplayProps,
} from "../../types/ui";
