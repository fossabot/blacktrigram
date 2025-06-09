/**
 * Game components export
 */

export { DojangBackground } from "./DojangBackground";
export { GameEngine } from "./GameEngine";
export { GameUI } from "./GameUI";
// Fix: Export as default import since HitEffectsLayer doesn't have named export
export { default as HitEffectsLayer } from "./HitEffectsLayer";
export { Player } from "./Player";
export { PlayerVisuals } from "./PlayerVisuals";

// Re-export types for convenience
export type {
  GameEngineProps,
  PlayerProps,
  PlayerVisualsProps,
  DojangBackgroundProps,
} from "../../types/components";
