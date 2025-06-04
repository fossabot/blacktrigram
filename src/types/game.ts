// Types related to game flow, UI props for game screens, and training

import { TrigramStance } from "./enums";
import type { PlayerState } from "./player"; // Import from player
import type { PlayerArchetype } from "./player";

export interface AppState {
  readonly gamePhase: GamePhase;
  readonly players: readonly [PlayerState, PlayerState];
  readonly gameTime: number;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly combatLog: readonly string[];
  readonly isPaused: boolean;
  readonly winnerId: string | null;
}

export type GamePhase = "intro" | "training" | "combat" | "victory" | "defeat";

export interface GameState {
  readonly phase: GamePhase;
  readonly players: readonly PlayerState[];
  readonly currentRound: number;
  readonly maxRounds: number;
  readonly gameTime: number;
  readonly isPaused: boolean;
  readonly winner?: string;
  readonly selectedArchetype?: PlayerArchetype;
  readonly selectedStance?: TrigramStance;
}

export interface GameConfig {
  readonly maxPlayers: number;
  readonly roundDuration: number;
  readonly maxRounds: number;
  readonly enableDebug: boolean;
}
