import * as PIXI from "pixi.js";
import {
  KOREAN_TEXT_SIZES,
  KOREAN_FONT_FAMILY,
  type KoreanTextProps,
  KoreanFontWeight,
} from "../../../../../types/korean-text";
import { KOREAN_COLORS } from "../../../../../types";

// Fix font weight mapping to handle string values
export function mapFontWeightToPixi(
  weight?: KoreanFontWeight
): number | undefined {
  if (!weight) return undefined;

  if (typeof weight === "number") {
    return weight;
  }

  // Map string weights to numbers
  const weightMap: Record<string, number> = {
    regular: 400,
    semibold: 600,
    bold: 700,
  };

  return weightMap[weight] || 400;
}

// Create PIXI TextStyle for Korean text (PIXI v8 compatible)
export const getPixiTextStyle = (
  props: KoreanTextProps,
  baseColor: number = KOREAN_COLORS.WHITE
): PIXI.TextStyle => {
  const fontSize =
    typeof props.size === "number"
      ? props.size
      : KOREAN_TEXT_SIZES[props.size as keyof typeof KOREAN_TEXT_SIZES] ||
        KOREAN_TEXT_SIZES.medium;

  const style = new PIXI.TextStyle({
    fontFamily: KOREAN_FONT_FAMILY,
    fontSize,
    fill: baseColor,
    fontWeight: mapFontWeightToPixi(props.weight) as any, // Fix: cast to any for PIXI compatibility
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
};
