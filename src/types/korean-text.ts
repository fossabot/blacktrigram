// Korean typography and text system types for Black Trigram

import type { TrigramStance } from "./enums";

// Korean text object for bilingual support
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
}

// Korean font weight type (numeric values for consistency)
export type KoreanFontWeight = 300 | 400 | 500 | 700 | 900;

// Korean text size type
export type KoreanTextSize =
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";

// Korean text variant for different use cases
export type KoreanTextVariant =
  | "default"
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "technique"
  | "philosophy"
  | "instruction"
  | "martial";

// Korean text emphasis effects
export type KoreanTextEmphasis =
  | "none"
  | "bold"
  | "italic"
  | "underline"
  | "shadow"
  | "glow"
  | "outline";

// Honor levels in Korean martial arts
export type HonorLevel = "student" | "master" | "grandmaster";

// Martial arts text variants
export type MartialVariant =
  | "technique"
  | "philosophy"
  | "instruction"
  | "practitioner"
  | "master"
  | "honor"
  | "discipline";

// Status keys for Korean status display
export type StatusKey =
  // Player vital stats
  | "health"
  | "ki"
  | "stamina"
  | "consciousness"
  | "pain"
  | "balance"
  // Combat conditions
  | "health_critical"
  | "stamina_low"
  | "ki_depleted"
  | "stunned"
  | "bleeding"
  | "poisoned"
  | "burning"
  | "frozen"
  | "slowed"
  | "hastened"
  | "guard_break"
  | "counter_hit"
  | "vulnerable"
  // General status indicators
  | "ready"
  | "active"
  | "inactive"
  | "success"
  | "failure"
  | "warning"
  | "info";

// Color value type (hex number or CSS string)
export type ColorValue = number | string;

// Font family options
export type FontFamily = "primary" | "secondary" | "monospace";

// Main Korean text component props
export interface KoreanTextProps {
  readonly korean: string | KoreanText;
  readonly english?: string;
  readonly size?: KoreanTextSize | number;
  readonly variant?: KoreanTextVariant;
  readonly weight?: KoreanFontWeight;
  readonly color?: ColorValue;
  readonly align?: "left" | "center" | "right";
  readonly emphasis?: KoreanTextEmphasis;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly separator?: string;
}

// Korean title component props
export interface KoreanTitleProps extends KoreanTextProps {
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly subtitle?: string;
}

// Korean martial arts text props
export interface KoreanMartialTextProps extends KoreanTextProps {
  readonly martialVariant?: MartialVariant;
  readonly honorLevel?: HonorLevel;
}

// Korean technique text props
export interface KoreanTechniqueTextProps extends KoreanTextProps {
  readonly koreanName?: string;
  readonly englishName?: string;
  readonly trigram?: TrigramStance;
  readonly showStanceSymbol?: boolean;
  readonly damage?: number;
  readonly mastered?: boolean;
}

// Korean status text props
export interface KoreanStatusTextProps extends KoreanTextProps {
  readonly statusKey: StatusKey;
  readonly value: number;
  readonly maxValue?: number;
  readonly showPercentage?: boolean;
  readonly criticalThreshold?: number;
  readonly warningThreshold?: number;
}

// Korean text header props (for KoreanHeader component)
export interface KoreanTextHeaderProps {
  readonly korean: string | KoreanText;
  readonly subtitle?: string;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

// PIXI-specific Korean text configuration
export interface KoreanPixiTextConfig {
  readonly fontFamily?: string;
  readonly fontSize?: number;
  readonly fill?: ColorValue;
  readonly fontWeight?: string | number;
  readonly fontStyle?: "normal" | "italic" | "oblique";
  readonly align?: "left" | "center" | "right";
  readonly wordWrap?: boolean;
  readonly wordWrapWidth?: number;
  readonly lineHeight?: number;
  readonly letterSpacing?: number;
  readonly dropShadow?: boolean;
  readonly dropShadowColor?: number;
  readonly dropShadowBlur?: number;
  readonly dropShadowAngle?: number;
  readonly dropShadowDistance?: number;
  readonly dropShadowAlpha?: number;
  readonly stroke?: number;
  readonly strokeThickness?: number;
}

// Korean text style configuration
export interface KoreanTextStyle {
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: KoreanFontWeight;
  readonly color: ColorValue;
  readonly variant: KoreanTextVariant;
  readonly emphasis: KoreanTextEmphasis;
}
