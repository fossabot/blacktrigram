import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
  type TrigramStance,
} from "../../../../../types";
import {
  KOREAN_SIZE_CONFIG,
  MARTIAL_COLORS,
  TRIGRAM_CONFIG,
} from "../constants";
import { cssToPixiTextStyle } from "../utils";
import type {
  KoreanTextProps,
  KoreanMartialTextProps,
  PixiTextStyleOptions,
} from "../types";

// Korean text utilities for PixiJS components
export const KoreanPixiTextUtils = {
  createPixiTextStyle: (
    size: KoreanTextProps["size"] = "medium",
    color: string | number = KOREAN_COLORS.WHITE,
    options: Partial<PixiTextStyleOptions> = {}
  ): PixiTextStyleOptions => {
    const sizeConfig = KOREAN_SIZE_CONFIG[size];
    const numericColor =
      typeof color === "string" ? parseInt(color.replace("#", ""), 16) : color;

    // Extract numeric fontSize properly
    const fontSize = parseFloat(sizeConfig.fontSize.replace("rem", "")) * 16;

    return {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: fontSize,
      fill: numericColor,
      align: "center",
      letterSpacing: 0,
      lineHeight: fontSize * sizeConfig.lineHeight,
      ...options,
    };
  },

  createMartialTextStyle: (
    martialVariant: KoreanMartialTextProps["martialVariant"],
    size: KoreanTextProps["size"] = "medium"
  ): PixiTextStyleOptions => {
    const martialColor = MARTIAL_COLORS[martialVariant];
    return KoreanPixiTextUtils.createPixiTextStyle(size, martialColor, {
      fontWeight: "bold",
      dropShadow: true,
      dropShadowColor: 0x000000,
      dropShadowBlur: 4,
      dropShadowDistance: 2,
    });
  },

  createTechniqueTextStyle: (
    stance: TrigramStance,
    size: KoreanTextProps["size"] = "medium",
    mastered = false
  ): PixiTextStyleOptions => {
    const stanceColor = TRIGRAM_CONFIG[stance].color;
    return KoreanPixiTextUtils.createPixiTextStyle(size, stanceColor, {
      fontWeight: mastered ? "bold" : "normal",
      dropShadow: mastered,
      dropShadowColor: stanceColor,
      dropShadowBlur: mastered ? 6 : 0,
      dropShadowDistance: mastered ? 3 : 0,
    });
  },

  createStatusTextStyle: (
    value?: number,
    maxValue?: number,
    criticalThreshold = 25,
    warningThreshold = 50
  ): PixiTextStyleOptions => {
    // Fix: Use explicit type annotation to avoid type narrowing issues
    let fillColor: number = KOREAN_COLORS.WHITE;

    if (typeof value === "number" && maxValue) {
      const percentage = (value / maxValue) * 100;
      if (percentage <= criticalThreshold) fillColor = KOREAN_COLORS.Red;
      else if (percentage <= warningThreshold) fillColor = KOREAN_COLORS.Orange;
      else fillColor = KOREAN_COLORS.Green;
    }

    return KoreanPixiTextUtils.createPixiTextStyle("small", fillColor, {
      fontWeight: "bold",
      align: "left",
    });
  },

  // Helper to convert React CSS styles to PixiJS compatible styles
  cssToPixiTextStyle,
};
