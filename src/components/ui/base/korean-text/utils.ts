import type {
  TextStyle as PixiTextStyle,
  TextMetrics as PixiTextMetrics,
} from "pixi.js"; // Import TextMetrics
import type { KoreanTextProps, FontWeight, TrigramStance } from "./types";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
  KOREAN_FONT_SIZES,
  TRIGRAM_TEXT_CONFIG,
} from "./constants";

// Define PixiTextStyleOptions locally if not using a global one from types/ui.ts
export interface PixiTextStyleOptions extends Partial<PixiTextStyle> {
  // Add any custom options if needed, or ensure it matches PIXI.TextStyle
}

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
  characterCount: number;
  warnings: string[];
} {
  const warnings: string[] = [];

  if (text.length === 0) {
    warnings.push("Empty text provided");
  }

  if (text.length > 100) {
    warnings.push("Text is very long, consider splitting");
  }

  const koreanCharCount = text.split("").filter(isKoreanCharacter).length;
  const hasKoreanChars = koreanCharCount > 0;

  if (!hasKoreanChars && text.includes("한글")) {
    warnings.push("Text mentions Korean but contains no Korean characters");
  }

  return {
    isValid: warnings.length === 0,
    hasKorean: hasKoreanChars,
    characterCount: text.length,
    warnings,
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
): PixiTextStyleOptions => {
  const result: PixiTextStyleOptions = {};

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

  // Fix: Use proper type narrowing with known string literal types
  if (cssStyle.fontWeight !== undefined) {
    const fontWeight = cssStyle.fontWeight;
    if (typeof fontWeight === "number") {
      result.fontWeight = fontWeight;
    } else if (typeof fontWeight === "string") {
      // Only allow valid PixiJS font weight values
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
    // Only allow valid PixiJS font style values
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

export function getPixiTextStyle(
  props: KoreanTextProps
): Partial<PixiTextStyle> {
  const {
    size = "medium",
    weight = "regular",
    color,
    fontFamily = KOREAN_FONT_FAMILY,
    style: textStyleType,
    trigram,
    align, // PIXI.TextStyleAlign
    // letterSpacing, // Add if used
    // lineHeight, // Add if used
    // wordWrap, // Add if used
    // wordWrapWidth, // Add if used
  } = props;

  const styleOptions: Partial<PixiTextStyle> = {
    fontFamily: fontFamily,
    // fill: KOREAN_COLORS.WHITE, // Default fill
  };

  // Size
  if (typeof size === "number") {
    styleOptions.fontSize = size;
  } else {
    styleOptions.fontSize =
      KOREAN_FONT_SIZES[size.toUpperCase() as keyof typeof KOREAN_FONT_SIZES] ||
      KOREAN_FONT_SIZES.MEDIUM;
  }

  // Weight
  const fontWeightMap: Record<FontWeight, PixiTextStyle["fontWeight"]> = {
    light: "300",
    regular: "400",
    normal: "400",
    medium: "500",
    bold: "700",
    heavy: "900",
  };
  styleOptions.fontWeight = fontWeightMap[weight] || fontWeightMap.regular;

  // Color
  let finalColor: number = KOREAN_COLORS.WHITE; // Default PIXI color
  if (typeof color === "number") {
    finalColor = color;
  } else if (trigram && TRIGRAM_TEXT_CONFIG[trigram]) {
    finalColor = TRIGRAM_TEXT_CONFIG[trigram].color;
  }
  styleOptions.fill = finalColor;

  // Alignment
  if (align) {
    styleOptions.align = align;
  }

  // Style specific enhancements (e.g., cyberpunk glow)
  if (textStyleType === "cyberpunk") {
    styleOptions.dropShadow = true;
    styleOptions.dropShadowColor = KOREAN_COLORS.CYAN;
    styleOptions.dropShadowBlur = 4;
    styleOptions.dropShadowAlpha = 0.7;
    styleOptions.dropShadowDistance = 0;
    // For stroke, PIXI uses 'stroke' and 'strokeThickness'
    styleOptions.stroke = KOREAN_COLORS.BLACK;
    styleOptions.strokeThickness = 2;
  } else if (textStyleType === "traditional") {
    // Example: styleOptions.fontVariant = 'small-caps';
  }

  return styleOptions;
}

// ...existing code...

export function measurePixiText(
  text: string,
  style: Partial<PixiTextStyle>
): PixiTextMetrics {
  // Ensure style is a complete PIXI.TextStyle for accurate measurement
  const completeStyle = new PixiTextStyle(style);
  return PixiTextMetrics.measureText(text, completeStyle);
}
