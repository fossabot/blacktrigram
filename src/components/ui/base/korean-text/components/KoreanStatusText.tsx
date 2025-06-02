import React from "react";
import { Text as PixiText } from "@pixi/react";
import * as PIXI from "pixi.js";
import type {
  KoreanStatusTextProps,
  StatusKey,
} from "../../../../../types/korean-text"; // Ensure StatusKey is exported
import { useKoreanTextStyle } from "../hooks/useKoreanTextStyle"; // For web React styles
import { getPixiTextStyle, KOREAN_STATUS_TRANSLATIONS } from "../utils"; // Ensure KOREAN_STATUS_TRANSLATIONS is exported from utils or constants
import { KOREAN_COLORS } from "../../../../../types/constants";

export function KoreanStatusText({
  statusKey,
  value,
  maxValue,
  showPercentage = false,
  criticalThreshold = 0.3, // Default critical threshold (30%)
  warningThreshold = 0.6, // Default warning threshold (60%)
  className,
  style: htmlStyle, // HTML style from props
  // Pixi specific props if this component is used in Pixi:
  x,
  y,
  anchor,
  alpha,
  visible,
  interactive,
  onpointertap,
  // Other KoreanTextProps
  ...restKoreanTextProps
}: KoreanStatusTextProps & {
  // Add Pixi specific props if this is a Pixi component
  x?: number;
  y?: number;
  anchor?: { x: number; y: number } | number;
  alpha?: number;
  visible?: boolean;
  interactive?: boolean;
  onpointertap?: (event: PIXI.FederatedPointerEvent) => void;
}): JSX.Element {
  const reactStyle = useKoreanTextStyle({
    statusKey,
    value,
    maxValue,
    ...restKoreanTextProps,
    style: htmlStyle,
  });

  const statusInfo = KOREAN_STATUS_TRANSLATIONS[statusKey] || {
    korean: statusKey.charAt(0).toUpperCase() + statusKey.slice(1),
    english: statusKey.charAt(0).toUpperCase() + statusKey.slice(1),
  };

  const percentage = maxValue && maxValue > 0 ? Number(value) / maxValue : 0;
  let currentDisplayValue: string;

  if (showPercentage) {
    currentDisplayValue = `${Math.round(percentage * 100)}%`;
  } else if (maxValue !== undefined) {
    currentDisplayValue = `${value}/${maxValue}`;
  } else {
    currentDisplayValue = `${value}`;
  }

  const textContent = `${statusInfo.korean} (${statusInfo.english}): ${currentDisplayValue}`;

  // Determine color based on thresholds for PIXI text
  let pixiFillColor: PIXI.ColorSource = KOREAN_COLORS.WHITE; // Default
  if (
    typeof restKoreanTextProps.color === "number" ||
    typeof restKoreanTextProps.color === "string"
  ) {
    pixiFillColor = restKoreanTextProps.color as PIXI.ColorSource;
  }

  if (maxValue && maxValue > 0) {
    if (percentage <= criticalThreshold) {
      pixiFillColor = KOREAN_COLORS.CRITICAL_RED;
      if (reactStyle)
        (reactStyle as any).color = `#${KOREAN_COLORS.CRITICAL_RED.toString(
          16
        ).padStart(6, "0")}`;
    } else if (percentage <= warningThreshold) {
      pixiFillColor = KOREAN_COLORS.ORANGE;
      if (reactStyle)
        (reactStyle as any).color = `#${KOREAN_COLORS.ORANGE.toString(
          16
        ).padStart(6, "0")}`;
    }
  }

  // For PIXI rendering:
  const pixiStyleOptions = getPixiTextStyle({
    statusKey,
    value,
    maxValue,
    ...restKoreanTextProps,
    color: pixiFillColor as number,
  });
  const finalPixiStyle = new PIXI.TextStyle(pixiStyleOptions);

  // This component seems to try to be both a web React component and a Pixi component.
  // It's better to have separate components or a clear way to distinguish.
  // Assuming for now it's primarily a Pixi component if x, y, etc. are passed.
  if (x !== undefined || y !== undefined) {
    // Heuristic: if Pixi props are present, render PixiText
    return (
      <PixiText
        text={textContent}
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

  // Default to web React component
  return (
    <span className={className} style={reactStyle}>
      {textContent}
    </span>
  );
}
