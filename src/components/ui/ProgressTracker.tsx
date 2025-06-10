import React, { useCallback } from "react";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import type { ProgressTrackerProps } from "../../types/components";
import { KOREAN_COLORS } from "../../types/constants";
import * as PIXI from "pixi.js"; // Fix: Import PIXI

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress, // Fix: Use progress instead of currentValue
  maxProgress, // Fix: Use maxProgress instead of maxValue
  label,
  showPercentage = false,
  x = 0,
  y = 0,
  width = 200,
  height = 20,
}) => {
  usePixiExtensions();

  const percentage = Math.round((progress / maxProgress) * 100);

  const barDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Background
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.drawRoundedRect(0, 0, width, height, height / 2);
      g.endFill();

      // Progress fill
      const fillWidth = (progress / maxProgress) * width;
      g.beginFill(KOREAN_COLORS.POSITIVE_GREEN, 1.0);
      g.drawRoundedRect(0, 0, fillWidth, height, height / 2);
      g.endFill();

      // Border
      g.lineStyle(2, KOREAN_COLORS.UI_BORDER, 1.0);
      g.drawRoundedRect(0, 0, width, height, height / 2);
    },
    [progress, maxProgress, width, height]
  );

  return (
    <pixiContainer x={x} y={y}>
      {label && (
        <pixiText
          text={label}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={-20}
        />
      )}

      <pixiGraphics draw={barDraw} />

      {showPercentage && (
        <pixiText
          text={`${percentage}%`}
          style={{
            fontSize: 10,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
          }}
          x={width / 2}
          y={height / 2}
          anchor={0.5}
        />
      )}
    </pixiContainer>
  );
};

export default ProgressTracker;
