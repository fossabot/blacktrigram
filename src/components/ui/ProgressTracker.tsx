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
      const fillWidth = (width - 4) * (progress / maxProgress);
      if (fillWidth > 0) {
        g.beginFill(KOREAN_COLORS.ACCENT_GOLD, 0.9);
        g.drawRoundedRect(2, 2, fillWidth, height - 4, (height - 4) / 2);
        g.endFill();
      }

      // Border
      g.lineStyle(2, KOREAN_COLORS.UI_BORDER, 0.6);
      g.drawRoundedRect(0, 0, width, height, height / 2);
    },
    [progress, maxProgress, width, height]
  );

  const getLabelText = () => {
    return label || `${progress}/${maxProgress}`;
  };

  const textStyle = new PIXI.TextStyle({
    fontFamily: "Arial, sans-serif", // Fix: Use simple font family
    fontSize: 12, // Fix: Use number directly
    fill: KOREAN_COLORS.TEXT_PRIMARY,
    align: "center",
  });

  return (
    <pixiContainer x={x} y={y} data-testid="progress-tracker">
      {" "}
      {/* Fix: Use pixiContainer */}
      <pixiGraphics draw={barDraw} /> {/* Fix: Use pixiGraphics */}
      {(showPercentage || label) && (
        <pixiText // Fix: Use pixiText
          text={showPercentage ? `${percentage}%` : getLabelText()}
          style={textStyle}
          x={width / 2}
          y={height / 2}
          anchor={0.5}
        />
      )}
    </pixiContainer>
  );
};

export default ProgressTracker;
