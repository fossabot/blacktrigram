// Component type definitions for Black Trigram Korean martial arts

import type { ReactNode } from "react";
import type {
  Container,
  FederatedPointerEvent,
  Graphics,
  Text,
} from "@pixi/react";
import type {
  PlayerState,
  Position,
  VitalPoint,
  HitEffect,
  TrigramStance,
  KoreanTechnique,
  CombatResult,
  PlayerArchetype,
  GamePhase,
  KoreanText,
  CombatState,
  GameMode,
} from "./index";

// Base component props
export interface BaseUIComponentProps {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly visible?: boolean;
  readonly alpha?: number;
  readonly interactive?: boolean;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

// Base button props
export interface BaseButtonProps extends BaseUIComponentProps {
  readonly text?: string | KoreanText; // Can be simple string or KoreanText
  readonly koreanText?: string; // Keep for compatibility if used
  readonly englishText?: string; // Added
  readonly onClick?: (event: PIXI.FederatedPointerEvent) => void;
  readonly onPixiClick?: (event: PIXI.FederatedPointerEvent) => void; // Added
  readonly disabled?: boolean;
  readonly variant?: "primary" | "secondary" | "danger" | "cyber";
  readonly size?: "small" | "medium" | "large";
  readonly icon?: React.ReactNode | string; // Added: Can be JSX or path to texture
  readonly isLoading?: boolean; // Added
  readonly pixiStyle?: Partial<PIXI.TextStyle>; // Added
  readonly testId?: string; // Added
  readonly anchor?: PIXI.ObservablePoint | number | [number, number]; // Added
  readonly draw?: (g: PIXI.Graphics) => void; // Added
  readonly texture?: PIXI.Texture;
  readonly hoverTexture?: PIXI.Texture;
  readonly pressedTexture?: PIXI.Texture;
  readonly disabledTexture?: PIXI.Texture;
}

// Player visual component props
export interface PlayerVisualsProps extends BaseUIComponentProps {
  readonly playerState: PlayerState;
  readonly playerIndex: 0 | 1;
  readonly position: Position;
  readonly scale?: number;
  readonly rotation?: number;
  readonly showVitalPoints?: boolean;
  readonly showDebugInfo?: boolean;
  readonly onVitalPointClick?: (vitalPoint: VitalPoint) => void;
  readonly onClick?: () => void;
  readonly effects?: readonly HitEffect[];
}

// Player props
export interface PlayerProps extends BaseUIComponentProps {
  readonly playerState: PlayerState;
  readonly playerIndex: 0 | 1;
  readonly onStanceChange?: (stance: TrigramStance) => void;
  readonly onTechniqueExecute?: (technique: KoreanTechnique) => void;
  readonly showVitalPoints?: boolean;
  readonly position?: { x: number; y: number };
  readonly isActive?: boolean;
  readonly showDebugInfo?: boolean;
  readonly onStateUpdate?: (updates: Partial<PlayerState>) => void; // Added for test compatibility
}

// Korean Header props
export interface KoreanHeaderProps extends BaseUIComponentProps {
  readonly title: KoreanText;
  readonly subtitle?: KoreanText;
  readonly variant?: "main" | "section" | "subsection";
  readonly alignment?: "left" | "center" | "right";
  readonly showUnderline?: boolean;
  readonly glowEffect?: boolean;
}

// Menu Section props
export interface MenuSectionProps extends BaseUIComponentProps {
  readonly title?: string;
  readonly onStartGame?: () => void;
  readonly onStartCombat?: () => void;
  readonly onStartTraining?: () => void;
  readonly onShowTraining?: () => void;
  readonly onShowPhilosophy?: () => void;
  readonly onShowControls?: () => void;
  readonly onShowCredits?: () => void;
  readonly onEnterTraining?: () => void;
  readonly onViewControls?: () => void;
  readonly selectedArchetype?: PlayerArchetype;
  readonly onArchetypeSelect?: (archetype: PlayerArchetype) => void;
}

// Philosophy Section props
export interface PhilosophySectionProps extends BaseUIComponentProps {
  readonly title?: string;
  readonly onBack?: () => void;
  readonly onGamePhaseChange?: (phase: GamePhase) => void; // Added
  readonly onBackToMenu?: () => void; // Added
  readonly selectedArchetype?: PlayerArchetype; // Added
  readonly onArchetypeSelect?: (archetype: PlayerArchetype) => void; // Added
}

// Missing HitEffectsLayerProps interface
export interface HitEffectsLayerProps extends BaseUIComponentProps {
  readonly effects: readonly HitEffect[];
  readonly showDebugInfo?: boolean;
}

// Controls Section props
export interface ControlsSectionProps extends BaseUIComponentProps {
  readonly title?: string;
  readonly onBackToMenu?: () => void;
  readonly showAdvanced?: boolean;
}

// Game Engine props
export interface GameEngineProps extends BaseUIComponentProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly gamePhase?: GamePhase;
  readonly gameMode?: GameMode;
  readonly onGameStateChange?: (state: any) => void;
  readonly onPlayerUpdate?: (
    playerIndex: 0 | 1,
    updates: Partial<PlayerState>
  ) => void;
  readonly onGamePhaseChange?: (phase: GamePhase) => void;
}

// Game UI props
export interface GameUIProps extends BaseUIComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gameTime: number;
  readonly currentRound: number;
  readonly gamePhase: GamePhase;
  readonly timeRemaining: number;
  readonly isPaused: boolean;
  readonly combatLog: readonly KoreanText[];
  readonly onStanceChange: (playerIndex: 0 | 1, stance: TrigramStance) => void;
  readonly onPlayerUpdate: (
    playerIndex: 0 | 1,
    updates: Partial<PlayerState>
  ) => void;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
}

// Combat Screen props
export interface CombatScreenProps extends BaseUIComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerUpdate: (
    playerIndex: 0 | 1,
    updates: Partial<PlayerState>
  ) => void;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly isPaused: boolean;
  readonly onGamePhaseChange?: (phase: GamePhase) => void;
}

// Combat HUD props
export interface CombatHUDProps extends BaseUIComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly player?: PlayerState; // Direct prop fallback
  readonly opponent?: PlayerState; // Direct prop fallback
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly maxRounds?: number;
  readonly gameTime?: number;
  readonly isPlayerTurn?: boolean;
  readonly isPaused: boolean;
}

// Combat Arena props
export interface CombatArenaProps extends BaseUIComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerUpdate?: (
    playerIndex: 0 | 1,
    updates: Partial<PlayerState>
  ) => void;
  readonly onTechniqueExecute: (
    playerIndex: 0 | 1,
    technique: KoreanTechnique
  ) => Promise<CombatResult | undefined>;
  readonly combatEffects?: readonly HitEffect[];
  readonly isExecutingTechnique: boolean;
  readonly showVitalPoints?: boolean;
  readonly showDebugInfo?: boolean;
}

// Combat Controls props
export interface CombatControlsProps extends BaseUIComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly player: PlayerState;
  readonly onStanceChange: (playerIndex: 0 | 1, stance: TrigramStance) => void;
  readonly isExecutingTechnique: boolean;
  readonly isPaused: boolean;
  readonly showVitalPoints?: boolean;
}

// Training Screen props
export interface TrainingScreenProps extends BaseUIComponentProps {
  readonly player?: PlayerState;
  readonly players?: readonly [PlayerState, PlayerState];
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly onPlayerUpdate?: (
    playerIndex: 0 | 1,
    updates: Partial<PlayerState>
  ) => void;
  readonly onReturnToMenu?: () => void;
  readonly onStartCombat?: () => void;
}

// Dojang Background props
export interface DojangBackgroundProps extends BaseUIComponentProps {
  readonly timeOfDay?: "day" | "night" | "dawn" | "dusk";
  readonly weather?: "clear" | "rain" | "snow" | "fog";
  readonly lighting?: "bright" | "dim" | "atmospheric";
  readonly textureName?: string;
  readonly children?: ReactNode;
}

// Intro Screen props
export interface IntroScreenProps extends BaseUIComponentProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly onArchetypeSelect?: (archetype: PlayerArchetype) => void;
  readonly selectedArchetype?: PlayerArchetype;
  readonly onStartCombat?: () => void; // Added
  readonly onStartTraining?: () => void; // Added
}

// End Screen props
export interface EndScreenProps extends BaseUIComponentProps {
  readonly winner?: PlayerState | null; // Changed from winnerId to winner, can be PlayerState or null for draw
  readonly onRestart: () => void;
  readonly onReturnToMenu: () => void;
}

// Progress Tracker props
export interface ProgressTrackerProps extends BaseUIComponentProps {
  readonly current: number;
  readonly maximum: number;
  readonly label: KoreanText;
  readonly variant?: "health" | "ki" | "stamina" | "experience";
  readonly showPercentage?: boolean;
  readonly animated?: boolean;
}

// Trigram Wheel props
export interface TrigramWheelProps extends BaseUIComponentProps {
  readonly currentStance: TrigramStance;
  readonly onStanceSelect: (stance: TrigramStance) => void;
  readonly availableStances?: readonly TrigramStance[];
  readonly disabled?: boolean;
  readonly showLabels?: boolean;
  readonly size?: number;
}
