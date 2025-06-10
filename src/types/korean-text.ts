/**
 * Korean text system types for bilingual martial arts content
 */

// Core Korean text interface
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
  readonly romanized?: string;
}

// Add missing enums that are referenced throughout the codebase
export enum KoreanTextSize {
  TINY = "tiny",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XLARGE = "xlarge",
  HUGE = "huge",
}

export enum KoreanTextWeight {
  LIGHT = "light",
  NORMAL = "normal", // Fix: Use NORMAL instead of REGULAR
  MEDIUM = "medium",
  SEMIBOLD = "semibold",
  BOLD = "bold",
  HEAVY = "heavy",
}

// Korean text styles for different contexts
export interface KoreanTextStyle {
  readonly size: KoreanTextSize;
  readonly weight: KoreanTextWeight;
  readonly color: number;
  readonly alignment: "left" | "center" | "right";
}

// Korean martial arts text variants
export type KoreanMartialTextVariant =
  | "technique"
  | "stance"
  | "philosophy"
  | "archetype"
  | "status"
  | "combat";

// Status text configuration
export interface KoreanStatusTextConfig {
  readonly variant: KoreanMartialTextVariant;
  readonly honorLevel: "formal" | "casual" | "traditional";
  readonly showRomanization: boolean;
}

// Fix: Add missing KoreanTextProps export
export interface KoreanTextProps {
  readonly text: KoreanText;
  readonly size?: KoreanTextSize;
  readonly weight?: KoreanTextWeight;
  readonly alignment?: KoreanTextAlignment;
  readonly color?: number;
}

// Fix: Add missing KoreanTextAlignment export
export interface KoreanTextAlignment {
  readonly horizontal: "left" | "center" | "right";
  readonly vertical: "top" | "middle" | "bottom";
}

// Fix: Add missing TrigramStance type
export type TrigramStance =
  | "geon"
  | "tae"
  | "li"
  | "jin"
  | "son"
  | "gam"
  | "gan"
  | "gon";

export default KoreanText;
