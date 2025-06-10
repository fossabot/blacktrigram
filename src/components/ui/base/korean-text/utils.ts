import type {
  KoreanTextVariant,
  KoreanTextSize,
  KoreanTextWeight,
  KoreanTextConfig,
} from "./types";
import type { KoreanText } from "../../../../types/korean-text"; // Fix: Correct path
import { KOREAN_TEXT_CONSTANTS } from "./constants";

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

export const getTextDirection = (_text: string): "ltr" | "rtl" => {
  // Fix: Add underscore to unused parameter
  // Korean text is left-to-right
  return "ltr";
};

export const measureKoreanText = (
  text: string,
  fontSize: number
): { width: number; height: number } => {
  // Approximate Korean text measurements
  const koreanCharWidth = fontSize * 0.9; // Korean characters are typically wider
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

export const createKoreanPixiText = (
  text: KoreanText,
  options?: {
    showBoth?: boolean;
    showEnglish?: boolean;
    romanized?: boolean;
  }
): string => {
  const {
    showBoth = false,
    showEnglish = false,
    romanized = false,
  } = options || {};

  if (showBoth) {
    return `${text.korean} (${text.english})`;
  }

  if (showEnglish) {
    return text.english;
  }

  if (romanized && text.romanized) {
    return text.romanized;
  }

  return text.korean;
};

export const getKoreanTextMetrics = (
  text: string,
  fontSize: number = KOREAN_TEXT_CONSTANTS.FONT_SIZES.MEDIUM
): { width: number; height: number } => {
  const avgCharWidth = fontSize * 0.6;
  const width = text.length * avgCharWidth;
  const height = fontSize * KOREAN_TEXT_CONSTANTS.LAYOUT.LINE_HEIGHT_RATIO;

  return { width, height };
};

// Fix: Remove duplicate - keep only this version
export const formatKoreanText = (
  text: KoreanText,
  variant: "short" | "full" | "bilingual" = "short"
): string => {
  switch (variant) {
    case "full":
      return `${text.korean} (${text.english})${
        text.romanized ? ` [${text.romanized}]` : ""
      }`;
    case "bilingual":
      return `${text.korean} / ${text.english}`;
    case "short":
    default:
      return text.korean;
  }
};

// Additional utility functions for Korean text processing
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
  const estimatedWidth = getKoreanTextMetrics(text.korean, fontSize).width;

  if (estimatedWidth <= maxWidth) {
    return text.korean;
  }

  // Try shorter English version if available
  const englishWidth = getKoreanTextMetrics(text.english, fontSize).width;
  if (englishWidth <= maxWidth) {
    return text.english;
  }

  // Truncate Korean text
  const avgCharWidth = fontSize * 0.6;
  const maxChars = Math.floor(maxWidth / avgCharWidth) - 3; // Reserve space for "..."
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

// Fix: Remove duplicate - keep only this version
export const validateKoreanText = (text: KoreanText): boolean => {
  return !!(
    text.korean &&
    text.english &&
    text.korean.trim().length > 0 &&
    text.english.trim().length > 0
  );
};

// Additional Korean text utilities
export const splitKoreanSentence = (text: string): string[] => {
  // Split on Korean sentence endings
  return text.split(/[.!?。！？]/).filter((s) => s.trim().length > 0);
};

export const calculateKoreanLineHeight = (fontSize: number): number => {
  // Korean text typically needs more line height due to character complexity
  return fontSize * KOREAN_TEXT_CONSTANTS.LAYOUT.LINE_HEIGHT_RATIO;
};

export const estimateKoreanReadingTime = (text: KoreanText): number => {
  // Average Korean reading speed: ~250-300 characters per minute
  const koreanChars = text.korean.length;
  const englishWords = text.english.split(" ").length;

  // Estimate based on Korean characters (slower) and English words (faster)
  const koreanTime = (koreanChars / 275) * 60; // seconds
  const englishTime = (englishWords / 200) * 60; // seconds

  return Math.max(koreanTime, englishTime);
};

export const normalizeKoreanSpacing = (text: string): string => {
  // Normalize Korean spacing according to standard rules
  return text
    .replace(/\s+/g, " ") // Multiple spaces to single space
    .replace(/\s*([.,!?])\s*/g, "$1 ") // Proper punctuation spacing
    .trim();
};

export const detectKoreanTextDirection = (text: string): "ltr" | "mixed" => {
  // Korean is always left-to-right, but mixed content might need special handling
  const hasKorean = /[가-힣]/.test(text);
  const hasEnglish = /[a-zA-Z]/.test(text);

  return hasKorean && hasEnglish ? "mixed" : "ltr";
};
