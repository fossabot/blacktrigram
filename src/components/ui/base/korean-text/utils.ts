import * as PIXI from "pixi.js"; // Keep as non-type import for PIXI.TextStyle
import type { KoreanTextProps } from "./types"; // Assuming this is the React DOM props
import type { KoreanTextSize } from "../../../../types/korean-text";
import { KOREAN_COLORS, PIXI_FONT_WEIGHTS } from "../../../../types/constants"; // Import PIXI_FONT_WEIGHTS
import {
  KOREAN_FONT_FAMILY as KOREAN_FONT_FAMILY_CONST, // Renamed to avoid conflict
  KOREAN_TEXT_SIZES as BaseKoreanTextSizes,
} from "./constants";

const KOREAN_TEXT_SIZES = BaseKoreanTextSizes;
const KOREAN_FONT_FAMILY = KOREAN_FONT_FAMILY_CONST; // Use the renamed import

// Utility functions for Korean text processing
export const isKoreanCharacter = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return (
    (code >= 0xac00 && code <= 0xd7af) || // Hangul syllables
    (code >= 0x1100 && code <= 0x11ff) || // Hangul jamo
    (code >= 0x3130 && code <= 0x318f) || // Hangul compatibility jamo
    (code >= 0xa960 && code <= 0xa97f) || // Hangul jamo extended-A
    (code >= 0xd7b0 && code <= 0xd7ff) // Hangul jamo extended-B
  );
};

export const hasKoreanText = (text: string): boolean => {
  return text.split("").some(isKoreanCharacter);
};

export const formatKoreanNumber = (num: number): string => {
  const koreanDigits = [
    "영",
    "일",
    "이",
    "삼",
    "사",
    "오",
    "육",
    "칠",
    "팔",
    "구",
  ];
  return num
    .toString()
    .split("")
    .map((digit) => koreanDigits[parseInt(digit)] || digit)
    .join("");
};

// Helper function for Korean text validation
export function validateKoreanText(text: string): {
  isValid: boolean;
  hasKorean: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!text || text.trim().length === 0) {
    errors.push("Text cannot be empty");
  }

  const koreanRegex = /[가-힣]/;
  const hasKorean = koreanRegex.test(text);

  return {
    isValid: errors.length === 0,
    hasKorean,
    errors,
  };
}

/**
 * Create PIXI TextStyle for Korean text (PIXI v8 compatible)
 */
export const getPixiTextStyle = (
  props: Partial<PIXI.TextStyleOptions> & {
    size?: KoreanTextSize | number;
    className?: string;
  }, // Allow more PIXI options
  baseColorInput?: number | string
): PIXI.TextStyle => {
  const baseColor =
    typeof baseColorInput === "string"
      ? new PIXI.Color(baseColorInput).toNumber()
      : baseColorInput ?? new PIXI.Color(KOREAN_COLORS.WHITE_SOLID).toNumber();

  const fontSize =
    typeof props.size === "number"
      ? props.size
      : KOREAN_TEXT_SIZES[props.size as keyof typeof KOREAN_TEXT_SIZES] ||
        KOREAN_TEXT_SIZES.medium;

  const styleOptions: PIXI.TextStyleOptions = {
    fontFamily: props.fontFamily || KOREAN_FONT_FAMILY,
    fontSize,
    fill: props.fill || baseColor,
    fontWeight: props.fontWeight || PIXI_FONT_WEIGHTS.regular, // Use PIXI_FONT_WEIGHTS
    align: props.align || "left",
    wordWrap: props.wordWrap || true, // Default to true
    wordWrapWidth: props.wordWrapWidth || 600, // Default wordWrapWidth
    ...props, // Spread other PIXI options
  };

  if (props.className?.includes("cyberpunk")) {
    styleOptions.dropShadow = {
      // Corrected dropShadow for PIXI v7/v8
      alpha: 0.7,
      angle: Math.PI / 4,
      blur: 4,
      color: KOREAN_COLORS.PRIMARY_CYAN,
      distance: 2,
    };
    styleOptions.stroke = {
      color: KOREAN_COLORS.BLACK_SOLID || 0x000000,
      width: 2,
    }; // Added fallback for BLACK_SOLID
  }

  return new PIXI.TextStyle(styleOptions);
};

/**
 * Measure Korean text dimensions
 */
export function measureKoreanText(
  text: string,
  style: Partial<PIXI.TextStyle>
): { width: number; height: number } {
  // Simple fallback measurement
  const avgCharWidth = (style.fontSize as number) * 0.6;
  const lineHeight = (style.fontSize as number) * 1.2;

  return {
    width: text.length * avgCharWidth,
    height: lineHeight,
  };
}

// Korean text formatting utilities
export const KoreanTextUtils = {
  formatTechniqueName: (korean: string, english?: string): string => {
    return english ? `${korean} (${english})` : korean;
  },

  formatHonorific: (
    name: string,
    level: "student" | "master" | "grandmaster"
  ): string => {
    const honorifics = {
      student: "님",
      master: "사범님",
      grandmaster: "대사범님",
    };
    return `${name}${honorifics[level]}`;
  },

  formatKoreanTime: (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${formatKoreanNumber(minutes)}분 ${formatKoreanNumber(
      remainingSeconds
    )}초`;
  },

  isValidKoreanText: (text: string): boolean => {
    return validateKoreanText(text).isValid;
  },

  getKoreanTextLength: (text: string): number => {
    // Korean characters count as 2 units for layout purposes
    return text.split("").reduce((acc, char) => {
      return acc + (isKoreanCharacter(char) ? 2 : 1);
    }, 0);
  },
};

// Helper to convert React CSS styles to PixiJS compatible styles
export const cssToPixiTextStyle = (
  cssStyle: React.CSSProperties
): Partial<PIXI.TextStyle> => {
  const result: Partial<PIXI.TextStyle> = {};

  if (cssStyle.fontFamily && typeof cssStyle.fontFamily === "string") {
    result.fontFamily = cssStyle.fontFamily;
  }

  if (cssStyle.fontSize) {
    if (typeof cssStyle.fontSize === "string") {
      result.fontSize = parseFloat(cssStyle.fontSize.replace(/px|rem|em/g, ""));
    } else if (typeof cssStyle.fontSize === "number") {
      result.fontSize = cssStyle.fontSize;
    }
  }

  if (cssStyle.fontWeight !== undefined) {
    const fontWeight = cssStyle.fontWeight;
    if (typeof fontWeight === "string") {
      const validWeights = ["normal", "bold", "bolder", "lighter"] as const;
      if (validWeights.includes(fontWeight as any)) {
        result.fontWeight = fontWeight as
          | "normal"
          | "bold"
          | "bolder"
          | "lighter";
      }
    }
  }

  if (cssStyle.fontStyle !== undefined) {
    const fontStyle = cssStyle.fontStyle;
    const validStyles = ["normal", "italic", "oblique"] as const;
    if (
      typeof fontStyle === "string" &&
      validStyles.includes(fontStyle as any)
    ) {
      result.fontStyle = fontStyle as "normal" | "italic" | "oblique";
    }
  }

  return result;
};

export function getKoreanFontFamily(
  variant?: "primary" | "secondary" | "mono" | "symbol"
): string {
  switch (variant) {
    case "secondary":
      return KOREAN_FONT_FAMILY; // Assuming KOREAN_FONT_FAMILY is an object with primary/secondary
    case "mono":
      return "monospace"; // Example
    case "symbol":
      return "Arial, sans-serif"; // Example for symbols
    case "primary":
    default:
      return KOREAN_FONT_FAMILY;
  }
}

export function getKoreanFontSize(
  size?: KoreanTextSize | number,
  baseSize: number = KOREAN_TEXT_SIZES.medium
): number {
  if (typeof size === "number") {
    return size;
  }
  if (size && KOREAN_TEXT_SIZES[size]) {
    return KOREAN_TEXT_SIZES[size];
  }
  return baseSize;
}

export function getKoreanUiColors() {
  return {
    primary: KOREAN_COLORS.PRIMARY_CYAN,
    secondary: KOREAN_COLORS.ACCENT_SECONDARY,
    textPrimary: KOREAN_COLORS.TEXT_PRIMARY,
    textSecondary: KOREAN_COLORS.TEXT_SECONDARY,
    background: KOREAN_COLORS.UI_BACKGROUND_DARK,
    error: KOREAN_COLORS.NEGATIVE_RED,
    warning: KOREAN_COLORS.WARNING_YELLOW,
    success: KOREAN_COLORS.POSITIVE_GREEN,
    // ... add more as needed
  };
}

// Helper to convert KoreanText object to a display string
export const formatKoreanText = (
  textObj: { korean: string; english?: string; romanized?: string } | string,
  lang: "korean" | "english" | "romanized" = "korean"
): string => {
  if (typeof textObj === "string") {
    return textObj;
  }
  switch (lang) {
    case "english":
      return textObj.english || textObj.korean;
    case "romanized":
      return textObj.romanized || textObj.english || textObj.korean;
    case "korean":
    default:
      return textObj.korean;
  }
};

import type { KoreanText } from "../../../types";
import type {
  KoreanTextConfig,
  KoreanTextDisplay,
  KoreanTextOrder,
  KoreanTextVariant,
} from "./types";

export function formatKoreanDisplay(
  text: KoreanText,
  config: KoreanTextConfig
): string {
  if (typeof text === "string") {
    return text;
  }

  const { display, order, showRomanization = false } = config;

  switch (display) {
    case "korean":
      return text.korean;
    case "english":
      return text.english;
    case "both":
      const koreanFirst = order === "korean-first";
      const romanizationSuffix =
        showRomanization && text.romanized ? ` [${text.romanized}]` : "";

      return koreanFirst
        ? `${text.korean} (${text.english})${romanizationSuffix}`
        : `${text.english} (${text.korean})${romanizationSuffix}`;
    default:
      return text.korean;
  }
}

export function getTextLength(text: KoreanText): number {
  if (typeof text === "string") {
    return text.length;
  }
  return Math.max(text.korean.length, text.english.length);
}

export function truncateKoreanText(
  text: KoreanText,
  maxLength: number,
  config: KoreanTextConfig
): string {
  const formatted = formatKoreanDisplay(text, config);

  if (formatted.length <= maxLength) {
    return formatted;
  }

  return formatted.substring(0, maxLength - 3) + "...";
}

export function validateKoreanText(text: unknown): text is KoreanText {
  if (typeof text === "string") {
    return text.length > 0;
  }

  if (typeof text === "object" && text !== null) {
    const koreanText = text as KoreanText;
    return (
      typeof koreanText.korean === "string" &&
      typeof koreanText.english === "string" &&
      koreanText.korean.length > 0 &&
      koreanText.english.length > 0
    );
  }

  return false;
}

export function createDefaultKoreanText(
  korean: string,
  english: string,
  romanized?: string
): KoreanText {
  return {
    korean,
    english,
    romanized,
  };
}

export function mergeKoreanTexts(
  texts: KoreanText[],
  separator: string = " "
): KoreanText {
  const korean = texts
    .map((t) => (typeof t === "string" ? t : t.korean))
    .join(separator);
  const english = texts
    .map((t) => (typeof t === "string" ? t : t.english))
    .join(separator);

  return {
    korean,
    english,
  };
}

export function getVariantDisplayConfig(
  variant: KoreanTextVariant
): KoreanTextConfig {
  switch (variant) {
    case "title":
      return {
        display: "both",
        order: "korean-first",
        showRomanization: false,
      };
    case "technique":
      return {
        display: "both",
        order: "korean-first",
        showRomanization: true,
      };
    case "status":
      return {
        display: "korean",
        order: "korean-first",
        showRomanization: false,
      };
    case "combat":
      return {
        display: "korean",
        order: "korean-first",
        showRomanization: false,
      };
    case "ui":
      return {
        display: "both",
        order: "english-first",
        showRomanization: false,
      };
    default:
      return {
        display: "both",
        order: "korean-first",
        showRomanization: false,
      };
  }
}

export const DEFAULT_TEXT_STYLE_OPTIONS = {
  fontFamily: getKoreanFontFamily("primary"),
  fontSize: getKoreanFontSize("medium"),
  fill: KOREAN_COLORS.PRIMARY_CYAN,
  align: "left",
  wordWrap: true,
  wordWrapWidth: 400, // Default word wrap width
};

/**
 * Check if a character is Korean Hangul
 */
export function isKoreanCharacter(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 0xac00 && code <= 0xd7af) || // Hangul syllables
    (code >= 0x1100 && code <= 0x11ff) || // Hangul jamo
    (code >= 0x3130 && code <= 0x318f) || // Hangul compatibility jamo
    (code >= 0xa960 && code <= 0xa97f) || // Hangul jamo extended-A
    (code >= 0xd7b0 && code <= 0xd7ff) // Hangul jamo extended-B
  );
}

/**
 * Validate Korean text object
 */
export function validateKoreanText(text: unknown): text is KoreanText {
  return (
    typeof text === "object" &&
    text !== null &&
    typeof (text as any).korean === "string" &&
    typeof (text as any).english === "string"
  );
}

/**
 * Format Korean text for display
 */
export function formatKoreanText(
  text: KoreanText,
  display: KoreanTextDisplay = "both",
  order: KoreanTextOrder = "korean_first",
  separator: string = " / "
): string {
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

/**
 * Get text configuration for variant
 */
export function getTextConfigForVariant(
  variant: KoreanTextVariant
): KoreanTextConfig {
  switch (variant) {
    case "primary":
      return {
        variant: "primary",
        size: "large",
        weight: "bold",
        order: "korean_first", // Fix: Use correct enum value
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

/**
 * Convert size to pixels
 */
export function sizeToPixels(size: KoreanTextSize | number): number {
  if (typeof size === "number") return size;

  const sizeMap: Record<KoreanTextSize, number> = {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
    title: 48,
  };

  return sizeMap[size] || 16;
}

/**
 * Convert weight to CSS value
 */
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
