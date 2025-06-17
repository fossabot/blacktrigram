/**
 * @fileoverview Combat components export index for Black Trigram Korean martial arts game
 * @description Centralized exports for all combat-related UI components
 *
 * @author Black Trigram Development Team
 * @version 1.0.0
 * @since 2024
 */

// Core combat components - named exports
export { CombatArena } from "./CombatArena";
export { CombatHUD } from "./CombatHUD";
export { CombatControls } from "./CombatControls";
export { CombatStats } from "./CombatStats";
export { PlayerStatusPanel } from "./PlayerStatusPanel";
export { GameEngine } from "./GameEngine";

// Player components
export { Player } from "./Player";
export { PlayerVisuals } from "./PlayerVisuals";

// Effects and visual components
export { HitEffectsLayer } from "./HitEffectsLayer";

// Background components
export { DojangBackground } from "./DojangBackground";

// Default exports for convenience (removing duplicates)
export { default as CombatArenaDefault } from "./CombatArena";
export { default as CombatHUDDefault } from "./CombatHUD";
export { default as CombatControlsDefault } from "./CombatControls";
export { default as CombatStatsDefault } from "./CombatStats";
export { default as PlayerStatusPanelDefault } from "./PlayerStatusPanel";
export { default as GameEngineDefault } from "./GameEngine";
export { default as PlayerDefault } from "./Player";
export { default as PlayerVisualsDefault } from "./PlayerVisuals";
export { default as HitEffectsLayerDefault } from "./HitEffectsLayer";
export { default as DojangBackgroundDefault } from "./DojangBackground";

// Re-export types for convenience
export type {
  CombatArenaProps,
  CombatHUDProps,
  CombatControlsProps,
  CombatStatsProps,
  PlayerStatusPanelProps,
  GameEngineProps,
  PlayerProps,
  PlayerVisualsProps,
  HitEffectsLayerProps,
} from "../../../types/components";
