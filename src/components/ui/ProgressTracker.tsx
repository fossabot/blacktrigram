import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
} from "../../types/constants";

export interface ProgressTrackerProps {
  currentValue: number;
  maxValue: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  label?: string; // Fix: Simple string instead of KoreanText
  showPercentage?: boolean;
  color?: number;
  backgroundColor?: number;
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
  color = KOREAN_COLORS.POSITIVE_GREEN,
  backgroundColor = KOREAN_COLORS.UI_BACKGROUND_DARK,
}) => {
  const progress = Math.min(Math.max(currentValue / maxValue, 0), 1);
  const percentage = Math.round(progress * 100);

  const progressBarDraw = useMemo(
    () => (g: PIXI.Graphics) => {
      g.clear();

      // Background
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.drawRoundedRect(0, 0, width, height, 4);
      g.endFill();

      // Progress fill
      const fillWidth = width * progress;
      const fillColor =
        progress > 0.7
          ? KOREAN_COLORS.POSITIVE_GREEN
          : progress > 0.3
          ? KOREAN_COLORS.WARNING_YELLOW
          : KOREAN_COLORS.NEGATIVE_RED;

      g.beginFill(fillColor, 0.8);
      g.drawRoundedRect(2, 2, fillWidth - 4, height - 4, 2);
      g.endFill();

      // Border
      g.lineStyle(2, KOREAN_COLORS.UI_BORDER, 0.8);
      g.drawRoundedRect(0, 0, width, height, 4);
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
    // Fix: Handle simple string label
    return typeof label === "string" ? label : "";
  };

  return (
    <Container x={x} y={y}>
      <Graphics draw={progressBarDraw} />

      {label && (
        <Text
          text={getLabelText()}
          style={textStyle}
          anchor={0.5}
          x={width / 2}
          y={-FONT_SIZES.small - 5}
        />
      )}

      {showPercentage && (
        <Text
          text={`${percentage}%`}
          style={textStyle}
          anchor={0.5}
          x={width / 2}
          y={height / 2}
        />
      )}
    </Container>
  );
};

export default ProgressTracker;
