import React from "react";
import { Text as PixiText } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { KoreanStatusTextProps } from "../../../../../types/korean-text";
import { useKoreanTextStyle } from "../hooks/useKoreanTextStyle";
import { getPixiTextStyle } from "../utils";
import { KOREAN_COLORS, KOREAN_STATUS_TRANSLATIONS } from "../constants";

export function KoreanStatusText({
  statusKey,
  value,
  maxValue,
  showPercentage = false,
  criticalThreshold = 0.3,
  warningThreshold = 0.6,
  className,
  style: htmlStyle,
  x,
  y,
  anchor,
  alpha,
  visible,
  interactive,
  onpointertap,
  ...restKoreanTextProps
}: KoreanStatusTextProps & {
  x?: number;
  y?: number;
  anchor?: { x: number; y: number } | number;
  alpha?: number;
  visible?: boolean;
  interactive?: boolean;
  onpointertap?: (event: PIXI.FederatedPointerEvent) => void;
}): React.ReactElement {
  const percentage = maxValue ? value / maxValue : 0;

  // Determine status color based on thresholds
  let statusColor = KOREAN_COLORS.WHITE;
  if (percentage < criticalThreshold) {
    statusColor = KOREAN_COLORS.TRADITIONAL_RED;
  } else if (percentage < warningThreshold) {
    statusColor = KOREAN_COLORS.GOLD;
  }

  const translation = KOREAN_STATUS_TRANSLATIONS[statusKey] || {
    korean: statusKey,
    english: statusKey,
  };

  let displayText = `${translation.korean} (${translation.english})`;
  if (maxValue !== undefined) {
    displayText += `: ${value}/${maxValue}`;
    if (showPercentage) {
      displayText += ` (${Math.round(percentage * 100)}%)`;
    }
  }

  const reactStyle = useKoreanTextStyle({
    korean: translation.korean,
    english: translation.english,
    color: statusColor,
    ...restKoreanTextProps,
    style: htmlStyle,
  });

  if (x !== undefined || y !== undefined) {
    const pixiStyleOptions = getPixiTextStyle({
      korean: translation.korean,
      english: translation.english,
      color: statusColor,
      ...restKoreanTextProps,
    });

    const finalPixiStyle = new PIXI.TextStyle(pixiStyleOptions);

    return (
      <PixiText
        text={displayText}
        style={finalPixiStyle}
        x={x}
        y={y}
        anchor={anchor}
        alpha={alpha}
        visible={visible}
        interactive={interactive}
        onpointertap={onpointertap}
      />
    );
  }

  return (
    <span className={className} style={reactStyle}>
      {displayText}
    </span>
  );
}
