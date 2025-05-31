import type { CSSProperties } from "react";
import type { TrigramStance } from "../../../../types";
import type {
  KoreanTextSize,
  MartialVariant,
  StatusKey,
  TrigramKey,
} from "./constants";

// Core Korean text component props with strict typing for exactOptionalPropertyTypes
export interface KoreanTextProps {
  readonly text: string;
  readonly englishText?: string | undefined; // Explicitly allow undefined
  readonly size?: KoreanTextSize | undefined;
  readonly color?: string | undefined;
  readonly weight?: "lighter" | "normal" | "bold" | "bolder" | undefined;
  readonly align?: "left" | "center" | "right" | "justify" | undefined;
  readonly variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "warning"
    | "danger"
    | "success"
    | undefined;
  readonly emphasis?:
    | "none"
    | "glow"
    | "shadow"
    | "underline"
    | "highlight"
    | undefined;
  readonly showBoth?: boolean | undefined;
  readonly bilingual?: "horizontal" | "vertical" | "stacked" | undefined;
  readonly animate?: boolean | undefined;
  readonly gradientColors?: readonly [string, string] | undefined;
  readonly strokeColor?: string | undefined;
  readonly strokeWidth?: number | undefined;
  readonly letterSpacing?: "tight" | "normal" | "wide" | "wider" | undefined;
  readonly lineHeight?: "compact" | "normal" | "relaxed" | "loose" | undefined;
  readonly truncate?: boolean | undefined;
  readonly maxLines?: number | undefined;
  readonly tooltip?: string | undefined;
  readonly ariaLabel?: string | undefined;
  readonly className?: string | undefined;
  readonly style?: CSSProperties | undefined;
  readonly onClick?: (() => void) | undefined;
  readonly onHover?: ((isHovering: boolean) => void) | undefined;
}

// Korean martial arts specific text variants
export interface KoreanMartialTextProps
  extends Omit<KoreanTextProps, "variant"> {
  readonly martialVariant: MartialVariant;
  readonly trigram?: TrigramStance;
  readonly honorLevel?: "student" | "practitioner" | "master" | "grandmaster";
}

// Korean technique display component
export interface KoreanTechniqueTextProps {
  readonly techniqueName: string;
  readonly englishName?: string;
  readonly stance: TrigramStance;
  readonly showStanceSymbol?: boolean;
  readonly showDamage?: boolean;
  readonly damage?: number;
  readonly kiCost?: number;
  readonly size?: KoreanTextSize;
  readonly interactive?: boolean;
  readonly disabled?: boolean;
  readonly mastered?: boolean;
}

// Korean status display component
export interface KoreanStatusTextProps {
  readonly statusKey: StatusKey;
  readonly value?: number | string;
  readonly maxValue?: number;
  readonly showPercentage?: boolean;
  readonly criticalThreshold?: number;
  readonly warningThreshold?: number;
  readonly animated?: boolean;
}

// Korean title component
export interface KoreanTitleProps {
  readonly korean: string;
  readonly english?: string;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly color?: string;
  readonly showBoth?: boolean;
  readonly className?: string;
  readonly style?: CSSProperties;
}

// PixiJS-specific text style utilities - separate from React CSS
export interface PixiTextStyleOptions {
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: "normal" | "italic" | "oblique";
  fontWeight?: "normal" | "bold" | "bolder" | "lighter" | number;
  fill?: number | string | readonly (number | string)[];
  align?: "left" | "center" | "right" | "justify";
  stroke?: number | string;
  strokeThickness?: number;
  dropShadow?: boolean;
  dropShadowColor?: number | string;
  dropShadowBlur?: number;
  dropShadowAngle?: number;
  dropShadowDistance?: number;
  letterSpacing?: number;
  lineHeight?: number;
  wordWrap?: boolean;
  wordWrapWidth?: number;
  breakWords?: boolean;
}

export type KoreanTextVariant = KoreanTextProps["variant"];
export type KoreanTextEmphasis = KoreanTextProps["emphasis"];
export type HonorLevel = KoreanMartialTextProps["honorLevel"];

// Re-export types from constants for external use
export type { KoreanTextSize, MartialVariant, StatusKey, TrigramKey };
