import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { KoreanText } from "../../types";
import { KOREAN_COLORS, FONT_FAMILY, FONT_SIZES } from "../../types/constants";

export interface HealthBarProps {
  readonly currentHealth: number;
  readonly maxHealth: number;
  readonly label?: KoreanText;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly showNumbers?: boolean;
}

export const HealthBar: React.FC<HealthBarProps> = ({
  currentHealth,
  maxHealth,
  label,
  x = 0,
  y = 0,
  width = 200,
  height = 20,
  showNumbers = true,
}) => {
  const healthPercentage = Math.max(0, Math.min(1, currentHealth / maxHealth));

  const barColor = useMemo(() => {
    if (healthPercentage > 0.6) return KOREAN_COLORS.POSITIVE_GREEN;
    if (healthPercentage > 0.3) return KOREAN_COLORS.WARNING_ORANGE;
    return KOREAN_COLORS.NEGATIVE_RED;
  }, [healthPercentage]);

  const barDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Background
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.drawRoundedRect(0, 0, width, height, 4);
      g.endFill();

      // Health fill
      g.beginFill(barColor, 0.9);
      g.drawRoundedRect(2, 2, (width - 4) * healthPercentage, height - 4, 2);
      g.endFill();

      // Border
      g.lineStyle(1, KOREAN_COLORS.UI_BORDER, 0.5);
      g.drawRoundedRect(0, 0, width, height, 4);
    },
    [width, height, healthPercentage, barColor]
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
    <Container x={x} y={y}>
      {label && <Text text={label.korean} style={textStyle} x={0} y={-18} />}

      <Graphics draw={barDraw} />

      {showNumbers && (
        <Text
          text={`${Math.round(currentHealth)}/${Math.round(maxHealth)}`}
          style={textStyle}
          x={width / 2}
          y={height / 2}
          anchor={0.5}
        />
      )}
    </Container>
  );
};

export default HealthBar;
