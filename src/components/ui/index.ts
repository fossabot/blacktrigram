// UI Component exports for Black Trigram

// Base UI components
export { BackgroundGrid } from "./base/BackgroundGrid";
export { BaseButton } from "./base/BaseButton";
export { KoreanHeader } from "./base/KoreanHeader";
export { KoreanPixiComponents } from "./base/KoreanPixiComponents";
export { PixiComponents } from "./base/PixiComponents";

// Korean text components
export { KoreanText } from "./base/korean-text/KoreanText";
export { KoreanTitle } from "./base/korean-text/components/KoreanTitle";
export { KoreanMartialText } from "./base/korean-text/components/KoreanMartialText";
export { KoreanStatusText } from "./base/korean-text/components/KoreanStatusText";
export { KoreanTechniqueText } from "./base/korean-text/components/KoreanTechniqueText";

// Game UI components
export { EndScreen } from "./EndScreen";
export { ProgressTracker } from "./ProgressTracker";
export { TrigramWheel } from "./TrigramWheel";
export { HitEffectsLayer } from "./HitEffectsLayer";

// New UI components
export { HealthBar } from "./HealthBar";
export { StanceIndicator } from "./StanceIndicator";
export { ArchetypeDisplay } from "./ArchetypeDisplay";

// Re-export types
export type {
  BaseButtonProps,
  ProgressTrackerProps,
  EndScreenProps,
  HitEffectsLayerProps,
} from "../../types/components";
