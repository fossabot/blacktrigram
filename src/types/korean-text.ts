// Korean typography and text system types for Black Trigram

import type { TrigramStance, StatusKey } from "./enums"; // For trigram prop
import type { ColorValue } from "./common";

// Basic KoreanText definition
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
}

export type KoreanFontWeight =
  | "LIGHT"
  | "REGULAR"
  | "MEDIUM"
  | "BOLD"
  | "HEAVY";
export type KoreanTextSize = "small" | "medium" | "large" | "xlarge" | "title";

// Korean text variants for different contexts
export type KoreanTextVariant =
  | "body"
  | "primary"
  | "secondary"
  | "accent"
  | "warning"
  | "danger"
  | "success"
  | "label"
  | "caption"
  | "error"
  | "info";

// Korean text emphasis levels
export type KoreanTextEmphasis =
  | "none"
  | "underline"
  | "bold"
  | "italic"
  | "glow"
  | "shadow"
  | "outline"
  | "highlight";

// Martial arts specific text variants
export type MartialVariant =
  | "technique"
  | "philosophy"
  | "instruction"
  | "combat"
  | "practitioner"; // Added from KoreanMartialText.tsx error

// Honor level for traditional Korean martial arts context
export type HonorLevel = "student" | "practitioner" | "instructor" | "master";

// Base style for Korean text components (React)
export interface KoreanTextStyle {
  // More specific style properties based on actual usage
  readonly fontFamily?: string;
  readonly fontSize?: KoreanTextSize;
  readonly fontWeight?: KoreanFontWeight;
  readonly fontStyle?: "normal" | "italic" | "oblique";
  readonly color?: string | ColorValue; // Allow hex string or number
  readonly textAlign?: "left" | "center" | "right" | "justify";
  readonly lineHeight?: string | number;
  readonly letterSpacing?: string | number;
  readonly textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  readonly textDecoration?: string; // e.g., "underline", "line-through"
  readonly textShadow?: string; // e.g., "2px 2px 4px #000000"
  readonly emphasis?: KoreanTextEmphasis;
  readonly variant?: KoreanTextVariant;
  readonly [key: string]: any; // Keep for extensibility if absolutely necessary
}

// Korean text component props interface (for React components)
export interface KoreanTextProps {
  readonly korean?: string | KoreanText; // Allow string or the KoreanText object
  readonly english?: string;
  readonly children?: React.ReactNode; // For React components
  readonly size?: KoreanTextSize;
  readonly weight?: KoreanFontWeight;
  readonly color?: string | ColorValue;
  readonly style?: KoreanTextStyle | React.CSSProperties; // Allow both for flexibility
  readonly className?: string;
  readonly variant?: KoreanTextVariant;
  readonly emphasis?: KoreanTextEmphasis;
  readonly trigram?: TrigramStance; // For trigram-specific styling
  readonly statusKey?: StatusKey; // For status-specific styling
  readonly as?: keyof JSX.IntrinsicElements | React.ComponentType<any>; // For semantic HTML or custom component
  readonly [key: string]: any; // Keep for other props like onClick, etc.
}

// Define KoreanTextHeaderProps for text-based headers (h1-h6)
export interface KoreanTextHeaderProps extends KoreanTextProps {
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
}

// Korean title props - updated to extend KoreanTextHeaderProps
export interface KoreanTitleProps extends KoreanTextHeaderProps {}

// Define and export KoreanMartialTextProps
export interface KoreanMartialTextProps extends KoreanTextProps {
  readonly martialVariant?: MartialVariant;
}

// Define and export KoreanTechniqueTextProps
export interface KoreanTechniqueTextProps extends KoreanTextProps {
  readonly trigram?: TrigramStance;
  // Add specific props for technique text if any, e.g., showRomanized, showStanceIcon
}

// Define and export KoreanStatusTextProps
export interface KoreanStatusTextProps extends KoreanTextProps {
  readonly statusKey: StatusKey;
}

// Korean text animation configuration
export interface KoreanTextAnimation {
  readonly type: "fade" | "slide" | "typewriter";
  readonly duration?: number;
  readonly delay?: number;
  readonly direction?: "up" | "down" | "left" | "right";
}

// Korean text with animation support
export interface AnimatedKoreanTextProps extends KoreanTextProps {
  readonly animation?: KoreanTextAnimation;
}

// Korean typography theme for cyberpunk martial arts
export interface KoreanTypographyTheme {
  readonly baseFontFamily: string;
  readonly titleFontFamily: string;
  readonly sizes: Record<KoreanTextSize, number>;
  readonly weights: Record<KoreanFontWeight, number>;
  readonly colors: {
    readonly primary: string;
    readonly secondary: string;
    readonly accent: string;
    readonly error: string;
  };
}

// Korean text measurement and layout
export interface KoreanTextMetrics {
  readonly width: number;
  readonly height: number;
  readonly lines: number;
}

// Korean text rendering options
export interface KoreanTextRenderOptions {
  readonly antiAlias?: boolean;
  readonly resolution?: number;
}

// Korean text content with context
export interface KoreanContentText extends KoreanText {
  readonly context?: string; // e.g., "UI Button", "Combat Log"
}

// Korean text localization support
export interface KoreanTextLocalization {
  readonly language: "ko" | "en" | "bilingual";
  readonly translations: Record<string, KoreanText>; // Key-value store for translatable strings
}

// Korean text accessibility features
export interface KoreanTextAccessibility {
  readonly ariaLabel?: string;
  readonly role?: string;
}

export interface KoreanTextValidation {
  isValid: boolean;
  message?: string;
}

export interface KoreanTextProcessor {
  format(text: KoreanText): string;
}

export type KoreanMartialTextPresets = {
  readonly [key in MartialVariant]: KoreanTextStyle;
};

// For PixiJS specific text styling, separate from React component styles
export interface PixiTextStyleConfig {
  fontFamily?: string | string[];
  fontSize?: number;
  fontWeight?: string; // PIXI uses string weights like 'bold', 'normal'
  fontStyle?: "normal" | "italic" | "oblique";
  fill?: ColorValue | string | number[] | CanvasGradient | CanvasPattern; // PIXI's fill type
  stroke?: ColorValue | string; // PIXI's stroke type
  strokeThickness?: number;
  wordWrap?: boolean;
  wordWrapWidth?: number;
  lineHeight?: number;
  letterSpacing?: number;
  align?: "left" | "center" | "right" | "justify";
  dropShadow?: boolean;
  dropShadowColor?: ColorValue | string;
  dropShadowBlur?: number;
  dropShadowAngle?: number;
  dropShadowDistance?: number;
  dropShadowAlpha?: number;
  padding?: number;
  textBaseline?:
    | "top"
    | "hanging"
    | "middle"
    | "alphabetic"
    | "ideographic"
    | "bottom";
  whiteSpace?: "normal" | "pre" | "pre-line"; // Added based on PIXI.TextStyle
  leading?: number; // Added based on PIXI.TextStyle
  fillGradientType?: number; // PIXI.TEXT_GRADIENT, 0 = linear V, 1 = linear H
  fillGradientStops?: number[]; // Array of stop positions (0-1)
  // Add any other PIXI.TextStyle properties you might use
}

export interface KoreanPixiTextConfig extends PixiTextStyleConfig {
  korean: string;
  english?: string;
  romanized?: string;
  trigram?: TrigramStance;
  statusKey?: StatusKey;
  emphasis?: KoreanTextEmphasis;
  variant?: KoreanTextVariant;
  // any other custom props for PIXI text styling logic
}
