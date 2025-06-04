// Combat component prop interfaces for Black Trigram Korean martial arts game

import type { FederatedPointerEvent, Graphics } from "pixi.js";
import type React from "react";
import type { ReactNode } from "react";
import type { KoreanText } from "./korean-text";
import type { GamePhase } from "./enums";
import type { ColorValue } from "./common"; // Add missing import
import type {
  PlayerState,
  PlayerArchetype,
  TrigramStance,
  Position,
  HitEffect,
  CombatResult,
} from "./index";

// Base component props
export interface BaseComponentProps {
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly children?: ReactNode;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly visible?: boolean;
  readonly interactive?: boolean;
}

// Game component props for combat components
export interface GameComponentProps extends BaseComponentProps {
  readonly player?: PlayerState;
  readonly archetype?: PlayerArchetype;
  readonly onStateChange?: (updates: Partial<PlayerState>) => void;
  readonly isActive?: boolean;
  readonly alpha?: number;
  readonly scale?: number | { x: number; y: number };
  readonly onClick?: (event: FederatedPointerEvent) => void;
  readonly onPointerDown?: (event: FederatedPointerEvent) => void;
  readonly onPointerUp?: (event: FederatedPointerEvent) => void;
  readonly onPointerOver?: (event: FederatedPointerEvent) => void;
  readonly onPointerOut?: (event: FederatedPointerEvent) => void;
}

// Component props for different game elements
export interface ComponentProps extends BaseComponentProps {
  // Generic component props
}

// Intro screen component props
export interface IntroScreenProps extends BaseComponentProps {
  readonly onGamePhaseChange: (phase: GamePhase | string) => void;
  readonly onSectionChange?: (section: string) => void;
  readonly currentSection?: string;
  readonly onStartTraining?: () => void;
  readonly onStartCombat?: () => void;
  readonly player?: any;
  readonly onPlayerChange?: (updates: any) => void;
  readonly sessionData?: any;
}

// Training screen component props
export interface TrainingScreenProps extends BaseComponentProps {
  readonly players?: readonly [PlayerState, PlayerState];
  readonly player?: PlayerState;
  readonly onGamePhaseChange?: (phase: GamePhase | string) => void;
  readonly onPlayerUpdate?: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onPlayerStateChange?: (updates: Partial<PlayerState>) => void;
  readonly onReturnToMenu?: () => void;
  readonly onStartCombat?: () => void;
  readonly onStanceChange?: (stance: TrigramStance) => void;
  readonly selectedStance?: TrigramStance;
  readonly gameTime?: number;
  readonly currentRound?: number;
  readonly showVitalPoints?: boolean;
  readonly difficulty?: string;
}

// Game UI component props
export interface GameUIProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gameTime: number;
  readonly currentRound: number;
  readonly gamePhase: GamePhase;
  readonly timeRemaining?: number;
  readonly isPaused?: boolean;
  readonly onStanceChange: (playerIndex: 0 | 1, stance: TrigramStance) => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onGamePhaseChange: (phase: GamePhase | string) => void;
  readonly onPauseToggle?: () => void;
  readonly combatLog?: readonly KoreanText[] | readonly string[];
  readonly showDebug?: boolean;
  readonly onStartMatch?: () => void;
  readonly onResetMatch?: () => void;
  readonly onTogglePause?: () => void;
}

// Player props interface - FIXED: Complete interface
export interface PlayerProps extends GameComponentProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly onStateUpdate: (updates: Partial<PlayerState>) => void;
  readonly onAttack?: (targetPosition?: Position) => void;
  readonly isPlayer1?: boolean;
  readonly archetype: PlayerArchetype;
  readonly stance: TrigramStance;
  readonly position: Position;
  readonly facing: "left" | "right";
  readonly isAttacking?: boolean;
  readonly health: number;
  readonly maxHealth: number;
  readonly ki: number;
  readonly maxKi: number;
  readonly stamina: number;
  readonly maxStamina: number;
}

// Progress tracker props - make health/ki/stamina optional for general use
export interface ProgressTrackerProps extends BaseComponentProps {
  readonly health?: number;
  readonly ki?: number;
  readonly stamina?: number;
  readonly maxHealth?: number;
  readonly maxKi?: number;
  readonly maxStamina?: number;
  readonly label?: string;
  readonly value?: number;
  readonly maxValue?: number;
  readonly barColor?: number;
  readonly backgroundColor?: ColorValue;
  readonly borderColor?: ColorValue;
  readonly showText?: boolean;
  readonly textColor?: ColorValue;
  readonly borderWidth?: number;
  readonly color?: string;
  readonly x?: number; // Add missing position props
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly showLabels?: boolean;
  readonly spacing?: number;
}

// Dojang background props
export interface DojangBackgroundProps extends GameComponentProps {
  readonly timeOfDay?: "day" | "night";
  readonly weather?: "clear" | "rain" | "snow";
  readonly textureName?: string;
  readonly lighting?: "dim" | "bright" | "atmospheric";
}

// Trigram wheel props - FIXED: Match ui.ts interface
export interface TrigramWheelProps extends BaseComponentProps {
  readonly currentStance: TrigramStance;
  readonly onStanceSelect: (stance: TrigramStance) => void;
  readonly selectedStance?: TrigramStance;
  readonly onStanceChange?: (stance: TrigramStance) => void;
  readonly isEnabled?: boolean;
  readonly interactive?: boolean;
  readonly showLabels?: boolean;
  readonly size?: number;
  readonly position?: Position;
  readonly time?: number;
}

// Korean header props - FIXED: Remove title prop, use korean/english
export interface KoreanHeaderProps {
  readonly korean: string;
  readonly english?: string;
  readonly subtitle?: string | KoreanText;
  readonly level?: 1 | 2 | 3;
  readonly showLogo?: boolean;
  readonly style?: Record<string, any>;
  readonly onBackButtonClick?: () => void;
  readonly className?: string;
}

// Hit effects layer props - add this missing interface
export interface HitEffectsLayerProps extends BaseComponentProps {
  readonly effects: readonly HitEffect[];
  readonly duration?: number;
  readonly fadeOutDuration?: number;
  readonly maxEffects?: number;
}

// Graphics drawing callback type
export type GraphicsDrawCallback = (graphics: Graphics) => void;

// Component with graphics drawing
export interface GraphicsComponentProps extends BaseComponentProps {
  readonly draw: GraphicsDrawCallback;
}

// Combat log component props
export interface CombatLogProps extends BaseComponentProps {
  readonly entries: readonly KoreanText[];
  readonly maxEntries?: number;
}

// Vital point targeting component props
export interface VitalPointTargetingProps extends GameComponentProps {
  readonly playerTargeting: PlayerState;
  readonly activeVitalPointId?: string;
  readonly onVitalPointSelect?: (vitalPointId: string) => void;
  readonly showAllPoints?: boolean;
}

// Combat result display props
export interface CombatResultDisplayProps extends BaseComponentProps {
  readonly result: CombatResult;
  readonly onNextRound?: () => void;
  readonly onRematch?: () => void;
  readonly onQuit?: () => void;
}

// Audio control component props
export interface AudioControlProps extends BaseComponentProps {
  readonly onVolumeChange?: (
    volumeType: "master" | "sfx" | "music",
    level: number
  ) => void;
  readonly onMuteToggle?: (audioType: "master" | "sfx" | "music") => void;
  readonly currentVolumes?: {
    master: number;
    sfx: number;
    music: number;
  };
  readonly currentMutes?: {
    master: boolean;
    sfx: boolean;
    music: boolean;
  };
}

// Menu section props - FIXED: Add missing onGamePhaseChange property
export interface MenuSectionProps extends BaseComponentProps {
  readonly onGamePhaseChange: (phase: GamePhase | string) => void;
}

// Philosophy section props - FIXED: Add consistent signature
export interface PhilosophySectionProps extends BaseComponentProps {
  readonly onGamePhaseChange: (phase: GamePhase | string) => void;
}

// End screen props for victory/defeat - FIXED: Add missing properties
export interface EndScreenProps extends BaseComponentProps {
  readonly winnerId: string | null;
  readonly onRestart: () => void;
  readonly onMenu: () => void;
  readonly onReturnToMenu?: () => void; // Add missing prop
  readonly winner?: string; // Add missing prop
  readonly gameStats?: any; // Add missing prop
  readonly loser?: PlayerState;
  readonly onGamePhaseChange?: (phase: GamePhase | string) => void;
  readonly matchStats?: any;
}

// Game engine props - FIXED: Add onGamePhaseChange to match usage
export interface GameEngineProps extends BaseComponentProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly gamePhase?: "intro" | "training" | "combat" | "victory" | "defeat";
  readonly onGameStateChange: (updates: any) => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onGamePhaseChange: (phase: string) => void; // Add missing prop
  readonly gameMode?: "demo" | "versus" | "training";
}

// Korean text component props
export interface KoreanTextComponentProps extends BaseComponentProps {
  readonly text: KoreanText | string;
  readonly size?: "small" | "medium" | "large" | "xlarge" | "title";
  readonly weight?: "light" | "regular" | "bold" | "heavy";
  readonly color?: string;
  readonly align?: "left" | "center" | "right";
  readonly emphasis?: "underline" | "glow";
}

// Base component props with Korean styling
export interface BaseButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "onPointerOver" | "onPointerOut" | "style" | "className"
  > {
  readonly koreanText?: KoreanText | string;
  readonly englishText?: string;
  readonly variant?: "primary" | "secondary" | "danger" | "link";
  readonly size?: "small" | "medium" | "large";
  readonly icon?: React.ReactNode;
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  readonly onPixiClick?: (event: FederatedPointerEvent) => void;
  readonly disabled?: boolean;
  readonly isLoading?: boolean;
  readonly style?: React.CSSProperties;
  readonly className?: string;
}

// Added missing types
export interface BackgroundGridProps extends GameComponentProps {
  readonly gridSize?: number;
  readonly lineColor?: number;
  readonly lineWidth?: number;
}

export interface CyberpunkBackgroundProps extends GameComponentProps {
  readonly theme?: "dark_alley" | "neon_city" | "data_stream";
  readonly animated?: boolean;
}

// Combat screen component props - Fixed combatLog prop
export interface CombatScreenProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onGamePhaseChange: (phase: GamePhase | string) => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly gameTime: number;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly isPaused: boolean;
  readonly matchState?: {
    currentRound: number;
    scores: Record<string, number>;
    roundWinner?: string | null;
    matchWinner?: string | null;
  };
}

// Combat arena props - FIXED: Add missing properties
export interface CombatArenaProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly player?: PlayerState; // Add player prop
  readonly opponent?: PlayerState; // Add opponent prop
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onPlayerStateChange?: (updates: Partial<PlayerState>) => void; // Add missing prop
  readonly onOpponentStateChange?: (updates: Partial<PlayerState>) => void; // Add missing prop
  readonly onCombatResult?: (result: CombatResult) => void; // Add missing prop
  readonly onTechniqueExecute: (
    playerIndex: number,
    technique: any
  ) => Promise<void>;
  readonly combatEffects: readonly HitEffect[];
  readonly isExecutingTechnique: boolean;
  readonly isActive?: boolean; // Add missing prop
  readonly showVitalPoints?: boolean; // Add missing prop
  readonly showDebugInfo?: boolean; // Add missing prop
}

// Combat HUD props - FIXED: Add missing properties
export interface CombatHUDProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly player?: PlayerState; // Add player prop
  readonly opponent?: PlayerState; // Add opponent prop
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly maxRounds?: number; // Add missing prop
  readonly gameTime?: number; // Add missing prop
  readonly isPlayerTurn?: boolean; // Add missing prop
  readonly phase?: string; // Add missing prop
  readonly isPaused?: boolean;
}

// Add missing CombatControlsProps interface
export interface CombatControlsProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly player: PlayerState; // Current active player
  readonly onStanceChange: (playerIndex: number, stance: TrigramStance) => void;
  readonly isExecutingTechnique: boolean;
  readonly isPaused: boolean;
  readonly showVitalPoints?: boolean;
}
