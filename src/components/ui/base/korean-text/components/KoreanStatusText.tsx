import React from "react";
import type { KoreanStatusTextProps } from "../../../../../types/korean-text";
import { KOREAN_STATUS_TRANSLATIONS } from "../constants";
import { KOREAN_COLORS } from "../../../../../types/constants";

export function KoreanStatusText({
  statusKey,
  value,
  maxValue,
  showPercentage = false,
  criticalThreshold = 20,
  warningThreshold = 50,
  size = "medium",
  className,
  style,
}: KoreanStatusTextProps): React.ReactElement {
  const statusText = KOREAN_STATUS_TRANSLATIONS[statusKey];

  const getStatusColor = (): number => {
    if (value !== undefined && maxValue !== undefined) {
      const percentage = (value / maxValue) * 100;
      if (percentage <= criticalThreshold) {
        return KOREAN_COLORS.TRADITIONAL_RED;
      } else if (percentage <= warningThreshold) {
        return KOREAN_COLORS.GOLD;
      }
    }
    return KOREAN_COLORS.WHITE;
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

  const textStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: getFontSize(),
    color: `#${getStatusColor().toString(16).padStart(6, "0")}`,
    ...style,
  };

  const formatValue = (): string => {
    if (value === undefined) return "";

    if (maxValue !== undefined) {
      const percentage = Math.round((value / maxValue) * 100);
      if (showPercentage) {
        return ` ${value}/${maxValue} (${percentage}%)`;
      } else {
        return ` ${value}/${maxValue}`;
      }
    }

    return ` ${value}`;
  };

  const displayText = `${statusText.korean} (${
    statusText.english
  })${formatValue()}`;

  return (
    <span className={className} style={textStyle}>
      {displayText}
    </span>
  );
}
