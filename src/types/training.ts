import type { PlayerState } from "./player";
import type { TrigramStance } from "./trigram";
import type { Position } from "./common";

export interface TrainingResult {
  readonly accuracyScore: number;
  readonly techniqueScore: number;
  readonly formScore: number;
  readonly improvementAreas: readonly string[];
  readonly nextTrainingGoals: readonly string[];
  readonly hit: boolean;
  readonly damage: number;
  readonly timestamp: number;
}

export interface TrainingSession {
  readonly id: string;
  readonly startTime: number;
  readonly endTime?: number;
  readonly mode: TrainingMode;
  readonly difficulty: TrainingDifficulty;
  readonly player: PlayerState;
  readonly results: readonly TrainingResult[];
  readonly overallScore: number;
  readonly improvements: readonly string[];
}

export type TrainingMode =
  | "basics"
  | "techniques"
  | "sparring"
  | "philosophy"
  | "meditation";
export type TrainingDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "master";

export interface TrainingTarget {
  readonly id: string;
  readonly position: Position;
  readonly size: number;
  readonly type: "vital_point" | "technique_zone" | "balance_point";
  readonly difficulty: number;
  readonly active: boolean;
}

export interface TrainingProgression {
  readonly currentLevel: number;
  readonly experience: number;
  readonly masteredTechniques: readonly string[];
  readonly availableStances: readonly TrigramStance[];
  readonly achievements: readonly string[];
}
