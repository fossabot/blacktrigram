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
  readonly showLabel?: boolean;
  readonly label?: string;
  readonly color?: number;
  readonly backgroundColor?: number;
  // Additional props from other interfaces
  readonly barColor?: number;
  readonly borderColor?: number;
  readonly showText?: boolean;
  readonly textColor?: number;
  readonly borderWidth?: number;
  readonly x?: number;
  readonly y?: number;
}

export function ProgressTracker({
  // Accept both naming conventions and use progress/total internally
  progress: propProgress,
  total: propTotal,
  value,
  maxValue,

  width = 200,
  height = 30,
  showPercentage = true,
  showLabel = false,
  label = "Progress",
  color,
  barColor = KOREAN_COLORS.CYAN,
  backgroundColor = KOREAN_COLORS.GRAY_DARK,
  borderColor = KOREAN_COLORS.WHITE,
  showText = showPercentage, // For backward compatibility
  x = 0,
  y = 0,
}: ProgressTrackerProps): React.ReactElement {
  // Use progress/total if provided, otherwise fall back to value/maxValue
  const progress =
    propProgress !== undefined ? propProgress : value !== undefined ? value : 0;
  const total =
    propTotal !== undefined
      ? propTotal
      : maxValue !== undefined
      ? maxValue
      : 100;

  // Use barColor if color is not provided
  const fillColor = color !== undefined ? color : barColor;

  const percentage = useMemo(() => {
    return Math.min(100, Math.round((progress / total) * 100));
  }, [progress, total]);

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
        g.setFillStyle({ color: fillColor, alpha: 0.8 });
        g.roundRect(0, 0, fillWidth, height, 5);
        g.fill();
      }

      // Draw border
      g.setStrokeStyle({ color: borderColor, width: 1, alpha: 0.8 });
      g.roundRect(0, 0, width, height, 5);
      g.stroke();
    },
    [width, height, percentage, fillColor, backgroundColor, borderColor]
  );

  return (
    <pixiContainer x={x} y={y}>
      <pixiGraphics draw={drawProgressBar} />

      {showText && (
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
        />
      )}
    </pixiContainer>
  );
}

export default ProgressTracker;
