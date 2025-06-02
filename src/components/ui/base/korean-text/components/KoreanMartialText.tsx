import React from "react";
import type {
  HonorLevel,
  KoreanMartialTextProps,
  MartialVariant,
} from "../../../../../types/korean-text";
import { KOREAN_COLORS } from "../../../../../types/constants";

// Korean martial arts themed text component
export function KoreanMartialText({
  korean,
  english,
  martialVariant = "practitioner",
  honorLevel = "student",
  size = "medium",
  weight = 400,
  color,
  align = "center",
  ...props
}: KoreanMartialTextProps): React.ReactElement {
  const getVariantColor = (): number => {
    const variantColors: Record<MartialVariant, number> = {
      practitioner: KOREAN_COLORS.BLUE,
      master: KOREAN_COLORS.GOLD,
      grandmaster: KOREAN_COLORS.TRADITIONAL_RED,
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
    const honorifics: Record<HonorLevel, string> = {
      student: "님",
      instructor: "사범님",
      master: "대사범님",
    };
    return honorifics[honorLevel] || "";
  };

  const textStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: getFontSize(),
    fontWeight: getFontWeight(),
    color: `#${getVariantColor().toString(16).padStart(6, "0")}`,
    textAlign: align,
    ...props.style,
  };

  const koreanText = typeof korean === "string" ? korean : korean.korean;
  const englishText =
    english || (typeof korean === "object" ? korean.english : undefined);

  const displayText = honorLevel
    ? `${koreanText}${getHonorific()}`
    : koreanText;

  const fullText = englishText
    ? `${displayText} (${englishText})`
    : displayText;

  return (
    <span className={props.className} style={textStyle}>
      {fullText}
    </span>
  );
}
