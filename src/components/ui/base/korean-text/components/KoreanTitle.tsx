import React from "react";
import type { KoreanTextHeaderProps } from "../../../../../types/korean-text";
import { KOREAN_COLORS } from "../../../../../types/constants";

export function KoreanTitle({
  korean,
  english,
  subtitle,
  level = 1,
  color = KOREAN_COLORS.GOLD,
  className,
  style,
}: KoreanTextHeaderProps): React.ReactElement {
  const getFontSize = (level: number): string => {
    const sizes = {
      1: "2.5rem",
      2: "2rem",
      3: "1.75rem",
      4: "1.5rem",
      5: "1.25rem",
      6: "1rem",
    };
    return sizes[level as keyof typeof sizes] || "2rem";
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: getFontSize(level),
    fontWeight: level <= 2 ? 700 : 600,
    color: `#${color.toString(16).padStart(6, "0")}`,
    textAlign: "center",
    margin: 0,
    padding: "0.5rem 0",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    ...style,
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: `calc(${getFontSize(level)} * 0.6)`,
    fontWeight: 400,
    color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
    textAlign: "center",
    margin: "0.25rem 0 0 0",
    opacity: 0.8,
  };

  const englishStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: `calc(${getFontSize(level)} * 0.5)`,
    fontWeight: 300,
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
    textAlign: "center",
    margin: "0.25rem 0 0 0",
    opacity: 0.7,
  };

  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div className={className}>
      <HeaderTag style={titleStyle}>{korean}</HeaderTag>
      {english && <div style={englishStyle}>{english}</div>}
      {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
    </div>
  );
}
