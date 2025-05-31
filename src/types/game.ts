// Types related to game flow, UI props for game screens, and training

import type { PlayerState } from "./player";
import type { GamePhase, TrigramStance } from "./enums";

export interface TrainingProgress {
  practiceCount: number;
  mastery: number; // Typically a value between 0 and 1
}

export interface GameUIProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gamePhase: GamePhase;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly gameTime: number; // Overall game time elapsed
  readonly currentRound: number;
  readonly timeRemaining: number; // Time remaining in current round/match
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

export interface GameEngineProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gamePhase: GamePhase;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onStanceChange: (playerIndex: number, stance: TrigramStance) => void;
}

export interface TrainingScreenProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly onStanceChange: (stance: TrigramStance) => void; // For player to select/practice a stance
  readonly selectedStance?: TrigramStance; // Currently selected/focused stance
  readonly playerProgress?: Partial<Record<TrigramStance, TrainingProgress>>; // Progress for each stance
}
