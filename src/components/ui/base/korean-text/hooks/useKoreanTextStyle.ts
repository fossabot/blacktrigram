import { useMemo } from "react";
import * as PIXI from "pixi.js";
import { KOREAN_COLORS, FONT_FAMILY } from "../../../../../types/constants";
import type {
  KoreanTextSize,
  KoreanTextWeight,
} from "../../../../../types/korean-text";

export interface UseKoreanTextStyleOptions {
  size?: KoreanTextSize;
  weight?: KoreanTextWeight;
  color?: number;
  align?: "left" | "center" | "right";
}

export const useKoreanTextStyle = (options: UseKoreanTextStyleOptions = {}) => {
  return useMemo(() => {
    const {
      size = "medium",
      weight = "normal",
      color = KOREAN_COLORS.TEXT_PRIMARY,
      align = "left",
    } = options;

    const fontSize = {
      tiny: 10,
      small: 12,
      medium: 16,
      large: 20,
      xlarge: 24,
      huge: 32,
    }[size];

    const fontWeight = {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      heavy: "900",
    }[weight];

    return new PIXI.TextStyle({
      fontFamily: FONT_FAMILY.PRIMARY,
      fontSize,
      fontWeight: fontWeight as PIXI.TextStyleFontWeight,
      fill: color,
      align: align as PIXI.TextStyleAlign,
    });
  }, [options]);
};
