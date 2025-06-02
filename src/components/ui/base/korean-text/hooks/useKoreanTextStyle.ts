import { useMemo } from "react";
import type { KoreanTextProps } from "../types";
import { KOREAN_FONT_FAMILIES, KOREAN_TEXT_SIZES } from "../constants";
import { KOREAN_COLORS } from "../../../../../types/constants";

export function useKoreanTextStyle(
  props: KoreanTextProps
): React.CSSProperties {
  return useMemo(() => {
    const fontSize =
      typeof props.size === "number"
        ? props.size
        : KOREAN_TEXT_SIZES[props.size as keyof typeof KOREAN_TEXT_SIZES] ||
          KOREAN_TEXT_SIZES.medium;

    const color = props.color
      ? typeof props.color === "number"
        ? `#${props.color.toString(16).padStart(6, "0")}`
        : props.color
      : `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`;

    return {
      fontFamily: KOREAN_FONT_FAMILIES.PRIMARY,
      fontSize: `${fontSize}px`,
      color,
      textAlign: props.align || "left",
      fontWeight: props.weight || 400,
      ...props.style,
    };
  }, [props]);
}
