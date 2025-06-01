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

// ===== Typography System Types =====

export type KoreanTypographyVariant =
  | "display"
  | "heading"
  | "body"
  | "caption"
  | "label"
  | "technique"
  | "philosophy";

export type KoreanTextAlignment = "left" | "center" | "right" | "justify";

export type KoreanTextWeight = "lighter" | "normal" | "bold" | "bolder";

export type KoreanLetterSpacing = "tight" | "normal" | "wide" | "wider";

export type KoreanLineHeight = "compact" | "normal" | "relaxed" | "loose";

// ===== Color System Types =====

export type TrigramTextColor =
  | "geon"
  | "tae"
  | "li"
  | "jin"
  | "son"
  | "gam"
  | "gan"
  | "gon";

export interface KoreanColorPalette {
  readonly primary: string;
  readonly secondary: string;
  readonly accent: string;
  readonly muted: string;
  readonly inverse: string;
}

// ===== Component Props =====

// Core Korean text component props with strict typing for exactOptionalPropertyTypes
export interface KoreanTextProps {
  readonly text: string;
  readonly englishText?: string | undefined; // Explicitly allow undefined
  readonly size?: KoreanTextSize | undefined;
  readonly color?: string | undefined;
  readonly weight?: KoreanTextWeight | undefined;
  readonly align?: KoreanTextAlignment | undefined;
  readonly variant?: KoreanTextVariant | undefined;
  readonly emphasis?: KoreanTextEmphasis | undefined;
  readonly showBoth?: boolean | undefined;
  readonly bilingual?: "horizontal" | "vertical" | "stacked" | undefined;
  readonly animate?: boolean | undefined;
  readonly gradientColors?: readonly [string, string] | undefined;
  readonly strokeColor?: string | undefined;
  readonly strokeWidth?: number | undefined;
  readonly letterSpacing?: KoreanLetterSpacing | undefined;
  readonly lineHeight?: KoreanLineHeight | undefined;
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
  readonly trigram?: TrigramStance | undefined;
  readonly honorLevel?: HonorLevel | undefined;
}

// Korean technique display component
export interface KoreanTechniqueTextProps {
  readonly techniqueName: string;
  readonly englishName?: string | undefined;
  readonly stance: TrigramStance;
  readonly showStanceSymbol?: boolean | undefined;
  readonly showDamage?: boolean | undefined;
  readonly damage?: number | undefined;
  readonly kiCost?: number | undefined;
  readonly size?: KoreanTextSize | undefined;
  readonly interactive?: boolean | undefined;
  readonly disabled?: boolean | undefined;
  readonly mastered?: boolean | undefined;
}

// Korean status display component
export interface KoreanStatusTextProps {
  readonly statusKey: StatusKey;
  readonly value?: number | string | undefined;
  readonly maxValue?: number | undefined;
  readonly showPercentage?: boolean | undefined;
  readonly criticalThreshold?: number | undefined;
  readonly warningThreshold?: number | undefined;
  readonly animated?: boolean | undefined;
}

// Korean title component
export interface KoreanTitleProps {
  readonly korean: string;
  readonly english?: string | undefined;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  readonly color?: string | undefined;
  readonly showBoth?: boolean | undefined;
  readonly className?: string | undefined;
  readonly style?: CSSProperties | undefined;
}

// ===== PixiJS Integration =====

// PixiJS-specific text style utilities - separate from React CSS
export interface PixiTextStyleOptions {
  fontFamily?: string | undefined;
  fontSize?: number | undefined;
  fontStyle?: "normal" | "italic" | "oblique" | undefined;
  fontWeight?: "normal" | "bold" | "bolder" | "lighter" | number | undefined;
  fill?: number | string | readonly (number | string)[] | undefined;
  align?: "left" | "center" | "right" | "justify" | undefined;
  stroke?: number | string | undefined;
  strokeThickness?: number | undefined;
  dropShadow?: boolean | undefined;
  dropShadowColor?: number | string | undefined;
  dropShadowBlur?: number | undefined;
  dropShadowAngle?: number | undefined;
  dropShadowDistance?: number | undefined;
  letterSpacing?: number | undefined;
  lineHeight?: number | undefined;
  wordWrap?: boolean | undefined;
  wordWrapWidth?: number | undefined;
  breakWords?: boolean | undefined;
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
  readonly fontFamily?: string | undefined;
  readonly fontSize?: string | undefined;
  readonly fontWeight?: KoreanTextWeight | undefined;
  readonly color?: string | undefined;
  readonly lineHeight?: number | undefined;
  readonly letterSpacing?: string | undefined;
  readonly textAlign?: KoreanTextAlignment | undefined;
  readonly textShadow?: string | undefined;
  readonly background?: string | undefined;
  readonly border?: string | undefined;
  readonly padding?: string | undefined;
  readonly margin?: string | undefined;
}

// ===== Advanced Typography Features =====

export interface KoreanTextAnimation {
  readonly type: "fade" | "slide" | "glow" | "typewriter" | "pulse";
  readonly duration: number;
  readonly delay?: number | undefined;
  readonly easing?: string | undefined;
  readonly repeat?: boolean | undefined;
}

export interface KoreanTextResponsive {
  readonly breakpoints: Record<string, Partial<KoreanTextProps>>;
  readonly scaleFactor?: number | undefined;
  readonly minSize?: KoreanTextSize | undefined;
  readonly maxSize?: KoreanTextSize | undefined;
}

export interface KoreanTextAccessibility {
  readonly screenReader?: string | undefined;
  readonly highContrast?: boolean | undefined;
  readonly reducedMotion?: boolean | undefined;
  readonly fontSize?: "small" | "medium" | "large" | undefined;
}
