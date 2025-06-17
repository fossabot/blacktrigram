/**
 * @fileoverview Complete Combat Components exports for Black Trigram Korean martial arts game
 */

// Core combat screens and systems
export { CombatScreen } from "../CombatScreen";
export { default as CombatScreenDefault } from "../CombatScreen";

// Combat engine and game logic
export { GameEngine } from "../engine/GameEngine";
export { default as GameEngineDefault } from "../engine/GameEngine";

// Combat components
export { CombatArena } from "./CombatArena";
export { CombatHUD } from "./CombatHUD";
export { CombatControls } from "./CombatControls";
export { CombatStats } from "./CombatStats";
export { PlayerStatusPanel } from "./PlayerStatusPanel";

// Enhanced game components
export { Player } from "./Player";
export { PlayerVisuals } from "./PlayerVisuals";
export { HitEffectsLayer } from "./HitEffectsLayer";

// Background and environment
export { DojangBackground } from "../backgrounds/DojangBackground";
export { default as DojangBackgroundDefault } from "../backgrounds/DojangBackground";

// Layout components (fix import path)
export { KoreanButton } from "../../ui/base/KoreanLayoutComponents";

// Default exports for convenience
export { default as CombatArenaDefault } from "./CombatArena";
export { default as CombatHUDDefault } from "./CombatHUD";
export { default as CombatControlsDefault } from "./CombatControls";
export { default as CombatStatsDefault } from "./CombatStats";
export { default as PlayerStatusPanelDefault } from "./PlayerStatusPanel";
export { default as PlayerDefault } from "./Player";
export { default as PlayerVisualsDefault } from "./PlayerVisuals";
export { default as HitEffectsLayerDefault } from "./HitEffectsLayer";

// Re-export types for combat system
export type {
  CombatScreenProps,
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

export type {
  PlayerState,
  KoreanTechnique,
  CombatResult,
  HitEffect,
  DisplayHitEffect,
} from "../../../types/";
