import { useMemo } from "react";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../../../../types";
import { KOREAN_SIZE_CONFIG } from "../constants";
import { hasKoreanText } from "../utils";
import type { KoreanTextProps } from "../types";

export function useKoreanTextStyle({
  size = "medium",
  color,
  weight = "normal",
  align = "left",
  variant = "primary",
  emphasis = "none",
  gradientColors,
  strokeColor,
  strokeWidth,
  letterSpacing = "normal",
  lineHeight = "normal",
  truncate = false,
  maxLines,
  animate = false,
  onClick,
  style = {},
  text,
}: Pick<
  KoreanTextProps,
  | "size"
  | "color"
  | "weight"
  | "align"
  | "variant"
  | "emphasis"
  | "gradientColors"
  | "strokeColor"
  | "strokeWidth"
  | "letterSpacing"
  | "lineHeight"
  | "truncate"
  | "maxLines"
  | "animate"
  | "onClick"
  | "style"
  | "text"
>): { effectiveColor: string; textStyle: React.CSSProperties } {
  // Compute effective color based on variant
  const effectiveColor = useMemo(() => {
    if (color) return color;

    const variantColors = {
      primary: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
      secondary: `#${KOREAN_COLORS.GRAY_LIGHT.toString(16).padStart(6, "0")}`,
      accent: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
      warning: `#${KOREAN_COLORS.Orange.toString(16).padStart(6, "0")}`,
      danger: `#${KOREAN_COLORS.Red.toString(16).padStart(6, "0")}`,
      success: `#${KOREAN_COLORS.Green.toString(16).padStart(6, "0")}`,
    };

    return variantColors[variant];
  }, [color, variant]);

  // Build style object with Korean typography optimizations
  const textStyle = useMemo((): React.CSSProperties => {
    const sizeConfig = KOREAN_SIZE_CONFIG[size];

    const baseStyle: React.CSSProperties = {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: sizeConfig.fontSize,
      lineHeight: {
        compact: sizeConfig.lineHeight * 0.9,
        normal: sizeConfig.lineHeight,
        relaxed: sizeConfig.lineHeight * 1.1,
        loose: sizeConfig.lineHeight * 1.2,
      }[lineHeight],
      color: effectiveColor,
      fontWeight: weight,
      textAlign: align,
      letterSpacing: {
        tight: "-0.025em",
        normal: "normal",
        wide: "0.025em",
        wider: "0.05em",
      }[letterSpacing],
      transition: animate ? "all 0.3s ease" : undefined,
      cursor: onClick ? "pointer" : undefined,
      userSelect: onClick ? "none" : undefined,
      wordBreak: hasKoreanText(text) ? "keep-all" : "normal",
      overflowWrap: "break-word",
      ...style,
    };

    // Apply emphasis effects
    switch (emphasis) {
      case "glow":
        baseStyle.textShadow = `0 0 8px ${effectiveColor}66, 0 0 16px ${effectiveColor}33`;
        break;
      case "shadow":
        baseStyle.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.7)";
        break;
      case "underline":
        baseStyle.textDecoration = "underline";
        baseStyle.textDecorationColor = effectiveColor;
        break;
      case "highlight":
        baseStyle.backgroundColor = `${effectiveColor}22`;
        baseStyle.padding = "0.125em 0.25em";
        baseStyle.borderRadius = "0.25em";
        break;
    }

    // Apply gradient if specified
    if (gradientColors) {
      baseStyle.background = `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`;
      baseStyle.backgroundClip = "text";
      baseStyle.WebkitBackgroundClip = "text";
      baseStyle.WebkitTextFillColor = "transparent";
    }

    // Apply stroke if specified
    if (strokeColor && strokeWidth) {
      baseStyle.WebkitTextStroke = `${strokeWidth}px ${strokeColor}`;
    }

    // Apply truncation
    if (truncate) {
      baseStyle.overflow = "hidden";
      baseStyle.textOverflow = "ellipsis";
      baseStyle.whiteSpace = "nowrap";
    }

    // Apply max lines
    if (maxLines && !truncate) {
      baseStyle.display = "-webkit-box";
      baseStyle.WebkitLineClamp = maxLines;
      baseStyle.WebkitBoxOrient = "vertical";
      baseStyle.overflow = "hidden";
    }

    return baseStyle;
  }, [
    size,
    lineHeight,
    effectiveColor,
    weight,
    align,
    letterSpacing,
    animate,
    onClick,
    emphasis,
    gradientColors,
    strokeColor,
    strokeWidth,
    truncate,
    maxLines,
    style,
    text,
  ]);

  return { effectiveColor, textStyle };
}
