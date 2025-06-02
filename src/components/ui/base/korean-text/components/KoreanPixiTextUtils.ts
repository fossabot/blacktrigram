import * as PIXI from "pixi.js";
import {
  KOREAN_TEXT_SIZES,
  KOREAN_FONT_FAMILY,
  type KoreanTextProps,
} from "../../../../../types/korean-text";
import { KOREAN_COLORS } from "../../../../../types";

// Helper function to map font weights to PIXI-compatible values
function mapFontWeightToPixi(weight?: number): PIXI.TextStyleFontWeight {
  if (!weight) return "normal";
  if (weight <= 300) return "100";
  if (weight <= 400) return "normal";
  if (weight <= 500) return "500";
  if (weight <= 700) return "bold";
  return "900";
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
    fontWeight: mapFontWeightToPixi(props.weight),
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
