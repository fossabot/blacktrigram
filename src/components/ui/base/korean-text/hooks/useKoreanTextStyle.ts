import { useMemo } from "react";
import { KOREAN_TEXT_CONSTANTS } from "../constants";
import {
  KoreanTextSize,
  KoreanTextWeight,
} from "../../../../../types/korean-text";
import * as PIXI from "pixi.js";

export interface UseKoreanTextStyleOptions {
  readonly size?: KoreanTextSize;
  readonly weight?: KoreanTextWeight;
  readonly color?: number;
  readonly alignment?: "left" | "center" | "right";
}

export const useKoreanTextStyle = (
  options: UseKoreanTextStyleOptions = {}
): PIXI.TextStyle => {
  return useMemo(() => {
    const {
      size = KoreanTextSize.MEDIUM,
      weight = KoreanTextWeight.NORMAL,
      color = KOREAN_TEXT_CONSTANTS.COLORS.PRIMARY,
      alignment = "left",
    } = options;

    // Fix: Proper size lookup with enum to string conversion
    const sizeKey =
      size.toUpperCase() as keyof typeof KOREAN_TEXT_CONSTANTS.FONT_SIZES;
    const fontSize = KOREAN_TEXT_CONSTANTS.FONT_SIZES[sizeKey] || 16;

    // Fix: Proper weight conversion for PIXI
    const fontWeight =
      weight === KoreanTextWeight.NORMAL
        ? "400"
        : weight === KoreanTextWeight.BOLD
        ? "700"
        : "400";

    return new PIXI.TextStyle({
      fontFamily: KOREAN_TEXT_CONSTANTS.FONT_FAMILIES.PRIMARY,
      fontSize,
      fontWeight: fontWeight as PIXI.TextStyleFontWeight,
      fill: color as PIXI.ColorSource,
      align: alignment,
      lineHeight: KOREAN_TEXT_CONSTANTS.LAYOUT.LINE_HEIGHT_RATIO,
      letterSpacing: KOREAN_TEXT_CONSTANTS.LAYOUT.LETTER_SPACING,
    });
  }, [options.size, options.weight, options.color, options.alignment]);
};

export default useKoreanTextStyle;
