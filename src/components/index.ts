// Main components export - resolve all naming conflicts with aliases

// Game components (use aliases to avoid conflicts)
export { Player as GamePlayer } from "./game/Player";
export { PlayerVisuals as GamePlayerVisuals } from "./game/PlayerVisuals";
export { GameEngine } from "./game/GameEngine";
export { default as GameUIDefault } from "./game/GameUI";
export { Player } from "./game/Player";
export { PlayerVisuals } from "./game/PlayerVisuals";
export { DojangBackground } from "./game/DojangBackground";
export { default as HitEffectsLayer } from "./game/HitEffectsLayer"; // Game version

// Combat components
export { default as CombatScreen } from "./combat/CombatScreen";
export * from "./combat/components";

// Training components
export * from "./training";

// Intro components (sections only, not duplicate components)
export { default as IntroScreen } from "./intro/IntroScreen";
export * from "./intro/sections";

// UI components (use aliases for conflicts)
export { Player as UIPlayer } from "./ui/Player";
export { PlayerVisuals as UIPlayerVisuals } from "./ui/PlayerVisuals";
export { default as UIHitEffectsLayer } from "./ui/HitEffectsLayer"; // UI version
export * from "./ui/base";
export * from "./ui/ProgressTracker";
export * from "./ui/TrigramWheel";
export * from "./ui/EndScreen";
