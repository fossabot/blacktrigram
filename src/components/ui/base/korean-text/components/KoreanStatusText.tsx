import React from "react";
import type { KoreanStatusTextProps } from "../../../../../types/korean-text";
import { KoreanText } from "./KoreanText";
import { KOREAN_STATUS_TRANSLATIONS } from "../constants";
import { KOREAN_COLORS } from "../../../../../types/constants";

export function KoreanStatusText({
  statusKey,
  value,
  maxValue,
  showPercentage = false,
  criticalThreshold = 0.3,
  warningThreshold = 0.6,
  ...restKoreanTextProps
}: KoreanStatusTextProps): React.ReactElement {
  const percentage = maxValue ? value / maxValue : 1;

  let statusColor = KOREAN_COLORS.WHITE;
  if (percentage < criticalThreshold) {
    statusColor = KOREAN_COLORS.CRITICAL_RED;
  } else if (percentage < warningThreshold) {
    statusColor = KOREAN_COLORS.GOLD;
  }

  const translation = KOREAN_STATUS_TRANSLATIONS[statusKey] || {
    korean: statusKey,
    english: statusKey,
  };

  let displayText = translation.korean;
  if (maxValue !== undefined) {
    displayText += `: ${value}/${maxValue}`;
    if (showPercentage) {
      displayText += ` (${Math.round(percentage * 100)}%)`;
    }
  }

  return (
    <KoreanText
      korean={displayText}
      color={statusColor}
      {...restKoreanTextProps}
    />
  );
}
