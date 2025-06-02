// Types related to game flow, UI props for game screens, and training

import type {
  GamePhase as EnumGamePhase,
  TrigramStance as EnumTrigramStance,
} from "./enums"; // Import from enums
import type { PlayerState } from "./player"; // Import from player

// Avoid duplicate identifier by aliasing
export type GamePhase = EnumGamePhase;
export type TrigramStance = EnumTrigramStance; // Added alias for TrigramStance

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

export interface GameEngineProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly gamePhase: GamePhase;
  readonly isPaused: boolean;
}

export interface GameUIProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gamePhase: GamePhase;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly gameTime: number;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly onStanceChange: (playerIndex: number, stance: TrigramStance) => void;
  readonly combatLog: readonly string[];
  readonly onStartMatch: () => void;
  readonly onResetMatch: () => void;
  readonly onTogglePause: () => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
}

export interface TrainingScreenProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly onStanceChange: (stance: TrigramStance) => void; // Use aliased TrigramStance
  readonly selectedStance: TrigramStance; // Use aliased TrigramStance
}

export interface EndScreenProps {
  readonly message: string;
  readonly onRestart: () => void;
  readonly onMenu: () => void;
}
