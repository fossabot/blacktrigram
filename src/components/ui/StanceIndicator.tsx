import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { TrigramStance } from "../../types/enums";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  TRIGRAM_DATA,
} from "../../types/constants";

export interface StanceIndicatorProps {
  readonly stance: TrigramStance;
  readonly size?: number;
  readonly x?: number;
  readonly y?: number;
  readonly isActive?: boolean;
  readonly showText?: boolean;
  readonly showLabel?: boolean;
  readonly onClick?: (stance: TrigramStance) => void;
}

export const StanceIndicator: React.FC<StanceIndicatorProps> = ({
  stance,
  size = 50,
  isActive = false,
  showText = true,
  showLabel = false,
  x = 0,
  y = 0,
  onClick,
}) => {
  const stanceData = TRIGRAM_DATA[stance];
  const labelText = stanceData?.name.korean || "";

  const indicatorDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Background circle
      const bgColor = isActive
        ? stanceData?.theme?.active || KOREAN_COLORS.ACCENT_GOLD
        : stanceData?.theme?.primary || KOREAN_COLORS.UI_BORDER;

      g.beginFill(bgColor, isActive ? 0.8 : 0.6);
      g.drawCircle(0, 0, size / 2);
      g.endFill();

      // Border
      const borderColor = isActive
        ? KOREAN_COLORS.ACCENT_GOLD
        : stanceData?.theme?.secondary || KOREAN_COLORS.UI_BORDER_LIGHT;

      g.lineStyle(2, borderColor, 1.0);
      g.drawCircle(0, 0, size / 2);

      // Trigram symbol (simplified representation)
      g.lineStyle(3, KOREAN_COLORS.TEXT_PRIMARY, 1.0);
      const symbolSize = size * 0.3;
      for (let i = 0; i < 3; i++) {
        const y = (i - 1) * (symbolSize / 3);
        g.moveTo(-symbolSize / 2, y);
        g.lineTo(symbolSize / 2, y);
      }
    },
    [stance, size, isActive, stanceData]
  );

  const textColor = isActive
    ? KOREAN_COLORS.ACCENT_GOLD
    : KOREAN_COLORS.TEXT_PRIMARY;

  const textStyle = new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.PRIMARY,
    fontSize: FONT_SIZES.small,
    fill: textColor,
    align: "center",
  });

  const handleClick = useCallback(() => {
    onClick?.(stance);
  }, [onClick, stance]);

  return (
    <Container
      x={x}
      y={y}
      interactive={!!onClick}
      buttonMode={!!onClick}
      pointerdown={handleClick}
    >
      <Graphics draw={indicatorDraw} />

      {showText && (
        <Text
          text={stanceData?.symbol || stance}
          style={textStyle}
          anchor={0.5}
        />
      )}

      {showLabel && (
        <Text
          text={labelText}
          style={
            new PIXI.TextStyle({
              fontFamily: FONT_FAMILY.PRIMARY,
              fontSize: FONT_SIZES.xsmall,
              fill: textColor,
              align: "center",
            })
          }
          anchor={0.5}
          y={size / 2 + 10}
        />
      )}
    </Container>
  );
};

export default StanceIndicator;
