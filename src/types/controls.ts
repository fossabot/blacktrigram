import type { TrigramStance } from "./trigram"; // This should be from enums or a central types/index.ts

/**
 * Details for a specific stance control binding.
 */
export interface StanceControlDetail {
  stance: TrigramStance; // Consider aliasing if TrigramStance is also defined in enums.ts
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
