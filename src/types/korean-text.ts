// Korean text system types for Black Trigram

import type { TrigramStance } from "./enums";

// Base Korean text interface
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
}

// Korean text size type
export type KoreanTextSize =
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";

// Korean font weight type
export type KoreanFontWeight = 300 | 400 | 500 | 700 | 900;

// Korean text variant
export type KoreanTextVariant =
  | "body"
  | "title"
  | "technique"
  | "status"
  | "martial";

// Korean text emphasis
export type KoreanTextEmphasis =
  | "none"
  | "bold"
  | "italic"
  | "underline"
  | "glow"
  | "shadow"
  | "outline";

// Status key type for Korean status translations
export type StatusKey =
  | "health"
  | "ki"
  | "stamina"
  | "consciousness"
  | "pain"
  | "balance"
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
  | "ready"
  | "active"
  | "inactive"
  | "success"
  | "failure"
  | "warning"
  | "info";

// Martial variant type
export type MartialVariant = "practitioner" | "master" | "grandmaster";

// Honor level type
export type HonorLevel = "student" | "instructor" | "master";

// Font weight type alias
export type FontWeight = KoreanFontWeight;

// Color value type (re-export from common)
export type ColorValue = number;

// Base Korean text props
export interface KoreanTextProps {
  readonly korean: string | KoreanText;
  readonly english?: string;
  readonly size?: KoreanTextSize | number;
  readonly weight?: KoreanFontWeight;
  readonly color?: number;
  readonly variant?: KoreanTextVariant;
  readonly emphasis?: KoreanTextEmphasis;
  readonly align?: "left" | "center" | "right";
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

// Korean title props
export interface KoreanTextHeaderProps extends KoreanTextProps {
  readonly korean: string;
  readonly english?: string;
  readonly subtitle?: string;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
}

// Korean title props alias
export type KoreanTitleProps = KoreanTextHeaderProps;

// Korean technique text props
export interface KoreanTechniqueTextProps extends KoreanTextProps {
  readonly korean: string | KoreanText;
  readonly english?: string;
  readonly koreanName?: string;
  readonly englishName?: string;
  readonly trigram?: TrigramStance;
  readonly showStanceSymbol?: boolean;
  readonly damage?: number | string;
  readonly mastered?: boolean;
}

// Korean status text props
export interface KoreanStatusTextProps extends KoreanTextProps {
  readonly korean: string | KoreanText;
  readonly statusKey: StatusKey;
  readonly value: number;
  readonly maxValue: number;
  readonly showPercentage?: boolean;
  readonly criticalThreshold?: number;
  readonly warningThreshold?: number;
}

// Korean martial text props
export interface KoreanMartialTextProps extends KoreanTextProps {
  readonly korean: string | KoreanText;
  readonly english?: string;
  readonly martialVariant: MartialVariant;
  readonly honorLevel?: HonorLevel;
  readonly showHonorific?: boolean;
  readonly rank?: HonorLevel;
}

// PIXI text style configuration
export interface PixiTextStyleConfig {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  fontStyle?: string;
  fill?: number | string;
  align?: string;
  letterSpacing?: number;
  lineHeight?: number;
  dropShadow?:
    | boolean
    | {
        alpha: number;
        angle: number;
        blur: number;
        color: number;
        distance: number;
      };
  stroke?: {
    color: number;
    width: number;
  };
  wordWrap?: boolean;
  wordWrapWidth?: number;
}

export type KoreanTextStyle = PixiTextStyleConfig;
