// Types for UI components and styling configurations

import type {
  TrigramStance,
  // ComponentSize, // ComponentSize is defined in enums.ts
  // KoreanFontWeight, // Defined in enums.ts
  // KoreanFontStyle, // Defined in enums.ts
  PlayerArchetype,
  ComponentSize, // Re-add if it was meant to be distinct from enums version
  KoreanFontWeight,
  KoreanFontStyle,
} from "./enums"; // Import from enums
import type { Position, ColorValue } from "./common";
import type { ReactNode } from "react";
import type { KoreanText } from "./korean-text"; // Import KoreanText from korean-text.ts

export interface TrigramWheelProps {
  readonly selectedStance: TrigramStance;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly x?: number;
  readonly y?: number;
  readonly radius?: number;
  readonly isEnabled?: boolean; // Consider renaming to isInteractive for consistency
  readonly playerKi?: number;
  readonly playerMaxKi?: number;
  readonly playerArchetype?: PlayerArchetype;
  readonly showLabels?: boolean;
  readonly showEffectiveness?: boolean;
  readonly isInteractive?: boolean; // Redundant with isEnabled if they mean the same
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
  readonly badge?: string;
  readonly disabled: boolean;
  readonly children?: readonly NavigationItem[];
  readonly onClick: () => void;
}

// Progress bar interface
export interface ProgressBarConfig {
  readonly label: KoreanText;
  readonly current: number;
  readonly maximum: number;
  readonly color: ColorValue;
  readonly animated: boolean;
  readonly showPercentage: boolean;
  readonly showValues: boolean;
  readonly critical?: number; // Critical threshold
}

// Korean text display configuration
export interface KoreanTextDisplay {
  readonly korean: string;
  readonly english: string;
  readonly romanized?: string;
  readonly showBoth: boolean;
  readonly primaryLanguage: "korean" | "english";
  readonly style: KoreanUIStyle;
}

// Toast notification interface
export interface ToastConfig {
  readonly id: string;
  readonly type: "info" | "success" | "warning" | "error";
  readonly title: KoreanText;
  readonly message: KoreanText;
  readonly duration: number;
  readonly closeable: boolean;
  readonly position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

// Dropdown/Select interface
export interface SelectOption {
  readonly value: string;
  readonly label: KoreanText;
  readonly disabled: boolean;
  readonly icon?: string;
}

export interface SelectConfig {
  readonly label: KoreanText;
  readonly options: readonly SelectOption[];
  readonly value: string;
  readonly multiple: boolean;
  readonly searchable: boolean;
  readonly disabled: boolean;
  readonly onChange: (value: string | readonly string[]) => void;
}

// Tabs interface
export interface TabItem {
  readonly id: string;
  readonly label: KoreanText;
  readonly content: ReactNode;
  readonly disabled: boolean;
  readonly badge?: string;
  readonly icon?: string;
}

export interface TabsConfig {
  readonly items: readonly TabItem[];
  readonly activeTab: string;
  readonly onChange: (tabId: string) => void;
  readonly variant: "default" | "pills" | "underline";
}

// Korean martial arts specific UI components
export interface TrigramIndicator {
  readonly stance: TrigramStance;
  readonly active: boolean;
  readonly effectiveness?: number; // 0-1 effectiveness against opponent
  readonly mastery?: number; // 0-1 player mastery level
  readonly showSymbol: boolean;
  readonly showName: boolean;
  readonly onClick?: () => void;
}

export interface ArchetypeSelector {
  readonly availableArchetypes: readonly PlayerArchetype[];
  readonly selectedArchetype: PlayerArchetype;
  readonly showDescriptions: boolean;
  readonly showBonuses: boolean;
  readonly onChange: (archetype: PlayerArchetype) => void;
}

// Health/Status display
export interface StatusIndicator {
  readonly type: "health" | "ki" | "stamina" | "consciousness" | "pain";
  readonly current: number;
  readonly maximum: number;
  readonly critical: boolean;
  readonly animated: boolean;
  readonly showText: boolean;
  readonly color?: ColorValue;
}

// Combat HUD interface
export interface CombatHUD {
  readonly player1Status: readonly StatusIndicator[];
  readonly player2Status: readonly StatusIndicator[];
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly maxRounds: number;
  readonly combatLog: readonly string[];
  readonly showVitalPoints: boolean;
  readonly showStanceInfo: boolean;
}

// Settings panel interface
export interface SettingsConfig {
  readonly audio: {
    readonly masterVolume: number;
    readonly sfxVolume: number;
    readonly musicVolume: number;
    readonly muted: boolean;
  };
  readonly display: {
    readonly language: "korean" | "english" | "bilingual";
    readonly difficulty: "beginner" | "intermediate" | "advanced" | "master";
    readonly visualEffects: boolean;
    readonly showTutorials: boolean;
  };
  readonly combat: {
    readonly showVitalPoints: boolean;
    readonly showDamageNumbers: boolean;
    readonly realisticMode: boolean;
    readonly assistedTargeting: boolean;
  };
  readonly onSettingChange: (
    category: string,
    setting: string,
    value: unknown
  ) => void;
}

// Loading screen interface
export interface LoadingConfig {
  readonly message: KoreanText;
  readonly progress?: number; // 0-100, undefined for indeterminate
  readonly tip?: KoreanText;
  readonly cancellable: boolean;
  readonly onCancel?: () => void;
}

// Error display interface
export interface ErrorConfig {
  readonly title: KoreanText;
  readonly message: KoreanText;
  readonly details?: string;
  readonly recoverable: boolean;
  readonly onRetry?: () => void;
  readonly onDismiss?: () => void;
}

// Tutorial step interface
export interface TutorialStep {
  readonly id: string;
  readonly title: KoreanText;
  readonly content: KoreanText;
  readonly target?: string; // CSS selector for element to highlight
  readonly position: "top" | "bottom" | "left" | "right" | "center";
  readonly skippable: boolean;
  readonly actions?: readonly ButtonConfig[];
}

export interface TutorialConfig {
  readonly steps: readonly TutorialStep[];
  readonly currentStep: number;
  readonly dismissible: boolean;
  readonly onStepChange: (stepIndex: number) => void;
  readonly onComplete: () => void;
  readonly onDismiss: () => void;
}
