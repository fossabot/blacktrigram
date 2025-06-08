// This file should primarily re-export types from the main /src/types/korean-text.ts
// or define very local, component-specific sub-types if absolutely necessary.

import type { CSSProperties } from "react";
import type { TextStyle as PixiTextStyle } from "pixi.js";
import type { KoreanText } from "../../../../types/korean-text";
import type { TrigramStance } from "../../../../types";

// Clean types - remove conflicts
export type KoreanTextSize =
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge"
  | "title";
export type KoreanTextWeight =
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "heavy";
export type KoreanTextEmphasis = "none" | "bold" | "italic" | "underline";
export type KoreanTextVariant = "primary" | "secondary" | "accent" | "combat";
export type KoreanTextDisplay = "korean" | "english" | "both";
export type KoreanTextOrder = "korean_first" | "english_first";

// Size mapping
export const KOREAN_TEXT_SIZES: Record<KoreanTextSize, number> = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32, // Add missing size
  title: 48, // Add missing size
};

// Korean text configuration interface
export interface KoreanTextConfig {
  readonly variant: KoreanTextVariant;
  readonly size: KoreanTextSize;
  readonly weight: KoreanTextWeight;
  readonly order: KoreanTextOrder;
  readonly cyberpunk: boolean;
}

// Component props interfaces - Fix prop names to match actual usage
export interface KoreanTextComponentProps {
  readonly korean?: string;
  readonly english?: string;
  readonly size?: KoreanTextSize | number;
  readonly weight?: KoreanTextWeight;
  readonly variant?: KoreanTextVariant;
  readonly emphasis?: KoreanTextEmphasis;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly display?: KoreanTextDisplay;
  readonly order?: KoreanTextOrder;
  readonly cyberpunk?: boolean;
  readonly showUnderline?: boolean;
  readonly color?: string | number;
  readonly onClick?: () => void;
  readonly id?: string;
  readonly children?: React.ReactNode;
}

// Pixi-specific interfaces
export interface KoreanPixiTextProps {
  readonly text: string | KoreanText;
  readonly x?: number;
  readonly y?: number;
  readonly anchor?: number;
  readonly position?: { x: number; y: number };
  readonly style?: PixiTextStyle;
}

// Add missing interface definitions
export interface KoreanPixiProgressTrackerProps {
  readonly progress: number;
  readonly maxProgress?: number;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly color?: number;
  readonly backgroundColor?: number;
  readonly showText?: boolean;
}

export interface KoreanPixiTrigramWheelProps {
  readonly currentStance: TrigramStance;
  readonly onStanceChange?: (stance: TrigramStance) => void; // Fix: Use TrigramStance
  readonly size?: number;
  readonly x?: number;
  readonly y?: number;
  readonly interactive?: boolean;
  readonly showLabels?: boolean; // Add missing property
}

export interface KoreanPixiHeaderProps {
  readonly title: KoreanText | string;
  readonly subtitle?: KoreanText | string;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly fontSize?: number;
  readonly textColor?: number;
  readonly accentColor?: number;
  readonly showUnderline?: boolean;
  readonly align?: "left" | "center" | "right";
}

export interface KoreanPixiButtonProps {
  readonly text: KoreanText | string;
  readonly onClick?: () => void;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly variant?: "primary" | "secondary" | "danger";
  readonly disabled?: boolean;
}

// Font family constant
export const KOREAN_FONT_FAMILY = "'Noto Sans KR', 'Malgun Gothic', sans-serif";

// Add missing utility interfaces
export interface KoreanTextStyleOptions {
  fontSize?: number;
  fill?: number;
  fontWeight?: string;
  align?: "left" | "center" | "right";
  stroke?: number;
  cyberpunk?: boolean;
}

// Legacy compatibility
export type KoreanTextProps = KoreanTextComponentProps;

// Fix missing KoreanTechniqueTextProps export
export interface KoreanTechniqueTextProps {
  readonly technique: {
    readonly stance: string;
    readonly koreanName: string;
    readonly englishName: string;
    readonly description?: {
      readonly korean: string;
      readonly english: string;
    };
  };
  readonly size?: KoreanTextSize | number;
  readonly weight?: KoreanTextWeight;
  readonly variant?: KoreanTextVariant;
  readonly emphasis?: KoreanTextEmphasis;
  readonly display?: KoreanTextDisplay;
  readonly order?: KoreanTextOrder;
  readonly showStance?: boolean;
  readonly showDescription?: boolean;
  readonly showEffects?: boolean;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export interface KoreanTitleProps {
  readonly korean: string;
  readonly english: string;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly variant?: KoreanTextVariant;
  readonly cyberpunk?: boolean;
  readonly glow?: boolean;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly display?: KoreanTextDisplay;
  readonly order?: KoreanTextOrder;
  readonly centerAlign?: boolean;
}
