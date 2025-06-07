// Main components export - resolve naming conflicts

// Game components (Player component from game)
export { Player as GamePlayer } from "./game/Player";
export { PlayerVisuals } from "./game/PlayerVisuals";
export { GameEngine } from "./game/GameEngine";
export { GameUI } from "./game/GameUI";
export { DojangBackground } from "./game/DojangBackground";
export { HitEffectsLayer } from "./game/HitEffectsLayer";

// Combat components
export { default as CombatScreen } from "./combat/CombatScreen";
export * from "./combat/components";

// Training components
export * from "./training";

// Intro components
export * from "./intro";

// UI components (Player component from UI)
export { Player as UIPlayer } from "./ui/Player";
export * from "./ui/base";
export * from "./ui/ProgressTracker";
export * from "./ui/TrigramWheel";
export * from "./ui/EndScreen";
