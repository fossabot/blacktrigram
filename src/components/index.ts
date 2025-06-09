/**
 * Main components export for Black Trigram
 */

// Combat components
export * from "./combat";

// Game components
export * from "./game";

// Intro components
export * from "./intro";

// Training components
export * from "./training";

// UI components - specific exports to avoid conflicts
export {
  ArchetypeDisplay,
  EndScreen,
  HealthBar,
  StanceIndicator,
  ProgressTracker,
  RoundTimer,
  ScoreDisplay,
  TrigramWheel,
  KoreanHeader,
} from "./ui";

// Base UI components
export * from "./ui/base";
