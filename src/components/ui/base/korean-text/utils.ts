import * as PIXI from "pixi.js";
import type { KoreanTextProps } from "./types";
import { KOREAN_FONT_FAMILIES, KOREAN_TEXT_SIZES } from "./constants";
import { KOREAN_COLORS } from "../../../../types/constants";

// Utility functions for Korean text processing
export const isKoreanCharacter = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return (
    (code >= 0xac00 && code <= 0xd7af) || // Hangul syllables
    (code >= 0x1100 && code <= 0x11ff) || // Hangul jamo
    (code >= 0x3130 && code <= 0x318f)
  ); // Hangul compatibility jamo
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
export function getPixiTextStyle(
  props: KoreanTextProps,
  baseColor: number = KOREAN_COLORS.WHITE
): PIXI.TextStyle {
  const fontSize =
    typeof props.size === "number"
      ? props.size
      : KOREAN_TEXT_SIZES[props.size as keyof typeof KOREAN_TEXT_SIZES] ||
        KOREAN_TEXT_SIZES.MEDIUM;

  const style = new PIXI.TextStyle({
    fontFamily: KOREAN_FONT_FAMILIES.PRIMARY,
    fontSize,
    fill: baseColor,
    fontWeight: "400",
    align: props.align || "left",
    wordWrap: true,
    wordWrapWidth: 600,
  });

  // Add cyberpunk styling with PIXI v8 dropShadow object format
  if (props.className?.includes("cyberpunk")) {
    style.dropShadow = {
      alpha: 0.7,
      angle: Math.PI / 4,
      blur: 4,
      color: KOREAN_COLORS.CYAN,
      distance: 2,
    };
    style.stroke = { color: KOREAN_COLORS.BLACK, width: 2 };
  }

  return style;
}

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
