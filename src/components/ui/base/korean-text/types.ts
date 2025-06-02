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
  FontWeight as GlobalFontWeight,
  FontFamily as GlobalFontFamily,
  TrigramStance as GlobalTrigramStance,
} from "../../../../types/korean-text"; // Correct path to global korean-text types

export type KoreanTextProps = GlobalKoreanTextProps;
export type KoreanTitleProps = GlobalKoreanTitleProps;
export type KoreanMartialTextProps = GlobalKoreanMartialTextProps;
export type KoreanTechniqueTextProps = GlobalKoreanTechniqueTextProps;
export type KoreanStatusTextProps = GlobalKoreanStatusTextProps;
export type KoreanTextHeaderProps = GlobalKoreanTextHeaderProps; // Use this instead of KoreanHeaderProps from global types
export type KoreanText = GlobalKoreanText;
export type KoreanTextSize = GlobalKoreanTextSize; // Export this
export type MartialVariant = GlobalMartialVariant; // Export this
export type KoreanTextVariant = GlobalKoreanTextVariant; // Export this
export type KoreanTextEmphasis = GlobalKoreanTextEmphasis; // Export this
export type HonorLevel = GlobalHonorLevel; // Export this
export type FontWeight = GlobalFontWeight;
export type FontFamily = GlobalFontFamily;
export type TrigramStance = GlobalTrigramStance; // Assuming this is used by components here

export type {
  StatusKey, // Export this
  // TrigramKey, // If this is a distinct type, define and export it. If it's same as TrigramStance, use TrigramStance.
} from "../../../../types/enums";

// Local component-specific augmentations or new types can go here if needed.
// For example, if TrigramKey is specific to this module:
// export type TrigramKey = TrigramStance; // Or its own definition
