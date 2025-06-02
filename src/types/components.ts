// Component prop interfaces for Black Trigram Korean martial arts game

import type { FederatedPointerEvent, Texture, DisplayObject } from "pixi.js"; // Corrected DisplyObject
import type React from "react";
import type {
  PlayerState,
  PlayerArchetype,
  TrigramStance,
  GamePhase,
  KoreanText, // This is the type from korean-text.ts
  Position,
  HitEffect,
  CombatResult,
} from "./index";
import type {
  UITrigramWheelProps, // Use aliased import from index.ts
  UIProgressTrackerProps, // Use aliased import from index.ts
} from "./index"; // Adjusted to import from index.ts which should handle aliasing

// Base component props - if this is intended to be globally unique, define it once.
// If it's a local type for this file, it's fine.
// Assuming this is the primary definition for BaseComponentProps.
export interface BaseComponentProps {
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly children?: React.ReactNode;
}

// Game component props for combat components
export interface GameComponentProps extends BaseComponentProps {
  // Common props for game components, adjust as needed
  readonly player?: PlayerState; // Make player optional if not always present
  readonly archetype?: PlayerArchetype; // Added from example
  readonly onStateChange?: (updates: Partial<PlayerState>) => void;
  readonly isActive?: boolean;
  // Common props for game world components
  readonly x?: number;
  readonly y?: number;
  readonly alpha?: number;
  readonly visible?: boolean;
  readonly scale?: number | { x: number; y: number };
  readonly interactive?: boolean;
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
  readonly playerState: PlayerState; // Renamed from 'player' for clarity if GameComponentProps also has 'player'
  readonly playerIndex: number; // Added
  readonly onStateUpdate: (updates: Partial<PlayerState>) => void; // Added
  readonly onAttack?: (targetPosition?: Position) => void; // Added, made targetPosition optional
  readonly isPlayer1?: boolean; // Added
  // readonly archetype: PlayerArchetype; // Already in PlayerState, or could be a direct prop if needed
}

// Player visuals component props
export interface PlayerVisualsProps extends GameComponentProps {
  readonly playerState: PlayerState;
  readonly archetype: PlayerArchetype;
  readonly texture?: Texture | DisplayObject; // Corrected: DisplayObject is now correctly typed
  readonly showHealthBar?: boolean;
  readonly showKiBar?: boolean;
  readonly showStaminaBar?: boolean;
  readonly isPlayerControlled?: boolean; // If this visual represents the main player
}

// Hit effects layer props
export interface HitEffectsLayerProps extends GameComponentProps {
  readonly effects: readonly HitEffect[];
  readonly onEffectComplete?: (effectId: string) => void;
}

// Dojang background props
export interface DojangBackgroundProps extends GameComponentProps {
  readonly textureName?: string; // e.g., "dojang_day", "dojang_night_cyberpunk"
  readonly timeOfDay?: "day" | "night";
  readonly weather?: "clear" | "rain" | "snow";
}

// Trigram wheel component props (using the one from ui.ts via alias)
export type TrigramWheelProps = UITrigramWheelProps;

// Progress tracker props for health/ki/stamina bars (using the one from ui.ts via alias)
export type ProgressTrackerProps = UIProgressTrackerProps;

// Korean header component props
export interface KoreanHeaderProps extends BaseComponentProps {
  readonly title: KoreanText | string;
  readonly subtitle?: KoreanText | string;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6; // For h1-h6 semantics
  readonly onBackButtonClick?: () => void;
  readonly showLogo?: boolean;
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
export interface GameEngineProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gamePhase: GamePhase;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onGamePhaseChange: (phase: GamePhase | string) => void;
  // Add other props as needed
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
