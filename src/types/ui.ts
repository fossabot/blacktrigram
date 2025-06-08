import type { ReactNode } from "react";
import type {
  PlayerState,
  KoreanText,
  MatchStatistics,
  TrigramStance,
  HitEffect,
  GamePhase,
} from "./index";

// Screen component props
export interface EndScreenProps {
  readonly winner: PlayerState | null;
  readonly matchStatistics: MatchStatistics;
  readonly onRestart: () => void;
  readonly onMainMenu: () => void;
  readonly children?: ReactNode;
}

export interface IntroScreenProps {
  readonly onStartGame: () => void;
  readonly onShowTraining: () => void;
  readonly onShowSettings: () => void;
  readonly children?: ReactNode;
}

export interface TrainingScreenProps {
  readonly onBack: () => void;
  readonly player: PlayerState;
  readonly onPlayerUpdate: (updates: Partial<PlayerState>) => void;
  readonly children?: ReactNode;
}

// Component props that might be missing
export interface CombatScreenProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerUpdate: (
    index: 0 | 1,
    updates: Partial<PlayerState>
  ) => void;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly isPaused: boolean;
  readonly width?: number;
  readonly height?: number;
}

export interface HealthBarProps {
  readonly currentHealth: number;
  readonly maxHealth: number;
  readonly width?: number;
  readonly height?: number;
  readonly showText?: boolean;
  readonly x?: number;
  readonly y?: number;
}

export interface StanceIndicatorProps {
  readonly stance: TrigramStance;
  readonly size?: number;
  readonly showText?: boolean;
  readonly x?: number;
  readonly y?: number;
}

export interface TrigramWheelProps {
  readonly currentStance: TrigramStance;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly selectedStance?: TrigramStance;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
  readonly size?: number;
  readonly interactive?: boolean;
  readonly disabledStances?: readonly TrigramStance[];
  readonly x?: number;
  readonly y?: number;
}

// Additional screen props that may be referenced
export interface LoadingScreenProps {
  readonly progress: number;
  readonly message?: KoreanText;
}

export interface MainMenuScreenProps {
  readonly onNewGame: () => void;
  readonly onLoadGame: () => void;
  readonly onSettings: () => void;
  readonly onExit: () => void;
}

export interface SettingsScreenProps {
  readonly onBack: () => void;
  readonly onApply: (settings: any) => void;
}

export interface TrainingModeUIProps {
  readonly player: PlayerState;
  readonly onPlayerUpdate: (updates: Partial<PlayerState>) => void;
  readonly onReset: () => void;
}

export interface VictoryPoseScreenProps {
  readonly winner: PlayerState;
  readonly onContinue: () => void;
}

export interface VitalPointDisplayProps {
  readonly vitalPoints: readonly string[];
  readonly onVitalPointSelect: (pointId: string) => void;
  readonly selectedPoint?: string;
}

// Generic component props
export interface BaseUIProps {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly visible?: boolean;
  readonly interactive?: boolean;
  readonly testId?: string;
}

// Add missing GameUIProps export
export interface GameUIProps extends BaseUIProps {
  player1: PlayerState;
  player2: PlayerState;
  timeRemaining: number;
  currentRound: number;
  maxRounds: number;
  combatEffects: readonly HitEffect[];
}
