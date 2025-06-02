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
