import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { KOREAN_COLORS, FONT_FAMILY, FONT_SIZES } from "../../types/constants";

export interface ProgressTrackerProps {
  currentValue: number;
  maxValue: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  label?: string;
  showPercentage?: boolean;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentValue,
  maxValue,
  x = 0,
  y = 0,
  width = 200,
  height = 20,
  label,
  showPercentage = false,
}) => {
  const progress = Math.max(0, Math.min(1, currentValue / maxValue));
  const percentage = Math.round(progress * 100);

  const barDraw = useMemo(
    () => (g: PIXI.Graphics) => {
      g.clear();

      // Background
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Progress fill
      g.beginFill(KOREAN_COLORS.POSITIVE_GREEN);
      g.drawRect(0, 0, width * progress, height);
      g.endFill();

      // Border
      g.lineStyle(1, KOREAN_COLORS.UI_BORDER);
      g.drawRect(0, 0, width, height);
    },
    [width, height, progress]
  );

  const textStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.small,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
      }),
    []
  );

  const getLabelText = (): string => {
    if (!label) return "";
    return typeof label === "string" ? label : "";
  };

  return (
    <Container x={x} y={y}>
      <Graphics draw={barDraw} />

      {(label || showPercentage) && (
        <Text
          text={showPercentage ? `${percentage}%` : getLabelText()}
          style={textStyle}
          x={width / 2}
          y={height / 2}
          anchor={0.5}
        />
      )}
    </Container>
  );
};

export default ProgressTracker;
