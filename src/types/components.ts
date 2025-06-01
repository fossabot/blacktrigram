// Types for React components and their props

import type { CSSProperties, ReactNode } from "react";
import type { PlayerState, GamePhase, HitEffect } from "./index";

// ===== App-level Component Types =====

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

export interface EndScreenProps {
  readonly message: string;
  readonly onRestart: () => void;
  readonly onMenu: () => void;
}

// ===== Intro Screen Component Types =====

export interface IntroScreenProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
}

export interface MenuSectionProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
}

export interface PhilosophySectionProps {
  readonly title: string;
  readonly content: string;
  readonly onBack?: () => void;
}

// ===== Game Component Types =====

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly isPlayer1: boolean;
  readonly onAttack: (position: { x: number; y: number }) => void;
}

export interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly isPlayer1: boolean;
  readonly showVitalPoints?: boolean;
  readonly showStanceAura?: boolean;
  readonly opacity?: number;
}

export interface BodyPartProps {
  readonly shape: "circle" | "rectangle" | "line";
  readonly color: number;
  readonly alpha?: number;
  readonly size: {
    readonly radius?: number;
    readonly width?: number;
    readonly height?: number;
    readonly length?: number; // For lines
    readonly thickness?: number; // For lines
  };
  readonly x?: number; // Position relative to its own container
  readonly y?: number;
  readonly rotation?: number; // In radians
  readonly anchor?: { x: number; y: number }; // Anchor for rotation and positioning
}

export interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[];
}

export interface HitEffectDisplayProps {
  readonly effect: HitEffect;
}

export interface DojangBackgroundProps {
  readonly width: number;
  readonly height: number;
  readonly atmosphere?: "traditional" | "cyberpunk" | "mixed";
}

// ===== UI Component Types =====

export interface KoreanHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly showBack?: boolean;
  readonly onBack?: () => void;
}

export interface BaseButtonProps {
  readonly children: ReactNode;
  readonly onClick: () => void;
  readonly variant?: "primary" | "secondary" | "accent" | "danger";
  readonly size?: "small" | "medium" | "large";
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly fullWidth?: boolean;
  readonly className?: string;
  readonly style?: CSSProperties;
}

// ===== PixiJS Component Types =====

export interface PixiGraphicsComponentProps {
  readonly x?: number;
  readonly y?: number;
  readonly interactive?: boolean;
  readonly draw: (graphics: import("pixi.js").Graphics) => void;
  readonly onClick?: (() => void) | null;
  readonly onPointerDown?: (() => void) | null;
  readonly alpha?: number;
  readonly visible?: boolean;
}

export interface PixiTextComponentProps {
  readonly text: string;
  readonly x?: number;
  readonly y?: number;
  readonly anchor?: { x: number; y: number } | number;
  readonly style?: {
    readonly fontFamily?: string;
    readonly fontSize?: number;
    readonly fill?: number | string;
    readonly fontWeight?:
      | "normal"
      | "bold"
      | "bolder"
      | "lighter"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900";
  };
  readonly alpha?: number;
  readonly visible?: boolean;
}

export interface PixiContainerComponentProps {
  readonly children?: ReactNode;
  readonly x?: number;
  readonly y?: number;
  readonly interactive?: boolean;
  readonly onClick?: (() => void) | null;
  readonly onPointerDown?: (() => void) | null;
  readonly onPointerEnter?: (() => void) | null;
  readonly onPointerLeave?: (() => void) | null;
  readonly alpha?: number;
  readonly visible?: boolean;
  readonly scale?: number | { x: number; y: number };
}

export interface TextureState {
  readonly texture: import("pixi.js").Texture | null;
  readonly loading: boolean;
  readonly error: Error | null;
}
