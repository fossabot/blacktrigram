import type {
  KoreanTextVariant,
  KoreanTextSize,
  KoreanTextWeight,
  KoreanTextConfig,
  KoreanTextDisplay,
  KoreanTextOrder,
} from "./types";
import type { KoreanText } from "../../../../types/korean-text";

// Single consolidated implementation - remove all duplicates
export function isKoreanCharacter(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 0xac00 && code <= 0xd7af) ||
    (code >= 0x1100 && code <= 0x11ff) ||
    (code >= 0x3130 && code <= 0x318f) ||
    (code >= 0xa960 && code <= 0xa97f) ||
    (code >= 0xd7b0 && code <= 0xd7ff)
  );
}

export function validateKoreanText(text: unknown): text is KoreanText {
  return (
    typeof text === "object" &&
    text !== null &&
    "korean" in text &&
    "english" in text &&
    typeof (text as KoreanText).korean === "string" &&
    typeof (text as KoreanText).english === "string"
  );
}

export function formatKoreanText(
  text: KoreanText | string,
  config?: {
    display?: KoreanTextDisplay;
    order?: KoreanTextOrder;
    separator?: string;
  }
): string {
  if (typeof text === "string") return text;

  const display = config?.display || "both";
  const order = config?.order || "korean_first";
  const separator = config?.separator || " / ";

  switch (display) {
    case "korean":
      return text.korean;
    case "english":
      return text.english;
    case "both":
      return order === "korean_first"
        ? `${text.korean}${separator}${text.english}`
        : `${text.english}${separator}${text.korean}`;
    default:
      return text.korean;
  }
}

export function sizeToPixels(size: KoreanTextSize | number): number {
  if (typeof size === "number") return size;

  const sizeMap: Record<KoreanTextSize, number> = {
    xsmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
    title: 48,
  };

  return sizeMap[size] || 16;
}

export function weightToCSSValue(weight: KoreanTextWeight): number {
  const weightMap: Record<KoreanTextWeight, number> = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 900,
  };

  return weightMap[weight] || 400;
}

export function getTextConfigForVariant(
  variant: KoreanTextVariant
): KoreanTextConfig {
  switch (variant) {
    case "primary":
      return {
        variant: "primary",
        size: "large",
        weight: "bold",
        order: "korean_first",
        cyberpunk: false,
      };
    case "secondary":
      return {
        variant: "secondary",
        size: "medium",
        weight: "regular",
        order: "korean_first",
        cyberpunk: false,
      };
    case "accent":
      return {
        variant: "accent",
        size: "xlarge",
        weight: "bold",
        order: "korean_first",
        cyberpunk: true,
      };
    case "combat":
      return {
        variant: "combat",
        size: "large",
        weight: "bold",
        order: "korean_first",
        cyberpunk: true,
      };
    default:
      return {
        variant: "primary",
        size: "medium",
        weight: "regular",
        order: "korean_first",
        cyberpunk: false,
      };
  }
}

export function hasKoreanText(text: string): boolean {
  const koreanRegex = /[\u3131-\u3163\uac00-\ud7a3]/;
  return koreanRegex.test(text);
}
