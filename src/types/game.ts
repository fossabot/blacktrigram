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
  currentScreen: "intro" | "training" | "combat" | "victory" | "defeat";
  players: PlayerState[];
  isGameActive: boolean;
  gameTime: number;
  currentRound: number;
  maxRounds: number;
  winner: string | null;
  selectedArchetype?: PlayerArchetype;
  selectedStance?: TrigramStance;
}

export interface GameSettings {
  difficulty: "easy" | "medium" | "hard";
  roundDuration: number; // milliseconds
  enableAudio: boolean;
  debugMode: boolean;
}

export interface IntroScreenProps {
  onArchetypeSelect: (archetype: PlayerArchetype) => void;
  onStanceSelect: (stance: TrigramStance) => void;
  onStartTraining: () => void;
  onStartCombat: () => void;
  selectedArchetype: PlayerArchetype;
  selectedStance: TrigramStance;
}

export interface TrainingScreenProps {
  archetype: PlayerArchetype;
  stance: TrigramStance;
  onBack: () => void;
  onStartCombat: () => void;
}

// Re-export from player types for convenience
export type { PlayerArchetype } from "./player";
