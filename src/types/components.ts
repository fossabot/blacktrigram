// Component type definitions for Black Trigram Korean martial arts

import type { ComponentProps, ReactNode } from "react";
import type * as PIXI from "pixi.js";
import type {
  PlayerState,
  GameState,
  GamePhase,
  TrigramStance,
  HitEffect,
  MatchStatistics,
  KoreanTechnique,
  CombatResult,
  Position,
  KoreanText,
  VitalPoint,
  KoreanTextEmphasis,
  KoreanTextSize,
} from "./index";
import type { GameMode, PlayerArchetype } from "./enums";
import { KoreanTextWeight } from "@/components";

// Base component props for all PixiJS components
export interface BaseComponentProps {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly rotation?: number;
  readonly alpha?: number;
  readonly visible?: boolean;
  readonly interactive?: boolean;
  readonly children?: ReactNode;
}

// Base PIXI component props
export interface BasePixiProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  alpha?: number;
  visible?: boolean;
  interactive?: boolean;
  buttonMode?: boolean;
  scale?: number | { x: number; y: number };
  rotation?: number;
  anchor?: number | { x: number; y: number };
  pivot?: { x: number; y: number };
  tint?: number;
}

// Korean text component props
export interface KoreanTextProps {
  text: KoreanText;
  showBoth?: boolean;
  koreanFirst?: boolean;
  style?: PIXI.TextStyle;
}

// Player visual component props
export interface PlayerVisualsProps extends BasePixiProps {
  playerState: PlayerState;
  showHealthBar?: boolean;
  showStanceIndicator?: boolean;
  showVitalPoints?: boolean;
  onVitalPointClick?: (vitalPoint: VitalPoint) => void;
}

// Health bar component props
export interface HealthBarProps extends BasePixiProps {
  currentHealth: number;
  maxHealth: number;
  fillColor?: number;
  backgroundColor?: number;
  borderColor?: number;
  criticalColor?: number;
  showText?: boolean;
}

// Stance indicator props
export interface StanceIndicatorProps extends BasePixiProps {
  stance: TrigramStance;
  size?: number;
  showText?: boolean;
  glowEffect?: boolean;
}

// Trigram wheel props
export interface TrigramWheelProps {
  readonly selectedStance: TrigramStance;
  readonly onStanceSelect: (stance: TrigramStance) => void;
  readonly showLabels?: boolean;
  readonly interactive?: boolean;
  readonly x?: number;
  readonly y?: number;
  // readonly size?: number; // Remove if not supported
  readonly width?: number;
  readonly height?: number;
}

// Combat HUD props
export interface CombatHUDProps extends BasePixiProps {
  players: readonly [PlayerState, PlayerState];
  timeRemaining: number;
  currentRound: number;
  maxRounds: number;
  isPaused: boolean;
  isPlayerTurn?: boolean;
}

// Combat arena props
export interface CombatArenaProps extends BasePixiProps {
  players: readonly [PlayerState, PlayerState];
  onPlayerUpdate: (playerIndex: 0 | 1, updates: Partial<PlayerState>) => void;
  onTechniqueExecute: (
    playerIndex: 0 | 1,
    technique: KoreanTechnique
  ) => Promise<CombatResult | undefined>;
  combatEffects: readonly HitEffect[];
  isExecutingTechnique?: boolean;
  showVitalPoints?: boolean;
  showDebugInfo?: boolean;
}

// Combat controls props
export interface CombatControlsProps extends BasePixiProps {
  players: readonly [PlayerState, PlayerState];
  player: PlayerState;
  onStanceChange: (playerIndex: 0 | 1, stance: TrigramStance) => void;
  isExecutingTechnique?: boolean;
  isPaused?: boolean;
  showVitalPoints?: boolean;
}

// Combat screen props
export interface CombatScreenProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerUpdate?: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onReturnToMenu?: () => void;
  readonly gamePhase?: GamePhase; // Fix: Now properly typed
  readonly onGamePhaseChange?: (phase: GamePhase) => void; // Fix: Now properly typed
  readonly timeRemaining?: number;
}

// Game engine props
export interface GameEngineProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly gamePhase?: GamePhase;
  readonly onGameStateChange?: (gameState: GameState) => void;
  readonly onPlayerUpdate?: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onGamePhaseChange?: (phase: GamePhase) => void;
  readonly timeRemaining?: number;
  readonly currentRound?: number;
  readonly isPaused?: boolean;
  readonly gameMode?: GameMode; // Fix: Remove explicit import, use local GameMode enum
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly onPlayer1Update?: (updates: Partial<PlayerState>) => void;
  readonly onPlayer2Update?: (updates: Partial<PlayerState>) => void;
  readonly onCombatResult?: (result: CombatResult) => void; // Fix: Add missing prop
}

// Game UI props
export interface GameUIProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly gamePhase?: GamePhase;
  readonly onGamePhaseChange?: (phase: GamePhase) => void;
  readonly gameTime?: number;
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly maxRounds: number;
  readonly onStanceChange?: (
    playerIndex: number,
    stance: TrigramStance
  ) => void;
  readonly combatEffects: readonly HitEffect[];
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly testId?: string;
}

// Dojang background props
export interface DojangBackgroundProps {
  readonly width?: number;
  readonly height?: number;
  readonly animate?: boolean; // Fix: Add missing animate property
  readonly lighting?: "normal" | "dramatic" | "cyberpunk";
}

// Hit effects layer props
export interface HitEffectsLayerProps extends BasePixiProps {
  effects: readonly HitEffect[];
  currentTime?: number;
}

// Progress tracker props
export interface ProgressTrackerProps {
  readonly value: number; // Fix: use value instead of current
  readonly maxValue: number; // Fix: use maxValue instead of max
  readonly barColor?: number;
  readonly backgroundColor?: number;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly showText?: boolean;
}

// Archetype display props
export interface ArchetypeDisplayProps extends BaseComponentProps {
  readonly archetype: PlayerArchetype;
  readonly name: KoreanText;
  readonly description: KoreanText;
  readonly selected?: boolean;
  readonly onSelect?: (archetype: PlayerArchetype) => void;
  readonly vitalPoints?: readonly VitalPoint[];
}

// End screen props
export interface EndScreenProps {
  readonly winner: PlayerState | null;
  readonly matchStatistics: MatchStatistics;
  readonly onRestart: () => void;
  readonly onReturnToMenu: () => void;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

// Intro screen props
export interface IntroScreenProps extends BaseComponentProps {
  readonly onMenuSelect: (mode: GameMode) => void;
  readonly onStartGame?: () => void; // Add missing prop
  readonly onTrainingMode?: () => void; // Add missing prop
  readonly onSettings?: () => void; // Add missing prop
  readonly onExit?: () => void; // Add missing prop
  readonly onShowPhilosophy?: () => void;
  readonly onShowControls?: () => void;
}

// Training screen props
export interface TrainingScreenProps {
  readonly selectedArchetype: PlayerArchetype;
  readonly onBack?: () => void;
  readonly onTrainingComplete?: (result: any) => void;
}

// Combat screen props
export interface CombatScreenProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onReturnToMenu?: () => void;
  readonly gamePhase?: GamePhase;
  readonly onGamePhaseChange?: (phase: GamePhase) => void;
  readonly matchStatistics?: MatchStatistics;
  readonly timeRemaining?: number;
  // Fix: Remove onMatchStatisticsUpdate - not needed
}

// Base button component props for Korean martial arts UI
export interface BaseButtonProps {
  readonly text?: string;
  readonly koreanText?: KoreanText;
  readonly icon?: string | React.ReactNode;
  readonly variant?: "primary" | "secondary" | "danger" | "ghost" | "accent";
  readonly size?: "small" | "medium" | "large";
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly onClick?: () => void;
  readonly onPointerDown?: () => void;
  readonly onPointerUp?: () => void;
  readonly onPointerOver?: () => void;
  readonly onPointerOut?: () => void;
  readonly testId?: string;
  readonly interactive?: boolean;
  readonly buttonMode?: boolean;
}

// PIXI component type aliases for cleaner usage
export type PixiContainerProps = ComponentProps<PIXI.Container> & BasePixiProps;
export type PixiGraphicsProps = ComponentProps<PIXI.Graphics> & BasePixiProps;
export type PixiTextProps = ComponentProps<Text> & BasePixiProps;
export type PixiSpriteProps = ComponentProps<PIXI.Sprite> & BasePixiProps;

// Export PIXI component references
export const PixiComponents = {
  Container: "Container" as const,
  Graphics: "Graphics" as const,
  Text: "Text" as const,
  Sprite: "Sprite" as const,
};

// Korean martial arts specific component props
export interface KoreanMartialTextProps extends KoreanTextProps {
  technique?: KoreanTechnique;
  stance?: TrigramStance;
  showRomanization?: boolean;
}

export interface VitalPointIndicatorProps extends BasePixiProps {
  vitalPoint: VitalPoint;
  isTargeted?: boolean;
  isHit?: boolean;
  showTooltip?: boolean;
  onSelect?: (vitalPoint: VitalPoint) => void;
}

export interface TechniqueDisplayProps extends BasePixiProps {
  technique: KoreanTechnique;
  available?: boolean;
  onExecute?: (technique: KoreanTechnique) => void;
  showDetails?: boolean;
}

export interface StanceTransitionProps extends BasePixiProps {
  fromStance: TrigramStance;
  toStance: TrigramStance;
  progress: number;
  cost: {
    ki: number;
    stamina: number;
    timeMilliseconds: number;
  };
}

export interface RoundTimerProps extends BaseComponentProps {
  readonly timeRemaining: number;
  readonly showWarning?: boolean;
  readonly warningThreshold?: number;
  // Remove anchor prop as it's not valid for this component
}

export interface ControlsSectionProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  onBack?: () => void;
}

// Korean header component props
export interface KoreanHeaderProps {
  readonly title: KoreanText;
  readonly subtitle?: KoreanText;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly fontSize?: number;
  readonly textColor?: number;
  readonly accentColor?: number;
  readonly showUnderline?: boolean;
  readonly align?: "left" | "center" | "right";
}

// Korean text component props for React DOM
export interface KoreanTextComponentProps {
  readonly text: KoreanText;
  readonly showBoth?: boolean;
  readonly koreanFirst?: boolean;
  readonly separator?: string;
  readonly size?: KoreanTextSize | number;
  readonly weight?: KoreanTextWeight;
  readonly color?: string;
  readonly emphasis?: KoreanTextEmphasis;
  readonly align?: "left" | "center" | "right";
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

// Progress tracker props
export interface LocalProgressTrackerProps {
  readonly progress: number;
  readonly label?: string;
  readonly value: number;
  readonly maxValue: number;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly barColor?: number;
  readonly backgroundColor?: number;
  readonly borderColor?: number;
  readonly borderWidth?: number;
  readonly showText?: boolean;
}

// Korean Pixi text props
export interface LocalKoreanPixiTextProps {
  readonly text: string | KoreanText;
  readonly x?: number;
  readonly y?: number;
  readonly anchor?: number;
  readonly position?: { x: number; y: number };
  readonly style?: Partial<PIXI.TextStyleOptions>;
}

// Button props extension
export interface LocalBaseButtonProps {
  readonly text: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly variant?: "primary" | "secondary" | "danger";
  readonly baseColor?: number;
  readonly hoverColor?: number;
  readonly pressedColor?: number;
  readonly textColor?: number;
  readonly anchor?: number;
}

// Trigram wheel props
export interface LocalTrigramWheelProps {
  readonly currentStance: TrigramStance;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly selectedStance?: TrigramStance;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
  readonly size?: number;
  readonly radius?: number;
  readonly interactive?: boolean;
  readonly disabledStances?: readonly TrigramStance[];
  readonly x?: number;
  readonly y?: number;
}

// Korean Pixi component props
export interface KoreanPixiProgressTrackerProps {
  readonly progress: number;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly barColor?: number;
  readonly backgroundColor?: number;
  readonly label?: string;
}

export interface KoreanPixiTrigramWheelProps {
  readonly currentStance: TrigramStance;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly size?: number;
  readonly interactive?: boolean;
}

export interface KoreanPixiHeaderProps {
  readonly title: KoreanText;
  readonly subtitle?: KoreanText;
  readonly x?: number;
  readonly y?: number;
  readonly fontSize?: number;
  readonly textColor?: number;
  readonly backgroundColor?: number;
}

export interface KoreanPixiButtonProps {
  readonly text: string | KoreanText;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
}

// Player archetype data interface{
export interface PlayerArchetypeData {
  id: PlayerArchetype;
  name: KoreanText;
  description: KoreanText;
  baseHealth: number;
  baseKi: number;
  baseStamina: number;
  coreStance: TrigramStance;
  theme: {
    primary: number;
    secondary: number;
  };
  colors: {
    primary: number;
    secondary: number;
  };
  stats: {
    attackPower: number;
    defense: number;
    speed: number;
    technique: number;
  };
  favoredStances: readonly TrigramStance[];
  specialAbilities: readonly string[];
  philosophy: KoreanText;
}

export interface MenuSectionProps {
  selectedMode: GameMode;
  onModeSelect?: (mode: GameMode) => void;
  onStartGame?: () => void;
  onShowPhilosophy?: () => void;
  onShowControls?: () => void;
  width?: number;
  height?: number;
}

export interface PhilosophySectionProps {
  onBack?: () => void;
  onGamePhaseChange?: (phase: string) => void;
  width?: number;
  height?: number;
}

export interface ControlsSectionProps {
  onBack?: () => void;
  width?: number;
  height?: number;
}

export interface ScoreDisplayProps {
  score1: number;
  score2: number;
  maxScore?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}
