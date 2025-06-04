import type { TrigramStance } from "./trigram";

/**
 * Details for a specific stance control binding.
 */
export interface StanceControlDetail {
  stance: TrigramStance;
  korean: string;
  technique: string;
}

/**
 * Configuration for all combat controls in the game.
 */
export interface CombatControlsConfig {
  stanceControls: Record<string, StanceControlDetail>;
  movement: Record<string, string>;
  combat: Record<string, string>;
  system: Record<string, string>;
}
