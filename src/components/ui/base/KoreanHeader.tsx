import React from "react";
import type { KoreanTextHeaderProps } from "../../../types/korean-text";
import { KOREAN_COLORS } from "../../../types/constants";

export function KoreanHeader({
  korean,
  title,
  subtitle,
  level = 1,
  className,
  style,
}: KoreanTextHeaderProps): React.ReactElement {
  // Use korean prop first, then fall back to title
  const titleText = korean || title;
  const titleString =
    typeof titleText === "object" ? titleText.korean : titleText || "";
  const subtitleString =
    typeof subtitle === "object" ? subtitle.korean : subtitle;

  const headerStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: level === 1 ? "2.5rem" : level === 2 ? "2rem" : "1.5rem",
    color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    ...style,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "1rem",
    color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
    fontWeight: "normal",
    marginTop: "0.5rem",
    opacity: 0.8,
  };

  return (
    <div className={className}>
      <div style={headerStyle}>
        {titleString}
        {subtitleString && <div style={subtitleStyle}>{subtitleString}</div>}
      </div>
    </div>
  );
}

export default KoreanHeader;
