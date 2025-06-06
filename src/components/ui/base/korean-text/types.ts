// Local Korean text types for component-specific usage
import type {
  KoreanText as BaseKoreanText,
  KoreanTextProps as BaseKoreanTextProps,
  KoreanTextHeaderProps as BaseKoreanTextHeaderProps,
  KoreanTechniqueTextProps as BaseKoreanTechniqueTextProps,
  KoreanStatusTextProps as BaseKoreanStatusTextProps,
  KoreanMartialTextProps as BaseKoreanMartialTextProps,
} from "../../../../types/korean-text";

// Re-export types from main types system with proper aliasing
export type KoreanText = BaseKoreanText;
export type KoreanTextProps = BaseKoreanTextProps;
export type KoreanTextHeaderProps = BaseKoreanTextHeaderProps;
export type KoreanTechniqueTextProps = BaseKoreanTechniqueTextProps;
export type KoreanStatusTextProps = BaseKoreanStatusTextProps;
export type KoreanMartialTextProps = BaseKoreanMartialTextProps;

// Local aliases for convenience
export type KoreanTitleProps = BaseKoreanTextHeaderProps;

// Component-specific extensions (if needed)
export interface LocalKoreanTextProps extends BaseKoreanTextProps {
  readonly testId?: string;
}

// Korean text size type
export type KoreanTextSize =
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge" // Added
  | "title"; // Added title to match KOREAN_TEXT_SIZES in constants/typography.ts and constants.ts
export const KOREAN_TEXT_SIZES: Record<KoreanTextSize, number> = {
  small: 12,
  medium: 16,
  large: 20, // Changed from 24
  xlarge: 24, // Changed from 32
  xxlarge: 32, // Added
  title: 48, // Added title size
};

// Korean font weight type
export type KoreanFontWeight =
  | 300
  | 400
  | 500
  | 600
  | 700
  | 900
  | "light" // Added string variants for easier use
  | "regular"
  | "semibold"
  | "bold"
  | "heavy"; // Added heavy

// PIXI text style configuration
export interface PixiTextStyleConfig {
  // Ensure this is exported
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: KoreanFontWeight;
  fill?: string | string[];
  stroke?: string;
  strokeThickness?: number;
  letterSpacing?: number;
  lineHeight?: number;
  wordWrap?: boolean;
  wordWrapWidth?: number;
}

// Export the font sizes with proper name
export const KOREAN_FONT_SIZES = KOREAN_TEXT_SIZES; // Ensure this is exported

// Text formatting constants
export const KOREAN_TEXT_WEIGHTS: Record<
  Extract<KoreanFontWeight, string>,
  number
> &
  Record<Extract<KoreanFontWeight, number>, number> = {
  // Ensure this is exported and correctly typed
  light: 300,
  regular: 400,
  semibold: 600, // Added semibold mapping
  bold: 700,
  heavy: 900, // Added heavy mapping
  300: 300,
  400: 400,
  500: 500, // Added 500 mapping
  600: 600,
  700: 700,
  900: 900,
};

export const KOREAN_TEXT_STYLES = {
  // Define your text styles here using the above sizes and weights
};
