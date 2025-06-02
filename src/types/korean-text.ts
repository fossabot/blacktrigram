// Korean typography and text system types for Black Trigram

// import { KoreanHeaderProps } from "."; // REMOVE: Circular dependency
import type { ColorValue } from "./common"; // CommonColorValue is unused
import type {
  TrigramStance as EnumTrigramStance,
  KoreanFontWeight as EnumKoreanFontWeight,
  KoreanFontStyle as EnumKoreanFontStyle,
  ComponentSize as EnumComponentSize,
  StatusKey as EnumStatusKey, // Assuming StatusKey is in enums
} from "./enums"; // Adjusted path if necessary, or from './index' if re-exported

export type TrigramStance = EnumTrigramStance; // Use imported TrigramStance
export type KoreanFontWeight = EnumKoreanFontWeight;
export type KoreanFontStyle = EnumKoreanFontStyle;
export type ComponentSize = EnumComponentSize;
export type StatusKey = EnumStatusKey; // Use imported StatusKey

// Korean text interface for bilingual display
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
}

// Korean text size options
export type KoreanTextSize = "small" | "medium" | "large" | "xlarge";

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
  | "highlight"; // Added "highlight"

// Martial arts specific text variants
export type MartialVariant =
  | "technique"
  | "philosophy"
  | "instruction"
  | "combat";

// Honor level for traditional Korean martial arts context
export type HonorLevel = "student" | "practitioner" | "instructor" | "master";

// Font weight for Korean typography
export type FontWeight = 300 | 400 | 500 | 700 | 900;

// Font family options for Korean text
export type FontFamily = "noto" | "malgun" | "nanumgothic" | "system";

// Korean text styling configuration
export interface KoreanTextStyle {
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: KoreanFontWeight;
  readonly fontStyle?: KoreanFontStyle | "italic" | "normal" | "oblique"; // Allow CSS font-style values
  readonly color: ColorValue;
  readonly lineHeight: number;
  readonly letterSpacing: number;
  readonly textShadow?: {
    readonly color: ColorValue;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly blur: number;
  };
  readonly outline?: {
    readonly color: ColorValue;
    readonly width: number;
  };
}

// Alias for KoreanTextStyle for clarity if used elsewhere with "Interface" suffix
export type KoreanTextStyleInterface = KoreanTextStyle;

// Korean text component props interface
export interface KoreanTextProps {
  readonly text?: string | KoreanText; // Primary text content (Korean or bilingual object)
  readonly korean?: string; // Explicit Korean text
  readonly english?: string; // Explicit English text
  readonly englishText?: string; // Alternative for English text, consider consolidating
  readonly variant?: KoreanTextVariant;
  readonly emphasis?: KoreanTextEmphasis;
  readonly size?: KoreanTextSize;
  readonly weight?: FontWeight; // Added
  readonly color?: string | number; // Allow hex number or CSS color string
  readonly fontFamily?: string; // Added
  readonly lineHeight?: string | number; // Added
  readonly letterSpacing?: string | number; // Added
  readonly align?: "left" | "center" | "right" | "justify";
  readonly truncate?: boolean; // Added
  readonly maxLines?: number; // Added
  readonly animate?: boolean | KoreanTextAnimation; // Added
  readonly gradientColors?: readonly string[]; // Added
  readonly strokeColor?: string; // Added
  readonly strokeWidth?: number; // Added
  readonly style?: Partial<KoreanTextStyle> | React.CSSProperties; // Allow passing custom styles
  readonly showBoth?: boolean; // Added
  readonly bilingual?: "stacked" | "inline" | "tooltip"; // Added
  readonly tooltip?: string | KoreanText; // Added
  readonly ariaLabel?: string; // Added
  readonly className?: string; // Added
  readonly onClick?: (event: React.MouseEvent<HTMLElement>) => void; // Added
  readonly onHover?: (hovering: boolean) => void; // Added
  // For KoreanStatusText specific props, consider moving to KoreanStatusTextProps
  readonly statusKey?: StatusKey; // Use StatusKey from enums
  readonly value?: number | string;
  readonly maxValue?: number;
  readonly showPercentage?: boolean;
  readonly criticalThreshold?: number;
  readonly warningThreshold?: number;
  // For KoreanTechniqueText specific props, consider moving to KoreanTechniqueTextProps
  readonly stance?: TrigramStance; // Use TrigramStance from enums
  readonly showStanceSymbol?: boolean;
  readonly showDamage?: boolean;
  readonly damage?: number | { min: number; max: number };
  readonly kiCost?: number;
  readonly staminaCost?: number;
  readonly interactive?: boolean;
  readonly disabled?: boolean;
  readonly mastered?: boolean;
  readonly children?: React.ReactNode; // Allow children for general use
}

// Define KoreanTextHeaderProps for text-based headers (h1-h6)
export interface KoreanTextHeaderProps extends KoreanTextProps {
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly as?: keyof JSX.IntrinsicElements; // e.g., 'h1', 'h2', 'div'
}

// Korean title props - updated to extend KoreanTextHeaderProps
export interface KoreanTitleProps extends KoreanTextHeaderProps {
  readonly korean: string; // Made mandatory for titles
  readonly english?: string;
  // level is inherited from KoreanTextHeaderProps
  // color, fontFamily, style are inherited from KoreanTextProps (via KoreanTextHeaderProps)
  // Other title-specific props can be added here
}

// REMOVE the second, problematic definition of KoreanTitleProps:
// export interface KoreanTitleProps extends KoreanHeaderProps {
//   // Specific properties for titles, if any
// }

// Define and export KoreanMartialTextProps
export interface KoreanMartialTextProps extends KoreanTextProps {
  readonly martialVariant: MartialVariant;
  readonly trigram?: TrigramStance; // Added optional trigram, maps to stance
  readonly honorLevel?: HonorLevel;
}

// Define and export KoreanTechniqueTextProps
export interface KoreanTechniqueTextProps extends KoreanTextProps {
  // 'korean' and 'english' from KoreanTextProps can be used for names.
  // If specific prop names like 'koreanName' are used by the component, define them here:
  readonly koreanName?: string; // Specific prop for the component, made optional if text.korean is primary
  readonly englishName?: string; // Specific prop for the component, made optional if text.english is primary
  readonly trigram?: TrigramStance; // Added optional trigram, maps to stance
  // stance, showStanceSymbol, showDamage, damage, kiCost, staminaCost, mastered
  // are already optional in KoreanTextProps. Make them mandatory if needed for this specific type.
}

// Define and export KoreanStatusTextProps
export interface KoreanStatusTextProps extends KoreanTextProps {
  readonly statusKey: StatusKey; // Make mandatory
  readonly value: number | string; // Make mandatory
  // maxValue, showPercentage, criticalThreshold, warningThreshold
  // are already optional in KoreanTextProps. Make them mandatory if needed.
}

// Korean text animation configuration
export interface KoreanTextAnimation {
  readonly type: "fade" | "slide" | "glow" | "pulse" | "typewriter";
  readonly duration: number;
  readonly delay?: number;
  readonly iterations?: number | "infinite";
  readonly direction?: "normal" | "reverse" | "alternate";
}

// Korean text with animation support
export interface AnimatedKoreanTextProps extends KoreanTextProps {
  readonly animation?: KoreanTextAnimation;
  readonly animateOnMount?: boolean;
  readonly animateOnChange?: boolean;
}

// Korean typography theme for cyberpunk martial arts
export interface KoreanTypographyTheme {
  readonly name: string;
  readonly description: KoreanText;
  readonly fonts: {
    readonly primary: string;
    readonly secondary: string;
    readonly monospace: string;
  };
  readonly sizes: {
    readonly small: number;
    readonly medium: number;
    readonly large: number;
    readonly xlarge: number;
    readonly title: number;
  };
  readonly weights: {
    readonly light: KoreanFontWeight;
    readonly regular: KoreanFontWeight;
    readonly bold: KoreanFontWeight;
    readonly heavy: KoreanFontWeight;
  };
  readonly colors: {
    readonly primary: ColorValue;
    readonly secondary: ColorValue;
    readonly accent: ColorValue;
    readonly danger: ColorValue;
    readonly success: ColorValue;
  };
  readonly effects: {
    readonly glow: boolean;
    readonly shadow: boolean;
    readonly outline: boolean;
    readonly gradient: boolean;
  };
}

// Korean text measurement and layout
export interface KoreanTextMetrics {
  readonly width: number;
  readonly height: number;
  readonly koreanWidth: number;
  readonly englishWidth: number;
  readonly lineCount: number;
  readonly characterCount: {
    readonly korean: number;
    readonly english: number;
    readonly total: number;
  };
}

// Korean text rendering options
export interface KoreanTextRenderOptions {
  readonly antiAlias: boolean;
  readonly subpixelRendering: boolean;
  readonly kerning: boolean;
  readonly ligatures: boolean;
  readonly hinting: "none" | "light" | "normal" | "strong";
  readonly resolution: number; // Device pixel ratio
}

// Korean text content with context
export interface KoreanContentText extends KoreanText {
  readonly context:
    | "menu"
    | "combat"
    | "training"
    | "philosophy"
    | "victory"
    | "defeat";
  readonly tone:
    | "formal"
    | "casual"
    | "ceremonial"
    | "instructional"
    | "motivational";
  readonly audience: "beginner" | "intermediate" | "advanced" | "master";
}

// Korean text localization support
export interface KoreanTextLocalization {
  readonly locale: "ko-KR" | "en-US" | "ko-KR-Hanja";
  readonly direction: "ltr" | "rtl";
  readonly script: "hangul" | "hanja" | "mixed";
  readonly variant: "standard" | "traditional" | "modern";
}

// Korean text accessibility features
export interface KoreanTextAccessibility {
  readonly screenReader: string; // Screen reader friendly text
  readonly pronunciation: string; // Phonetic pronunciation guide
  readonly meaning: string; // Contextual meaning explanation
  readonly difficulty: 1 | 2 | 3 | 4 | 5; // Reading difficulty level
}

// Korean text validation
export interface KoreanTextValidation {
  readonly hasKorean: boolean;
  readonly hasEnglish: boolean; // Added
  readonly hasSpecialChars: boolean; // Added
  readonly length: {
    // Added
    readonly korean: number;
    readonly english: number;
  };
  readonly isValid: boolean; // Added
  readonly errors: string[]; // Added
}

// Korean text formatting utilities
export interface KoreanTextFormatter {
  readonly format: (text: KoreanText) => string; // Added
  readonly measure: (text: string, style: KoreanTextStyle) => KoreanTextMetrics; // Added
  readonly validate: (text: KoreanText) => KoreanTextValidation; // Added
  readonly normalize: (text: string) => string; // Added
  readonly romanize: (korean: string) => string; // Added
}

// Preset Korean text styles for martial arts context
export type KoreanMartialTextPresets = {
  readonly [key in MartialVariant]: KoreanTextStyle;
};
