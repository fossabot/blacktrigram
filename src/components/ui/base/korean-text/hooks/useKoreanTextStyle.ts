import { useMemo } from "react";
import * as PIXI from "pixi.js"; // Fix: Import PIXI as value, not type
import type { KoreanTextVariant } from "../types";
import {
  KOREAN_TEXT_COLORS,
  KOREAN_TEXT_VARIANT_SIZES,
  KOREAN_TEXT_VARIANT_CONFIGS,
} from "../constants";
import {
  KOREAN_FONT_FAMILY,
  KOREAN_COLORS,
} from "../../../../../types/constants";

interface UseKoreanTextStyleProps {
  variant?: KoreanTextVariant;
  color?: number;
  fontSize?: number;
  cyberpunk?: boolean;
}

export function useKoreanTextStyle({
  variant = "primary",
  color,
  fontSize,
  cyberpunk = false,
}: UseKoreanTextStyleProps = {}): PIXI.TextStyle {
  return useMemo(() => {
    const baseColor = color || KOREAN_TEXT_COLORS[variant];
    const baseSize = fontSize || KOREAN_TEXT_VARIANT_SIZES[variant];

    const styleOptions: Partial<PIXI.TextStyleOptions> = {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: baseSize,
      fill: baseColor,
      align: "left",
      stroke: KOREAN_COLORS.BLACK_SOLID,
    };

    if (cyberpunk) {
      styleOptions.dropShadow = {
        color: KOREAN_COLORS.PRIMARY_CYAN,
        blur: 5,
        angle: Math.PI / 6,
        distance: 3,
      };
    }

    return new PIXI.TextStyle(styleOptions);
  }, [variant, color, fontSize, cyberpunk]);
}

export function useKoreanTextConfig(variant: KoreanTextVariant = "primary") {
  const config = useMemo(() => KOREAN_TEXT_VARIANT_CONFIGS[variant], [variant]);
  return config;
}
