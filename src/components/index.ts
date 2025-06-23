/**
 * Main components export for Black Trigram
 */

// Combat components
export * from "./combat";

// Game components
export { DojangBackground } from "./game/DojangBackground";
export { GameEngine } from "./game/GameEngine";
export { Player } from "./game/Player";
export { PlayerVisuals } from "./game/PlayerVisuals";

// UI components
export { BaseButton } from "./ui/base/BaseButton";
export { EndScreen } from "./ui/EndScreen";
export { HealthBar } from "./ui/HealthBar";
export { KoreanHeader } from "./ui/KoreanHeader";
export { StanceIndicator } from "./ui/StanceIndicator";
export { TrigramWheel } from "./ui/TrigramWheel";

// Screen components
export { CombatScreen } from "./combat/CombatScreen";
export { IntroScreen } from "./intro/IntroScreen";
export { TrainingScreen } from "./training";

// Combat components
export { CombatArena } from "./combat/components/CombatArena";
export { CombatControls } from "./combat/components/CombatControls";
export { CombatHUD } from "./combat/components/CombatHUD";
