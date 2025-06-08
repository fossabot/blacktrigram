import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { HealthBarProps } from "../../types/components";
import { KOREAN_COLORS, FONT_FAMILY, FONT_SIZES } from "../../types/constants";
import { getHealthColor } from "../../utils/colorUtils";

export const HealthBar: React.FC<HealthBarProps> = ({
  currentHealth,
  maxHealth,
  x = 0,
  y = 0,
  width = 200,
  height = 20,
  backgroundColor = KOREAN_COLORS.UI_BACKGROUND_DARK,
  borderColor = KOREAN_COLORS.UI_BORDER,
  criticalColor = KOREAN_COLORS.NEGATIVE_RED,
  showText = true,
  ...props
}) => {
  const healthPercent = Math.max(0, Math.min(1, currentHealth / maxHealth));
  const fillColor = getHealthColor(healthPercent);

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
    g.beginFill(backgroundColor);
    g.drawRect(0, 0, width, height);
    g.endFill();

    // Health fill
    const fillWidth = width * healthPercent;
    g.beginFill(fillColor);
    g.drawRect(0, 0, fillWidth, height);
    g.endFill();

    // Border
    g.lineStyle(1, borderColor);
    g.drawRect(0, 0, width, height);
  };

  return (
    <Container x={x} y={y} {...props}>
      <Graphics draw={drawHealthBar} />
      {showText && (
        <Text
          text={`${Math.ceil(currentHealth)}/${maxHealth}`}
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
