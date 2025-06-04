import React, { useCallback, useMemo } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS } from "../../types/constants";

export interface ProgressTrackerProps {
  readonly progress: number;
  readonly total: number;
  readonly width?: number;
  readonly height?: number;
  readonly showPercentage?: boolean;
  readonly showLabel?: boolean;
  readonly label?: string;
  readonly color?: number;
  readonly backgroundColor?: number;
}

export function ProgressTracker({
  progress,
  total,
  width = 200,
  height = 30,
  showPercentage = true,
  showLabel = false,
  label = "Progress",
  color = KOREAN_COLORS.CYAN,
  backgroundColor = KOREAN_COLORS.GRAY_DARK,
}: ProgressTrackerProps): React.ReactElement {
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
        g.setFillStyle({ color, alpha: 0.8 });
        g.roundRect(0, 0, fillWidth, height, 5);
        g.fill();
      }

      // Draw border
      g.setStrokeStyle({ color: KOREAN_COLORS.WHITE, width: 1, alpha: 0.8 });
      g.roundRect(0, 0, width, height, 5);
      g.stroke();
    },
    [width, height, percentage, color, backgroundColor]
  );

  return (
    <pixiContainer>
      <pixiGraphics draw={drawProgressBar} />

      {showPercentage && (
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
