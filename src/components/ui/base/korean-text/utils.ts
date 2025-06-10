import * as PIXI from "pixi.js";
import {
  type KoreanTextVariant,
  type KoreanTextConfig,
  KOREAN_FONT_FAMILY,
  KOREAN_TEXT_SIZES,
  KoreanTextSize,
  KoreanTextWeight,
} from "./types";
import type { KoreanText } from "../../../../types/korean-text";
import { KOREAN_TEXT_CONSTANTS } from "./constants";
import {
  KOREAN_COLORS,
  KOREAN_FONT_WEIGHTS,
} from "../../../../types/constants";

// Fix: Define missing interface locally
interface KoreanPixiTextOptions {
  readonly preferKorean?: boolean;
  readonly size?: KoreanTextSize;
  readonly weight?: KoreanTextWeight;
  readonly color?: number;
  readonly fontFamily?: string;
}

// Fix: Define KoreanTextStyleConfig interface
interface KoreanTextStyleConfig {
  readonly size?: KoreanTextSize;
  readonly weight?: KoreanTextWeight;
  readonly color?: number;
  readonly fontFamily?: string;
  readonly fontSize?: number;
  readonly fontWeight?: number;
  readonly align?: "left" | "center" | "right";
  readonly wordWrap?: boolean;
  readonly lineHeight?: number;
}

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

export function sizeToPixels(size: KoreanTextSize | number): number {
  if (typeof size === "number") return size;
  // Convert type to string for lookup
  const sizeKey = size as keyof typeof KOREAN_TEXT_SIZES;
  return KOREAN_TEXT_SIZES[sizeKey] || 16;
}

export function weightToCSSValue(weight: KoreanTextWeight): number {
  const weightKey = weight as keyof typeof KOREAN_FONT_WEIGHTS;
  return KOREAN_FONT_WEIGHTS[weightKey] || 400;
}

// Fix: Use string literals for compatibility
export function getTextConfigForVariant(
  variant: KoreanTextVariant
): KoreanTextConfig {
  switch (variant) {
    case "primary":
      return {
        variant: "primary",
        size: "large" as any, // Fix: Use type assertion for compatibility
        weight: "bold" as any, // Fix: Use type assertion for compatibility
        order: "korean_first",
        cyberpunk: false,
      };
    case "secondary":
      return {
        variant: "secondary",
        size: "medium" as any, // Fix: Use type assertion for compatibility
        weight: "regular" as any, // Fix: Use type assertion for compatibility
        order: "korean_first",
        cyberpunk: false,
      };
    case "accent":
      return {
        variant: "accent",
        size: "xlarge" as any, // Fix: Use type assertion for compatibility
        weight: "bold" as any, // Fix: Use type assertion for compatibility
        order: "korean_first",
        cyberpunk: true,
      };
    case "combat":
      return {
        variant: "combat",
        size: "large" as any, // Fix: Use type assertion for compatibility
        weight: "bold" as any, // Fix: Use type assertion for compatibility
        order: "korean_first",
        cyberpunk: true,
      };
    default:
      return {
        variant: "primary",
        size: "medium" as any, // Fix: Use type assertion for compatibility
        weight: "regular" as any, // Fix: Use type assertion for compatibility
        order: "korean_first",
        cyberpunk: false,
      };
  }
}

export function hasKoreanText(text: string): boolean {
  const koreanRegex = /[\u3131-\u3163\uac00-\ud7a3]/;
  return koreanRegex.test(text);
}

// Fix: Remove unused import and parameters
export const getTextDirection = (_text: string): "ltr" | "rtl" => {
  return "ltr";
};

export const measureKoreanText = (
  text: string,
  fontSize: number
): { width: number; height: number } => {
  const koreanCharWidth = fontSize * 0.9;
  const englishCharWidth = fontSize * 0.6;

  let width = 0;
  for (const char of text) {
    if (/[\u3130-\u318F\uAC00-\uD7AF]/.test(char)) {
      width += koreanCharWidth;
    } else {
      width += englishCharWidth;
    }
  }

  return {
    width,
    height: fontSize * 1.2,
  };
};

// Fix: Simplified PIXI Text creation functions
export function createKoreanPixiText(
  text: KoreanText,
  options: KoreanPixiTextOptions = {}
): PIXI.Text {
  const {
    preferKorean = true,
    size = "medium" as KoreanTextSize,
    weight = "regular" as KoreanTextWeight,
    color = KOREAN_COLORS.TEXT_PRIMARY,
    fontFamily = KOREAN_FONT_FAMILY,
  } = options;

  const displayText = preferKorean ? text.korean : text.english;
  const fontSize = sizeToPixels(size);
  const fontWeight = weightToCSSValue(weight);

  const textStyle = new PIXI.TextStyle({
    fontFamily,
    fontSize,
    fontWeight: fontWeight.toString() as PIXI.TextStyleFontWeight,
    fill: color,
  });

  return new PIXI.Text(displayText, textStyle);
}

export function getKoreanTextMetrics(
  text: KoreanText,
  options: KoreanPixiTextOptions = {}
): { width: number; height: number } {
  const {
    preferKorean = true,
    size = "medium" as KoreanTextSize,
    weight = "regular" as KoreanTextWeight,
    fontFamily = KOREAN_FONT_FAMILY,
  } = options;

  const displayText = preferKorean ? text.korean : text.english;
  const fontSize = sizeToPixels(size);
  const fontWeight = weightToCSSValue(weight);

  const textStyle = new PIXI.TextStyle({
    fontFamily,
    fontSize,
    fontWeight: fontWeight.toString() as PIXI.TextStyleFontWeight,
  });

  // Use PIXI.Text for measurements instead of TextMetrics
  const tempText = new PIXI.Text(displayText, textStyle);
  return {
    width: tempText.width,
    height: tempText.height,
  };
}

// Fix: Remove unused text parameter
export function formatKoreanText(style: KoreanTextStyleConfig): PIXI.TextStyle {
  const fontSize =
    style.fontSize || sizeToPixels(style.size || ("medium" as KoreanTextSize));
  const fontWeight =
    style.fontWeight ||
    weightToCSSValue(style.weight || ("regular" as KoreanTextWeight));

  return new PIXI.TextStyle({
    fontFamily: style.fontFamily || KOREAN_FONT_FAMILY,
    fontSize,
    fontWeight: fontWeight.toString() as PIXI.TextStyleFontWeight,
    fill: style.color || KOREAN_COLORS.TEXT_PRIMARY,
    align: style.align || "left",
    wordWrap: style.wordWrap || false,
    lineHeight: style.lineHeight,
  });
}

export function sizeToPixelValue(size: KoreanTextSize): number {
  return sizeToPixels(size);
}

// Fix: String-based text formatting
export function formatKoreanTextString(
  text: KoreanText,
  showBoth: boolean = false
): string {
  if (showBoth) {
    return `${text.korean} (${text.english})`;
  }
  return text.korean;
}

// Additional utility functions
export const getTextLanguage = (
  text: string
): "korean" | "english" | "mixed" => {
  const koreanChars = text.split("").filter(isKoreanCharacter).length;
  const totalChars = text.replace(/\s/g, "").length;

  if (koreanChars === 0) return "english";
  if (koreanChars === totalChars) return "korean";
  return "mixed";
};

export const optimizeKoreanTextForDisplay = (
  text: KoreanText,
  maxWidth: number,
  fontSize: number
): string => {
  const estimatedWidth = measureKoreanText(text.korean, fontSize).width;

  if (estimatedWidth <= maxWidth) {
    return text.korean;
  }

  const englishWidth = measureKoreanText(text.english, fontSize).width;
  if (englishWidth <= maxWidth) {
    return text.english;
  }

  const avgCharWidth = fontSize * 0.6;
  const maxChars = Math.floor(maxWidth / avgCharWidth) - 3;
  return text.korean.substring(0, Math.max(1, maxChars)) + "...";
};

export const createBilingualText = (
  korean: string,
  english: string,
  romanized?: string
): KoreanText => ({
  korean,
  english,
  romanized,
});

export const validateKoreanText = (text: KoreanText): boolean => {
  return !!(
    text.korean &&
    text.english &&
    text.korean.trim().length > 0 &&
    text.english.trim().length > 0
  );
};

export const splitKoreanSentence = (text: string): string[] => {
  return text.split(/[.!?。！？]/).filter((s) => s.trim().length > 0);
};

export const calculateKoreanLineHeight = (fontSize: number): number => {
  return fontSize * KOREAN_TEXT_CONSTANTS.LAYOUT.LINE_HEIGHT_RATIO;
};

export const estimateKoreanReadingTime = (text: KoreanText): number => {
  const koreanChars = text.korean.length;
  const englishWords = text.english.split(" ").length;

  const koreanTime = (koreanChars / 275) * 60;
  const englishTime = (englishWords / 200) * 60;

  return Math.max(koreanTime, englishTime);
};

export const normalizeKoreanSpacing = (text: string): string => {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s*([.,!?])\s*/g, "$1 ")
    .trim();
};

export const detectKoreanTextDirection = (text: string): "ltr" | "mixed" => {
  const hasKorean = /[가-힣]/.test(text);
  const hasEnglish = /[a-zA-Z]/.test(text);

  return hasKorean && hasEnglish ? "mixed" : "ltr";
};

export function createPixiTextStyle(
  size: KoreanTextSize,
  weight: KoreanTextWeight,
  color: number
): PIXI.TextStyle {
  return new PIXI.TextStyle({
    fontSize: sizeToPixelValue(size),
    fontWeight: weightToCSSValue(weight).toString() as PIXI.TextStyleFontWeight,
    fill: color,
    fontFamily: '"Noto Sans KR", Arial, sans-serif',
  });
}
