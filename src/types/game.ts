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

export type GameScreen = "intro" | "training" | "combat" | "menu";

export interface GameState {
  readonly currentScreen: GameScreen;
  readonly player: PlayerState;
  readonly sessionData: SessionData;
  readonly settings: GameSettings;
  readonly isInitialized: boolean;
}

export interface SessionData {
  readonly startTime: number;
  readonly trainingStats: TrainingStats;
  readonly combatStats: CombatStats;
  readonly currentScore: number;
}

export interface TrainingStats {
  readonly sessionsCompleted: number;
  readonly totalTrainingTime: number;
  readonly stancesLearned: readonly TrigramStance[];
  readonly techniquesLearned: readonly string[];
}

export interface CombatStats {
  readonly wins: number;
  readonly losses: number;
  readonly totalCombats: number;
  readonly averageDamageDealt: number;
  readonly favoriteStance: TrigramStance;
}

export interface GameSettings {
  readonly audioEnabled: boolean;
  readonly musicVolume: number;
  readonly sfxVolume: number;
  readonly language: "korean" | "english" | "bilingual";
  readonly showVitalPoints: boolean;
  readonly showDebugInfo: boolean;
  readonly difficulty: "beginner" | "intermediate" | "advanced" | "master";
}

export interface GameAction {
  readonly type: string;
  readonly timestamp: number;
  readonly data?: unknown;
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
