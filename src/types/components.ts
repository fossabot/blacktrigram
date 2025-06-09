/**
 * Component props interfaces for Black Trigram Korean martial arts system
 */

import type * as PIXI from "pixi.js";
import type {
  PlayerState,
  GameMode,
  MatchStatistics,
  KoreanText,
  KoreanTechnique,
  TrigramStance,
  PlayerArchetype,
  CombatResult,
  GameEvent,
} from "./index";
import type { EnumCombatAttackType } from "./enums";

// Base component props interface
export interface BaseComponentProps {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly visible?: boolean;
  readonly interactive?: boolean;
  readonly alpha?: number;
  readonly rotation?: number;
  readonly scale?: number | { x: number; y: number };
  readonly anchor?: number | { x: number; y: number };
  readonly pivot?: number | { x: number; y: number };
  readonly tint?: number;
  readonly blendMode?: PIXI.BLEND_MODES;
  readonly filters?: PIXI.Filter[];
  readonly mask?: PIXI.DisplayObject;
  readonly renderable?: boolean;
  readonly zIndex?: number;
  readonly name?: string;
  readonly accessibleTitle?: string;
  readonly accessibleHint?: string;
  readonly tabIndex?: number;
}

// Screen component props
export interface IntroScreenProps extends BaseComponentProps {
  readonly onMenuSelect: (mode: GameMode) => void;
  readonly onArchetypeSelect?: (archetype: PlayerArchetype) => void;
  readonly selectedArchetype?: PlayerArchetype;
}

export interface TrainingScreenProps extends BaseComponentProps {
  readonly onReturnToMenu: () => void;
  readonly selectedArchetype?: PlayerArchetype | null;
}

export interface CombatScreenProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly isPaused: boolean;
  readonly onPlayerUpdate: (
    index: 0 | 1,
    updates: Partial<PlayerState>
  ) => void;
  readonly onReturnToMenu: () => void;
  readonly onGameEnd: (winner?: PlayerState | "draw") => void;
  readonly gameMode: GameMode;
}

export interface EndScreenProps extends BaseComponentProps {
  readonly winner: PlayerState | null;
  readonly matchStatistics: MatchStatistics;
  readonly onReturnToMenu: () => void;
  readonly onPlayAgain?: () => void;
}

// Combat component props
export interface CombatArenaProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerClick?: (playerIndex: number) => void;
}

export interface CombatHUDProps extends BaseComponentProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly players?: readonly [PlayerState, PlayerState];
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly maxRounds: number;
  readonly isPaused?: boolean;
  readonly onPauseToggle?: () => void;
}

export interface CombatControlsProps extends BaseComponentProps {
  readonly onAttack: () => void;
  readonly onDefend: () => void;
  readonly onSwitchStance?: (stance: TrigramStance) => void;
  readonly onPauseToggle: () => void;
  readonly isPaused: boolean;
  readonly player: PlayerState;
  readonly onTechniqueExecute?: (technique: KoreanTechnique) => void;
  readonly onGuard?: () => void;
  readonly isExecutingTechnique?: boolean;
}

// UI component props
export interface ControlsSectionProps extends BaseComponentProps {
  readonly onBack: () => void;
}

export interface KoreanHeaderProps extends BaseComponentProps {
  readonly title: KoreanText;
  readonly subtitle?: KoreanText;
  readonly size?: "small" | "medium" | "large";
  readonly alignment?: "left" | "center" | "right";
  readonly fontSize?: number;
  readonly textColor?: number;
  readonly accentColor?: number;
  readonly showUnderline?: boolean;
  readonly align?: "left" | "center" | "right";
}

export interface TrigramWheelProps extends BaseComponentProps {
  readonly selectedStance?: TrigramStance;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
  readonly size?: number;
  readonly interactive?: boolean;
  readonly showLabels?: boolean;
}

export interface BaseButtonProps extends BaseComponentProps {
  readonly text: string;
  readonly onClick: () => void;
  readonly variant?: "primary" | "secondary" | "accent" | "ghost";
  readonly disabled?: boolean;
  readonly koreanText?: KoreanText;
  readonly icon?: string;
  readonly size?: "small" | "medium" | "large";
  readonly onPointerDown?: () => void;
  readonly onPointerUp?: () => void;
  readonly onPointerOver?: () => void;
  readonly onPointerOut?: () => void;
  readonly testId?: string;
  readonly buttonMode?: boolean;
  readonly loading?: boolean; // Fix: Add missing loading prop
}

export interface HealthBarProps extends BaseComponentProps {
  readonly currentHealth: number;
  readonly maxHealth: number;
  readonly showText?: boolean;
  readonly showPercentage?: boolean;
  readonly animated?: boolean;
  readonly backgroundColor?: number;
  readonly borderColor?: number;
  readonly criticalColor?: number;
}

export interface StanceIndicatorProps extends BaseComponentProps {
  readonly stance: TrigramStance;
  readonly size?: number;
  readonly showText?: boolean;
  readonly glowEffect?: boolean;
}

export interface ProgressTrackerProps extends BaseComponentProps {
  readonly progress: number;
  readonly maxProgress: number;
  readonly label?: string;
  readonly showPercentage?: boolean;
}

export interface RoundTimerProps extends BaseComponentProps {
  readonly timeRemaining: number;
  readonly maxTime: number;
  readonly isPaused?: boolean;
  readonly showWarning?: boolean;
}

export interface ScoreDisplayProps extends BaseComponentProps {
  readonly player1Score: number;
  readonly player2Score: number;
  readonly maxScore?: number;
}

// Game component props
export interface PlayerProps extends BaseComponentProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly onClick?: () => void;
}

export interface PlayerVisualsProps extends BaseComponentProps {
  readonly playerState: PlayerState;
  readonly animationState?: string;
  readonly showHitboxes?: boolean;
}

export interface DojangBackgroundProps extends BaseComponentProps {
  readonly animate?: boolean;
  readonly lighting?: "normal" | "cyberpunk" | "traditional";
}

// Fix: Update GameEngineProps to use proper player index type
export interface GameEngineProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerUpdate: (
    playerIndex: 0 | 1,
    updates: Partial<PlayerState>
  ) => void; // Fix: Use 0 | 1
  readonly onCombatResult: (result: CombatResult) => void;
  readonly onGameEvent: (event: string, data?: any) => void;
  readonly isPaused: boolean;
  readonly gameMode?: string;
}

export interface HitEffectsLayerProps extends BaseComponentProps {
  readonly effects: readonly any[];
  readonly onEffectComplete?: (effectId: string) => void;
}

// Menu section props
export interface MenuSectionProps extends BaseComponentProps {
  readonly selectedMode: GameMode;
  readonly onModeSelect: (mode: GameMode) => void;
  readonly onStartGame: () => void;
  readonly onShowPhilosophy: () => void;
  readonly onShowControls: () => void;
}

export interface PhilosophySectionProps extends BaseComponentProps {
  readonly onBack: () => void;
}

// Fix: Add missing GameUIProps interface
export interface GameUIProps extends BaseComponentProps {
  readonly gameState?: any;
  readonly onStateChange?: (newState: any) => void;
}

// Type aliases for compatibility
export type CombatAttackType = EnumCombatAttackType;

// Export common PIXI components for convenience
export type PixiContainer = PIXI.Container;
export type PixiGraphics = PIXI.Graphics;
export type PixiText = PIXI.Text;
export type PixiSprite = PIXI.Sprite;
export type PixiTextStyle = PIXI.TextStyle;

// Re-export useful types
export type {
  PlayerState,
  GameMode,
  MatchStatistics,
  KoreanText,
  KoreanTechnique,
  TrigramStance,
  PlayerArchetype,
  CombatResult,
  GameEvent,
} from "./index";
