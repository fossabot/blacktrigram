/**
 * Game components export
 */

export { GameEngine } from "./GameEngine";
export { DojangBackground } from "./DojangBackground";
export { Player } from "./Player";
export { PlayerVisuals } from "./PlayerVisuals";
// Fix: Export as default import since HitEffectsLayer doesn't have named export
export { default as HitEffectsLayer } from "./HitEffectsLayer";
// Create GameUI component if it doesn't exist
export { GameUI } from "./GameUI";
