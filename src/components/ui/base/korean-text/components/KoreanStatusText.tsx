import React from "react";
import { KoreanText } from "./KoreanText";
import { KOREAN_STATUS_TRANSLATIONS } from "../constants";
import { KOREAN_COLORS } from "../../../../../types";
import type { KoreanStatusTextProps } from "../types";

// Korean status display component
export function KoreanStatusText({
  statusKey,
  value,
  maxValue,
  showPercentage = false,
  criticalThreshold = 25,
  warningThreshold = 50,
  animated = true,
}: KoreanStatusTextProps): React.ReactElement {
  const statusTranslation = KOREAN_STATUS_TRANSLATIONS[statusKey];

  const getStatusColor = (): string => {
    if (typeof value === "number" && maxValue) {
      const percentage = (value / maxValue) * 100;
      if (percentage <= criticalThreshold)
        return `#${KOREAN_COLORS.Red.toString(16).padStart(6, "0")}`;
      if (percentage <= warningThreshold)
        return `#${KOREAN_COLORS.Orange.toString(16).padStart(6, "0")}`;
      return `#${KOREAN_COLORS.Green.toString(16).padStart(6, "0")}`;
    }
    return `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`;
  };

  const formatValue = (): string => {
    if (typeof value === "number") {
      if (maxValue && showPercentage) {
        return `${Math.round((value / maxValue) * 100)}%`;
      }
      return maxValue ? `${value}/${maxValue}` : value.toString();
    }
    return value?.toString() || "";
  };

  const displayText = `${statusTranslation.korean}: ${formatValue()}`;
  const englishText = `${
    statusKey.charAt(0).toUpperCase() + statusKey.slice(1)
  }: ${formatValue()}`;

  return (
    <KoreanText
      text={displayText}
      englishText={englishText}
      size="small"
      color={getStatusColor()}
      weight="bold"
      showBoth={true}
      bilingual="horizontal"
      animate={animated}
      emphasis={
        typeof value === "number" &&
        maxValue &&
        value / maxValue <= criticalThreshold / 100
          ? "glow"
          : "none"
      }
      className={`status-text status-${statusKey}`}
    />
  );
}
