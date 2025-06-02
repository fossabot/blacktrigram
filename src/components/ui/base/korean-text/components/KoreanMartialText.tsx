import React from "react";
import type { KoreanMartialTextProps } from "../../../../../types/korean-text";
import { KOREAN_COLORS } from "../../../../../types/constants";

// Korean martial arts themed text component
export function KoreanMartialText({
  korean,
  english,
  martialVariant = "technique",
  showHonorific = false,
  rank = "student",
  size = "medium",
  weight = "regular",
  color,
  className,
  style,
}: KoreanMartialTextProps): React.ReactElement {
  const getVariantColor = (): number => {
    const variantColors = {
      technique: KOREAN_COLORS.GOLD,
      philosophy: KOREAN_COLORS.CYAN,
      instruction: KOREAN_COLORS.WHITE,
      practitioner: KOREAN_COLORS.SILVER,
      master: KOREAN_COLORS.GOLD,
      honor: KOREAN_COLORS.TRADITIONAL_RED,
      discipline: KOREAN_COLORS.CYAN,
    };
    return color || variantColors[martialVariant] || KOREAN_COLORS.WHITE;
  };

  const getFontSize = (): string => {
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

  const getFontWeight = (): number => {
    const weightMap = {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
      heavy: 900,
    };
    return weightMap[weight] || 400;
  };

  const getHonorific = (): string => {
    if (!showHonorific) return "";
    const honorifics = {
      student: "님",
      instructor: "사범님",
      master: "사범님",
      grandmaster: "대사범님",
    };
    return honorifics[rank] || "";
  };

  const textStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: getFontSize(),
    fontWeight: getFontWeight(),
    color: `#${getVariantColor().toString(16).padStart(6, "0")}`,
    ...style,
  };

  const koreanText = typeof korean === "string" ? korean : korean.korean;
  const englishText =
    english || (typeof korean === "object" ? korean.english : undefined);

  const displayText = showHonorific
    ? `${koreanText}${getHonorific()}`
    : koreanText;

  const fullText = englishText
    ? `${displayText} (${englishText})`
    : displayText;

  return (
    <span className={className} style={textStyle}>
      {fullText}
    </span>
  );
}
