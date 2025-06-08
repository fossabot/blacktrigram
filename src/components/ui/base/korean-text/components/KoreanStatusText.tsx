import React from "react";
import type { KoreanStatusTextProps } from "../../../../../types";
import { KoreanText } from "./KoreanText"; // Assuming this is the React DOM KoreanText
import { KOREAN_COLORS } from "../../../../../types/constants";
import type { StatusKey } from "../../../../../types/korean-text"; // For explicit StatusKey type

const getStatusColor = (
  statusKey: StatusKey, // Use imported StatusKey
  value: number,
  maxValue: number,
  criticalThreshold?: number,
  warningThreshold?: number
): string | number => {
  const percentage = maxValue > 0 ? value / maxValue : 0;

  if (criticalThreshold !== undefined && percentage <= criticalThreshold) {
    return KOREAN_COLORS.NEGATIVE_RED;
  }
  if (warningThreshold !== undefined && percentage <= warningThreshold) {
    return KOREAN_COLORS.WARNING_ORANGE;
  }

  // Use a mapping or switch for more robust color selection
  const colorMap: Partial<Record<StatusKey, number>> = {
    health: KOREAN_COLORS.POSITIVE_GREEN,
    health_critical: KOREAN_COLORS.NEGATIVE_RED,
    ki: KOREAN_COLORS.PRIMARY_BLUE,
    ki_depleted: KOREAN_COLORS.PRIMARY_BLUE_DARK || KOREAN_COLORS.PRIMARY_BLUE,
    stamina: KOREAN_COLORS.SECONDARY_YELLOW,
    stamina_low: KOREAN_COLORS.WARNING_ORANGE,
    pain: KOREAN_COLORS.WARNING_ORANGE,
    stunned: KOREAN_COLORS.STATUS_STUNNED_YELLOW || KOREAN_COLORS.ACCENT_YELLOW, // Added fallback
    bleeding: KOREAN_COLORS.NEGATIVE_RED_LIGHT || KOREAN_COLORS.NEGATIVE_RED, // Added fallback
    poisoned: KOREAN_COLORS.NEGATIVE_GREEN || KOREAN_COLORS.POSITIVE_GREEN_DARK,
    burning: KOREAN_COLORS.ACCENT_ORANGE,
    frozen: KOREAN_COLORS.SECONDARY_BLUE_LIGHT,
    // ... add all status keys and their colors
  };

  if (colorMap[statusKey]) {
    return colorMap[statusKey]!;
  }

  // Fallback colors for general statuses based on keywords
  if (statusKey.includes("critical") || statusKey.includes("failure"))
    return KOREAN_COLORS.NEGATIVE_RED;
  if (
    statusKey.includes("warning") ||
    statusKey.includes("low") ||
    statusKey.includes("depleted")
  )
    return KOREAN_COLORS.WARNING_YELLOW;
  if (
    statusKey.includes("success") ||
    statusKey.includes("ready") ||
    statusKey.includes("active")
  )
    return KOREAN_COLORS.POSITIVE_GREEN;

  return KOREAN_COLORS.TEXT_SECONDARY; // Default color
};

export const KoreanStatusText: React.FC<KoreanStatusTextProps> = ({
  status,
  size = "medium", // Fix: Use valid size
  weight = "regular", // Fix: Use valid weight
  variant = "primary",
  emphasis = "none", // Fix: Use valid emphasis
  display = "both",
  order = "korean_first",
  showIcon = false,
  showValue = true,
  className,
  style,
  ...rest
}) => {
  const statusKoreanLabel = showValue
    ? `${status.korean}: ${status.value || ""}`
    : status.korean;

  const color = getStatusColor(
    status.key,
    status.value,
    status.maxValue,
    status.criticalThreshold,
    status.warningThreshold
  );

  return (
    <KoreanText
      korean={statusKoreanLabel}
      english={status.english}
      size={size}
      weight={weight}
      variant={variant}
      emphasis={emphasis}
      display={display}
      order={order}
      className={className}
      style={style}
      {...rest}
    />
  );
};
