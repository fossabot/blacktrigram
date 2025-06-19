/**
 * Combat components exports
 */


// Combat area and player representation
export { CombatArena } from "./CombatArena";

// Combat UI components
export { CombatControls } from "./CombatControls";
export { CombatHUD } from "./CombatHUD";
export { PlayerStatusPanel } from "./PlayerStatusPanel";

// Type exports (to avoid errors when importing types)
export type { CombatArenaProps } from "./CombatArena";
export type { CombatControlsProps } from "./CombatControls";
export type { CombatStatsProps } from "./CombatStats";
export type { PlayerStatusPanelProps } from './PlayerStatusPanel';
 

// Default exports
export { default as CombatArenaDefault } from "./CombatArena";
export { default as CombatHUDDefault } from "./CombatHUD";
export { default as CombatControlsDefault } from "./CombatControls";
