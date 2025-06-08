// Component type definitions for Black Trigram Korean martial arts

import React from "react";
import type { Container, Graphics, Text, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";
import type {
  PlayerState,
  VitalPoint,
  TrigramStance,
  PlayerArchetype,
  CombatResult,
  HitEffect,
  KoreanTechnique,
  GameMode,
  GamePhase,
  GameState,
} from "./";

// Core UI component props
export interface PixiComponentProps {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly anchor?: PIXI.ObservablePoint<any>;
  readonly interactive?: boolean;
  readonly buttonMode?: boolean;
  readonly pointertap?: (event: PIXI.FederatedPointerEvent) => void;
  readonly pointerover?: (event: PIXI.FederatedPointerEvent) => void;
  readonly pointerout?: (event: PIXI.FederatedPointerEvent) => void;
}

// Korean text styling
export interface KoreanTextStyleProps {
  readonly style?: PIXI.TextStyle;
  readonly anchor?: PIXI.ObservablePoint<any>;
  readonly draw?: (g: PIXI.Graphics) => void;
  readonly backgroundTexture?: PIXI.Texture;
  readonly borderTexture?: PIXI.Texture;
  readonly shadowTexture?: PIXI.Texture;
  readonly glowTexture?: PIXI.Texture;
}

// Game screen interfaces
export interface IntroScreenProps {
  readonly onGameStart?: (mode: GameMode) => void;
  readonly onModeSelect?: (mode: GameMode) => void;
  readonly width?: number;
  readonly height?: number;
}

export interface GameEngineProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly gamePhase?: GamePhase;
  readonly gameMode?: GameMode;
  readonly onGameStateChange: (state: GameState) => void;
  readonly onPlayerUpdate: (
    playerIndex: 0 | 1,
    updates: Partial<PlayerState>
  ) => void;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly timeRemaining?: number;
  readonly currentRound?: number;
  readonly isPaused?: boolean;
}

export interface TrainingScreenProps {
  readonly players: readonly PlayerState[];
  readonly onPlayerUpdate?: (
    playerIndex: 0 | 1,
    updates: Partial<PlayerState>
  ) => void;
  readonly onStanceChange?: (playerIndex: 0 | 1, stance: TrigramStance) => void;
  readonly selectedStance?: TrigramStance;
  readonly width?: number;
  readonly height?: number;
}

export interface EndScreenProps {
  readonly winner: PlayerState | null;
  readonly onRestart: () => void;
  readonly onReturnToMenu: () => void;
  readonly matchDuration?: number;
  readonly roundsPlayed?: number;
  readonly width?: number;
  readonly height?: number;
}

// Combat system interfaces
export interface CombatScreenProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerUpdate: (
    playerIndex: 0 | 1,
    updates: Partial<PlayerState>
  ) => void;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly isPaused: boolean;
  readonly width?: number;
  readonly height?: number;
}

export interface CombatArenaProps extends PixiComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerUpdate?: (
    playerIndex: 0 | 1,
    updates: Partial<PlayerState>
  ) => void;
  readonly onTechniqueExecute: (
    playerIndex: 0 | 1,
    technique: KoreanTechnique
  ) => Promise<any>;
  readonly combatEffects?: readonly HitEffect[];
  readonly isExecutingTechnique: boolean;
  readonly showVitalPoints: boolean;
  readonly showDebugInfo?: boolean;
}

export interface CombatControlsProps extends PixiComponentProps {
  readonly players: readonly PlayerState[];
  readonly player: PlayerState;
  readonly onStanceChange: (playerIndex: 0 | 1, stance: TrigramStance) => void;
  readonly isExecutingTechnique: boolean;
  readonly isPaused: boolean;
  readonly showVitalPoints: boolean;
}

export interface CombatHUDProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly player?: PlayerState;
  readonly opponent?: PlayerState;
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly maxRounds?: number;
  readonly gameTime?: number;
  readonly isPlayerTurn?: boolean;
  readonly isPaused: boolean;
  readonly x?: number;
  readonly y?: number;
}

// Player visual components
export interface PlayerVisualsProps extends PixiComponentProps {
  readonly playerState: PlayerState;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly showVitalPoints?: boolean;
  readonly onClick?: (vitalPoint?: VitalPoint) => void; // Modified to match usage in CombatArena
  readonly playerIndex?: 0 | 1; // Added playerIndex
  readonly onPlayerClick?: (
    playerIndex: 0 | 1,
    vitalPoint?: VitalPoint
  ) => void; // Added onPlayerClick
}

export interface DojangBackgroundProps extends PixiComponentProps {
  readonly timeOfDay?: "day" | "night";
  readonly weather?: "clear" | "rain" | "snow";
  readonly textureName?: string;
  readonly lighting?: "bright" | "dim" | "atmospheric";
  readonly children?: React.ReactNode;
}

// Game UI components
export interface ControlsSectionProps {
  width?: number;
  height?: number;
  onBack: () => void;
}

export interface GameUIProps {
  gameState: GameState; // Changed to use GameState object
  onStanceChange: (playerIndex: 0 | 1, stance: TrigramStance) => void;
  onPlayerAction: (
    playerIndex: 0 | 1,
    action: "attack" | "defend" | "special",
    details?: any
  ) => void; // Example player action callback
  width?: number;
  height?: number;
}

// Health bar component props
export interface HealthBarProps {
  currentHealth: number;
  maxHealth: number;
  width: number;
  height: number;
  x?: number;
  y?: number;
  color?: number; // Ensure color prop is present
  backgroundColor?: number;
  borderColor?: number;
}

export interface StanceIndicatorProps {
  stance: TrigramStance; // Ensure stance prop is present
  x?: number;
  y?: number;
  size?: number;
}

// Export all interfaces
export type {
  Container as PixiContainer,
  Graphics as PixiGraphics,
  Text as PixiText,
  Sprite as PixiSprite,
};
