import { ComponentType, ReactNode } from "react";
import type {
  KoreanTextProps as GlobalKoreanTextProps,
  KoreanTitleProps as GlobalKoreanTitleProps,
  KoreanMartialTextProps as GlobalKoreanMartialTextProps,
  KoreanTechniqueTextProps as GlobalKoreanTechniqueTextProps,
  KoreanStatusTextProps as GlobalKoreanStatusTextProps,
  KoreanTextHeaderProps as GlobalKoreanTextHeaderProps,
  KoreanText as GlobalKoreanText,
  KoreanTextSize as GlobalKoreanTextSize,
  MartialVariant as GlobalMartialVariant,
  KoreanTextVariant as GlobalKoreanTextVariant,
  KoreanTextEmphasis as GlobalKoreanTextEmphasis,
  HonorLevel as GlobalHonorLevel,
  KoreanFontWeight,
} from "../../../../types/korean-text";

// Re-export global types
export type KoreanTextProps = GlobalKoreanTextProps;
export type KoreanTitleProps = GlobalKoreanTitleProps;
export type KoreanMartialTextProps = GlobalKoreanMartialTextProps;
export type KoreanTechniqueTextProps = GlobalKoreanTechniqueTextProps;
export type KoreanStatusTextProps = GlobalKoreanStatusTextProps;
export type KoreanTextHeaderProps = GlobalKoreanTextHeaderProps;
export type KoreanText = GlobalKoreanText;
export type KoreanTextSize = GlobalKoreanTextSize;
export type MartialVariant = GlobalMartialVariant;
export type KoreanTextVariant = GlobalKoreanTextVariant;
export type KoreanTextEmphasis = GlobalKoreanTextEmphasis;
export type HonorLevel = GlobalHonorLevel;

// Font types - use existing from global types
export type { KoreanFontWeight };

// Font family type
export type FontFamily = "primary" | "secondary" | "monospace";

// Trigram stance type (import from trigram types instead of korean-text)
export type { TrigramStance } from "../../../../types/trigram";

// Korean text size type
export type KoreanTextSize =
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "title"
  | number;

// Korean text variant type
export type KoreanTextVariant =
  | "default"
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "technique"
  | "philosophy"
  | "instruction";

// Korean font weight type
export type KoreanFontWeight =
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | "heavy"
  | "300"
  | "400"
  | "500"
  | "700"
  | "900";

// Korean text emphasis
export type KoreanTextEmphasis = "none" | "glow" | "shadow" | "outline";

// Honor levels for martial arts context
export type HonorLevel = "student" | "practitioner" | "master" | "grandmaster";

// Martial arts text variants
export type MartialVariant =
  | "technique"
  | "philosophy"
  | "instruction"
  | "practitioner"
  | "master"
  | "honor"
  | "discipline";

// Base Korean text interface
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
}

// Base props for Korean text components
export interface KoreanTextProps {
  readonly korean: string;
  readonly english?: string;
  readonly size?: KoreanTextSize;
  readonly variant?: KoreanTextVariant;
  readonly weight?: KoreanFontWeight;
  readonly color?: number | string;
  readonly align?: "left" | "center" | "right";
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly emphasis?: KoreanTextEmphasis;
}

// Korean title component props
export interface KoreanTitleProps extends KoreanTextProps {
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly as?: ComponentType<any> | keyof JSX.IntrinsicElements;
  readonly children?: ReactNode;
}

// Korean martial text props
export interface KoreanMartialTextProps extends KoreanTextProps {
  readonly martialVariant?: MartialVariant;
  readonly honorLevel?: HonorLevel;
}

// Korean technique text props
export interface KoreanTechniqueTextProps extends KoreanTextProps {
  readonly trigram?: string;
  readonly damage?: number;
  readonly type?: "strike" | "grapple" | "throw" | "counter";
}

// Korean status text props
export interface KoreanStatusTextProps extends KoreanTextProps {
  readonly status?: "normal" | "warning" | "critical" | "positive";
  readonly value?: number;
  readonly maxValue?: number;
}

// Korean text header props
export interface KoreanTextHeaderProps extends KoreanTextProps {
  readonly subtitle?: string;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
}
