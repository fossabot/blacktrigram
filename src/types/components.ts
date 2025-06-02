// Component prop interfaces for Black Trigram Korean martial arts game

import type { ReactNode } from "react";
import type { FederatedPointerEvent } from "pixi.js"; // Import directly
import type { PlayerState, Position, CombatResult, VitalPoint } from "./index";
import type {
  GamePhase,
  PlayerArchetype,
  TrigramStance,
  ButtonVariant as EnumButtonVariant,
} from "./enums";
import type { KoreanText } from "./korean-text";

// Hit effect visual data
export interface HitEffect {
  readonly id: string;
  readonly position: Position;
  readonly damage: number;
  readonly type: "blood" | "spark" | "energy" | "critical";
  readonly duration: number;
  readonly color: number;
  readonly intensity: number;
}

// Base component props
export interface BaseComponentProps {
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly children?: ReactNode;
}

// Game component props for combat components
export interface GameComponentProps extends BaseComponentProps {
  readonly player: PlayerState;
  readonly archetype: PlayerArchetype;
  readonly onStateChange: (updates: Partial<PlayerState>) => void;
  readonly isActive?: boolean;
}

// Component props for different game elements
export interface ComponentProps extends BaseComponentProps {
  readonly variant?: "primary" | "secondary" | "accent";
  readonly size?: "small" | "medium" | "large";
  readonly disabled?: boolean;
}

// Intro screen component props
export interface IntroScreenProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
}

// Training screen component props
export interface TrainingScreenProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly selectedStance: TrigramStance;
}

// Game UI component props
export interface GameUIProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gamePhase: GamePhase;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly gameTime: number;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly onStanceChange: (playerIndex: number, stance: TrigramStance) => void;
  readonly combatLog: readonly string[];
  readonly onStartMatch: () => void;
  readonly onResetMatch: () => void;
  readonly onTogglePause: () => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
}

// Player component props
export interface PlayerProps {
  readonly player: PlayerState;
  readonly onUpdate: (updates: Partial<PlayerState>) => void;
  readonly isActive: boolean;
}

// Player visuals component props
export interface PlayerVisualsProps {
  readonly player: PlayerState;
  readonly showHealthBar?: boolean;
  readonly showStanceAura?: boolean;
  readonly showDamageNumbers?: boolean;
}

// Hit effects layer props
export interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[];
  readonly onEffectComplete: (effectId: string) => void;
}

// Dojang background props
export interface DojangBackgroundProps {
  readonly theme: "traditional" | "cyberpunk" | "underground";
  readonly lighting: number; // 0-1
  readonly atmosphere: "calm" | "intense" | "dramatic";
}

// Trigram wheel component props
// Assuming src/types/ui.ts has the more detailed/correct version for TrigramWheelProps
// export interface TrigramWheelProps {
//   readonly selectedStance: TrigramStance;
//   readonly onStanceSelect: (stance: TrigramStance) => void;
//   readonly playerArchetype: PlayerArchetype;
//   readonly showLabels?: boolean;
//   readonly showEffectiveness?: boolean;
//   readonly isInteractive?: boolean;
// }

// Progress tracker props for health/ki/stamina bars
// Assuming src/types/ui.ts has the more detailed/correct version for ProgressTrackerProps
// export interface ProgressTrackerProps {
//   readonly label: KoreanText; // This was KoreanText, ui.ts has string
//   readonly current: number;
//   readonly maximum: number;
//   readonly color: number;
//   readonly showPercentage?: boolean;
//   readonly animated?: boolean;
//   readonly critical?: boolean;
// }

// Korean header component props
export interface KoreanHeaderProps {
  // Basic header props
  readonly title?: string | KoreanText;
  readonly subtitle?: string | KoreanText;
  readonly level?: 1 | 2 | 3;
  readonly alignment?: "left" | "center" | "right";
  readonly cyberpunk?: boolean;

  // Game navigation props (optional - for game header mode)
  readonly currentPhase?: GamePhase;
  readonly onPhaseChange?: (phase: GamePhase) => void;
  readonly gameTime?: number;
  readonly playerNames?: readonly [string, string];
  readonly showBackButton?: boolean;
  readonly onBack?: () => void;
}

// Combat log component props
export interface CombatLogProps {
  readonly entries: readonly string[];
  readonly maxEntries?: number;
  readonly autoScroll?: boolean;
  readonly showTimestamps?: boolean;
}

// Vital point targeting component props
export interface VitalPointTargetingProps {
  readonly targetBody: "head" | "torso" | "arms" | "legs";
  readonly availablePoints: readonly VitalPoint[];
  readonly onTargetSelect: (vitalPoint: VitalPoint) => void;
  readonly showDifficulty?: boolean;
  readonly showNames?: boolean;
}

// Combat result display props
export interface CombatResultDisplayProps {
  readonly result: CombatResult;
  readonly duration?: number;
  readonly position: Position;
  readonly onComplete: () => void;
}

// Audio control component props
export interface AudioControlProps {
  readonly masterVolume: number;
  readonly sfxVolume: number;
  readonly musicVolume: number;
  readonly muted: boolean;
  readonly onVolumeChange: (
    type: "master" | "sfx" | "music",
    value: number
  ) => void;
  readonly onToggleMute: () => void;
}

// End screen props for victory/defeat
export interface EndScreenProps {
  readonly message: string;
  readonly onRestart: () => void;
  readonly onMenu: () => void;
}

// Game engine props
export interface GameEngineProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gamePhase: GamePhase;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly gameTime: number;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
}

// Korean text component props (for UI components)
export interface KoreanTextComponentProps {
  readonly korean: string;
  readonly english: string;
  readonly romanized?: string;
  readonly size?: "small" | "medium" | "large" | "xlarge";
  readonly weight?: "light" | "regular" | "bold" | "heavy";
  readonly color?: number;
  readonly align?: "left" | "center" | "right";
  readonly cyberpunk?: boolean;
  readonly traditional?: boolean;
}

// Base component props with Korean styling
export interface BaseButtonProps
  extends Omit<
    React.HTMLAttributes<HTMLButtonElement>,
    "onClick" | "onPointerOver" | "onPointerOut" | "style" | "className"
  > {
  // More specific DOM attributes if it's a DOM button
  readonly text?: KoreanText | string;
  readonly onClick?: (
    event?: FederatedPointerEvent | React.MouseEvent // Use imported type
  ) => void; // Allow both event types
  readonly onPointerOver?: (
    event?: FederatedPointerEvent | React.MouseEvent // Use imported type
  ) => void;
  readonly onPointerOut?: (
    event?: FederatedPointerEvent | React.MouseEvent // Use imported type
  ) => void;
  readonly icon?: string; // Could be a path to an image or a Pixi texture ID
  readonly fullWidth?: boolean;
  readonly variant?: EnumButtonVariant;
  readonly size?: "small" | "medium" | "large";
  readonly disabled?: boolean;
  readonly loading?: boolean;
  // Pixi specific props if this is a Pixi component primarily
  x?: number;
  y?: number;
  alpha?: number;
  visible?: boolean;
  interactive?: boolean; // For Pixi
  buttonMode?: boolean; // For Pixi
}

// Added missing types
export interface BackgroundGridProps extends BaseComponentProps {
  readonly gridSize?: number;
  readonly lineColor?: number;
  readonly lineWidth?: number;
  readonly animated?: boolean;
}

export interface CyberpunkBackgroundProps extends BaseComponentProps {
  readonly themeColor?: number;
  readonly glitchEffect?: boolean;
  readonly scanlines?: boolean;
  readonly animatedElements?: boolean;
}
