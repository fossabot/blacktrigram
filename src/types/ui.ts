// Types for UI components and styling configurations

import type {
  TrigramStance,
  PlayerArchetype,
  ComponentSize,
  KoreanFontWeight,
  KoreanFontStyle,
} from "./enums"; // Import from enums
import type { Position, ColorValue } from "./common";
import type { ReactNode } from "react";
import type { KoreanText } from "./korean-text"; // Import KoreanText from korean-text.ts
import type { PlayerState } from "./player"; // Added import for PlayerState

export interface TrigramWheelProps {
  readonly selectedStance: TrigramStance;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly x?: number;
  readonly y?: number;
  readonly radius?: number;
  readonly playerKi?: number;
  readonly playerMaxKi?: number;
  readonly playerArchetype?: PlayerArchetype;
  readonly showLabels?: boolean;
  readonly showEffectiveness?: boolean;
  readonly isInteractive?: boolean;
}

export interface ProgressTrackerProps {
  readonly label: string | KoreanText; // Allow KoreanText for bilingual labels
  readonly current: number;
  readonly maximum: number;
  readonly currentStance?: TrigramStance;
  readonly color?: number | string; // Allow string for CSS colors if rendered to DOM
  readonly backgroundColor?: number | string; // Added
  readonly borderColor?: number | string; // Added
  readonly borderWidth?: number; // Added
  readonly showPercentage?: boolean;
  readonly animated?: boolean;
  readonly criticalThreshold?: number; // Value at which it's considered critical
  readonly critical?: boolean; // Explicitly set if critical, overrides threshold sometimes
  readonly criticalColor?: number | string; // Added
  readonly width?: number; // Added
  readonly height?: number; // Added
  readonly x?: number; // Added
  readonly y?: number; // Added
  readonly interactive?: boolean; // Added
  readonly onClick?: (event: any) => void; // Added, use specific event type if known
  readonly style?: Partial<PixiTextStyleConfig>; // Added for PIXI text style options
}

export interface PixiTextStyleConfig {
  readonly fontFamily?: string;
  readonly fontSize?: number;
  readonly fill?: number | string | readonly (number | string)[]; // PIXI.TextStyleFill
  readonly align?: "left" | "center" | "right" | "justify"; // PIXI.TextStyleAlign
  readonly fontWeight?: "normal" | "bold" | "bolder" | "lighter" | string; // PIXI.TextStyleFontWeight, string for numeric values
  readonly fontStyle?: "normal" | "italic" | "oblique"; // PIXI.TextStyleFontStyle
  readonly stroke?: number | string; // PIXI.TextStyleStroke
  readonly strokeThickness?: number;
  readonly dropShadow?: boolean;
  readonly dropShadowColor?: number | string;
  readonly dropShadowBlur?: number;
  readonly dropShadowAngle?: number;
  readonly dropShadowDistance?: number;
  readonly letterSpacing?: number;
  readonly lineHeight?: number;
  readonly wordWrap?: boolean;
  readonly wordWrapWidth?: number;
  readonly breakWords?: boolean;
  // Add any other PIXI.TextStyle properties you use
}

export interface KoreanPixiTextConfig {
  readonly korean: string;
  readonly english?: string; // Optional English translation or subtitle
  readonly style: PixiTextStyleConfig; // Use the detailed Pixi text style config
  readonly anchor?: { x: number; y: number };
  readonly position?: Position;
  readonly interactive?: boolean;
  readonly visible?: boolean;
}

// UI component types for Korean martial arts interface

// Base UI component interface
export interface UIComponent {
  readonly id: string;
  readonly visible: boolean;
  readonly interactive: boolean;
  readonly position: Position;
  readonly zIndex: number;
}

// Korean UI text styling
export interface KoreanUIStyle {
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: KoreanFontWeight;
  readonly fontStyle: KoreanFontStyle;
  readonly color: ColorValue;
  readonly backgroundColor?: ColorValue;
  readonly borderColor?: ColorValue;
  readonly textShadow?: {
    readonly color: ColorValue;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly blur: number;
  };
}

// Button component interface
export interface ButtonConfig {
  readonly text: KoreanText;
  readonly size: ComponentSize;
  readonly variant: "primary" | "secondary" | "danger" | "success";
  readonly disabled: boolean;
  readonly loading: boolean;
  readonly icon?: string;
  readonly onClick: () => void;
  readonly onHover?: () => void;
}

// Input field interface
export interface InputConfig {
  readonly label: KoreanText;
  readonly placeholder: KoreanText;
  readonly type: "text" | "number" | "password" | "email";
  readonly value: string;
  readonly disabled: boolean;
  readonly required: boolean;
  readonly validation?: {
    readonly pattern: RegExp;
    readonly message: KoreanText;
  };
  readonly onChange: (value: string) => void;
}

// Modal dialog interface
export interface ModalConfig {
  readonly title: KoreanText;
  readonly content: ReactNode;
  readonly size: "small" | "medium" | "large" | "fullscreen";
  readonly closeable: boolean;
  readonly backdrop: boolean;
  readonly onClose: () => void;
  readonly actions?: readonly ButtonConfig[];
}

// Navigation menu interface
export interface NavigationItem {
  readonly id: string;
  readonly label: KoreanText;
  readonly icon?: string;
  readonly path: string;
  readonly disabled?: boolean;
  readonly children?: readonly NavigationItem[];
}

// Progress bar interface
export interface ProgressBarConfig {
  readonly value: number; // Current value
  readonly max?: number; // Maximum value, defaults to 100
  readonly label?: string | KoreanText;
  readonly color?: string | number; // Theme color or specific hex
  readonly size?: ComponentSize;
  readonly showPercentage?: boolean;
  readonly animated?: boolean;
  readonly criticalThreshold?: number;
}

// Korean text display configuration
export interface KoreanTextDisplay {
  readonly content: KoreanText;
  readonly stylePreset: KoreanFontStyle; // e.g., 'traditional', 'cyberpunk'
  readonly size: ComponentSize;
  readonly alignment?: "left" | "center" | "right";
}

// Toast notification interface
export interface ToastConfig {
  readonly id?: string;
  readonly title?: KoreanText;
  readonly message: KoreanText;
  readonly type: "info" | "success" | "warning" | "error";
  readonly duration?: number; // in ms, 0 for persistent
  readonly icon?: string;
  readonly onClose?: (id: string) => void;
}

// Dropdown/Select interface
export interface SelectOption {
  readonly value: string | number;
  readonly label: KoreanText;
  readonly disabled?: boolean;
  readonly icon?: string;
}

export interface SelectConfig {
  readonly label?: KoreanText;
  readonly options: readonly SelectOption[];
  readonly selectedValue?: string | number;
  readonly placeholder?: KoreanText;
  readonly disabled?: boolean;
  readonly onChange: (selectedValue: string | number) => void;
  readonly size?: ComponentSize;
}

// Tabs interface
export interface TabItem {
  readonly id: string;
  readonly label: KoreanText;
  readonly content: ReactNode;
  readonly disabled?: boolean;
  readonly icon?: string;
}

export interface TabsConfig {
  readonly items: readonly TabItem[];
  readonly activeTabId?: string;
  readonly onTabChange: (tabId: string) => void;
  readonly orientation?: "horizontal" | "vertical";
}

// Korean martial arts specific UI components
export interface TrigramIndicator {
  readonly stance: TrigramStance;
  readonly size?: ComponentSize;
  readonly showName?: boolean;
  readonly colorized?: boolean;
}

export interface ArchetypeSelector {
  readonly archetypes: readonly PlayerArchetype[];
  readonly selectedArchetype?: PlayerArchetype;
  readonly onArchetypeSelect: (archetype: PlayerArchetype) => void;
  readonly disabled?: boolean;
}

// Health/Status display
export interface StatusIndicator {
  readonly label: KoreanText;
  readonly value: number;
  readonly maxValue: number;
  readonly type: "health" | "ki" | "stamina" | "consciousness" | "custom";
  readonly color?: string | number;
  readonly criticalThreshold?: number;
  readonly size?: ComponentSize;
}

// Combat HUD interface
export interface CombatHUD {
  readonly player1Status: PlayerState;
  readonly player2Status: PlayerState;
  readonly roundTimer: number;
  readonly currentRound: number;
  readonly combatLog: readonly string[]; // Or a more structured log entry type
  readonly trigramWheelPlayer1: TrigramWheelProps; // Example of embedding other props
  readonly trigramWheelPlayer2: TrigramWheelProps;
}

// Settings panel interface
export interface SettingsConfig {
  // Example: Audio settings, graphics settings, control settings
  readonly audioVolume: { master: number; music: number; sfx: number };
  readonly graphicsQuality: "low" | "medium" | "high";
  readonly onSettingsChange: (newSettings: Partial<SettingsConfig>) => void;
}

// Loading screen interface
export interface LoadingConfig {
  readonly progress: number; // 0-100
  readonly message?: KoreanText;
  readonly showSpinner?: boolean;
  readonly background?: string; // Image or color
}

// Error display interface
export interface ErrorConfig {
  readonly title?: KoreanText;
  readonly message: KoreanText;
  readonly code?: string | number;
  readonly onRetry?: () => void;
  readonly onDetails?: () => void;
}

// Tutorial step interface
export interface TutorialStep {
  readonly id: string;
  readonly title: KoreanText;
  readonly content: KoreanText | ReactNode;
  readonly targetElement?: string; // CSS selector for highlighting
  readonly placement?: "top" | "bottom" | "left" | "right" | "center";
  readonly nextButtonText?: KoreanText;
  readonly prevButtonText?: KoreanText;
}

export interface TutorialConfig {
  readonly steps: readonly TutorialStep[];
  readonly currentStepId: string;
  readonly onNext: (currentStepId: string) => void;
  readonly onPrev: (currentStepId: string) => void;
  readonly onComplete: () => void;
  readonly onSkip?: () => void;
}
