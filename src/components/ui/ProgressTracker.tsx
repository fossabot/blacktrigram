import React, { useCallback, useMemo } from "react";
import { Application } from "@pixi/react";
import { KOREAN_COLORS } from "../../types/constants";
import type { Graphics as PixiGraphics } from "pixi.js";

export interface ProgressTrackerProps {
  readonly label: string;
  readonly value: number;
  readonly maxValue: number;
  readonly width?: number;
  readonly height?: number;
  readonly showText?: boolean;
  readonly barColor?: number;
  readonly backgroundColor?: number;
  readonly borderColor?: number;
}

export function ProgressTracker({
  label,
  value,
  maxValue,
  width = 200,
  height = 20,
  showText = true,
  barColor = KOREAN_COLORS.CYAN,
  backgroundColor = KOREAN_COLORS.BLACK,
  borderColor = KOREAN_COLORS.WHITE,
}: ProgressTrackerProps): React.JSX.Element {
  const percentage = useMemo(
    () => (maxValue > 0 ? Math.max(0, Math.min(1, value / maxValue)) : 0),
    [value, maxValue]
  );

  const drawProgressBar = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Background
      g.setFillStyle({ color: backgroundColor, alpha: 0.8 });
      g.roundRect(0, 0, width, height, 4);
      g.fill();

      // Progress fill
      g.setFillStyle({ color: barColor, alpha: 1.0 });
      g.roundRect(0, 0, width * percentage, height, 4);
      g.fill();

      // Border
      g.setStrokeStyle({ color: borderColor, width: 1 });
      g.roundRect(0, 0, width, height, 4);
      g.stroke();
    },
    [width, height, percentage, barColor, backgroundColor, borderColor]
  );

  const displayText = useMemo(
    () => `${Math.round(value)} / ${maxValue}`,
    [value, maxValue]
  );

  return (
    <Application width={width} height={height + 30} backgroundColor={0x000000}>
      <pixiContainer>
        {/* Label */}
        <pixiText
          text={label}
          x={0}
          y={0}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            fill: KOREAN_COLORS.WHITE,
          }}
        />

        {/* Progress Bar */}
        <pixiGraphics draw={drawProgressBar} y={15} />

        {/* Value Text */}
        {showText && (
          <pixiText
            text={displayText}
            x={width / 2}
            y={15 + height / 2}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: Math.min(12, height * 0.6),
              fill: KOREAN_COLORS.WHITE,
              fontWeight: "bold",
            }}
          />
        )}
      </pixiContainer>
    </Application>
  );
}

export default ProgressTracker;
