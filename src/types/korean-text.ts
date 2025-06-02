// Korean typography and text system types for Black Trigram

import type { ReactNode } from "react";
import type { TrigramStance } from "./enums";

// Core Korean text structure
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
}

// Korean text size options
export type KoreanTextSize =
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";

// Korean font weight options
export type KoreanFontWeight =
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | "heavy";

// Korean text variants for different contexts
export type KoreanTextVariant =
  | "body"
  | "header"
  | "title"
  | "caption"
  | "technique"
  | "status";

// Martial arts specific variants
export type MartialVariant =
  | "technique"
  | "philosophy"
  | "instruction"
  | "practitioner"
  | "master"
  | "honor"
  | "discipline";

// Text emphasis levels
export type KoreanTextEmphasis =
  | "none"
  | "subtle"
  | "moderate"
  | "strong"
  | "critical";

// Honor levels for martial arts context
export type HonorLevel = "student" | "instructor" | "master" | "grandmaster";

// Color value type for consistency
export type ColorValue = number;

// Status keys for Korean translations
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

// Base Korean text props
export interface KoreanTextProps {
  readonly korean: string | KoreanText;
  readonly english?: string;
  readonly size?: KoreanTextSize | number;
  readonly weight?: KoreanFontWeight;
  readonly color?: number;
  readonly variant?: KoreanTextVariant;
  readonly align?: "left" | "center" | "right";
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly children?: ReactNode;
  readonly emphasis?: KoreanTextEmphasis;
}

// Korean header props
export interface KoreanTextHeaderProps {
  readonly korean: string;
  readonly english?: string;
  readonly subtitle?: string;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly color?: number;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

// Korean title props (alias for header props)
export interface KoreanTitleProps extends KoreanTextHeaderProps {}

// Korean technique text props
export interface KoreanTechniqueTextProps extends KoreanTextProps {
  readonly koreanName?: string;
  readonly englishName?: string;
  readonly trigram?: TrigramStance;
  readonly showStanceSymbol?: boolean;
  readonly damage?: number;
  readonly mastered?: boolean;
}

// Korean martial text props
export interface KoreanMartialTextProps extends KoreanTextProps {
  readonly martialVariant?: MartialVariant;
  readonly showHonorific?: boolean;
  readonly rank?: HonorLevel;
}

// Korean status text props
export interface KoreanStatusTextProps extends KoreanTextProps {
  readonly statusKey: StatusKey;
  readonly value?: number;
  readonly maxValue?: number;
  readonly showPercentage?: boolean;
  readonly criticalThreshold?: number;
  readonly warningThreshold?: number;
}

// PIXI-compatible text configuration
export interface PixiTextStyleConfig {
  readonly fontFamily?: string;
  readonly fontSize?: number;
  readonly fill?: number | string;
  readonly align?: "left" | "center" | "right";
  readonly fontWeight?: string;
  readonly fontStyle?: string;
  readonly wordWrap?: boolean;
  readonly wordWrapWidth?: number;
  readonly dropShadow?:
    | boolean
    | {
        alpha?: number;
        angle?: number;
        blur?: number;
        color?: number | string;
        distance?: number;
      };
  readonly stroke?: number | string;
  readonly strokeThickness?: number;
}
