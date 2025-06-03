// Combat component prop interfaces for Black Trigram Korean martial arts game

import type { FederatedPointerEvent, Graphics } from "pixi.js";
import type React from "react";
import type { ReactNode } from "react";
import type { KoreanText } from "./korean-text";
import type { GamePhase } from "./enums";
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
  // Common props for game components, adjust as needed
  readonly player?: PlayerState; // Make player optional if not always present
  readonly archetype?: PlayerArchetype; // Added from example
  readonly onStateChange?: (updates: Partial<PlayerState>) => void;
  readonly isActive?: boolean;
  // Common props for game world components
  readonly alpha?: number;
  readonly scale?: number | { x: number; y: number };
  readonly onClick?: (event: FederatedPointerEvent) => void;
  // Add other common PIXI interaction events if needed
  readonly onPointerDown?: (event: FederatedPointerEvent) => void;
  readonly onPointerUp?: (event: FederatedPointerEvent) => void;
  readonly onPointerOver?: (event: FederatedPointerEvent) => void;
  readonly onPointerOut?: (event: FederatedPointerEvent) => void;
}

// Component props for different game elements
export interface ComponentProps extends BaseComponentProps {
  // This seems too generic, consider if it's needed or can be merged/removed
  // If it's for general React components, BaseComponentProps might be enough
}

// Intro screen component props
export interface IntroScreenProps extends BaseComponentProps {
  readonly onGamePhaseChange: (phase: GamePhase | string) => void; // Allow string for flexibility
  readonly onSectionChange?: (section: string) => void; // Optional if handled internally
  readonly currentSection?: string; // Added to allow passing current section
}

// Training screen component props
export interface TrainingScreenProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState]; // Added players
  readonly onGamePhaseChange: (phase: GamePhase | string) => void; // Allow string for flexibility
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void; // Added
  readonly onStanceChange: (stance: TrigramStance) => void; // Changed to only stance
  readonly selectedStance: TrigramStance;
  readonly gameTime: number; // Added
  readonly currentRound: number; // Added
}

// Game UI component props
export interface GameUIProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gameTime: number;
  readonly currentRound: number;
  readonly gamePhase: GamePhase;
  readonly timeRemaining?: number; // Added and made optional
  readonly isPaused?: boolean; // Added and made optional
  readonly onStanceChange: (playerIndex: 0 | 1, stance: TrigramStance) => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void; // Added
  readonly onGamePhaseChange: (phase: GamePhase | string) => void; // Added
  readonly onPauseToggle?: () => void;
  readonly combatLog?: readonly KoreanText[] | readonly string[]; // Allow string array for combatLog
  readonly showDebug?: boolean;
  readonly onStartMatch?: () => void; // Added from GameUI.tsx
  readonly onResetMatch?: () => void; // Added from GameUI.tsx
  readonly onTogglePause?: () => void; // Added from GameUI.tsx (duplicate, ensure one)
}

// Player component props
export interface PlayerProps extends GameComponentProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly onStateUpdate: (updates: Partial<PlayerState>) => void;
  readonly onAttack?: (targetPosition?: Position) => void;
  readonly isPlayer1?: boolean;
}

// Progress tracker props - fixed positioning
export interface ProgressTrackerProps extends BaseComponentProps {
  readonly label: string;
  readonly value: number;
  readonly maxValue: number;
  readonly barColor: number;
  readonly width: number;
  readonly height: number;
}

// Dojang background props
export interface DojangBackgroundProps extends GameComponentProps {
  readonly timeOfDay?: "day" | "night";
  readonly weather?: "clear" | "rain" | "snow";
  readonly textureName?: string;
}

// Trigram wheel props - fixed for Korean martial arts
export interface TrigramWheelProps extends BaseComponentProps {
  readonly size: number;
  readonly position: Position;
  readonly selectedStance: TrigramStance;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly interactive?: boolean;
  readonly showLabels?: boolean;
}

// Korean header component props - Fixed title prop
export interface KoreanHeaderProps {
  readonly title: KoreanText;
  readonly subtitle?: string | KoreanText;
  readonly level?: 1 | 2 | 3;
  readonly showLogo?: boolean;
  readonly style?: Record<string, any>;
  readonly onBackButtonClick?: () => void;
  readonly className?: string;
  readonly korean?: string; // For backward compatibility
  readonly english?: string; // For backward compatibility
}

// HitEffectsLayer props
export interface HitEffectsLayerProps extends BaseComponentProps {
  readonly effects: readonly any[];
  readonly duration?: number; // Added missing prop
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
  readonly playerTargeting: PlayerState; // The player whose vital points are shown
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

// Menu section props
export interface MenuSectionProps extends BaseComponentProps {
  readonly title: string;
  readonly onSelect: (option: string) => void;
}

// Philosophy section props
export interface PhilosophySectionProps extends BaseComponentProps {
  readonly onGamePhaseChange: (phase: string) => void;
}

// End screen props for victory/defeat
export interface EndScreenProps extends BaseComponentProps {
  readonly winnerId: string | null; // Changed from winner?: PlayerState
  readonly onRestart: () => void; // Added
  readonly onMenu: () => void; // Added
  readonly loser?: PlayerState;
  readonly onGamePhaseChange?: (phase: GamePhase | string) => void; // Made optional as onRestart/onMenu handle phase changes
  readonly matchStats?: any;
}

// Game engine props
export interface GameEngineProps extends BaseComponentProps {
  readonly players: readonly [any, any]; // TODO: proper player type
  readonly gamePhase: GamePhase;
  readonly onPlayerUpdate: (playerIndex: number, updates: any) => void;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
}

// Korean text component props (for UI components)
// This seems to be for a generic React wrapper around KoreanText display logic.
// The main KoreanTextProps is in korean-text.ts for the actual text elements.
export interface KoreanTextComponentProps extends BaseComponentProps {
  readonly text: KoreanText | string;
  readonly size?: "small" | "medium" | "large" | "xlarge" | "title";
  readonly weight?: "light" | "regular" | "bold" | "heavy";
  readonly color?: string; // CSS color
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
  readonly icon?: React.ReactNode; // e.g., an SVG icon
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  readonly onPixiClick?: (event: FederatedPointerEvent) => void; // For Pixi buttons
  readonly disabled?: boolean;
  readonly isLoading?: boolean;
  readonly style?: React.CSSProperties; // Allow React styles
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

// Combat HUD props
export interface CombatHUDProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly isPaused?: boolean;
}

// Combat arena props
export interface CombatArenaProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onTechniqueExecute: (
    playerIndex: number,
    technique: any
  ) => Promise<void>; // Updated signature
  readonly combatEffects: readonly HitEffect[];
  readonly isExecutingTechnique: boolean;
}

// Combat controls props
export interface CombatControlsProps extends BaseComponentProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onStanceChange: (playerIndex: number, stance: TrigramStance) => void;
  readonly isExecutingTechnique: boolean;
  readonly isPaused: boolean;
}
