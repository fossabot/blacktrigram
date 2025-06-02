// Types related to game flow, UI props for game screens, and training

import type { GamePhase } from "./enums"; // Import from enums
import type { PlayerState } from "./player"; // Import from player

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
