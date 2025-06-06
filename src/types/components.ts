// Combat component prop interfaces for Black Trigram Korean martial arts game

import type { FederatedPointerEvent, Graphics, Texture } from "pixi.js"; // Added Texture
import type React from "react";
import type { ReactNode } from "react";
import type { KoreanText } from "./korean-text";
import type { GamePhase, TrigramStance as EnumTrigramStance } from "./enums"; // Renamed TrigramStance to avoid conflict
import type { ColorValue, Position } from "./common"; // Add missing import for Position
import type {
  PlayerState,
  PlayerArchetype,
  // TrigramStance, // Use EnumTrigramStance
  // Position, // Already imported from common
  HitEffect,
  CombatResult,
  KoreanTechnique,
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
  readonly visible?: boolean; // Added
  readonly interactive?: boolean; // Added
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
  readonly onPointerOver?: (event: FederatedPointerEvent) => void; // Added
  readonly onPointerOut?: (event: FederatedPointerEvent) => void; // Added
}

// Component props for different game elements
export interface ComponentProps extends BaseComponentProps {
  // Generic component props
}

// Intro screen component props
export interface IntroScreenProps extends BaseComponentProps {
  readonly onGamePhaseChange: (phase: GamePhase | string) => void; // This definition seems correct
  readonly onSectionChange?: (section: string) => void; // Added
  readonly currentSection?: string;
  readonly onStartTraining?: () => void;
  readonly onStartCombat?: () => void;
  readonly player?: any;
  readonly onPlayerChange?: (updates: any) => void;
  readonly sessionData?: any;
}

// Training screen component props
export interface TrainingScreenProps extends BaseComponentProps {
  readonly players?: readonly [PlayerState, PlayerState]; // Added
  readonly player?: PlayerState;
  readonly onGamePhaseChange?: (phase: GamePhase | string) => void;
  readonly onPlayerUpdate?: (
    // Added
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onPlayerStateChange?: (updates: Partial<PlayerState>) => void;
  readonly onReturnToMenu?: () => void; // Added
  readonly onStartCombat?: () => void; // Added
  readonly onStanceChange?: (stance: EnumTrigramStance) => void; // Use aliased TrigramStance
  readonly selectedStance?: EnumTrigramStance; // Use aliased TrigramStance
  readonly gameTime?: number; // Added
  readonly currentRound?: number; // Added
  readonly showVitalPoints?: boolean; // Added
  readonly difficulty?: string; // Added
}

// Game UI component props
export interface GameUIProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gameTime: number;
  readonly currentRound: number;
  readonly gamePhase: GamePhase;
  readonly timeRemaining?: number; // Added
  readonly isPaused?: boolean; // Added
  readonly onStanceChange: (
    playerIndex: 0 | 1,
    stance: EnumTrigramStance
  ) => void; // Use aliased TrigramStance
  readonly onPlayerUpdate: (
    // Added
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onGamePhaseChange: (phase: GamePhase | string) => void;
  readonly onPauseToggle?: () => void; // Added
  readonly combatLog?: readonly KoreanText[] | readonly string[]; // Changed to allow string array
  readonly showDebug?: boolean; // Added
  readonly onStartMatch?: () => void; // Added
  readonly onResetMatch?: () => void; // Added
  readonly onTogglePause?: () => void; // Added
}

// Player props interface - FIXED: Complete interface
export interface PlayerProps extends GameComponentProps {
  readonly playerState: PlayerState;
  readonly playerIndex: 0 | 1; // Changed from number
  readonly onStateUpdate: (updates: Partial<PlayerState>) => void; // Changed from onStateChange
  readonly onAttack?: (targetPosition?: Position) => void; // Added
  readonly isPlayer1?: boolean; // Added
  readonly archetype: PlayerArchetype;
  readonly stance: EnumTrigramStance; // Use aliased TrigramStance
  readonly position: Position;
  readonly facing: "left" | "right";
  readonly isAttacking?: boolean; // Added
  readonly health: number; // Added
  readonly maxHealth: number; // Added
  readonly ki: number; // Added
  readonly maxKi: number; // Added
  readonly stamina: number; // Added
  readonly maxStamina: number; // Added
  readonly showVitalPoints?: boolean; // Added showVitalPoints
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
  readonly value?: number; // Added
  readonly maxValue?: number; // Added
  readonly barColor?: number; // Changed from ColorValue
  readonly backgroundColor?: ColorValue;
  readonly borderColor?: ColorValue;
  readonly showText?: boolean;
  readonly textColor?: ColorValue;
  readonly borderWidth?: number;
  readonly color?: string;
  readonly x?: number; // Add missing position props
  readonly y?: number; // Add missing position props
  readonly width?: number;
  readonly height?: number;
  readonly showLabels?: boolean; // Added
  readonly spacing?: number; // Added
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
  readonly currentStance: EnumTrigramStance; // Use aliased TrigramStance
  readonly onStanceSelect: (stance: EnumTrigramStance) => void; // Use aliased TrigramStance
  readonly selectedStance?: EnumTrigramStance; // Use aliased TrigramStance // Added
  readonly onStanceChange?: (stance: EnumTrigramStance) => void; // Use aliased TrigramStance // Added
  readonly isEnabled?: boolean; // Added
  readonly interactive?: boolean;
  readonly showLabels?: boolean; // Added
  readonly size?: number;
  readonly position?: Position; // Keep this for potential direct use
  readonly x?: number; // Add x for individual positioning
  readonly y?: number; // Add y for individual positioning
  readonly time?: number; // Added
}

// Korean header props - FIXED: Remove title prop, use korean/english
export interface KoreanHeaderProps {
  readonly korean: string;
  readonly english?: string;
  readonly subtitle?: string | KoreanText; // Changed to allow KoreanText
  readonly level?: 1 | 2 | 3;
  readonly showLogo?: boolean; // Added
  readonly style?: Record<string, any>; // Added
  readonly onBackButtonClick?: () => void; // Added
  readonly className?: string; // Added
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
  readonly title?: string;
  readonly onSelect?: (option: string) => void; // Added
}

// Philosophy section props - FIXED: Add consistent signature
export interface PhilosophySectionProps extends BaseComponentProps {
  readonly onGamePhaseChange: (phase: GamePhase | string) => void; // Added
  readonly title?: string;
}

// End screen props for victory/defeat - FIXED: Add missing properties
export interface EndScreenProps extends BaseComponentProps {
  readonly winnerId: string | null;
  readonly onRestart: () => void;
  readonly onMenu: () => void;
  readonly onReturnToMenu?: () => void; // Add missing prop
  readonly winner?: string; // Add missing prop
  readonly gameStats?: any; // Add missing prop
  readonly loser?: PlayerState; // Added
  readonly onGamePhaseChange?: (phase: GamePhase | string) => void; // Added
  readonly matchStats?: any; // Added
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
  readonly onGamePhaseChange: (phase: string | GamePhase) => void; // Ensure this matches usage
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
  readonly text?: KoreanText | string; // Changed from koreanText and englishText
  readonly englishText?: string; // Kept for now if some components still use it, but prefer 'text'
  readonly variant?: "primary" | "secondary" | "danger" | "link" | "ghost";
  readonly size?: "small" | "medium" | "large";
  readonly icon?: React.ReactNode;
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  readonly onPixiClick?: (event: FederatedPointerEvent) => void;
  readonly disabled?: boolean;
  readonly isLoading?: boolean;
  readonly style?: React.CSSProperties;
  readonly className?: string;
  readonly fullWidth?: boolean; // Added
  readonly testId?: string; // Added
}

// Added missing types
export interface BackgroundGridProps extends GameComponentProps {
  readonly gridSize?: number;
  readonly lineColor?: number; // Added
  readonly lineWidth?: number; // Added
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
  readonly timeRemaining: number; // Added
  readonly isPaused: boolean; // Added
  readonly matchState?: {
    // Added
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
    // Adjusted to match handler
    playerIndex: 0 | 1,
    technique: KoreanTechnique
  ) => Promise<CombatResult | undefined>;
  readonly combatEffects: readonly HitEffect[];
  readonly isExecutingTechnique: boolean; // Added
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
  readonly players: readonly [PlayerState, PlayerState]; // Added
  readonly player: PlayerState; // Current active player
  readonly onStanceChange: (
    playerIndex: 0 | 1, // Changed from number
    stance: EnumTrigramStance
  ) => void; // Use aliased TrigramStance
  readonly isExecutingTechnique: boolean; // Added
  readonly isPaused: boolean; // Added
  readonly showVitalPoints?: boolean; // Added
}

// Add missing ControlsSectionProps interface
export interface ControlsSectionProps extends BaseComponentProps {
  readonly onGamePhaseChange: (phase: GamePhase | string) => void; // Added
  readonly title?: string; // Added based on typical section structure
  // Add any other props specific to ControlsSection
}

// Player visuals props - FIXED: Complete interface
export interface PlayerVisualsProps extends GameComponentProps {
  playerState: PlayerState;
  playerIndex: 0 | 1; // 0 for player 1, 1 for player 2
  texture?: Texture | undefined; // Allow undefined, use imported Texture
  showVitalPoints?: boolean;
  x?: number; // Added x
  y?: number; // Added y
}
