// Types for UI components and styling configurations

import type { TrigramStance } from "./enums";
import type { Position } from "./common";

export interface TrigramWheelProps {
  readonly selectedStance: TrigramStance;
  readonly onStanceSelect?: (stance: TrigramStance) => void; // If selection directly changes something
  readonly onStanceChange: (stance: TrigramStance) => void; // Callback when stance changes
  readonly x?: number;
  readonly y?: number;
  readonly radius?: number;
  readonly isEnabled?: boolean;
  readonly playerKi?: number; // Optional: for displaying Ki cost or availability
  readonly playerMaxKi?: number;
}

export interface ProgressTrackerProps {
  readonly label: string;
  readonly current: number;
  readonly maximum: number;
  readonly currentStance?: TrigramStance; // Optional: for stance-specific visuals
}

export interface PixiTextStyleConfig {
  readonly fontFamily?: string;
  readonly fontSize?: number;
  readonly fill?: number | string | readonly (number | string)[]; // PIXI.TextStyleFill
  readonly align?: "left" | "center" | "right" | "justify"; // PIXI.TextStyleAlign
  readonly fontWeight?: "normal" | "bold" | "bolder" | "lighter" | string; // PIXI.TextStyleFontWeight, string for numeric values
  readonly fontStyle?: "normal" | "italic" | "oblique"; // PIXI.TextStyleFontStyle
  readonly stroke?: number | string; // PIXI.TextStyleStroke
  readonly strokeThickness?: number;
  readonly dropShadow?: boolean;
  readonly dropShadowColor?: number | string;
  readonly dropShadowBlur?: number;
  readonly dropShadowAngle?: number;
  readonly dropShadowDistance?: number;
  readonly letterSpacing?: number;
  readonly lineHeight?: number;
  readonly wordWrap?: boolean;
  readonly wordWrapWidth?: number;
  readonly breakWords?: boolean;
  // Add any other PIXI.TextStyle properties you use
}

export interface KoreanPixiTextConfig {
  readonly korean: string;
  readonly english?: string; // Optional English translation or subtitle
  readonly style: PixiTextStyleConfig; // Use the detailed Pixi text style config
  readonly anchor?: { x: number; y: number };
  readonly position?: Position;
  readonly interactive?: boolean;
  readonly visible?: boolean;
}
