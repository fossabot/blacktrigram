// UI-specific types for Black Trigram Korean martial arts game

import type { ReactNode } from "react";
import type {
  PlayerState,
  KoreanText,
  MatchStatistics,
  TrigramStance,
  HitEffect,
  GamePhase,
} from "./index";
import type { PlayerArchetype, GameMode } from "./enums";

// Base UI component props
export interface BaseUIProps {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly alpha?: number;
  readonly visible?: boolean;
  readonly children?: ReactNode;
}

// UI theme configuration
export interface UITheme {
  readonly primary: number;
  readonly secondary: number;
  readonly accent: number;
  readonly background: number;
  readonly text: number;
  readonly border: number;
}

// Menu item definition
export interface MenuItem {
  readonly id: string;
  readonly label: KoreanText;
  readonly action: () => void;
  readonly disabled?: boolean;
  readonly icon?: string;
}

// Modal props
export interface ModalProps extends BaseUIProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: KoreanText;
  readonly content: ReactNode;
}

// Notification system
export interface Notification {
  readonly id: string;
  readonly type: "info" | "success" | "warning" | "error";
  readonly title: KoreanText;
  readonly message: KoreanText;
  readonly duration?: number;
  readonly timestamp: number;
}

// Game settings
export interface GameSettings {
  readonly volume: {
    readonly master: number;
    readonly music: number;
    readonly sfx: number;
  };
  readonly graphics: {
    readonly quality: "low" | "medium" | "high";
    readonly fullscreen: boolean;
    readonly vsync: boolean;
  };
  readonly controls: {
    readonly keyboardLayout: "qwerty" | "dvorak" | "colemak";
    readonly mouseSensitivity: number;
  };
  readonly language: "korean" | "english" | "both";
}

// Screen navigation
export interface ScreenNavigation {
  readonly currentScreen: string;
  readonly previousScreen?: string;
  readonly navigate: (screen: string) => void;
  readonly goBack: () => void;
}

// Loading state
export interface LoadingState {
  readonly isLoading: boolean;
  readonly progress?: number;
  readonly message?: KoreanText;
}

// Error state
export interface ErrorState {
  readonly hasError: boolean;
  readonly error?: Error;
  readonly message?: KoreanText;
  readonly retry?: () => void;
}

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

// Add missing GameUIProps export
export interface GameUIProps extends BaseUIProps {
  player1: PlayerState;
  player2: PlayerState;
  timeRemaining: number;
  currentRound: number;
  maxRounds: number;
  combatEffects: readonly HitEffect[];
}

// UI component interfaces
export interface UIComponentProps {
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly visible?: boolean;
  readonly interactive?: boolean;
}

// Health bar interface
export interface HealthBarProps extends UIComponentProps {
  readonly currentHealth: number;
  readonly maxHealth: number;
  readonly showText?: boolean;
  readonly variant?: "default" | "compact" | "detailed";
}

// Stance indicator interface
export interface StanceIndicatorProps extends UIComponentProps {
  readonly stance: TrigramStance;
  readonly size?: number;
  readonly showText?: boolean;
  readonly isActive?: boolean;
}

// Progress tracker interface
export interface ProgressTrackerProps extends UIComponentProps {
  readonly progress: number;
  readonly maxProgress: number;
  readonly label?: string;
  readonly showPercentage?: boolean;
}

// Score display interface
export interface ScoreDisplayProps extends UIComponentProps {
  readonly player1Score: number;
  readonly player2Score: number;
  readonly player1Name: string;
  readonly player2Name: string;
}

// Round timer interface
export interface RoundTimerProps extends UIComponentProps {
  readonly timeRemaining: number;
  readonly totalTime: number;
  readonly isRunning: boolean;
}

// End screen interface
export interface EndScreenProps extends UIComponentProps {
  readonly winner: PlayerState | null;
  readonly matchStats: {
    readonly duration: number;
    readonly totalRounds: number;
    readonly player1Wins: number;
    readonly player2Wins: number;
  };
  readonly onRestart: () => void;
  readonly onReturnToMenu: () => void;
}

// Korean text display interface
export interface KoreanTextProps extends UIComponentProps {
  readonly text: {
    readonly korean: string;
    readonly english: string;
    readonly romanized?: string;
  };
  readonly fontSize?: number;
  readonly textAlign?: "left" | "center" | "right";
  readonly showBoth?: boolean;
}

// Trigram wheel interface
export interface TrigramWheelProps extends UIComponentProps {
  readonly selectedStance: TrigramStance;
  readonly onStanceSelect: (stance: TrigramStance) => void;
  readonly size?: number;
  readonly interactive?: boolean;
}

// Archetype display interface
export interface ArchetypeDisplayProps extends UIComponentProps {
  readonly player: PlayerState;
  readonly showDetails?: boolean;
  readonly compact?: boolean;
}

// Fix: Add missing ComponentState export
export interface ComponentState {
  readonly visible: boolean;
  readonly interactive: boolean;
  readonly loading: boolean;
  readonly error?: string;
}

// Fix: Add missing InteractionEvent export
export interface InteractionEvent {
  readonly type: string;
  readonly target: string;
  readonly timestamp: number;
  readonly data?: any;
}
