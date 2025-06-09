// Korean text handling for authentic martial arts terminology

// Korean text with English translation
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
  readonly romanized?: string; // For pronunciation guide
  readonly pronunciation?: string; // IPA or simplified pronunciation
}

// Text styling options for Korean martial arts UI
export interface KoreanTextStyle {
  readonly size: KoreanTextSize;
  readonly weight: KoreanTextWeight;
  readonly emphasis: KoreanTextEmphasis;
  readonly color?: string | number;
  readonly showBoth?: boolean;
  readonly koreanFirst?: boolean;
  readonly separator?: string;
}

// Text size categories
export enum KoreanTextSize {
  TINY = "tiny",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XLARGE = "xlarge",
  HUGE = "huge",
}

// Text weight for emphasis
export enum KoreanTextWeight {
  LIGHT = "light",
  NORMAL = "normal",
  MEDIUM = "medium",
  SEMIBOLD = "semibold",
  BOLD = "bold",
  HEAVY = "heavy",
}

// Text emphasis types
export enum KoreanTextEmphasis {
  NONE = "none",
  TECHNIQUE = "technique",
  STANCE = "stance",
  DAMAGE = "damage",
  CRITICAL = "critical",
  STATUS = "status",
  PHILOSOPHY = "philosophy",
}

// Korean martial arts terminology categories
export interface KoreanTerminology {
  readonly techniques: Record<string, KoreanText>;
  readonly stances: Record<string, KoreanText>;
  readonly bodyParts: Record<string, KoreanText>;
  readonly vitalPoints: Record<string, KoreanText>;
  readonly philosophy: Record<string, KoreanText>;
  readonly combat: Record<string, KoreanText>;
  readonly ui: Record<string, KoreanText>;
}

// Text formatting utilities
export interface KoreanTextFormatter {
  format(text: KoreanText, style: KoreanTextStyle): string;
  formatList(texts: readonly KoreanText[], style: KoreanTextStyle): string;
  formatWithRomanization(text: KoreanText): string;
  formatForUI(text: KoreanText, showBoth?: boolean): string;
}

export default KoreanText;
