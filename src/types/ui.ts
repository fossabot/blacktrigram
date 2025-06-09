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
