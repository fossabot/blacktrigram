// Korean typography and text system types for Black Trigram

import type { TrigramStance, StatusKey } from "./enums";
import type { ColorValue } from "./common";

// Core Korean text interface
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
}

// Font weight type using string literals
export type KoreanFontWeight = "300" | "400" | "500" | "700" | "900";

// Text size type using string literals
export type KoreanTextSize =
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";

// Text variant type
export type KoreanTextVariant =
  | "body"
  | "title"
  | "subtitle"
  | "caption"
  | "martial"
  | "technique"
  | "status";

// Text emphasis type
export type KoreanTextEmphasis =
  | "none"
  | "bold"
  | "italic"
  | "underline"
  | "shadow"
  | "glow";

// Font weight numeric type
export type FontWeight = 300 | 400 | 500 | 700 | 900;

// Martial variant type
export type MartialVariant =
  | "technique"
  | "philosophy"
  | "instruction"
  | "practitioner"
  | "master"
  | "honor"
  | "discipline";

// Honor level type
export type HonorLevel =
  | "student"
  | "intermediate"
  | "advanced"
  | "master"
  | "grandmaster";

// Base Korean text props
export interface KoreanTextProps {
  readonly korean: string | KoreanText;
  readonly english?: string;
  readonly size?: KoreanTextSize | number;
  readonly variant?: KoreanTextVariant;
  readonly weight?: KoreanFontWeight;
  readonly emphasis?: KoreanTextEmphasis;
  readonly color?: string | number;
  readonly align?: "left" | "center" | "right";
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly showBoth?: boolean;
  readonly separator?: string;
}

// Korean text header props
export interface KoreanTextHeaderProps extends KoreanTextProps {
  readonly title?: string | KoreanText;
  readonly subtitle?: string | KoreanText;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
}

// Korean title props
export interface KoreanTitleProps extends KoreanTextProps {
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
}

// Korean martial text props
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

// Export ColorValue and StatusKey for use in other files
export type { ColorValue, StatusKey };
