/**
 * Combat component exports with proper typing and organization
 * Move combat-specific game components here for better organization
 */

// Core combat UI components
export { CombatArena } from "./CombatArena";
export { CombatHUD } from "./CombatHUD";
export { CombatControls } from "./CombatControls";
export { CombatStats } from "./CombatStats";
export { PlayerStatusPanel } from "./PlayerStatusPanel";

// Combat engine and game logic - moved from game package
export { GameEngine } from "./GameEngine";
export { Player } from "./Player";
export { PlayerVisuals } from "./PlayerVisuals";
export { HitEffectsLayer } from "./HitEffectsLayer";

// Combat-specific types
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
} from "../../../types/combat";

// Default exports for convenience
export { default as CombatArenaDefault } from "./CombatArena";
export { default as CombatHUDDefault } from "./CombatHUD";
export { default as CombatControlsDefault } from "./CombatControls";
export { default as CombatStatsDefault } from "./CombatStats";
export { default as PlayerStatusPanelDefault } from "./PlayerStatusPanel";
export { default as GameEngineDefault } from "./GameEngine";
export { default as PlayerDefault } from "./Player";
export { default as PlayerVisualsDefault } from "./PlayerVisuals";
export { default as HitEffectsLayerDefault } from "./HitEffectsLayer";

// Export types for combat components
export type {
  CombatArenaProps,
  CombatHUDProps,
  CombatControlsProps,
  PlayerStatusPanelProps,
  CombatStatsProps,
} from "../../../types/combat";

// Default exports
export { default as CombatArenaDefault } from "./CombatArena";
export { default as CombatHUDDefault } from "./CombatHUD";
export { default as CombatControlsDefault } from "./CombatControls";
