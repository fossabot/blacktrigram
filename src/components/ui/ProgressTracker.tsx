import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { ProgressTrackerProps } from "../../types";
import { KOREAN_COLORS, FONT_FAMILY, FONT_SIZES } from "../../types/constants";

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  label,
  current, // Use current instead of value
  maximum, // Use maximum instead of maxValue
  x = 0,
  y = 0,
  width = 200,
  height = 20,
  showNumbers = true,
  color,
  backgroundColor,
  borderColor,
  ...props
}) => {
  const progress = Math.max(0, Math.min(1, current / maximum));

  const fillColor = useMemo(() => {
    if (color) return color;
    if (progress > 0.6) return KOREAN_COLORS.POSITIVE_GREEN;
    if (progress > 0.3) return KOREAN_COLORS.WARNING_ORANGE;
    return KOREAN_COLORS.NEGATIVE_RED;
  }, [progress, color]);

  const bgColor = backgroundColor || KOREAN_COLORS.UI_BACKGROUND_DARK;
  const borderCol = borderColor || KOREAN_COLORS.UI_BORDER;

  const barDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Background
      g.beginFill(bgColor, 0.8);
      g.drawRoundedRect(0, 0, width, height, 4);
      g.endFill();

      // Progress fill
      g.beginFill(fillColor, 0.9);
      g.drawRoundedRect(2, 2, (width - 4) * progress, height - 4, 2);
      g.endFill();

      // Border
      g.lineStyle(1, borderCol, 0.5);
      g.drawRoundedRect(0, 0, width, height, 4);
    },
    [width, height, progress, fillColor, bgColor, borderCol]
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

  return (
    <Container x={x} y={y} {...props}>
      {label && <Text text={label.korean} style={textStyle} x={0} y={-18} />}

      <Graphics draw={barDraw} />

      {showNumbers && (
        <Text
          text={`${Math.round(current)}/${Math.round(maximum)}`}
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
