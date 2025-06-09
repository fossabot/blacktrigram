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

// Fix: Export only the types that exist in components.ts and ui.ts
export type {
  UIComponentProps,
  StanceIndicatorProps,
  HealthBarProps,
} from "../../types/ui";

export type {
  EndScreenProps,
  ProgressTrackerProps,
  RoundTimerProps,
  ScoreDisplayProps,
  TrigramWheelProps,
  KoreanHeaderProps,
} from "../../types/components";
