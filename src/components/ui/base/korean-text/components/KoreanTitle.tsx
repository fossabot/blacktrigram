import React from "react";
import type { KoreanTitleProps } from "../types";
import { KOREAN_COLORS } from "../../../../../types/constants";

export function KoreanTitle({
  korean,
  english,
  level = 1,
  size,
  color = KOREAN_COLORS.GOLD,
  className,
  style,
}: KoreanTitleProps): React.ReactElement {
  const getFontSize = (level: number, customSize?: string | number): string => {
    if (customSize) {
      return typeof customSize === "number" ? `${customSize}px` : customSize;
    }

    const sizes = {
      1: "2.5rem",
      2: "2rem",
      3: "1.75rem",
      4: "1.5rem",
      5: "1.25rem",
      6: "1rem",
    };
    return sizes[level as keyof typeof sizes] || "1.5rem";
  };

  const getColor = (): string => {
    return typeof color === "number"
      ? `#${color.toString(16).padStart(6, "0")}`
      : color;
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: getFontSize(level, size),
    fontWeight: level <= 2 ? "bold" : "normal",
    color: getColor(),
    margin: "0 0 1rem 0",
    lineHeight: 1.2,
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    ...style,
  };

  const displayText = english ? `${korean}\n${english}` : korean;

  return (
    <div className={className} style={titleStyle}>
      {displayText.split("\n").map((line, index) => (
        <div
          key={index}
          style={index > 0 ? { fontSize: "0.8em", opacity: 0.8 } : {}}
        >
          {line}
        </div>
      ))}
    </div>
  );
}
