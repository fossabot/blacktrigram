import type { ReactNode } from "react";
import type { ColorValue, Position } from "./common";
import type { TrigramStance, GamePhase } from "./enums";
import type { PlayerState } from "./player";

// Base component props
export interface BaseComponentProps {
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly children?: ReactNode;
}

// Base UI component props
export interface BaseUIComponentProps {
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly testId?: string;
}

// Progress tracker props
export interface ProgressTrackerProps extends BaseUIComponentProps {
  readonly label: string;
  readonly value: number;
  readonly maxValue: number;
  readonly max?: number; // Alternative naming for compatibility
  readonly barColor?: ColorValue;
  readonly backgroundColor?: ColorValue;
  readonly borderColor?: ColorValue;
  readonly width?: number;
  readonly height?: number;
  readonly showText?: boolean;
  readonly textColor?: ColorValue;
  readonly borderWidth?: number;
  readonly color?: string; // CSS color alternative
}

// Trigram wheel props
export interface TrigramWheelProps extends BaseUIComponentProps {
  readonly size?: number;
  readonly position?: Position;
  readonly interactive?: boolean;
  readonly selectedStance?: TrigramStance;
  readonly onStanceChange?: (stance: TrigramStance) => void;
}

// Korean text styling for PIXI
export interface KoreanPixiTextConfig {
  readonly fontFamily?: string;
  readonly fontSize?: number;
  readonly fill?: ColorValue;
  readonly align?: "left" | "center" | "right";
  readonly wordWrap?: boolean;
  readonly wordWrapWidth?: number;
}

// Menu section props
export interface MenuSectionProps extends BaseUIComponentProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
}

// Philosophy section props
export interface PhilosophySectionProps extends BaseUIComponentProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
}

// Training screen props
export interface TrainingScreenProps extends BaseUIComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly selectedStance: TrigramStance;
  readonly gameTime: number;
  readonly currentRound: number;
}

// Game UI props
export interface GameUIProps extends BaseUIComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gamePhase: GamePhase;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly gameTime: number;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly onStanceChange: (playerIndex: number, stance: TrigramStance) => void;
  readonly combatLog: readonly string[];
  readonly onStartMatch?: () => void;
  readonly onResetMatch?: () => void;
  readonly onTogglePause?: () => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly isPaused?: boolean;
}

// Intro screen props
export interface IntroScreenProps extends BaseUIComponentProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly currentSection?: string;
}

// UI Theme
export interface UITheme {
  readonly colors: {
    readonly primary: string;
    readonly secondary: string;
    readonly accent: string;
    readonly background: string;
    readonly text: string;
  };
  readonly fonts: {
    readonly primary: string;
    readonly secondary: string;
    readonly monospace: string;
  };
}

export interface ColorScheme {
  readonly name: string;
  readonly colors: Record<string, string>;
}
