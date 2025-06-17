/**
 * @fileoverview Combat Components Index - Centralized exports for all combat-related components
 * @description Provides organized access to all Korean martial arts combat components
 */

// Core combat components
export { CombatArena } from "./CombatArena";
export { CombatHUD } from "./CombatHUD";
export { CombatControls } from "./CombatControls";
export { CombatStats } from "./CombatStats";
export { PlayerStatusPanel } from "./PlayerStatusPanel";

// Player and visual components
export { Player } from "./Player";
export { PlayerVisuals } from "./PlayerVisuals";
export { HitEffectsLayer } from "./HitEffectsLayer";

// Game engine component
export { GameEngine } from "./GameEngine";

// Background components
export { DojangBackground } from "../backgrounds/DojangBackground";

// Default exports for backward compatibility
export { default as CombatArenaDefault } from "./CombatArena";
export { default as CombatHUDDefault } from "./CombatHUD";
export { default as CombatControlsDefault } from "./CombatControls";
export { default as CombatStatsDefault } from "./CombatStats";
export { default as PlayerStatusPanelDefault } from "./PlayerStatusPanel";
export { default as PlayerDefault } from "./Player";
export { default as PlayerVisualsDefault } from "./PlayerVisuals";
export { default as HitEffectsLayerDefault } from "./HitEffectsLayer";
export { default as GameEngineDefault } from "./GameEngine";
export { default as DojangBackgroundDefault } from "../backgrounds/DojangBackground";

// Type exports
export type {
  CombatArenaProps,
  CombatHUDProps,
  CombatControlsProps,
  CombatStatsProps,
  PlayerStatusPanelProps,
  PlayerProps,
  PlayerVisualsProps,
  HitEffectsLayerProps,
  GameEngineProps,
} from "../../../types/combat";

// Layout component exports
export {
  ResponsiveCombatLayout,
  KoreanPanel,
  KoreanButton,
  KOREAN_LAYOUTS,
} from "../../ui/base/KoreanLayoutComponents";
