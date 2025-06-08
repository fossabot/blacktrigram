// Korean text system types for Black Trigram

import type { TrigramStance } from "./enums";
import type {
  TextStyle as PixiTextStyle,
  Point as PixiPoint,
  TextStyleOptions as PixiTextStyleOptions,
} from "pixi.js";

// Base Korean text interface
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
  readonly romanized?: string;
}

export interface BaseKoreanText {
  korean: string;
  english?: string;
  romanized?: string;
}

export type ColorValue = number | string; // Hex number or CSS color string

export interface KoreanTextConfig {
  readonly primary: string;
  readonly fallback: string;
  readonly size: number;
  readonly weight: number;
  readonly color: number;
}

export interface KoreanPixiTextProps {
  text: string | BaseKoreanText; // Use BaseKoreanText
  style?: Partial<PixiTextStyleOptions>; // Use imported PixiTextStyleOptions
  anchor?: [number, number] | number | PixiPoint; // Use imported PixiPoint
  position?: [number, number] | PixiPoint; // Use imported PixiPoint
  [key: string]: any;
}

// Korean text display utilities
export interface KoreanTextStyleInternal extends Partial<PixiTextStyleOptions> {
  // Use imported PixiTextStyleOptions
  // This interface seems to be for internal PIXI text styling.
  // Properties here should align with PIXI.TextStyle options.
}

// Korean martial arts specific text types
export interface KoreanMartialText extends BaseKoreanText {
  // Use BaseKoreanText
  readonly technique?: string;
  readonly stance?: string;
  readonly philosophy?: string;
}

export interface KoreanArchetypeText extends BaseKoreanText {
  // Use BaseKoreanText
  readonly description: BaseKoreanText; // Use BaseKoreanText
  readonly philosophy: BaseKoreanText; // Use BaseKoreanText
  readonly specialization?: string;
}

// Korean text size type
export type KoreanTextSize =
  | "xsmall" // Added xsmall based on KOREAN_TEXT_SIZES definition
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge"
  | "title";
export const KOREAN_TEXT_SIZES: Record<KoreanTextSize, number> = {
  xsmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
  title: 48,
};

// Korean font weight type
export type KoreanFontWeight =
  | 300
  | 400
  | 500
  | 600
  | 700
  | 900
  | "light" // Added string versions
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "heavy";

// Korean text variant
export type KoreanTextVariant =
  | "body"
  | "title"
  | "subtitle" // Added subtitle
  | "caption" // Added caption
  | "button" // Added button
  | "technique"
  | "status"
  | "martial"
  | "debug" // Added debug
  | "default"; // Added default

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
  | "info"
  | "default"; // Added default

// Martial variant type
export type MartialVariant =
  | "practitioner"
  | "master"
  | "grandmaster"
  | "default"; // Added default
export type HonorLevel = "student" | "instructor" | "master" | "grandmaster"; // Added grandmaster

// Font weight type alias
export type FontWeight = KoreanFontWeight;

// Color value type (re-export from common)
export type ColorValue = number;

// Base Korean text props
export interface KoreanTextProps {
  readonly korean: string | BaseKoreanText; // Use BaseKoreanText
  readonly english?: string;
  readonly size?: KoreanTextSize | number;
  readonly weight?: KoreanFontWeight;
  readonly color?: number | string;
  readonly variant?: KoreanTextVariant;
  readonly emphasis?: KoreanTextEmphasis;
  readonly align?: "left" | "center" | "right";
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly children?: React.ReactNode; // Added children
  // Allow any other standard HTML attributes for span
  [key: string]: any;
}

// Korean title props
export interface KoreanTextHeaderProps extends Omit<KoreanTextProps, "korean"> {
  readonly korean: string; // Keep as string if it's just the header text
  readonly english?: string;
  readonly subtitle?: string | BaseKoreanText; // Allow BaseKoreanText for subtitle
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
}

// Korean title props alias
export type KoreanTitleProps = KoreanTextHeaderProps; // KoreanTitleProps can be an alias or extend KoreanTextHeaderProps

// Korean technique text props
export interface KoreanTechniqueTextProps extends KoreanTextProps {
  readonly korean: string | BaseKoreanText; // Use BaseKoreanText
  readonly english?: string;
  readonly koreanName?: string;
  readonly englishName?: string;
  readonly trigram?: TrigramStance; // Use full import if TrigramStance is not in scope
  readonly showStanceSymbol?: boolean;
  readonly damage?: number | string;
  readonly mastered?: boolean;
}

// Korean status text props
export interface KoreanStatusTextProps extends KoreanTextProps {
  readonly korean: string | BaseKoreanText; // Use BaseKoreanText
  readonly statusKey: StatusKey;
  readonly value: number;
  readonly maxValue: number;
  readonly showPercentage?: boolean;
  readonly criticalThreshold?: number;
  readonly warningThreshold?: number;
}

// Korean martial text props
export interface KoreanMartialTextProps extends KoreanTextProps {
  readonly korean: string | BaseKoreanText; // Use BaseKoreanText
  readonly english?: string;
  readonly martialVariant: MartialVariant;
  readonly honorLevel?: HonorLevel;
  readonly showHonorific?: boolean;
  readonly rank?: HonorLevel; // rank can be used if different from honorLevel
}

// PIXI text style configuration
export interface PixiTextStyleConfig extends Partial<PixiTextStyleOptions> {
  // This seems to be the main PIXI text style config.
  // Allow any PIXI.TextStyleOptions properties
  size?: KoreanTextSize | number; // Custom prop for easier size handling
  weight?: KoreanFontWeight; // Custom prop for easier weight handling
  variant?: KoreanTextVariant; // Custom prop for style variants
  emphasis?: KoreanTextEmphasis; // Custom prop for emphasis effects
  statusKey?: StatusKey; // For status text styling
  martialVariant?: MartialVariant; // For martial text styling
  trigram?: import("./enums").TrigramStance; // For trigram-specific styling
  mastered?: boolean; // For technique styling
}
export type KoreanPixiTextConfig = PixiTextStyleConfig; // Alias

// Fix font family to be a string, not object
export const KOREAN_FONT_FAMILY = "Noto Sans KR, Arial, sans-serif"; // Standardized

// Export the font sizes with proper name
export const KOREAN_FONT_SIZES = KOREAN_TEXT_SIZES;

// Text formatting constants
export const KOREAN_TEXT_ALIGNMENT = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
} as const;

export const KOREAN_TEXT_WEIGHTS: Record<
  Extract<KoreanFontWeight, string | number>, // Allow both string and number keys
  number
> = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 900,
  300: 300,
  400: 400,
  500: 500,
  600: 600,
  700: 700,
  900: 900,
};

export const KOREAN_TEXT_STYLES = {
  NORMAL: "normal",
  ITALIC: "italic",
} as const;
