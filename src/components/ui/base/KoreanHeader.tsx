import React from "react";
import { KOREAN_COLORS } from "../../../types";

interface KoreanHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly color?: number;
  readonly style?: React.CSSProperties;
}

export function KoreanHeader({
  title,
  subtitle,
  level = 1,
  color = KOREAN_COLORS.GOLD,
  style,
}: KoreanHeaderProps): React.ReactElement {
  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;

  const headerStyle: React.CSSProperties = {
    color: `#${color.toString(16).padStart(6, "0")}`,
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    textAlign: "center",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    margin: "0 0 1rem 0",
    fontWeight: 700,
    fontSize: level === 1 ? "2.5rem" : level === 2 ? "2rem" : "1.5rem",
    ...style,
  };

  const subtitleStyle: React.CSSProperties = {
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: "0.7em",
    fontWeight: 400,
    opacity: 0.9,
    marginTop: "0.5rem",
  };

  return (
    <div>
      <HeaderTag style={headerStyle}>{title}</HeaderTag>
      {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
    </div>
  );
}

export default KoreanHeader;
