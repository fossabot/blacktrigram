import React from "react";
import type { KoreanTextProps } from "../../../../../types/korean-text";
import { KOREAN_COLORS } from "../../../../../types";

export function KoreanText({
  korean,
  english,
  size = "medium",
  variant = "default",
  weight = 400, // Use numeric weight
  color,
  align = "left",
  className,
  style,
  emphasis = "none",
  ...restProps
}: KoreanTextProps): React.ReactElement {
  const getFontSize = (size: KoreanTextProps["size"]): string => {
    if (typeof size === "number") return `${size}px`;

    const sizeMap = {
      small: "0.875rem",
      medium: "1rem",
      large: "1.25rem",
      xlarge: "1.5rem",
      xxlarge: "2rem",
    };

    return sizeMap[size as keyof typeof sizeMap] || "1rem";
  };

  const getColor = (): string => {
    if (color) {
      return typeof color === "number"
        ? `#${color.toString(16).padStart(6, "0")}`
        : color;
    }

    const variantColors = {
      default: KOREAN_COLORS.WHITE,
      title: KOREAN_COLORS.GOLD,
      subtitle: KOREAN_COLORS.CYAN,
      body: KOREAN_COLORS.WHITE,
      caption: KOREAN_COLORS.SILVER,
      technique: KOREAN_COLORS.GOLD,
      philosophy: KOREAN_COLORS.CYAN,
      instruction: KOREAN_COLORS.WHITE,
      martial: KOREAN_COLORS.GOLD,
    };

    const colorValue =
      variantColors[variant as keyof typeof variantColors] ||
      KOREAN_COLORS.WHITE;
    return `#${colorValue.toString(16).padStart(6, "0")}`;
  };

  const getTextShadow = (): string => {
    switch (emphasis) {
      case "glow":
        return `0 0 10px ${getColor()}, 0 0 20px ${getColor()}`;
      case "shadow":
        return "2px 2px 4px rgba(0,0,0,0.5)";
      case "outline":
        return `1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000`;
      default:
        return "none";
    }
  };

  const textStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: getFontSize(size),
    fontWeight: weight,
    color: getColor(),
    textAlign: align,
    textShadow: getTextShadow(),
    ...style,
  };

  // Handle korean prop being either string or KoreanText object
  const koreanText = typeof korean === "string" ? korean : korean.korean;
  const englishText =
    english || (typeof korean === "object" ? korean.english : undefined);

  const displayText = englishText
    ? `${koreanText} (${englishText})`
    : koreanText;

  // Remove color from restProps to avoid DOM attribute warning
  const { color: _, ...domProps } = restProps as any;

  return (
    <span className={className} style={textStyle} {...domProps}>
      {displayText}
    </span>
  );
}
