import React, { useCallback, useMemo } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS } from "../../types/constants";

export interface ProgressTrackerProps {
  // Support both naming conventions for backward compatibility
  readonly progress?: number;
  readonly total?: number;
  readonly value?: number;
  readonly maxValue?: number;
  readonly width?: number;
  readonly height?: number;
  readonly showPercentage?: boolean;
  readonly showText?: boolean; // Alias for showPercentage
  readonly showLabel?: boolean;
  readonly label?: string;
  readonly color?: number;
  readonly barColor?: number; // Alias for color
  readonly backgroundColor?: number;
  readonly borderColor?: number; // Added for compatibility
}

export function ProgressTracker({
  // Use progress/value and total/maxValue with appropriate fallbacks
  progress,
  total,
  value,
  maxValue,
  width = 200,
  height = 30,
  showPercentage = true,
  showText, // Alias for showPercentage
  showLabel = false,
  label = "Progress",
  color,
  barColor, // Alias for color
  backgroundColor = KOREAN_COLORS.GRAY_DARK,
  borderColor = KOREAN_COLORS.WHITE,
}: ProgressTrackerProps): React.ReactElement {
  // Use progress/value and total/maxValue with appropriate fallbacks
  const actualProgress = progress !== undefined ? progress : value ?? 0;
  const actualTotal = total !== undefined ? total : maxValue ?? 100;
  const actualColor =
    color !== undefined ? color : barColor ?? KOREAN_COLORS.CYAN;
  const actualShowPercentage =
    showPercentage !== undefined ? showPercentage : showText;

  const percentage = useMemo(() => {
    return Math.min(
      100,
      Math.round((actualProgress / Math.max(actualTotal, 1)) * 100)
    );
  }, [actualProgress, actualTotal]);

  const drawProgressBar = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Draw background
      g.setFillStyle({ color: backgroundColor, alpha: 0.6 });
      g.roundRect(0, 0, width, height, 5);
      g.fill();

      // Draw progress fill
      if (percentage > 0) {
        const fillWidth = (width * percentage) / 100;
        g.setFillStyle({ color: actualColor, alpha: 0.8 });
        g.roundRect(0, 0, fillWidth, height, 5);
        g.fill();
      }

      // Draw border
      g.setStrokeStyle({ color: borderColor, width: 1, alpha: 0.8 });
      g.roundRect(0, 0, width, height, 5);
      g.stroke();
    },
    [width, height, percentage, actualColor, backgroundColor, borderColor]
  );

  return (
    <pixiContainer data-testid="pixi-container">
      <pixiGraphics draw={drawProgressBar} data-testid="pixi-graphics" />

      {actualShowPercentage && (
        <pixiText
          text={`${percentage}%`}
          x={width / 2}
          y={height / 2}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: height * 0.5,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          }}
          data-testid="pixi-text"
        />
      )}

      {showLabel && (
        <pixiText
          text={label}
          x={width / 2}
          y={-10}
          anchor={{ x: 0.5, y: 1 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: height * 0.4,
            fill: KOREAN_COLORS.WHITE,
          }}
          data-testid="progress-tracker-label-text"
        />
      )}
    </pixiContainer>
  );
}

export default ProgressTracker;
