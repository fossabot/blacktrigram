import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { BaseUIComponentProps } from "../../types";
import { KOREAN_COLORS, FONT_FAMILY, FONT_SIZES } from "../../types/constants";

interface HealthBarProps extends BaseUIComponentProps {
  readonly current: number;
  readonly max: number;
  readonly label?: string;
  readonly color?: number;
  readonly width?: number;
  readonly height?: number;
  readonly showText?: boolean;
  readonly x?: number;
  readonly y?: number;
}

export const HealthBar: React.FC<HealthBarProps> = ({
  current,
  max,
  label = "Health",
  color = KOREAN_COLORS.POSITIVE_GREEN,
  width = 200,
  height = 20,
  showText = true,
  x = 0,
  y = 0,
  ...props
}) => {
  const percentage = Math.max(0, Math.min(1, current / max));

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

  const drawHealthBar = (g: PIXI.Graphics) => {
    g.clear();

    // Background
    g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
    g.lineStyle(1, KOREAN_COLORS.UI_BORDER, 0.5);
    g.drawRoundedRect(0, 0, width, height, 5);
    g.endFill();

    // Fill
    if (percentage > 0) {
      g.beginFill(color);
      g.drawRoundedRect(2, 2, (width - 4) * percentage, height - 4, 3);
      g.endFill();
    }
  };

  return (
    <Container x={x} y={y} {...props}>
      <Graphics draw={drawHealthBar} />
      {showText && (
        <Text
          text={`${Math.floor(current)}/${max}`}
          anchor={0.5}
          x={width / 2}
          y={height / 2}
          style={textStyle}
        />
      )}
    </Container>
  );
};

export default HealthBar;
