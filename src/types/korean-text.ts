// Types for Korean text system and bilingual text components

import type { CSSProperties } from "react";
import type { TrigramStance } from "./enums";

// ===== Core Korean Text Types =====

export type KoreanTextSize =
  | "tiny"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";
export type MartialVariant =
  | "technique"
  | "stance"
  | "philosophy"
  | "honor"
  | "respect"
  | "combat"
  | "training"
  | "mastery"
  | "wisdom";
export type StatusKey =
  | "health"
  | "ki"
  | "stamina"
  | "victory"
  | "defeat"
  | "ready"
  | "attacking"
  | "defending"
  | "stunned"
  | "recovering";
export type TrigramKey =
  | "geon"
  | "tae"
  | "li"
  | "jin"
  | "son"
  | "gam"
  | "gan"
  | "gon";

export type KoreanTextVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "warning"
  | "danger"
  | "success";
export type KoreanTextEmphasis =
  | "none"
  | "glow"
  | "shadow"
  | "underline"
  | "highlight";
export type HonorLevel = "student" | "practitioner" | "master" | "grandmaster";

// ===== Component Props =====

// Core Korean text component props with strict typing for exactOptionalPropertyTypes
export interface KoreanTextProps {
  readonly text: string;
  readonly englishText?: string | undefined; // Explicitly allow undefined
  readonly size?: KoreanTextSize | undefined;
  readonly color?: string | undefined;
  readonly weight?: "lighter" | "normal" | "bold" | "bolder" | undefined;
  readonly align?: "left" | "center" | "right" | "justify" | undefined;
  readonly variant?: KoreanTextVariant | undefined;
  readonly emphasis?: KoreanTextEmphasis | undefined;
  readonly showBoth?: boolean | undefined;
  readonly bilingual?: "horizontal" | "vertical" | "stacked" | undefined;
  readonly animate?: boolean | undefined;
  readonly gradientColors?: readonly [string, string] | undefined;
  readonly strokeColor?: string | undefined;
  readonly strokeWidth?: number | undefined;
  readonly letterSpacing?: "tight" | "normal" | "wide" | "wider" | undefined;
  readonly lineHeight?: "compact" | "normal" | "relaxed" | "loose" | undefined;
  readonly truncate?: boolean | undefined;
  readonly maxLines?: number | undefined;
  readonly tooltip?: string | undefined;
  readonly ariaLabel?: string | undefined;
  readonly className?: string | undefined;
  readonly style?: CSSProperties | undefined;
  readonly onClick?: (() => void) | undefined;
  readonly onHover?: ((isHovering: boolean) => void) | undefined;
}

// Korean martial arts specific text variants
export interface KoreanMartialTextProps
  extends Omit<KoreanTextProps, "variant"> {
  readonly martialVariant: MartialVariant;
  readonly trigram?: TrigramStance;
  readonly honorLevel?: HonorLevel;
}

// Korean technique display component
export interface KoreanTechniqueTextProps {
  readonly techniqueName: string;
  readonly englishName?: string;
  readonly stance: TrigramStance;
  readonly showStanceSymbol?: boolean;
  readonly showDamage?: boolean;
  readonly damage?: number;
  readonly kiCost?: number;
  readonly size?: KoreanTextSize;
  readonly interactive?: boolean;
  readonly disabled?: boolean;
  readonly mastered?: boolean;
}

// Korean status display component
export interface KoreanStatusTextProps {
  readonly statusKey: StatusKey;
  readonly value?: number | string;
  readonly maxValue?: number;
  readonly showPercentage?: boolean;
  readonly criticalThreshold?: number;
  readonly warningThreshold?: number;
  readonly animated?: boolean;
}

// Korean title component
export interface KoreanTitleProps {
  readonly korean: string;
  readonly english?: string;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly color?: string;
  readonly showBoth?: boolean;
  readonly className?: string;
  readonly style?: CSSProperties;
}

// ===== PixiJS Integration =====

// PixiJS-specific text style utilities - separate from React CSS
export interface PixiTextStyleOptions {
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: "normal" | "italic" | "oblique";
  fontWeight?: "normal" | "bold" | "bolder" | "lighter" | number;
  fill?: number | string | readonly (number | string)[];
  align?: "left" | "center" | "right" | "justify";
  stroke?: number | string;
  strokeThickness?: number;
  dropShadow?: boolean;
  dropShadowColor?: number | string;
  dropShadowBlur?: number;
  dropShadowAngle?: number;
  dropShadowDistance?: number;
  letterSpacing?: number;
  lineHeight?: number;
  wordWrap?: boolean;
  wordWrapWidth?: number;
  breakWords?: boolean;
}

// ===== Configuration Types =====

export interface KoreanSizeConfig {
  readonly fontSize: string;
  readonly lineHeight: number;
}

export interface KoreanStatusTranslation {
  readonly korean: string;
  readonly hanja: string;
}

export interface TrigramConfig {
  readonly symbol: string;
  readonly color: number;
}

// ===== Style Configuration =====

export interface KoreanTextStyleConfig {
  readonly fontFamily?: string;
  readonly fontSize?: string;
  readonly fontWeight?: "lighter" | "normal" | "bold" | "bolder";
  readonly color?: string;
  readonly lineHeight?: number;
  readonly letterSpacing?: string;
  readonly textAlign?: "left" | "center" | "right" | "justify";
  readonly textShadow?: string;
  readonly background?: string;
  readonly border?: string;
  readonly padding?: string;
  readonly margin?: string;
}
