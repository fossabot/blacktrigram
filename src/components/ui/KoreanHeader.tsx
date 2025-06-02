import React from "react";
import type { KoreanText } from "../../types";
import { KOREAN_COLORS } from "../../types";

export interface KoreanHeaderProps {
  readonly title: KoreanText | string;
  readonly subtitle?: KoreanText | string;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly onBackButtonClick?: () => void;
  readonly showLogo?: boolean;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export function KoreanHeader({
  title,
  subtitle,
  level = 1,
  className,
  style,
}: KoreanHeaderProps): React.ReactElement {
  const titleText = typeof title === "string" ? title : title.korean;
  const subtitleText = subtitle
    ? typeof subtitle === "string"
      ? subtitle
      : subtitle.korean
    : undefined;

  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;

  const headerStyle: React.CSSProperties = {
    color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    textAlign: "center",
    margin: "1rem 0",
    ...style,
  };

  const subtitleStyle: React.CSSProperties = {
    color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: "0.8em",
    fontWeight: "normal",
    margin: "0.5rem 0",
  };

  return (
    <div className={className}>
      <HeaderTag style={headerStyle}>{titleText}</HeaderTag>
      {subtitleText && <div style={subtitleStyle}>{subtitleText}</div>}
    </div>
  );
}
