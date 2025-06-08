import { useMemo } from "react";
import type {
  KoreanTextSize,
  KoreanTextWeight,
  KoreanTextVariant,
} from "../types";
import { weightToCSSValue, sizeToPixels } from "../utils";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
} from "../../../../../types/constants";

export interface UseKoreanTextStyleProps {
  size?: KoreanTextSize | number;
  weight?: KoreanTextWeight;
  variant?: KoreanTextVariant;
  color?: string | number;
  cyberpunk?: boolean;
}

export function useKoreanTextStyle({
  size = "medium",
  weight = "regular",
  variant = "primary",
  color,
  cyberpunk = false,
}: UseKoreanTextStyleProps) {
  return useMemo(() => {
    const fontSize = typeof size === "number" ? size : sizeToPixels(size);
    const fontWeight = weightToCSSValue(weight);

    let textColor = color;
    if (!textColor) {
      switch (variant) {
        case "primary":
          textColor = KOREAN_COLORS.TEXT_PRIMARY;
          break;
        case "secondary":
          textColor = KOREAN_COLORS.TEXT_SECONDARY;
          break;
        case "accent":
          textColor = KOREAN_COLORS.TEXT_ACCENT;
          break;
        case "combat":
          textColor = KOREAN_COLORS.NEGATIVE_RED;
          break;
        default:
          textColor = KOREAN_COLORS.TEXT_PRIMARY;
      }
    }

    const baseStyle: React.CSSProperties = {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: `${fontSize}px`,
      fontWeight,
      color:
        typeof textColor === "number"
          ? `#${textColor.toString(16).padStart(6, "0")}`
          : textColor,
      lineHeight: 1.4,
    };

    if (cyberpunk) {
      return {
        ...baseStyle,
        textShadow: `0 0 10px ${baseStyle.color}, 0 0 20px ${baseStyle.color}`,
        filter: "brightness(1.1)",
      };
    }

    return baseStyle;
  }, [size, weight, variant, color, cyberpunk]);
}
