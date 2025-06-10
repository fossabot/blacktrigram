/**
 * Game components export
 */

export { DojangBackground } from "./DojangBackground";
export { GameEngine } from "./GameEngine";
export { GameUI } from "./GameUI";
export { HitEffectsLayer } from "./HitEffectsLayer";
export { Player } from "./Player";
export { PlayerVisuals } from "./PlayerVisuals";

// Re-export types for convenience
export type {
  GameEngineProps,
  PlayerProps,
  PlayerVisualsProps,
  DojangBackgroundProps,
} from "../../types/components";

// Re-export GameStarter if it exists
export { default as GameStarter } from "./GameStarter";
