import React, { useMemo } from "react";
// Remove: import { Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { ProgressTrackerProps } from "../../types/ui";
import { KOREAN_COLORS } from "@/types";

export function ProgressTracker({
  label,
  value,
  maxValue,
  width = 200,
  height = 20,
  showText = true,
  textColor = KOREAN_COLORS.WHITE,
}: ProgressTrackerProps): React.ReactElement {
  // Calculate percentage safely
  const percentage =
    maxValue > 0 ? Math.max(0, Math.min(100, (value / maxValue) * 100)) : 0;

  const baseTextStyle: Partial<PIXI.TextStyle> = useMemo(
    () => ({
      fontFamily: "Noto Sans KR, Arial, sans-serif",
      fontSize: 12,
      fill: textColor,
      align: "center",
      dropShadow: {
        alpha: 0.5,
        angle: Math.PI / 4,
        blur: 2,
        color: "#000000",
        distance: 1,
      },
    }),
    [textColor]
  );

  const displayText = showText
    ? `${label}: ${value}/${maxValue} (${Math.round(percentage)}%)`
    : "";

  return (
    <>
      {showText && (
        <pixiText
          text={displayText}
          style={baseTextStyle}
          x={width / 2}
          y={height / 2}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      )}
    </>
  );
}
